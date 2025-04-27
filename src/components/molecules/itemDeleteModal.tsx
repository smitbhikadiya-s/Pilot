import React from 'react';
import ModalAtom from '../atoms/modal';

type ConfirmDeleteModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  itemName?: string;
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  itemName,
}) => {
  return (
    <ModalAtom
      open={visible}
      title="Confirm Deletion"
      onCancel={onCancel}
      onOk={onConfirm}
      okText="Delete"
      okButtonProps={{ danger: true }}
      cancelText="Cancel"
      destroyOnClose
    >
      <p>
        Are you sure you want to delete{' '}
        <strong>{itemName || 'this item'}</strong>? Once it&apos;s gone,
        it&apos;s gone for good!
      </p>
    </ModalAtom>
  );
};

ConfirmDeleteModal.displayName = 'ConfirmDeleteModal';

export default ConfirmDeleteModal;
