import { useState, useEffect } from "react";

export interface Post {
  id: string;
  title: string;
  date: string;
  readingTime?: number;
  htmlContent?: string;
  tags? : string[];
}

interface UsePostsResult {
  posts: Post[];
  loading: boolean;
  error: boolean;
}

let cachedPosts: Post[] | null = null;

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>(cachedPosts ?? []);
  const [loading, setLoading] = useState(cachedPosts === null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cachedPosts !== null) {
      setPosts(cachedPosts);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    fetch("/posts.json", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Post[]>;
      })
      .then((data) => {
        // Sort by date descending
        const sorted = [...data].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        cachedPosts = sorted;
        setPosts(sorted);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        console.error("[usePosts] Failed to load posts.json:", err);
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return { posts, loading, error };
}
