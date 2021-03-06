var regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g;

var dictionary = ["Number", "Whitespace", "LineTerminator", "*", "/", "+", "-"];

function tokenize_v1(source) {
  var result = null;
  while (true) {
    result = regexp.exec(source);

    if (!result) break;

    for (var i = 1; i <= dictionary.length; i++) {
      if (result[i]) console.log(dictionary[i - 1]);
    }
    console.log(result);
  }
}
function* tokenize(source) {
  var result = null;
  var lastIndex = 0;
  while (true) {
    lastIndex = regexp.lastIndex;
    result = regexp.exec(source);
    if (!result) break;

    if (regexp.lastIndex - lastIndex > result[0].length) break;

    let token = {
      type: null,
      value: null,
    };

    for (var i = 1; i <= dictionary.length; i++) {
      if (result[i]) token.type = dictionary[i - 1];
    }
    token.value = result[0];
    yield token;
  }
  yield {
    type: "EOF",
  };
}

for (let token of tokenize("1024 + 10 * 25")) {
  console.log(token);
}
//tokenize("1024 + 10 * 25");
