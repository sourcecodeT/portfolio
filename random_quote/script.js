
// get JSON quote from API
$('#button').on('click', function() {
  $.ajax({
    type: 'GET',
    dataType: 'json', 
    url: 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=?',
    success: function(data){
      $("#quoteText").text(data.quoteText);
      $('#author').text("-" + data.quoteAuthor + "-");
    }
  });
});

  