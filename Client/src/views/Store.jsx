import Nav from "../components/Nav/Nav";
import Sidebar from "../components/SideBar/SideBar";

export const Store = () => {
  return (
    <div className="max-w-screen text-center gap-4">
      <div className="flex shadow-sm">
        <Nav />
      </div>
      <div className="flex justify-center text-center">
        <h1 className="mb-7 text-4xl font-bold pb-2 text-details hover:drop-shadow-[0_35px_35px_rgba(0,0,0,.6)]">
          Stores
        </h1>
      </div>
    </div>
  );
};
