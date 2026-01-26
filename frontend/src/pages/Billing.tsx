import { useState } from "react";
import MenuSection from "../components/MenuSection";
import BillPanel from "../components/BillPanel";
import type { MenuItem } from "../types/MenuItem";
import { createBill } from "../services/billing";

export default function Billing() {
  const [billItems, setBillItems] = useState<MenuItem[]>([]);
  const [saving, setSaving] = useState(false);

  const addItem = (item: MenuItem) => {
    setBillItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQty = (id: number, qty: number) => {
    setBillItems(prev =>
      prev
        .map(i => (i.id === id ? { ...i, quantity: qty } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const saveBill = async (payment: "online" | "offline") => {
    if (billItems.length === 0) return;

    setSaving(true);
    try {
      await createBill(
        payment,
        billItems.map(i => ({
          menu_item_id: i.id,
          quantity: i.quantity,
        }))
      );
      setBillItems([]); // clear bill
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-full">
      <div className="flex-1 overflow-y-auto p-4">
        <MenuSection onAdd={addItem} />
      </div>

      <BillPanel
        items={billItems}
        onQtyChange={updateQty}
        onSave={saveBill}
        saving={saving}
      />
    </div>
  );
}
