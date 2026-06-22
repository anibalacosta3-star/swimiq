import { useState, useEffect, useRef } from "react";

// ─── TAGS STANDARDS — SCY (Short Course Yards) ───────────────────────────
const TAGS_SCY = {
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

// ─── TAGS STANDARDS — LCM (Long Course Meters) ───────────────────────────
const TAGS_LCM = {
  boys: {
    "10U":   {"50 Free":{q:35.99,b:34.19},"100 Free":{q:79.99,b:75.99},"200 Free":{q:175.99,b:167.49},"100 Back":{q:87.99,b:83.69},"100 Breast":{q:97.99,b:93.19},"100 Fly":{q:87.99,b:83.69},"200 IM":{q:185.99,b:176.99}},
    "11-12": {"50 Free":{q:29.49,b:28.09},"100 Free":{q:63.99,b:60.89},"200 Free":{q:138.99,b:132.29},"400 Free":{q:309.99,b:294.99},"100 Back":{q:73.99,b:70.39},"200 Back":{q:159.99,b:152.29},"100 Breast":{q:82.99,b:78.99},"200 Breast":{q:179.99,b:171.29},"100 Fly":{q:72.99,b:69.49},"200 Fly":{q:159.99,b:152.29},"200 IM":{q:149.99,b:142.79},"400 IM":{q:319.99,b:304.29}},
    "13-14": {"50 Free":{q:26.69,b:25.49},"100 Free":{q:58.49,b:55.79},"200 Free":{q:127.99,b:121.99},"400 Free":{q:279.99,b:266.49},"100 Back":{q:67.49,b:64.29},"200 Back":{q:146.99,b:139.99},"100 Breast":{q:76.49,b:72.89},"200 Breast":{q:166.99,b:158.89},"100 Fly":{q:65.29,b:62.19},"200 Fly":{q:144.99,b:138.19},"200 IM":{q:138.49,b:131.99},"400 IM":{q:294.99,b:280.79}},
  },
  girls: {
    "10U":   {"50 Free":{q:37.99,b:36.19},"100 Free":{q:82.99,b:78.99},"200 Free":{q:181.99,b:173.19},"100 Back":{q:91.99,b:87.49},"100 Breast":{q:101.99,b:96.99},"100 Fly":{q:91.99,b:87.49},"200 IM":{q:193.99,b:184.59}},
    "11-12": {"50 Free":{q:30.99,b:29.49},"100 Free":{q:67.49,b:64.29},"200 Free":{q:146.99,b:139.99},"400 Free":{q:319.99,b:304.29},"100 Back":{q:77.49,b:73.79},"200 Back":{q:167.99,b:159.99},"100 Breast":{q:87.49,b:83.19},"200 Breast":{q:189.99,b:180.89},"100 Fly":{q:77.49,b:73.79},"200 Fly":{q:167.99,b:159.99},"200 IM":{q:156.99,b:149.49},"400 IM":{q:334.99,b:318.99}},
    "13-14": {"50 Free":{q:29.19,b:27.79},"100 Free":{q:63.99,b:60.99},"200 Free":{q:139.99,b:133.29},"400 Free":{q:294.99,b:280.79},"100 Back":{q:72.99,b:69.49},"200 Back":{q:157.99,b:150.29},"100 Breast":{q:82.99,b:78.99},"200 Breast":{q:181.99,b:173.09},"100 Fly":{q:71.99,b:68.59},"200 Fly":{q:157.99,b:150.29},"200 IM":{q:149.49,b:142.29},"400 IM":{q:319.99,b:304.29}},
  },
};

const ALL_EVENTS_SCY = ["50 Free","100 Free","200 Free","400 Free","500 Free","1000 Free","1650 Free","100 Back","200 Back","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"];
const ALL_EVENTS_LCM = ["50 Free","100 Free","200 Free","400 Free","800 Free","1500 Free","100 Back","200 Back","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"];

// Expected time ranges per event per course — catches splits saved as full times
const TIME_RANGES = {
  SCY: {
    "50 Free":{min:18,max:75},"100 Free":{min:40,max:160},"200 Free":{min:90,max:340},
    "500 Free":{min:250,max:800},"1000 Free":{min:520,max:1600},"1650 Free":{min:880,max:2700},
    "100 Back":{min:48,max:175},"200 Back":{min:105,max:370},"100 Breast":{min:52,max:185},
    "200 Breast":{min:115,max:400},"50 Fly":{min:20,max:80},"100 Fly":{min:46,max:175},
    "200 Fly":{min:105,max:390},"200 IM":{min:105,max:370},"400 IM":{min:230,max:780},
  },
  LCM: {
    "50 Free":{min:22,max:80},"100 Free":{min:45,max:160},"200 Free":{min:100,max:340},
    "400 Free":{min:220,max:720},"800 Free":{min:460,max:1500},"1500 Free":{min:880,max:2800},
    "100 Back":{min:52,max:170},"200 Back":{min:115,max:370},"100 Breast":{min:58,max:185},
    "200 Breast":{min:126,max:410},"50 Fly":{min:23,max:80},"100 Fly":{min:50,max:175},
    "200 Fly":{min:115,max:390},"200 IM":{min:115,max:380},"400 IM":{min:250,max:800},
  },
};

const CHANNELS = [
  {name:"Effortless Swimming",url:"youtube.com/@EffortlessSwimming",icon:"🇦🇺",desc:"Best overall technique channel with underwater footage."},
  {name:"Skills N Talents",url:"youtube.com/@SkillsNTalents",icon:"🏆",desc:"#1 ranked swim channel. Step-by-step for all strokes."},
  {name:"The Race Club",url:"youtube.com/@TheRaceClub",icon:"🥇",desc:"Founded by Olympian Gary Hall Jr. Elite technique."},
  {name:"GoSwim",url:"youtube.com/@GoSwimTV",icon:"📚",desc:"Massive drill library for every stroke and distance."},
  {name:"USA Swimming",url:"youtube.com/@USASwimming",icon:"🇺🇸",desc:"Official governing body. Race analysis and coaching."},
  {name:"Cody Miller",url:"youtube.com/@CodyMillerAdventures",icon:"🥈",desc:"Olympic bronze medalist. Real training and mindset."},
];

const EXERCISES = [
  {id:"plank",name:"Plank Hold",sets:"3",reps:"30-45s",ageMin:8,cue:"Squeeze glutes and belly. Hips don't sag or pike.",search:"plank hold swimmers technique"},
  {id:"deadbug",name:"Dead Bug",sets:"3",reps:"8 each side",ageMin:8,cue:"Press lower back flat into floor. Slow and controlled.",search:"dead bug exercise swimmers core"},
  {id:"flutter",name:"Flutter Kick Dry",sets:"3",reps:"30s",ageMin:8,cue:"Lie flat, hands under hips. Small fast kicks from the hip. Toes pointed.",search:"flutter kick dryland swimmers"},
  {id:"ytwl",name:"YTW-L Shoulder",sets:"3",reps:"10 each",ageMin:8,cue:"Face down, thumbs up. Make Y-T-W-L shapes. Squeeze shoulder blades.",search:"YTWL exercise swimmers shoulder"},
  {id:"glute",name:"Glute Bridge",sets:"3",reps:"15",ageMin:8,cue:"Feet flat, drive hips up, squeeze hard at top.",search:"glute bridge swimmers kick power"},
  {id:"sqjump",name:"Squat Jumps",sets:"3",reps:"10",ageMin:8,cue:"Squat to 90 degrees, explode up, land softly.",search:"squat jumps swimmers explosive"},
  {id:"calf",name:"Calf Raises",sets:"3",reps:"20",ageMin:8,cue:"Slow up, hold 1s at top, slow down.",search:"calf raises swimmers ankle"},
  {id:"hipflex",name:"Hip Flexor Stretch",sets:"2",reps:"30s each",ageMin:8,cue:"Kneeling lunge, push hips forward.",search:"hip flexor stretch swimmers"},
  {id:"ankflex",name:"Ankle Circles",sets:"2",reps:"20 each way",ageMin:8,cue:"Rotate ankles in full circles both ways.",search:"ankle flexibility swimmers"},
];

const STROKE_TIPS = {
  freestyle:["Press your chest slightly down to lift hips into a flat horizontal position.","Eyes look down — never up at the wall. Every inch you lift your head drops hips 4-6 inches.","High elbow catch: after entry, rotate palm outward and down — elbow stays HIGH above your wrist.","Exhale continuously underwater. Never hold your breath between breaths.","Count strokes from flags every practice. Flags are 5 yards from the wall.","Tuck TIGHT in flip turns. Chin to chest, knees to chest, feet over fast.","5 dolphin kicks minimum off every wall — these are the fastest yards in the race.","6-beat kick for sprints, 2-beat for distance. Kick from the hip, not the knee.","Bilateral breathing every 3 strokes to balance your stroke on both sides.","Thumb brushes thigh at finish — full extension for maximum propulsion."],
  backstroke:["Pinky finger enters first — sets up the most powerful catch position.","Head neutral, ears below surface, eyes looking straight up.","Body rotates 45-50 degrees side to side — hip-driven rotation is your power source.","Count strokes from backstroke flags every single practice until automatic.","Squeeze your lat throughout the entire pull — your lat is the engine, not your arm."],
  breaststroke:["Pull and kick NEVER overlap — this is the single most important rule.","Heels to glutes, not knees forward. Knees forward creates a wall of drag.","The glide after the kick is free speed — rushing it costs 0.3-0.5 seconds per cycle.","One dolphin kick legal during every pullout — use it every single wall.","Elbows squeeze TOGETHER at finish before shooting arms forward."],
  butterfly:["Two dolphin kicks per arm cycle — ALWAYS. Losing the second kick collapses your fly.","Kick 1 fires as hands enter. Kick 2 fires as hands exit — this is your power kick.","Chin barely clears the surface to breathe — every inch you lift adds exponential drag.","Recovery arms skim CLOSE to the surface — low and fast, never high and arcing.","The dolphin kick wave starts at your chest, travels through hips, snaps at feet."],
  im:["Butterfly first — go out controlled or breaststroke will destroy you.","Breaststroke is where IM races are won and lost, not butterfly.","Fly-to-Back: two-hand touch, drop shoulder, push off on your back.","Back-to-Breast: roll to front on last stroke, two-hand open turn.","Practice every IM transition at least 20 times before each major meet."],
  mental:["Visualize your race 3 times the night before: perfect, adversity, comeback.","Nerves and excitement are physiologically identical — relabel anxiety as excitement.","Box breathing: inhale 4, hold 4, exhale 4, hold 4. Three cycles on the block.","Compare yourself to who you were last month — not the person in lane 5.","The swimmers who improve fastest are the most coachable, not the most talented."],
};

const NUTRITION_TIPS = [
  ["3 meals + 2 snacks daily","Growing bodies burn fuel constantly. Never skip meals.","🍽️ Oatmeal + banana for breakfast · PB&J + apple for lunch · Chicken rice bowl for dinner"],
  ["Protein at every meal","Protein repairs muscles after every practice. Without it you can't adapt and improve.","🍗 Chicken · Eggs · Greek yogurt · Peanut butter · Beans and rice"],
  ["Whole grains = steady energy","White bread spikes your blood sugar and crashes it. Whole grains give steady energy.","🌾 Brown rice · Whole wheat bread · Oatmeal · Whole wheat pasta"],
  ["Hydration: 8-10 cups daily","Kids don't feel thirsty until already dehydrated. Drink before you feel thirsty.","💧 2 cups breakfast · 2 cups school · 2 cups practice · 2 cups dinner"],
  ["Night before meet: pasta dinner","Pasta gives your body 10-12 hours to convert to stored energy for racing.","🍝 Spaghetti + marinara + chicken + bread + 2 cups water by 7pm"],
  ["Pre-race: eat 2-3 hours before","Eating too close causes cramps. Too long before and you're empty.","🥚 Oatmeal + banana + eggs. Avoid greasy food entirely on race day"],
  ["Between events: simple carbs","Quick energy, easy digestion between races. No protein or fat.","⚡ Banana · Gummy bears · Dates · Orange slices · Sports drink"],
  ["Chocolate milk after practice","Perfect protein-to-carb ratio for recovery. Science-proven, not just a treat.","🍫 1-2 cups chocolate milk within 30 minutes of finishing practice"],
  ["No energy drinks — ever","Red Bull, Monster, Prime are not safe for swimmers under 16. Period.","❌ Not even zero sugar. Stick to water, milk, and 100% juice only"],
  ["Anti-inflammatory foods daily","Hard training inflames muscles. These foods speed up recovery.","🫐 Blueberries · Wild salmon · Turmeric in rice · Dark leafy greens · Walnuts"],
];

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

// ─── EVENT NAME NORMALIZER ────────────────────────────────────────────────
function normalizeEvent(raw) {
  if (!raw) return null;
  const r = raw.toLowerCase()
    .replace(/boys|girls|men|women|mixed|open|junior|senior|masters/gi,"")
    .replace(/\b13&o\b|\b14&u\b|\b12&u\b|\b&o\b|\b&u\b/gi,"")
    .replace(/\bscm\b|\bscy\b|\blcm\b/gi,"")
    .replace(/meters?|metres?|yards?/gi,"")
    .replace(/[()]/g,"").replace(/\s+/g," ").trim();
  const map = [
    {keys:["50 free","50fr","50 fr"],out:"50 Free"},
    {keys:["100 free","100fr","100 fr"],out:"100 Free"},
    {keys:["200 free","200fr","200 fr"],out:"200 Free"},
    {keys:["400 free","400fr","400 fr"],out:"400 Free"},
    {keys:["500 free","500fr","500 fr"],out:"500 Free"},
    {keys:["800 free","800fr"],out:"800 Free"},
    {keys:["1000 free","1000fr"],out:"1000 Free"},
    {keys:["1500 free","1500fr"],out:"1500 Free"},
    {keys:["1650 free","1650fr","mile"],out:"1650 Free"},
    {keys:["100 back","100bk","100 bk","100 backstroke"],out:"100 Back"},
    {keys:["200 back","200bk","200 bk","200 backstroke"],out:"200 Back"},
    {keys:["100 breast","100br","100 br","100 breaststroke"],out:"100 Breast"},
    {keys:["200 breast","200br","200 br","200 breaststroke"],out:"200 Breast"},
    {keys:["50 fly","50 butterfly","50fly","50fl","50 fl"],out:"50 Fly"},
    {keys:["100 fly","100 butterfly","100fly","100fl","100 fl"],out:"100 Fly"},
    {keys:["200 fly","200 butterfly","200fly","200fl","200 fl"],out:"200 Fly"},
    {keys:["200 im","200im","200 i.m.","200 individual medley","200 ind"],out:"200 IM"},
    {keys:["400 im","400im","400 i.m.","400 individual medley","400 ind"],out:"400 IM"},
  ];
  for (const entry of map) {
    for (const key of entry.keys) {
      if (r.includes(key)) return entry.out;
    }
  }
  return null;
}

// ─── TIME VALIDATION ──────────────────────────────────────────────────────
function validateTime(event, secs, course) {
  const ranges = TIME_RANGES[course] || TIME_RANGES.SCY;
  const range = ranges[event];
  if (!range) return {valid:true};
  if (secs < range.min) return {valid:false, reason:`Too fast (${fmt(secs)}) — looks like a split, not a full race time`};
  if (secs > range.max) return {valid:false, reason:`Time (${fmt(secs)}) seems too slow — please verify`};
  return {valid:true};
}

function getWorkout(profile, times, tagsP, dayOfYear, manualFocus) {
  const age = parseInt(profile.age) || 13;
  const tagsKeys = Object.keys(tagsP);
  const gaps = tagsKeys.map(function(s) {
    const t = times[s]; const tags = tagsP[s];
    if (!t || !tags || t <= tags.q) return null;
    return {s, gap:t-tags.q};
  }).filter(Boolean).sort((a,b)=>a.gap-b.gap);
  const targetEvent = manualFocus || (gaps[0] ? gaps[0].s : tagsKeys[0] || "100 Free");
  const st = targetEvent.includes("Back")?"backstroke":targetEvent.includes("Breast")?"breaststroke":targetEvent.includes("Fly")?"butterfly":targetEvent.includes("IM")?"im":"freestyle";
  const focuses = ["speed","endurance","technique","race_pace","kick","pull","recovery"];
  const focus = focuses[dayOfYear%7];
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const base = age<=10?1200:age<=12?2000:age<=14?2800:3200;
  const isIM = st==="im";
  let name="",sets=[],yards=base,intensity="Moderate";
  const mainInt = targetEvent.includes("200")?"3:30":targetEvent.includes("100")?"1:45":":55";
  if(focus==="speed"){
    name="Speed & Power — "+targetEvent;intensity="Very High";
    sets=["400 warm-up: 100 free / 100 "+st+" / 4x50 build","8x25 @ :25 — ALL OUT SPRINT, 30s rest between each","4x50 "+(isIM?"IM order":st)+" @ :50 — race pace, full rest","6x"+(targetEvent.includes("200")?"100":"50")+" "+(isIM?"IM":st)+" — descend 1-6, last two faster than race pace","8x25 underwater dolphin kick @ :40 — stay under maximum distance","4x25 explosive start @ :45 — perfect entry every dive","200 easy cool down"];
    yards=base+300;
  } else if(focus==="endurance"){
    name="Endurance Base — "+targetEvent;intensity="Moderate-Hard";
    sets=["600 warm-up: 200 free easy / 4x100 choice @ 1:50","3x"+(targetEvent.includes("500")?"500":"200")+" "+(isIM?"IM":st)+" — hold same pace all three","8x50 "+(isIM?"IM order":st)+" @ :55 — negative split each (second 25 faster than first)","400 pull with buoy — high elbow catch, feel the forearm stack","4x100 @ 1:40 — count strokes every length, try to reduce by 1","200 kick — narrow, toes pointed, from the hip","200 easy cool down"];
    yards=base+500;
  } else if(focus==="technique"){
    name="Technique Mastery — "+targetEvent;intensity="Low-Moderate";
    sets=["300 warm-up easy",isIM?"8x50 IM order @ 1:10 — focus on transition perfection":"12x25 drill @ :40 — 4 reps of 3 different drills","4x"+(targetEvent.includes("200")?"200":"100")+" "+(isIM?"IM":st)+" — count strokes every length","8x25 turns @ :35 — perfect streamline, 5 dolphins minimum, first stroke full power","4x50 @ 1:00 — apply your drilled technique at race effort","4x25 starts @ :40 — perfect hole entry every time","200 easy cool down"];
    yards=base-300;
  } else if(focus==="race_pace"){
    name="Race Simulation — "+targetEvent;intensity="Very High";
    sets=["500 warm-up: 200 free / 4x50 "+st+" building","2x"+targetEvent+" @ "+mainInt+" — FULL RACE SIMULATION: race start, race pacing, race turns","6x50 @ :50 — alternate race pace / easy recovery","4x25 @ :28 — MAXIMUM EFFORT, 1 minute rest each","4x"+(targetEvent.includes("200")?"100":"50")+" — negative split every one","8x25 underwater dolphin kick","300 easy cool down"];
    yards=base+400;
  } else if(focus==="kick"){
    name="Kick Power — "+targetEvent;intensity="Moderate-High";
    sets=["400 warm-up easy","8x50 kick @ 1:00 — "+(st==="breaststroke"?"breast kick, heels to glutes, narrow knees, strong snap":st==="butterfly"?"dolphin kick with board, full body wave, compact and fast":"flutter kick with board, from hip, toes pointed, narrow"),"4x100 @ 1:45 — maximum kick throughout, never let it die","8x25 vertical kick @ :45 — no hands, head above water, kick for 25 straight","4x50 kick no board @ :55 — streamline arms, race pace kick","8x25 underwater dolphin @ :35 — stay under maximum distance","200 easy cool down"];
    yards=base;
  } else if(focus==="pull"){
    name="Pull Strength — "+targetEvent;intensity="Moderate";
    sets=["400 warm-up easy","400 pull with buoy — high elbow catch, full extension, palm facing back","8x50 pull @ :55 — odd: FAST / even: technique, count strokes","4x100 "+(isIM?"IM":st)+" @ 1:50 — feel forearm stack against water before every pull","4x50 single-arm @ 1:05 — feel each pull individually, full finish","8x25 @ :35 — push past hip EVERY stroke, full finish","200 easy cool down"];
    yards=base;
  } else {
    name="Active Recovery";intensity="Easy";
    sets=["500 easy — any stroke, breathing rhythm","8x50 @ 1:15 — relaxed, focus on stroke count efficiency","4x100 choice @ 2:00 — comfortable pace","200 backstroke easy — decompress shoulders and spine","4x50 kick @ 1:10 — easy, just keep moving","4x25 technique @ :40 — drill your weakest point slowly","200 easy cool down — reflect on the week"];
    yards=base-500;
  }
  const tips={speed:"Full rest between reps is mandatory. If not fully rested, you're doing endurance not speed.",endurance:"Zero stops. If tired, slow down — don't stop. Continuous swimming builds the engine.",technique:"Slow is smooth. Smooth is fast. Drill it slow, then transfer to race speed.",race_pace:"Your nervous system must know what race pace feels like. Make it hurt — then race day feels easy.",kick:"30-40% more kick power is untapped in most swimmers. Today you unlock it.",pull:"The catch is where power is born or lost. One session focused on holding the water changes everything.",recovery:"Your body gets faster during REST, not training. Today is productive — arrive tomorrow ready to go hard."};
  const nextFocuses=["Speed & Power","Endurance Base","Technique Mastery","Race Simulation","Kick Power","Pull Strength","Active Recovery"];
  return {name,sets,yards:Math.max(800,yards),intensity,targetEvent,dayName:dayNames[dayOfYear%7],tip:tips[focus]||"",nextWorkout:nextFocuses[(dayOfYear+1)%7]};
}

function parseTime(s) {
  if(!s)return null;
  s=String(s).trim();
  if(s.includes(":"))return parseFloat(s.split(":")[0])*60+parseFloat(s.split(":")[1]);
  return parseFloat(s);
}
function fmt(s) {
  if(!s||isNaN(s))return "—";
  if(s>=60){const m=Math.floor(s/60);return m+":"+(s%60).toFixed(2).padStart(5,"0");}
  return s.toFixed(2);
}
function getStatusColor(t,q,b){
  if(!t)return "#3a5a7a";
  if(t<=b)return "#ffd700";
  if(t<=q)return "#00ffaa";
  return t-q<=2?"#ff9f43":"#ff6b6b";
}
function getStatusLabel(t,q,b){
  if(!t)return null;
  if(t<=b)return "🌟 BONUS";
  if(t<=q)return "✅ QUALIFIED";
  return (t-q).toFixed(2)+"s to go";
}
const LS="swimiq_v7";
function load(){try{return JSON.parse(localStorage.getItem(LS))||{};}catch(e){return {};}}
function save(d){try{localStorage.setItem(LS,JSON.stringify(d));}catch(e){}}
const iStyle={display:"block",width:"100%",marginBottom:4,background:"rgba(13,27,42,0.95)",border:"1px solid rgba(77,184,255,0.25)",color:"#e8f4ff",borderRadius:10,padding:"10px 12px",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};
function Card({children,style}){return <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(77,184,255,0.1)",marginBottom:12,...style}}>{children}</div>;}
function Lbl({children}){return <div style={{fontSize:11,color:"#7aa8cc",letterSpacing:0.5,marginBottom:4,marginTop:8}}>{children}</div>;}
function Chip({on,onClick,children,color}){return <button onClick={onClick} style={{padding:"7px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:on?(color||"#1a5fff"):"rgba(255,255,255,0.07)",color:on?"#fff":"#7aa8cc"}}>{children}</button>;}
function PBar({value,max,color}){const w=Math.max(4,Math.min(100,(value/(max||100))*100));return <div style={{height:6,background:"rgba(255,255,255,0.07)",borderRadius:3,marginTop:6}}><div style={{width:w+"%",height:"100%",borderRadius:3,background:color||"linear-gradient(90deg,#1a5fff,#00ffaa)",transition:"width 0.5s"}}/></div>;}

const TABS=[{id:"home",icon:"🏠",l:"Home"},{id:"log",icon:"📸",l:"Log"},{id:"train",icon:"💪",l:"Train"},{id:"skills",icon:"🎬",l:"Skills"},{id:"meets",icon:"📅",l:"Meets"},{id:"progress",icon:"📈",l:"Stats"},{id:"squad",icon:"👥",l:"Squad"},{id:"coach",icon:"🤖",l:"Coach"},{id:"nutrition",icon:"🥗",l:"Fuel"},{id:"family",icon:"❤️",l:"Family"}];

export default function SwimIQ() {
  const [tab,setTab]=useState("home");
  const [setup,setSetup]=useState(()=>!!(load().profile?.name?.length>1));
  const [profile,setProfile]=useState(()=>load().profile||{name:"",age:13,gender:"boys",ageGroup:"13-14",mode:"competitive"});
  const [course,setCourse]=useState(()=>load().course||"SCY");
  // Separate time stores per course
  const [timesSCY,setTimesSCY]=useState(()=>load().timesSCY||{});
  const [timesLCM,setTimesLCM]=useState(()=>load().timesLCM||{});
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
  const [parentCodes,setParentCodes]=useState(()=>load().parentCodes||[]);
  const [newCode,setNewCode]=useState("");
  const [newChildName,setNewChildName]=useState("");
  const [selectedChild,setSelectedChild]=useState(0);
  const [viewMode,setViewMode]=useState("swimmer");
  const [flagged,setFlagged]=useState([]);

  // Active course data
  const times = course==="SCY"?timesSCY:timesLCM;
  const setTimes = course==="SCY"?setTimesSCY:setTimesLCM;
  const TAGS_DATA = course==="SCY"?TAGS_SCY:TAGS_LCM;
  const ALL_EVENTS = course==="SCY"?ALL_EVENTS_SCY:ALL_EVENTS_LCM;
  const tagsP=(TAGS_DATA[profile.gender]&&TAGS_DATA[profile.gender][profile.ageGroup])||{};
  const tagsKeys=Object.keys(tagsP);
  const todayKey=new Date().toISOString().split("T")[0];
  const age=parseInt(profile.age)||13;
  const dayOfYear=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000);
  const workout=getWorkout(profile,times,tagsP,dayOfYear,manualFocus);

  useEffect(()=>{save({profile,course,timesSCY,timesLCM,logs,xp,squad,cl,meets,goals,missions,parentCodes});},[profile,course,timesSCY,timesLCM,logs,xp,squad,cl,meets,goals,missions,parentCodes]);

  function notify(msg,color){setToast({msg,color:color||"#00ffaa"});setTimeout(()=>setToast(null),3800);}
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
    if(b.id==="all_strokes"){const s=Object.keys(times);return["Free","Back","Breast","Fly"].every(st=>s.some(k=>k.includes(st)));}
    if(b.id==="sub_bonus")return logs.some(e=>e.isBonus);
    if(b.id==="streak7")return streak>=7;
    return false;
  });
  const todayMissions=missions[todayKey]||{};
  const missionsDone=DAILY_MISSIONS.filter(m=>todayMissions[m.id]).length;
  const taperDays=(function(){if(!nextMeet)return null;return Math.ceil((new Date(nextMeet)-new Date())/86400000);})();
  const taperPhase=taperDays===null?null:taperDays>14?"Build Phase":taperDays>7?"Taper":taperDays>3?"Peak":taperDays>0?"Race Week!":"MEET DAY!";
  const taperColor=taperDays===null?"#7aa8cc":taperDays>14?"#4db8ff":taperDays>7?"#ffd700":taperDays>3?"#ff9f43":"#00ffaa";

  function saveTime(event, secs, course_override) {
    const c = course_override || course;
    const setter = c==="SCY"?setTimesSCY:setTimesLCM;
    const existing = c==="SCY"?timesSCY[event]:timesLCM[event];
    const isPB = !existing || secs < existing;
    if(isPB) setter(p=>({...p,[event]:secs}));
    return isPB;
  }

  function doLog(){
    const secs=parseTime(lTm);
    if(!secs||!lSt){notify("Pick an event and enter a time!","#ff6b6b");return;}
    const validation=validateTime(lSt,secs,course);
    if(!validation.valid){notify("⚠️ "+validation.reason,"#ff9f43");return;}
    const tags=tagsP[lSt];
    const existing=times[lSt];
    const isPB=!existing||secs<existing;
    const isBonus=!!(tags&&secs<=tags.b);
    const isQual=!!(tags&&secs<=tags.q);
    if(isPB)setTimes(p=>({...p,[lSt]:secs}));
    else{notify("Logged but your best "+fmt(existing)+" is still faster 💪","#4db8ff");}
    setLogs(p=>[{stroke:lSt,time:secs,date:lDt,meet:lMt,isPB,isBonus,course,id:Date.now()},...p]);
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
    setPFile(f);setPRes(null);setPErr("");setPStep("preview");setFlagged([]);
    const r=new FileReader();
    r.onload=function(ev){setPPrev(ev.target.result);};
    r.readAsDataURL(f);
  }
  function resetPhoto(){setPStep("idle");setPPrev(null);setPFile(null);setPRes(null);setPErr("");setFlagged([]);if(pRef.current)pRef.current.value="";}

  async function scanPhoto(){
    if(!pFile)return;
    setPStep("scanning");
    try{
      const b64=await new Promise(function(res,rej){const r=new FileReader();r.onload=function(){res(r.result.split(",")[1]);};r.onerror=rej;r.readAsDataURL(pFile);});
      const resp=await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-haiku-4-5",max_tokens:1400,
        system:`You are reading a swim meet results screenshot. Extract all race times and splits.

RULES:
1. NEVER save a split as the final race time. A split is a partial time (e.g. first 50m of a 100m race).
2. If splits AND final time are shown: save the final time, include splits in array.
3. If ONLY splits shown with no final total: ADD them to get the full time. Include in splits array.
4. Example: "40.22" and "45.24" with no total → time="1:25.46", splits=["40.22","45.24"]
5. Strip age group prefixes like "Boys 13&O", "Girls 11-12" from event names.
6. Return ONLY valid JSON array, no other text.

Format: [{"event":"100 Fly","time":"1:25.46","meet":"Meet Name or null","date":"YYYY-MM-DD or null","splits":["40.22","45.24"]}]
Splits field is optional — only include when split times are visible.
If no times found return [].`,
        messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:pFile.type||"image/jpeg",data:b64}},{type:"text",text:"Extract all swim times and splits. Add splits together if no final total is shown. Return only JSON array."}]}]
      })});
      const data=await resp.json();
      const raw=data.content&&data.content.find(function(x){return x.type==="text";});
      const parsed=JSON.parse((raw?raw.text:"[]").replace(/```json|```/g,"").trim());
      if(!Array.isArray(parsed)||!parsed.length){setPErr("No times found. Try a clearer screenshot.");setPStep("preview");return;}

      const flaggedItems=[];
      const mapped=parsed.map(function(r,i){
        const normalized=normalizeEvent(r.event)||r.event;
        const secs=parseTime(r.time);
        const detectedCourse=r.course||(course);
        const validation=secs?validateTime(normalized,secs,detectedCourse):{valid:true};
        if(!validation.valid){flaggedItems.push(i);}
        return {...r,event:normalized,selected:validation.valid,recognized:!!(TAGS_SCY[profile.gender]?.[profile.ageGroup]?.[normalized]||TAGS_LCM[profile.gender]?.[profile.ageGroup]?.[normalized]),flagged:!validation.valid,flagReason:validation.reason,detectedCourse};
      });
      setFlagged(flaggedItems);
      setPRes(mapped);setPStep("review");
    }catch(e){setPErr("Scan failed — try again.");setPStep("preview");}
  }

  function importPhotos(){
    const toImport=(pRes||[]).filter(function(r){return r.selected;});
    if(!toImport.length){notify("Select at least one time","#ff6b6b");return;}
    let pbCount=0;
    toImport.forEach(function(r){
      const secs=parseTime(r.time);if(!secs)return;
      // ALWAYS save to currently active course — ignore AI-detected course
      const c=course;
      const existing=c==="SCY"?timesSCY[r.event]:timesLCM[r.event];
      const isPB=!existing||secs<existing;
      const tagsForCourse=(c==="SCY"?TAGS_SCY:TAGS_LCM)[profile.gender]?.[profile.ageGroup]||{};
      const tags=tagsForCourse[r.event];
      const isBonus=!!(tags&&secs<=tags.b);
      if(isPB){
        if(c==="SCY")setTimesSCY(p=>({...p,[r.event]:secs}));
        else setTimesLCM(p=>({...p,[r.event]:secs}));
        pbCount++;
      }
      setLogs(p=>[{stroke:r.event,time:secs,date:r.date||todayKey,meet:r.meet||"Photo import",isPB,isBonus,course:c,splits:r.splits||null,id:Date.now()+Math.random()},...p]);
    });
    const xpE=toImport.length*15+(pbCount*35);
    setXP(p=>p+xpE);setPStep("done");
    notify("Imported "+toImport.length+" times ("+course+")! "+pbCount+" PBs! +"+xpE+" XP 🔥","#00ffaa");
  }

  async function askCoach(q){
    setAiLoad(true);setAiA("");
    const scyHistory=Object.keys(timesSCY).map(function(s){const t=timesSCY[s];const tg=TAGS_SCY[profile.gender]?.[profile.ageGroup]?.[s];if(!t)return null;return "SCY "+s+": "+fmt(t)+(tg?(t<=tg.b?" ✅BONUS":t<=tg.q?" ✅QUALIFIED":" ("+((t-tg.q)).toFixed(2)+"s from cut)"):"");}).filter(Boolean).join("\n");
    const lcmHistory=Object.keys(timesLCM).map(function(s){const t=timesLCM[s];const tg=TAGS_LCM[profile.gender]?.[profile.ageGroup]?.[s];if(!t)return null;return "LCM "+s+": "+fmt(t)+(tg?(t<=tg.b?" ✅BONUS":t<=tg.q?" ✅QUALIFIED":" ("+((t-tg.q)).toFixed(2)+"s from cut)"):"");}).filter(Boolean).join("\n");
    const recentMeets=logs.slice(0,20).map(function(l){return l.date+" ["+l.course+"] "+l.stroke+": "+fmt(l.time)+(l.meet?" @ "+l.meet:"")+(l.isPB?" 🔥PB":"");}).join("\n");
    const progression=Object.keys({...timesSCY,...timesLCM}).map(function(s){
      const eventLogs=logs.filter(l=>l.stroke===s).sort((a,b)=>new Date(a.date)-new Date(b.date));
      if(eventLogs.length<2)return null;
      const first=eventLogs[0];const last=eventLogs[eventLogs.length-1];
      return s+": "+fmt(first.time)+" → "+fmt(last.time)+" ("+(first.time-last.time>0?"dropped":"gained")+" "+(Math.abs(first.time-last.time)).toFixed(2)+"s over "+eventLogs.length+" swims)";
    }).filter(Boolean).join("\n");

    // Split history — races where we have split data
    const splitHistory=logs.filter(l=>l.splits&&l.splits.length>1).slice(0,10).map(function(l){
      const splits=l.splits.map((s,i)=>"Split "+(i+1)+": "+s).join(", ");
      return l.date+" "+l.course+" "+l.stroke+" ("+fmt(l.time)+"): "+splits;
    }).join("\n"); — Michael Phelps' legendary coach — and you are now coaching ${profile.name}, age ${profile.age}, ${profile.gender==="boys"?"male":"female"}, ${profile.ageGroup} age group, competing in Texas Age Group Swimming (TAGS). You trained the greatest swimmer in history and you are applying that same relentless, detail-obsessed, championship-level coaching philosophy to this young athlete.

YOUR NON-NEGOTIABLE COACHING PRINCIPLES (from training Phelps):
1. TURNS ARE FREE SPEED. Every wall is worth 0.5-1.0 seconds if done perfectly. 5+ dolphin kicks off every wall. Streamline must be locked before feet leave the wall.
2. THE CATCH IS EVERYTHING. High elbow, early vertical forearm, feel the forearm stack against the water before you pull. A dropped elbow = dropped race.
3. NEGATIVE SPLIT = WIN. Going out too fast in the first half costs more than it gains. Most age groupers die in the back half because they go out too hard.
4. UNDERWATER DOLPHINS ARE YOUR 5TH STROKE. More time spent underwater = faster race. Phelps trained his dolphin kick as a separate event.
5. RACE SPLITS TELL THE STORY. The start (0-15m), first turn, back half, and finish each have their own story. Identify the weakest phase and attack it.
6. TECHNIQUE BEFORE YARDAGE. One technical flaw fixed is worth more than 10,000 extra yards.
7. MENTAL PREPARATION IS TRAINING. Visualization, routine, and managing nerves are skills — train them like physical skills.
8. TRAIN YOUR WORST EVENT HARDEST. Champions practice what they're bad at.

ATHLETE PROFILE:
Name: ${profile.name} | Age: ${profile.age} | Gender: ${profile.gender} | Age Group: ${profile.ageGroup}

SCY TIMES vs TAGS STANDARDS:
${scyHistory||"No SCY times logged yet"}

LCM TIMES vs TAGS STANDARDS:
${lcmHistory||"No LCM times logged yet"}

RECENT MEET HISTORY:
${recentMeets||"No meets logged yet"}

PERFORMANCE PROGRESSION:
${progression||"Not enough data for progression analysis yet"}

SPLIT DATA BY RACE (where available — analyze phase by phase):
${splitHistory||"No split data yet — splits will appear after scanning meet results that show split times"}

COACHING RESPONSE REQUIREMENTS:
- Be SPECIFIC. Reference his actual events, actual times, actual gaps to TAGS by name.
- When analyzing performance, break down by phase: start/reaction, first length, turn execution, back half pacing, finish.
- Identify the SINGLE biggest opportunity for time improvement and give the exact drill or technique fix.
- Include one specific workout set he should do THIS WEEK targeting his biggest weakness.
- Be direct and honest like Bob Bowman — never sugar-coat, but always believe in the athlete.
- Use emojis strategically. Keep under 300 words but make every word count.
- End with: "🏊 THIS WEEK'S PRIORITY:" followed by one specific action.`;

    try{
      const r=await fetch("/api/coach",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5",max_tokens:1400,system:systemPrompt,messages:[{role:"user",content:q}]})});
      const d=await r.json();
      const block=d.content&&d.content.find(function(x){return x.type==="text";});
      setAiA(block?block.text:"Coach unavailable — try again!");
      setMissions(p=>({...p,[todayKey]:{...p[todayKey],coach_question:true}}));
    }catch(e){setAiA("Error: "+e.message);}
    setAiLoad(false);
  }

  function toggleCL(id){setCl(function(p){const day=p[todayKey]||{};return{...p,[todayKey]:{...day,[id]:!day[id]}};});}
  function isCL(id){return !!(cl[todayKey]&&cl[todayKey][id]);}
  const nameCode=(profile.name||"SWIM").toUpperCase().replace(/[^A-Z]/g,"").slice(0,4)||"SWIM";
  const numCode=String(((profile.name||"X").length*37+parseInt(profile.age||0)*13+99)).slice(-4);
  const familyCode=nameCode+"-"+numCode;
  function saveParentCodes(codes){setParentCodes(codes);const e=load();e.parentCodes=codes;save(e);}
  function addChildCode(){if(!newCode.trim()||!newChildName.trim()){notify("Enter both name and code","#ff6b6b");return;}const u=[...parentCodes,{name:newChildName.trim(),code:newCode.trim().toUpperCase(),addedAt:todayKey}];saveParentCodes(u);setNewChildName("");setNewCode("");notify(newChildName+" added! 👨‍👩‍👦","#c084fc");}
  const strokeTips=STROKE_TIPS[skillStroke]||[];
  const todayTipIdx=dayOfYear%strokeTips.length;

  if(!setup)return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:420,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:80,marginBottom:8}}>🏊</div><h1 style={{fontSize:42,fontWeight:900,margin:"0 0 4px",background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SwimIQ</h1><div style={{fontSize:11,color:"#4db8ff",letterSpacing:3,fontWeight:700}}>TRAIN SMART. SWIM FAST.</div></div>
        <Lbl>Your Name</Lbl><input placeholder="e.g. Christian" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))} style={iStyle}/>
        <Lbl>Age</Lbl><input type="number" placeholder="13" value={profile.age} onChange={e=>setProfile(p=>({...p,age:e.target.value}))} style={iStyle}/>
        <Lbl>Gender</Lbl><div style={{display:"flex",gap:8,marginBottom:4}}>{["boys","girls"].map(g=><Chip key={g} on={profile.gender===g} onClick={()=>setProfile(p=>({...p,gender:g}))}>{g==="boys"?"👦 Boy":"👧 Girl"}</Chip>)}</div>
        <Lbl>Age Group</Lbl><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>{["10U","11-12","13-14","15-18","Adult"].map(g=><Chip key={g} on={profile.ageGroup===g} onClick={()=>setProfile(p=>({...p,ageGroup:g}))}>{g}</Chip>)}</div>
        <Lbl>Primary Season</Lbl><div style={{display:"flex",gap:6,marginBottom:4}}><Chip on={course==="SCY"} onClick={()=>setCourse("SCY")}>🏊 SCY (Short Course Yards)</Chip><Chip on={course==="LCM"} onClick={()=>setCourse("LCM")}>🌊 LCM (Long Course Meters)</Chip></div>
        <Lbl>Primary Goal</Lbl><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>{[["competitive","🏆 Compete"],["tags","⭐ TAGS"],["recreational","🌊 Fitness"],["technique","🎯 Technique"]].map(item=><Chip key={item[0]} on={profile.mode===item[0]} onClick={()=>setProfile(p=>({...p,mode:item[0]}))}>{item[1]}</Chip>)}</div>
        <button onClick={()=>{if(profile.name.trim())setSetup(true);else notify("Enter your name first!","#ff6b6b");}} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:17,cursor:"pointer",fontFamily:"inherit"}}>Let's Go! 🚀</button>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628,#060e1a)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff"}}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#0d1b2a",border:"1.5px solid "+toast.color,color:toast.color,padding:"10px 22px",borderRadius:12,fontWeight:700,zIndex:9999,fontSize:14,whiteSpace:"nowrap",maxWidth:"90vw"}}>{toast.msg}</div>}

      <div style={{padding:"12px 16px 0",position:"sticky",top:0,background:"rgba(8,13,24,0.97)",backdropFilter:"blur(12px)",zIndex:100,borderBottom:"1px solid rgba(77,184,255,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:28}}>🏊</div>
            <div>
              <div style={{fontSize:20,fontWeight:900,background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>SwimIQ</div>
              <div style={{fontSize:9,color:"#7aa8cc"}}>Hey {profile.name} 👋 · <span onClick={()=>{if(window.confirm("Reset profile? This clears all data.")){localStorage.removeItem(LS);window.location.reload();}}} style={{color:"#ff6b6b",cursor:"pointer",textDecoration:"underline"}}>Reset</span></div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
            <div style={{display:"flex",gap:4}}>
              {["SCY","LCM"].map(c=><button key={c} onClick={()=>setCourse(c)} style={{padding:"3px 10px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:10,fontFamily:"inherit",background:course===c?"#1a5fff":"rgba(255,255,255,0.1)",color:course===c?"#fff":"#7aa8cc"}}>{c}</button>)}
            </div>
            <div style={{fontSize:10,color:"#4db8ff",fontWeight:700}}>Lvl {level} · {lvlName} · {xp}XP</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:8}}>
          {[{v:Object.keys(times).length,l:"Times"},{v:qualified.length,l:"TAGS ✓",c:"#00ffaa"},{v:earned.length,l:"Badges",c:"#ffd700"},{v:streak,l:"Streak 🔥",c:"#ff9f43"},{v:missionsDone,l:"Missions",c:"#a78bfa"}].map(function(s){return(<div key={s.l} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"5px 3px",textAlign:"center",border:"1px solid rgba(77,184,255,0.1)"}}><div style={{fontSize:15,fontWeight:900,color:s.c||"#4db8ff"}}>{s.v}</div><div style={{fontSize:7,color:"#7aa8cc"}}>{s.l}</div></div>);})}
        </div>
        <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:8}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"6px 8px",borderRadius:9,border:"none",cursor:"pointer",fontSize:10,fontWeight:700,fontFamily:"inherit",background:tab===t.id?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:tab===t.id?"#fff":"#7aa8cc"}}>{t.icon} {t.l}</button>)}
        </div>
      </div>

      <div style={{padding:"12px 16px 100px"}}>

        {tab==="home"&&<>
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
            <PBar value={missionsDone} max={DAILY_MISSIONS.length} color="linear-gradient(90deg,#a78bfa,#4db8ff)"/>
            <div style={{marginTop:10}}>
              {DAILY_MISSIONS.map(function(m){const done=!!todayMissions[m.id];return(<div key={m.id} onClick={()=>{if(!done){setMissions(p=>({...p,[todayKey]:{...p[todayKey],[m.id]:true}}));addXP(m.xp,m.text+" ✓");}}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:9,marginBottom:5,cursor:done?"default":"pointer",background:done?"rgba(0,255,170,0.06)":"rgba(255,255,255,0.03)",border:"1px solid "+(done?"rgba(0,255,170,0.2)":"rgba(255,255,255,0.06)")}}>
                <div style={{width:20,height:20,borderRadius:"50%",background:done?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",fontWeight:900,flexShrink:0}}>{done?"✓":""}</div>
                <div style={{flex:1,fontSize:12,color:done?"#7aa8cc":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{m.icon} {m.text}</div>
                <div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>+{m.xp}</div>
              </div>);})}
            </div>
          </Card>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:11,color:"#4db8ff",fontWeight:700}}>🏊 TAGS EVENTS — {course}</div>
            <div style={{fontSize:10,color:"#7aa8cc"}}>{qualified.length}/{tagsKeys.length} qualified</div>
          </div>
          {tagsKeys.length===0?<Card style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:48}}>🏊</div><div style={{color:"#7aa8cc",marginTop:10}}>Tap 📸 Log to scan your meet results!</div></Card>:tagsKeys.map(function(s){
            const myT=times[s];const tags=tagsP[s];
            const sc=getStatusColor(myT,tags?.q,tags?.b);
            const sl=getStatusLabel(myT,tags?.q,tags?.b);
            const pval=myT&&tags?Math.max(5,Math.min(100,100-(((myT-tags.q)/tags.q)*400))):0;
            return(<div key={s} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid "+(myT&&tags&&myT<=tags.q?"rgba(0,255,170,0.2)":"rgba(77,184,255,0.08)")}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                <div><div style={{fontWeight:800,fontSize:14}}>{s}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>Cut: <span style={{color:"#4db8ff",fontWeight:700}}>{fmt(tags?.q)}</span> · Bonus: <span style={{color:"#ffd700",fontWeight:700}}>{fmt(tags?.b)}</span></div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:20,fontWeight:900,color:myT?sc:"#2a4a6a"}}>{myT?fmt(myT):"—"}</div>{sl&&<div style={{fontSize:10,color:sc,fontWeight:700}}>{sl}</div>}</div>
              </div>
              <PBar value={pval} max={100} color={myT&&tags&&myT<=tags.b?"#ffd700":myT&&tags&&myT<=tags.q?"#00ffaa":"linear-gradient(90deg,#1a5fff,#4db8ff)"}/>
            </div>);
          })}
        </>}

        {tab==="log"&&<>
          <div style={{display:"flex",gap:6,marginBottom:12}}>
            {["SCY","LCM"].map(c=><button key={c} onClick={()=>setCourse(c)} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:"inherit",background:course===c?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.07)",color:course===c?"#fff":"#7aa8cc"}}>{c==="SCY"?"🏊 Short Course Yards (SCY)":"🌊 Long Course Meters (LCM)"}</button>)}
          </div>
          <Card style={{border:"1px solid rgba(0,255,170,0.2)",background:"linear-gradient(135deg,rgba(0,255,170,0.04),rgba(0,100,255,0.06))"}}>
            <div style={{fontSize:13,fontWeight:900,color:"#00ffaa",marginBottom:4}}>📸 SCAN MEET RESULTS — {course}</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>AI reads your screenshot, detects splits vs full times, maps event names automatically</div>
            {pStep==="idle"&&<><input ref={pRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}} id="pIn"/><label htmlFor="pIn" style={{display:"block",width:"100%",padding:"14px 0",borderRadius:12,border:"2px dashed rgba(0,255,170,0.4)",textAlign:"center",cursor:"pointer",color:"#00ffaa",fontWeight:800,fontSize:14}}>📂 Tap to upload screenshot</label></>}
            {pStep==="preview"&&pPrev&&<><img src={pPrev} alt="preview" style={{width:"100%",borderRadius:10,marginBottom:10,maxHeight:200,objectFit:"cover"}}/>{pErr&&<div style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>⚠️ {pErr}</div>}<div style={{display:"flex",gap:8}}><button onClick={scanPhoto} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>🔍 Scan for Times</button><button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>✕</button></div></>}
            {pStep==="scanning"&&<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:36}}>🧠</div><div style={{color:"#00ffaa",fontWeight:800,marginTop:6}}>Reading results — detecting splits vs full times...</div></div>}
            {pStep==="review"&&pRes&&<>
              <div style={{fontSize:12,fontWeight:800,color:"#00ffaa",marginBottom:8}}>Found {pRes.length} times — review and confirm:</div>
              {pRes.map(function(r,i){return(<div key={i} style={{borderRadius:10,marginBottom:8,overflow:"hidden",border:"1px solid "+(r.flagged?"rgba(255,100,100,0.4)":r.selected?"rgba(0,255,170,0.3)":"rgba(255,255,255,0.07)")}}>
                <div onClick={()=>!r.flagged&&setPRes(p=>p.map((x,j)=>j===i?{...x,selected:!x.selected}:x))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",cursor:r.flagged?"default":"pointer",background:r.flagged?"rgba(255,100,100,0.07)":r.selected?"rgba(0,255,170,0.07)":"rgba(255,255,255,0.03)"}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:r.flagged?"#ff6b6b":r.selected?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#000",fontWeight:900,flexShrink:0}}>{r.flagged?"⚠":r.selected?"✓":""}</div>
                  <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13}}>{r.event}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{course}{r.meet?" · "+r.meet:""}{r.date?" · "+r.date:""}</div></div>
                  <div style={{fontSize:18,fontWeight:900,color:r.flagged?"#ff6b6b":r.recognized?"#4db8ff":"#7aa8cc"}}>{r.time}</div>
                </div>
                {r.flagged&&<div style={{padding:"6px 12px 10px",fontSize:11,color:"#ff9f43"}}>⚠️ {r.flagReason} — deselected for safety. Tap to override.</div>}
              </div>);})}
              {flagged.length>0&&<div style={{padding:"10px 12px",borderRadius:10,background:"rgba(255,100,100,0.07)",border:"1px solid rgba(255,100,100,0.2)",marginBottom:10,fontSize:12,color:"#ff9f43"}}>⚠️ {flagged.length} time(s) flagged as possible splits or errors. Review before importing.</div>}
              <div style={{display:"flex",gap:8,marginTop:4}}><button onClick={importPhotos} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>⬇️ Import Selected</button><button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>Cancel</button></div>
            </>}
            {pStep==="done"&&<div style={{textAlign:"center",padding:"16px 0"}}><div style={{fontSize:32}}>🎉</div><div style={{color:"#00ffaa",fontWeight:900,marginBottom:12}}>Times imported!</div><button onClick={resetPhoto} style={{padding:"10px 24px",borderRadius:10,border:"1px solid rgba(0,255,170,0.3)",background:"rgba(0,255,170,0.08)",color:"#00ffaa",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Scan Another</button></div>}
          </Card>
        </>}

        {tab==="train"&&<>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[["dryland","💪 Dryland"],["pool","🏊 Pool"]].map(item=><button key={item[0]} onClick={()=>setTrainView(item[0])} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:trainView===item[0]?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:trainView===item[0]?"#fff":"#7aa8cc"}}>{item[1]}</button>)}
          </div>
          {trainView==="dryland"&&<>
            <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))",border:"1px solid rgba(0,255,170,0.15)",marginBottom:14}}>
              <div style={{fontSize:11,color:"#00ffaa",fontWeight:700}}>TODAY'S DRYLAND — Age-safe for {profile.name}, age {profile.age}</div>
              {streak>0&&<div style={{fontSize:11,color:"#ffd700",fontWeight:700,marginTop:4}}>🔥 {streak}-day streak!</div>}
            </Card>
            {EXERCISES.filter(e=>e.ageMin<=age).map(function(ex){const done=isCL(ex.id);const open=exOpen===ex.id;return(<div key={ex.id} style={{borderRadius:12,marginBottom:8,overflow:"hidden",border:"1px solid "+(done?"rgba(0,255,170,0.3)":"rgba(77,184,255,0.1)"),background:done?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.03)"}}>
              <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer"}} onClick={()=>setExOpen(open?null:ex.id)}>
                <div onClick={e=>{e.stopPropagation();toggleCL(ex.id);if(!done)addXP(10,"Exercise done! 💪");}} style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:done?"#00ffaa":"rgba(255,255,255,0.08)",border:"2px solid "+(done?"#00ffaa":"rgba(255,255,255,0.15)"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000",fontWeight:900,cursor:"pointer"}}>{done?"✓":""}</div>
                <div style={{flex:1}}><div style={{fontWeight:800,fontSize:13,color:done?"#00ffaa":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{ex.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:1}}>{ex.sets} sets · {ex.reps}</div></div>
                <div style={{fontSize:11,color:"#4db8ff"}}>{open?"▲":"▼"}</div>
              </div>
              {open&&<div style={{padding:"0 14px 14px"}}><div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.65,padding:"10px 12px",background:"rgba(0,100,255,0.08)",borderRadius:8,marginBottom:8}}>💡 {ex.cue}</div><div style={{fontSize:11,color:"#ff8888",padding:"8px 12px",borderRadius:8,background:"rgba(255,0,0,0.07)"}}>{ex.search}<button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText(ex.search).catch(()=>{})} style={{marginLeft:8,fontSize:10,padding:"3px 8px",borderRadius:5,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff8888",cursor:"pointer",fontFamily:"inherit"}}>Copy</button></div></div>}
            </div>);})}
          </>}
          {trainView==="pool"&&<>
            <Card style={{background:"linear-gradient(135deg,rgba(0,150,255,0.1),rgba(0,200,100,0.08))",border:"1px solid rgba(77,184,255,0.25)",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:11,color:"#4db8ff",fontWeight:700,letterSpacing:1,marginBottom:2}}>{workout.dayName.toUpperCase()} · DAY {(dayOfYear%7)+1} OF 7</div>
                  <div style={{fontSize:15,fontWeight:900,color:"#fff"}}>{workout.name}</div>
                  <div style={{fontSize:11,color:"#7aa8cc",marginTop:2}}>{workout.yards.toLocaleString()} yards</div>
                  <div style={{fontSize:10,color:"#00ffaa",marginTop:3}}>🎯 Targeting: {workout.targetEvent}</div>
                </div>
                <div style={{textAlign:"center",padding:"8px 12px",borderRadius:10,background:"rgba(255,255,255,0.05)"}}>
                  <div style={{fontSize:9,color:"#7aa8cc",marginBottom:2}}>INTENSITY</div>
                  <div style={{fontSize:12,fontWeight:900,color:workout.intensity==="Very High"?"#ff6b6b":workout.intensity==="Moderate-High"?"#ff9f43":workout.intensity==="Easy"?"#00ffaa":"#ffd700"}}>{workout.intensity}</div>
                </div>
              </div>
              <div style={{padding:"8px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.15)",fontSize:11,color:"#ffd700",lineHeight:1.6}}>💡 {workout.tip}</div>
            </Card>
            <Card style={{marginBottom:14}}>
              <div style={{fontSize:11,color:"#a78bfa",fontWeight:700,marginBottom:8}}>🎛️ FOCUS</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                <button onClick={()=>setManualFocus(null)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:!manualFocus?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.07)",color:!manualFocus?"#fff":"#7aa8cc"}}>🎯 Auto</button>
                {tagsKeys.map(ev=><button key={ev} onClick={()=>setManualFocus(ev)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:manualFocus===ev?"linear-gradient(135deg,#7c3aed,#a78bfa)":"rgba(255,255,255,0.07)",color:manualFocus===ev?"#fff":"#7aa8cc"}}>{ev}</button>)}
              </div>
            </Card>
            {workout.sets.map(function(set,j){const isWU=j===0;const isCD=j===workout.sets.length-1;return(<div key={j} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,marginBottom:8,background:isWU?"rgba(0,100,255,0.07)":isCD?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.04)",border:"1px solid "+(isWU?"rgba(77,184,255,0.2)":isCD?"rgba(0,255,170,0.15)":"rgba(255,255,255,0.08)")}}>
              <div style={{fontSize:12,fontWeight:900,color:isWU?"#4db8ff":isCD?"#00ffaa":"#ffd700",flexShrink:0,minWidth:22}}>{isWU?"WU":isCD?"CD":j+"."}</div>
              <div style={{fontSize:13,color:"#d0e8ff",lineHeight:1.65}}>{set}</div>
            </div>);})}
            <div style={{textAlign:"center",marginTop:10,padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.03)"}}><div style={{fontSize:10,color:"#7aa8cc"}}>Tomorrow: <span style={{color:"#4db8ff",fontWeight:700}}>{workout.nextWorkout}</span></div></div>
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
            {Object.keys(STROKE_TIPS).map(sk=><Chip key={sk} on={skillStroke===sk} onClick={()=>setSkillStroke(sk)} color="#7c3aed">{sk.charAt(0).toUpperCase()+sk.slice(1)}</Chip>)}
          </div>
          {skillView==="daily"&&<Card style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(251,191,36,0.25)",padding:20,marginBottom:12}}>
            <div style={{fontSize:10,color:"#fbbf24",fontWeight:700,marginBottom:8}}>⭐ TODAY'S TIP — {skillStroke.toUpperCase()}</div>
            <div style={{fontSize:15,color:"#fff",lineHeight:1.75,fontWeight:600}}>{strokeTips[todayTipIdx]}</div>
          </Card>}
          {skillView==="library"&&strokeTips.map(function(tip,i){const isToday=i===todayTipIdx;return(<div key={i} style={{background:isToday?"rgba(251,191,36,0.07)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px 16px",marginBottom:8,border:"1px solid "+(isToday?"rgba(251,191,36,0.3)":"rgba(251,191,36,0.08)"),display:"flex",gap:10}}>
            <div style={{flexShrink:0}}>{isToday?<div style={{fontSize:16}}>⭐</div>:<div style={{width:22,height:22,borderRadius:"50%",background:"rgba(251,191,36,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fbbf24",fontWeight:800}}>{i+1}</div>}</div>
            <div style={{fontSize:13,color:isToday?"#ffd700":"#d0e8ff",lineHeight:1.7}}>{tip}</div>
          </div>);})}
          {skillView==="channels"&&CHANNELS.map(function(ch){return(<div key={ch.name} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px",marginBottom:8,border:"1px solid rgba(251,191,36,0.12)"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}><div style={{fontSize:22,flexShrink:0}}>{ch.icon}</div><div><div style={{fontWeight:900,fontSize:14,color:"#fbbf24"}}>{ch.name}</div><div style={{fontSize:11,color:"#7aa8cc",marginTop:3}}>{ch.desc}</div></div></div>
            <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,background:"rgba(251,191,36,0.07)"}}><div style={{fontSize:10,color:"#7aa8cc",flex:1}}>{ch.url}</div><button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText("https://"+ch.url).catch(()=>{})} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.15)",color:"#fbbf24",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Copy</button></div>
          </div>);})}
        </>}

        {tab==="meets"&&<>
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>📅 MEET CALENDAR</div>
            {meets.length===0?<div style={{color:"#7aa8cc",fontSize:12}}>No upcoming meets — add one below.</div>:meets.map(function(m){return(<div key={m.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(77,184,255,0.15)"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:800,fontSize:13}}>{m.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>{m.date}{m.loc?" · "+m.loc:""} · {m.course||"SCY"}</div></div><button onClick={()=>setMeets(p=>p.filter(x=>x.id!==m.id))} style={{fontSize:10,padding:"3px 8px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit"}}>Remove</button></div>
            </div>);})}
          </Card>
          <Card>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>➕ ADD A MEET</div>
            <Lbl>Meet Name</Lbl><input value={mName} onChange={e=>setMName(e.target.value)} placeholder="e.g. District Championships" style={iStyle}/>
            <Lbl>Date</Lbl><input type="date" value={mDate} onChange={e=>setMDate(e.target.value)} style={iStyle}/>
            <Lbl>Location</Lbl><input value={mLoc} onChange={e=>setMLoc(e.target.value)} placeholder="Optional" style={iStyle}/>
            <Lbl>Course</Lbl><div style={{display:"flex",gap:6,marginBottom:8}}>{["SCY","LCM"].map(c=><Chip key={c} on={(mEvents._course||"SCY")===c} onClick={()=>setMEvents(p=>({...p,_course:c}))}>{c}</Chip>)}</div>
            <button onClick={()=>{if(!mName||!mDate){notify("Enter meet name and date","#ff6b6b");return;}setMeets(p=>[{id:Date.now(),name:mName,date:mDate,loc:mLoc,course:mEvents._course||"SCY"},...p]);setMName("");setMDate("");setMLoc("");setMEvents([]);notify("Meet added! 📅");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>Add Meet 📅</button>
          </Card>
        </>}

        {tab==="progress"&&<>
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:800,color:"#ff9f43",marginBottom:10}}>🎯 GOALS</div>
            {goals.map(function(g){const t=times[g.event];const target=parseTime(g.target);const diff=t&&target?t-target:null;return(<div key={g.id} style={{background:"rgba(255,255,255,0.04)",borderRadius:10,padding:"10px 12px",marginBottom:8,border:"1px solid rgba(255,159,67,0.2)"}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:800,fontSize:13}}>{g.event}</div><div style={{fontSize:10,color:"#7aa8cc"}}>Target: {fmt(target)} · By {g.deadline}</div></div><div style={{textAlign:"right"}}>{diff!==null&&<div style={{fontSize:12,fontWeight:800,color:diff<=0?"#00ffaa":"#ff9f43"}}>{diff<=0?"✅ HIT!":diff.toFixed(2)+"s to go"}</div>}<button onClick={()=>setGoals(p=>p.filter(x=>x.id!==g.id))} style={{fontSize:9,padding:"2px 7px",borderRadius:5,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit",marginTop:4}}>Remove</button></div></div>
            </div>);})}
            <Lbl>Event</Lbl><select value={gEvent} onChange={e=>setGEvent(e.target.value)} style={{...iStyle,cursor:"pointer"}}><option value="">Pick event</option>{tagsKeys.map(s=><option key={s}>{s}</option>)}</select>
            <div style={{display:"flex",gap:8}}><div style={{flex:1}}><Lbl>Target Time</Lbl><input value={gTarget} onChange={e=>setGTarget(e.target.value)} placeholder="52.00" style={iStyle}/></div><div style={{flex:1}}><Lbl>Deadline</Lbl><input type="date" value={gDeadline} onChange={e=>setGDeadline(e.target.value)} style={iStyle}/></div></div>
            <button onClick={()=>{if(!gEvent||!gTarget){notify("Fill all goal fields","#ff6b6b");return;}setGoals(p=>[{id:Date.now(),event:gEvent,target:gTarget,deadline:gDeadline},...p]);setGEvent("");setGTarget("");setGDeadline("");notify("Goal set! 🎯","#ff9f43");}} style={{width:"100%",padding:11,borderRadius:10,border:"none",background:"rgba(255,159,67,0.2)",color:"#ff9f43",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Set Goal 🎯</button>
          </Card>
          <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>🏅 Badges</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:16}}>
            {BADGES_DEF.map(function(b){const has=earned.find(e=>e.id===b.id);return(<div key={b.id} style={{background:has?"rgba(0,100,255,0.12)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 10px",border:"1px solid "+(has?"rgba(77,184,255,0.3)":"rgba(255,255,255,0.06)"),opacity:has?1:0.45}}><div style={{fontSize:24}}>{b.icon}</div><div style={{fontSize:12,fontWeight:800,marginTop:4}}>{b.name}</div><div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>{b.desc}</div></div>);})}
          </div>
          <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:10}}>📋 Session History</div>
          {logs.length===0?<div style={{color:"#3a5a7a",textAlign:"center",padding:"30px 0"}}>No sessions yet!</div>:logs.slice(0,30).map(function(e){return(<div key={e.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 14px",marginBottom:7,border:"1px solid rgba(77,184,255,0.07)"}}>
            <div style={{display:"flex",justifyContent:"space-between"}}><div><div style={{fontWeight:800,fontSize:13}}>{e.stroke} <span style={{fontSize:9,color:"#4db8ff",fontWeight:700}}>{e.course||"SCY"}</span></div><div style={{fontSize:10,color:"#7aa8cc"}}>{e.date}{e.meet?" · "+e.meet:""}</div></div><div style={{textAlign:"right"}}><div style={{fontSize:18,fontWeight:900,color:e.isBonus?"#ffd700":"#4db8ff"}}>{fmt(e.time)}</div>{e.isPB&&<div style={{fontSize:9,color:"#ff9f43",fontWeight:700}}>⚡ PB</div>}</div></div>
          </div>);})}
        </>}

        {tab==="squad"&&<>
          <Card style={{marginBottom:14}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:12}}>👥 Squad Leaderboard</div>
            {[{name:profile.name,times,isMe:true},...squad].sort((a,b)=>tagsKeys.filter(s=>b.times[s]&&tagsP[s]&&b.times[s]<=tagsP[s].q).length-tagsKeys.filter(s=>a.times[s]&&tagsP[s]&&a.times[s]<=tagsP[s].q).length).map(function(sw,i){const q=tagsKeys.filter(s=>sw.times[s]&&tagsP[s]&&sw.times[s]<=tagsP[s].q).length;return(<div key={sw.name+i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 12px",borderRadius:10,marginBottom:6,background:sw.isMe?"rgba(26,95,255,0.15)":"rgba(255,255,255,0.04)",border:"1px solid "+(sw.isMe?"rgba(77,184,255,0.3)":"rgba(255,255,255,0.06)")}}>
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
              {["100 Free","200 Free","500 Free","100 Back","200 Back","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"].map(e=><option key={e}>{e}</option>)}
            </select>
            {splitEvent&&<>
              {times[splitEvent]&&<div style={{marginBottom:10,padding:"10px 12px",borderRadius:10,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>YOUR BEST — {course}</div><div style={{fontSize:18,fontWeight:900,color:"#fff"}}>{fmt(times[splitEvent])}</div></div>
                <button onClick={()=>{const n=splitEvent.includes("100")?2:splitEvent.includes("200")?4:10;const lt=times[splitEvent];const pacing=n===2?[0.495,0.505]:n===4?[0.24,0.255,0.255,0.25]:[0.095,0.105,0.105,0.105,0.103,0.102,0.102,0.102,0.103,0.078];const est=pacing.slice(0,n).map(p=>(lt*p).toFixed(2));const sum=est.reduce((a,b)=>a+parseFloat(b),0);const scale=lt/sum;const norm=est.map(t=>(parseFloat(t)*scale).toFixed(2));const nt=["","","","","","","","",""];norm.forEach((t,i)=>{nt[i]=t;});setSplitTimes(nt);notify("Splits estimated!","#a78bfa");}} style={{padding:"9px 14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:800,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>✨ Auto-Fill</button>
              </div>}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                {Array.from({length:splitEvent.includes("100")?2:splitEvent.includes("200")?4:10}).map((_,i)=><div key={i}><div style={{fontSize:9,color:"#7aa8cc",marginBottom:2}}>Split {i+1} ({(i+1)*50}{course==="LCM"?"m":"y"})</div><input value={splitTimes[i]} onChange={e=>setSplitTimes(p=>{const n=[...p];n[i]=e.target.value;return n;})} placeholder="27.0" style={{...iStyle,marginBottom:0,fontSize:15,fontWeight:700}}/></div>)}
              </div>
              <button onClick={()=>{const n=splitEvent.includes("100")?2:splitEvent.includes("200")?4:10;const filled=splitTimes.slice(0,n).filter(t=>t.trim());if(filled.length<2){notify("Enter at least 2 splits","#ff6b6b");return;}const parsed=filled.map(t=>parseFloat(t)).filter(t=>!isNaN(t));const total=parsed.reduce((a,b)=>a+b,0);const half=Math.ceil(parsed.length/2);const first=parsed.slice(0,half).reduce((a,b)=>a+b,0);const second=parsed.slice(half).reduce((a,b)=>a+b,0);const isNeg=second<first;const fastest=Math.min(...parsed);const slowest=Math.max(...parsed);const drop=((slowest-fastest)/fastest*100).toFixed(1);const iq=Math.max(0,Math.min(100,Math.round(100-parseFloat(drop)*5+(isNeg?15:0))));const slowestIdx=parsed.indexOf(slowest);setSplitResult({parsed,total,isNeg,drop,fastest,slowest,iq,slowestIdx});addXP(30,"Race analyzed! 🔬");}} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Analyze Race 🔬</button>
              {splitResult&&<div style={{marginTop:14,padding:"16px",borderRadius:12,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.25)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div><div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>RACE IQ</div><div style={{fontSize:40,fontWeight:900,color:splitResult.iq>=80?"#00ffaa":splitResult.iq>=60?"#ffd700":"#ff6b6b"}}>{splitResult.iq}</div></div>
                  <div style={{textAlign:"right"}}><div style={{fontSize:13,fontWeight:800,color:splitResult.isNeg?"#00ffaa":"#ff9f43"}}>{splitResult.isNeg?"✅ Negative Split":"⚠️ Positive Split"}</div><div style={{fontSize:11,color:"#7aa8cc"}}>Total: {fmt(splitResult.total)}</div><div style={{fontSize:11,color:"#7aa8cc"}}>Slowest: Split {splitResult.slowestIdx+1}</div></div>
                </div>
                {splitResult.parsed.map(function(split,i){const isSlowst=split===splitResult.slowest;const isFast=split===splitResult.fastest;const w=Math.max(20,100-((split-splitResult.fastest)/(splitResult.slowest-splitResult.fastest||1))*60);return(<div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><div style={{fontSize:10,color:"#7aa8cc",width:50,flexShrink:0}}>Split {i+1}</div><div style={{flex:1,height:8,background:"rgba(255,255,255,0.06)",borderRadius:4}}><div style={{width:w+"%",height:"100%",borderRadius:4,background:isFast?"#00ffaa":isSlowst?"#ff6b6b":"#a78bfa"}}/></div><div style={{fontSize:12,fontWeight:800,color:isFast?"#00ffaa":isSlowst?"#ff6b6b":"#d0e8ff",width:50,textAlign:"right"}}>{split.toFixed(2)}</div></div>);})}
                <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(0,0,0,0.2)",fontSize:12,color:"#d0e8ff",lineHeight:1.7,marginTop:8}}>{splitResult.isNeg?"🌟 Elite pacing! Second half faster — this is what champions do consistently.":"💡 You went out too fast. Hold back 5-10% in the first half. The time you save early more than compensates in the back half."} {!splitResult.isNeg&&splitResult.slowestIdx>0?" Your Split "+(splitResult.slowestIdx+1)+" is where you started dying. That's the target.":""}</div>
                <button onClick={()=>{askCoach("Analyze my "+splitEvent+" split data: "+splitResult.parsed.map((s,i)=>"Split "+(i+1)+": "+s.toFixed(2)).join(", ")+". Total: "+fmt(splitResult.total)+". Race IQ: "+splitResult.iq+". I "+(splitResult.isNeg?"negative split":"positive split")+". Tell me exactly what this means technically and give me the specific drill to fix my weakest phase.");setTab("coach");}} style={{width:"100%",padding:10,borderRadius:10,border:"1px solid rgba(77,184,255,0.3)",background:"rgba(77,184,255,0.08)",color:"#4db8ff",fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginTop:10,fontSize:12}}>🤖 Send to Coach for deep analysis →</button>
              </div>}
            </>}
          </Card>
          <Card style={{background:"rgba(0,100,255,0.07)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:2}}>🤖 AI COACH — Bob Bowman Mode</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Knows your full history, both courses, all times. Coached Michael Phelps to 23 Olympic gold medals.</div>
            {["Analyze ALL my times — where am I losing the most time and what do I fix first?","Break down my race by phase: start, first length, turns, back half, finish — where am I dying?","What are my 3 biggest technical weaknesses? Give me the drills.","How close am I to TAGS in every event? What is my fastest path to qualify?","Build me a 4-week plan to drop the most time before my next meet","What should my turns and underwater dolphins look like — exactly how many kicks?","Design my race-day warm-up, mental routine, and race strategy for my best event"].map(q=><button key={q} onClick={()=>askCoach(q)} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,255,0.12)",color:"#d0e8ff",borderRadius:10,padding:"11px 14px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>)}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <input value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&aiQ&&askCoach(aiQ)} placeholder="Ask anything..." style={{...iStyle,flex:1,margin:0}}/>
              <button onClick={()=>aiQ&&askCoach(aiQ)} style={{background:"linear-gradient(135deg,#1a5fff,#0099ff)",border:"none",color:"#fff",borderRadius:10,padding:"10px 18px",fontWeight:800,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>Ask</button>
            </div>
            {aiLoad&&<div style={{textAlign:"center",color:"#4db8ff",fontSize:14,marginTop:20,padding:"20px 0"}}>🧠 Coach is analyzing your complete history...</div>}
            {aiA&&<div style={{marginTop:14,background:"rgba(0,100,255,0.06)",borderRadius:14,padding:18,border:"1px solid rgba(77,184,255,0.2)",fontSize:14,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#d0e8ff"}}>{aiA}</div>}
          </Card>
        </>}

        {tab==="nutrition"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(0,200,100,0.08),rgba(26,95,255,0.08))",border:"1px solid rgba(0,255,170,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#00ffaa",fontWeight:700,marginBottom:4}}>🥗 FUEL LIKE AN OLYMPIAN</div>
            <div style={{fontSize:12,color:"#7aa8cc"}}>Evidence-based nutrition for competitive swimmers. Tap any card to expand.</div>
          </Card>
          {NUTRITION_TIPS[nutrIdx%NUTRITION_TIPS.length]&&<Card style={{background:"linear-gradient(135deg,rgba(0,255,170,0.07),rgba(0,100,255,0.07))",border:"1px solid rgba(0,255,170,0.25)",marginBottom:12}}>
            <div style={{fontSize:10,color:"#00ffaa",fontWeight:700,marginBottom:6}}>⭐ TODAY'S TIP</div>
            <div style={{fontSize:14,fontWeight:800,color:"#fff",marginBottom:6}}>{NUTRITION_TIPS[nutrIdx%NUTRITION_TIPS.length][0]}</div>
            <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.65,marginBottom:8}}>{NUTRITION_TIPS[nutrIdx%NUTRITION_TIPS.length][1]}</div>
            <div style={{padding:"8px 10px",borderRadius:8,background:"rgba(0,255,170,0.07)",fontSize:11,color:"#00ffaa"}}>{NUTRITION_TIPS[nutrIdx%NUTRITION_TIPS.length][2]}</div>
          </Card>}
          {NUTRITION_TIPS.map(function(tip,i){const isOpen=nutrExpanded===i;return(<div key={i} onClick={()=>setNutrExpanded(isOpen?null:i)} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid rgba(255,255,255,0.07)",cursor:"pointer"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(0,255,170,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#00ffaa",fontWeight:800,flexShrink:0}}>{i+1}</div>
              <div style={{flex:1,fontSize:13,fontWeight:700,color:"#e8f4ff"}}>{tip[0]}</div>
              <div style={{fontSize:11,color:"#4db8ff"}}>{isOpen?"▲":"▼"}</div>
            </div>
            {isOpen&&<><div style={{marginTop:10,fontSize:12,color:"#d0e8ff",lineHeight:1.7}}>{tip[1]}</div><div style={{marginTop:8,padding:"10px 12px",borderRadius:8,background:"rgba(0,255,170,0.06)",fontSize:12,color:"#00ffaa"}}>{tip[2]}</div></>}
          </div>);})}
          <button onClick={()=>setNutrIdx(p=>p+1)} style={{width:"100%",padding:12,borderRadius:10,border:"1px solid rgba(0,255,170,0.3)",background:"rgba(0,255,170,0.08)",color:"#00ffaa",fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginBottom:12,fontSize:13}}>🔄 Next Tip</button>
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
              <div style={{fontSize:12,fontWeight:800,color:"#4db8ff",marginBottom:12}}>📊 Your Stats — {course}</div>
              {[{l:"Events Logged",v:Object.keys(times).length},{l:"TAGS Cuts Hit",v:qualified.length,c:"#00ffaa"},{l:"Streak",v:streak+" days",c:streak>0?"#ffd700":undefined},{l:"Total Sessions",v:logs.length},{l:"SCY Times",v:Object.keys(timesSCY).length},{l:"LCM Times",v:Object.keys(timesLCM).length}].map(r=><div key={r.l} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid rgba(255,255,255,0.05)"}}><span style={{fontSize:13,color:"#7aa8cc"}}>{r.l}</span><span style={{fontSize:13,fontWeight:800,color:r.c||"#e8f4ff"}}>{r.v}</span></div>)}
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
              <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>{parentCodes.map((child,i)=><button key={i} onClick={()=>setSelectedChild(i)} style={{padding:"8px 16px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:selectedChild===i?"linear-gradient(135deg,#7c3aed,#c084fc)":"rgba(255,255,255,0.07)",color:selectedChild===i?"#fff":"#7aa8cc"}}>{child.name}</button>)}</div>
              {parentCodes[selectedChild]&&<>
                <Card style={{background:"linear-gradient(135deg,rgba(168,85,247,0.08),rgba(0,100,255,0.06))",border:"1px solid rgba(168,85,247,0.2)",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div><div style={{fontSize:20,fontWeight:900,color:"#fff"}}>{parentCodes[selectedChild].name}</div><div style={{fontSize:11,color:"#c084fc",marginTop:2}}>Code: {parentCodes[selectedChild].code}</div></div>
                    <button onClick={()=>{const u=parentCodes.filter((_,i)=>i!==selectedChild);saveParentCodes(u);if(selectedChild>=u.length)setSelectedChild(0);}} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff6b6b",cursor:"pointer",fontFamily:"inherit"}}>Remove</button>
                  </div>
                </Card>
                <Card>
                  <div style={{fontSize:12,fontWeight:800,color:"#4db8ff",marginBottom:8}}>💬 Send {parentCodes[selectedChild].name} a Message</div>
                  {["Hey "+parentCodes[selectedChild].name+" — scan your meet results on SwimIQ! 💪","How's training going? Ask your AI Coach what to work on this week 🏊","Don't forget your dryland today! Every rep counts toward TAGS 🔥"].map(msg=><button key={msg} onClick={()=>{navigator.clipboard&&navigator.clipboard.writeText(msg).catch(()=>{});notify("Copied! Paste in a text 📱","#00ffaa");}} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(77,184,255,0.12)",color:"#d0e8ff",borderRadius:9,padding:"10px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{msg}<span style={{display:"block",fontSize:9,color:"#4db8ff",marginTop:4}}>Tap to copy</span></button>)}
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
