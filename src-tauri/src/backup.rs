//! Versioned vocabulary backups. Settings and credentials are deliberately absent.
use chrono::{DateTime, SecondsFormat, Utc};
use rusqlite::{params, Connection, OptionalExtension};
use serde::{Deserialize, Serialize};
use std::collections::{HashMap, HashSet};

const MAX_BYTES: usize = 20 * 1024 * 1024;
const MAX_RECORDS: usize = 100_000;

#[derive(Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
struct Backup {
    format: String,
    version: u32,
    words: Vec<Word>,
    encounters: Vec<Encounter>,
    reviews: Vec<Review>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(deny_unknown_fields)]
struct Word {
    id: i64,
    original: String,
    normalized_key: String,
    part_of_speech: Option<String>,
    meaning_zh: Option<String>,
    explanation_zh: Option<String>,
    example_en: Option<String>,
    #[serde(default = "default_translation_language")]
    translation_language: String,
    translation_status: String,
    first_seen_at: String,
    last_seen_at: String,
    encounter_count: i64,
    deleted_at: Option<String>,
}

fn default_translation_language() -> String {
    "中文".to_string()
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
struct Encounter {
    id: i64,
    word_id: i64,
    origin: String,
    event_id: i64,
    original: String,
    seen_at: String,
    source_sentence: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, PartialEq)]
#[serde(deny_unknown_fields)]
struct Review {
    id: i64,
    word_id: i64,
    origin: String,
    event_id: i64,
    rating: String,
    reviewed_at: String,
    due_at: String,
}

fn schema(db: &Connection) -> Result<String, String> {
    db.execute_batch(
        "CREATE TABLE IF NOT EXISTS backup_meta (id INTEGER PRIMARY KEY CHECK(id=1), origin TEXT NOT NULL);
         INSERT OR IGNORE INTO backup_meta(id,origin) VALUES(1,lower(hex(randomblob(16))));
         CREATE TABLE IF NOT EXISTS backup_event_origins (
           kind TEXT NOT NULL CHECK(kind IN ('encounter','review')),
           local_id INTEGER NOT NULL,
           origin TEXT NOT NULL,
           event_id INTEGER NOT NULL,
           PRIMARY KEY(kind,local_id), UNIQUE(kind,origin,event_id)
         );",
    )
    .map_err(|e| e.to_string())?;
    db.query_row("SELECT origin FROM backup_meta WHERE id=1", [], |r| {
        r.get(0)
    })
    .map_err(|e| e.to_string())
}

/// Export all vocabulary, including soft deletions, as a consistent SQLite snapshot.
pub fn export(db: &Connection) -> Result<String, String> {
    let tx = db.unchecked_transaction().map_err(|e| e.to_string())?;
    let origin = schema(&tx)?;
    let words = {
        let mut q = tx.prepare("SELECT id,original,normalized_key,part_of_speech,meaning_zh,explanation_zh,example_en,translation_language,translation_status,first_seen_at,last_seen_at,encounter_count,deleted_at FROM words ORDER BY id").map_err(|e| e.to_string())?;
        let rows = q
            .query_map([], |r| {
                Ok(Word {
                    id: r.get(0)?,
                    original: r.get(1)?,
                    normalized_key: r.get(2)?,
                    part_of_speech: r.get(3)?,
                    meaning_zh: r.get(4)?,
                    explanation_zh: r.get(5)?,
                    example_en: r.get(6)?,
                    translation_language: r.get(7)?,
                    translation_status: r.get(8)?,
                    first_seen_at: r.get(9)?,
                    last_seen_at: r.get(10)?,
                    encounter_count: r.get(11)?,
                    deleted_at: r.get(12)?,
                })
            })
            .map_err(|e| e.to_string())?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(|e| e.to_string())?
    };
    let encounters = {
        let mut q = tx.prepare("SELECT e.id,e.word_id,COALESCE(o.origin,?1),COALESCE(o.event_id,e.id),e.original,e.seen_at,e.source_sentence FROM encounters e LEFT JOIN backup_event_origins o ON o.kind='encounter' AND o.local_id=e.id ORDER BY e.id").map_err(|e| e.to_string())?;
        let rows = q
            .query_map([&origin], |r| {
                Ok(Encounter {
                    id: r.get(0)?,
                    word_id: r.get(1)?,
                    origin: r.get(2)?,
                    event_id: r.get(3)?,
                    original: r.get(4)?,
                    seen_at: r.get(5)?,
                    source_sentence: r.get(6)?,
                })
            })
            .map_err(|e| e.to_string())?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(|e| e.to_string())?
    };
    let reviews = {
        let mut q = tx.prepare("SELECT r.id,r.word_id,COALESCE(o.origin,?1),COALESCE(o.event_id,r.id),r.rating,r.reviewed_at,r.due_at FROM reviews r LEFT JOIN backup_event_origins o ON o.kind='review' AND o.local_id=r.id ORDER BY r.id").map_err(|e| e.to_string())?;
        let rows = q
            .query_map([&origin], |r| {
                Ok(Review {
                    id: r.get(0)?,
                    word_id: r.get(1)?,
                    origin: r.get(2)?,
                    event_id: r.get(3)?,
                    rating: r.get(4)?,
                    reviewed_at: r.get(5)?,
                    due_at: r.get(6)?,
                })
            })
            .map_err(|e| e.to_string())?;
        rows.collect::<rusqlite::Result<Vec<_>>>()
            .map_err(|e| e.to_string())?
    };
    let backup = Backup {
        format: "PaperVocab".into(),
        version: 1,
        words,
        encounters,
        reviews,
    };
    validate(&backup)?;
    let data = serde_json::to_string_pretty(&backup).map_err(|e| e.to_string())?;
    if data.len() > MAX_BYTES {
        return Err("Backup exceeds 20 MiB".into());
    }
    tx.commit().map_err(|e| e.to_string())?;
    Ok(data)
}

fn text(value: &str, limit: usize, required: bool) -> Result<(), String> {
    if value.len() > limit || value.contains('\0') || (required && value.trim().is_empty()) {
        return Err("Invalid or oversized text field".into());
    }
    Ok(())
}

fn optional_text(value: &Option<String>, limit: usize) -> Result<(), String> {
    if let Some(value) = value {
        text(value, limit, false)?;
    }
    Ok(())
}

fn timestamp(value: &str) -> Result<DateTime<Utc>, String> {
    let date = DateTime::parse_from_rfc3339(value)
        .map_err(|_| "Invalid UTC timestamp")?
        .with_timezone(&Utc);
    if date.to_rfc3339_opts(SecondsFormat::Secs, true) != value
        || !(1970..=9999).contains(&chrono::Datelike::year(&date))
    {
        return Err("Timestamps must be UTC RFC3339 with second precision".into());
    }
    Ok(date)
}

fn event_identity(origin: &str, event_id: i64) -> Result<(), String> {
    if origin.len() != 32
        || !origin
            .bytes()
            .all(|c| c.is_ascii_hexdigit() && !c.is_ascii_uppercase())
        || event_id <= 0
    {
        return Err("Invalid event identity".into());
    }
    Ok(())
}

fn validate(data: &Backup) -> Result<(), String> {
    if data.format != "PaperVocab" || data.version != 1 {
        return Err("Unsupported backup format or version".into());
    }
    if data.words.len() + data.encounters.len() + data.reviews.len() > MAX_RECORDS {
        return Err("Backup exceeds 100000 records".into());
    }
    let mut words = HashSet::new();
    let mut keys = HashSet::new();
    for w in &data.words {
        if w.id <= 0
            || !words.insert(w.id)
            || !keys.insert(&w.normalized_key)
            || w.encounter_count < 0
        {
            return Err("Invalid or duplicate word identity/count".into());
        }
        text(&w.original, 4096, true)?;
        text(&w.normalized_key, 4096, true)?;
        optional_text(&w.part_of_speech, 512)?;
        optional_text(&w.meaning_zh, 16384)?;
        optional_text(&w.explanation_zh, 16384)?;
        optional_text(&w.example_en, 16384)?;
        if !["中文", "English", "Deutsch", "Français", "日本語"]
            .contains(&w.translation_language.as_str())
        {
            return Err("Invalid translation language".into());
        }
        if !["pending", "ready", "failed", "stale", "error", "translated"]
            .contains(&w.translation_status.as_str())
        {
            return Err("Invalid translation status".into());
        }
        if timestamp(&w.first_seen_at)? > timestamp(&w.last_seen_at)? {
            return Err("Invalid word chronology".into());
        }
        if let Some(deleted) = &w.deleted_at {
            timestamp(deleted)?;
        }
    }
    let mut ids = HashSet::new();
    let mut events = HashSet::new();
    for e in &data.encounters {
        if e.id <= 0
            || !ids.insert(e.id)
            || !words.contains(&e.word_id)
            || !events.insert((&e.origin, e.event_id))
        {
            return Err("Invalid, duplicate or orphan encounter".into());
        }
        event_identity(&e.origin, e.event_id)?;
        text(&e.original, 4096, true)?;
        timestamp(&e.seen_at)?;
        optional_text(&e.source_sentence, 16384)?;
    }
    ids.clear();
    events.clear();
    for r in &data.reviews {
        if r.id <= 0
            || !ids.insert(r.id)
            || !words.contains(&r.word_id)
            || !events.insert((&r.origin, r.event_id))
        {
            return Err("Invalid, duplicate or orphan review".into());
        }
        event_identity(&r.origin, r.event_id)?;
        if !["unknown", "familiar", "known"].contains(&r.rating.as_str()) {
            return Err("Invalid review rating".into());
        }
        if timestamp(&r.reviewed_at)? > timestamp(&r.due_at)? {
            return Err("Invalid review chronology".into());
        }
    }
    Ok(())
}

fn local_event(
    db: &Connection,
    kind: &str,
    origin: &str,
    event_id: i64,
    own_origin: &str,
) -> Result<Option<i64>, String> {
    let mapped = db
        .query_row(
            "SELECT local_id FROM backup_event_origins WHERE kind=?1 AND origin=?2 AND event_id=?3",
            params![kind, origin, event_id],
            |r| r.get(0),
        )
        .optional()
        .map_err(|e| e.to_string())?;
    if mapped.is_some() {
        return Ok(mapped);
    }
    if origin == own_origin {
        let table = if kind == "encounter" {
            "encounters"
        } else {
            "reviews"
        };
        return db
            .query_row(
                &format!("SELECT id FROM {table} WHERE id=?1"),
                [event_id],
                |r| r.get(0),
            )
            .optional()
            .map_err(|e| e.to_string());
    }
    Ok(None)
}

/// Validate the complete file before a transaction, then merge without replacing local edits.
pub fn import(db: &mut Connection, json: &str) -> Result<(), String> {
    if json.len() > MAX_BYTES {
        return Err("Backup exceeds 20 MiB".into());
    }
    let backup: Backup =
        serde_json::from_str(json).map_err(|e| format!("Invalid backup JSON: {e}"))?;
    validate(&backup)?;
    let tx = db.transaction().map_err(|e| e.to_string())?;
    let origin = schema(&tx)?;
    let mut mapping = HashMap::new();
    let mut new_words = HashSet::new();
    for w in &backup.words {
        let existing: Option<i64> = tx
            .query_row(
                "SELECT id FROM words WHERE normalized_key=?1",
                [&w.normalized_key],
                |r| r.get(0),
            )
            .optional()
            .map_err(|e| e.to_string())?;
        let id = if let Some(id) = existing {
            id
        } else {
            tx.execute("INSERT INTO words(original,normalized_key,part_of_speech,meaning_zh,explanation_zh,example_en,translation_language,translation_status,first_seen_at,last_seen_at,encounter_count,deleted_at) VALUES(?1,?2,?3,?4,?5,?6,?7,?8,?9,?10,?11,?12)", params![w.original,w.normalized_key,w.part_of_speech,w.meaning_zh,w.explanation_zh,w.example_en,w.translation_language,w.translation_status,w.first_seen_at,w.last_seen_at,w.encounter_count,w.deleted_at]).map_err(|e| e.to_string())?;
            let id = tx.last_insert_rowid();
            new_words.insert(id);
            id
        };
        mapping.insert(w.id, id);
    }
    for e in &backup.encounters {
        let word_id = mapping[&e.word_id];
        if let Some(id) = local_event(&tx, "encounter", &e.origin, e.event_id, &origin)? {
            let existing: (i64, String, String, Option<String>) = tx
                .query_row(
                    "SELECT word_id,original,seen_at,source_sentence FROM encounters WHERE id=?1",
                    [id],
                    |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)),
                )
                .map_err(|e| e.to_string())?;
            if existing
                != (
                    word_id,
                    e.original.clone(),
                    e.seen_at.clone(),
                    e.source_sentence.clone(),
                )
            {
                return Err("Conflicting encounter identity; no data imported".into());
            }
            continue;
        }
        tx.execute(
            "INSERT INTO encounters(word_id,original,seen_at,source_sentence) VALUES(?1,?2,?3,?4)",
            params![word_id, e.original, e.seen_at, e.source_sentence],
        )
        .map_err(|e| e.to_string())?;
        tx.execute("INSERT INTO backup_event_origins(kind,local_id,origin,event_id) VALUES('encounter',?1,?2,?3)", params![tx.last_insert_rowid(),e.origin,e.event_id]).map_err(|e| e.to_string())?;
        if !new_words.contains(&word_id) {
            tx.execute(
                "UPDATE words SET encounter_count=encounter_count+1 WHERE id=?1",
                [word_id],
            )
            .map_err(|e| e.to_string())?;
        }
    }
    for r in &backup.reviews {
        let word_id = mapping[&r.word_id];
        if let Some(id) = local_event(&tx, "review", &r.origin, r.event_id, &origin)? {
            let existing: (i64, String, String, String) = tx
                .query_row(
                    "SELECT word_id,rating,reviewed_at,due_at FROM reviews WHERE id=?1",
                    [id],
                    |r| Ok((r.get(0)?, r.get(1)?, r.get(2)?, r.get(3)?)),
                )
                .map_err(|e| e.to_string())?;
            if existing
                != (
                    word_id,
                    r.rating.clone(),
                    r.reviewed_at.clone(),
                    r.due_at.clone(),
                )
            {
                return Err("Conflicting review identity; no data imported".into());
            }
            continue;
        }
        tx.execute(
            "INSERT INTO reviews(word_id,rating,reviewed_at,due_at) VALUES(?1,?2,?3,?4)",
            params![word_id, r.rating, r.reviewed_at, r.due_at],
        )
        .map_err(|e| e.to_string())?;
        tx.execute("INSERT INTO backup_event_origins(kind,local_id,origin,event_id) VALUES('review',?1,?2,?3)", params![tx.last_insert_rowid(),r.origin,r.event_id]).map_err(|e| e.to_string())?;
    }
    tx.commit().map_err(|e| e.to_string())
}

#[cfg(test)]
mod tests {
    use super::*;

    fn database() -> Connection {
        let db = Connection::open_in_memory().unwrap();
        db.execute_batch("PRAGMA foreign_keys=ON;
            CREATE TABLE words(id INTEGER PRIMARY KEY,original TEXT NOT NULL,normalized_key TEXT UNIQUE NOT NULL,part_of_speech TEXT,meaning_zh TEXT,explanation_zh TEXT,example_en TEXT,translation_language TEXT NOT NULL DEFAULT '中文',translation_status TEXT NOT NULL,first_seen_at TEXT NOT NULL,last_seen_at TEXT NOT NULL,encounter_count INTEGER NOT NULL,deleted_at TEXT);
            CREATE TABLE encounters(id INTEGER PRIMARY KEY,word_id INTEGER NOT NULL REFERENCES words(id),original TEXT NOT NULL,seen_at TEXT NOT NULL,source_sentence TEXT);
            CREATE TABLE reviews(id INTEGER PRIMARY KEY,word_id INTEGER NOT NULL REFERENCES words(id),rating TEXT NOT NULL,reviewed_at TEXT NOT NULL,due_at TEXT NOT NULL);
            CREATE TABLE settings(key TEXT PRIMARY KEY,value TEXT NOT NULL);").unwrap();
        db
    }

    fn seed(db: &Connection) {
        db.execute_batch("INSERT INTO words VALUES(9,'DNA','DNA','noun','deoxyribonucleic acid',NULL,NULL,'English','ready','2026-09-27T00:00:00Z','2026-09-27T00:00:00Z',1,'2026-09-27T01:00:00Z');
            INSERT INTO encounters VALUES(11,9,'DNA','2026-09-27T00:00:00Z','Original sentence');
            INSERT INTO reviews VALUES(13,9,'known','2026-09-27T00:00:00Z','2026-10-04T00:00:00Z');
            INSERT INTO settings VALUES('api_key','SECRET_MUST_NOT_EXPORT');").unwrap();
    }

    fn count(db: &Connection, table: &str) -> i64 {
        db.query_row(&format!("SELECT count(*) FROM {table}"), [], |r| r.get(0))
            .unwrap()
    }

    #[test]
    fn roundtrip_remaps_ids_preserves_soft_deletion_and_has_no_settings() {
        let source = database();
        seed(&source);
        let data = export(&source).unwrap();
        assert!(!data.contains("SECRET_MUST_NOT_EXPORT"));
        assert!(!data.contains("settings"));
        let mut target = database();
        import(&mut target, &data).unwrap();
        assert_eq!(count(&target, "words"), 1);
        assert_eq!(count(&target, "encounters"), 1);
        assert_eq!(count(&target, "reviews"), 1);
        let language: String = target
            .query_row("SELECT translation_language FROM words", [], |r| r.get(0))
            .unwrap();
        assert_eq!(language, "English");
        assert_eq!(count(&target, "settings"), 0);
        let deleted: String = target
            .query_row("SELECT deleted_at FROM words", [], |r| r.get(0))
            .unwrap();
        assert_eq!(deleted, "2026-09-27T01:00:00Z");
        let reexport: Backup = serde_json::from_str(&export(&target).unwrap()).unwrap();
        let original: Backup = serde_json::from_str(&data).unwrap();
        assert_eq!(reexport.encounters[0].origin, original.encounters[0].origin);
        assert_eq!(reexport.encounters[0].event_id, 11);
        assert_ne!(reexport.words[0].id, 9);
        import(&mut target, &data).unwrap();
        import(&mut target, &export(&source).unwrap()).unwrap();
        assert_eq!(count(&target, "encounters"), 1);
        assert_eq!(count(&target, "reviews"), 1);
        import(&mut target, &serde_json::to_string(&reexport).unwrap()).unwrap();
        assert_eq!(count(&target, "encounters"), 1);
    }

    #[test]
    fn merge_preserves_local_edits_and_reviews_and_same_database_is_idempotent() {
        let mut source = database();
        seed(&source);
        let data = export(&source).unwrap();
        import(&mut source, &data).unwrap();
        assert_eq!(count(&source, "reviews"), 1);
        let mut target = database();
        seed(&target);
        target
            .execute(
                "UPDATE words SET meaning_zh='local edit',deleted_at=NULL",
                [],
            )
            .unwrap();
        import(&mut target, &data).unwrap();
        let meaning: String = target
            .query_row("SELECT meaning_zh FROM words", [], |r| r.get(0))
            .unwrap();
        assert_eq!(meaning, "local edit");
        assert_eq!(count(&target, "reviews"), 2);
        import(&mut target, &data).unwrap();
        assert_eq!(count(&target, "reviews"), 2);
        let count: i64 = target
            .query_row("SELECT encounter_count FROM words", [], |r| r.get(0))
            .unwrap();
        assert_eq!(count, 2);
    }

    #[test]
    fn malformed_and_conflicting_backup_rolls_back_all_changes() {
        let source = database();
        seed(&source);
        let data = export(&source).unwrap();
        let mut target = database();
        for mutate in [0, 1, 2, 3, 4, 5] {
            let mut value: serde_json::Value = serde_json::from_str(&data).unwrap();
            match mutate {
                0 => value["version"] = 99.into(),
                1 => value["api_key"] = "secret".into(),
                2 => value["encounters"][0]["word_id"] = 800.into(),
                3 => value["reviews"][0]["rating"] = "invalid".into(),
                4 => value["words"][0]["first_seen_at"] = "invalid".into(),
                _ => value["words"][0]["original"] = "x".repeat(4097).into(),
            }
            assert!(import(&mut target, &value.to_string()).is_err());
            assert_eq!(count(&target, "words"), 0);
        }
        import(&mut target, &data).unwrap();
        let mut value: serde_json::Value = serde_json::from_str(&data).unwrap();
        value["encounters"][0]["original"] = "conflicting event".into();
        value["words"][0]["normalized_key"] = "other".into();
        assert!(import(&mut target, &value.to_string()).is_err());
        assert_eq!(count(&target, "words"), 1);
        assert_eq!(count(&target, "encounters"), 1);
        assert!(import(&mut target, &" ".repeat(MAX_BYTES + 1)).is_err());
    }

    #[test]
    fn legacy_backup_without_translation_language_defaults_to_chinese() {
        let source = database();
        seed(&source);
        let data = export(&source).unwrap();
        let mut value: serde_json::Value = serde_json::from_str(&data).unwrap();
        value["words"][0]
            .as_object_mut()
            .unwrap()
            .remove("translation_language");
        let mut target = database();
        import(&mut target, &value.to_string()).unwrap();
        let language: String = target
            .query_row("SELECT translation_language FROM words", [], |r| r.get(0))
            .unwrap();
        assert_eq!(language, "中文");
    }
}
