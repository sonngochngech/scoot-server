

const { dungHyThan, getFormattedJson } = require('dunghythan');


const Gender = Object.freeze({
    MALE: 1,
    FEMALE: -1
    });
    
    let res = dungHyThan(1990, 1, 1, 12,0, 1);
    // res.showAll();
    console.log(getFormattedJson(res));
    

    console.log((getFormattedJson(res)));