const fs = require('fs');
const csv = require('fast-csv');

const commodityModel = require('../model/commodityModel');


const csvAsync = async () => {
  const stream = fs.createReadStream(__dirname + '/19-01.csv');

  let newArray = [];
  return new Promise((resolve, reject) => {
    csv.fromStream(stream, { headers : true, ignoreEmpty: true })
    .on("data",(data) => {
        newArray.push(data);
    })
    .on("end", async (allCount) => {
      console.log(allCount);
      const res = await fetchAPI(newArray);
    })
  });
}

const fetchAPI = async (newArray) => {
  // return new Promise((resolve, reject) => {
    // new commodityModel({ name: '1' }).save();
  // });
}

csvAsync();