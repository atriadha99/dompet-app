import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          E-Wallet App
        </Link>

        {/* Toggle Button for Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } absolute md:relative top-16 left-0 right-0 md:top-0 bg-blue-600 md:flex`}
        >
          <ul className="flex flex-col md:flex-row items-center">
            {session ? (
              <>
                <li className="my-2 md:my-0 md:mx-4">
                  <Link href="/dashboard" className="hover:text-blue-200">
                    Dashboard
                  </Link>
                </li>
                <li className="my-2 md:my-0 md:mx-4">
                  <Link href="/dashboard/accounts" className="hover:text-blue-200">
                    Rekening Saya
                  </Link>
                </li>
                <li className="my-2 md:my-0 md:mx-4">
                  <Link href="/dashboard/transactions" className="hover:text-blue-200">
                    Transaksi
                  </Link>
                </li>
                <li className="my-2 md:my-0 md:mx-4">
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="my-2 md:my-0 md:mx-4">
                  <Link href="/auth/login" className="hover:text-blue-200">
                    Login
                  </Link>
                </li>
                <li className="my-2 md:my-0 md:mx-4">
                  <Link
                    href="/auth/register"
                    className="bg-white text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-md"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
