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

//设置票价
var price = Number( UrlParm.parm("price"));
// var price = 35;
$(document).ready(function() {
    //初始化
    var type = UrlParm.parm("type");
    if(type=="seat"){
        var studioname = UrlParm.parm("studioname");
        var playname = UrlParm.parm("playname");
        var date = UrlParm.parm("date");
        var opening = UrlParm.parm("opening");
        var Price = UrlParm.parm("price");
        document.getElementById("playname").innerHTML = playname;
        document.getElementById("studioname").innerHTML = studioname;
        document.getElementById("date").innerHTML = date + " " + opening;
        document.getElementById("price").innerHTML = Price;
    }
    //选座
    var $cart = $('#seats_chose'), //座位区
        $tickects_num = $('#tickects_num'), //票数
        $total_price = $('#total_price'); //票价总额
    var sc = $('#seat_area').seatCharts({
        map: [//座位结构图 a 代表座位; 下划线 "_" 代表过道
            'cccccccccc',
            'cccccccccc',
            '__________',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cccccccccc',
            'cc__cc__cc'
        ],
        naming: {//设置行列等信息
            top: false, //不显示顶部横坐标（行）
            getLabel: function(character, row, column) { //返回座位信息
                return column;
            }
        },
        legend: {//定义图例
            node: $('#legend'),
            items: [
                ['c', 'available', '可选座'],
                ['c', 'unavailable', '已售出']
            ]
        },
        click: function() {
            if (this.status() == 'available') { //若为可选座状态，添加座位
                $('<li>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
                    .attr('id', 'cart-item-' + this.settings.id)
                    .data('seatId', this.settings.id)
                    .appendTo($cart);
                $tickects_num.text(sc.find('selected').length + 1); //统计选票数量
                $total_price.text(getTotalPrice(sc) + price);//计算票价总金额
                return 'selected';
            } else if (this.status() == 'selected') { //若为选中状态
                $tickects_num.text(sc.find('selected').length - 1);//更新票数量
                $total_price.text(getTotalPrice(sc) - price);//更新票价总金额
                $('#cart-item-' + this.settings.id).remove();//删除已预订座位
                return 'available';
            } else if (this.status() == 'unavailable') { //若为已售出状态
                return 'unavailable';
            } else {
                return this.style();
            }

        }

    });
    //设置已售出的座位
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        req.open("post", url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = setUnavailable;
        var data = "playname=" + encodeURIComponent(document.getElementById("playname").innerHTML)
            + "&studioname=" + encodeURIComponent(document.getElementById("studioname").innerHTML)
            + "&date=" + encodeURIComponent(document.getElementById("date").innerHTML);
        req.send(data);
    }
    function setUnavailable(){
        if (req.readyState == 4 && req.status == 200) {
            var json =  JSON.parse(req.responseText);
            var unSeatArr = [];
            for(i=0; i<json.length; i++){
                unSeatArr[i] = json[i].seat;
            }
        }
        sc.get(unSeatArr).status('unavailable');
    }

    // sc.get(['1_3', '1_4', '4_4', '4_5', '4_6', '4_7', '4_8']).status('unavailable');

});
function getTotalPrice(sc) { //计算票价总额
    var total = 0;
    sc.find('selected').each(function() {
        total += price;
    });
    return total;
}
//提交
function check() {
    if(document.getElementById(tickects_num).innerHTML == 0){
        alert("请选择座位");
        return;
    }
    var url = "";
    req = new XMLHttpRequest();
    if (req) {
        req.open("post", url, true);
        req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        req.onreadystatechange = checkComplete;
        var data = "playname=" + encodeURIComponent(document.getElementById("playname").innerHTML)
            + "&studioname=" + encodeURIComponent(document.getElementById("studioname").innerHTML)
            + "&date=" + encodeURIComponent(document.getElementById("date").innerHTML)
            + "&price=" + document.getElementById("price").innerHTML
            + "&seats=" + seats()
            + "&ticketsNum=" + document.getElementById("tickects_num").innerHTML
            + "&totalPrice=" + document.getElementById("total_price").innerHTML;
        req.send(data);
    }
}
function seats() {
    var ul = document.getElementById("seats_chose");
    var li = document.getElementsByTagName("li");
    var str = '';
    for(var i = 0; i < ul.length; i++){
        str = str + li[i].innerHTML;
    }
    return str;
}

function checkComplete() {
    if (req.readyState == 4 && req.status == 200) {
        // alert(req.responseText);
        window.location="success.html";
    }
}