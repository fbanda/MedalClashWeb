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
  type: string;
  hideHexagon?: boolean;
  isMainDeck?: boolean;
}

export const SideCard = (props: SideCardProps) => {
  const {cardId, cardType, medalLevel, image, name, type, amount, hideHexagon, isMainDeck} = props;
  const store = useStore();

  const card = store.deck.cards.find(c => c.id === cardId);

  return (
      <div className={"flex gap-4"}>
        <Hexagon size={"lg"} text={amount} className={hideHexagon ? "invisible" : ""} isError={card?.isError ?? false}/>
        <div className={"ms-[-40px] mt-[2px] w-[100px] h-[50px] overflow-hidden relative border-gray-900 border-2"}>
          <img src={image} alt={"card"} className={"w-full h-full object-cover"}/>
        </div>
        <div className={"flex flex-col"}>
          <div className={"font-bold max-w-[150px] truncate"}>{name}</div>
          <div>{type}</div>
        </div>
        <div className={"flex flex-row gap-1 ml-auto"}>
          {!hideHexagon && (
            <Hexagon size={"sm"} isBtn text={<PlusIcon/>}
              onClick={() => {
                if (cardType !== "LEADER" && cardType !== "MEDAL") {
                  if (isMainDeck) store.addCardToDeck(cardId)
                  else store.addCardToSideDeck(cardId)
                }
                if (cardType === "LEADER") {
                  store.setLeader(cardId)
                }
                if (cardType === "MEDAL" && medalLevel === 1) {
                  store.setMedalLvl1(cardId)
                }
                if (cardType === "MEDAL" && medalLevel === 2) {
                  store.setMedalLvl2(cardId)
                }
                if (cardType === "MEDAL" && medalLevel === 3) {
                  store.setMedalLvl3(cardId)
                }
              }}
            />
          )}
          <Hexagon size={"sm"} isBtn text={<MinusIcon/>} onClick={() => {
            if(cardType !== "LEADER" && cardType !== "MEDAL") {
              if (isMainDeck) store.removeCardFromDeck(cardId)
              else store.removeCardFromSideDeck(cardId)
            }
            if(cardType === "LEADER") {
              store.setLeader("")
            }
            if(cardType === "MEDAL" && medalLevel === 1) {
              store.setMedalLvl1("")
            }
            if(cardType === "MEDAL" && medalLevel === 2) {
              store.setMedalLvl2("")
            }
            if(cardType === "MEDAL" && medalLevel === 3) {
              store.setMedalLvl3("")
            }
          }}/>
        </div>
      </div>
  )
}