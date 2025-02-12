import { ComponentChildren } from "preact";
import Navigation from "./Navigation.tsx";
import Footer from "./Footer.tsx";

interface LayoutProps {
  children: ComponentChildren;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 font-sans text-gray-100 flex flex-col">
      <Navigation />
      <main className="flex-grow max-w-5xl mx-auto w-full px-4">{children}</main>
      <Footer />
    </div>
  );
}
