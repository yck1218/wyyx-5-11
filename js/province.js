$(function () {
    province();
   
});


let cityData = null;
function province() {
    $.getJSON("./json/myCity.json", function (data) {
        cityData = data;
        sheng();
    });
}
//获取省
function sheng() {
    let sheng = "";
    console.log(cityData);
    for (let key in cityData) {
        sheng += ` <option>${key}</option>`;
    }
    $("#province").html(sheng);
            city($("#province").val());
}

//获取市
function city(a){
    let shi="";
    let arr =cityData[a];
    console.log(arr);
    arr.forEach(item => {
        shi+=`<option>${item["市名"]}</option> `;
    });
 $("#city").html(shi); 
}


//当省的值发生改变调用该函数
$("#province").change(function () {
    city(this.value);
});
