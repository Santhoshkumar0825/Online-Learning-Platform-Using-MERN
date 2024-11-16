import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Explicitly log the resolved path
const envPath = path.resolve(__dirname, '../.env');
console.log('Resolved .env Path:', envPath);

dotenv.config({ path: envPath });

console.log('MONGO_URI:', process.env.MONGO_URI);
console.log('JWT_SECRET:', process.env.JWT_SECRET);
