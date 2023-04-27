
/**
 * Finds the score of each Knesset member in relation to what the user chose. 
 * @param {Array} bill_ids_list         list of bill IDs.   
 * @param {Array} user_vote_list        list of boolean values for or against.
 * @param {Object} members_vote_object  dict of {key= bill id, value= list of (member id, vote)}. // vote (-1 0 1)
 * @returns {Object} score per member {key= member id, val= score}.
 */
const findScoresToMembers = (bill_ids_list, user_vote_list, members_vote_object) => {
    let ans = [];
    return ans;
};

module.exports = findScoresToMembers;

