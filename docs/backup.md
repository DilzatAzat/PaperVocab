# JSON backups

`backup::export(&Connection)` returns a version 1 JSON string. `backup::import(&mut Connection, &str)` validates and merges it in a transaction. Register these functions through desktop commands; the caller should hold the database mutex for the call.

The file contains `format: PaperVocab`, `version: 1`, all words (including soft deletions), encounter events and review events. Export never reads settings or credentials. Generated example fields remain separate from encounter source sentences.

Import remaps local numeric IDs by the exact normalized key. Existing word fields, definitions and deletion state are preserved. Missing words retain the original backup values. New events are added; existing reviews are never replaced. Existing word encounter counts increment only for newly imported encounters. Imported older/newer encounters do not replace the existing word timestamps.

Two small metadata tables are lazily initialized within the backup transaction: `backup_meta` holds a random 128-bit database origin; `backup_event_origins` maps an imported event's stable `(kind, origin, event_id)` to its local numeric ID. This adds tables, not columns, and does not change `PRAGMA user_version`. Keep these tables during future migrations. Re-export preserves imported provenance, and repeated import is idempotent. An event identity with changed content is rejected and rolls back the entire import. Events independently created in different databases are intentionally distinct even when their text/time match.

Limits: 20 MiB JSON; 100,000 total records; strict known fields; positive unique IDs; valid references; bounded strings; UTC RFC3339 timestamps with second precision; recognized translation statuses and review ratings. Version 1 rejects other versions instead of guessing a migration. Backups contain reading and review history; store them privately. They are plain JSON, not encrypted.
