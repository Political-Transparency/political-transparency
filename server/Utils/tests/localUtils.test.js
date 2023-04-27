// import supertest from 'supertest'


const findScoresToMembers = require('../localUtils');

const BILL_IDS = [1, 2, 3, 4, 5, 6];
const USER_VOTE = [true, true, false, true, false, true];
const PRO = 1;
const CON = -1;

describe('member score for a bill', () =>{

    test('test the score of member who vote all the bills opposite the user', () =>{
        const NEGATIVE_SCORE = -100;

        let member_vote = {};
        let member_id = 555;
        
        for (let index = 0; index < BILL_IDS.length; index++ ){
            let bill_id = BILL_IDS[index];
            let member_vote = (USER_VOTE[index])? CON : PRO;
            
            member_vote[bill_id] = [(member_id, member_vote)];
        }
        const scores = findScoresToMembers(BILL_IDS, USER_VOTE, member_vote);
        
        expect(scores[member_id]).toEqual(NEGATIVE_SCORE);

        member_id = 7;
        let bill_id = 1;
        const score_for_one_bill = findScoresToMembers([bill_id], [true], {bill_id: [(member_id, CON)]});
        expect(score_for_one_bill[member_id]).toEqual(NEGATIVE_SCORE);
    });

    test('test the score of member who did not vote for any bills is zero', () =>{

    });

    test('test the score of member who vote all the bills like the user is 100', () =>{

    });
    
    test('test error - bill ids length not equals to members vote list length', () =>{

    });

    test('test error - bill ids length not equals to user choises length', () =>{

    });

    test('test the result length is equals to members length', () =>{

    });

    test('test the scores range between (-100, 100)', () =>{

    });

});