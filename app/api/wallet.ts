import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/auth/[...nextauth]';
import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { walletAccount: true },
    });

    if (!user || !user.walletAccount) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    res.status(200).json(user.walletAccount);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
