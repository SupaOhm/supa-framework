# Supa Framework

Generate a ready-made AI engineering organization into any project with one command.

![npm version](https://img.shields.io/npm/v/supa-framework)
![license](https://img.shields.io/npm/l/supa-framework)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue)

## What it is

Supa Framework generates a ready-made AI engineering organization into any project — a `CLAUDE.md` and three Claude Code subagents (Architect, Engineer, Reviewer) — with one command. It is a generator, not a runtime: it writes the files and gets out of the way. Once a project is initialized, Supa Framework can be removed entirely and nothing it generated depends on it.

## What gets generated

```
your-project/
├── CLAUDE.md
└── .claude/
    └── agents/
        ├── architect.md
        ├── engineer.md
        └── reviewer.md
```

- `CLAUDE.md` — project context and the Plan → Implement → Review convention.
- `architect.md` — plans features, makes technology decisions, never writes code.
- `engineer.md` — implements the plan, writes tests, flags blockers.
- `reviewer.md` — reviews for correctness, security, and quality; gives a verdict.

## Installation

```bash
npm install -g supa-framework
```

## Usage

```bash
supa init
```

You will be prompted for a project name and type:

```
Project name: Finance PWA
Project type:
  1) web-app
  2) mobile
  3) ai-saas
  4) other
Choose [1-4]: 1
```

On success:

```
Done. Generated:
  ✓ CLAUDE.md
  ✓ .claude/agents/architect.md
  ✓ .claude/agents/engineer.md
  ✓ .claude/agents/reviewer.md

Plan → Implement → Review. Happy building.
```

## How to use the generated organization

After init, the three agents are available in Claude Code:

- Use `@architect` to plan a feature before writing any code.
- Use `@engineer` when you have a plan and need implementation.
- Use `@reviewer` after implementation to review before merging.

## The workflow

```
Plan → Implement → Review
```

- **Plan** — the Architect breaks the feature into tasks and makes design decisions.
- **Implement** — the Engineer builds the plan and writes tests.
- **Review** — the Reviewer checks correctness, security, and quality, then gives a verdict.

## Development (for contributors)

```bash
git clone https://github.com/SupaOhm/supa-framework
cd supa-framework
npm install

# Run CLI locally without building
npm run dev -- init

# Build
npm run build

# Run built CLI
npm start -- init
```

## Test locally in another project

```bash
npm run build
npm link
cd ~/your-other-project
supa init

# To remove
npm unlink -g supa-framework
```

## Project structure

```
supa-framework/
├── src/
│   ├── cli/index.ts       # CLI entry point
│   └── generator/index.ts # Template engine
├── templates/
│   ├── CLAUDE.md          # Root context template
│   └── agents/
│       ├── architect.md
│       ├── engineer.md
│       └── reviewer.md
├── presets/
│   └── default.json
└── docs/
    └── vision.md
```

## Roadmap

- [x] v0.1 — core 3 agents + CLAUDE.md
- [ ] v0.2 — feature and bugfix workflow templates
- [ ] v0.3 — presets (solo-founder, startup, ai-product)
- [ ] v1.0 — npm publish + CI

## License

MIT © 2026 Supakorn Prayongyam
