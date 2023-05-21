import styled from "styled-components";
import BillCard from "./BillCard";

const BillsList = (props) => {
  const { bills, setBills } = props;

  const removeBillHandler = (index) => {
    const updatedBillsList = bills.slice();
    updatedBillsList.splice(index, 1);
    setBills(updatedBillsList);
  };

  return (
    <BillsListContainer>
      {bills.map((val, index) => (
        <BillCard
          key={index}
          data={val}
          removeCard={() => {
            removeBillHandler(index);
          }}
        />
      ))}
    </BillsListContainer>
  );
};

const BillsListContainer = styled.div`
  width: 45%;
`;

export default BillsList;
