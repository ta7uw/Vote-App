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
                    $('#'+ choice_data).remove();
                    choice.append('<li id="' + choice_data + '">' + data[choice_data]["choice_text"]+':' + data[choice_data]["votes"]+'</li>');
                }
            }
        });
    };
    var interval = 5000;
    setInterval(ajax_call, interval);
});