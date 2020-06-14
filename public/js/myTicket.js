function search(){
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = searchComplete;
        req.send();
    }
}

function searchComplete() {
    if (req.readyState == 4 && req.status == 200) {
        //alert(req.responseText);
        var home = document.getElementById("home");
        var num= home.children(".card").length;
        while(num>1){
            home.firstChild.remove();
            num=num-1;
        }
        var json =  JSON.parse(req.responseText);//转换为json对象
        for(i=0; i<json.length; i++){
            // 创建节点
            var card = document.createElement("div").setAttribute("class","card");
            var cardHeader = document.createElement('div').setAttribute("class","card-header");
            var cardBody = document.createElement('div').setAttribute("class","card-body");
            var playname = document.createElement('p');
            var date = document.createElement('p');
            var opening = document.createElement('p');
            var ending = document.createElement('p');
            var studioname = document.createElement('p');
            var seat = document.createElement('p');
            var price = document.createElement('p');
            var refund = document.createElement('div').setAttribute("class","refund");
            // 添加节点
            home.appendChild(card);
            card.appendChild(cardBody);
            card.appendChild(cardBody);
            cardBody.appendChild(playname);
            cardBody.appendChild(date);
            cardBody.appendChild(opening);
            cardBody.appendChild(ending);
            cardBody.appendChild(studioname);
            cardBody.appendChild(seat);
            cardBody.appendChild(price);
            cardBody.appendChild(refund);
            //渲染
            cardHeader.innerHTML = "订单编号：" + json[i].id;
            playname.innerHTML = "影片名称" + json[i].playname;
            date.innerHTML = "放映日期：" + json[i].date;
            opening.innerHTML = "开场时间：" + json[i].opening;
            ending.innerHTML = "散场时间：" + json[i].ending;
            studioname.innerHTML = "影厅名称：" + json[i].studioname;
            seat.innerHTML = "座位：" + json[i].seat;
            price.innerHTML = "价格：" + json[i].price + "元";
            var tmp = json[i].id;
            refund.innerHTML = '<button type="button" class="btn btn-danger" onclick="refund('+tmp+')">退票</button>';
        }
    }
}

function refund(){
    if(confirm("确认退票？")) {
        var url = "";
        req = new XMLHttpRequest();
        if (req) {
            req.open("post", url, true);
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.onreadystatechange = refundComplete;
            req.send("id="+id);
        }
    }
}

function refundComplete() {
    if (req.readyState == 4 && req.status == 200) {
        if(req.responseText==1)
            search();
        else
            alert("退票失败，请重试");
    }
}

function init(){
    search();
}