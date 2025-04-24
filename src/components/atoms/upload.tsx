import { Upload, type UploadProps } from "antd";
import React from "react";

interface UploadAtomProps extends React.FC<UploadProps> {
  LIST_IGNORE: typeof Upload.LIST_IGNORE;
}

const UploadAtom: UploadAtomProps = (props) => {
  return <Upload {...props} />;
};

UploadAtom.LIST_IGNORE = Upload.LIST_IGNORE;

export default UploadAtom;
