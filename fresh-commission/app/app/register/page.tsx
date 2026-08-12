import type { Metadata } from "next";
import RegisterClient from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register — Al-Madeenah International College",
};

export default function Page() {
  return <RegisterClient />;
}
