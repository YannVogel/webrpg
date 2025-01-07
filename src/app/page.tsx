import AuthForm from '@/components/auth-form';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ mode?: 'login' | 'signup' }>;
}) {
  const mode = (await searchParams).mode || 'login';

  const { session } = await verifyAuth();

  if (session) {
    redirect('/home')
  }

  return <AuthForm mode={mode} />;
}
