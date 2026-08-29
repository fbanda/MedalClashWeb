import {Link} from "react-router-dom";
import {Collapse} from "antd";
import {LinkIcon} from "../Icons.tsx";

export const Info = () => {
  return (
      <div className={"mt-12 p-4"}>
        <div className={"mb-4"}>
          <p className={"text-left font-bold"}>About the game</p>
          <p className={"text-left"}>
            Medal Clash is a fan game...
          </p>
        </div>
        <div className={"mb-4"}>
          <p className={"text-left"}>
            See Rules <Link className={"underline"} to={"/rules"}>here</Link>
          </p>
        </div>
        <div className={"mb-4"}>
          <p className={"text-left font-bold"}>How to play on TCG Arena:</p>
          <p className={"text-left"}>
            1. Go to <Link className={"underline"} to={"https://tcgarena.fr/"} target={"_blank"}>https://tcgarena.fr/</Link> and create an account.
          </p>
          <p className={"text-left"}>
            2. Go to <Link className={"underline"} to={"https://tcgarena.fr/urlblabla"} target={"_blank"}>https://tcgarena.fr/urlblabla</Link> to import the game.
          </p>
          <p className={"text-left"}>
            3. Use the deck builder and click on "Export to TCG Arena" to import the deck into your account.
          </p>
          <p className={"text-left"}>
            4. Click on the play tab.
          </p>
          <p className={"text-left"}>
            5. Share your ID or copy you opponent's ID to connect.
          </p>
        </div>
        <div className={"mb-4"}>
          <p className={"text-left font-bold"}>Don't know where to start</p>
          <p className={"text-left"}>
            Try the following decks or use them as inspiration to start editing.
          </p>
        </div>
        <Collapse
            styles={{ header: { backgroundColor: '#fff', borderRadius: "8px 8px 0 0", }}}
            onChange={() => {}}
            items={[{
              key: '1',
              label: '#1 Core Adventure - Wining decks',
              children:
                  <div>
                    <div className={"flex items-center gap-1 mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2"}>
                        Top 4 - Evasion
                      </p>
                      <Link className={"underline"} to={"https://urlblabla.com/"} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"flex items-center gap-1 mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2"}>
                        Champion - Support
                      </p>
                      <Link className={"underline"} to={"https://urlblabla.com/"} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>
                  </div>
            }]}
        />
        <br/>
        <Collapse
            styles={{ header: { backgroundColor: '#fff', borderRadius: "8px 8px 0 0", }}}
            onChange={() => {}}
            items={[{
              key: '1',
              label: '#1 Core Adventure - Sample decks',
              children:
                  <div>
                    <div className={"flex items-center gap-1 mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2"}>
                        Top 4 - Evasion
                      </p>
                      <Link className={"underline"} to={"https://urlblabla.com/"} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"flex items-center gap-1 mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2"}>
                        Champion - Support
                      </p>
                      <Link className={"underline"} to={"https://urlblabla.com/"} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>
                  </div>
            }]}
        />
      </div>
  )
}