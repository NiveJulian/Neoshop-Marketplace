import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Image from "next/image";

export default function ProductForm({
  store,
  storeIdStore,
  id_product,
  name: existingName,
  description: existingDescription,
  price: existingPrice,
  img_product: existingImage,
  quantity: existingQuantity,
  categories: existingCategories,
  brand: existingBrand,
}) {
  const [title, setTitle] = useState(existingName || "");
  const [price, setPrice] = useState(existingPrice || "");
  const [images, setImages] = useState(existingImage || []);
  const [quantity, setQuantity] = useState(existingQuantity || 0);
  const [brand, setBrand] = useState(existingBrand || ""); // Ajustado para recibir string
  const [goToProduct, setGoToProduct] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [description, setDescription] = useState(existingDescription || "");
  const [category, setCategory] = useState(existingCategories || ""); // Ajustado para recibir string
  const [categories, setCategories] = useState([]);
  const [storeData, setStoreData] = useState(null);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchCategories();
      fetchData();
    }
  }, [id]);

  async function fetchCategories() {
    try {
      const result = await axios.get(`https://neoshop-backend.vercel.app/category/`);
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchData() {
    if (id) {
      try {
        const response = await axios.get(
          `https://neoshop-backend.vercel.app/store/user/${id}`
        );
        setStoreData(response.data);
      } catch (error) {
        console.error("Error fetching store data:", error);
      }
    }
  }

  async function createProduct(ev) {
    ev.preventDefault();

    if (id_product) {
      const data = {
        name: title,
        description,
        price,
        quantity,
        img_product: images,
        categoryName: [category],
        fromStore: store,
        storeIdStore,
        brand: brand,
      };
      await axios.put(`https://neoshop-backend.vercel.app/product/update`, {
        ...data,
        id_store: storeIdStore,
        id_product,
      });
    } else {
      const data = {
        name: title,
        description,
        price,
        quantity,
        img_product: images,
        categoryName: [category],
        fromStore: store.name,
        storeIdStore,
        brand: brand,
      };
      await axios.post("https://neoshop-backend.vercel.app/product/", data);
    }
    setGoToProduct(true);
  }

  if (goToProduct) {
    router.push(`/products/${storeData.id_user}`);
  }

  async function uploadImages(ev) {
    const files = ev.target.files;
    if (files.length > 0) {
      setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append("file", file);
      }
      const res = await axios.post("https://neoshop-backend.vercel.app/images/upload", data);

      setImages((oldImages) => [...oldImages, ...res.data.links]);
      setIsUploading(false);
    }
  }

  return (
    <div className="max-w-screen">
      <form onSubmit={createProduct}>
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Product name"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
        />
        <label>Category</label>
        <select
          value={category}
          onChange={(ev) => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 &&
            categories.map((c, i) => (
              <option key={i} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>
        <label>Photos</label>
        <div className="mb-2 flex flex-wrap gap-1">
          {images.map((link, index) => (
            <div
              key={link}
              className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
            >
              <Image
                src={link}
                alt={`${index}-image-producto`}
                width={64}
                height={64}
                className="rounded-lg"
              />
            </div>
          ))}
          {isUploading && (
            <div className="h-24 flex items-center">
              <Spinner />
            </div>
          )}
          <label className="w-24 h-24 cursor-pointer text-center text-sm text-primary flex flex-col items-center justify-center rounded-sm bg-white gap-1 shadow-sm border border-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            <div>Add image</div>
            <input type="file" onChange={uploadImages} className="hidden" />
          </label>
        </div>
        <label>Description</label>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        <div className="flex flex-row gap-2 justify-center items-center text-center">
          <div className="flex flex-col w-full gap-2">
            <label>Price in USD</label>
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label>Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(ev) => setQuantity(ev.target.value)}
            />
          </div>
        </div>
        <label>Brand</label>
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(ev) => setBrand(ev.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
