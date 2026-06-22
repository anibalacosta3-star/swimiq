import { useState, useEffect, useRef } from "react";

const TAGS = {
  boys: {
    "10U":   {"50 Free":{q:31.99,b:30.49},"100 Free":{q:71.99,b:68.49},"200 Free":{q:159.99,b:152.49},"100 Back":{q:79.99,b:75.99},"100 Breast":{q:89.99,b:85.49},"100 Fly":{q:79.99,b:75.99},"200 IM":{q:169.99,b:161.49}},
    "11-12": {"50 Free":{q:25.99,b:24.69},"100 Free":{q:56.99,b:54.19},"200 Free":{q:124.99,b:118.99},"500 Free":{q:339.99,b:323.49},"100 Back":{q:65.99,b:62.79},"200 Back":{q:143.99,b:136.99},"100 Breast":{q:73.99,b:70.39},"200 Breast":{q:162.99,b:154.99},"100 Fly":{q:64.99,b:61.69},"200 Fly":{q:143.99,b:136.99},"200 IM":{q:134.99,b:128.49},"400 IM":{q:289.99,b:275.99}},
    "13-14": {"50 Free":{q:23.59,b:22.49},"100 Free":{q:51.99,b:49.49},"200 Free":{q:113.99,b:108.49},"500 Free":{q:309.99,b:294.49},"100 Back":{q:59.99,b:57.09},"200 Back":{q:130.99,b:124.49},"100 Breast":{q:67.99,b:64.69},"200 Breast":{q:148.99,b:141.69},"100 Fly":{q:57.99,b:55.19},"200 Fly":{q:128.99,b:122.69},"200 IM":{q:122.99,b:116.99},"400 IM":{q:263.99,b:250.99}},
  },
  girls: {
    "10U":   {"50 Free":{q:33.99,b:32.29},"100 Free":{q:74.99,b:71.49},"200 Free":{q:164.99,b:156.99},"100 Back":{q:82.99,b:78.99},"100 Breast":{q:91.99,b:87.49},"100 Fly":{q:82.99,b:78.99},"200 IM":{q:175.99,b:167.49}},
    "11-12": {"50 Free":{q:27.49,b:26.19},"100 Free":{q:59.99,b:56.99},"200 Free":{q:130.99,b:124.49},"500 Free":{q:349.99,b:332.99},"100 Back":{q:68.99,b:65.69},"200 Back":{q:149.99,b:142.49},"100 Breast":{q:77.99,b:74.19},"200 Breast":{q:169.99,b:161.49},"100 Fly":{q:68.99,b:65.69},"200 Fly":{q:149.99,b:142.49},"200 IM":{q:139.99,b:132.99},"400 IM":{q:299.99,b:284.99}},
    "13-14": {"50 Free":{q:25.99,b:24.79},"100 Free":{q:56.99,b:54.29},"200 Free":{q:124.99,b:118.99},"500 Free":{q:329.99,b:313.99},"100 Back":{q:64.99,b:61.89},"200 Back":{q:139.99,b:132.99},"100 Breast":{q:73.99,b:70.39},"200 Breast":{q:161.99,b:153.89},"100 Fly":{q:63.99,b:60.89},"200 Fly":{q:139.99,b:132.99},"200 IM":{q:132.99,b:126.49},"400 IM":{q:284.99,b:270.99}},
  },
};

const ALL_EVENTS = ["50 Free","100 Free","200 Free","400 Free","500 Free","800 Free","1000 Free","1650 Free","100 Back","200 Back","100 Breast","200 Breast","100 Fly","200 Fly","200 IM","400 IM"];

const CHANNELS = [
  {name:"Effortless Swimming",url:"youtube.com/@EffortlessSwimming",icon:"🇦🇺",desc:"Best overall technique channel with underwater footage."},
  {name:"Skills N Talents",url:"youtube.com/@SkillsNTalents",icon:"🏆",desc:"#1 ranked swim channel. Step-by-step for all strokes."},
  {name:"The Race Club",url:"youtube.com/@TheRaceClub",icon:"🥇",desc:"Founded by Olympian Gary Hall Jr. Elite technique."},
  {name:"GoSwim",url:"youtube.com/@GoSwimTV",icon:"📚",desc:"Massive drill library for every stroke and distance."},
  {name:"USA Swimming",url:"youtube.com/@USASwimming",icon:"🇺🇸",desc:"Official governing body. Race analysis and coaching."},
  {name:"Cody Miller",url:"youtube.com/@CodyMillerAdventures",icon:"🥈",desc:"Olympic bronze medalist. Real training and mindset."},
];

const EXERCISES = [
  {id:"plank",name:"Plank Hold",sets:"3",reps:"30-45s",gear:"Bodyweight",ageMin:8,cue:"Squeeze glutes and belly. Hips don't sag or pike.",search:"plank hold swimmers technique"},
  {id:"deadbug",name:"Dead Bug",sets:"3",reps:"8 each side",gear:"Bodyweight",ageMin:8,cue:"Press lower back flat into floor. Slow and controlled.",search:"dead bug exercise swimmers core"},
  {id:"flutter",name:"Flutter Kick Dry",sets:"3",reps:"30s",gear:"Bodyweight",ageMin:8,cue:"Lie flat, hands under hips. Small fast kicks from the hip. Toes pointed.",search:"flutter kick dryland swimmers"},
  {id:"ytwl",name:"YTW-L Shoulder",sets:"3",reps:"10 each",gear:"Bodyweight",ageMin:8,cue:"Face down, thumbs up. Make Y-T-W-L shapes. Squeeze shoulder blades.",search:"YTWL exercise swimmers shoulder"},
  {id:"glute",name:"Glute Bridge",sets:"3",reps:"15",gear:"Bodyweight",ageMin:8,cue:"Feet flat, drive hips up, squeeze hard at top.",search:"glute bridge swimmers kick power"},
  {id:"sqjump",name:"Squat Jumps",sets:"3",reps:"10",gear:"Bodyweight",ageMin:8,cue:"Squat to 90 degrees, explode up, land softly.",search:"squat jumps swimmers explosive"},
  {id:"calf",name:"Calf Raises",sets:"3",reps:"20",gear:"Bodyweight",ageMin:8,cue:"Slow up, hold 1s at top, slow down.",search:"calf raises swimmers ankle"},
  {id:"hipflex",name:"Hip Flexor Stretch",sets:"2",reps:"30s each",gear:"Bodyweight",ageMin:8,cue:"Kneeling lunge, push hips forward.",search:"hip flexor stretch swimmers"},
  {id:"ankflex",name:"Ankle Circles",sets:"2",reps:"20 each way",gear:"Bodyweight",ageMin:8,cue:"Rotate ankles in full circles both ways.",search:"ankle flexibility swimmers"},
];

const STROKE_TIPS = {
  freestyle: [
    "Press your chest slightly downward to lift your hips into a flat horizontal position.",
    "Eyes look straight down — never up at the wall. Every inch you lift your head drops your hips 4-6 inches.",
    "Body rotates 45 degrees each side like a log. Flat swimmers generate no power.",
    "High elbow catch: after entry, rotate palm outward and down — elbow stays HIGH above your wrist.",
    "Reach forward before pulling. Extension is free speed — don't waste it.",
    "Exhale continuously underwater. Never hold your breath between breaths.",
    "Bilateral breathing: alternate sides every 3 strokes to balance your stroke.",
    "Count strokes from flags every practice. The flags are 5 yards from the wall.",
    "Tuck TIGHT in flip turns. Chin to chest, knees to chest, feet over fast.",
    "5 dolphin kicks minimum off every wall — these are the fastest yards in the race.",
    "6-beat kick for sprints, 2-beat for distance. Kick from the hip, not the knee.",
    "Thumb brushes thigh at finish — full extension for maximum propulsion.",
  ],
  backstroke: [
    "Pinky finger enters first — sets up the most powerful catch position.",
    "Head neutral, ears below surface, eyes looking straight up.",
    "Body rotates 45-50 degrees side to side — hip-driven rotation is your power.",
    "Keep hips high at surface. If hips drop, your head is up.",
    "Count strokes from backstroke flags every single practice until automatic.",
    "Thumb exits first on recovery — opposite of the pinky-first entry.",
    "Squeeze your lat throughout the entire pull — your lat is the engine.",
  ],
  breaststroke: [
    "Pull and kick NEVER overlap — this is the single most important rule.",
    "Sequence: PULL → breathe → shoot arms → glide → KICK → glide → repeat.",
    "Heels to glutes, not knees forward. Knees forward creates a wall of drag.",
    "Elbows squeeze TOGETHER at finish before shooting forward.",
    "The glide after the kick is free speed — rushing it costs 0.3-0.5 seconds.",
    "One dolphin kick legal during every pullout — use it every wall.",
    "Knee width shoulder-width or narrower — wider = more drag.",
  ],
  butterfly: [
    "Two dolphin kicks per arm cycle — ALWAYS. Losing the second kick collapses your fly.",
    "Kick 1 (small): fires as hands enter. Kick 2 (big): fires as hands exit.",
    "Hands enter at shoulder-width — not crossed, not too wide.",
    "Head goes DOWN before hands enter — reduces drag and keeps hips up.",
    "Chin barely clears the surface to breathe — every inch you lift adds drag.",
    "Recovery arms skim CLOSE to the surface — low and fast.",
    "The dolphin kick wave starts at your chest, travels through hips, snaps at feet.",
  ],
  im: [
    "Butterfly is first — go out controlled or you will be destroyed on breaststroke.",
    "Breaststroke is where IM races are won and lost — not butterfly.",
    "Backstroke split tells the story of your butterfly split.",
    "Fly-to-Back: two-hand touch, drop shoulder, push off on your back.",
    "Back-to-Breast: roll to front on last stroke, two-hand open turn.",
    "Practice every IM transition at least 20 times before each major meet.",
  ],
  mental: [
    "Visualize your race 3 times the night before: once perfect, once with adversity, once comeback.",
    "Nerves and excitement are physiologically identical — relabel anxiety as excitement.",
    "Box breathing: inhale 4, hold 4, exhale 4, hold 4. Three cycles before the block.",
    "Focus on what you control: your warm-up, your routine, your first 25.",
    "A bad warm-up does not predict a bad race — reset when you step on the block.",
    "Compare yourself to who you were last month — not the person in lane 5.",
    "The swimmers who improve fastest are the most coachable, not the most talented.",
  ],
  dryland: [
    "Core strength means rotational stability — not six-pack abs.",
    "Ankle flexibility determines kick effectiveness more than leg strength.",
    "Daily ankle circles: 20 each direction, both feet, every single day.",
    "Hip flexor tightness drags your legs down — stretch daily.",
    "Squat jumps translate directly to off-the-block power and wall push-off.",
    "Rotator cuff strengthening is not optional — it prevents shoulder injury.",
    "Dynamic stretching before practice, static stretching after.",
  ],
};

const NUTRITION_TIPS = {
  "10U": {
    daily: [
      ["3 meals + 2 snacks daily","Growing bodies burn fuel constantly. Never skip meals.","🍽️ Oatmeal + banana for breakfast · PB&J + apple for lunch · Chicken rice bowl for dinner · Cheese + crackers as snacks"],
      ["5 colors of fruits and vegetables","Each color provides different vitamins your body needs.","🥦 Red (tomatoes) · Orange (carrots) · Green (spinach) · Blue (blueberries) · Yellow (bananas)"],
      ["Whole grains at every meal","White bread spikes your blood sugar and crashes it. Whole grains give steady energy.","🌾 White bread → whole wheat · White rice → brown rice · Regular pasta → whole wheat"],
      ["Calcium for bone strength","Swimming builds bones — calcium makes them stronger.","🥛 3 servings dairy daily: 1 cup milk + 1 yogurt + 1 slice cheese"],
      ["Lean protein at every meal","Protein repairs muscles after every practice.","🍗 Chicken · Eggs · Greek yogurt · Peanut butter · Beans"],
      ["Healthy fats for brain and joints","Omega-3 fats reduce inflammation and keep joints healthy.","🥑 Avocado on toast · Walnuts · Salmon once a week · Olive oil"],
      ["Iron prevents fatigue","Low iron makes you exhausted even when rested.","🥩 Lean red meat 2x/week · Spinach · Beans · Pair with OJ to absorb better"],
    ],
    hydration: [
      ["8-10 cups of water daily","Kids often don't feel thirsty until already dehydrated.","💧 2 cups breakfast · 2 cups school · 2 cups practice · 2 cups dinner"],
      ["Drink 1-2 cups 30 minutes before practice","Pre-hydrating gives your body a head start.","⏰ 30 min before = 1-2 cups water · Sip every 15-20 min during practice"],
      ["Chocolate milk after practice","Perfect protein-to-carb ratio for recovery. Not just a treat.","🍫 1-2 cups chocolate milk within 30 minutes of finishing practice"],
      ["NO energy drinks — ever","Red Bull, Monster, Prime are not safe for swimmers under 16.","❌ Not even zero sugar versions. Stick to water, milk, and 100% juice"],
      ["Coconut water after hard practices","Replaces electrolytes naturally after sweating.","🥥 1 cup coconut water + 1 banana = perfect post-practice recovery"],
      ["Water-rich foods count too","20% of daily water can come from food.","🍉 Watermelon · Cucumber · Oranges · Strawberries · Celery"],
      ["Signs of dehydration","Catch it early before it affects your swimming.","🟡 Headache · Extra tired · Muscle cramps · Dark yellow urine = drink now"],
    ],
    preMeet: [
      ["Night before: pasta dinner","Pasta gives your body 10-12 hours to convert to stored energy.","🍝 Pasta + marinara + grilled chicken + garlic bread + 2 cups water"],
      ["Morning: oatmeal or eggs 2-3 hours before","Eating too close causes cramps. Too long and you're empty.","🥚 Oatmeal with banana · Scrambled eggs with toast · Avoid greasy food"],
      ["Pack your snack bag the night before","Don't forget anything important on meet morning.","🎒 Banana · Granola bars · PB crackers · Gummy bears · Sports drink · Water"],
      ["Between events: simple carbs only","Quick energy, easy digestion — not protein or fat.","⚡ Banana · Gummy bears · Dates · Orange slices · Honey packets"],
      ["Stay hydrated all day","Meet days are long and hot — keep your bottle in hand.","💧 1 cup water every 30 minutes minimum all day"],
      ["30-45 min before race: light snack","Top off energy without it sitting in your stomach.","🍌 Half banana · 2-3 dates · A few crackers with honey"],
      ["No new foods on meet day","This rule is absolute — your stomach will remind you why.","⚠️ Stick to foods you've eaten before practices only"],
    ],
  },
};

const DAILY_MISSIONS = [
  {id:"log_today",icon:"📝",text:"Log a practice time today",xp:20},
  {id:"read_tip",icon:"📖",text:"Read one technique tip",xp:10},
  {id:"check_tags",icon:"⭐",text:"Check your TAGS progress",xp:10},
  {id:"do_dryland",icon:"💪",text:"Complete 3 dryland exercises",xp:25},
  {id:"drink_water",icon:"💧",text:"Track your hydration today",xp:10},
  {id:"coach_question",icon:"🤖",text:"Ask your AI coach one question",xp:15},
];

const BADGES_DEF = [
  {id:"first_log",icon:"🌊",name:"First Splash",desc:"Logged your first time"},
  {id:"five_events",icon:"⚡",name:"Five Events",desc:"Logged 5 different events"},
  {id:"ten_logs",icon:"📊",name:"Data Driven",desc:"Logged 10 sessions"},
  {id:"pb_three",icon:"🔥",name:"On Fire",desc:"Set 3 personal bests"},
  {id:"all_strokes",icon:"🏆",name:"Complete Swimmer",desc:"Logged all 4 strokes"},
  {id:"sub_bonus",icon:"🌟",name:"Bonus Crusher",desc:"Hit a TAGS bonus time"},
  {id:"streak7",icon:"💎",name:"Week Warrior",desc:"7-day training streak"},
];

function getWorkout(profile, times, tagsP, dayOfYear, manualFocus) {
  const age = parseInt(profile.age) || 13;
  const tagsKeys = Object.keys(tagsP);
  const gaps = tagsKeys.map(function(s) {
    const t = times[s]; const tags = tagsP[s];
    if (!t || !tags || t <= tags.q) return null;
    return {s:s, gap:t-tags.q};
  }).filter(Boolean).sort(function(a,b){return a.gap-b.gap;});
  const targetEvent = manualFocus || (gaps[0] ? gaps[0].s : tagsKeys[0] || "100 Free");
  const st = targetEvent.includes("Back") ? "backstroke" : targetEvent.includes("Breast") ? "breaststroke" : targetEvent.includes("Fly") ? "butterfly" : targetEvent.includes("IM") ? "im" : "freestyle";
  const focuses = ["speed","endurance","technique","race_pace","kick","pull","recovery"];
  const focus = focuses[dayOfYear % 7];
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const base = age <= 10 ? 1200 : age <= 12 ? 2000 : age <= 14 ? 2800 : 3200;
  const isIM = st === "im";
  let name="", sets=[], yards=base, intensity="Moderate";
  const mainInt = targetEvent.includes("200") ? "3:30" : targetEvent.includes("100") ? "1:45" : ":55";
  if (focus==="speed") {
    name="Speed & Power — "+targetEvent; intensity="Very High";
    sets=["400 warm-up: 100 free / 100 "+st+" / 4x50 build","8x25 @ :25 — ALL OUT SPRINT, 30 sec rest between each","4x50 "+(isIM?"IM order":st)+" @ :50 — race pace, full rest","6x"+(targetEvent.includes("200")?"100":"50")+" "+(isIM?"IM":st)+" @ "+(targetEvent.includes("200")?"1:40":":50")+" — descend 1-6","8x25 underwater dolphin kick @ :40","4x25 explosive start practice @ :45","200 easy cool down"];
    yards=base+300;
  } else if (focus==="endurance") {
    name="Endurance Base — "+targetEvent; intensity="Moderate-Hard";
    sets=["600 warm-up easy: 200 free / 4x100 choice @ 1:50","3x"+(targetEvent.includes("500")?"500":"200")+" "+(isIM?"IM":st)+" @ "+(targetEvent.includes("500")?"7:30":"3:20")+" — hold same pace all three","8x50 "+(isIM?"IM order":st)+" @ :55 — negative split each one","400 pull with buoy — arms only, feel every catch","4x100 @ 1:40 — count strokes every length","200 kick — toes pointed","200 easy cool down"];
    yards=base+500;
  } else if (focus==="technique") {
    name="Technique Mastery — "+targetEvent; intensity="Low-Moderate";
    sets=["300 warm-up easy",isIM?"8x50 IM order @ 1:10 — focus on transitions":"12x25 drill @ :40 — 4 reps each of 3 drills","4x"+(targetEvent.includes("200")?"200":"100")+" "+(isIM?"IM":st)+" @ "+(targetEvent.includes("200")?"3:30":"2:00")+" — count strokes every length","8x25 turns focus @ :35 — perfect streamline, 5 dolphin kicks minimum","4x50 @ 1:00 — apply drill technique at race effort","4x25 starts @ :40 — perfect entry every one","200 easy cool down"];
    yards=base-300;
  } else if (focus==="race_pace") {
    name="Race Simulation — "+targetEvent; intensity="Very High";
    sets=["500 warm-up: 200 free / 4x50 "+(isIM?"IM order":st)+" @ :55 building","2x"+targetEvent+" @ "+mainInt+" — FULL RACE SIMULATION: race start, pacing, turns","6x50 @ :50 — alternate race pace / easy recovery","4x25 @ :28 — MAXIMUM EFFORT, 1 min rest each","4x"+(targetEvent.includes("200")?"100":"50")+" @ "+(targetEvent.includes("200")?"1:40":":55")+" — negative split every one","8x25 underwater kick @ :40","300 easy cool down"];
    yards=base+400;
  } else if (focus==="kick") {
    name="Kick Power — "+targetEvent; intensity="Moderate-High";
    sets=["400 warm-up easy","8x50 kick @ 1:00 — "+(st==="breaststroke"?"breast kick, heels to glutes, narrow knees":st==="butterfly"?"dolphin kick with board, full body wave":"flutter kick with board, kick from hip, toes pointed"),"4x100 @ 1:45 — maximum kick throughout, do not let it die","8x25 vertical kick @ :45 — no hands, kick only","4x50 kick no board @ :55 — streamline arms, race pace","8x25 underwater dolphin kick @ :35","200 easy cool down"];
    yards=base;
  } else if (focus==="pull") {
    name="Pull Strength — "+targetEvent; intensity="Moderate";
    sets=["400 warm-up easy","400 pull with buoy — high elbow catch, full extension","8x50 pull @ :55 — odd: FAST / even: technique, count strokes","4x100 "+(isIM?"IM":st)+" @ 1:50 — feel forearm stack before pulling","4x50 single-arm "+(isIM?"freestyle":st==="breaststroke"?"freestyle":st)+" @ 1:05 — full finish every stroke","8x25 @ :35 — push past hip EVERY stroke","200 easy cool down"];
    yards=base;
  } else {
    name="Active Recovery"; intensity="Easy";
    sets=["500 easy warm-up — any stroke","8x50 @ 1:15 — relaxed, focus on stroke count","4x100 choice @ 2:00 — comfortable pace","200 backstroke easy — decompress shoulders","4x50 kick @ 1:10 — easy, keep moving","4x25 technique @ :40 — drill your weakest point slowly","200 easy cool down"];
    yards=base-500;
  }
  const tips = {speed:"Speed work needs FULL rest. No rest = endurance not speed.",endurance:"Zero stops. If tired, slow down — don't stop.",technique:"Slow is smooth. Smooth is fast. Drill slow, race fast.",race_pace:"Your body needs to know race pace. Make it hurt a little.",kick:"30-40% more kick power is available — today you access it.",pull:"The catch is where power is born. Feel the water stack.",recovery:"Your body gets faster during rest — not training."};
  const nextFocuses = ["Speed & Power","Endurance Base","Technique Mastery","Race Simulation","Kick Power","Pull Strength","Active Recovery"];
  return {name, sets, yards:Math.max(800,yards), intensity, targetEvent, dayName:dayNames[dayOfYear%7], tip:tips[focus]||"", nextWorkout:nextFocuses[(dayOfYear+1)%7]};
}

function parseTime(s) {
  if (!s) return null;
  s = String(s).trim();
  if (s.includes(":")) { const p = s.split(":"); return parseFloat(p[0])*60+parseFloat(p[1]); }
  return parseFloat(s);
}
function fmt(s) {
  if (!s||isNaN(s)) return "—";
  if (s>=60) { const m=Math.floor(s/60); return m+":"+(s%60).toFixed(2).padStart(5,"0"); }
  return s.toFixed(2);
}
function getStatusColor(t,q,b) {
  if (!t) return "#3a5a7a";
  if (t<=b) return "#ffd700";
  if (t<=q) return "#00ffaa";
  const d=t-q;
  if (d<=2) return "#ff9f43";
  return "#ff6b6b";
}
function getStatusLabel(t,q,b) {
  if (!t) return null;
  if (t<=b) return "🌟 BONUS";
  if (t<=q) return "✅ QUALIFIED";
  return (t-q).toFixed(2)+"s to go";
}
const LS="swimiq_v6";
function load() { try { return JSON.parse(localStorage.getItem(LS))||{}; } catch(e) { return {}; } }
function save(d) { try { localStorage.setItem(LS,JSON.stringify(d)); } catch(e) {} }
const iStyle = {display:"block",width:"100%",marginBottom:4,background:"rgba(13,27,42,0.95)",border:"1px solid rgba(77,184,255,0.25)",color:"#e8f4ff",borderRadius:10,padding:"10px 12px",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};
function Card({children,style}) { return <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(77,184,255,0.1)",marginBottom:12,...style}}>{children}</div>; }
function Lbl({children}) { return <div style={{fontSize:11,color:"#7aa8cc",letterSpacing:0.5,marginBottom:4,marginTop:8}}>{children}</div>; }
function Chip({on,onClick,children,color}) { return <button onClick={onClick} style={{padding:"7px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:on?(color||"#1a5fff"):"rgba(255,255,255,0.07)",color:on?"#fff":"#7aa8cc"}}>{children}</button>; }
function PBar({value,max,color}) { const w=Math.max(4,Math.min(100,(value/(max||100))*100)); return <div style={{height:6,background:"rgba(255,255,255,0.07)",borderRadius:3,marginTop:6}}><div style={{width:w+"%",height:"100%",borderRadius:3,background:color||"linear-gradient(90deg,#1a5fff,#00ffaa)",transition:"width 0.5s"}} /></div>; }

const TABS = [{id:"home",icon:"🏠",l:"Home"},{id:"log",icon:"📸",l:"Log"},{id:"train",icon:"💪",l:"Train"},{id:"skills",icon:"🎬",l:"Skills"},{id:"meets",icon:"📅",l:"Meets"},{id:"progress",icon:"📈",l:"Stats"},{id:"squad",icon:"👥",l:"Squad"},{id:"coach",icon:"🤖",l:"Coach"},{id:"nutrition",icon:"🥗",l:"Fuel"},{id:"family",icon:"❤️",l:"Family"}];

export default function SwimIQ() {
  const [tab,setTab]=useState("home");
  const [setup,setSetup]=useState(()=>!!(load().profile?.name?.length>1));
  const [profile,setProfile]=useState(()=>load().profile||{name:"",age:13,gender:"boys",ageGroup:"13-14",mode:"competitive"});
  const [times,setTimes]=useState(()=>load().times||{});
  const [logs,setLogs]=useState(()=>load().logs||[]);
  const [xp,setXP]=useState(()=>load().xp||0);
  const [squad,setSquad]=useState(()=>load().squad||[]);
  const [cl,setCl]=useState(()=>load().cl||{});
  const [meets,setMeets]=useState(()=>load().meets||[]);
  const [goals,setGoals]=useState(()=>load().goals||[]);
  const [missions,setMissions]=useState(()=>load().missions||{});
  const [toast,setToast]=useState(null);
  const [lSt,setLSt]=useState("");
  const [lTm,setLTm]=useState("");
  const [lDt,setLDt]=useState(new Date().toISOString().split("T")[0]);
  const [lMt,setLMt]=useState("");
  const pRef=useRef(null);
  const [pStep,setPStep]=useState("idle");
  const [pPrev,setPPrev]=useState(null);
  const [pFile,setPFile]=useState(null);
  const [pRes,setPRes]=useState(null);
  const [pErr,setPErr]=useState("");
  const [aiQ,setAiQ]=useState("");
  const [aiA,setAiA]=useState("");
  const [aiLoad,setAiLoad]=useState(false);
  const [trainView,setTrainView]=useState("dryland");
  const [exOpen,setExOpen]=useState(null);
  const [manualFocus,setManualFocus]=useState(null);
  const [skillStroke,setSkillStroke]=useState("freestyle");
  const [skillView,setSkillView]=useState("library");
  const [tipIdx,setTipIdx]=useState(0);
  const [nutrTab,setNutrTab]=useState("daily");
  const [nutrIdx,setNutrIdx]=useState(0);
  const [nutrExpanded,setNutrExpanded]=useState(null);
  const [sN,setSN]=useState("");
  const [sEv,setSEv]=useState("");
  const [sTm,setSTm]=useState("");
  const [mName,setMName]=useState("");
  const [mDate,setMDate]=useState("");
  const [mLoc,setMLoc]=useState("");
  const [mEvents,setMEvents]=useState([]);
  const [gEvent,setGEvent]=useState("");
  const [gTarget,setGTarget]=useState("");
  const [gDeadline,setGDeadline]=useState("");
  const [nextMeet,setNextMeet]=useState("");
  const [splitEvent,setSplitEvent]=useState("");
  const [splitTimes,setSplitTimes]=useState(["","","","","","","","",""]);
  const [splitResult,setSplitResult]=useState(null);
  const [convEvent,setConvEvent]=useState("100 Free");
  const [convTime,setConvTime]=useState("");
  const [parentCodes,setParentCodes]=useState(()=>load().parentCodes||[]);
  const [newCode,setNewCode]=useState("");
  const [newChildName,setNewChildName]=useState("");
  const [selectedChild,setSelectedChild]=useState(0);
  const [viewMode,setViewMode]=useState("swimmer");

  const tagsP=(TAGS[profile.gender]&&TAGS[profile.gender][profile.ageGroup])||{};
  const tagsKeys=Object.keys(tagsP);
  const todayKey=new Date().toISOString().split("T")[0];
  const age=parseInt(profile.age)||13;
  const nutrAge=age<=10?"10U":age<=12?"11-12":age<=14?"13-14":"adult";
  const dayOfYear=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000);
  const workout=getWorkout(profile,times,tagsP,dayOfYear,manualFocus);

  useEffect(()=>{save({profile,times,logs,xp,squad,cl,meets,goals,missions,parentCodes});},[profile,times,logs,xp,squad,cl,meets,goals,missions,parentCodes]);

  function notify(msg,color){setToast({msg,color:color||"#00ffaa"});setTimeout(()=>setToast(null),3200);}
  function addXP(n,r){setXP(p=>p+n);notify("+"+n+" XP — "+r,"#ffd700");}

  const streak=(function(){let c=0;const d=new Date();for(let i=0;i<60;i++){const k=d.toISOString().split("T")[0];if(Object.values(cl[k]||{}).some(Boolean))c++;else if(i>0)break;d.setDate(d.getDate()-1);}return c;})();
  const level=Math.floor(xp/200)+1;
  const lvlPct=((xp%200)/200*100).toFixed(0);
  const lvlNames=["Tadpole","Minnow","Lane 4","Competitor","Qualifier","Finalist","All-Star","Elite","Champion","Legend"];
  const lvlName=lvlNames[Math.min(level-1,9)];
  const qualified=tagsKeys.filter(s=>times[s]&&tagsP[s]&&times[s]<=tagsP[s].q);
  const earned=BADGES_DEF.filter(b=>{
    if(b.id==="first_log")return logs.length>=1;
    if(b.id==="five_events")return Object.keys(times).length>=5;
    if(b.id==="ten_logs")return logs.length>=10;
    if(b.id==="pb_three")return logs.filter(e=>e.isPB).length>=3;
    if(b.id==="all_strokes"){const s=Object.keys(times);return ["Free","Back","Breast","Fly"].every(st=>s.some(k=>k.includes(st)));}
    if(b.id==="sub_bonus")return logs.some(e=>e.isBonus);
    if(b.id==="streak7")return streak>=7;
    return false;
  });
  const todayMissions=missions[todayKey]||{};
  const missionsDone=DAILY_MISSIONS.filter(m=>todayMissions[m.id]).length;
  const taperDays=(function(){if(!nextMeet)return null;return Math.ceil((new Date(nextMeet)-new Date())/86400000);})();
  const taperPhase=taperDays===null?null:taperDays>14?"Build Phase":taperDays>7?"Taper":taperDays>3?"Peak":taperDays>0?"Race Week!":"MEET DAY!";
  const taperColor=taperDays===null?"#7aa8cc":taperDays>14?"#4db8ff":taperDays>7?"#ffd700":taperDays>3?"#ff9f43":"#00ffaa";
  const COURSE_FACTORS={"100 Free":{lcm:1.09,scm:1.04},"200 Free":{lcm:1.08,scm:1.03},"100 Back":{lcm:1.10,scm:1.05},"200 Back":{lcm:1.09,scm:1.04},"100 Breast":{lcm:1.08,scm:1.04},"200 Breast":{lcm:1.07,scm:1.03},"100 Fly":{lcm:1.10,scm:1.05},"200 Fly":{lcm:1.09,scm:1.04},"200 IM":{lcm:1.09,scm:1.04},"400 IM":{lcm:1.08,scm:1.03},"50 Free":{lcm:1.11,scm:1.05},"500 Free":{lcm:1.07,scm:1.03}};

  function doLog(){
    const secs=parseTime(lTm);
    if(!secs||!lSt){notify("Pick an event and enter a time!","#ff6b6b");return;}
    const tags=tagsP[lSt];
    // ALWAYS keep fastest — never overwrite a better time
    const existingBest=times[lSt];
    const isPB=!existingBest||secs<existingBest;
    const isBonus=!!(tags&&secs<=tags.b);
    const isQual=!!(tags&&secs<=tags.q);
    if(isPB)setTimes(p=>({...p,[lSt]:secs}));
    else notify("Time logged but your best ("+fmt(existingBest)+") is still faster 💪","#4db8ff");
    setLogs(p=>[{stroke:lSt,time:secs,date:lDt,meet:lMt,isPB,isBonus,id:Date.now()},...p]);
    setLTm("");setLMt("");
    setMissions(p=>({...p,[todayKey]:{...p[todayKey],log_today:true}}));
    if(isPB&&isBonus)addXP(150,"BONUS time! 🌟");
    else if(isPB&&isQual)addXP(100,"TAGS qualified! 🎯");
    else if(isPB)addXP(50,"New personal best! 🔥");
    else addXP(15,"Time logged 💧");
  }

  function handlePhoto(e){
    const f=e.target.files&&e.target.files[0];
    if(!f)return;
    setPFile(f);setPRes(null);setPErr("");setPStep("preview");
    const r=new FileReader();
    r.onload=function(ev){setPPrev(ev.target.result);};
    r.readAsDataURL(f);
  }
  function resetPhoto(){setPStep("idle");setPPrev(null);setPFile(null);setPRes(null);setPErr("");if(pRef.current)pRef.current.value="";}

  async function scanPhoto(){
    if(!pFile)return;
    setPStep("scanning");

    // Normalize event names from any format to SwimIQ standard
    function normalizeEvent(raw) {
      if (!raw) return null;
      const r = raw.toLowerCase().replace(/boys|girls|men|women|&o|mixed|open|meter|metre|yard|yd|m\b/gi,"").replace(/\s+/g," ").trim();
      const map = [
        {keys:["50 free","50 fr","50free"],out:"50 Free"},
        {keys:["100 free","100 fr","100free"],out:"100 Free"},
        {keys:["200 free","200 fr","200free"],out:"200 Free"},
        {keys:["500 free","500 fr","500free"],out:"500 Free"},
        {keys:["1000 free","1000 fr"],out:"1000 Free"},
        {keys:["1650 free","1650 fr","1650free","mile"],out:"1650 Free"},
        {keys:["100 back","100 bk","100back","100 backstroke"],out:"100 Back"},
        {keys:["200 back","200 bk","200back","200 backstroke"],out:"200 Back"},
        {keys:["100 breast","100 br","100breast","100 breaststroke"],out:"100 Breast"},
        {keys:["200 breast","200 br","200breast","200 breaststroke"],out:"200 Breast"},
        {keys:["50 fly","50 butterfly","50fly","50 fl"],out:"50 Fly"},
        {keys:["100 fly","100 butterfly","100fly","100 fl"],out:"100 Fly"},
        {keys:["200 fly","200 butterfly","200fly","200 fl"],out:"200 Fly"},
        {keys:["200 im","200im","200 individual medley","200 i.m."],out:"200 IM"},
        {keys:["400 im","400im","400 individual medley","400 i.m."],out:"400 IM"},
      ];
      for (const entry of map) {
        for (const key of entry.keys) {
          if (r.includes(key)) return entry.out;
        }
      }
      return null;
    }

    try{
      const b64=await new Promise(function(res,rej){const r=new FileReader();r.onload=function(){res(r.result.split(",")[1]);};r.onerror=rej;r.readAsDataURL(pFile);});
      const resp=await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5",max_tokens:800,system:'You are extracting swim meet results from a screenshot. Return ONLY a valid JSON array with no other text. Each item must have: event (the swim event name exactly as shown), time (the swimmer\'s time as a string like "54.23" or "1:02.45"), meet (meet name or null), date (YYYY-MM-DD or null). Example: [{"event":"50 Free","time":"35.29","meet":"SWAT Summer Bash","date":"2026-05-17"}]. If no times found return [].',messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:pFile.type||"image/jpeg",data:b64}},{type:"text",text:"Extract all swim times from this meet results screenshot. Return only the JSON array."}]}]})});
      const data=await resp.json();
      const raw=data.content&&data.content.find(function(x){return x.type==="text";});
      const parsed=JSON.parse((raw?raw.text:"[]").replace(/```json|```/g,"").trim());
      if(!Array.isArray(parsed)||!parsed.length){setPErr("No times found. Try a clearer screenshot.");setPStep("preview");}
      else{
        const mapped=parsed.map(function(r){
          const normalized=normalizeEvent(r.event)||r.event;
          return {...r, event:normalized, selected:true, recognized:!!tagsP[normalized]};
        });
        setPRes(mapped);setPStep("review");
      }
    }catch(e){setPErr("Scan failed — try again.");setPStep("preview");}
  }

  function importPhotos(){
    const toImport=(pRes||[]).filter(function(r){return r.selected;});
    if(!toImport.length){notify("Select at least one time","#ff6b6b");return;}
    const newT={...times};const newE=[];
    toImport.forEach(function(r){
      const secs=parseTime(r.time);if(!secs)return;
      const tags=tagsP[r.event];
      // ALWAYS keep the fastest time — never replace a better time with a slower one
      const existingBest=newT[r.event];
      const isPB=!existingBest||secs<existingBest;
      const isBonus=!!(tags&&secs<=tags.b);
      if(isPB)newT[r.event]=secs;
      // Always log the session even if not a PB
      newE.push({stroke:r.event,time:secs,date:r.date||todayKey,meet:r.meet||"Photo import",isPB,isBonus,id:Date.now()+Math.random()});
    });
    setTimes(newT);setLogs(p=>[...newE,...p]);
    const xpE=newE.reduce(function(a,e){return a+(e.isBonus?150:e.isPB?50:15);},0);
    setXP(p=>p+xpE);setPStep("done");
    const pbs=newE.filter(e=>e.isPB).length;
    notify("Imported "+toImport.length+" times!"+(pbs>0?" "+pbs+" new PBs! 🔥":"")+" +"+xpE+" XP","#00ffaa");
  }

  async function askCoach(q){
    setAiLoad(true);setAiA("");

    // Build complete athlete profile for the AI
    const eventHistory=tagsKeys.map(function(s){
      const t=times[s];const tg=tagsP[s];if(!t||!tg)return null;
      const gap=(t-tg.q).toFixed(2);
      const pct=((t-tg.q)/tg.q*100).toFixed(1);
      return s+": best="+fmt(t)+(t<=tg.b?" (BONUS ✅)":t<=tg.q?" (QUALIFIED ✅)":(" — "+gap+"s from cut, "+pct+"% away"));
    }).filter(Boolean).join("\n");

    // Recent meet history
    const recentMeets=logs.slice(0,15).map(function(l){
      return l.date+" "+l.stroke+": "+fmt(l.time)+(l.meet?" at "+l.meet:"")+(l.isPB?" (PB)":"");
    }).join("\n");

    // Progression analysis per event
    const progression=tagsKeys.map(function(s){
      const eventLogs=logs.filter(l=>l.stroke===s).sort((a,b)=>new Date(a.date)-new Date(b.date));
      if(eventLogs.length<2)return null;
      const first=eventLogs[0];const last=eventLogs[eventLogs.length-1];
      const drop=(first.time-last.time).toFixed(2);
      return s+": dropped "+drop+"s over "+eventLogs.length+" swims ("+fmt(first.time)+" → "+fmt(last.time)+")";
    }).filter(Boolean).join("\n");

    const systemPrompt=`You are Bob Bowman — Michael Phelps' legendary coach — helping ${profile.name}, age ${profile.age}, ${profile.gender==="boys"?"male":"female"}, ${profile.ageGroup} age group, competing in Texas Age Group Swimming (TAGS). You have trained the greatest swimmer in history and now you are applying that same relentless, detail-obsessed coaching philosophy to help this young swimmer reach their full potential.

YOUR COACHING PHILOSOPHY:
- Every race has a story told in splits. Identify exactly where time is being lost — the start, the first 25, the turn, the back half, the finish.
- Technical precision matters more than effort. One mechanical fix can drop more time than months of extra yardage.
- Mental preparation is as important as physical. Phelps visualized every race thousands of times.
- Train your weaknesses obsessively. Champion swimmers practice what they're bad at, not just what they're good at.
- Turns and underwater dolphins are free speed. Most age groupers waste 1-2 seconds per wall.
- The high elbow catch is the foundation of every great swimmer's pull. Check it first, always.
- Negative splitting wins races. Going out too fast costs more than it gains.

ATHLETE DATA:
Name: ${profile.name}
Age: ${profile.age} | Gender: ${profile.gender} | Age Group: ${profile.ageGroup}
Primary Goal: ${profile.mode}

CURRENT BEST TIMES vs TAGS STANDARDS:
${eventHistory||"No times logged yet"}

RECENT MEET HISTORY (last 15 swims):
${recentMeets||"No recent meets"}

TIME PROGRESSION (improvement over season):
${progression||"Not enough data yet"}

YOUR RESPONSE STYLE:
- Be direct, specific, and actionable. No generic advice.
- Reference his ACTUAL times and events by name.
- When analyzing a race, break it down by split phase: start (0-15m), first turn, back half, finish.
- Give the ONE most important drill or fix he should do THIS WEEK.
- Be encouraging but honest — Phelps' coach never sugar-coated weakness.
- Use emojis strategically. Keep response under 280 words but pack it with value.
- End every response with one specific workout set he should do tomorrow related to what you just told him.`;

    try{
      const r=await fetch("/api/coach",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5",max_tokens:1200,system:systemPrompt,messages:[{role:"user",content:q}]})});
      const d=await r.json();
      const block=d.content&&d.content.find(function(x){return x.type==="text";});
      setAiA(block?block.text:"Coach unavailable — try again!");
      setMissions(p=>({...p,[todayKey]:{...p[todayKey],coach_question:true}}));
    }catch(e){setAiA("Error: "+e.message);}
    setAiLoad(false);
  }

  function toggleCL(id){setCl(function(p){const day=p[todayKey]||{};return {...p,[todayKey]:{...day,[id]:!day[id]}};});}
  function isCL(id){return !!(cl[todayKey]&&cl[todayKey][id]);}

  const nameCode=(profile.name||"SWIM").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4)||"SWIM";
  const numCode=String(((profile.name||"X").length*37+parseInt(profile.age||0)*13+99)).slice(-4);
  const familyCode=nameCode+"-"+numCode;

  function fixExistingTimes() {
    const eventMap = [
      {keys:["50 free","50 fr","50free"],out:"50 Free"},
      {keys:["100 free","100 fr","100free"],out:"100 Free"},
      {keys:["200 free","200 fr","200free"],out:"200 Free"},
      {keys:["500 free","500 fr","500free"],out:"500 Free"},
      {keys:["100 back","100 bk","100back"],out:"100 Back"},
      {keys:["200 back","200 bk","200back"],out:"200 Back"},
      {keys:["100 breast","100 br","100breast"],out:"100 Breast"},
      {keys:["200 breast","200 br","200breast"],out:"200 Breast"},
      {keys:["50 fly","50 butterfly","50fly","50 fl"],out:"50 Fly"},
      {keys:["100 fly","100 butterfly","100fly","100 fl"],out:"100 Fly"},
      {keys:["200 fly","200 butterfly","200fly"],out:"200 Fly"},
      {keys:["200 im","200im","200 individual"],out:"200 IM"},
      {keys:["400 im","400im","400 individual"],out:"400 IM"},
    ];
    function normalize(raw) {
      const r=raw.toLowerCase().replace(/boys|girls|men|women|&o|mixed|open|meter|metre|yard|\byd\b|\bm\b|13|14|11|12|10|split/gi,"").replace(/\s+/g," ").trim();
      for (const entry of eventMap) {
        for (const key of entry.keys) {
          if (r.includes(key)) return entry.out;
        }
      }
      return null;
    }
    const newTimes={};
    const newLogs=logs.map(function(log) {
      const fixed=normalize(log.stroke);
      if (fixed && fixed!==log.stroke) {
        if (!newTimes[fixed] || log.time < newTimes[fixed]) newTimes[fixed]=log.time;
        return {...log, stroke:fixed};
      }
      if (!fixed && tagsP[log.stroke]) newTimes[log.stroke]=log.time;
      return log;
    });
    // merge with existing valid times
    const merged={...times,...newTimes};
    setTimes(merged);
    setLogs(newLogs);
    notify("Times fixed and mapped to TAGS events! ✅","#00ffaa");
  }

  function saveParentCodes(codes){
    setParentCodes(codes);
    const existing=load();existing.parentCodes=codes;save(existing);
  }
  function addChildCode(){
    if(!newCode.trim()||!newChildName.trim()){notify("Enter both name and code","#ff6b6b");return;}
    const updated=[...parentCodes,{name:newChildName.trim(),code:newCode.trim().toUpperCase(),addedAt:todayKey}];
    saveParentCodes(updated);setNewChildName("");setNewCode("");
    notify(newChildName+" added! 👨‍👩‍👦","#c084fc");
  }

  // Skill tips
  const strokeTips=STROKE_TIPS[skillStroke]||[];
  const todayTipIdx=dayOfYear%strokeTips.length;

  // Nutrition tips
  const nutrData=(NUTRITION_TIPS["10U"]&&NUTRITION_TIPS["10U"][nutrTab])||[];
  const nutrTip=nutrData[nutrIdx%nutrData.length];

  if(!setup)return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:420,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:80,marginBottom:8}}>🏊</div>
          <h1 style={{fontSize:42,fontWeight:900,margin:"0 0 4px",background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SwimIQ</h1>
          <div style={{fontSize:11,color:"#4db8ff",letterSpacing:3,fontWeight:700,marginBottom:4}}>TRAIN SMART. SWIM FAST.</div>
        </div>
        <Lbl>Your Name</Lbl>
        <input placeholder="e.g. Alex" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))} style={iStyle}/>
        <Lbl>Age</Lbl>
        <input type="number" placeholder="13" value={profile.age} onChange={e=>setProfile(p=>({...p,age:e.target.value}))} style={iStyle}/>
        <Lbl>Gender</Lbl>
        <div style={{display:"flex",gap:8,marginBottom:4}}>
          {["boys","girls"].map(g=><Chip key={g} on={profile.gender===g} onClick={()=>setProfile(p=>({...p,gender:g}))}>{g==="boys"?"👦 Boy":"👧 Girl"}</Chip>)}
        </div>
        <Lbl>Age Group</Lbl>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>
          {["10U","11-12","13-14","15-18","Adult"].map(g=><Chip key={g} on={profile.ageGroup===g} onClick={()=>setProfile(p=>({...p,ageGroup:g}))}>{g}</Chip>)}
        </div>
        <Lbl>Primary Goal</Lbl>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>
          {[["competitive","🏆 Compete"],["tags","⭐ TAGS"],["recreational","🌊 Fitness"],["technique","🎯 Technique"],["masters","🧓 Masters"]].map(item=><Chip key={item[0]} on={profile.mode===item[0]} onClick={()=>setProfile(p=>({...p,mode:item[0]}))}>{item[1]}</Chip>)}
        </div>
        <button onClick={()=>{if(profile.name.trim())setSetup(true);else notify("Enter your name first!","#ff6b6b");}} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:17,cursor:"pointer",fontFamily:"inherit"}}>Let's Go! 🚀</button>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628,#060e1a)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff"}}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#0d1b2a",border:"1.5px solid "+toast.color,color:toast.color,padding:"10px 22px",borderRadius:12,fontWeight:700,zIndex:9999,fontSize:14,whiteSpace:"nowrap"}}>{toast.msg}</div>}

      <div style={{padding:"12px 16px 0",position:"sticky",top:0,background:"rgba(8,13,24,0.97)",backdropFilter:"blur(12px)",zIndex:100,borderBottom:"1px solid rgba(77,184,255,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:28}}>🏊</div>
            <div>
              <div style={{fontSize:20,fontWeight:900,background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>SwimIQ</div>
              <div style={{fontSize:9,color:"#7aa8cc"}}>Hey {profile.name} 👋 · <span onClick={()=>{if(window.confirm("Reset profile? This clears all data.")){localStorage.removeItem("swimiq_v6");window.location.reload();}}} style={{color:"#ff6b6b",cursor:"pointer",textDecoration:"underline"}}>Reset</span></div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:"#4db8ff",fontWeight:700}}>Lvl {level} · {lvlName}</div>
            <div style={{width:80,height:5,background:"rgba(255,255,255,0.08)",borderRadius:3,marginTop:3}}><div style={{width:lvlPct+"%",height:"100%",borderRadius:3,background:"linear-gradient(90deg,#1a5fff,#00ffaa)"}}/></div>
            <div style={{fontSize:9,color:"#7aa8cc",marginTop:2}}>{xp} XP</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:10}}>
          {[{v:Object.keys(times).length,l:"Times"},{v:qualified.length,l:"TAGS ✓",c:"#00ffaa"},{v:earned.length,l:"Badges",c:"#ffd700"},{v:streak,l:"Streak 🔥",c:"#ff9f43"},{v:missionsDone,l:"Missions",c:"#a78bfa"}].map(function(s){return(
            <div key={s.l} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"5px 3px",textAlign:"center",border:"1px solid rgba(77,184,255,0.1)"}}>
              <div style={{fontSize:15,fontWeight:900,color:s.c||"#4db8ff"}}>{s.v}</div>
              <div style={{fontSize:7,color:"#7aa8cc"}}>{s.l}</div>
            </div>
          );})}
        </div>
        <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:8}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"6px 8px",borderRadius:9,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:"inherit",background:tab===t.id?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:tab===t.id?"#fff":"#7aa8cc"}}>{t.icon} {t.l}</button>)}
        </div>
      </div>

      <div style={{padding:"12px 16px 100px"}}>

        {tab==="home"&&<>
          {Object.keys(times).some(k=>!tagsP[k])&&<div onClick={fixExistingTimes} style={{background:"rgba(255,159,67,0.12)",border:"1px solid rgba(255,159,67,0.4)",borderRadius:12,padding:"12px 16px",marginBottom:12,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div><div style={{fontSize:13,fontWeight:800,color:"#ff9f43"}}>⚠️ Times need to be mapped</div><div style={{fontSize:11,color:"#7aa8cc",marginTop:2}}>Tap to fix — connects your scanned times to TAGS events</div></div>
            <div style={{fontSize:20}}>🔧</div>
          </div>}
          <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))",border:"1px solid rgba(77,184,255,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#4db8ff",fontWeight:700,marginBottom:6}}>🏁 NEXT MEET COUNTDOWN</div>
            <input type="date" value={nextMeet} onChange={e=>setNextMeet(e.target.value)} style={{...iStyle,marginBottom:0,fontSize:12,padding:"6px 10px"}}/>
            {taperDays!==null&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
              <div style={{fontSize:11,color:"#7aa8cc"}}>Phase: <span style={{color:taperColor,fontWeight:700}}>{taperPhase}</span></div>
              <div style={{fontSize:28,fontWeight:900,color:taperColor}}>{taperDays>0?taperDays+" days":"🎉 TODAY!"}</div>
            </div>}
          </Card>
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:11,color:"#a78bfa",fontWeight:700,marginBottom:6}}>⚡ TODAY'S MISSIONS</div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#7aa8cc",marginBottom:6}}>
              <span>{missionsDone}/{DAILY_MISSIONS.length} complete</span>
              <span style={{color:"#a78bfa",fontWeight:700}}>+{DAILY_MISSIONS.filter(m=>todayMissions[m.id]).reduce((a,m)=>a+m.xp,0)} XP</span>
            </div>
            <PBar value={missionsDone} max={DAILY_MISSIONS.length} color="linear-gradient(90deg,#a78bfa,#4db8ff)"/>
            <div style={{marginTop:10}}>
              {DAILY_MISSIONS.map(function(m){
                const done=!!todayMissions[m.id];
                return(<div key={m.id} onClick={()=>{if(!done){setMissions(p=>({...p,[todayKey]:{...p[todayKey],[m.id]:true}}));addXP(m.xp,m.text+" ✓");}}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:9,marginBottom:5,cursor:done?"default":"pointer",background:done?"rgba(0,255,170,0.06)":"rgba(255,255,255,0.03)",border:"1px solid "+(done?"rgba(0,255,170,0.2)":"rgba(255,255,255,0.06)")}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:done?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",fontWeight:900,flexShrink:0}}>{done?"✓":""}</div>
                  <div style={{flex:1,fontSize:12,color:done?"#7aa8cc":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{m.icon} {m.text}</div>
                  <div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>+{m.xp}</div>
                </div>);
              })}
            </div>
          </Card>
          <div style={{fontSize:11,color:"#4db8ff",fontWeight:700,marginBottom:8}}>🏊 TAGS EVENTS</div>
          {tagsKeys.length===0?<Card style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:48}}>🏊</div><div style={{color:"#7aa8cc",marginTop:10}}>Tap 📸 Log to enter your first time!</div></Card>:tagsKeys.map(function(s){
            const myT=times[s];const tags=tagsP[s];
            const sc=getStatusColor(myT,tags&&tags.q,tags&&tags.b);
            const sl=getStatusLabel(myT,tags&&tags.q,tags&&tags.b);
            const pval=myT&&tags?Math.max(5,Math.min(100,100-(((myT-tags.q)/tags.q)*400))):0;
            return(<div key={s} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid "+(myT&&tags&&myT<=tags.q?"rgba(0,255,170,0.2)":"rgba(77,184,255,0.08)")}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{fontWeight:800,fontSize:14}}>{s}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>Cut: <span style={{color:"#4db8ff",fontWeight:700}}>{fmt(tags&&tags.q)}</span> · Bonus: <span style={{color:"#ffd700",fontWeight:700}}>{fmt(tags&&tags.b)}</span></div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:900,color:myT?sc:"#2a4a6a"}}>{fmt(myT)}</div>{sl&&<div style={{fontSize:10,color:sc,fontWeight:700}}>{sl}</div>}</div>
              </div>
              <PBar value={pval} max={100} color={myT&&tags&&myT<=tags.b?"#ffd700":myT&&tags&&myT<=tags.q?"#00ffaa":"linear-gradient(90deg,#1a5fff,#4db8ff)"}/>
            </div>);
          })}
          <Card>
            <div style={{fontSize:11,color:"#f87171",fontWeight:700,marginBottom:8}}>🔄 COURSE CONVERTER</div>
            <Lbl>Event</Lbl>
            <select value={convEvent} onChange={e=>setConvEvent(e.target.value)} style={{...iStyle,cursor:"pointer"}}>{Object.keys(COURSE_FACTORS).map(e=><option key={e}>{e}</option>)}</select>
            <Lbl>Your SCY Time</Lbl>
            <input value={convTime} onChange={e=>setConvTime(e.target.value)} placeholder="e.g. 54.23" style={iStyle}/>
            {convTime&&(function(){const secs=parseTime(convTime);if(!secs)return null;const f=COURSE_FACTORS[convEvent]||{lcm:1.09,scm:1.04};return(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>{[{label:"SCY",val:fmt(secs),color:"#4db8ff"},{label:"LCM",val:fmt(secs*f.lcm),color:"#00ffaa"},{label:"SCM",val:fmt(secs*f.scm),color:"#ffd700"}].map(c=><div key={c.label} style={{textAlign:"center",padding:"10px 4px",background:"rgba(255,255,255,0.04)",borderRadius:10}}><div style={{fontSize:9,color:"#7aa8cc",marginBottom:3}}>{c.label}</div><div style={{fontSize:15,fontWeight:900,color:c.color}}>{c.val}</div></div>)}</div>);}())}
          </Card>
        </>}

        {tab==="log"&&<>
          <Card style={{border:"1px solid rgba(0,255,170,0.2)",background:"linear-gradient(135deg,rgba(0,255,170,0.04),rgba(0,100,255,0.06))"}}>
            <div style={{fontSize:13,fontWeight:900,color:"#00ffaa",marginBottom:4}}>📸 SCAN MEET RESULTS</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Screenshot from Meet Mobile — AI reads all times instantly</div>
            {pStep==="idle"&&<><input ref={pRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}} id="pIn"/><label htmlFor="pIn" style={{display:"block",width:"100%",padding:"14px 0",borderRadius:12,border:"2px dashed rgba(0,255,170,0.4)",textAlign:"center",cursor:"pointer",color:"#00ffaa",fontWeight:800,fontSize:14}}>📂 Tap to upload screenshot</label></>}
            {pStep==="preview"&&pPrev&&<><img src={pPrev} alt="preview" style={{width:"100%",borderRadius:10,marginBottom:10,maxHeight:200,objectFit:"cover"}}/>{pErr&&<div style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>⚠️ {pErr}</div>}<div style={{display:"flex",gap:8}}><button onClick={scanPhoto} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>🔍 Scan for Times</button><button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>✕</button></div></>}
            {pStep==="scanning"&&<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:30}}>🧠</div><div style={{color:"#00ffaa",fontWeight:800,marginTop:6}}>Reading your results...</div></div>}
            {pStep==="review"&&pRes&&<><div style={{fontSize:12,fontWeight:800,color:"#00ffaa",marginBottom:8}}>Found {pRes.length} times — tap to select:</div>{pRes.map(function(r,i){return(<div key={i} onClick={()=>setPRes(p=>p.map((x,j)=>j===i?{...x,selected:!x.selected}:x))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,marginBottom:6,cursor:"pointer",background:r.selected?"rgba(0,255,170,0.07)":"rgba(255,255,255,0.03)",border:"1px solid "+(r.selected?"rgba(0,255,170,0.3)":"rgba(255,255,255,0.07)")}}>
              <div style={{width:20,height:20,borderRadius:"50%",background:r.selected?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#000",fontWeight:900,flexShrink:0}}>{r.selected?"✓":""}</div>
              <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{r.event}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{r.meet||""}{r.date?" · "+r.date:""}</div></div>
              <div style={{fontSize:18,fontWeight:900,color:r.recognized?"#4db8ff":"#7aa8cc"}}>{r.time}</div>
            </div>);})}
            <div style={{display:"flex",gap:8,marginTop:4}}><button onClick={importPhotos} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>⬇️ Import Selected</button><button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>Cancel</button></div></>}
            {pStep==="done"&&<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:32}}>🎉</div><div style={{color:"#00ffaa",fontWeight:900,marginBottom:12}}>Times imported!</div><button onClick={resetPhoto} style={{padding:"10px 24px",borderRadius:10,border:"1px solid rgba(0,255,170,0.3)",background:"rgba(0,255,170,0.08)",color:"#00ffaa",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Scan Another</button></div>}
          </Card>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/>OR LOG MANUALLY<div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/></div>
          <Card>
            <Lbl>Event</Lbl>
            <select value={lSt} onChange={e=>setLSt(e.target.value)} style={{...iStyle,cursor:"pointer"}}>
              <option value="">Pick an event</option>
              {tagsKeys.length>0&&<optgroup label="TAGS Events">{tagsKeys.map(s=><option key={s}>{s}</option>)}</optgroup>}
              <optgroup label="All Events">{ALL_EVENTS.filter(e=>!tagsKeys.includes(e)).map(s=><option key={s}>{s}</option>)}</optgroup>
            </select>
            <Lbl>Time (e.g. 54.23 or 1:02.45)</Lbl>
            <input value={lTm} onChange={e=>setLTm(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLog()} placeholder="ss.xx or m:ss.xx" style={{...iStyle,fontSize:22,fontWeight:900}}/>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <div style={{flex:1}}><Lbl>Date</Lbl><input type="date" value={lDt} onChange={e=>setLDt(e.target.value)} style={iStyle}/></div>
              <div style={{flex:1}}><Lbl>Meet</Lbl><input value={lMt} onChange={e=>setLMt(e.target.value)} placeholder="Optional" style={iStyle}/></div>
            </div>
            <button onClick={doLog} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:16,cursor:"pointer",fontFamily:"inherit"}}>💾 LOG THIS TIME</button>
          </Card>
        </>}

        {tab==="train"&&<>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[["dryland","💪 Dryland"],["pool","🏊 Pool"]].map(item=><button key={item[0]} onClick={()=>setTrainView(item[0])} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:trainView===item[0]?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:trainView===item[0]?"#fff":"#7aa8cc"}}>{item[1]}</button>)}
          </div>
          {trainView==="dryland"&&<>
            <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))",border:"1px solid rgba(0,255,170,0.15)",marginBottom:14}}>
              <div style={{fontSize:11,color:"#00ffaa",fontWeight:700,marginBottom:4}}>TODAY'S DRYLAND — Age-safe for {profile.name}, age {profile.age}</div>
              {streak>0&&<div style={{fontSize:11,color:"#ffd700",fontWeight:700}}>🔥 {streak}-day streak!</div>}
            </Card>
            {EXERCISES.filter(e=>e.ageMin<=age).map(function(ex){
              const done=isCL(ex.id);const open=exOpen===ex.id;
              return(<div key={ex.id} style={{borderRadius:12,marginBottom:8,overflow:"hidden",border:"1px solid "+(done?"rgba(0,255,170,0.3)":"rgba(77,184,255,0.1)"),background:done?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.03)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer"}} onClick={()=>setExOpen(open?null:ex.id)}>
                  <div onClick={e=>{e.stopPropagation();toggleCL(ex.id);if(!done)addXP(10,"Exercise done! 💪");}} style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:done?"#00ffaa":"rgba(255,255,255,0.08)",border:"2px solid "+(done?"#00ffaa":"rgba(255,255,255,0.15)"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000",fontWeight:900,cursor:"pointer"}}>{done?"✓":""}</div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13,color:done?"#00ffaa":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{ex.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:1}}>{ex.sets} sets · {ex.reps}</div></div>
                  <div style={{fontSize:11,color:"#4db8ff"}}>{open?"▲":"▼"}</div>
                </div>
                {open&&<div style={{padding:"0 14px 14px"}}>
                  <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.65,padding:"10px 12px",background:"rgba(0,100,255,0.08)",borderRadius:8,marginBottom:8}}>💡 {ex.cue}</div>
                  <div style={{fontSize:11,color:"#ff8888",padding:"8px 12px",borderRadius:8,background:"rgba(255,0,0,0.07)"}}>{ex.search}<button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText(ex.search).catch(()=>{})} style={{marginLeft:8,fontSize:10,padding:"3px 8px",borderRadius:5,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff8888",cursor:"pointer",fontFamily:"inherit"}}>Copy</button></div>
                </div>}
              </div>);
            })}
          </>}
          {trainView==="pool"&&<>
            <Card style={{background:"linear-gradient(135deg,rgba(0,150,255,0.1),rgba(0,200,100,0.08))",border:"1px solid rgba(77,184,255,0.25)",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"#4db8ff",fontWeight:700,letterSpacing:1,marginBottom:2}}>{workout.dayName.toUpperCase()} · DAY {(dayOfYear%7)+1} OF 7</div>
                  <div style={{fontSize:15,fontWeight:900,color:"#fff"}}>{workout.name}</div>
                  <div style={{fontSize:11,color:"#7aa8cc",marginTop:2}}>{workout.yards.toLocaleString()} yards</div>
                  <div style={{fontSize:10,color:"#00ffaa",marginTop:3}}>🎯 {workout.targetEvent}</div>
                </div>
                <div style={{textAlign:"center",padding:"8px 12px",borderRadius:10,background:"rgba(255,255,255,0.05)"}}>
                  <div style={{fontSize:9,color:"#7aa8cc",marginBottom:2}}>INTENSITY</div>
                  <div style={{fontSize:13,fontWeight:900,color:workout.intensity==="Very High"?"#ff6b6b":workout.intensity==="Moderate-High"?"#ff9f43":workout.intensity==="Easy"?"#00ffaa":"#ffd700"}}>{workout.intensity}</div>
                </div>
              </div>
              <div style={{padding:"8px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.15)",fontSize:11,color:"#ffd700",lineHeight:1.6}}>💡 {workout.tip}</div>
            </Card>
            <Card style={{marginBottom:14}}>
              <div style={{fontSize:11,color:"#a78bfa",fontWeight:700,marginBottom:8}}>🎛️ CHOOSE YOUR FOCUS</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                <button onClick={()=>setManualFocus(null)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:!manualFocus?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.07)",color:!manualFocus?"#fff":"#7aa8cc"}}>🎯 Auto</button>
                {tagsKeys.map(ev=><button key={ev} onClick={()=>setManualFocus(ev)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:manualFocus===ev?"linear-gradient(135deg,#7c3aed,#a78bfa)":"rgba(255,255,255,0.07)",color:manualFocus===ev?"#fff":"#7aa8cc"}}>{ev}</button>)}
              </div>
            </Card>
            {workout.sets.map(function(set,j){
              const isWU=j===0;const isCD=j===workout.sets.length-1;
              return(<div key={j} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,marginBottom:8,background:isWU?"rgba(0,100,255,0.07)":isCD?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.04)",border:"1px solid "+(isWU?"rgba(77,184,255,0.2)":isCD?"rgba(0,255,170,0.15)":"rgba(255,255,255,0.08)")}}>
                <div style={{fontSize:12,fontWeight:900,color:isWU?"#4db8ff":isCD?"#00ffaa":"#ffd700",flexShrink:0,minWidth:22}}>{isWU?"WU":isCD?"CD":j+"."}</div>
                <div style={{fontSize:13,color:"#d0e8ff",lineHeight:1.65}}>{set}</div>
              </div>);
            })}
            <div style={{textAlign:"center",marginTop:10,padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.03)"}}>
              <div style={{fontSize:10,color:"#7aa8cc"}}>Tomorrow: <span style={{color:"#4db8ff",fontWeight:700}}>{workout.nextWorkout}</span></div>
            </div>
          </>}
        </>}

        {tab==="skills"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(251,191,36,0.08),rgba(26,95,255,0.08))",border:"1px solid rgba(251,191,36,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#fbbf24",fontWeight:700,marginBottom:4}}>🎬 OLYMPIC COACHING LIBRARY</div>
            <div style={{fontSize:12,color:"#7aa8cc"}}>Tips from world champions — rotates daily. Every stroke covered.</div>
          </Card>
          <div style={{display:"flex",gap:6,marginBottom:12}}>
            {[["library","📚 Library"],["daily","⭐ Today"],["channels","📺 Channels"]].map(item=><button key={item[0]} onClick={()=>setSkillView(item[0])} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",background:skillView===item[0]?"linear-gradient(135deg,#b45309,#f59e0b)":"rgba(255,255,255,0.05)",color:skillView===item[0]?"#fff":"#7aa8cc"}}>{item[1]}</button>)}
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
            {Object.keys(STROKE_TIPS).map(sk=><Chip key={sk} on={skillStroke===sk} onClick={()=>{setSkillStroke(sk);setTipIdx(0);}} color="#7c3aed">{sk.charAt(0).toUpperCase()+sk.slice(1)}</Chip>)}
          </div>
          {skillView==="daily"&&<>
            <Card style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(251,191,36,0.25)",padding:20,marginBottom:12}}>
              <div style={{fontSize:10,color:"#fbbf24",fontWeight:700,marginBottom:8}}>⭐ TODAY'S TIP — {skillStroke.toUpperCase()}</div>
              <div style={{fontSize:15,color:"#fff",lineHeight:1.75,fontWeight:600}}>{strokeTips[todayTipIdx]}</div>
            </Card>
          </>}
          {skillView==="library"&&<>
            {strokeTips.map(function(tip,i){
              const isToday=i===todayTipIdx;
              return(<div key={i} style={{background:isToday?"rgba(251,191,36,0.07)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px 16px",marginBottom:8,border:"1px solid "+(isToday?"rgba(251,191,36,0.3)":"rgba(251,191,36,0.08)"),display:"flex",gap:10}}>
                <div style={{flexShrink:0}}>{isToday?<div style={{fontSize:16}}>⭐</div>:<div style={{width:22,height:22,borderRadius:"50%",background:"rgba(251,191,36,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fbbf24",fontWeight:800}}>{i+1}</div>}</div>
                <div style={{fontSize:13,color:isToday?"#ffd700":"#d0e8ff",lineHeight:1.7}}>{tip}</div>
              </div>);
            })}
          </>}
          {skillView==="channels"&&CHANNELS.map(function(ch){return(
            <div key={ch.name} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px",marginBottom:8,border:"1px solid rgba(251,191,36,0.12)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}>
                <div style={{fontSize:22,flexShrink:0}}>{ch.icon}</div>
                <div><div style={{fontWeight:900,fontSize:14,color:"#fbbf24"}}>{ch.name}</div><div style={{fontSize:11,color:"#7aa8cc",marginTop:3}}>{ch.desc}</div></div>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,background:"rgba(251,191,36,0.07)"}}>
                <div style={{fontSize:10,color:"#7aa8cc",flex:1}}>{ch.url}</div>
                <button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText("https://"+ch.url).catch(()=>{})} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.15)",color:"#fbbf24",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Copy</button>
              </div>
            </div>);
          })}
        </>}

        {tab==="meets"&&<>
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>📅 MEET CALENDAR</div>
            {meets.length===0?<div style={{color:"#7aa8cc",fontSize:12}}>No upcoming meets — add one below.</div>:meets.map(function(m){return(
              <div key={m.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(77,184,255,0.15)"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontWeight:800,fontSize:13}}>{m.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>{m.date}{m.loc?" · "+m.loc:""}</div></div>
                  <button onClick={()=>setMeets(p=>p.filter(x=>x.id!==m.id))} style={{fontSize:10,padding:"3px 8px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
                </div>
              </div>);})}
          </Card>
          <Card>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>➕ ADD A MEET</div>
            <Lbl>Meet Name</Lbl><input value={mName} onChange={e=>setMName(e.target.value)} placeholder="e.g. District Championships" style={iStyle}/>
            <Lbl>Date</Lbl><input type="date" value={mDate} onChange={e=>setMDate(e.target.value)} style={iStyle}/>
            <Lbl>Location</Lbl><input value={mLoc} onChange={e=>setMLoc(e.target.value)} placeholder="Optional" style={iStyle}/>
            <Lbl>Events</Lbl>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              {tagsKeys.map(ev=><button key={ev} onClick={()=>setMEvents(p=>p.includes(ev)?p.filter(e=>e!==ev):[...p,ev])} style={{padding:"5px 10px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:mEvents.includes(ev)?"#1a5fff":"rgba(255,255,255,0.07)",color:mEvents.includes(ev)?"#fff":"#7aa8cc"}}>{ev}</button>)}
            </div>
            <button onClick={()=>{if(!mName||!mDate){notify("Enter meet name and date","#ff6b6b");return;}setMeets(p=>[{id:Date.now(),name:mName,date:mDate,loc:mLoc,events:mEvents},...p]);setMName("");setMDate("");setMLoc("");setMEvents([]);notify("Meet added! 📅");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>Add Meet 📅</button>
          </Card>
        </>}

        {tab==="progress"&&<>
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:"#ff9f43",marginBottom:10}}>🎯 GOALS</div>
            {goals.map(function(g){const t=times[g.event];const target=parseTime(g.target);const diff=t&&target?t-target:null;return(
              <div key={g.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(255,159,67,0.2)"}}>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <div><div style={{fontWeight:800,fontSize:13}}>{g.event}</div><div style={{fontSize:10,color:"#7aa8cc"}}>Target: {fmt(target)} · By {g.deadline}</div></div>
                  <div style={{textAlign:"right"}}>{diff!==null&&<div style={{fontSize:12,fontWeight:800,color:diff<=0?"#00ffaa":"#ff9f43"}}>{diff<=0?"✅ HIT!":diff.toFixed(2)+"s to go"}</div>}<button onClick={()=>setGoals(p=>p.filter(x=>x.id!==g.id))} style={{fontSize:9,padding:"2px 7px",borderRadius:5,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit",marginTop:4}}>Remove</button></div>
                </div>
              </div>);})}
            <Lbl>Event</Lbl>
            <select value={gEvent} onChange={e=>setGEvent(e.target.value)} style={{...iStyle,cursor:"pointer"}}><option value="">Pick event</option>{tagsKeys.map(s=><option key={s}>{s}</option>)}</select>
            <div style={{display:"flex",gap:8}}>
              <div style={{flex:1}}><Lbl>Target Time</Lbl><input value={gTarget} onChange={e=>setGTarget(e.target.value)} placeholder="52.00" style={iStyle}/></div>
              <div style={{flex:1}}><Lbl>Deadline</Lbl><input type="date" value={gDeadline} onChange={e=>setGDeadline(e.target.value)} style={iStyle}/></div>
            </div>
            <button onClick={()=>{if(!gEvent||!gTarget){notify("Fill all goal fields","#ff6b6b");return;}setGoals(p=>[{id:Date.now(),event:gEvent,target:gTarget,deadline:gDeadline},...p]);setGEvent("");setGTarget("");setGDeadline("");notify("Goal set! 🎯","#ff9f43");}} style={{width:"100%",padding:11,borderRadius:10,border:"none",background:"rgba(255,159,67,0.2)",color:"#ff9f43",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Set Goal 🎯</button>
          </Card>
          <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>🏅 Badges</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {BADGES_DEF.map(function(b){const has=earned.find(e=>e.id===b.id);return(<div key={b.id} style={{background:has?"rgba(0,100,255,0.12)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 10px",border:"1px solid "+(has?"rgba(77,184,255,0.3)":"rgba(255,255,255,0.06)"),opacity:has?1:0.45}}><div style={{fontSize:24}}>{b.icon}</div><div style={{fontSize:12,fontWeight:800,marginTop:4}}>{b.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>{b.desc}</div></div>);})}
          </div>
          <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>📋 Session History</div>
          {logs.length===0?<div style={{color:"#3a5a7a",textAlign:"center",padding:"30px 0"}}>No sessions yet!</div>:logs.slice(0,20).map(function(e){const tg=tagsP[e.stroke];const q=!!(tg&&e.time<=tg.q);return(
            <div key={e.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 14px",marginBottom:7,border:"1px solid "+(e.isBonus?"rgba(255,215,0,0.2)":q?"rgba(0,255,170,0.15)":"rgba(77,184,255,0.07)")}}>
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{e.stroke}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{e.date}{e.meet?" · "+e.meet:""}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:900,color:e.isBonus?"#ffd700":q?"#00ffaa":"#4db8ff"}}>{fmt(e.time)}</div>{e.isPB&&<div style={{fontSize:9,color:"#ff9f43",fontWeight:700}}>⚡ PB</div>}</div>
              </div>
            </div>);})}
        </>}

        {tab==="squad"&&<>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:12}}>👥 Squad Leaderboard</div>
            {[{name:profile.name,times,isMe:true},...squad].sort(function(a,b){return tagsKeys.filter(s=>b.times[s]&&tagsP[s]&&b.times[s]<=tagsP[s].q).length-tagsKeys.filter(s=>a.times[s]&&tagsP[s]&&a.times[s]<=tagsP[s].q).length;}).map(function(sw,i){const q=tagsKeys.filter(s=>sw.times[s]&&tagsP[s]&&sw.times[s]<=tagsP[s].q).length;return(
              <div key={sw.name+i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,marginBottom:6,background:sw.isMe?"rgba(26,95,255,0.15)":"rgba(255,255,255,0.04)",border:"1px solid "+(sw.isMe?"rgba(77,184,255,0.3)":"rgba(255,255,255,0.06)")}}>
                <div style={{fontSize:20,width:28,textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"👤"}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{sw.name}{sw.isMe?" (You)":""}</div><div style={{fontSize:11,color:"#7aa8cc"}}>{q} TAGS cuts</div></div>
                <div style={{fontSize:20,fontWeight:900,color:"#4db8ff"}}>{q}</div>
              </div>);})}
          </Card>
          <Card>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>➕ Add Squad Mate</div>
            <Lbl>Name</Lbl><input value={sN} onChange={e=>setSN(e.target.value)} placeholder="Teammate name" style={iStyle}/>
            <Lbl>Best Event</Lbl><select value={sEv} onChange={e=>setSEv(e.target.value)} style={{...iStyle,cursor:"pointer"}}><option value="">Pick event</option>{tagsKeys.map(s=><option key={s}>{s}</option>)}</select>
            <Lbl>Their Time</Lbl><input value={sTm} onChange={e=>setSTm(e.target.value)} placeholder="e.g. 58.23" style={iStyle}/>
            <button onClick={()=>{if(!sN||!sEv||!sTm){notify("Fill all fields!","#ff6b6b");return;}setSquad(p=>[...p,{name:sN,times:{[sEv]:parseTime(sTm)}}]);setSN("");setSEv("");setSTm("");notify(sN+" added! 👊");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"rgba(77,184,255,0.15)",color:"#4db8ff",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Add Member</button>
          </Card>
        </>}

        {tab==="coach"&&<>
          <Card style={{marginBottom:12,border:"1px solid rgba(167,139,250,0.3)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#a78bfa",marginBottom:4}}>⚡ RACE SPLIT ANALYZER</div>
            <Lbl>Event</Lbl>
            <select value={splitEvent} onChange={e=>{setSplitEvent(e.target.value);setSplitResult(null);setSplitTimes(["","","","","","","","",""]);}} style={{...iStyle,cursor:"pointer"}}>
              <option value="">Select event</option>
              {["100 Free","200 Free","500 Free","100 Back","200 Back","100 Breast","200 Breast","100 Fly","200 Fly","200 IM","400 IM"].map(e=><option key={e}>{e}</option>)}
            </select>
            {splitEvent&&<>
              {times[splitEvent]&&<div style={{marginBottom:10,padding:"10px 12px",borderRadius:10,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>YOUR BEST TIME</div><div style={{fontSize:18,fontWeight:900,color:"#fff"}}>{fmt(times[splitEvent])}</div></div>
                <button onClick={()=>{
                  const n=splitEvent.includes("100")?2:splitEvent.includes("200")?4:10;
                  const lt=times[splitEvent];
                  const pacing=n===2?[0.495,0.505]:n===4?[0.24,0.255,0.255,0.25]:[0.095,0.105,0.105,0.105,0.103,0.102,0.102,0.102,0.103,0.078];
                  const est=pacing.slice(0,n).map(p=>(lt*p).toFixed(2));
                  const sum=est.reduce((a,b)=>a+parseFloat(b),0);
                  const scale=lt/sum;
                  const norm=est.map(t=>(parseFloat(t)*scale).toFixed(2));
                  const nt=["","","","","","","","",""];
                  norm.forEach((t,i)=>{nt[i]=t;});
                  setSplitTimes(nt);
                  notify("Splits estimated from "+fmt(lt),"#a78bfa");
                }} style={{padding:"9px 14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:800,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>✨ Auto-Fill</button>
              </div>}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                {Array.from({length:splitEvent.includes("100")?2:splitEvent.includes("200")?4:10}).map((_,i)=><div key={i}><div style={{fontSize:9,color:"#7aa8cc",marginBottom:2}}>Split {i+1} ({(i+1)*50}y)</div><input value={splitTimes[i]} onChange={e=>setSplitTimes(p=>{const n=[...p];n[i]=e.target.value;return n;})} placeholder={"27."+i} style={{...iStyle,marginBottom:0,fontSize:15,fontWeight:700}}/></div>)}
              </div>
              <button onClick={()=>{
                const n=splitEvent.includes("100")?2:splitEvent.includes("200")?4:10;
                const filled=splitTimes.slice(0,n).filter(t=>t.trim());
                if(filled.length<2){notify("Enter at least 2 splits","#ff6b6b");return;}
                const parsed=filled.map(t=>parseFloat(t)).filter(t=>!isNaN(t));
                const total=parsed.reduce((a,b)=>a+b,0);
                const half=Math.ceil(parsed.length/2);
                const first=parsed.slice(0,half).reduce((a,b)=>a+b,0);
                const second=parsed.slice(half).reduce((a,b)=>a+b,0);
                const isNeg=second<first;
                const fastest=Math.min(...parsed);const slowest=Math.max(...parsed);
                const drop=((slowest-fastest)/fastest*100).toFixed(1);
                const iq=Math.max(0,Math.min(100,Math.round(100-parseFloat(drop)*5+(isNeg?15:0))));
                setSplitResult({parsed,total,isNeg,drop,fastest,slowest,iq});
                addXP(30,"Race analyzed! 🔬");
              }} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Analyze Race 🔬</button>
              {splitResult&&<div style={{marginTop:14,padding:"16px",borderRadius:12,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.25)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div><div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>RACE IQ</div><div style={{fontSize:40,fontWeight:900,color:splitResult.iq>=80?"#00ffaa":splitResult.iq>=60?"#ffd700":"#ff6b6b"}}>{splitResult.iq}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:800,color:splitResult.isNeg?"#00ffaa":"#ff9f43"}}>{splitResult.isNeg?"✅ Negative Split":"⚠️ Positive Split"}</div><div style={{fontSize:11,color:"#7aa8cc"}}>Total: {fmt(splitResult.total)}</div></div>
                </div>
                <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.7}}>{splitResult.isNeg?"🌟 Elite pacing! Second half faster than first.":"💡 Went out too fast. Hold back 5-10% in the first half."}</div>
              </div>}
            </>}
          </Card>
          <Card style={{background:"rgba(0,100,255,0.07)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:4}}>🤖 AI COACH — Powered by Claude</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Your profile and all logged times are pre-loaded. Ask anything.</div>
            {["Analyze all my times — where am I losing the most time and what should I fix first?","Break down my race splits and tell me exactly where I die in each event","What are my 3 biggest technical weaknesses based on my times?","Build me a 4-week plan to drop the most time before my next meet","How close am I to TAGS and what is the single fastest path to qualify?","What should my turns and underwater dolphins look like? How many kicks?","Design my warm-up and race-day routine for a big meet"].map(q=><button key={q} onClick={()=>askCoach(q)} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,255,0.12)",color:"#d0e8ff",borderRadius:10,padding:"11px 14px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>)}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <input value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&aiQ&&askCoach(aiQ)} placeholder="Ask anything..." style={{...iStyle,flex:1,margin:0}}/>
              <button onClick={()=>aiQ&&askCoach(aiQ)} style={{background:"linear-gradient(135deg,#1a5fff,#0099ff)",border:"none",color:"#fff",borderRadius:10,padding:"10px 18px",fontWeight:800,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>Ask</button>
            </div>
            {aiLoad&&<div style={{textAlign:"center",color:"#4db8ff",fontSize:14,marginTop:20}}>🧠 Coach is thinking...</div>}
            {aiA&&<div style={{marginTop:14,background:"rgba(0,100,255,0.06)",borderRadius:14,padding:18,border:"1px solid rgba(77,184,255,0.2)",fontSize:14,lineHeight:1.75,whiteSpace:"pre-wrap",color:"#d0e8ff"}}>{aiA}</div>}
          </Card>
        </>}

        {tab==="nutrition"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(0,200,100,0.08),rgba(26,95,255,0.08))",border:"1px solid rgba(0,255,170,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#00ffaa",fontWeight:700,marginBottom:4}}>🥗 FUEL LIKE AN OLYMPIAN</div>
            <div style={{fontSize:12,color:"#7aa8cc"}}>Nutrition tips for age {profile.age}. Tap any tip to expand for full details and real meal examples.</div>
          </Card>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {[["daily","🍽️ Daily"],["hydration","💧 Hydration"],["preMeet","🏁 Pre-Meet"]].map(item=><button key={item[0]} onClick={()=>{setNutrTab(item[0]);setNutrExpanded(null);setNutrIdx(0);}} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",background:nutrTab===item[0]?"linear-gradient(135deg,#00cc88,#0099ff)":"rgba(255,255,255,0.05)",color:nutrTab===item[0]?"#fff":"#7aa8cc",minWidth:"30%"}}>{item[1]}</button>)}
          </div>
          {nutrTip&&<Card style={{background:"linear-gradient(135deg,rgba(0,255,170,0.07),rgba(0,100,255,0.07))",border:"1px solid rgba(0,255,170,0.25)",marginBottom:12}}>
            <div style={{fontSize:10,color:"#00ffaa",fontWeight:700,marginBottom:6}}>⭐ TODAY'S TIP</div>
            <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:6}}>{nutrTip[0]}</div>
            <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.65,marginBottom:8}}>{nutrTip[1]}</div>
            <div style={{padding:"8px 10px",borderRadius:8,background:"rgba(0,255,170,0.07)",fontSize:11,color:"#00ffaa"}}>{nutrTip[2]}</div>
          </Card>}
          {nutrData.map(function(tip,i){
            const isToday=i===(nutrIdx%nutrData.length);
            const isOpen=nutrExpanded===i;
            return(<div key={i} onClick={()=>setNutrExpanded(isOpen?null:i)} style={{background:isToday?"rgba(0,255,170,0.06)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid "+(isToday?"rgba(0,255,170,0.25)":"rgba(255,255,255,0.07)"),cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{flexShrink:0}}>{isToday?<div style={{fontSize:14}}>⭐</div>:<div style={{width:22,height:22,borderRadius:"50%",background:"rgba(0,255,170,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#00ffaa",fontWeight:800}}>{i+1}</div>}</div>
                <div style={{flex:1}}><div style={{fontSize:13,fontWeight:700,color:isToday?"#00ffaa":"#e8f4ff"}}>{tip[0]}</div></div>
                <div style={{fontSize:11,color:"#4db8ff"}}>{isOpen?"▲":"▼"}</div>
              </div>
              {isOpen&&<><div style={{marginTop:10,fontSize:12,color:"#d0e8ff",lineHeight:1.7}}>{tip[1]}</div><div style={{marginTop:8,padding:"10px 12px",borderRadius:8,background:"rgba(0,255,170,0.06)",fontSize:12,color:"#00ffaa"}}>{tip[2]}</div></>}
            </div>);
          })}
          <button onClick={()=>setNutrIdx(p=>(p+1)%nutrData.length)} style={{width:"100%",padding:12,borderRadius:10,border:"1px solid rgba(0,255,170,0.3)",background:"rgba(0,255,170,0.08)",color:"#00ffaa",fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginBottom:12,fontSize:13}}>🔄 Show Another Tip</button>
          <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,100,255,0.07))",border:"1px solid rgba(77,184,255,0.25)"}}>
            <div style={{fontSize:12,fontWeight:800,color:"#4db8ff",marginBottom:6}}>🤖 Want personalized nutrition advice?</div>
            {["Build me a 7-day meal plan for a swimmer my age","What should I eat the day before my big meet?","I'm always tired after practice — what am I missing?"].map(q=><button key={q} onClick={()=>{setTab("coach");setAiQ(q);}} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(77,184,255,0.06)",border:"1px solid rgba(77,184,255,0.15)",color:"#d0e8ff",borderRadius:9,padding:"10px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{q} <span style={{fontSize:9,color:"#4db8ff"}}>→ Ask AI Coach</span></button>)}
          </Card>
        </>}

        {tab==="family"&&<>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[["swimmer","🏊 My Stats"],["parent","👨‍👩‍👦 Parent View"]].map(item=><button key={item[0]} onClick={()=>setViewMode(item[0])} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:viewMode===item[0]?"linear-gradient(135deg,#7c3aed,#c084fc)":"rgba(255,255,255,0.05)",color:viewMode===item[0]?"#fff":"#7aa8cc"}}>{item[1]}</button>)}
          </div>
          {viewMode==="swimmer"&&<>
            <Card>
              <div style={{fontSize:12,fontWeight:800,color:"#c084fc",marginBottom:8}}>Your Family Code</div>
              <div style={{fontSize:36,fontWeight:900,color:"#fff",letterSpacing:4,textAlign:"center",padding:"20px 0",background:"rgba(168,85,247,0.08)",borderRadius:10,marginBottom:8}}>{familyCode}</div>
              <button onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(familyCode).catch(()=>{});notify("Copied! Text to your parents 📱","#c084fc");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"rgba(168,85,247,0.2)",color:"#c084fc",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>📋 Copy Code</button>
            </Card>
            <Card>
              <div style={{fontSize:12,fontWeight:800,color:"#4db8ff",marginBottom:12}}>📊 Your Stats</div>
              {[{l:"Events Logged",v:Object.keys(times).length},{l:"TAGS Cuts Hit",v:qualified.length,c:"#00ffaa"},{l:"Streak",v:streak+" days",c:streak>0?"#ffd700":undefined},{l:"Total Sessions",v:logs.length}].map(r=><div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><span style={{fontSize:13,color:"#7aa8cc"}}>{r.l}</span><span style={{fontSize:13,fontWeight:800,color:r.c||"#e8f4ff"}}>{r.v}</span></div>)}
            </Card>
          </>}
          {viewMode==="parent"&&<>
            <Card>
              <div style={{fontSize:12,fontWeight:800,color:"#c084fc",marginBottom:10}}>➕ Add a Child</div>
              <Lbl>Child's Name</Lbl><input value={newChildName} onChange={e=>setNewChildName(e.target.value)} placeholder="e.g. Christian" style={iStyle}/>
              <Lbl>Their Family Code</Lbl><input value={newCode} onChange={e=>setNewCode(e.target.value.toUpperCase())} placeholder="e.g. CHRI-4829" style={{...iStyle,letterSpacing:2,fontWeight:700,fontSize:16}}/>
              <button onClick={addChildCode} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#c084fc)",color:"#fff",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Add Child 👨‍👩‍👦</button>
            </Card>
            {parentCodes.length>0&&<>
              <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                {parentCodes.map((child,i)=><button key={i} onClick={()=>setSelectedChild(i)} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:selectedChild===i?"linear-gradient(135deg,#7c3aed,#c084fc)":"rgba(255,255,255,0.07)",color:selectedChild===i?"#fff":"#7aa8cc"}}>{child.name}</button>)}
              </div>
              {parentCodes[selectedChild]&&<>
                <Card style={{background:"linear-gradient(135deg,rgba(168,85,247,0.08),rgba(0,100,255,0.06))",border:"1px solid rgba(168,85,247,0.2)",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:20,fontWeight:900,color:"#fff"}}>{parentCodes[selectedChild].name}</div><div style={{fontSize:11,color:"#c084fc",marginTop:2}}>Code: {parentCodes[selectedChild].code}</div></div>
                    <button onClick={()=>{const u=parentCodes.filter((_,i)=>i!==selectedChild);saveParentCodes(u);if(selectedChild>=u.length)setSelectedChild(0);}} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
                  </div>
                </Card>
                <Card>
                  <div style={{fontSize:12,fontWeight:800,color:"#4db8ff",marginBottom:8}}>💬 Send a Motivational Message</div>
                  {["Hey "+parentCodes[selectedChild].name+" — log today's practice on SwimIQ! 💪","How's training going? Share your TAGS progress with me 🏊","Don't forget your dryland exercises today! Every rep counts 🔥"].map(msg=><button key={msg} onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(msg).catch(()=>{});notify("Copied! Paste in a text 📱","#00ffaa");}} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(77,184,255,0.12)",color:"#d0e8ff",borderRadius:9,padding:"10px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{msg}<span style={{display:"block",fontSize:9,color:"#4db8ff",marginTop:4}}>Tap to copy</span></button>)}
                </Card>
              </>}
            </>}
            {parentCodes.length===0&&<Card style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:40,marginBottom:10}}>👨‍👩‍👦</div><div style={{color:"#7aa8cc",fontSize:13}}>Add your first child using their Family Code.</div></Card>}
          </>}
        </>}

      </div>
    </div>
  );
}
