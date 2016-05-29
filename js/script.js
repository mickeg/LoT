/* global $ */

var vG_data = "";
var vG_url = "http://localhost:8081/testdata";


$( document ).ready(function() {
    
    $("#test").click(function(){
       $.support.cors = true;
       $.ajax({
        url: vG_url,
        dataType: "json",
        cache: false,
        timeout: 5000,
        success: function(data) {
            //console.log("success"+data);
            //showData(data)
            $("#status").append("Data loaded.");
            vg_data = data;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert(url);
            alert('error ' + textStatus + " " + errorThrown);
        }
        });
    });

    function showData(d){
        if(d == ""){
            $("#output").html("Data is not loaded.");
        }
        $.each(d, function(index,item) {   

            $("#output").append(

                item["SvensktNamn"] + " (<I>"+
                item["Vetenskapligt namn"]+"</I>)" +" - " + 
                //item["Svensk förekomst"] +" - " + 
                item["Organismgrupp"] + " - " + 

                "</br>");
        });
    }

    function hello(d){
        console.log("test "+d);
    }

    showData(vG_data)
});