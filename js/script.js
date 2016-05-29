/* global $ */

var vG_data = "";
var vG_url = "http://localhost:8081/testdata";


$( document ).ready(function() {
    
    $("#button").click(function(){
       $.support.cors = true;
       $.ajax({
        url: vG_url,
        dataType: "json",
        cache: false,
        timeout: 5000,
        success: function(data) {
            //console.log("success"+data);
            //showData(data)
            $("#status").html("Data loaded.");
            vG_data = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(url);
            alert('error ' + textStatus + " " + errorThrown);
        }
        });
    });

    function showData(d){
        if(d == ""){
            $("#status").html("Data is not loaded.");
        }
        $.each(d, function(index,item) {   

            $("#output").append(

                item["SvensktNamn"] + " (<I>"+
                item["Vetenskapligt namn"]+"</I>)" +" - " + 
                //item["Svensk förekomst"] +" - " + 
                item["Organismgrupp"] + " - " + 
               "Rödlistekriterium: "+ item["Rödlistekriterium"] +

                "</br>");
        });
    }

    function hello(d){
        console.log("test "+d);
    }
    $("#print").click(function(){
        showData(vG_data)
    });
});