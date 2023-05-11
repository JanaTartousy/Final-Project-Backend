import Admin from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

// get all admins and super admin
export async function getAllAdmins(req, res, next) {
  try {
    const { page, limit } = req.query;
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(limit, 10) || 10,
    };
    await Admin.paginate({}, options)
      .then((response) => res.status(200).json({ success: true, response }))
      .catch((err) => res.status(404).json({ success: false, err }));
  } catch (err) {
    return next(err);
  }
}

// get admin by id
export async function getAdminById(req, res, next) {
  try {
    const { adminId } = req.params;
    await Admin.findById(adminId)
      .then((response) => {
        if (response) {
          response.password = undefined;
          res.status(200).json({
            success: true,
            response,
            imagePath: `http://localhost:${process.env.PORT}/${response.image}`,
          });
        } else {
          res.status(404).json({ success: false, message: "Admin not found" });
        }
      })
      .catch((err) =>
        res.status(404).json({ success: false, message: "Admin not found", err })
      );
  } catch (err) {
    return next(err);
  }
}

// register a new admin account (as either admin or super admin)
export async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Email is required for registration",
      });
    }
    let role = "admin";
    if (req.user.role === "superAdmin") {
      // If the user making the request is a super admin, they can register a super admin
      role = "superAdmin";
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
      image: req.file ? req.file.path : undefined,
    });

    await admin
      .save()
      .then((response) => {
        const token = jwt.sign(
          {
            user_id: response._id,
            username,
            phone,
            email,
            role: admin.role,
          },
          process.env.TOKEN_KEY,
          { expiresIn: "5h" }
        );
        response.password = undefined;
        res
          .status(200)
          .json({ success: true, response, token });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          return res.status(404).json({
            success: false,
            err: "Email   already in use",
          });
        } else {
          return res.status(404).json({ success: false, err });
        }
      });
  } catch (err) {
    return next(err);
  }
}

// update admin by id
export async function updateAdmin(req, res, next) {
  try {
    const { adminId } = req.params;
    const { username, email, password } = req.body;

    const updates = {};
    if (username) updates.username = username
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.password = hashedPassword;
    }
    if (req.file) {
      const admin = await Admin.findById(adminId);
      if (admin.image) {
        // Delete previous image if it exists
        fs.unlink(admin.image, (err) => {
          if (err) console.log(err);
        });
      }
      updates.image = req.file.path;
    }

    await Admin.findByIdAndUpdate(adminId, updates, { new: true })
      .then((response) => {
        if (response) {
          response.password = undefined;
          res.status(200).json({ success: true, response });
        } else {
          res.status(404).json({ success: false, message: "Admin not found" });
        }
      })
      .catch((err) =>
        res.status(404).json({ success: false, message: "Admin not found", err })
      );
  } catch (err) {
    return next(err);
  }
}

//Delete an admin
export const deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    if (admin.image) {
      // Delete admin's image if it exists
      fs.unlink(admin.image, (err) => {
        if (err) console.log(err);
      });
    }

    await Admin.findByIdAndRemove(adminId);

    res.status(200).json({ success: true, message: "Admin deleted successfully" });
  } catch (err) {
    return next(err);
  }
};

// Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Perform additional tasks if needed
    // For example, create a token and send it in the response

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    return next(err);
  }
};

// Logout
export const logout = (req, res) => {
  // Perform any necessary logout actions
  // For example, invalidate the token or clear session data

  res.status(200).json({ success: true, message: "Logout successful" });
};