import {Alert, Drawer} from "antd"
import {DeckSection} from "./DeckSection.tsx";
import {LeaderAndMedalsSection} from "./LeaderAndMedalsSection.tsx";
import {useStore} from "../store/store.ts";

export interface DeckDrawerProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const DeckDrawer = (props: DeckDrawerProps) => {
  const {isOpen, setIsOpen} = props;
  const store = useStore();
  const warningMissingLeaderMedal = store.deck.leader === "" || store.deck.medalLvl1 === "" ||
                                    store.deck.medalLvl2 === "" || store.deck.medalLvl3 === "";
  const warningRequirements = store.deck.cards.some(card => card.isError) || store.deck.sideCards.some(card => card.isError);
  const warningUnder = store.deck.cards.reduce((sum, card) => sum + card.amount, 0) < 40;
  const warningOverMain = store.deck.cards.reduce((sum, card) => sum + card.amount, 0) > 50;
  const warningOverSide = store.deck.sideCards.reduce((sum, card) => sum + card.amount, 0) > 10;

  return (
      <Drawer
          size={550}
          mask={{enabled: false}}
          title="DECK"
          closable={{'aria-label': 'Close Button'}}
          onClose={() => setIsOpen(false)}
          open={isOpen}
      >
        
        {warningMissingLeaderMedal && (
          <div className={"mb-2"}>
            <Alert title="Deck needs 1 Leader and 3 Medals" type="error" showIcon/>
          </div>
        )}
        {warningRequirements && (
          <div className={"mb-2"}>
            <Alert title="Some cards don't meet their Medal Requirements" type="error" showIcon/>
          </div>
        )}
        {warningUnder && (
          <div className={"mb-2"}>
            <Alert title="Main Deck needs at least 40 cards" type="error" showIcon/>
          </div>
        )}
        {warningOverMain && (
          <div className={"mb-2"}>
            <Alert title="Main Deck can't have more than 50 cards" type="error" showIcon/>
          </div>
        )}
        {warningOverSide && (
          <div className={"mb-2"}>
            <Alert title="Side Deck can't have more than 10 cards" type="error" showIcon/>
          </div>
        )}
        <LeaderAndMedalsSection />
        <DeckSection isMainDeck title={`Main Deck (${store.deck.cards.reduce((sum, card) => sum + card.amount, 0)})`}/>
        <DeckSection title={`Side Deck (${store.deck.sideCards.reduce((sum, card) => sum + card.amount, 0)})`}/>
      </Drawer>
  )
}