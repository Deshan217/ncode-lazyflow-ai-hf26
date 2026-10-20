const $=id=>document.getElementById(id);let latest=null;
function node(tag,text,cls){const x=document.createElement(tag);if(text!=null)x.textContent=text;if(cls)x.className=cls;return x}
async function health(){try{const r=await fetch('/api/health');const x=await r.json();$('status').textContent=x.connected&&x.installed?'● Gemma ready · local':'○ Ollama/Gemma not ready'}catch{$('status').textContent='○ Local AI offline'}}
health();
$('planner').addEventListener('submit',async e=>{
 e.preventDefault();const btn=$('generate');btn.disabled=true;btn.textContent='Generating real Gemma plan…';$('output').replaceChildren(node('p','Contacting local Ollama model. This can take a minute…'));
 try{const r=await fetch('/api/plan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({tasks:$('tasks').value,energy:$('energy').value,minutes:Number($('minutes').value)})});const data=await r.json();if(!r.ok)throw Error(data.error||'Planning failed');
 latest=data;const pane=node('div',null,'result');pane.append(node('p','✦ YOUR GENTLE ACTION PLAN','eyebrow'),node('h2',data.headline),node('p',data.minutes_allocated+' of '+data.minutes_available+' minutes planned'));
 const first=node('div',null,'first');first.append(node('strong','START HERE'),node('p',data.first_step));pane.append(first);
 const steps=node('div',null,'steps');for(const [i,v] of data.plan.entries()){const s=node('div',null,'step');s.append(node('em',v.minutes+' min'),node('b',(i+1)+'. '+v.title),node('small',v.reason));steps.append(s)}pane.append(steps);
 if(data.later?.length){pane.append(node('h3','Save for later'),node('p',data.later.join(' · '),'later'))}
 pane.append(node('p',data.gentle_note));
 const download=node('button','↓ Download Markdown plan','download');download.addEventListener('click',()=>{const parts=['# '+latest.headline,'','**First step:** '+latest.first_step,'',...latest.plan.map((s,i)=>(i+1)+'. '+s.title+' ('+s.minutes+' min) — '+s.reason),'','Later: '+latest.later.join(', '),'',latest.gentle_note];const link=document.createElement('a'),blob=new Blob([parts.join('\n')],{type:'text/markdown'});link.href=URL.createObjectURL(blob);link.download='lazyflow-plan.md';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),2000)});pane.append(download);$('output').replaceChildren(pane)}
 catch(err){$('output').replaceChildren(node('p',err.message,'error'))}
 finally{btn.disabled=false;btn.textContent='✧  Create my gentle plan →'}
});
