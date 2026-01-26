import { useState } from "react";
import QuantityControl from "./QuantityControl";
import PaymentSelector from "./PaymentSelector";
import type { MenuItem } from "../types/MenuItem";

export default function BillPanel({
  items,
  onQtyChange,
  onSave,
  saving,
}: {
  items: MenuItem[];
  onQtyChange: (id: number, qty: number) => void;
  onSave: (p: "online" | "offline") => void;
  saving: boolean;
}) {
  const [payment, setPayment] = useState<"online" | "offline">("offline");

  const total = items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  return (
    <div className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l bg-white border-l p-4 flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Current Bill</h3>

      <div className="flex-1 overflow-y-auto space-y-3">
        {items.map(item => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                ₹{item.price}
              </p>
            </div>

            <QuantityControl
              qty={item.quantity}
              onChange={q => onQtyChange(item.id, q)}
            />
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <PaymentSelector value={payment} onChange={setPayment} />

        <div className="flex justify-between text-lg font-bold mt-3">
          <span>Total</span>
          <span>₹{total}</span>
        </div>

        <button
          disabled={saving || items.length === 0}
          onClick={() => onSave(payment)}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Bill"}
        </button>
      </div>
    </div>
  );
}
