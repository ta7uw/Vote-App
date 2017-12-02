$(document).ready(function() {
        /** Djangoから返される結果格納用 */
        var result = null;

        /**
         * タイマーで5000ミリ(5)秒枚にAjax通信を行い、view.py にアクセスする
         */
        setInterval(function()
        {
            //GETメソッドで送るデータを定義します var data = {パラメータ名 : 値};
            var data = {request : "SEND"};

            $.ajax({
                url: "{% url 'vote:ajax_get' question.id %}",
                type: "GET",
                data: data,
                dataType: 'json',
                /**
                 * Ajax通信が成功した場合に呼び出されるメソッド
                 */
                success: function(r, data)
                {
                    //初回アクセス時
                    if(result == null)
                        result = data;

                    //PHPより取得した値が違えばメッセージを<div id="text"></div>に出す
                    if(result != data)
                        alert(r.choice_json)
                        result = data;
                },
                /**
                 * Ajax通信が失敗した場合に呼び出されるメソッド
                 */
                error: function(XMLHttpRequest, textStatus, errorThrown)
                {
                    //通常はここでtextStatusやerrorThrownの値を見て処理を切り分けるか、単純に通信に失敗した際の処理を記述します。

                    //this;
                    //thisは他のコールバック関数同様にAJAX通信時のオプションを示します。

                    //エラーメッセージの表示
                    alert('Error : ' + errorThrown);
                }
            });
        }, 500);
    });