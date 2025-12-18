import BelumBayarPage from "./tabs/BelumBayarPage";
import DibatalkanPage from "./tabs/DibatalkanPage";
import DikemasPage from "./tabs/DikemasPage";
import DikirimPage from "./tabs/DikirimPage";
import Pengembalian from "./tabs/Pengembalian";
import SelesaiPage from "./tabs/SelesaiPage";

type Props = {
  status: string;
};

const OrderContent = ({ status }: Props) => {
  switch (status) {
    case "Belum Bayar":
      return <BelumBayarPage />;

    case "Dikemas":
      return <DikemasPage />;

    case "Dikirim":
      return <DikirimPage />;

    case "Selesai":
      return <SelesaiPage />;

    case "Pengembalian":
      return <Pengembalian />;

    case "Dibatalkan":
      return <DibatalkanPage />;

    default:
      return null;
  }
};

export default OrderContent;
