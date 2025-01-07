import { logout } from '@/actions/auth-actions';
import { Button } from '@/components/ui/button';

const AuthenticatedHeader = () => {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-gray-100 shadow-md">
      <div className="flex items-center space-x-2">
        <p className="text-sm text-gray-300">Welcome back!</p>
      </div>
      <form action={logout}>
        <Button
          type="submit"
          className="rounded border border-gray-600 px-3 py-1 text-sm font-medium text-gray-300 transition-colors duration-200 hover:text-white"
        >
          Logout
        </Button>
      </form>
    </header>
  );
};

export default AuthenticatedHeader;
