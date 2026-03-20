import { motion, type Variants, type Easing } from "framer-motion";
import { useTranslation } from "react-i18next";
import Nav from "@/components/Nav";
import PostListItem from "@/components/PostListItem";
import { usePosts } from "@/hooks/usePosts";

const easeOut: Easing = [0.0, 0.0, 0.2, 1.0];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: easeOut } },
};

export default function Home() {
  const { posts, loading, error } = usePosts();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="max-w-[65ch] mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <h1 className="text-xl font-medium text-foreground tracking-tight mb-1">
            {t("home.heading")}
          </h1>
          <p className="text-sm text-muted-foreground">
            {t("home.subtitle")}
          </p>
        </motion.div>

        {/* Post list */}
        {loading && (
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between py-3 border-b border-border"
              >
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
                <div className="h-4 bg-muted rounded w-20 animate-pulse" />
              </div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-muted-foreground">
            {t("home.loadError", { file: "/posts.json" })}
          </p>
        )}

        {!loading && !error && posts.length === 0 && (
          <p className="text-sm text-muted-foreground">{t("home.noPosts")}</p>
        )}

        {!loading && !error && posts.length > 0 && (
          <motion.ul
            variants={container}
            initial="hidden"
            animate="show"
            className="list-none p-0 m-0"
          >
            {posts.map((post, i) => (
              <motion.div key={post.id} variants={item}>
                <PostListItem post={post} index={i} />
              </motion.div>
            ))}
          </motion.ul>
        )}
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="max-w-[65ch] mx-auto px-6 pb-10">
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} · All rights reserved
      </p>
    </footer>
  );
}
