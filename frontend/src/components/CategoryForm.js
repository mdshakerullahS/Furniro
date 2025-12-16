"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import ImageUpload from "./ImageUpload";

const CategoryForm = () => {
  const [name, setName] = useState(null);
  const [images, setImages] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    if (images && images[0]) {
      formData.append("image", images[0]);
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    } catch (err) {}
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Category Info</h2>

      <form onSubmit={handleSubmit} className="py-2 space-y-2">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Category Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="max-w-[256px] pl-2 py-1 border border-border outline-0 rounded-md"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold">Image</label>
          <ImageUpload maxFiles={1} setImages={setImages} />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={!name || !images}
            aria-label="Add category"
          >
            Add category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
