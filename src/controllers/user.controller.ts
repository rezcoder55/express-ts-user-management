import { type Request, type Response } from "express";
import { UserModel, type User } from "../models/user.model";

/**
 * Controller: Handles incoming HTTP requests and generates responses.
 */

// GET /api/users (supports ?q=... and ?region=...)
export const getAllUsers = (req: Request, res: Response): void => {
  const search = (req.query.q || req.query.search) as string | undefined;
  const region = req.query.region as string | undefined;

  const users = UserModel.findAll({
    search,
    region,
  });

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
};

// GET /api/users/:id
export const getUserById = (req: Request, res: Response): void => {
  const { id } = req.params;
  const user = UserModel.findById(Number(id));

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
};

// POST /api/users
export const createUser = (req: Request, res: Response): void => {
  const { firstName, lastName, region, userId } = req.body as Partial<User>;

  if (!firstName || !lastName) {
    res.status(400).json({
      success: false,
      message: "firstName and lastName are required",
    });
    return;
  }

  const newUser: User = {
    userId: userId || Date.now(),
    firstName,
    lastName,
    region: region || "USA",
  };

  UserModel.create(newUser);

  res.status(201).json({
    success: true,
    message: "User added successfully",
    data: UserModel.findAll(),
  });
};

// PUT /api/users/:id
export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const { firstName, lastName, region } = req.body as Partial<User>;

  if (!firstName || !lastName) {
    res.status(400).json({
      success: false,
      message: "firstName and lastName are required",
    });
    return;
  }

  const updatedUser = UserModel.update(Number(id), {
    firstName,
    lastName,
    region,
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
};

// DELETE /api/users/:id
export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const isDeleted = UserModel.delete(Number(id));

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
};
