import type { Metadata } from "next";
import WorkshopSubnav from "@/components/molecules/WorkshopSubnav";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function AIWorkshopSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mt-20 min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] text-[#0F172A] dark:text-[#F8FAFC] pt-28 md:pt-32 pb-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        <WorkshopSubnav />
        <div>{children}</div>
      </div>
    </div>
  );
}
