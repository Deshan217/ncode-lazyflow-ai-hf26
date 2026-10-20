# N-CODE LazyFlow AI

**Hacktoberfest 2026 · Week 3: Slow and Steady** · Built October 20, 2026 · MIT License

An offline-first productivity assistant built with Python's standard library, a local web dashboard, and **Gemma 3 1B via Ollama**. Paste a messy task list, choose your energy level and available time, and get a prioritized daily plan with small first steps and breaks.

## Getting started

Requirements: Python 3.10+, [Ollama](https://ollama.com/download), and `gemma3:1b`.

```bash
ollama pull gemma3:1b
# Start Ollama if it isn't running already:
ollama serve
# In a second terminal:
python app.py
```

Open http://127.0.0.1:8787 in your browser. On Windows, `py -3 app.py` also works. No pip install required. AI inference runs exclusively against loopback Ollama; the local app does not store task history.

## Test

```bash
python -m unittest discover -s tests -v
python -m py_compile app.py engine.py
```

These unit and HTTP tests **mock model output**. Real model inference is tested separately using the GitHub Actions workflow `.github/workflows/verify.yml`. Do not claim real Gemma execution until that workflow passes and its output artifact is available.

## Files

- `app.py`: Local HTTP server and secure API
- `engine.py`: Prompt, model invocation, planning validation
- `static/`: Responsive client dashboard
- `scripts/real_ai_demo.py`: Real-model evidence generator
- `tests/`: Input/API tests
- `DEV_SUBMISSION_DRAFT.md`: DEV.to article draft

## Safety and limitations

- Requires Ollama and downloaded Gemma locally. Not designed for public hosting.
- Does not expose raw Ollama or the app to the network.
- Generated plans need human judgment; don't claim measurable time savings without evidence.
- MIT applies to project source. Gemma model and Ollama have their own licenses.

## Hacktoberfest

[Week 3 official challenge](https://dev.to/challenges/hacktoberfest-week3-2026-10-19) · [N-CODE STUDIO](https://ncodest.com/) · Open source, built October 20, 2026.

Submission deadline: **October 25, 2026, 11:59 PM PDT** (Oct 26, 12:29 PM Sri Lanka time). The DEV article requires a public repository, a real demo, and the official challenge template/tags.
