function getPosTop(i,j){
	return 20+120*i;
}
function getPosLeft(i,j){
	return 20+120*j;
}
function getNumberBackgorundColor(number){
	switch(number){
		case 2: return "#eee4da"; break;
		case 4: return "#ede0c8"; break;
		case 8: return "#f2b179"; break;
		case 16: return "#f59563"; break;
		case 32: return "#f67c5f"; break;
		case 64: return "#f65e3b"; break;
		case 128: return "#edcf72"; break;
		case 256: return "#edcc61"; break;
		case 512: return "#9c0"; break;
		case 1024: return "#33b5e5"; break;
		case 2048: return "#09c"; break;
		case 4096: return "#93c"; break;
	}
	return "black";
}
function getNumberColor(number){
	if(number<=4){
		return "#776e65";
	}else{
		return "white";
	}

}
function noSpace(board){
	for(var i=0; i<4; i++){
		for(var j=0; j<4; j++){
			if (board[i][j]==0) {
				return false;
			}
		}
	}
	return true;
}
function canMoveLeft(board) {
	//最左边的那一列不用判断，因为已经不能往左边移动了
	//两种情况能往左边移动：1）某个数字左边有空的位置 2）相邻的两个数字相同，可以合并
	for(var i=0; i<4; i++){
		for(var j=1; j<4; j++){
			if (board[i][j]!=0) {
				if(board[i][j-1]==0||board[i][j-1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveDown(board) {
	//最左边的那一列不用判断，因为已经不能往左边移动了
	//两种情况能往左边移动：1）某个数字左边有空的位置 2）相邻的两个数字相同，可以合并
	for(var j=0; j<4; j++){
		for(var i=2; i>=0; i--){
			if (board[i][j]!=0) {
				if(board[i+1][j]==0||board[i+1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveRight(board) {
	//最左边的那一列不用判断，因为已经不能往左边移动了
	//两种情况能往左边移动：1）某个数字左边有空的位置 2）相邻的两个数字相同，可以合并
	for(var i=0; i<4; i++){
		for(var j=2; j>=0; j--){
			if (board[i][j]!=0) {
				if(board[i][j+1]==0||board[i][j+1]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
function canMoveUp(board) {
	//最左边的那一列不用判断，因为已经不能往左边移动了
	//两种情况能往左边移动：1）某个数字左边有空的位置 2）相邻的两个数字相同，可以合并
	for(var i=1; i<4; i++){
		for(var j=0; j<4; j++){
			if (board[i][j]!=0) {
				if(board[i-1][j]==0||board[i-1][j]==board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}

function noBlockHorizontal(row,col1,col2,board){
	for(var i=col1+1; i<col2; i++){
		if(board[row][i]!=0){
			return false;
		}
	}
	return true;
}

function noBlockVertical(row1,row2,col,board){
	for(var i=row1+1; i<row2; i++){
		if(board[i][col]!=0){
			return false;
		}
	}
	return true;
}

function nomove(board){
	if(canMoveLeft(board)||canMoveUp(board)||canMoveRight(board)||canMoveDown(board)){
		return false;
	}
	return true;
}
