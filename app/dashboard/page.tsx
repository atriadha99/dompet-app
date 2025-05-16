'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
// Update the import path below if Header.tsx is in a different location
import Header from '../../components/Header';
import { useRouter } from 'next/navigation';

interface WalletInfo {
  id: string;
  balance: number;
}

interface BankAccount {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  balance: number;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/auth/login');
      return;
    }

    async function fetchData() {
      setIsLoading(true);
      try {
        const [walletRes, bankRes] = await Promise.all([
          fetch('/api/wallet'),
          fetch('/api/bank-accounts'),
        ]);

        if (!walletRes.ok) throw new Error('Failed to fetch wallet info');
        if (!bankRes.ok) throw new Error('Failed to fetch bank accounts');

        const walletData = await walletRes.json();
        const bankData = await bankRes.json();

        setWalletInfo(walletData);
        setBankAccounts(bankData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [session, status, router]);

  useEffect(() => {
    // Hitung total balance
    const walletBalance = walletInfo?.balance || 0;
    const bankBalance = bankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
    setTotalBalance(walletBalance + bankBalance);
  }, [walletInfo, bankAccounts]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Saldo Wallet</h2>
          <p>ID Wallet: {walletInfo?.id}</p>
          <p>Balance: Rp {walletInfo?.balance.toLocaleString('id-ID')}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Rekening Bank</h2>
          {bankAccounts.length === 0 ? (
            <p>Tidak ada rekening bank</p>
          ) : (
            <ul>
              {bankAccounts.map((account) => (
                <li key={account.id} className="mb-3 p-3 border rounded-md">
                  <p>Bank: {account.bankName}</p>
                  <p>Nama Rekening: {account.accountName}</p>
                  <p>No. Rekening: {account.accountNumber}</p>
                  <p>Balance: Rp {account.balance.toLocaleString('id-ID')}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold">Total Saldo</h2>
          <p className="text-2xl font-bold">Rp {totalBalance.toLocaleString('id-ID')}</p>
        </section>
      </main>
    </div>
  );
}
