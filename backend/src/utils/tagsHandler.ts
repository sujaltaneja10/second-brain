import { Types } from 'mongoose';
import TagModel from '../models/Tags';

interface ContentData {
  tags?: string[];
}

export default async function handleTagsInput(
  data: ContentData
): Promise<Types.ObjectId[]> {
  // If tags are not given
  if (!data.tags) return [];

  const newTags = await Promise.all(
    data.tags.map(async (tag): Promise<Types.ObjectId> => {
      // Check if tag exists in database
      const tagExists = await TagModel.findOne({ title: tag });

      if (tagExists) {
        return tagExists._id;
      }

      // If tag does not exist
      const newTag = await TagModel.create({ title: tag });

      return newTag._id;
    })
  );

  return newTags;
}
