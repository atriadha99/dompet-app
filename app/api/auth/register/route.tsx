import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
// Update the import path if '@/lib/prisma' does not exist
import prisma from '../../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validasi input
    if (!name.trim() || !email.trim() || !password.trim()) {
      return NextResponse.json(
        { message: 'Harap lengkapi semua data' },
        { status: 400 }
      );
    }

    // Validasi format email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Format email tidak valid' },
        { status: 400 }
      );
    }

    // Cek email yang sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    // Hash password dengan salt rounds
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        password: hashedPassword,
        walletAccount: {
          create: {
            balance: 0,
          },
        },
      },
    });

    // Hapus password sebelum mengirim response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: 'User berhasil dibuat',
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('REGISTRATION_ERROR', error.message || error);

    // Tangani error prisma
    if (error.code === 'P2002') {
      return NextResponse.json(
        { message: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mendaftar' },
      { status: 500 }
    );
  }
}
