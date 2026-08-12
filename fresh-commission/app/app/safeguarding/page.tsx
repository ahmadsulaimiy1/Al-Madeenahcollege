import type { Metadata } from "next";
import SafeguardingClient from "./SafeguardingClient";

export const metadata: Metadata = {
  title: "Safeguarding Policy — Al-Madeenah International College",
};

export default function Page() {
  return <SafeguardingClient />;
}
