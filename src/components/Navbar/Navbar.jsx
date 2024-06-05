import {
  ShoppingCartIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import logo from "../../assets/logo.png";

export default function navbar() {
  return (
    <div className="flex flex-row py-0.5 px-5 items-center justify-between">
      <a href="#">
        <img src={logo} alt="american apparel" className="w-40" />
      </a>
      <div className="flex gap-20">
        <a
          href="/product"
          className="group transition-all duration-300 ease-in-out"
        >
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            Home
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            For Men
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            For Women
          </p>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out">
          <p className="bg-left-bottom bg-gradient-to-r from-blue-500 to-pink-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
            For Unisex Folks
          </p>
        </a>
      </div>
      <div className="flex gap-10">
        <a href="#">
          <MagnifyingGlassIcon className="h-6 w-6 text-black-0" href="#" />
        </a>
        <a href="#">
          <ShoppingCartIcon className="h-6 w-6 text-black-0" href="#" />
        </a>
        <a href="#">
          <UserIcon className="h-6 w-6 text-black-0" href="#" />
        </a>
      </div>
    </div>
  );
}
