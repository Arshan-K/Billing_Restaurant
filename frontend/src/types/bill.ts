export interface BillItem {
  id: number;
  quantity: number;
  price_at_time: number;
  total_price: number;
  menu_item: { name: string };
}

export interface Bill {
  id: number;
  total_amount: number;
  payment_method: "online" | "offline";
  created_at: string;
  bill_items?: BillItem[];
}
