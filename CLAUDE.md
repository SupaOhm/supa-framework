# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run build        # tsc → dist/
npm run dev -- init  # run CLI via tsx without building (pass args after --)
npm start -- init    # run built dist CLI
```

No test runner or linter is configured yet.

## Architecture

Supa Framework is a CLI generator. It copies and fills Markdown templates into a target project; it has no runtime presence after generation.

**Two source files, that's it:**

- `src/cli/index.ts` — parses `argv[2]` (`init` | `help`), prompts via `readline/promises` async iterator, calls `generate()`, prints results. Uses the iterator pattern (not `rl.question`) so piped stdin works correctly.
- `src/generator/index.ts` — exports `generate(config: ProjectConfig, targetDir: string)` and `GENERATED_FILES`. Resolves `TEMPLATES_DIR` relative to `__dirname` so it works from both `dist/` (built) and `src/` (tsx dev). Copies four templates, replacing `{{PROJECT_NAME}}` and `{{PROJECT_TYPE}}`.

**Templates** (`templates/`) are plain Markdown with those two placeholders. Agent files have YAML frontmatter (`name`, `description`, `tools`) for Claude Code subagent registration.

**Output** (always written to `targetDir = cwd()` at runtime):
```
CLAUDE.md
.claude/agents/architect.md
.claude/agents/engineer.md
.claude/agents/reviewer.md
```

## Key constraints

- No external runtime dependencies — Node built-ins only in `src/`.
- `strict: true`, no `any`.
- Module system: `"type": "module"` + `"module": "NodeNext"` — use `.js` extensions on all local imports in TypeScript (e.g. `from '../generator/index.js'`).
- `TEMPLATES_DIR` path: `join(__dirname, '..', '..', 'templates')` — two levels up from `dist/generator/` reaches repo root.
