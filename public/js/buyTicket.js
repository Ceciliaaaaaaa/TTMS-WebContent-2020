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
            var card = document.createElement("div").setAttribute("class","card mb-3 ticketCard");
            var div = document.createElement("div").setAttribute("class","row no-gutters");
            var imgDiv = document.createElement("div").setAttribute("class","col-md-3");
            var contentDiv = document.createElement("div").setAttribute("class","col-md-3");
            var img = document.createElement('img').setAttribute("class","card-img");
            var cardBody = document.createElement('div').setAttribute("class","card-body");
            var name = document.createElement('h3').setAttribute("class","card-title");
            var type = document.createElement('p').setAttribute("class","card-text");
            var area = document.createElement('p').setAttribute("class","card-text");
            var duration = document.createElement('p').setAttribute("class","card-text");
            var introduction = document.createElement('p').setAttribute("class","card-text");
            var price = document.createElement('h5').setAttribute("class","price");
            var buy = document.createElement('div').setAttribute("class","buy");
            // 添加节点
            home.appendChild(card);
            card.appendChild(div);
            div.appendChild(imgDiv);
            div.appendChild(contentDiv);
            imgDiv.appendChild(img);
            contentDiv.appendChild(cardBody);
            cardBody.appendChild(name);
            cardBody.appendChild(type);
            cardBody.appendChild(area);
            cardBody.appendChild(duration);
            cardBody.appendChild(introduction);
            cardBody.appendChild(price);
            cardBody.appendChild(buy);
            //渲染
            img.setAttribute("src",json[i].src);
            name.innerHTML = json[i].name;
            type.innerHTML = "类型：" + json[i].type;
            area.innerHTML = "区域：" + json[i].area;
            duration.innerHTML = "时长：" + json[i].duration + "分钟";
            introduction.innerHTML = "简介：" + json[i].introduction;
            price.innerHTML = "票价：" + json[i].price + "元";
            var tmp = json[i].name;
            buy.innerHTML = '<button type="button" class="btn btn-success btn-lg" onclick="schedule('+tmp+')">购票</button>';
        }
    }
}

function schedule(a){
    window.location="movieSchedule.html?type=schedule&name="+encodeURIComponent(a);
}

function init(){
    search();
}