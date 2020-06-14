function search(){
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = searchComplete;
        req.send("name="+document.getElementById("playname").value);
    }
}

function searchComplete() {
    if (req.readyState == 4 && req.status == 200) {
        //alert(req.responseText);
        var theCardDeck = document.getElementById("cardDeck");
        var num= theCardDeck.children(".card").length;
        while(num>1){
            theTable.firstChild.remove();
            num=num-1;
        }
        var json =  JSON.parse(req.responseText);//转换为json对象
        for(i=0; i<json.length; i++){
            // 创建节点
            var card = document.createElement("div").setAttribute("class","card");
            var img = document.createElement('img').setAttribute("class","card-img-top");
            var cardbody = document.createElement('div').setAttribute("class","card");
            var cardfooter = document.createElement('div').setAttribute("class","card-footer");
            // 添加节点
            theCardDeck.appendChild(card);
            card.appendChild(img);
            card.appendChild(cardbody);
            card.appendChild(cardfooter);
            //创建节点
            var name = document.createElement('h5').setAttribute("class","card-title,myCardTitle");
            var type = document.createElement('p').setAttribute("class","card-text,myCardText");
            var area = document.createElement('p').setAttribute("class","card-text,myCardText");
            var duration = document.createElement('p').setAttribute("class","card-text,myCardText");
            var date = document.createElement('p').setAttribute("class","card-text,myCardText");
            //添加节点
            cardbody.appendChild(name);
            cardbody.appendChild(type);
            cardbody.appendChild(area);
            cardbody.appendChild(duration);
            cardbody.appendChild(date);
            //渲染
            img.setAttribute("src",json[i].src);
            name.innerHTML = json[i].name;
            type.innerHTML = "类型：" + json[i].type;
            area.innerHTML = "区域：" + json[i].area;
            duration.innerHTML = "时长" + json[i].duration + "分钟";
            date.innerHTML = "上映时间" + json[i].date;

            var tmp = json[i].src + ",\'" + json[i].name + "\'," + json[i].type + "," + json[i].area + ",\'" + json[i].duration +"\," + json[i].date +"\'";
            cardfooter.innerHTML = '<button type="button" class="btn btn-outline-primary update" onclick="modify('+ tmp +')">修改</button><button type="button" class="btn btn-outline-danger delete" onclick="del('+json[i].name+')">删除</button>';
        }
    }
}

function modify(a,b,c,d,e,f){
    window.location="playDetail.html?type=modify&src="+encodeURIComponent(a)+"&name="+encodeURIComponent(b)+"&type="+encodeURIComponent(c)+"&area="+encodeURIComponent(d)+"&duration="+e+"&date="+encodeURIComponent(e);
}

function del(name){
    if(confirm("确定删除？")) {

        var url = "";
        req = new XMLHttpRequest();
        if (req) {
            //采用POST方式，异步传输
            req.open("post", url, true);
            //POST方式，必须加入如下头信息设定
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.onreadystatechange = delComplete;
            req.send("name="+name);
        }
    }

}

function delComplete() {
    if (req.readyState == 4 && req.status == 200) {
        if(req.responseText==1)
            search();
        else
            alert("数据删除失败，请重试");
    }
}

function init(){
    search();
}