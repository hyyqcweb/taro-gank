export default function unique(list) {
  let result = {};
  let finalResult = [];
  for (let i = 0; i < list.length; i++) {
    result[list[i]._id] = list[i];
  }

  for (let item in result) {
    finalResult.push(result[item]);
  }
  return finalResult;
}
