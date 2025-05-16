
import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';

// Mendapatkan semua rekening bank pengguna
export async function GET(request: Request) { try {
const session = await getServerSession(authOptions);

if (!session?.user?.email) { return NextResponse.json(
{ message: 'Unauthorized' },
{ status: 401 }
);
}

const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true },
});

if (!user) {
return NextResponse.json(
{ message: 'User tidak ditemukan' },
{ status: 404 }
);
}

const bankAccounts = await prisma.bankAccount.findMany({ where: { userId: user.id },
});

return NextResponse.json(bankAccounts);
} catch (error) { console.error('GET_BANK_ACCOUNTS_ERROR', error); return NextResponse.json(
{ message: 'Terjadi kesalahan saat mengambil data rekening bank' },
{ status: 500 }
);
}
}

// Menambahkan rekening bank baru

export async function POST(request: Request) {
try {
const session = await getServerSession(authOptions);

if (!session?.user?.email) { return NextResponse.json(
{ message: 'Unauthorized' },
{ status: 401 }
);
}

const user = await prisma.user.findUnique({ where: { email: session.user.email }, select: { id: true },
});

if (!user) {
return NextResponse.json(
{ message: 'User tidak ditemukan' },
{ status: 404 }
);
}

const body = await request.json();
const { bankName, accountName, accountNumber, balance } = body;

if (!bankName || !accountName || !accountNumber) { return NextResponse.json(
{ message: 'Harap lengkapi semua data rekening' },
{ status: 400 }
);
}

const bankAccount = await prisma.bankAccount.create({ data: {
bankName, accountName, accountNumber, balance: balance || 0, userId: user.id,
},
});

return NextResponse.json(
{ message: 'Rekening bank berhasil ditambahkan', bankAccount },
{ status: 201 }
);

} catch (error) { console.error('ADD_BANK_ACCOUNT_ERROR', error); return NextResponse.json(
{ message: 'Terjadi kesalahan saat menambahkan rekening bank' },
{ status: 500 }
);
}
}

