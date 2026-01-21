import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();

const src = path.join(
  projectRoot,
  'node_modules',
  'pdfjs-dist',
  'build',
  'pdf.worker.min.mjs'
);

const destDir = path.join(projectRoot, 'public', 'pdfjs');
// Use .js extension so IIS/static servers reliably serve it with a JS MIME type.
// The worker content is still ESM and will be loaded as a module worker by PDF.js.
const dest = path.join(destDir, 'pdf.worker.min.js');

async function main() {
  await fs.mkdir(destDir, { recursive: true });
  await fs.copyFile(src, dest);
  console.log(`Copied PDF.js worker: ${path.relative(projectRoot, src)} -> ${path.relative(projectRoot, dest)}`);
}

main().catch((err) => {
  console.error('Failed to copy PDF.js worker:', err);
  process.exitCode = 1;
});
