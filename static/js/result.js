const getRumRgba = function(){
        let clr = 'rgba(';
        for(let i=0; i < 3; i++){
            clr = clr + Math.floor( Math.random()*255) + ',';
        }
        clr = clr + Math.floor( Math.random()*10)/10 + ')';
        return clr;
    };

$(function(){
    let size = document.getElementsByClassName("choice-box").length;
    for (let  count=0; count < size; count++){
        $("#box" + count).css({'background-color':getRumRgba()});
    }
});

const update = function() {
        $.ajax({
            type: 'GET',
            url: "api_get",
            dataType: 'json',
            success: function(response) {
                let data = response["choice_list"];
                let before_array = [];
                let after_array = [];
                for(let choice_data in data){
                    // choice data is the index number of choice
                    let choice_text = data[choice_data]["choice_text"];
                    let votes = data[choice_data]["votes"];
                    let choice_id = $('#votes' + choice_data);
                    before_array.push(parseInt(choice_id.text()));
                    after_array.push(votes);
                    $("#box"+ choice_data).html('<h1 id="choice'+ choice_data+'">'+ choice_text + '</h1>\<h2 id="votes'+ choice_data+'">'+  votes + '<h2>');
                }
                let $split = document.getElementsByClassName("choice-box").length;
            }
        });
};

let interval;
let updating;

const btnstratClick = function(){
    let timer = $('#timer').text();
    let update_interval = 500;
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
};
const btnstopClick = function(){
        clearInterval(interval);
        clearInterval(updating);
};
const resultClick = function() {
        $.ajax({
            type: 'GET',
            url: "api_get",
            dataType: 'json',
            success: function(response) {
                let data = response["choice_list"];
                let  max = 0;
                let  no1 = "";
                let  index = 0;
                for (let choice_data in data) {
                    // choice data is the index number of choice
                    let  choice_text = data[choice_data]["choice_text"];
                    let votes = data[choice_data]["votes"];
                    if (max <= votes) {
                        max = votes;
                        index = choice_data;
                        no1 = choice_text;
                    }
                }
            }
        });
};

