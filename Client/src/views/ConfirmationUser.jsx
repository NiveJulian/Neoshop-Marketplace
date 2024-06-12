import { ButtonClient } from "../components/ButtonsConfirmations/ButtonClient/ButtonClient";
import { ButtonStore } from "../components/ButtonsConfirmations/ButtonStore/ButtonStore";

export default function ConfirmationUser() {
  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-3xl font-bold mb-8">What will you do within NeoShop?</h1>
      <div className="flex flex-row gap-20">
        <ButtonClient />
        <ButtonStore />
      </div>
    </div>
  );
}
