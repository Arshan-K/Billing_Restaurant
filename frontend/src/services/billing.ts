import api from "./api";

export async function fetchCategories() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
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
