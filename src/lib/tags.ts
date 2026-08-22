/**
 * Tags are canonicalized to a lowercase kebab-case slug for URLs, so
 * "DLT" and "dlt" resolve to the same tag page. Display labels are the
 * lowercase form (spaces kept), matching the design's lowercase mono chips.
 */
export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function tagLabel(tag: string): string {
  return tag.toLowerCase().trim()
}
