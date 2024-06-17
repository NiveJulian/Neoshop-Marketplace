import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import validationFormRegisterStore from "./validationformregisterstore"; 
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";
import { uploadImages } from "../../Redux/Actions/updateImageActions";
import { createStore } from "../../Redux/Actions/storeActions";

export default function FormRegisterStore({ title = "Create Store", user }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    address_cp: "",
    address_country: "",
    address_city: "",
    name: "",
    logo: "",
    id_user: user?.id_user,
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [images, setImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const img = useSelector((state) => state.updateImage.images);

  useEffect(() => {
    if (img && img.length > 0 && Array.isArray(img[0])) {
      const logoUrl = img[0][0]; // Accede al primer elemento del primer array
      setFormData((prevFormData) => ({
        ...prevFormData,
        logo: logoUrl,
      }));
    }
  }, [img]);
  
  const handleImageUpload = async (event) => {
    setIsUploading(true);
    const files = event.target.files;
    const newImages = Array.from(files);

    try {
      const formData = new FormData();
      newImages.forEach((image) => {
        formData.append("file", image);
      });

      dispatch(uploadImages(formData));

      setImages((oldImages) => [...oldImages, ...img]);

      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading images:", error);
      setIsUploading(false);
    }
  };

  function updateImagesOrder(images) {
    setImages(images);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const memoizedErrors = useMemo(() => {
    return validationFormRegisterStore(formData);
  }, [formData]);

  useEffect(() => {
    setErrors(memoizedErrors);
  }, [memoizedErrors]);

  console.log(formData);
  console.log(img);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(memoizedErrors).length === 0) {
      try {
        dispatch(createStore(formData));
        toast.loading("Waiting...");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        toast.error("Register failed. Please try again.");
      }
    } else {
      toast.error("Please fix the errors before submitting.");
    }
  };
  return (
    <div className="flex relative top-0 left-0 bg-opacity-100 md:w-screen sm:w-screen sm:h-screen items-center justify-center w-full h-screen">
      <form
        className="max-w-sm p-4 h-auto bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <h1 className="text-center mx-4 mb-4 text-3xl text-primary border-b-2">
          <strong>{title}</strong>
        </h1>
        <div className="flex flex-wrap mx-2 mb-1">
          <div className="rounded-sm w-full py-2 px-4">
            <label>Photos</label>
            <div className="mb-2 flex justify-center items-center gap-1">
              <ReactSortable
                list={img ? img : images}
                className="flex flex-col gap-1"
                setList={updateImagesOrder}
              >
                {img
                  ? img.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 flex items-center"
                      >
                        {/* <button className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button> */}
                        <img
                          src={imageUrl}
                          alt="Imagenes"
                          className="h-full rounded-lg"
                        />
                      </div>
                    ))
                  : !!images.length > 0 &&
                    images.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200 flex items-center"
                      >
                        <button className="p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>
                        </button>
                        <img
                          src={imageUrl}
                          alt="Imagenes"
                          className="h-full rounded-lg"
                        />
                      </div>
                    ))}
              </ReactSortable>
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
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>
          <div className="w-full px-3 mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.name && errors.name
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="name"
              type="text"
              placeholder="Store Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.name && errors.name && (
              <p className="text-red-500 text-xs italic">{errors.name}</p>
            )}
          </div>
          <div className="w-full px-3 mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="address_cp"
            >
              Postal Code
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.address_cp && errors.address_cp
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="address_cp"
              type="text"
              placeholder="Postal Code"
              name="address_cp"
              value={formData.address_cp}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address_cp && errors.address_cp && (
              <p className="text-red-500 text-xs italic">{errors.address_cp}</p>
            )}
          </div>
          <div className="w-full px-3 mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="address_country"
            >
              Country
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.address_country && errors.address_country
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="address_country"
              type="text"
              placeholder="Country"
              name="address_country"
              value={formData.address_country}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address_country && errors.address_country && (
              <p className="text-red-500 text-xs italic">
                {errors.address_country}
              </p>
            )}
          </div>
          <div className="w-full px-3 mb-1">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
              htmlFor="address_city"
            >
              City
            </label>
            <input
              className={`appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ${
                touched.address_city && errors.address_city
                  ? "border-red-500"
                  : "border-gray-200"
              }`}
              id="address_city"
              type="text"
              placeholder="City"
              name="address_city"
              value={formData.address_city}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {touched.address_city && errors.address_city && (
              <p className="text-red-500 text-xs italic">
                {errors.address_city}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
