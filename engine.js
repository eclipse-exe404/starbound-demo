(function(){
var KEY="starbound-save-v1",CH=window.CHARS,ST=window.STORY,S,pc=0,mode="",L={};
function $(i){return document.getElementById(i)}
ST.forEach(function(n,i){if(n.label)L[n.label]=i});
function load(){try{return JSON.parse(localStorage.getItem(KEY))}catch(e){return null}}
function save(){try{localStorage.setItem(KEY,JSON.stringify({S:S,pc:pc}))}catch(e){}}
function show(id){document.querySelectorAll(".screen").forEach(function(s){s.classList.toggle("on",s.id===id)})}
function fmt(t){return t.replace(/\{name\}/g,S.name)}
function cname(id){return id?(CH[id]?CH[id].name:id):""}
function rel(id){return S.rel[id]||(S.rel[id]={affinity:0,trust:0,respect:0,intimacy:0})}
function applyRel(r){Object.keys(r).forEach(function(id){Object.keys(r[id]).forEach(function(k){rel(id)[k]=(rel(id)[k]||0)+r[id][k]})})}
function setBg(k){S.bg=k;$("bg").style.backgroundImage="url(assets/bg/"+k+".jpg),"+(window.BGS[k]||window.BGS["default"])}
function drawSprites(){
  var st=$("stage");st.innerHTML="";
  Object.keys(S.sp).forEach(function(id){
    var c=CH[id]||{name:id,color:"#888"},ex=S.sp[id],e=document.createElement("div");
    e.className="sprite";e.style.setProperty("--c",c.color);
    var s=document.createElement("span");s.textContent=c.name+" ";
    var sm=document.createElement("small");sm.textContent="("+ex+")";s.appendChild(sm);e.appendChild(s);
    var im=new Image();im.alt=c.name;
    im.onload=function(){e.innerHTML="";e.classList.add("art");e.appendChild(im)};
    im.src="assets/sprites/"+id+"_"+ex+".png";
    st.appendChild(e);
  });
}
function clearChoices(){$("choices").innerHTML=""}
function run(){
  while(pc<ST.length){
    var n=ST[pc];
    if(n.label){pc++;continue}
    if(n.bg){setBg(n.bg);pc++;continue}
    if(n.show){S.sp[n.show]=n.expr||"neutral";drawSprites();pc++;continue}
    if(n.hide){delete S.sp[n.hide];drawSprites();pc++;continue}
    if(n.rel){applyRel(n.rel);pc++;continue}
    if(n.goto){pc=L[n.goto];continue}
    if(n.say){
      clearChoices();mode="say";
      $("who").textContent=cname(n.say[0]);$("text").textContent=fmt(n.say[1]);
      $("hint").style.display="";save();return;
    }
    if(n.choice){choose(n);return}
    if(n.end!==undefined){finish(n.end);return}
    pc++;
  }
  finish("End of demo");
}
function choose(n){
  mode="choice";clearChoices();
  $("who").textContent="";$("text").textContent=n.prompt||"What do you do?";$("hint").style.display="none";
  n.choice.forEach(function(o){
    var b=document.createElement("button");b.className="btn";b.textContent=fmt(o.t);
    b.onclick=function(){if(o.rel)applyRel(o.rel);pc=o.goto?L[o.goto]:pc+1;run()};
    $("choices").appendChild(b);
  });
  save();
}
function finish(msg){
  mode="end";clearChoices();$("who").textContent=msg;$("hint").style.display="none";
  var t=Object.keys(S.rel).map(function(id){var r=S.rel[id];return cname(id)+": affinity "+r.affinity+", trust "+r.trust+", respect "+r.respect+", intimacy "+r.intimacy}).join("\n");
  $("text").style.whiteSpace="pre-line";$("text").textContent="Thanks for playing, Doctor "+S.name+".\n\n"+t;
  var b=document.createElement("button");b.className="btn main";b.textContent="Back to title";
  b.onclick=function(){init();show("title")};$("choices").appendChild(b);
  pc=ST.length;save();
}
function start(){$("text").style.whiteSpace="";setBg(S.bg);drawSprites();show("game");run()}
function init(){$("cont").disabled=!load()}
$("play").onclick=function(){$("nameIn").value="";$("begin").disabled=true;show("name")};
$("back1").onclick=function(){show("title")};
$("nameIn").oninput=function(){$("begin").disabled=!this.value.trim()};
$("begin").onclick=function(){S={name:$("nameIn").value.trim(),rel:{},bg:"default",sp:{}};pc=0;start()};
$("cont").onclick=function(){var d=load();if(d){S=d.S;pc=d.pc;start()}};
$("box").onclick=function(){if(mode==="say"){pc++;run()}};
init();
})();
