# N-CODE LazyFlow AI: A Gentle Daily Planner Powered by Open-Weight Gemma

*Submission for the [Hacktoberfest Open-Source AI Challenge Week 3: Slow and Steady](https://dev.to/challenges/hacktoberfest-week3-2026-10-19).*

## What I Built

I built **N-CODE LazyFlow AI**, an open-source, privacy-first planning assistant for people overwhelmed by everyday tasks. You can paste a messy task list, choose your current energy level and a time budget, and ask a **locally hosted open-weight Gemma 3 model** to create a realistic action plan with a tiny first step, prioritized tasks, a few items to postpone, and rest reminders.

The goal is not to promise magical productivity: it is to reduce the friction of deciding what to do next.

## Demo

**Repository:** https://github.com/Deshan217/ncode-lazyflow-ai-hf26

**Real model evidence (passed):** https://github.com/Deshan217/ncode-lazyflow-ai-hf26/actions/runs/39414746192

**Download real generated plan JSON:** https://github.com/Deshan217/ncode-lazyflow-ai-hf26/actions/runs/39414746192/artifacts/12260269969

**Browser demo video/screenshots:** [ADD LINK TO SUCCESSFUL NEW CI ARTIFACT AFTER VERIFICATION]

**Real Gemma GitHub Actions verification:** https://github.com/Deshan217/ncode-lazyflow-ai-hf26/actions

The application runs locally at `http://127.0.0.1:8787`. Because it is deliberately localhost-only and uses a local AI model, the local URL is not a publicly hosted demo. Use a real recording showing the app generate an actual plan.

## Code

The full MIT-licensed source code is available at https://github.com/Deshan217/ncode-lazyflow-ai-hf26.

The frontend uses HTML, CSS and JavaScript with no CDN. A Python standard-library HTTP server listens on loopback. The planning engine calls Ollama's local `/api/generate` endpoint using **Gemma 3 1B** and validates the model's JSON output before returning the plan. The UI provides a Markdown download.

The repository includes unit tests and GitHub Actions workflows. The unit tests use mocked responses and **do not count as real model proof**.

## How I Built It

I chose a small, portable architecture that doesn't need paid subscriptions, accounts or external proprietary AI APIs.

1. The user writes tasks and picks an energy level and available minutes.
2. The local server validates the inputs and builds a structured planning request.
3. Ollama serves the open-weight Gemma 3 1B model on the user's device.
4. The model produces JSON with prioritized actions, durations and a gentle first step.
5. The application checks the response, caps the plan to fit the selected time budget, and renders the steps.

**Testing:** On October 20, 2026, GitHub Actions run #39414746192 completed successfully, including the real-Gemma job, which called the local app API and required a nonempty Gemma-generated plan. The downloadable JSON artifact is linked above. Automated Python tests and syntax checks passed too.

**Screenshot/video:** [ADD VERIFIED CAPTURE FROM NEW GITHUB ACTIONS RUN]

## Why Does Open Innovation Matter?

Because Gemma's weights can run with Ollama under user control, users can plan their day without sending personal task lists to a proprietary AI service. They can also inspect the integration, modify the prompt, and experiment with different locally supported models.

This does not mean the model never makes mistakes. Users should review the outputs, and local inference still requires computer resources and the model's separate license.

## The Slow and Steady Philosophy

Instead of maximizing tasks per minute, LazyFlow helps users start with one achievable action, stay within their real time budget and leave room for breaks. The project aims to make everyday planning more accessible, without claiming scientifically measured time savings or medical benefits.

## Challenges & Lessons

- A local Ollama installation and downloaded model are required.
- Model responses are untrusted and need careful parsing and time-budget validation.
- The app is intentionally not publicly hosted as a multi-user AI service.
- The verified GitHub Actions run used actual Gemma 3 1B inference through Ollama, separate from mocked unit tests.

## What's Next?

Improve onboarding and accessibility, add optional local-only saved plans, test with volunteer users, and collect evidence about whether this workflow feels helpful.

---

**Challenge tags:** `devchallenge`, `hf26challenge`.

**Submission checklist:** Replace placeholders with genuine verified evidence; verify the official Week 3 template, rules and current tags; do not claim a live hosted inference service; publish on DEV before the Week 3 deadline.