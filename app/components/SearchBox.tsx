export default function SearchBox() {
  return (
    <input
      type="text"
      placeholder="Buscar posts..."
      className="w-[50%] rounded-md border border-neutral-300 
                   bg-transparent py-2 pl-4 text-sm
                   focus:outline-none focus:ring-1 
                   focus:ring-neutral-400"
    />
  );
}