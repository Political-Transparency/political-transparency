import styled from "styled-components";
import BillCard from "./BillCard";

const BillsList = (props) => {
  const { data } = props;

  const removeBillHandler = () => {

  }

  return (
    <BillsListContainer>
        {data.map((val, index) => (
          <BillCard key={index} data={val} removeCard={removeBillHandler} />
        ))}
    </BillsListContainer>
  );
};



const BillsListContainer = styled.div`
  width: 100%;
`;

export default BillsList;
