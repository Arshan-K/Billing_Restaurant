import type { MenuItem } from "../types/MenuItem";

export default function MenuCard({
  item,
  onClick,
}: {
  item: MenuItem;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50 grid grid-cols-2 sm:grid-cols-3 gap-4"
    >
      <img
        src={item.image_url}
        className="h-24 w-full object-cover rounded"
      />
      <div className="mt-2 text-center">
        <p className="font-medium">{item.name}</p>
        <p className="text-green-600 font-semibold">₹{item.price}</p>
      </div>
    </div>
  );
}
