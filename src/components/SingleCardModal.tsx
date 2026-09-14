import {Button, Image, Modal} from "antd";
import {useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";
import {Fragment, type ReactNode, useEffect, useState} from "react";
import {ChevronDown, ChevronRight, FlipIcon} from "../Icons.tsx";

const ICON_MAP: { [key: string]: string } = {
  '{0}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C0.png',
  '{1}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C1.png',
  '{2}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C2.png',
  '{3}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C3.png',
  '{4}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C4.png',
  '{5}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C5.png',
  '{6}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C6.png',
  '{7}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C7.png',
  '{8}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C8.png',
  '{9}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/C9.png',
  '{C}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CC.png',
  '{P}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SP.png',
  '{A}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SA.png',
  '{S}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SS.png',
  '{MC}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png',
  '{LW}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LW.png',
};

const parseTextToImages = (text: ReactNode) => {
  if (text === null || text === undefined) return null;
  const parts = String(text).split(/(\{C\}|\{P\}|\{A\}|\{S\}|\{0\}|\{1\}|\{2\}|\{3\}|\{4\}|\{5\}|\{6\}|\{7\}|\{8\}|\{9\}|\{LW\}|\{MC\}|\n)/);
  return (
      <>
        {parts.map((part, index) => {
          if (ICON_MAP[part]) {
            return (
                <img
                    key={index}
                    src={ICON_MAP[part]}
                    alt={`Icono ${part}`}
                    style={{
                      width: '16px',
                      height: '16px',
                      margin: '0 2px',
                      verticalAlign: 'baseline',
                      display: 'inline-block'
                    }}
                />
            );
          } else if (part === '\n') {
            return <div className={"mb-1"}></div>
          }
          return <Fragment key={index}>{part}</Fragment>;
        })}
      </>
  );
}

const Row = ({label, text,}: { label: string, text: ReactNode }) => {
  return (
      <div className={`flex py-1 px-2 rounded-[8px]`}>
        <div className={"basis-[30%]"}><b>{label}</b></div>
        <div className={"basis-[70%]"}>{parseTextToImages(text)}</div>
      </div>
  )
}

export const SingleCardModal = () => {
  const store = useStore();
  const [showRulings, setShowRulings] = useState<boolean[]>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowRulings(store.selectedCard?.rulings.map(() => false))
  }, [store.selectedCard?.rulings]);

  const getColorWord = (color?: string): string => {
    switch (color) {
      case "R":
        return "Red";
      case "P":
        return "Purple";
      case "B":
        return "Blue";
      case "G":
        return "Green";
      case "Y":
        return "Yellow";
    }
    return "";
  }

  const onFlipCard = (cardId: string) => {
    const card = dataSet.find(c => c.cardId === cardId);
    if (card) {
      store.setSelectedCard(card);
    }
  }

  return (
      <Modal
          width={1200}
          title={""}
          centered
          open={store.isSingleCardModalOpen}
          onCancel={() => store.setIsSingleCardModalOpen(false)}
          footer={null}
      >
        <div className={"flex flex-col md:flex-row gap-8"}>
          <div className={"text-center"}>
            <Image className={`md:!w-[496px] md:!h-[692px] max-w-[496px]`} preview={false}
                   src={store.selectedCard?.cardImageUrl ?? ""} alt={"card"}/>
          </div>
          <div className={"max-h-[698px] overflow-y-auto pb-12 w-full"}>
            {store.selectedCard?.otherside !== "" && (
                <Button className={"mb-4 w-full"} htmlType={"button"}
                        onClick={() => onFlipCard(store.selectedCard?.otherside)}>
                  <FlipIcon/>
                  Flip Card
                </Button>
            )}
            <div className={"[&>*:nth-child(odd)]:bg-[#dbf1fa]"}>
              {store.selectedCard?.cardType !== "Medapart" && (
                <>
                  <Row label={"Name"} text={store.selectedCard?.cardname}></Row>
                  <Row label={"Card Type"} text={store.selectedCard?.cardType}></Row>
                </>
              )}
              {!store.selectedCard?.isToken && (
                  <Row label={"Color"}
                       text={store.selectedCard?.colors.length == 0 ? "-" : store.selectedCard?.colors.filter((c: string) => c !== "M").map((c: string) => getColorWord(c)).join(", ")}
                  ></Row>
              )}
              {store.selectedCard?.cardType !== "Leader" && store.selectedCard?.cardType !== "Medal" && !store.selectedCard?.isToken && (
                  <>
                    <Row label={"Medal Requirements"}
                         text={store.selectedCard?.medalRequirements.length === 0 ? "-" : store.selectedCard?.medalRequirements.join("")}></Row>
                    <Row label={"Main Cost"}
                         text={store.selectedCard?.mainCost >= 0 ? store.selectedCard?.mainCost : "-"}></Row>
                    <Row label={"Trigger Cost"}
                         text={store.selectedCard?.triggerCost >= 0 ? store.selectedCard?.triggerCost : "-"}></Row>
                  </>
              )}
              {store.selectedCard?.cardType === "Medal" && (
                  <Row label={"Level"} text={store.selectedCard?.medalLevel}></Row>
              )}
              {(store.selectedCard?.cardType === "Medabot" || store.selectedCard?.cardType === "Medal") && (
                  <>
                    <Row label={"Power"} text={store.selectedCard?.power}></Row>
                    <Row label={"Armor"} text={store.selectedCard?.armor}></Row>
                  </>
              )}
              {store.selectedCard?.cardType === "Medabot" && (
                  <>
                    <Row label={"Medabot Type"} text={store.selectedCard?.medabotType}></Row>
                    <Row label={"Gender"} text={store.selectedCard?.gender}></Row>
                    <Row label={"Leg Type"} text={store.selectedCard?.legType}></Row>
                    <Row label={"Attributes"} text={store.selectedCard?.attributes.join(", ")}></Row>
                  </>
              )}
              {store.selectedCard?.cardType === "Medafighter" && (
                <>
                  <Row label={"Spirit"} text={store.selectedCard?.spirit}></Row>
                  <Row label={"Identity"} text={store.selectedCard?.medafighterIdentity !== "" ? store.selectedCard?.medafighterIdentity : "-"}></Row>
                </>
              )}
              {store.selectedCard?.cardType !== "Leader" && store.selectedCard?.cardType !== "Medapart" && (
                  <Row label={"Groups"}
                       text={store.selectedCard?.groups.length === 0 ? "-" : store.selectedCard?.groups.map((g: string) => `[${g}]`).join(", ")}
                  ></Row>
              )}
              {store.selectedCard?.cardType !== "Medapart" && (
                <Row label={"Card Text"} text={store.selectedCard?.mainText}></Row>
              )}
              {(store.selectedCard?.cardType === "Medapart" || (store.selectedCard?.cardType === "Medabot" && !store.selectedCard?.isToken)) && (
                  <Row label={"Medapart Name"} text={store.selectedCard?.medapartName}></Row>
              )}
              {(store.selectedCard?.cardType === "Medabot" && !store.selectedCard?.isToken) && (
                  <Row label={"Medapart Cost"} text={store.selectedCard?.medapartCost}></Row>
              )}
              {(store.selectedCard?.cardType === "Medapart" || (store.selectedCard?.cardType === "Medabot" && !store.selectedCard?.isToken)) && (
                  <>
                    <Row label={"Medapart Type"} text={store.selectedCard?.medapartType}></Row>
                    <Row label={"Medapart Text"} text={store.selectedCard?.medapartText}></Row>
                  </>
              )}
              {store.selectedCard?.cardType === "Event" && (
                  <Row label={"Flavor Text"} text={store.selectedCard?.flavorText}></Row>
              )}
              <Row label={"Set"} text={store.selectedCard?.set}></Row>
              <Row label={"Collector Number"} text={store.selectedCard?.collectorNumber}></Row>
              {store.selectedCard?.tokens.length > 0 && (
                  <Row label={store.selectedCard?.isToken ? "Created by" : "Tokens"} text={""}></Row>
              )}
              {store.selectedCard?.tokens?.map((id: string) => (
                  <div className={"pl-16 mb-1 mt-1 !bg-white"}>
                      <Button className={"w-full"} htmlType={"button"} onClick={() => onFlipCard(id)}>
                        <FlipIcon/>
                        {store.selectedCard?.isToken ?
                          dataSet.find(c => c.cardId === id)?.cardname + " (" + dataSet.find(c => c.cardId === id)?.cardCode + ")"
                          : dataSet.find(c => c.cardId === id)?.cardname + " Token"
                        }
                      </Button>
                  </div>
              ))}
              {store.selectedCard?.rulings.length > 0 && (
                  <Row label={"Rulings"} text={""}></Row>
              )}
              {store.selectedCard?.rulings.map((r: any, i: number) => (
                  <div className={"pl-16 mb-1 mt-1 !bg-white"}>
                    <div className={"border border-gray-400 rounded-lg px-2"}>
                      <button
                          key={i}
                          className={"h-9 flex items-center cursor-pointer w-full"}
                          onClick={() => {
                            setShowRulings(
                                showRulings?.map((s, j) => j === i ? !s : false)
                            )
                          }}
                      >
                        <div className={"flex items-center gap-2"}>
                          {showRulings && showRulings[i] ? <ChevronDown/> : <ChevronRight/>}
                          {r.title}
                        </div>
                      </button>
                      <div
                          className={`pl-10 overflow-hidden transition-all duration-300 ease-in-out ${showRulings && showRulings[i] ? "max-h-screen" : "max-h-0"}`}>
                        <ul style={{listStyle: "disc"}}>
                          {r.list.map((l: string, j: number) => (
                              <li key={j} className={"mb-4"}>{l}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>

      </Modal>
  )
}