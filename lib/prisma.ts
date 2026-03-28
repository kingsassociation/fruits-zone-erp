import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Set up WebSocket for Neon serverless driver
if (typeof window === 'undefined') {
  neonConfig.webSocketConstructor = ws;
}

const connectionString = process.env.POOLER_URL!;

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool as any);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
