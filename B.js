const isOdd = (number) => number % 2 !== 0;
const isEven = (number) => number % 2 === 0;

// we get this formula by extracting n from combinations formula (where k = 2)
const getTeamsAmountAtSecondStage = (matchesAmount) => (1 + Math.sqrt(1 + 8 * matchesAmount)) / 2;

const getFirstStageData = (teamsAmount) => {
  let teamsAtSecondStage = teamsAmount;
  let matchesAtFirstStage = 0;

  while (isEven(teamsAtSecondStage)) {
    teamsAtSecondStage /= 2;
    matchesAtFirstStage += teamsAtSecondStage
  }

  return { matchesAtFirstStage, teamsAtSecondStage };
};

const getTeamsAmount = (input) => {
  const result = [];
  const matchesAmount = Number(input);
  const potentialMaxTeamsAmount = matchesAmount * 2;

  for (let teamsAmount = 2; teamsAmount <= potentialMaxTeamsAmount; teamsAmount++) {
    // when only second stage in tournament
    if (isOdd(teamsAmount)) {
      if (teamsAmount === getTeamsAmountAtSecondStage(matchesAmount)) {
        result.push(teamsAmount);
      }

      continue;
    }

    const { matchesAtFirstStage, teamsAtSecondStage } = getFirstStageData(teamsAmount);

    // when only first stage in tournament
    if (matchesAtFirstStage === matchesAmount && teamsAtSecondStage === 1) {
      result.push(teamsAmount);

      continue;
    }

    if (matchesAtFirstStage > matchesAmount) {
      continue;
    }

    // when first stage and second stage in tournament
    const matchesAtSecondStage = matchesAmount - matchesAtFirstStage;

    if (teamsAtSecondStage === getTeamsAmountAtSecondStage(matchesAtSecondStage)) {
      result.push(teamsAmount);
    }
  }

  return result;
};

const printResult = (result) => {
  if (result.length) {
    result.forEach((teamsAmount) => console.log(teamsAmount));
  } else {
    console.log(-1);
  }
};
