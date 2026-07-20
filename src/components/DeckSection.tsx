import {SideCard} from "./SideCard.tsx";
import {useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";

export interface DeckSectionProps {
  title: string;
  isMainDeck?: boolean;
}

export const  DeckSection = ({title, isMainDeck} : DeckSectionProps) => {

  const store = useStore();

  return (
      <>
        <div className={"font-michroma font-bold text-xl mt-4 mb-4"}>{title}</div>
        <div className={"flex flex-col gap-3"}>
          {isMainDeck ? (
              store.deck.cards.map(card => {
                const cardFromDataSet = dataSet.find(c => c.cardId === card.id);
                if (cardFromDataSet) {
                  return (
                  <SideCard
                      cardId={cardFromDataSet.cardId}
                      cardType={cardFromDataSet.cardType}
                      image={cardFromDataSet.thumbnailUrl}
                      name={cardFromDataSet.cardname}
                      type={cardFromDataSet.cardType}
                      amount={card.amount.toString()}
                      isMainDeck
                  />)
                }else {
                  return undefined
                }
              })
          ) : (
              store.deck.sideCards.map(card => {
                const cardFromDataSet = dataSet.find(c => c.cardId === card.id);
                if (cardFromDataSet) {
                  return (
                      <SideCard
                          cardId={cardFromDataSet.cardId}
                          cardType={cardFromDataSet.cardType}
                          image={cardFromDataSet.thumbnailUrl}
                          name={cardFromDataSet.cardname}
                          type={cardFromDataSet.cardType}
                          amount={card.amount.toString()}
                      />)
                }else {
                  return undefined
                }
              })
          )}
        </div>
      </>
  )
}