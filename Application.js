$(document).on("click", ".show-page-loading-msg", function () {
    var $this = $(this),
        theme = $this.jqmData("theme") || $.mobile.loader.prototype.options.theme,
        msgText = $this.jqmData("msgtext") || $.mobile.loader.prototype.options.text,
        textVisible = $this.jqmData("textvisible") || $.mobile.loader.prototype.options.textVisible,
        textonly = !! $this.jqmData("textonly");
    html = $this.jqmData("html") || "";
    $.mobile.loading('show', {
        text: msgText,
        textVisible: textVisible,
        theme: theme,
        textonly: textonly,
        html: html
    });
})
    .on("click", ".hide-page-loading-msg", function () {
    $.mobile.loading('hide');
});
$("#BookSearchPage").on("pageshow", function (response) {

    var googleAPI = "https://www.googleapis.com/books/v1/volumes?q=harry+potter";
    $.getJSON(googleAPI, function (response) {
        // In console, you can see the response objects
        console.log("JSON Data: " + response.items);

        // Loop through all the items one-by-one
        for (var i = 0; i < response.items.length; i++) {

            // set the item from the response object
            var item = response.items[i];

            // Set the book title in the div
            document.getElementById("search").innerHTML += "<br>" + item.volumeInfo.title;
        }
    });
});

var directionDisplay;
var directionsService = new google.maps.DirectionsService();
var map2;
//Create a DirectionsService object which is required to communicate with the Google Maps API Direction Service

$("#DirectionPage").on("pageshow", function () {


        function initialize() {
             directionsDisplay = new google.maps.DirectionsRenderer(); 
           var center = new google.maps.LatLng(0, 0); //Map is centered at 0,0
            var myOptions = {
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: center
            };
            map2 = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
            directionsDisplay.setMap(map2);
            var start = document.getElementById("starT").value; 
            var end = document.getElementById("DesT").value; 
            var request = {
                origin: start,
                destination: end,
                travelMode: google.maps.DirectionsTravelMode.DRIVING 
            };
            directionsService.route(request, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) 
                {
                    directionsDisplay.setDirections(response); 
                }
            });
       
    }
    var button = document.getElementById('getdirection');

var onClick = function() {
    initialize();
};
button.addEventListener('click', onClick, false);
});