function mean(nums) {
  let output = 0;
  for (let i = 0; i < nums.length; i++) {
    output += nums[i]
  }
  output = output / nums.length;
  return output;
}

function median(nums) {
  let newLength = nums.length - 1;
  let fl = Math.floor(newLength / 2);
  let ce = Math.ceil(newLength / 2);
  let output = (nums[fl] + nums[ce]) / 2;
  return output;
}

function mode(nums) {
  let frequencies = {};
  let maxValue = 0;

  for (let i of nums) {
    if (!frequencies[i]) {
      frequencies[i] = 0;
    }
    frequencies[i]++;
    if (frequencies[i] > maxValue) {
      maxValue = frequencies[i];
    }
  }

  let output = [];
  for (let i in frequencies) {
    if (frequencies[i] === maxValue) {
      output.push(i);
    }
  }

  return output;
}

module.exports = {
  mean,
  median,
  mode
}