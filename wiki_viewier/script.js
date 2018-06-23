$("#input").keypress(function() {
  $("#rand").css({"display": "none"});
  var searchVal = $(this).val();
  var randText = "[ result For  " + searchVal + "  ] ";
  $("#resultFeedback").html(randText);
  getData(searchVal);
 
});
  
  
function getData(val){
 
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php",
    data: {
	    action: 'query',
        format: 'json',
        inprop: "url",
        formatversion: 2,
        generator: 'search',
        gsrsearch: val,
        gsrwhat: "text",
        prop: 'extracts|info',
        exsentences: 3,
        exintro: "",
        explaintext: "",        
        exlimit: 10
    },
    dataType: "jsonp",
    success: function(data){
      $("#result").html("");
        data.query.pages.forEach(function(page){
        var html = "<div class='well result-page'><a href=" + page.fullurl + "><h3>" + page.title + "title </h3></a><p>" + page.extract + "</p></div>";
        $("#result").append(html);    
      });    
    }
  });
  
}