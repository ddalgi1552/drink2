var box=document.getElementById('box');
var zone=document.getElementById('playground');
var filediv=document.getElementById('filediv');
var url=document.getElementById('url');
var filemsg=document.getElementById('filemsg');
var resize=document.getElementById('resizecheck');
var guide=document.getElementById('guidecheck');
var itemsx=document.getElementById('itemsx');
var itemsy=document.getElementById('itemsy');
var level=document.getElementById('levelselect');
var msgbox=document.getElementById('message');
var msgboxin=msgbox.getElementsByTagName('p')[0];
var mainbtn=document.getElementById('mainbutton');
var fobtn=document.getElementById('fileselectok');
var sibtn=document.getElementById('showimage');
var guidediv=document.getElementById('guideimage');
var times=document.getElementById('times');
var clicks=document.getElementById('clicks');
var wr,imgx,imgy,xs,ys,isx,isy,ist,ixs,iys,zx,zy,ss,ssv;
var defaultx=200,defaulty=200;
var blockzone,blocks=null,blankblock=null;
var imgsrc='./부적.png';
var settingcomplete=false;
function makegame(){
	if(!imgsrc){
		setfilediv();
		return;
	}
	timerstop();
	timer(true);
	updatetimes(true);
	setmsg('이미지 불러오는 중..');
	settingcomplete=false;
	var img=new Image();
	img.src=imgsrc;
	wr=(resize.checked)? true : false;
	if(img.width){
		imgx=img.width;
		imgy=img.height;
		isx=parseInt(itemsx.value);
		isy=parseInt(itemsy.value);
		ist=isx*isy;
		if(wr){
			if(imgx<=imgy && imgx<defaultx){
				imgy=imgy*(defaultx/imgx);
				imgx=defaultx;
			}else if(imgx>=imgy && imgy<defaulty){
				imgx=imgx*(defaulty/imgy);
				imgy=defaulty;
			}
			ixs=Math.round(imgx/isx);
			iys=Math.round(imgy/isy);
		}else{
			ixs=Math.round(defaultx/isx);
			iys=Math.round(defaulty/isy);
		}
		zx=ixs*isx;
		zy=iys*isy;
		if(!wr){
			ss=(imgx<=imgy)? 'width' : 'height';
			ssv=(ss=='width')? zx : zy;
		}
		box.style.width=((zx+16)+(isx-1))+'px';
		zone.style.width=(zx+(isx-1))+'px';
		zone.style.height=(zy+(isy-1))+'px';
		var html='';
		html+='<ul>';
		for(var i=0,j=0,k=0,max=ist; i<max; i++){
			if(i==max-1){
				html+='<li id="blankblock" style="left:'+((j*ixs)+j)+'px;top:'+((k*iys)+k)+'px;width:'+ixs+'px;height:'+iys+'px;z-index:1;">';
				html+='<div style="height:'+(iys-4)+'px;"><\/div>';
				html+='<\/li>';
			}else{
				html+='<li style="left:'+((j*ixs)+j)+'px;top:'+((k*iys)+k)+'px;width:'+ixs+'px;height:'+iys+'px;z-index:2;"';
				html+=' onmouseover="guidenumber(this)" onmouseout="guidenumber(this,1)">';
					html+='<img src="'+imgsrc+'" style="left:-'+(j*ixs)+'px;top:-'+(k*iys)+'px;';
					if(wr) html+='width:'+zx+'px;height:'+zy+'px;">';
					else html+=ss+':'+ssv+'px;">';
					html+='<div class="guidebg" style="width:'+ixs+'px;height:'+iys+'px;"><\/div>';
					html+='<div class="guide">'+(i+1)+'<\/div>';
				html+='<\/li>';
			}
			if(j==(isx-1)){
				j=0;
				k++;
			}else j++;
		}
		html+='<\/ul>';
		zone.innerHTML=html;
		blockzone=zone.getElementsByTagName('ul')[0];
		blocks=zone.getElementsByTagName('li');
		blankblock=document.getElementById('blankblock');
		blankblock.npos=ist;
		var guides;
		for(var i=0,max=blocks.length-1; i<max; i++){
			guides=blocks[i].getElementsByTagName('div');
			blocks[i].gbg=guides[0];
			blocks[i].g=guides[1];
			blocks[i].no=i+1;
			blocks[i].npos=i+1;
		}
		setmovables();
		mixup();
	}else{
		setTimeout('makegame()',500);
	}
}
function ckminblocks(iobj){
	if(iobj.value){
		if(iobj.value.match(/[0-9]/)){
			if(parseInt(iobj.value)<3) iobj.value=3;
		}else iobj.value=4;
	}
}
var timesi=times.getElementsByTagName('span');
var starttime,tcs,tcm=0,tch=0,setminute=false,timerid;
function timer(reset){
	if(reset){
		for(var i=0; i<3; i++) timesi[i].innerHTML=zeroset(0);
	}else{
		tcs=Math.round(((new Date().getTime()-starttime)/1000)%60);
		if(setminute){
			tcm=tcm+1;
			if(tcm>59){
				tcm=0;
				tch=tch+1;
				timesi[2].innerHTML=zeroset(tcs);
				timesi[1].innerHTML=zeroset(tcm);
				timesi[0].innerHTML=zeroset(tch);
			}else{
				timesi[2].innerHTML=zeroset(tcs);
				timesi[1].innerHTML=zeroset(tcm);
			}
			setminute=false;
		}else{
			if(tcs>=59) setminute=true;
			timesi[2].innerHTML=zeroset(tcs);
		}
		timerid=setTimeout('timer()',1000);
	}
	function zeroset(num){
		return (num<10)? '0'+num : num;
	}
}
function timerstop(){
	clearTimeout(timerid);
}
function updatetimes(zero){
	var nowtimes=parseInt(clicks.innerHTML);
	if(nowtimes==0){
		starttime=new Date().getTime();
		if(!zero) timer();
	}
	clicks.innerHTML=(zero)? 0 : parseInt(clicks.innerHTML)+1;
}
var movables;
function setmovables(){
	var cp=blankblock.npos,cases=[],findit=false;
	if(cp>isx) cases.push(cp-isx);
	if(((cp-1)%isx)!=0) cases.push(cp-1);
	if((cp%isx)!=0 && (cp+1)<=ist) cases.push(cp+1);
	if(cp<=(isx*(isy-1))) cases.push(cp+isx);
	moveables=[];
	for(var i=0,max=ist-1; i<max; i++){
		for(var j=0,jmax=cases.length; j<jmax; j++){
			if(blocks[i].npos==cases[j]){
				blocks[i].onclick=function(){
					updatetimes();
					changeblock(this);
				}
				blocks[i].style.cursor='pointer';
				moveables.push(blocks[i]);
				findit=true;
				break;
			}
		}
		if(!findit){
			blocks[i].onclick=null;
			blocks[i].style.cursor='default';
		}
		findit=false;
	}
}
function mixup(){
	setmsg('섞는 중..');
	var rand,eas,times=ist*level.options[level.selectedIndex].value;
	for(var i=0; i<times; i++){
		eas=moveables.length;
		if(i==times-1){
			if(blankblock.npos!=ist){
				moveables.sort(massort);
				changeblock(moveables[eas-1]);
				i--;
			}else{
				settingcomplete=true;
				mainbtn.value='Remix';
				setmsg();
			}
		}else{
			rand=Math.floor(Math.random()*eas);
			changeblock(moveables[rand]);
		}
	}
}
function massort(a,b){
	return (parseInt(a.style.left)+parseInt(a.style.top))-(parseInt(b.style.left)+parseInt(b.style.top))
}
function changeblock(mb,shake){
	var temp,speed=5,clone=blankblock.cloneNode(true);
	clone.style.left=mb.style.left;
	clone.style.top=mb.style.top;
	blockzone.appendChild(clone);
	mb.style.left=blankblock.style.left;
	mb.style.top=blankblock.style.top;
	blankblock.style.left=clone.style.left;
	blankblock.style.top=clone.style.top;
	blockzone.removeChild(clone);
	temp=blankblock.npos;
	blankblock.npos=mb.npos;
	mb.npos=temp;
	if(settingcomplete){
		if(validategame()){
			setmsg('<strong>DONE!<\/strong>',true);
			timerstop();
            document.getElementById('realbody').style.backgroundImage=`url(${'./비.png'})` 

            document.getElementById('rain').style.backgroundImage=`url(${'../비내리는효과/rain1.png'}),url(${'../비내리는효과/rain2.png'}),url(${'../비내리는효과/rain3.png'})`

            alert("5일차 금주 성공!")
            setTimeout(function() {
             next()
             },4000)


		}
		else setmovables();
	}else{
		setmovables();
	}
}
function validategame(){
	var returnvalue=true;
	for(var i=0,max=blocks.length-1; i<max; i++){
		if(blocks[i].npos!=(i+1)){
			returnvalue=false;
			break;
		}
	}
	return returnvalue;
}
function guidenumber(which,hide){
	if(guide.checked){
		which.gbg.style.display=(!hide)? 'block' : 'none';
		which.g.style.display=(!hide)? 'block' : 'none';
	}
}
function showimage(hide){
	if(!hide && imgsrc!=''){
		var ow=zone.offsetWidth+'px',oh=zone.offsetHeight+'px'
		with(guidediv.style){
			//showimage위치조절하는곳 여기임
			left=(zone.offsetLeft + 4)+'px';
			top=zone.offsetTop +'px';
			width=ow;
			height=oh;
			display='block';
		}
		ssv=(ss=='width')? ow : oh;
		var html='<img src="'+imgsrc+'" style="';
		if(wr) html+='width:'+ow+';height:'+oh+';">';
		else html+=ss+':'+ssv+';">';
		guidediv.innerHTML=html;
		sibtn.value='Hide Image';
		sibtn.onclick=function(){
			showimage(true);
		}
	}else{
		guidediv.style.display='none';
		sibtn.value='Show Image';
		sibtn.onclick=function(){
			showimage();
		}
	}
}
function setmsg(msg,opacity){
	if(msg){
		msgboxin.innerHTML=msg;
		with(msgbox.style){
			left=zone.offsetLeft+'px';
			top=zone.offsetTop+'px';
			width=zone.offsetWidth+'px';
			height=zone.offsetHeight+'px';
			display='block';
		}
		msgbox.className=(opacity)? 'opacity' : '';
		msgboxin.style.marginTop=((msgbox.offsetHeight/2)-(msgboxin.offsetHeight/2))+'px';
	}else{
		msgbox.style.display='none';
	}
}
function setfilediv(hide){
	if(!hide){
		filediv.style.top=(cibtn.offsetTop+cibtn.offsetHeight+1)+'px';
		filediv.style.display='block';
	}else{
		filediv.style.display='none';
		setfilemsg();
	}
}
function setfilemsg(msg){
	if(!msg) filemsg.style.display='none';
	else{
		filemsg.innerHTML=msg;
		filemsg.style.display='block';
	}
}
makegame();
  
  
  
  
  //nav bar button
  
  let backBtn = document.getElementById("backbtn")
  let homeBtn = document.getElementById("homebtn")
  let nextBtn = document.getElementById("nextbtn")
  
  
  function back(){
      location.href=('../6.day4/index.html');
  }
  
  function home(){
      location.href=('../2.메인페이지/index.html');
  }
  
  function next(){
      location.href=('../2.메인페이지/index.html');
  }
  
  
  