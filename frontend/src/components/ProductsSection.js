"use client";

import Link from "next/link";
import Products from "./Products";
import useProducts from "@/stores/productStore";
import { Suspense, useEffect } from "react";
import { Button } from "./ui/button";

const ProductsSection = () => {
  const { products, getProducts } = useProducts();

  useEffect(() => {
    getProducts();
  }, []);

  if (!products.length) return;

  return (
    <section className="my-12 px-2 md:px-4 lg:px-8 space-y-8">
      <h2 className="text-2xl text-center font-bold">Our Products</h2>

      <Suspense fallback={<div>Loading...</div>}>
        <Products products={products} />
      </Suspense>

      <div
        className={`${products.length <= 20 && "hidden"} w-full text-center`}
      >
        <Button variant="outline" aria-label="Show more">
          <Link href={"/shop"}>Show More</Link>
        </Button>
      </div>
    </section>
  );
};

export default ProductsSection;
