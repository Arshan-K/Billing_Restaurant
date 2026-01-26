import api from "./api";

export async function login(email: string, password: string) {
  try {
    const res = await api.post("/login", { email, password });
    return res.data.token;
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Invalid credentials");
    }
    throw error;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}
