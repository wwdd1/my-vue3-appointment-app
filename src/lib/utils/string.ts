export function ellipsis(input: string, charLength: number): string {
  if (input.length < charLength) {
    return input
  }
  return `${input.slice(0, charLength)}...`
}

export function initials(input: string) {
  return input
    .trim()
    .split(/\s+/)
    .map((s) => s[0])
    .join('')
    .toUpperCase()
}
