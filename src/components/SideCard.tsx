import {Hexagon} from "./Hexagon.tsx";
import {MinusIcon, PlusIcon} from "../Icons.tsx";
import {useStore} from "../store/store.ts";

export interface SideCardProps {
  cardId: string;
  cardType: string;
  medalLevel?: number;
  image: string;
  name: string;
  amount: string;
  cardCode: string;
  hideHexagon?: boolean;
  isMainDeck?: boolean;
}

export const SideCard = (props: SideCardProps) => {
  const {cardId, cardType, medalLevel, image, name, cardCode, amount, hideHexagon, isMainDeck} = props;
  const store = useStore();

  const card = store.deck.cards.find(c => c.id === cardId);

  return (
      <div className={"flex gap-4"}>
        <Hexagon size={"lg"} text={amount} className={hideHexagon ? "invisible" : ""} isError={card?.isError ?? false}/>
        <div className={"ms-[-40px] mt-[2px] w-[100px] h-[50px] overflow-hidden relative border-gray-900 border-2"}>
          <img src={image} alt={"card"} className={"w-full h-full object-cover"}/>
        </div>
        <div className={"flex flex-col"}>
          <div className={"font-bold max-w-[150px] truncate"}>{name}{cardType === "Leader" ? " (Leader)" : ""}{medalLevel ? " Lv" + medalLevel : ""}</div>
          <div>{cardCode}</div>
        </div>
        <div className={"flex flex-row gap-1 ml-auto"}>
          {!hideHexagon && (
            <Hexagon size={"sm"} isBtn text={<PlusIcon/>}
              onClick={() => {
                if (cardType !== "Leader" && cardType !== "Medal") {
                  if (isMainDeck) store.addCardToDeck(cardId)
                  else store.addCardToSideDeck(cardId)
                }
                if (cardType === "Leader") {
                  store.setLeader(cardId)
                }
                if (cardType === "Medal" && medalLevel === 1) {
                  store.setMedalLvl1(cardId)
                }
                if (cardType === "Medal" && medalLevel === 2) {
                  store.setMedalLvl2(cardId)
                }
                if (cardType === "Medal" && medalLevel === 3) {
                  store.setMedalLvl3(cardId)
                }
              }}
            />
          )}
          <Hexagon size={"sm"} isBtn text={<MinusIcon/>} onClick={() => {
            if(cardType !== "Leader" && cardType !== "Medal") {
              if (isMainDeck) store.removeCardFromDeck(cardId)
              else store.removeCardFromSideDeck(cardId)
            }
            if(cardType === "Leader") {
              store.setLeader("")
            }
            if(cardType === "Medal" && medalLevel === 1) {
              store.setMedalLvl1("")
            }
            if(cardType === "Medal" && medalLevel === 2) {
              store.setMedalLvl2("")
            }
            if(cardType === "Medal" && medalLevel === 3) {
              store.setMedalLvl3("")
            }
          }}/>
        </div>
      </div>
  )
}