import Link from 'next/link';
import PublicationForm from '@/app/admin/_components/PublicationForm';
import { COL } from '@/lib/col';

export default function NewVolumePage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin" className="text-sm transition-opacity hover:opacity-70" style={{ color: '#6B7280' }}>
          ← Admin
        </Link>
        <span style={{ color: '#6B7280' }}>/</span>
        <h1 className="serif text-xl" style={{ color: COL.warm }}>
          Nuovo volume
        </h1>
      </div>
      <PublicationForm />
    </div>
  );
}
