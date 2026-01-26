import api from "./api";

export async function login(email: string, password: string) {
  const res = await api.post("/login", { email, password });
  return res.data.token;
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}
