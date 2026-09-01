import {Image, Modal} from "antd";
import {useStore} from "../store/store.ts";

export interface SingleCardModalProps {
  isModalOpen: boolean;
  selectedCard: any;
}

const Row = ({label, text, bg} : {label: string, text: string, bg?: boolean}) => {
  return (
      <div className={`mb-3 px-2 ${bg ? "bg-[#dbf1fa]" : ""}`}>
        <p><b>{label}:</b></p>
        <p>{text}</p>
      </div>
  )
}

export const SingleCardModal = (props: SingleCardModalProps) => {
  const {isModalOpen, selectedCard} = props;
  const store = useStore();
  return (
      <Modal
          width={1200}
          title={selectedCard?.cardname ?? ""}
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
            <Row label={"Card Name"} text={selectedCard?.cardname} bg></Row>
            <Row label={"Card Text"} text={selectedCard?.mainText}></Row>
            <Row label={"Card Type"} text={selectedCard?.cardType} bg></Row>
            <Row label={"Card Code"} text={selectedCard?.cardCode} ></Row>
            <Row label={"Medabot Type"} text={selectedCard?.medabotType} bg></Row>
            <Row label={"Gender"} text={selectedCard?.gender} ></Row>
            <Row label={"Leg Type"} text={selectedCard?.legType} bg></Row>
            <Row label={"Attributes"} text={selectedCard?.attributes.join(", ")}></Row>
            <Row label={"Groups"} text={selectedCard?.groups.join(", ")} bg></Row>
            <Row label={"Medapart Name"} text={selectedCard?.medapartName} ></Row>
            <Row label={"Medapart Type"} text={selectedCard?.medapartType} bg></Row>
            <Row label={"Medapart Text"} text={selectedCard?.medapartText} ></Row>
            <Row label={"Set"} text={selectedCard?.set} bg></Row>
            <Row label={"Collector Number"} text={selectedCard?.collectorNumber} ></Row>
          </div>
        </div>

      </Modal>
  )
}