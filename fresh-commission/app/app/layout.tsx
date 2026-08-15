import type { Metadata } from "next";
export const metadata: Metadata = { title: "Al-Madeenah International College" };
const CSS = `:root{--blue-950:#0B1B42;--blue-800:#16306E;--blue-700:#1E3F8F;--gold:#B8933D;--gold-ink:#8C6A22;--ivory:#FAF6EC;--cream:#F3ECDA;--hairline:#DDD0AC;--ink:#191A22;--ink-soft:#4A4C5C;--on-blue:#F4EFE0}*{box-sizing:border-box}body{margin:0;background:var(--ivory);color:var(--ink);font-family:'Manrope',sans-serif;line-height:1.6}a{color:inherit}.wrap{max-width:1100px;margin-inline:auto;padding-inline:24px}h1,h2,h3{font-family:'Fraunces',serif;color:var(--blue-800);margin:0;font-weight:500}.top{background:var(--blue-950);color:var(--on-blue)}.top .wrap{display:flex;justify-content:space-between;align-items:center;height:64px}.top a{text-decoration:none;color:var(--on-blue);font-weight:700}.top nav{display:flex;gap:20px;font-size:.875rem}.btn{display:inline-flex;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:.8125rem;letter-spacing:.05em;text-transform:uppercase;cursor:pointer;border:1px solid var(--blue-800);background:linear-gradient(180deg,var(--blue-700),var(--blue-800));color:var(--on-blue)}.btn--gilt{background:transparent;border-color:var(--gold);color:var(--gold-ink)}.field{display:flex;flex-direction:column;gap:6px;margin-bottom:18px}.field label{font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:var(--blue-800)}.field input,.field select{font-size:1rem;padding:12px 14px;border-radius:8px;border:1.5px solid var(--hairline);background:var(--ivory)}.row2{display:grid;grid-template-columns:1fr 1fr;gap:16px}.card{background:var(--cream);border:1px solid var(--hairline);border-radius:14px;padding:32px;max-width:640px}.err{background:#fbeaea;border:1px solid #d99;border-radius:10px;padding:14px 18px;margin-bottom:18px;color:#822;display:none}.err.show{display:block}.ok{display:none;text-align:center}.ok.show{display:block}`;
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@400;500;600&family=Manrope:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </head>
      <body>
        <div className="top"><div className="wrap"><a href="/">Al-Madeenah</a><nav><a href="/admissions/">Admissions</a><a href="/register/">Register</a><a href="/study/">The Study</a></nav></div></div>
        {children}
      </body>
    </html>
  );
}
