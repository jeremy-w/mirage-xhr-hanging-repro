/* jshint node:true */
module.exports = {

  // breakpoints, order does not matter, they will be sorted by `begin`
  // `name` is used for layout names and booleans on the device/layout service
  // `prefix` is used for column classes, column attributes, and container breakpoint classes
  // `begin` is the pixel value at which this breakpoint becomes active
  breakpoints: [
    { name: 'mobile', prefix: 'xs', begin: 0 },
    { name: 'tablet', prefix: 'md', begin: 768 }
  ],

  // the number of columns for the grid
  columns: 12,

  // optional, used for column classes: '<colPrefix>-<breakpointPrefix>-<columnNumber>'
  columnPrefix: 'col',

  // if false, @media css is not included
  includeMediaCSS: "false",

  // if false, default element styles are not included
  includeElementCSS: "false",

  // if true, will convert layout attributes on non-layout elements to classes as well
  transformAllElementLayoutAttributes: false,

  // grid and layout element gutters
  gutterPadding: '30px',

  // if false, no styles are included (trumps 'includeMediaCSS' and 'includeElementCSS')
  includeCSS: "false"
};
