//删除
$(".update").click(function(){
    let oldID = this.parentNode.parentNode.firstChild;
    let oldTheaterName = oldID.nextSibling;
    let oldMovieName = oldTheaterName.nextSibling;
    let oldDate = oldMovieName.nextSibling;
    let oldTicket = oldDate.nextSibling;

    $(location).attr('href', '');

    let planID = $("#planID").val();
    let theaterName = $("#theaterName").val();
    let movieName = $("#movieName").val();
    let releaseDate = $("#releaseDate").val();
    let ticket = $("#ticket").val();

    planID.setAttribute("value",oldID.textContent);
    theaterName.setAttribute("value",oldTheaterName.textContent);
    movieName.setAttribute("value",oldMovieName.textContent);
    releaseDate.setAttribute("value",oldDate.textContent);
    ticket.setAttribute("value",oldTicket.textContent);
});