export interface products {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  size: string[];
  rating: number;
  reviews: number;
}

export interface productsAdmin {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  size: string[];
  rating: number;
  reviews: number;
  variant: string[];
  stock: number;
  note: string;
}

export interface productCart {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
  size: string;
  rating: number;
  reviews: number;
}

export interface Profile {
  name: string;
  email: string;
  birthdate: string;
  gender: string;
  phone: string;
  avatar: string;

  updateField: (
    field: keyof Omit<Profile, "updateField" | "reset">,
    value: string
  ) => void;
  reset: () => void;
}
