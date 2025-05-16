
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react'; import { useRouter } from 'next/navigation'; import Link from 'next/link';
import Header from '../../../components/Header';

export default function Login() { const router = useRouter();
const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => { e.preventDefault();
setError(''); setIsLoading(true);

try {
const result = await signIn('credentials', { redirect: false,
email, password,
});

if (result?.error) { setError(result.error);
} else { router.push('/dashboard'); router.refresh();
}
} catch (err) {
setError('Terjadi kesalahan saat login'); console.error(err);
} finally { setIsLoading(false);
}
};

return (
    <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-center text-3xl font-bold text-gray-900">Login</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Atau{' '}
                    <Link href="/auth/register" className="font-medium text-blue-600 hover:text-blue-800">
                        daftar akun baru
                    </Link>
                </p>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Email" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            placeholder="Password" />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            {isLoading ? 'Loading...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
);
}