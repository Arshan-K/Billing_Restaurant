import api from "./api";

export async function fetchBills() {
  const res = await api.get("/bills");
  return res.data;
}

export async function fetchBill(id: number) {
  const res = await api.get(`/bills/${id}`);
  return res.data;
}
