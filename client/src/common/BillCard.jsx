import styled from "styled-components";

const BillCard = (props) => {
  const { data, removeCard } = props;

  return (
    <BillContainer>
      <BillContent>{data}</BillContent>
      <RemoveButton onClick={removeCard}>{"הסר"}</RemoveButton>
    </BillContainer>
  );
};

const BillContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  height: 30px;
  gap: 10px;
  border-radius: 5px;
  padding: 0.25rem;
  background-color: unset;
  margin: 1px 8px;
  border-radius: 4px;
  transition: background-color 0.1s ease-in-out 0s;
  align-items: center;

  :hover {
    background-color: grey;
    z-index: 9;
`;

const BillContent = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-align: right;
  text-overflow: ellipsis;
  background-color: white;
  flex: auto;
`;

const RemoveButton = styled.button`
  border-radius: 4px;
  background-color: white;
`;

export default BillCard;
