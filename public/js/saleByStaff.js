function search(){
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = searchComplete;
        req.send("staffName="+document.getElementById("staffName").value);
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
            row.insertCell(0).innerHTML = json[i].staffid;
            row.insertCell(1).innerHTML = json[i].staffname;
            row.insertCell(2).innerHTML = json[i].num;
            row.insertCell(3).innerHTML = json[i].total;
        }
    }
}

function init(){
    search();
}