#!/usr/bin/env node

/**
 * build-posts.js
 *
 * Reads all .md files in /posts, parses frontmatter, converts to HTML,
 * calculates reading time, and writes /public/posts.json.
 *
 * Usage: node scripts/build-posts.js
 * Requires: npm install marked gray-matter (dev dependencies in CI)
 */

import { readdir, readFile, writeFile } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const POSTS_DIR = join(ROOT, "posts");
const OUTPUT = join(ROOT, "public", "posts.json");

async function main() {
  // Dynamic imports — installed in CI before this script runs
  const { marked } = await import("marked");
  const { default: matter } = await import("gray-matter");

  const files = (await readdir(POSTS_DIR)).filter((f) => f.endsWith(".md"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await readFile(join(POSTS_DIR, file), "utf-8");
      const { data, content } = matter(raw);

      if (!data.id || !data.title || !data.date) {
        throw new Error(
          `Post "${file}" is missing required frontmatter (id, title, date).`
        );
      }

      const htmlContent = await marked(content, { async: true });

      // ~200 words per minute reading speed
      const words = content.split(/\s+/).filter(Boolean).length;
      const readingTime = Math.max(1, Math.round(words / 200));

      return {
        id: data.id,
        title: data.title,
        date: data.date,
        readingTime,
        htmlContent,
      };
    })
  );

  // Sort by date descending
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));

  await writeFile(OUTPUT, JSON.stringify(posts, null, 2), "utf-8");
  console.log(`✓ Wrote ${posts.length} post(s) to public/posts.json`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
