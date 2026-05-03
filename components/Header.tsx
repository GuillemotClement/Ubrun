import Link from "next/link";
import NavLink from "./NavLink";
import Image from "next/image";

export default function Header() {
  return (
    <header className="shadow flex justify-between px-10 py-4">
      <Link href="/">
        <Image src="/logo.svg" alt="logo ubrun" width={75} height={75} />
      </Link>
      <div className="flex gap-x-2">
        <NavLink href="/">Accueil</NavLink>
        <NavLink href="/tools/vma">VMA</NavLink>
      </div>
    </header>
  );
}
