function goodsList() {
    $.get("./php/getGoodsList.php", function (data){
        let htmlStr = "";
        data.forEach(time => {
            htmlStr += `
    <li>
    <a href="tea.html?goodsId=${time.goodsId}"><img src="${time.goodsImg}" alt="" title="${time.goodsName}"></a>
    <p>${time.goodsName}</p>
    <em>¥${time.goodsPrice}</em>
    <i>${time.goodsDesc}</i>
    </li>
    `;
    $(".mian-content").html(htmlStr);
        });
        
    },"json");
}

$(function () {
    goodsList();
});