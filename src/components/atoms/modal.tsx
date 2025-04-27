import { Modal, type ModalProps } from 'antd';
import React, { memo } from 'react';

const ModalAtom: React.FC<ModalProps> = props => {
  return <Modal {...props} />;
};

export default memo(ModalAtom);
