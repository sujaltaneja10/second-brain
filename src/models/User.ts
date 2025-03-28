import mongoose, { Schema, Model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel: Model<IUser> = mongoose.model<IUser>(
  'users',
  UserSchema
);
