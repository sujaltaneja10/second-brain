import { Request, Response } from 'express';
import LinkModel from '../models/Link';
import generateLink from '../utils/generateLink';
import ContentModel from '../models/Content';

interface AuthRequest extends Request {
  userId?: string;
}

export async function createShareLink(req: AuthRequest, res: Response) {
  try {
    const share = req.body.share;
    const userId = req.userId;

    // If share parameter not provided
    if (!share) {
      res.status(400).json({ message: 'share parameter not provided' });
      return;
    }

    // If share set to false
    if (share != 'true') {
      await LinkModel.deleteOne({ userId });
      res.status(400).json({
        message: 'sharing is turned off',
      });
      return;
    }

    const shareLink = await LinkModel.findOne({ userId });

    // If link already generated
    if (shareLink) {
      res.json({ link: shareLink.hash });
      return;
    }

    // Generate link
    const generatedLink = generateLink();
    await LinkModel.create({ hash: generatedLink, userId });
    res.json({ link: generatedLink });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getUserContent(req: AuthRequest, res: Response) {
  try {
    const shareLink = req.params.shareLink;

    // Find link in database
    const user = await LinkModel.findOne({ hash: shareLink });

    // Link not found in database
    if (!user) {
      res.status(400).json({ message: 'invalid link provided' });
      return;
    }

    // Get user content
    const userContent = await ContentModel.find({
      userId: user.userId,
    })
      .populate('userId', 'username')
      .populate('tags', 'title');
    res.json(userContent);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
}
