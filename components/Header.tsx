'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { authClient } from '@/lib/betterAuth/auth-client';

import NavLink from './NavLink';
import { Button } from './ui/button';

export default function Header() {
  const { data } = authClient.useSession();
  const isAdmin = data?.session.isAdmin;

  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/');
        },
      },
    });
  };

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
          {isAdmin && <NavLink href="/admin">Administration</NavLink>}
        </div>
      </div>
      {!data ? (
        <div className="">
          <Link href="/auth/register">
            <Button>Inscription</Button>
          </Link>
          <Link href="/auth/login">
            <Button>Connexion</Button>
          </Link>
        </div>
      ) : (
        <div className="">
          <NavLink href="/profil">{data.user.name}</NavLink>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </header>
  );
}
