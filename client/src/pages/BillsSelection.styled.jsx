import styled from "styled-components";

export const BillsSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 30px;
`;

export const HeadersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 10%;
  width: 100%;
  margin-top: 30px;
  gap: 30px;
`;

export const Header = styled.div`
  font-family: Open Sans;
  align-self: center;
  font-weight: 400;
  font-size: 40px;
  font-family: Poppins, sans-serif;
`;

export const Hint = styled.header`
  font-size: 16px;
  font-weight: 500;
  font-family: Poppins, sans-serif;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  height: 90%;
  width: 100%;
  gap: 20px;
`;

export const BillsSelectionContainer = styled.div``;

export const BillsTablesContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: center;
  width: 99%;
  height: 500px;
  overflow: auto;
`;

export const BillsTableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 0.5;
`;

export const ArrowBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 0.1;
`;

export const LoadSelectedBillsButton = styled.button``;
