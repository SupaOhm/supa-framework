import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATES_DIR = join(__dirname, '..', 'templates');

const AGENTS = ['architect', 'engineer', 'reviewer'];

function applyPlaceholders(content, { projectName, projectType }) {
  return content
    .replaceAll('{{PROJECT_NAME}}', projectName)
    .replaceAll('{{PROJECT_TYPE}}', projectType);
}

async function copyTemplate(srcPath, destPath, vars) {
  const raw = await readFile(srcPath, 'utf8');
  const filled = applyPlaceholders(raw, vars);
  await mkdir(dirname(destPath), { recursive: true });
  await writeFile(destPath, filled);
  return destPath;
}

/**
 * Generate the Supa engineering organization into `targetDir`.
 * @param {object} opts
 * @param {string} opts.projectName
 * @param {string} opts.projectType
 * @param {string} [opts.targetDir] - defaults to cwd
 * @returns {Promise<string[]>} list of generated file paths
 */
export async function generate({ projectName, projectType, targetDir = process.cwd() }) {
  const vars = { projectName, projectType };
  const generated = [];

  // CLAUDE.md at project root
  generated.push(
    await copyTemplate(
      join(TEMPLATES_DIR, 'CLAUDE.md'),
      join(targetDir, 'CLAUDE.md'),
      vars
    )
  );

  // Agent definitions into .claude/agents/
  for (const agent of AGENTS) {
    generated.push(
      await copyTemplate(
        join(TEMPLATES_DIR, 'agents', `${agent}.md`),
        join(targetDir, '.claude', 'agents', `${agent}.md`),
        vars
      )
    );
  }

  return generated;
}
