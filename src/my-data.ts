export interface User {
  userId: number;
  jobTitleName: string;
  firstName: string;
  lastName: string;
  preferredFullName: string;
  employeeCode: string;
  region: string;
  phoneNumber: string;
  emailAddress: string;
}

interface Language {
  id: number;
  name: string;
}

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

const languages: Language[] = [
  { id: 1, name: "JavaScript" },
  { id: 2, name: "C#" },
  { id: 3, name: "Python" },
  { id: 4, name: "Go" },
];

export { users, languages };
