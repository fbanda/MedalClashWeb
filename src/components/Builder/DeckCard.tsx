import {Hexagon} from "../Hexagon.tsx";
import {EyeIcon, MinusIcon, PlusIcon, SwitchIcon} from "../../Icons.tsx";
import {Image} from "antd";
import {useStore} from "../../store/store.ts";

export const DeckCard = ({card, amount, isError, isSideDeck}: { card: any, amount: number, isError:boolean, isSideDeck?: boolean }) => {
  const store = useStore();
  return (
      <div className={"group relative"}>
        <div className={"z-10"}>
          <div className={"absolute top-[20px] right-[5px]"}>
            <Hexagon text={amount} isError={isError}/>
          </div>
        </div>
        <div className={"z-10 md:opacity-0 md:group-hover:opacity-100"}>
          <div className={"absolute bottom-[45px] left-[5px]"}>
            <Hexagon size={"sm"} isBtn text={<PlusIcon/>}
                     onClick={() => { if(!isSideDeck) store.addCardToDeck(card.cardId); else store.addCardToSideDeck(card.cardId) }}/>
          </div>
          <div className={"absolute bottom-[45px] left-[30px]"}>
            <Hexagon size={"sm"} isBtn text={<MinusIcon/>}
                     onClick={() => { if(!isSideDeck) store.removeCardFromDeck(card.cardId); else store.removeCardFromSideDeck(card.cardId) }}/>
          </div>
          <div className={"absolute bottom-[45px] left-[55px]"}>
            <Hexagon size={"sm"} isBtn text={<SwitchIcon/>}
                     onClick={() => {
                       if(!isSideDeck) {
                         store.removeCardFromDeck(card.cardId);
                         store.addCardToSideDeck(card.cardId);
                       }else {
                         store.removeCardFromSideDeck(card.cardId);
                         store.addCardToDeck(card.cardId);
                       }
                     }}/>
          </div>
          <div className={"absolute bottom-[45px] right-[10px]"}>
            <Hexagon isBtn onClick={() => {}} text={<EyeIcon/>} />
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