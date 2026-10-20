"""Capture genuine Gemma-generated output; no mock, no fallback."""
import json
from pathlib import Path
from datetime import datetime,timezone
from urllib.request import Request,urlopen
req=Request("http://127.0.0.1:8787/api/plan",data=json.dumps({"tasks":"Reply to client emails, review homepage design, organize project files, take a walk","minutes":60,"energy":"low"}).encode(),headers={"Content-Type":"application/json","Origin":"http://127.0.0.1:8787"},method="POST")
with urlopen(req,timeout=150) as response: plan=json.load(response)
if plan.get("generated_by")!="local_open_weight_model" or not plan.get("plan"): raise SystemExit("No real model results: cannot claim a successful demo.")
Path("evidence").mkdir(exist_ok=True)
Path("evidence/real-gemma-plan.json").write_text(json.dumps({"verified_at_utc":datetime.now(timezone.utc).isoformat(),"source":"Real local Gemma 3 via app API","plan":plan},indent=2))
print("VERIFIED REAL GEMMA AI",plan["model"],plan["headline"],"actions",len(plan["plan"]))
