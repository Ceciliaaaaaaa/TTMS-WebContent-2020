$("#addTheater").click(function(){
    let planID = $("#planID").val();
    let theaterName = $("#theaterName").val();
    let movieName = $("#movieName").val();
    let releaseDate = $("#releaseDate").val();
    let ticket = $("#ticket").val();

    $.ajax({
        url:"",
        data:{
            "planID": planID,
            "theaterName": theaterName,
            "movieName": movieName,
            "releaseDate": releaseDate,
            "ticket": ticket
        },
        type:"POST",
        dataType:"JSON",
        success: function(data) {
            //重定向
            $(location).attr('href', '');

            // 将JSON字符串转化为JS对象
            let obj = $.parseJSON(data);

            let trStr = '';
            trStr += '<tr>';
            trStr += '<th scope="row">' + obj.planID + '</th>';
            trStr += '<td>' + obj.theaterName + '</td>';
            trStr += '<td>' + obj.movieName + '</td>';
            trStr += '<td>' + obj.releaseDate + '</td>';
            trStr += '<td>' + obj.ticket + '</td>';
            trStr += '<td>';
            trStr += '<button type="button" class="btn btn-outline-primary update">修改</button>';
            trStr += '<button type="button" class="btn btn-outline-danger delete">删除</button>';
            trStr += '</td>';
            trStr += '</tr>';

            $("#tbody").append(trStr);
        },
        error: function () {
            alert("添加失败！");
        }
    });
});