import NavLink from '@/components/NavLink';
import { Button } from '@/components/ui/button';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border">
      <div className="border border-red-400">
        <NavLink href="/admin/request">
          <Button>Demande</Button>
        </NavLink>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
