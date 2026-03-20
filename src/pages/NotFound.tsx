import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";
import Nav from "@/components/Nav";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <div className="max-w-[65ch] mx-auto px-6 pt-28">
        <p className="font-mono text-xs text-muted-foreground mb-4">
          {t("notFound.label")}
        </p>
        <h1 className="text-xl font-medium text-foreground mb-3">
          {t("notFound.heading")}
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          <Trans
            i18nKey="notFound.message"
            values={{ path: location.pathname }}
            components={[
              <code className="text-xs bg-muted px-1 py-0.5 rounded" />,
            ]}
          />
        </p>
        <Link
          to="/"
          className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors"
        >
          {t("notFound.backHome")}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
