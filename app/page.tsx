import Link from 'next/link';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Satu Aplikasi untuk Semua Rekening Anda
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Kelola semua rekening bank Anda dalam satu platform e-wallet yang aman dan mudah
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/auth/register"
                className="bg-white text-blue-600 px-6 py-3 rounded-md font-medium hover:bg-blue-100"
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/auth/login"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Fitur Utama</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Saldo Terpadu */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="mb-4">
                  {/* Icon Placeholder */}
                </div>
                <h3 className="text-xl font-semibold mb-2">Saldo Terpadu</h3>
                <p className="text-gray-600">
                  Lihat total saldo dari semua rekening bank Anda dalam satu tempat.
                </p>
              </div>

              {/* Transfer Antar Rekening */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="mb-4">
                  {/* Icon Placeholder */}
                </div>
                <h3 className="text-xl font-semibold mb-2">Transfer Antar Rekening</h3>
                <p className="text-gray-600">
                  Pindahkan dana dengan mudah antar rekening bank Anda.
                </p>
              </div>

              {/* Analisis Keuangan */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="mb-4">
                  {/* Icon Placeholder */}
                </div>
                <h3 className="text-xl font-semibold mb-2">Analisis Keuangan</h3>
                <p className="text-gray-600">
                  Lihat laporan pengeluaran dan pantau kebiasaan finansial Anda.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 E-Wallet App. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
