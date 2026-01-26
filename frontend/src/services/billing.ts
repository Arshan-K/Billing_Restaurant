import api from "./api";

export async function fetchCategories() {
  const res = await api.get("/categories");
  return res.data;
}

export async function createBill(
  payment_method: "online" | "offline",
  items: { menu_item_id: number; quantity: number }[]
) {
  return api.post("/bills", {
    payment_method,
    items,
  });
}
