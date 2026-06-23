
const prevent = {
  reaction: NAME => () => (arguments.at(-1).preventDefault(), EventLoopCube.Void),
}

const log = {
  reaction: NAME => function () { console.log(NAME, this, arguments); },
}
