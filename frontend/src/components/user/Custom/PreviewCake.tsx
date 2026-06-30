import type { CakeCustomizationState } from "@/hooks/useCakeCustomization";

interface Props {
  state: CakeCustomizationState;
}

const PreviewCake = ({ state }: Props) => {
  const {
    data,
    selectedLayer,
    selectedBaseCake,
    selectedTipeCream,
    selectedWarnaCream,
    referensiMode,
    referensiUrl,
    referensiFile,
  } = state;

  return (
    <div className="bg-white rounded-xl p-4 border space-y-3">
      <p className="font-semibold">Preview Cake</p>

      <div className="flex justify-center py-2">
        <img
          src={data?.image}
          alt={data?.title}
          className="w-32 h-32 object-contain"
        />
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {selectedLayer && (
          <span className="text-xs border border-primary text-primary rounded-full px-3 py-1">
            {selectedLayer.nama} Layer
          </span>
        )}
        {selectedBaseCake && (
          <span className="text-xs border border-primary text-primary rounded-full px-3 py-1">
            {selectedBaseCake.nama}
          </span>
        )}
        {selectedTipeCream && (
          <span className="text-xs border border-primary text-primary rounded-full px-3 py-1">
            {selectedTipeCream.nama}
          </span>
        )}
        {selectedWarnaCream && (
          <span className="text-xs bg-primary text-white rounded-full px-3 py-1">
            {selectedWarnaCream.nama}
          </span>
        )}
      </div>

      {referensiMode === "url" && referensiUrl && (
        <div className="relative rounded-lg overflow-hidden border">
          <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
            Referensi Cake
          </span>
          <img
            src={referensiUrl}
            alt="Referensi"
            className="w-full h-40 object-cover"
          />
        </div>
      )}
      {referensiMode === "upload" && referensiFile && (
        <div className="relative rounded-lg overflow-hidden border">
          <span className="absolute top-2 left-2 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">
            Referensi Cake
          </span>
          <img
            src={URL.createObjectURL(referensiFile)}
            alt="Referensi"
            className="w-full h-40 object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default PreviewCake;
