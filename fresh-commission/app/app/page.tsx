import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "Al-Madeenah International College",
};

export default function Page() {
  return <HomeClient />;
}
