// WKWebView versions without showPicker still get an editable date control.
export function openNativeDatePicker(input: { showPicker?: () => void } | null): boolean {
  if (typeof input?.showPicker !== "function") return false;
  try {
    input.showPicker();
    return true;
  } catch (error) {
    if (error instanceof DOMException && ["NotSupportedError", "NotAllowedError", "InvalidStateError"].includes(error.name)) return false;
    throw error;
  }
}

export function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  if (year < 1 || month < 1 || month > 12 || day < 1) return false;
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return day <= days[month - 1];
}
