import { ComponentChildren } from "preact";

interface NavLinkProps {
  href: string;
  children: ComponentChildren;
}

export default function NavLink({ href, children }: NavLinkProps) {
  return (
    <a
      href={href}
      className="text-gray-300 hover:text-white px-3 py-2 rounded-md transition-colors duration-200"
    >
      {children}
    </a>
  );
}
