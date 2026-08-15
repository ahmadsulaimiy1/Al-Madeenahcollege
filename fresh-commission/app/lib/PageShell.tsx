"use client";

import { useEffect } from "react";
import { SPRITE_DEFS, BASE_CSS, CHROME_SCRIPT, headerHtml, footerHtml, type Locale, type NavKey } from "./shared";

export function PageShell({
  locale,
  current,
  mainHtml,
  extraCss = "",
  extraScript = "",
}: {
  locale: Locale;
  current: NavKey;
  mainHtml: string;
  extraCss?: string;
  extraScript?: string;
}) {
  const homeHref = locale === "en" ? "/" : "/ar/";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  const bodyHtml = `
<a class="skip" href="#main">${locale === "ar" ? "تخطَّ إلى المحتوى" : "Skip to content"}</a>
${SPRITE_DEFS}
${headerHtml(locale, current, homeHref)}
<main id="main">
${mainHtml}
</main>
${footerHtml(locale)}
`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: BASE_CSS + extraCss }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
      <script
        dangerouslySetInnerHTML={{ __html: CHROME_SCRIPT + extraScript }}
      />
    </>
  );
}
