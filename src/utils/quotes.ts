import type { Quote } from '@/data/quotes'

// Wählt ein Zitat anhand der Tageszahl und eines Versatzes (für "Neues Zitat").
export function pickQuote(list: readonly Quote[], day: number, offset: number): Quote {
  const quote = list[(day + offset) % list.length]
  if (!quote) {
    throw new Error('Keine Zitate vorhanden')
  }
  return quote
}
