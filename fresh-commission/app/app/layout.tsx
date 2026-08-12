import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Al-Madeenah International College",
  description:
    "A distance-learning college for Arabic language, Qur'an and the Islamic sciences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="stylesheet" href="/fonts.css" />
      </head>
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
