import Tour from '../models/tourModel.js';

// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find().populate(['admin_id', 'user_id']);
    res.json(tours);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tours' });
  }
};

// Create a new tour
export const createTour = async (req, res) => {
  const {
    admin_id,
    user_id,
    title,
    image,
    location,
    price,
    description,
    date,
    departure,
    return: returnTime,
    instruction,
  } = req.body;

  try {
    const tour = await Tour.create({
      admin_id,
      user_id,
      title,
      image,
      location,
      price,
      description,
      date,
      departure,
      return: returnTime,
      instruction,
    });
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tour' });
  }
};

// Get tour by ID
export const getTourById = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findById(tourId).populate(['admin_id', 'user_id']);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tour' });
  }
};

// Update tour
export const updateTour = async (req, res) => {
  const { tourId } = req.params;
  const {
    admin_id,
    user_id,
    title,
    image,
    location,
    price,
    description,
    date,
    departure,
    return: returnTime,
    instruction,
  } = req.body;

  try {
    const tour = await Tour.findByIdAndUpdate(
      tourId,
      {
        admin_id,
        user_id,
        title,
        image,
        location,
        price,
        description,
        date,
        departure,
        return: returnTime,
        instruction,
      },
      { new: true }
    ).populate(['admin_id', 'user_id']);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tour' });
  }
};

// Delete tour
export const deleteTour = async (req, res) => {
  const { tourId } = req.params;

  try {
    const tour = await Tour.findByIdAndDelete(tourId);
    if (!tour) {
      return res.status(404).json({ error: 'Tour not found' });
    }
    res.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tour' });
  }
};
