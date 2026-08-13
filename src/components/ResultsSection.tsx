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

      const compareArmor = () => (store.armorValue > 0 && card.armor >= 0 && (
          (store.armorCompare === "EQ" && card.armor === store.armorValue) ||
          (store.armorCompare === "GT" && card.armor > store.armorValue) ||
          (store.armorCompare === "GTEQ" && card.armor >= store.armorValue) ||
          (store.armorCompare === "LT" && card.armor < store.armorValue) ||
          (store.armorCompare === "LTEQ" && card.armor <= store.armorValue)
      ) || store.armorValue === 0)

      const compareSpirit = () => (store.spiritValue > 0 && card.spirit >= 0 &&  (
          (store.spiritCompare === "EQ" && card.spirit === store.spiritValue) ||
          (store.spiritCompare === "GT" && card.spirit > store.spiritValue) ||
          (store.spiritCompare === "GTEQ" && card.spirit >= store.spiritValue) ||
          (store.spiritCompare === "LT" && card.spirit < store.spiritValue) ||
          (store.spiritCompare === "LTEQ" && card.spirit <= store.spiritValue)
      ) || store.spiritValue === 0)

      const compareCost = () => (store.costValue > 0 &&
        (card.mainCost >= 0 && (
          (store.costCompare === "EQ" && card.mainCost === store.costValue) ||
          (store.costCompare === "GT" && card.mainCost > store.costValue) ||
          (store.costCompare === "GTEQ" && card.mainCost >= store.costValue) ||
          (store.costCompare === "LT" && card.mainCost < store.costValue) ||
          (store.costCompare === "LTEQ" && card.mainCost <= store.costValue)
        )) ||
        (card.triggerCost >= 0 && (
          (store.costCompare === "EQ" && card.triggerCost === store.costValue) ||
          (store.costCompare === "GT" && card.triggerCost > store.costValue) ||
          (store.costCompare === "GTEQ" && card.triggerCost >= store.costValue) ||
          (store.costCompare === "LT" && card.triggerCost < store.costValue) ||
          (store.costCompare === "LTEQ" && card.triggerCost <= store.costValue)
        )) || store.costValue === 0)

      const comparePower = () => (store.powerValue > 0 && card.power >= 0 && (
          (store.powerCompare === "EQ" && card.power === store.powerValue) ||
          (store.powerCompare === "GT" && card.power > store.powerValue) ||
          (store.powerCompare === "GTEQ" && card.power >= store.powerValue) ||
          (store.powerCompare === "LT" && card.power < store.powerValue) ||
          (store.powerCompare === "LTEQ" && card.power <= store.powerValue)
      ) || store.powerValue === 0)

      return !card.isBack && !card.isToken &&
          ((!store.searchByName && !store.searchByText && !store.searchByType) || (
          store.searchByName && (card.cardname.removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase()) || card.medapartName.removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase())) ||
          store.searchByText && (card.mainText.removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase()) || card.medapartText.removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase())) ||
          store.searchByType && (
                card.medabotType.removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase()) ||
                card.medafighterIdentity.removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase()) ||
                card.groups.join(" ").removeAccentsToLowerCase().includes(store.filterInputValue.removeAccentsToLowerCase())
            )
          )) &&
          (store.searchBySet && card.set.removeAccentsToLowerCase() === store.searchBySet.removeAccentsToLowerCase() || !store.searchBySet || store.searchBySet === "ALL") &&
          (store.cardType !== DEFAULT_CARD_TYPE && store.cardType === card.cardType || store.cardType === DEFAULT_CARD_TYPE && card.cardType !== "Leader" && card.cardType !== "Medal") &&
          (store.color !== "ALL" && (card.colors as string[]).includes(store.color) || store.color === "ALL") &&
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
          {displayData.length === 0 && (
              <div className={"flex items-center justify-center h-32"}>
                <p>No cards were found.</p>
              </div>
          )}
          {displayData.length > 0 && (
              <div
                  className={"grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 content-center my-6"}>
                {displayData.map((card, index) => (
                    <div key={index} className={"group relative"}>
                      <div className={"z-10 md:opacity-0 md:group-hover:opacity-100"}>
                        <div className={"absolute bottom-[45px] left-[5px]"}>
                          <Hexagon isBtn text={<PlusIcon/>} onClick={() => {
                            if (card.cardType !== "Leader" && card.cardType !== "Medal") {
                              store.addCardToDeck(card.cardId)
                            }
                            if (card.cardType === "Leader") {
                              store.setLeader(card.cardId)
                            }
                            if (card.cardType === "Medal" && card.medalLevel === 1) {
                              store.setMedalLvl1(card.cardId)
                            }
                            if (card.cardType === "Medal" && card.medalLevel === 2) {
                              store.setMedalLvl2(card.cardId)
                            }
                            if (card.cardType === "Medal" && card.medalLevel === 3) {
                              store.setMedalLvl3(card.cardId)
                            }
                          }}/>
                        </div>
                        <div className={"absolute bottom-[45px] left-[40px]"}>
                          <Hexagon isBtn text={<MinusIcon/>} onClick={() => {
                            if (card.cardType !== "Leader" && card.cardType !== "Medal") {
                              store.removeCardFromDeck(card.cardId)
                            }
                            if (card.cardType === "Leader") {
                              store.setLeader("")
                            }
                            if (card.cardType === "Medal" && card.medalLevel === 1) {
                              store.setMedalLvl1("")
                            }
                            if (card.cardType === "Medal" && card.medalLevel === 2) {
                              store.setMedalLvl2("")
                            }
                            if (card.cardType === "Medal" && card.medalLevel === 3) {
                              store.setMedalLvl3("")
                            }
                          }}/>
                        </div>

                        {(card.cardType !== "Leader" && card.cardType !== "Medal") && (
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
                      <Image preview={false} src={card.cardPreviewUrl} alt={"card"}/>
                      <div className={"text-xs font-bold"}>
                        {card.cardname}
                      </div>
                      <div className={"text-xs font-normal"}>
                        {card.cardCode}
                      </div>
                    </div>
                ))}
              </div>
          )}
          <Pagination align="center" current={store.currentPage} pageSize={PAGE_SIZE} showSizeChanger={false} total={totalResults} onChange={(page) => store.setCurrentPage(page)}/>
        </div>
      </>
  )
}