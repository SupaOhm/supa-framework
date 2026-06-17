# Supa Framework — Vision

## Problem

Starting a serious project with Claude Code means re-building the same scaffolding every time: a `CLAUDE.md`, a set of subagents, and the conventions that keep them working together. Most people either skip it (and get unstructured, ad-hoc AI work) or rebuild it by hand on every repo. There is no fast, opinionated default.

## Vision

**One command produces a ready-made AI engineering organization inside any project.**

Run `supa init`, answer two questions, and walk away with a working team of Claude Code subagents and the conventions that govern them — already wired into the repo.

Supa Framework is a generator, not a runtime. It writes files and then gets out of the way. Once a project is initialized, Supa can be removed entirely; nothing it generated depends on it.

## The Organization

The default preset installs a three-role engineering org modeled on how good software teams actually work:

- **Architect** — breaks features into tasks, makes technology and design decisions, and produces a written plan. Considers edge cases, scalability, and security at design time. Never writes implementation code.
- **Engineer** — implements the Architect's plan cleanly and completely, writes tests alongside code, and flags blockers instead of guessing. Does not over-engineer.
- **Reviewer** — reviews the Engineer's work for correctness, edge cases, security, and quality. Confirms it matches the plan. Gives actionable feedback; does not rewrite code.

These three enforce one core workflow:

> **Plan → Implement → Review**

No code without a clear task. Always plan before implementing. Every feature passes through all three roles.

## Principles

- **Fast start.** Value in one command, not a tutorial.
- **No runtime dependency.** Generate and disappear. The output is plain Markdown and config the user owns.
- **Opinionated defaults, replaceable parts.** The default preset is a strong starting point; presets and templates are meant to be forked and customized.
- **Built on Claude Code primitives.** Subagents, `CLAUDE.md`, and conventions — nothing exotic.

## Roadmap (Indicative)

- Additional presets beyond `default` (e.g. solo-dev, research, full-stack team).
- More workflows beyond `feature` and `bugfix`.
- Custom role authoring and preset sharing.

## Non-Goals

- Not a CI system, task runner, or orchestration engine.
- Not a replacement for human engineering judgment.
- Not a long-lived dependency in the user's project.
