import MyTabs from "./TabsCard";
import { useState } from "react";
import {
  ArrowBox,
  BillsSelectionContainer,
  BillsSelectionWrapper,
  BillsTableWrapper,
  BillsTablesContainer,
  FormContainer,
  Header,
  HeadersWrapper,
  Hint,
  LoadSelectedBillsButton,
} from "./BillsSelection.styled";
import BillsSuggestionsTable from "../common/BillsSuggestionsTable";
import SelectedBillsTable from "../common/SelectedBillsTable";

const BillsSelection = () => {
  const [currentChosenBill, setCurrentChosenBill] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [finalSelectedBillsData, setFinalSelectedBillsData] = useState([]);
  const [data, setData] = useState([
    { name: "Doe" },
    { name: "Smith" },
    { name: "Johnson" },
  ]);

  const handleInputChange = (e) => {
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
        <input
          value={currentChosenBill}
          placeholder="...הקלד כאן"
          onChange={handleInputChange}
        ></input>
      ),
    },
  ];
  const [tableData, setTableData] = useState([]);

  const header = "שקיפות בכנסת";
  const hint =
    "שירות זה נועד כדי לספק לציבור בישראל אפשרות להשוות בין דעותיהם הפוליטיות להצבעות חברי כנסת ישראל";

  const searchBillHandler = () => {
    setTableData((prevData) => [...prevData, currentChosenBill]);
  };

  const loadSelectedBillsHandler = () => {
    const res = [...selectedData];
    setFinalSelectedBillsData(res);
  };

  const loadAllBillsHandler = () => {
    const res = [...data];
    setFinalSelectedBillsData(res);
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

        <BillsTablesContainer>
          <BillsTableWrapper>
            <div>הצבעות אפשריות</div>
            <BillsSuggestionsTable
              selectedData={selectedData}
              setSelectedData={setSelectedData}
              data={data}
              setData={setData}
            />
          </BillsTableWrapper>

          <ArrowBox>
            <LoadSelectedBillsButton onClick={loadSelectedBillsHandler}>
              טען הצעות חוק שנבחרו
            </LoadSelectedBillsButton>
            <button onClick={loadAllBillsHandler}>טען הכל</button>
          </ArrowBox>
          <BillsTableWrapper>
            <div>הצבעות שנבחרו</div>
            <SelectedBillsTable data={finalSelectedBillsData} />
          </BillsTableWrapper>
        </BillsTablesContainer>
      </FormContainer>
    </BillsSelectionWrapper>
  );
};

export default BillsSelection;
