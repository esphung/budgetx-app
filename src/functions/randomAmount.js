/* generate fake decimal transaction amount; negative and positvve amounts */
const randomAmount = () => {
  let isNegativeAmount = (Math.random(0,1).toFixed(0) >= 1 ? true : false)
  // console.log('isNegativeAmount: ', isNegativeAmount);
	if (!isNegativeAmount) return (Math.random(0, 100) * 100).toFixed(2)
    else {
      return (-Math.random(0, 100) * 100).toFixed(2)
    }
}

export default randomAmount;