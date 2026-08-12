import type { Metadata } from "next";
import ArHomeClient from "./ArHomeClient";

export const metadata: Metadata = {
  title: "كلية المدينة العالمية",
};

export default function Page() {
  return <ArHomeClient />;
}
