import Socialmedia from '../models/socialmediaModel.js';

// Get all social media accounts
export const getAllSocialMedias = async (req, res) => {
  try {
    const socialMedias = await Socialmedia.find().populate('admin_id');
    res.json(socialMedias);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get social media accounts' });
  }
};

// Create a new social media account
export const createSocialMedia = async (req, res) => {
  const { admin_id, whatsapp, instagram, facebook, number, email } = req.body;

  try {
    const socialMedia = await Socialmedia.create({ admin_id, whatsapp, instagram, facebook, number, email });
    res.status(201).json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create social media account' });
  }
};

// Get social media account by ID
export const getSocialMediaById = async (req, res) => {
  const { socialmediaId } = req.params;

  try {
    const socialMedia = await Socialmedia.findById(socialmediaId).populate('admin_id');
    if (!socialMedia) {
      return res.status(404).json({ error: 'Social media account not found' });
    }
    res.json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get social media account' });
  }
};

// Update social media account
export const updateSocialMedia = async (req, res) => {
  const { socialmediaId } = req.params;
  const { whatsapp, instagram, facebook, number, email } = req.body;

  try {
    const socialMedia = await Socialmedia.findByIdAndUpdate(
      socialmediaId,
      { whatsapp, instagram, facebook, number, email },
      { new: true }
    ).populate('admin_id');
    if (!socialMedia) {
      return res.status(404).json({ error: 'Social media account not found' });
    }
    res.json(socialMedia);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update social media account' });
  }
};

// Delete social media account
export const deleteSocialMedia = async (req, res) => {
  const { socialmediaId } = req.params;

  try {
    const socialMedia = await Socialmedia.findByIdAndDelete(socialmediaId);
    if (!socialMedia) {
      return res.status(404).json({ error: 'Social media account not found' });
    }
    res.json({ message: 'Social media account deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete social media account' });
  }
};
