export default function PaymentSelector({
  value,
  onChange,
}: {
  value: "online" | "offline";
  onChange: (v: "online" | "offline") => void;
}) {
  return (
    <div className="flex gap-4">
      {["offline", "online"].map(p => (
        <label key={p} className="flex items-center gap-2">
          <input
            type="radio"
            checked={value === p}
            onChange={() => onChange(p as any)}
          />
          {p.toUpperCase()}
        </label>
      ))}
    </div>
  );
}
