let elapsed = 0;
let lastFault = null;
let logEntries = [];
 
setInterval(() => {
  elapsed++;
  const m = String(Math.floor(elapsed/60)).padStart(2,'0');
  const s = String(elapsed%60).padStart(2,'0');
  document.getElementById('clock').textContent = `${m}:${s}`;
}, 1000);
 
function pct(v, min, max) { return Math.min(Math.max((v-min)/(max-min),0),1); }
 
function setGauge(arcId, needleId, numId, value, min, max, dangerThresh, warnThresh) {
  const p = pct(value, min, max);
  const dashLen = p * 219;
  const angle = -135 + p * 270;
  const isDanger = value >= dangerThresh;
  const isWarn = value >= warnThresh && !isDanger;
  const color = isDanger ? '#c0200a' : isWarn ? '#b85a00' : (arcId.includes('n1') ? '#1a6a3a' : '#1a3a8a');

  document.getElementById(arcId).setAttribute('stroke-dasharray', `${dashLen} 219`);
  document.getElementById(arcId).setAttribute('stroke', color);

  const needle = document.getElementById(needleId);
  needle.setAttribute('transform', `rotate(${angle},55,75)`);
  needle.setAttribute('stroke', color);

  // This fixes the dot color
  const dotId = arcId.includes('n1') ? 'n1-dot' : 'egt-dot';
  document.getElementById(dotId).setAttribute('fill', color);

  document.getElementById(numId).textContent = Math.round(value).toLocaleString();
  document.getElementById(numId).setAttribute('fill', color);
}
 
function update() {
  const wa = Number(document.getElementById('wa').value);
  const tamb = Number(document.getElementById('tamb').value);
  const n1 = Number(document.getElementById('n1').value);
 

  document.getElementById('wa-val').textContent = `${wa} kg/s`;
  document.getElementById('tamb-val').textContent = `${tamb} °C`;
  document.getElementById('n1-val').textContent = `${n1.toLocaleString()} RPM`;
  document.getElementById('wa-fill').style.width = `${pct(wa,10,600)*100}%`;
  document.getElementById('tamb-fill').style.width = `${pct(tamb,-40,60)*100}%`;
  document.getElementById('n1-fill').style.width = `${pct(n1,0,13000)*100}%`;
 
  
  document.getElementById('s-wa').textContent = `${wa} kg/s`;
  document.getElementById('s-tamb').textContent = `${tamb} °C`;
  document.getElementById('s-tamb').style.color = tamb > 45 ? 'var(--red)' : tamb > 35 ? 'var(--amber)' : 'var(--text)';
  document.getElementById('s-n1').textContent = `${n1.toLocaleString()} RPM`;
  document.getElementById('s-n1').style.color = n1 > 11000 ? 'var(--red)' : 'var(--green)';
 
 
  const wfRaw = wa / 15;
  const egt = wa * (wfRaw/wa) * 100 + tamb * 2 + n1 * 0.02;
  const overTemp = egt > 1050;
  const wf = overTemp ? wfRaw * 0.8 : wfRaw;
  const fuelLmin = wf * 60 * 0.82;
 
 
  document.getElementById('v-raw').textContent = `${wfRaw.toFixed(2)} kg/s`;
  document.getElementById('v-egt').textContent = `${Math.round(egt)} °C`;
  document.getElementById('v-check').textContent = overTemp ? 'YES — REDUCE' : 'NO — NOMINAL';
  document.getElementById('v-wf').textContent = `${wf.toFixed(2)} kg/s`;
 
  const egtRow = document.getElementById('step-egt');
  const checkRow = document.getElementById('step-check');
  egtRow.className = 'step-row' + (overTemp ? ' warn' : '');
  checkRow.className = 'step-row' + (overTemp ? ' warn' : '');
  document.getElementById('v-egt').style.color = overTemp ? 'var(--red)' : egt > 900 ? 'var(--amber)' : 'var(--text)';
  document.getElementById('v-check').style.color = overTemp ? 'var(--red)' : 'var(--green)';
 

  document.getElementById('fn-result').className = 'flow-node ' + (overTemp ? 'active-warn' : 'active-ok');
  document.getElementById('fn-result').textContent = overTemp ? 'OVER LIMIT' : 'WITHIN LIMIT';
  document.getElementById('fn-action').className = 'flow-node ' + (overTemp ? 'active-warn' : 'active-ok');
  document.getElementById('fn-action').textContent = overTemp ? 'Wf × 0.8' : 'Wf NOMINAL';
 
 
  setGauge('egt-arc','egt-needle','egt-num', egt, 0, 1200, 1050, 900);
  setGauge('n1-arc','n1-needle','n1-num', n1, 0, 13000, 11000, 9000);
 

  document.getElementById('fuel-num').textContent = fuelLmin.toFixed(1);
 
  
  const n1Warn = n1 > 11000 || n1 < 100;
  const ambWarn = tamb > 50 || tamb < -40;
  const faultCode = overTemp ? 'T4_OVR_TEMP' : n1Warn ? 'N1_LIMIT_EXC' : ambWarn ? 'AMB_TEMP_OOB' : null;
  const airworthy = !faultCode;
 
  const statusBox = document.getElementById('status-box');
  const statusText = document.getElementById('status-text');
  const faultEl = document.getElementById('fault-code');
 
  statusBox.className = 'status-box ' + (airworthy ? 'ok' : 'fault');
  statusText.textContent = airworthy ? 'AIRWORTHY' : 'MAINTENANCE REQ.';
  statusText.style.color = airworthy ? 'var(--green)' : 'var(--red)';
  statusText.className = 'status-text' + (!airworthy ? ' blinking' : '');
  faultEl.style.display = faultCode ? 'block' : 'none';
  faultEl.textContent = faultCode ? `FAULT CODE: ${faultCode}` : '';
 

  const sysStatus = document.getElementById('sys-status');
  sysStatus.textContent = airworthy ? '● SYSTEM NOMINAL' : '● FAULT ACTIVE';
  sysStatus.style.color = airworthy ? 'var(--border)' : 'var(--red)';

  if (faultCode && faultCode !== lastFault) {
    lastFault = faultCode;
    const m = String(Math.floor(elapsed/60)).padStart(2,'0');
    const s = String(elapsed%60).padStart(2,'0');
    logEntries.push(`[${m}:${s}] ${faultCode} | EGT: ${Math.round(egt)}°C`);
    if (logEntries.length > 8) logEntries.shift();
    const box = document.getElementById('log-box');
    box.innerHTML = logEntries.map(e => `<div class="fault-entry">${e}</div>`).join('');
    box.scrollTop = box.scrollHeight;
  }
  if (!faultCode) lastFault = null;
}
 
update();