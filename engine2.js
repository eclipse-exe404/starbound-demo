(function(){
var KEY="starbound-save-v2",SL="starbound-slot-",CH=window.CHARS,ST=window.STORY,S,pc=0,mode="",from="title",L={};
function $(i){return document.getElementById(i)}
ST.forEach(function(n,i){if(n.label)L[n.label]=i});
function rd(k){try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}}
function wr(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
function save(){wr(KEY,{S:S,pc:pc,t:Date.now()})}
function show(id){document.querySelectorAll(".screen").forEach(function(s){s.classList.toggle("on",s.id===id)})}
function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!==undefined)e.textContent=txt;return e}
function fmt(t){return t.replace(/\{name\}/g,S.name)}
function cname(id){return id?(CH[id]?CH[id].name:id):""}
function rel(id){return S.rel[id]||(S.rel[id]={affinity:0,trust:0,respect:0,intimacy:0})}
function applyRel(r){Object.keys(r).forEach(function(id){Object.keys(r[id]).forEach(function(k){rel(id)[k]=(rel(id)[k]||0)+r[id][k]})})}
function setBg(k){S.bg=k;$("bg").style.backgroundImage="url(assets/bg/"+k+".jpg),"+(window.BGS[k]||window.BGS["default"])}
function drawSprites(){
  var st=$("stage");st.innerHTML="";
  Object.keys(S.sp).forEach(function(id){
    var c=CH[id]||{name:id,color:"#888"},ex=S.sp[id],e=el("div","sprite");
    e.style.setProperty("--c",c.color);
    var s=el("span",null,c.name+" ");s.appendChild(el("small",null,"("+ex+")"));e.appendChild(s);
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
    if(n.show){S.sp[n.show]=n.expr||"neutral";S.met=S.met||{};S.met[n.show]=1;drawSprites();pc++;continue}
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
    var b=el("button","mbtn",fmt(o.t));
    b.onclick=function(){if(o.rel)applyRel(o.rel);pc=o.goto?L[o.goto]:pc+1;run()};
    $("choices").appendChild(b);
  });
  save();
}
function finish(msg){
  mode="end";clearChoices();$("who").textContent=msg;$("hint").style.display="none";
  var t=Object.keys(S.rel).map(function(id){var r=S.rel[id];return cname(id)+": affinity "+r.affinity+", trust "+r.trust+", respect "+r.respect+", intimacy "+r.intimacy}).join("\n");
  $("text").style.whiteSpace="pre-line";$("text").textContent="Thanks for playing, Doctor "+S.name+".\n\n"+t;
  var b=el("button","mbtn main","Back to title");
  b.onclick=function(){init();show("title")};$("choices").appendChild(b);
  pc=ST.length;save();
}
function start(){$("text").style.whiteSpace="";setBg(S.bg);drawSprites();show("game");run()}
/* save records */
function pct(d){return Math.round(Math.min(d.pc,ST.length)/ST.length*100)}
function openFiles(src){from=src;$("filesTitle").textContent=src==="game"?"Save or load":"Load game";renderSlots();show("files")}
function renderSlots(){
  var w=$("slots");w.innerHTML="";
  [1,2,3].forEach(function(n){
    var d=rd(SL+n),c=el("div","slot");
    c.appendChild(el("p","mono","Record 0"+n));
    c.appendChild(el("p","info",d?"Dr. "+d.S.name+" - "+pct(d)+"% of Chapter 1":"Empty record"));
    if(d&&d.t)c.appendChild(el("p","mono",new Date(d.t).toLocaleDateString()));
    var r=el("div","row");
    if(from==="game"){var sv=el("button","sbtn","Save");sv.onclick=function(){wr(SL+n,{S:S,pc:pc,t:Date.now()});renderSlots()};r.appendChild(sv)}
    if(d){var ld=el("button","sbtn","Load");ld.onclick=function(){S=d.S;pc=d.pc;start()};r.appendChild(ld)}
    c.appendChild(r);w.appendChild(c);
  });
}
/* crew files */
function metAll(){
  var m={};
  [rd(KEY),rd(SL+1),rd(SL+2),rd(SL+3)].forEach(function(d){if(d&&d.S&&d.S.met)Object.keys(d.S.met).forEach(function(k){m[k]=1})});
  return m;
}
function openCrew(){
  var m=metAll(),w=$("roster");w.innerHTML="";$("card").innerHTML="";
  Object.keys(CH).forEach(function(id){
    var b=el("button","sbtn",m[id]?CH[id].name:"Locked file");b.disabled=!m[id];
    b.onclick=function(){card(id)};w.appendChild(b);
  });
  show("crewScr");
}
function card(id){
  var c=CH[id],k=$("card");k.innerHTML="";
  var p=el("div","portrait",c.name.charAt(0)),im=new Image();im.alt=c.name;
  im.onload=function(){p.textContent="";p.appendChild(im)};im.src="assets/portraits/"+id+".png";
  k.appendChild(p);
  var f=el("div","fields");
  [["Name",c.name],["Position",c.role],["Division",c.div],["Hair",c.hair],["Eyes",c.eyes],["Notes",c.notes]].forEach(function(r){
    if(r[1]){var line=el("p");line.appendChild(el("b",null,r[0]+": "));line.appendChild(document.createTextNode(r[1]));f.appendChild(line)}
  });
  k.appendChild(f);
}
function init(){$("cont").disabled=!rd(KEY);$("load").disabled=![1,2,3].some(function(n){return rd(SL+n)})}
$("play").onclick=function(){$("nameIn").value="";$("begin").disabled=true;show("name")};
$("back1").onclick=function(){show("title")};
$("nameIn").oninput=function(){$("begin").disabled=!this.value.trim()};
$("begin").onclick=function(){S={name:$("nameIn").value.trim(),rel:{},bg:"default",sp:{},met:{}};pc=0;start()};
$("cont").onclick=function(){var d=rd(KEY);if(d){S=d.S;pc=d.pc;start()}};
$("load").onclick=function(){openFiles("title")};
$("btnCrew").onclick=openCrew;
$("menuBtn").onclick=function(){openFiles("game")};
$("filesBack").onclick=function(){show(from==="game"?"game":"title");if(from==="title")init()};
$("crewBack").onclick=function(){show("title")};
$("box").onclick=function(){if(mode==="say"){pc++;run()}};
init();
})();
