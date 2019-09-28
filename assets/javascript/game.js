var characters = [];
var names = ["John-Snow","Daenerys-Targaryen","Cersei-Lannister", "Khal-Drogo"];
var char = $("#characters");
var yourChar = $("#yourCharacter");
var yourEnem = $("#yourEnemies");
var res = $("#Result");
var charChoosen = false;
var enemChoosen = false;
var enemLeft = names.length - 1;

for (var i=0;i<=3;i++){
    characters.push(i);
    characters[i] = {
        name : names[i],
        hp : Math.floor(Math.random()*50 + 100),
        ap : Math.floor(Math.random()*20 + 5),
        hp : Math.floor(Math.random()*20 + 5),
        imag : new Image()
    }
    characters[i].imag.src = "assets/images/" + characters[i].name + ".jpg";
    console.log(characters[i]);
}

function createElement(charId,parentElement){

    var charCol = $("<col>");
    charCol.addClass("col-3");
    charCol.attr("id","charCol" + charId);
    charCol.appendTo(parentElement);

    var charFigure = $("<figure>");
    charFigure.addClass("figure");
    charFigure.attr("id","charFigure" + charId);
    charFigure.appendTo("#charCol" + charId);

    var charj = $("<img>");
    charj.addClass("img-responsive rounded ml-1 mr-1 p-2 bg-success border border-dark");
    charj.attr("id","char" + charId);
    charj.attr("charId",charId);
    charj.attr("src","assets/images/" + characters[charId].name + ".jpg");
    charj.appendTo($("#charFigure" + charId));

    var charCaption = $("<figcaption></figcaption>");
    charCaption.addClass("figure-caption");
    charCaption.attr("id","charCaption" + charId);
    charCaption.attr("charId",charId);
    charCaption.text(characters[charId].name);
    charCaption.appendTo($("#charFigure" + charId));

}

function eraseElement(charId){
    $("#charCol" + charId).remove();
}

function start(){
    char.empty();
    yourChar.empty();
    yourEnem.empty();
    res.empty();
    for (var j=0;j<characters.length;j++){
        createElement(j,char);
    }
    charChoosen = enemChoosen = false;
    enemLeft = names.length - 1;
}

start();
eraseElement(1);
// createElement(0,char);