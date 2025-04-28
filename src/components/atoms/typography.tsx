import { Typography } from 'antd';
import { TypographyProps } from 'antd/es/typography/Typography';
import { memo } from 'react';

function TypographyAtom<T extends keyof React.JSX.IntrinsicElements>(
  props: TypographyProps<T>,
): React.ReactElement {
  return <Typography {...props} />;
}

export const { Title, Text, Paragraph } = Typography;
export default memo(TypographyAtom);
