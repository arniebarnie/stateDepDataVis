var curr = 0;
var done = false;

function initMap(year) {
    curr = year;
    var url = "https://maps.googleapis.com/maps/api/geocode/json?address=";
    var adr = "ottawa";
    key = "&key=AIzaSyBLJhQHcguQ-zG98Ai_J4HmSBIgzKse2vI";
    
    
    var points = [];
    
    fetch('data.json').then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }).then(function(data){
        //console.log(data);
        
        for (var i = 0; i <= 175; i++) {
            //console.log(data[i].country);
            //console.log(data[i].loc);
            if(data[i].year <= year) {
            points.push({loc: data[i].loc, country: data[i].country});
            }
        }
    }).then(function() {
        for (var i = 0; i < points.length; i++) {
            adr = points[i].loc + ",+" + points[i].country;
            //console.log(typeof(points[i]));
            fetch(url+adr+key).then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Request failed!');
            }, function(networkError) {console.log(networkError.message)}
            ).then(function(res) {
                var loc = res.results[0].geometry.location;
                //console.log(loc);
                var marker = new google.maps.Marker({
                    position: loc, 
                    map: map,
                    animation: google.maps.Animation.DROP
                });
            });
        }
    }
    );
    

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 1, 
        center: {lat: 0, lng: 0},
        styles:[
        {elementType: 'geometry', stylers: [{color: '#787d99'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#0e1954'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
}

function clearMap() {
    var map = new google.maps.Map(document.getElementById("map"), {zoom: 2, center: {lat: 0, lng: 0}});
}

$(document).ready(function() {
        $("#check").hide();
        $("#body2").hide();
        $("#info").hide();
        $(".options").hide();
        //initMap(curr);
        //document.getElementById("response").value=curr;    
    
        $("#responseButton").click(function() {
            $("#check").hide();
            $(".options").hide();
            var numResponse = parseInt($("#response").val());
            if (numResponse < 1780 || numResponse > 2018 || !/^[0-9]+$/.test($("#response").val())) {
                $("#check").show();
                $(".options").hide();
                $("#info").hide();
                //done = false;
                
            }
            else {
                $(".options").show();
                $("#info").show();
                createOptions(numResponse); 
            }
        });
        $("#response").keypress(function(e) {
                if((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)){
                    $("#responseButton").click(); 
                }
        }); 
        $("#change").click(function() {
            if(curr + 10 > 2018){
                alert("The new year is greater than 2018. We cannot predict the future.");
                return
            }
            else if (done == false) {
                alert("There was no previous year given.");
            }
            done = true;
            initMap(curr+10);
            console.log(curr);
            document.getElementById("response").value=curr;
        });
    $("button").mouseover(function(){
    $(this).css("background-color", "#8C79E3");
    });
$("button").mouseout(function(){
    $(this).css("background-color", "#735CDD");
    });
});
function myFunction() {
    var selectedOption = document.getElementById("selector");
    
    fetch('des.json').then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }).then(function(data){
        var option = selectedOption.options[selectedOption.selectedIndex].text.toLowerCase().trim();
        //console.log(data);
        
        $("#info").slideUp('fast', function() {

        $("#info").slideDown(); 
           $("#info").text(data[option]); 
        });
    })
};

function createOptions(num) {
    initMap(num);
    $("#info").text(""); 
    $("#selector").empty();
    fetch('data.json').then(function(response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Request failed!');
    }).then(function(data){
        //console.log(data);
        
        for (var i = 0; i <= 175; i++) {
            //console.log(data[i].country);
            //console.log(data[i].loc);
            if(data[i].year <= num) {
                $("#selector").append("<option>" + data[i].country + "</option>");
            }
        }
    });
}