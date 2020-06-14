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
    document.getElementById("type").value = type;
    if(type=="modify"){
        var url = UrlParm.parm("url");
        var name = UrlParm.parm("name");
        var type = UrlParm.parm("type");
        var area = UrlParm.parm("area");
        var duration = UrlParm.parm("duration");
        var date = UrlParm.parm("date");
        document.getElementById("poster").value = url;
        document.getElementById("name").value = name;
        document.getElementById("playtype").value = type;
        document.getElementById("area").value = area;
        document.getElementById("duration").value = duration;
        document.getElementById("date").value = date;
    }
}

function check() {
    var form = document.getElementById("myform");
    if(form.name.value=="" || form.playtype.value=="" || form.area.value=="" || form.duration.value==""|| form.date.value==""){
        alert("请填写完整信息");
        return;
    }
    if(isNaN(form.duration.value)){
        alert("影片时长不是数字");
        return;
    }
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        //采用POST方式，异步传输
        req.open("post", url, true);
        //POST方式，必须加入如下头信息设定
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = checkComplete;
        var data = "type=" + form.type.value + "&url="
            + encodeURIComponent(form.poster.value)+ "&name="
            + encodeURIComponent(form.name.value) + "&playtype="
            + encodeURIComponent(form.playtype.value) + "&area=" + encodeURIComponent(form.area.value)
            + "&duration=" + form.duration.value + "&date=" + encodeURIComponent(form.date.value);
        req.send(data);
    }
}

function checkComplete() {
    if (req.readyState == 4 && req.status == 200) {
        // alert(req.responseText);
        window.location="play.html";
    }
}