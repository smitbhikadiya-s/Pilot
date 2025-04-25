import ColAtom from "../atoms/col";
import GroupedItemsTable from "../molecules/groupedItemsTable";
import CardAtom from "../atoms/card";
import RecentItemsTable from "../molecules/recentItemsTable";
import React from "react";

const DashboardTableContainer: React.FC = () => {
  return (
    <>
      <ColAtom xs={24} md={12} sm={24}>
        <CardAtom
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          <GroupedItemsTable />
        </CardAtom>
      </ColAtom>
      <ColAtom xs={24} md={12} sm={24}>
        <CardAtom
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          <RecentItemsTable />
        </CardAtom>
      </ColAtom>
    </>
  );
};

DashboardTableContainer.displayName = "DashboardTableContainer";

export default DashboardTableContainer;
