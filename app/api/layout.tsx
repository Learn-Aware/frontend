import { Sidebar } from "@/components/api/sidebar";

export default function GenerateKeyDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-[hsl(var(--gradient-start))] to-[hsl(var(--gradient-end))] p-8">
        {children}
      </main>
    </div>
  );
}
