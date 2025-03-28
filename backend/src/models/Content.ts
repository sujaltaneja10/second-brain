import mongoose, { Schema, Types } from 'mongoose';

export const ContentTypes = [
  'tweet',
  'image',
  'video',
  'article',
  'audio',
  'link',
];

export const ContentSchema = new Schema({
  link: String,
  type: { type: String, enum: ContentTypes },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'tags' }],
  userId: { type: Types.ObjectId, ref: 'users' },
});

const ContentModel = mongoose.model('content', ContentSchema);

export default ContentModel;
