import React, { memo } from 'react';
import { ButtonProps, Button } from 'antd';
const ButtonAtom: React.FC<ButtonProps> = ({ ...props }) => {
  return <Button {...props} />;
};

export default memo(ButtonAtom);
