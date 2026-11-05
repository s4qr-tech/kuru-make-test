// 共通部品：ヘッダー／メニュー／フッター／上へ戻る、一覧データ（すべて仮置き）
(function(){
  var KM = window.KM = {};

  // ---- データ（仮）。新しいものを上に追加 ----
  KM.activities = [
    {t:'ハロウィン和紙コラージュ', d:'2026.10', tag:'WORKSHOP', place:'大阪のデイサービス施設'},
    {t:'秋の和紙ちぎり絵【仮】', d:'2026.11', tag:'WORKSHOP', place:'【仮・施設名】'},
    {t:'夏のうちわづくり【仮】', d:'2026.08', tag:'EVENT', place:'【仮・施設名】'},
    {t:'和アートセラピーの研究発表', d:'2026.03', tag:'RESEARCH', place:'国際教養学部（論文掲載 2026）'},
    {t:'春の桜コラージュ【仮】', d:'2026.04', tag:'WORKSHOP', place:'【仮・施設名】'},
    {t:'NPO法人設立の準備を開始', d:'2026.11', tag:'NPO', place:'kuru.make'}
  ];
  KM.news = [
    {d:'2026.11.05', c:'NEWS', t:'NPO法人化に向けて、新しいサイトの準備をはじめました【仮】'},
    {d:'2026.10.31', c:'REPORT', t:'ハロウィンイベントを大阪のデイサービス施設で開催しました'},
    {d:'2026.10.10', c:'NEWS', t:'賛助会員・ご寄付の受付準備を進めています【仮】'},
    {d:'2026.08.20', c:'REPORT', t:'夏のうちわづくりを開催しました【仮】'},
    {d:'2026.03.15', c:'RESEARCH', t:'和アートセラピーに関する論文が掲載されました'}
  ];
  var PAL = [['#a9d6c9','#f2d9a0'],['#f4b8b0','#f7dfa8'],['#b9c8ea','#e6c5dc'],['#d8e6a8','#a9d6c9'],['#f7dfa8','#f4b8b0'],['#e6c5dc','#b9c8ea']];
  KM.ph = function(i){var p=PAL[i%PAL.length];return '<div class="ph" style="--a:'+p[0]+';--b:'+p[1]+'"></div>'};

  // ---- 共通パーツ ----
  var page = document.body.getAttribute('data-page') || '';
  var nav = [['ACTIVITY','activity'],['ABOUT','about'],['SUPPORT','support'],['CONTACT','contact']];
  var sub = [['REPORT','report'],['NEWS','news']];
  function a(l,k,cls){return '<a href="'+k+'.html"'+(cls||page===k?' class="'+[cls,page===k?'is-on':''].join(' ').trim()+'"':'')+'>'+l+'</a>'}
  var html =
    '<header class="hd" id="hd">'+
      '<a class="hd-logo" href="index.html" aria-label="kuru.make トップ"><img src="assets/mark.png" alt="" width="44" height="44"><span>kuru.make</span></a>'+
      '<nav class="hd-nav" aria-label="メイン">'+nav.map(function(n){return a(n[0],n[1])}).join('')+sub.map(function(n){return a(n[0],n[1],'sub')}).join('')+'</nav>'+
      '<button class="hd-burger" id="burger" aria-label="メニュー" aria-expanded="false"><i></i><i></i></button>'+
    '</header>'+
    '<div class="drawer" id="drawer" hidden>'+nav.concat(sub).map(function(n){return '<a href="'+n[1]+'.html">'+n[0]+'</a>'}).join('')+'</div>';
  document.body.insertAdjacentHTML('afterbegin', html);
  document.body.insertAdjacentHTML('beforeend',
    '<footer class="ft"><p>Copyright© 2026 kuru.make. All rights reserved.</p></footer>'+
    '<a class="totop" href="#" aria-label="ページの先頭へ"><svg viewBox="0 0 36 24" width="36" height="24"><path d="M0 12 L18 1 L36 12 M18 1 V24" fill="none" stroke="currentColor" stroke-width="1"/></svg></a>');

  var hd=document.getElementById('hd'),b=document.getElementById('burger'),d=document.getElementById('drawer');
  function sc(){hd.classList.toggle('scrolled',window.scrollY>120)}
  addEventListener('scroll',sc,{passive:true});sc();
  b.addEventListener('click',function(){
    var o=b.getAttribute('aria-expanded')==='true';
    b.setAttribute('aria-expanded',String(!o));d.hidden=o;
  });

  // ---- 一覧の描画 ----
  function card(x,i){
    return '<li class="card" data-tag="'+x.tag+'"><a href="activity.html">'+KM.ph(i)+
      '<p class="c-t">'+x.t+'</p><p class="c-m">'+x.d+'　'+x.place+'</p>'+
      '<p class="tags"><span>'+x.tag+'</span></p></a></li>';
  }
  var g=document.querySelector('[data-render="activities"]');
  if(g){
    var lim=+g.getAttribute('data-limit')||99;
    g.innerHTML=KM.activities.slice(0,lim).map(card).join('');
  }
  var f=document.querySelector('[data-filter]');
  if(f){
    f.addEventListener('click',function(e){
      var t=e.target.closest('button');if(!t)return;
      [].forEach.call(f.querySelectorAll('button'),function(x){x.classList.toggle('is-on',x===t)});
      var v=t.getAttribute('data-v');
      [].forEach.call(document.querySelectorAll('.card'),function(c){c.hidden=!(v==='ALL'||c.getAttribute('data-tag')===v)});
    });
  }
  var n=document.querySelector('[data-render="news"]');
  if(n){
    var l2=+n.getAttribute('data-limit')||99, only=n.getAttribute('data-only');
    n.innerHTML=KM.news.filter(function(x){return !only||x.c===only}).slice(0,l2).map(function(x){
      return '<li><a href="news.html"><span class="n-d">'+x.d+'</span><span class="n-c">'+x.c+'</span><span class="n-t">'+x.t+'</span></a></li>';
    }).join('');
  }
  var r=document.querySelector('[data-render="reports"]');
  if(r){
    r.innerHTML=KM.activities.slice(0,4).map(function(x,i){
      return '<li class="rep"><a href="activity.html">'+KM.ph(i+2)+'<div><p class="c-m">'+x.d+'　'+x.tag+'</p><p class="c-t">'+x.t+'</p><p class="rep-x">活動の様子を、写真とあわせて紹介します。【仮・本文は差し替え】</p></div></a></li>';
    }).join('');
  }

  // ---- アコーディオン ----
  [].forEach.call(document.querySelectorAll('.acc-h'),function(h){
    h.addEventListener('click',function(){
      var li=h.parentNode,o=li.classList.toggle('is-open');
      h.setAttribute('aria-expanded',String(o));
    });
  });
})();
