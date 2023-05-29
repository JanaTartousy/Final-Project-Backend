import Tour from "../models/tourModel.js";

// Get all tours
export const getAllTours = async (req, res) => {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    const tours = await Tour.paginate({}, options);
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create a new tour
export const createTour = async (req, res) => {
  const {
    admin_id,
    title,
    location,
    price,
    description,
    date,
    departure_hour,
    return_hour,
    instruction,
    image,
  } = req.body;

  const tour = new Tour({
    admin_id,
    title,
    location,
    price,
    description,
    date,
    departure_hour,
    return_hour,
    instruction,
    image,
  });

  try {
    const newTour = await tour.save();
    res.status(200).json(newTour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single tour by ID
export const getTourById = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an tour
export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    tour.admin_id = req.body.admin_id || tour.admin_id;
    tour.title = req.body.title || tour.title;
    tour.location = req.body.location || tour.location;
    tour.price = req.body.price || tour.price;
    tour.description = req.body.description || tour.description;
    tour.date = req.body.date || tour.date;
    tour.departure_hour = req.body.departure_hour || tour.departure_hour;
    tour.return_hour = req.body.return_hour || tour.return_hour;
    tour.instruction = req.body.instruction || tour.instruction;
    tour.image = req.body.image || tour.image;

    // if (req.file) {
    //   tour.image = "/uploads/" + req.file.filename;
    // }

    const updatedTour = await tour.save();
    res.status(200).json(updatedTour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a tour
export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndRemove(req.params.tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.status(200).json({ message: "Tour deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
