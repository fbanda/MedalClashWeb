import {Image} from "antd";
import {Link, useLocation} from "react-router-dom"

const buttonClass = "w-30 h-15 flex items-center justify-center";

export const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path: string) => {
    const isActive = location.pathname === path;
    return `${buttonClass} ${isActive ? "border-b-3 border-black" : ""}`;
  };

  return ( 
      <nav className={"h-20"}>
        <div className={"flex justify-between items-center h-full"}>
          <div className={"w-40 h-15 flex items-center justify-center"}>
            <Image preview={false} src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Logo_small.png"} alt={"logo"}/>
          </div>
          <div className={"hidden md:flex gap-12 justify-end font-michroma text-xs font-bold"}>
            <div className={getLinkClass("/")}>
              <Link to={"/"}>CARDS</Link>
            </div>
            <div className={getLinkClass("/builder")}>
              <Link to={"/builder"}>DECK BUILDER</Link>
            </div>
            <div className={buttonClass}>RULES</div>
            <div className={buttonClass}>INFO</div>
          </div>
        </div>
      </nav>
  )
}