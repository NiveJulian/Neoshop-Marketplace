import Image from "next/image";
import img from "../assets/img/neoshoplogo.jpeg"


export default function Logo() {
  return (
    <div className="flex gap-1">
      <Image className="w-8 h-8 rounded-full justify-center items-center" src={img} alt="neoshoplogo" />
      <span className="">Neoshop Admin</span>
    </div>
  );
}
