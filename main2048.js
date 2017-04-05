var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
$(document).ready(function(){
	prepareForMobile();
	newgame();
});
$(document).keydown(function(event){
	var event = event||window.event;
	switch(event.keyCode){
		case 37: //left
			event.preventDefault();
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
			break;
		case 38: //up
			event.preventDefault();
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
			break;
		case 39: //right
			event.preventDefault();
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
			break;
		case 40: //down
			event.preventDefault();
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
			break;
		default:
			break;

	}
});

document.addEventListener('touchstart',function(event){
	startX = event.touches[0].pageX;
	startY = event.touches[0].pageY;
});
document.addEventListener('touchmove',function(event){
	event.preventDefault();
})
document.addEventListener('touchend',function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;
	var deltaX = endX - startX;
	var deltaY = endY - startY;
	if(Math.abs(deltaX)<0.1*documentWidth&&Math.abs(deltaY)<0.1*documentWidth){
		return;
	}
	//x
	if(Math.abs(deltaX)>= Math.abs(deltaY)){
		if(deltaX>0){
			//moveRight
			if(moveRight()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
		}else{
			//moveLeft
			if(moveLeft()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
		}
	}
	//y
	else{
		if(deltaY>0){
			//moveDown
			if(moveDown()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
		}else{
			//moveUp
			if(moveUp()){
				setTimeout("generateOneNumber()",210);
				setTimeout("isGameover()",300);
			}
		}
	}
});

function prepareForMobile(){
	if(documentWidth>500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	$('#grid_container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid_container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid_container').css('padding',cellSpace);
	$('#grid_container').css('border-radius',0.02*gridContainerWidth);

	$('.grid_cell').css('width',cellSideLength);
	$('.grid_cell').css('height',cellSideLength);
	$('.grid_cell').css('border-radius',0.02*cellSideLength);
}
function newgame(){
	//初始化格子
	init();
	//随机在两个格子里面生成数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	//初始化每个表格的位置
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			var gridCell = $("#grid_cell_"+i+"_"+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
		}
	}
	//定义一个二维数组，来生成每个格子中间的数字
	for(var i=0; i<4; i++){
		board[i] = new Array();
		hasConflicted[i] = new Array();
		for(var j=0; j<4; j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}
	updateBoardView();
}
function updateBoardView(){
	//根据数组中的值，通过这个函数将数组中的值反应在页面视图中
	$(".number_cell").remove();
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			$("#grid_container").append('<div class="number_cell" id="number_cell_'+i+'_'+j+'"></div>');
			var numberCell = $("#number_cell_"+i+"_"+j);
			if(board[i][j]==0){
				numberCell.css('width','0px');
				numberCell.css('height','0px');
				numberCell.css('top',getPosTop(i,j)+ cellSideLength/2);//放在中间
				numberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
			}else{
				numberCell.css('width',cellSideLength);
				numberCell.css('height',cellSideLength);
				numberCell.css('top',getPosTop(i,j));
				numberCell.css('left',getPosLeft(i,j));
				numberCell.css('background-color',getNumberBackgorundColor(board[i][j]));
				numberCell.css('color',getNumberColor(board[i][j]));
				numberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	$('.number_cell').css('line-height',cellSideLength+'px');
	$('.number_cell').css('font-size',0.6*cellSideLength+'px');
}

function generateOneNumber(){
	if (noSpace(board)) {
		return false;
	}
	//随机一个位置 可优化
	var posX = parseInt(Math.floor(Math.random()*4));
	var posY = parseInt(Math.floor(Math.random()*4));
	var time = 0;
	while(time<50){
		if(board[posX][posY]==0){
			break;
		}
		var posX = parseInt(Math.floor(Math.random()*4));
		var posY = parseInt(Math.floor(Math.random()*4));
	}
	if(time==50){
		for(var i=0; i<4; i++){
			for(var j=0; j<4; j++){
				if(board[i][j]==0){
					posX = i;
					posY = j;
				}
			}
		}
	}
	// while(board[posX][posY]!=0){
	// 	var posX = parseInt(Math.floor(Math.random()*4));
	// 	var posY = parseInt(Math.floor(Math.random()*4));
	// }
	//随机一个数字(随机生成2或者4)
	var randomNum = Math.random()-0.5>0?2:4;
	//在随机位置显示随机数字
	board[posX][posY] = randomNum;

	showNumberWidthAnimation(posX,posY,randomNum);
	return true;
}

function isGameover(){
	if(noSpace(board)&&nomove(board)){
		gameover();
	}
}
function gameover(){
	alert('gameover');
}

function moveLeft(){
	//判断能否向左移动
	if(!canMoveLeft(board)){
		return false;
	}
	//moveLeft
	//落脚的位置是否为空
	//落脚位置元素与待判定元素的数字是否相等
	//移动路径中是否有障碍物
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if (board[i][j]!=0) {
				for(var k=0; k<j; k++){
					if (board[i][k]==0 && noBlockHorizontal(i,k,j,board)) {
						//move
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveDown(){
	//判断能否向左移动
	if(!canMoveDown(board)){
		return false;
	}
	for(var j=0; j<4; j++){
		for(var i=2; i>=0; i--){
			if(board[i][j]!=0){
				for(var k=3; k>i; k--){
					if (board[k][j]==0 && noBlockVertical(i,k,j,board)) {
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[k][j]==board[i][j] && noBlockVertical(i,k,j,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	for(var i=0; i<4; i++){
		for(var j=2;j>=0; j--){
			if(board[i][j]!=0){
				for(var k=3;k>j;k--){
					if(board[i][k]==0 && noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
					}else if(board[i][k]==board[i][j] && noBlockHorizontal(i,j,k,board)&& !hasConflicted[i][k]){
						//move
						showMoveAnimation(i,j,i,k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;

						score+=board[i][k];
						updateScore(score);

						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}

function moveUp(){
	if(!canMoveUp(board)){
		return false;
	}
	for(var i=1; i<4; i++){
		for(var j=0; j<4; j++){
			if (board[i][j]!=0) {
				for(var k=0; k<i; k++){
					if(board[k][j]==0 && noBlockVertical(k,i,j,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j] = board[i][j];
						board[i][j] = 0;
					}else if(board[k][j]==board[i][j] && noBlockVertical(k,i,j,board) && !hasConflicted[k][j]){
						//move
						showMoveAnimation(i,j,k,j);
						//add
						board[k][j] += board[i][j];
						board[i][j] = 0;

						score+=board[k][j];
						updateScore(score);

						hasConflicted[k][j] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",200);
	return true;
}