import FlexAtom from "../atoms/flex";
import { ReactNode } from "react";
import { Title } from "../atoms/typography";

interface PageSectionHeaderPropType {
  title: string;
  actions?: ReactNode[];
}

const PageSectionHeader: React.FC<PageSectionHeaderPropType> = ({
  title,
  actions,
}) => {
  return (
    <div style={{ position: "relative", padding: "24px 0" }}>
      <Title
        level={2}
        style={{
          margin: 0,
          paddingRight: actions && actions.length > 0 ? "100px" : 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {title}
      </Title>

      {actions && actions.length > 0 && (
        <FlexAtom
          gap={8}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            rowGap: "8px",
          }}
        >
          {actions}
        </FlexAtom>
      )}
    </div>
  );
};

export default PageSectionHeader;
