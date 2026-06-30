import type { CakeCustomizationState } from "@/hooks/useCakeCustomization";

interface Props {
  state: CakeCustomizationState;
}

const LayerSelector = ({ state }: Props) => {
  const { layerOptions, layerId, setLayerId } = state;

  return (
    <div className="bg-primary/5 rounded-xl p-4 space-y-2">
      <h3 className="font-semibold text-sm">
        Pilih Layer Cake <span className="text-red-500">*</span>
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {layerOptions.map((l) => (
          <button
            key={l.id}
            type="button"
            onClick={() => setLayerId(l.id)}
            className={`py-2 rounded text-sm cursor-pointer transition ${
              layerId === l.id
                ? "bg-primary text-white"
                : "bg-white border text-gray-700 hover:bg-gray-100"
            }`}
          >
            {l.nama}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayerSelector;
