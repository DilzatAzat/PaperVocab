import { useEffect, useRef, useState, type ReactNode } from "react";
import { listen } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { BookMarked, CalendarDays, Check, CircleAlert, ChevronRight, LibraryBig, Languages, Minimize2, Maximize2, RotateCcw, Search, Settings2, Sparkles, Trash2, X } from "lucide-react";
import { api, Settings, Word } from "./api";

type Page = "library" | "review" | "settings";
type CaptureEvent = { word_id: number; original: string; status: string; message?: string; word?: Word };

const tauriAvailable = typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
const isPopup = tauriAvailable && getCurrentWindow().label === "capture";
const defaultSettings: Settings = { api_base_url: "https://api.openai.com/v1", model: "gpt-4o-mini", target_language: "中文", shortcut: "CTRL+SHIFT+L", has_api_key: false, shortcut_error: null };

function formatTime(value: string) {
  return new Date(value.endsWith("Z") ? value : `${value}Z`).toLocaleString("zh-CN", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" });
}

export function App() {
  const [page, setPage] = useState<Page>(isPopup ? "library" : "library");
  const [words, setWords] = useState<Word[]>([]);
  const [reviews, setReviews] = useState<Word[]>([]);
  const [libraryTotal, setLibraryTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [settings, setSettings] = useState<Settings | null>(null);
  const [capture, setCapture] = useState<CaptureEvent | null>(null);
  const activeCaptureId = useRef<number | null>(null);
  const [error, setError] = useState("");
  const [manual, setManual] = useState("");
  const [sentence, setSentence] = useState("");

  const reload = async () => {
    try {
      setError("");
      if (!tauriAvailable) { setSettings((current) => current || defaultSettings); return; }
      const [nextWords, nextReviews, allWords] = await Promise.all([api.words(query, date || undefined), api.dueReviews(), api.words()]);
      setWords(nextWords); setReviews(nextReviews); setLibraryTotal(allWords.length);
      if (!settings) setSettings(await api.settings());
    } catch (e) { setError(String(e)); }
  };

  useEffect(() => { if (!isPopup) void reload(); }, [page, query, date]);
  useEffect(() => {
    if (!tauriAvailable) return;
    let unlisten: (() => void) | undefined;
    void listen<CaptureEvent>("capture-status", async (event) => {
      if (event.payload.status === "saved" && event.payload.word_id) {
        activeCaptureId.current = event.payload.word_id;
      }
      if (event.payload.status === "saved" || event.payload.status === "translated" || event.payload.status === "failed") {
        await reload();
      }
      if (event.payload.word_id && activeCaptureId.current && event.payload.word_id !== activeCaptureId.current) return;
      setCapture(event.payload);
      if (event.payload.status === "saved" || event.payload.status === "loading" || event.payload.status === "translated" || event.payload.status === "failed") {
        const popup = await WebviewWindow.getByLabel("capture");
        if (popup && !isPopup) await popup.show();
      }
    }).then((fn) => { unlisten = fn; });
    return () => { unlisten?.(); };
  }, [query, date, page, settings]);

  if (isPopup) return <CapturePopup capture={capture} />;

  const addManual = async () => {
    if (!manual.trim()) return;
    if (!tauriAvailable) { setError("手动收词需要在 PaperVocab 桌面版中使用"); return; }
    try { await api.addManual(manual.trim(), sentence.trim()); setManual(""); setSentence(""); await reload(); }
    catch (e) { setError(String(e)); }
  };

  return <div className="app-shell">
    <WindowTitlebar />
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark">P</span><span>PaperVocab</span></div>
      <div className="sidebar-caption">阅读伴侣</div>
      <nav>
        <NavButton active={page === "library"} onClick={() => setPage("library")} label="收词汇总" count={libraryTotal} icon={<LibraryBig />} />
        <NavButton active={page === "review"} onClick={() => setPage("review")} label="到期复习" count={reviews.length} icon={<BookMarked />} />
      </nav>
      <div className="sidebar-spacer" />
      <NavButton active={page === "settings"} onClick={() => setPage("settings")} label="设置" icon={<Settings2 />} />
      <div className="shortcut-hint">全局取词<br /><kbd>{settings?.shortcut || "Ctrl + Shift + L"}</kbd></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div><div className="eyebrow">LOCAL LIBRARY</div><h1>{page === "library" ? "收词汇总" : page === "review" ? "到期复习" : "设置"}</h1></div><div className="topbar-meta"><div className="local-status"><span className="status-pulse" />本地数据</div><span className="language-chip"><Languages size={14} />{settings?.target_language || "中文"}</span></div></header>
      {error && <div className="error-banner"><CircleAlert size={16} />{error}</div>}
      {page === "settings" ? <SettingsPanel settings={settings} onSaved={(next) => setSettings(next)} /> : page === "review" ? <ReviewPanel words={reviews} onReview={async (id, rating) => { await api.review(id, rating); await reload(); }} /> : <>
        <section className="capture-strip"><div className="capture-intro"><div className="capture-icon"><Sparkles size={17} /></div><div><strong>快速收词</strong><span>在 PDF 或浏览器选中英文，按全局快捷键即可保存</span></div></div><div className="manual-entry"><input value={manual} onChange={(e) => setManual(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") void addManual(); }} placeholder="手动输入单词或短语" /><input value={sentence} onChange={(e) => setSentence(e.target.value)} placeholder="原句（可选）" /><button onClick={() => void addManual()}>收录</button></div></section>
        <section className="summary-strip"><div><span className="summary-label">当前筛选结果</span><strong>{words.length}</strong></div><div><span className="summary-label">本地词库总数</span><strong>{libraryTotal}</strong></div><span className="summary-note">重复遇见会更新记录，不会重复创建单词</span></section>
        <section className="library-toolbar"><div className="search-box"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="搜索单词或释义" /></div><div className="filter-actions"><label className="date-filter"><CalendarDays size={15} />日期 <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>{date && <button className="clear-filter" onClick={() => setDate("")}><X size={14} />清除</button>}</div></section>
        <WordList words={words} onDelete={async (id) => { await api.deleteWord(id); await reload(); }} onRetry={async (id) => { await api.retry(id); await reload(); }} />
      </>}
    </main>
  </div>;
}

function WindowTitlebar() {
  const window = tauriAvailable ? getCurrentWindow() : null;
  return <div className="window-titlebar"><div className="window-title" data-tauri-drag-region><span className="brand-mark tiny">P</span><span>PaperVocab</span></div>{window && <div className="window-controls"><button title="最小化" aria-label="最小化" onClick={() => void window.minimize()}><Minimize2 size={14} /></button><button title="最大化或还原" aria-label="最大化或还原" onClick={() => void window.toggleMaximize()}><Maximize2 size={14} /></button><button className="window-close" title="关闭并驻留托盘" aria-label="关闭并驻留托盘" onClick={() => void window.close()}><X size={15} /></button></div>}</div>;
}

function NavButton({ active, onClick, label, count, icon }: { active: boolean; onClick: () => void; label: string; count?: number; icon: ReactNode }) { return <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick}><span className="nav-icon">{icon}</span><span>{label}</span>{count !== undefined && <span className="nav-count">{count}</span>}</button>; }

function WordList({ words, onDelete, onRetry }: { words: Word[]; onDelete: (id: number) => Promise<void>; onRetry: (id: number) => Promise<void> }) { return <section className="word-list"><div className="list-head"><span>单词</span><span>释义</span><span>最近收词</span><span>操作</span></div>{words.length === 0 ? <div className="empty-state"><div className="empty-icon"><LibraryBig size={30} /></div><h2>还没有收词</h2><p>在阅读器中选中英文后按快捷键，或使用上方输入框。</p></div> : words.map((word) => <article className="word-row" key={word.id}><div><div className="word-original">{word.original}</div><div className="word-meta">{word.part_of_speech || "待翻译"} · 遇见 {word.encounter_count} 次</div></div><div className="meaning">{word.translation_status === "pending" ? <span className="muted">翻译中…</span> : word.translation_status === "stale" ? <button className="link-button" onClick={() => void onRetry(word.id)}>目标语言已改变，重新翻译 <ChevronRight size={13} /></button> : word.translation_status === "failed" ? <button className="link-button" onClick={() => void onRetry(word.id)}>翻译失败，重试 <RotateCcw size={13} /></button> : <><strong>{word.meaning_zh || "暂无释义"}</strong>{word.explanation_zh && <span>{word.explanation_zh}</span>}</>}</div><time>{formatTime(word.last_seen_at)}</time><button className="icon-button" title="删除" aria-label={`删除 ${word.original}`} onClick={() => void onDelete(word.id)}><Trash2 size={16} /></button></article>)}</section>; }

function ReviewPanel({ words, onReview }: { words: Word[]; onReview: (id: number, rating: string) => Promise<void> }) { const [index, setIndex] = useState(0); const [show, setShow] = useState(false); const [busy, setBusy] = useState(false); const word = words[index]; if (!word) return <div className="empty-state review-empty"><div className="empty-icon"><Check size={30} /></div><h2>今天没有到期单词</h2><p>新收的词也可以在这里主动复习。</p></div>; const rate = async (rating: string) => { if (busy) return; setBusy(true); try { await onReview(word.id, rating); setShow(false); setIndex(0); } finally { setBusy(false); } }; return <section className="review-panel"><div className="review-progress">{index + 1} / {words.length}</div><div className="review-card"><div className="review-word">{word.original}</div>{show ? <div className="review-answer">{word.translation_status === "stale" ? <><span>释义语言已改变</span><strong>请先重新翻译</strong><p>在单词列表中点击“目标语言已改变，重新翻译”。</p></> : <><span>{word.part_of_speech}</span><strong>{word.meaning_zh || "暂无释义"}</strong><p>{word.explanation_zh}</p></>}</div> : <button className="primary-button reveal" onClick={() => setShow(true)}>查看释义</button>}</div>{show && <div className="rating-row"><button disabled={busy} onClick={() => void rate("unknown")}>不认识</button><button disabled={busy} onClick={() => void rate("familiar")}>有点印象</button><button disabled={busy} className="primary-button" onClick={() => void rate("known")}>认识</button></div>}</section>; }

function SettingsPanel({ settings, onSaved }: { settings: Settings | null; onSaved: (settings: Settings) => void }) { const [baseUrl, setBaseUrl] = useState(settings?.api_base_url || "https://api.openai.com/v1"); const [model, setModel] = useState(settings?.model || "gpt-4o-mini"); const [targetLanguage, setTargetLanguage] = useState(settings?.target_language || "中文"); const [key, setKey] = useState(""); const [shortcut, setShortcut] = useState(settings?.shortcut || "CTRL+SHIFT+L"); const [message, setMessage] = useState(""); useEffect(() => { if (settings) { setBaseUrl(settings.api_base_url); setModel(settings.model); setTargetLanguage(settings.target_language); setShortcut(settings.shortcut); } }, [settings]); const save = async () => { if (!tauriAvailable) { setMessage("请在 PaperVocab 桌面版中保存设置"); return; } try { const next = await api.saveSettings(baseUrl, model, targetLanguage, key, shortcut); onSaved(next); setKey(""); setMessage("设置已保存"); } catch (e) { setMessage(String(e)); } }; return <section className="settings-panel"><div className="settings-intro"><div className="eyebrow">TRANSLATION</div><h2>翻译服务</h2><p>当前支持 OpenAI Chat Completions 兼容协议，请求在本机后端发出，密钥保存在 Windows 凭据管理器中。兼容该协议的服务可以使用；原生 Anthropic 等其他协议暂不支持。</p></div><label>API Base URL<input value={baseUrl} onChange={(e) => setBaseUrl(e.target.value)} placeholder="https://api.openai.com/v1" /></label><label>模型<input value={model} onChange={(e) => setModel(e.target.value)} placeholder="gpt-4o-mini" /></label><label>API 密钥<input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder={settings?.has_api_key ? "已保存，留空表示不修改" : "sk-…"} /></label><label>目标语言<select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}><option value="中文">中文</option><option value="English">English</option><option value="Deutsch">Deutsch</option><option value="Français">Français</option><option value="日本語">日本語</option></select></label><div className="settings-divider" /><div className="settings-intro"><div className="eyebrow">CAPTURE</div><h2>全局取词</h2><p>快捷键会等待你松开组合键，再模拟 Ctrl+C 读取选区；完成取词后会尽量恢复原有文字或图片剪贴板。</p></div>{settings?.shortcut_error && <div className="error-banner settings-error">{settings.shortcut_error}</div>}<label>快捷键<input value={shortcut} onChange={(e) => setShortcut(e.target.value.toUpperCase())} placeholder="CTRL+SHIFT+L" /></label><div className="settings-actions"><button className="primary-button" onClick={() => void save()}>保存设置</button>{message && <span className="save-message">{message}</span>}</div></section>; }

function CapturePopup({ capture }: { capture: CaptureEvent | null }) { const hide = () => void getCurrentWindow().hide(); return <div className="popup-shell"><div className="popup-top"><div className="popup-brand"><span className="brand-mark small">P</span><span>PaperVocab</span></div><button className="popup-close-icon" aria-label="关闭取词浮窗" title="关闭" onClick={hide}><X size={16} /></button></div>{capture ? <><div className="popup-word">{capture.original}</div>{capture.status === "loading" || capture.status === "saved" ? <div className="popup-loading"><span className="spinner" />正在获取释义…</div> : capture.status === "failed" ? <div className="popup-fail"><strong>暂时无法翻译</strong><span>{capture.message || "请稍后重试"}</span></div> : <div className="popup-result"><div className="popup-pos">{capture.word?.part_of_speech}</div><strong>{capture.word?.meaning_zh || "暂无释义"}</strong><p>{capture.word?.explanation_zh}</p>{capture.word?.example_en && <div className="example"><span>生成例句</span>{capture.word.example_en}</div>}</div>}</> : <div className="popup-loading">等待选中的文本…</div>}<button className="popup-close" onClick={hide}>关闭</button></div>; }
