export function normalizeText(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s.+/#-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function containsKeyword(text: string, keyword: string) {
  return normalizeText(text).includes(normalizeText(keyword));
}

export function uniqueValues(values: string[]) {
  return Array.from(new Set(values));
}