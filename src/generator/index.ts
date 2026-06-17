import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

export interface ProjectConfig {
  name: string;
  type: string;
}

const __dirname = dirname(fileURLToPath(import.meta.url));
// dist/generator/index.js -> repo root is two levels up; templates ship alongside source.
const TEMPLATES_DIR = join(__dirname, '..', '..', 'templates');

const AGENTS = ['architect', 'engineer', 'reviewer'] as const;

function applyPlaceholders(content: string, config: ProjectConfig): string {
  return content
    .replaceAll('{{PROJECT_NAME}}', config.name)
    .replaceAll('{{PROJECT_TYPE}}', config.type);
}

async function copyTemplate(
  srcPath: string,
  destPath: string,
  config: ProjectConfig,
): Promise<void> {
  const raw = await readFile(srcPath, 'utf8');
  const filled = applyPlaceholders(raw, config);
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, filled);
}

/**
 * Generate the Supa engineering organization into `targetDir`.
 * Writes a root CLAUDE.md and the Architect/Engineer/Reviewer subagents
 * into `.claude/agents/`, replacing template placeholders with `config` values.
 */
export async function generate(config: ProjectConfig, targetDir: string): Promise<void> {
  await copyTemplate(
    join(TEMPLATES_DIR, 'CLAUDE.md'),
    join(targetDir, 'CLAUDE.md'),
    config,
  );

  for (const agent of AGENTS) {
    await copyTemplate(
      join(TEMPLATES_DIR, 'agents', `${agent}.md`),
      join(targetDir, '.claude', 'agents', `${agent}.md`),
      config,
    );
  }
}

/** Paths (relative to target) this generator writes, for reporting in the CLI. */
export const GENERATED_FILES: readonly string[] = [
  'CLAUDE.md',
  ...AGENTS.map((a) => join('.claude', 'agents', `${a}.md`)),
];
