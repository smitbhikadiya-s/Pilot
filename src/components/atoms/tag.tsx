import { Tag, type TagProps } from 'antd';

import React, { memo } from 'react';

const TagAtom: React.FC<TagProps> = ({ ...props }) => {
  return <Tag {...props} />;
};

export default memo(TagAtom);
