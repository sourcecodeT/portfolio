var currentVal = "";
var historyStr = "";

$("button").click(function() {
  var val = $(this).val();
  
  switch(val) {
    case "0": case "1": case "2": case "3":
    case "4": case "5": case "6": case "7":
    case "8": case "9": case ".":
      historyStr += val;
      currentVal += val;
      $("#current").text(currentVal);
      $("#history").text(historyStr);
      break;
    case "ac":
    case "ce":
      currentVal = "";
      historyStr = "";
      $("#current, #history").text("0");
      break;
    case "+":
    case "-":
    case "/":
    case "*":
      historyStr += " " + val + " ";
      currentVal = "";
      $("#history").text(historyStr);
      $("#current").text();
      break;
    case "=":
      var result = eval(historyStr);
      $("#current").text(parseFloat(result.toFixed(3)));
      break;
  }
});