import "next-auth";
import { RoleEnum } from "@/server/schema";

declare module "next-auth" {
  interface User {
    role: typeof RoleEnum.enumValues[number];
  }
  
  interface Session {
    user: User & {
      id: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: typeof RoleEnum.enumValues[number];
    id: string;
  }
} 