import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
<nav className="bg-[#1a1c1f] text-orange-400 sticky top-0 z-50">
  <div className="container mx-auto flex justify-between items-center py-3 px-4">
    {/* Logo */}
    <Link to="/" className="text-white font-extrabold text-lg">
      CODEC.VN
    </Link>

    {/* Menu button mobile */}
    <button
      className="md:hidden text-white"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <X size={28} /> : <Menu size={28} />}
    </button>

    {/* Links */}
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } absolute top-[60px] left-0 w-full bg-[#1a1c1f] md:static md:block md:w-auto`}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4 md:p-0 font-bold">
        <Link to="/" className="hover:text-white">TRANG CHỦ</Link>
        <Link to="/news" className="hover:text-white">TIN TỨC</Link>
        <Link to="/Article" className="text-white">BÀI VIẾT</Link>
        <Link to="/yt" className="hover:text-white">YOUTUBE CHANEL</Link>
        <Link to="/game" className="hover:text-white">GAME</Link>
        <Link to="/hd" className="hover:text-white">HƯỚNG DẪN</Link>
        <Link to="/intro" className="hover:text-white">GIỚI THIỆU</Link>
      </div>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
