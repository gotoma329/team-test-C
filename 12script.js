/* 12script.js: ダミー天気データを使って表示・傘判定を行う。
   実運用では天気API（OpenWeatherMapやWeatherAPIなど）から取得する実装に差し替えてください。
*/

// イラスト（絵文字）マッピング
const ICONS = {
  Clear: '☀️',
  Clouds: '☁️',
  Rain: '🌧️',
  Drizzle: '🌦️',
  Thunderstorm: '⛈️',
  Snow: '❄️',
  Mist: '🌫️'
};

// ダミーで1週間分（7日）の宮崎の天気データを返す関数
function fetchWeeklyMiyazaki() {
  // 実際は fetch() でAPIを叩いてデータを返す
  const today = new Date();
  const days = [];
  const sample = [
    {main: 'Clear', min: 18, max: 28, pop: 0.05},
    {main: 'Clouds', min: 19, max: 26, pop: 0.1},
    {main: 'Rain', min: 17, max: 23, pop: 0.7},
    {main: 'Rain', min: 16, max: 22, pop: 0.6},
    {main: 'Clear', min: 18, max: 27, pop: 0.02},
    {main: 'Drizzle', min: 17, max: 21, pop: 0.4},
    {main: 'Clouds', min: 18, max: 24, pop: 0.12}
  ];

  for(let i=0;i<7;i++){
    const d = new Date(today);
    d.setDate(today.getDate()+i);
    const s = sample[i % sample.length];
    days.push({date: d.toISOString().slice(0,10), weekday: d.toLocaleDateString('ja-JP', {weekday:'short'}), ...s});
  }
  return Promise.resolve(days);
}

function needUmbrella(pop, main){
  // 雨確率(pop)が0.5以上、または main が Rain/Thunderstorm/Drizzle の場合は傘推奨
  if(pop >= 0.5) return true;
  if(['Rain','Thunderstorm','Drizzle'].includes(main)) return true;
  return false;
}

function renderWeek(week){
  const container = document.getElementById('week');
  container.innerHTML = '';
  for(const day of week){
    const el = document.createElement('div');
    el.className = 'day';
    const badge = needUmbrella(day.pop, day.main) ? '<div class="badge">傘</div>' : '';
    const icon = ICONS[day.main] || '❔';
    el.innerHTML = `${badge}<div class="date">${day.weekday} ${day.date}</div><div class="icon">${icon}</div><div class="temp">${day.min}° / ${day.max}°</div><div class="note">降水確率 ${Math.round(day.pop*100)}%</div>`;
    container.appendChild(el);
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', ()=>{
  const status = document.getElementById('statusTop');
  status.textContent = '読み込み中...';

  fetchWeeklyMiyazaki().then(week=>{
    renderWeek(week);
    const anyUmbrella = week.some(d => needUmbrella(d.pop,d.main));
    status.textContent = anyUmbrella ? '傘が必要そうな日があります' : '今週は傘は不要そうです';
  }).catch(err=>{
    status.textContent = '天気情報の取得に失敗しました';
    console.error(err);
  });
});
