import Link from "next/link";

type NavLinkProp = {
  href: string;
  children: React.ReactNode;
};

export default function NavLink({ href, children }: NavLinkProp) {
  return (
    <Link href={href} className="hover:underline">
      {children}
    </Link>
  );
}
