import { useEffect, useState } from "react";
import type { Bill } from "../types/bill";
import { fetchBills, fetchBill } from "../services/history";

export default function History() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [selected, setSelected] = useState<Bill | null>(null);

  useEffect(() => {
    fetchBills().then(setBills);
  }, []);

  return (
    <div className="p-4 flex flex-col md:flex-row gap-6">
      {/* Bills List */}
      <div className="w-full md:w-1/3 bg-white border rounded">
        <h2 className="font-semibold p-3 border-b">History</h2>
        {bills.map(bill => (
          <div
            key={bill.id}
            className="p-3 border-b cursor-pointer hover:bg-gray-50"
            onClick={async () => setSelected(await fetchBill(bill.id))}
          >
            <div className="flex justify-between">
              <span>₹{bill.total_amount}</span>
              <span className="text-sm text-gray-500">
                {bill.payment_method === "online" ? "Online" : "Offline"}
              </span>
            </div>
            <p className="text-xs text-gray-400">
              {new Date(bill.created_at).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      {/* Bill Detail */}
      <div className="flex-1 bg-white border rounded p-4">
        {!selected ? (
          <p>Select a bill to view details</p>
        ) : (
          <>
            <h3 className="font-semibold mb-4">
              Bill #{selected.id}
            </h3>

            {selected.bill_items?.map(item => (
              <div
                key={item.id}
                className="flex justify-between mb-2"
              >
                <span>
                  {item.menu_item.name} x {item.quantity}
                </span>
                <span>₹{item.total_price}</span>
              </div>
            ))}

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{selected.total_amount}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
