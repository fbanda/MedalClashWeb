import {Image, Modal} from "antd";
import {useStore} from "../store/store.ts";

export interface SingleCardModalProps {
  isModalOpen: boolean;
  selectedCard: any;
}

export const SingleCardModal = (props: SingleCardModalProps) => {
  const {isModalOpen, selectedCard} = props;
  const store = useStore();
  return (
      <Modal
          title={selectedCard?.cardname ?? ""}
          centered
          open={isModalOpen}
          onCancel={() => store.setIsSingleCardModalOpen(false)}
          footer={null}
      >
        <Image preview={false} src={selectedCard?.cardImageUrl ?? ""} alt={"card"}/>
      </Modal>
  )
}