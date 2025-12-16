"use client";

import useCategory from "@/stores/categoryStore";
import Image from "next/image";
import { Suspense, useEffect } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

const Categories = () => {
  const { categories, getCategories } = useCategory();

  useEffect(() => {
    getCategories();
  }, []);

  if (!categories.length) return;

  return (
    <section className="my-12 px-2 md:px-4 lg:px-8 space-y-8">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-2xl font-bold">Browse The Range</h2>
        <p className="text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <CategoryCard categories={categories} />
      </Suspense>
    </section>
  );
};

const CategoryCard = ({ categories }) => {
  return (
    <div className="flex gap-2 md:gap-4 py-4 overflow-x-auto">
      {categories &&
        categories.map((category) => (
          <div key={category.name} className="w-25 flex flex-col items-center">
            <AspectRatio ratio={1}>
              <Image
                src={category.imageURL}
                fill
                sizes="50vw"
                alt={category.name}
                loading="lazy"
                className="rounded-md object-cover"
              />
            </AspectRatio>
            <h3 className="font-semibold">{category.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default Categories;
