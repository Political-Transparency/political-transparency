import styled from "styled-components";

const BillsTable = (props) => {
  const { headers, data } = props;
  return (
    <TableContainer>
      <tbody>
        {data.map((val, index) => (
          <TableRow key={index}>
            <BillContent>{val}</BillContent>

            <button>{"delete"}</button>
          </TableRow>
        ))}
      </tbody>
    </TableContainer>
  );
};

const TableContainer = styled.table`
  border: 1px solid black;
  width: 100%;
`;

const TableRow = styled.tr`
  display: flex;
  flex-direction: row-reverse;
  gap: 10px;
`;

const BillContent = styled.td`
  text-align: end;
  border-bottom: 1px solid black;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 400px; /* adjust as needed */
`;

export default BillsTable;
