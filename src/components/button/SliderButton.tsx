import React from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

type SliderButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  show: boolean;
  className?:string;
};

const SliderButton: React.FC<SliderButtonProps> = ({ direction, onClick, show,className }) => {
  if (!show) return null;

  const isPrev = direction === "prev";
  const positionClass = isPrev ? "-left-2 rounded-r-full" : "-right-2 rounded-l-full";
  const Icon = isPrev ? LeftOutlined : RightOutlined;

  return (
    <button
      onClick={onClick}
      className={`w-5 h-10 bg-[#bbb9b9] flex items-center justify-center
        absolute top-1/2 ${positionClass} -translate-y-1/2 z-20 hover:bg-[#fa7833] transition-all ${className}`}
    >
      <Icon className="text-white text-xs" />
    </button>
  );
};

export default SliderButton;
