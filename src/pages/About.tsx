import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, ActivityIcon, SendIcon, ViewIcon } from "lucide-react";
import Nav from "@/components/Nav";
import { useTranslation } from "react-i18next";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/bostud",
    handle: "@bostud",
  },
  {
    icon: Twitter,
    label: "Twitter",
    href: "https://twitter.com/bstudenets",
    handle: "@bstudenets",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ust-nadhob",
    handle: "ust-nadhob",
  },
  {
    icon: Mail,
    label: "Email",
    href: "mailto:bostubis@gmail.com",
    handle: "bostubis@gmail.com",
  },
  {
    icon: SendIcon,
    label: "Telegram",
    href: "https://t.me/uts_nadhob",
    handle: "@uts_nadhob",
  },
  {
    icon: ActivityIcon,
    label: "Garmin Connect",
    href: "https://connect.garmin.com/modern/profile/29583e02-9e1b-4055-a73e-d20db4b9e78d",
    handle: "bostud",
  },
  {
    icon: ViewIcon,
    label: "CV - Senior Software Engineer | AI Agents Builder",
    href: "https://drive.google.com/file/d/1YFoEKWAk45bGMtJ-Tm3hk3vhQFZtAm70/view",
    handle: "Reach my",
  }
];

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Nav />

      <main className="max-w-[65ch] mx-auto px-6 pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="mb-8">
            <div className="w-48 h-48 rounded-full bg-muted border border-border overflow-hidden">
              <img
                src="/profile-pic.jpg"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h1 className="text-xl font-medium text-foreground tracking-tight mb-3">
            {t("about.authorName")}
          </h1>
          <p className="text-[0.95rem] text-foreground leading-relaxed mb-2">
            {t("about.authorBio")}
            {" "}
            <a
              href="https://www.gigaspaces.com/"
              className="underline underline-offset-[3px] decoration-muted-foreground hover:decoration-foreground transition-colors"
            >
              NewXel/GigaSpaces
            </a>
            .
          </p>
          <p className="text-[0.95rem] text-foreground leading-relaxed mb-10">
            {t("about.authorDescription")}
          </p>

          {/* Divider */}
          <div className="h-px bg-border mb-8" />

          {/* Social links */}
          <ul className="space-y-3">
            {socials.map(({ icon: Icon, label, href, handle }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <Icon
                    size={14}
                    strokeWidth={1.5}
                    className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0"
                  />
                  <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                    {handle}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/40 group-hover:text-muted-foreground transition-colors ml-1">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      </main>
    </div>
  );
}
