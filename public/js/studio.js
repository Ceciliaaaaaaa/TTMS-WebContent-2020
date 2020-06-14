function search(){
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = searchComplete;
        req.send("name="+document.getElementById("studioname").value);
    }
}

function searchComplete() {
    if (req.readyState == 4 && req.status == 200) {
        //alert(req.responseText);
        var theTable = document.getElementById("table");//table的id
        var num=theTable.rows.length;
        while(num>1){
            theTable.deleteRow(num-1);
            num=theTable.rows.length;
        }
        var json =  JSON.parse(req.responseText);//转换为json对象
        for(i=0; i<json.length; i++){
            var rowCount = theTable.rows.length; //获得当前表格的行数
            var row = theTable.insertRow(rowCount);//在tale里动态的增加tr
            row.insertCell(0).innerHTML = json[i].id;
            row.insertCell(1).innerHTML = json[i].name;
            row.insertCell(2).innerHTML = json[i].rowCount;
            row.insertCell(3).innerHTML = json[i].colCount;
            row.insertCell(4).innerHTML = json[i].introduction;
            var tmp = json[i].id + ",\'" + json[i].name + "\'," + json[i].rowCount + "," + json[i].colCount + ",\'" + json[i].introduction +"\'";
            row.insertCell(5).innerHTML = '<button type="button" class="btn btn-outline-primary update" onclick="modify('+ tmp +')">修改</button><button type="button" class="btn btn-outline-danger delete" onclick="del('+json[i].id+')">删除</button>';
        }
    }
}

function modify(a,b,c,d,e){
    window.location="studioDetail.html?type=modify&id="+a+"&name="+encodeURIComponent(b)+"&rowCount="+c+"&colCount="+d+"&introduction="+encodeURIComponent(e);
}

function del(id){
    if(confirm("确定删除？")) {

        var url = "";
        req = new XMLHttpRequest();
        if (req) {
            //采用POST方式，异步传输
            req.open("post", url, true);
            //POST方式，必须加入如下头信息设定
            req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            req.onreadystatechange = delComplete;
            req.send("id="+id);
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