import type { Metadata } from "next";
import StudyClient from "./StudyClient";

export const metadata: Metadata = {
  title: "Al-Madeenah International College — the Reading Room",
};

export default function Page() {
  return <StudyClient />;
}
