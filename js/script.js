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

        vG_dataArray.push({"Card":[{"SvensktNamn":d.SvensktNamn}, {"Organismgrupp": d.Organismgrupp}]});
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
        player1deck = vG_dataArray.slice(5);
        player2deck = vG_dataArray.slice(-5);
        //console.log(player1deck[2])
        
        $.each(player1deck, function(index, value) {
            
            $div = $('<div />', {
                class:'card',
                id:value.Card[1].Organismgrupp,
                'text': value.Card[1].Organismgrupp.toUpperCase() + '  ' + value.Card[0].SvensktNamn 
            });
            $div.css({
                'position':'absolute',
                'left':index * 200+'px',
                'top':100+'px',
                'display':'none'
            }).appendTo( 'body' ).fadeIn(1000);

        });
    }
    
    function createCard(namn, art){
        var card="<div class='card'><p>"+namn+"<br/>"+art+"</p></div>";
         $(card).appendTo("body");
    }


});