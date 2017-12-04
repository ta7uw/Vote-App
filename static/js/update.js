$(document).ready(function() {
    var ajax_call = function() {
        var choice = $('#choice');
        $.ajax({
            type: 'GET',
            url: "api_get",
            dataType: 'json',
            success: function(response) {
                var data = response["choice_list"];
                for(var choice_data in data){
                    // choice data is the index number of choice
                    var choice_text = data[choice_data]["choice_text"];
                    var votes = data[choice_data]["votes"];
                    var choice_id = $('#votes' + choice_data);
                    $("#box"+ choice_data).text( choice_text + ':' + votes);
                }
            }
        });
    };
    var interval = 500;
    setInterval(ajax_call, interval);
    starMaker(0);
});