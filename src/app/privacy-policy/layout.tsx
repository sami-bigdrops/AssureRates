import type { Metadata } from "next";
import Navbar from "@/asf/navbar";
import Footer from "@/asf/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | AssureRates",
  description: "Privacy policy for using AssureRates's insurance comparison services.",
};

export default function PrivacyPolicyLayout({
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
