import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms of Service — Al-Madeenah International College",
};

export default function Page() {
  return <TermsClient />;
}
