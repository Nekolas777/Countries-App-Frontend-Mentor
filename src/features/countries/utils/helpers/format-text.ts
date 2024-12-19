export function formatText(text: string): string {
  return text.trim().toLowerCase();
}

export function capitalizeText(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function joinText(texts: string[]): string {
  return texts.join(', ');
}