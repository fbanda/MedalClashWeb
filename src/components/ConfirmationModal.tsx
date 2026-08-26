import {Modal} from "antd";

export interface ConfirmationModalProps {
  title: string;
  message: string;
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: (isDeleteModalOpen: boolean) => void;
  onConfirm?: () => void;
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {title, message, isDeleteModalOpen, setIsDeleteModalOpen, onConfirm} = props;

  return (
      <Modal
          title={title}
          closable={{ 'aria-label': 'Custom Close Button' }}
          open={isDeleteModalOpen}
          okButtonProps={{
            hidden: !onConfirm,
          }}
          onOk={() => {
            onConfirm?.();
            setIsDeleteModalOpen(false)
          }}
          onCancel={() => setIsDeleteModalOpen(false)}
      >
        <p>{message}</p>
      </Modal>
  )
}