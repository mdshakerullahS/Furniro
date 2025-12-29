import { create } from "zustand";

const useProducts = create((set) => ({
  products: [],
  totalProducts: null,

  getProducts: async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
      const data = await res.json();

      set({ products: data.products, totalProducts: data.totalProducts });
    } catch (error) {
      console.log(error.message);
    }
  },
}));

export default useProducts;
