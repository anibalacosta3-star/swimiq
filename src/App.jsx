import { useState, useEffect, useRef } from "react";
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

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

const ALL_EVENTS = ["50 Free","100 Free","200 Free","400 Free","500 Free","800 Free","1000 Free","1500 Free","1650 Free","50 Back","100 Back","200 Back","50 Breast","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"];

// SCY to LCM conversion factors (multiply SCY time by factor)
const COURSE_FACTORS = {
  "50 Free":{scyToLcm:1.11,scyToScm:1.05},"100 Free":{scyToLcm:1.09,scyToScm:1.04},"200 Free":{scyToLcm:1.08,scyToScm:1.03},"400 Free":{scyToLcm:1.07,scyToScm:1.03},"500 Free":{scyToLcm:1.07,scyToScm:1.03},"800 Free":{scyToLcm:1.06,scyToScm:1.02},"1000 Free":{scyToLcm:1.06,scyToScm:1.02},"1500 Free":{scyToLcm:1.05,scyToScm:1.02},"1650 Free":{scyToLcm:1.05,scyToScm:1.02},"100 Back":{scyToLcm:1.10,scyToScm:1.05},"200 Back":{scyToLcm:1.09,scyToScm:1.04},"100 Breast":{scyToLcm:1.08,scyToScm:1.04},"200 Breast":{scyToLcm:1.07,scyToScm:1.03},"100 Fly":{scyToLcm:1.10,scyToScm:1.05},"200 Fly":{scyToLcm:1.09,scyToScm:1.04},"200 IM":{scyToLcm:1.09,scyToScm:1.04},"400 IM":{scyToLcm:1.08,scyToScm:1.03},
};

const POOL_WORKOUTS = {
  freestyle: [
    {level:"beginner",name:"Freestyle Foundation",yards:1500,sets:["4×50 free easy @ :60 (focus: bilateral breathing)","4×100 free @ 1:45 (steady pace, count strokes)","4×50 kick board @ 1:00","4×25 fast free @ :45","200 easy cool down"]},
    {level:"intermediate",name:"Freestyle Builder",yards:2500,sets:["400 warm-up free easy","8×50 @ :50 (odds: fast / evens: technique)","4×100 @ 1:30 descend 1-4","4×200 @ 3:00 at race pace","8×25 underwater kick off walls","200 cool down"]},
    {level:"advanced",name:"Freestyle Race Prep",yards:3500,sets:["600 warm-up","12×50 @ :45 (4 fast, 4 drill, 4 kick)","4×100 @ 1:20 at goal pace","2×400 @ 5:30 negative split","8×50 @ :40 sprint","200 cool down"]},
  ],
  backstroke: [
    {level:"beginner",name:"Back Basics",yards:1500,sets:["200 backstroke easy warm-up","6×50 back @ 1:05 (focus: pinky entry)","4×50 kick on back @ 1:00","4×25 back sprint @ :45","200 easy free cool down"]},
    {level:"intermediate",name:"Back Power",yards:2500,sets:["400 back warm-up","8×50 back @ :55 (odd: one-arm / even: full)","4×100 back @ 1:40 at pace","4×50 back underwater flags drill","4×25 fast back","200 cool down"]},
    {level:"advanced",name:"Back Race Shape",yards:3000,sets:["500 warm-up back","10×50 back @ :50","4×100 back @ 1:30 fast","2×200 back @ 3:00","8×25 explosive back off walls","200 cool down"]},
  ],
  breaststroke: [
    {level:"beginner",name:"Breast Basics",yards:1500,sets:["200 breaststroke easy","6×50 breast @ 1:15 (focus: pull-kick timing)","4×50 kick only @ 1:10","4×25 breast sprint @ :50","200 cool down"]},
    {level:"intermediate",name:"Breast Builder",yards:2000,sets:["400 breast warm-up","8×50 breast @ 1:00 (2-kick-1-pull drill)","4×100 breast @ 1:55","4×50 breast underwater pull","200 cool down"]},
    {level:"advanced",name:"Breast Race Prep",yards:2800,sets:["500 breast warm-up","10×50 breast @ :55","4×100 breast @ 1:45","2×200 breast @ 3:20 at race pace","8×25 fast breast","200 cool down"]},
  ],
  butterfly: [
    {level:"beginner",name:"Fly Foundation",yards:1200,sets:["200 fly (sub free if needed) warm-up","6×25 fly @ :45 (focus: two kicks)","4×50 one-arm fly drill @ 1:10","4×25 underwater dolphin kick","200 easy cool down"]},
    {level:"intermediate",name:"Fly Builder",yards:2000,sets:["400 warm-up","8×25 fly @ :35 fast","4×50 fly @ :55 at pace","4×100 IM @ 1:40","8×25 dolphin kick on back","200 cool down"]},
    {level:"advanced",name:"Fly Race Shape",yards:2800,sets:["500 warm-up","10×50 fly @ :50","4×100 fly @ 1:30","2×200 fly @ 3:00","8×25 fly sprint max effort","200 cool down"]},
  ],
  im: [
    {level:"beginner",name:"IM Explorer",yards:1600,sets:["200 IM easy warm-up","4×50 each stroke (fly/back/breast/free)","4×100 IM @ 2:00","200 easy cool down"]},
    {level:"intermediate",name:"IM Builder",yards:2400,sets:["400 IM warm-up","8×50 IM order @ :55","4×100 IM @ 1:50","4×50 weakest stroke drill","4×25 IM transitions","200 cool down"]},
    {level:"advanced",name:"IM Race Prep",yards:3200,sets:["600 IM warm-up","12×50 IM @ :50","4×200 IM @ 3:00 race pace","8×25 each stroke fast","200 cool down"]},
  ],
  endurance: [
    {level:"intermediate",name:"Distance Base",yards:3000,sets:["1000 warm-up easy","3×500 @ 7:00 steady","4×100 @ 1:30","4×50 @ :50 kick","200 cool down"]},
    {level:"advanced",name:"Distance Power",yards:4000,sets:["1000 warm-up","2×800 @ 11:00","4×200 @ 2:45","4×100 @ 1:25","8×50 @ :45","200 cool down"]},
  ],
};

const NUTRITION = {
  "10U": {
    daily: ["3 full meals + 2 snacks every day — growing bodies need fuel constantly","Aim for 5 servings of fruits and vegetables daily — colorful plates = better recovery","Whole grains at every meal: oatmeal, brown rice, whole wheat bread","Lean protein at lunch and dinner: chicken, fish, eggs, beans","Calcium-rich foods 3x daily: milk, yogurt, cheese — bones are growing fast right now"],
    hydration: ["8-10 cups of water daily minimum","Drink 1 cup of water 30 minutes before practice","Sip water every 15-20 minutes during practice","Chocolate milk or a banana after practice for recovery","NO energy drinks — ever. Not at this age."],
    preMeet: ["Eat 2-3 hours before your race: pasta, rice, or oatmeal with banana","Avoid greasy or fried food day of meet — it slows you down","Sip water all morning — start hydrated","Light snack 30-45 min before: banana, granola bar, or crackers","Avoid new foods on meet day — stick to what you know"],
    postMeet: ["Eat within 30 minutes of finishing your last race","Chocolate milk is scientifically proven to be one of the best recovery drinks","Include protein: peanut butter sandwich, yogurt, or eggs","Rehydrate — drink water for the next 2 hours","Celebrate with a treat — you earned it! 🎉"],
  },
  "11-12": {
    daily: ["Eat every 3-4 hours — your metabolism is high and you need consistent fuel","Protein at every meal: 20-25g per meal helps muscle repair","Complex carbs are your fuel: pasta, rice, sweet potatoes, oats","Healthy fats: avocado, nuts, olive oil — these support brain and joint health","Iron-rich foods 3x/week: lean red meat, spinach, fortified cereals — especially important for girls"],
    hydration: ["10-12 cups of water daily","500ml water 1 hour before practice","During 2-hour practice: 600-900ml water","Electrolyte drink or coconut water after hard practices","Urine should be pale yellow — dark yellow = dehydrated"],
    preMeet: ["Carb-load the night before: pasta dinner with protein","Breakfast 2-3 hrs before: oatmeal with berries and eggs","Pack snacks for between events: trail mix, fruit, PB crackers","Small snack 30-45 min before your race","Keep a water bottle in hand all day"],
    postMeet: ["Protein + carb within 45 minutes: chocolate milk + banana is perfect","Full meal within 2 hours with protein, carbs, and vegetables","Tart cherry juice reduces inflammation — drink it after hard days","Sleep 9-10 hours the night after a meet — recovery happens during sleep"],
  },
  "13-14": {
    daily: ["2500-3000+ calories daily for active training — do not under-eat","Protein 1.2-1.6g per kg of bodyweight: chicken, fish, eggs, Greek yogurt, legumes","Carb timing: eat carbs around practice for energy, healthy fats away from practice","Anti-inflammatory foods daily: berries, salmon, turmeric, dark leafy greens","Avoid ultra-processed foods, fast food, and soda — they slow recovery and hurt performance"],
    hydration: ["12-16 cups of water daily","During hard practice (2+ hrs): 500-750ml per hour","Electrolytes during long sessions: sodium, potassium, magnesium","Avoid caffeine completely — it dehydrates and disrupts sleep critical for growth","Weigh yourself before and after long practices — replace each lb lost with 16oz water"],
    preMeet: ["Carb-load 2 nights before a big meet — pasta, rice, bread","Day before: normal eating, extra hydration, light on fiber (avoid bloating)","Morning of meet: oatmeal or eggs with toast 2-3 hrs before first race","Between events: simple carbs that digest fast — banana, dates, sports chews","Never try new foods at a meet"],
    postMeet: ["Within 30 min: 20-25g protein + simple carbs (chocolate milk + banana is proven optimal)","Within 2 hours: full meal with lean protein, complex carbs, vegetables","Tart cherry juice or turmeric milk reduces next-day soreness","Rehydrate aggressively: drink 150% of fluids lost","Prioritize 9-10 hours of sleep — growth hormone peaks during deep sleep"],
  },
  adult: {
    daily: ["Lean protein at every meal: 25-30g per meal for muscle maintenance","Complex carbs timed around workouts — before for fuel, after for recovery","Omega-3 rich foods 3x/week: salmon, walnuts, flaxseed — reduce inflammation","Magnesium-rich foods: dark chocolate, nuts, leafy greens — supports muscle function and sleep","Limit alcohol — it severely impairs recovery and sleep quality"],
    hydration: ["12-16 cups of water daily","For masters swimmers: hydration needs increase with age — drink proactively","Electrolyte balance matters more — add sodium and potassium to post-workout routine","Coffee pre-workout is OK — but add an extra glass of water for each cup","Creatine monohydrate (3-5g/day) has strong evidence for masters swimmers — consult your doctor"],
    preMeet: ["Same principles as teen swimmers — carbs before, protein after","Anti-inflammatory meal the night before: salmon, rice, broccoli","Morning of: easy-to-digest carbs and coffee if you normally drink it","Between events: banana, sports drink, saltine crackers","Trust your training — race day nutrition is 80% mental"],
    postMeet: ["Protein shake or chocolate milk immediately after last race","Full anti-inflammatory meal within 2 hours: salmon + sweet potato + vegetables","Epsom salt bath or ice bath if available — reduces next-day soreness","Prioritize 8 hours of sleep — adult recovery takes longer"],
  },
};

const DRYLAND = [
  {id:"plank",name:"Plank Hold",sets:"3",reps:"30-45s",gear:"Bodyweight",ageMin:8,cue:"Squeeze glutes and belly. Hips don't sag or pike. Build to 60s.",search:"plank hold swimmers technique"},
  {id:"deadbug",name:"Dead Bug",sets:"3",reps:"8 each side",gear:"Bodyweight",ageMin:8,cue:"Press lower back flat into floor the whole time. Slow and controlled.",search:"dead bug exercise swimmers core"},
  {id:"flutter",name:"Flutter Kick Dry",sets:"3",reps:"30s",gear:"Bodyweight",ageMin:8,cue:"Lie flat, hands under hips. Small fast kicks from the hip. Toes pointed.",search:"flutter kick dryland swimmers"},
  {id:"ytwl",name:"YTW-L Shoulder",sets:"3",reps:"10 each",gear:"Bodyweight",ageMin:8,cue:"Face down, thumbs up. Make Y-T-W-L shapes. Squeeze shoulder blades.",search:"YTWL exercise swimmers shoulder"},
  {id:"glute",name:"Glute Bridge",sets:"3",reps:"15",gear:"Bodyweight",ageMin:8,cue:"Feet flat, drive hips up, squeeze hard at top. Add band above knees.",search:"glute bridge swimmers kick power"},
  {id:"sqjump",name:"Squat Jumps",sets:"3",reps:"10",gear:"Bodyweight",ageMin:8,cue:"Squat to 90°, explode up, land softly. Builds explosive wall power.",search:"squat jumps swimmers explosive"},
  {id:"bandpull",name:"Band Pull-Apart",sets:"3",reps:"15",gear:"Band",ageMin:9,cue:"Hold band at chest, pull apart slowly, squeeze shoulder blades.",search:"band pull apart swimmers shoulder"},
  {id:"calf",name:"Calf Raises",sets:"3",reps:"20",gear:"Bodyweight",ageMin:8,cue:"Slow up, hold 1s at top, slow down. Better ankle extension = more kick.",search:"calf raises swimmers ankle"},
  {id:"sideplank",name:"Side Plank",sets:"2",reps:"20-30s each",gear:"Bodyweight",ageMin:9,cue:"Drive hips up — don't let them drop. Rotational stability for every stroke.",search:"side plank swimmers stability"},
  {id:"hipflex",name:"Hip Flexor Stretch",sets:"2",reps:"30s each",gear:"Bodyweight",ageMin:8,cue:"Kneeling lunge, push hips forward. Tight hip flexors drag your legs down.",search:"hip flexor stretch swimmers"},
  {id:"ankflex",name:"Ankle Circles",sets:"2",reps:"20 each way",gear:"Bodyweight",ageMin:8,cue:"Rotate ankles in full circles both ways. More flexibility = more kick power.",search:"ankle flexibility swimmers"},
];

const TIPS = {
  freestyle:["Keep one goggle in the water when breathing — use the bow wave","Kick from the hip not the knee. Toes pointed = propulsion","Enter hand at 11 and 1 o'clock — never cross the centerline","High elbow catch: reach over a barrel before pulling","Breathe out continuously underwater — never hold your breath"],
  backstroke:["Pinky finger enters first — sets up your best catch position","Keep hips at the surface — lifted head sinks your hips and kills speed","Count strokes from the flags to the wall — memorize your number","Rotate 45° each side — hip-driven power","6-beat kick for all backstroke distances"],
  breaststroke:["Pull and kick NEVER happen at the same time — most common mistake","Heels to glutes — not knees forward which creates massive drag","Elbows squeeze in before shooting arms forward into streamline","The glide is free speed — don't rush out of it","One legal dolphin kick on every pullout — use it every wall"],
  butterfly:["TWO kicks per arm cycle — always, especially when tired","Head goes DOWN before hands enter — reduces drag dramatically","Hands enter at shoulder width — not crossed, not too wide","Low recovery skimming the surface saves energy","Underwater dolphin kicks off walls are faster than surface fly"],
  turns:["Count strokes from flags every practice until automatic","Tight tuck on flip turns — feet shoulder-width apart","Push off at 45° downward angle — not straight","Hold streamline until you feel yourself slow down","First stroke off every wall = full power, never ease in"],
  starts:["'Take your marks': shift weight forward over toes, coil like a spring","Drive hips UP and OUT — not just forward","Arms reach streamline BEFORE your hands enter the water","5-7 dolphin kicks underwater for sprint events","Head stays neutral on breakout — don't look up yet"],
};

const CHANNELS = [
  {name:"Effortless Swimming",url:"youtube.com/@EffortlessSwimming",icon:"🇦🇺",desc:"Best overall technique channel. Every stroke with underwater footage."},
  {name:"Skills N Talents",url:"youtube.com/@SkillsNTalents",icon:"🏆",desc:"#1 ranked swim channel. Step-by-step for all strokes, starts and turns."},
  {name:"The Race Club",url:"youtube.com/@TheRaceClub",icon:"🥇",desc:"Founded by Olympian Gary Hall Jr. Elite technique and race strategy."},
  {name:"GoSwim",url:"youtube.com/@GoSwimTV",icon:"📚",desc:"Massive drill library for every stroke and distance."},
  {name:"USA Swimming",url:"youtube.com/@USASwimming",icon:"🇺🇸",desc:"Official governing body. Race analysis and coaching insights."},
  {name:"Cody Miller",url:"youtube.com/@CodyMillerAdventures",icon:"🥈",desc:"Olympic bronze medalist. Real training and mindset content."},
];

const BADGES_DEF = [
  {id:"first_log",icon:"🌊",name:"First Splash",desc:"Logged your first time"},
  {id:"five_events",icon:"⚡",name:"Five Events",desc:"Logged 5 different events"},
  {id:"ten_logs",icon:"📊",name:"Data Driven",desc:"Logged 10 sessions"},
  {id:"pb_three",icon:"🔥",name:"On Fire",desc:"Set 3 personal bests"},
  {id:"all_strokes",icon:"🏆",name:"Complete Swimmer",desc:"Logged all 4 strokes"},
  {id:"sub_bonus",icon:"🌟",name:"Bonus Crusher",desc:"Hit a TAGS bonus time"},
  {id:"streak7",icon:"💎",name:"Week Warrior",desc:"7-day training streak"},
  {id:"race_analyst",icon:"🔬",name:"Race Analyst",desc:"Completed a split analysis"},
  {id:"split_master",icon:"🎯",name:"Split Master",desc:"Negative split in a race"},
];

const DAILY_MISSIONS = [
  {id:"log_today",icon:"📝",text:"Log a practice time today",xp:20},
  {id:"read_tip",icon:"📖",text:"Read one technique tip",xp:10},
  {id:"check_tags",icon:"⭐",text:"Check your TAGS progress",xp:10},
  {id:"do_dryland",icon:"💪",text:"Complete 3 dryland exercises",xp:25},
  {id:"drink_water",icon:"💧",text:"Track your hydration today",xp:10},
  {id:"race_plan",icon:"🏁",text:"Write your next race plan",xp:15},
  {id:"coach_question",icon:"🤖",text:"Ask your AI coach one question",xp:15},
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function parseTime(s){if(!s)return null;s=String(s).trim();if(s.includes(":")){const p=s.split(":");return parseFloat(p[0])*60+parseFloat(p[1]);}return parseFloat(s);}
function fmt(s){if(!s||isNaN(s))return"—";if(s>=60){const m=Math.floor(s/60);return m+":"+(s%60).toFixed(2).padStart(5,"0");}return s.toFixed(2);}
function pct(t,q,b){if(!t||!q)return 0;if(t<=b)return 100;if(t<=q)return 95;const d=t-q;return Math.max(5,Math.min(90,90-((d/q)*400)));}
function statusColor(t,q,b){if(!t)return"#3a5a7a";if(t<=b)return"#ffd700";if(t<=q)return"#00ffaa";const d=t-q;if(d<=2)return"#ff9f43";if(d<=6)return"#ffd32a";return"#ff6b6b";}
function statusLabel(t,q,b){if(!t)return null;if(t<=b)return"🌟 BONUS";if(t<=q)return"✅ QUALIFIED";const d=(t-q).toFixed(2);return d+"s to go";}
const LS="swimiq_launch_v1";
function load(){try{return JSON.parse(localStorage.getItem(LS))||{};}catch{return{};}}
function save(d){try{localStorage.setItem(LS,JSON.stringify(d));}catch{}}
const IS={display:"block",width:"100%",marginBottom:4,background:"rgba(13,27,42,0.95)",border:"1px solid rgba(77,184,255,0.25)",color:"#e8f4ff",borderRadius:10,padding:"10px 12px",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};
const SS={...IS,cursor:"pointer"};
function Chip({on,onClick,children,color}){return<button onClick={onClick} style={{padding:"7px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:on?(color||"#1a5fff"):"rgba(255,255,255,0.07)",color:on?"#fff":"#7aa8cc",transition:"all 0.15s"}}>{children}</button>;}
function Card({children,style}){return<div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(77,184,255,0.1)",marginBottom:12,...style}}>{children}</div>;}
function SectionTitle({children,color}){return<div style={{fontSize:11,color:color||"#4db8ff",fontWeight:700,letterSpacing:1.5,marginBottom:8,textTransform:"uppercase"}}>{children}</div>;}
function Lbl({children}){return<div style={{fontSize:11,color:"#7aa8cc",letterSpacing:0.5,marginBottom:4,marginTop:8}}>{children}</div>;}
function MiniBar({value,color,max}){const w=Math.max(4,Math.min(100,(value/(max||100))*100));return<div style={{height:6,background:"rgba(255,255,255,0.07)",borderRadius:3,marginTop:6}}><div style={{width:w+"%",height:"100%",borderRadius:3,background:color||"linear-gradient(90deg,#1a5fff,#00ffaa)",transition:"width 0.5s"}}/></div>;}

// Sparkline component
function Sparkline({data,color}){
  if(!data||data.length<2)return<div style={{fontSize:9,color:"#3a5a7a"}}>Log more times</div>;
  const max=Math.max(...data);const min=Math.min(...data);
  const range=max-min||1;const w=60;const h=24;
  const pts=data.map((v,i)=>({x:(i/(data.length-1))*w,y:h-((v-min)/range)*h}));
  const path=pts.map((p,i)=>(i===0?"M":"L")+p.x.toFixed(1)+","+p.y.toFixed(1)).join(" ");
  const improved=data[data.length-1]<data[0];
  return<svg width={w} height={h} style={{overflow:"visible"}}>
    <path d={path} stroke={color||(improved?"#00ffaa":"#ff6b6b")} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    {pts.map((p,i)=>i===pts.length-1&&<circle key={i} cx={p.x} cy={p.y} r="3" fill={color||(improved?"#00ffaa":"#ff6b6b")}/>)}
  </svg>;
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function SwimIQ(){
  const[tab,setTab]=useState("home");
  const[setup,setSetup]=useState(()=>!!(load().profile?.name?.length>1));
  const[profile,setProfile]=useState(()=>load().profile||{name:"",age:13,gender:"boys",ageGroup:"13-14",mode:"competitive"});
  const[times,setTimes]=useState(()=>load().times||{});
  const[logs,setLogs]=useState(()=>load().logs||[]);
  const[xp,setXP]=useState(()=>load().xp||0);
  const[squad,setSquad]=useState(()=>load().squad||[]);
  const[cl,setCl]=useState(()=>load().cl||{});
  const[meets,setMeets]=useState(()=>load().meets||[]);
  const[goals,setGoals]=useState(()=>load().goals||[]);
  const[missions,setMissions]=useState(()=>load().missions||{});
  const[notes,setNotes]=useState(()=>load().notes||[]);
  const[toast,setToast]=useState(null);
  // log form
  const[lSt,setLSt]=useState("");const[lTm,setLTm]=useState("");
  const[lDt,setLDt]=useState(new Date().toISOString().split("T")[0]);
  const[lMt,setLMt]=useState("");
  // photo
  const[pStep,setPStep]=useState("idle");const[pPrev,setPPrev]=useState(null);
  const[pFile,setPFile]=useState(null);const[pRes,setPRes]=useState(null);const[pErr,setPErr]=useState("");
  const pRef=useRef(null);
  // ai
  const[aiQ,setAiQ]=useState("");const[aiA,setAiA]=useState("");const[aiLoad,setAiLoad]=useState(false);
  // ui state
  const[skillCat,setSkillCat]=useState("freestyle");const[skillView,setSkillView]=useState("tips");
  const[trainView,setTrainView]=useState("dryland");const[trainStroke,setTrainStroke]=useState("freestyle");const[trainLevel,setTrainLevel]=useState("intermediate");
  const[nutrTab,setNutrTab]=useState("daily");
  const[exOpen,setExOpen]=useState(null);
  const[convTab,setConvTab]=useState("scy");
  const[convEvent,setConvEvent]=useState("100 Free");const[convTime,setConvTime]=useState("");
  const[splitEvent,setSplitEvent]=useState("");const[splitTimes,setSplitTimes]=useState(["","","","","","","","",""]);const[splitResult,setSplitResult]=useState(null);
  const[strokeStroke,setStrokeStroke]=useState("freestyle");const[strokeCount,setStrokeCount]=useState("");const[strokeTime,setStrokeTime]=useState("");const[strokeResult,setStrokeResult]=useState(null);
  // meet form
  const[mName,setMName]=useState("");const[mDate,setMDate]=useState("");const[mLoc,setMLoc]=useState("");const[mEvents,setMEvents]=useState([]);
  // goal form
  const[gEvent,setGEvent]=useState("");const[gTarget,setGTarget]=useState("");const[gDeadline,setGDeadline]=useState("");
  // note form
  const[nMood,setNMood]=useState("Good");const[nTags,setNTags]=useState([]);const[nNotes,setNNotes]=useState("");
  // squad form
  const[sN,setSN]=useState("");const[sEv,setSEv]=useState("");const[sTm,setSTm]=useState("");
  // taper
  const[nextMeet,setNextMeet]=useState("");

  const tagsP=(TAGS[profile.gender]&&TAGS[profile.gender][profile.ageGroup])||{};
  const tagsKeys=Object.keys(tagsP);
  const todayKey=new Date().toISOString().split("T")[0];
  const age=parseInt(profile.age)||13;
  const nutrAge=age<=10?"10U":age<=12?"11-12":age<=14?"13-14":"adult";

  useEffect(()=>{save({profile,times,logs,xp,squad,cl,meets,goals,missions,notes});},[profile,times,logs,xp,squad,cl,meets,goals,missions,notes]);

  function notify(msg,color){setToast({msg,color:color||"#00ffaa"});setTimeout(()=>setToast(null),3200);}
  function addXP(n,r){setXP(p=>p+n);notify("+"+n+" XP — "+r,"#ffd700");}

  // Streak
  const streak=(()=>{let c=0;const d=new Date();for(let i=0;i<60;i++){const k=d.toISOString().split("T")[0];if(Object.values(cl[k]||{}).some(Boolean))c++;else if(i>0)break;d.setDate(d.getDate()-1);}return c;})();

  // XP Level
  const level=Math.floor(xp/200)+1;
  const lvlPct=((xp%200)/200*100).toFixed(0);
  const lvlNames=["Tadpole","Minnow","Lane 4","Competitor","Qualifier","Finalist","All-Star","Elite","Champion","Legend"];
  const lvlName=lvlNames[Math.min(level-1,9)];

  // Stats
  const qualified=tagsKeys.filter(s=>times[s]&&tagsP[s]&&times[s]<=tagsP[s].q);
  const bonusTimes=tagsKeys.filter(s=>times[s]&&tagsP[s]&&times[s]<=tagsP[s].b);
  const totalPBs=logs.filter(l=>l.isPB).length;

  // Badges
  const earnedBadges=BADGES_DEF.filter(b=>{
    if(b.id==="first_log")return logs.length>=1;
    if(b.id==="five_events")return Object.keys(times).length>=5;
    if(b.id==="ten_logs")return logs.length>=10;
    if(b.id==="pb_three")return totalPBs>=3;
    if(b.id==="all_strokes"){const s=Object.keys(times);return["Free","Back","Breast","Fly"].every(st=>s.some(k=>k.includes(st)));}
    if(b.id==="sub_bonus")return bonusTimes.length>0;
    if(b.id==="streak7")return streak>=7;
    if(b.id==="race_analyst")return splitResult!==null;
    if(b.id==="split_master")return splitResult?.isNegative;
    return false;
  });

  // Daily missions reset
  const todayMissions=missions[todayKey]||{};
  const missionsDone=DAILY_MISSIONS.filter(m=>todayMissions[m.id]).length;

  // Event history for sparklines
  function getEventHistory(stroke){return logs.filter(l=>l.stroke===stroke).slice(0,5).reverse().map(l=>l.time);}

  // Course conversion
  function convertTime(){
    const secs=parseTime(convTime);if(!secs)return null;
    const f=COURSE_FACTORS[convEvent]||{scyToLcm:1.09,scyToScm:1.04};
    return{scy:secs,lcm:secs*f.scyToLcm,scm:secs*f.scyToScm};
  }

  // Taper countdown
  const taperDays=(()=>{if(!nextMeet)return null;const d=new Date(nextMeet)-new Date();return Math.ceil(d/86400000);}());
  const taperPhase=taperDays===null?null:taperDays>14?"Build":taperDays>7?"Taper":taperDays>3?"Peak":taperDays>0?"Race Week":"MEET DAY!";
  const taperColor=taperDays===null?"#7aa8cc":taperDays>14?"#4db8ff":taperDays>7?"#ffd700":taperDays>3?"#ff9f43":"#00ffaa";

  // Radar chart data for event strength
  const radarData=["Free","Back","Breast","Fly","IM"].map(stroke=>{
    const eventKey=Object.keys(times).find(k=>k.includes(stroke)&&k.startsWith("100"))||Object.keys(times).find(k=>k.includes(stroke))||"";
    const t=times[eventKey];const tags=tagsP[eventKey];
    const score=t&&tags?Math.max(0,Math.min(100,100-(((t-tags.q)/tags.q)*500))):0;
    return{stroke,score:Math.round(score)};
  });

  // Training load chart (last 7 days)
  const loadChart=(()=>{const days=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=d.toISOString().split("T")[0];const count=Object.values(cl[k]||{}).filter(Boolean).length;days.push({day:d.toLocaleDateString("en",{weekday:"short"}),exercises:count});}return days;})();

  // Progress chart data
  const progressChart=tagsKeys.slice(0,6).map(s=>{
    const t=times[s];const tags=tagsP[s];
    const p=t&&tags?Math.max(0,Math.min(100,100-(((t-tags.q)/tags.q)*500))):0;
    return{event:s.replace("Free","Fr").replace("Back","Bk").replace("Breast","Br").replace("Butterfly","Fly"),progress:Math.round(p),color:t&&tags&&t<=tags.q?"#00ffaa":t&&tags&&t<=tags.q+2?"#ff9f43":"#4db8ff"};
  });

  // TAGS qualification pie
  const pieData=[
    {name:"Qualified",value:qualified.length,color:"#00ffaa"},
    {name:"In Progress",value:tagsKeys.length-qualified.length,color:"rgba(255,255,255,0.1)"},
  ];

  function doLog(){
    const secs=parseTime(lTm);
    if(!secs||!lSt){notify("Pick an event and enter a time!","#ff6b6b");return;}
    const tags=tagsP[lSt];
    const isPB=!times[lSt]||secs<times[lSt];
    const isBonus=!!(tags&&secs<=tags.b);
    const isQual=!!(tags&&secs<=tags.q);
    if(isPB)setTimes(p=>({...p,[lSt]:secs}));
    setLogs(p=>[{stroke:lSt,time:secs,date:lDt,meet:lMt,isPB,isBonus,id:Date.now()},...p]);
    setLTm("");setLMt("");
    // Complete daily mission
    setMissions(p=>({...p,[todayKey]:{...p[todayKey],log_today:true}}));
    if(isPB&&isBonus)addXP(150,"BONUS time! 🌟");
    else if(isPB&&isQual)addXP(100,"TAGS qualified! 🎯");
    else if(isPB)addXP(50,"New personal best! 🔥");
    else addXP(15,"Time logged 💧");
  }

  function handlePhoto(e){const f=e.target.files?.[0];if(!f)return;setPFile(f);setPRes(null);setPErr("");setPStep("preview");const r=new FileReader();r.onload=ev=>setPPrev(ev.target.result);r.readAsDataURL(f);}
  function resetPhoto(){setPStep("idle");setPPrev(null);setPFile(null);setPRes(null);setPErr("");if(pRef.current)pRef.current.value="";}

  async function scanPhoto(){
    if(!pFile)return;setPStep("scanning");
    try{
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(pFile);});
      const resp=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:800,system:'Extract swim meet times from this image. Return ONLY a JSON array, no other text: [{"event":"100 Free","time":"54.23","meet":"name or null","date":"YYYY-MM-DD or null"}]. Map event names to standard names. If no times found return [].',messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:pFile.type||"image/jpeg",data:b64}},{type:"text",text:"Extract all swim times. Return only JSON array."}]}]})});
      const data=await resp.json();
      const raw=data.content?.find(b=>b.type==="text")?.text||"[]";
      const parsed=JSON.parse(raw.replace(/```json|```/g,"").trim());
      if(!Array.isArray(parsed)||!parsed.length){setPErr("No times found. Try a clearer screenshot.");setPStep("preview");}
      else{setPRes(parsed.map(r=>({...r,selected:true,recognized:!!tagsP[r.event]})));setPStep("review");}
    }catch{setPErr("Scan failed — try again.");setPStep("preview");}
  }

  function importPhotos(){
    const toImport=pRes.filter(r=>r.selected);
    if(!toImport.length){notify("Select at least one time","#ff6b6b");return;}
    const newT={...times};const newE=[];
    toImport.forEach(r=>{const secs=parseTime(r.time);if(!secs)return;const tags=tagsP[r.event];const isPB=!newT[r.event]||secs<newT[r.event];const isBonus=!!(tags&&secs<=tags.b);if(isPB)newT[r.event]=secs;newE.push({stroke:r.event,time:secs,date:r.date||todayKey,meet:r.meet||"Photo import",isPB,isBonus,id:Date.now()+Math.random()});});
    setTimes(newT);setLogs(p=>[...newE,...p]);
    const xpE=newE.reduce((a,e)=>a+(e.isBonus?150:e.isPB?50:15),0);
    setXP(p=>p+xpE);setPStep("done");
    notify(`Imported ${toImport.length} times! +${xpE} XP`,"#00ffaa");
  }

  async function askCoach(q){
    setAiLoad(true);setAiA("");
    const summary=tagsKeys.map(s=>{const t=times[s];const tg=tagsP[s];if(!t||!tg)return null;return`${s}: ${fmt(t)} (${t<=tg.q?"QUALIFIED":(t-tg.q).toFixed(2)+"s from cut"})`;}).filter(Boolean).join(", ");
    try{
      const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:1000,system:`You are an elite USA Swimming coach. Coaching ${profile.name}, age ${profile.age}, ${profile.gender==="boys"?"male":"female"}, ${profile.ageGroup} age group, goal: ${profile.mode}. Be encouraging, specific, science-based. Use emojis. Under 220 words. Times: ${summary||"none logged yet"}.`,messages:[{role:"user",content:q}]})});
      const d=await r.json();
      const block=d.content?.find(b=>b.type==="text");
      setAiA(block?.text||"Coach unavailable — try again!");
      // Complete daily mission
      setMissions(p=>({...p,[todayKey]:{...p[todayKey],coach_question:true}}));
    }catch{setAiA("Could not reach AI Coach. Check your connection.");}
    setAiLoad(false);
  }

  function analyzeSplits(){
    const filledSplits=splitTimes.filter(t=>t.trim());
    if(filledSplits.length<2){notify("Enter at least 2 splits","#ff6b6b");return;}
    const parsed=filledSplits.map(t=>parseFloat(t)).filter(t=>!isNaN(t));
    const total=parsed.reduce((a,b)=>a+b,0);
    const first=parsed.slice(0,Math.ceil(parsed.length/2)).reduce((a,b)=>a+b,0);
    const second=parsed.slice(Math.ceil(parsed.length/2)).reduce((a,b)=>a+b,0);
    const isNegative=second<first;
    const fastest=Math.min(...parsed);const slowest=Math.max(...parsed);
    const dropOff=((slowest-fastest)/fastest*100).toFixed(1);
    setS(splitResult,setSplitResult)({parsed,total,isNegative,dropOff,fastest,slowest});
    addXP(30,"Race analyzed! 🔬");
  }
  function setS(cur,setter){return(v)=>{setter(v);};}

  function calcStroke(){
    const count=parseInt(strokeCount);const secs=parseFloat(strokeTime);
    if(!count||!secs){notify("Enter both stroke count and time","#ff6b6b");return;}
    const rate=(count/secs)*60;
    const dps=(50/count).toFixed(2);
    const eliteRanges={freestyle:{min:40,max:60},backstroke:{min:42,max:62},breaststroke:{min:30,max:50},butterfly:{min:40,max:58}};
    const range=eliteRanges[strokeStroke]||{min:40,max:60};
    const status=rate>=range.min&&rate<=range.max?"Elite Range 🌟":rate<range.min?"Too Slow — increase tempo":"Too Fast — may be sacrificing DPS";
    setStrokeResult({rate:rate.toFixed(1),dps,status,range});
  }

  const TABS=[{id:"home",icon:"🏠",l:"Home"},{id:"log",icon:"📸",l:"Log"},{id:"train",icon:"💪",l:"Train"},{id:"skills",icon:"🎬",l:"Skills"},{id:"meets",icon:"📅",l:"Meets"},{id:"progress",icon:"📈",l:"Stats"},{id:"squad",icon:"👥",l:"Squad"},{id:"coach",icon:"🤖",l:"Coach"},{id:"nutrition",icon:"🥗",l:"Fuel"},{id:"family",icon:"❤️",l:"Family"}];

  const nameCode=(profile.name||"SWIM").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4)||"SWIM";
  const numCode=String(((profile.name||"X").length*37+parseInt(profile.age||0)*13+99)).slice(-4);
  const familyCode=nameCode+"-"+numCode;

  // SETUP
  if(!setup)return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:420,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:80,marginBottom:8,filter:"drop-shadow(0 0 20px rgba(0,150,255,0.6))"}}>🏊</div>
          <h1 style={{fontSize:42,fontWeight:900,margin:"0 0 4px",background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SwimIQ</h1>
          <div style={{fontSize:11,color:"#4db8ff",letterSpacing:3,fontWeight:700,marginBottom:4}}>TRAIN SMART. SWIM FAST.</div>
          <div style={{fontSize:12,color:"#7aa8cc"}}>The all-in-one swim app for every swimmer, every goal.</div>
        </div>
        <Lbl>Your Name</Lbl><input placeholder="e.g. Alex" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))} style={IS}/>
        <Lbl>Age</Lbl><input type="number" placeholder="13" value={profile.age} onChange={e=>setProfile(p=>({...p,age:e.target.value}))} style={IS}/>
        <Lbl>Gender</Lbl>
        <div style={{display:"flex",gap:8,marginBottom:4}}>{["boys","girls"].map(g=><Chip key={g} on={profile.gender===g} onClick={()=>setProfile(p=>({...p,gender:g}))}>{g==="boys"?"👦 Boy":"👧 Girl"}</Chip>)}</div>
        <Lbl>Age Group</Lbl>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>{["10U","11-12","13-14","15-18","Adult"].map(g=><Chip key={g} on={profile.ageGroup===g} onClick={()=>setProfile(p=>({...p,ageGroup:g}))}>{g}</Chip>)}</div>
        <Lbl>Primary Goal</Lbl>
        <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>{[["competitive","🏆 Compete"],["tags","⭐ TAGS"],["recreational","🌊 Fitness"],["technique","🎯 Technique"],["masters","🧓 Masters"]].map(([v,l])=><Chip key={v} on={profile.mode===v} onClick={()=>setProfile(p=>({...p,mode:v}))}>{l}</Chip>)}</div>
        <button onClick={()=>{if(profile.name.trim())setSetup(true);else notify("Enter your name first!","#ff6b6b");}} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:17,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 0 30px rgba(0,120,255,0.4)"}}>
          Let's Go! 🚀
        </button>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628,#060e1a)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff"}}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(77,184,255,0.2);border-radius:2px;}"}</style>

      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#0d1b2a",border:"1.5px solid "+toast.color,color:toast.color,padding:"10px 22px",borderRadius:12,fontWeight:700,zIndex:9999,fontSize:14,whiteSpace:"nowrap",boxShadow:"0 0 20px "+toast.color+"55"}}>{toast.msg}</div>}

      {/* HEADER */}
      <div style={{padding:"12px 16px 0",position:"sticky",top:0,background:"rgba(8,13,24,0.97)",backdropFilter:"blur(12px)",zIndex:100,borderBottom:"1px solid rgba(77,184,255,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:28,filter:"drop-shadow(0 0 10px rgba(0,150,255,0.5))"}}>🏊</div>
            <div>
              <div style={{fontSize:20,fontWeight:900,background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>SwimIQ</div>
              <div style={{fontSize:9,color:"#7aa8cc",letterSpacing:1}}>Hey {profile.name} 👋</div>
            </div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:10,color:"#4db8ff",fontWeight:700}}>Lvl {level} · {lvlName}</div>
            <div style={{width:80,height:5,background:"rgba(255,255,255,0.08)",borderRadius:3,marginTop:3}}><div style={{width:lvlPct+"%",height:"100%",borderRadius:3,background:"linear-gradient(90deg,#1a5fff,#00ffaa)"}}/></div>
            <div style={{fontSize:9,color:"#7aa8cc",marginTop:2}}>{xp} XP</div>
          </div>
        </div>
        {/* Quick stats */}
        <div style={{display:"flex",gap:5,marginBottom:10}}>
          {[{v:Object.keys(times).length,l:"Times"},{v:qualified.length,l:"TAGS ✓",c:"#00ffaa"},{v:earnedBadges.length,l:"Badges",c:"#ffd700"},{v:streak,l:"Streak 🔥",c:"#ff9f43"},{v:missionsDone,l:"Missions",c:"#a78bfa"}].map(s=>(
            <div key={s.l} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"5px 3px",textAlign:"center",border:"1px solid rgba(77,184,255,0.1)"}}>
              <div style={{fontSize:15,fontWeight:900,color:s.c||"#4db8ff"}}>{s.v}</div>
              <div style={{fontSize:7,color:"#7aa8cc"}}>{s.l}</div>
            </div>
          ))}
        </div>
        {/* Tabs */}
        <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:8}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"6px 8px",borderRadius:9,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:"inherit",background:tab===t.id?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:tab===t.id?"#fff":"#7aa8cc",boxShadow:tab===t.id?"0 0 10px rgba(0,120,255,0.3)":"none"}}>
              {t.icon} {t.l}
            </button>
          ))}
        </div>
      </div>

      <div style={{padding:"12px 16px 100px"}}>

        {/* ── HOME / DASHBOARD ── */}
        {tab==="home"&&<>
          {/* TAPER COUNTDOWN */}
          <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.12),rgba(0,200,100,0.08))",border:"1px solid rgba(77,184,255,0.2)",marginBottom:12}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
              <div style={{flex:1}}>
                <SectionTitle color="#4db8ff">🏁 NEXT MEET COUNTDOWN</SectionTitle>
                <input type="date" value={nextMeet} onChange={e=>setNextMeet(e.target.value)} style={{...IS,marginBottom:0,fontSize:12,padding:"6px 10px"}} placeholder="Set target meet date"/>
              </div>
              {taperDays!==null&&<div style={{textAlign:"center",marginLeft:16}}>
                <div style={{fontSize:32,fontWeight:900,color:taperColor}}>{taperDays>0?taperDays:"🎉"}</div>
                <div style={{fontSize:10,color:taperColor,fontWeight:700}}>{taperPhase}</div>
              </div>}
            </div>
          </Card>

          {/* DAILY MISSIONS */}
          <Card style={{marginBottom:12}}>
            <SectionTitle color="#a78bfa">⚡ TODAY'S MISSIONS</SectionTitle>
            <div style={{marginBottom:8}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"#7aa8cc",marginBottom:4}}>
                <span>{missionsDone}/{DAILY_MISSIONS.length} complete</span>
                <span style={{color:"#a78bfa",fontWeight:700}}>+{DAILY_MISSIONS.filter(m=>todayMissions[m.id]).reduce((a,m)=>a+m.xp,0)} XP earned</span>
              </div>
              <MiniBar value={missionsDone} max={DAILY_MISSIONS.length} color="linear-gradient(90deg,#a78bfa,#4db8ff)"/>
            </div>
            {DAILY_MISSIONS.map(m=>{
              const done=!!todayMissions[m.id];
              return<div key={m.id} onClick={()=>{if(!done){setMissions(p=>({...p,[todayKey]:{...p[todayKey],[m.id]:true}}));addXP(m.xp,m.text+" ✓");}}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:9,marginBottom:5,cursor:done?"default":"pointer",background:done?"rgba(0,255,170,0.06)":"rgba(255,255,255,0.03)",border:"1px solid "+(done?"rgba(0,255,170,0.2)":"rgba(255,255,255,0.06)")}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:done?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",fontWeight:900,flexShrink:0}}>{done?"✓":""}</div>
                <div style={{flex:1,fontSize:12,color:done?"#7aa8cc":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{m.icon} {m.text}</div>
                <div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>+{m.xp}</div>
              </div>;
            })}
          </Card>

          {/* CHARTS ROW */}
          {tagsKeys.length>0&&<>
            {/* TAGS Progress Bar Chart */}
            <Card style={{marginBottom:12}}>
              <SectionTitle color="#00ffaa">📊 TAGS PROGRESS</SectionTitle>
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={progressChart} margin={{top:0,right:0,left:-30,bottom:20}}>
                  <XAxis dataKey="event" tick={{fill:"#7aa8cc",fontSize:9}} angle={-35} textAnchor="end"/>
                  <YAxis domain={[0,100]} tick={{fill:"#7aa8cc",fontSize:9}}/>
                  <Tooltip contentStyle={{background:"#0d1b2a",border:"1px solid rgba(77,184,255,0.3)",borderRadius:8,fontSize:11}} formatter={v=>[v+"%","Progress"]}/>
                  <Bar dataKey="progress" radius={[4,4,0,0]}>
                    {progressChart.map((e,i)=><Cell key={i} fill={e.progress>=100?"#00ffaa":e.progress>=80?"#ff9f43":"#4db8ff"}/>)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* TWO COLUMN CHARTS */}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
              {/* Pie: qualified */}
              <Card style={{margin:0}}>
                <SectionTitle color="#00ffaa">🎯 QUALIFIED</SectionTitle>
                <ResponsiveContainer width="100%" height={100}>
                  <PieChart>
                    <Pie data={pieData.filter(d=>d.value>0)} cx="50%" cy="50%" innerRadius={28} outerRadius={45} paddingAngle={3} dataKey="value">
                      {pieData.map((e,i)=><Cell key={i} fill={e.color}/>)}
                    </Pie>
                    <Tooltip contentStyle={{background:"#0d1b2a",border:"none",fontSize:10}}/>
                  </PieChart>
                </ResponsiveContainer>
                <div style={{textAlign:"center",fontSize:11,color:"#7aa8cc"}}>{qualified.length}/{tagsKeys.length} events</div>
              </Card>

              {/* Radar: stroke strength */}
              <Card style={{margin:0}}>
                <SectionTitle color="#4db8ff">💪 STRENGTHS</SectionTitle>
                <ResponsiveContainer width="100%" height={110}>
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)"/>
                    <PolarAngleAxis dataKey="stroke" tick={{fill:"#7aa8cc",fontSize:8}}/>
                    <Radar dataKey="score" stroke="#4db8ff" fill="#4db8ff" fillOpacity={0.3}/>
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            {/* Training load */}
            <Card style={{marginBottom:12}}>
              <SectionTitle color="#ffd700">🔥 TRAINING LOAD (7 DAYS)</SectionTitle>
              <ResponsiveContainer width="100%" height={80}>
                <BarChart data={loadChart} margin={{top:0,right:0,left:-30,bottom:0}}>
                  <XAxis dataKey="day" tick={{fill:"#7aa8cc",fontSize:9}}/>
                  <YAxis tick={{fill:"#7aa8cc",fontSize:9}}/>
                  <Tooltip contentStyle={{background:"#0d1b2a",border:"none",fontSize:10}}/>
                  <Bar dataKey="exercises" fill="#ffd700" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </>}

          {/* EVENT CARDS WITH SPARKLINES */}
          <SectionTitle>🏊 EVENTS</SectionTitle>
          {tagsKeys.length===0
            ?<Card style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:48}}>🏊</div><div style={{color:"#7aa8cc",marginTop:10}}>Tap 📸 Log to enter your first time!</div></Card>
            :tagsKeys.map(s=>{
              const myT=times[s];const tags=tagsP[s];
              const sc=statusColor(myT,tags?.q,tags?.b);
              const sl=statusLabel(myT,tags?.q,tags?.b);
              const history=getEventHistory(s);
              const p=myT&&tags?Math.max(5,Math.min(100,100-(((myT-tags.q)/tags.q)*400))):0;
              return<div key={s} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid "+(myT&&tags&&myT<=tags.q?"rgba(0,255,170,0.2)":"rgba(77,184,255,0.08)")}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:13}}>{s}</div>
                    <div style={{fontSize:10,color:"#7aa8cc",marginTop:1}}>Cut: <span style={{color:"#4db8ff",fontWeight:700}}>{fmt(tags?.q)}</span> · Bonus: <span style={{color:"#ffd700",fontWeight:700}}>{fmt(tags?.b)}</span></div>
                    {sl&&<div style={{fontSize:10,color:sc,fontWeight:700,marginTop:2}}>{sl}</div>}
                  </div>
                  <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                    <div style={{fontSize:20,fontWeight:900,color:myT?sc:"#2a4a6a"}}>{fmt(myT)}</div>
                    {history.length>=2&&<Sparkline data={history} color={sc}/>}
                  </div>
                </div>
                <MiniBar value={p} max={100} color={myT&&tags&&myT<=tags.b?"#ffd700":myT&&tags&&myT<=tags.q?"#00ffaa":"linear-gradient(90deg,#1a5fff,#4db8ff)"}/>
              </div>;
            })
          }

          {/* COURSE CONVERTER */}
          <Card style={{marginTop:4}}>
            <SectionTitle color="#f87171">🔄 COURSE CONVERTER (SCY ↔ LCM ↔ SCM)</SectionTitle>
            <Lbl>Event</Lbl>
            <select value={convEvent} onChange={e=>setConvEvent(e.target.value)} style={SS}>
              {Object.keys(COURSE_FACTORS).map(e=><option key={e}>{e}</option>)}
            </select>
            <Lbl>Your SCY Time</Lbl>
            <input value={convTime} onChange={e=>setConvTime(e.target.value)} placeholder="e.g. 54.23" style={IS}/>
            {convTime&&(()=>{const r=convertTime();if(!r)return null;return<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginTop:8}}>
              {[{label:"SCY",val:fmt(r.scy),color:"#4db8ff"},{label:"LCM",val:fmt(r.lcm),color:"#00ffaa"},{label:"SCM",val:fmt(r.scm),color:"#ffd700"}].map(c=><div key={c.label} style={{textAlign:"center",padding:"10px 4px",background:"rgba(255,255,255,0.04)",borderRadius:10,border:"1px solid rgba(255,255,255,0.06)"}}>
                <div style={{fontSize:9,color:"#7aa8cc",marginBottom:3}}>{c.label}</div>
                <div style={{fontSize:15,fontWeight:900,color:c.color}}>{c.val}</div>
              </div>)}
            </div>;})()}
          </Card>
        </>}

        {/* ── LOG ── */}
        {tab==="log"&&<>
          <Card style={{border:"1px solid rgba(0,255,170,0.2)",background:"linear-gradient(135deg,rgba(0,255,170,0.04),rgba(0,100,255,0.06))"}}>
            <SectionTitle color="#00ffaa">📸 SCAN MEET RESULTS</SectionTitle>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Screenshot from Meet Mobile → AI reads all times instantly</div>
            {pStep==="idle"&&<><input ref={pRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}} id="pIn"/><label htmlFor="pIn" style={{display:"block",width:"100%",padding:"14px 0",borderRadius:12,border:"2px dashed rgba(0,255,170,0.4)",textAlign:"center",cursor:"pointer",color:"#00ffaa",fontWeight:800,fontSize:14}}>📂 Tap to upload screenshot</label></>}
            {pStep==="preview"&&pPrev&&<><img src={pPrev} alt="preview" style={{width:"100%",borderRadius:10,marginBottom:10,maxHeight:200,objectFit:"cover"}}/>{pErr&&<div style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>⚠️ {pErr}</div>}<div style={{display:"flex",gap:8}}><button onClick={scanPhoto} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>🔍 Scan for Times</button><button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>✕</button></div></>}
            {pStep==="scanning"&&<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:30}}>🧠</div><div style={{color:"#00ffaa",fontWeight:800,marginTop:6}}>AI is reading your results...</div></div>}
            {pStep==="review"&&pRes&&<>
              <div style={{fontSize:12,fontWeight:800,color:"#00ffaa",marginBottom:8}}>Found {pRes.length} times — tap to select:</div>
              {pRes.map((r,i)=><div key={i} onClick={()=>setPRes(p=>p.map((x,j)=>j===i?{...x,selected:!x.selected}:x))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",borderRadius:10,marginBottom:6,cursor:"pointer",background:r.selected?"rgba(0,255,170,0.07)":"rgba(255,255,255,0.03)",border:"1px solid "+(r.selected?"rgba(0,255,170,0.3)":"rgba(255,255,255,0.07)")}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:r.selected?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#000",fontWeight:900,flexShrink:0}}>{r.selected?"✓":""}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{r.event}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{r.meet||""}{r.date?" · "+r.date:""}{!r.recognized?" · ⚠ unknown":""}</div></div>
                <div style={{fontSize:18,fontWeight:900,color:r.recognized?"#4db8ff":"#7aa8cc"}}>{r.time}</div>
              </div>)}
              <div style={{display:"flex",gap:8,marginTop:4}}><button onClick={importPhotos} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>⬇️ Import</button><button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>Cancel</button></div>
            </>}
            {pStep==="done"&&<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:32}}>🎉</div><div style={{color:"#00ffaa",fontWeight:900,marginBottom:12}}>Times imported!</div><button onClick={resetPhoto} style={{padding:"10px 24px",borderRadius:10,border:"1px solid rgba(0,255,170,0.3)",background:"rgba(0,255,170,0.08)",color:"#00ffaa",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Scan Another</button></div>}
          </Card>

          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}><div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/><div style={{fontSize:11,color:"#3a5a7a",fontWeight:700}}>OR LOG MANUALLY</div><div style={{flex:1,height:1,background:"rgba(255,255,255,0.06)"}}/></div>

          <Card>
            <SectionTitle color="#4db8ff">LOG A TIME</SectionTitle>
            <Lbl>Event</Lbl>
            <select value={lSt} onChange={e=>setLSt(e.target.value)} style={SS}>
              <option value="">Pick an event</option>
              {tagsKeys.length>0&&<optgroup label="TAGS Events">{tagsKeys.map(s=><option key={s}>{s}</option>)}</optgroup>}
              <optgroup label="All Events">{ALL_EVENTS.filter(e=>!tagsKeys.includes(e)).map(s=><option key={s}>{s}</option>)}</optgroup>
            </select>
            <Lbl>Your Time (e.g. 54.23 or 1:02.45)</Lbl>
            <input value={lTm} onChange={e=>setLTm(e.target.value)} onKeyDown={e=>e.key==="Enter"&&doLog()} placeholder="ss.xx or m:ss.xx" style={{...IS,fontSize:22,fontWeight:900}}/>
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <div style={{flex:1}}><Lbl>Date</Lbl><input type="date" value={lDt} onChange={e=>setLDt(e.target.value)} style={IS}/></div>
              <div style={{flex:1}}><Lbl>Meet</Lbl><input value={lMt} onChange={e=>setLMt(e.target.value)} placeholder="Optional" style={IS}/></div>
            </div>
            <button onClick={doLog} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:16,cursor:"pointer",fontFamily:"inherit"}}>💾 LOG THIS TIME</button>
            {lTm&&lSt&&tagsP[lSt]&&(()=>{const secs=parseTime(lTm);const tags=tagsP[lSt];if(!secs)return null;const sc=statusColor(secs,tags.q,tags.b);const sl=statusLabel(secs,tags.q,tags.b);const diff=secs-tags.q;return<Card style={{marginTop:10,border:"1px solid "+sc+"44"}}><div style={{color:sc,fontWeight:800,fontSize:14,marginBottom:4}}>{sl||"✅ QUALIFIED"}</div><div style={{fontSize:12,color:"#7aa8cc"}}>Your: <b style={{color:"#fff"}}>{fmt(secs)}</b> · Cut: <b style={{color:"#4db8ff"}}>{fmt(tags.q)}</b> · Bonus: <b style={{color:"#ffd700"}}>{fmt(tags.b)}</b></div></Card>;})()}
          </Card>
        </>}

        {/* ── TRAIN ── */}
        {tab==="train"&&<>
          {/* Sub-nav */}
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[["dryland","💪 Dryland"],["pool","🏊 Pool"],["practice","📝 Notes"]].map(([v,l])=><button key={v} onClick={()=>setTrainView(v)} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:trainView===v?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:trainView===v?"#fff":"#7aa8cc"}}>{l}</button>)}
          </div>

          {trainView==="dryland"&&<>
            <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))",border:"1px solid rgba(0,255,170,0.15)",marginBottom:14}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div>
                  <SectionTitle color="#00ffaa">TODAY'S DRYLAND</SectionTitle>
                  <div style={{fontSize:12,color:"#d0e8ff"}}>Age-safe for {profile.name}, age {profile.age}</div>
                  {streak>0&&<div style={{fontSize:11,color:"#ffd700",fontWeight:700,marginTop:2}}>🔥 {streak}-day streak!</div>}
                </div>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:28,fontWeight:900,color:"#4db8ff"}}>{Math.round((DRYLAND.filter(e=>e.ageMin<=age&&!!(cl[todayKey]?.[e.id])).length/DRYLAND.filter(e=>e.ageMin<=age).length)*100)||0}%</div>
                  <div style={{fontSize:10,color:"#7aa8cc"}}>today</div>
                </div>
              </div>
              <MiniBar value={DRYLAND.filter(e=>e.ageMin<=age&&!!(cl[todayKey]?.[e.id])).length} max={DRYLAND.filter(e=>e.ageMin<=age).length} color="linear-gradient(90deg,#1a5fff,#00ffaa)"/>
              {age<=10&&<div style={{marginTop:8,padding:"6px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.2)",fontSize:10,color:"#ffd700"}}>Bodyweight and stretching only. No resistance bands.</div>}
              {age>10&&age<=12&&<div style={{marginTop:8,padding:"6px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.2)",fontSize:10,color:"#ffd700"}}>Light resistance bands OK. No weight training.</div>}
              {age>12&&age<=14&&<div style={{marginTop:8,padding:"6px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.2)",fontSize:10,color:"#ffd700"}}>Bands OK. No barbell lifting. Supervised dumbbells only.</div>}
              {age>18&&<div style={{marginTop:8,padding:"6px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.2)",fontSize:10,color:"#ffd700"}}>Full training OK. Prioritize recovery — it matters more as you age.</div>}
            </Card>
            {DRYLAND.filter(e=>e.ageMin<=age).map(ex=>{
              const done=!!(cl[todayKey]?.[ex.id]);const open=exOpen===ex.id;
              return<div key={ex.id} style={{borderRadius:12,marginBottom:8,overflow:"hidden",border:"1px solid "+(done?"rgba(0,255,170,0.3)":"rgba(77,184,255,0.1)"),background:done?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.03)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer"}} onClick={()=>setExOpen(open?null:ex.id)}>
                  <div onClick={e=>{e.stopPropagation();setCl(p=>{const day=p[todayKey]||{};return{...p,[todayKey]:{...day,[ex.id]:!day[ex.id]}};});if(!done)addXP(10,"Exercise done! 💪");}} style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:done?"#00ffaa":"rgba(255,255,255,0.08)",border:"2px solid "+(done?"#00ffaa":"rgba(255,255,255,0.15)"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000",fontWeight:900,cursor:"pointer"}}>{done?"✓":""}</div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13,color:done?"#00ffaa":"#e8f4ff",textDecoration:done?"line-through":"none",opacity:done?0.7:1}}>{ex.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:1}}>{ex.sets} sets · {ex.reps} · {ex.gear}</div></div>
                  <div style={{fontSize:11,color:"#4db8ff"}}>{open?"▲":"▼"}</div>
                </div>
                {open&&<div style={{padding:"0 14px 14px"}}>
                  <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.65,padding:"10px 12px",background:"rgba(0,100,255,0.08)",borderRadius:8,marginBottom:8}}>💡 {ex.cue}</div>
                  <div style={{padding:"8px 12px",borderRadius:8,background:"rgba(255,0,0,0.07)",border:"1px solid rgba(255,0,0,0.15)"}}>
                    <div style={{fontSize:10,color:"#7aa8cc",marginBottom:4}}>📺 Search YouTube:</div>
                    <div style={{fontSize:12,color:"#ff8888",fontWeight:700,marginBottom:6}}>{ex.search}</div>
                    <button onClick={()=>navigator.clipboard?.writeText(ex.search).catch(()=>{})} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff8888",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Copy Search</button>
                  </div>
                </div>}
              </div>;
            })}
          </>}

          {trainView==="pool"&&<>
            <Card style={{marginBottom:12}}>
              <SectionTitle color="#4db8ff">🏊 POOL TRAINING PLANS</SectionTitle>
              <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Supplement to your team practice — not a replacement. Pick a stroke focus and your level.</div>
              <Lbl>Stroke Focus</Lbl>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
                {Object.keys(POOL_WORKOUTS).map(s=><Chip key={s} on={trainStroke===s} onClick={()=>setTrainStroke(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</Chip>)}
              </div>
              <Lbl>Level</Lbl>
              <div style={{display:"flex",gap:6,marginBottom:14}}>
                {["beginner","intermediate","advanced"].map(l=><Chip key={l} on={trainLevel===l} onClick={()=>setTrainLevel(l)} color={l==="beginner"?"#10b981":l==="intermediate"?"#4db8ff":"#f87171"}>{l.charAt(0).toUpperCase()+l.slice(1)}</Chip>)}
              </div>
            </Card>
            {(POOL_WORKOUTS[trainStroke]||[]).filter(w=>w.level===trainLevel).map((workout,i)=>(
              <Card key={i}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <div style={{fontWeight:900,fontSize:15}}>{workout.name}</div>
                    <div style={{fontSize:11,color:"#7aa8cc",marginTop:2}}>Total yards: <span style={{color:"#4db8ff",fontWeight:700}}>{workout.yards.toLocaleString()}</span></div>
                  </div>
                  <div style={{background:"rgba(0,255,170,0.1)",border:"1px solid rgba(0,255,170,0.3)",borderRadius:8,padding:"4px 10px",fontSize:10,color:"#00ffaa",fontWeight:700}}>{trainLevel.toUpperCase()}</div>
                </div>
                {workout.sets.map((set,j)=>(
                  <div key={j} style={{display:"flex",gap:10,padding:"9px 12px",borderRadius:9,marginBottom:6,background:j%2===0?"rgba(0,100,255,0.06)":"rgba(255,255,255,0.03)",border:"1px solid rgba(77,184,255,0.08)"}}>
                    <div style={{fontSize:13,color:"#4db8ff",fontWeight:800,flexShrink:0}}>{j+1}.</div>
                    <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.6}}>{set}</div>
                  </div>
                ))}
                <div style={{marginTop:8,padding:"8px 10px",borderRadius:8,background:"rgba(255,215,0,0.06)",border:"1px solid rgba(255,215,0,0.15)",fontSize:10,color:"#ffd700"}}>⚠️ Always warm up properly. Stop if you feel pain. This plan supplements your coach's program.</div>
              </Card>
            ))}
            {!(POOL_WORKOUTS[trainStroke]||[]).some(w=>w.level===trainLevel)&&<Card style={{textAlign:"center",padding:"30px 20px"}}><div style={{color:"#7aa8cc"}}>No {trainLevel} {trainStroke} workout available yet. Try a different level.</div></Card>}
          </>}

          {trainView==="practice"&&<>
            <Card>
              <SectionTitle color="#a78bfa">📝 HOW DID TODAY GO?</SectionTitle>
              <Lbl>Your Mood</Lbl>
              <div style={{display:"flex",gap:8,marginBottom:12,justifyContent:"space-between"}}>
                {[["😴","Tired"],["😐","OK"],["🙂","Good"],["😄","Great"],["🔥","On Fire"]].map(([em,label])=>(
                  <div key={label} onClick={()=>setNMood(label)} style={{flex:1,textAlign:"center",padding:"8px 4px",borderRadius:10,cursor:"pointer",background:nMood===label?"rgba(167,139,250,0.2)":"rgba(255,255,255,0.04)",border:"1px solid "+(nMood===label?"rgba(167,139,250,0.5)":"rgba(255,255,255,0.06)")}}>
                    <div style={{fontSize:20}}>{em}</div>
                    <div style={{fontSize:9,color:"#7aa8cc",marginTop:2}}>{label}</div>
                  </div>
                ))}
              </div>
              <Lbl>Quick Tags</Lbl>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
                {["Felt strong","Tired legs","Good technique","Felt slow","Best session","Tough workout","Good turns","Strong kick"].map(tag=>(
                  <button key={tag} onClick={()=>setNTags(p=>p.includes(tag)?p.filter(t=>t!==tag):[...p,tag])} style={{...chip(nTags.includes(tag),"#a78bfa"),padding:"5px 10px",fontSize:11}}>{tag}</button>
                ))}
              </div>
              <Lbl>Extra Notes</Lbl>
              <textarea value={nNotes} onChange={e=>setNNotes(e.target.value)} placeholder="What worked well? What to focus on next time?" style={{...IS,height:80,resize:"none"}}/>
              <button onClick={()=>{if(!nMood){notify("Pick a mood first","#ff6b6b");return;}setNotes(p=>[{mood:nMood,tags:nTags,notes:nNotes,date:todayKey,id:Date.now()},...p]);setNMood("Good");setNTags([]);setNNotes("");addXP(15,"Practice logged! 📝");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>Save Note ✓</button>
            </Card>
            {notes.slice(0,5).map(n=>(
              <div key={n.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"12px 14px",marginBottom:8,border:"1px solid rgba(167,139,250,0.15)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
                  <div style={{fontSize:13,fontWeight:800}}>{n.mood==="Tired"?"😴":n.mood==="OK"?"😐":n.mood==="Good"?"🙂":n.mood==="Great"?"😄":"🔥"} {n.mood}</div>
                  <div style={{fontSize:10,color:"#7aa8cc"}}>{n.date}</div>
                </div>
                {n.tags.length>0&&<div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:6}}>{n.tags.map(t=><span key={t} style={{fontSize:9,padding:"2px 7px",borderRadius:10,background:"rgba(167,139,250,0.15)",color:"#a78bfa"}}>{t}</span>)}</div>}
                {n.notes&&<div style={{fontSize:11,color:"#7aa8cc",lineHeight:1.5}}>{n.notes}</div>}
              </div>
            ))}
          </>}
        </>}

        {/* ── SKILLS ── */}
        {tab==="skills"&&<>
          <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:12}}>
            {Object.keys(TIPS).map(k=><Chip key={k} on={skillCat===k} onClick={()=>setSkillCat(k)} color="#b45309">{{freestyle:"🏊",backstroke:"🔄",breaststroke:"🐸",butterfly:"🦋",turns:"🔁",starts:"🚀"}[k]} {k.charAt(0).toUpperCase()+k.slice(1)}</Chip>)}
          </div>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[["tips","💡 Tips"],["channels","📺 Channels"]].map(([v,l])=><button key={v} onClick={()=>setSkillView(v)} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:skillView===v?"linear-gradient(135deg,#b45309,#f59e0b)":"rgba(255,255,255,0.05)",color:skillView===v?"#fff":"#7aa8cc"}}>{l}</button>)}
          </div>
          {skillView==="tips"&&(TIPS[skillCat]||[]).map((tip,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px 16px",marginBottom:8,border:"1px solid rgba(251,191,36,0.1)",display:"flex",gap:10}}>
            <div style={{fontSize:16,flexShrink:0}}>{["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"][i]}</div>
            <div style={{fontSize:13,color:"#d0e8ff",lineHeight:1.65}}>{tip}</div>
          </div>)}
          {skillView==="channels"&&CHANNELS.map(ch=><div key={ch.name} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px",marginBottom:8,border:"1px solid rgba(251,191,36,0.12)"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}><div style={{fontSize:22}}>{ch.icon}</div><div><div style={{fontWeight:900,fontSize:14,color:"#fbbf24"}}>{ch.name}</div><div style={{fontSize:11,color:"#7aa8cc",marginTop:3,lineHeight:1.5}}>{ch.desc}</div></div></div>
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,background:"rgba(251,191,36,0.07)"}}><div style={{fontSize:10,color:"#7aa8cc",flex:1}}>{ch.url}</div><button onClick={()=>navigator.clipboard?.writeText("https://"+ch.url).catch(()=>{})} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.15)",color:"#fbbf24",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Copy</button></div>
          </div>)}
        </>}

        {/* ── MEETS ── */}
        {tab==="meets"&&<>
          <Card style={{marginBottom:12}}>
            <SectionTitle color="#4db8ff">📅 MEET CALENDAR</SectionTitle>
            {meets.length===0?<div style={{color:"#7aa8cc",fontSize:12}}>No upcoming meets — add one below.</div>:meets.map(m=>(
              <div key={m.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(77,184,255,0.15)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:13}}>{m.name}</div>
                    <div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>{m.date}{m.loc?" · "+m.loc:""}</div>
                    {m.events.length>0&&<div style={{fontSize:9,color:"#4db8ff",marginTop:3}}>{m.events.join(" · ")}</div>}
                  </div>
                  <button onClick={()=>setMeets(p=>p.filter(x=>x.id!==m.id))} style={{fontSize:10,padding:"3px 8px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
                </div>
              </div>
            ))}
          </Card>
          <Card>
            <SectionTitle color="#4db8ff">➕ ADD A MEET</SectionTitle>
            <Lbl>Meet Name</Lbl><input value={mName} onChange={e=>setMName(e.target.value)} placeholder="e.g. District Championships" style={IS}/>
            <Lbl>Date</Lbl><input type="date" value={mDate} onChange={e=>setMDate(e.target.value)} style={IS}/>
            <Lbl>Location (optional)</Lbl><input value={mLoc} onChange={e=>setMLoc(e.target.value)} placeholder="e.g. Northside Aquatic Center" style={IS}/>
            <Lbl>Events You'll Swim</Lbl>
            <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:12}}>
              {tagsKeys.map(ev=><button key={ev} onClick={()=>setMEvents(p=>p.includes(ev)?p.filter(e=>e!==ev):[...p,ev])} style={{...chip(mEvents.includes(ev)),padding:"5px 10px",fontSize:11}}>{ev}</button>)}
            </div>
            <button onClick={()=>{if(!mName||!mDate){notify("Enter meet name and date","#ff6b6b");return;}setMeets(p=>[{id:Date.now(),name:mName,date:mDate,loc:mLoc,events:mEvents},...p]);setMName("");setMDate("");setMLoc("");setMEvents([]);notify("Meet added! 📅");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>Add Meet 📅</button>
          </Card>
        </>}

        {/* ── PROGRESS / STATS ── */}
        {tab==="progress"&&<>
          {/* Goals */}
          <Card style={{marginBottom:12}}>
            <SectionTitle color="#ff9f43">🎯 GOALS</SectionTitle>
            {goals.map(g=>{const t=times[g.event];const target=parseTime(g.target);const diff=t&&target?t-target:null;return<div key={g.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(255,159,67,0.2)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{g.event}</div><div style={{fontSize:10,color:"#7aa8cc"}}>Target: <span style={{color:"#ff9f43",fontWeight:700}}>{fmt(target)}</span> · By {g.deadline}</div></div>
                <div style={{textAlign:"right"}}>{diff!==null&&<div style={{fontSize:12,fontWeight:800,color:diff<=0?"#00ffaa":"#ff9f43"}}>{diff<=0?"✅ HIT!":diff.toFixed(2)+"s to go"}</div>}<button onClick={()=>setGoals(p=>p.filter(x=>x.id!==g.id))} style={{fontSize:9,padding:"2px 7px",borderRadius:5,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit",marginTop:4}}>Remove</button></div>
              </div>
            </div>;})}
            <div style={{display:"flex",gap:8,marginBottom:8}}>
              <div style={{flex:2}}>
                <Lbl>Event</Lbl>
                <select value={gEvent} onChange={e=>setGEvent(e.target.value)} style={SS}><option value="">Pick event</option>{tagsKeys.map(s=><option key={s}>{s}</option>)}</select>
              </div>
              <div style={{flex:1}}><Lbl>Target</Lbl><input value={gTarget} onChange={e=>setGTarget(e.target.value)} placeholder="52.00" style={IS}/></div>
            </div>
            <Lbl>Deadline</Lbl><input type="date" value={gDeadline} onChange={e=>setGDeadline(e.target.value)} style={IS}/>
            <button onClick={()=>{if(!gEvent||!gTarget){notify("Fill all goal fields","#ff6b6b");return;}setGoals(p=>[{id:Date.now(),event:gEvent,target:gTarget,deadline:gDeadline},...p]);setGEvent("");setGTarget("");setGDeadline("");notify("Goal set! 🎯","#ff9f43");}} style={{width:"100%",padding:11,borderRadius:10,border:"none",background:"rgba(255,159,67,0.2)",color:"#ff9f43",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Set Goal 🎯</button>
          </Card>

          {/* Badges */}
          <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>🏅 Badges</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {BADGES_DEF.map(b=>{const has=earnedBadges.find(e=>e.id===b.id);return<div key={b.id} style={{background:has?"rgba(0,100,255,0.12)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 10px",border:"1px solid "+(has?"rgba(77,184,255,0.3)":"rgba(255,255,255,0.06)"),opacity:has?1:0.45}}>
              <div style={{fontSize:24}}>{b.icon}</div>
              <div style={{fontSize:12,fontWeight:800,marginTop:4}}>{b.name}</div>
              <div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>{b.desc}</div>
            </div>;})}
          </div>

          {/* Session history */}
          <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>📋 Session History</div>
          {logs.length===0?<div style={{color:"#3a5a7a",textAlign:"center",padding:"30px 0"}}>No sessions yet!</div>:logs.slice(0,20).map(e=>{
            const tg=tagsP[e.stroke];const q=!!(tg&&e.time<=tg.q);
            return<div key={e.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 14px",marginBottom:7,border:"1px solid "+(e.isBonus?"rgba(255,215,0,0.2)":q?"rgba(0,255,170,0.15)":"rgba(77,184,255,0.07)")}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{e.stroke}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{e.date}{e.meet?" · "+e.meet:""}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:900,color:e.isBonus?"#ffd700":q?"#00ffaa":"#4db8ff"}}>{fmt(e.time)}</div>{e.isPB&&<div style={{fontSize:9,color:"#ff9f43",fontWeight:700}}>⚡ PB</div>}</div>
              </div>
            </div>;
          })}
        </>}

        {/* ── SQUAD ── */}
        {tab==="squad"&&<>
          <Card style={{marginBottom:14}}>
            <SectionTitle color="#4db8ff">👥 SQUAD LEADERBOARD</SectionTitle>
            {[{name:profile.name,times,isMe:true},...squad].sort((a,b)=>tagsKeys.filter(s=>b.times[s]&&tagsP[s]&&b.times[s]<=tagsP[s].q).length-tagsKeys.filter(s=>a.times[s]&&tagsP[s]&&a.times[s]<=tagsP[s].q).length).map((sw,i)=>{
              const q=tagsKeys.filter(s=>sw.times[s]&&tagsP[s]&&sw.times[s]<=tagsP[s].q).length;
              return<div key={sw.name+i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,marginBottom:6,background:sw.isMe?"rgba(26,95,255,0.15)":"rgba(255,255,255,0.04)",border:"1px solid "+(sw.isMe?"rgba(77,184,255,0.3)":"rgba(255,255,255,0.06)")}}>
                <div style={{fontSize:20,width:28,textAlign:"center"}}>{i===0?"🥇":i===1?"🥈":i===2?"🥉":"👤"}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{sw.name}{sw.isMe?" (You)":""}</div><div style={{fontSize:11,color:"#7aa8cc"}}>{q} TAGS cuts</div></div>
                <div style={{fontSize:20,fontWeight:900,color:"#4db8ff"}}>{q}</div>
              </div>;
            })}
          </Card>
          <Card>
            <SectionTitle color="#4db8ff">➕ ADD SQUAD MATE</SectionTitle>
            <Lbl>Name</Lbl><input value={sN} onChange={e=>setSN(e.target.value)} placeholder="Teammate name" style={IS}/>
            <Lbl>Best Event</Lbl><select value={sEv} onChange={e=>setSEv(e.target.value)} style={SS}><option value="">Pick event</option>{tagsKeys.map(s=><option key={s}>{s}</option>)}</select>
            <Lbl>Their Time</Lbl><input value={sTm} onChange={e=>setSTm(e.target.value)} placeholder="e.g. 54.23" style={IS}/>
            <button onClick={()=>{if(!sN||!sEv||!sTm){notify("Fill all fields!","#ff6b6b");return;}setSquad(p=>[...p,{name:sN,times:{[sEv]:parseTime(sTm)}}]);setSN("");setSEv("");setSTm("");notify(sN+" added! 👊");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"rgba(77,184,255,0.15)",color:"#4db8ff",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Add Member</button>
          </Card>
        </>}

        {/* ── COACH ── */}
        {tab==="coach"&&<>
          {/* Race Split Analyzer */}
          <Card style={{marginBottom:12,border:"1px solid rgba(167,139,250,0.3)"}}>
            <SectionTitle color="#a78bfa">⚡ RACE SPLIT ANALYZER</SectionTitle>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:10}}>Enter your 50-yard splits to get your Race IQ score and AI coaching.</div>
            <Lbl>Event</Lbl>
            <select value={splitEvent} onChange={e=>{setSplitEvent(e.target.value);setSplitResult(null);}} style={SS}>
              <option value="">Select event</option>
              {["100 Free","200 Free","500 Free","100 Back","200 Back","100 Breast","200 Breast","100 Fly","200 Fly","200 IM","400 IM"].map(e=><option key={e}>{e}</option>)}
            </select>
            {splitEvent&&<>
              <Lbl>Enter 50-yard splits</Lbl>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                {Array.from({length:splitEvent.includes("100")?2:splitEvent.includes("200")?4:splitEvent.includes("400")||splitEvent.includes("500")?8:2}).map((_,i)=>(
                  <input key={i} value={splitTimes[i]} onChange={e=>setSplitTimes(p=>{const n=[...p];n[i]=e.target.value;return n;})} placeholder={`Split ${i+1} (e.g. 27.4)`} style={{...IS,marginBottom:0,fontSize:13}}/>
                ))}
              </div>
              <button onClick={()=>{
                const n=splitEvent.includes("100")?2:splitEvent.includes("200")?4:8;
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
              }} style={{width:"100%",padding:11,borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>Analyze Race 🔬</button>
              {splitResult&&<>
                <div style={{marginTop:12,padding:"14px",borderRadius:12,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                    <div>
                      <div style={{fontSize:11,color:"#a78bfa",fontWeight:700}}>RACE IQ SCORE</div>
                      <div style={{fontSize:32,fontWeight:900,color:splitResult.iq>=80?"#00ffaa":splitResult.iq>=60?"#ffd700":"#ff6b6b"}}>{splitResult.iq}</div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:11,color:"#7aa8cc"}}>Pacing</div>
                      <div style={{fontSize:14,fontWeight:800,color:splitResult.isNeg?"#00ffaa":"#ff9f43"}}>{splitResult.isNeg?"✅ Negative Split":"⚠️ Positive Split"}</div>
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
                    {[{l:"Total",v:fmt(splitResult.total)},{l:"Fastest 50",v:splitResult.fastest.toFixed(2)},{l:"Drop-off",v:splitResult.drop+"%"}].map(s=><div key={s.l} style={{textAlign:"center",padding:"8px 4px",background:"rgba(255,255,255,0.04)",borderRadius:8}}>
                      <div style={{fontSize:9,color:"#7aa8cc"}}>{s.l}</div>
                      <div style={{fontSize:13,fontWeight:900,color:"#e8f4ff",marginTop:2}}>{s.v}</div>
                    </div>)}
                  </div>
                  <div style={{marginTop:10,fontSize:12,color:"#d0e8ff",lineHeight:1.6}}>
                    {splitResult.isNeg?"🌟 Negative split — you swam faster in the second half. This is elite-level pacing. Elite swimmers hit negative splits consistently.":"💡 You went out too fast. The key to dropping time is conservative early pacing. Try to feel like you are holding back in the first half."}
                  </div>
                </div>
              </>}
            </>}
          </Card>

          {/* Stroke Rate Calculator */}
          <Card style={{marginBottom:12,border:"1px solid rgba(0,200,255,0.2)"}}>
            <SectionTitle color="#00d4ff">🏊 STROKE RATE CALCULATOR</SectionTitle>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:10}}>Count your strokes in a 50 to see your rate vs elite swimmers.</div>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:10}}>
              {["freestyle","backstroke","breaststroke","butterfly"].map(s=><Chip key={s} on={strokeStroke===s} onClick={()=>{setStrokeStroke(s);setStrokeResult(null);}} color="#0ea5e9">{s.charAt(0).toUpperCase()+s.slice(1)}</Chip>)}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
              <div><Lbl>Stroke Count (50 yds)</Lbl><input value={strokeCount} onChange={e=>setStrokeCount(e.target.value)} placeholder="e.g. 18" style={IS}/></div>
              <div><Lbl>50-yd Time</Lbl><input value={strokeTime} onChange={e=>setStrokeTime(e.target.value)} placeholder="e.g. 27.4" style={IS}/></div>
            </div>
            <div style={{fontSize:10,color:"#7aa8cc",marginBottom:8}}>Elite range: {strokeStroke==="freestyle"?"40-60":strokeStroke==="breaststroke"?"30-50":"40-60"} strokes/min · DPS: {strokeStroke==="freestyle"?"1.5-2.2":strokeStroke==="breaststroke"?"1.2-2.0":"1.3-2.0"} yds/stroke</div>
            <button onClick={calcStroke} style={{width:"100%",padding:11,borderRadius:10,border:"none",background:"linear-gradient(135deg,#0ea5e9,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>Calculate 🏊</button>
            {strokeResult&&<div style={{marginTop:10,padding:"12px",borderRadius:10,background:"rgba(14,165,233,0.08)",border:"1px solid rgba(14,165,233,0.25)"}}>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
                {[{l:"Stroke Rate",v:strokeResult.rate+"/min"},{l:"DPS",v:strokeResult.dps+" yds"}].map(s=><div key={s.l} style={{textAlign:"center",padding:"8px",background:"rgba(255,255,255,0.04)",borderRadius:8}}>
                  <div style={{fontSize:9,color:"#7aa8cc"}}>{s.l}</div>
                  <div style={{fontSize:15,fontWeight:900,color:"#0ea5e9"}}>{s.v}</div>
                </div>)}
              </div>
              <div style={{fontSize:12,fontWeight:800,color:strokeResult.status.includes("Elite")?"#00ffaa":"#ff9f43"}}>{strokeResult.status}</div>
            </div>}
          </Card>

          {/* AI Coach */}
          <Card style={{background:"rgba(0,100,255,0.07)"}}>
            <SectionTitle color="#4db8ff">🤖 AI COACH — Powered by Claude</SectionTitle>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Your times and profile are pre-loaded. Ask anything.</div>
            {["How close am I to TAGS? What's my fastest path?","Build me a 4-week plan to drop time","What is my best event and why?","How do I fix my turns and walls?","What should I eat the day before a meet?","How do I stay calm on the blocks?"].map(q=><button key={q} onClick={()=>askCoach(q)} style={{display:"block",width:"100%",textAlign:"left",marginBottom:8,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,255,0.12)",color:"#d0e8ff",borderRadius:10,padding:"11px 14px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>)}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <input value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&aiQ&&askCoach(aiQ)} placeholder="Ask anything..." style={{...IS,flex:1,margin:0}}/>
              <button onClick={()=>aiQ&&askCoach(aiQ)} style={{background:"linear-gradient(135deg,#1a5fff,#0099ff)",border:"none",color:"#fff",borderRadius:10,padding:"10px 18px",fontWeight:800,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>Ask</button>
            </div>
            {aiLoad&&<div style={{textAlign:"center",color:"#4db8ff",fontSize:14,marginTop:20}}>🧠 Coach is thinking...</div>}
            {aiA&&<div style={{marginTop:14,background:"rgba(0,100,255,0.06)",borderRadius:14,padding:18,border:"1px solid rgba(77,184,255,0.2)",fontSize:14,lineHeight:1.75,whiteSpace:"pre-wrap",color:"#d0e8ff"}}>{aiA}</div>}
          </Card>
        </>}

        {/* ── NUTRITION ── */}
        {tab==="nutrition"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(0,200,100,0.08),rgba(26,95,255,0.08))",border:"1px solid rgba(0,255,170,0.2)",marginBottom:14}}>
            <SectionTitle color="#00ffaa">🥗 FUEL LIKE AN OLYMPIAN</SectionTitle>
            <div style={{fontSize:12,color:"#7aa8cc"}}>Nutrition plan for age {profile.age}. What you eat is as important as how you train.</div>
          </Card>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {[["daily","🍽️ Daily"],["hydration","💧 Hydration"],["preMeet","🏁 Pre-Meet"],["postMeet","🔋 Recovery"]].map(([v,l])=><button key={v} onClick={()=>setNutrTab(v)} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",background:nutrTab===v?"linear-gradient(135deg,#00cc88,#0099ff)":"rgba(255,255,255,0.05)",color:nutrTab===v?"#fff":"#7aa8cc",minWidth:"22%"}}>{l}</button>)}
          </div>
          {(NUTRITION[nutrAge]?.[nutrTab]||[]).map((tip,i)=><div key={i} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px 16px",marginBottom:8,border:"1px solid rgba(0,255,170,0.1)",display:"flex",gap:10}}>
            <div style={{fontSize:16,flexShrink:0}}>{["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"][i]||"•"}</div>
            <div style={{fontSize:13,color:"#d0e8ff",lineHeight:1.65}}>{tip}</div>
          </div>)}
          <Card style={{background:"rgba(255,215,0,0.05)",border:"1px solid rgba(255,215,0,0.2)"}}>
            <SectionTitle color="#ffd700">⚠️ IMPORTANT</SectionTitle>
            <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.7}}>
              {age<=14?"This is general guidance for young athletes. Every swimmer's body is different. Talk to your parents and doctor before making major diet changes. Never restrict food intake — growing athletes need adequate fuel to perform and develop.":"This is general sports nutrition guidance. Consult a registered dietitian who specializes in sports nutrition for a fully personalized plan."}
            </div>
          </Card>
        </>}

        {/* ── FAMILY ── */}
        {tab==="family"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,100,255,0.07))",border:"1px solid rgba(168,85,247,0.25)",marginBottom:14}}>
            <SectionTitle color="#c084fc">❤️ FAMILY DASHBOARD</SectionTitle>
            <div style={{fontSize:12,color:"#7aa8cc",lineHeight:1.6}}>Your parents see your times, training streak, badges, and TAGS progress. Your AI coach conversations stay private.</div>
          </Card>
          <Card>
            <div style={{fontSize:12,fontWeight:800,color:"#c084fc",marginBottom:8}}>Your Family Code</div>
            <div style={{fontSize:32,fontWeight:900,color:"#fff",letterSpacing:4,textAlign:"center",padding:"16px 0",background:"rgba(168,85,247,0.08)",borderRadius:10,marginBottom:8,border:"1px solid rgba(168,85,247,0.2)"}}>{familyCode}</div>
            <button onClick={()=>{navigator.clipboard?.writeText(familyCode).catch(()=>{});notify("Copied! Text to your parents 📱","#c084fc");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"rgba(168,85,247,0.2)",color:"#c084fc",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>📋 Copy Code</button>
            <div style={{fontSize:11,color:"#7aa8cc",marginTop:8,textAlign:"center"}}>Text this code to your parents — they enter it in their SwimIQ under Family.</div>
          </Card>
          <Card>
            <SectionTitle color="#4db8ff">📊 PROGRESS SUMMARY</SectionTitle>
            {[{l:"Events Logged",v:Object.keys(times).length},{l:"TAGS Cuts Hit",v:qualified.length,c:"#00ffaa"},{l:"Bonus Times",v:bonusTimes.length,c:"#ffd700"},{l:"Training Streak",v:streak+" days",c:streak>0?"#ff9f43":undefined},{l:"Badges Earned",v:earnedBadges.length+"/"+BADGES_DEF.length,c:"#ffd700"},{l:"Total Sessions",v:logs.length},{l:"Personal Bests",v:totalPBs,c:"#ff9f43"},{l:"Goals Set",v:goals.length}].map(r=><div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
              <span style={{fontSize:13,color:"#7aa8cc"}}>{r.l}</span>
              <span style={{fontSize:13,fontWeight:800,color:r.c||"#e8f4ff"}}>{r.v}</span>
            </div>)}
          </Card>
          <Card>
            <SectionTitle color="#4db8ff">🎯 CLOSEST TO TAGS</SectionTitle>
            {tagsKeys.filter(s=>times[s]&&tagsP[s]&&times[s]>tagsP[s].q).sort((a,b)=>(times[a]-tagsP[a].q)-(times[b]-tagsP[b].q)).slice(0,4).map(s=>{
              const diff=(times[s]-tagsP[s].q).toFixed(2);
              return<div key={s} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{s}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{fmt(times[s])} needs {fmt(tagsP[s].q)}</div></div>
                <div style={{fontSize:13,fontWeight:800,color:"#ff9f43"}}>{diff}s away</div>
              </div>;
            })}
            {qualified.length===tagsKeys.length&&tagsKeys.length>0&&<div style={{textAlign:"center",color:"#00ffaa",fontWeight:800,padding:"12px 0"}}>🏆 All events TAGS qualified!</div>}
          </Card>
        </>}

      </div>
    </div>
  );
}
