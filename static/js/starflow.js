//星を作る関数。n は星の個数。多いほど星が多く振ります。
function starMaker(n, position, split) {
    var star = document.createElement("div");
    star.className = "star";
    star.textContent = "★";
    for(var i = 0; i < n; i++) {
        starSet(star, position, split);
    }
}

//星のセッティングをする関数。
function starSet(clone, position, split) {
    var min_position = position * (100/split) ;
    var starClone = clone.cloneNode(true);
    var starStyle = starClone.style;


    //星の位置（left）、アニメーションの遅延時間（animation-delay）、サイズ（font-size）をランダムで指定
    starStyle.left =  Math.random() * (100/split - 5) + min_position + "%";
    starStyle.animationDelay = 4 * Math.random() + "s";
    starStyle.fontSize = ~~(50 * Math.random() + 20) + "px";
    document.body.appendChild(starClone);

    //星一つのアニメーションが終わったら新しい星を生成
    // starClone.addEventListener("animationend", function() {
    //     this.parentNode.removeChild(this);
    //     var star = document.createElement("div");
    //     star.className = "star";
    //     star.textContent = "★";
    //     starSet(star);
    // }, false)
}

