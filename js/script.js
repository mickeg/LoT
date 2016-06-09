/* global $ */

var vG_data = {};
var vG_dataArray = [];
var vG_url = "http://localhost:3000/";
var vG_jsonSize = 0;
var size = 10;

$( document ).ready(function() {
    
    $("#print").click(function(){
        for(i=0; i < size; i++){
            r = getRandomInt(1, 19587); //max number in json.
            ajaxLoad(r, callback);
        }
    });
    
     $("#cards").click(function(){
        generateCards();
    });
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    var callback = function(d){
        vG_data.SvensktNamn = d.SvensktNamn;
        vG_data.Organismgrupp = d.Organismgrupp;
        vG_data["Svensk förekomst"] = d["Svensk förekomst"];

        vG_dataArray.push({"Card":{"SvensktNamn":d.SvensktNamn, "Organismgrupp": d.Organismgrupp, "SvenskFörekomst": d["Svensk förekomst"]}});
        console.log(vG_data);
    }

    function ajaxLoad(n, c){
        $.support.cors = true;
        $.ajax({
            url: vG_url+n,
            dataType: "json",
            success: function(data) {
                callback(data)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error ' + textStatus + " " + errorThrown);
            }
        });
    }

    function generateCards(){
        player1deck = vG_dataArray.slice(0,5);
        player2deck = vG_dataArray.slice(5,10);
        console.log(vG_dataArray);
        console.log("player1 deck: ",player1deck);
        console.log("player2 deck: ",player2deck);
        //createHierarchy(player1deck);

        $.each(player1deck, function(index, value) {
            
            $div = $('<div />', {
                class:'card',
                id:value.Card.Organismgrupp
            });

            $div.append("<div class='header'>"+value.Card.Organismgrupp.toUpperCase()+ "</div>");
            $div.append("<div class='cardname'>"+value.Card.SvensktNamn+ "</div>");
            $div.append("<div class='cardname'>"+value.Card.SvenskFörekomst+ "</div>");

            $div.appendTo( '#player1' ).fadeIn(1000);

        });

        $.each(player2deck, function(index, value) {
            
            $div = $('<div />', {
                class:'card',
                id:value.Card.Organismgrupp
            });

            $div.append("<div class='header'>"+value.Card.Organismgrupp.toUpperCase()+ "</div>");
            $div.append("<div class='cardname'>"+value.Card.SvensktNamn+ "</div>");
            $div.append("<div class='cardname'>"+value.Card.SvenskFörekomst+ "</div>");

            $div.appendTo( '#player2' ).fadeIn(1000);

        });
        
        
    }

/*
    function createHierarchy(d){
        //Fjärilar:
        h = {};

        h.Fjärilar = d.filter(function (data) {
            return data.Card[1].Organismgrupp == "Fjärilar";
        });

        

        console.log(h);

        //console.log(h.Fjärilar[0].Card[0].SvensktNamn);
        
    }
    */


});