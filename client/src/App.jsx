import styled from 'styled-components';
import BillsSelection from './pages/BillsSelection';

function App() {
  return (
    <AppWrapper>
      <BillsSelection />
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  height: 100vh;
`;