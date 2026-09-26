import { invoke } from "@tauri-apps/api/core";

export type TranslationStatus = "pending" | "translated" | "failed";
export type Word = {
  id: number;
  original: string;
  normalized_key: string;
  part_of_speech: string | null;
  meaning_zh: string | null;
  explanation_zh: string | null;
  example_en: string | null;
  translation_status: TranslationStatus;
  first_seen_at: string;
  last_seen_at: string;
  encounter_count: number;
};
export type Encounter = { id: number; word_id: number; original: string; seen_at: string; source_sentence: string | null };
export type Review = { id: number; word_id: number; rating: string; reviewed_at: string; due_at: string };
export type Settings = { api_base_url: string; model: string; domain: string; shortcut: string; has_api_key: boolean };

export const api = {
  words: (search?: string, date?: string) => invoke<Word[]>("list_words", { search: search || null, date: date || null }),
  encounters: (date?: string) => invoke<Encounter[]>("list_encounters", { date: date || null }),
  dueReviews: (date?: string) => invoke<Word[]>("list_due_reviews", { date: date || null }),
  addManual: (original: string, sentence: string) => invoke<Word>("add_manual_word", { original, sentence: sentence || null }),
  deleteWord: (id: number) => invoke<void>("delete_word", { id }),
  undoDelete: (id: number) => invoke<void>("undo_delete", { id }),
  review: (wordId: number, rating: string) => invoke<Review>("save_review", { wordId, rating }),
  settings: () => invoke<Settings>("get_settings"),
  saveSettings: (baseUrl: string, model: string, domain: string, apiKey: string, shortcut: string) =>
    invoke<Settings>("save_settings", { baseUrl, model, domain, apiKeyValue: apiKey || null, shortcut }),
  retry: (wordId: number) => invoke<void>("retry_translation", { wordId }),
};
