function getRumRgba(){
        var clr = 'rgba(';
        for(var i=0; i < 3; i++){
            clr = clr + Math.floor( Math.random()*255) + ',';
        }
        clr = clr + Math.floor( Math.random()*10)/10 + ')';
        return clr;
    }
$(function(){
    var size = document.getElementsByClassName("choice-box").length;
    for (var count=0; count < size; count++){
        $("#box" + count).css({'background-color':getRumRgba()});
    }
});

function update() {
        $.ajax({
            type: 'GET',
            url: "api_get",
            dataType: 'json',
            success: function(response) {
                var data = response["choice_list"];
                var before_array = [];
                var after_array = [];
                for(var choice_data in data){
                    // choice data is the index number of choice
                    var choice_text = data[choice_data]["choice_text"];
                    var votes = data[choice_data]["votes"];
                    var choice_id = $('#votes' + choice_data);
                    before_array.push(parseInt(choice_id.text()));
                    after_array.push(votes);
                    $("#box"+ choice_data).html('<h1 id="choice'+ choice_data+'">'+ choice_text + '</h1>\<h2 id="votes'+ choice_data+'">'+  votes + '<h2>');

                }
                var $split = document.getElementsByClassName("choice-box").length;

            }
        });

}

var interval;
var updating;

function btnstratClick(){
    var timer = $('#timer').text();
    var update_interval = 500;
    updating = setInterval(update, update_interval);


    interval = setInterval(function() {
        timer--;
        $('#timer').text(timer);
        if (timer === 0) {
            clearInterval(interval);
            clearInterval(updating);
            $("#result").html('<input id="result-button" type="button" value="Result" onclick="resultClick()" />\<p></p>');

        }

    }, 1000);

}
function btnstopClick(){
        clearInterval(interval);
        clearInterval(updating);
}

function resultClick() {
        $.ajax({
            type: 'GET',
            url: "api_get",
            dataType: 'json',
            success: function(response) {
                var data = response["choice_list"];
                var max = 0;
                var no1 = "";
                var index = 0;
                for (var choice_data in data) {
                    // choice data is the index number of choice
                    var choice_text = data[choice_data]["choice_text"];
                    var votes = data[choice_data]["votes"];
                    if (max <= votes) {
                        max = votes;
                        index = choice_data;
                        no1 = choice_text;
                    }
                }
                console.log(no1 +" is NO.1"+ ":"+ max +"votes");

            }

        });

}

