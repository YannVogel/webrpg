'use client';

import Link from 'next/link';
import { useActionState } from 'react';
import { auth } from '@/actions/auth-actions';

export interface AuthFormProps {
  mode: 'login' | 'signup';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [formState, formAction] = useActionState(auth.bind(null, mode), {
    errors: {},
  });

  return (
    <form
      action={formAction}
      className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-gray-900 p-6 shadow-lg"
    >
      <h2 className="text-center text-2xl font-semibold text-white">
        {mode === 'login' ? 'Login to your account' : 'Create an account'}
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-gray-400">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 transition focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-400">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="mt-1 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-gray-200 transition focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {formState.errors && (
        <ul className="space-y-1 text-sm text-red-500">
          {Object.keys(formState.errors).map((error) => (
            // @ts-expect-error TODO
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="mt-4 w-full rounded-md bg-blue-600 py-2 font-medium text-white transition-colors duration-200 hover:bg-blue-700"
      >
        {mode === 'login' ? 'Login' : 'Create Account'}
      </button>

      <p className="text-center text-gray-400">
        {mode === 'login' ? (
          <>
            Don&#39;t have an account?{' '}
            <Link
              href="/?mode=signup"
              className="text-blue-400 underline transition hover:text-blue-500"
            >
              Create an account.
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}
            <Link
              href="/?mode=login"
              className="text-blue-400 underline transition hover:text-blue-500"
            >
              Login with existing account.
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
