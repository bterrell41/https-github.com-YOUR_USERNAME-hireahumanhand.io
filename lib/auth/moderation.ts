
const BANNED_KEYWORDS = [
    'illegal',
    'hack',
    'dox',
    'drug',
    'weapon',
    'malware',
    'exam',
    'homework' // Academic dishonesty
]

export function checkContentSafety(text: string): { safe: boolean; reason?: string } {
    const lower = text.toLowerCase()

    for (const word of BANNED_KEYWORDS) {
        if (lower.includes(word)) {
            return { safe: false, reason: `Contains prohibited keyword: ${word}` }
        }
    }

    return { safe: true }
}
