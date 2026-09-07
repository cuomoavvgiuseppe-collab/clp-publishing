import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { COL } from '@/lib/col';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session')?.value;
  const adminKey = process.env.ADMIN_KEY;

  if (!adminKey || session !== adminKey) redirect('/admin/login');

  return (
    <div style={{ backgroundColor: COL.navy, color: COL.warm, minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="text-[11px] font-mono tracking-widest mb-1" style={{ color: COL.gold }}>
              CLP PUBLISHING — ADMIN
            </div>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="text-sm px-3 py-1.5 rounded-sm border transition-opacity hover:opacity-70"
              style={{ borderColor: 'rgba(201,168,76,0.3)', color: '#B7BEC9' }}
            >
              Esci
            </button>
          </form>
        </div>
        {children}
      </div>
    </div>
  );
}
