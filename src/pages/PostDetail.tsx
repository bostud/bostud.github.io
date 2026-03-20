import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import Nav from "@/components/Nav";
import { usePosts } from "@/hooks/usePosts";

export default function PostDetail() {
  const { postId } = useParams<{ postId: string }>();
  const { posts, loading, error } = usePosts();
  const { t } = useTranslation();

  const post = posts.find((p) => p.id === postId);

  const date = post
    ? new Date(post.date).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const tags = post?.tags.map((tag) => `#${tag}`).join(" ") || "";

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="max-w-[65ch] mx-auto px-6 pt-28 pb-20">
        {/* Back link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          {t("post.backLink")}
        </Link>

        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-7 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-32" />
            <div className="h-px bg-border mt-8" />
            <div className="space-y-3 mt-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-muted rounded" />
              ))}
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-muted-foreground">
            {t("post.loadError")}
          </p>
        )}

        {!loading && !error && !post && (
          <div>
            <p className="text-sm text-muted-foreground">{t("post.notFound")}</p>
            <Link
              to="/"
              className="text-sm underline underline-offset-2 text-muted-foreground hover:text-foreground mt-4 inline-block"
            >
              {t("post.returnHome")}
            </Link>
          </div>
        )}

        {!loading && !error && post && (
          <motion.article
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {/* Title */}
            <h1 className="text-2xl font-medium tracking-tight text-foreground leading-snug mb-3">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground mb-8">
              <span>{date}</span>
              {post.readingTime && (
                <>
                  <span>·</span>
                  <span>{t("post.minRead", { count: post.readingTime })}</span>
                </>
              )}
              {post.tags.length > 0 && (
                <>
                  <span>·</span>
                  <span>{tags}</span>
                </>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-border mb-10" />

            {/* Body */}
            {post.htmlContent ? (
              <div
                className="prose-blog"
                dangerouslySetInnerHTML={{ __html: post.htmlContent }}
              />
            ) : (
              <p className="prose-blog text-muted-foreground italic">
                This post has no content yet.
              </p>
            )}
          </motion.article>
        )}
      </main>
    </div>
  );
}
