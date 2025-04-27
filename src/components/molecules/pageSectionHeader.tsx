import React, { ReactNode } from 'react';
import FlexAtom from '../atoms/flex';
import { Title } from '../atoms/typography';

import '../../styles/pagesection.css';

interface PageSectionHeaderPropType {
  title: string;
  actions?: ReactNode[];
}

const PageSectionHeader: React.FC<PageSectionHeaderPropType> = ({
  title,
  actions,
}) => {
  return (
    <div className="page-section-wrapper">
      <Title
        level={2}
        style={{
          paddingRight: actions && actions.length > 0 ? '100px' : 0,
        }}
        className="page-title"
      >
        {title}
      </Title>

      {actions && actions.length > 0 && (
        <FlexAtom
          gap={8}
          wrap="wrap"
          justify="flex-end"
          align="center"
          className="page-actions-wrapper"
        >
          {actions}
        </FlexAtom>
      )}
    </div>
  );
};

PageSectionHeader.displayName = 'PageSectionHeader';

export default PageSectionHeader;
