fetch("./test-input.txt")
  .then((response) => response.text())
  .then((text) => {
    let textArr = text.split("\r\n");

    let lines = [];

    let safeLines = 0;

    textArr.forEach((line) => {
      let lineItem = line.split(" ");
      let cleanLine = [];
      lineItem.forEach((item) => {
        if (item.length > 0) {
          cleanLine.push(Number(item));
        }
      });
      lines.push(cleanLine);
    });
    lines.forEach((line) => {
      let isSafe = false;
      let allowance = 0;
      let isIncreasing = checkIncreasing(line).increasing;
      let isDecreasing = checkDecreasing(line).decreasing;
      let validDiff =
        checkForSafeDiff(line).isValid != undefined
          ? checkForSafeDiff(line).isValid
          : false;

      if ((isIncreasing && validDiff) || (isDecreasing && validDiff)) {
        safeLines++;
      } else {
        if (resultObj.probNum != undefined) {
          let allowanceArr = line.slice(line.indexOf(resultObj.probNum), 1);
          let allowanceIsIncreasing = checkIncreasing(allowanceArr).increasing;
          let allowanceIsDecreasing = checkDecreasing(allowanceArr).decreasing;
          let allowanceValidDiff = checkForSafeDiff(allowanceArr).isValid;

          if (
            (allowanceIsIncreasing && allowanceValidDiff) ||
            (allowanceIsDecreasing && allowanceValidDiff)
          ) {
            safeLines++;
          }
        }
      }
    });
    console.log(safeLines);
  })
  .catch((err) => console.log(err));

function checkIncreasing(nums) {
  let resultObj = {
    increasing: false,
  };
  for (let i = 0; i <= nums.length - 1; i++) {
    let nextNumIndex = i + 1;
    let nextNum = nums[nextNumIndex];
    let num = nums[i];

    if (nextNum != undefined) {
      if (num > nextNum) {
        // console.log(num + " is more than " + nextNum);
        resultObj.increasing = false;
        break;
      } else if (num < nextNum) {
        // console.log(num + " is less than " + nextNum);
        resultObj.increasing = true;
        resultObj.probNum = nextNum;
      }
    }
  }
  return resultObj;
}

function checkDecreasing(nums) {
  let decreasing = false;
  let resultObj = {
    decreasing: false,
  };
  for (let i = 0; i <= nums.length - 1; i++) {
    let nextNumIndex = i + 1;
    let nextNum = nums[nextNumIndex];
    let num = nums[i];

    if (nextNum != undefined) {
      if (num > nextNum) {
        // console.log(num + " is more than " + nextNum);
        resultObj.decreasing = true;
      } else if (num < nextNum) {
        // console.log(num + " is less than " + nextNum);
        resultObj.decreasing = false;
        resultObj.probNum = nextNum;
        break;
      }
    }
  }
  return resultObj;
}

function checkForSafeDiff(nums) {
  let validDiff = false;

  let resultObj = {
    isValid: false,
  };
  for (let i = 0; i <= nums.length; i++) {
    let nextNumIndex = i + 1;
    let nextNum = nums[nextNumIndex];
    let num = nums[i];

    if (nextNum != undefined) {
      let numsToCheck = [num, nextNum];
      let biggerNum = Math.max(...numsToCheck);
      let smallerNum = Math.min(...numsToCheck);
      let numDiff = biggerNum - smallerNum;
      // console.log(
      //   "Difference between " +
      //     biggerNum +
      //     " and " +
      //     smallerNum +
      //     "is " +
      //     numDiff
      // );
      if (numDiff > 0 && numDiff <= 3) {
        // console.log("Diff is valid");
        resultObj.isValid = true;
      } else {
        // console.log("Diff is invalid");
        resultObj.isValid = false;
        resultObj.probNum = nextNum;
        break;
      }
    }
  }
  return resultObj;
}
