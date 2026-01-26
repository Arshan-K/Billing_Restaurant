import api from "./api";

export function fetchMenu() {
  return api.get("/menu_items").then(r => r.data);
}

export function createMenuItem(data: any) {
  return api.post("/menu_items", { menu_item: data });
}

export function updateMenuItem(id: number, data: any) {
  return api.put(`/menu_items/${id}`, { menu_item: data });
}

export function deleteMenuItem(id: number) {
  return api.delete(`/menu_items/${id}`);
}

export function fetchCategories() {
  return api.get("/categories").then(res => res.data);
}