import {Image, Modal} from "antd";

export interface SingleCardModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (isModalOpen: boolean) => void;
  selectedCard: any;
}

export const SingleCardModal = (props: SingleCardModalProps) => {
  const {isModalOpen, setIsModalOpen, selectedCard} = props;
  return (
      <Modal
          title={selectedCard?.cardname ?? ""}
          centered
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
      >
        <Image preview={false} src={selectedCard?.cardImageUrl ?? ""} alt={"card"}/>
      </Modal>
  )
}