"""N-CODE LazyFlow AI — local-only standard library web server."""
import json
from http.server import ThreadingHTTPServer,BaseHTTPRequestHandler
from pathlib import Path
from urllib.parse import urlsplit
from engine import generate_plan,model_status
ROOT=Path(__file__).parent/"static"
class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args): pass
    def send(self,status,body,mime="application/json; charset=utf-8"):
        self.send_response(status)
        for k,v in {"Content-Type":mime,"Content-Length":str(len(body)),"Cache-Control":"no-store","X-Content-Type-Options":"nosniff","X-Frame-Options":"DENY","Content-Security-Policy":"default-src 'self'; connect-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; object-src 'none'; base-uri 'none'"}.items():self.send_header(k,v)
        self.end_headers();self.wfile.write(body)
    def reply(self,status,obj):self.send(status,json.dumps(obj).encode())
    def do_GET(self):
        url=urlsplit(self.path).path
        if url=="/api/health":return self.reply(200,model_status())
        allow={"/":"index.html","/app.js":"app.js","/styles.css":"styles.css"}
        if url not in allow:return self.reply(404,{"error":"Not found"})
        name=allow[url]
        mime="text/html; charset=utf-8" if name.endswith("html") else "text/css; charset=utf-8" if name.endswith("css") else "application/javascript; charset=utf-8"
        self.send(200,(ROOT/name).read_bytes(),mime)
    def do_POST(self):
        if self.path!="/api/plan":return self.reply(404,{"error":"Not found"})
        if self.headers.get("Origin","") not in ("","http://127.0.0.1:8787","http://localhost:8787"):return self.reply(403,{"error":"Local origin required"})
        if not self.headers.get("Content-Type","").startswith("application/json"):return self.reply(415,{"error":"JSON required"})
        try:
            n=int(self.headers.get("Content-Length","0"))
            if n<=0 or n>12000: return self.reply(413,{"error":"Invalid size"})
            data=json.loads(self.rfile.read(n))
            result=generate_plan(data)
            return self.reply(200,result)
        except ValueError as e:return self.reply(400,{"error":str(e)})
        except RuntimeError as e:return self.reply(503,{"error":str(e)})
if __name__=="__main__":
    print("N-CODE LazyFlow AI: http://127.0.0.1:8787")
    ThreadingHTTPServer(("127.0.0.1",8787),Handler).serve_forever()
