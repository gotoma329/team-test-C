// 21script.js
// スクロールで要素をフェードイン、詳細トグル、小さなアクセントアニメ

document.addEventListener('DOMContentLoaded', ()=>{
  const cards = Array.from(document.querySelectorAll('.card'));
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    })
  },{threshold:0.12});
  cards.forEach(c=>observer.observe(c));

  // 詳細トグル
  document.addEventListener('click', e=>{
    const t = e.target.closest('[data-toggle]');
    if(!t) return;
    const id = t.getAttribute('data-toggle');
    const details = document.getElementById(id);
    if(!details) return;
    details.classList.toggle('open');
    // 簡単なアクセントアニメ
    t.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(0.98)' },
      { transform: 'scale(1)' }
    ],{duration:180,easing:'ease-out'});
  });

  // ナビゲーションボタン
  const back = document.getElementById('to21index');
  if(back){
    back.addEventListener('click', ()=>{
      window.location.href = './21index.html';
    });
  }
});
