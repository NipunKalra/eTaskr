var ForcastAPI = ForcastAPI ||{};
ForcastAPI.Show = ForcastAPI.Show ||{};

ForcastAPI.Show.getLocation = {
    init : function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(ForcastAPI.Show.getLocation.showPosition);
        }
    },
    showPosition : function(position){
        
        var Lat = position.coords.latitude;
        var Long = position.coords.longitude; 
        $.ajax({
            url: "https://api.forecast.io/forecast/4310f5bcd543b5c33a92ada7053efd6e/"+Lat+","+Long+"/?units=si",
            type: 'GET',
            dataType : 'jsonp',
            success : function(response){
                var obj = response;
                
                console.log(obj);
                $(".overview_container").addClass(obj.currently.icon);
                var skycons = new Skycons({"color": "black"});
                skycons.add("icon1", obj.currently.icon);
                skycons.play();

                $("#timezone").text(obj.timezone);
                var temp = obj.currently.temperature;
               
                $(".temp").html(temp+'&deg;');
                $(".desc").html(obj.currently.summary+" - Feels like "+ obj.currently.temperature+'&deg;');
            }
        });
    }
};

ForcastAPI.Show.init = function(){
    ForcastAPI.Show.getLocation.init();
};

$(document).ready(function () {
    ForcastAPI.Show.init();
});