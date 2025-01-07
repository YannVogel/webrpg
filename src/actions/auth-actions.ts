'use server';

import { createUser, getUserByEmail } from '@/lib/user';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { redirect } from 'next/navigation';
import { createAuthSession, destroySession } from '@/lib/auth';
import registerSchema from '@/schemas/register';

type FormErrors = {
  email?: string;
  password?: string;
};

const signup = async (
  _prevState: { errors: FormErrors },
  formData: FormData,
) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // Utilisation de safeParse pour une validation sécurisée
  const parseResult = registerSchema.safeParse({ email, password });

  if (!parseResult.success) {
    // Si la validation échoue, on mappe les erreurs de Zod vers FormErrors
    const errors: FormErrors = {};
    parseResult.error.errors.forEach((err) => {
      if (err.path.includes('email')) {
        errors.email = err.message;
      }
      if (err.path.includes('password')) {
        errors.password = err.message;
      }
    });
    return { errors };
  }

  const validData = parseResult.data;

  const hashedPassword = hashUserPassword(validData.password);

  try {
    const { id } = await createUser(validData.email, hashedPassword);
    await createAuthSession(id);
    // Redirection en cas de succès
    redirect('/home');
  } catch {
    return {
      errors: {
        email: 'An error occurred, please try again.',
      },
    };
  }
};

const login = async (
  _prevState: { errors: FormErrors },
  formData: FormData,
) => {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      errors: {
        email: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'Could not authenticate user, please check your credentials.',
      },
    };
  }

  await createAuthSession(existingUser.id);
  redirect('/home');
};

export const auth = async (
  mode: 'login' | 'signup',
  prevState: { errors: FormErrors },
  formData: FormData,
) => {
  if (mode === 'login') {
    return login(prevState, formData);
  }

  return signup(prevState, formData);
};

export async function logout() {
  await destroySession();
  redirect('/');
}
