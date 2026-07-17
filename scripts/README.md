# Content translation

Generate `es` / `fr` / `zh` / `vi` Hugo content from English sources via DeepL.

## Setup

1. DeepL API key in `.env` (gitignored):

   ```
   DeepL_API_KEY=your-key-here
   ```

   (`DEEPL_API_KEY` also works.) Free-tier keys end in `:fx`.

2. Install deps: `npm install`

## Usage

```bash
npm run translate
```

Translates:

- `content/_index.md`
- `content/faq.md`
- `content/community.md`
- `content/documentation.md`

Skips `CHARTER.md`. Writes `content/*.{es,fr,zh,vi}.md`.

## Cache

Translations are cached by SHA-256 of each English **block** (blank-line segments; fenced code never translated) in `scripts/.translate-cache.json`.

- Edit one English paragraph → only that block is re-billed.
- Second run with no English changes → zero API calls.
- Commit the cache with the generated `.md` files so clones stay cheap.

## Hand-fixing a translation

Edit the locale file directly (e.g. `content/faq.es.md`). The cache keys off the **English** source hash, so your edit survives until that English block changes. After the English block changes, DeepL overwrites the locale block on the next `npm run translate`.

## Reset cache

```bash
rm scripts/.translate-cache.json
npm run translate
```
