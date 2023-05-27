import Feedback from '../models/feedbackModel.js';

// Get all feedbacks
export const getAllFeedbacks = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    const feedback = await Feedback.paginate({}, options);
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new feedback
export const createFeedback = async (req, res) => {
  const { admin_id, user_id, message } = req.body;
  
  try {
    const feedback = await Feedback.create({ admin_id, user_id, message });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create feedback' });
  }
};

// Get feedback by ID
export const getFeedbackById = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const feedback = await Feedback.findById(feedbackId).populate(['admin_id', 'user_id']);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get feedback' });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  const { feedbackId } = req.params;
  const { message } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(
      feedbackId,
      { message },
      { new: true }
    ).populate(['admin_id', 'user_id']);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update feedback' });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  const { feedbackId } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(feedbackId);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback' });
  }
};
