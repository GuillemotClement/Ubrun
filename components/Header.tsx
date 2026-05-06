import Image from 'next/image';
import Link from 'next/link';

import NavLink from './NavLink';

export default function Header() {
  return (
    <header className="shadow flex justify-between px-10 py-4">
      <div className="flex items-center">
        <Link href="/" className="me-5">
          <Image src="/logo.svg" alt="logo ubrun" width={75} height={75} />
        </Link>
        <div className="flex gap-x-2">
          <NavLink href="/">Accueil</NavLink>
          <NavLink href="/tools/vma">VMA</NavLink>
          <NavLink href="/tools/fcm">FCM</NavLink>
          <NavLink href="/tools/convertor">Convertisseur</NavLink>
        </div>
      </div>
    </header>
  );
}
