import React, { useEffect, useMemo, useState } from "react";

const REFS = {
  hodgdon1984: {
    short: "Hodgdon & Beckett, 1984",
    venue: "Naval Health Research Center",
    title:
      "Prediction of percent body fat for U.S. Navy men and women from body circumferences and height",
  },
  morton2018: {
    short: "Morton et al., 2018",
    venue: "Br J Sports Med",
    title:
      "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
  },
  helms2014: {
    short: "Helms et al., 2014",
    venue: "J Int Soc Sports Nutr",
    title:
      "Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation",
  },
  garthe2011: {
    short: "Garthe et al., 2011",
    venue: "Int J Sport Nutr Exerc Metab",
    title:
      "Effect of two different weight-loss rates on body composition and strength and power-related performance in elite athletes",
  },
  schoenfeld2017: {
    short: "Schoenfeld et al., 2017",
    venue: "J Sports Sci",
    title:
      "Dose-response relationship between weekly resistance training volume and increases in muscle mass: a systematic review and meta-analysis",
  },
  schoenfeld2016: {
    short: "Schoenfeld et al., 2016",
    venue: "Sports Med",
    title:
      "Effects of resistance training frequency on measures of muscle hypertrophy: a systematic review and meta-analysis",
  },
  nedeltcheva2010: {
    short: "Nedeltcheva et al., 2010",
    venue: "Ann Intern Med",
    title: "Insufficient sleep undermines dietary efforts to reduce adiposity",
  },
  mountjoy2018: {
    short: "Mountjoy et al., 2018",
    venue: "Br J Sports Med",
    title:
      "IOC consensus statement on relative energy deficiency in sport (RED-S): 2018 update",
  },
  loucks2003: {
    short: "Loucks & Thuma, 2003",
    venue: "J Clin Endocrinol Metab",
    title:
      "Luteinizing hormone pulsatility is disrupted at a threshold of energy availability in regularly menstruating women",
  },
  hulmi2016: {
    short: "Hulmi et al., 2016",
    venue: "Front Physiol",
    title:
      "The effects of intensive weight reduction on body composition and serum hormones in female fitness competitors",
  },
  rossow2013: {
    short: "Rossow et al., 2013",
    venue: "Int J Sports Physiol Perform",
    title:
      "Natural bodybuilding competition preparation and recovery: a 12-month case study",
  },
  trexler2014: {
    short: "Trexler et al., 2014",
    venue: "J Int Soc Sports Nutr",
    title: "Metabolic adaptation to weight loss: implications for the athlete",
  },
  iraki2019: {
    short: "Iraki et al., 2019",
    venue: "Sports (Basel)",
    title:
      "Nutrition recommendations for bodybuilders in the off-season: a narrative review",
  },
  slater2019: {
    short: "Slater et al., 2019",
    venue: "Front Nutr",
    title:
      "Is an energy surplus required to maximize skeletal muscle hypertrophy associated with resistance training?",
  },
  kreider2017: {
    short: "Kreider et al., 2017",
    venue: "J Int Soc Sports Nutr",
    title:
      "International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine",
  },
  thomas2016: {
    short: "Thomas, Erdman & Burke, 2016",
    venue: "Med Sci Sports Exerc",
    title:
      "Position of the Academy of Nutrition and Dietetics, Dietitians of Canada, and the American College of Sports Medicine: Nutrition and athletic performance",
  },
  roberts2020: {
    short: "Roberts et al., 2020",
    venue: "J Strength Cond Res",
    title: "Sex differences in resistance training: a systematic review and meta-analysis",
  },
  willis2012: {
    short: "Willis et al., 2012",
    venue: "J Appl Physiol",
    title:
      "Effects of aerobic and/or resistance training on body mass and fat mass in overweight or obese adults",
  },
  wewege2017: {
    short: "Wewege et al., 2017",
    venue: "Obes Rev",
    title:
      "The effects of high-intensity interval training vs. moderate-intensity continuous training on body composition in overweight and obese adults: a systematic review and meta-analysis",
  },
  levine1999: {
    short: "Levine et al., 1999",
    venue: "Science",
    title:
      "Role of nonexercise activity thermogenesis in resistance to fat gain in humans",
  },
  donnelly2009: {
    short: "Donnelly et al., 2009 (ACSM)",
    venue: "Med Sci Sports Exerc",
    title:
      "Appropriate physical activity intervention strategies for weight loss and prevention of weight regain for adults",
  },
  jensen2014: {
    short: "Jensen et al., 2014 (AHA/ACC/TOS)",
    venue: "Circulation",
    title:
      "2013 AHA/ACC/TOS guideline for the management of overweight and obesity in adults",
  },
  ross2000: {
    short: "Ross et al., 2000",
    venue: "Ann Intern Med",
    title:
      "Reduction in obesity and related comorbid conditions after diet-induced weight loss or exercise-induced weight loss in men: a randomized, controlled trial",
  },
  hall2019: {
    short: "Hall et al., 2019",
    venue: "Cell Metab",
    title:
      "Ultra-processed diets cause excess calorie intake and weight gain: an inpatient randomized controlled trial of ad libitum food intake",
  },
  wing2005: {
    short: "Wing & Phelan, 2005",
    venue: "Am J Clin Nutr",
    title: "Long-term weight loss maintenance",
  },
  burke2011: {
    short: "Burke et al., 2011",
    venue: "J Am Diet Assoc",
    title: "Self-monitoring in weight loss: a systematic review of the literature",
  },
  ross2020: {
    short: "Ross et al., 2020",
    venue: "Nat Rev Endocrinol",
    title:
      "Waist circumference as a vital sign in clinical practice: a Consensus Statement from the IAS and ICCR Working Group on Visceral Obesity",
  },
  lovejoy2008: {
    short: "Lovejoy et al., 2008",
    venue: "Int J Obes",
    title:
      "Increased visceral fat and decreased energy expenditure during the menopausal transition",
  },
};

const scholarUrl = (title) =>
  `https://scholar.google.com/scholar?q=${encodeURIComponent(`"${title}"`)}`;

/* ------------------------------------------------------------------
   BANDS + PLANS   (b1 = 1–10 %, b2 = 10–20 %, b3 = 20–30 %, b4 = 30 %+)
------------------------------------------------------------------- */
const BANDS = [
  { key: "b1", label: "1–10%", from: 0, to: 10 },
  { key: "b2", label: "10–20%", from: 10, to: 20 },
  { key: "b3", label: "20–30%", from: 20, to: 30 },
  { key: "b4", label: "30%+", from: 30, to: 45 },
];

const bandOf = (pct) =>
  pct < 10 ? "b1" : pct < 20 ? "b2" : pct < 30 ? "b3" : "b4";

const PLANS = {
  male: {
    b1: {
      tag: "Very lean",
      headline: "Lean enough. Now protect it.",
      summary:
        "Under 10% is contest-lean territory for men (essential fat is roughly 2–5%). The job is to keep muscle, hormones and energy intact, not to go lower.",
      points: [
        {
          t: "Treat single-digit body fat as a phase, not a lifestyle",
          d: "A 12-month case study of a natural bodybuilder showed hormones and energy dropping as body fat fell toward contest levels, and recovering only after a deliberate rebuild. Plan a return to a slightly higher level you can hold comfortably.",
          r: ["rossow2013", "mountjoy2018"],
        },
        {
          t: "Eat at maintenance with protein at 1.6–2.2 g per kg",
          d: "In a meta-analysis, protein's effect on muscle gain levelled off at about 1.6 g/kg/day, so there is little need to go far past ~2.2 g/kg. Fill the rest of your calories with carbs and fats.",
          r: ["morton2018"],
        },
        {
          t: "Match carbohydrate to your training load",
          d: "Sports-nutrition position statements scale carbohydrate with training demands, and warn that low energy availability hurts performance and recovery.",
          r: ["thomas2016", "mountjoy2018"],
        },
        {
          t: "Lift: 10+ hard sets per muscle per week, twice a week",
          d: "Meta-analyses found more muscle growth at higher weekly volume (10+ sets per muscle) and when each muscle is trained at least twice weekly rather than once.",
          r: ["schoenfeld2017", "schoenfeld2016"],
        },
        {
          t: "Let recovery signals tell you when to eat more",
          d: "Stalled lifts, low libido and poor mood are signs your body is adapting to low energy. Protect 7–9 hours of sleep: in a controlled trial, short sleep during dieting reduced fat loss and increased lean-mass loss.",
          r: ["nedeltcheva2010", "trexler2014"],
        },
      ],
    },
    b2: {
      tag: "Athletic to fit",
      headline: "Build from a strong base.",
      summary:
        "This is where most men look and perform well. Pick one direction for the next 12 weeks: add muscle with a small surplus, or recompose at maintenance.",
      points: [
        {
          t: "Choose one direction: lean gain or recomposition",
          d: "Keep any surplus modest. The off-season nutrition review suggests roughly 10–20% above maintenance for beginners and less for advanced lifters, because bigger surpluses mostly add fat.",
          r: ["iraki2019", "slater2019"],
        },
        {
          t: "Protein at 1.6–2.2 g per kg bodyweight",
          d: "The benefit of extra protein for resistance-training gains plateaus around this range, so spread it across 3–4 meals and stop worrying about more.",
          r: ["morton2018"],
        },
        {
          t: "Progressive overload, 10+ sets per muscle, twice weekly",
          d: "Higher weekly volume and a frequency of at least twice per muscle per week are linked to greater hypertrophy. Add weight or reps over time.",
          r: ["schoenfeld2017", "schoenfeld2016"],
        },
        {
          t: "Creatine monohydrate, 3–5 g daily",
          d: "The ISSN position stand concludes creatine monohydrate is one of the most effective supplements for lean mass and strength, and is safe for healthy people at standard doses.",
          r: ["kreider2017"],
        },
        {
          t: "Track the weekly trend, not the daily number",
          d: "Aim to gain roughly 0.25–0.5% of bodyweight per week. If your waist grows faster than your lifts improve, trim calories slightly.",
          r: ["iraki2019"],
        },
      ],
    },
    b3: {
      tag: "Average to high",
      headline: "Lose fat, keep the muscle.",
      summary:
        "This is where a steady fat-loss phase pays off fastest. The recipe is a moderate deficit, high protein and lifting, not extreme dieting.",
      points: [
        {
          t: "Lose 0.5–1% of bodyweight per week",
          d: "In elite athletes, a slower loss rate (~0.7% per week) preserved and even increased lean mass versus faster loss (~1.4% per week). Contest-prep guidelines recommend the same 0.5–1% range.",
          r: ["garthe2011", "helms2014"],
        },
        {
          t: "Protein: at least 1.6 g per kg, higher end in a deficit",
          d: "Protein supports lean mass when you train. Evidence for athletes in a calorie deficit favours the higher end of the range to protect muscle.",
          r: ["morton2018", "helms2014"],
        },
        {
          t: "Lift 3 days a week, add cardio on top",
          d: "In overweight adults, aerobic training reduced fat mass while resistance training preserved or added lean mass. Doing both gives the best body-composition result.",
          r: ["willis2012", "schoenfeld2017"],
        },
        {
          t: "Move 150–250 minutes a week and raise daily steps",
          d: "ACSM states 150–250 min/week of moderate activity produces modest weight loss, with more producing greater loss. In an overfeeding study, non-exercise movement explained most of the difference in fat gained between people.",
          r: ["donnelly2009", "levine1999"],
        },
        {
          t: "Sleep 7–9 hours and log your food or weight",
          d: "In a randomized crossover trial, 5.5 vs 8.5 hours of sleep on the same diet cut fat loss by about 55%. A systematic review links regular self-monitoring with greater weight loss.",
          r: ["nedeltcheva2010", "burke2011"],
        },
      ],
    },
    b4: {
      tag: "High",
      headline: "Start with health. Fat loss follows.",
      summary:
        "At this level waist size and metabolic health matter more than the exact percentage. Small changes you can sustain beat a crash diet.",
      points: [
        {
          t: "Aim for 5–10% weight loss over about 6 months",
          d: "The AHA/ACC/TOS guideline states this amount produces clinically meaningful health improvements, and recommends a daily deficit of about 500–750 kcal to get there.",
          r: ["jensen2014"],
        },
        {
          t: "Fix food quality first",
          d: "In a tightly controlled inpatient trial, people ate about 500 kcal/day more on an ultra-processed diet than on an unprocessed one and gained weight. Build meals from whole foods.",
          r: ["hall2019"],
        },
        {
          t: "Build up to 150–250 minutes of activity weekly",
          d: "ACSM sets 150–250 min/week as the starting target, with more for larger loss and maintenance. In men, exercise alone reduced waist and visceral fat in a randomized trial.",
          r: ["donnelly2009", "ross2000"],
        },
        {
          t: "Lift 2–3 times a week",
          d: "Resistance training preserves and builds lean mass while you lose fat, so the scale drops without losing strength.",
          r: ["willis2012"],
        },
        {
          t: "Track your waist weekly and get a health check",
          d: "Waist circumference is a consensus 'vital sign' for visceral fat risk. People who keep large weight losses off tend to weigh themselves regularly and stay active about an hour a day. Ask a doctor about blood pressure, sugar and lipids.",
          r: ["ross2020", "wing2005"],
        },
      ],
    },
  },

  female: {
    b1: {
      tag: "Below essential fat",
      headline: "This is below the safe zone. Rebuild first.",
      summary:
        "Essential fat for women is roughly 10–13%. A reading under 10% is either measurement error (tape estimates are rough) or a level linked to hormone and bone problems. Treat it as a flag, not a goal.",
      points: [
        {
          t: "Get checked, then re-measure",
          d: "Tape-measure formulas are estimates. If a more reliable method (such as DEXA) or your cycle history confirms very low body fat, speak to a doctor or sports physician.",
          r: ["hodgdon1984", "mountjoy2018"],
        },
        {
          t: "Raise energy availability toward 45 kcal per kg of fat-free mass",
          d: "The IOC consensus treats about 45 kcal/kg FFM/day as the level for healthy function. Experimental work found reproductive hormone pulses were disrupted below roughly 30 kcal/kg FFM/day.",
          r: ["mountjoy2018", "loucks2003"],
        },
        {
          t: "Treat your period as a vital sign",
          d: "Missed or absent periods are a core warning sign of low energy availability. Don't train through it; get a medical review.",
          r: ["mountjoy2018"],
        },
        {
          t: "Keep lifting, with protein at 1.6–2.2 g per kg",
          d: "Women gain muscle at a similar relative rate to men from resistance training, and enough protein supports lean-mass gain while you add food back.",
          r: ["roberts2020", "morton2018"],
        },
        {
          t: "Rebuild gradually and expect it to take months",
          d: "In female fitness competitors, hormone levels were suppressed after intensive dieting and recovered over time after returning to normal intake. Add calories in steps, not all at once.",
          r: ["hulmi2016"],
        },
      ],
    },
    b2: {
      tag: "Athletic",
      headline: "Strong, lean and worth protecting.",
      summary:
        "For women, roughly 14–20% is athletic territory, and the low end sits close to essential fat. Aim for performance and consistency, not a lower number.",
      points: [
        {
          t: "Keep energy availability high",
          d: "Stay near 45 kcal/kg fat-free mass per day on training days. Dips toward ~30 disrupted reproductive hormones in experimental work.",
          r: ["mountjoy2018", "loucks2003"],
        },
        {
          t: "Strength train 2–3 days per week, with progression",
          d: "A meta-analysis found women and men gain muscle at similar relative rates from resistance training, and training each muscle twice weekly beats once.",
          r: ["roberts2020", "schoenfeld2016"],
        },
        {
          t: "Protein at 1.6–2.2 g per kg bodyweight",
          d: "Gains from extra protein plateau around this range. Spread it over 3–4 meals.",
          r: ["morton2018"],
        },
        {
          t: "Eat carbohydrate around training",
          d: "Position statements recommend matching carbohydrate to training load to support performance and recovery.",
          r: ["thomas2016"],
        },
        {
          t: "Check cycle, sleep and mood monthly",
          d: "Regular periods and 7–9 hours of sleep are the simplest signs you are fuelling enough. Sleep restriction during dieting increased lean-mass loss in a controlled trial.",
          r: ["mountjoy2018", "nedeltcheva2010"],
        },
      ],
    },
    b3: {
      tag: "Healthy to high",
      headline: "A healthy range. Refine it without crashing.",
      summary:
        "For women, roughly 21–32% is generally a healthy range. If you want to go lower, keep the deficit small and strength training non-negotiable.",
      points: [
        {
          t: "Small deficit, slow pace",
          d: "Aim for about 0.5% of bodyweight per week and keep energy availability above ~30 kcal/kg FFM/day. Slower loss rates preserved lean mass better in athletes.",
          r: ["garthe2011", "loucks2003"],
        },
        {
          t: "Protein at 1.6–2.2 g per kg bodyweight",
          d: "Supports lean mass when paired with lifting, which keeps weight loss coming from fat.",
          r: ["morton2018"],
        },
        {
          t: "Strength train 2–3 days per week",
          d: "In overweight adults, resistance training preserved lean mass while aerobic training reduced fat mass. Women respond to lifting similarly to men in relative terms.",
          r: ["willis2012", "roberts2020"],
        },
        {
          t: "Mix daily steps with 1–2 interval sessions",
          d: "HIIT and moderate steady cardio reduced fat similarly in overweight adults, and HIIT takes less time. Pick what you will actually keep doing.",
          r: ["wewege2017", "donnelly2009"],
        },
        {
          t: "Sleep 7–9 hours and log your food or weight",
          d: "Short sleep cut fat loss by about 55% on the same diet in a randomized crossover trial, and regular self-monitoring is linked to greater weight loss.",
          r: ["nedeltcheva2010", "burke2011"],
        },
      ],
    },
    b4: {
      tag: "High",
      headline: "Start with health. Fat loss follows.",
      summary:
        "At this level waist size and metabolic health matter more than the exact percentage. Small, repeatable habits beat a crash diet.",
      points: [
        {
          t: "Aim for 5–10% weight loss over about 6 months",
          d: "The AHA/ACC/TOS guideline states this amount produces clinically meaningful health improvements, and recommends a daily deficit of about 500–750 kcal to get there.",
          r: ["jensen2014"],
        },
        {
          t: "Keep protein at 1.6 g per kg or more",
          d: "Higher protein combined with lifting supports lean mass, so more of the weight you lose is fat.",
          r: ["morton2018"],
        },
        {
          t: "Walk first, then add intensity",
          d: "Daily non-exercise movement explained most of the difference in fat gain between people in an overfeeding study. ACSM suggests 150–250 min/week, and HIIT and steady cardio work about equally.",
          r: ["levine1999", "donnelly2009", "wewege2017"],
        },
        {
          t: "Lift 2–3 times a week",
          d: "Resistance training preserves lean mass during weight loss, and women gain muscle at a similar relative rate to men.",
          r: ["willis2012", "roberts2020"],
        },
        {
          t: "Track your waist and plan for life stages",
          d: "Visceral fat rises during the menopausal transition, so waist can change even when weight doesn't. Combine waist tracking with good sleep and a doctor's check-up.",
          r: ["lovejoy2008", "nedeltcheva2010"],
        },
      ],
    },
  },
};

/* ------------------------------------------------------------------
   CALCULATION  (US Navy circumference method, metric)
------------------------------------------------------------------- */
const navyBodyFat = (sex, h, neck, waist, hip) => {
  if (sex === "male") {
    return (
      495 /
        (1.0324 -
          0.19077 * Math.log10(waist - neck) +
          0.15456 * Math.log10(h)) -
      450
    );
  }
  return (
    495 /
      (1.29579 -
        0.35004 * Math.log10(waist + hip - neck) +
        0.221 * Math.log10(h)) -
    450
  );
};

// American Council on Exercise ranges
const categoryOf = (sex, pct) => {
  const t =
    sex === "male"
      ? [
          [2, "Below essential"],
          [6, "Essential fat"],
          [14, "Athletic"],
          [18, "Fit"],
          [25, "Average"],
        ]
      : [
          [10, "Below essential"],
          [14, "Essential fat"],
          [21, "Athletic"],
          [25, "Fit"],
          [32, "Average"],
        ];
  for (const [limit, name] of t) if (pct < limit) return name;
  return "High";
};

const EMPTY = { height: "", neck: "", waist: "", hip: "", weight: "", pct: "" };

export default function BodyFatCalculator({ onBook }) {
  const [sex, setSex] = useState("male");
  const [mode, setMode] = useState("measure");
  const [v, setV] = useState(EMPTY);
  const [bandPick, setBandPick] = useState(null);

  const set = (k) => (e) => setV((p) => ({ ...p, [k]: e.target.value }));
  const n = (k) => parseFloat(v[k]);

  const result = useMemo(() => {
    let pct = null;
    let hint = "";

    if (mode === "known") {
      const p = parseFloat(v.pct);
      if (v.pct !== "" && !(p >= 2 && p <= 60)) hint = "Enter a value between 2 and 60.";
      else if (v.pct !== "") pct = p;
    } else {
      const h = parseFloat(v.height);
      const ne = parseFloat(v.neck);
      const w = parseFloat(v.waist);
      const hi = parseFloat(v.hip);
      const needHip = sex === "female";
      const filled = [h, ne, w].every((x) => x > 0) && (!needHip || hi > 0);

      if (filled) {
        const ok =
          h >= 100 && h <= 230 && ne >= 20 && ne <= 70 && w >= 40 && w <= 220 &&
          (!needHip || (hi >= 50 && hi <= 220));
        const diff = needHip ? w + hi - ne : w - ne;
        if (!ok || diff <= 0) {
          hint = "Those numbers look off. Use centimetres and re-check each measurement.";
        } else {
          const est = navyBodyFat(sex, h, ne, w, hi);
          if (!isFinite(est) || est < 1 || est > 65) hint = "Those numbers look off. Re-check each measurement.";
          else pct = est;
        }
      }
    }

    if (pct === null) return { pct: null, hint };

    pct = Math.round(pct * 10) / 10;
    const wt = parseFloat(v.weight);
    const ht = parseFloat(v.height);
    const hasWt = wt >= 20 && wt <= 400;
    return {
      pct,
      hint: "",
      category: categoryOf(sex, pct),
      fatKg: hasWt ? Math.round(wt * pct) / 100 : null,
      leanKg: hasWt ? Math.round(wt * (100 - pct)) / 100 : null,
      bmi: hasWt && ht >= 100 && ht <= 230 ? Math.round((wt / (ht / 100) ** 2) * 10) / 10 : null,
    };
  }, [sex, mode, v]);

  const computedBand = result.pct !== null ? bandOf(result.pct) : null;

  // when a new result lands in a different band, follow it
  useEffect(() => {
    setBandPick(null);
  }, [computedBand, sex]);

  const activeBand = bandPick ?? computedBand ?? "b3";
  const plan = PLANS[sex][activeBand];
  const bandLabel = BANDS.find((b) => b.key === activeBand).label;

  const markerLeft =
    result.pct !== null ? Math.max(1, Math.min(99, (result.pct / 45) * 100)) : null;

  return (
    <section id="calculator" className="bf-section">
      <div className="section-container">
        <div className="section-label reveal">
          <span>04</span>
          BODY FAT CALCULATOR
        </div>

        <h2 className="bf-title reveal">
          KNOW YOUR
          <br />
          <span>NUMBER.</span>
        </h2>

        <p className="bf-lead">
          Enter a tape-measure reading, or type in a body fat % you already
          have. You get your category and a five-point plan, with the paper
          behind every point.
        </p>

        <div className="bf-grid">
          {/* ---------- INPUT ---------- */}
          <div className="bf-panel">
            <div className="bf-toggle" role="group" aria-label="Sex">
              {["male", "female"].map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={sex === s}
                  className={sex === s ? "on" : ""}
                  onClick={() => setSex(s)}
                >
                  {s === "male" ? "Male" : "Female"}
                </button>
              ))}
            </div>

            <div className="bf-toggle bf-toggle-sub" role="group" aria-label="Input method">
              <button
                type="button"
                aria-pressed={mode === "measure"}
                className={mode === "measure" ? "on" : ""}
                onClick={() => setMode("measure")}
              >
                Measure me
              </button>
              <button
                type="button"
                aria-pressed={mode === "known"}
                className={mode === "known" ? "on" : ""}
                onClick={() => setMode("known")}
              >
                I know my %
              </button>
            </div>

            <div className="bf-fields">
              {mode === "known" ? (
                <label className="bf-wide">
                  Body fat %
                  <input type="number" inputMode="decimal" min="2" max="60" step="0.1" placeholder="e.g. 30" value={v.pct} onChange={set("pct")} />
                </label>
              ) : (
                <>
                  <label>
                    Height (cm)
                    <input type="number" inputMode="decimal" placeholder="175" value={v.height} onChange={set("height")} />
                  </label>
                  <label>
                    Neck (cm)
                    <input type="number" inputMode="decimal" placeholder="38" value={v.neck} onChange={set("neck")} />
                  </label>
                  <label>
                    Waist (cm)
                    <input type="number" inputMode="decimal" placeholder="90" value={v.waist} onChange={set("waist")} />
                  </label>
                  {sex === "female" && (
                    <label>
                      Hip (cm)
                      <input type="number" inputMode="decimal" placeholder="100" value={v.hip} onChange={set("hip")} />
                    </label>
                  )}
                </>
              )}

              <label>
                Weight (kg){" "}
                <input type="number" inputMode="decimal" placeholder="80" value={v.weight} onChange={set("weight")} />
              </label>

              {mode === "known" && (
                <label>
                  Height (cm)
                  <input type="number" inputMode="decimal" placeholder="175" value={v.height} onChange={set("height")} />
                </label>
              )}
            </div>

            {mode === "measure" && (
              <p className="bf-how">
                {sex === "male"
                  ? "Neck: just below the larynx. Waist: at the navel, relaxed."
                  : "Neck: just below the larynx. Waist: narrowest point. Hip: widest point."}{" "}
                Use a soft tape and measure twice.
              </p>
            )}

            {result.hint && (
              <p className="bf-hint" role="alert">
                {result.hint}
              </p>
            )}
          </div>

          {/* ---------- RESULT ---------- */}
          <div className="bf-panel bf-result" aria-live="polite">
            <span className="bf-result-label">Estimated body fat</span>

            <div className="bf-number">
              {result.pct !== null ? result.pct.toFixed(1) : "--"}
              <small>%</small>
            </div>

            <div className="bf-gauge" role="img" aria-label={result.pct !== null ? `${result.pct}% body fat` : "Gauge"}>
              <div className="bf-zones">
                {BANDS.map((b) => (
                  <i
                    key={b.key}
                    style={{ flex: b.to - b.from }}
                    className={computedBand === b.key ? "hit" : ""}
                  />
                ))}
              </div>
              {markerLeft !== null && <b className="bf-marker" style={{ left: `${markerLeft}%` }} />}
              <div className="bf-ticks">
                <span>0</span>
                <span style={{ left: `${(10 / 45) * 100}%` }}>10</span>
                <span style={{ left: `${(20 / 45) * 100}%` }}>20</span>
                <span style={{ left: `${(30 / 45) * 100}%` }}>30</span>
                <span style={{ left: "100%" }}>45</span>
              </div>
            </div>

            <dl className="bf-stats">
              <div>
                <dt>Category</dt>
                <dd>{result.pct !== null ? result.category : "--"}</dd>
              </div>
              <div>
                <dt>Fat mass</dt>
                <dd>{result.fatKg != null ? `${result.fatKg} kg` : "--"}</dd>
              </div>
              <div>
                <dt>Lean mass</dt>
                <dd>{result.leanKg != null ? `${result.leanKg} kg` : "--"}</dd>
              </div>
              <div>
                <dt>BMI</dt>
                <dd>{result.bmi != null ? result.bmi : "--"}</dd>
              </div>
            </dl>

            <p className="bf-method">
              {mode === "measure"
                ? <>Estimated with the U.S. Navy circumference method (<a href={scholarUrl(REFS.hodgdon1984.title)} target="_blank" rel="noreferrer">Hodgdon &amp; Beckett, 1984</a>). It is an estimate and can be off by several points.</>
                : "Using the value you entered. Categories follow American Council on Exercise ranges."}
            </p>
          </div>
        </div>

        {/* ---------- PLAN ---------- */}
        <div className="bf-plan">
          <div className="bf-plan-head">
            <div>
              <span className="bf-plan-for">
                {sex === "male" ? "Male" : "Female"} · {bandLabel} body fat · {plan.tag}
              </span>
              <h3>{plan.headline}</h3>
              <p>{plan.summary}</p>
            </div>

            <div className="bf-bands" role="group" aria-label="Show plan for body fat range">
              {BANDS.map((b) => (
                <button
                  key={b.key}
                  type="button"
                  aria-pressed={activeBand === b.key}
                  className={`${activeBand === b.key ? "on" : ""} ${computedBand === b.key ? "yours" : ""}`}
                  onClick={() => setBandPick(b.key)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          <ol className="bf-points">
            {plan.points.map((pt, i) => (
              <li key={pt.t}>
                <span className="bf-pt-n">{i + 1}</span>
                <div>
                  <h4>{pt.t}</h4>
                  <p>{pt.d}</p>
                  <div className="bf-refs">
                    {pt.r.map((k) => (
                      <a
                        key={k}
                        href={scholarUrl(REFS[k].title)}
                        target="_blank"
                        rel="noreferrer"
                        title={REFS[k].title}
                      >
                        {REFS[k].short}, <i>{REFS[k].venue}</i> ↗
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="bf-foot">
            <p>
              General education, not medical advice. If you have a medical
              condition, are pregnant, take medication or have a history of
              disordered eating, check with a doctor before changing your diet
              or training.
            </p>
            {onBook && (
              <a href="#contact" className="btn btn-primary" onClick={onBook}>
                BUILD THIS PLAN WITH AMIT <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
