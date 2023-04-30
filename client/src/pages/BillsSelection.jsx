import styled from 'styled-components';
import MyTabs from './MyTabs';

const BillsSelection = () => {
    return (
        <BillsSelectionWrapper>
            <div>
                <div>
                    <input></input>
                    <input></input>
                </div>
                <div>
                    <input></input>
                    <input></input>
                </div>
                <button></button>
            </div>
            <Rectangle />
            <Rectangle />
            <button></button>
            <MyTabs/>
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