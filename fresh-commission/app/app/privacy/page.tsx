import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy — Al-Madeenah International College",
};

export default function Page() {
  return <PrivacyClient />;
}
