import type { Metadata } from "next";
import AdmissionsClient from "./AdmissionsClient";

export const metadata: Metadata = {
  title: "Admissions — Al-Madeenah International College",
};

export default function Page() {
  return <AdmissionsClient />;
}
