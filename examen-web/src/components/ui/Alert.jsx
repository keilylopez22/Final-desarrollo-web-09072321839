export default function Alert({ title, messages = [] }) {
  if (!title) return null;
  return (
    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
      <p className="font-semibold">{title}</p>
      {messages.length > 0 && (
        <ul className="mt-1 list-inside list-disc">
          {messages.map((msg) => <li key={msg}>{msg}</li>)}
        </ul>
      )}
    </div>
  );
}
