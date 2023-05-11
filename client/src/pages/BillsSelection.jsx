import MyTabs from "./TabsCard";
import { useState } from "react";
import BillsList from "../common/BillsList";
import { BillsSelectionContainer, BillsSelectionWrapper, BillsTableContainer, FormContainer, Header, HeadersWrapper, Hint } from "./BillsSelection.styled";

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
    setTableData((prevData) => [...prevData, currentChosenBill]);
  };

  const removeBillHandler = () => {

  }

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
          <BillsList headers={tableHeaders} data={tableData} />
        </BillsTableContainer>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelection;

