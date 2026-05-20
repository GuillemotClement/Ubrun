import NavLink from '@/components/NavLink';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="border">
      <div className="border border-red-400">
        <NavLink href="/admin/request">Demande</NavLink>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
