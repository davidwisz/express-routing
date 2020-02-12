const express = require("express");

const app = express();

// for processing JSON:
app.use(express.json());

app.get("/mean", function (req, res) {
  let numStrings = req.query.nums.split(',');
  let nums = numStrings.map(x => parseInt(x));
  let output = 0;
  for (let i=0; i<nums.length; i++) {
    output += nums[i]
  }
  output = output/nums.length;
  let response = {"operation":"mean","value":output};
  return res.json({response});
});

app.get("/median", function (req, res) {
  let numStrings = req.query.nums.split(',');
  let nums = numStrings.map(x => parseInt(x)).sort();
  let newLength = nums.length-1;
  let fl = Math.floor(newLength/2);
  let ce = Math.ceil(newLength/2);
  let output = (nums[fl] + nums[ce])/2;
  console.log('output:', output);
  let response = {"operation":"mean","value":output};
  return res.json({response});
});

// app.get("/mode", function (req, res) {
//   let nums = req.query.nums.split(',').map(parseInt());
//   return res.send("MODE!");
// });

app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: { message, status }
  });
});

app.listen(3000, function () {
  console.log("App on port 3000");
});