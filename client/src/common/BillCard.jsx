import styled from "styled-components";

const BillCard = (props) => {
    const {data, removeCard} = props;

  return (
    <BillContainer>
      <BillContent>{data}</BillContent>
      <button onClick={removeCard}>{"הסר"}</button>
    </BillContainer>
  );
};

const BillContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
  border-radius: 5px;
  padding: 0.25rem;
  background-color: unset;
  margin: 1px 8px;
  border-radius: 4px;
  transition: background-color 0.3s ease-in-out 0s;
`;

const BillContent = styled.div`
text-align: end;
white-space: nowrap;
overflow: auto;
width: 200px;
flex: auto;
`;

export default BillCard;
