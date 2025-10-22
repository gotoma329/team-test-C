// 24script.js
// 面白おかしく "来年の今日" と "今年の12月" の天気を予想する

function seededRandom(seed){
  // 単純な線形合同法で安定した擬似乱数（0..1)
  let s = 0;
  for(let i=0;i<seed.length;i++) s = (s<<5) - s + seed.charCodeAt(i);
  s = Math.abs(s) % 2147483647;
  return function(){ s = (s * 48271) % 2147483647; return (s % 1000) / 1000; };
}

function pick(arr, rnd){ return arr[Math.floor(rnd()*arr.length)]; }

function makePrediction(seedBase, opts={}){
  const rnd = seededRandom(seedBase);
  const weathers = ['快晴','晴れ時々曇り','曇り','小雨','大雨','雪','みぞれ','にわか雨','雷雨','ミステリー晴れ'];
  const extras = ['虹が出るかも','傘を忘れないで','暑さ対策推奨','セーターが必要','アイスが売れ残る','風がやや強い','散歩日和','洗濯日和ではないかも'];
  const jokes = ['空も笑っているよ','天気は気分次第','雲がSNSを見てるかも','空が機嫌を直すかも'];

  const w = pick(weathers, rnd);
  const e = pick(extras, rnd);
  const j = pick(jokes, rnd);
  return {main:w,extra:e,joke:j};
}

function renderResult(container, pred, label){
  container.innerHTML = '';
  const h = document.createElement('div');
  h.className = 'result';
  h.innerHTML = `<div>${label}</div><div style="margin-top:6px;font-size:20px">予想: <span class="humor">${pred.main}</span></div><div style="margin-top:8px;color:#6b5b4b">${pred.extra} — <em style='color:#b06bff'>${pred.joke}</em></div>`;
  container.appendChild(h);
  // アニメ：ポップイン
  h.animate([{transform:'translateY(8px)',opacity:0},{transform:'translateY(0)',opacity:1}],{duration:420,easing:'cubic-bezier(.2,.9,.2,1)'});
}

function emojiRain(count=18){
  const layer = document.querySelector('.emoji-layer');
  if(!layer) return;
  const emojis = ['☀️','🌤️','⛅','🌧️','⛈️','❄️','🌈','☁️','🌪️'];
  for(let i=0;i<count;i++){
    const el = document.createElement('div');
    el.className = 'emoji';
    el.textContent = emojis[i % emojis.length];
    const left = Math.random()*100;
    el.style.left = left + '%';
    const delay = Math.random()*800;
    const dur = 2200 + Math.random()*1600;
    el.style.fontSize = (14 + Math.random()*28) + 'px';
    layer.appendChild(el);
    // trigger animation
    requestAnimationFrame(()=>{
      el.style.animation = `fall ${dur}ms linear ${delay}ms forwards`;
    });
    // remove later
    setTimeout(()=>{ layer.removeChild(el); }, dur + delay + 200);
  }
}

document.addEventListener('DOMContentLoaded', ()=>{
  const btn1 = document.getElementById('predict-next-year');
  const out1 = document.getElementById('out-next-year');
  const btn2 = document.getElementById('predict-dec');
  const out2 = document.getElementById('out-dec');

  btn1.addEventListener('click', ()=>{
    const now = new Date();
    const next = new Date(now.getFullYear()+1, now.getMonth(), now.getDate());
    const seed = `next-${next.toISOString().slice(0,10)}`;
    const pred = makePrediction(seed);
    renderResult(out1, pred, `来年の今日（${next.toLocaleDateString()}）の予想`);
    emojiRain(12);
  });

  btn2.addEventListener('click', ()=>{
    const now = new Date();
    const seed = `dec-${now.getFullYear()}-12`;
    const pred = makePrediction(seed);
    renderResult(out2, pred, `今年の12月（${now.getFullYear()}年12月）の予想`);
    emojiRain(16);
  });

  // 小ネタ: 画面をクリックすると即席ジョーク予報
  document.getElementById('surprise').addEventListener('click', ()=>{
    const seed = `surprise-${Date.now()}`;
    const pred = makePrediction(seed);
    const surpriseOut = document.getElementById('out-surprise');
    renderResult(surpriseOut, pred, '今すぐの面白予報');
    emojiRain(22);
  });
});
