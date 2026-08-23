# Silsila — Product Document v1

*Silsila (سلسلہ) = "an unbroken chain, a series, a continuity." Chosen over the Qadam placeholder — see §9.*

**Status:** Pre-launch. Gap validated informally. Next milestone is a landing page + intake waitlist.
**Owner:** Hammad
**Last updated:** August 2026

---

## 1. The problem

A student at a university in southern Punjab — or most of Pakistan outside the top 5 institutions — is not lazy. They want to do something with their degree. The failure is structural:

- **The curriculum is 10 years behind industry.** They graduate knowing things nobody hires for.
- **Nobody around them knows what the industry looks like.** No mentor, no alumni network, no senior who made it out. Their horizon ends at the campus gate.
- **AI already solved the planning problem.** Any student can get a four-year roadmap from ChatGPT in 30 seconds, for free.
- **Nobody solved the follow-through problem.** They do three days of the roadmap. Then a semester project lands, they miss four days, the plan feels broken, and they quietly stop.
- **The result is regret.** Four years pass. They graduate with a degree, no portfolio, no network, no idea what to apply for, and the belief that it was their own fault.

**The single sentence:** the plan is free and abundant; the follow-up is scarce and nonexistent.

### Scope — v1

**Computing programs only:** BS CS, BS AI, BS SE, BS IT, and adjacent. Not business, not humanities, not engineering.

This collapses the content burden from ~15 tracks to roughly four (software development, data/AI, design-adjacent frontend, and a founder track), and it's where the existing IUB channel already reaches. Other departments are a later decision, made from evidence rather than ambition.

### Language

All content, tasks and feedback in **English**. The industry runs in English and reading English technical material is itself part of the skill being built.

**One exception, and it matters:** students can ask questions in Urdu or Roman Urdu, and get answers back in simple English. The students who most need this platform often have the weakest English, and the ask channel is the mechanic we least want blocked. Costs nothing to support with an LLM.

Keep the English in generated content deliberately plain — short sentences, no idioms, no unnecessary vocabulary.

### Who this is for

The motivated-but-unsupported student. Someone who *wants* to and has already tried. They have a phone, patchy laptop access, 30–60 free minutes a day, and no one to ask "am I doing this right?"

### Who this is *not* for

- Students who need to be convinced to care. We do not manufacture motivation.
- Students who already have mentors, strong campus networks, or FAST/NUST/LUMS-tier peer pressure. They have substitutes.
- Anyone looking for a bootcamp or a job guarantee.

---

## 1b. What we promise — and what we don't

**We do not promise:**

- that you will get a job
- that you will become an entrepreneur
- that you will be in the top 1%

**We promise this:**

> When you graduate, you will have something to say. Something in your skill set. A profile that's been worked on. Things you actually built. And you will not be starting from zero.

### Why the anti-promise is a strategic asset, not a hedge

Every skills product sold to Pakistani students promises a job in three months. Students have been burned by that repeatedly and arrive cynical. Refusing to promise the outcome signals that this is a different kind of thing — and the promise that *is* made is one that can actually be kept, which means it never has to be walked back.

Put this on the landing page in plain language. Do not soften it into marketing copy.

## 2. The solution

A daily companion, not a course.

The student states a goal — *"I want to become a developer"*, *"I want to start something of my own"* — and answers an intake: hours per day, days per week, current level, laptop access, target horizon. The system produces a **3-month or 6-month plan**, broken down to weeks and then to individual days.

Then the part nobody else does: every day the student gets **one small task — 30 to 45 minutes.** Small enough that a full class schedule can't justify skipping it. They complete it and submit **proof** — a link, a screenshot, three lines of writing. The work is **graded**, not just acknowledged. Weekly and monthly progress reports show them how they're moving. Everything they submit accumulates into a **public profile** that becomes their real CV.

**Why 3–6 months, not four years:** a student can picture three months. It gives them a finish line, gives you a completion event to measure, and lets a student who starts in their final year still get value. Plans chain — finish one, start the next.

**Two destinations, not one:** job-ready or founder-ready. The task mix differs (a founder track weights Human, Signal and Artifact tasks harder than deep Skill work), but the machinery is identical.

Four mechanics carry the whole product:

1. **Small daily load.** Compounding beats intensity. 40 minutes × 4 years is unrecognisable from where they started.
2. **Proof-of-work, graded — not checkboxes.** "Mark as done" teaches nothing and can be lied to. An artifact can be graded, and grading it is where AI earns its place — ChatGPT in a browser structurally cannot remember what you promised last Tuesday. Nobody in this student's life has ever looked at their work and told them where it stands; that alone is most of the product's felt value.
3. **Someone to ask.** Stuck at 11pm with a question and nobody to ask is the exact moment students quit. An always-available ask channel, aware of their plan, their level and what they submitted last week. Answers in context, not generic ChatGPT output. Cheap to run, and emotionally the most important thing in the product.
4. **Presence without shame.** The system shows up every day whether they did yesterday's task or not. No streak punishment, no red numbers, no guilt copy. This user already carries enough of that; a punishing app becomes one more thing they're failing at.

---

## 2b. The timeline — internships are the real near-term outcome

The product is not "be ready at graduation." That payoff is too far away to hold anyone. It is **semester-aware**, with a concrete milestone that lands well before the degree ends.

| Stage | Focus |
|---|---|
| **Semesters 1–3** | Foundations. Heavy Skill and Horizon tasks. Build the habit, widen what they know exists. |
| **Semesters 4–6** | **Internship push.** This is the hinge. Portfolio pieces that survive a real screen, CV and LinkedIn brought to a real standard, how to find openings, how to apply, how to write the email, how to handle an interview, what to expect on day one. Most Pakistani companies hire interns from exactly this window. |
| **Semester 7–8** | Full-time readiness or founder track. Deeper artifacts, referrals, applications. |
| **Throughout** | Market trend updates — what's being hired for right now, what's fading, what's new. Delivered as Horizon tasks so it's consumed, not just published. |

### Why this matters strategically

An internship is measurable, it happens inside the product's lifetime, and it is the single most credible proof point available. *"Eleven of our students got internships this summer"* is worth more for Phase 4 distribution than any feature list, testimonial, or landing page copy.

**Add to metrics:** internship applications sent, interviews reached, offers received.

---

## 3. Task taxonomy

The task mix *is* the product. If every task is "watch a React tutorial," this is a worse Coursera. Five types, rotated:

| Type | Share | What it is | Example |
|---|---|---|---|
| **Skill** | ~40% | The technical spine. Course modules, tutorials, practice problems. | "Complete section 4 of the JS course. Push your solutions." |
| **Horizon** | ~20% | Expands what they know exists. Talks, essays, teardowns, career explainers. **This is the differentiator.** | "Watch this 18-min talk on how Careem was built. Write 3 lines: what surprised you?" |
| **Artifact** | ~20% | Build something small that leaves a trace. | "Build a page that fetches and displays live currency rates. Deploy it." |
| **Signal** | ~10% | Direct CV / profile / positioning work. | "Rewrite your LinkedIn headline. Here are 3 examples of good ones in your field." |
| **Human** | ~10% | Network-building and real-world contact. The weakest skill in this cohort and the most costly gap. | Job track: *"Message one senior working in your field. Here's a template. Send it."* Founder track: *"Go to the market. Ask 10 shopkeepers how they track their udhaar. Write down what they said."* |

**Design note:** Human tasks will have the worst completion rate and the highest long-term value. Track this specifically. Do not drop them because the numbers look bad early.

**Field tasks (founder track):** physical, offline tasks — talk to shopkeepers, sit in a market for an hour, interview five people who have the problem. In Bahawalpur or Multan these are *more* accessible than online networking, not less, and they produce the customer-discovery instinct that no video teaches. Proof is a photo plus written notes. Worth weighting higher than the 10% baseline for founder-track students.

**Content strategy:** Do not generate task content with an LLM per user per day — it will not survive the unit economics at PKR pricing. Build **four curated track templates** (software development, data/AI, frontend/design-adjacent, founder), each semester-aware. Use the LLM only for (a) personalising a template at intake, (b) grading submissions, and (c) answering questions.

---

## 3b. Grading, progress and ranking

### Grading

Every submission gets a grade, not a tick. Suggested shape — a 1–5 band plus two lines of written feedback: one thing done well, one thing to fix next time. Grade against the task's own criteria, never against other students.

Grades roll up into the weekly and monthly reports. The written feedback matters more than the number to this user — it's likely the first time anyone has looked at their work and told them where it stands.

**Consistency risk:** an LLM grading the same artifact twice can give different bands. Fix the rubric per task type and pin it in the prompt, or grades lose credibility fast.

### Progress reports

- **Weekly** — tasks completed vs assigned, grade average, what's coming next week. Short. WhatsApp-length.
- **Monthly** — the real one. Skills added, artifacts built, talks watched, messages sent, profile growth, grade trend. Framed as *"here's who you were 30 days ago"*. This is the retention artifact — a student who reads a strong monthly report starts month two.

### Ranking — handle carefully

Ranking is requested and it does drive effort, but it fights the core design principle. This user already believes they're behind everyone. Showing them **#47 of 60** is a plausible way to lose them permanently — and they're precisely the student the product exists for.

**Recommended implementation:**

- **Primary: rank against their own past self.** "You completed 18 tasks this month, up from 11." Always safe, always motivating.
- **Secondary: positive-only cohort comparison.** Show "top 20% of your cohort" to those in it. Show nothing to those below — not a lower number, *nothing*.
- **If a visible leaderboard is wanted, scope it to a pod of 8–12 who started together.** At that size it reads as friendly competition among peers, not public exposure.
- **Never rank across the whole platform.**

*This is a judgement call, not a certainty. Worth A/B testing in Phase 3 — but start conservative, since the damage from getting it wrong is churn you never see or recover.*

---

## 4. Phases

### Phase 0 — Manual loop (3–4 weeks) — *partially done*

Run entirely over WhatsApp. No product. 15–25 students from computing programs — the IUB BS AI cohort, plus BS CS/SE students to check the tracks generalise across computing departments.

You generate plans yourself. You send tasks manually. You review submissions manually.

**Testing exactly three numbers:**
- % who complete week 1
- % still completing anything in week 4
- % who *ask* for next week's plan unprompted

**Kill criterion:** if week-4 retention is under ~30%, the reminder model is wrong and no engineering fixes it.

**Amendment based on the task taxonomy:** run all five task types from day one so you learn which get skipped.

### Phase 1 — Landing page + waitlist (1–2 weeks) — *current*

See §5. Purpose: measure real demand and build an activation list, not collect emails.

### Phase 2 — Thin MVP (4–6 weeks)

Build only what Phase 0 proved. Scope:

- Goal + intake (hours/day, days/week, level, horizon, job vs founder track)
- Personalised 3-month roadmap (month → week → day)
- Daily task delivery
- Proof submission (link / file / text)
- AI grading with written feedback
- **Ask-anytime channel** (context-aware: knows their plan, level, recent submissions)
- Weekly + monthly progress report
- Accumulating public profile

**Two calls specific to this market:**

- **WhatsApp is the interface, not a mobile app.** Every student has it. Zero storage cost, near-zero data cost, and notification open rates ~10x an app's. Web dashboard for the profile; WhatsApp for the daily loop.
- **Cache the roadmap.** Generate once at intake, store it. Do not regenerate per user per day.

### Phase 3 — Retention (6–8 weeks)

The phase that decides whether this exists in a year. Reminders alone lose to WhatsApp statuses and cricket.

- **Cohorts** — 8–12 students, same track, same start date, shared group. Social visibility beats push notifications.
- **Pod leads** — a senior student running one 30-min weekly voice call. PKR 3–5k/month or credit. Biggest unit-cost risk; solve it deliberately.
- **The public profile** — accumulates every artifact. After 18 months, that page *is* their CV. This is the reason they don't quit.
- **Restart-friendly design** — "pause semester" as a first-class feature. Students will miss exam weeks. Streak-shaming makes them delete the app.

### Phase 4 — Distribution (parallel from Phase 3, own weekly hours)

> Named honestly: the recurring failure mode across previous projects has been shipping without distribution follow-through. This phase gets its own hours on the calendar or the product joins that list. The build is the easy half here.

- **One campus, not "Punjab."** Dominate IUB, one department first. 200 active students on one campus is a real business and a real case study. 200 spread across 40 universities is nothing.
- **Campus ambassador per department** — a student who's paid or holds the pod-lead role.
- **Student societies** — ACM/IEEE chapters, entrepreneurship societies. They need programming content; you're free.
- **One or two sympathetic lecturers** who'll mention it in class.
- **Cohort 1 success stories are the entire marketing asset for cohort 2.**

### Phase 5 — Business model (month 9+)

Do not optimise for revenue before this. Realistically these students pay PKR 0–500/month, and free is what gets scale.

1. **Paid guided cohorts** — free self-serve track; PKR 2,000–3,000 for a 12-week mentored cohort with guaranteed review. Small conversion %, funds the mentors.
2. **Hiring channel** — after 18 months you hold verified proof-of-work for thousands of students that no CV screen in Pakistan can match. Local agencies and startups pay for that. *This is the actual business* — but it needs the dataset first.
3. **University / HEC contracts** — real money, painful sales cycle, needs a Phase 4 case study to even open the conversation.

---

## 5. Landing page + waitlist (immediate next step)

### The trap to avoid

An email signup from a student who wants to change costs them nothing and predicts nothing. 300 emails, 12 people who show up. Make the signup cost something small.

### Design decisions

- **WhatsApp number, not email.** Pakistani students check email approximately never. This makes the waitlist an activation channel, not a dead list.
- **4–5 intake questions on the form itself.** Anyone who fills it out is 10x more serious, and you get cohort-matching data free.
- **Offer something immediate.** "Get your first week's plan free." Then actually send it, manually, over WhatsApp. Waitlist conversion becomes *"completed day 1"* — the only number that matters. This turns the landing page into Phase 0 running continuously with better targeting.

### Copy direction

Problem statement in the student's own words, not founder language:

> **You've asked ChatGPT what to do.**
> You got a roadmap. You did three days of it. Then the semester happened.
>
> It's not that you're not serious.
> It's that nobody checked in on day four.

Then the solution in three plain lines: a small daily task, someone reviewing what you did, a profile that gets stronger every week.
Then proof: "We ran this with 20 students at IUB for a month — here's what they built."
Then the form.

One screen of scrolling. Urdu-English mix where it's how students actually talk — it reads as *for me* rather than *for Lahore people*.

### Intake questions

1. University + department
2. Semester (dropdown 1–8)
3. What do you want to do after graduation? (free text — "not sure yet" is a valid and useful answer)
4. Hours per week you can realistically commit (3–5 / 5–10 / 10+)
5. Do you have laptop access? (Yes / Sometimes / Phone only)
6. WhatsApp number

### Success criteria — *decide now, before launch*

Within 3 weeks of launch:

- **50+ completed intake forms**
- **15+ students who finish a free week-1 plan**

Written down in advance so it isn't rationalised afterwards.

### Technical

Static page. Form posts to Google Sheets. No backend. Do not build auth, dashboards, or a database at this stage.

---

## 6. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Students who currently do nothing won't start because an app asks | **Highest** | This is what Phase 0 exists to falsify cheaply |
| Waitlist vanity metrics | High | WhatsApp number + intake questions + week-1 plan as the real conversion event |
| Mentor/pod-lead cost doesn't scale | High | Test paid pod leads in Phase 3 before committing; consider peer-review mechanics as fallback |
| LLM cost per user | Medium | Cached templates; LLM only at intake and review |
| Shame-driven churn | Medium | No streak punishment; "pause semester"; reminder copy written before code |
| Ranking drives away the students who need it most | High | Self-comparison primary; positive-only cohort signals; pod-scoped leaderboards at most |
| Inconsistent AI grading destroys credibility | Medium | Fixed rubric per task type, pinned in prompt; spot-check manually in Phase 0–2 |
| Distribution never happens | **Highest, historically** | Phase 4 gets dedicated calendar hours, not spare time |
| Content goes stale | Medium | Track templates versioned; refresh quarterly |

---

## 7. Metrics that matter

**Vanity:** signups, page views, total users.

**Real:**
- D1 / D7 / D30 task completion rate
- Week-4 retention (the Phase 0 number, tracked forever)
- Artifacts submitted per active student per month
- % of students who return after a 5+ day gap ← *the shame-proofing metric*
- Profile completeness at 6 months
- Completion rate by task type (especially Human)
- Grade trend per student over 3 months
- % who complete a full 3-month plan
- % who start a second plan after finishing one ← *the strongest signal the product works*
- Monthly report open rate
- Questions asked per active student per week ← *proxy for whether they feel supported*
- Completion rate of a task after a question was asked about it, vs. no question
- **Internship applications sent / interviews reached / offers received** ← *the headline outcome metric*

---

## 8. Open questions

**Resolved:**
- ~~Does this generalise beyond CS/AI?~~ → Out of scope for v1. Computing programs only.
- ~~Urdu content?~~ → English content; Urdu/Roman Urdu accepted in the ask channel only.
- ~~What happens at graduation?~~ → Not the endpoint. Semester-aware timeline with internships (sem 4–6) as the near-term outcome.

**Open:**

- Does ranking help or harm this specific user? Needs a real test, not an opinion.
- How much does the founder track diverge from the job track before it needs separate content entirely?
- Can AI grading be trusted on artifacts (code, deployed pages), or does it need human spot-checks indefinitely?
- Who maintains market-trend content, and how often? This is the one content stream that can't be written once and cached.
- Does the product hold a student who joins in semester 7 with nothing built? Or is there a minimum viable runway below which we should be honest about limited value?

## 9. Name — decided

**Silsila** (سلسلہ). Adopted across the product and the codebase.

*Silsila* is an unbroken chain, a series, a continuity — one thing following another without a break. That is a more precise description of what is being sold than *qadam* was: a single step is the thing students can already take on their own and repeatedly do, once. The chain is the part that fails on day four, and the chain is what the product supplies. It also gives the design a motif it can actually use — the dots and the contribution grid on the landing page are both links in a chain rather than decoration.

Watch for: the name carries a Sufi-lineage association (a *silsila* is an order of transmission from teacher to student), which reads as fitting rather than as a problem, and there is a well-known 1981 film of the same name — worth checking what search results look like before spending on the handle.

### Candidates considered

| Name | Note |
|---|---|
| **Silsila** (سلسلہ) | "An unbroken chain." **Chosen.** |
| **Qadam** (قدم) | "Step." Clean and local, but names the thing students can already do alone. Previous placeholder. |
| **Rozana** | "Daily." Says exactly what it is. |
| **Aagay** | "Forward / ahead." Casual, how students actually talk. |
| **Ustaad** | "Teacher/master." Strong, but may over-promise mentorship. |
| **Kal** | "Tomorrow." Poetic, possibly too abstract. |

Still to do: confirm domain and Instagram handle availability.