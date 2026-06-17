#!/usr/bin/env node
import { createInterface } from 'node:readline/promises';
import { stdin, stdout, argv, cwd, exit } from 'node:process';
import { relative } from 'node:path';
import { generate } from '../generator/index.js';

const PROJECT_TYPES = ['web app', 'mobile', 'AI SaaS', 'other'];

/**
 * Prompt-then-read a single line using the readline async iterator.
 * Unlike `rl.question`, the iterator yields lines that were already
 * buffered when stdin is a pipe that has since closed.
 */
async function ask(lines, prompt) {
  stdout.write(prompt);
  const { value, done } = await lines.next();
  return done ? '' : value.trim();
}

async function init() {
  const rl = createInterface({ input: stdin, output: stdout });
  const lines = rl[Symbol.asyncIterator]();

  try {
    stdout.write('\n  Supa Framework — AI engineering organization generator\n');
    stdout.write('  Generates CLAUDE.md and three Claude Code subagents.\n\n');

    let projectName = await ask(lines, '  Project name: ');
    if (!projectName) projectName = 'My Project';

    stdout.write('\n  Project type:\n');
    PROJECT_TYPES.forEach((t, i) => stdout.write(`    ${i + 1}) ${t}\n`));
    const choice = await ask(lines, '  Choose [1-4]: ');
    const idx = Number.parseInt(choice, 10) - 1;
    const projectType = PROJECT_TYPES[idx] ?? 'other';

    const files = await generate({ projectName, projectType, targetDir: cwd() });

    stdout.write('\n  Done. Generated:\n');
    for (const f of files) {
      stdout.write(`    ✓ ${relative(cwd(), f)}\n`);
    }
    stdout.write('\n  Plan → Implement → Review. Happy building.\n\n');
  } finally {
    rl.close();
  }
}

async function main() {
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

main().catch((err) => {
  stdout.write(`\n  Error: ${err.message}\n\n`);
  exit(1);
});
