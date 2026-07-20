import {Filters} from "../components/Filters.tsx";
import {ResultsSection} from "../components/ResultsSection.tsx";
import {DeckDrawer} from "../components/DeckDrawer.tsx";
import {useState} from "react";
import {ShowDeckBtn} from "../components/ShowDeckBtn.tsx";

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
      <>
        <ShowDeckBtn isOpen={isOpen} setIsOpen={setIsOpen}/>
        <Filters/>
        <ResultsSection/>
        <DeckDrawer isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
  )
}