// import supertest from 'supertest';

const xml2js = require('xml2js');

const fs = require('fs');

// Read the XML file
const xmlString = fs.readFileSync(__dirname+'/allMembers.xml', 'utf8');

// console.log(xmlString['title']);


// Parse the XML into a JavaScript object
xml2js.parseString(xmlString, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      // Check if the desired element exists in the object
    //   if (result && result.elementName) {
    //     console.log('Element exists!');
    //   } else {
    //     console.log('Element does not exist.');
    //   }
    // console.log(result);
    const rows = result.feed.entry.map(entry => entry["content"][0]["m:properties"]);
    
    const row = rows[0][0] 
    const id = row["d:PersonID"]
    let fname = row["d:FirstName"]
    const lname = row["d:LastName"]
    let isCurrent = row["d:IsCurrent"]
    // console.log(rows);
    console.log(row);
    console.log(id[0]);


    }
  });

  
 


  
  
  
  
/*

const endpoint = "http://knesset.gov.il/Odata/ParliamentInfo.svc";

describe("GET endpoint/KNS_Person", () => {
    
    // sould respons with 200 status code.
    // sould respons with xml object.
    // sould respons with xml object contain "X1", "X2", "X3" keys.
    // sould respons with xml object contain the values in 'all_member_in_session_24.json' file.

    test("sould respons with 200 status code", async() => {
        
    });

});

*/