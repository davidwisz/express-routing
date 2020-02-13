const express = require("express");
const ExpressError = require("./expressError");
const {mean, median, mode} = require("./equations");

const app = express();

// for processing JSON:
app.use(express.json());

//Validate input
app.use(function (req, res, next) {
  try {
    console.log(typeof req.query);
    if (!("nums" in req.query)) {
      throw new ExpressError("You need an input", 400);
    }
    let numStrings = req.query.nums.split(',');
    let nums = numStrings.map(x => parseFloat(x));

    // Make sure they all parse to numbers
    for (let i of numStrings) {
      if (isNaN(i) || i === "") {
        throw new ExpressError(`'${i}' is not a number.`, 400);
      }
    }

    res.locals.nums = nums;
    return next();
  } catch (err) {
    return next(err);
  }
});

app.get("/mean", function (req, res) {
  let output = mean(res.locals.nums);
  let response = { "operation": "mean", "value": output };
  return res.json({ response });
});

app.get("/median", function (req, res) {
  let nums = res.locals.nums.sort(
    (a, b) => a - b
  );
  let output = median(nums);
  let response = { "operation": "median", "value": output };
  return res.json({ response });
});

app.get("/mode", function (req, res) {
  let output = mode(res.locals.nums);
  let response = { "operation": "mode", "value": output };
  return res.json({ response });
});

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