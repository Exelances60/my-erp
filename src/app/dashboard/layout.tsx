import Header from "@/components/Header/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="w-full p-5 box-border min-h-screen overflow-y-auto bg-[#f9fafb]">
        {children}
      </div>
    </>
  );
}
