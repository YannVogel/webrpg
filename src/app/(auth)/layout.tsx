import { PropsWithChildren } from 'react';
import AuthenticatedHeader from '@/components/authenticated-header';
import { verifyAuth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Next Auth',
  description: 'Next.js Authentication',
};

export default async function AuthRootLayout({ children }: PropsWithChildren) {
  const { user } = await verifyAuth();

  if (!user) {
    return redirect('/');
  }

  return (
    <>
      <AuthenticatedHeader />
      {children}
    </>
  );
}
