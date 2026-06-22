import { useState, useEffect, useRef } from "react";

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

const TIME_RANGES = {
  SCY:{"50 Free":{min:18,max:75},"100 Free":{min:40,max:160},"200 Free":{min:90,max:340},"500 Free":{min:250,max:800},"1000 Free":{min:520,max:1600},"1650 Free":{min:880,max:2700},"100 Back":{min:48,max:175},"200 Back":{min:105,max:370},"100 Breast":{min:52,max:185},"200 Breast":{min:115,max:400},"50 Fly":{min:20,max:80},"100 Fly":{min:46,max:175},"200 Fly":{min:105,max:390},"200 IM":{min:105,max:370},"400 IM":{min:230,max:780}},
  LCM:{"50 Free":{min:22,max:80},"100 Free":{min:45,max:160},"200 Free":{min:100,max:340},"400 Free":{min:220,max:720},"800 Free":{min:460,max:1500},"1500 Free":{min:880,max:2800},"100 Back":{min:52,max:170},"200 Back":{min:115,max:370},"100 Breast":{min:58,max:185},"200 Breast":{min:126,max:410},"50 Fly":{min:23,max:80},"100 Fly":{min:50,max:175},"200 Fly":{min:115,max:390},"200 IM":{min:115,max:380},"400 IM":{min:250,max:800}},
};

const ALL_EVENTS_SCY=["50 Free","100 Free","200 Free","500 Free","1000 Free","1650 Free","100 Back","200 Back","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"];
const ALL_EVENTS_LCM=["50 Free","100 Free","200 Free","400 Free","800 Free","1500 Free","100 Back","200 Back","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"];

const CHANNELS=[
  {name:"Effortless Swimming",url:"youtube.com/@EffortlessSwimming",icon:"🇦🇺",desc:"Best overall technique channel. Underwater footage for every stroke."},
  {name:"Skills N Talents",url:"youtube.com/@SkillsNTalents",icon:"🏆",desc:"#1 ranked swim channel. Step-by-step for all strokes."},
  {name:"The Race Club",url:"youtube.com/@TheRaceClub",icon:"🥇",desc:"Founded by Olympian Gary Hall Jr. Elite technique and race strategy."},
  {name:"GoSwim",url:"youtube.com/@GoSwimTV",icon:"📚",desc:"Massive drill library for every stroke and distance."},
  {name:"USA Swimming",url:"youtube.com/@USASwimming",icon:"🇺🇸",desc:"Official governing body. Race analysis and elite coaching insights."},
];

const EXERCISES=[
  {id:"plank",name:"Plank Hold",sets:"3",reps:"30-45s",ageMin:8,cue:"Squeeze glutes and belly tight. Hips don't sag or pike. Build to 60s.",search:"plank hold swimmers technique"},
  {id:"deadbug",name:"Dead Bug",sets:"3",reps:"8 each side",ageMin:8,cue:"Press lower back flat into floor the whole time. Slow and controlled.",search:"dead bug exercise swimmers core"},
  {id:"flutter",name:"Flutter Kick Dry",sets:"3",reps:"30s",ageMin:8,cue:"Lie flat, hands under hips. Small fast kicks from the hip. Toes pointed.",search:"flutter kick dryland swimmers"},
  {id:"ytwl",name:"YTW-L Shoulder",sets:"3",reps:"10 each",ageMin:8,cue:"Face down, thumbs up. Make Y-T-W-L shapes. Squeeze shoulder blades together.",search:"YTWL exercise swimmers shoulder"},
  {id:"glute",name:"Glute Bridge",sets:"3",reps:"15",ageMin:8,cue:"Feet flat, drive hips up, squeeze hard at top for 1 second.",search:"glute bridge swimmers kick power"},
  {id:"sqjump",name:"Squat Jumps",sets:"3",reps:"10",ageMin:8,cue:"Squat to 90°, explode up, land softly. Builds wall push-off power.",search:"squat jumps swimmers explosive power"},
  {id:"calf",name:"Calf Raises",sets:"3",reps:"20",ageMin:8,cue:"Slow up, hold 1s at top, slow down. Better ankle extension = better kick.",search:"calf raises swimmers ankle flexibility"},
  {id:"hipflex",name:"Hip Flexor Stretch",sets:"2",reps:"30s each",ageMin:8,cue:"Kneeling lunge, push hips forward. Tight hips drag legs down in water.",search:"hip flexor stretch swimmers"},
  {id:"ankle",name:"Ankle Circles",sets:"2",reps:"20 each way",ageMin:8,cue:"Full circles both directions. Flexible ankles = more kick propulsion.",search:"ankle flexibility swimmers kick"},
];

const STROKE_TIPS={
  freestyle:["Press your chest slightly down — this lifts hips into a flat horizontal position. Think of balancing a cup on your lower back.","Eyes look straight down — never up at the wall. Every inch you lift your head drops your hips 4-6 inches instantly.","High elbow catch: after entry rotate palm outward and down — elbow stays HIGH above your wrist. This is the single most important skill in swimming.","Exhale continuously underwater. Never hold your breath. The moment you surface, lungs are clear and you inhale fully.","Count your strokes from the flags every single practice. Flags are 5 yards from the wall. Know your number — trust it completely.","Tuck TIGHT in flip turns. Chin to chest, knees to chest, feet over fast. A loose turn costs a full body length.","5 dolphin kicks minimum off every wall. These are the fastest yards in the race — most swimmers waste them completely.","6-beat kick for sprints, 2-beat for distance. Both kick from the hip — not the knee. Toes pointed always.","Bilateral breathing every 3 strokes. This balances your stroke and ensures both sides develop equally.","Full arm extension at the finish — thumb brushes thigh. Stopping early wastes 20% of your pull power."],
  backstroke:["Pinky finger enters first — this sets up the most powerful catch position automatically.","Head neutral, ears just below surface, eyes straight up. A tilted head drops hips and kills your speed.","Body rotates 45-50 degrees each side. Hip-driven rotation is where all backstroke power comes from.","Count strokes from backstroke flags every practice until it's automatic. Never look for the wall — it costs you.","Squeeze your lat throughout the entire pull. Your lat is the engine — not your arm.","Thumb exits first on recovery — opposite of the pinky-first entry. This is what sets up the next stroke."],
  breaststroke:["Pull and kick NEVER overlap — ever. This is the single most important rule in breaststroke. Pull, then kick.","Heels to glutes — not knees forward. When knees come forward they create a wall of drag that stops all momentum.","The glide after the kick is free speed. Your momentum is maximum here. Rushing it costs 0.3-0.5 seconds per cycle.","One dolphin kick during every pullout is legal — use it every single wall without exception.","Elbows squeeze together at finish before shooting arms forward. This compression generates the shooting momentum."],
  butterfly:["Two dolphin kicks per arm cycle — always. Kick 1 fires as hands enter. Kick 2 fires as hands exit. Losing Kick 2 collapses your fly.","Chin barely clears the surface to breathe — not your whole head. Every extra inch you lift adds drag exponentially.","Recovery arms skim close to the water surface — low and fast. High arcing arms waste energy and kill rhythm.","The dolphin kick wave starts at your chest, travels through hips, snaps at feet. It's a full body wave — not a leg kick."],
  im:["Fly is first for a reason — go out controlled or breaststroke will destroy you. The first 25 should feel almost easy.","Breaststroke is where IM races are won and lost — not butterfly. A smart fly sets up a powerful breast split.","Fly-to-Back: two-hand simultaneous touch, drop one shoulder to spin, push off on your back immediately.","Back-to-Breast: count from flags, roll to front on last stroke, two-hand open turn required.","Practice every IM transition 20+ times before each major meet. Transitions cost time if unrehearsed."],
  mental:["Visualize your race 3 times the night before: once perfect, once with adversity, once as a comeback. Feel everything.","Nerves and excitement are physiologically identical. Relabel anxiety as excitement — it measurably improves performance.","Box breathing: inhale 4 counts, hold 4, exhale 4, hold 4. Three cycles before stepping on the block.","Focus only on what you control: your warm-up, your routine, your first 25. Not the competition, not the clock.","The swimmers who improve fastest are the most coachable — not the most talented. Coachability determines your ceiling."],
};

const NUTRITION=[
  {cat:"🍽️ Daily",tips:[
    ["Eat every 3-4 hours","Training swimmers need fuel constantly. Missing meals = slower times and slower recovery.","Breakfast · Snack · Lunch · Snack before practice · Dinner · Optional snack before bed"],
    ["Protein at every meal","Protein repairs muscle after every practice. Without it your body can't adapt and improve.","🍗 Chicken · Eggs · Greek yogurt · Peanut butter · Beans and rice — aim for 20-25g per meal"],
    ["Whole grains = steady energy","White bread spikes blood sugar and crashes it. Whole grains give steady energy for full practices.","🌾 Brown rice · Whole wheat bread · Oatmeal · Whole wheat pasta"],
    ["5 colors of fruits and vegetables","Each color provides different vitamins. Variety is the key — not just one fruit all week.","🥦 Red (tomatoes) · Orange (carrots) · Green (spinach) · Blue (blueberries) · Yellow (bananas)"],
    ["Healthy fats for joints and brain","Omega-3 fats reduce inflammation and keep shoulders healthy for high-volume training.","🥑 Avocado · Walnuts · Salmon 2-3x per week · Olive oil on vegetables"],
  ]},
  {cat:"💧 Hydration",tips:[
    ["8-10 cups of water daily","Dehydration by just 2% reduces performance by 10-20%. Drink before you feel thirsty.","💧 2 cups breakfast · 2 cups school · 2 cups before practice · 2 cups dinner = 8 minimum"],
    ["Drink 1-2 cups 30 min before practice","Pre-hydrating means your blood volume is optimal and muscles get oxygen faster.","⏰ Set an alarm. Pre-hydration is free performance."],
    ["NO energy drinks — ever","Red Bull, Monster, Prime are dangerous for swimmers under 16. They cause irregular heart rhythm.","❌ Not even zero sugar versions. Water, milk, and 100% juice only."],
    ["Chocolate milk after practice","Scientifically proven: perfect protein-to-carb ratio for post-exercise recovery.","🍫 1-2 cups within 30 minutes of finishing. Used by elite athletes worldwide."],
    ["Coconut water for electrolytes","After hard practices you lose sodium and potassium in sweat. Replace them naturally.","🥥 1 cup coconut water + 1 banana = natural electrolyte replacement that actually works"],
    ["Signs of dehydration","Catch it early — by the time you feel thirsty you're already behind.","🟡 Headache · Extra tired · Muscle cramps · Dark yellow urine = drink water NOW"],
  ]},
  {cat:"🏁 Pre-Meet",tips:[
    ["Night before: pasta dinner","Pasta gives your body 10-12 hours to convert to stored glycogen energy for race day.","🍝 Spaghetti + marinara + chicken + bread + 2 cups water. Done by 7pm."],
    ["Morning: eat 2-3 hours before first race","Too close = cramps. Too far = running on empty. 2.5 hours is the sweet spot.","🥚 Oatmeal + banana + eggs + water. Avoid greasy food entirely on meet morning."],
    ["Pack snack bag night before","Don't forget anything important on meet morning when you're nervous and rushing.","🎒 Banana · Granola bars · Gummy bears · PB crackers · Sports drink · Water bottle"],
    ["Between events: simple carbs only","Quick energy, easy digestion. No protein or fat between races — too slow to digest.","⚡ Banana · Gummy bears · Dates · Orange slices · Sports chews. Nothing heavy."],
    ["No new foods on meet day — ever","This rule is absolute. Your stomach will remind you exactly why.","⚠️ Only foods you've eaten before practices. No exceptions on race day."],
  ]},
];

const DAILY_MISSIONS=[
  {id:"log_today",icon:"📝",text:"Log a practice time today",xp:20},
  {id:"read_tip",icon:"📖",text:"Read one technique tip",xp:10},
  {id:"check_tags",icon:"⭐",text:"Check your TAGS progress",xp:10},
  {id:"do_dryland",icon:"💪",text:"Complete 3 dryland exercises",xp:25},
  {id:"drink_water",icon:"💧",text:"Drink 8 cups of water today",xp:10},
  {id:"coach_question",icon:"🤖",text:"Ask your AI coach one question",xp:15},
];

const BADGES_DEF=[
  {id:"first_log",icon:"🌊",name:"First Splash",desc:"Logged your first time"},
  {id:"five_events",icon:"⚡",name:"Five Events",desc:"Logged 5 different events"},
  {id:"ten_logs",icon:"📊",name:"Data Driven",desc:"Logged 10 sessions"},
  {id:"pb_three",icon:"🔥",name:"On Fire",desc:"Set 3 personal bests"},
  {id:"all_strokes",icon:"🏆",name:"Complete Swimmer",desc:"Logged all 4 strokes"},
  {id:"sub_bonus",icon:"🌟",name:"Bonus Crusher",desc:"Hit a TAGS bonus time"},
  {id:"streak7",icon:"💎",name:"Week Warrior",desc:"7-day training streak"},
];

function normalizeEvent(raw){
  if(!raw)return null;
  const r=raw.toLowerCase().replace(/boys|girls|men|women|mixed|open|junior|senior/gi,"").replace(/\b13&o\b|\b14&u\b|\b12&u\b|\b&o\b|\b&u\b/gi,"").replace(/meters?|metres?|yards?/gi,"").replace(/[()]/g,"").replace(/\s+/g," ").trim();
  const map=[
    {keys:["50 free","50fr","50 fr"],out:"50 Free"},{keys:["100 free","100fr","100 fr"],out:"100 Free"},
    {keys:["200 free","200fr"],out:"200 Free"},{keys:["400 free","400fr"],out:"400 Free"},
    {keys:["500 free","500fr"],out:"500 Free"},{keys:["800 free"],out:"800 Free"},
    {keys:["1000 free"],out:"1000 Free"},{keys:["1500 free"],out:"1500 Free"},
    {keys:["1650 free","mile"],out:"1650 Free"},
    {keys:["100 back","100bk","100 bk","100 backstroke"],out:"100 Back"},
    {keys:["200 back","200bk","200 backstroke"],out:"200 Back"},
    {keys:["100 breast","100br","100 br","100 breaststroke"],out:"100 Breast"},
    {keys:["200 breast","200br","200 breaststroke"],out:"200 Breast"},
    {keys:["50 fly","50 butterfly","50fly","50fl"],out:"50 Fly"},
    {keys:["100 fly","100 butterfly","100fly","100fl"],out:"100 Fly"},
    {keys:["200 fly","200 butterfly","200fly"],out:"200 Fly"},
    {keys:["200 im","200im","200 i.m.","200 individual"],out:"200 IM"},
    {keys:["400 im","400im","400 i.m.","400 individual"],out:"400 IM"},
  ];
  for(const e of map)for(const k of e.keys)if(r.includes(k))return e.out;
  return null;
}

function validateTime(event,secs,course){
  const range=(TIME_RANGES[course]||TIME_RANGES.SCY)[event];
  if(!range)return{valid:true};
  if(secs<range.min)return{valid:false,reason:"Too fast — looks like a split, not a full race time"};
  if(secs>range.max)return{valid:false,reason:"Time seems too slow — please verify"};
  return{valid:true};
}

function getWorkout(profile,times,tagsP,dayOfYear,manualFocus){
  const age=parseInt(profile.age)||13;
  const tagsKeys=Object.keys(tagsP);
  const gaps=tagsKeys.map(s=>{const t=times[s];const tags=tagsP[s];if(!t||!tags||t<=tags.q)return null;return{s,gap:t-tags.q};}).filter(Boolean).sort((a,b)=>a.gap-b.gap);
  const targetEvent=manualFocus||(gaps[0]?gaps[0].s:tagsKeys[0]||"100 Free");
  const st=targetEvent.includes("Back")?"backstroke":targetEvent.includes("Breast")?"breaststroke":targetEvent.includes("Fly")?"butterfly":targetEvent.includes("IM")?"im":"freestyle";
  const focuses=["speed","endurance","technique","race_pace","kick","pull","recovery"];
  const focus=focuses[dayOfYear%7];
  const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const base=age<=10?1200:age<=12?2000:age<=14?2800:3200;
  const isIM=st==="im";
  let name="",sets=[],yards=base,intensity="Moderate";
  if(focus==="speed"){
    name="Speed & Power — "+targetEvent;intensity="Very High";yards=base+300;
    sets=["400 warm-up: 100 free easy / 100 "+st+" / 4x50 build","8x25 @ :25 — ALL OUT SPRINT, 30s full rest between each","4x50 "+(isIM?"IM order":st)+" @ :50 — race pace, complete rest between","6x"+(targetEvent.includes("200")?"100":"50")+" "+(isIM?"IM":st)+" — descend 1-6, last two faster than race pace","8x25 underwater dolphin kick @ :40 — max distance every rep","4x25 explosive start @ :45 — perfect streamline entry every time","200 easy cool down"];
  }else if(focus==="endurance"){
    name="Endurance Base — "+targetEvent;intensity="Moderate-Hard";yards=base+500;
    sets=["600 warm-up: 200 free / 4x100 choice @ 1:50","3x"+(targetEvent.includes("500")?"500":"200")+" "+(isIM?"IM":st)+" — hold identical pace all three reps","8x50 "+(isIM?"IM order":st)+" @ :55 — negative split every one (second 25 faster)","400 pull with buoy — feel the forearm stack on every catch","4x100 @ 1:40 — count strokes every length, try to reduce by 1","200 kick — narrow, toes pointed, from the hip","200 easy cool down"];
  }else if(focus==="technique"){
    name="Technique Mastery — "+targetEvent;intensity="Low-Moderate";yards=base-300;
    sets=["300 warm-up easy",isIM?"8x50 IM order @ 1:10 — perfect every transition":"12x25 drill @ :40 — 4 reps of 3 different stroke drills","4x"+(targetEvent.includes("200")?"200":"100")+" "+(isIM?"IM":st)+" — count strokes every length","8x25 turns @ :35 — perfect streamline, 5 dolphins minimum, first stroke full power","4x50 @ 1:00 — apply drilled technique at race effort","4x25 starts @ :40 — hole entry, perfect streamline every time","200 easy cool down"];
  }else if(focus==="race_pace"){
    name="Race Simulation — "+targetEvent;intensity="Very High";yards=base+400;
    const mi=targetEvent.includes("200")?"3:30":targetEvent.includes("100")?"1:45":":55";
    sets=["500 warm-up: 200 free / 4x50 "+st+" building pace","2x"+targetEvent+" @ "+mi+" — FULL RACE SIMULATION: race start, race pacing, race turns","6x50 @ :50 — alternate race pace / easy recovery","4x25 @ :28 — MAXIMUM EFFORT, 1 full minute rest each","4x"+(targetEvent.includes("200")?"100":"50")+" — negative split every one","8x25 underwater dolphin kick — max distance","300 easy cool down"];
  }else if(focus==="kick"){
    name="Kick Power — "+targetEvent;intensity="Moderate-High";
    sets=["400 warm-up easy","8x50 kick @ 1:00 — "+(st==="breaststroke"?"breast kick, heels to glutes, narrow knees, strong snap finish":st==="butterfly"?"dolphin kick with board, full body wave, compact and fast":"flutter kick with board, from hip, toes pointed, narrow cylinder"),"4x100 @ 1:45 — maximum kick throughout, do not let it die","8x25 vertical kick @ :45 — no hands, head above water, kick only","4x50 kick no board @ :55 — streamline arms, race-pace kick","8x25 underwater dolphin @ :35 — stay under maximum distance","200 easy cool down"];
  }else if(focus==="pull"){
    name="Pull Strength — "+targetEvent;intensity="Moderate";
    sets=["400 warm-up easy","400 pull with buoy — high elbow catch, full extension, palm facing back not down","8x50 pull @ :55 — odd 50s: FAST / even 50s: technique, count strokes","4x100 "+(isIM?"IM":st)+" @ 1:50 — feel forearm stack against water before pulling","4x50 single-arm "+(st==="breaststroke"||isIM?"freestyle":st)+" @ 1:05 — full finish every stroke","8x25 @ :35 — push past hip EVERY stroke, full finish","200 easy cool down"];
  }else{
    name="Active Recovery";intensity="Easy";yards=base-500;
    sets=["500 easy — any stroke, breathing rhythm, no effort","8x50 @ 1:15 — relaxed, focus on stroke count and efficiency","4x100 choice @ 2:00 — comfortable, sustainable pace","200 backstroke easy — decompress shoulders and spine","4x50 kick @ 1:10 — easy, just keep moving","4x25 technique @ :40 — drill your weakest point slowly","200 easy cool down — reflect on the week"];
  }
  const tips={speed:"Full rest between reps is mandatory. If not rested, you're doing endurance — not speed.",endurance:"Zero stops. Slow down if tired — don't stop. Continuous swimming builds the aerobic engine.",technique:"Slow is smooth. Smooth is fast. Drill it slow, then transfer to race speed.",race_pace:"Your nervous system needs to know race pace. Make it uncomfortable — then race day feels easy.",kick:"30-40% more kick power is untapped in most swimmers. Today you unlock it.",pull:"The catch is where power is born. One session focused on holding the water changes your feel permanently.",recovery:"Your body gets faster during rest — not training. Today is productive. Arrive tomorrow ready to go hard."};
  const nextFocuses=["Speed & Power","Endurance Base","Technique Mastery","Race Simulation","Kick Power","Pull Strength","Active Recovery"];
  return{name,sets,yards:Math.max(800,yards),intensity,targetEvent,dayName:days[dayOfYear%7],tip:tips[focus]||"",nextWorkout:nextFocuses[(dayOfYear+1)%7]};
}

function parseTime(s){if(!s)return null;s=String(s).trim();if(s.includes(":"))return parseFloat(s.split(":")[0])*60+parseFloat(s.split(":")[1]);return parseFloat(s);}
function fmt(s){if(!s||isNaN(s))return "—";if(s>=60){const m=Math.floor(s/60);return m+":"+(s%60).toFixed(2).padStart(5,"0");}return s.toFixed(2);}
function getStatusColor(t,q,b){if(!t)return "#3a5a7a";if(t<=b)return "#ffd700";if(t<=q)return "#00ffaa";return t-q<=2?"#ff9f43":"#ff6b6b";}
function getStatusLabel(t,q,b){if(!t)return null;if(t<=b)return "🌟 BONUS";if(t<=q)return "✅ QUALIFIED";return (t-q).toFixed(2)+"s to go";}
const LS="swimiq_v7";
function load(){try{return JSON.parse(localStorage.getItem(LS))||{};}catch(e){return {};}}
function save(d){try{localStorage.setItem(LS,JSON.stringify(d));}catch(e){}}
const iStyle={display:"block",width:"100%",marginBottom:4,background:"rgba(13,27,42,0.95)",border:"1px solid rgba(77,184,255,0.25)",color:"#e8f4ff",borderRadius:10,padding:"10px 12px",fontSize:14,outline:"none",fontFamily:"inherit",boxSizing:"border-box"};
function Card({children,style}){return <div style={{background:"rgba(255,255,255,0.04)",borderRadius:14,padding:16,border:"1px solid rgba(77,184,255,0.1)",marginBottom:12,...style}}>{children}</div>;}
function Lbl({children}){return <div style={{fontSize:11,color:"#7aa8cc",letterSpacing:0.5,marginBottom:4,marginTop:8}}>{children}</div>;}
function Chip({on,onClick,children,color}){return <button onClick={onClick} style={{padding:"7px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:12,fontFamily:"inherit",background:on?(color||"#1a5fff"):"rgba(255,255,255,0.07)",color:on?"#fff":"#7aa8cc"}}>{children}</button>;}
function PBar({value,max,color}){const w=Math.max(4,Math.min(100,(value/(max||100))*100));return <div style={{height:6,background:"rgba(255,255,255,0.07)",borderRadius:3,marginTop:6}}><div style={{width:w+"%",height:"100%",borderRadius:3,background:color||"linear-gradient(90deg,#1a5fff,#00ffaa)",transition:"width 0.5s"}}/></div>;}

const TABS=[{id:"home",icon:"🏠",l:"Home"},{id:"log",icon:"📸",l:"Log"},{id:"train",icon:"💪",l:"Train"},{id:"skills",icon:"🎬",l:"Skills"},{id:"coach",icon:"🤖",l:"Coach"},{id:"fuel",icon:"🥗",l:"Fuel"}];

export default function SwimIQ(){
  const [tab,setTab]=useState("home");
  const [setup,setSetup]=useState(()=>!!(load().profile?.name?.length>1));
  const [profile,setProfile]=useState(()=>load().profile||{name:"",age:13,gender:"boys",ageGroup:"13-14",mode:"competitive"});
  const [course,setCourse]=useState(()=>load().course||"SCY");
  const [timesSCY,setTimesSCY]=useState(()=>load().timesSCY||{});
  const [timesLCM,setTimesLCM]=useState(()=>load().timesLCM||{});
  const [logs,setLogs]=useState(()=>load().logs||[]);
  const [xp,setXP]=useState(()=>load().xp||0);
  const [cl,setCl]=useState(()=>load().cl||{});
  const [missions,setMissions]=useState(()=>load().missions||{});
  const [toast,setToast]=useState(null);
  const [lSt,setLSt]=useState("");
  const [lTm,setLTm]=useState("");
  const [lDt,setLDt]=useState(new Date().toISOString().split("T")[0]);
  const [lMt,setLMt]=useState("");
  const [showManual,setShowManual]=useState(false);
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
  const [nutrCat,setNutrCat]=useState(0);
  const [nutrExpanded,setNutrExpanded]=useState(null);
  const [nextMeet,setNextMeet]=useState(()=>load().nextMeet||"");
  const [splitEvent,setSplitEvent]=useState("");
  const [splitTimes,setSplitTimes]=useState(["","","","","","","","",""]);
  const [splitResult,setSplitResult]=useState(null);

  const times=course==="SCY"?timesSCY:timesLCM;
  const setTimes=course==="SCY"?setTimesSCY:setTimesLCM;
  const TAGS_DATA=course==="SCY"?TAGS_SCY:TAGS_LCM;
  const ALL_EVENTS=course==="SCY"?ALL_EVENTS_SCY:ALL_EVENTS_LCM;
  const tagsP=(TAGS_DATA[profile.gender]&&TAGS_DATA[profile.gender][profile.ageGroup])||{};
  const tagsKeys=Object.keys(tagsP);
  const todayKey=new Date().toISOString().split("T")[0];
  const age=parseInt(profile.age)||13;
  const dayOfYear=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/86400000);
  const workout=getWorkout(profile,times,tagsP,dayOfYear,manualFocus);

  useEffect(()=>{save({profile,course,timesSCY,timesLCM,logs,xp,cl,missions,nextMeet});},[profile,course,timesSCY,timesLCM,logs,xp,cl,missions,nextMeet]);

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
  const taperPhase=taperDays===null?null:taperDays>14?"Build Phase":taperDays>7?"Taper":taperDays>3?"Peak":taperDays>0?"Race Week!":"MEET DAY! 🏁";
  const taperColor=taperDays===null?"#7aa8cc":taperDays>14?"#4db8ff":taperDays>7?"#ffd700":taperDays>3?"#ff9f43":"#00ffaa";

  function doLog(){
    const secs=parseTime(lTm);
    if(!secs||!lSt){notify("Pick an event and enter a time!","#ff6b6b");return;}
    const v=validateTime(lSt,secs,course);
    if(!v.valid){notify("⚠️ "+v.reason+" — continue anyway?","#ff9f43");}
    const tags=tagsP[lSt];
    const existing=times[lSt];
    const isPB=!existing||secs<existing;
    const isBonus=!!(tags&&secs<=tags.b);
    const isQual=!!(tags&&secs<=tags.q);
    if(isPB)setTimes(p=>({...p,[lSt]:secs}));
    else notify("Logged! Your best "+fmt(existing)+" is still faster 💪","#4db8ff");
    setLogs(p=>[{stroke:lSt,time:secs,date:lDt,meet:lMt,isPB,isBonus,course,id:Date.now()},...p]);
    setLTm("");setLMt("");setShowManual(false);
    setMissions(p=>({...p,[todayKey]:{...p[todayKey],log_today:true}}));
    if(isPB&&isBonus)addXP(150,"BONUS time! 🌟");
    else if(isPB&&isQual)addXP(100,"TAGS qualified! 🎯");
    else if(isPB)addXP(50,"New personal best! 🔥");
    else addXP(15,"Time logged 💧");
  }

  function handlePhoto(e){const f=e.target.files&&e.target.files[0];if(!f)return;setPFile(f);setPRes(null);setPErr("");setPStep("preview");const r=new FileReader();r.onload=ev=>setPPrev(ev.target.result);r.readAsDataURL(f);}
  function resetPhoto(){setPStep("idle");setPPrev(null);setPFile(null);setPRes(null);setPErr("");if(pRef.current)pRef.current.value="";}

  async function scanPhoto(){
    if(!pFile)return;
    setPStep("scanning");
    try{
      const b64=await new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(pFile);});
      const resp=await fetch("/api/scan",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-haiku-4-5",max_tokens:1400,
        system:`You are reading a swim meet results screenshot. Extract race times and splits.

RULES:
1. NEVER save a split as the final race time. A split is a partial time (e.g. first 50m of a 100m race).
2. If splits AND final time shown: save the final time, include splits array.
3. If ONLY splits shown with no final total: ADD them to get full time. Include in splits array.
4. Example: "40.22" and "45.24" with no total → time="1:25.46", splits=["40.22","45.24"]
5. Strip age group prefixes like "Boys 13&O" from event names.
6. Return ONLY valid JSON array, no other text.

Format: [{"event":"100 Fly","time":"1:25.46","meet":"Meet Name or null","date":"YYYY-MM-DD or null","splits":["40.22","45.24"]}]
If no times found return [].`,
        messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:pFile.type||"image/jpeg",data:b64}},{type:"text",text:"Extract all swim times. Add splits if no final total shown. Return only JSON array."}]}]
      })});
      const data=await resp.json();
      const raw=data.content&&data.content.find(x=>x.type==="text");
      const parsed=JSON.parse((raw?raw.text:"[]").replace(/```json|```/g,"").trim());
      if(!Array.isArray(parsed)||!parsed.length){setPErr("No times found. Try a clearer screenshot.");setPStep("preview");return;}
      const mapped=parsed.map(r=>{
        const normalized=normalizeEvent(r.event)||r.event;
        const secs=parseTime(r.time);
        const v=secs?validateTime(normalized,secs,course):{valid:true};
        return{...r,event:normalized,selected:v.valid,recognized:!!(TAGS_SCY[profile.gender]?.[profile.ageGroup]?.[normalized]||TAGS_LCM[profile.gender]?.[profile.ageGroup]?.[normalized]),flagged:!v.valid,flagReason:v.reason};
      });
      setPRes(mapped);setPStep("review");
    }catch(e){setPErr("Scan failed — try again.");setPStep("preview");}
  }

  function importPhotos(){
    const toImport=(pRes||[]).filter(r=>r.selected);
    if(!toImport.length){notify("Select at least one time","#ff6b6b");return;}
    let pbCount=0;
    toImport.forEach(r=>{
      const secs=parseTime(r.time);if(!secs)return;
      const existing=course==="SCY"?timesSCY[r.event]:timesLCM[r.event];
      const isPB=!existing||secs<existing;
      const tags=(course==="SCY"?TAGS_SCY:TAGS_LCM)[profile.gender]?.[profile.ageGroup]?.[r.event];
      const isBonus=!!(tags&&secs<=tags.b);
      if(isPB){course==="SCY"?setTimesSCY(p=>({...p,[r.event]:secs})):setTimesLCM(p=>({...p,[r.event]:secs}));pbCount++;}
      setLogs(p=>[{stroke:r.event,time:secs,date:r.date||todayKey,meet:r.meet||"Photo import",isPB,isBonus,course,splits:r.splits||null,id:Date.now()+Math.random()},...p]);
    });
    setXP(p=>p+toImport.length*15+pbCount*35);setPStep("done");
    notify("Imported "+toImport.length+" times ("+course+")! "+pbCount+" PBs! 🔥","#00ffaa");
  }

  async function askCoach(q){
    setAiLoad(true);setAiA("");
    const scyTimes=Object.keys(timesSCY).map(s=>{const t=timesSCY[s];const tg=TAGS_SCY[profile.gender]?.[profile.ageGroup]?.[s];if(!t)return null;return "SCY "+s+": "+fmt(t)+(tg?t<=tg.b?" ✅BONUS":t<=tg.q?" ✅QUALIFIED":" ("+((t-tg.q)).toFixed(2)+"s from cut)":"");}).filter(Boolean).join("\n");
    const lcmTimes=Object.keys(timesLCM).map(s=>{const t=timesLCM[s];const tg=TAGS_LCM[profile.gender]?.[profile.ageGroup]?.[s];if(!t)return null;return "LCM "+s+": "+fmt(t)+(tg?t<=tg.b?" ✅BONUS":t<=tg.q?" ✅QUALIFIED":" ("+((t-tg.q)).toFixed(2)+"s from cut)":"");}).filter(Boolean).join("\n");
    const recent=logs.slice(0,20).map(l=>l.date+" ["+l.course+"] "+l.stroke+": "+fmt(l.time)+(l.meet?" @ "+l.meet:"")+(l.isPB?" 🔥PB":"")).join("\n");
    const splitHistory=logs.filter(l=>l.splits&&l.splits.length>1).slice(0,8).map(l=>{const splits=l.splits.map((s,i)=>"Split "+(i+1)+": "+s+"s").join(", ");return l.date+" "+l.course+" "+l.stroke+" ("+fmt(l.time)+"): "+splits;}).join("\n");
    const progression=Object.keys({...timesSCY,...timesLCM}).map(s=>{const evLogs=logs.filter(l=>l.stroke===s).sort((a,b)=>new Date(a.date)-new Date(b.date));if(evLogs.length<2)return null;const first=evLogs[0];const last=evLogs[evLogs.length-1];return s+": "+fmt(first.time)+" → "+fmt(last.time)+" ("+(first.time>last.time?"⬇️ dropped ":"⬆️ gained ")+Math.abs(first.time-last.time).toFixed(2)+"s over "+evLogs.length+" swims)";}).filter(Boolean).join("\n");

    const sys=`You are Bob Bowman — Michael Phelps' legendary coach who guided him to 23 Olympic gold medals — now coaching ${profile.name}, age ${profile.age}, ${profile.gender==="boys"?"male":"female"}, ${profile.ageGroup} age group, Texas Age Group Swimming (TAGS).

PHELPS/BOWMAN CORE PRINCIPLES:
1. TURNS = FREE SPEED. Every wall is 0.5-1.0 seconds if done perfectly. 5+ dolphin kicks off every wall. Streamline locked before feet leave wall. Phelps practiced turns 20-30 minutes per session separately.
2. THE CATCH IS EVERYTHING. High elbow, early vertical forearm, feel the forearm stack before pulling. A dropped elbow = a dropped race. Bowman drilled this obsessively with Phelps for years.
3. NEGATIVE SPLITS WIN. Going out too fast in first half costs more than it gains. Phelps' 200 fly world record — he split even or negative every time. Study his splits.
4. DOLPHIN KICKS ARE YOUR 5TH STROKE. Phelps was timed as the fastest swimmer in the world UNDERWATER. He trained dolphin kicks as a completely separate event daily.
5. RACE SPLITS TELL THE FULL STORY. Analyze by phase: start+reaction (0-15m), first length, first turn, middle lengths, final turn, finish. Identify the EXACT 50 where time is lost.
6. TECHNIQUE BEFORE YARDAGE. One technical fix is worth more than 50,000 extra yards. Bowman: "We spent more time on mechanics than anyone else in the sport."
7. MENTAL PREP IS PHYSICAL PREP. Phelps visualized every race thousands of times before swimming it. He could tell you every split before he swam it.
8. ATTACK THE WORST EVENT. Phelps trained his weakest events as hard as his strongest. That's how you become complete.
9. CONSISTENCY OVER INTENSITY. Phelps trained 365 days a year for years. Missing one day meant someone else was gaining.

ATHLETE PROFILE:
${profile.name} | Age ${profile.age} | ${profile.gender==="boys"?"Male":"Female"} | ${profile.ageGroup} | Goal: ${profile.mode}

SCY TIMES vs TAGS:
${scyTimes||"No SCY times logged yet"}

LCM TIMES vs TAGS:
${lcmTimes||"No LCM times logged yet"}

SPLIT DATA BY RACE PHASE:
${splitHistory||"No split data yet — splits load automatically when Meet Mobile shows them"}

RECENT MEET HISTORY:
${recent||"No meets logged yet"}

TIME PROGRESSION THIS SEASON:
${progression||"Need more data for progression analysis"}

HOW TO RESPOND:
- Be SPECIFIC. Reference his actual times and actual gaps to TAGS by name.
- Analyze race by phase when splits available: start, first length, turn, back half, finish.
- Identify the SINGLE biggest opportunity for time improvement.
- Give the exact drill or technical fix — not generic advice.
- Include one specific workout set for THIS WEEK targeting his biggest weakness.
- Be direct and honest like Bob Bowman. Never sugar-coat. Always believe in the athlete.
- Under 300 words but every word counts.
- End with: "🏊 THIS WEEK'S PRIORITY:" + one specific action.`;

    try{
      const r=await fetch("/api/coach",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-haiku-4-5",max_tokens:1400,system:sys,messages:[{role:"user",content:q}]})});
      const d=await r.json();
      const block=d.content&&d.content.find(x=>x.type==="text");
      setAiA(block?block.text:"Coach unavailable — try again!");
      setMissions(p=>({...p,[todayKey]:{...p[todayKey],coach_question:true}}));
    }catch(e){setAiA("Error: "+e.message);}
    setAiLoad(false);
  }

  function toggleCL(id){setCl(p=>{const day=p[todayKey]||{};return{...p,[todayKey]:{...day,[id]:!day[id]}};});}
  function isCL(id){return !!(cl[todayKey]&&cl[todayKey][id]);}
  const strokeTips=STROKE_TIPS[skillStroke]||[];
  const todayTipIdx=dayOfYear%strokeTips.length;

  if(!setup)return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff",display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div style={{maxWidth:420,width:"100%"}}>
        <div style={{textAlign:"center",marginBottom:28}}><div style={{fontSize:80}}>🏊</div><h1 style={{fontSize:42,fontWeight:900,margin:"0 0 4px",background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>SwimIQ</h1><div style={{fontSize:11,color:"#4db8ff",letterSpacing:3,fontWeight:700}}>TRAIN SMART. SWIM FAST.</div></div>
        <Lbl>Your Name</Lbl><input placeholder="e.g. Christian" value={profile.name} onChange={e=>setProfile(p=>({...p,name:e.target.value}))} style={iStyle}/>
        <Lbl>Age</Lbl><input type="number" placeholder="13" value={profile.age} onChange={e=>setProfile(p=>({...p,age:e.target.value}))} style={iStyle}/>
        <Lbl>Gender</Lbl><div style={{display:"flex",gap:8,marginBottom:4}}>{["boys","girls"].map(g=><Chip key={g} on={profile.gender===g} onClick={()=>setProfile(p=>({...p,gender:g}))}>{g==="boys"?"👦 Boy":"👧 Girl"}</Chip>)}</div>
        <Lbl>Age Group</Lbl><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:4}}>{["10U","11-12","13-14","15-18","Adult"].map(g=><Chip key={g} on={profile.ageGroup===g} onClick={()=>setProfile(p=>({...p,ageGroup:g}))}>{g}</Chip>)}</div>
        <Lbl>Primary Season</Lbl><div style={{display:"flex",gap:6,marginBottom:4}}><Chip on={course==="SCY"} onClick={()=>setCourse("SCY")}>🏊 SCY</Chip><Chip on={course==="LCM"} onClick={()=>setCourse("LCM")}>🌊 LCM</Chip></div>
        <Lbl>Primary Goal</Lbl><div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:20}}>{[["competitive","🏆 Compete"],["tags","⭐ TAGS"],["recreational","🌊 Fitness"],["technique","🎯 Technique"]].map(item=><Chip key={item[0]} on={profile.mode===item[0]} onClick={()=>setProfile(p=>({...p,mode:item[0]}))}>{item[1]}</Chip>)}</div>
        <button onClick={()=>{if(profile.name.trim())setSetup(true);else notify("Enter your name first!","#ff6b6b");}} style={{width:"100%",padding:16,borderRadius:14,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:17,cursor:"pointer",fontFamily:"inherit"}}>Let's Go! 🚀</button>
      </div>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
    </div>
  );

  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(160deg,#080d18,#0a1628,#060e1a)",fontFamily:"'Exo 2','Segoe UI',sans-serif",color:"#e8f4ff"}}>
      <style>{"@import url('https://fonts.googleapis.com/css2?family=Exo+2:wght@400;700;800;900&display=swap');*{box-sizing:border-box;}"}</style>
      {toast&&<div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",background:"#0d1b2a",border:"1.5px solid "+toast.color,color:toast.color,padding:"10px 22px",borderRadius:12,fontWeight:700,zIndex:9999,fontSize:13,whiteSpace:"nowrap",maxWidth:"90vw",textAlign:"center"}}>{toast.msg}</div>}

      {/* HEADER */}
      <div style={{padding:"12px 16px 0",position:"sticky",top:0,background:"rgba(8,13,24,0.97)",backdropFilter:"blur(12px)",zIndex:100,borderBottom:"1px solid rgba(77,184,255,0.08)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{fontSize:26}}>🏊</div>
            <div>
              <div style={{fontSize:19,fontWeight:900,background:"linear-gradient(90deg,#fff,#4db8ff,#00ffaa)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1}}>SwimIQ</div>
              <div style={{fontSize:9,color:"#7aa8cc"}}>Hey {profile.name} 👋 · <span onClick={()=>{if(window.confirm("Reset profile? This clears all data.")){localStorage.removeItem(LS);window.location.reload();}}} style={{color:"#ff6b6b",cursor:"pointer",textDecoration:"underline"}}>Reset</span></div>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
            <div style={{display:"flex",gap:4}}>
              {["SCY","LCM"].map(c=><button key={c} onClick={()=>setCourse(c)} style={{padding:"4px 12px",borderRadius:8,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:course===c?"#1a5fff":"rgba(255,255,255,0.1)",color:course===c?"#fff":"#7aa8cc"}}>{c}</button>)}
            </div>
            <div style={{fontSize:10,color:"#4db8ff",fontWeight:700}}>Lvl {level} · {lvlName} · {xp}XP</div>
          </div>
        </div>
        <div style={{display:"flex",gap:5,marginBottom:8}}>
          {[{v:Object.keys(times).length,l:"Times"},{v:qualified.length,l:"TAGS ✓",c:"#00ffaa"},{v:earned.length,l:"Badges",c:"#ffd700"},{v:streak,l:"Streak 🔥",c:"#ff9f43"},{v:missionsDone,l:"Missions",c:"#a78bfa"}].map(s=>(
            <div key={s.l} style={{flex:1,background:"rgba(255,255,255,0.04)",borderRadius:8,padding:"5px 3px",textAlign:"center",border:"1px solid rgba(77,184,255,0.1)"}}>
              <div style={{fontSize:14,fontWeight:900,color:s.c||"#4db8ff"}}>{s.v}</div>
              <div style={{fontSize:7,color:"#7aa8cc"}}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:4,overflowX:"auto",paddingBottom:8}}>
          {TABS.map(t=><button key={t.id} onClick={()=>setTab(t.id)} style={{flexShrink:0,padding:"7px 10px",borderRadius:9,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",background:tab===t.id?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:tab===t.id?"#fff":"#7aa8cc"}}>{t.icon} {t.l}</button>)}
        </div>
      </div>

      <div style={{padding:"12px 16px 100px"}}>

        {/* ── HOME ── */}
        {tab==="home"&&<>
          {/* Meet countdown */}
          <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))",border:"1px solid rgba(77,184,255,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#4db8ff",fontWeight:700,marginBottom:6}}>🏁 NEXT MEET COUNTDOWN</div>
            <input type="date" value={nextMeet} onChange={e=>setNextMeet(e.target.value)} style={{...iStyle,marginBottom:0,fontSize:12,padding:"6px 10px"}}/>
            {taperDays!==null&&<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:10}}>
              <div style={{fontSize:11,color:"#7aa8cc"}}>Phase: <span style={{color:taperColor,fontWeight:700}}>{taperPhase}</span></div>
              <div style={{fontSize:26,fontWeight:900,color:taperColor}}>{taperDays>0?taperDays+" days":"🎉 TODAY!"}</div>
            </div>}
          </Card>

          {/* Missions */}
          <Card style={{marginBottom:12}}>
            <div style={{fontSize:11,color:"#a78bfa",fontWeight:700,marginBottom:6}}>⚡ TODAY'S MISSIONS — {missionsDone}/{DAILY_MISSIONS.length} done</div>
            <PBar value={missionsDone} max={DAILY_MISSIONS.length} color="linear-gradient(90deg,#a78bfa,#4db8ff)"/>
            <div style={{marginTop:10}}>
              {DAILY_MISSIONS.map(m=>{const done=!!todayMissions[m.id];return(
                <div key={m.id} onClick={()=>{if(!done){setMissions(p=>({...p,[todayKey]:{...p[todayKey],[m.id]:true}}));addXP(m.xp,m.text+" ✓");}}} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",borderRadius:9,marginBottom:5,cursor:done?"default":"pointer",background:done?"rgba(0,255,170,0.06)":"rgba(255,255,255,0.03)",border:"1px solid "+(done?"rgba(0,255,170,0.2)":"rgba(255,255,255,0.06)")}}>
                  <div style={{width:20,height:20,borderRadius:"50%",background:done?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#000",fontWeight:900,flexShrink:0}}>{done?"✓":""}</div>
                  <div style={{flex:1,fontSize:12,color:done?"#7aa8cc":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{m.icon} {m.text}</div>
                  <div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>+{m.xp}</div>
                </div>
              );})}
            </div>
          </Card>

          {/* Badges earned */}
          {earned.length>0&&<Card style={{marginBottom:12}}>
            <div style={{fontSize:11,color:"#ffd700",fontWeight:700,marginBottom:8}}>🏅 BADGES — {earned.length}/{BADGES_DEF.length}</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {earned.map(b=><div key={b.id} style={{background:"rgba(0,100,255,0.12)",borderRadius:10,padding:"8px 12px",border:"1px solid rgba(77,184,255,0.2)",textAlign:"center",fontSize:12}}>
                <div style={{fontSize:20}}>{b.icon}</div>
                <div style={{fontSize:10,fontWeight:800,marginTop:2}}>{b.name}</div>
              </div>)}
            </div>
          </Card>}

          {/* TAGS events */}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontSize:11,color:"#4db8ff",fontWeight:700}}>🏊 TAGS — {course}</div>
            <div style={{fontSize:10,color:"#7aa8cc"}}>{qualified.length}/{tagsKeys.length} qualified</div>
          </div>
          {tagsKeys.length===0
            ?<Card style={{textAlign:"center",padding:"40px 20px"}}><div style={{fontSize:48}}>🏊</div><div style={{color:"#7aa8cc",marginTop:10}}>Tap 📸 Log to scan your meet results!</div></Card>
            :tagsKeys.map(s=>{
              const myT=times[s];const tags=tagsP[s];
              const sc=getStatusColor(myT,tags?.q,tags?.b);
              const sl=getStatusLabel(myT,tags?.q,tags?.b);
              const pval=myT&&tags?Math.max(5,Math.min(100,100-(((myT-tags.q)/tags.q)*400))):0;
              // Progression: show improvement if exists
              const evLogs=logs.filter(l=>l.stroke===s&&l.course===course).sort((a,b)=>new Date(a.date)-new Date(b.date));
              const improvement=evLogs.length>=2?(evLogs[0].time-evLogs[evLogs.length-1].time):null;
              return(<div key={s} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid "+(myT&&tags&&myT<=tags.q?"rgba(0,255,170,0.2)":"rgba(77,184,255,0.08)")}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                  <div>
                    <div style={{fontWeight:800,fontSize:14}}>{s}</div>
                    <div style={{fontSize:10,color:"#7aa8cc",marginTop:2}}>Cut: <span style={{color:"#4db8ff",fontWeight:700}}>{fmt(tags?.q)}</span> · Bonus: <span style={{color:"#ffd700",fontWeight:700}}>{fmt(tags?.b)}</span></div>
                    {improvement!==null&&improvement>0&&<div style={{fontSize:10,color:"#00ffaa",marginTop:2}}>⬇️ -{improvement.toFixed(2)}s this season</div>}
                  </div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:20,fontWeight:900,color:myT?sc:"#2a4a6a"}}>{myT?fmt(myT):"—"}</div>
                    {sl&&<div style={{fontSize:10,color:sc,fontWeight:700}}>{sl}</div>}
                  </div>
                </div>
                <PBar value={pval} max={100} color={myT&&tags&&myT<=tags.b?"#ffd700":myT&&tags&&myT<=tags.q?"#00ffaa":"linear-gradient(90deg,#1a5fff,#4db8ff)"}/>
              </div>);
            })
          }

          {/* Recent sessions */}
          {logs.filter(l=>l.course===course).length>0&&<>
            <div style={{fontSize:11,color:"#4db8ff",fontWeight:700,marginBottom:8,marginTop:4}}>📋 RECENT SESSIONS — {course}</div>
            {logs.filter(l=>l.course===course).slice(0,5).map(e=>(
              <div key={e.id} style={{background:"rgba(255,255,255,0.03)",borderRadius:10,padding:"10px 14px",marginBottom:6,border:"1px solid rgba(77,184,255,0.07)",display:"flex",justifyContent:"space-between"}}>
                <div><div style={{fontWeight:800,fontSize:13}}>{e.stroke}</div><div style={{fontSize:10,color:"#7aa8cc"}}>{e.date}{e.meet?" · "+e.meet:""}</div></div>
                <div style={{textAlign:"right"}}><div style={{fontSize:17,fontWeight:900,color:e.isBonus?"#ffd700":"#4db8ff"}}>{fmt(e.time)}</div>{e.isPB&&<div style={{fontSize:9,color:"#ff9f43",fontWeight:700}}>⚡ PB</div>}</div>
              </div>
            ))}
          </>}
        </>}

        {/* ── LOG ── */}
        {tab==="log"&&<>
          <div style={{display:"flex",gap:6,marginBottom:12}}>
            {["SCY","LCM"].map(c=><button key={c} onClick={()=>setCourse(c)} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,fontWeight:700,fontFamily:"inherit",background:course===c?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.07)",color:course===c?"#fff":"#7aa8cc"}}>{c==="SCY"?"🏊 Short Course (SCY)":"🌊 Long Course (LCM)"}</button>)}
          </div>

          {/* Photo scan */}
          <Card style={{border:"1px solid rgba(0,255,170,0.2)",background:"linear-gradient(135deg,rgba(0,255,170,0.04),rgba(0,100,255,0.06))",marginBottom:12}}>
            <div style={{fontSize:13,fontWeight:900,color:"#00ffaa",marginBottom:4}}>📸 SCAN MEET RESULTS — {course}</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>AI reads screenshot, detects splits vs full times, maps events automatically</div>
            {pStep==="idle"&&<><input ref={pRef} type="file" accept="image/*" onChange={handlePhoto} style={{display:"none"}} id="pIn"/><label htmlFor="pIn" style={{display:"block",width:"100%",padding:"14px 0",borderRadius:12,border:"2px dashed rgba(0,255,170,0.4)",textAlign:"center",cursor:"pointer",color:"#00ffaa",fontWeight:800,fontSize:14}}>📂 Tap to upload screenshot</label></>}
            {pStep==="preview"&&pPrev&&<>
              <img src={pPrev} alt="p" style={{width:"100%",borderRadius:10,marginBottom:10,maxHeight:200,objectFit:"cover"}}/>
              {pErr&&<div style={{color:"#ff6b6b",fontSize:12,marginBottom:8}}>⚠️ {pErr}</div>}
              <div style={{display:"flex",gap:8}}>
                <button onClick={scanPhoto} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>🔍 Scan for Times</button>
                <button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>✕</button>
              </div>
            </>}
            {pStep==="scanning"&&<div style={{textAlign:"center",padding:"20px 0"}}><div style={{fontSize:36}}>🧠</div><div style={{color:"#00ffaa",fontWeight:800,marginTop:6}}>Reading results...</div></div>}
            {pStep==="review"&&pRes&&<>
              <div style={{fontSize:12,fontWeight:800,color:"#00ffaa",marginBottom:8}}>Found {pRes.length} times — review and confirm:</div>
              {pRes.map((r,i)=>(
                <div key={i} style={{borderRadius:10,marginBottom:8,overflow:"hidden",border:"1px solid "+(r.flagged?"rgba(255,100,100,0.4)":r.selected?"rgba(0,255,170,0.3)":"rgba(255,255,255,0.07)")}}>
                  <div onClick={()=>setPRes(p=>p.map((x,j)=>j===i?{...x,selected:!x.selected}:x))} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",cursor:"pointer",background:r.flagged?"rgba(255,100,100,0.07)":r.selected?"rgba(0,255,170,0.07)":"rgba(255,255,255,0.03)"}}>
                    <div style={{width:20,height:20,borderRadius:"50%",background:r.flagged?"#ff6b6b":r.selected?"#00ffaa":"rgba(255,255,255,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,color:"#000",fontWeight:900,flexShrink:0}}>{r.flagged?"⚠":r.selected?"✓":""}</div>
                    <div style={{flex:1}}>
                      <div style={{fontWeight:800,fontSize:13}}>{r.event}</div>
                      <div style={{fontSize:10,color:"#7aa8cc"}}>{course}{r.meet?" · "+r.meet:""}{r.date?" · "+r.date:""}</div>
                      {r.splits&&r.splits.length>0&&<div style={{fontSize:9,color:"#a78bfa",marginTop:2}}>Splits: {r.splits.join(" / ")}</div>}
                    </div>
                    <div style={{fontSize:18,fontWeight:900,color:r.flagged?"#ff6b6b":r.recognized?"#4db8ff":"#7aa8cc"}}>{r.time}</div>
                  </div>
                  {r.flagged&&<div style={{padding:"6px 12px 10px",fontSize:11,color:"#ff9f43"}}>⚠️ {r.flagReason} — tap to override and import anyway</div>}
                </div>
              ))}
              <div style={{display:"flex",gap:8,marginTop:4}}>
                <button onClick={importPhotos} style={{flex:1,padding:"12px 0",borderRadius:10,border:"none",background:"linear-gradient(135deg,#00cc88,#0099ff)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit"}}>⬇️ Import Selected</button>
                <button onClick={resetPhoto} style={{padding:"12px 14px",borderRadius:10,border:"1px solid rgba(255,255,255,0.1)",background:"rgba(255,255,255,0.05)",color:"#7aa8cc",cursor:"pointer",fontFamily:"inherit"}}>Cancel</button>
              </div>
            </>}
            {pStep==="done"&&<div style={{textAlign:"center",padding:"16px 0"}}>
              <div style={{fontSize:32}}>🎉</div>
              <div style={{color:"#00ffaa",fontWeight:900,marginBottom:12}}>Times imported to {course}!</div>
              <button onClick={resetPhoto} style={{padding:"10px 24px",borderRadius:10,border:"1px solid rgba(0,255,170,0.3)",background:"rgba(0,255,170,0.08)",color:"#00ffaa",fontWeight:800,cursor:"pointer",fontFamily:"inherit"}}>Scan Another</button>
            </div>}
          </Card>

          {/* Manual log — collapsible backup */}
          <div onClick={()=>setShowManual(p=>!p)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 16px",borderRadius:12,border:"1px solid rgba(77,184,255,0.15)",background:"rgba(255,255,255,0.03)",cursor:"pointer",marginBottom:showManual?0:12}}>
            <div style={{fontSize:12,fontWeight:700,color:"#7aa8cc"}}>✏️ Enter time manually (backup)</div>
            <div style={{fontSize:11,color:"#4db8ff"}}>{showManual?"▲ Hide":"▼ Show"}</div>
          </div>
          {showManual&&<Card style={{borderRadius:"0 0 14px 14px",marginTop:0}}>
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
              <div style={{flex:1}}><Lbl>Meet (optional)</Lbl><input value={lMt} onChange={e=>setLMt(e.target.value)} placeholder="Meet name" style={iStyle}/></div>
            </div>
            <button onClick={doLog} style={{width:"100%",padding:14,borderRadius:12,border:"none",background:"linear-gradient(135deg,#1a5fff,#0099ff)",color:"#fff",fontWeight:900,fontSize:16,cursor:"pointer",fontFamily:"inherit"}}>💾 Save Time — {course}</button>
          </Card>}
        </>}

        {/* ── TRAIN ── */}
        {tab==="train"&&<>
          <div style={{display:"flex",gap:6,marginBottom:14}}>
            {[["dryland","💪 Dryland"],["pool","🏊 Pool"]].map(item=><button key={item[0]} onClick={()=>setTrainView(item[0])} style={{flex:1,padding:"9px 0",borderRadius:10,border:"none",cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"inherit",background:trainView===item[0]?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.05)",color:trainView===item[0]?"#fff":"#7aa8cc"}}>{item[1]}</button>)}
          </div>

          {trainView==="dryland"&&<>
            <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,200,100,0.07))",border:"1px solid rgba(0,255,170,0.15)",marginBottom:14}}>
              <div style={{fontSize:11,color:"#00ffaa",fontWeight:700}}>TODAY'S DRYLAND — Age-safe for {profile.name}, {age} yrs</div>
              <div style={{fontSize:11,color:"#7aa8cc",marginTop:4,lineHeight:1.5}}>These exercises work for ALL strokes — core, shoulders, and kick power benefit every event. Check off each one as you finish!</div>
              {streak>0&&<div style={{fontSize:11,color:"#ffd700",fontWeight:700,marginTop:4}}>🔥 {streak}-day streak!</div>}
            </Card>
            {EXERCISES.filter(e=>e.ageMin<=age).map(ex=>{
              const done=isCL(ex.id);const open=exOpen===ex.id;
              return(<div key={ex.id} style={{borderRadius:12,marginBottom:8,overflow:"hidden",border:"1px solid "+(done?"rgba(0,255,170,0.3)":"rgba(77,184,255,0.1)"),background:done?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.03)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",cursor:"pointer"}} onClick={()=>setExOpen(open?null:ex.id)}>
                  <div onClick={e=>{e.stopPropagation();toggleCL(ex.id);if(!done)addXP(10,"Exercise done! 💪");}} style={{width:24,height:24,borderRadius:"50%",flexShrink:0,background:done?"#00ffaa":"rgba(255,255,255,0.08)",border:"2px solid "+(done?"#00ffaa":"rgba(255,255,255,0.15)"),display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,color:"#000",fontWeight:900,cursor:"pointer"}}>{done?"✓":""}</div>
                  <div style={{flex:1}}>
                    <div style={{fontWeight:800,fontSize:13,color:done?"#00ffaa":"#e8f4ff",textDecoration:done?"line-through":"none"}}>{ex.name}</div>
                    <div style={{fontSize:10,color:"#7aa8cc",marginTop:1}}>{ex.sets} sets · {ex.reps}</div>
                  </div>
                  <div style={{fontSize:11,color:"#4db8ff"}}>{open?"▲":"▼"}</div>
                </div>
                {open&&<div style={{padding:"0 14px 14px"}}>
                  <div style={{fontSize:12,color:"#d0e8ff",lineHeight:1.65,padding:"10px 12px",background:"rgba(0,100,255,0.08)",borderRadius:8,marginBottom:8}}>💡 {ex.cue}</div>
                  <div style={{fontSize:11,color:"#ff8888",padding:"8px 12px",borderRadius:8,background:"rgba(255,0,0,0.07)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span>YouTube: <strong>{ex.search}</strong></span>
                    <button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText(ex.search).catch(()=>{})} style={{fontSize:10,padding:"3px 8px",borderRadius:5,border:"1px solid rgba(255,100,100,0.3)",background:"rgba(255,100,100,0.1)",color:"#ff8888",cursor:"pointer",fontFamily:"inherit"}}>Copy</button>
                  </div>
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
                  <div style={{fontSize:11,color:"#7aa8cc",marginTop:2}}>{workout.yards.toLocaleString()} yards · 🎯 {workout.targetEvent}</div>
                </div>
                <div style={{textAlign:"center",padding:"8px 12px",borderRadius:10,background:"rgba(255,255,255,0.05)"}}>
                  <div style={{fontSize:9,color:"#7aa8cc",marginBottom:2}}>INTENSITY</div>
                  <div style={{fontSize:12,fontWeight:900,color:workout.intensity==="Very High"?"#ff6b6b":workout.intensity==="Moderate-High"?"#ff9f43":workout.intensity==="Easy"?"#00ffaa":"#ffd700"}}>{workout.intensity}</div>
                </div>
              </div>
              <div style={{padding:"8px 10px",borderRadius:8,background:"rgba(255,215,0,0.07)",border:"1px solid rgba(255,215,0,0.15)",fontSize:11,color:"#ffd700",lineHeight:1.6}}>💡 {workout.tip}</div>
            </Card>
            <Card style={{marginBottom:14}}>
              <div style={{fontSize:11,color:"#a78bfa",fontWeight:700,marginBottom:8}}>🎯 FOCUS EVENT</div>
              <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                <button onClick={()=>setManualFocus(null)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:!manualFocus?"linear-gradient(135deg,#1a5fff,#0099ff)":"rgba(255,255,255,0.07)",color:!manualFocus?"#fff":"#7aa8cc"}}>🎯 Auto</button>
                {tagsKeys.map(ev=><button key={ev} onClick={()=>setManualFocus(ev)} style={{padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontWeight:700,fontSize:11,fontFamily:"inherit",background:manualFocus===ev?"linear-gradient(135deg,#7c3aed,#a78bfa)":"rgba(255,255,255,0.07)",color:manualFocus===ev?"#fff":"#7aa8cc"}}>{ev}</button>)}
              </div>
            </Card>
            {workout.sets.map((set,j)=>{const isWU=j===0;const isCD=j===workout.sets.length-1;return(
              <div key={j} style={{display:"flex",gap:12,padding:"12px 14px",borderRadius:10,marginBottom:8,background:isWU?"rgba(0,100,255,0.07)":isCD?"rgba(0,255,170,0.04)":"rgba(255,255,255,0.04)",border:"1px solid "+(isWU?"rgba(77,184,255,0.2)":isCD?"rgba(0,255,170,0.15)":"rgba(255,255,255,0.08)")}}>
                <div style={{fontSize:12,fontWeight:900,color:isWU?"#4db8ff":isCD?"#00ffaa":"#ffd700",flexShrink:0,minWidth:22}}>{isWU?"WU":isCD?"CD":j+"."}</div>
                <div style={{fontSize:13,color:"#d0e8ff",lineHeight:1.65}}>{set}</div>
              </div>
            );})}
            <div style={{textAlign:"center",marginTop:10,padding:"10px",borderRadius:10,background:"rgba(255,255,255,0.03)"}}>
              <div style={{fontSize:10,color:"#7aa8cc"}}>Tomorrow: <span style={{color:"#4db8ff",fontWeight:700}}>{workout.nextWorkout}</span></div>
            </div>
          </>}
        </>}

        {/* ── SKILLS ── */}
        {tab==="skills"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(251,191,36,0.08),rgba(26,95,255,0.08))",border:"1px solid rgba(251,191,36,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#fbbf24",fontWeight:700,marginBottom:4}}>🎬 OLYMPIC COACHING LIBRARY</div>
            <div style={{fontSize:12,color:"#7aa8cc"}}>Technique tips from world champions. New tip featured daily. Tap a stroke to explore all tips.</div>
          </Card>
          <div style={{display:"flex",gap:6,marginBottom:12}}>
            {[["library","📚 All Tips"],["daily","⭐ Today"],["channels","📺 Channels"]].map(item=><button key={item[0]} onClick={()=>setSkillView(item[0])} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",background:skillView===item[0]?"linear-gradient(135deg,#b45309,#f59e0b)":"rgba(255,255,255,0.05)",color:skillView===item[0]?"#fff":"#7aa8cc"}}>{item[1]}</button>)}
          </div>
          <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:14}}>
            {Object.keys(STROKE_TIPS).map(sk=><Chip key={sk} on={skillStroke===sk} onClick={()=>setSkillStroke(sk)} color="#7c3aed">{sk.charAt(0).toUpperCase()+sk.slice(1)}</Chip>)}
          </div>
          {skillView==="daily"&&<Card style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(251,191,36,0.25)",padding:20,marginBottom:12}}>
            <div style={{fontSize:10,color:"#fbbf24",fontWeight:700,marginBottom:8}}>⭐ TODAY'S TIP — {skillStroke.toUpperCase()}</div>
            <div style={{fontSize:15,color:"#fff",lineHeight:1.8,fontWeight:600}}>{strokeTips[todayTipIdx]}</div>
            <div style={{fontSize:10,color:"#7aa8cc",marginTop:12}}>Tip {todayTipIdx+1} of {strokeTips.length} · New tip tomorrow</div>
          </Card>}
          {skillView==="library"&&strokeTips.map((tip,i)=>{const isToday=i===todayTipIdx;return(
            <div key={i} style={{background:isToday?"rgba(251,191,36,0.07)":"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px 16px",marginBottom:8,border:"1px solid "+(isToday?"rgba(251,191,36,0.3)":"rgba(251,191,36,0.08)"),display:"flex",gap:10}}>
              <div style={{flexShrink:0}}>{isToday?<div style={{fontSize:16}}>⭐</div>:<div style={{width:22,height:22,borderRadius:"50%",background:"rgba(251,191,36,0.12)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#fbbf24",fontWeight:800}}>{i+1}</div>}</div>
              <div style={{fontSize:13,color:isToday?"#ffd700":"#d0e8ff",lineHeight:1.7}}>{tip}</div>
            </div>
          );})}
          {skillView==="channels"&&CHANNELS.map(ch=>(
            <div key={ch.name} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"14px",marginBottom:8,border:"1px solid rgba(251,191,36,0.12)"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10,marginBottom:8}}><div style={{fontSize:22,flexShrink:0}}>{ch.icon}</div><div><div style={{fontWeight:900,fontSize:14,color:"#fbbf24"}}>{ch.name}</div><div style={{fontSize:11,color:"#7aa8cc",marginTop:3}}>{ch.desc}</div></div></div>
              <div style={{display:"flex",alignItems:"center",gap:8,padding:"7px 10px",borderRadius:8,background:"rgba(251,191,36,0.07)"}}>
                <div style={{fontSize:10,color:"#7aa8cc",flex:1}}>{ch.url}</div>
                <button onClick={()=>navigator.clipboard&&navigator.clipboard.writeText("https://"+ch.url).catch(()=>{})} style={{fontSize:10,padding:"4px 10px",borderRadius:6,border:"1px solid rgba(251,191,36,0.3)",background:"rgba(251,191,36,0.15)",color:"#fbbf24",cursor:"pointer",fontFamily:"inherit",fontWeight:700}}>Copy</button>
              </div>
            </div>
          ))}
        </>}

        {/* ── COACH ── */}
        {tab==="coach"&&<>
          <Card style={{marginBottom:12,border:"1px solid rgba(167,139,250,0.3)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#a78bfa",marginBottom:4}}>⚡ RACE SPLIT ANALYZER</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:10}}>Enter your 50-yard splits to get your Race IQ score and know exactly where you're losing time.</div>
            <Lbl>Event</Lbl>
            <select value={splitEvent} onChange={e=>{setSplitEvent(e.target.value);setSplitResult(null);setSplitTimes(["","","","","","","","",""]);}} style={{...iStyle,cursor:"pointer"}}>
              <option value="">Select event</option>
              {["100 Free","200 Free","500 Free","100 Back","200 Back","100 Breast","200 Breast","50 Fly","100 Fly","200 Fly","200 IM","400 IM"].map(e=><option key={e}>{e}</option>)}
            </select>
            {splitEvent&&<>
              {times[splitEvent]&&<div style={{marginBottom:10,padding:"10px 12px",borderRadius:10,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.2)",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>YOUR BEST — {course}</div><div style={{fontSize:18,fontWeight:900,color:"#fff"}}>{fmt(times[splitEvent])}</div></div>
                <button onClick={()=>{
                  const n=splitEvent.includes("100")?2:splitEvent.includes("200")?4:10;
                  const lt=times[splitEvent];
                  const pacing=n===2?[0.495,0.505]:n===4?[0.24,0.255,0.255,0.25]:[0.095,0.105,0.105,0.105,0.103,0.102,0.102,0.102,0.103,0.078];
                  const est=pacing.slice(0,n).map(p=>(lt*p).toFixed(2));
                  const sum=est.reduce((a,b)=>a+parseFloat(b),0);const scale=lt/sum;
                  const norm=est.map(t=>(parseFloat(t)*scale).toFixed(2));
                  const nt=["","","","","","","","",""];norm.forEach((t,i)=>{nt[i]=t;});
                  setSplitTimes(nt);notify("Splits estimated!","#a78bfa");
                }} style={{padding:"9px 14px",borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:800,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>✨ Auto-Fill</button>
              </div>}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:10}}>
                {Array.from({length:splitEvent.includes("100")?2:splitEvent.includes("200")?4:10}).map((_,i)=>(
                  <div key={i}>
                    <div style={{fontSize:9,color:"#7aa8cc",marginBottom:2}}>Split {i+1} ({(i+1)*50}{course==="LCM"?"m":"y"})</div>
                    <input value={splitTimes[i]} onChange={e=>setSplitTimes(p=>{const n=[...p];n[i]=e.target.value;return n;})} placeholder="27.0" style={{...iStyle,marginBottom:0,fontSize:15,fontWeight:700}}/>
                  </div>
                ))}
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
                const slowestIdx=parsed.indexOf(slowest);
                setSplitResult({parsed,total,isNeg,drop,fastest,slowest,iq,slowestIdx});
                addXP(30,"Race analyzed! 🔬");
              }} style={{width:"100%",padding:12,borderRadius:10,border:"none",background:"linear-gradient(135deg,#7c3aed,#a78bfa)",color:"#fff",fontWeight:900,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Analyze Race 🔬</button>
              {splitResult&&<div style={{marginTop:14,padding:16,borderRadius:12,background:"rgba(167,139,250,0.08)",border:"1px solid rgba(167,139,250,0.25)"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                  <div><div style={{fontSize:10,color:"#a78bfa",fontWeight:700}}>RACE IQ</div><div style={{fontSize:40,fontWeight:900,color:splitResult.iq>=80?"#00ffaa":splitResult.iq>=60?"#ffd700":"#ff6b6b"}}>{splitResult.iq}</div></div>
                  <div style={{textAlign:"right"}}>
                    <div style={{fontSize:13,fontWeight:800,color:splitResult.isNeg?"#00ffaa":"#ff9f43"}}>{splitResult.isNeg?"✅ Negative Split":"⚠️ Positive Split"}</div>
                    <div style={{fontSize:11,color:"#7aa8cc"}}>Total: {fmt(splitResult.total)}</div>
                    <div style={{fontSize:11,color:"#ff6b6b"}}>Slowest: Split {splitResult.slowestIdx+1}</div>
                  </div>
                </div>
                {splitResult.parsed.map((split,i)=>{const isSlowst=split===splitResult.slowest;const isFast=split===splitResult.fastest;const w=Math.max(20,100-((split-splitResult.fastest)/(splitResult.slowest-splitResult.fastest||1))*60);return(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                    <div style={{fontSize:10,color:"#7aa8cc",width:50,flexShrink:0}}>Split {i+1}</div>
                    <div style={{flex:1,height:8,background:"rgba(255,255,255,0.06)",borderRadius:4}}><div style={{width:w+"%",height:"100%",borderRadius:4,background:isFast?"#00ffaa":isSlowst?"#ff6b6b":"#a78bfa"}}/></div>
                    <div style={{fontSize:12,fontWeight:800,color:isFast?"#00ffaa":isSlowst?"#ff6b6b":"#d0e8ff",width:45,textAlign:"right"}}>{split.toFixed(2)}</div>
                  </div>
                );})}
                <div style={{padding:"10px 12px",borderRadius:10,background:"rgba(0,0,0,0.2)",fontSize:12,color:"#d0e8ff",lineHeight:1.7,marginTop:8}}>
                  {splitResult.isNeg?"🌟 Elite pacing! Second half faster — this is exactly what champions do.":"💡 Went out too fast. Hold back 5-10% in the first half. Time saved early more than compensates in the back half."}{!splitResult.isNeg&&splitResult.slowestIdx>0?" Split "+(splitResult.slowestIdx+1)+" is where you started dying. That's your target.":""}
                </div>
                <button onClick={()=>askCoach("Analyze my "+splitEvent+" race splits: "+splitResult.parsed.map((s,i)=>"Split "+(i+1)+": "+s.toFixed(2)+"s").join(", ")+". Total: "+fmt(splitResult.total)+". Race IQ: "+splitResult.iq+". I "+(splitResult.isNeg?"negative split":"positive split")+". Slowest was Split "+(splitResult.slowestIdx+1)+". Tell me exactly what is happening technically in each phase and the specific fix for my weakest phase.")} style={{width:"100%",padding:10,borderRadius:10,border:"1px solid rgba(77,184,255,0.3)",background:"rgba(77,184,255,0.08)",color:"#4db8ff",fontWeight:800,cursor:"pointer",fontFamily:"inherit",marginTop:10,fontSize:12}}>🤖 Get Coach analysis of these splits →</button>
              </div>}
            </>}
          </Card>
          <Card style={{background:"rgba(0,100,255,0.07)"}}>
            <div style={{fontSize:13,fontWeight:800,color:"#4db8ff",marginBottom:2}}>🤖 AI COACH — Bob Bowman Mode</div>
            <div style={{fontSize:11,color:"#7aa8cc",marginBottom:12}}>Trained Phelps to 23 Olympic gold medals. Knows your full history, both courses, all splits.</div>
            {["Analyze ALL my times — where am I losing the most time and what do I fix first?","Break down my race by phase: start, first length, turns, back half, finish","What are my 3 biggest technical weaknesses? Give me the exact drills.","How close am I to TAGS in every event? Fastest path to qualify?","Build me a 4-week plan to drop the most time before my next meet","What should my turns and underwater dolphins look like exactly?","Design my race-day warm-up, mental routine, and race strategy"].map(q=>(
              <button key={q} onClick={()=>askCoach(q)} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(255,255,255,0.04)",border:"1px solid rgba(77,184,255,0.12)",color:"#d0e8ff",borderRadius:10,padding:"11px 14px",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>{q}</button>
            ))}
            <div style={{display:"flex",gap:8,marginTop:8}}>
              <input value={aiQ} onChange={e=>setAiQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&aiQ&&askCoach(aiQ)} placeholder="Ask anything..." style={{...iStyle,flex:1,margin:0}}/>
              <button onClick={()=>aiQ&&askCoach(aiQ)} style={{background:"linear-gradient(135deg,#1a5fff,#0099ff)",border:"none",color:"#fff",borderRadius:10,padding:"10px 18px",fontWeight:800,cursor:"pointer",fontSize:14,fontFamily:"inherit"}}>Ask</button>
            </div>
            {aiLoad&&<div style={{textAlign:"center",color:"#4db8ff",fontSize:14,marginTop:20,padding:"20px 0"}}>🧠 Coach analyzing your complete history...</div>}
            {aiA&&<div style={{marginTop:14,background:"rgba(0,100,255,0.06)",borderRadius:14,padding:18,border:"1px solid rgba(77,184,255,0.2)",fontSize:14,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#d0e8ff"}}>{aiA}</div>}
          </Card>
        </>}

        {/* ── FUEL ── */}
        {tab==="fuel"&&<>
          <Card style={{background:"linear-gradient(135deg,rgba(0,200,100,0.08),rgba(26,95,255,0.08))",border:"1px solid rgba(0,255,170,0.2)",marginBottom:12}}>
            <div style={{fontSize:11,color:"#00ffaa",fontWeight:700,marginBottom:4}}>🥗 FUEL LIKE AN OLYMPIAN</div>
            <div style={{fontSize:12,color:"#7aa8cc"}}>Evidence-based nutrition for competitive swimmers. Tap any tip for full details and real meal examples.</div>
          </Card>
          <div style={{display:"flex",gap:5,marginBottom:14}}>
            {NUTRITION.map((cat,i)=><button key={i} onClick={()=>{setNutrCat(i);setNutrExpanded(null);}} style={{flex:1,padding:"9px 4px",borderRadius:10,border:"none",cursor:"pointer",fontSize:11,fontWeight:700,fontFamily:"inherit",background:nutrCat===i?"linear-gradient(135deg,#00cc88,#0099ff)":"rgba(255,255,255,0.05)",color:nutrCat===i?"#fff":"#7aa8cc"}}>{cat.cat}</button>)}
          </div>
          {NUTRITION[nutrCat].tips.map((tip,i)=>{const isOpen=nutrExpanded===i;return(
            <div key={i} onClick={()=>setNutrExpanded(isOpen?null:i)} style={{background:"rgba(255,255,255,0.03)",borderRadius:12,padding:"12px 14px",marginBottom:8,border:"1px solid rgba(255,255,255,0.07)",cursor:"pointer"}}>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <div style={{width:22,height:22,borderRadius:"50%",background:"rgba(0,255,170,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:"#00ffaa",fontWeight:800,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1,fontSize:13,fontWeight:700,color:"#e8f4ff"}}>{tip[0]}</div>
                <div style={{fontSize:11,color:"#4db8ff"}}>{isOpen?"▲":"▼"}</div>
              </div>
              {isOpen&&<>
                <div style={{marginTop:10,fontSize:12,color:"#d0e8ff",lineHeight:1.7}}>{tip[1]}</div>
                <div style={{marginTop:8,padding:"10px 12px",borderRadius:8,background:"rgba(0,255,170,0.06)",border:"1px solid rgba(0,255,170,0.15)",fontSize:12,color:"#00ffaa",lineHeight:1.6}}>{tip[2]}</div>
              </>}
            </div>
          );})}
          <Card style={{background:"linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,100,255,0.07))",border:"1px solid rgba(77,184,255,0.25)",marginTop:4}}>
            <div style={{fontSize:12,fontWeight:800,color:"#4db8ff",marginBottom:8}}>🤖 Need a personalized meal plan?</div>
            {["Build me a 7-day meal plan for a swimmer my age","What should I eat the day before my big meet?","I'm always tired after practice — what am I missing?"].map(q=>(
              <button key={q} onClick={()=>{setTab("coach");setAiQ(q);}} style={{display:"block",width:"100%",textAlign:"left",marginBottom:7,background:"rgba(77,184,255,0.06)",border:"1px solid rgba(77,184,255,0.15)",color:"#d0e8ff",borderRadius:9,padding:"10px 12px",fontSize:12,cursor:"pointer",fontFamily:"inherit"}}>{q} <span style={{fontSize:9,color:"#4db8ff"}}>→ Ask Coach</span></button>
            ))}
          </Card>
        </>}

      </div>
    </div>
  );
}
