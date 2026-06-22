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

// TIPS is now powered by TECHNIQUE_LIBRARY below — daily rotating tips per category

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

// TOOLTIP DEFINITIONS - every feature explained
const TOOLTIPS = {
  home: "Your live dashboard. See all your TAGS times, progress bars, daily missions, and meet countdown at a glance.",
  log: "Add your swim times two ways: scan a photo of Meet Mobile results (AI reads them instantly) or log manually. Every time saved forever.",
  train: "Your personalized daily training plan. Dryland exercises change every day based on your goal. Pool workouts are tailored to your weakest events. Everything is age-safe.",
  skills: "Coaching library with technique tips from Olympic-level swimmers and coaches. Browse by stroke, watch YouTube videos, copy the search terms.",
  meets: "Add upcoming meets to your calendar. Track which events you are swimming. See your countdown to race day.",
  progress: "Your full history. Badges unlock automatically as you achieve milestones. Set personal goals with deadlines and track them.",
  squad: "Add teammates or siblings for a friendly leaderboard. See who has the most TAGS cuts. No pressure — just motivation.",
  coach: "Your personal AI coach powered by Claude. Your profile and all your times are pre-loaded. Ask anything about training, technique, nutrition, or race strategy.",
  nutrition: "Olympic-level nutrition guidance personalized to your age. Daily eating, hydration, pre-meet fueling, and recovery — all based on sports science.",
  family: "Swimmers share their Family Code with parents. Parents enter the code to track their child's progress. Supports multiple children.",
  tags: "TAGS stands for Texas Age Group Swimming Championships — the state championship for Texas age group swimmers. Qualifying times are required to compete.",
  tagscut: "The qualifying time you need to swim at TAGS. Hit this time in any sanctioned meet and you are qualified for that event.",
  bonus: "The Bonus cut is faster than the qualifying cut. Hitting it at TAGS gives you preferred seeding in the A or B final.",
  xp: "XP (Experience Points) are earned every time you log a time, complete exercises, or hit goals. Earn enough XP to level up from Tadpole all the way to Legend.",
  streak: "Your training streak counts consecutive days where you checked off at least one exercise. Streaks build the discipline that creates champions.",
  missions: "Daily missions give you small focused goals to complete each day. Tap to complete them and earn bonus XP. They reset every day.",
  taper: "Taper is the planned reduction in training volume before a big meet. Your body recovers and gets faster. Set your target meet date to track your taper phase.",
  courseConverter: "Converts your SCY (Short Course Yards, 25-yard pool) times to LCM (Long Course Meters, 50-meter Olympic pool) and SCM (Short Course Meters). Different meets use different pool sizes.",
  splitAnalyzer: "Enter your 50-yard splits from a race to get your Race IQ score. Negative splits (faster second half) score higher. Elite swimmers consistently negative split.",
  strokeRate: "Your stroke rate is how many arm cycles you complete per minute. Distance per stroke shows how far you travel each pull. Compare yours to elite swimmers.",
  dryland: "Dryland training is exercise done outside the pool — core, strength, flexibility. It directly improves your swimming power and reduces injury risk.",
  poolWorkout: "Pool workouts are designed to supplement your team practice. They target your weakest strokes and rotate every day so you never do the same workout twice in a row.",
  familyCode: "A unique code tied to your profile. Share it with your parents so they can add you to their Parent View and track your progress.",
};

// ─── OLYMPIC-LEVEL TECHNIQUE LIBRARY ─────────────────────────────────────
// 7 tips per category × multiple categories = different tip shown each day
const TECHNIQUE_LIBRARY = {
  freestyle: {
    label: "🏊 Freestyle",
    categories: {
      bodyPosition: {
        label: "Body Position & Balance",
        tips: [
          "Press your chest slightly downward — this lifts your hips and creates a flat horizontal body. Think of balancing a cup of water on your lower back.",
          "Your head position controls everything. Eyes look straight down or at a 45-degree angle forward — never up at the wall. Every inch you lift your head drops your hips 4-6 inches.",
          "Your body should rotate like a log — 45 degrees each side. Flat swimmers generate no power. Over-rotation past 60 degrees loses momentum.",
          "Keep your hips just below the surface — not splashing, not sinking. The goal is a perfectly horizontal line from head to toe.",
          "Tension is drag. Relax your neck, jaw, and hands between strokes. Elite swimmers look effortless because they ARE relaxed.",
          "Your kick should create a narrow cylinder — feet no wider than your body. Wide kicks create massive drag and cost you seconds every 50.",
          "Imagine a skewer running through the center of your body. Every movement rotates AROUND that line — never breaks it.",
        ]
      },
      catch: {
        label: "The Catch (Where Power Is Born)",
        tips: [
          "The high elbow catch is the single most important skill in swimming. After entry, rotate your palm outward and down — your elbow stays HIGH above your wrist and hand.",
          "Think of reaching over a barrel before you pull. Your forearm and hand form a vertical paddle that catches the water. Dropped elbow = dropped power, immediately.",
          "After your hand enters the water, REACH forward before starting the catch. Extension is free speed — don't waste it by pulling immediately.",
          "Your catch starts with the fingertips pointing down, not your elbow. The sequence is: entry, reach, fingertips down, elbow up, THEN pull.",
          "Hold the water, don't slip through it. If you feel bubbles on your palm, your hand is slipping. Adjust your angle until you feel solid resistance.",
          "The early vertical forearm position (EVF) means your forearm is vertical to the water as early as possible — this maximizes the surface area you're pulling against.",
          "Phelps' coach Bob Bowman: 'The catch is not a technique — it's a feeling. You have to feel the water stack against your forearm before you pull.'",
        ]
      },
      pullAndFinish: {
        label: "Pull Pattern & Finish",
        tips: [
          "Pull through a slight S-curve — out, in under your chest, out past your hip. The finish is where most swimmers stop too early and lose 20% of their propulsion.",
          "Your thumb should brush your thigh at the finish — not exit at your hip. Full extension = maximum propulsion. Short finish = wasted energy.",
          "Keep fingers together and slightly cupped like a spoon. Spread fingers lose 30% of pulling power. Too rigid loses feel. Find the relaxed middle.",
          "The pull phase is not about strength — it's about leverage. The forearm acts as a paddle. Strength training helps but perfect mechanics help more.",
          "Pull with your lat muscles, not just your arm. Think of pulling your body OVER your hand, not your hand through the water. This activates your largest back muscles.",
          "The exit is as important as the catch. Flick your wrist slightly on the exit — this cleans up the stroke and sets up a faster recovery.",
          "Katie Ledecky cue: 'I think about pushing the water behind me all the way past my hip. The instant I stop pushing is the instant I slow down.'",
        ]
      },
      kick: {
        label: "Kick Mechanics",
        tips: [
          "The freestyle kick originates from the HIP — not the knee. Your knee bends slightly on the downstroke, but the power comes from the hip flexor and glute.",
          "6-beat kick for sprint events (50, 100). 2-beat kick for distance (500, 1000, 1650). The 2-beat synchronizes with your arm stroke to save energy over distance.",
          "Toes pointed is not optional — it's mandatory. Flexed feet are brakes. Ankle flexibility determines how much propulsion your kick generates.",
          "The upkick is often neglected but generates real propulsion — especially in backstroke. In freestyle, focus on snapping your foot upward with a quick ankle flick.",
          "Kick depth should be narrow — roughly 12 inches of total motion. Deep kicks create frontal drag. Think rapid, efficient, not large and powerful.",
          "Cold water = tight ankles = weak kick. Spend 5 minutes on ankle circles before every practice. The difference in your kick after mobility work is immediate.",
          "Caeleb Dressel trains his kick separately every day. He does 20x25 kick sets at sprint pace weekly. His kick is a weapon — yours can be too.",
        ]
      },
      breathing: {
        label: "Breathing & Rhythm",
        tips: [
          "One goggle stays in the water when you breathe. Your face turns to the bow wave — the trough created by your head moving forward — and air is right there.",
          "Exhale continuously underwater. Never hold your breath between breaths. The moment you exhale on the surface, your lungs are clear and you can inhale fully.",
          "Bilateral breathing (alternating sides) is not optional for serious swimmers. It balances your stroke, evens your rotation, and ensures both sides develop equally.",
          "In races: sprint events breathe every 2-3 strokes. Distance events every 3. In the last 25 of a sprint, hold your breath for maximum speed.",
          "Don't lift your head to breathe — rotate your body and the head follows. Your ear stays in the water. Only your mouth clears the surface.",
          "Breathing late (at the end of your pull) is faster than breathing early. Wait until your hand has passed your shoulder before rotating to breathe.",
          "Ryan Murphy's breathing drill: swim 200s with breathing only every 5 strokes. This builds CO2 tolerance and makes race breathing feel easy by comparison.",
        ]
      },
      turns: {
        label: "Flip Turns",
        tips: [
          "Count your strokes from the flags in EVERY practice. The flags are 5 yards from the wall. Know your number and trust it completely — never look for the wall.",
          "The flip is initiated by one arm pushing down — like a somersault — NOT both arms pulling. One arm leads the rotation while the other extends.",
          "Tuck TIGHT in the flip. A loose, open tuck takes twice as long and costs you a body length. Chin to chest, knees to chest, feet over fast.",
          "Feet land shoulder-width apart on the wall, toes slightly up. This sets up the most powerful push-off angle.",
          "Push off at a 45-degree downward angle — not straight horizontal. This gets you deep enough to use dolphin kicks without surfacing too soon.",
          "Streamline must be perfect BEFORE your feet leave the wall. Hands stacked, arms squeezed against your ears, core tight, toes pointed.",
          "5 dolphin kicks minimum off every wall in sprint events. These are the fastest yards in the race. Most age groupers waste this free speed.",
        ]
      },
      starts: {
        label: "Starts & Dive",
        tips: [
          "Grab start vs track start: grab start is more stable, track start is more explosive for most swimmers. Try both and measure your 15-meter time from each.",
          "On 'Take your marks': bend your knees more, shift weight 60% forward over your toes, grip the block with your fingers curled under.",
          "At the beep: drive your hips UP and OUT simultaneously. Most swimmers drive only forward and skim the water instead of flying over it.",
          "Your arms reach into streamline BEFORE your hands enter the water. The hole entry technique — your body follows through the same hole your hands made.",
          "The optimal entry angle is 30-40 degrees. Too steep = too deep and you lose momentum. Too flat = belly flop drag.",
          "Stay underwater longer than you think. You are faster at depth with dolphin kicks than on the surface. Break out when you feel yourself slow — not before.",
          "Ryan Held's start tip: 'I visualize the trajectory like a javelin. Flat angle, maximum distance, then punching into the water like a needle.'",
        ]
      },
      underwaterDolphin: {
        label: "Underwater Dolphin Kicks",
        tips: [
          "Underwater dolphin kicks after every start and turn are the fastest you will ever travel in a race. 15 meters underwater beats 15 meters of surface swimming — always.",
          "The dolphin kick wave starts at your chest, travels through your hips, and snaps at your feet. It's not a leg kick — it's a full body wave.",
          "Keep your arms in a tight streamline. Any gap between your arms and head creates frontal drag that cancels out your kick speed.",
          "Kick in sets of 3-5 for sprint events. More than 5 kicks underwater risks oxygen debt that slows your surface swimming in a 50 or 100.",
          "Your dolphin kick should be fast and compact — not large and slow. Olympic swimmers take 2-3 kicks per second underwater.",
          "Train dolphin kick EVERY practice. Vertical kicks in deep water, kicking on your back, kicking with fins, kicking without fins. This is your 5th stroke.",
          "Phelps held the world record in dolphin kick speed underwater. His coach timed all 8 swimmers and Phelps was fastest underwater in every race. Train it like a separate event.",
        ]
      }
    }
  },
  backstroke: {
    label: "🔄 Backstroke",
    categories: {
      bodyPosition: {
        label: "Body Position & Balance",
        tips: [
          "Your head is neutral — ears just below the surface, eyes looking straight up. A tilted head causes hip drop and that hip drop costs you significant speed.",
          "Think of balancing a full glass of water on your forehead. Any head movement spills it. Steady head = fast hips.",
          "Hips ride high at the surface. If your hips are dropping, your head is up. It's a direct cause-and-effect relationship in backstroke.",
          "Your body rotates 45-50 degrees side to side — more than most swimmers think. This hip-driven rotation is where backstroke power comes from.",
          "Keep your kick narrow and fast. Wide backstroke kicks create drag. Think of your feet tracing a narrow vertical cylinder.",
          "The position of your chest determines your speed. A lifted chest lowers your hips. A flat chest keeps everything horizontal and fast.",
          "Aaron Peirsol, the GOAT of backstroke, maintained perfect horizontal position at all times. Study his races — notice how his hips never drop even when fatigued.",
        ]
      },
      catch: {
        label: "Entry & Catch",
        tips: [
          "PINKY finger enters the water first — not the thumb. This external rotation sets up the most powerful underwater catch position automatically.",
          "Your hand enters at roughly 11 o'clock and 1 o'clock positions — directly in line with your shoulder, not wide and not crossing the centerline.",
          "After entry, your hand presses outward and downward — this is your 'catch' position. You're setting up a high elbow underwater just like freestyle.",
          "The elbow bends to approximately 90 degrees during the pull phase. Straightening the elbow early loses significant power.",
          "Feel the water stack against your forearm during the pull. If you only feel it on your palm, your catch is too shallow.",
          "The opposite shoulder exits the water as your entry hand enters. This rotation drives the catch — the arm doesn't work alone.",
          "Ryan Murphy cue: 'I think about spearing the water with my pinky and then immediately pressing out to find the catch. The moment I feel resistance I start pulling.'",
        ]
      },
      pull: {
        label: "Pull Through & Finish",
        tips: [
          "Pull through a slight S-curve. The hand exits near your hip — not at the middle of your body. Full range of motion = maximum propulsion.",
          "Thumb exits the water first on the recovery. This is the opposite of entry where the pinky enters first.",
          "Squeeze your lat muscle throughout the entire pull. Your lat is your engine in backstroke — not your arm.",
          "The finish at your hip matters. Most backstrokers push to mid-thigh and stop. Push all the way to the hip and feel the extra propulsion.",
          "Your hand stays close to your body during the pull — not wide. A wide pull loses connection to the water and reduces power.",
          "During recovery, your arm should be completely relaxed. Save the energy for the pull. Tense recovery arms fatigue faster and disrupt rotation.",
          "Missy Franklin's coach cue: 'Push the water all the way past your pocket. Imagine pushing your swimsuit pocket backward with every stroke.'",
        ]
      },
      flagsAndWalls: {
        label: "Flags, Walls & Turns",
        tips: [
          "Count your strokes from the backstroke flags in EVERY lap in EVERY practice until your count is automatic. The flags are exactly 5 yards from the wall.",
          "In competition, the flagging system tells you where you are. Never look for the wall — you will lift your head, drop your hips, and lose time.",
          "If your count changes from pool to pool (short course vs long course, different pool lengths), always do a test lap before your race.",
          "The backstroke-to-breaststroke turn in IM is the most technical turn in swimming. Roll to your front on the last stroke approach — this is legal.",
          "Plant one foot on the wall in a position that lets you explode off powerfully. Practice the IM turn 20 times before every IM race.",
          "Push off on your BACK after a backstroke flip turn. Rotate back to your back before the first kick. Coming off on your side costs significant distance.",
          "Ryan Murphy tip: 'I practice my flag count so much that I would bet money on exactly where my feet will land. That confidence is part of what makes the turn fast.'",
        ]
      }
    }
  },
  breaststroke: {
    label: "🐸 Breaststroke",
    categories: {
      timing: {
        label: "The Critical Timing Rule",
        tips: [
          "Pull and kick NEVER overlap. Ever. This is the single rule that separates good breaststrokers from great ones. Pull first, fully, then kick. Overlap = lost power.",
          "The sequence is: PULL → breathe → shoot arms forward → brief glide → KICK → glide → repeat. Each phase is distinct and purposeful.",
          "The glide after the kick is free speed. Your streamline is perfect, your momentum is maximum. Rushing out of the glide costs you 0.3-0.5 seconds per cycle.",
          "Think of it as two separate engines that never run at the same time. When one is working, the other is resting. This is breaststroke's elegant efficiency.",
          "Adam Peaty, world record holder: 'Every stroke cycle is a complete story — pull, breathe, streamline, kick, glide. If you rush any chapter, the story doesn't work.'",
          "Time your breath with your pull — head comes up as your hands sweep back, then head goes down as you shoot your arms forward. Never breathe at the wrong time.",
          "The most common mistake: kicking while still pulling. If you hear your coach say 'separate your stroke' — this is what they mean.",
        ]
      },
      pull: {
        label: "Pull Mechanics",
        tips: [
          "Start with arms extended in streamline. Pull OUT and DOWN in a keyhole shape — wider than your body, then narrowing in under your chest.",
          "Hands pull back until thumbs touch or nearly touch your chest before you shoot forward. Most swimmers pull too short and lose 30% of their power.",
          "Elbows squeeze TOGETHER at the finish before shooting forward. This compression is what generates the shooting momentum.",
          "Keep your elbows HIGH during the outsweep — same high-elbow principle as freestyle. Dropped elbows in breaststroke kill your catch.",
          "The insweep is where you actually move forward — palms facing in and back, sweeping toward the centerline powerfully.",
          "Shoot your arms forward FAST — not slow. The recovery is not rest. A fast arm shoot maintains momentum through the glide.",
          "Lilly King's pull cue: 'I think about pulling my elbows behind my back on the finish. If my elbows aren't behind my body, I haven't pulled far enough.'",
        ]
      },
      kick: {
        label: "Breaststroke Kick",
        tips: [
          "Heels come up toward your GLUTES — not your knees coming forward. When your knees come forward, they create a wall of drag that stops your momentum.",
          "Feet flex OUT (dorsiflexion) just before the kick. Then sweep back and around in a circular motion, finishing with feet together and toes pointed.",
          "The kick finish — feet snapping together — is where the power burst happens. It's not a slow sweep, it's a snapping motion.",
          "Knee width during the kick recovery: shoulder-width or narrower. Wider knees = more drag. Many swimmers kick excessively wide without realizing it.",
          "The kick is not symmetric — it's sequential. One hip leads slightly. This is normal and actually more efficient than a perfectly simultaneous kick.",
          "Practice kick-only drills with your hands at your sides. This isolates the mechanics and forces you to feel whether your kick is propelling you or dragging you.",
          "Rebecca Soni: 'I imagine my feet making a perfect circle in the water — out, around, and snapping together. If the circle is messy, the kick is messy.'",
        ]
      },
      pullout: {
        label: "Underwater Pullout",
        tips: [
          "The breaststroke pullout is the fastest moment in the race. After every start and turn, one complete pullout is legal and mandatory — maximize it every time.",
          "Streamline position must be perfect: hands stacked, arms squeezing your ears, body rigid as a board, toes pointed.",
          "One dolphin kick is legal during the pullout (since 2005). Time it perfectly — as your hands begin their outsweep, that's when you kick.",
          "The pullout begins when your momentum from the push-off starts to fade. Too early = you're fighting your own momentum. Too late = you've slowed to surface speed.",
          "One complete pull — hands sweeping from extended to your sides — before you begin your first surface stroke.",
          "Breaking out too early is one of the most costly mistakes in breaststroke. Every meter you swim underwater in the pullout is faster than surface swimming.",
          "Adam Peaty's pullout timing: he stays underwater approximately 1.2-1.4 seconds after each turn. Time yours and work to extend it by 0.1 seconds each week.",
        ]
      },
      undulation: {
        label: "Body Undulation",
        tips: [
          "Breaststroke has a wave-like undulation that comes from your CORE — not your back. Think of a dolphin, not a worm.",
          "Your hips rise as your arms shoot forward — this is the upswing of the wave. Your chest presses down as your arms pull — this is the downswing.",
          "Undulation is not optional in modern breaststroke. Flat breaststroke is slower. The wave creates momentum through each cycle.",
          "Don't force the undulation — it's a consequence of perfect timing, not an additional movement you add. When your timing is perfect, undulation happens naturally.",
          "Excessive undulation (too much up-and-down) creates drag. The wave should be subtle — enough to create momentum but not enough to lift you out of the water.",
          "Core strength determines your undulation quality. A weak core creates a floppy wave. A strong core creates a powerful, controlled wave.",
          "Rebecca Soni was famous for her undulation — she essentially brought butterfly-like body movement to breaststroke. Watch her 2012 Olympic race for the perfect example.",
        ]
      }
    }
  },
  butterfly: {
    label: "🦋 Butterfly",
    categories: {
      twoKicks: {
        label: "The Two-Kick Rule",
        tips: [
          "Two dolphin kicks per arm cycle — ALWAYS. This is non-negotiable in butterfly. The moment you lose the second kick, your fly collapses.",
          "Kick 1 (small): fires as your hands ENTER the water. This drives your hips down and sets up the pull.",
          "Kick 2 (big, powerful): fires as your hands EXIT the water at the back. This is the power kick that drives your hips up and pushes you through recovery.",
          "Most swimmers lose the second kick when they fatigue. Train it specifically — swim 25s of fly focusing ONLY on feeling both kicks, even slow.",
          "The two kicks have different purposes. Kick 1 = timing and setup. Kick 2 = propulsion and recovery. Both matter equally.",
          "Think of the kicks as the motor and the arms as the steering wheel. Without both kicks firing, the motor is running at half power.",
          "Michael Phelps: 'When I'm tired in the last 25 of a 200 fly, I focus on the second kick. That's where races are won or lost. The second kick when you want to stop is what makes champions.'",
        ]
      },
      pull: {
        label: "Pull & Recovery",
        tips: [
          "Hands enter at shoulder-width — not crossed at the centerline, not too far wide. The entry angle sets up your entire pull.",
          "Pull in a keyhole pattern underwater: hands sweep out, then in under your chest powerfully, then out past your hips.",
          "PINKY fingers and thumbs lead the exit from the water — a small rotation that sets up the most efficient recovery position.",
          "Recovery arms should skim CLOSE to the water surface. High, arcing recovery arms waste energy and slow your rhythm. Think low and fast.",
          "Your hands should be relaxed and low during recovery — gravity helps them swing forward without effort. Fight the instinct to tense your arms.",
          "The pull is powered by your lat muscles and core — not just your arms. Think of pulling your body over your hands, not your hands through the water.",
          "Caeleb Dressel: 'In butterfly, I think about my hands as anchors — I plant them in the water and pull my body over them. That mental image changed my fly completely.'",
        ]
      },
      breathing: {
        label: "Breathing in Butterfly",
        tips: [
          "Your head goes DOWN before your hands enter the water — not after. Leading with your head down reduces drag and keeps your hips up.",
          "Chin barely clears the surface to breathe. Not your whole head — just your chin and mouth. Every inch you lift adds drag exponentially.",
          "In a 100 Fly: breathe every other stroke to maintain speed. Every stroke breathing in fly is slower but sometimes necessary in a 200.",
          "In a 200 Fly: breathe every stroke after the first 50, sometimes every stroke throughout. Oxygen management is everything in a 200 fly.",
          "Looking forward while breathing (not down) lifts your hips. Look at the wall surface level — not up at the crowd.",
          "The breath happens DURING your arm recovery — not before it. Timing the breath with your recovery is what allows chin-clearance breathing.",
          "Dana Vollmer's cue: 'I think about skimming my chin across the water — like a stone skipping. The breath is quick and low. High breathing is slow breathing.'",
        ]
      },
      dolphinKick: {
        label: "Dolphin Kick in Butterfly",
        tips: [
          "The butterfly dolphin kick is a FULL BODY wave — it starts at your chest and travels through your hips to your feet.",
          "Knees bend approximately 30-45 degrees on the downstroke. Too much knee bend = breaststroke kick. Too little = stiff and powerless.",
          "Your feet snap at the bottom of the kick — this snap is where the propulsion happens. No snap = no power.",
          "Kick fast and compact, not slow and wide. Width creates drag. Speed creates propulsion. Think rapid and efficient.",
          "Underwater dolphin kick training: kick vertically in deep water, kick on your back, kick with fins, kick without fins. All of these build different aspects.",
          "The kick on your back is the secret weapon. Your hip flexors are stronger in this position and you can isolate the wave mechanics perfectly.",
          "Bob Bowman trained Phelps to do 30 minutes of dolphin kick practice weekly — separate from his fly sets. The kick became a weapon, not just a technique.",
        ]
      }
    }
  },
  im: {
    label: "💠 Individual Medley",
    categories: {
      strategy: {
        label: "IM Race Strategy",
        tips: [
          "Butterfly is first for a reason — it's the hardest. Go out controlled or you will be destroyed on breaststroke. The first 25 of fly should feel comfortable.",
          "Breaststroke is where IM races are won and lost — not butterfly. A controlled fly sets up a powerful breast. An all-out fly ruins it.",
          "Your backstroke split tells the story of your butterfly split. If back feels easy, your fly was paced well. If back feels hard, you went out too fast.",
          "Freestyle is your reward for good pacing. If you're dying on free, you didn't pace the first three. If free feels good, you swam it perfectly.",
          "In a 200 IM: your four split times should be relatively even as a percentage of each event's world record. No single stroke should destroy you.",
          "In a 400 IM: the first 100 fly should feel almost easy. The race really starts at the 200 mark. Patience in the first half is the entire strategy.",
          "Ryan Lochte: 'Most swimmers try to win the IM on the fly. I try to not lose it on the fly. The race is won on breaststroke, in the last 50.'",
        ]
      },
      transitions: {
        label: "Stroke Transitions",
        tips: [
          "Fly-to-Back turn: two-hand simultaneous touch (DQ risk if one-handed), drop one shoulder to spin, plant feet on wall, push off on your BACK.",
          "Back-to-Breast turn: count from the flags, roll to your front on the last approach stroke, execute an open turn (two-hand touch required), push off in breaststroke streamline.",
          "Breast-to-Free turn: two-hand simultaneous touch, open turn, push off in freestyle streamline. This turn is often faster than the others because freestyle streamline is strongest.",
          "Practice EVERY IM transition separately at least 20 times before each major meet. Transitions cost you if you haven't rehearsed them perfectly.",
          "The fly-to-back transition is where most IM swimmers lose time. The two-hand touch at a full butterfly stroke takes practice to nail without slowing down.",
          "The back-to-breast roll requires a specific stroke count from the flags. This count is DIFFERENT from your regular backstroke turn count — practice it separately.",
          "Michael Phelps' transitions were technically perfect. His coach timed each one individually. Every tenth of a second in a transition is a tenth you don't have to swim.",
        ]
      }
    }
  },
  mentalGame: {
    label: "🧠 Mental Training",
    categories: {
      visualization: {
        label: "Race Visualization",
        tips: [
          "Visualize your race 3 times the night before a big meet: once perfectly, once with adversity (someone touches the wall at the same time), once as a comeback.",
          "Write your race plan BEFORE every significant race. Know your target splits for each 50. Swimmers with written plans drop time more consistently than those without.",
          "Elite swimmers rehearse their race mentally more than they rehearse it physically. Katie Ledecky could tell you her split for every 50 of her world record before she swam it.",
          "Visualization is not daydreaming. It's specific, detailed mental rehearsal. Feel the blocks, hear the crowd, feel the water temperature, execute your race.",
          "Process visualization (how you'll swim) is more effective than outcome visualization (winning). Focus on YOUR stroke, YOUR turns, YOUR pacing.",
          "When you make a mistake in a race, your brain stores it. Visualization lets you rehearse the CORRECT response and overwrite the mistake pattern.",
          "Bob Bowman had Phelps visualize every race before sleeping and immediately after waking for years before the 2008 Olympics. Mental training is a daily practice.",
        ]
      },
      nerves: {
        label: "Managing Race Nerves",
        tips: [
          "Nerves and excitement are physiologically identical. Relabeling anxiety as excitement — 'I'm excited' not 'I'm nervous' — measurably improves performance.",
          "Box breathing: inhale 4 counts, hold 4 counts, exhale 4 counts, hold 4 counts. Three cycles before stepping onto the block activates your calm nervous system.",
          "Focus on what you CONTROL: your warm-up, your routine, your first 25. Not the competition, not the crowd, not what could go wrong.",
          "A bad warm-up does not predict a bad race. This is a myth. Your warm-up and your race are separate events. Reset completely when you step on the block.",
          "Pre-race routines create certainty in uncertain moments. The same music, same warm-up, same stretches, same self-talk. Routine = calm.",
          "Your best performances happened when you were focused and confident. Recall those feelings specifically before big races. Your brain can access those states on demand.",
          "Michael Phelps: 'I never tried to eliminate nerves. I used them. The nervous energy is fuel if you point it in the right direction.'",
        ]
      },
      growth: {
        label: "Growth Mindset for Swimmers",
        tips: [
          "A slow time at a meet is data — not failure. What does it tell you to fix? Swimmers who analyze their bad races improve faster than those who ignore them.",
          "Compare yourself to who you were last month — not to the person in lane 5. External comparison steals your focus and gives you no useful information.",
          "The swimmers who improve fastest are not the most talented — they are the most coachable. Talent sets the ceiling. Coachability determines how high you go.",
          "Every great swimmer has a story full of bad meets, injuries, setbacks, and doubts. Every single one. Adversity is part of the journey, not evidence that the journey is wrong.",
          "Deliberate practice means focusing on the weakest parts of your performance — not just doing what you're good at. Champions practice their weaknesses.",
          "The 1% rule: get 1% better at one thing each week. In a year, you're 52% better. Small, consistent improvements compound into extraordinary results.",
          "Caeleb Dressel missed the 2016 Olympic team. He used that failure as fuel for 2021 where he won 5 gold medals. The setback was part of the setup.",
        ]
      },
      concentration: {
        label: "Focus & Concentration",
        tips: [
          "Concentration is a skill — train it like a physical skill. During practice, choose ONE technical cue to focus on per set. Not five. One.",
          "The 'quiet eye' technique: before your race, find a fixed point and stare at it for 3 seconds. This physiologically reduces noise and sharpens focus.",
          "Process focus during a race: 'high elbow, kick, breathe' — not 'what's my time, where am I, am I winning.' External focus kills performance.",
          "Distractions happen. The skill is returning to focus quickly, not avoiding distraction. Practice returning to your cue word during hard training sets.",
          "Your cue word should be a specific action — not a feeling. 'High elbow' works. 'Swim fast' does not. Specific actions activate the right muscles.",
          "Train concentration in practice by racing at 90% while focusing on ONE technical cue. This is harder than 100% effort with no cue and more valuable.",
          "Missy Franklin: 'During a race I'm not thinking about medals or times. I'm thinking about my catch, my kick, my turns. The results happen when you trust the process.'",
        ]
      }
    }
  },
  dryland: {
    label: "💪 Dryland & Strength",
    categories: {
      core: {
        label: "Core Training for Swimmers",
        tips: [
          "Core strength for swimmers means rotational stability — not six-pack abs. You need a core that resists rotation while your arms and legs create it.",
          "The plank trains anti-extension. The side plank trains anti-lateral flexion. The dead bug trains anti-rotation. All three are essential for every stroke.",
          "A weak core is a leaky engine. Power generated by your legs and arms leaks through a loose core before it can propel you forward.",
          "Swimmers should train their core BEFORE practice — not after when fatigued. A pre-practice core circuit takes 10 minutes and sets your neural activation for the whole session.",
          "The most sport-specific core exercise for swimmers is the hollow body hold — arms extended overhead, lower back pressed into the floor. This is your streamline position on land.",
          "Pallof press with a resistance band teaches your core to resist rotation — exactly what it must do when you're generating power asymmetrically in freestyle.",
          "Michael Phelps did 90 minutes of dryland per week including extensive core work. His 8-foot wingspan gave him advantage — his core training let him use it.",
        ]
      },
      shoulder: {
        label: "Shoulder Health & Strength",
        tips: [
          "Swimmer's shoulder affects 40-70% of competitive swimmers. Rotator cuff strengthening is not optional — it's injury prevention that keeps you in the water.",
          "External rotation with a band: elbow at 90 degrees, rotate outward against resistance. Do this EVERY day. It takes 3 minutes and protects your career.",
          "Internal rotation exercises are equally important. The rotator cuff has 4 muscles — all 4 need balanced training to prevent impingement.",
          "Band pull-aparts: hold a band at chest height, arms straight, pull apart slowly until fully extended. This strengthens the posterior shoulder neglected by pulling.",
          "The YTW-L exercise done face-down targets your lower and middle trapezius — essential for maintaining a high elbow during your catch.",
          "Never train through shoulder pain. Pain is a signal. Adjust your training immediately. A week off to heal is better than a month off from injury.",
          "Dave Marsh, Auburn coach: 'Every top swimmer I've coached has a structured shoulder maintenance program. The ones who skip it eventually pay the price.'",
        ]
      },
      explosiveness: {
        label: "Power & Explosiveness",
        tips: [
          "Squat jumps directly translate to off-the-block power and wall push-off explosiveness. A 10% increase in vertical jump typically produces a 0.1-second improvement in start speed.",
          "The push-off is the highest-velocity moment in any race. Leg power training directly improves this — often more than extra swim yardage.",
          "Box jumps, broad jumps, and depth jumps build fast-twitch muscle fiber activation — the same fibers used in explosive starts and turns.",
          "Sprint training and power training must be done when fresh — not at the end of a hard practice. Schedule explosive work first for maximum benefit.",
          "Medicine ball throws (overhead, rotational, chest pass) build the core power transfer that connects your kick to your pull.",
          "Hip thrust with weight builds glute strength essential for butterfly power, breaststroke kick finishing, and freestyle rotation.",
          "Ryan Murphy's dryland: 3 days of strength training per week including heavy leg work, upper body pulling, and rotational core. He credits it for 30% of his speed improvement.",
        ]
      },
      flexibility: {
        label: "Flexibility & Mobility",
        tips: [
          "Ankle flexibility determines kick effectiveness more than leg strength. Swimmers with flexible ankles generate 2-3x more kick propulsion than those with stiff ankles.",
          "Daily ankle circles are non-negotiable. 20 circles each direction, both feet, every single day. The improvement in kick power within 3 months is measurable.",
          "Hip flexor tightness drags your legs down in the water. A 5-minute hip flexor stretch daily keeps your hips at the surface where they belong.",
          "Thoracic spine rotation (upper back) directly affects your freestyle and backstroke rotation. A stiff thoracic spine limits how much your body can rotate.",
          "Shoulder flexibility improves your catch position. Tight shoulders mean a dropped elbow. Daily doorway chest stretch opens the anterior shoulder and improves catch depth.",
          "Dynamic stretching before practice (leg swings, arm circles, hip circles). Static stretching after practice (hold for 30-60 seconds). Wrong order causes injury.",
          "Shoulder mobility test: can you reach both hands behind your back and touch? If not, you have a mobility deficit affecting your underwater catch.",
        ]
      }
    }
  }
};

// Get today's technique tip — rotates daily within each category
function getDailyTip(stroke, category, dayOfYear) {
  const strokeData = TECHNIQUE_LIBRARY[stroke];
  if (!strokeData) return null;
  const catData = strokeData.categories[category];
  if (!catData) return null;
  const tips = catData.tips;
  return {
    tip: tips[dayOfYear % tips.length],
    label: catData.label,
    stroke: strokeData.label,
    dayIndex: dayOfYear % tips.length,
    total: tips.length,
  };
}

// ─── PERSONALIZED DAILY WORKOUT GENERATOR ─────────────────────────────────
// Focuses on events CLOSEST to TAGS qualification (most achievable)
function getDailyWorkout(profile, times, tagsP, dayOfYear, manualFocus) {
  const age = parseInt(profile.age) || 13;
  const mode = profile.mode || "competitive";
  const tagsKeys = Object.keys(tagsP);

  // Find events CLOSEST to qualifying (smallest positive gap = most achievable)
  const eventGaps = tagsKeys.map(function(s) {
    const t = times[s]; const tags = tagsP[s];
    if (!t || !tags) return { s: s, gap: 999, qualified: false, pct: 100 };
    const gap = t - tags.q;
    return { s: s, gap: gap, qualified: gap <= 0, pct: (gap / tags.q) * 100 };
  }).filter(function(e) { return !e.qualified; }) // only unqualified events
    .sort(function(a, b) { return a.gap - b.gap; }); // smallest gap first = closest to qualifying

  // Use manual focus if chosen, otherwise use closest-to-qualifying
  const targetEvent = manualFocus || (eventGaps[0] ? eventGaps[0].s : (tagsKeys[0] || "100 Free"));
  const targetStroke = targetEvent.includes("Back") ? "backstroke" : targetEvent.includes("Breast") ? "breaststroke" : targetEvent.includes("Fly") ? "butterfly" : targetEvent.includes("IM") ? "im" : "freestyle";

  // 7-day focus rotation
  const focuses = ["speed", "endurance", "technique", "race_pace", "kick", "pull", "recovery"];
  const focus = focuses[dayOfYear % 7];
  const dayNames = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  const dayName = dayNames[dayOfYear % 7];

  // Yards scale by age and mode
  const base = age <= 10 ? 1200 : age <= 12 ? 2000 : age <= 14 ? 2800 : mode === "masters" ? 2500 : 3200;
  const isRec = mode === "recreational";

  let sets = [], name = "", yards = base, intensity = "Moderate";
  const ev = targetEvent;
  const st = targetStroke;
  const stName = st.charAt(0).toUpperCase() + st.slice(1);
  const isIM = st === "im";
  const mainInterval = ev.includes("200") ? "3:30" : ev.includes("500") ? "7:00" : ev.includes("100") ? "1:45" : ev.includes("50") ? ":55" : "1:50";

  if (focus === "speed") {
    name = "Speed & Power — " + ev;
    intensity = "Very High — race harder than race pace";
    sets = [
      "400 warm-up: 100 free easy / 100 " + st + " easy / 4x50 @ :55 build",
      "8x25 @ :25 — ALL OUT SPRINT, max effort, 30 seconds rest between each",
      "4x50 " + (isIM ? "IM order" : st) + " @ :50 — RACE PACE, full rest between",
      "6x" + (ev.includes("200") || ev.includes("500") ? "100" : "50") + " " + (isIM ? "IM" : st) + " @ " + (ev.includes("200") || ev.includes("500") ? "1:40" : ":50") + " — descend 1-6, last two are faster than race pace",
      "8x25 underwater dolphin kick only @ :40 — stay under as long as possible",
      "4x25 explosive start practice @ :45 — racing dive or push-off start each one",
      "200 easy cool down, any stroke",
    ];
    yards = base + 300;
  } else if (focus === "endurance") {
    name = "Endurance Base — " + ev;
    intensity = "Moderate-Hard — uncomfortable but sustainable";
    sets = [
      "600 warm-up easy: 200 free / 4x100 choice @ 1:50",
      isRec ? "600 continuous swim at comfortable effort" : "3x" + (ev.includes("500") ? "500" : "200") + " " + (isIM ? "IM" : st) + " @ " + (ev.includes("500") ? "7:30" : "3:20") + " — hold same pace all three",
      "8x50 " + (isIM ? "IM order" : st) + " @ :55 — negative split each 50 (second 25 faster than first)",
      "400 pull with buoy — arms only, feel every catch, no kick",
      "4x100 @ 1:40 — steady pace, count strokes on every length",
      "200 kick — toes pointed, strong and narrow",
      "200 easy cool down",
    ];
    yards = base + 500;
  } else if (focus === "technique") {
    name = "Technique Mastery — " + ev;
    intensity = "Low-Moderate — quality over everything";
    sets = [
      "300 warm-up easy, any stroke",
      isIM ? "8x50 IM order @ 1:10 — focus on transition perfection" : "12x25 drill @ :40 — " + (st === "freestyle" ? "catch-up / fingertip drag / one-arm" : st === "backstroke" ? "one-arm / fingertip recovery / rotation" : st === "breaststroke" ? "2-kick-1-pull / hands-at-side kick / pull-only" : "one-arm fly / 3-kicks-1-pull / vertical kick") + " (4 reps each drill)",
      "4x" + (ev.includes("200") ? "200" : "100") + " " + (isIM ? "IM" : st) + " @ " + (ev.includes("200") ? "3:30" : "2:00") + " — count strokes every length, try to reduce by 1",
      "8x25 turns focus @ :35 — perfect streamline, 5 dolphin kicks minimum, first stroke at full power",
      "4x50 @ 1:00 — apply your drilled technique at race effort",
      "4x25 starts @ :40 — practice your start dive or push-off with perfect streamline",
      "200 easy cool down",
    ];
    yards = base - 300;
  } else if (focus === "race_pace") {
    name = "Race Simulation — " + ev;
    intensity = "Very High — this is your hardest weekly workout";
    sets = [
      "500 warm-up: 200 free / 4x50 " + (isIM ? "IM order" : st) + " @ :55 building effort",
      "2x" + ev + " @ " + mainInterval + " — RACE SIMULATION: race start, race pacing, race turns, everything. Treat these like your actual event.",
      "6x50 @ :50 — alternate: 1 race pace / 1 easy recovery",
      "4x25 @ :28 — MAXIMUM EFFORT, perfect turns, 1 minute rest each",
      "4x" + (ev.includes("200") ? "100" : "50") + " @ " + (ev.includes("200") ? "1:40" : ":55") + " — negative split every one",
      "8x25 underwater kick only @ :40",
      "300 easy cool down",
    ];
    yards = base + 400;
  } else if (focus === "kick") {
    name = "Kick Power — " + ev;
    intensity = "Moderate-High — legs should burn by the end";
    sets = [
      "400 warm-up easy",
      "8x50 kick @ 1:00 — " + (st === "breaststroke" ? "breast kick only, heels to glutes, narrow knees, strong snap" : st === "butterfly" ? "dolphin kick with board, full body wave, compact and fast" : "flutter kick with board, kick from hip, toes pointed, narrow"),
      "4x100 @ 1:45 — full " + (isIM ? "IM" : st) + " stroke, maximum kick throughout, do not let it die",
      "8x25 vertical kick @ :45 — no hands, head above water, kick only for 25 seconds straight",
      "4x50 kick no board @ :55 — streamline arms, face down, race-pace kick",
      "8x25 underwater dolphin kick @ :35 — stay under maximum distance",
      "200 easy cool down",
    ];
    yards = base;
  } else if (focus === "pull") {
    name = "Pull Strength — " + ev;
    intensity = "Moderate — feel every catch, hold the water";
    sets = [
      "400 warm-up easy",
      "400 pull with buoy — high elbow catch, full extension, palm facing back not down",
      "8x50 pull @ :55 — odd 50s: FAST with perfect catch / even 50s: technique focus, count strokes",
      "4x100 " + (isIM ? "IM" : st) + " @ 1:50 — focus: feel the forearm stack against the water before pulling",
      "4x50 single-arm " + (isIM ? "freestyle" : st === "breaststroke" ? "freestyle" : st) + " @ 1:05 — feel each individual pull, full finish every stroke",
      "8x25 @ :35 — full stroke, push past your hip EVERY stroke, full finish",
      "200 easy cool down",
    ];
    yards = base;
  } else {
    name = "Active Recovery — Flush & Refresh";
    intensity = "Easy — aerobic only, never out of breath";
    sets = [
      "500 easy warm-up — any stroke, breathing rhythm, no effort",
      "8x50 @ 1:15 — relaxed, focus on stroke count, aim for personal best stroke efficiency",
      "4x100 choice @ 2:00 — pick your favorite stroke or rotate, comfortable",
      "200 backstroke easy — decompress shoulders and spine",
      "4x50 kick @ 1:10 — easy flutter or dolphin, just keep moving",
      "4x25 technique @ :40 — pick your weakest technique point and drill it slowly",
      "200 easy cool down — reflect on your week",
    ];
    yards = base - 500;
    intensity = "Easy";
  }

  const closestEvents = eventGaps.slice(0, 3).map(function(e) { return e.s + " (" + e.gap.toFixed(2) + "s away)"; });

  return {
    name: name, focus: focus, dayName: dayName, yards: Math.max(800, yards),
    sets: sets, intensity: intensity, targetStroke: st, targetEvent: targetEvent,
    closestEvents: closestEvents,
    tip: focus === "speed" ? "Speed work requires FULL rest between reps. If you're not fully rested, you're doing endurance training, not speed training." :
         focus === "endurance" ? "Zero stops is the rule. If you need rest, slow down — don't stop. Continuous swimming builds the aerobic engine." :
         focus === "technique" ? "Slow is smooth. Smooth is fast. You cannot fix a technical flaw at race pace. Drill it slow, then transfer it to race speed." :
         focus === "race_pace" ? "Your nervous system needs to know what race pace feels like. Make your body uncomfortable at race speed in practice so race day feels familiar." :
         focus === "kick" ? "Most swimmers have a 30-40% stronger kick potential they never access because they neglect kick training. Today you access it." :
         focus === "pull" ? "The catch is where power is created or lost. One session focused entirely on holding the water will change your feel permanently." :
         "Your body adapts and gets faster DURING rest — not during training. Recovery days are productive days. Arrive tomorrow ready to go hard.",
    nextWorkout: ["Speed & Power","Endurance Base","Technique Mastery","Race Simulation","Kick Power","Pull Strength","Active Recovery"][(dayOfYear + 1) % 7],
  };
}

// Legacy pool workouts (backup)
const POOL_WORKOUTS = {
  freestyle: [
    {level:"beginner",name:"Freestyle Foundation",yards:1500,sets:["4x50 free easy @ 1:00","4x100 free @ 1:45","4x50 kickboard @ 1:00","4x25 fast free @ :45","200 easy cool down"]},
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

// ─── EXPANDED NUTRITION — rotating tips + meal examples per age ───────────
const NUTRITION_DATA = {
  daily: {
    "10U": [
      ["3 full meals + 2 snacks every day","Growing bodies burn fuel constantly. Never skip meals — your brain and muscles both need steady energy.","🍽️ Example day: Oatmeal + banana for breakfast · PB&J sandwich + apple at lunch · Chicken rice bowl at dinner · Cheese + crackers as snacks"],
      ["5 colors of fruits and vegetables daily","Each color provides different vitamins. Red (tomatoes, strawberries) · Orange (carrots, oranges) · Green (spinach, broccoli) · Blue (blueberries) · Yellow (corn, bananas)","🥦 Easy win: Add one handful of spinach to any meal. You won't taste it but your body notices immediately."],
      ["Whole grains at every meal","White bread and white rice spike your blood sugar fast and crash it fast — you'll feel tired in practice. Whole grains give steady energy for the whole session.","🌾 Swap: White bread → whole wheat · White rice → brown rice · Regular pasta → whole wheat pasta"],
      ["Calcium for bone strength","You're growing fast right now. Strong bones come from calcium — and swimming is bone-loading which means every practice you're building them stronger.","🥛 Goal: 3 servings dairy daily. 1 cup milk + 1 yogurt + 1 slice cheese = perfect. Or fortified plant milk if dairy-free."],
      ["Lean protein at every meal","Protein repairs your muscles after every practice. Without enough protein your body can't adapt and get stronger from training.","🍗 Easy sources: Chicken breast · Eggs (scrambled, hard-boiled) · Greek yogurt · Peanut butter · Canned tuna · Beans and rice together"],
      ["Healthy fats for brain and joints","Fat is not the enemy — it's essential. Omega-3 fats reduce inflammation, help your brain focus, and keep your joints healthy for training.","🥑 Best sources: Avocado on toast · A handful of walnuts · Salmon once a week · Olive oil on vegetables"],
      ["Iron prevents fatigue","Low iron is the #1 nutrition deficiency in young swimmers. It makes you feel exhausted even when rested. Especially important for girls.","🥩 Iron-rich foods: Lean red meat 2x/week · Spinach · Fortified cereals · Beans · Pair with vitamin C (orange juice) to absorb iron better"],
    ],
    "11-12": [
      ["Eat every 3-4 hours without fail","Your metabolism is at its peak right now. A teenager swimmer burns 3000-4000 calories daily during heavy training. Skipping meals directly causes slower times.","⏰ Schedule: Breakfast 7am · Snack 10am · Lunch 12pm · Snack 3pm (before practice) · Dinner 7pm · Optional snack before bed"],
      ["20-25g protein at every meal","This is the muscle repair dose. Under 20g and your muscles don't get the full repair signal. Over 40g at once and the extra is just wasted.","🥚 20-25g examples: 3 eggs (18g) + 1 cup Greek yogurt (17g) = perfect · Or 4oz chicken breast (28g) · Or 1 cup cottage cheese (25g)"],
      ["Complex carbs are your engine fuel","Your muscles run on glycogen — stored carbohydrate energy. Without enough carbs, you hit a wall in practice. With enough, you swim through it.","⚡ Best timing: Eat carbs 2-3 hrs before practice. Rice bowl, pasta, oatmeal. After practice eat carbs + protein together for best recovery."],
      ["Iron is critical — especially for girls","Female athletes lose iron monthly. Low iron = chronic fatigue, slow times, inability to adapt to training. Get tested if you're always tired.","🩸 Iron-rich meals: Steak taco bowl with spinach · Lentil soup · Ground beef stir fry · Bean and cheese burrito with salsa · Cereal + OJ for absorption"],
      ["Anti-inflammatory foods every day","Hard training inflames your muscles. Anti-inflammatory foods help you recover faster so you can train hard again tomorrow.","🫐 Daily anti-inflammatories: Blueberries or strawberries in oatmeal · Turmeric in rice or eggs · Wild salmon 2-3x/week · Dark leafy greens at dinner"],
      ["Healthy snacks before and after practice","The pre-practice snack gives you energy. The post-practice snack starts recovery. Both windows matter enormously.","🍌 Pre-practice (1 hr before): Banana + peanut butter · Granola bar · Rice cakes with honey. Post-practice (within 30 min): Chocolate milk + banana = proven optimal"],
      ["Sleep nutrition: what to eat before bed","Growth hormone (the muscle-building hormone) peaks during deep sleep. Eating the right food before bed maximizes this.","🌙 Best bedtime snack: Greek yogurt with berries · Cottage cheese · Milk with a small amount of honey · These provide slow-digesting protein for overnight recovery"],
    ],
    "13-14": [
      ["2500-3500+ calories daily — do not under-eat","Under-eating is the most common mistake teenage swimmers make. It causes fatigue, poor performance, higher injury risk, and actually slows metabolism long-term.","📊 Reality check: A 13-year-old training 2 hours daily needs roughly the same calories as a grown adult doing moderate exercise. Eat more than you think you should."],
      ["Protein 1.4-1.6g per kilogram of bodyweight","For a 130lb (59kg) swimmer: that's 83-95g protein daily. Spread across 3-4 meals. More protein than this doesn't add benefit and taxes your kidneys.","🥩 Daily protein plan: Breakfast 25g + lunch 25g + post-practice 20g + dinner 25g = 95g. Easy to hit with chicken, eggs, Greek yogurt, and beans."],
      ["Carb periodization — match carbs to training load","Heavy training day = eat more carbs. Rest day = slightly fewer carbs. This keeps your glycogen stores full when you need them and avoids unnecessary fat storage.","⚡ Heavy day: Pasta + rice + bread + fruit. Light day: Vegetables + lean protein + some whole grains. Active rest: Same as light day."],
      ["Creatine monohydrate — the most researched supplement","At 14, creatine is appropriate with parent/doctor approval. 3-5g daily improves sprint performance, recovery, and muscle strength. It's the most studied supplement in sports.","💊 Note: Consult your doctor first. If approved: 3-5g creatine monohydrate daily in water or juice. No loading phase needed. Results appear in 2-4 weeks."],
      ["Omega-3 fatty acids for recovery","EPA and DHA omega-3s from fish reduce post-training inflammation by measurable amounts. Swimmers who eat fish 3x/week recover faster than those who don't.","🐟 Sources: Wild salmon (best) · Sardines · Mackerel · Omega-3 fortified eggs · Fish oil supplement (1-2g EPA+DHA daily if not eating enough fish)"],
      ["Avoid ultra-processed food and soda","Fast food, chips, candy, and soda create systemic inflammation, impair sleep quality, and cause energy crashes during training. This is not about being perfect — it's about frequency.","🚫 The 80/20 rule: Eat well 80% of the time. 20% is for fun and living. A pizza on Friday is fine. Pizza every day is not."],
      ["Post-practice recovery meal — the 45-minute window","Your muscles are most receptive to nutrients in the 45 minutes after hard exercise. This window is real and measurable. Missing it delays recovery by hours.","⏱️ Within 45 min: Chocolate milk + banana (easiest and proven). Or: Turkey sandwich + orange juice. Or: Greek yogurt parfait with berries and granola."],
    ],
    adult: [
      ["Caloric needs increase with training volume","Many adult swimmers under-eat relative to training load — especially masters swimmers who think they should eat less as they age. Match calories to output.","📊 Estimate: Multiply your bodyweight in lbs by 15-18 if you train 5+ hours/week. This is your daily calorie target as a baseline."],
      ["Protein needs are higher for masters swimmers","Muscle protein synthesis becomes less efficient with age. Adults 35+ need MORE protein per meal than younger athletes — not less.","🥩 Target: 30-40g protein per meal · 4 meals · = 120-160g daily. Sources: Chicken, fish, eggs, Greek yogurt, legumes, lean red meat 2x/week."],
      ["Creatine for masters swimmers — strong evidence","Multiple large studies show creatine monohydrate improves sprint performance, reduces muscle loss, and improves recovery in adults 35+. Consult your doctor.","💊 Dose: 3-5g daily. No loading. No cycling off. Take with carbohydrates for best absorption. Results in 2-4 weeks of consistent use."],
      ["Anti-inflammatory diet is non-negotiable","Training inflammation increases with age. Without anti-inflammatory foods, recovery takes longer, injury risk climbs, and performance plateaus.","🫐 Daily anti-inflammatories: 1 cup mixed berries · Wild salmon 3x/week · Turmeric in cooking · Dark leafy greens at every dinner · Walnuts as snack"],
      ["Sleep and recovery nutrition","Growth hormone peaks during deep sleep at all ages. Evening nutrition affects sleep quality and overnight recovery.","🌙 Evening protocol: Light dinner 3 hours before bed · If hungry before bed: cottage cheese or casein protein (slow-digesting) · Magnesium glycinate 200-400mg for sleep quality"],
      ["Limit alcohol — it's a recovery killer","Alcohol directly impairs protein synthesis, reduces sleep quality, dehydrates you, and interferes with adaptation to training. Even moderate drinking affects performance.","🍺 Reality: 2+ drinks per week measurably affects recovery for masters swimmers. This is not about abstaining — it's about timing and quantity."],
      ["Omega-3 supplementation for joint health","Adult swimmers often develop joint issues from repetitive shoulder motion. Omega-3s are the most evidence-backed supplement for joint health and inflammation reduction.","🐟 Dose: 2-3g EPA+DHA daily from fish oil or algae oil. Look for triglyceride form for best absorption. Results visible in 4-8 weeks."],
    ],
  },
  hydration: {
    "10U": [
      ["8-10 cups of water daily minimum","Kids this age often don't feel thirsty until they are already dehydrated. Set reminders or track with a water bottle that has measurements on the side.","💧 Easy tracker: 2 cups at breakfast · 2 cups at school · 2 cups at practice · 2 cups at dinner = 8 cups minimum. Simple."],
      ["Drink 1-2 cups of water 30 minutes before practice","Pre-hydrating gives your body a head start. You cannot catch up during practice if you start dehydrated — it affects speed from the first set.","⏰ Before practice routine: 30 min before = 1-2 cups water · Fill your water bottle at the pool · Sip every 15-20 minutes during practice"],
      ["Chocolate milk is one of the best post-practice drinks","Science fact: chocolate milk has the nearly perfect protein-to-carbohydrate ratio for post-exercise recovery. It also has electrolytes and calcium. It's not just a treat.","🍫 Post-practice: 1-2 cups chocolate milk within 30 minutes. This is literally what elite athletes use. Then a full meal within 2 hours."],
      ["Water bottle at every practice — non-negotiable","Being dehydrated by just 2% of body weight reduces performance by 10-20%. At 60 pounds, that's 1.2 lbs of water. Easy to lose in a hard practice.","🧃 Signs of dehydration: Headache · Feeling extra tired · Muscle cramps · Dark yellow urine. All of these mean you needed water 30 minutes ago."],
      ["NO energy drinks — ever at this age","Red Bull, Monster, Prime, and all energy drinks are not safe for swimmers under 16. They cause irregular heart rhythm, anxiety, poor sleep, and worse performance.","❌ Not even the 'zero sugar' ones. The caffeine alone is too much for a developing nervous system. Stick to water, milk, and 100% fruit juice."],
      ["Coconut water for electrolytes after hard practices","After a hot practice or long competition, you lose sodium, potassium, and magnesium in sweat. Coconut water replaces these naturally with no artificial ingredients.","🥥 After hard practice: 1 cup coconut water + 1 banana = natural electrolyte replacement that actually works."],
      ["Eat water-rich foods for extra hydration","About 20% of your daily water intake can come from food. High water-content foods also provide vitamins and minerals.","🍉 Water-rich foods: Watermelon (92% water) · Cucumber · Oranges · Strawberries · Celery. Eat these as snacks before or after practice."],
    ],
    "11-12": [
      ["10-12 cups of water daily","At this age and training volume, 10-12 cups is minimum. On hard practice days, add 2-3 more cups around the training session.","💧 Formula: Body weight in lbs ÷ 2 = ounces of water needed daily. A 100 lb swimmer needs 50oz = about 6 cups minimum, more on hard days."],
      ["Pre-practice hydration protocol","Starting hydrated means your blood volume is optimal, your heart pumps efficiently, and your muscles get oxygen faster. It's free performance.","⏰ Pre-practice: 2 cups water 2 hours before · 1 cup water 30 minutes before · Sip 4-6oz every 15-20 min during practice"],
      ["Sports drinks: when they help and when they don't","For practices under 60 minutes, water is better than Gatorade. For 90+ minute practices or competition days, sports drinks replace what sweat takes.","⚡ Rule: Practice under 60 min = water only. Practice over 90 min = water + sports drink. Competition day = both all day."],
      ["Urine color is your hydration report card","This is the most accurate daily hydration check available to you — and it's free. Do this every morning.","🟡 Color guide: Clear = over-hydrated (rare) · Pale yellow = perfect · Dark yellow = drink water now · Brown = see a doctor"],
      ["Electrolytes matter as much as water volume","Drinking only water during long practices dilutes your blood sodium. This can cause cramping, fatigue, and in severe cases hyponatremia (dangerously low sodium).","🧂 During 2+ hour practices: Add a pinch of salt to your water bottle · Use a electrolyte tablet · Or drink a sports drink every other sip"],
      ["Rehydrate BEFORE you feel thirsty","Thirst is a lagging indicator — you're already 1-2% dehydrated when you feel thirsty. By then, performance is already suffering.","📱 Tip: Set a reminder on your phone for every 2 hours during school days. By the time practice starts, you should have had 6+ cups already."],
      ["Night before a meet: extra hydration evening","The night before a competition, drink an extra 2-3 cups of water. Your body stores some of this and uses it the next morning.","🌙 Night before meet: Normal dinner + 2-3 extra cups of water spread over the evening. No sports drinks at night — the sugar can disrupt sleep."],
    ],
    "13-14": [
      ["12-16 cups of water daily during training season","At competitive training volumes (10-20 hours per week), 12-16 cups is the minimum. Many elite age groupers drink 20+ cups on hard training days.","📊 Track it: Get a 32oz water bottle. Fill it 4 times = 128oz = 16 cups. Mark the time on the side and race yourself to drink it by training time."],
      ["Sweat rate testing — know your body","Everyone sweats differently. Knowing your sweat rate tells you exactly how much to drink per hour of training.","🔬 How to test: Weigh yourself before and after a 1-hour practice. Every pound lost = 16oz of fluid. This is how much you need to replace per hour of training."],
      ["Sodium matters — don't just drink water","During 2+ hour sessions, drinking water without sodium dilutes your blood. This is called hyponatremia and causes cramping, nausea, and impaired performance.","🧂 Solution: Add electrolytes to water for any practice over 90 minutes. LMNT, Liquid IV, or simply adding 1/4 tsp salt to 32oz water works perfectly."],
      ["Caffeine and hydration — understanding the trade-off","Caffeine is a mild diuretic but the fluid in coffee or tea more than compensates. However, caffeine before practice raises heart rate and anxiety — not ideal for young swimmers.","☕ Rule: No caffeine under 16 unless medically approved. After 16, 1 cup of coffee 45-60 min before a big race can improve performance by 1-3%."],
      ["Competition day hydration plan","Race day hydration is entirely different from practice day. You need to be fully hydrated before your first event and maintain it between races.","🏊 Meet day plan: Wake up + 2 cups water · Breakfast + 1 cup · Every 30 min until warm-up: 1 cup water · Between events: coconut water or sports drink · After each race: water immediately"],
      ["Recovery hydration — replacing what you lost","You lose more than water in sweat — you lose sodium, potassium, magnesium, and chloride. Replacing just water isn't full replacement.","⚡ Post-hard-practice: 16oz water per pound lost (weigh before/after) + banana (potassium) + salty snack (sodium) + magnesium-rich food like spinach or almonds"],
      ["Overhydration is also a problem","Drinking too much plain water during a meet can actually hurt performance by diluting your blood sodium. Drink when thirsty between events, not constantly.","💡 Rule: During competition, drink 6-8oz every 15-20 minutes of waiting. Add electrolytes if you're swimming more than 3 events. Don't force-drink."],
    ],
    adult: [
      ["Hydration needs increase with age, not decrease","Many adults drink less water as they age because thirst perception decreases. This is dangerous for performance and health.","💧 Adult minimum: 14-16 cups daily during training. Add 16-20oz per hour of training. Most adult swimmers are chronically under-hydrated."],
      ["Morning hydration matters most","After 7-8 hours without water, you wake up mildly dehydrated. The first 30 minutes of your morning sets your hydration baseline for the whole day.","🌅 Morning protocol: 16-20oz water immediately on waking (before coffee) · 1 cup water with breakfast · 1 cup water mid-morning. 48oz before noon is ideal."],
      ["Electrolytes are non-negotiable for masters","As sweat rate often increases with age, electrolyte losses are proportionally larger. Water alone is insufficient for hard training sessions.","🧂 Masters recommendation: Electrolyte drink or supplement for any training over 45 minutes. LMNT, Liquid IV, or a pinch of sea salt in your water bottle."],
      ["Alcohol and hydration don't coexist well","Alcohol is a diuretic — it causes you to lose more water than you take in. A glass of wine the night before a hard practice dehydrates you measurably.","🍷 If you drink: Match every alcoholic drink with 16oz of water. Never drink within 12 hours of important training. Competition weeks: minimize completely."],
      ["Monitor your urine the night before meets","The night before a competition, your urine should be pale yellow by 8pm. If it's dark, you have hours to correct it — drink 1 cup of water every 30 minutes.","🟡 Night-before check: Pale yellow = you're good. Dark yellow = drink now. Set an alarm to check at 6pm so you have time to correct before bed."],
      ["Post-training rehydration formula","The standard recommendation is to replace 150% of fluid lost in the 2-4 hours after training. This accounts for ongoing sweat loss and urinary losses.","📊 Formula: Weigh before and after training. Multiply pounds lost by 24oz. That's how much to drink in the 2-3 hours post-training. Spread it out."],
      ["Magnesium for sleep and hydration balance","Magnesium helps regulate fluid balance, prevents muscle cramps, and dramatically improves sleep quality — all critical for masters swimmers.","💊 Magnesium glycinate 200-400mg at night improves sleep quality within 1-2 weeks for most people. Also eat: dark chocolate, spinach, almonds, black beans."],
    ],
  },
  preMeet: {
    "10U": [
      ["The night before: pasta dinner","Pasta is the classic pre-meet dinner for a reason. It gives your body 10-12 hours to digest and convert to stored glycogen energy.","🍝 Perfect night-before meal: Pasta with marinara sauce + grilled chicken + garlic bread + 2 cups of water. Simple, proven, delicious."],
      ["Morning of: oatmeal or eggs 2-3 hours before","Eat breakfast 2-3 hours before your first race. Eating too close to racing causes stomach cramps. Too long before and you're running on empty.","🥚 Best options: Oatmeal with banana and honey · Scrambled eggs with toast · Whole grain cereal with milk. Avoid greasy food (bacon, fast food) entirely."],
      ["Meet day snack bag — pack it the night before","Pack your snack bag before you go to sleep so you don't forget anything important on meet morning.","🎒 Pack: Banana · Granola bars · PB crackers · Apple slices · Gummy bears (between events) · Sports drink · Water · Rice cakes"],
      ["Between events: simple carbs only","Between races your goal is quick energy, easy digestion. This is not the time for protein or fat — they take too long to digest.","⚡ Between events: Banana · Gummy bears · Dates · Sports drink · Orange slices · Honey packets. Avoid protein bars, nut butter, or anything heavy."],
      ["Stay hydrated all day — sip constantly","Meet days are long and hot. You'll sweat even when you're not swimming. Keep your water bottle in your hand all day.","💧 Meet day: 1 cup water every 30 minutes minimum. More if it's hot. Add a sports drink after your hardest event. Don't wait until you're thirsty."],
      ["30-45 minutes before your race: light snack","A small, easy-to-digest snack right before your race top off your energy without sitting in your stomach.","🍌 Pre-race snack: Half a banana · 2-3 dates · A few crackers with honey · Sports chews. Avoid anything with fiber or fat within 1 hour of racing."],
      ["No new foods on meet day — ever","This rule is absolute. Meet day is not the time to try a new breakfast food, a new sports drink, or a new snack. Your stomach will remind you why.","⚠️ Stick to foods you've eaten before practices. If something upset your stomach in practice, it will definitely upset it on race day when nerves are already involved."],
    ],
    "11-12": [
      ["Carb-load 2 days before big meets","For important meets, start increasing carbohydrates 2 days before. This tops off your glycogen stores so you start race day with maximum stored energy.","📅 Two days before: Extra pasta, rice, bread, and fruit. Reduce fat and fiber slightly. Keep protein normal. Drink extra water with the extra carbs."],
      ["Night before: pasta + protein + sleep","The perfect pre-meet dinner is high carb, moderate protein, low fat, and eaten early enough to allow 8 hours of sleep.","🍝 Perfect meal: Spaghetti bolognese (pasta + lean meat sauce) at 6pm · Small side salad · Bread · Water · Bed by 10pm for a 7am meet"],
      ["Breakfast timing matters as much as content","2-3 hours before your first race is the target. Too early and you're hungry by race time. Too late and you feel heavy in the water.","⏰ If first race is 9am: Wake at 6am · Breakfast at 6:15am · That's exactly 2h45m. Oatmeal + banana + eggs + water is perfect for this timing."],
      ["Pack your meet bag with serious fuel","Elite age group swimmers plan their meet nutrition as carefully as their race strategy. Your snack bag is as important as your goggles.","🎒 Serious meet bag: 4+ bananas · 6 granola bars · Rice cakes + honey packets · Gummy bears or chews · 2 bottles water · 1 sports drink · PB crackers"],
      ["Between events — the 20-minute window","If your events are 20-30 minutes apart, you have a real refueling window. Use it.","⚡ 20-min window: Banana + sports drink = simple and effective. If longer than 45 minutes: Add crackers or a small granola bar. Never eat a meal between events."],
      ["Warmup nutrition affects your race","Your swim warm-up spends glycogen. Replace it between warm-up and your first race with easy-to-digest carbs.","🏊 After warm-up: 1 banana + 8oz sports drink consumed 20-30 minutes before your first event. This keeps your glycogen topped off after the warmup."],
      ["Post-meet recovery meal","After a full meet day, your body has used significant glycogen and muscle protein. The recovery meal sets up your next training session.","🍽️ Post-meet: Protein + carb + vegetables within 2 hours. Example: Chicken burrito bowl · Pasta with meat sauce · Turkey sandwich + fruit · Chocolate milk immediately after last race"],
    ],
    "13-14": [
      ["Carb-load protocol — 2 days out from major meets","The classic carb-load for swimmers is 2 days of high carbohydrate intake before a big meet. This maximizes glycogen storage in muscles and liver.","📅 48 hours before: Increase carbs by 20-30% above normal. Add extra rice, pasta, bread, potatoes. Reduce fat and fiber slightly. Keep protein at normal levels."],
      ["Night before nutrition — the last important meal","This meal needs to be done by 7-8pm so you have time to digest fully before a 7-8am meet. Sleeping on a full stomach disrupts sleep quality.","🍝 Perfect meal: Pasta marinara with chicken · Side salad (light dressing) · 2 pieces of bread · Water. No alcohol, no heavy sauces, no dairy if lactose sensitive."],
      ["Race morning nutrition — precision eating","Elite swimmers eat with precision on race morning. They know exactly what they're eating, when, and how much. Build this habit now.","⏰ Template: Wake + 16oz water immediately · 2.5 hours before race: Oatmeal (1 cup) + banana + 2 eggs + water · 30 min before: Half banana + sports chews + water"],
      ["Caffeine strategy — if approved by parents","For swimmers 14+, 1-3mg of caffeine per kilogram of body weight taken 45-60 minutes before your main event can improve performance by 1-3%.","☕ Example: 130lb (59kg) swimmer: 59-177mg caffeine. One cup of coffee is ~95mg. Green tea is ~30mg. Only try this in practice first — never race-day debut."],
      ["Mid-meet nutrition for multi-day meets","On day 2 and beyond of a big meet, carbohydrate replacement becomes critical. Your glycogen stores are depleted after day 1.","📅 Day 2 morning: Extra carbs at breakfast. Between sessions: 30-60g carbs per hour of waiting. Evening: High-carb dinner + protein. Sleep 9+ hours."],
      ["What Olympic swimmers eat on race day","Real data from USA Swimming nutritionists shows elite swimmers eat 4-6 small meals and snacks throughout a competition day.","🥇 Real example - Caeleb Dressel race day: Oatmeal + eggs at breakfast · Banana + peanut butter between warm-up and racing · Gels during long sessions · Chicken rice bowl post-session · Protein shake before bed"],
      ["Race week — what to eliminate","Race week is not the time to try anything new or eat anything that has ever upset your stomach in training.","🚫 Eliminate race week: New foods · High-fiber vegetables (broccoli, beans) · Spicy food · Excess dairy if sensitive · Fried food · Carbonated drinks · Alcohol (yes even for parents watching)"],
    ],
    adult: [
      ["Carb-load strategy for masters swimmers","Masters swimmers benefit from carb-loading the same as younger athletes. The physiology is identical — muscles and liver store glycogen regardless of age.","📅 48 hours before: Increase carbs 20-30%. Add rice, pasta, potatoes, bread. The night before: pasta dinner at 6-7pm. Morning of: oatmeal or eggs + toast 2-3 hours before first race."],
      ["Caffeine is your most powerful legal performance tool","For adults, caffeine taken 45-60 minutes before competition improves speed, power, and endurance by measurable amounts — confirmed across hundreds of studies.","☕ Optimal dose: 3-6mg per kg bodyweight. A 175lb (80kg) masters swimmer: 240-480mg. That's 2-4 cups of coffee. Take your normal amount — more than usual can cause anxiety."],
      ["GI issues on race day — how to prevent them","Gastrointestinal problems are more common in masters athletes due to decreased gut motility with age. Pre-race nerves compound this.","🚫 Avoid day-of: High-fiber foods · Excess dairy · New foods · High-fat foods · Large portions. Eat light, familiar, simple foods. Test your exact pre-race meal in training first."],
      ["Between events — masters-specific needs","Masters swimmers often compete in more events per meet. Fueling between events is critical to maintain performance across a long competition day.","⚡ Between events: 30-60g carbs per event gap. Banana + sports drink is reliable. Add sodium if sweating heavily. Avoid heavy protein until after your last race."],
      ["What elite masters swimmers eat on competition day","Real-world data from masters swimming champions shows consistent patterns in their nutrition approach.","🥇 Common pattern: Light breakfast 3 hours before · Banana + coffee 1 hour before · Small carb snacks every 45-60 minutes during competition · Recovery meal within 45 min of last race"],
      ["Recovery nutrition is more important for masters","Muscle protein synthesis is slower after 35. The post-exercise nutrition window is even more critical — and narrower — for masters athletes than young swimmers.","⏱️ Within 30 minutes: 30-40g protein + 40-60g carbs. Chocolate milk + banana works. Or: protein shake + fruit. Don't skip this — the recovery difference is significant."],
      ["Post-meet inflammation management","After a competition, systemic inflammation peaks 24-48 hours later. Managing this with nutrition speeds recovery for your next training session.","🫐 Anti-inflammatory protocol: Tart cherry juice (16oz within 30 min) · Turmeric supplement or golden milk · Omega-3 rich meal (salmon) that evening · 9 hours of sleep"],
    ],
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

function Tooltip({ id, children }) {
  const [show, setShow] = useState(false);
  const text = TOOLTIPS[id] || "";
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {children}
      {text && (
        <span
          onClick={function(e) { e.stopPropagation(); setShow(!show); }}
          style={{ width: 16, height: 16, borderRadius: "50%", background: "rgba(77,184,255,0.2)", border: "1px solid rgba(77,184,255,0.4)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: "#4db8ff", cursor: "pointer", fontWeight: 900, flexShrink: 0 }}
        >?</span>
      )}
      {show && text && (
        <span style={{ position: "absolute", top: "120%", left: 0, zIndex: 1000, background: "#0d1b2a", border: "1px solid rgba(77,184,255,0.3)", borderRadius: 10, padding: "10px 14px", fontSize: 12, color: "#d0e8ff", lineHeight: 1.6, width: 260, boxShadow: "0 4px 20px rgba(0,0,0,0.5)", cursor: "pointer" }} onClick={function() { setShow(false); }}>
          {text}
          <span style={{ display: "block", fontSize: 9, color: "#4db8ff", marginTop: 6 }}>Tap to close</span>
        </span>
      )}
    </span>
  );
}

function SectionHeader({ title, tooltipId, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
      <Tooltip id={tooltipId}>
        <span style={{ fontSize: 13, fontWeight: 800, color: color || "#4db8ff" }}>{title}</span>
      </Tooltip>
    </div>
  );
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

  // Day of year for workout rotation
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const dailyWorkout = getDailyWorkout(profile, times, tagsP, dayOfYear);

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
      const resp = await fetch("/api/scan", {
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
      setPErr("Scan failed — make sure the app is deployed on Vercel with ANTHROPIC_API_KEY set."); setPStep("preview");
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
    const payload = {
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: "You are an elite USA Swimming coach helping " + profile.name + ", age " + profile.age + ", " + (profile.gender === "boys" ? "male" : "female") + ", " + profile.ageGroup + " age group, goal: " + profile.mode + ". Be encouraging, specific, science-based, fun. Use emojis. Under 220 words. Current times: " + (summary || "none logged yet") + ".",
      messages: [{ role: "user", content: q }]
    };
    try {
      const r = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const d = await r.json();
      const block = d.content && d.content.find(function (x) { return x.type === "text"; });
      setAiA(block ? block.text : "Coach unavailable — try again!");
      setMissions(p => ({ ...p, [todayKey]: { ...p[todayKey], coach_question: true } }));
    } catch (e) {
      setAiA("Error: " + e.message);
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
              <div key={t.id} style={{ position: "relative", flexShrink: 0 }}>
                <button onClick={() => setTab(t.id)} style={{ padding: "6px 8px", borderRadius: 9, border: "none", cursor: "pointer", fontSize: 10, fontWeight: 700, fontFamily: "inherit", background: tab === t.id ? "linear-gradient(135deg,#1a5fff,#0099ff)" : "rgba(255,255,255,0.05)", color: tab === t.id ? "#fff" : "#7aa8cc" }}>
                  {t.icon} {t.l}
                </button>
              </div>
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

          {trainView === "pool" && (function() {
            const [manualFocus, setManualFocus] = useState(null);
            const workout = getDailyWorkout(profile, times, tagsP, dayOfYear, manualFocus);
            const intensityColor = workout.intensity.includes("Very High") ? "#ff6b6b" : workout.intensity.includes("High") ? "#ff9f43" : workout.intensity.includes("Easy") ? "#00ffaa" : "#ffd700";

            // Events closest to qualifying (not yet qualified)
            const tagsKeys2 = Object.keys(tagsP);
            const closestToQual = tagsKeys2.map(function(s) {
              const t = times[s]; const tags = tagsP[s];
              if (!t || !tags || t <= tags.q) return null;
              return { s: s, gap: t - tags.q };
            }).filter(Boolean).sort(function(a, b) { return a.gap - b.gap; });

            return <>
              {/* Daily workout header */}
              <Card style={{ background: "linear-gradient(135deg,rgba(0,150,255,0.1),rgba(0,200,100,0.08))", border: "1px solid rgba(77,184,255,0.25)", marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#4db8ff", fontWeight: 700, letterSpacing: 1, marginBottom: 2 }}>{workout.dayName.toUpperCase()} · DAY {(dayOfYear % 7) + 1} OF 7</div>
                    <div style={{ fontSize: 15, fontWeight: 900, color: "#fff" }}>{workout.name}</div>
                    <div style={{ fontSize: 11, color: "#7aa8cc", marginTop: 2 }}>{workout.yards.toLocaleString()} yards</div>
                    {workout.targetEvent && <div style={{ fontSize: 10, color: "#00ffaa", marginTop: 3 }}>🎯 Targeting: {workout.targetEvent} ({workout.closestEvents && workout.closestEvents[0] ? "closest to TAGS" : "your focus"})</div>}
                  </div>
                  <div style={{ textAlign: "center", padding: "8px 12px", borderRadius: 10, background: "rgba(255,255,255,0.05)" }}>
                    <div style={{ fontSize: 9, color: "#7aa8cc", marginBottom: 2 }}>INTENSITY</div>
                    <div style={{ fontSize: 13, fontWeight: 900, color: intensityColor }}>{workout.intensity.split(" —")[0]}</div>
                  </div>
                </div>
                <div style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(255,215,0,0.07)", border: "1px solid rgba(255,215,0,0.15)", fontSize: 11, color: "#ffd700", lineHeight: 1.6 }}>
                  💡 {workout.tip}
                </div>
              </Card>

              {/* CLOSEST TO TAGS — auto targeting explanation */}
              {closestToQual.length > 0 && !manualFocus && (
                <Card style={{ marginBottom: 10, border: "1px solid rgba(0,255,170,0.2)" }}>
                  <div style={{ fontSize: 11, color: "#00ffaa", fontWeight: 700, marginBottom: 6 }}>🎯 AUTO-TARGETING: CLOSEST TO TAGS</div>
                  <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 8 }}>Your workout focuses on the events you are closest to qualifying for — giving you the best chance to drop time and make TAGS cuts.</div>
                  {closestToQual.slice(0, 3).map(function(e) {
                    return (
                      <div key={e.s} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <div style={{ fontSize: 12, color: "#d0e8ff" }}>{e.s}</div>
                        <div style={{ fontSize: 12, fontWeight: 800, color: e.gap <= 1 ? "#00ffaa" : e.gap <= 3 ? "#ff9f43" : "#ffd700" }}>{e.gap.toFixed(2)}s away</div>
                      </div>
                    );
                  })}
                </Card>
              )}

              {/* MANUAL FOCUS OVERRIDE */}
              <Card style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#a78bfa", fontWeight: 700, marginBottom: 6 }}>🎛️ CHOOSE YOUR FOCUS (OPTIONAL)</div>
                <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 10 }}>Auto-targeting picks the best event for you. Or choose your own focus below.</div>
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 8 }}>
                  <button onClick={function() { setManualFocus(null); }} style={{ padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 11, fontFamily: "inherit", background: !manualFocus ? "linear-gradient(135deg,#1a5fff,#0099ff)" : "rgba(255,255,255,0.07)", color: !manualFocus ? "#fff" : "#7aa8cc" }}>🎯 Auto (Closest to TAGS)</button>
                  {tagsKeys2.map(function(ev) {
                    return (
                      <button key={ev} onClick={function() { setManualFocus(ev); }} style={{ padding: "6px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 11, fontFamily: "inherit", background: manualFocus === ev ? "linear-gradient(135deg,#7c3aed,#a78bfa)" : "rgba(255,255,255,0.07)", color: manualFocus === ev ? "#fff" : "#7aa8cc" }}>{ev}</button>
                    );
                  })}
                </div>
                {manualFocus && <div style={{ fontSize: 10, color: "#a78bfa" }}>Custom focus: {manualFocus} · <span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={function() { setManualFocus(null); }}>Reset to auto</span></div>}
              </Card>

              {/* THE WORKOUT SETS */}
              {workout.sets.map(function(set, j) {
                const isWarmup = j === 0;
                const isCooldown = j === workout.sets.length - 1;
                return (
                  <div key={j} style={{ display: "flex", gap: 12, padding: "12px 14px", borderRadius: 10, marginBottom: 8, background: isWarmup ? "rgba(0,100,255,0.07)" : isCooldown ? "rgba(0,255,170,0.04)" : "rgba(255,255,255,0.04)", border: "1px solid " + (isWarmup ? "rgba(77,184,255,0.2)" : isCooldown ? "rgba(0,255,170,0.15)" : "rgba(255,255,255,0.08)") }}>
                    <div style={{ fontSize: 12, fontWeight: 900, color: isWarmup ? "#4db8ff" : isCooldown ? "#00ffaa" : "#ffd700", flexShrink: 0, paddingTop: 1, minWidth: 22 }}>
                      {isWarmup ? "WU" : isCooldown ? "CD" : j + "."}
                    </div>
                    <div style={{ fontSize: 13, color: "#d0e8ff", lineHeight: 1.65 }}>{set}</div>
                  </div>
                );
              })}

              <Card style={{ background: "rgba(255,100,100,0.04)", border: "1px solid rgba(255,100,100,0.15)", marginTop: 4 }}>
                <div style={{ fontSize: 11, color: "#ff8888", fontWeight: 700, marginBottom: 4 }}>⚠️ IMPORTANT</div>
                <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.6 }}>This supplements your team practice — it does not replace it. Check with your coach before adding yardage. Stop if you feel pain. Always warm up properly.</div>
              </Card>

              <div style={{ textAlign: "center", marginTop: 10, padding: "10px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 10, color: "#7aa8cc" }}>Workout rotates daily · Tomorrow's focus:</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginTop: 2 }}>{workout.nextWorkout}</div>
              </div>
            </>;
          })()}
        </>}

        {/* SKILLS — Olympic Level Coaching Library */}
        {tab === "skills" && (function() {
          const [activeStroke, setActiveStroke] = useState("freestyle");
          const [activeCategory, setActiveCategory] = useState(null);
          const [skillsView, setSkillsView] = useState("library"); // library | daily | channels

          const strokeData = TECHNIQUE_LIBRARY[activeStroke];
          const categoryKeys = strokeData ? Object.keys(strokeData.categories) : [];

          // Auto-select first category when stroke changes
          const currentCat = activeCategory && strokeData && strokeData.categories[activeCategory] ? activeCategory : categoryKeys[0];

          const catData = strokeData && strokeData.categories[currentCat];
          const tips = catData ? catData.tips : [];
          const todayTip = tips[dayOfYear % tips.length];
          const allTips = tips; // Show all tips, highlight today's

          return <>
            {/* Header */}
            <Card style={{ background: "linear-gradient(135deg,rgba(251,191,36,0.08),rgba(26,95,255,0.08))", border: "1px solid rgba(251,191,36,0.2)", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#fbbf24", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>🎬 OLYMPIC-LEVEL COACHING LIBRARY</div>
              <div style={{ fontSize: 12, color: "#7aa8cc", lineHeight: 1.6 }}>Technique, body position, kick, pull, turns, starts, mental training — everything. Tips rotate daily so you always learn something new. Sourced from Olympic coaches and world record holders.</div>
            </Card>

            {/* View toggle */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[["library","📚 Full Library"],["daily","⭐ Today's Tip"],["channels","📺 Channels"]].map(function(item) {
                return <button key={item[0]} onClick={function() { setSkillsView(item[0]); }} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", background: skillsView === item[0] ? "linear-gradient(135deg,#b45309,#f59e0b)" : "rgba(255,255,255,0.05)", color: skillsView === item[0] ? "#fff" : "#7aa8cc" }}>{item[1]}</button>;
              })}
            </div>

            {/* TODAY'S TIP — one featured tip per day */}
            {skillsView === "daily" && <>
              <Card style={{ background: "linear-gradient(135deg,rgba(251,191,36,0.1),rgba(255,100,0,0.08))", border: "1px solid rgba(251,191,36,0.3)", marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#fbbf24", fontWeight: 700, letterSpacing: 1.5, marginBottom: 4 }}>TODAY'S FEATURED TIP</div>
                <div style={{ fontSize: 12, color: "#fbbf24" }}>{strokeData && strokeData.label} · {catData && catData.label}</div>
              </Card>
              {strokeData && catData && (
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: 20, border: "1px solid rgba(251,191,36,0.25)", marginBottom: 12 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>💡</div>
                  <div style={{ fontSize: 15, color: "#fff", lineHeight: 1.75, fontWeight: 600 }}>{todayTip}</div>
                  <div style={{ marginTop: 14, fontSize: 10, color: "#7aa8cc" }}>Tip {(dayOfYear % tips.length) + 1} of {tips.length} in this category · New tip tomorrow</div>
                </div>
              )}
              <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 10 }}>All tips for {catData && catData.label}:</div>
              {allTips.map(function(tip, i) {
                const isToday = i === (dayOfYear % tips.length);
                return (
                  <div key={i} style={{ background: isToday ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", marginBottom: 7, border: "1px solid " + (isToday ? "rgba(251,191,36,0.35)" : "rgba(255,255,255,0.06)"), display: "flex", gap: 10 }}>
                    <div style={{ flexShrink: 0 }}>
                      {isToday ? <div style={{ fontSize: 16 }}>⭐</div> : <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#7aa8cc" }}>{i + 1}</div>}
                    </div>
                    <div style={{ fontSize: 13, color: isToday ? "#ffd700" : "#d0e8ff", lineHeight: 1.65 }}>{tip}</div>
                  </div>
                );
              })}
              {/* Browse other strokes */}
              <div style={{ fontSize: 11, color: "#7aa8cc", marginTop: 16, marginBottom: 8 }}>Browse other strokes:</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {Object.keys(TECHNIQUE_LIBRARY).map(function(sk) {
                  return <Chip key={sk} on={activeStroke === sk} onClick={function() { setActiveStroke(sk); setActiveCategory(null); }} color="#b45309">{TECHNIQUE_LIBRARY[sk].label}</Chip>;
                })}
              </div>
            </>}

            {/* FULL LIBRARY */}
            {skillsView === "library" && <>
              {/* Stroke selector */}
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 12 }}>
                {Object.keys(TECHNIQUE_LIBRARY).map(function(sk) {
                  const sd = TECHNIQUE_LIBRARY[sk];
                  return <Chip key={sk} on={activeStroke === sk} onClick={function() { setActiveStroke(sk); setActiveCategory(null); }} color="#7c3aed">{sd.label}</Chip>;
                })}
              </div>

              {/* Category selector */}
              {strokeData && (
                <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
                  {Object.keys(strokeData.categories).map(function(ck) {
                    const cd = strokeData.categories[ck];
                    return (
                      <button key={ck} onClick={function() { setActiveCategory(ck); }} style={{ padding: "6px 12px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 11, fontFamily: "inherit", background: currentCat === ck ? "linear-gradient(135deg,#b45309,#f59e0b)" : "rgba(255,255,255,0.07)", color: currentCat === ck ? "#fff" : "#7aa8cc" }}>
                        {cd.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Tips for selected category */}
              {catData && <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 12, fontWeight: 800, color: "#fbbf24" }}>{strokeData.label} — {catData.label}</div>
                  <div style={{ fontSize: 9, color: "#7aa8cc" }}>⭐ = today's featured tip</div>
                </div>
                {catData.tips.map(function(tip, i) {
                  const isToday = i === (dayOfYear % catData.tips.length);
                  return (
                    <div key={i} style={{ background: isToday ? "rgba(251,191,36,0.07)" : "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px 16px", marginBottom: 8, border: "1px solid " + (isToday ? "rgba(251,191,36,0.3)" : "rgba(251,191,36,0.08)"), display: "flex", gap: 10 }}>
                      <div style={{ flexShrink: 0 }}>
                        {isToday
                          ? <div style={{ fontSize: 16 }}>⭐</div>
                          : <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(251,191,36,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fbbf24", fontWeight: 800 }}>{i + 1}</div>
                        }
                      </div>
                      <div>
                        <div style={{ fontSize: 13, color: isToday ? "#ffd700" : "#d0e8ff", lineHeight: 1.7 }}>{tip}</div>
                        {isToday && <div style={{ fontSize: 9, color: "#fbbf24", marginTop: 4 }}>Today's featured tip</div>}
                      </div>
                    </div>
                  );
                })}
              </>}
            </>}

            {/* CHANNELS */}
            {skillsView === "channels" && CHANNELS.map(function(ch) {
              return (
                <div key={ch.name} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 12, padding: "14px", marginBottom: 8, border: "1px solid rgba(251,191,36,0.12)" }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>{ch.icon}</div>
                    <div><div style={{ fontWeight: 900, fontSize: 14, color: "#fbbf24" }}>{ch.name}</div><div style={{ fontSize: 11, color: "#7aa8cc", marginTop: 3, lineHeight: 1.5 }}>{ch.desc}</div></div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "rgba(251,191,36,0.07)" }}>
                    <div style={{ fontSize: 10, color: "#7aa8cc", flex: 1 }}>{ch.url}</div>
                    <button onClick={function() { navigator.clipboard && navigator.clipboard.writeText("https://" + ch.url).catch(function(){}); }} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(251,191,36,0.3)", background: "rgba(251,191,36,0.15)", color: "#fbbf24", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Copy</button>
                  </div>
                </div>
              );
            })}
          </>;
        })()}

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
          {/* RACE SPLIT ANALYZER — with auto-populate from logged times */}
          <Card style={{ marginBottom: 12, border: "1px solid rgba(167,139,250,0.3)" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#a78bfa", marginBottom: 4 }}>⚡ RACE SPLIT ANALYZER</div>
            <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 12, lineHeight: 1.6 }}>
              Enter your 50-yard splits manually, OR pick an event you have logged and auto-populate the estimated splits based on your best time to see where you should be pacing.
            </div>
            <Lbl>Event</Lbl>
            <select value={splitEvent} onChange={function(e) { setSplitEvent(e.target.value); setSplitResult(null); setSplitTimes(["","","","","","","","",""]); }} style={{ ...iStyle, cursor: "pointer" }}>
              <option value="">Select event</option>
              {["100 Free","200 Free","500 Free","100 Back","200 Back","100 Breast","200 Breast","100 Fly","200 Fly","200 IM","400 IM"].map(function(e) { return <option key={e}>{e}</option>; })}
            </select>

            {splitEvent && (function() {
              const numSplits = splitEvent.includes("100") ? 2 : splitEvent.includes("200") ? 4 : splitEvent.includes("500") ? 10 : 8;
              const hasLoggedTime = !!(times[splitEvent]);
              const loggedTime = times[splitEvent];

              // Auto-populate estimated splits from logged best time
              function autoPopulate() {
                if (!loggedTime) return;
                const splitLen = loggedTime / numSplits;
                // Apply realistic pacing curve: first split slightly faster, last slightly slower
                const pacing = numSplits === 2 ? [0.495, 0.505] :
                               numSplits === 4 ? [0.24, 0.255, 0.255, 0.25] :
                               [0.095, 0.105, 0.105, 0.105, 0.103, 0.102, 0.102, 0.102, 0.103, 0.078]; // 500
                const estimated = pacing.slice(0, numSplits).map(function(p) { return (loggedTime * p).toFixed(2); });
                // Normalize so they sum to logged time
                const sum = estimated.reduce(function(a, b) { return a + parseFloat(b); }, 0);
                const scale = loggedTime / sum;
                const normalized = estimated.map(function(t) { return (parseFloat(t) * scale).toFixed(2); });
                const newTimes = ["","","","","","","","",""];
                normalized.forEach(function(t, i) { newTimes[i] = t; });
                setSplitTimes(newTimes);
                notify("Splits estimated from your best time of " + fmt(loggedTime) + " 📊", "#a78bfa");
              }

              return <>
                {hasLoggedTime && (
                  <div style={{ marginBottom: 10, padding: "10px 12px", borderRadius: 10, background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 700 }}>YOUR BEST TIME</div>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "#fff" }}>{fmt(loggedTime)}</div>
                    </div>
                    <button onClick={autoPopulate} style={{ padding: "9px 14px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
                      ✨ Auto-Fill Splits
                    </button>
                  </div>
                )}

                <Lbl>Enter your actual 50-yard splits from a race</Lbl>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 10 }}>
                  {Array.from({ length: numSplits }).map(function(_, i) {
                    return (
                      <div key={i} style={{ position: "relative" }}>
                        <div style={{ fontSize: 9, color: "#7aa8cc", marginBottom: 2 }}>Split {i + 1} ({i === 0 ? "Yards " : ""}{(i + 1) * 50})</div>
                        <input value={splitTimes[i]} onChange={function(e) { setSplitTimes(function(p) { const n = [...p]; n[i] = e.target.value; return n; }); }} placeholder={"e.g. 27." + (4 + i)} style={{ ...iStyle, marginBottom: 0, fontSize: 15, fontWeight: 700 }} />
                      </div>
                    );
                  })}
                </div>

                {/* Live total as splits are entered */}
                {(function() {
                  const filled = splitTimes.slice(0, numSplits).map(function(t) { return parseFloat(t); }).filter(function(t) { return !isNaN(t); });
                  if (filled.length < 2) return null;
                  const runningTotal = filled.reduce(function(a, b) { return a + b; }, 0);
                  return (
                    <div style={{ marginBottom: 10, padding: "8px 12px", borderRadius: 8, background: "rgba(0,100,255,0.06)", border: "1px solid rgba(77,184,255,0.15)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: 11, color: "#7aa8cc" }}>Running total ({filled.length}/{numSplits} splits)</div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: "#4db8ff" }}>{fmt(runningTotal)}</div>
                    </div>
                  );
                })()}

                <button onClick={function() {
                  const filled = splitTimes.slice(0, numSplits).filter(function(t) { return t.trim(); });
                  if (filled.length < 2) { notify("Enter at least 2 splits", "#ff6b6b"); return; }
                  const parsed = filled.map(function(t) { return parseFloat(t); }).filter(function(t) { return !isNaN(t); });
                  const total = parsed.reduce(function(a, b) { return a + b; }, 0);
                  const half = Math.ceil(parsed.length / 2);
                  const first = parsed.slice(0, half).reduce(function(a, b) { return a + b; }, 0);
                  const second = parsed.slice(half).reduce(function(a, b) { return a + b; }, 0);
                  const isNeg = second < first;
                  const fastest = Math.min(...parsed);
                  const slowest = Math.max(...parsed);
                  const drop = ((slowest - fastest) / fastest * 100).toFixed(1);
                  const iq = Math.max(0, Math.min(100, Math.round(100 - parseFloat(drop) * 5 + (isNeg ? 15 : 0))));
                  const slowestIdx = parsed.indexOf(slowest);
                  setSplitResult({ parsed, total, isNeg, drop, fastest, slowest, iq, slowestIdx });
                  addXP(30, "Race analyzed! 🔬");
                }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c3aed,#a78bfa)", color: "#fff", fontWeight: 900, cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>Analyze Race 🔬</button>

                {splitResult && <>
                  <div style={{ marginTop: 14, padding: "16px", borderRadius: 12, background: "rgba(167,139,250,0.08)", border: "1px solid rgba(167,139,250,0.25)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontSize: 10, color: "#a78bfa", fontWeight: 700, marginBottom: 2 }}>RACE IQ SCORE</div>
                        <div style={{ fontSize: 40, fontWeight: 900, color: splitResult.iq >= 80 ? "#00ffaa" : splitResult.iq >= 60 ? "#ffd700" : "#ff6b6b" }}>{splitResult.iq}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 13, fontWeight: 800, color: splitResult.isNeg ? "#00ffaa" : "#ff9f43", marginBottom: 4 }}>{splitResult.isNeg ? "✅ Negative Split" : "⚠️ Positive Split"}</div>
                        <div style={{ fontSize: 11, color: "#7aa8cc" }}>Total: {fmt(splitResult.total)}</div>
                        <div style={{ fontSize: 11, color: "#7aa8cc" }}>Drop-off: {splitResult.drop}%</div>
                      </div>
                    </div>

                    {/* Visual split breakdown */}
                    <div style={{ marginBottom: 12 }}>
                      {splitResult.parsed.map(function(split, i) {
                        const isSlowst = split === splitResult.slowest;
                        const isFastest = split === splitResult.fastest;
                        const barWidth = Math.max(20, 100 - ((split - splitResult.fastest) / (splitResult.slowest - splitResult.fastest || 1)) * 60);
                        return (
                          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                            <div style={{ fontSize: 10, color: "#7aa8cc", width: 50, flexShrink: 0 }}>Split {i + 1}</div>
                            <div style={{ flex: 1, height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                              <div style={{ width: barWidth + "%", height: "100%", borderRadius: 4, background: isFastest ? "#00ffaa" : isSlowst ? "#ff6b6b" : "#a78bfa" }} />
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 800, color: isFastest ? "#00ffaa" : isSlowst ? "#ff6b6b" : "#d0e8ff", width: 50, textAlign: "right" }}>{split.toFixed(2)}</div>
                            {isFastest && <div style={{ fontSize: 9, color: "#00ffaa", width: 40 }}>fastest</div>}
                            {isSlowst && !isFastest && <div style={{ fontSize: 9, color: "#ff6b6b", width: 40 }}>slowest</div>}
                          </div>
                        );
                      })}
                    </div>

                    <div style={{ padding: "10px 12px", borderRadius: 10, background: "rgba(0,0,0,0.2)", fontSize: 12, color: "#d0e8ff", lineHeight: 1.7 }}>
                      {splitResult.isNeg
                        ? "🌟 Excellent pacing! You swam the second half faster than the first. This is what elite swimmers do consistently. Your race IQ is high."
                        : "💡 You went out too fast and slowed down in the second half. Try holding back 5-10% in the first half. The time you save early more than compensates in the second half."}
                      {splitResult.slowestIdx > 0 && !splitResult.isNeg && " Your slowest split was #" + (splitResult.slowestIdx + 1) + " — this is where you started dying. Focus your training on maintaining speed through this point."}
                    </div>

                    <button onClick={function() { setAiQ("Analyze my " + splitEvent + " race splits: " + splitResult.parsed.map(function(s, i) { return "Split " + (i+1) + ": " + s.toFixed(2); }).join(", ") + ". Total: " + fmt(splitResult.total) + ". Give me specific advice on how to improve my pacing and race strategy for this event."); setTab("coach"); askCoach("Analyze my " + splitEvent + " race splits: " + splitResult.parsed.map(function(s, i) { return "Split " + (i+1) + ": " + s.toFixed(2); }).join(", ") + ". Total: " + fmt(splitResult.total) + ". Give me specific advice on how to improve my pacing and race strategy for this event."); }} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid rgba(77,184,255,0.3)", background: "rgba(77,184,255,0.08)", color: "#4db8ff", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginTop: 10, fontSize: 12 }}>
                      🤖 Send to AI Coach for detailed analysis →
                    </button>
                  </div>
                </>}
              </>;
            })()}
          </Card>

          {/* AI COACH */}
          <Card style={{ background: "rgba(0,100,255,0.07)" }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#4db8ff", marginBottom: 4 }}>🤖 AI COACH — Powered by Claude</div>
            <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 12, lineHeight: 1.6 }}>
              Your profile, age, goal, and all logged times are pre-loaded into every question. Ask anything — training plans, technique, nutrition, race strategy, mental prep, split analysis, or anything else.
            </div>
            {["How close am I to TAGS and what is my fastest path to qualify?","Build me a personalized 4-week plan to drop time","What is my strongest event and where should I focus first?","How do I fix my turns and underwater kicks?","What should I eat the week before my big meet?","How do I stay calm and confident on the blocks?","Explain how to perfect the high elbow catch in freestyle","Build me a race plan for my 200 IM","What mental training should I be doing between practices?"].map(function(q) {
              return <button key={q} onClick={function() { askCoach(q); }} style={{ display: "block", width: "100%", textAlign: "left", marginBottom: 7, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(77,184,255,0.12)", color: "#d0e8ff", borderRadius: 10, padding: "11px 14px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", lineHeight: 1.5 }}>{q}</button>;
            })}
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <input value={aiQ} onChange={function(e) { setAiQ(e.target.value); }} onKeyDown={function(e) { if (e.key === "Enter" && aiQ) askCoach(aiQ); }} placeholder="Ask anything about swimming..." style={{ ...iStyle, flex: 1, margin: 0 }} />
              <button onClick={function() { if (aiQ) askCoach(aiQ); }} style={{ background: "linear-gradient(135deg,#1a5fff,#0099ff)", border: "none", color: "#fff", borderRadius: 10, padding: "10px 18px", fontWeight: 800, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}>Ask</button>
            </div>
            {aiLoad && <div style={{ textAlign: "center", color: "#4db8ff", fontSize: 14, marginTop: 20 }}>🧠 Coach is analyzing your profile...</div>}
            {aiA && <div style={{ marginTop: 14, background: "rgba(0,100,255,0.06)", borderRadius: 14, padding: 18, border: "1px solid rgba(77,184,255,0.2)", fontSize: 14, lineHeight: 1.75, whiteSpace: "pre-wrap", color: "#d0e8ff" }}>{aiA}</div>}
          </Card>
        </>}

        {/* NUTRITION */}
        {tab === "nutrition" && (function() {
          const [nutrTipIndex, setNutrTipIndex] = useState(dayOfYear % 7);
          const tips = (NUTRITION_DATA[nutrTab] && NUTRITION_DATA[nutrTab][nutrAge]) || [];
          const currentTip = tips[nutrTipIndex % tips.length];
          const [expanded, setExpanded] = useState(null);

          return <>
            <Card style={{ background: "linear-gradient(135deg,rgba(0,200,100,0.08),rgba(26,95,255,0.08))", border: "1px solid rgba(0,255,170,0.2)", marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: "#00ffaa", fontWeight: 700, marginBottom: 4 }}>🥗 FUEL LIKE AN OLYMPIAN</div>
              <div style={{ fontSize: 12, color: "#7aa8cc", lineHeight: 1.6 }}>
                Nutrition plan for age {profile.age}. Tips rotate daily — tap any card for full details including real meal examples. Tap the ? buttons for more options and ideas.
              </div>
            </Card>

            {/* Tab selector */}
            <div style={{ display: "flex", gap: 5, marginBottom: 14, flexWrap: "wrap" }}>
              {[["daily","🍽️ Daily Eating"],["hydration","💧 Hydration"],["preMeet","🏁 Pre-Meet"]].map(function(item) {
                return <button key={item[0]} onClick={function() { setNutrTab(item[0]); setExpanded(null); setNutrTipIndex(dayOfYear % 7); }} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11, fontWeight: 700, fontFamily: "inherit", background: nutrTab === item[0] ? "linear-gradient(135deg,#00cc88,#0099ff)" : "rgba(255,255,255,0.05)", color: nutrTab === item[0] ? "#fff" : "#7aa8cc", minWidth: "30%" }}>{item[1]}</button>;
              })}
            </div>

            {/* Today's featured tip */}
            {currentTip && (
              <Card style={{ background: "linear-gradient(135deg,rgba(0,255,170,0.07),rgba(0,100,255,0.07))", border: "1px solid rgba(0,255,170,0.25)", marginBottom: 12 }}>
                <div style={{ fontSize: 10, color: "#00ffaa", fontWeight: 700, letterSpacing: 1.5, marginBottom: 6 }}>⭐ TODAY'S FEATURED TIP</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{currentTip[0]}</div>
                <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.65, marginBottom: 8 }}>{currentTip[1]}</div>
                <div style={{ padding: "8px 10px", borderRadius: 8, background: "rgba(0,255,170,0.07)", border: "1px solid rgba(0,255,170,0.15)", fontSize: 11, color: "#00ffaa", lineHeight: 1.6 }}>{currentTip[2]}</div>
              </Card>
            )}

            {/* All tips for this category — expandable */}
            <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 8 }}>All {tips.length} tips — tap any to expand:</div>
            {tips.map(function(tip, i) {
              const isToday = i === (nutrTipIndex % tips.length);
              const isOpen = expanded === i;
              return (
                <div key={i} onClick={function() { setExpanded(isOpen ? null : i); }} style={{ background: isToday ? "rgba(0,255,170,0.06)" : "rgba(255,255,255,0.03)", borderRadius: 12, padding: "12px 14px", marginBottom: 8, border: "1px solid " + (isToday ? "rgba(0,255,170,0.25)" : "rgba(255,255,255,0.07)"), cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ flexShrink: 0 }}>
                      {isToday ? <div style={{ fontSize: 14 }}>⭐</div> : <div style={{ width: 22, height: 22, borderRadius: "50%", background: "rgba(0,255,170,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#00ffaa", fontWeight: 800 }}>{i + 1}</div>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: isToday ? "#00ffaa" : "#e8f4ff" }}>{tip[0]}</div>
                    </div>
                    <div style={{ fontSize: 11, color: "#4db8ff" }}>{isOpen ? "▲" : "▼"}</div>
                  </div>
                  {isOpen && <>
                    <div style={{ marginTop: 10, fontSize: 12, color: "#d0e8ff", lineHeight: 1.7 }}>{tip[1]}</div>
                    <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 8, background: "rgba(0,255,170,0.06)", border: "1px solid rgba(0,255,170,0.15)", fontSize: 12, color: "#00ffaa", lineHeight: 1.65 }}>{tip[2]}</div>
                  </>}
                </div>
              );
            })}

            {/* Next tip button */}
            <button onClick={function() { setNutrTipIndex(function(p) { return (p + 1) % tips.length; }); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid rgba(0,255,170,0.3)", background: "rgba(0,255,170,0.08)", color: "#00ffaa", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 12, fontSize: 13 }}>
              🔄 Show Another Tip
            </button>

            {/* AI Coach referral */}
            <Card style={{ background: "linear-gradient(135deg,rgba(26,95,255,0.1),rgba(0,100,255,0.07))", border: "1px solid rgba(77,184,255,0.25)" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginBottom: 6 }}>🤖 Want personalized nutrition advice?</div>
              <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.65, marginBottom: 10 }}>Your AI Coach knows your age, goal, and training profile. Ask it anything about nutrition — specific meal plans, timing around practices, pre-meet recipes, supplement questions, or anything else.</div>
              <div style={{ fontSize: 11, color: "#7aa8cc", marginBottom: 10 }}>Example questions to ask your AI Coach:</div>
              {[
                "Build me a 7-day meal plan for a swimmer my age",
                "What should I eat the day before my big meet?",
                "I'm always tired after practice — what am I missing nutritionally?",
                "Give me 5 easy high-protein breakfast ideas for swimmers",
                "How much should I eat on heavy training days vs rest days?",
              ].map(function(q) {
                return (
                  <button key={q} onClick={function() { setTab("coach"); setAiQ(q); }} style={{ display: "block", width: "100%", textAlign: "left", marginBottom: 7, background: "rgba(77,184,255,0.06)", border: "1px solid rgba(77,184,255,0.15)", color: "#d0e8ff", borderRadius: 9, padding: "10px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", lineHeight: 1.5 }}>
                    💬 {q}
                    <span style={{ display: "block", fontSize: 9, color: "#4db8ff", marginTop: 3 }}>Tap to ask your AI Coach →</span>
                  </button>
                );
              })}
            </Card>

            <Card style={{ background: "rgba(255,215,0,0.05)", border: "1px solid rgba(255,215,0,0.2)" }}>
              <div style={{ fontSize: 11, color: "#ffd700", fontWeight: 700, marginBottom: 4 }}>⚠️ IMPORTANT</div>
              <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.7 }}>{age <= 14 ? "This is evidence-based general guidance for young athletes. Always talk to your parents and doctor before making major dietary changes. Never restrict food intake — growing athletes need adequate fuel to train and develop properly." : "Evidence-based sports nutrition guidance. For a fully personalized plan, consult a Registered Dietitian who specializes in sports performance."}</div>
            </Card>
          </>;
        })()}

        {/* FAMILY */}
        {tab === "family" && (function() {
          // Detect if this looks like a parent (name contains "dad","mom","parent" or manually set)
          const isParentMode = !!(load().parentCodes);
          const [parentCodes, setParentCodes] = useState(function() { return load().parentCodes || []; });
          const [newCode, setNewCode] = useState("");
          const [newChildName, setNewChildName] = useState("");
          const [selectedChild, setSelectedChild] = useState(0);
          const [viewMode, setViewMode] = useState("swimmer"); // swimmer | parent

          function saveParentCodes(codes) {
            setParentCodes(codes);
            const existing = load();
            existing.parentCodes = codes;
            save(existing);
          }

          function addChildCode() {
            if (!newCode.trim() || !newChildName.trim()) { notify("Enter both name and code", "#ff6b6b"); return; }
            const updated = [...parentCodes, { name: newChildName.trim(), code: newCode.trim().toUpperCase(), addedAt: todayKey }];
            saveParentCodes(updated);
            setNewChildName(""); setNewCode("");
            notify(newChildName + " added! 👨‍👩‍👦", "#c084fc");
          }

          function removeChild(i) {
            const updated = parentCodes.filter(function(_, idx) { return idx !== i; });
            saveParentCodes(updated);
            if (selectedChild >= updated.length) setSelectedChild(0);
          }

          return <>
            {/* Mode toggle */}
            <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
              {[["swimmer","🏊 My Stats"],["parent","👨‍👩‍👦 Parent View"]].map(function(item) {
                return <button key={item[0]} onClick={function() { setViewMode(item[0]); }} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, fontFamily: "inherit", background: viewMode === item[0] ? "linear-gradient(135deg,#7c3aed,#c084fc)" : "rgba(255,255,255,0.05)", color: viewMode === item[0] ? "#fff" : "#7aa8cc" }}>{item[1]}</button>;
              })}
            </div>

            {/* SWIMMER VIEW */}
            {viewMode === "swimmer" && <>
              <Card style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,100,255,0.07))", border: "1px solid rgba(168,85,247,0.25)", marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#c084fc", fontWeight: 700, marginBottom: 4 }}>❤️ SHARE WITH YOUR PARENTS</div>
                <div style={{ fontSize: 12, color: "#7aa8cc" }}>Give your parents this code. They enter it in their Parent View to see your progress.</div>
              </Card>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#c084fc", marginBottom: 8 }}>Your Family Code</div>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#fff", letterSpacing: 4, textAlign: "center", padding: "20px 0", background: "rgba(168,85,247,0.08)", borderRadius: 10, marginBottom: 8, border: "1px solid rgba(168,85,247,0.2)" }}>{familyCode}</div>
                <button onClick={function() { navigator.clipboard && navigator.clipboard.writeText(familyCode).catch(function(){}); notify("Code copied! Text it to your parents 📱", "#c084fc"); }} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "rgba(168,85,247,0.2)", color: "#c084fc", fontWeight: 800, cursor: "pointer", fontFamily: "inherit", marginBottom: 8 }}>📋 Copy Code</button>
                <div style={{ fontSize: 11, color: "#7aa8cc", textAlign: "center" }}>Text this to Mom and Dad — they tap Parent View and enter it</div>
              </Card>
              <Card>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginBottom: 12 }}>📊 Your Stats Summary</div>
                {[{l:"Events Logged",v:Object.keys(times).length},{l:"TAGS Cuts Hit",v:qualified.length,c:"#00ffaa"},{l:"Training Streak",v:streak+" days",c:streak>0?"#ffd700":undefined},{l:"Badges Earned",v:earned.length+"/"+BADGES_DEF.length,c:"#ffd700"},{l:"Total Sessions",v:logs.length},{l:"Personal Bests",v:logs.filter(function(l){return l.isPB;}).length,c:"#ff9f43"}].map(function(r) {
                  return <div key={r.l} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 13, color: "#7aa8cc" }}>{r.l}</span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: r.c || "#e8f4ff" }}>{r.v}</span>
                  </div>;
                })}
              </Card>
            </>}

            {/* PARENT VIEW */}
            {viewMode === "parent" && <>
              <Card style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.1),rgba(0,100,255,0.07))", border: "1px solid rgba(168,85,247,0.25)", marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: "#c084fc", fontWeight: 700, marginBottom: 4 }}>👨‍👩‍👦 PARENT DASHBOARD</div>
                <div style={{ fontSize: 12, color: "#7aa8cc" }}>Add your children using their Family Code. You can track multiple swimmers. Each child gets their own code from their Family tab.</div>
              </Card>

              {/* Add child */}
              <Card>
                <div style={{ fontSize: 12, fontWeight: 800, color: "#c084fc", marginBottom: 10 }}>➕ Add a Child</div>
                <Lbl>Child's Name</Lbl>
                <input value={newChildName} onChange={function(e) { setNewChildName(e.target.value); }} placeholder="e.g. Christian" style={iStyle} />
                <Lbl>Their Family Code</Lbl>
                <input value={newCode} onChange={function(e) { setNewCode(e.target.value.toUpperCase()); }} placeholder="e.g. CHRI-4829" style={{ ...iStyle, letterSpacing: 2, fontWeight: 700, fontSize: 16 }} />
                <button onClick={addChildCode} style={{ width: "100%", padding: 12, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#7c3aed,#c084fc)", color: "#fff", fontWeight: 800, cursor: "pointer", fontFamily: "inherit" }}>Add Child 👨‍👩‍👦</button>
              </Card>

              {/* Child selector */}
              {parentCodes.length > 0 && <>
                <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
                  {parentCodes.map(function(child, i) {
                    return <button key={i} onClick={function() { setSelectedChild(i); }} style={{ padding: "8px 16px", borderRadius: 20, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 12, fontFamily: "inherit", background: selectedChild === i ? "linear-gradient(135deg,#7c3aed,#c084fc)" : "rgba(255,255,255,0.07)", color: selectedChild === i ? "#fff" : "#7aa8cc" }}>{child.name}</button>;
                  })}
                </div>

                {/* Selected child dashboard */}
                {(function() {
                  const child = parentCodes[selectedChild];
                  if (!child) return null;

                  // Decode what we can from the family code
                  // The code is NAME-NUMS, we show what was stored
                  return <>
                    <Card style={{ background: "linear-gradient(135deg,rgba(168,85,247,0.08),rgba(0,100,255,0.06))", border: "1px solid rgba(168,85,247,0.2)", marginBottom: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{child.name}</div>
                          <div style={{ fontSize: 11, color: "#c084fc", marginTop: 2 }}>Code: {child.code}</div>
                          <div style={{ fontSize: 10, color: "#7aa8cc", marginTop: 2 }}>Added {child.addedAt}</div>
                        </div>
                        <button onClick={function() { removeChild(selectedChild); }} style={{ fontSize: 10, padding: "4px 10px", borderRadius: 6, border: "1px solid rgba(255,100,100,0.3)", background: "rgba(255,100,100,0.1)", color: "#ff6b6b", cursor: "pointer", fontFamily: "inherit" }}>Remove</button>
                      </div>
                    </Card>

                    <Card style={{ border: "1px solid rgba(255,215,0,0.2)", background: "rgba(255,215,0,0.04)" }}>
                      <div style={{ fontSize: 11, color: "#ffd700", fontWeight: 700, marginBottom: 8 }}>📱 HOW TO SEE THEIR LIVE DATA</div>
                      <div style={{ fontSize: 12, color: "#d0e8ff", lineHeight: 1.7 }}>
                        Right now SwimIQ saves data on each swimmer's own device. To see {child.name}'s live stats:
                      </div>
                      <div style={{ marginTop: 10 }}>
                        {["Ask " + child.name + " to open SwimIQ on their phone","They tap ❤️ Family tab","They tap 📊 Progress Summary and show you their screen","Or they take a screenshot and send it to you"].map(function(step, i) {
                          return <div key={i} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                            <div style={{ fontSize: 13, color: "#c084fc", fontWeight: 800, flexShrink: 0 }}>{i+1}.</div>
                            <div style={{ fontSize: 12, color: "#d0e8ff" }}>{step}</div>
                          </div>;
                        })}
                      </div>
                      <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 8, background: "rgba(77,184,255,0.07)", border: "1px solid rgba(77,184,255,0.2)", fontSize: 11, color: "#4db8ff", lineHeight: 1.6 }}>
                        🔮 <strong>Coming soon:</strong> Real-time sync so you see their live dashboard automatically. This requires adding a cloud database — it's on the roadmap!
                      </div>
                    </Card>

                    {/* Quick message to send */}
                    <Card>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#4db8ff", marginBottom: 8 }}>💬 Send {child.name} a Motivational Nudge</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {["Hey " + child.name + " — check SwimIQ and log today's practice! 💪","How's training going? Open SwimIQ and share your TAGS progress with me 🏊","Don't forget your dryland exercises today! Every rep counts 🔥","I'm proud of your consistency — keep it up! Check your streak on SwimIQ ⭐"].map(function(msg, i) {
                          return <button key={i} onClick={function() { navigator.clipboard && navigator.clipboard.writeText(msg).catch(function(){}); notify("Message copied! Paste it in a text 📱", "#00ffaa"); }} style={{ textAlign: "left", padding: "10px 12px", borderRadius: 9, border: "1px solid rgba(77,184,255,0.12)", background: "rgba(255,255,255,0.03)", color: "#d0e8ff", cursor: "pointer", fontFamily: "inherit", fontSize: 12, lineHeight: 1.5 }}>
                            {msg}
                            <span style={{ display: "block", fontSize: 9, color: "#4db8ff", marginTop: 4 }}>Tap to copy</span>
                          </button>;
                        })}
                      </div>
                    </Card>
                  </>;
                })()}
              </>}

              {parentCodes.length === 0 && <Card style={{ textAlign: "center", padding: "40px 20px" }}>
                <div style={{ fontSize: 40, marginBottom: 10 }}>👨‍👩‍👦</div>
                <div style={{ color: "#7aa8cc", fontSize: 13 }}>Add your first child above using their Family Code from their SwimIQ app.</div>
              </Card>}
            </>}
          </>;
        })()}

      </div>
    </div>
  );
}
