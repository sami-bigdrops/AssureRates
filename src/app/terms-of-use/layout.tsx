import type { Metadata } from "next";
import Navbar from "@/asf/navbar";
import Footer from "@/asf/footer";

export const metadata: Metadata = {
  title: "Terms of Use | AssureRates",
  description: "Terms and conditions for using AssureRates's insurance comparison services.",
};

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-y-auto">
      <Navbar />
      {children}
      <Footer hideFloatContainer={true} />
    </div>
  );
}
