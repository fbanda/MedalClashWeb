import {Button} from "antd";
import {DocumentIcon} from "../Icons.tsx";
import {Link} from "react-router-dom";

export const Rules = () => {
  return (
      <div className={"p-4 text-xl align-center"}>
        <div className={"p-4"}>
          <p>First time playing? Check the basic rules in this tutorial video:</p>
        </div>
        <div className={"flex justify-center"}>
          <iframe width="560" height="315" style={{border: "2px solid #1d2188"}}
                  src="https://www.youtube.com/embed/JSa5DWNFqzQ?rel=0"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen></iframe>
        </div>
        <div className={"mt-10"}>
          <p className={"mb-2"}>For more advanced rules check these documents:</p>
          <div className={"p-1 flex flex-row gap-2 justify-center items-center"}>
            <DocumentIcon/>
            <span className="font-bold text-lg">Rulebook</span>
            <Button className={"w-20"} htmlType={"button"} target="_blank" href="https://fbanda.github.io/Arena-MedabotsCard/Assets/MedalClash_Rulebook_v1.pdf">English</Button>
            <Button className={"w-20"} htmlType={"button"} target="_blank" href="https://fbanda.github.io/Arena-MedabotsCard/Assets/MedalClash_Rulebook_v1_es.pdf">Español</Button>
          </div>
          <div className={"p-1 flex flex-row gap-2 justify-center items-center"}>
            <DocumentIcon/>
            <span className="font-bold text-lg">Keyword Rulings</span>
            <Button className={"w-20"} htmlType={"button"} target="_blank" href="https://fbanda.github.io/Arena-MedabotsCard/Assets/MedalClash_KeywordRulings_v1.pdf">English</Button>
            <Button className={"w-20"} htmlType={"button"} target="_blank" href="https://fbanda.github.io/Arena-MedabotsCard/Assets/MedalClash_KeywordRulings_v1_es.pdf">Español</Button>
          </div>
        </div>
        <div className={"mt-5"}>
          <p className={"mb-2"}>
            <span>
              For individual card rulings, search for the cards <Link className={"underline"} to={"/"}>here</Link> and scroll to the ruling section.
            </span>
          </p>
        </div>
      </div>
  )
}