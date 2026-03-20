import { Link } from "react-router-dom";
import type { Post } from "@/hooks/usePosts";

interface Props {
  post: Post;
  index: number;
}

export default function PostListItem({ post }: Props) {
  const date = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <li className="group">
      <Link
        to={`/post/${post.id}`}
        className="flex items-baseline justify-between gap-4 py-3 border-b border-border last:border-0"
      >
        <span className="text-foreground text-[0.95rem] group-hover:underline underline-offset-[3px] decoration-muted-foreground transition-colors leading-snug">
          {post.title}
        </span>
        <span className="font-mono text-xs text-muted-foreground shrink-0">
          {date}
        </span>
      </Link>
    </li>
  );
}
