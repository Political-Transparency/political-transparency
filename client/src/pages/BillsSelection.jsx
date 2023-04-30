import styled from 'styled-components';
import MyTabs from './TabsCard';


const BillsSelection = () => {
    const tabsHeaders = [
        { title: 'טקסט חופשי', content: <input></input> },
        { title: 'מספר כנסת', content: <input type='number'></input> },
      ];
      

    return (
        <BillsSelectionWrapper>
            <div>
                <div>
                <MyTabs tabsHeaders={tabsHeaders}/>
                </div>
   
                <button>!חפש</button>
            </div>
            <Rectangle />
            <Rectangle />
            <button></button>
        </BillsSelectionWrapper>
    )
};

export default BillsSelection;

const BillsSelectionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 100%;
`;

const Rectangle = styled.div`
    width: 50%;
    height: 20%;
    border: 1px solid black;
`;