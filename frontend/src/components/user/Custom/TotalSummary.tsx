import type { CakeCustomizationState } from "@/hooks/useCakeCustomization";

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

interface Props {
  state: CakeCustomizationState;
}

const TotalSummary = ({ state }: Props) => {
  const {
    totalHarga,
    hargaKueDasar,
    selectedUkuran,
    selectedLayer,
    hargaLayer,
    selectedBaseCake,
    hargaBaseCake,
    totalDekorasi,
  } = state;

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-2">
      <p className="font-semibold text-primary text-sm">
        TOTAL HARGA KUSTOMISASI
      </p>
      <p className="text-2xl font-bold text-primary">{formatRp(totalHarga)}</p>

      <div className="space-y-1 text-xs pt-2 border-t">
        <div className="flex justify-between">
          <span>Harga Kue Dasar</span>
          <span>{formatRp(hargaKueDasar)}</span>
        </div>
        {selectedUkuran && (
          <div className="flex justify-between">
            <span>Ukuran</span>
            <span>{selectedUkuran.nama}</span>
          </div>
        )}
        {selectedLayer && (
          <div className="flex justify-between">
            <span>Tambah Layer</span>
            <span>
              {selectedLayer.nama} layer{" "}
              {hargaLayer > 0 ? `(+${formatRp(hargaLayer)})` : ""}
            </span>
          </div>
        )}
        {selectedBaseCake && (
          <div className="flex justify-between">
            <span>Base Cake</span>
            <span>{formatRp(hargaBaseCake)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>Dekorasi</span>
          <span>{formatRp(totalDekorasi)}</span>
        </div>
      </div>
    </div>
  );
};

export default TotalSummary;
