export const getTransactionCategories = (transactions) => {
  let result = [];

  transactions.forEach( function(element) {
    // statements
    // console.log('element.category: ', element.category);
    element.category.count = 0;

    for (var i = transactions.length - 1; i >= 0; i--) {
      if (transactions[i].category.id === element.category.id) {
        element.category.count += 1
      }
    }

    element.category.legendFontColor = styles.textStyle.color // element.category.color

    element.category.legendFontSize = styles.textStyle.fontSize

    result.push(element.category)
  });
  return result;
};
