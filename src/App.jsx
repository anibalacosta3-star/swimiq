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

const TIPS = {
  freestyle:["Keep one goggle in water when breathing — use the bow wave","Kick from the hip not the knee. Toes pointed = propulsion","Enter hand at 11 and 1 o'clock — never cross the centerline","High elbow catch: reach over a barrel before pulling","Breathe out continuously underwater — never hold your breath"],
  backstroke:["Pinky finger enters first — sets up your best catch position","Keep hips at surface — lifted head sinks your hips","Count strokes from the flags to the wall — memorize it","Rotate 45 degrees each side — hip-driven power","6-beat kick for all backstroke distances"],
  breaststroke:["Pull and kick NEVER happen at the same time","Heels to glutes — not knees forward which creates drag","Elbows squeeze in before shooting arms forward","The glide is free speed — don't rush out of it","One legal dolphin kick on every pullout — use it every wall"],
  butterfly:["TWO kicks per arm cycle — always, even when tired","Head goes DOWN before hands enter — reduces drag","Hands enter at shoulder width — not crossed, not too wide","Low recovery skimming the surface saves energy","Underwater dolphin kicks off walls are faster than surface fly"],
  turns:["Count strokes from flags every practice until automatic","Tight tuck on flip turns — feet shoulder-width apart","Push off at 45 degree angle — not straight","Hold streamline until you feel yourself slow down","First stroke off every wall at full power"],
  starts:["Shift weight forward over toes on Take Your Marks","Drive hips UP and OUT — not just forward","Arms reach streamline before your hands enter the water","5-7 dolphin kicks underwater for sprint events","Head stays neutral on breakout — don't look up"],
};

const CHANNELS = [
  {name:"Effortless Swimming",url:"youtube.com/@EffortlessSwimming",icon:"🇦🇺",desc:"Best overall technique channel. Every stroke with underwater footage."},
  {name:"Skills N Talents",url:"youtube.com/@SkillsNTalents",icon:"🏆",desc:"#1 ranked swim channel. Step-by-step for all strokes, starts and turns."},
  {name:"The Race Club",url:"youtube.com/@TheRaceClub",icon:"🥇",desc:"Founded by Olympian Gary Hall Jr. Elite technique and race strategy."},
  {name:"GoSwim",url:"youtube.com/@GoSwimTV",icon:"📚",desc:"Massive drill library for every stroke and distance."},
  {name:"USA Swimming",url:"youtube.com/@USASwimming",icon:"🇺🇸",desc:"Official governing body. Race analysis and coaching insights."},
  {name:"Cody Miller",url:"youtube.com/@CodyMillerAdventures",icon:"🥈",desc:"Olympic bronze medalist. Real training and mindset content."},
];

const EXERCISES = [
  {id:"plank",name:"Plank Hold",sets:"3",reps:"30-45s",gear:"Bodyweight",ageMin:8,cue:"Squeeze glutes and belly. Hips don't sag or pike. Build to 60s.",search:"plank hold swimmers technique"},
  {id:"deadbug",name:"Dead Bug",sets:"3",reps:"8 each side",gear:"Bodyweight",ageMin:8,cue:"Press lower back flat into floor the whole time. Slow and controlled.",search:"dead bug exercise swimmers core"},
  {id:"flutter",name:"Flutter Kick Dry",sets:"3",reps:"30s",gear:"Bodyweight",ageMin:8,cue:"Lie flat, hands under hips. Small fast kicks from the hip. Toes pointed.",search:"flutter kick dryland swimmers"},
  {id:"ytwl",name:"YTW-L Shoulder",sets:"3",reps:"10 each",gear:"Bodyweight",ageMin:8,cue:"Face down, thumbs up. Make Y-T-W-L shapes. Squeeze shoulder blades.",search:"YTWL exercise swimmers shoulder"},
  {id:"glute",name:"Glute Bridge",sets:"3",reps:"15",gear:"Bodyweight",ageMin:8,cue:"Feet flat, drive hips up, squeeze hard at top.",search:"glute bridge swimmers kick power"},
  {id:"sqjump",name:"Squat Jumps",sets:"3",reps:"10",gear:"Bodyweight",ageMin:8,cue:"Squat to 90 degrees, explode up, land softly. Builds wall power.",search:"squat jumps swimmers explosive"},
  {id:"calf",name:"Calf Raises",sets:"3",reps:"20",gear:"Bodyweight",ageMin:8,cue:"Slow up, hold 1s at top, slow down. Better ankle extension = more kick.",search:"calf raises swimmers ankle"},
  {id:"hipflex",name:"Hip Flexor Stretch",sets:"2",reps:"30s each",gear:"Bodyweight",ageMin:8,cue:"Kneeling lunge, push hips forward. Tight hip flexors drag your legs down.",search:"hip flexor stretch swimmers"},
  {id:"ankflex",name:"Ankle Circles",sets:"2",reps:"20 each way",gear:"Bodyweight",ageMin:8,cue:"Rotate ankles in full circles both ways. More flexibility = more kick power.",search:"ankle flexibility swimmers"},
];

const POOL_WORKOUTS = {
  freestyle: [
    {level:"beginner",name:"Freestyle Foundation",yards:1500,sets:["4x50 free easy @ 1:00 (focus: bilateral breathing)","4x100 free @ 1:45 (steady pace, count strokes)","4x50 kickboard @ 1:00","4x25 fast free @ :45","200 easy cool down"]},
    {level:"intermediate",name:"Freestyle Builder",yards:2500,sets:["400 warm-up free easy","8x50 @ :50 (odds: fast / evens: technique)","4x100 @ 1:30 descend 1-4","4x200 @ 3:00 at race pace","8x25 underwater kick off walls","200 cool down"]},
    {level:"advanced",name:"Freestyle Race Prep",yards:3500,sets:["600 warm-up","12x50 @ :45 (4 fast, 4 drill, 4 kick)","4x100 @ 1:20 at goal pace","2x400 @ 5:30 negative split","8x50 @ :40 sprint","200 cool down"]},
  ],
  backstroke: [
    {level:"beginner",name:"Back Basics",yards:1500,sets:["200 backstroke easy warm-up","6x50 back @ 1:05 (focus: pinky entry)","4x50 kick on back @ 1:00","4x25 back sprint @ :45","200 easy free cool down"]},
    {level:"intermediate",name:"Back Power",yards:2500,sets:["400 back warm-up","8x50 back @ :55","4x100 back @ 1:40 at pace","4x50 back underwater flags drill","200 cool down"]},
    {level:"advanced",name:"Back Race Shape",yards:3000,sets:["500 warm-up back","10x50 back @ :50","4x100 back @ 1:30 fast","2x200 back @ 3:00","8x25 explosive back off walls","200 cool down"]},
  ],
  breaststroke: [
    {level:"beginner",name:"Breast Basics",yards:1500,sets:["200 breaststroke easy","6x50 breast @ 1:15 (focus: pull-kick timing)","4x50 kick only @ 1:10","4x25 breast sprint @ :50","200 cool down"]},
    {level:"intermediate",name:"Breast Builder",yards:2000,sets:["400 breast warm-up","8x50 breast @ 1:00 (2-kick-1-pull drill)","4x100 breast @ 1:55","200 cool down"]},
    {level:"advanced",name:"Breast Race Prep",yards:2800,sets:["500 breast warm-up","10x50 breast @ :55","4x100 breast @ 1:45","2x200 breast @ 3:20 at race pace","200 cool down"]},
  ],
  butterfly: [
    {level:"beginner",name:"Fly Foundation",yards:1200,sets:["200 fly warm-up","6x25 fly @ :45 (focus: two kicks)","4x50 one-arm fly drill @ 1:10","4x25 underwater dolphin kick","200 easy cool down"]},
    {level:"intermediate",name:"Fly Builder",yards:2000,sets:["400 warm-up","8x25 fly @ :35 fast","4x50 fly @ :55 at pace","4x100 IM @ 1:40","200 cool down"]},
    {level:"advanced",name:"Fly Race Shape",yards:2800,sets:["500 warm-up","10x50 fly @ :50","4x100 fly @ 1:30","8x25 fly sprint max effort","200 cool down"]},
  ],
};

const NUTRITION_DATA = {
  daily: {
    "10U": ["3 full meals + 2 snacks every day — growing bodies need constant fuel","5 servings of fruits and vegetables daily — colorful plates = better recovery","Whole grains at every meal: oatmeal, brown rice, whole wheat bread","Lean protein at lunch and dinner: chicken, fish, eggs, beans","Calcium-rich foods 3x daily: milk, yogurt, cheese — bones are growing fast"],
    "11-12": ["Eat every 3-4 hours — your metabolism is high and you need consistent fuel","Protein at every meal: 20-25g helps muscle repair after hard practices","Complex carbs are your fuel: pasta, rice, sweet potatoes, oats","Healthy fats: avocado, nuts, olive oil — support brain and joint health","Iron-rich foods 3x/week: lean red meat, spinach, fortified cereals"],
    "13-14": ["2500-3000+ calories daily for active training — do not under-eat","Protein 1.2-1.6g per kg of bodyweight: chicken, fish, eggs, Greek yogurt","Anti-inflammatory foods daily: berries, salmon, dark leafy greens","Avoid ultra-processed foods and soda — they slow recovery and hurt performance","Eat within 30 minutes after every practice for optimal recovery"],
    adult: ["Lean protein at every meal: 25-30g per meal for muscle maintenance","Complex carbs timed around workouts — before for fuel, after for recovery","Omega-3 rich foods 3x/week: salmon, walnuts, flaxseed — reduce inflammation","Magnesium-rich foods: dark chocolate, nuts, leafy greens — supports sleep","Limit alcohol — it severely impairs recovery and sleep quality"],
  },
  hydration: {
    "10U": ["8-10 cups of water daily minimum","Drink 1 cup of water 30 minutes before practice","Sip water every 15-20 minutes during practice","Chocolate milk or a banana after practice for recovery","NO energy drinks — ever. Not at this age."],
    "11-12": ["10-12 cups of water daily","500ml water 1 hour before practice","During 2-hour practice: 600-900ml water","Electrolyte drink after hard practices","Urine should be pale yellow — dark yellow means dehydrated"],
    "13-14": ["12-16 cups of water daily","During hard practice (2+ hrs): 500-750ml per hour","Avoid caffeine completely — it dehydrates and disrupts critical sleep","Weigh yourself before and after long practices — replace each lb lost with 16oz water","Electrolytes during long sessions: sodium, potassium, magnesium"],
    adult: ["12-16 cups of water daily","Hydration needs increase with age — drink proactively","Coffee pre-workout is OK — but add an extra glass of water for each cup","Electrolyte balance matters more for masters swimmers","Monitor urine color throughout the day as hydration guide"],
  },
  preMeet: {
    "10U": ["Eat 2-3 hours before your race: pasta, rice, or oatmeal with banana","Avoid greasy or fried food day of meet — it slows you down","Sip water all morning — start hydrated","Light snack 30-45 min before: banana, granola bar, or crackers","Avoid new foods on meet day — stick to what you know"],
    "11-12": ["Carb-load the night before: pasta dinner with protein","Breakfast 2-3 hrs before: oatmeal with berries and eggs","Pack snacks for between events: trail mix, fruit, PB crackers","Small snack 30-45 min before your race","Keep a water bottle in hand all day"],
    "13-14": ["Carb-load 2 nights before a big meet — pasta, rice, bread","Day before: normal eating, extra hydration, light on fiber","Morning of meet: oatmeal or eggs with toast 2-3 hrs before first race","Between events: simple carbs — banana, dates, sports chews","Never try new foods at a meet"],
    adult: ["Same carb-load principles the night before","Anti-inflammatory meal: salmon, rice, broccoli the night before","Morning of: easy-to-digest carbs and coffee if you normally drink it","Between events: banana, sports drink, saltine crackers","Trust your training — race day nutrition is 80% mental"],
  },
};

const BADGES_DEF = [
  {id:"first_log",icon:"🌊",name:"First Splash",desc:"Logged your first time"},
  {id:"five_events",icon:"⚡",name:"Five Events",desc:"Logged 5 different events"},
  {id:"ten_logs",icon:"📊",name:"Data Driven",desc:"Logged 10 sessions"},
  {id:"pb_three",icon:"🔥",name:"On Fire",desc:"Set 3 personal bests"},
  {id:"all_strokes",icon:"🏆",name:"Complete Swimmer",desc:"Logged all 4 strokes"},
  {id:"sub_bonus",icon:"🌟",name:"Bonus Crusher",desc:"Hit a TAGS bonus time"},
  {id:"streak7",icon:"💎",name:"Week Warrior",desc:"7-day training streak"},
];

const DAILY_MISSIONS = [
  {id:"log_today",icon:"📝",text:"Log a practice time today",xp:20},
  {id:"read_tip",icon:"📖",text:"Read one technique tip",xp:10},
  {id:"check_tags",icon:"⭐",text:"Check your TAGS progress",xp:10},
  {id:"do_dryland",icon:"💪",text:"Complete 3 dryland exercises",xp:25},
  {id:"drink_water",icon:"💧",text:"Track your hydration today",xp:10},
  {id:"coach_question",icon:"🤖",text:"Ask your AI coach one question",xp:15},
];

function parseTime(s) {
  if (!s) return null;
  s = String(s).trim();
  if (s.includes(":")) {
    const p = s.split(":");
    return parseFloat(p[0]) * 60 + parseFloat(p[1]);
  }
  return parseFloat(s);
}

function fmt(s) {
  if (!s || isNaN(s)) return "—";
  if (s >= 60) {
    const m = Math.floor(s / 60);
    return m + ":" + (s % 60).toFixed(2).padStart(5, "0");
  }
  return s.toFixed(2);
}

function getStatusColor(t, q, b) {
  if (!t) return "#3a5a7a";
  if (t <= b) return "#ffd700";
  if (t <= q) return "#00ffaa";
  const d = t - q;
  if (d <= 2) return "#ff9f43";
  if (d <= 6) return "#ffd32a";
  return "#ff6b6b";
}

function getStatusLabel(t, q, b) {
  if (!t) return null;
  if (t <= b) return "🌟 BONUS";
  if (t <= q) return "✅ QUALIFIED";
  return (t - q).toFixed(2) + "s to go";
}

const LS = "swimiq_v6";
function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } }
function save(d) { try { localStorage.setItem(LS, JSON.stringify(d)); } catch (e) {} }

const iStyle = {
  display: "block", width: "100%", marginBottom: 4,
  background: "rgba(13,27,42,0.95)", border: "1px solid rgba(77,184,255,0.25)",
  color: "#e8f4ff", borderRadius: 10, padding: "10px 12px", fontSize: 14,
  outline: "none", fontFamily: "inherit", boxSizing: "border-box"
};

function Card({ children, style }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 16,
      border: "1px solid rgba(77,184,255,0.1)", marginBottom: 12, ...style
    }}>{children}</div>
  );
}

function Lbl({ children }) {
  return <div style={{ fontSize: 11, color: "#7aa8cc", letterSpacing: 0.5, marginBottom: 4, marginTop: 8 }}>{children}</div>;
}

function Chip({ on, onClick, children, color }) {
  return (
    <button onClick={onClick} style={{
      padding: "7px 12px", borderRadius: 20, border: "none", cursor: "pointer",
      fontWeight: 700, fontSize: 12, fontFamily: "inherit",
      background: on ? (color || "#1a5fff") : "rgba(255,255,255,0.07)",
      color: on ? "#fff" : "#7aa8cc"
    }}>{children}</button>
  );
}

function ProgressBar({ value, max, color }) {
  const w = Math.max(4, Math.min(100, (value / (max || 100)) * 100));
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, marginTop: 6 }}>
      <div style={{ width: w + "%", height: "100%", borderRadius: 3, background: color || "linear-gradient(90deg,#1a5fff,#00ffaa)", transition: "width 0.5s" }} />
    </div>
  );
}

export default function SwimIQ() {
  const [tab, setTab] = useState("home");
  const [setup, setSetup] = useState(() => !!(load().profile?.name?.length > 1));
  const [profile, setProfile] = useState(() => load().profile || { name: "", age: 13, gender: "boys", ageGroup: "13-14", mode: "competitive" });
  const [times, setTimes] = useState(() => load().times || {});
  const [logs, setLogs] = useState(() => load().logs || []);
  const [xp, setXP] = useState(() => load().xp || 0);
  const [squad, setSquad] = useState(() => load().squad || []);
  const [cl, setCl] = useState(() => load().cl || {});
  const [meets, setMeets] = useState(() => load().meets || []);
  const [goals, setGoals] = useState(() => load().goals || []);
  const [missions, setMissions] = useState(() => load().missions || {});
  const [toast, setToast] = useState(null);
  const [lSt, setLSt] = useState("");
  const [lTm, setLTm] = useState("");
  const [lDt, setLDt] = useState(new Date().toISOString().split("T")[0]);
  const [lMt, setLMt] = useState("");
  const pRef = useRef(null);
  const [pStep, setPStep] = useState("idle");
  const [pPrev, setPPrev] = useState(null);
  const [pFile, setPFile] = useState(null);
  const [pRes, setPRes] = useState(null);
  const [pErr, setPErr] = useState("");
  const [aiQ, setAiQ] = useState("");
  const [aiA, setAiA] = useState("");
  const [aiLoad, setAiLoad] = useState(false);
  const [skillCat, setSkillCat] = useState("freestyle");
  const [skillView, setSkillView] = useState("tips");
  const [trainView, setTrainView] = useState("dryland");
  const [trainStroke, setTrainStroke] = useState("freestyle");
  const [trainLevel, setTrainLevel] = useState("intermediate");
  const [nutrTab, setNutrTab] = useState("daily");
  const [exOpen, setExOpen] = useState(null);
  const [sN, setSN] = useState("");
  const [sEv, setSEv] = useState("");
  const [sTm, setSTm] = useState("");
  const [mName, setMName] = useState("");
  const [mDate, setMDate] = useState("");
  const [mLoc, setMLoc] = useState("");
  const [mEvents, setMEvents] = useState([]);
  const [gEvent, setGEvent] = useState("");
  const [gTarget, setGTarget] = useState("");
  const [gDeadline, setGDeadline] = useState("");
  const [nextMeet, setNextMeet] = useState("");
  const [splitEvent, setSplitEvent] = useState("");
  const [splitTimes, setSplitTimes] = useState(["","","","","","","","",""]);
  const [splitResult, setSplitResult] = useState(null);
  const [convEvent, setConvEvent] = useState("100 Free");
  const [convTime, setConvTime] = useState("");

  const tagsP = (TAGS[profile.gender] && TAGS[profile.gender][profile.ageGroup]) || {};
  const tagsKeys = Object.keys(tagsP);
  const todayKey = new Date().toISOString().split("T")[0];
  const age = parseInt(profile.age) || 13;
  const nutrAge = age <= 10 ? "10U" : age <= 12 ? "11-12" : age <= 14 ? "13-14" : "adult";

  useEffect(() => {
    save({ profile, times, logs, xp, squad, cl, meets, goals, missions });
  }, [profile, times, logs, xp, squad, cl, meets, goals, missions]);

  function notify(msg, color) {
    setToast({ msg, color: color || "#00ffaa" });
    setTimeout(() => setToast(null), 3200);
  }

  function addXP(n, r) {
    setXP(p => p + n);
    notify("+" + n + " XP — " + r, "#ffd700");
  }

  const streak = (function () {
    let c = 0;
    const d = new Date();
    for (let i = 0; i < 60; i++) {
      const k = d.toISOString().split("T")[0];
      if (Object.values(cl[k] || {}).some(Boolean)) c++;
      else if (i > 0) break;
      d.setDate(d.getDate() - 1);
    }
    return c;
  })();

  const level = Math.floor(xp / 200) + 1;
  const lvlPct = ((xp % 200) / 200 * 100).toFixed(0);
  const lvlNames = ["Tadpole","Minnow","Lane 4","Competitor","Qualifier","Finalist","All-Star","Elite","Champion","Legend"];
  const lvlName = lvlNames[Math.min(level - 1, 9)];
  const qualified = tagsKeys.filter(s => times[s] && tagsP[s] && times[s] <= tagsP[s].q);
  const earned = BADGES_DEF.filter(b => {
    if (b.id === "first_log") return logs.length >= 1;
    if (b.id === "five_events") return Object.keys(times).length >= 5;
    if (b.id === "ten_logs") return logs.length >= 10;
    if (b.id === "pb_three") return logs.filter(e => e.isPB).length >= 3;
    if (b.id === "all_strokes") { const s = Object.keys(times); return ["Free","Back","Breast","Fly"].every(st => s.some(k => k.includes(st))); }
    if (b.id === "sub_bonus") return logs.some(e => e.isBonus);
    if (b.id === "streak7") return streak >= 7;
    return false;
  });

  const todayMissions = missions[todayKey] || {};
  const missionsDone = DAILY_MISSIONS.filter(m => todayMissions[m.id]).length;

  const taperDays = (function () {
    if (!nextMeet) return null;
    const d = new Date(nextMeet) - new Date();
    return Math.ceil(d / 86400000);
  })();

  const taperPhase = taperDays === null ? null : taperDays > 14 ? "Build Phase" : taperDays > 7 ? "Taper" : taperDays > 3 ? "Peak" : taperDays > 0 ? "Race Week!" : "MEET DAY!";
  const taperColor = taperDays === null ? "#7aa8cc" : taperDays > 14 ? "#4db8ff" : taperDays > 7 ? "#ffd700" : taperDays > 3 ? "#ff9f43" : "#00ffaa";

  const COURSE_FACTORS = {
    "100 Free":{lcm:1.09,scm:1.04},"200 Free":{lcm:1.08,scm:1.03},
    "100 Back":{lcm:1.10,scm:1.05},"200 Back":{lcm:1.09,scm:1.04},
    "100 Breast":{lcm:1.08,scm:1.04},"200 Breast":{lcm:1.07,scm:1.03},
    "100 Fly":{lcm:1.10,scm:1.05},"200 Fly":{lcm:1.09,scm:1.04},
    "200 IM":{lcm:1.09,scm:1.04},"400 IM":{lcm:1.08,scm:1.03},
    "50 Free":{lcm:1.11,scm:1.05},"500 Free":{lcm:1.07,scm:1.03},
  };

  function doLog() {
    const secs = parseTime(lTm);
    if (!secs || !lSt) { notify("Pick an event and enter a time!", "#ff6b6b"); return; }
    const tags = tagsP[lSt];
    const isPB = !times[lSt] || secs < times[lSt];
    const isBonus = !!(tags && secs <= tags.b);
    const isQual = !!(tags && secs <= tags.q);
    if (isPB) setTimes(p => ({ ...p, [lSt]: secs }));
    setLogs(p => [{ stroke: lSt, time: secs, date: lDt, meet: lMt, isPB, isBonus, id: Date.now() }, ...p]);
    setLTm(""); setLMt("");
    setMissions(p => ({ ...p, [todayKey]: { ...p[todayKey], log_today: true } }));
    if (isPB && isBonus) addXP(150, "BONUS time! 🌟");
    else if (isPB && isQual) addXP(100, "TAGS qualified! 🎯");
    else if (isPB) addXP(50, "New personal best! 🔥");
    else addXP(15, "Time logged 💧");
  }

  function handlePhoto(e) {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    setPFile(f); setPRes(null); setPErr(""); setPStep("preview");
    const r = new FileReader();
    r.onload = function (ev) { setPPrev(ev.target.result); };
    r.readAsDataURL(f);
  }

  function resetPhoto() {
    setPStep("idle"); setPPrev(null); setPFile(null); setPRes(null); setPErr("");
    if (pRef.current) pRef.current.value = "";
  }

  async function scanPhoto() {
    if (!pFile) return;
    setPStep("scanning");
    try {
      const b64 = await new Promise(function (res, rej) {
        const r = new FileReader();
        r.onload = function () { res(r.result.split(",")[1]); };
        r.onerror = rej;
        r.readAsDataURL(pFile);
      });
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 800,
          system: 'Extract swim meet times from this image. Return ONLY a JSON array: [{"event":"100 Free","time":"54.23","meet":"name or null","date":"YYYY-MM-DD or null"}]. If no times found return [].',
          messages: [{ role: "user", content: [{ type: "image", source: { type: "base64", media_type: pFile.type || "image/jpeg", data: b64 } }, { type: "text", text: "Extract all swim times. Return only JSON array." }] }]
        })
      });
      const data = await resp.json();
      const raw = (data.content && data.content.find(function (x) { return x.type === "text"; }));
      const parsed = JSON.parse((raw ? raw.text : "[]").replace(/```json|```/g, "").trim());
      if (!Array.isArray(parsed) || !parsed.length) {
        setPErr("No times found. Try a clearer screenshot."); setPStep("preview");
      } else {
        setPRes(parsed.map(function (r) { return { ...r, selected: true, recognized: !!tagsP[r.event] }; }));
        setPStep("review");
      }
    } catch (e) {
      setPErr("Scan failed — try again."); setPStep("preview");
    }
  }

  function importPhotos() {
    const toImport = (pRes || []).filter(function (r) { return r.selected; });
    if (!toImport.length) { notify("Select at least one time", "#ff6b6b"); return; }
    const newT = { ...times }; const newE = [];
    toImport.forEach(function (r) {
      const secs = parseTime(r.time); if (!secs) return;
      const tags = tagsP[r.event]; const isPB = !newT[r.event] || secs < newT[r.event];
      const isBonus = !!(tags && secs <= tags.b);
      if (isPB) newT[r.event] = secs;
      newE.push({ stroke: r.event, time: secs, date: r.date || todayKey, meet: r.meet || "Photo import", isPB, isBonus, id: Date.now() + Math.random() });
    });
    setTimes(newT); setLogs(p => [...newE, ...p]);
    const xpE = newE.reduce(function (a, e) { return a + (e.isBonus ? 150 : e.isPB ? 50 : 15); }, 0);
    setXP(p => p + xpE); setPStep("done");
    notify("Imported " + toImport.length + " times! +" + xpE + " XP", "#00ffaa");
  }

  async function askCoach(q) {
    setAiLoad(true); setAiA("");
    const summary = tagsKeys.map(function (s) {
      const t = times[s]; const tg = tagsP[s]; if (!t || !tg) return null;
      return s + ": " + fmt(t) + " (" + (t <= tg.q ? "QUALIFIED" : (t - tg.q).toFixed(2) + "s from cut") + ")";
    }).filter(Boolean).join(", ");
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are an elite USA Swimming coach helping " + profile.name + ", age " + profile.age + ", " + (profile.gender === "boys" ? "male" : "female") + ", " + profile.ageGroup + " age group. Be encouraging, specific, fun. Use emojis. Under 220 words. Times: " + (summary || "none logged yet") + ".",
          messages: [{ role: "user", content: q }]
        })
      });
      const d = await r.json();
      const block = d.content && d.content.find(function (x) { return x.type === "text"; });
      setAiA(block ? block.text : "Coach unavailable — try again!");
      setMissions(p => ({ ...p, [todayKey]: { ...p[todayKey], coach_question: true } }));
    } catch (e) {
      setAiA("Could not reach AI Coach. Check your connection.");
    }
    setAiLoad(false);
  }

  function toggleCL(id) {
    setCl(function (p) {
      const day = p[todayKey] || {};
      return { ...p, [todayKey]: { ...day, [id]: !day[id] } };
    });
  }

  function isCL(id) { return !!(cl[todayKey] && cl[todayKey][id]); }

  const nameCode = (profile.name || "SWIM").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4) || "SWIM";
  const numCode = String(((profile.name || "X").length * 37 + parseInt(profile.age || 0) * 13 + 99)).slice(-4);
  const familyCode = nameCode + "-" + numCode;

  const TABS = [
    {id:"home",icon:"🏠",l:"Home"},
    {id:"log",icon:"📸",l:"Log"},
    {id:"train",icon:"💪",l:"Train"},
    {id:"skills",icon:"🎬",l:"Skills"},
    {id:"meets",icon:"📅",l:"Meets"},
    {id:"progress",icon:"📈",l:"Stats"},
    {id:"squad",icon:"👥",l:"Squad"},
    {id:"coach",icon:"🤖",l:"Coach"},
    {id:"nutrition",icon:"🥗",l:"Fuel"},
    {id:"family",icon:"❤️",l:"Family"},
  ];

  if (!setup) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#080d18,#0a1628)", fontFamily: "'Exo 2','Segoe UI',sans-serif", color: "#e8f4ff", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 80, marginBottom: 8 }}>🏊</div>
          <h1 style={{ fontSize: 42, fontWeight: 900, margin: "0 0 4px", background: "linear-gradient(90deg,#fff,#4db8ff,#00ffaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>SwimIQ</h1>
          <div style={{ fontSize: 11, color: "#4db8ff", letterSpacing: 3, fontWeight: 700, marginBottom: 4 }}>TRAIN SMART. SWIM FAST.</div>
          <div style={{ fontSize: 12, color: "#7aa8cc" }}>The all-in-one swim app for every swimmer, every goal.</div>
        </div>
        <Lbl>Your Name</Lbl>
        <input placeholder="e.g. Alex" value={profile.name} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} style={iStyle} />
        <Lbl>Age</Lbl>
        <input type="number" placeholder="13" value={profile.age} onChange={e => setProfile(p => ({ ...p, age: e.target.value }))} style={iStyle} />
        <Lbl>Gender</Lbl>
        <div style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          {["boys","girls"].map(g => <Chip key={g} on={profile.gender === g} onClick={() => setProfile(p => ({ ...p, gender: g }))}>{g === "boys" ? "👦 Boy" : "👧 Girl"}</Chip>)}
        </div>
        <Lbl>Age Group</Lbl>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
          {["10U","11-12","13-14","15-18","Adult"].map(g => <Chip key={g} on={profile.ageGroup === g} onClick={() => setProfile(p => ({ ...p, ageGroup: g }))}>{g}</Chip>)}
        </div>
        <Lbl>Primary Goal</Lbl>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
          {[["competitive","🏆 Compete"],["tags","⭐ TAGS"],["recreational","🌊 Fitness"],["technique","🎯 Technique"],["masters","🧓 Masters"]].map(function (item) {
            return <Chip key={item[0]} on={profile.mode === item[0]} onClick={() => setProfile(p => ({ ...p, mode: item[0] }))}>{item[1]}</Chip>;
          })}
        </div>
        <button onClick={() => { if (profile.name.trim()) setSetup(true); else notify("Enter your name first!", "#ff6b6b"); }} style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", background: "linear-gradient(135deg,#1a5fff,#0099ff)", color: "#fff", fontWeight: 900, fontSize: 17, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 0 30px rgba(0,120,255,0.4)" }}>
          Let's Go! 🚀
        </button>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg,#080d18,#0a1628,#060e1a)", fontFamily: "'Exo 2','Segoe UI',sans-serif", color: "#e8f4ff" }}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:rgba(77,184,255,0.2);border-radius:2px;}"}</style>

      {toast && <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", background: "#0d1b2a", border: "1.5px solid " + toast.color, color: toast.color, padding: "10px 22px", borderRadius: 12, fontWeight: 700, zIndex: 9999, fontSize: 14, whiteSpace: "nowrap" }}>{toast.msg}</div>}

      {/* HEADER */}
      <div style={{ padding: "12px 16px 0", position: "sticky", top: 0, background: "rgba(8,13,24,0.97)", backdropFilter: "blur(12px)", zIndex: 100, borderBottom: "1px solid rgba(77,184,255,0.08)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 28 }}>🏊</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 900, background: "linear-gradient(90deg,#fff,#4db8ff,#00ffaa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1 }}>SwimIQ</div>
              <div style={{ fontSize: 9, color: "#7aa8cc" }}>Hey {profile.name} 👋</div>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 10, color: "#4db8ff", fontWeight: 700 }}>Lvl {level} · {lvlName}</div>
            <div style={{ width: 80, height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, marginTop: 3 }}>
              <div style={{ width: lvlPct + "%", height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#1a5fff,#00ffaa)" }} />
            </div>
            <div style={{ fontSize: 9, color: "#7aa8cc", marginTop: 2 }}>{xp} XP</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
          {[{v:Object.keys(times).length,l:"Times"},{v:qualified.length,l:"TAGS ✓",c:"#00ffaa"},{v:earned.length,l:"Badges",c:"#ffd700"},{v:streak,l:"Streak 🔥",c:"#ff9f43"},{v:missionsDone,l:"Missions",c:"#a78bfa"}].map(function (s) {
            return (
              <div key={s.l} style={{ flex: 1, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "5px 3px", textAlign: "center", border: "1px solid rgba(77,184,255,0.1)" }}>
                <div style={{ fontSize: 15, fontWeight: 900, color: s.c || "#4db8ff" }}>{s.v}</div>
                <div style={{ fontSize: 7, color: "#7aa8cc" }}>{s.l}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 4, overflowX: "auto", paddingBottom: 8 }}>
          {TABS.map(function (t) {
            return (
              <button key={t.id} onClick={() => setTab(t.id)} style={{ flexShrink: 0, padding: "6px 8px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, fontFamily: "inherit", background: tab === t.id ? "linear-gradient(135deg,#1a5fff,#0099ff)" : "rgba(255,255,255,0.05)", color: tab === t.id ? "#fff" : "#7aa8cc" }}>
                {t.icon} {t.l}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ padding: "12px 16px 100px" }}>

        {/* HOME */}
        {tab === "home" && <>
          {/* Taper */}
          <Card style={{ background: "linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))", border: "1px solid rgba(77,184,255,0.2)", marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#4db8ff", fontWeight: 700, marginBottom: 6 }}>🏁 NEXT MEET COUNTDOWN</div>
            <input type="date" value={nextMeet} onChange={e => setNextMeet(e.target.value)} style={{ ...iStyle, marginBottom: 0, fontSize: 12, padding: "6px 10px" }} />
            {taperDays !== null && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                <div style={{ fontSize: 11, color: "#7aa8cc" }}>Phase: <span style={{ color: taperColor, fontWeight: 700 }}>{taperPhase}</span></div>
                <div style={{ fontSize: 28, fontWeight: 900, color: taperColor }}>{taperDays > 0 ? taperDays + " days" : "🎉 TODAY!"}</div>
              </div>
            )}
          </Card>

          {/* Daily Missions */}
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, marginBottom: 6 }}>⚡ TODAY'S MISSIONS</div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7aa8cc", marginBottom: 6 }}>
              <span>{missionsDone}/{DAILY_MISSIONS.length} complete</span>
              <span style={{ color: "#a78bfa", fontWeight: 700 }}>+{DAILY_MISSIONS.filter(m => todayMissions[m.id]).reduce((a, m) => a + m.xp, 0)} XP</span>
            </div>
            <ProgressBar value={missionsDone} max={DAILY_MISSIONS.length} color="linear-gradient(90deg,#a78bfa,#4db8ff)" />
            <div style={{ marginTop: 10 }}>
              {DAILY_MISSIONS.map(function (m) {
                const done = !!todayMissions[m.id];
                return (
                  <div key={m.id} onClick={() => { if (!done) { setMissions(p => ({ ...p, [todayKey]: { ...p[todayKey], [m.id]: true } })); addXP(m.xp, m.text + " ✓"); } }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", borderRadius: 9, marginBottom: 5, cursor: done ? "default" : "pointer", background: done ? "rgba(0,255,170,0.06)" : "rgba(255,255,255,0.03)", border: "1px solid " + (done ? "rgba(0,255,170,0.2)" : "rgba(255,255,255,0.06)") }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: done ? "#00ffaa" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000", fontWeight: 900, flexShrink: 0 }}>{done ? "✓" : ""}</div>
                    <div style={{ flex: 1, fontSize: 12, color: done ? "#7aa8cc" : "#e8f4ff", textDecoration: done ? "line-through" : "none" }}>{m.icon} {m.text}</div>
                    <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 700 }}>+{m.xp}</div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Events */}
          <div style={{ fontSize: 11, color: "#4db8ff", fontWeight: 700, marginBottom: 8 }}>🏊 TAGS EVENTS</div>
          {tagsKeys.length === 0
            ? <Card style={{ textAlign: "center", padding: "40px 20px" }}><div style={{ fontSize: 48 }}>🏊</div><div style={{ color: "#7aa8cc", marginTop: 10 }}>Tap 📸 Log to enter your first time!</div></Card>
            : tagsKeys.map(function (s) {
              const myT = times[s]; const tags = tagsP[s];
              const sc = getStatusColor(myT, tags && tags.q, tags && tags.b);
              const sl = getStatusLabel(myT, tags && tags.q, tags && tags.b);
              const pval = myT && tags ? Math.max(5, Math.min(100, 100 - (((myT - tags.q) / tags.q) * 400))) : 0;
              return (
                <div key={s} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: "1px solid " + (myT && tags && myT <= tags.q ? "rgba(0,255,170,0.2)" : "rgba(77,184,255,0.08)") }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 14 }}>{s}</div>
                      <div style={{ fontSize: 10, color: "#7aa8cc", marginTop: 2 }}>Cut: <span style={{ color: "#4db8ff", fontWeight: 700 }}>{fmt(tags && tags.q)}</span> · Bonus: <span style={{ color: "#ffd700", fontWeight: 700 }}>{fmt(tags && tags.b)}</span></div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: myT ? sc : "#2a4a6a" }}>{fmt(myT)}</div>
                      {sl && <div style={{ fontSize: 10, color: sc, fontWeight: 700 }}>{sl}</div>}
                    </div>
                  </div>
                  <ProgressBar value={pval} max={100} color={myT && tags && myT <= tags.b ? "#ffd700" : myT && tags && myT <= tags.q ? "#00ffaa" : "linear-gradient(90deg,#1a5fff,#4db8ff)"} />
                </div>
              );
            })
          }

          {/* Course Converter */}
          <Card>
            <div style={{ fontSize: 11, color: "#f87171", fontWeight: 700, marginBottom: 8 }}>🔄 COURSE CONVERTER (SCY to LCM to SCM)</div>
            <Lbl>Event</Lbl>
            <select value={convEvent} onChange={e => setConvEvent(e.target.value)} style={{ ...iStyle, cursor: "pointer" }}>
              {Object.keys(COURSE_FACTORS).map(e => <option key={e}>{e}</option>)}
            </select>
            <Lbl>Your SCY Time</Lbl>
            <input value={convTime} onChange={e => setConvTime(e.target.value)} placeholder="e.g. 54.23" style={iStyle} />
            {convTime && (function () {
              const secs = parseTime(convTime); if (!secs) return null;
              const f = COURSE_FACTORS[convEvent] || { lcm: 1.09, scm: 1.04 };
              return (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
                  {[{label:"SCY",val:fmt(secs),color:"#4db8ff"},{label:"LCM",val:fmt(secs*f.lcm),color:"#00ffaa"},{label:"SCM",val:fmt(secs*f.scm),color:"#ffd700"}].map(function (c) {
                    return (
                      <div key={c.label} style={{ textAlign: "center", padding: "10px 4px", background: "rgba(255,255,255,0.04)", borderRadius: 10 }}>
                        <div style={{ fontSize: 9, color: "#7aa8cc", marginBottom: 3 }}>{c.label}</div>
                        <div style={{ fontSize: 15, fontWeight: 900, color: c.color }}>{c.val}</div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </Card>
        </>}

        {/* LOG */}
        {tab === "log" && <>
          <Card style={{ border: "1px solid rgba(0,255,170,0.2)", background: "linear-gradient(135deg,rgba(0,255,170,0.04),rgba(0,100,255,0.06))" }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: "#00ffaa", marginBottom: 4 }}>📸 SCAN MEET RESULTS</div>
            <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 12 }}>Screenshot from Meet Mobile — AI reads all times instantly</div>
            {pStep === "idle" && <>
              <input ref={pRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display: "none" }} id="pIn" />
              <label htmlFor="pIn" style={{ display: "block", width: "100%", padding: "14px 0", borderRadius: 12, border: "2px dashed rgba(0,255,170,0.4)", textAlign: "center", cursor: "pointer", color: "#00ffaa", fontWeight: 800, fontSize: 14 }}>📂 Tap to upload screenshot</label>
            </>}
            {pStep === "preview" && pPrev && <>
              <img src={pPrev} alt="preview" style={{ width: "100%", borderRadius: 10, marginBottom: 10, maxHeight: 200, objectFit: "cover" }} />
              {pErr && <div style={{ color: "#ff6b6b", fontSize: 12, marginBottom: 8 }}>⚠️ {pErr}</div>}
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={scanPhoto} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#00cc88,#0099ff)", color: "#fff", fontWeight: 900, cursor: "pointer", fontFamily: "inherit" }}>🔍 Scan for Times</button>
                <button onClick={resetPhoto} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#7aa8cc", cursor: "pointer", fontFamily: "inherit" }}>✕</button>
              </div>
            </>}
            {pStep === "scanning" && <div style={{ textAlign: "center", padding: "20px 0" }}><div style={{ fontSize: 30 }}>🧠</div><div style={{ color: "#00ffaa", fontWeight: 800, marginTop: 6 }}>Reading your results...</div></div>}
            {pStep === "review" && pRes && <>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#00ffaa", marginBottom: 8 }}>Found {pRes.length} times — tap to select:</div>
              {pRes.map(function (r, i) {
                return (
                  <div key={i} onClick={() => setPRes(p => p.map((x, j) => j === i ? { ...x, selected: !x.selected } : x))} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 6, cursor: "pointer", background: r.selected ? "rgba(0,255,170,0.07)" : "rgba(255,255,255,0.03)", border: "1px solid " + (r.selected ? "rgba(0,255,170,0.3)" : "rgba(255,255,255,0.07)") }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", background: r.selected ? "#00ffaa" : "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#000", fontWeight: 900, flexShrink: 0 }}>{r.selected ? "✓" : ""}</div>
                    <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 13 }}>{r.event}</div><div style={{ fontSize: 10, color: "#7aa8cc" }}>{r.meet || ""}{r.date ? " · " + r.date : ""}</div></div>
                    <div style={{ fontSize: 18, fontWeight: 900, color: r.recognized ? "#4db8ff" : "#7aa8cc" }}>{r.time}</div>
                  </div>
                );
              })}
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <button onClick={importPhotos} style={{ flex: 1, padding: "12px 0", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#00cc88,#0099ff)", color: "#fff", fontWeight: 900, cursor: "pointer", fontFamily: "inherit" }}>⬇️ Import Selected</button>
                <button onClick={resetPhoto} style={{ padding: "12px 14px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#7aa8cc", cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
              </div>
            </>}
            {pStep === "done" && <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 32 }}>🎉</div>
              <div style={{ color: "#00ffaa", fontWeight: 900, marginBottom: 12 }}>Times imported!</div>
              <button onClick={resetPhoto} style={{ padding: "10px 24px", borderRadius: 10, border: "1px solid rgba(0,255,170,0.3)", background: "rgba(0,255,170,0.08)", color: "#00ffaa", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>Scan Another</button>
            </div>}
          </Card>

          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <div style={{ fontSize: 11, color: "#3a5a7a", fontWeight: 700 }}>OR LOG MANUALLY</div>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <Card>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 12 }}>LOG A TIME</div>
            <Lbl>Event</Lbl>
            <select value={lSt} onChange={e => setLSt(e.target.value)} style={{ ...iStyle, cursor: "pointer" }}>
              <option value="">Pick an event</option>
              {tagsKeys.length > 0 && <optgroup label="TAGS Events">{tagsKeys.map(s => <option key={s}>{s}</option>)}</optgroup>}
              <optgroup label="All Events">{ALL_EVENTS.filter(e => !tagsKeys.includes(e)).map(s => <option key={s}>{s}</option>)}</optgroup>
            </select>
            <Lbl>Your Time (e.g. 54.23 or 1:02.45)</Lbl>
            <input value={lTm} onChange={e => setLTm(e.target.value)} onKeyDown={e => e.key === "Enter" && doLog()} placeholder="ss.xx or m:ss.xx" style={{ ...iStyle, fontSize: 22, fontWeight: 900 }} />
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <div style={{ flex: 1 }}><Lbl>Date</Lbl><input type="date" value={lDt} onChange={e => setLDt(e.target.value)} style={iStyle} /></div>
              <div style={{ flex: 1 }}><Lbl>Meet</Lbl><input value={lMt} onChange={e => setLMt(e.target.value)} placeholder="Optional" style={iStyle} /></div>
            </div>
            <button onClick={doLog} style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#1a5fff,#0099ff)", color: "#fff", fontWeight: 900, fontSize: 16, cursor: "pointer", fontFamily: "inherit" }}>💾 LOG THIS TIME</button>
          </Card>
        </>}

        {/* TRAIN */}
        {tab === "train" && <>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[["dryland","💪 Dryland"],["pool","🏊 Pool"]].map(function (item) {
              return <button key={item[0]} onClick={() => setTrainView(item[0])} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: trainView === item[0] ? "linear-gradient(135deg,#1a5fff,#0099ff)" : "rgba(255,255,255,0.05)", color: trainView === item[0] ? "#fff" : "#7aa8cc" }}>{item[1]}</button>;
            })}
          </div>

          {trainView === "dryland" && <>
            <Card style={{ background: "linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))", border: "1px solid rgba(0,255,170,0.15)", marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: "#00ffaa", fontWeight: 700, marginBottom: 4 }}>TODAY'S DRYLAND — Age-safe for {profile.name}, age {profile.age}</div>
              {streak > 0 && <div style={{ fontSize: 11, color: "#ffd700", fontWeight: 700 }}>🔥 {streak}-day streak!</div>}
              {age <= 10 && <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 8, background: "rgba(255,215,0,0.07)", fontSize: 10, color: "#ffd700" }}>Bodyweight and stretching only. No resistance bands.</div>}
              {age > 10 && age <= 12 && <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 8, background: "rgba(255,215,0,0.07)", fontSize: 10, color: "#ffd700" }}>Light resistance bands OK. No weight training.</div>}
              {age > 12 && age <= 14 && <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 8, background: "rgba(255,215,0,0.07)", fontSize: 10, color: "#ffd700" }}>Resistance bands OK. No barbell lifting.</div>}
              {age > 18 && <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 8, background: "rgba(255,215,0,0.07)", fontSize: 10, color: "#ffd700" }}>Full training OK. Prioritize recovery.</div>}
            </Card>
            {EXERCISES.filter(e => e.ageMin <= age).map(function (ex) {
              const done = isCL(ex.id); const open = exOpen === ex.id;
              return (
                <div key={ex.id} style={{ borderRadius: 12, marginBottom: 8, overflow: "hidden", border: "1px solid " + (done ? "rgba(0,255,170,0.3)" : "rgba(77,184,255,0.1)"), background: done ? "rgba(0,255,170,0.04)" : "rgba(255,255,255,0.03)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", cursor: "pointer" }} onClick={() => setExOpen(open ? null : ex.id)}>
                    <div onClick={e => { e.stopPropagation(); toggleCL(ex.id); if (!done) addXP(10, "Exercise done! 💪"); }} style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, background: done ? "#00ffaa" : "rgba(255,255,255,0.08)", border: "2px solid " + (done ? "#00ffaa" : "rgba(255,255,255,0.15)"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#000", fontWeight: 900, cursor: "pointer" }}>{done ? "✓" : ""}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 800, fontSize: 13, color: done ? "#00ffaa" : "#e8f4ff", textDecoration: done ? "line-through" : "none", opacity: done ? 0.7 : 1 }}>{ex.name}</div>
                      <div style={{ fontSize: 10, color: "#7aa8cc", marginTop: 1 }}>{ex.sets} sets · {ex.reps} · {ex.gear}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#4db8ff" }}>{open ? "▲" : "▼"}</div>
                  </div>
                  {open && <div style={{ padding: "0 14px 14px" }}>
                    <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.65, padding: "10px 12px", background: "rgba(0,100,255,0.08)", borderRadius: 8, marginBottom: 8 }}>💡 {ex.cue}</div>
                    <div style={{ padding: "8px 12px", borderRadius: 8, background: "rgba(255,0,0,0.07)" }}>
                      <div style={{ fontSize: 10, color: "#7aa8cc", marginBottom: 4 }}>Search YouTube:</div>
                      <div style={{ fontSize: 12, color: "#ff8888", fontWeight: 700, marginBottom: 6 }}>{ex.search}</div>
                      <button onClick={() => navigator.clipboard && navigator.clipboard.writeText(ex.search).catch(function () {})} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,100,100,0.3)", background: "rgba(255,100,100,0.1)", color: "#ff8888", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Copy Search</button>
                    </div>
                  </div>}
                </div>
              );
            })}
          </>}

          {trainView === "pool" && <>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>🏊 POOL TRAINING PLANS</div>
              <Lbl>Stroke Focus</Lbl>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                {Object.keys(POOL_WORKOUTS).map(s => <Chip key={s} on={trainStroke === s} onClick={() => setTrainStroke(s)}>{s.charAt(0).toUpperCase() + s.slice(1)}</Chip>)}
              </div>
              <Lbl>Level</Lbl>
              <div style={{ display: "flex", gap: 6, marginBottom: 0 }}>
                {["beginner","intermediate","advanced"].map(function (l) {
                  return <Chip key={l} on={trainLevel === l} onClick={() => setTrainLevel(l)} color={l === "beginner" ? "#10b981" : l === "intermediate" ? "#4db8ff" : "#f87171"}>{l.charAt(0).toUpperCase() + l.slice(1)}</Chip>;
                })}
              </div>
            </Card>
            {(POOL_WORKOUTS[trainStroke] || []).filter(w => w.level === trainLevel).map(function (workout, i) {
              return (
                <Card key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 15 }}>{workout.name}</div>
                      <div style={{ fontSize: 11, color: "#7aa8cc", marginTop: 2 }}>Total: <span style={{ color: "#4db8ff", fontWeight: 700 }}>{workout.yards.toLocaleString()} yards</span></div>
                    </div>
                  </div>
                  {workout.sets.map(function (set, j) {
                    return (
                      <div key={j} style={{ display: "flex", gap: 10, padding: "9px 12px", borderRadius: 9, marginBottom: 6, background: j % 2 === 0 ? "rgba(0,100,255,0.06)" : "rgba(255,255,255,0.03)" }}>
                        <div style={{ fontSize: 13, color: "#4db8ff", fontWeight: 800, flexShrink: 0 }}>{j + 1}.</div>
                        <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.6 }}>{set}</div>
                      </div>
                    );
                  })}
                </Card>
              );
            })}
          </>}
        </>}

        {/* SKILLS */}
        {tab === "skills" && <>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            {Object.keys(TIPS).map(function (k) {
              const labels = {freestyle:"🏊 Free",backstroke:"🔄 Back",breaststroke:"🐸 Breast",butterfly:"🦋 Fly",turns:"🔁 Turns",starts:"🚀 Starts"};
              return <Chip key={k} on={skillCat === k} onClick={() => setSkillCat(k)} color="#b45309">{labels[k] || k}</Chip>;
            })}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {[["tips","💡 Tips"],["channels","📺 Channels"]].map(function (item) {
              return <button key={item[0]} onClick={() => setSkillView(item[0])} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: skillView === item[0] ? "linear-gradient(135deg,#b45309,#f59e0b)" : "rgba(255,255,255,0.05)", color: skillView === item[0] ? "#fff" : "#7aa8cc" }}>{item[1]}</button>;
            })}
          </div>
          {skillView === "tips" && (TIPS[skillCat] || []).map(function (tip, i) {
            return (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: "1px solid rgba(251,191,36,0.1)", display: "flex", gap: 10 }}>
                <div style={{ fontSize: 16, flexShrink: 0 }}>{["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"][i]}</div>
                <div style={{ fontSize: 13, color: "#d0e8ff", lineHeight: 1.65 }}>{tip}</div>
              </div>
            );
          })}
          {skillView === "channels" && CHANNELS.map(function (ch) {
            return (
              <div key={ch.name} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px", marginBottom: 8, border: "1px solid rgba(251,191,36,0.12)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                  <div style={{ fontSize: 22, flexShrink: 0 }}>{ch.icon}</div>
                  <div><div style={{ fontWeight: 900, fontSize: 14, color: "#fbbf24" }}>{ch.name}</div><div style={{ fontSize: 11, color: "#7aa8cc", marginTop: 3, lineHeight: 1.5 }}>{ch.desc}</div></div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "rgba(251,191,36,0.07)" }}>
                  <div style={{ fontSize: 10, color: "#7aa8cc", flex: 1 }}>{ch.url}</div>
                  <button onClick={() => navigator.clipboard && navigator.clipboard.writeText("https://" + ch.url).catch(function () {})} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.15)", color: "#fbbf24", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Copy</button>
                </div>
              </div>
            );
          })}
        </>}

        {/* MEETS */}
        {tab === "meets" && <>
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>📅 MEET CALENDAR</div>
            {meets.length === 0 ? <div style={{ color: "#7aa8cc", fontSize: 12 }}>No upcoming meets — add one below.</div> : meets.map(function (m) {
              return (
                <div key={m.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px", marginBottom: 8, border: "1px solid rgba(77,184,255,0.15)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 13 }}>{m.name}</div>
                      <div style={{ fontSize: 10, color: "#7aa8cc", marginTop: 2 }}>{m.date}{m.loc ? " · " + m.loc : ""}</div>
                    </div>
                    <button onClick={() => setMeets(p => p.filter(x => x.id !== m.id))} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, border: "1px solid rgba(255,100,100,0.3)", background: "rgba(255,100,100,0.1)", color: "#ff6b6b", cursor: "pointer", fontFamily: "inherit" }}>Remove</button>
                  </div>
                </div>
              );
            })}
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>➕ ADD A MEET</div>
            <Lbl>Meet Name</Lbl><input value={mName} onChange={e => setMName(e.target.value)} placeholder="e.g. District Championships" style={iStyle} />
            <Lbl>Date</Lbl><input type="date" value={mDate} onChange={e => setMDate(e.target.value)} style={iStyle} />
            <Lbl>Location (optional)</Lbl><input value={mLoc} onChange={e => setMLoc(e.target.value)} placeholder="e.g. Northside Aquatic Center" style={iStyle} />
            <Lbl>Events You'll Swim</Lbl>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
              {tagsKeys.map(function (ev) {
                return <button key={ev} onClick={() => setMEvents(p => p.includes(ev) ? p.filter(e => e !== ev) : [...p, ev])} style={{ padding: "5px 10px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 11, fontFamily: "inherit", background: mEvents.includes(ev) ? "#1a5fff" : "rgba(255,255,255,0.07)", color: mEvents.includes(ev) ? "#fff" : "#7aa8cc" }}>{ev}</button>;
              })}
            </div>
            <button onClick={() => { if (!mName || !mDate) { notify("Enter meet name and date", "#ff6b6b"); return; } setMeets(p => [{ id: Date.now(), name: mName, date: mDate, loc: mLoc, events: mEvents }, ...p]); setMName(""); setMDate(""); setMLoc(""); setMEvents([]); notify("Meet added! 📅"); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#1a5fff,#0099ff)", color: "#fff", fontWeight: 900, cursor: "pointer", fontFamily: "inherit" }}>Add Meet 📅</button>
          </Card>
        </>}

        {/* PROGRESS */}
        {tab === "progress" && <>
          <Card style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#ff9f43", marginBottom: 10 }}>🎯 GOALS</div>
            {goals.map(function (g) {
              const t = times[g.event]; const target = parseTime(g.target); const diff = t && target ? t - target : null;
              return (
                <div key={g.id} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "10px 12px", marginBottom: 8, border: "1px solid rgba(255,159,67,0.2)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div><div style={{ fontWeight: 800, fontSize: 13 }}>{g.event}</div><div style={{ fontSize: 10, color: "#7aa8cc" }}>Target: {fmt(target)} · By {g.deadline}</div></div>
                    <div style={{ textAlign: "right" }}>{diff !== null && <div style={{ fontSize: 12, fontWeight: 800, color: diff <= 0 ? "#00ffaa" : "#ff9f43" }}>{diff <= 0 ? "✅ HIT!" : diff.toFixed(2) + "s to go"}</div>}<button onClick={() => setGoals(p => p.filter(x => x.id !== g.id))} style={{ fontSize: 9, padding: "2px 7px", borderRadius: 5, border: "1px solid rgba(255,100,100,0.3)", background: "rgba(255,100,100,0.1)", color: "#ff6b6b", cursor: "pointer", fontFamily: "inherit", marginTop: 4 }}>Remove</button></div>
                  </div>
                </div>
              );
            })}
            <Lbl>Event</Lbl>
            <select value={gEvent} onChange={e => setGEvent(e.target.value)} style={{ ...iStyle, cursor: "pointer" }}><option value="">Pick event</option>{tagsKeys.map(s => <option key={s}>{s}</option>)}</select>
            <div style={{ display: "flex", gap: 8 }}>
              <div style={{ flex: 1 }}><Lbl>Target Time</Lbl><input value={gTarget} onChange={e => setGTarget(e.target.value)} placeholder="52.00" style={iStyle} /></div>
              <div style={{ flex: 1 }}><Lbl>Deadline</Lbl><input type="date" value={gDeadline} onChange={e => setGDeadline(e.target.value)} style={iStyle} /></div>
            </div>
            <button onClick={() => { if (!gEvent || !gTarget) { notify("Fill all goal fields", "#ff6b6b"); return; } setGoals(p => [{ id: Date.now(), event: gEvent, target: gTarget, deadline: gDeadline }, ...p]); setGEvent(""); setGTarget(""); setGDeadline(""); notify("Goal set! 🎯", "#ff9f43"); }} style={{ width: "100%", padding: 11, borderRadius: 10, border: "none", background: "rgba(255,159,67,0.2)", color: "#ff9f43", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>Set Goal 🎯</button>
          </Card>

          <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>🏅 Badges</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
            {BADGES_DEF.map(function (b) {
              const has = earned.find(function (e) { return e.id === b.id; });
              return (
                <div key={b.id} style={{ background: has ? "rgba(0,100,255,0.12)" : "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 10px", border: "1px solid " + (has ? "rgba(77,184,255,0.3)" : "rgba(255,255,255,0.06)"), opacity: has ? 1 : 0.45 }}>
                  <div style={{ fontSize: 24 }}>{b.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 800, marginTop: 4 }}>{b.name}</div>
                  <div style={{ fontSize: 10, color: "#7aa8cc", marginTop: 2 }}>{b.desc}</div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>📋 Session History</div>
          {logs.length === 0 ? <div style={{ color: "#3a5a7a", textAlign: "center", padding: "30px 0" }}>No sessions yet!</div> : logs.slice(0, 20).map(function (e) {
            const tg = tagsP[e.stroke]; const q = !!(tg && e.time <= tg.q);
            return (
              <div key={e.id} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: "10px 14px", marginBottom: 7, border: "1px solid " + (e.isBonus ? "rgba(255,215,0,0.2)" : q ? "rgba(0,255,170,0.15)" : "rgba(77,184,255,0.07)") }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div><div style={{ fontWeight: 800, fontSize: 13 }}>{e.stroke}</div><div style={{ fontSize: 10, color: "#7aa8cc" }}>{e.date}{e.meet ? " · " + e.meet : ""}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 18, fontWeight: 900, color: e.isBonus ? "#ffd700" : q ? "#00ffaa" : "#4db8ff" }}>{fmt(e.time)}</div>{e.isPB && <div style={{ fontSize: 9, color: "#ff9f43", fontWeight: 700 }}>⚡ PB</div>}</div>
                </div>
              </div>
            );
          })}
        </>}

        {/* SQUAD */}
        {tab === "squad" && <>
          <Card style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 12 }}>👥 Squad Leaderboard</div>
            {[{ name: profile.name, times, isMe: true }, ...squad].sort(function (a, b) {
              return tagsKeys.filter(s => b.times[s] && tagsP[s] && b.times[s] <= tagsP[s].q).length - tagsKeys.filter(s => a.times[s] && tagsP[s] && a.times[s] <= tagsP[s].q).length;
            }).map(function (sw, i) {
              const q = tagsKeys.filter(s => sw.times[s] && tagsP[s] && sw.times[s] <= tagsP[s].q).length;
              return (
                <div key={sw.name + i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, marginBottom: 6, background: sw.isMe ? "rgba(26,95,255,0.15)" : "rgba(255,255,255,0.04)", border: "1px solid " + (sw.isMe ? "rgba(77,184,255,0.3)" : "rgba(255,255,255,0.06)") }}>
                  <div style={{ fontSize: 20, width: 28, textAlign: "center" }}>{i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : "👤"}</div>
                  <div style={{ flex: 1 }}><div style={{ fontWeight: 800, fontSize: 13 }}>{sw.name}{sw.isMe ? " (You)" : ""}</div><div style={{ fontSize: 11, color: "#7aa8cc" }}>{q} TAGS cuts</div></div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: "#4db8ff" }}>{q}</div>
                </div>
              );
            })}
          </Card>
          <Card>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>➕ Add Squad Mate</div>
            <Lbl>Name</Lbl><input value={sN} onChange={e => setSN(e.target.value)} placeholder="Teammate name" style={iStyle} />
            <Lbl>Best Event</Lbl><select value={sEv} onChange={e => setSEv(e.target.value)} style={{ ...iStyle, cursor: "pointer" }}><option value="">Pick event</option>{tagsKeys.map(s => <option key={s}>{s}</option>)}</select>
            <Lbl>Their Time</Lbl><input value={sTm} onChange={e => setSTm(e.target.value)} placeholder="e.g. 58.23" style={iStyle} />
            <button onClick={() => { if (!sN || !sEv || !sTm) { notify("Fill all fields!", "#ff6b6b"); return; } setSquad(p => [...p, { name: sN, times: { [sEv]: parseTime(sTm) } }]); setSN(""); setSEv(""); setSTm(""); notify(sN + " added! 👊"); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "rgba(77,184,255,0.15)", color: "#4db8ff", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>Add Member</button>
          </Card>
        </>}

        {/* COACH */}
        {tab === "coach" && <>
          <Card style={{ marginBottom: 12, border: "1px solid rgba(167,139,250,0.3)" }}>
            <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, marginBottom: 6 }}>⚡ RACE SPLIT ANALYZER</div>
            <Lbl>Event</Lbl>
            <select value={splitEvent} onChange={e => { setSplitEvent(e.target.value); setSplitResult(null); }} style={{ ...iStyle, cursor: "pointer" }}>
              <option value="">Select event</option>
              {["100 Free","200 Free","500 Free","100 Back","200 Back","100 Breast","200 Breast","100 Fly","200 Fly","200 IM","400 IM"].map(e => <option key={e}>{e}</option>)}
            </select>
            {splitEvent && <>
              <Lbl>Enter 50-yard splits</Lbl>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
                {Array.from({ length: splitEvent.includes("100") ? 2 : splitEvent.includes("200") ? 4 : 8 }).map(function (_, i) {
                  return <input key={i} value={splitTimes[i]} onChange={e => setSplitTimes(p => { const n = [...p]; n[i] = e.target.value; return n; })} placeholder={"Split " + (i + 1)} style={{ ...iStyle, marginBottom: 0, fontSize: 13 }} />;
                })}
              </div>
              <button onClick={() => {
                const n = splitEvent.includes("100") ? 2 : splitEvent.includes("200") ? 4 : 8;
                const filled = splitTimes.slice(0, n).filter(t => t.trim());
                if (filled.length < 2) { notify("Enter at least 2 splits", "#ff6b6b"); return; }
                const parsed = filled.map(t => parseFloat(t)).filter(t => !isNaN(t));
                const total = parsed.reduce((a, b) => a + b, 0);
                const half = Math.ceil(parsed.length / 2);
                const first = parsed.slice(0, half).reduce((a, b) => a + b, 0);
                const second = parsed.slice(half).reduce((a, b) => a + b, 0);
                const isNeg = second < first;
                const fastest = Math.min(...parsed); const slowest = Math.max(...parsed);
                const drop = ((slowest - fastest) / fastest * 100).toFixed(1);
                const iq = Math.max(0, Math.min(100, Math.round(100 - parseFloat(drop) * 5 + (isNeg ? 15 : 0))));
                setSplitResult({ parsed, total, isNeg, drop, fastest, slowest, iq });
                addXP(30, "Race analyzed! 🔬");
              }} style={{ width: "100%", padding: 11, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontWeight: 900, cursor: "pointer", fontFamily: "inherit" }}>Analyze Race 🔬</button>
              {splitResult && <div style={{ marginTop: 12, padding: "14px", borderRadius: 12, background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <div><div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700 }}>RACE IQ SCORE</div><div style={{ fontSize: 32, fontWeight: 900, color: splitResult.iq >= 80 ? "#00ffaa" : splitResult.iq >= 60 ? "#ffd700" : "#ff6b6b" }}>{splitResult.iq}</div></div>
                  <div style={{ textAlign: "right" }}><div style={{ fontSize: 11, color: "#7aa8cc" }}>Pacing</div><div style={{ fontSize: 14, fontWeight: 800, color: splitResult.isNeg ? "#00ffaa" : "#ff9f43" }}>{splitResult.isNeg ? "✅ Negative Split" : "⚠️ Positive Split"}</div></div>
                </div>
                <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.6 }}>{splitResult.isNeg ? "🌟 You swam faster in the second half — elite-level pacing!" : "💡 You went out too fast. Try to hold back in the first half."}</div>
              </div>}
            </>}
          </Card>

          <Card style={{ background: "rgba(0,100,255,0.07)" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginBottom: 4 }}>🤖 AI COACH — Powered by Claude</div>
            <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 12 }}>Your times and profile are pre-loaded. Ask anything.</div>
            {["How close am I to TAGS? What's my fastest path?","Build me a 4-week plan to drop time","What is my best event and why?","How do I fix my turns and walls?","What should I eat before a meet?","How do I stay calm on the blocks?"].map(q => <button key={q} onClick={() => askCoach(q)} style={{ display: "block", width: "100%", textAlign: "left", marginBottom: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(77,184,255,0.12)", color: "#d0e8ff", borderRadius: 10, padding: "11px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{q}</button>)}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={aiQ} onChange={e => setAiQ(e.target.value)} onKeyDown={e => e.key === "Enter" && aiQ && askCoach(aiQ)} placeholder="Ask anything..." style={{ ...iStyle, flex: 1, margin: 0 }} />
              <button onClick={() => aiQ && askCoach(aiQ)} style={{ background: "linear-gradient(135deg,#1a5fff,#0099ff)", border: "none", color: "#fff", borderRadius: 10, padding: "10px 18px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Ask</button>
            </div>
            {aiLoad && <div style={{ textAlign: "center", color: "#4db8ff", fontSize: 14, marginTop: 20 }}>🧠 Coach is thinking...</div>}
            {aiA && <div style={{ marginTop: 14, background: "rgba(0,100,255,0.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(77,184,255,0.2)", fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap", color: "#d0e8ff" }}>{aiA}</div>}
          </Card>
        </>}

        {/* NUTRITION */}
        {tab === "nutrition" && <>
          <Card style={{ background: "linear-gradient(135deg,rgba(0,200,100,0.08),rgba(26,95,255,0.08))", border: "1px solid rgba(0,255,170,0.2)", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#00ffaa", fontWeight: 700, marginBottom: 4 }}>🥗 FUEL LIKE AN OLYMPIAN</div>
            <div style={{ fontSize: 12, color: "#7aa8cc" }}>Nutrition plan for age {profile.age}. What you eat is as important as how you train.</div>
          </Card>
          <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
            {[["daily","🍽️ Daily"],["hydration","💧 Hydration"],["preMeet","🏁 Pre-Meet"]].map(function (item) {
              return <button key={item[0]} onClick={() => setNutrTab(item[0])} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", background: nutrTab === item[0] ? "linear-gradient(135deg,#00cc88,#0099ff)" : "rgba(255,255,255,0.05)", color: nutrTab === item[0] ? "#fff" : "#7aa8cc", minWidth: "30%" }}>{item[1]}</button>;
            })}
          </div>
          {(NUTRITION_DATA[nutrTab] && NUTRITION_DATA[nutrTab][nutrAge] || []).map(function (tip, i) {
            return (
              <div key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: "1px solid rgba(0,255,170,0.1)", display: "flex", gap: 10 }}>
                <div style={{ fontSize: 16, flexShrink: 0 }}>{["1️⃣","2️⃣","3️⃣","4️⃣","5️⃣"][i] || "•"}</div>
                <div style={{ fontSize: 13, color: "#d0e8ff", lineHeight: 1.65 }}>{tip}</div>
              </div>
            );
          })}
          <Card style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}>
            <div style={{ fontSize: 11, color: "#ffd700", fontWeight: 700, marginBottom: 4 }}>⚠️ IMPORTANT</div>
            <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.7 }}>{age <= 14 ? "This is general guidance for young athletes. Talk to your parents and doctor before major diet changes. Never restrict food intake — growing athletes need adequate fuel." : "General sports nutrition guidance. Consult a registered dietitian who specializes in sports nutrition for a fully personalized plan."}</div>
          </Card>
        </>}

        {/* FAMILY */}
        {tab === "family" && <>
          <Card style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,100,255,0.07))", border: "1px solid rgba(168,85,247,0.25)", marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: "#c084fc", fontWeight: 700, marginBottom: 4 }}>❤️ FAMILY DASHBOARD</div>
            <div style={{ fontSize: 12, color: "#7aa8cc" }}>Share your progress with your parents. Your AI coach conversations stay private.</div>
          </Card>
          <Card>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#c084fc", marginBottom: 8 }}>Your Family Code</div>
            <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", letterSpacing: 4, textAlign: "center", padding: "16px 0", background: "rgba(168,85,247,0.08)", borderRadius: 10, marginBottom: 8, border: "1px solid rgba(168,85,247,0.2)" }}>{familyCode}</div>
            <button onClick={() => { navigator.clipboard && navigator.clipboard.writeText(familyCode).catch(function () {}); notify("Copied! Text to your parents 📱", "#c084fc"); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "rgba(168,85,247,0.2)", color: "#c084fc", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>📋 Copy Family Code</button>
          </Card>
          <Card>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginBottom: 12 }}>📊 Progress Summary</div>
            {[{l:"Events Logged",v:Object.keys(times).length},{l:"TAGS Cuts Hit",v:qualified.length,c:"#00ffaa"},{l:"Training Streak",v:streak+" days",c:streak>0?"#ffd700":undefined},{l:"Badges Earned",v:earned.length+"/"+BADGES_DEF.length,c:"#ffd700"},{l:"Total Sessions",v:logs.length},{l:"Personal Bests",v:logs.filter(function(l){return l.isPB;}).length,c:"#ff9f43"}].map(function (r) {
              return (
                <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <span style={{ fontSize: 13, color: "#7aa8cc" }}>{r.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 800, color: r.c || "#e8f4ff" }}>{r.v}</span>
                </div>
              );
            })}
          </Card>
          <Card>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginBottom: 10 }}>🎯 Closest to TAGS</div>
            {tagsKeys.filter(s => times[s] && tagsP[s] && times[s] > tagsP[s].q).sort((a, b) => (times[a] - tagsP[a].q) - (times[b] - tagsP[b].q)).slice(0, 4).map(function (s) {
              const diff = (times[s] - tagsP[s].q).toFixed(2);
              return (
                <div key={s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div><div style={{ fontWeight: 800, fontSize: 13 }}>{s}</div><div style={{ fontSize: 10, color: "#7aa8cc" }}>{fmt(times[s])} needs {fmt(tagsP[s].q)}</div></div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: "#ff9f43" }}>{diff}s away</div>
                </div>
              );
            })}
            {qualified.length === tagsKeys.length && tagsKeys.length > 0 && <div style={{ textAlign: "center", color: "#00ffaa", fontWeight: 800, padding: "12px 0" }}>🏆 All events TAGS qualified!</div>}
          </Card>
        </>}

      </div>
    </div>
  );
}
