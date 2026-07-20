import {Pagination, Image} from "antd";
import {Hexagon} from "./Hexagon.tsx";
import {DEFAULT_CARD_TYPE, useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";
import {useEffect, useState} from "react";
import {SingleCardModal} from "./SingleCardModal.tsx";
import {EyeIcon, MinusIcon, PlusIcon} from "../Icons.tsx";

const PAGE_SIZE = 20;

export const ResultsSection = () => {
  const store = useStore();
  const [displayData, setDisplayData] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<number>(dataSet.length);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);

  useEffect(() => {
    const newDisplayData = dataSet.filter(card => {
      // if no filters are selected, show all cards
      if(!store.filterInputValue && !store.searchByName && !store.searchByText && !store.searchByType)
        return card;

      const compareArmor = () => (store.armorCompare !== "ALL" && card.armor > 0 && (
          (store.armorCompare === "EQ" && card.armor === store.armorValue) ||
          (store.armorCompare === "GT" && card.armor > store.armorValue) ||
          (store.armorCompare === "GTEQ" && card.armor >= store.armorValue) ||
          (store.armorCompare === "LT" && card.armor < store.armorValue) ||
          (store.armorCompare === "LTEQ" && card.armor <= store.armorValue)
      ) || store.armorCompare === "ALL")

      const compareSpirit = () => (store.spiritCompare !== "ALL" && card.spirit > 0 && (
          (store.spiritCompare === "EQ" && card.spirit === store.spiritValue) ||
          (store.spiritCompare === "GT" && card.spirit > store.spiritValue) ||
          (store.spiritCompare === "GTEQ" && card.spirit >= store.spiritValue) ||
          (store.spiritCompare === "LT" && card.spirit < store.spiritValue) ||
          (store.spiritCompare === "LTEQ" && card.spirit <= store.spiritValue)
      ) || store.spiritCompare === "ALL")

      const compareCost = () => (store.costCompare !== "ALL" && card.mainCost > 0 && (
          (store.costCompare === "EQ" && card.mainCost === store.costValue) ||
          (store.costCompare === "GT" && card.mainCost > store.costValue) ||
          (store.costCompare === "GTEQ" && card.mainCost >= store.costValue) ||
          (store.costCompare === "LT" && card.mainCost < store.costValue) ||
          (store.costCompare === "LTEQ" && card.mainCost <= store.costValue)
      ) || store.costCompare === "ALL")

      const comparePower = () => (store.powerCompare !== "ALL" && card.power > 0 && (
          (store.powerCompare === "EQ" && card.power === store.powerValue) ||
          (store.powerCompare === "GT" && card.power > store.powerValue) ||
          (store.powerCompare === "GTEQ" && card.power >= store.powerValue) ||
          (store.powerCompare === "LT" && card.power < store.powerValue) ||
          (store.powerCompare === "LTEQ" && card.power <= store.powerValue)
      ) || store.powerCompare === "ALL")

      return !card.isBack &&
          (
          store.searchByName && card.cardname.toLowerCase().includes(store.filterInputValue.toLowerCase()) ||
          store.searchByText && card.mainText.toLowerCase().includes(store.filterInputValue.toLowerCase()) ||
          store.searchByType && card.cardType.toLowerCase().includes(store.filterInputValue.toLowerCase())
          ) &&
          (store.searchBySet && card.set.toLowerCase() === store.searchBySet.toLowerCase() || !store.searchBySet || store.searchBySet === "ALL") &&
          (store.cardType !== DEFAULT_CARD_TYPE && store.cardType === card.cardType || store.cardType === DEFAULT_CARD_TYPE && card.cardType !== "LEADER" && card.cardType !== "MEDAL") &&
          (store.color !== "ALL" && card.colors.includes(store.color) || store.color === "ALL") &&
          (store.attribute !== "ALL" && (card.attributes as string[]).includes(store.attribute) || store.attribute === "ALL") &&
          (store.group !== "ALL" && (card.groups as string[]).includes(store.group) || store.group === "ALL") &&
          (store.gender !== "ALL" && card.gender == store.gender || store.gender === "ALL") &&
          (store.legType !== "ALL" && card.legType == store.legType || store.legType === "ALL") &&
          (store.medapartType !== "ALL" && card.medapartType == store.medapartType || store.medapartType === "ALL") &&
          compareArmor() &&
          compareSpirit() &&
          compareCost() &&
          comparePower()
    });

    const cardsToDisplay = newDisplayData.slice((store.currentPage - 1) * PAGE_SIZE, store.currentPage * PAGE_SIZE);

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayData(cardsToDisplay);
    setTotalResults(newDisplayData.length);
  }, [
      store.filterInputValue,
      store.searchByName,
      store.searchByText,
      store.searchByType,
      store.searchBySet,
      store.currentPage,
      store.cardType,
      store.color,
      store.armorCompare,
      store.armorValue,
      store.spiritValue,
      store.spiritCompare,
      store.costValue,
      store.costCompare,
      store.powerValue,
      store.powerCompare,
      store.attribute,
      store.group,
      store.gender,
      store.legType,
      store.medapartType,
    ]);

  return (
      <>
        <SingleCardModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedCard={selectedCard}/>

        <div className={"flex flex-col gap-4 p-4 my-6"}>
          <Pagination align="center" current={store.currentPage} pageSize={PAGE_SIZE} showSizeChanger={false} total={totalResults} onChange={(page) => store.setCurrentPage(page)} />
          <div className={"grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center my-6"}>
            {displayData.map((card, index) => (
                <div key={index} className={"group relative"}>
                  <div className={"z-10 md:opacity-0 md:group-hover:opacity-100"}>
                    <div className={"absolute bottom-[45px] left-[5px]"}>
                      <Hexagon isBtn text={<PlusIcon/>} onClick={() => {
                        if(card.cardType !== "LEADER" && card.cardType !== "MEDAL") {
                          store.addCardToDeck(card.cardId)
                        }
                        if(card.cardType === "LEADER") {
                          store.setLeader(card.cardId)
                        }
                        if(card.cardType === "MEDAL" && card.medalLevel === 1) {
                          store.setMedalLvl1(card.cardId)
                        }
                        if(card.cardType === "MEDAL" && card.medalLevel === 2) {
                          store.setMedalLvl2(card.cardId)
                        }
                        if(card.cardType === "MEDAL" && card.medalLevel === 3) {
                          store.setMedalLvl3(card.cardId)
                        }
                      }}/>
                    </div>
                    <div className={"absolute bottom-[45px] left-[40px]"}>
                      <Hexagon isBtn text={<MinusIcon/>} onClick={() => {
                        if(card.cardType !== "LEADER" && card.cardType !== "MEDAL") {
                          store.removeCardFromDeck(card.cardId)
                        }
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

                    {(card.cardType !== "LEADER" && card.cardType !== "MEDAL") && (
                      <>
                        <div className={"absolute bottom-[45px] left-[80px]"}>
                          <Hexagon size={"sm"} isBtn text={<PlusIcon/>}
                                   onClick={() => store.addCardToSideDeck(card.cardId)}/>
                        </div>
                        <div className={"absolute bottom-[45px] left-[105px]"}>
                          <Hexagon size={"sm"} isBtn text={<MinusIcon/>}
                                   onClick={() => store.removeCardFromSideDeck(card.cardId)}/>
                        </div>
                      </>
                    )}

                    <div className={"absolute bottom-[45px] right-[10px]"}>
                      <Hexagon
                          isBtn
                          onClick={() => {
                            setIsModalOpen(true)
                            setSelectedCard(card)
                          }}
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
            ))}
          </div>
          <Pagination align="center" current={store.currentPage} pageSize={PAGE_SIZE} showSizeChanger={false} total={totalResults} onChange={(page) => store.setCurrentPage(page)}/>
        </div>
      </>
  )
}