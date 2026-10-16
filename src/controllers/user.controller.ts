import { type Request, type Response } from "express";
import { UserModel, type User } from "../models/user.model";

/**
 * Controller: Handles incoming HTTP requests and generates responses.
 */

// GET /api/users (supports ?q=... and ?region=...)
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const search = (req.query.q || req.query.search) as string | undefined;
    const region = req.query.region as string | undefined;

    const users = await UserModel.findAll({
      search,
      region,
    });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    console.error("Error in getAllUsers:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed: " + (error?.message || "Internal server error"),
    });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(Number(id));

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error("Error in getUserById:", error);
    res.status(500).json({
      success: false,
      message: "Database query failed: " + (error?.message || "Internal server error"),
    });
  }
};

// POST /api/users
export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, region, jobTitleName, emailAddress, phoneNumber } = req.body as Partial<User>;

    if (!firstName || !lastName) {
      res.status(400).json({
        success: false,
        message: "firstName and lastName are required",
      });
      return;
    }

    const newUser = await UserModel.create({
      firstName,
      lastName,
      region: region || "USA",
      jobTitleName,
      emailAddress,
      phoneNumber,
    });

    res.status(201).json({
      success: true,
      message: "User added successfully",
      data: newUser,
    });
  } catch (error: any) {
    console.error("Error in createUser:", error);
    res.status(500).json({
      success: false,
      message: "Database insert failed: " + (error?.message || "Internal server error"),
    });
  }
};

// PUT /api/users/:id
export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, region, jobTitleName, emailAddress, phoneNumber } = req.body as Partial<User>;

    if (!firstName || !lastName) {
      res.status(400).json({
        success: false,
        message: "firstName and lastName are required",
      });
      return;
    }

    const updatedUser = await UserModel.update(Number(id), {
      firstName,
      lastName,
      region,
      jobTitleName,
      emailAddress,
      phoneNumber,
    });

    if (!updatedUser) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error: any) {
    console.error("Error in updateUser:", error);
    res.status(500).json({
      success: false,
      message: "Database update failed: " + (error?.message || "Internal server error"),
    });
  }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const isDeleted = await UserModel.delete(Number(id));

    if (!isDeleted) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error: any) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({
      success: false,
      message: "Database delete failed: " + (error?.message || "Internal server error"),
    });
  }
};
