import {Link} from "react-router-dom";
import {Collapse} from "antd";
import {LinkIcon} from "../Icons.tsx";

export const Info = () => {
  return (
      <div className={"mt-4 p-4 text-xl"}>
        <div className={"mb-4"}>
          <p className={"text-left font-bold"}>About the game</p>
          <p className={"text-left"}>
            <i>Medal Clash</i> is a fanmade card game based on <i>Medabots</i> (<i>Medarot</i> in Japan) where two players compete. Build Medabots, modify them with Medaparts, build up your Leader, and unlock the abilities of your Medals to strengthen your team and defeat your opponent.
          </p>
        </div>
        <div className={"mb-4"}>
          <p className={"text-left"}>
            Learn how to play <Link className={"underline"} to={"/rules"}>here</Link>!
          </p>
        </div>
        <div className={"mb-5"}>
          <p className={"text-left font-bold"}>How to play on TCG Arena:</p>
          <p className={"text-left mb-2"}>
            1. Go to <Link className={"underline"} to={"https://tcgarena.fr/"} target={"_blank"}>https://tcgarena.fr/</Link> and create an account.
          </p>
          <p className={"text-left mb-2"}>
            2. Go to <Link className={"underline"} to={"https://tcg-arena.fr/load/aHR0cHMlM0ElMkYlMkZmYmFuZGEuZ2l0aHViLmlvJTJGQXJlbmEtTWVkYWJvdHNDYXJkJTJGZ2FtZS5qc29u"} target={"_blank"}>this link</Link> to import the game.
          </p>
          <p className={"text-left mb-2"}>
            3. Use the <Link className={"underline"} to={"/builder"}>deck builder</Link> and click on "Export to TCG Arena" to import the deck into your account.
          </p>
          <p className={"text-left mb-2"}>
            4. In TCG Arena, make sure "Medal Clash" is your current game.
          </p>
          <p className={"text-left mb-2"}>
            5. Click on the Play tab.
          </p>
          <p className={"text-left mb-2"}>
            6. Share your ID or copy you opponent's ID to connect, then "Start a new game" on the left bar.
          </p>
        </div>
        <div className={"mb-4"}>
          <p className={"text-left font-bold"}>Where to start?</p>
          <p className={"text-left"}>
            If you don't want to start deck building from scratch, try the following decks or use them as inspiration to start editing:
          </p>
        </div>
        <Collapse
            styles={{ header: { backgroundColor: '#fff', borderRadius: "8px 8px 0 0", }}}
            onChange={() => {}}
            items={[{
              key: '1',
              label: '#1 Core Adventure - Sample decks',
              children:
                  <div>
                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Destruction Triggers
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1907&medalLvl1=1184&medalLvl2=1181&medalLvl3=1191&deck=1005x3,1022x2,1025x2,1026x3,1031x3,1034x2,1038x2,1040x2,1044x3,1127x3,1124x3,1125x3,1131x2,1157x2,1156x3,1014x2&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Heating Triggers
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1914&medalLvl1=1193&medalLvl2=1189&medalLvl3=1198&deck=1026x3,1028x3,1044x3,1049x3,1052x3,1054x3,1057x3,1059x2,1069x2,1135x2,1136x2,1158x3,1159x2,1037x3,1041x3&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Evasion
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1903&medalLvl1=1200&medalLvl2=1205&medalLvl3=1199&deck=1048x3,1050x3,1057x3,1061x3,1074x3,1076x3,1077x3,1081x2,1088x3,1145x2,1147x2,1146x3,1160x2,1161x3,1078x2&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Support
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1904&medalLvl1=1210&medalLvl2=1211&medalLvl3=1207&deck=1074x3,1076x3,1078x3,1090x2,1091x3,1084x3,1094x3,1098x3,1104x2,1112x2,1149x3,1148x3,1150x2,1163x2,1162x3&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Wheel/C2-
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1905&medalLvl1=1209&medalLvl2=1181&medalLvl3=1215&deck=1164x3,1165x3,1152x2,1150x2,1149x3,1115x2,1112x2,1099x2,1093x3,1102x3,1001x3,1003x3,1004x3,1006x3,1010x3&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Self Damage
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1906&medalLvl1=1176&medalLvl2=1197&medalLvl3=1182&deck=1001x3,1003x3,1009x3,1011x3,1048x3,1051x3,1058x3,1060x3,1059x3,1118x2,1167x2,1166x3,1065x2,1022x2,1116x2&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Medaparts
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1911&medalLvl1=1192&medalLvl2=1195&medalLvl3=1214&deck=1103x2,1107x3,1113x2,1064x3,1059x2,1058x3,1053x3,1051x2,1048x3,1132x3,1134x3,1168x3,1169x3,1049x2,1050x3&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Rubberobo Scrap
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1915&medalLvl1=1208&medalLvl2=1188&medalLvl3=1190&deck=1025x3,1026x3,1031x3,1034x3,1039x2,1040x3,1044x3,1096x3,1104x3,1125x3,1126x2,1171x2,1170x3,1100x2,1128x2&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Zodiac
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1910&medalLvl1=1184&medalLvl2=1203&medalLvl3=1206&deck=1140x2,1143x3,1146x2,1088x2,1084x3,1080x3,1073x3,1024x3,1029x2,1030x3,1027x3,1035x3,1173x3,1172x2,1071x3&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>

                    <div className={"justify-center flex items-center mb-2"}>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png"} className={"w-[16px] h-[16px]"}/>
                      <img src={"https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png"} className={"w-[16px] h-[16px]"}/>
                      <p className={"mx-2 font-bold"}>
                        Damage Triggers
                      </p>
                      <Link className={"underline"} to={"/loadDeck?leader=1902&medalLvl1=1178&medalLvl2=1204&medalLvl3=1183&deck=1001x2,1003x3,1002x3,1009x3,1011x3,1070x3,1072x3,1075x2,1079x2,1083x2,1085x3,1091x3,1174x3,1175x3,1012x2&sideDeck="} target={"_blank"}>
                        <LinkIcon/>
                      </Link>
                    </div>
                  </div>
            }]}
        />
      </div>
  )
}