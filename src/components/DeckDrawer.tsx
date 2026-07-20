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
  const showBanner = store.deck.cards.some(card => card.isError);

  return (
      <Drawer
          size={550}
          mask={{enabled: false}}
          title="DECK"
          closable={{'aria-label': 'Close Button'}}
          onClose={() => setIsOpen(false)}
          open={isOpen}
      >
        {showBanner && (
          <div className={"mb-2"}>
            <Alert title="Algunas de tus cartas no cumplen con el tipo de medallas elegidas" type="error" showIcon/>
          </div>
        )}
        <LeaderAndMedalsSection />
        <DeckSection isMainDeck title={`Main Deck (${store.deck.cards.reduce((sum, card) => sum + card.amount, 0)})`}/>
        <DeckSection title={"Side Deck"}/>
      </Drawer>
  )
}