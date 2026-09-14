import {Button, Image, Modal} from "antd";
import {useStore} from "../store/store.ts";
import dataSet from "../assets/TestCardDataSet.json";
import {Fragment, type ReactNode, useEffect, useState} from "react";
import {ChevronDown, ChevronRight, FlipIcon} from "../Icons.tsx";

const ICON_MAP: { [key: string]: string } = {
  '{CR}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RR.png',
  '{CP}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RP.png',
  '{CB}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RB.png',
  '{CG}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RG.png',
  '{CY}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RY.png',
  '{CRP}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RRP.png',
  '{CPB}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RPB.png',
  '{CBG}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RBG.png',
  '{CGY}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RGY.png',
  '{CYR}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RYR.png',
  '{CRB}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RRB.png',
  '{CBY}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RBY.png',
  '{CYP}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RYP.png',
  '{CPG}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RPG.png',
  '{CGR}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/RGR.png',
  '{C}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CC.png',
  '{MC}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CM.png',
  '{TC}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/CT.png',
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
  '{P}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SP.png',
  '{A}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SA.png',
  '{S}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/SS.png',
  '{M}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/GM.png',
  '{F}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/GF.png',
  '{Rn}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ARn.png',
  '{Ml}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/AMl.png',
  '{Am}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/AAm.png',
  '{As}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/AAs.png',
  '{Df}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ADf.png',
  '{Mr}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/AMr.png',
  '{LB}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LB.png',
  '{LM}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LM.png',
  '{LW}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LW.png',
  '{LH}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LH.png',
  '{LT}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LT.png',
  '{LF}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LF.png',
  '{LA}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LA.png',
  '{MH}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/MH.png',
  '{MR}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/MR.png',
  '{ML}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ML.png',
  '{MF}': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/MF.png',
};

const FIELDS_MAP: { [key: string]: string } = {
  'Biped': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LB.png',
  'Multi-Leg': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LM.png',
  'Wheel': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LW.png',
  'Hover': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LH.png',
  'Tank': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LT.png',
  'Flight': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LF.png',
  'Water': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/LA.png',

  'Male': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/GM.png',
  'Female': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/GF.png',

  'Range': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ARn.png',
  'Melee': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/AMl.png',
  'Ailment': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ASt.png',
  'Assist': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ASp.png',
  'Defense': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ADf.png',
  'Morph': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/AMr.png',

  'Head': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/MH.png',
  'Right Arm': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/MR.png',
  'Left Arm': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/ML.png',
  'Legs': 'https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/MF.png',
};

const IconField = ({field}: { field: string }) => {
  if (FIELDS_MAP[field]) {
    return (
        <div className={"flex flex-row items-center gap-2"}>
          <img src={FIELDS_MAP[field]} width={20}/>
          {field}
        </div>
    )
  }
  return <></>;
}

const parseTextToImages = (text: ReactNode) => {
  if (text === null || text === undefined) return null;
  const keys = Object.keys(ICON_MAP);
  const escapedKeys = keys.map(key =>
      key.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')
  ).join('|');
  const regex = new RegExp(`(${escapedKeys}|\n)`, 'g');
  const parts = String(text).split(regex);
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

const parseMedalRequirements = (requirements: string[]) => {
  return (
      <div className={"flex flex-row items-center gap-2"}>
        {requirements.map((r, i) => (
            <img key={i} src={`https://fbanda.github.io/Arena-MedabotsCard/Assets/Icons/R${r}.png`} alt={r}
                 style={{width: '16px', height: '16px'}}/>
        ))}
      </div>
  )
}

const Row = ({label, text, notParse}: { label: string, text: ReactNode, notParse?: boolean }) => {
  return (
      <div className={`flex py-1 px-2 rounded-[8px]`}>
        <div className={"basis-[30%]"}><b>{label}</b></div>
        {notParse && <div className={"basis-[70%]"}>{text}</div>}
        {!notParse && <div className={"basis-[70%]"}>{parseTextToImages(text)}</div>}
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
                    <Row label={"Name"} text={store.selectedCard?.cardname}/>
                    <Row label={"Card Type"} text={store.selectedCard?.cardType}/>
                  </>
              )}
              {!store.selectedCard?.isToken && (
                  <Row label={"Color"}
                       text={store.selectedCard?.colors.length == 0 ? "-" : store.selectedCard?.colors.filter((c: string) => c !== "M").map((c: string) => getColorWord(c)).join(", ")}
                  />
              )}
              {store.selectedCard?.cardType !== "Leader" && store.selectedCard?.cardType !== "Medal" && !store.selectedCard?.isToken && (
                  <>
                    <Row label={"Medal Requirements"} notParse
                         text={store.selectedCard?.medalRequirements.length === 0 ? "-" : parseMedalRequirements(store.selectedCard?.medalRequirements)}/>
                    <Row label={"Main Cost"}
                         text={store.selectedCard?.mainCost >= 0 ? store.selectedCard?.mainCost : "-"}/>
                    <Row label={"Trigger Cost"}
                         text={store.selectedCard?.triggerCost >= 0 ? store.selectedCard?.triggerCost : "-"}/>
                  </>
              )}
              {store.selectedCard?.cardType === "Medal" && (
                  <Row label={"Level"} text={store.selectedCard?.medalLevel}/>
              )}
              {(store.selectedCard?.cardType === "Medabot" || store.selectedCard?.cardType === "Medal") && (
                  <>
                    <Row label={"Power"} text={store.selectedCard?.power}/>
                    <Row label={"Armor"} text={store.selectedCard?.armor}/>
                  </>
              )}
              {store.selectedCard?.cardType === "Medabot" && (
                  <>
                    <Row label={"Medabot Type"} text={store.selectedCard?.medabotType}/>
                    <Row
                        notParse
                        label={"Gender"}
                        text={<IconField field={store.selectedCard?.gender}/>}
                    />
                    <Row
                        notParse
                        text={<IconField field={store.selectedCard?.legType}/>}
                        label={"Leg Type"}
                    />
                    <Row
                        notParse
                        label={"Attributes"}
                        text={store.selectedCard?.attributes.map((item: string) => <IconField field={item}/>)}
                    />
                  </>
              )}
              {store.selectedCard?.cardType === "Medafighter" && (
                  <>
                    <Row label={"Spirit"} text={store.selectedCard?.spirit}/>
                    <Row label={"Identity"}
                         text={store.selectedCard?.medafighterIdentity !== "" ? store.selectedCard?.medafighterIdentity : "-"}/>
                  </>
              )}
              {store.selectedCard?.cardType !== "Leader" && store.selectedCard?.cardType !== "Medapart" && (
                  <Row label={"Groups"}
                       text={store.selectedCard?.groups.length === 0 ? "-" : store.selectedCard?.groups.map((g: string) => `[${g}]`).join(", ")}
                  />
              )}
              {store.selectedCard?.cardType !== "Medapart" && (
                  <Row label={"Card Text"} text={store.selectedCard?.mainText}/>
              )}
              {(store.selectedCard?.cardType === "Medapart" || (store.selectedCard?.cardType === "Medabot" && !store.selectedCard?.isToken)) && (
                  <Row label={"Medapart Name"} text={store.selectedCard?.medapartName}/>
              )}
              {(store.selectedCard?.cardType === "Medabot" && !store.selectedCard?.isToken) && (
                  <Row label={"Medapart Cost"} text={store.selectedCard?.medapartCost}/>
              )}
              {(store.selectedCard?.cardType === "Medapart" || (store.selectedCard?.cardType === "Medabot" && !store.selectedCard?.isToken)) && (
                  <>
                    <Row label={"Medapart Type"} text={<IconField field={store.selectedCard?.medapartType}/>} notParse/>
                    <Row label={"Medapart Text"} text={store.selectedCard?.medapartText}/>
                  </>
              )}
              {store.selectedCard?.cardType === "Event" && (
                  <Row label={"Flavor Text"} text={store.selectedCard?.flavorText}/>
              )}
              <Row label={"Set"} text={store.selectedCard?.set}/>
              <Row label={"Collector Number"} text={store.selectedCard?.collectorNumber}/>
              {store.selectedCard?.tokens.length > 0 && (
                  <Row label={store.selectedCard?.isToken ? "Created by" : "Tokens"} text={""}/>
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
                  <Row label={"Rulings"} text={""}/>
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
                              <li key={j} className={"mb-4"}>{parseTextToImages(l)}</li>
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