import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import swal from "sweetalert2";

export default function Categories({ user }) {
  const [editedCategory, setEditedCategory] = useState(null);
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  // const [properties, setProperties] = useState([]);
  const router = useRouter();
  const { id } = router.query; // Obtén el ID del usuario de la URL

  useEffect(() => {
    if (id) {
      fetchCategories();
    }
  }, [id]); // Asegúrate de que el fetch se ejecute cuando cambie el ID

  async function fetchCategories() {
    try {
      const result = await axios.get(`https://neoshop-backend.vercel.app/category/`);
      setCategories(result.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function saveCategory(ev) {
    ev.preventDefault();
    const data = {
      name,
      userId: id, // Agrega el userId a los datos enviados al backend
    };
    console.log(data);
    try {
      if (editedCategory) {
        data.id = editedCategory.id;
        // Aquí actualizamos la categoría si existe
        const response = await axios.put(
          `https://neoshop-backend.vercel.app/category/update/${editedCategory.id}`,
          data
        );
        console.log(response);
        setEditedCategory(null);
      } else {
        const response = await axios.post(
          "https://neoshop-backend.vercel.app/category/",
          data
        );
        console.log(response);
      }
      setName("");
      setParentCategory("");
      // setProperties([]);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  }

  function editCategory(category) {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?.id || "");
    // setProperties(
    //   category?.properties?.map(({ name, values }) => ({
    //     name,
    //     values: values.join(","),
    //   }))
    // );
  }

  function deleteCategory(category) {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete ${category.name}`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, delete",
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await axios.delete(`https://neoshop-backend.vercel.app/category/${category.id_category}`);
            fetchCategories();
          } catch (error) {
            console.error("Error deleting category:", error);
          }
        }
      });
  }

  // function addProperty() {
  //   setProperties((prev) => [...prev, { name: "", values: "" }]);
  // }

  // function handlePropertyNameChange(index, property, newName) {
  //   setProperties((prev) => {
  //     const properties = [...prev];
  //     properties[index].name = newName;
  //     return properties;
  //   });
  // }

  // function handlePropertyValuesChange(index, property, newValue) {
  //   setProperties((prev) => {
  //     const properties = [...prev];
  //     properties[index].values = newValue;
  //     return properties;
  //   });
  // }

  // function removeProperty(indexToRemove) {
  //   setProperties((prev) =>
  //     prev.filter((_, pIndex) => pIndex !== indexToRemove)
  //   );
  // }

  return (
    <Layout userId={id} user={user}>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={(ev) => setParentCategory(ev.target.value)}
            value={parentCategory}
          >
            <option value="">No parent category</option>
            {categories?.length > 0 &&
              categories?.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        {/* <div className="mb-2">
          <label className="block">Properties</label>
          <button
            onClick={addProperty}
            type="button"
            className="btn-default text-sm mb-2"
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2" key={index}>
                <input
                  type="text"
                  className="mb-0"
                  value={property.name}
                  onChange={(ev) =>
                    handlePropertyNameChange(index, property, ev.target.value)
                  }
                  placeholder="Property name (example: color)"
                />
                <input
                  type="text"
                  className="mb-0"
                  value={property.values}
                  onChange={(ev) =>
                    handlePropertyValuesChange(index, property, ev.target.value)
                  }
                  placeholder="Values, comma separated"
                />
                <button
                  type="button"
                  onClick={() => removeProperty(index)}
                  className="btn-red mb-0"
                >
                  Remove
                </button>
              </div>
            ))}
        </div> */}
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setName("");
                setParentCategory("");
                // setProperties([]);
              }}
              className="btn-default"
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary py-1">
            Save
          </button>
        </div>
      </form>
      {!editedCategory && (
        <div className="bg-gray-200 mt-8 h-72 overflow-y-scroll scroll">
          <table className="basic mt-4">
            <thead >
              <tr>
                <td>Category name</td>
                <td>Parent Category</td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {categories?.length > 0 &&
                categories?.map((category, index) => (
                  <tr key={index}>
                    <td>{category.name}</td>
                    <td>{category.parent?.name}</td>
                    <td>
                      <button
                        onClick={() => editCategory(category)}
                        className="btn-default mr-1"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category)}
                        className="btn-red mr-1"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
}
