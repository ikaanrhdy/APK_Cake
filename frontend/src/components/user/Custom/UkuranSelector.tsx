import type { CakeCustomizationState } from "@/hooks/useCakeCustomization";

interface Props {
  state: CakeCustomizationState;
}

const UkuranSelector = ({ state }: Props) => {
  const { ukuranOptions, ukuranId, setUkuranId } = state;

  return (
    <div className="bg-primary/5 rounded-xl p-4 space-y-2">
      <h3 className="font-semibold text-sm">
        Pilih Ukuran <span className="text-red-500">*</span>
      </h3>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        {ukuranOptions.map((u) => (
          <button
            key={u.id}
            type="button"
            onClick={() => setUkuranId(u.id)}
            className={`py-2 rounded text-sm cursor-pointer transition ${
              ukuranId === u.id
                ? "bg-primary text-white"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            {u.nama}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UkuranSelector;
