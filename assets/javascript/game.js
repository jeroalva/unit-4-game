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
var colorFoto;
var lostCount=0;
var winCount=0;

console.log(enemAv.attr("id"));
console.log(characters[1]);

function createElement(charId,parentElement){

    var charCol = $("<col>");
    charCol.addClass("col-3");
    charCol.attr("id","charCol" + charId);
    charCol.appendTo(parentElement);

    var charRow = $("<div>");
    charRow.addClass("row");
    charRow.attr("id","charRow" + charId);
    charRow.appendTo("#charCol" + charId);

    if(parentElement.attr("id")==="characters"){
        colorFoto = "success";
    }
    else if(parentElement.attr("id")==="enemiesAvailable"){
        colorFoto = "secondary";
    }
    else if (parentElement.attr("id")==="Defender"){
        colorFoto = "danger";
    }

    var charj = $("<img>");
    charj.addClass("img-responsive rounded ml-1 mr-1 mt-1 p-2 bg-" + colorFoto   + " border border-dark");
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
    attackButton.addClass("btn btn-danger ml-5")
    attackButton.text("Attack");
    attackButton.appendTo($("#buttonCol"));
    }
}

function createRematchButton(){
    if(!$("#reMatchButton").length>0){

    var buttonCol = $("<div>");
    buttonCol.addClass("col");
    buttonCol.attr("id","buttonCol2");
    buttonCol.appendTo("#resRow");

    var attackButton = $("<button>");
    attackButton.attr("id","reMatchButton");
    attackButton.addClass("btn btn-secondary ml-5")
    attackButton.text("¡Again!");
    attackButton.appendTo($("#buttonCol2"));
    }
}


function attack(){
    if(charChoosen === true && enemChoosen === true && characters[theEnem].hp>0 && characters[myChar].hp>0){
        if($("#resTextCol").length){
            $("#resTextCol").remove(); 
        }
        var resTextCol = $("<div>");
        resTextCol.addClass("col");
        resTextCol.attr("id","resTextCol");
        resTextCol.text("You attacked " + characters[theEnem].name + " for a damage of " + characters[myChar].ap + " and he attacked you back for " + characters[theEnem].ap + "!")
        resTextCol.appendTo("#resultTitleRow");
        characters[theEnem].hp = characters[theEnem].hp - characters[myChar].ap;
        characters[myChar].hp = characters[myChar].hp - characters[theEnem].Cap;
        characters[myChar].ap = characters[myChar].ap + characters[myChar].Cap;
        $("#charHp" + myChar).text("Health points: " + characters[myChar].hp);
        $("#charHp" + theEnem).text("Health points: " + characters[theEnem].hp);
        if(characters[theEnem].hp<=0 && characters[myChar].hp > 0 && enemLeft > 0){
            $("#charCol" + theEnem).remove();
            enemLeft = enemLeft - 1;
            enemChoosen = false;
            $("#resultTitle").text("Choose a new enemy!");
            $("#defenderTitle").text("");
            $("#enemiesTitle").text("Enemies")
            resTextCol.text("You defeated " + characters[theEnem].name + ", choose a new enemy!");
        }
        if(characters[myChar].hp > 0 && enemLeft <= 0){
            $("#charCol" + theEnem).remove();
            enemChoosen = false;
            $("#resultTitle").text("");
            $("#defenderTitle").text("");
            $("#enemiesTitle").text("")
            $("#resTextCol").text("");
            $("#resultTitle").attr("id","resultTitleGreen")
            $("#resultTitleGreen").text("¡You have won!")
            createRematchButton();
            $("#buttonCol").remove();
            winCount++;
            $("#resultTotal").text("Wins: " + winCount + " & Losses: " + lostCount)
        }
        if(characters[myChar].hp <= 0 && enemLeft > 0){
            $("#resultTitle").text("");
            $("#defenderTitle").text("");
            $("#enemiesTitle").text("")
            $("#resultTitle").attr("id","resultTitleRed")
            $("#resultTitleRed").text("¡You have lost!")
            resTextCol.text("");
            createRematchButton();
            $("#buttonCol").remove();
            lostCount++;
            $("#resultTotal").text("Wins: " + winCount + " & Losses: " + lostCount)
        }

    }
}

console.log(characters.length);

function start(){
    characters = [];
    for (var i=0;i<=3;i++){
            characters.push(i);
            characters[i] = {
                name : names[i],
                hp : Math.floor(Math.random()*50 + 80),
                ap : Math.floor(Math.random()*20 + 5),
                Cap : Math.floor(Math.random()*20 + 5),
                imag : new Image()
            }
        
        characters[i].imag.src = "assets/images/" + characters[i].name + ".jpg";
    }
    char.empty();
    enemAv.empty();
    Enemy.empty();
    res.empty();
    $("#charactersTitle").text("Characters: ¡Choose your character!");
    $("#enemiesTitle").text("");
    $("#defenderTitle").text("");
    console.log($("#resultTitleRed").length);
    if($("#resultTitleRed").length>0){
        $("#resultTitleRed").attr("id","resultTitle");
        $("#resultTitle").text("");
    }
    else if ($("#resultTitleGreen").length>0){
        $("#resultTitleGreen").attr("id","resultTitle");
        $("#resultTitle").text("");
    }
    for (var j=0;j<characters.length;j++){
        characters[j].cap = characters[j].ap;
        createElement(j,char);
    }
    charChoosen = enemChoosen = false;
    enemLeft = names.length - 1;
}

start();

$(document).on("click","img", function() {
    var clickedElementId = $(this).attr("data-charId");
    var clickedElementParentClass = $(this).parent().parent().parent().attr("id");

    if(clickedElementParentClass === "characters" && charChoosen === false){
        $("#charactersTitle").text("Your character");
        $("#enemiesTitle").text("Enemies: ¡Choose the first enemy you want to attack!");
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
        if(clickedElementParentClass ==="enemiesAvailable" && enemLeft>0 && enemChoosen === false){
            $("#enemiesTitle").text("Enemies")
            $("#defenderTitle").text("Defender: ¡This is the enemy you are attacking right now!")
            $("#resultTitle").text("¡Push the button to attack!")
            $("#resTextCol").text("");
            $("#charCol" + clickedElementId).remove();
            createElement(clickedElementId,Enemy);
            createAttackButton();
            theEnem = clickedElementId;
            enemChoosen = true;
        }
})

$(document).on("click","button", function() {
    var clickedButton = $(this).attr("id");
    if(clickedButton === "attackButton"){
        attack();
    }
})

$(document).on("click","button", function() {
    var clickedButton = $(this).attr("id");
    if(clickedButton === "reMatchButton"){
        start();
    }
})