export interface Admin {
    id: string;
    username: string;
    role: "SUPERADMIN" | "ADMIN";
    phone: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  }