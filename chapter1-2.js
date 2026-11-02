window.CHARS={
  palinode:{name:"PALINODE",color:"#4fd8e8",role:"Medical AI",notes:"Warm, intelligent and occasionally witty. Your closest companion in the medical department."},
  emrys:{name:"Captain Emrys",color:"#9aa7b4",role:"Captain, Triton-SS7",hair:"Silver-white",notes:"Wise, patient and quietly authoritative. Carries his worries privately."},
  aldric:{name:"Vice Captain Aldric",color:"#5d6b7a",role:"Vice Captain",hair:"Short-cropped black",eyes:"Gunmetal blue",notes:"Traditional, disciplined and stern. Slow to trust."},
  casmia:{name:"Casmia Yuo",color:"#b48be8",role:"Navigation Specialist",hair:"Long lavender-purple",eyes:"Violet",notes:"Charismatic, playful and emotionally perceptive."},
  dralpha:{name:"Dralpha Yuo",color:"#8a72d6",role:"Pilot",hair:"Long lavender-purple",eyes:"Violet",notes:"Reserved, disciplined and loyal. Prefers actions to words."},
  korrin:{name:"Master Korrin",color:"#8a8a8a",role:"Master Engineer",notes:"Strict, blunt and demanding. A combat veteran who protects his students."},
  tobias:{name:"Tobias Hardy",color:"#4a8a5c",role:"Engineering technician",div:"Civilian",hair:"Long dark green-black",eyes:"Green",notes:"Gentle, thoughtful and shy. Master Korrin\u2019s protégé."},
  kaine:{name:"Kaine Ashborne",color:"#5b6cff",role:"Garrison Commander",div:"Grim Garrison",hair:"Messy dark blue",eyes:"Blue-violet",notes:"Sarcastic, guarded and fiercely loyal. Bionic forearms."},
  sebastian:{name:"Sebastian Weiss",color:"#3a4a9a",role:"Lieutenant",div:"The Imperials",hair:"Long dark indigo, ponytail",eyes:"Clear blue",notes:"Composed, analytical and proud. Investigating a prisoner."},
  amorentia:{name:"Amorentia Grey",color:"#7a3a9a",role:"Intergalactic Diplomatic Relations Officer",hair:"Dark violet-black",eyes:"Purple",notes:"Witty, rebellious and politically aware."}
};
window.BGS={
  "default":"linear-gradient(160deg,#2a2622,#0d0b0a)",
  arrival:"linear-gradient(160deg,#4a4036,#1a1512 70%)",
  medbay:"linear-gradient(160deg,#5c6a68,#232b2a 70%)",
  bridge:"linear-gradient(160deg,#3d4652,#11151b 70%)",
  navigation:"linear-gradient(160deg,#3a3550,#12101c 70%)",
  flightdeck:"linear-gradient(160deg,#47423a,#15130f 70%)",
  engineering:"linear-gradient(160deg,#5a3d22,#1a0f07 70%)",
  barracks:"linear-gradient(160deg,#3b3b3b,#101010 70%)",
  containment:"linear-gradient(160deg,#4a2a24,#150a08 70%)",
  diplomacy:"linear-gradient(160deg,#40283f,#140b14 70%)",
  observation:"linear-gradient(160deg,#1c2433,#05070c 70%)"
};
window.STORY=[
/* ARRIVAL */
{bg:"arrival"},
{say:["","The shuttle ramp retracts behind you with a heavy hiss. The docking bay of the Triton-SS7 smells of metal, coolant and old coffee. Your orders read: Medical Officer."]},
{show:"palinode",expr:"neutral"},
{say:["palinode","Welcome aboard, Doctor {name}. I am PALINODE, your medical assistant, and for the foreseeable future, your second pair of eyes."]},
{say:["palinode","Your shift officially starts tomorrow. The Captain thought you should not stumble through your first day, so I have been asked to give you the tour."]},
{prompt:"PALINODE’s light pulses, waiting.",choice:[
  {t:"Lead the way. I want to know this ship inside out.",rel:{palinode:{affinity:1}}},
  {t:"Keep it short. I learn by doing.",rel:{palinode:{respect:1}}}
]},
{say:["palinode","Understood. Short where I can, thorough where it matters."]},
{say:["palinode","The basics first. The Triton-SS7 belongs to the Imperial Army of Galactic Forces. It is built for long-distance travel, with sharp navigation and serious defences. Most of the fleet considers it the safest ship they have."]},
{say:["palinode","Its current mission is a prison transport. Several dangerous prisoners are held in containment. You will treat them as patients, the same as anyone else aboard."]},
{say:["palinode","You are the ship’s medical officer, and I run the rest. Shall we begin at home?"]},
/* MEDICAL */
{hide:"palinode"},
{bg:"medbay"},
{show:"palinode",expr:"neutral"},
{say:["palinode","Medical department. Infirmary, diagnostic lab, research bay. When something goes wrong on this ship, it arrives here first."]},
{say:["palinode","I keep the records, watch vital signs and run diagnostics. I also nag people. The nagging is optional, but effective."]},
/* BRIDGE */
{bg:"bridge"},
{show:"emrys",expr:"calm"},
{show:"aldric",expr:"stern"},
{say:["palinode","The command bridge. Captain Emrys commands the Triton. At his side, Vice Captain Aldric Stonewarden."]},
{say:["emrys","Doctor {name}. Welcome aboard. I trust PALINODE has not frightened you off yet."]},
{say:["aldric","Protocol says new officers report to command before touring the ship. Still, I will allow it, this once."]},
{say:["emrys","Aldric keeps this ship in line. He will tell you that is a compliment. If anything troubles you aboard, medical or otherwise, my door is open."]},
{hide:"emrys"},{hide:"aldric"},
{say:["palinode","He worries, quietly. It is his least subtle habit."]},
/* NAVIGATION */
{bg:"navigation"},
{show:"casmia",expr:"smile"},
{say:["casmia","A fresh face! You must be the new doctor. Casmia Yuo, navigation. Tell me you like gossip."]},
{prompt:"Casmia leans on the console, grinning.",choice:[
  {t:"I like knowing who I work with.",rel:{casmia:{affinity:1}}},
  {t:"I am here to work, not gossip.",rel:{casmia:{respect:1}}}
]},
{say:["casmia","Either way, you will fit in. Everyone aboard gossips. Some just pretend they do not."]},
{say:["palinode","Casmia plots our course through deep space. If the stars were a language, she would be fluent."]},
{hide:"casmia"},
/* FLIGHT DECK */
{bg:"flightdeck"},
{show:"dralpha",expr:"neutral"},
{say:["dralpha","Dralpha Yuo. Pilot."]},
{say:["dralpha","Casmia is my sister. She has probably already told you everything about me."]},
{say:["palinode","She has not. I was monitoring."]},
{say:["dralpha","…Good."]},
{say:["palinode","The Yuo twins specifically requested this ship. Best and safest in the fleet."]},
{say:["dralpha","It was the only ship worth flying."]},
{hide:"dralpha"},
/* ENGINEERING */
{bg:"engineering"},
{show:"korrin",expr:"stern"},
{show:"tobias",expr:"shy"},
{say:["korrin","Medical. Stay behind the yellow line. The reactor does not care about your rank."]},
{say:["palinode","Master Korrin runs engineering. He is blunt, strict, and quietly responsible for keeping every one of us alive."]},
{say:["korrin","Do not tell her that."]},
{say:["tobias","Oh, um, hello. Tobias Hardy. Engineering. I am Master Korrin’s protégé. Not a soldier, just, uh, a technician."]},
{say:["palinode","Tobias is better than he believes."]},
{say:["tobias","PALINODE!"]},
{prompt:"Tobias pushes his glasses up, flushed.",choice:[
  {t:"I will need an engineer I can trust. Glad to meet you.",rel:{tobias:{trust:1}}},
  {t:"Do not worry. Everyone starts out nervous.",rel:{tobias:{affinity:1}}}
]},
{say:["tobias","Thank you. I will try to be less nervous next time."]},
{hide:"korrin"},{hide:"tobias"},
/* BARRACKS */
{bg:"barracks"},
{show:"kaine",expr:"guarded"},
{say:["kaine","So you are the new doctor. Kaine Ashborne, commander of Grim Garrison. If you are here to lecture me about my arm, take a number."]},
{say:["palinode","Commander, you have an appointment tomorrow."]},
{say:["kaine","I had an appointment yesterday too. It is a pattern."]},
{say:["palinode","A pattern of absence."]},
{prompt:"Kaine folds his metal-armoured arms, daring you to respond.",choice:[
  {t:"Then I will come and find you.",rel:{kaine:{trust:1}}},
  {t:"Skip it again and I will file a report.",rel:{kaine:{respect:1}}}
]},
{say:["kaine","Hah. We will see who gets tired first."]},
{hide:"kaine"},
/* CONTAINMENT */
{bg:"containment"},
{show:"sebastian",expr:"composed"},
{say:["sebastian","Lieutenant Sebastian Weiss, leader of the Imperials. This corridor is restricted. Whatever PALINODE promised you, it does not apply here."]},
{say:["palinode","The Lieutenant is investigating one of our prisoners, an operative working for Pyraeus, the man the entire Army wants found."]},
{say:["sebastian","An investigation I would prefer to run without an audience. You will report to me before examining any prisoner."]},
{prompt:"Sebastian watches you with cool, measured eyes.",choice:[
  {t:"Understood, Lieutenant. I will follow protocol.",rel:{sebastian:{affinity:1}}},
  {t:"My patients come first, Lieutenant. Even prisoners.",rel:{sebastian:{respect:1}}}
]},
{say:["sebastian","Noted. Do not make me regret clearing you."]},
{hide:"sebastian"},
/* DIPLOMACY */
{bg:"diplomacy"},
{show:"amorentia",expr:"smirk"},
{say:["amorentia","Amorentia Grey, Diplomatic Relations. Before you say it, yes, a diplomat on a military ship is as awkward as it sounds."]},
{say:["palinode","Amorentia knows more about the politics of this fleet than anyone aboard."]},
{say:["amorentia","And I enjoy making that everyone’s problem."]},
{prompt:"Amorentia studies you, one eyebrow raised.",choice:[
  {t:"Politics affects people’s health too. I want to hear it.",rel:{amorentia:{respect:1}}},
  {t:"I am here for medicine, not politics.",rel:{amorentia:{trust:1}}}
]},
{say:["amorentia","Interesting. Most people just say what the uniform tells them to."]},
{hide:"amorentia"},
/* OBSERVATION DECK */
{bg:"observation"},
{say:["","The last stop is quiet. Beyond the glass, stars drift past in slow, cold silence."]},
{say:["palinode","The observation deck. Crew come here when they need peace. I suspect you will too."]},
{say:["palinode","That is the ship and its people. Rest well, Doctor {name}. Tomorrow, the real work begins."]},
{show:"palinode",expr:"glitch"},
{say:["palinode","One last thing. My records show I greeted you yesterday. We have never met. I am sure it is a clock error."]},
{end:"End of Chapter 1"}
];
