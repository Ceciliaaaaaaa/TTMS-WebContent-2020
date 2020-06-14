UrlParm = function() { // url参数
    var data, index;
    (function init() {
        data = [];
        index = {};
        var u = window.location.search.substr(1);
        if (u != '') {
            var parms = decodeURIComponent(u).split('&');
            for (var i = 0, len = parms.length; i < len; i++) {
                if (parms[i] != '') {
                    var p = parms[i].split("=");
                    if (p.length == 1 || (p.length == 2 && p[1] == '')) {// p | p=
                        data.push([ '' ]);
                        index[p[0]] = data.length - 1;
                    } else if (typeof (p[0]) == 'undefined' || p[0] == '') { // =c | =
                        data[0] = [ p[1] ];
                    } else if (typeof (index[p[0]]) == 'undefined') { // c=aaa
                        data.push([ p[1] ]);
                        index[p[0]] = data.length - 1;
                    } else {// c=aaa
                        data[index[p[0]]].push(p[1]);
                    }
                }
            }
        }
    })();
    return {
        // 获得参数,类似request.getParameter()
        parm : function(o) { // o: 参数名或者参数次序
            try {
                return (typeof (o) == 'number' ? data[o][0]
                    : data[index[o]][0]);
            } catch (e) {
            }
        },
        //获得参数组, 类似request.getParameterValues()
        parmValues : function(o) { //  o: 参数名或者参数次序
            try {
                return (typeof (o) == 'number' ? data[o] : data[index[o]]);
            } catch (e) {
            }
        },
        //是否含有parmName参数
        hasParm : function(parmName) {
            return typeof (parmName) == 'string' ? typeof (index[parmName]) != 'undefined'
                : false;
        },
        // 获得参数Map ,类似request.getParameterMap()
        parmMap : function() {
            var map = {};
            try {
                for ( var p in index) {
                    map[p] = data[index[p]];
                }
            } catch (e) {
            }
            return map;
        }
    }
}();

function init() {
    var type = UrlParm.parm("type");
    //alert(type);
    if(type=="schedule"){
        search();
    }
}

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
            row.insertCell(0).innerHTML = json[i].studioname;
            row.insertCell(1).innerHTML = json[i].playname;
            row.insertCell(2).innerHTML = json[i].date;
            row.insertCell(3).innerHTML = json[i].opening;
            row.insertCell(4).innerHTML = json[i].ending;
            row.insertCell(5).innerHTML = json[i].price;
            var tmp = json[i].studioname + ",\'" + json[i].playname + "\'," + json[i].date + "," + json[i].opening + ",\'" + json[i].price +"\'";
            row.insertCell(6).innerHTML = '<button type="button" class="btn btn-outline-success" onclick="seat('+ tmp +')">购票</button>';
        }
    }
}

function seat(a,b,c,d,e){
    window.location="chooseSeat.html?type=seat&studioname="+encodeURIComponent(a)+"&playname="+encodeURIComponent(b)+"&date="+encodeURIComponent(c)+"&opening="+encodeURIComponent(d)+"&price="+e;
}