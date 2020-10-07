const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  // BgBlack: "\x1b[40m",
  // BgRed: "\x1b[41m",
  // BgGreen: "\x1b[42m",
  // BgYellow: "\x1b[43m",
  // BgBlue: "\x1b[44m",
  // BgMagenta: "\x1b[45m",
  // BgCyan: "\x1b[46m",
  // BgWhite: "\x1b[47m",
}

const getColor = (color) => Object.keys(colors).find((item) => (colors[item].toLowerCase() === color.toLowerCase() || color.toLowerCase() === item.toLowerCase().replace('fg', ''))
  
)

const colorLog = ({ message, color }) => {
  // console.log('getColor(color): ', colors[getColor(color)]);
  // console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
  // console.log(`\x1b[33m%s${colors[getColor(color)]}`, message);  //yellow
  console.log(`${(!color ? "\x1b[0m" : colors[getColor(color.replace(/ /g, ''))])}${ message }\x1b[0m`);
}
// colorLog('I Am Using Yellow');

export default colorLog;
