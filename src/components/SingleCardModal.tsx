import {Button, Image, Modal} from "antd";
import {useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";
import {Fragment, type ReactNode, useEffect, useState} from "react";
import {ChevronDown, ChevronRight} from "../Icons.tsx";

const ICON_MAP: { [key: string]: string} = {
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

const parseTextToImages = (text: string) => {
  if (text === null || text === undefined) return null;
  const parts = String(text).split(/(\{C\}|\{P\}|\{A\}|\{S\}|\{0\}|\{1\}|\{2\}|\{3\}|\{4\}|\{5\}|\{6\}|\{7\}|\{8\}|\{9\}|\{LW\}|\{MC\})/);
  return (
      <>
        {parts.map((part, index) => {
          if (ICON_MAP[part]) {
            return (
                <img
                    key={index}
                    src={ICON_MAP[part]}
                    alt={`Icono ${part}`}
                    style={{width: '16px', height: '16px', margin: '0 2px', verticalAlign: 'baseline', display: 'inline-block'}}
                />
            );
          }
          return <Fragment key={index}>{part}</Fragment>;
        })}
      </>
  );
}

export interface SingleCardModalProps {
  isModalOpen: boolean;
  selectedCard: any;
}

const Row = ({label, text, bg} : {label: string, text: string, bg?: boolean}) => {
  return (
      <div className={`flex py-1 px-2 ${bg ? "bg-[#dbf1fa]" : ""}`}>
        <div className={"basis-[30%]"}><b>{label}</b></div>
        <div className={"basis-[70%]"}>{parseTextToImages(text)}</div>
      </div>
  )
}

export const SingleCardModal = (props: SingleCardModalProps) => {
  const {isModalOpen, selectedCard} = props;
  const [showRulings, setShowRulings] = useState<boolean[]>();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowRulings(selectedCard?.rulings.map(() => false))
  }, [selectedCard?.rulings]);

  const store = useStore();
  const getColorWord = (color?:string):string => {
    switch(color){
      case "R": return "Red";
      case "P": return "Purple";
      case "B": return "Blue";
      case "G": return "Green";
      case "Y": return "Yellow";
    }
    return "";
  }

  const Rulings = (): ReactNode => {
    return (
        selectedCard?.rulings.map((r: any, i: number) => (
            <>
              <button
                  key={i}
                  className={"pl-16 h-9 flex items-center cursor-pointer w-full"}
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
              <div className={`pl-22 overflow-hidden transition-all duration-300 ease-in-out ${showRulings && showRulings[i] ? "max-h-screen" : "max-h-0"}`}>
                {r.list.map((l: string, j: number) => (
                    <div key={j} className={"mb-4"}>{l}</div>
                ))}
              </div>
            </>
        ))
    )
  }

  return (
      <Modal
          width={1200}
          title={""}
          centered
          open={isModalOpen}
          onCancel={() => store.setIsSingleCardModalOpen(false)}
          footer={null}
      >
        <div className={"flex flex-col md:flex-row gap-8"}>
          <div className={"text-center"}>
            <Image className={`md:!w-[496px] md:!h-[692px] max-w-[496px]`} preview={false} src={selectedCard?.cardImageUrl ?? ""} alt={"card"}/>
          </div>
          <div className={"max-h-[698px] overflow-y-auto pb-12"}>
            {selectedCard?.otherside !== "" && (
            <Button htmlType={"button"}>Flip Card</Button>)}
            {selectedCard?.tokens?.map((id: string) => (
            <Button htmlType={"button"}>{dataSet.find(c => c.cardId === id)?.cardname} Token</Button>
            ))}
            <Row label={"Name"} text={selectedCard?.cardname} bg></Row>
            <Row label={"Card Type"} text={selectedCard?.cardType} ></Row>
            {!selectedCard?.isToken && (
            <Row label={"Color"} text={selectedCard?.colors.filter((c: string) => c !== "M").map((c:string) => getColorWord(c)).join(", ")} bg></Row>
            )}
            {selectedCard?.cardType !== "Leader" && selectedCard?.cardType !== "Medal" && !selectedCard?.isToken && (<div>
            <Row label={"Medal Requirements"} text={selectedCard?.medalRequirements.length === 0 ? "-" : selectedCard?.medalRequirements.join("")} ></Row>
            <Row label={"Main Cost"} text={selectedCard?.mainCost >= 0 ? selectedCard?.mainCost : "-"} bg></Row>
            <Row label={"Trigger Cost"} text={selectedCard?.triggerCost >= 0 ? selectedCard?.triggerCost : "-"} ></Row>
            </div> )}
            {selectedCard?.cardType === "Medal" && (
            <Row label={"Level"} text={selectedCard?.medalLevel} ></Row>
            )}
            {(selectedCard?.cardType === "Medabot" || selectedCard?.cardType === "Medal") && (<div>
            <Row label={"Power"} text={selectedCard?.power} bg></Row>
            <Row label={"Armor"} text={selectedCard?.armor} ></Row>
            </div> )}
            {selectedCard?.cardType === "Medabot" && (<div>
            <Row label={"Medabot Type"} text={selectedCard?.medabotType} bg></Row>
            <Row label={"Gender"} text={selectedCard?.gender} ></Row>
            <Row label={"Leg Type"} text={selectedCard?.legType} bg></Row>
            <Row label={"Attributes"} text={selectedCard?.attributes.join(", ")}></Row>
            </div> )}
            {selectedCard?.cardType === "Medafighter" && (<div>
            <Row label={"Spirit"} text={selectedCard?.spirit} bg></Row>
            <Row label={"Identity"} text={selectedCard?.medafighterIdentity} ></Row>
            </div> )}
            {selectedCard?.cardType !== "Leader" && (
            <Row label={"Groups"} text={selectedCard?.groups.length === 0 ? "-" : selectedCard?.groups.map((g: string) => `[${g}]`).join(", ")} bg></Row>
            )}
            {selectedCard?.mainText.split('\n').map((line: string, i: number) => (
            <Row label={i === 0 ? "Card Text" : ""} text={line} ></Row>
            ))}
            {selectedCard?.cardType === "Medapart" || (selectedCard?.cardType === "Medabot" && !selectedCard?.isToken) && (
                <>
                  <Row label={"Medapart Name"} text={selectedCard?.medapartName} bg></Row>
                  <Row label={"Medapart Cost"} text={selectedCard?.medapartCost} ></Row>
                  <Row label={"Medapart Type"} text={selectedCard?.medapartType} bg></Row>
                  <Row label={"Medapart Text"} text={selectedCard?.medapartText} ></Row>
                </>
            )}
            {selectedCard?.cardType === "Event" && (
                <>
                  <Row label={"Flavor Text"} text={selectedCard?.flavorText} bg></Row>
                  <Row label={"Set"} text={selectedCard?.set} ></Row>
                  <Row label={"Collector Number"} text={selectedCard?.collectorNumber} bg></Row>
                  <Row label={"Rulings"} text={""} ></Row>
                  {Rulings()}
                </>
            )}
            {selectedCard?.cardType !== "Event" && (
                <>
                  <Row label={"Set"} text={selectedCard?.set} bg></Row>
                  <Row label={"Collector Number"} text={selectedCard?.collectorNumber} ></Row>
                  <Row label={"Rulings"} text={""} bg></Row>
                  {Rulings()}
                </>
            )}
          </div>
        </div>

      </Modal>
  )
}