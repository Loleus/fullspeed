(()=>{var O=`
<header class="header">
<div class="banner">
  <h1 class="title">F U L L</h1>
  <h1 class="title">SPEED</h1>
</div>
<section class="info">
  <p>Distance: <span>0</span> m</p>
  <p>Speed: <span>0</span> km/h</p>
  <p>Time: <span>0</span> s</p>
  <p>Full Speed: <span>0</span> s</p>
</section>
</header>
<section class="road">
<div class="opponent">
  <div id="op0" class="car"></div>
  <div id="op1" class="car"></div>
  <div id="op2" class="car"></div>
  <div id="op3" class="car"></div>
  <div id="op4" class="car"></div>
</div>
<div class="player">
  <div id="player" class="car"></div>
</div>
<div id='t' class="track"></div>
</section>
<section id='options' class="main">
<div class="select">
  <div id="main">
    <a id="start" class="button">Go on!</a>
    <a id="music" class="button">Music</a>
    <a id="credits" class="button">Credits</a>
    <a class="button" data-toggle-fullscreen>Screen</a>
  </div>
  <div id="result" class="hide">
    <a id="over" class="button">Game Over</a>
  </div>
</div>
</section>
<footer class="footer">
<div class="interface">
    <div class="interface__steer interface__steer--left"><span id="l" class="arrow"></span></div>
    <div class="interface__steer interface__steer--right"><span id="r" class="arrow"></span></div>
    <div class="interface__steer interface__steer--brake"><span id="b" class="arrow"></span></div>
</div>
</footer>
<audio src="./assets/audio/music.ogg" preload="metadata" id="music1S" loop=""></audio>
<audio src="./assets/audio/crash.mp3" preload="metadata" id="crash"></audio>
`,R=O;var p=class{constructor(t){this.m=2147483648,this.a=1103515245,this.c=12345,this.state=t||Math.floor(Math.random()*(this.m-1)),this.tracks=[10,70,130,190,250],this.speedys=[[-520,-320],[160,260],[90,180],[80,120],[55,95]],this.loops=[[-1800,-400],[-600,-400],[-700,-500],[-400,-600],[-800,-350]]}getSpeed(t){return this.nextRange(this.speedys[t][0],this.speedys[t][1])}getNumb(t){return this.nextRange(this.loops[t][0],this.loops[t][1])}nextInt(){return this.state=(this.a*this.state+this.c)%this.m,this.state}nextFloat(){return this.nextInt()/(this.m-1)}nextRange(t,e){let s=e-t,n=this.nextInt()/this.m;return t+Math.floor(n*s)}choice(t){return t[this.nextRange(0,t.length)]}};var o=class{constructor(t){this.speed=0,this.y=0,this.x=0,this.w=35,this.h=89,this.id=t,this.RNG=new p(10)}x0(){return this.x-this.w/2}y0(){return this.y-this.h/2}setx(t){this.x=t}sety(t){this.y=t}getx(){return this.x}gety(){return this.y}};var m=class extends o{constructor(t){super(t),this.car=document.getElementById(`op${this.id}`),this.track=this.RNG.tracks[this.id]}init(){this.speed=this.RNG.getSpeed(this.id),this.loop=this.RNG.getNumb(this.id),this.sety(this.loop),this.setx(this.track)}intersect(t,e){return t.x0()+t.w>e.x0()&&t.x0()<e.x0()+e.w&&t.y0()+(t.h-21)>e.y0()&&t.y0()<e.y0()+(e.h-21)}update(t,e,s){let n=e.spd(),{loop:i,speed:c,rnd:l}=this,h=this.gety(),P=this.getx(),{abs:E}=Math;if(t>=3)if(h<i||E(h)>E(i))this.init(l);else{let d=h+(n-c)/s;this.sety(d)}this.render(P,h)}render(t,e){this.car.style.transform=`translate(${t}px, ${e}px) scale(${this.id!=0?1:-1})`}};var f=class{constructor(){this.wrap=document.body.querySelector(".interface"),this.l=!1,this.r=!1,this.b=!1,this.events=[["mousedown","touchstart"],["mouseup","touchend"]]}init(){this.events[0].forEach(t=>{this.wrap.addEventListener(t,e=>{this.steering(e,!0)},!1)}),this.events[1].forEach(t=>{this.wrap.addEventListener(t,e=>{this.steering(e,!1)},!1)}),document.addEventListener("keydown",t=>{this.steering(t,!0)}),document.addEventListener("keyup",t=>{this.steering(t,!1)})}steering(t,e){t.cancelable&&t.preventDefault(),t.stopPropagation();let s=t.key?t.key:t.target.id;if(s)switch(s){case"l":case"ArrowLeft":this.l=e;break;case"r":case"ArrowRight":this.r=e;break;case"b":case"ArrowDown":this.b=e;break;default:}}};var y=class extends o{constructor(t){super(t),this.car=document.getElementById(`${this.id}`),this.r=0,this.distance=0,this.fullSpeed=0,this.maxSpeed=360,this.startX=250,this.startYpos=130,this.I=new f}counters(t){this.distance+=this.speed*.278/t,this.fullSpeed+=this.speed==this.maxSpeed?1/t:null}newYpos(){return this.startYpos-this.speed/this.maxSpeed*100}spd(){return Math.floor(this.speed)}fSpd(){return Math.floor(this.fullSpeed)}dist(){return Math.floor(this.distance)}update(t,e){let s=this,n=s.spd(),i=s.x,c=s.x<260,l=s.maxSpeed,{l:h,r:P,b:E}=s.I,d=5,I=25,q=32,T=60,G=65,{speed:u,r,x:L}=s,_=h&&n,D=P&&n,F=I/t,$=r>-d,B=r<d,k=Math.round(G/t);e?(_?($?r-=F:r=d*-1,i?L-=k:this.I.l):D?(B?r+=F:r=d,c?L+=k:this.I.r):r!=0&&(r>0?r-=F:r+=F),E?n<=0?u=0:u-=T/t:n<l?u+=q/t:u=l,this.counters(t),this.sety(this.newYpos()),this.setx(L),this.r=r,this.speed=u):(this.speed=0,this.sety(400),this.setx(this.startX)),this.car.style.transform=`translate(${this.x}px, ${this.y}px) rotate(${this.r}deg)`}};var x=class{constructor(){this.disp=[...document.querySelectorAll(".info span")]}render(t,e,s,n){let i=(c,l)=>this.disp[c].textContent=l;i(0,t),i(1,e),i(2,s),i(3,n)}};var v=class{constructor(){this.options=document.getElementById("options"),this.result=document.getElementById("result"),this.main=document.getElementById("main"),this.banner=document.querySelector(".banner")}endSeq(){this.options.classList.remove("hide"),this.result.classList.remove("hide"),this.main.classList.add("hide")}startSeq(){this.banner.style.opacity=1,this.options.classList.remove("hide"),this.result.classList.add("hide"),this.main.classList.remove("hide")}playing(){this.banner.style.opacity=.4,this.options.classList.add("hide")}};var g=class{constructor(){this.start=-174,this.y=this.start,this.stripes=document.getElementById("t").style}update(t,e){let s=this.y;s>=0?s=this.start:s+=t*(e/250),this.render(s),this.y=s}render(t){this.stripes.transform=`translateY(${t}px)`}};var b=class{constructor(){this.music=document.getElementById("music1S"),this.crash=document.getElementById("crash")}init(){this.music.preload,this.music.style.oneLine="none",this.crash.preload,this.crash.style.oneLine="none"}start(){this.music.play()}stop(){this.music.pause(),this.music.currentTime=0,this.crash.play()}};var N=()=>{Element.prototype.requestFullscreen||(Element.prototype.requestFullscreen=Element.prototype.mozRequestFullScreen||Element.prototype.webkitRequestFullscreen||Element.prototype.msRequestFullscreen),document.exitFullscreen||(document.exitFullscreen=document.mozCancelFullScreen||document.webkitExitFullscreen||document.msExitFullscreen),"fullscreenElement"in document||Object.defineProperty(document,"fullscreenElement",{get(){return document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement||null}}),"fullscreenEnabled"in document||Object.defineProperty(document,"fullscreenEnabled",{get(){return document.mozFullScreenEnabled||document.webkitFullscreenEnabled||document.msFullscreenEnabled||!1}})},M=N;var w=class{init(){this.FPS=60,this.snd=!1,M(),this.reset()}reset(){this.deltaTime=0,this.interval=1e3/this.FPS,this.OPP=[],this.RNG={},this.M=new v,this.S=new b,this.P=new y("player"),this.R=new g,this.F=new x;for(let t=0;t<5;t++){let e=new m(`${t}`);e.init(),this.OPP.push(e)}return this.S.init(),this.P.I.init(),this.play=!1,this.time=0,this.startGame()}t(){return Math.floor(this.time)}conditioning(t,e){let s=this.snd;switch(t){case"start":this.play=!0,this.M.playing(),this.lastTime=Date.now(),this.render(),s&&this.S.start();break;case"music":return(i=>{s?(s=!1,i.target.classList.remove("active")):(s=!0,i.target.classList.add("active")),this.snd=s})(e);case"credits":return window.alert("07zglossie@wp.pl");case"over":return this.reset(this.timeout);case"data-toggle-fullscreen":document.fullscreenElement?(e.target.textContent="Screen",e.target.classList.remove("active"),document.exitFullscreen()):(e.target.textContent="Window",e.target.classList.add("active"),document.documentElement.requestFullscreen());break;default:}}startGame(){this.M.startSeq(),this.play=!1,this.render()}setTimeoutLoop(t){this.timeout=setTimeout(()=>{this.render()},t)}render(){let t=Date.now();this.deltaTime=t-this.lastTime;let e=Math.max(this.interval-this.deltaTime,0);this.lastTime=t+e,this.time+=1/this.FPS,this.update(),this.play&&this.setTimeoutLoop(e)}oppUpdate(){for(let t=0;t<this.OPP.length;t++){let e=this.OPP[t];e.update(this.t(),this.P,this.FPS),e.intersect(e,this.P)&&this.endGame()}}update(){this.P.update(this.FPS,this.play),this.oppUpdate(),this.R.update(this.P.spd(),this.interval),this.F.render(this.P.dist(),this.P.spd(),this.t(),this.P.fSpd())}endGame(){this.play=!1,window.clearTimeout(this.timeout),this.snd&&this.S.stop(),this.M.endSeq()}};var S=class{constructor(){this.G=new w,this.wrap=document.body.querySelectorAll(".button")}init(){this.G.init(),this.wrap.forEach(t=>{t.addEventListener("click",e=>{this.menu(e)},!1)})}menu(t){t.cancelable&&t.preventDefault(),t.stopPropagation();let e=t.target.id?t.target.id:"data-toggle-fullscreen";if(e)return this.G.conditioning(e,t)}};var z=document.querySelector(".root");z.innerHTML=R;var A=new S;document.addEventListener("DOMContentLoaded",()=>{A.init()});})();
