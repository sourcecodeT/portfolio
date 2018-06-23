// intitial streams to display

var streammers = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp",
  "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

// retrieves json data from twitch.tv and builds a stream obj
function getTwitchData(channelName) {
  // default stream obj
  var stream = {
    "name": channelName,
    "status": "",
    "logo": "",
    "link": ""
  };
  
  // assemble the twitch.tv api url
  function buildUrl(type, name){
    return "https://wind-bow.gomix.me/twitch-api/" + type + "/" + name;
  }

  // make ajax call to twitch-api
  $.ajax({
    url: buildUrl("streams", channelName),
    type: "GET",
    dataType: "jsonp",
    success: function(streamData){
      // if the stream is not online
      if(streamData.stream === null){
        $.ajax({
          url: buildUrl("channels", channelName),
          type: "GET",
          dataType: "jsonp",
          success: function(channelData){
            stream.name = channelData.display_name;
            stream.status = "offline!";
            stream.logo = channelData.logo || "https://jpk-image-hosting.s3.amazonaws.com/twitch-app/no-image-available.jpg";
            stream.link = channelData.url;

            // insert this stream to DOM
            insertStream(stream);
          }
        });
      } else {
        stream.name = streamData.stream.channel.display_name;
        stream.status = "<span>Currently streaming: </span>" + streamData.stream.channel.status;
        stream.logo = streamData.stream.channel.logo || "https://jpk-image-hosting.s3.amazonaws.com/twitch-app/no-image-available.jpg";
;
        stream.link = streamData.stream.channel.url;

        // insert this stream to DOM
        insertStream(stream);
      }
    }
  }).fail(function(){
    alert("ERORR!");
  });
  
  // builds html string from stream data and inserts it on page
  function insertStream(stream){
    var status_class = "";
    var html_to_insert = "";

    if (stream.status == "offline!"){
      status_class = "offline";
    } else {
      status_class = "online";
    }
    
    html_to_insert = "<div class='col-md-6 col-lg-4 stream'><a href='#' class='remove-link'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></a><a href=" 
      + stream.link + "><div class='well'><div class='row'><div class='col-xs-12 col-sm-3'><img class='img img-responsive center-block' src='" 
      + stream.logo + "'></div><div class='col-xs-12 col-sm-9'><h2>"
      + stream.name + "<h2><h3>" 
      + stream.status + "</h3></div></div></div></a></div></div>";

    if ( status_class == "online" ) {
      $(html_to_insert).appendTo('#online').fadeIn(800);
    } else {
      $(html_to_insert).appendTo('#offline').fadeIn(800);
    }
    
    // add new event to remove-link
    $(".remove-link").click(function(){
      $(this).closest(".stream").fadeOut(800);
    });
  }
}

// get data form streammer array
streammers.forEach(function(streammer){
  getTwitchData(streammer);
});

// handle event on menu 

$(".menu-on").click(function() {
  $(this).addClass("active");
  $(this).siblings().removeClass("active");
  $("#online").fadeIn(800);
  $("#offline").fadeOut(800);
});

$(".menu-off").click(function() {
  $(this).addClass("active");
  $(this).siblings().removeClass("active");
  $("#online").fadeOut(800);
  $("#offline").fadeIn(800);
});

$(".menu-all").click(function() {
  $(this).addClass("active");
  $(this).siblings().removeClass("active");
  $("#offline, #online").fadeIn(800);
});