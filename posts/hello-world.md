---
id: hello-world
title: "Hello, World — My First Post"
date: "2025-03-10"
---

Welcome to my blog. This is the first post, and it exists mostly to prove that the plumbing works.

Posts are written in Markdown and stored as `.md` files in the `/posts` directory of this repository. A small Node.js script (in `/scripts/build-posts.js`) converts them to HTML and bundles them into a single `posts.json` file. A GitHub Actions workflow runs that script on every push to `main`, then deploys the built site to GitHub Pages.

## How to add a post

Create a new file in `/posts/` with this frontmatter:

```
---
id: my-post-slug
title: My Post Title
date: 2025-03-15
---

Your content here.
```

Push it to `main`. The workflow takes care of the rest. The post will be live at `/post/my-post-slug`.

## Why no CMS?

I wanted the simplest possible setup. No database, no API keys to rotate, no backend to maintain. Just a Git repo, some Markdown, and a build step. If something goes wrong, I can trace it in the GitHub Actions logs and fix it in a text editor.

That's all for now. More soon.
