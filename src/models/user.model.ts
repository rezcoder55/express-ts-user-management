import { prisma } from "../config/prisma";
import type { User as PrismaUser } from "@prisma/client";

// Re-export the Prisma-generated type so the rest of the app keeps working
export type User = PrismaUser;

export interface UserFilterOptions {
  search?: string;
  region?: string;
}

export const UserModel = {
  findAll: async (filters?: UserFilterOptions): Promise<User[]> => {
    const where: any = {};

    if (filters?.region && filters.region !== "all") {
      where.region = {
        equals: filters.region.trim(),
        mode: "insensitive",
      };
    }

    if (filters?.search && filters.search.trim() !== "") {
      const q = filters.search.trim();
      where.OR = [
        { firstName: { contains: q, mode: "insensitive" } },
        { lastName: { contains: q, mode: "insensitive" } },
        { emailAddress: { contains: q, mode: "insensitive" } },
        { region: { contains: q, mode: "insensitive" } },
        { jobTitleName: { contains: q, mode: "insensitive" } },
      ];
    }

    return prisma.user.findMany({
      where,
      orderBy: { userId: "asc" },
    });
  },

  findById: async (id: number): Promise<User | null> => {
    return prisma.user.findUnique({
      where: { userId: id },
    });
  },

  create: async (userData: Partial<User>): Promise<User> => {
    return prisma.user.create({
      data: {
        firstName: userData.firstName!,
        lastName: userData.lastName!,
        region: userData.region || "USA",
        jobTitleName: userData.jobTitleName || null,
        preferredFullName: userData.preferredFullName || null,
        employeeCode: userData.employeeCode || null,
        phoneNumber: userData.phoneNumber || null,
        emailAddress: userData.emailAddress || null,
      },
    });
  },

  update: async (id: number, updateData: Partial<User>): Promise<User | null> => {
    // Build a data object containing only the fields that were provided
    const data: Record<string, any> = {};

    if (updateData.firstName !== undefined) data.firstName = updateData.firstName;
    if (updateData.lastName !== undefined) data.lastName = updateData.lastName;
    if (updateData.region !== undefined) data.region = updateData.region;
    if (updateData.jobTitleName !== undefined) data.jobTitleName = updateData.jobTitleName;
    if (updateData.preferredFullName !== undefined) data.preferredFullName = updateData.preferredFullName;
    if (updateData.emailAddress !== undefined) data.emailAddress = updateData.emailAddress;
    if (updateData.phoneNumber !== undefined) data.phoneNumber = updateData.phoneNumber;
    if (updateData.employeeCode !== undefined) data.employeeCode = updateData.employeeCode;

    if (Object.keys(data).length === 0) {
      return UserModel.findById(id);
    }

    try {
      return await prisma.user.update({
        where: { userId: id },
        data,
      });
    } catch (error: any) {
      // Prisma throws P2025 when the record to update is not found
      if (error.code === "P2025") {
        return null;
      }
      throw error;
    }
  },

  delete: async (id: number): Promise<boolean> => {
    try {
      await prisma.user.delete({
        where: { userId: id },
      });
      return true;
    } catch (error: any) {
      // Prisma throws P2025 when the record to delete is not found
      if (error.code === "P2025") {
        return false;
      }
      throw error;
    }
  },
};
