import { StyleSheet, Dimensions } from 'react-native';

import colors from 'src/colors';

const screen = Dimensions.get('screen');

const ROW_HEIGHT = (screen.height / 23); // 40;
// console.log('(screen.height / 23): ', (screen.height / 23));

const ROW_LENGTH = screen.width;

module.exports = StyleSheet.create({
  /* Transactions Table */
  table: {
    
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  emptyTableView: {},
  emptyListMessageContainer: {
    padding: 12,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  emptyTableTitleStyle: {
    fontFamily: 'SFProDisplay-Regular',
    fontWeight: '600',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  emptyTableMessageStyle: {
    // width: 225,
    // height: 84,
    opacity: 0.65,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 23,
    textAlign: 'center',
    color: colors.offWhite,

    padding: 4,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  /* Sticky Table Date Headers */
  dateHeader: {
    // flex: 1,
    // height: screen.height / 28, // 31,
    height: ROW_HEIGHT,
    width: ROW_LENGTH,
    justifyContent: 'center',
    alignItems: 'center',

    // width: '100%', // 375,
    // height: screen.height / 20, // 31,
    // opacity: 0.9, // 0.5
    backgroundColor: colors.dark,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dashed',
  },
  dateLabelText: {
    // width: '100%', // 131,
    // padding: 5,
    // height: 17,
    // height: ROW_HEIGHT,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    // fontWeight: 'normal',
    // fontStyle: 'normal',
    // letterSpacing: 0.13,
    // textAlign: 'center',
    color: colors.offWhite,
  },
  /* Sticky Table Cell Margins */
  stickyTableCell: {
    justifyContent: 'center',
    
    // paddingLeft: 10,

    // borderWidth: 1,
    // borderColor: 'red',
    // borderStyle: 'solid',
  },
  stickyTableRow: {
    height: ROW_HEIGHT, // 31,
    flexDirection: 'row',
    // paddingLeft: 10,
    width: ROW_LENGTH,

    paddingHorizontal: 4,
    // height: 30,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  stickyTableRowIcon: {
    height: ROW_HEIGHT, // '100%',
    // width: '5%',
    // alignItems: 'center',

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  stickyTableRowCategory: {
    // flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  stickyTableRowNote: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // alignItems: 'flex-start',
    // paddingRight: 10,
    paddingHorizontal: 4,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  stickyTableRowAmount: {
    flex: 1,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginLeft: 10,
    paddingHorizontal: 4,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  /* Individual Cell Component Styles */
  categoryLabelText: {
    // height: ROW_HEIGHT,
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    color: colors.white,
    // padding: 4,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  itemSymbolStyle: {
    // fontFamily: 'SFProDisplay-Semibold',
    fontSize: 8,
    paddingHorizontal: 10,
    flex: 1,
    justifyContent: 'center',
    // height: '100%',
    // width: '100%',
    // textAlign: 'center',
    // textAlignVertical: 'center',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },
  itemNoteText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    color: colors.offWhite,
    // paddingHorizontal: 8,
  },
  itemAmountRow: {
    // alignItems: 'center',
    // justifyContent: 'center',
    flexDirection: 'row',
    // paddingRight: 4,
  },
  itemAmountText: {
    fontFamily: 'SFProDisplay-Regular',
    fontSize: 17,
    color: colors.white,

    // paddingRight: 10,
    // padding: 2,

    paddingHorizontal: 2,

    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'solid',
  },

  /* Swipeable Rows */
  rowBackLeft: {
    // flex: 1,
    backgroundColor: colors.azure,
  },
  // rowBackLeftEmpty: {
  //   // flex: 1,
  //   backgroundColor: 'pink',
  // },
  rowBackRight: {
    // flex: 1,
    backgroundColor: colors.pinkRed,
  },
  rowBack: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'white',
    // borderStyle: 'dotted',
  },
  rowFront: {
    justifyContent: 'center',
    height: ROW_HEIGHT,
    width: ROW_LENGTH,
    backgroundColor: colors.darkTwo,
    // backgroundColor: 'transparent',

    // borderWidth: 1,
    // borderColor: 'orange',
    // borderStyle: 'solid',
  },
});
