export interface User {
  userId: number;
  jobTitleName?: string;
  firstName: string;
  lastName: string;
  preferredFullName?: string;
  employeeCode?: string;
  region: string;
  phoneNumber?: string;
  emailAddress?: string;
}

// Initial mock dataset
const users: User[] = [
  {
    userId: 1,
    jobTitleName: "Developer",
    firstName: "Romin",
    lastName: "Irani",
    preferredFullName: "Romin Irani",
    employeeCode: "E1",
    region: "USA",
    phoneNumber: "408-1234567",
    emailAddress: "romin.k@gmail.com",
  },
  {
    userId: 2,
    jobTitleName: "Developer",
    firstName: "Neil",
    lastName: "Irani",
    preferredFullName: "Neil Irani",
    employeeCode: "E2",
    region: "USA",
    phoneNumber: "408-1111111",
    emailAddress: "neilrira@gmail.com",
  },
  {
    userId: 3,
    jobTitleName: "Program Directory",
    firstName: "Tom",
    lastName: "Hanks",
    preferredFullName: "Tom Hanks",
    employeeCode: "E3",
    region: "USA",
    phoneNumber: "408-2222222",
    emailAddress: "tomanks@gmail.com",
  },
];

export interface UserFilterOptions {
  search?: string;
  region?: string;
}

export const UserModel = {
  findAll: (filters?: UserFilterOptions): User[] => {
    let result = users;

    if (filters?.region && filters.region !== "all") {
      const targetRegion = filters.region.trim().toLowerCase();
      result = result.filter(
        (user) => user.region && user.region.toLowerCase() === targetRegion
      );
    }

    if (filters?.search && filters.search.trim() !== "") {
      const q = filters.search.trim().toLowerCase();
      result = result.filter((user) => {
        const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase();
        const firstName = (user.firstName || "").toLowerCase();
        const lastName = (user.lastName || "").toLowerCase();
        const email = (user.emailAddress || "").toLowerCase();
        const region = (user.region || "").toLowerCase();
        const job = (user.jobTitleName || "").toLowerCase();

        return (
          fullName.includes(q) ||
          firstName.includes(q) ||
          lastName.includes(q) ||
          email.includes(q) ||
          region.includes(q) ||
          job.includes(q)
        );
      });
    }

    return result;
  },

  findById: (id: number): User | undefined => {
    return users.find((user) => Number(user.userId) === Number(id));
  },

  create: (userData: User): User => {
    users.push(userData);
    return userData;
  },

  update: (id: number, updateData: Partial<User>): User | null => {
    const user = users.find((user) => Number(user.userId) === Number(id));
    if (!user) return null;

    if (updateData.firstName !== undefined) user.firstName = updateData.firstName;
    if (updateData.lastName !== undefined) user.lastName = updateData.lastName;
    if (updateData.region !== undefined) user.region = updateData.region;

    return user;
  },

  delete: (id: number): boolean => {
    const index = users.findIndex((user) => Number(user.userId) === Number(id));
    if (index === -1) return false;

    users.splice(index, 1);
    return true;
  },
};
