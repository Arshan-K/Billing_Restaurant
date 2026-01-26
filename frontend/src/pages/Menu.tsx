import { useEffect, useState } from "react";
import {
  fetchMenu,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../services/menu";
import { fetchCategories } from "../services/menu";

export default function Menu() {
  const [items, setItems] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    name: "",
    price: "",
    category_id: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const load = () => fetchMenu().then(setItems);

  useEffect(() => {
    load();
    fetchCategories().then(setCategories);
  }, []);

  const submit = async () => {
    if (editingId) {
        await updateMenuItem(editingId, form);
        setEditingId(null);
    } else {
        await createMenuItem({ menu_item: form });
    }
    setForm({ name: "", price: "", category_id: "", image_url: "" });
    load();
  };

  return (
    <div className="p-4 max-w-3xl">
      <h2 className="text-xl font-semibold mb-4">Menu Management</h2>

      {/* Create */}
      <div className="bg-white p-4 border rounded mb-6 space-y-3">
        <input
          placeholder="Item name"
          className="border p-2 w-full"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Price"
          type="number"
          className="border p-2 w-full"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />

        <select
          className="border p-2 w-full"
          value={form.category_id}
          onChange={e => setForm({ ...form, category_id: e.target.value })}
        >
          <option value="">Select category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input
          placeholder="Image URL (Google image link)"
          className="border p-2 w-full"
          value={form.image_url}
          onChange={e => setForm({ ...form, image_url: e.target.value })}
        />

        <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
        >
            {editingId ? "Update Menu Item" : "Add Menu Item"}
        </button>
      </div>

      {/* List */}
      <div className="bg-white border rounded space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex justify-between p-3 border-b">
            <div className="flex items-center gap-3">
              {item.image_url && (
                <img
                  src={item.image_url}
                  className="h-14 w-14 object-cover rounded"
                />
              )}
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">
                  ₹{item.price} • {item.category?.name}
                </p>
              </div>
            </div>

            <div className="space-x-2">
              {/* <button
                onClick={() =>
                  updateMenuItem(item.id, { active: !item.active }).then(load)
                }
                className="text-blue-600"
              >
                {item.active ? "Disable" : "Enable"}
              </button> */}
              <button
                onClick={() => {
                    setEditingId(item.id);
                    setForm({
                        name: item.name,
                        price: item.price,
                        category_id: item.category_id,
                        image_url: item.image_url || "",
                    });
                }}
                className="text-green-600"
                >
                Edit
                </button>
              <button
                onClick={() => deleteMenuItem(item.id).then(load)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
