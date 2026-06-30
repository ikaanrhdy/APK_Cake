import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { CakeCustomizationState } from "@/hooks/useCakeCustomization";

const formatRp = (n: number) => `Rp ${n.toLocaleString("id-ID")}`;

interface Props {
  state: CakeCustomizationState;
}

const DekorasiSection = ({ state }: Props) => {
  const {
    toppingOptions,
    toppingId,
    setToppingId,
    toppingQty,
    setToppingQty,
    lilinOptions,
    lilinId,
    setLilinId,
    lilinAngka,
    setLilinAngka,
    lilinQty,
    setLilinQty,
    topperHarga,
    topperNama,
    setTopperNama,
    topperQty,
    setTopperQty,
    dekorasiLainnya,
    setDekorasiLainnya,
    selectedTopping,
    selectedLilin,
    subtotalTopping,
    subtotalLilin,
    subtotalTopper,
    totalDekorasi,
  } = state;

  return (
    <div className="bg-primary/5 rounded-xl p-4 space-y-5">
      <div>
        <h3 className="font-semibold text-sm">Tambah Dekorasi</h3>
        <p className="text-xs text-gray-500">
          (lilin angka/huruf, & topper tambahkan catatan)
        </p>
      </div>

      {/* TOPPING */}
      <div>
        <p className="text-sm font-medium mb-2">Topping</p>
        <div className="grid grid-cols-3 gap-2">
          {toppingOptions.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => {
                setToppingId(t.id === toppingId ? "" : t.id);
                setToppingQty(1);
              }}
              className={`py-2 rounded text-xs cursor-pointer transition flex flex-col items-center gap-0.5 ${
                toppingId === t.id
                  ? "bg-primary text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{t.nama}</span>
              <span className="opacity-80">
                {t.harga ? formatRp(t.harga) : "(free)"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* LILIN */}
      <div>
        <p className="text-sm font-medium mb-2">
          Pilih Tipe Lilin <span className="text-gray-400">(Pilih 1)</span>
        </p>
        <div className="grid grid-cols-3 gap-2">
          {lilinOptions.map((l) => (
            <button
              key={l.id}
              type="button"
              onClick={() => {
                setLilinId(l.id === lilinId ? "" : l.id);
                setLilinQty(l.id === lilinId ? 0 : 1);
              }}
              className={`py-2 rounded text-xs cursor-pointer transition flex flex-col items-center gap-0.5 ${
                lilinId === l.id
                  ? "bg-primary text-white"
                  : "bg-white border text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span>{l.nama}</span>
              <span className="opacity-80">
                {l.harga ? formatRp(l.harga) : "(free)"}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* TOPPER */}
      <div>
        <p className="text-sm font-medium mb-2">
          Topper <span className="text-gray-400">(Opsional)</span>
        </p>
        <div className="flex items-center justify-between bg-white border rounded-md px-3 py-2">
          <span className="text-xs">Tambah Topper {formatRp(topperHarga)}</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTopperQty((q) => Math.max(0, q - 1))}
              className="p-1 rounded border cursor-pointer hover:bg-gray-100"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm w-4 text-center">{topperQty}</span>
            <button
              type="button"
              onClick={() => setTopperQty((q) => q + 1)}
              className="p-1 rounded border cursor-pointer hover:bg-gray-100"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* DEKORASI LAINNYA */}
      <div>
        <p className="text-sm font-medium mb-2">
          Dekorasi Lainnya <span className="text-gray-400">(Opsional)</span>
        </p>
        <Input
          value={dekorasiLainnya}
          onChange={(e) => setDekorasiLainnya(e.target.value)}
          placeholder="Tambahkan detail aksesori / warna / preferensi lainnya..."
          className="bg-white text-sm"
        />
      </div>

      {/* CATATAN & RINCIAN HARGA DEKORASI */}
      {(selectedTopping || selectedLilin || topperQty > 0) && (
        <div className="bg-white rounded-md border p-3 space-y-3">
          <p className="text-sm font-medium">
            Catatan & Rincian Harga Dekorasi
          </p>

          {selectedLilin && (
            <div className="flex items-center gap-2">
              <Input
                value={lilinAngka}
                onChange={(e) => setLilinAngka(e.target.value)}
                placeholder="Cantumkan Angka/huruf (misal: 23)"
                className="text-xs flex-1"
              />
              <div className="flex items-center gap-1 border rounded-md px-2 py-1">
                <button
                  type="button"
                  onClick={() => setLilinQty((q) => Math.max(0, q - 1))}
                  className="cursor-pointer"
                >
                  <Minus size={12} />
                </button>
                <span className="text-xs w-4 text-center">{lilinQty}</span>
                <button
                  type="button"
                  onClick={() => setLilinQty((q) => q + 1)}
                  className="cursor-pointer"
                >
                  <Plus size={12} />
                </button>
              </div>
            </div>
          )}

          {topperQty > 0 && (
            <div className="flex items-center gap-2">
              <Input
                value={topperNama}
                onChange={(e) => setTopperNama(e.target.value)}
                placeholder="Nama / tema topper (misal: Doraemon)"
                className="text-xs flex-1"
              />
              <p className="text-[10px] text-gray-400 shrink-0">
                Klik tombol Topper di atas untuk mengaktifkan
              </p>
            </div>
          )}

          <div className="space-y-1 text-xs pt-1 border-t">
            {selectedTopping && (
              <div className="flex justify-between">
                <span>
                  {selectedTopping.nama} x{toppingQty}
                </span>
                <span>{formatRp(subtotalTopping)}</span>
              </div>
            )}
            {selectedLilin && (
              <div className="flex justify-between">
                <span>
                  {selectedLilin.nama} x{lilinQty}
                </span>
                <span>{formatRp(subtotalLilin)}</span>
              </div>
            )}
            {topperQty > 0 && (
              <div className="flex justify-between">
                <span>Topper x{topperQty}</span>
                <span>{formatRp(subtotalTopper)}</span>
              </div>
            )}
            <div className="flex justify-between font-semibold pt-1 border-t">
              <span>Total Dekorasi</span>
              <span>{formatRp(totalDekorasi)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DekorasiSection;
