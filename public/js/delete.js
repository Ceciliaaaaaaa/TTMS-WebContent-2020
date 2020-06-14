//删除
$(".delete").click(function(){
    let deleteID = this.parentNode.parentNode.firstChild.textContent;
    $.ajax({
        url: "",
        data: {
            "ID": deleteID
        },
        type: "GET",
        dataType: "JSON",
        success: function(obj){
            let tr = obj.parentNode.parentNode;
            tr.parentNode.removeChild(tr);
        },
        error: function () {
            alert("删除失败！");
        }
    });
});