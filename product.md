# [Working name: Qadam] — Product Document v1

*Qadam (قدم) = "step." Placeholder — alternatives at the end of this doc.*

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

### Who this is for

The motivated-but-unsupported student. Someone who *wants* to and has already tried. They have a phone, patchy laptop access, 30–60 free minutes a day, and no one to ask "am I doing this right?"

### Who this is *not* for

- Students who need to be convinced to care. We do not manufacture motivation.
- Students who already have mentors, strong campus networks, or FAST/NUST/LUMS-tier peer pressure. They have substitutes.
- Anyone looking for a bootcamp or a job guarantee.

---

## 2. The solution

A daily companion, not a course.

Every day the student gets **one small task — 30 to 45 minutes.** Small enough that a full class schedule can't justify skipping it. They complete it and submit **proof** — a link, a screenshot, three lines of writing. The system reviews the proof and responds. Everything they submit accumulates into a **public profile** that becomes their real CV by graduation.

Three mechanics carry the whole product:

1. **Small daily load.** Compounding beats intensity. 40 minutes × 4 years is unrecognisable from where they started.
2. **Proof-of-work, not checkboxes.** "Mark as done" teaches nothing and can be lied to. An artifact can be reviewed, and reviewing it is where AI earns its place — ChatGPT in a browser structurally cannot remember what you promised last Tuesday.
3. **Presence without shame.** The system shows up every day whether they did yesterday's task or not. No streak punishment, no red numbers, no guilt copy. This user already carries enough of that; a punishing app becomes one more thing they're failing at.

---

## 3. Task taxonomy

The task mix *is* the product. If every task is "watch a React tutorial," this is a worse Coursera. Five types, rotated:

| Type | Share | What it is | Example |
|---|---|---|---|
| **Skill** | ~40% | The technical spine. Course modules, tutorials, practice problems. | "Complete section 4 of the JS course. Push your solutions." |
| **Horizon** | ~20% | Expands what they know exists. Talks, essays, teardowns, career explainers. **This is the differentiator.** | "Watch this 18-min talk on how Careem was built. Write 3 lines: what surprised you?" |
| **Artifact** | ~20% | Build something small that leaves a trace. | "Build a page that fetches and displays live currency rates. Deploy it." |
| **Signal** | ~10% | Direct CV / profile / positioning work. | "Rewrite your LinkedIn headline. Here are 3 examples of good ones in your field." |
| **Human** | ~10% | Network-building. The weakest skill in this cohort and the most costly gap. | "Message one senior working in your field. Here's a template. Send it." |

**Design note:** Human tasks will have the worst completion rate and the highest long-term value. Track this specifically. Do not drop them because the numbers look bad early.

**Content strategy:** Do not generate task content with an LLM per user per day — it will not survive the unit economics at PKR pricing. Build ~15 curated track templates (web dev, data/AI, design, digital marketing, accounting/ACCA, mobile, QA, cybersecurity, content, etc.). Use the LLM only for (a) personalising a template at intake and (b) reviewing submissions.

---

## 4. Phases

### Phase 0 — Manual loop (3–4 weeks) — *partially done*

Run entirely over WhatsApp. No product. 15–25 students, ideally the IUB BS AI cohort plus one non-CS department to test generalisation.

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

- Intake → personalised roadmap (semester → week → day)
- Daily task delivery
- Proof submission (link / file / text)
- AI review of submission
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

---

## 8. Open questions

- Does this generalise beyond CS/AI departments, or is the content burden per track too high?
- Can peer review substitute for pod leads at scale, or does quality collapse?
- English proficiency — how much content needs Urdu versions?
- What happens at graduation? Does the product have a second act, or does the user churn by design?
- Name.

## 9. Name candidates

| Name | Note |
|---|---|
| **Qadam** (قدم) | "Step." Clean, local, easy to say. Current placeholder. |
| **Rozana** | "Daily." Says exactly what it is. |
| **Aagay** | "Forward / ahead." Casual, how students actually talk. |
| **Ustaad** | "Teacher/master." Strong, but may over-promise mentorship. |
| **Kal** | "Tomorrow." Poetic, possibly too abstract. |

Check domain + Instagram handle availability before committing.