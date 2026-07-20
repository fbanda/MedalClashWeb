import type {ReactNode} from "react";

export interface HexagonProps {
  text: ReactNode;
  isBtn?: boolean;
  onClick?: () => void;
  size?: "sm" | "lg";
  className?: string;
  isError?: boolean;
}

export const Hexagon = ({text, isBtn, onClick, size, className, isError}: HexagonProps) => {
  return (
      <>
        {(!size &&
          <button className={`flex items-center justify-center ${isBtn ? "cursor-pointer " : ""} ${className}`} onClick={onClick}>
            <div
              className={`z-10 w-[30px] h-[35px] bg-gray-900 [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
              <div
                className={`w-[28px] h-[32px] ${isError ? "bg-[#ffccc7]" : isBtn ? "bg-white hover:bg-[#dedede] active:bg-[#d4d4d4]" : "bg-white"}  [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
                <p className={"font-michroma text-lg text-gray-900 font-semibold"}>{text}</p>
              </div>
            </div>
          </button>)}

        {(size === "sm" &&
          <button className={`flex items-center justify-center cursor-pointer ${className}`} onClick={onClick}>
            <div
              className={`z-10 w-[23px] h-[25px] bg-gray-900 [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
              <div
                className={`w-[21px] h-[22px] ${isError ? "bg-[#ffccc7]" : isBtn ? "bg-white hover:bg-[#dedede] active:bg-[#d4d4d4]" : "bg-white"} [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
                <p className={"font-michroma text-lg text-gray-900 font-semibold"}>{text}</p>
              </div>
            </div>
          </button>)}

        {(size === "lg" &&
          <div className={`flex items-center justify-center ${isBtn ? "cursor-pointer hover:bg-[#dedede]" : ""}  ${className}`} onClick={onClick}>
            <div
              className={`z-10 w-[48px] h-[54px] bg-gray-900 [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
              <div
                className={`w-[44px] h-[50px] ${isError ? "bg-[#ffccc7]" : "bg-white"} [clip-path:polygon(50%_0%,_100%_25%,_100%_75%,_50%_100%,_0%_75%,_0%_25%)] flex items-center justify-center`}>
                <p className={"font-michroma text-xl text-gray-900 font-semibold"}>{text}</p>
              </div>
            </div>
          </div>)}
      </>
  )
}