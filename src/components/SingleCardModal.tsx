import {Image, Modal} from "antd";
import {useStore} from "../store/store.ts";

export interface SingleCardModalProps {
  isModalOpen: boolean;
  selectedCard: any;
}

const Row = ({label, text, bg} : {label: string, text: string, bg?: boolean}) => {
  return (
      <div className={`flex py-1 px-2 ${bg ? "bg-[#dbf1fa]" : ""}`}>
        <div className={"basis-[30%]"}><b>{label}</b></div>
        <div className={"basis-[70%]"}>{text}</div>
      </div>
  )
}

export const SingleCardModal = (props: SingleCardModalProps) => {
  const {isModalOpen, selectedCard} = props;
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
          <div>
            <Image preview={false} src={selectedCard?.cardImageUrl ?? ""} alt={"card"}/>
          </div>
          <div>
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
            {selectedCard?.cardType === "Medapart" || (selectedCard?.cardType === "Medabot" && !selectedCard?.isToken) && (<div>
            <Row label={"Medapart Name"} text={selectedCard?.medapartName} bg></Row>
            <Row label={"Medapart Cost"} text={selectedCard?.medapartCost} ></Row>
            <Row label={"Medapart Type"} text={selectedCard?.medapartType} bg></Row>
            <Row label={"Medapart Text"} text={selectedCard?.medapartText} ></Row>
            </div> )}
            {selectedCard?.cardType === "Event" && (<div>
            <Row label={"Flavor Text"} text={selectedCard?.flavorText} bg></Row>
            <Row label={"Set"} text={selectedCard?.set} ></Row>
            <Row label={"Collector Number"} text={selectedCard?.collectorNumber} bg></Row>
            </div>)}
            {selectedCard?.cardType !== "Event" && (<div>
            <Row label={"Set"} text={selectedCard?.set} bg></Row>
            <Row label={"Collector Number"} text={selectedCard?.collectorNumber} ></Row>
            </div>)}
          </div>
        </div>

      </Modal>
  )
}