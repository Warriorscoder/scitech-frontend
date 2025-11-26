import {jwtDecode} from "jwt-decode";

export interface TokenUser {
  id: string;
  email: string;
  role: "Admin" | "User";
  exp: number;
  iat: number;
}

export function getUserFromToken(): TokenUser | null {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenUser>(token);
    return decoded;
  } catch (err) {
    console.error("Invalid token");
    return null;
  }
}
