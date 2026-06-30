import { useState } from "react";
import { product } from "@/data/product";
import { useKustomisasiStore } from "@/app/store/admin/useKustomisasiStore";

export const useCakeCustomization = () => {
  const data = product[0];
  const storeItems = useKustomisasiStore((s) => s.items);

  const available = (tab: keyof typeof storeItems) =>
    storeItems[tab].filter((i) => i.status === "Tersedia");

  const ukuranOptions = available("Ukuran");
  const layerOptions = available("Layer");
  const baseCakeOptions = available("Base Cake");
  const tipeCreamOptions = available("Tipe Cream");
  const warnaCreamOptions = available("Warna Cream");
  const toppingOptions = available("Topping");
  const lilinOptions = available("Lilin");
  const topperOptions = available("Topper");

  // ===== STATE PILIHAN USER =====
  const [ukuranId, setUkuranId] = useState(ukuranOptions[2]?.id ?? "");
  const [layerId, setLayerId] = useState(layerOptions[2]?.id ?? "");
  const [baseCakeId, setBaseCakeId] = useState(baseCakeOptions[0]?.id ?? "");
  const [tipeCreamId, setTipeCreamId] = useState(tipeCreamOptions[0]?.id ?? "");
  const [warnaCreamId, setWarnaCreamId] = useState("");

  const [referensiMode, setReferensiMode] = useState<"url" | "upload">("url");
  const [referensiUrl, setReferensiUrl] = useState("");
  const [referensiFile, setReferensiFile] = useState<File | null>(null);

  const [toppingId, setToppingId] = useState("");
  const [toppingQty, setToppingQty] = useState(1);

  const [lilinId, setLilinId] = useState("");
  const [lilinAngka, setLilinAngka] = useState("");
  const [lilinQty, setLilinQty] = useState(0);

  const [topperNama, setTopperNama] = useState("");
  const [topperQty, setTopperQty] = useState(0);

  const [dekorasiLainnya, setDekorasiLainnya] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [catatan, setCatatan] = useState("");

  // ===== DERIVED DATA =====
  const selectedUkuran = ukuranOptions.find((u) => u.id === ukuranId);
  const selectedLayer = layerOptions.find((l) => l.id === layerId);
  const selectedBaseCake = baseCakeOptions.find((b) => b.id === baseCakeId);
  const selectedTipeCream = tipeCreamOptions.find((t) => t.id === tipeCreamId);
  const selectedWarnaCream = warnaCreamOptions.find(
    (w) => w.id === warnaCreamId,
  );
  const selectedTopping = toppingOptions.find((t) => t.id === toppingId);
  const selectedLilin = lilinOptions.find((l) => l.id === lilinId);
  const topperHarga = topperOptions[0]?.harga ?? 0;

  // ===== HITUNG HARGA =====
  const hargaUkuran = selectedUkuran?.harga ?? 0;
  const hargaLayer = selectedLayer?.harga ?? 0;
  const hargaBaseCake = selectedBaseCake?.harga ?? 0;
  const hargaTipeCream = selectedTipeCream?.harga ?? 0;

  const subtotalTopping = (selectedTopping?.harga ?? 0) * toppingQty;
  const subtotalLilin = (selectedLilin?.harga ?? 0) * lilinQty;
  const subtotalTopper = topperQty > 0 ? topperHarga * topperQty : 0;
  const totalDekorasi = subtotalTopping + subtotalLilin + subtotalTopper;

  const hargaKueDasar = data?.price ?? 0;

  const totalHarga =
    hargaKueDasar +
    hargaUkuran +
    hargaLayer +
    hargaBaseCake +
    hargaTipeCream +
    totalDekorasi;

  const isValid = Boolean(
    selectedUkuran &&
    selectedLayer &&
    selectedBaseCake &&
    selectedTipeCream &&
    selectedWarnaCream,
  );

  return {
    data,
    // options
    ukuranOptions,
    layerOptions,
    baseCakeOptions,
    tipeCreamOptions,
    warnaCreamOptions,
    toppingOptions,
    lilinOptions,
    topperHarga,
    // selected ids + setter
    ukuranId,
    setUkuranId,
    layerId,
    setLayerId,
    baseCakeId,
    setBaseCakeId,
    tipeCreamId,
    setTipeCreamId,
    warnaCreamId,
    setWarnaCreamId,
    // selected objects
    selectedUkuran,
    selectedLayer,
    selectedBaseCake,
    selectedTipeCream,
    selectedWarnaCream,
    selectedTopping,
    selectedLilin,
    // referensi
    referensiMode,
    setReferensiMode,
    referensiUrl,
    setReferensiUrl,
    referensiFile,
    setReferensiFile,
    // dekorasi
    toppingId,
    setToppingId,
    toppingQty,
    setToppingQty,
    lilinId,
    setLilinId,
    lilinAngka,
    setLilinAngka,
    lilinQty,
    setLilinQty,
    topperNama,
    setTopperNama,
    topperQty,
    setTopperQty,
    dekorasiLainnya,
    setDekorasiLainnya,
    // ucapan & catatan
    ucapan,
    setUcapan,
    catatan,
    setCatatan,
    // harga
    hargaKueDasar,
    hargaUkuran,
    hargaLayer,
    hargaBaseCake,
    hargaTipeCream,
    subtotalTopping,
    subtotalLilin,
    subtotalTopper,
    totalDekorasi,
    totalHarga,
    isValid,
  };
};

export type CakeCustomizationState = ReturnType<typeof useCakeCustomization>;
