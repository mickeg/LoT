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
    
    var callback = function(n, d){
        loadingbar = $('div.loadingbar').width();
        console.log($('div.loadingbar').width());
        $('div.loadingbar').width((loadingbar / 10) * 100)
        $('div.loadingbar').html(loadingbar + 10);
        vG_data.ID = n;
        vG_data.SvensktNamn = d.SvensktNamn;
        vG_data.Organismgrupp = d.Organismgrupp;
        vG_data["Svensk förekomst"] = d["Svensk förekomst"];

        vG_dataArray.push({"Card":{"SvensktNamn":d.SvensktNamn, "Organismgrupp": d.Organismgrupp, "SvenskFörekomst": d["Svensk förekomst"]}});
        console.log(vG_data);
        //console.log($('div.loadingbar').width());
        //$('div.loadingbar').width('(1/10)');
    }

    function ajaxLoad(n, c){
        $.support.cors = true;
        $.ajax({
            url: vG_url+n,
            dataType: "json",
            success: function(data) {
                callback(n, data)
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('error ' + textStatus + " " + errorThrown);
            }
        });
    }

    function generateCards(){
        player1deck = vG_dataArray.slice(0,5);
        player2deck = vG_dataArray.slice(5,10);
        console.log("Deck",vG_dataArray);
        console.log("player1 deck: ",player1deck);
        console.log("player2 deck: ",player2deck);
        createHierarchy(vG_dataArray);

        $.each(player1deck, function(index, value) {
            
            $div = $('<div />', {
                class:'card',
                id:value.Card.ID
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


    function createHierarchy(d){
        //Fjärilar:
        h = {};

        h.Fjärilar = d.filter(function (data) {
            return data.Card.Organismgrupp == "Fjärilar";
        });

        //Kärlväxter:
        h.Kärlväxter = d.filter(function (data) {
            return data.Card.Organismgrupp == "Kärlväxter";
        });

        //Storsvampar:
        h.Storsvampar = d.filter(function (data) {
            return data.Card.Organismgrupp == "Storsvampar";
        });

        //Alger:
        h.Alger = d.filter(function (data) {
            return data.Card.Organismgrupp == "Alger";
        });

        console.log(h);

        $.each(h, function(index, value){
            //Skapa upp huvudnoder
            console.log(index, value);
            var hue = 'rgb(' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ',' + (Math.floor((256-199)*Math.random()) + 200) + ')';
            $div = $('<div />', {
                class:'node1',
                css:({"background-color":hue}),
                id:index
            });

            $div.append(index);
            $div.appendTo( '.h_output' ).fadeIn(1000);

            $.each(value, function(index, v){
                //Skapa upp children
                //console.log(v.Card.SvensktNamn);
                $div2 = $('<div />', {
                    class:'node2',
                    css:({"background-color":"#fff"}),
                    visibility: 'hidden',
                    id:index
                });
                $div2.append(v.Card.SvensktNamn);  
                $div2.appendTo( '#'+v.Card.Organismgrupp ).fadeIn(1000);
            });
        });

    }

});