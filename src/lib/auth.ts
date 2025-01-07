import { cache } from 'react';
import { cookies } from 'next/headers';
import { PrismaAdapter } from '@lucia-auth/adapter-prisma';
import { User as DatabaseUser } from '@prisma/client';
import { Cookie, Lucia } from 'lucia';

import { db } from './prisma';

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

const createCookie = async (sessionCookie: Cookie) => {
  (await cookies()).set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  );
};

const createBlankCookie = async () => {
  const sessionCookie = lucia.createBlankSessionCookie();
  await createCookie(sessionCookie);
};

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<DatabaseUser, 'id'>;
  }
}

export async function createAuthSession(userId: string) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  await createCookie(sessionCookie);
}

export const verifyAuth = cache(async () => {
  const sessionId =
    (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      await createCookie(sessionCookie);
    }
    if (!result.session) {
      await createBlankCookie();
    }
  } catch {
    /* empty */
  }
  return result;
});

export async function destroySession() {
  const { session } = await verifyAuth();
  if (!session) {
    return {
      error: 'Unauthorized!',
    };
  }

  await lucia.invalidateSession(session.id);
  await createBlankCookie();
}
