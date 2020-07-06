export function formatTitle(text: string) {
  return text.replace(/[^a-z0-9'",.!]+/gi, " ").replace(/\b[a-z]/gi, (s) => s.toUpperCase())
}
