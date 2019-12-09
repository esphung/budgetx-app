function getShortDate(date) {
  // short human readable date
  let str = '';
  if (date) {
    const dateObj = new Date(date);
    const dd = dateObj.getDate();
    const mm = dateObj.getMonth() + 1; // January is 0!
    const yyyy = dateObj.getFullYear();

    // return day+' - '+dd+'/'+mm+'/'+yyyy+' '+hours+':'+minutes;
    str = `${mm}/${parseInt(dd, 10)}/${yyyy}`;
  }
  return str;
}


export function convertObjectToHTML(item) {
  const array = [];
  // console.log(item);

  Object.keys(item).forEach((key) => {
    // parse nested opbj properties
    // if (key === 'id') {
    //   // do not add id
    //   array.push(`<td>${item[key]}</td>\n`);
    // }

    // if (key === 'type') {
    //   // do not add id
    //   array.push(`<td>${capitalize(item[key])}</td>\n`);
    // }

    if (key === 'date') {
      array.push(`<td>${getShortDate(item[key])}</td>\n`);
    }

    if (key === 'category') {
      // console.log(item[key].name);
      array.push(`<td>${item[key].name}</td>\n`);
    }

    if (key === 'payee') {
      array.push(`<td>${item[key].name}</td>\n`);
    }

    if (key === 'amount') {
      array.push(`<td>$${item[key].toFixed(2)}</td>\n`);
    }
  });
  return array.join('');
}

export function getHTMLObjectRows(array) {
  let string = '';
  let i = array.length - 1;
  for (i; i >= 0; i -= 1) {
    string += `<tr>${convertObjectToHTML(array[i])}</tr>${'\n'}`;
  }
  return string;
}

export function getObjectKeysHTML(list) {
  const keys = [];

  const item = list[0];

  Object.keys(item).forEach((key) => {
    // parse nested opbj properties
    if (key !== 'id' && key !== 'type') {
      keys.push(`<td>${key}</td>\n`);
    }
  });
  return keys.join('');
}

export const htmlTop = `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
        table {
            border-collapse: collapse;
            font: 12px sf-pro;
        }

        td {
            border: 1px lightgray solid;
        }

        th, td {
          padding: 8px;
          text-align: left;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, sf-pro;
        }
    </style>
    <title>${'Exported Transactions'} ${getShortDate(new Date())}</title>
  </head>
    <body>
`;

export const htmlBottom = `
  </body>
</html>
`;

