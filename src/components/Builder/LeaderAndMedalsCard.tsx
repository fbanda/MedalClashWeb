import {useStore} from "../../store/store.ts";
import {EyeIcon, MinusIcon} from "../../Icons.tsx";
import {Hexagon} from "../Hexagon.tsx";
import {Image} from "antd";

export const LeaderAndMedalsCard = ({card}: { card: any }) => {
  const store = useStore();
  return (
      <div className={"group relative"}>
        <div className={"z-10 md:opacity-0 md:group-hover:opacity-100"}>
          <div className={"absolute bottom-[45px] left-[5px]"}>
            <Hexagon isBtn text={<MinusIcon/>} onClick={() => {
              if(card.cardType === "LEADER") {
                store.setLeader("")
              }
              if(card.cardType === "MEDAL" && card.medalLevel === 1) {
                store.setMedalLvl1("")
              }
              if(card.cardType === "MEDAL" && card.medalLevel === 2) {
                store.setMedalLvl2("")
              }
              if(card.cardType === "MEDAL" && card.medalLevel === 3) {
                store.setMedalLvl3("")
              }
            }}/>
          </div>
          <div className={"absolute bottom-[45px] right-[10px]"}>
            <Hexagon
                isBtn
                onClick={() => {}}
                text={<EyeIcon/>}
            />
          </div>
        </div>
        <Image preview={false} src={card.cardImageUrl} alt={"card"}/>
        <div className={"text-xs font-bold"}>
          {card.cardname}
        </div>
        <div className={"text-xs font-normal"}>
          {card.set} - {card.collectorNumber}
        </div>
      </div>
  )
}