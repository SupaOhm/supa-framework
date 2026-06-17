#!/usr/bin/env node
import { createInterface } from 'node:readline/promises';
import { stdin, stdout, argv, cwd, exit } from 'node:process';
import { generate, GENERATED_FILES, type ProjectConfig } from '../generator/index.js';

const PROJECT_TYPES = ['web-app', 'mobile', 'ai-saas', 'other'] as const;
type ProjectType = (typeof PROJECT_TYPES)[number];

/**
 * Prompt-then-read a single line via the readline async iterator.
 * Unlike `rl.question`, the iterator yields lines already buffered when
 * stdin is a pipe that has since closed.
 */
async function ask(
  lines: AsyncIterableIterator<string>,
  prompt: string,
): Promise<string> {
  stdout.write(prompt);
  const { value, done } = await lines.next();
  return done ? '' : value.trim();
}

async function init(): Promise<void> {
  const rl = createInterface({ input: stdin, output: stdout });
  const lines = rl[Symbol.asyncIterator]();

  try {
    stdout.write('\n  Supa Framework — AI engineering organization generator\n');
    stdout.write('  Generates CLAUDE.md and three Claude Code subagents.\n\n');

    const nameInput = await ask(lines, '  Project name: ');
    const name = nameInput || 'My Project';

    stdout.write('\n  Project type:\n');
    PROJECT_TYPES.forEach((t, i) => stdout.write(`    ${i + 1}) ${t}\n`));
    const choice = await ask(lines, '  Choose [1-4]: ');
    const idx = Number.parseInt(choice, 10) - 1;
    const type: ProjectType = PROJECT_TYPES[idx] ?? 'other';

    const config: ProjectConfig = { name, type };
    await generate(config, cwd());

    stdout.write('\n  Done. Generated:\n');
    for (const file of GENERATED_FILES) {
      stdout.write(`    ✓ ${file}\n`);
    }
    stdout.write('\n  Plan → Implement → Review. Happy building.\n\n');
  } finally {
    rl.close();
  }
}

async function main(): Promise<void> {
  const command = argv[2];

  switch (command) {
    case 'init':
      await init();
      break;
    case undefined:
    case 'help':
    case '--help':
    case '-h':
      stdout.write('\n  supa — AI engineering organization generator\n\n');
      stdout.write('  Usage:\n');
      stdout.write('    supa init    Generate CLAUDE.md and core subagents\n\n');
      break;
    default:
      stdout.write(`\n  Unknown command: ${command}\n  Run "supa init".\n\n`);
      exit(1);
  }
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  stdout.write(`\n  Error: ${message}\n\n`);
  exit(1);
});
