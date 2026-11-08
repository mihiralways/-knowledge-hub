import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import MobileNav from "@/components/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Knowledge Hub - Your Personal Workspace",
  description: "Capture ideas, manage projects, and organize study materials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-gray-100`}>
        <div className="flex h-screen overflow-hidden">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 border-r border-gray-800 bg-gray-900">
            <Sidebar />
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile Navigation */}
            <div className="lg:hidden">
              <MobileNav />
            </div>

            {/* Page Content */}
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
