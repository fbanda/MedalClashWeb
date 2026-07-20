import {useStore} from "../store/store.ts";
import {SideCard} from "./SideCard.tsx";
import dataSet from "../assets/TestCardDataSet.json";

export const LeaderAndMedalsSection = () => {
  const store = useStore();

  const leaderCard = dataSet.find(c => c.cardId === store.deck.leader);
  const medalLevel1Card = dataSet.find(c => c.cardId === store.deck.medalLvl1);
  const medalLevel2Card = dataSet.find(c => c.cardId === store.deck.medalLvl2);
  const medalLevel3Card = dataSet.find(c => c.cardId === store.deck.medalLvl3);

  return (
      <>
        <div className={"font-michroma font-bold text-xl mb-4"}>Leader and medals</div>
        <div className={"flex flex-col gap-3"}>
          {store.deck.leader && leaderCard && (
              <SideCard
                  cardId={leaderCard.cardId}
                  cardType={leaderCard.cardType}
                  image={leaderCard.thumbnailUrl}
                  name={leaderCard.cardname}
                  type={leaderCard.cardType}
                  amount={"1"}
                  hideHexagon
              />
          )}
          {store.deck.medalLvl1 && medalLevel1Card && (
              <SideCard
                  cardId={medalLevel1Card.cardId}
                  cardType={medalLevel1Card.cardType}
                  medalLevel={medalLevel1Card.medalLevel}
                  image={medalLevel1Card.thumbnailUrl}
                  name={medalLevel1Card.cardname}
                  type={`${medalLevel1Card.cardType} LVL 1`}
                  amount={"1"}
                  hideHexagon
              />
          )}
          {store.deck.medalLvl2 && medalLevel2Card && (
              <SideCard
                  cardId={medalLevel2Card.cardId}
                  cardType={medalLevel2Card.cardType}
                  medalLevel={medalLevel2Card.medalLevel}
                  image={medalLevel2Card.thumbnailUrl}
                  name={medalLevel2Card.cardname}
                  type={`${medalLevel2Card.cardType} LVL 2`}
                  amount={"1"}
                  hideHexagon
              />
          )}
          {store.deck.medalLvl3 && medalLevel3Card && (
              <SideCard
                  cardId={medalLevel3Card.cardId}
                  cardType={medalLevel3Card.cardType}
                  medalLevel={medalLevel3Card.medalLevel}
                  image={medalLevel3Card.thumbnailUrl}
                  name={medalLevel3Card.cardname}
                  type={`${medalLevel3Card.cardType} LVL 3`}
                  amount={"1"}
                  hideHexagon
              />
          )}
        </div>
      </>
  )
}