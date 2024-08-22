import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import ProfileUser from "./ProfileUser";

export default function UserList() {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [banned, setBanned] = useState(false);

  useEffect(() => {
    fetchDataUsers();
  }, []);

  const fetchDataUsers = async () => {
    try {
      const response = await axios.get(`https://neoshop-marketplace.vercel.app/user/`);
      const filteredUsers = response.data.filter(
        (user) => user.user_type.toLowerCase() !== "admin"
      );
      setUsersData(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  async function handleBan(user) {
    try {
      await axios.put("https://neoshop-marketplace.vercel.app/user/update", {
        id_user: user.id_user,
        is_active: !user.is_active,
      });
      setBanned(!banned);
      fetchDataUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmBan(user) {
    if (banned) {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No te preocupes, luego podras revertir esta accion",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, banear",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        handleBan(user);
        Swal.fire("Usuario baneado", "El usuario ha sido baneado.", "success");
      }
      setBanned(!banned);
    } else {
      const result = await Swal.fire({
        title: "¿Estás seguro?",
        text: "No te preocupes, luego podras revertir esta accion",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Sí, desbanear",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        handleBan(user);
        Swal.fire(
          "Usuario desbaneado",
          "El usuario ha sido desbaneado.",
          "success"
        );
      }
    }
  }

  const openUserProfile = (user) => {
    setSelectedUser(user);
  };

  const closeUserProfile = () => {
    setSelectedUser(null);
  };

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.user_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular los usuarios actuales
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="flex justify-center items-center flex-col">
      {selectedUser && (
        <ProfileUser user={selectedUser} onClose={closeUserProfile} />
      )}
      <h1>Lista de Usuarios</h1>
      <input
        type="text"
        placeholder="Buscar por nombre o tipo de usuario"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <table className="text-center bg-gray-200 shadow-md">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Email</th>
            <th>Tipo de Usuario</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr
              className={`${
                user.is_active ? "" : "bg-red-200"
              } border border-gray-400`}
              key={user.id_user}
            >
              <td className="p-2">{user.id_user}</td>
              <td>{user.name}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.user_type}</td>
              <td>
                <div className="flex flex-row gap-2">
                  <button
                    onClick={() => openUserProfile(user)}
                    className="p-1"
                    title="Info user"
                  >
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
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => confirmBan(user)}
                    className="p-1 border border-gray-300 rounded-sm active:shadow-lg"
                    title="Ban"
                  >
                    {user.is_active ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row gap-5 mt-4">
        {Array.from(
          { length: Math.ceil(filteredUsers.length / usersPerPage) },
          (_, index) => (
            <button
              className="rounded-lg border-gray-300 hover:bg-gray-300 shadow-sm p-4"
              key={index}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
