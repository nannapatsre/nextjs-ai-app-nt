import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardClient from './dashboard-client';
import { unstable_noStore } from 'next/cache';

export default async function DashboardPage() {
  unstable_noStore();
  try {
    const session = await auth.api.getSession();
    if (!session || (session?.user as any)?.role !== 'admin') {
      redirect('/');
    }
  } catch (e) {
    redirect('/');
  }

  return <DashboardClient />;
}
