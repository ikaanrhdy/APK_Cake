import type { CakeCustomizationState } from "@/hooks/useCakeCustomization";

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

interface Props {
  state: CakeCustomizationState;
}

const DropdownPilihan = ({ state }: Props) => {
  const {
    baseCakeOptions,
    baseCakeId,
    setBaseCakeId,
    tipeCreamOptions,
    tipeCreamId,
    setTipeCreamId,
    warnaCreamOptions,
    warnaCreamId,
    setWarnaCreamId,
  } = state;

  return (
    <div className="bg-primary/5 rounded-xl p-4 space-y-4">
      <div>
        <label className="text-sm font-semibold">
          Pilih Base Cake <span className="text-red-500">*</span>
        </label>
        <select
          value={baseCakeId}
          onChange={(e) => setBaseCakeId(e.target.value)}
          className="mt-1 w-full bg-white border rounded-md px-3 py-2 text-sm cursor-pointer"
        >
          <option value="">Pilih base cake...</option>
          {baseCakeOptions.map((b) => (
            <option key={b.id} value={b.id}>
              {b.nama} {b.harga ? `(+${formatRp(b.harga)})` : "(Gratis)"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold">
          Tipe Cream <span className="text-red-500">*</span>
        </label>
        <select
          value={tipeCreamId}
          onChange={(e) => setTipeCreamId(e.target.value)}
          className="mt-1 w-full bg-white border rounded-md px-3 py-2 text-sm cursor-pointer"
        >
          <option value="">Pilih tipe cream...</option>
          {tipeCreamOptions.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nama} {t.harga ? `(+${formatRp(t.harga)})` : "(Gratis)"}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-semibold">
          Pilih Warna Cream <span className="text-red-500">*</span>
        </label>
        <select
          value={warnaCreamId}
          onChange={(e) => setWarnaCreamId(e.target.value)}
          className="mt-1 w-full bg-white border rounded-md px-3 py-2 text-sm cursor-pointer"
        >
          <option value="">Pilih warna cream...</option>
          {warnaCreamOptions.map((w) => (
            <option key={w.id} value={w.id}>
              {w.nama}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownPilihan;
