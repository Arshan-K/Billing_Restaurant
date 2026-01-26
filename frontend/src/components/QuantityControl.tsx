export default function QuantityControl({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => onChange(qty - 1)} className="px-2 border">-</button>
      <span>{qty}</span>
      <button onClick={() => onChange(qty + 1)} className="px-2 border">+</button>
    </div>
  );
}
