var characters = [];
var names = ["John-Snow","Daenerys-Targaryen","Cersei-Lannister", "Khal-Drogo"];
var char = $("#characters");
var enemAv = $("#enemiesAvailable");
var Enemy = $("#Defender");
var res = $("#Result");
var charChoosen = false;
var enemChoosen = false;
var myChar;
var theEnem;
var enemLeft = names.length - 1;

for (var i=0;i<=3;i++){
    characters.push(i);
    characters[i] = {
        name : names[i],
        hp : Math.floor(Math.random()*50 + 100),
        ap : Math.floor(Math.random()*20 + 5),
        Cap : Math.floor(Math.random()*20 + 5),
        imag : new Image()
    }
    characters[i].imag.src = "assets/images/" + characters[i].name + ".jpg";
}

function createElement(charId,parentElement){

    var charCol = $("<col>");
    charCol.addClass("col-3");
    charCol.attr("id","charCol" + charId);
    charCol.appendTo(parentElement);

    var charRow = $("<div>");
    charRow.addClass("row");
    charRow.attr("id","charRow" + charId);
    charRow.appendTo("#charCol" + charId)
;
    var charj = $("<img>");
    charj.addClass("img-responsive rounded ml-1 mr-1 mt-4 p-2 bg-success border border-dark");
    charj.attr("id","char");
    charj.attr("data-charId",charId);
    charj.attr("src","assets/images/" + characters[charId].name + ".jpg");
    charj.appendTo($("#charRow" + charId));

    var charSecRow = $("<div>");
    charSecRow.addClass("row");
    charSecRow.attr("id","charSecRow" + charId);
    charSecRow.appendTo("#charCol" + charId);

    var charCaption = $("<p>");
    charCaption.attr("id","charCaption" + charId);
    charCaption.attr("charId",charId);
    charCaption.text(characters[charId].name);
    charCaption.appendTo($("#charSecRow" + charId));
    
    var char3rdRow = $("<div>");
    char3rdRow.addClass("row");
    char3rdRow.attr("id","char3rdRow" + charId);
    char3rdRow.appendTo("#charCol" + charId);

    var healthPoints = $("<p>");
    healthPoints.attr("id","charHp" + charId);
    healthPoints.attr("charId",charId);
    healthPoints.text("Health points: " + characters[charId].hp);
    healthPoints.appendTo($("#char3rdRow" + charId));
}

function createAttackButton(){
    if(!$("#attackButton").length>0){
    var resRow = $("<div>");
    resRow.addClass("row");
    resRow.attr("id","resRow");
    resRow.appendTo("#Result");

    var buttonCol = $("<div>");
    buttonCol.addClass("col");
    buttonCol.attr("id","buttonCol");
    buttonCol.appendTo("#resRow");

    var attackButton = $("<button>");
    attackButton.attr("id","attackButton");
    attackButton.addClass("btn btn-danger mt-5 ml-5")
    attackButton.text("Attack");
    attackButton.appendTo($("#buttonCol"));
    }
}

function attack(){
    if(charChoosen === true && enemChoosen === true && characters[theEnem].hp>0 && characters[myChar].hp>0){
        if($("#resTextCol").length){
            $("#resTextCol").remove(); 
        }
        var resTextCol = $("<div>");
        resTextCol.addClass("col mt-5");
        resTextCol.attr("id","resTextCol");
        resTextCol.text("You attacked " + characters[theEnem].name + " for a damage of " + characters[myChar].ap + " and he attacked you back for " + characters[theEnem].ap + "!")
        resTextCol.appendTo("#resRow");
        characters[theEnem].hp = characters[theEnem].hp - characters[myChar].ap;
        characters[myChar].hp = characters[myChar].hp - characters[theEnem].Cap;
        characters[myChar].ap = characters[myChar].ap * 2;
        $("#charHp" + myChar).text("Health points: " + characters[myChar].hp);
        $("#charHp" + theEnem).text("Health points: " + characters[theEnem].hp);
        if(characters[theEnem].hp<=0 && characters[myChar].hp > 0 && enemLeft > 0){
            $("#charCol" + theEnem).remove();
            enemLeft = enemLeft - 1;
            enemChoosen = false;
            resTextCol.text("You defeated " + characters[theEnem].name + ", choose a new enemy!");
        }
        if(characters[myChar].hp > 0 && enemLeft <= 0){
            $("#charCol" + theEnem).remove();
            enemChoosen = false;
            resTextCol.text("You have WON!");
        }
        if(characters[myChar].hp <= 0 && enemLeft > 0){
            resTextCol.text("You have LOST!");
        }

    }
}

function start(){
    char.empty();
    enemAv.empty();
    Enemy.empty();
    res.empty();
    for (var j=0;j<characters.length;j++){
        createElement(j,char);
    }
    charChoosen = enemChoosen = false;
    enemLeft = names.length - 1;
}

start();

$(".img-responsive").on("click", function() {
    var clickedElementId = $(this).attr("data-charId");
    var clickedElementParentClass = $(this).parent().parent().parent().attr("id");

    if(clickedElementParentClass === "characters" && charChoosen === false){
        for(var i=0;i<characters.length;i++){
            if(i != clickedElementId){
                $("#charCol" + i).remove();
                createElement(i,enemAv);
                myChar = clickedElementId;
            }
        }
        charChoosen = true;
    }
})

    $(document).on("click","img", function() {
        var clickedElementId = $(this).attr("data-charId");
        var clickedElementParentClass = $(this).parent().parent().parent().attr("id");
        console.log(clickedElementParentClass);
        console.log(enemLeft);
        console.log(enemChoosen);
        if(clickedElementParentClass ==="enemiesAvailable" && enemLeft>0 && enemChoosen === false){
            $("#charCol" + clickedElementId).remove();
            createElement(clickedElementId,Enemy);
            createAttackButton();
            theEnem = clickedElementId;
            enemChoosen = true;
            if(enemLeft<(characters.length-1)){
                $("#resTextCol").text("Empieza a atacar!");
            }
        }
})

$(document).on("click","button", function() {
    var clickedButton = $(this).attr("id");
    if(clickedButton === "attackButton"){
        attack();
    }
})
// createElement(0,char);