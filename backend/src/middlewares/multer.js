import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const categoryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eCom/categories",
    public_id: (_, file) =>
      `${Date.now()}_${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

const productStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "eCom/products",
    public_id: (_, file) =>
      `${Date.now()}_${file.originalname
        .split(".")[0]
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
    transformation: [{ quality: "auto", fetch_format: "auto" }],
  },
});

export const uploadCategoryImage = multer({ storage: categoryStorage });
export const uploadProductImage = multer({ storage: productStorage });
