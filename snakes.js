
var remainingSnakePieces=3;
var direction="right";
var applesToShow = 4;
var appleCount = 0;
var score = 10;
var high=10;
var agemultiplier = 16;
$(document).keypress(function(event){   
    var keycode = parseInt(event.keyCode ? event.keyCode : event.which);
    if(keycode==100)direction="right";
    if(keycode==97)direction="left";
    if(keycode==119)direction="up";
    if(keycode==115)direction="down";
})
function checksnakeIntersectsApple(){
    $(".apple").each(function(ii,myapple){
        var sLeft = parseInt($(".snakebody").css("marginLeft"));
        var sTop = parseInt($(".snakebody").css("marginTop"));
        var aLeft = parseInt($(myapple).css("marginLeft"));
        var aTop = parseInt($(myapple).css("marginTop"));
        var appleIntersectsSnake = (sLeft-15 < aLeft && sLeft+15 > aLeft) && (sTop-15 < aTop && sTop+15 > aTop)
       if(appleIntersectsSnake){
            $(myapple).remove();
            score+=10;
       } 
    });
}
function checksnakeIntersectsTail(){
    $(".snaketail").each(function(ii,snaketail){
        var sLeft = parseInt($(".snakebody").css("marginLeft"));
        var sTop = parseInt($(".snakebody").css("marginTop"));
        var aLeft = parseInt($(snaketail).css("marginLeft"));
        var aTop = parseInt($(snaketail).css("marginTop"));
        var tailIntersectsSnake = (sLeft-15 < aLeft && sLeft+15 > aLeft) && (sTop-15 < aTop && sTop+15 > aTop)
       if(tailIntersectsSnake && $(snaketail).data("age") > (agemultiplier*2) ){
			alert("GAME OVER");
			$(".snaketail").remove();
			$(".snakebody").css("marginLeft",50);
			$(".snakebody").css("marginTop",50);
			if(score>high)high=score;
			score=10;
       } 
    });
}
var counter=0;
setInterval(function(){
            $("#score").text(score+" high:"+high);
    if(direction=="right") {
        $(".snakebody").css("marginLeft",parseInt($(".snakebody").css("marginLeft"))+1);
    
        
    }
    if(direction=="left") $(".snakebody").css("marginLeft",parseInt($(".snakebody").css("marginLeft"))-1)
    if(direction=="up") $(".snakebody").css("marginTop",parseInt($(".snakebody").css("marginTop"))-1)
    if(direction=="down") $(".snakebody").css("marginTop",parseInt($(".snakebody").css("marginTop"))+1)
    if(applesToShow>$(".apple").length){
        var newapple =$("<div/>");
        newapple.addClass("apple");
        newapple.css("marginLeft",Math.random()*(parseInt($("#gamearea").width())-16));
        newapple.css("marginTop",Math.random()*(parseInt($("#gamearea").height())-16));
        $("#gamearea").append(newapple);
    }
    counter++;
    if(counter%16==0){
        var snaketail = $("<div/>");
        snaketail.addClass("snaketail");
		snaketail.data("age",0);
        snaketail.css("marginTop",$(".snakebody").css("marginTop"));
        snaketail.css("marginLeft",$(".snakebody").css("marginLeft"));
        $("#gamearea").append(snaketail);
    
    }
	$(".snaketail").each(function(ii,tailseg){
		var myage = $(tailseg).data("age")+1;
		$(tailseg).data("age",myage);
		if(myage> (score/10 +3)*agemultiplier){
			$(tailseg).remove();
		}
	});
	
    checksnakeIntersectsTail();
    checksnakeIntersectsApple();
},3);