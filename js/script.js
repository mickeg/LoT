/* global $ */

var vG_data = {};
var vG_url = "http://localhost:3000/";

$( document ).ready(function() {
    
    $("#print").click(function(){
        get = ajaxLoad(13);
    });
    
    
    //vG_data.SvensktNamn = get.SvensktNamn;
    var callback = function(d){
        console.log("alert"+d);
    }
    
    //console.log(callback)
   
    function ajaxLoad(n){
        var result = ""; 
        console.log(callback)
        
        $.support.cors = true;
        $.ajax({
            url: vG_url+n,
            dataType: "json",
            cache: false,
            timeout: 5000,
            success: function(data) {
                callback(data)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('error ' + textStatus + " " + errorThrown);
            }
        });
        console.log("result: "+result);
        return result;
    }
    


    function showData(d){
    
        if(d == ""){
            $("#status").html("Data is not loaded.");
        }
        
        console.log(vG_data);
        
        /*
        
        createCard(item["SvensktNamn"], item["Organismgrupp"]);
        console.log("created card");

        $("#output").append(
            item["SvensktNamn"] + " (<I>"+
            item["Vetenskapligt namn"]+"</I>)" +" - " + 
            //item["Svensk förekomst"] +" - " + 
            item["Organismgrupp"] + " - " + 
            "Rödlistekriterium: "+ item["Rödlistekriterium"] + "</br>");
            */
    }
    
    function createCard(namn, art){
        var card="<div class='card'><p>"+namn+"<br />"+art+"</p></div>";
         $(card).appendTo("body");
    }


});