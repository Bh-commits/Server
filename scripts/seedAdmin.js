import mongoose from 'mongoose';
import { connectDatabase } from '../src/config/database.js';
import { env } from '../src/config/env.js';
import { User } from '../src/models/User.js';

async function seedAdmin() {
  await connectDatabase();

  const existing = await User.findOne({ email: env.adminEmail.toLowerCase() });
  if (existing) {
    console.log(`Admin already exists: ${existing.email}`);
    await mongoose.disconnect();
    return;
  }

  await User.create({
    name: env.adminName,
    email: env.adminEmail.toLowerCase(),
    password: env.adminPassword,
    role: 'admin'
  });

  console.log(`Admin created: ${env.adminEmail}`);
  await mongoose.disconnect();
}

seedAdmin().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});

