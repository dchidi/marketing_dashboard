import React from "react";
import styles from "./Campaigns.module.css";
import { Row } from "../../layouts/row_col/RowCol";
import Card from "../../layouts/card/Card";
import Modal from "../../layouts/modal/Modal";
import { useCampaigns } from "./useCampaigns";
import Table from "../../ui/table/Table";
import { useModal } from "../../../hooks/useModal";
import { FaBirthdayCake } from "react-icons/fa";
import {
  TbCancel,
  TbClockExclamation,
  TbMessage2Cancel,
  TbShieldCancel,
} from "react-icons/tb";

interface CampaignItemProps {
  icon: React.ReactNode;
  text: string;
  count: number;
}

export const CampaignItem: React.FC<CampaignItemProps> = ({
  icon,
  text,
  count,
}) => {
  return (
    <Row gap="10px" className={styles.campaignItem}>
      <div>{icon}</div>
      <div>{text}</div>
      <div className={styles.count}>{count}</div>
    </Row>
  );
};

const Campaigns: React.FC = () => {
  const { isOpen, toggleModal } = useModal();
  const { quoteTableData, columns } = useCampaigns();

  const CampaignData = [
    { id: 1, text: "Birthday", count: 2, icon: <FaBirthdayCake /> },
    { id: 2, text: "Renewals", count: 20, icon: <TbClockExclamation /> },
    { id: 3, text: "Lapsed Quotes", count: 200, icon: <TbMessage2Cancel /> },
    {
      id: 4,
      text: "Cancelled Policies",
      count: 5,
      icon: <TbCancel />,
    },
    { id: 5, text: "Expired Policies", count: 0, icon: <TbShieldCancel /> },
  ];

  return (
    <>
      <Card
        title="Quick Views"
        viewDataCallback={toggleModal}
        className={styles.root}
        hasViewData={false}
      >
        <h3>
          <span className="date">[May 2025]</span>
        </h3>
        <Row gap="20px" className={styles.items}>
          {CampaignData.map((item) => (
            <CampaignItem {...item} key={item.id} />
          ))}
        </Row>
      </Card>
      <Modal isOpen={isOpen} onClose={toggleModal} allowKeyCloseEvent={false}>
        {/* TODO:: Ensure table data is only loaded when user click on the data icon to 
        improve load time. Leave the logic as it is for now until you start to 
        implement api calls */}
        <Table
          columns={columns}
          data={quoteTableData}
          enableSorting={true}
          enableFiltering={true}
        />
      </Modal>
    </>
  );
};
export default Campaigns;
