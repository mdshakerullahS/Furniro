import { create } from "zustand";

const useProducts = create((set) => ({
  products: [],

  getProducts: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();

      set({ products: data.products });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useProducts;
