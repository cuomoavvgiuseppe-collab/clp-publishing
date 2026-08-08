import Link from 'next/link';
import { notFound } from 'next/navigation';
import { adminGetPublication } from '@/lib/db';
import PublicationForm from '@/app/admin/_components/PublicationForm';
import { COL } from '@/lib/col';

export default async function EditVolumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pub = await adminGetPublication(id);
  if (!pub) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-sm transition-opacity hover:opacity-70" style={{ color: '#6B7280' }}>
          ← Admin
        </Link>
        <span style={{ color: '#6B7280' }}>/</span>
        <h1 className="serif text-xl" style={{ color: COL.warm }}>
          Modifica volume
        </h1>
      </div>
      <p className="text-xs font-mono mb-6" style={{ color: '#6B7280' }}>
        {pub.slug}
      </p>
      <PublicationForm publication={pub} id={id} />
    </div>
  );
}
