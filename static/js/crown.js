function CrownFalling(position, split) {
    var crown = document.createElement("div");
    crown.className = "king";
    var $content_html = $(".king").html();
    crown.innerHTML = $content_html;
    console.log(crown.innerHTML);

    crwonSet(crown, position, split);
}

function crwonSet(clone, position, split) {
    var min_position = position * (100/split) ;
    var crownClone = clone.cloneNode(true);
    var crownStyle = crownClone.style;

    crownStyle.left =  (25/split) + min_position + "%";
    crownStyle.animationDelay = 4  + "s";
    document.body.appendChild(crownClone);

}