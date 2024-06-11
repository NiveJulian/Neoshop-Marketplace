import Layout from "../../components/Layout";
import { useState } from "react";
import axios from "axios";
import { withSwal } from "react-sweetalert2";
import { useRouter } from "next/router";

export default function Brand({ user }) {
  const [editedBrand, setEditedBrand] = useState(null);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState([]);
  const [parentBrand, setParentBrand] = useState("");
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout userId={id} user={user}>
      <h1>Brand</h1>
      <label>
        {editedBrand
          ? `Edit category ${editedBrand.name}`
          : "Create new category"}
      </label>
      <form
      // onSubmit={saveCategory}
      >
        <div className="flex gap-1">
          <input
            type="text"
            placeholder={"Categorie name"}
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <select
            onChange={(ev) => setParentBrand(ev.target.value)}
            value={parentBrand}
          >
            <option value="">No parent category</option>
            {brand.length > 0 &&
              brand.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
          </select>
        </div>
        <div className="flex gap-1">
          {editedBrand && (
            <button
              type="button"
              onClick={() => {
                setEditedBrand(null);
                setName("");
                setParentBrand("");
                setProperties([]);
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
      {!editedBrand && (
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent Category</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {brand.length > 0 &&
              brand.map((branding) => (
                <tr key={branding.key}>
                  <td>{branding.name}</td>
                  <td>{branding?.parent?.name}</td>
                  <td>
                    <button
                      //   onClick={() => editCategory(category)}
                      className="btn-default mr-1"
                    >
                      Edit
                    </button>
                    <button
                      //   onClick={() => deleteCategory(category)}
                      className="btn-red mr-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
}