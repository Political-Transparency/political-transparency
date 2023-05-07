import styled from "styled-components";
import MyTabs from "./TabsCard";
import { useState } from "react";
import BillsTable from "../common/BillsTable";

const BillsSelection = () => {
  const [currentChosenBill, setCurrentChosenBill] = useState("");
  const handleInputChange = (e) => {
    console.log(e.target.value);
    setCurrentChosenBill(e.target.value);
  };
  const tabsHeaders = [
    {
      title: "מספר כנסת",
      description: "חפש הצעות חוק המשוייכות לכנסת מסויימת",
      content: <input type="number"></input>,
    },
    {
      title: "טקסט חופשי",
      description: "חפש הצעות חוק על פי טקסט חופשי",
      content: (
        <input value={currentChosenBill} onChange={handleInputChange}></input>
      ),
    },
  ];
  const [tableData, setTableData] = useState([]);

  const tableHeaders = ["הצבעתך", "הצעת חוק", "מספר"];
  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";

  const searchBillHandler = () => {
    console.log(currentChosenBill);
    setTableData((prevData) => [...prevData, currentChosenBill]);
  };

  return (
    <BillsSelectionWrapper>
      <HeadersWrapper>
        <Header>{header}</Header>
        <Hint>{hint}</Hint>
      </HeadersWrapper>
      <FormContainer>
        <BillsSelectionContainer>
          <MyTabs tabsHeaders={tabsHeaders} />
          <button onClick={searchBillHandler}>!חפש</button>
        </BillsSelectionContainer>

        <BillsTableContainer>
          <BillsTable headers={tableHeaders} data={tableData} />
        </BillsTableContainer>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelection;

const BillsSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
`;

const HeadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10%;
  width: 100%;
  margin-top: 30px;
  gap: 30px;
`;

const Header = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  font-family: Poppins, sans-serif;
`;

const Hint = styled.header`
  font-size: 16px;
  font-weight: 500;
  font-family: Poppins, sans-serif;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const BillsSelectionContainer = styled.div`
  height: 15%;
`;

const BillsTableContainer = styled.div`
  display: flex;
  width: 25%;
  height: 80%;
  overflow: scroll;
`;
