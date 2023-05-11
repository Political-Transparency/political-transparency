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
  width: 100%;
  gap: 20px;
`;

export const BillsSelectionContainer = styled.div`

`;

export const BillsTableContainer = styled.div`
  display: flex;
  border: 1px solid black;
  width: 25%;
  height: 50%;
  overflow: auto;
`;
