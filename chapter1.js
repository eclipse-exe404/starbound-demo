window.CHARS={
  palinode:{name:"PALINODE",color:"#4fd8e8"},
  kaine:{name:"Kaine Ashborne",color:"#5b6cff"}
};
window.BGS={
  "default":"linear-gradient(160deg,#0e2a33,#06141a)",
  infirmary:"linear-gradient(160deg,#cfeff2,#5aa6b2 55%,#1b4953)"
};
window.STORY=[
{bg:"infirmary"},
{show:"palinode",expr:"neutral"},
{say:["palinode","Good morning, Doctor {name}. Medical bay systems are online, and your first shift begins in ten minutes."]},
{say:["palinode","I have reviewed the crew files for you. One piece of advice, free of charge: Commander Ashborne of the Grim Garrison has a long history of ignoring medical advice."]},
{prompt:"How do you respond?",choice:[
  {t:"Then I will make my advice impossible to ignore.",rel:{palinode:{affinity:1}}},
  {t:"I would rather judge him myself.",rel:{palinode:{respect:1}}}
]},
{say:["palinode","Understood. I am here to assist, Doctor, not to decide for you."]},
{say:["palinode","One oddity before you start. The ship logs list your arrival for tomorrow. I am certain it is a clock error."]},
{hide:"palinode"},
{say:["","The infirmary doors hiss open. A man with messy dark-blue hair strides in, one hand clamped around his left forearm. Beneath the torn sleeve, metal flickers."]},
{show:"kaine",expr:"guarded"},
{say:["kaine","Do not look at me like that. The ship’s computer nagged me until I came."]},
{say:["palinode","It was a polite reminder, Commander. Your servo readings have been unstable for six days."]},
{say:["kaine","See? Nagging."]},
{prompt:"Kaine is already edging back toward the door.",choice:[
  {t:"Sit down, Commander. Let me see the arm.",rel:{kaine:{respect:1}},goto:"firm"},
  {t:"Does it hurt? You can tell me the truth.",rel:{kaine:{trust:1}},goto:"gentle"}
]},
{label:"firm"},
{say:["kaine","Straight to orders. Fine. But if I get dizzy, that is on you."]},
{goto:"join"},
{label:"gentle"},
{say:["kaine","…Only when I grip things. Which is most of the time."]},
{goto:"join"},
{label:"join"},
{say:["","He drops onto the examination bed. Up close, the bionic forearm is scored with burns, and one servo twitches like a nervous pulse."]},
{say:["kaine","Go on. Tell me I am being reckless. You said the same thing yesterday, in the corridor. Almost word for word."]},
{say:["","You have never met him before today."]},
{show:"palinode",expr:"glitch"},
{say:["palinode","Doctor, I have no record of that conversation."]},
{prompt:"Kaine watches your face carefully.",choice:[
  {t:"I think you are mistaken, Commander.",rel:{kaine:{respect:1}}},
  {t:"Tell me exactly what I said.",rel:{kaine:{trust:1}}}
]},
{end:"End of Chapter 1 demo"}
];
