import { Image, ImageProps } from "antd";
import React, { memo } from "react";

const ImageAtom: React.FC<ImageProps> = ({ ...props }) => {
  return <Image {...props} />;
};

export default memo(ImageAtom);
