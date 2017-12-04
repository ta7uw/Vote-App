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