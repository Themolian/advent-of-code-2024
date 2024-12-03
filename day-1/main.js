fetch("./input.txt")
  .then((response) => response.text())
  .then((text) => {
    let textArr = text.split("\r\n");
    let lines = [];
    let lineOne = [];
    let lineTwo = [];

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
      lineOne.push(line[0]);
      lineTwo.push(line[1]);
    });
    lines = [lineOne, lineTwo];
    // Part 2
    let lineNumsToAdd = [];
    lineOne.forEach((num) => {
      let numTimes = 0;
      lineTwo.forEach((subNum) => {
        if (num == subNum) {
          numTimes++;
        }
      });
      let lineNum = num * numTimes;
      lineNumsToAdd.push(lineNum);
    });
    console.log("Part two answer: " + lineNumsToAdd.reduce((a, b) => a + b, 0));
    let smallestNums = [];
    let lineOneLength = lineOne.length - 1;
    for (let i = 0; i <= lineOneLength; i++) {
      let smallNums = [];
      let lineOneSmallest = Math.min(...lineOne);
      let lineTwoSmallest = Math.min(...lineTwo);

      console.log(`lineOne has ${lineOne.length} items and i is ${i}`);

      smallNums[0] = lineOneSmallest;
      smallNums[1] = lineTwoSmallest;

      lineOne.splice(lineOne.indexOf(lineOneSmallest), 1);
      lineTwo.splice(lineTwo.indexOf(lineTwoSmallest), 1);

      smallestNums.push(smallNums);
    }
    console.log(smallestNums);

    let diffs = [];

    smallestNums.forEach((item) => {
      let bigNum = Math.max(...item);
      let smolNum = Math.min(...item);

      let diffNum = bigNum - smolNum;

      diffs.push(diffNum);
    });

    console.log(diffs);

    const sum = diffs.reduce((a, b) => a + b, 0);

    console.log(sum);
  })
  .catch((err) => console.log(err));
