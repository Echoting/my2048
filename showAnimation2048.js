function showNumberWidthAnimation(i,j,randNum){
	var numberCell = $("#number_cell_"+i+"_"+j);
	numberCell.css('background-color',getNumberBackgorundColor(randNum));
	numberCell.css('color',getNumberColor(randNum));
	numberCell.text(randNum);

	numberCell.animate({
		width: "100px",
		height: "100px",
		top: getPosTop(i,j),
		left: getPosLeft(i,j)
	},50);
}
function showMoveAnimation(fromX,fromY,toX,toY){
	var numberCell = $("#number_cell_"+fromX+"_"+fromY);
	numberCell.animate({
		top: getPosTop(toX,toY),
		left: getPosLeft(toX,toY)
	},200);
}

function updateScore(score){
	$("#score").text(score);
}