console.log("sidebar");

$.get("sidebar", function(data){
    $("#sidebar").replaceWith(data);
});