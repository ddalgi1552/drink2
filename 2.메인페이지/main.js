
var tc=21; // tile count (must be odd number)
var gs=40; // grid size
var field; // map position array which value is 0 for wall, 1~2 for way
var px=py=1; // 0 <= px,py < tc
var xv=yv=0;
var tracker;
var stack;
var stucked;

var cx, cy; 

window.onload=function(){
	canv=document.getElementById("maze");	
	ctx=canv.getContext("2d");	
	document.addEventListener("keydown",keyPush);
	initialize();
	
}

function enterkey() {
    if (window.event.keyCode == 13) {
    	var sizeInput = document.getElementById("sizeInput").value;
    	if(sizeInput%2==0){
    		alert("Please enter an odd number.");
    	}else{
    		tc=sizeInput;
    		initialize();
    	}
    }
}

function initialize(){
	document.getElementById("sizeInput").value = tc;
	make2DArray();
	
	ctx.fillStyle="black";
	canv.width=canv.height=tc*gs;
	ctx.fillRect(0,0,canv.width, canv.height);
	
	makeWay(0,1);
	makeWay(tc-1,tc-2);
	
	px=py=1;
	// tracker initial position
	tracker = {x:px, y:py};
	stack = [];
	stack.push(tracker);
	stucked = false;
	randomMazeGenerator();
	
	cx=0; cy=1;
	// character initial position
	ctx.fillStyle="green";
	ctx.fillRect(cx*gs,cy*gs,gs, gs);
	
}

function makeWay(xx,yy){
	//console.log("makeWay: " + xx + " " + yy);
	field[yy][xx]++;
	ctx.fillStyle="white";
	ctx.fillRect(xx*gs,yy*gs,gs, gs);
}
function keyPush(evt){
	switch(evt.keyCode){
	case 37:
		xv=-1;yv=0;
		break;
	case 38:
		xv=0;yv=-1;
		break;
	case 39:
		xv=1;yv=0;
		break;
	case 40:
		xv=0;yv=1;
		break;
	}
	cx+=xv;
	cy+=yv;
	if(cx<0 || cx>tc-1 || cy<0 || cy>tc-1 || field[cy][cx]==0){
		cx-=xv;
		cy-=yv;
		return;
	}else{
		ctx.fillStyle="green";
		ctx.fillRect(cx*gs,cy*gs,gs, gs);
		ctx.fillStyle="white";
		ctx.fillRect((cx-xv)*gs,(cy-yv)*gs,gs, gs);
		document.getElementById("text").innerHTML = "cx: " + cx + " cy: " + cy;
		if(cx==tc-1 && cy==tc-2){
      location.href='../3.day1/index.html';
			alert("그럼 이제, 사이버공간에서 당신이 금주할만한 능력이 있는지 테스트하겠습니다");
			initialize();
		}
	}
		
}

function make2DArray(){
	console.log("tc: " + tc);
	field = new Array(parseInt(tc));
	for(var i=0; i<field.length; i++){
		field[i] = new Array(parseInt(tc));
	}
	console.log("field length: " + field.length);
	for(var i=0; i<field.length; i++){
		for(var j=0; j<field[i].length; j++){
			field[i][j]=0; // value of 0 is for not visited, 1 for visited, 2 for backtracked.
		}
	}
	console.log("field: " + field);
}

function randomMazeGenerator(){
	var cnt=0;
	while(stack.length>0){
		if(stucked)
			backtracking();
		else	
			tracking();
		//console.log("cnt: " + cnt++);
	}			
}

function tracking(){
	
	/* Random Move */
	key = Math.floor(Math.random()*4);
	switch(key){
	case 0: // left move
		xv=-2;yv=0;
		break;
	case 1: // up move
		xv=0;yv=-2;
		break;
	case 2: // right move
		xv=2;yv=0;
		break;
	case 3: // down move
		xv=0;yv=2;
		break;
	}
	
	px+=xv;
	py+=yv;
	if(px<0 || px>tc-1 || py<0 || py>tc-1){
		px-=xv;
		py-=yv;
		return;
	} 
	if(field[py][px]<1){
		makeWay(px-xv/2,py-yv/2);
		makeWay(px,py);
		tracker = {x:px, y:py};
		stack.push(tracker);
		blockCheck();	
	}else{
		px-=xv;
		py-=yv;
		return;
	}

}

function blockCheck(){
	var blockCount = 0;
	if(py+2>tc-1 || field[py+2][px]!=0)
		blockCount++;
	if(py-2<0 || field[py-2][px]!=0)
		blockCount++;
	if(px+2>tc-1 || field[py][px+2]!=0)
		blockCount++;
	if(px-2<0 || field[py][px-2]!=0)
		blockCount++;
	if(blockCount>=4)
		stucked = true;
	else
		stucked = false;
}

function backtracking(){
	var backtracker = stack.pop();
	px = backtracker.x;
	py = backtracker.y;
	//field[py][px]++;
	//ctx.fillStyle="blue";
	//ctx.fillRect(px*gs,py*gs,gs, gs);
	blockCheck();	
}


//버튼
// const pabtn=document.getElementById('pabtn');
// pabtn.addEventListener('click',() => {go('../3.day1/index.html')});
// const sojubtn=document.getElementById('sojubtn');
// sojubtn.addEventListener('click',() => {go('../4.day2/index.html')});
const plabtn=document.getElementById('plabtn');
// plabtn.addEventListener('click',() => {go('../5.day3/index.html')});
const rainbowbtn=document.getElementById('rainbowbtn');
// rainbowbtn.addEventListener('click',() => {go('../6.day4/index.html')});
const sunbtn=document.getElementById('sunbtn');
// sunbtn.addEventListener('click',() => {go('../7.day5/index.html')});


routes = [
  {
    button: 'pabtn',
    page: '../3.day1/index.html'
  },
  {
    button: 'sojubtn',
    page: '../4.day2/index.html'
  },
  {
    button: 'plabtn',
    page: '../5.day3/index.html'
  },
  {
    button: 'rainbowbtn',
    page: '../6.day4/index.html'
  },
  {
    button: 'sunbtn',
    page: '../7.day5/index.html'
  }

]

routes.map((route) => {
  const btn = document.getElementById(route.button);
  btn.addEventListener('click',() => {go(route.page)});
})

function go(page){
  console.log('clicked')
  location.href=page;
}
