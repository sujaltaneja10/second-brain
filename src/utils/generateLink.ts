import mongoose from 'mongoose';

export default function generateLink(): string {
  const uniqueId = new mongoose.Types.ObjectId().toHexString();
  return uniqueId;
}
