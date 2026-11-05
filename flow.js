// トップの背景に流れる写真（pool-inc.net のトップを参考にした構成）
// ■ 写真の差し替え方
//   1. 写真を new2/works/ に入れる（例：works/001.jpg）
//   2. 下の KM_FLOW の src に 'works/001.jpg' と書く（空のままなら仮の和紙ブロックを表示）
//   3. kind は WORK（施設の方と作った作品）／BACKSTAGE（活動の背景）／SCENE（情景）
//   ※ 写真に写る方の掲載許可を得たものだけ入れること
window.KM_FLOW = [
  {src:'assets/flow/ex1.jpg',     kind:'WORK',  cap:'和紙の重なり'},
  {src:'assets/flow/scene.jpg',   kind:'SCENE', cap:'みんなで描く時間'},
  {src:'assets/flow/ex3.jpg',     kind:'SCENE', cap:'作品展の風景'},
  {src:'assets/flow/collage.jpg', kind:'WORK',  cap:'和紙のちぎり絵'},
  {src:'assets/flow/ex2.jpg',     kind:'WORK',  cap:'色のかさなり'},
  {src:'assets/flow/hands.jpg',   kind:'WORK',  cap:'和紙をちぎる手'},
  {src:'assets/flow/ex4.jpg',     kind:'SCENE', cap:'並んだ作品'},
  {src:'assets/flow/ex5.jpg',     kind:'SCENE', cap:'小さな作品たち'},
  {src:'assets/flow/talk.jpg',    kind:'SCENE', cap:'作品を前に、語りあう'},
  {src:'assets/flow/gallery.jpg', kind:'SCENE', cap:'世代をこえた対話'},
  {src:'assets/flow/tour.jpg',    kind:'SCENE', cap:'みんなで鑑賞する時間'}
];

(function(){
  var host=document.getElementById('flow'); if(!host) return;
  var items=window.KM_FLOW.concat(window.KM_FLOW.slice().reverse()), PAL=[['#a9d6c9','#f2d9a0'],['#f4b8b0','#f7dfa8'],['#b9c8ea','#e6c5dc'],['#d8e6a8','#a9d6c9'],['#f7dfa8','#f4b8b0'],['#e6c5dc','#b9c8ea']];
  // 背景の写真は、スマホでも自動で流れる（設定で動きを減らしている端末では、ゆっくりめに流す）
  var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var els=items.map(function(it,i){
    var d=document.createElement('figure'); d.className='fl fl-'+it.kind.toLowerCase();
    var inner = it.src
      ? '<img src="'+it.src+'" alt="'+it.cap+'" loading="lazy">'
      : '<div class="ph" style="--a:'+PAL[i%6][0]+';--b:'+PAL[i%6][1]+'"></div><span class="fl-tag">PHOTO</span>';
    d.innerHTML=inner+'<figcaption>'+it.cap+'</figcaption>';
    // 1枚ごとに、大きさ・傾き・速さ・横のずれを変える（想いがあふれるように、不ぞろいに）
    var R=function(k){var v=Math.sin((i+1)*127.1+k*311.7)*43758.5453;return v-Math.floor(v)};
    d._k={ph:(i/items.length+(R(1)-.5)*0.04+1)%1, sp:0.9+R(2)*0.28, lane:(R(3)+R(8)+R(12))/3, ang:(R(14)-.5)*0.36, wob:0.25+R(15)*0.35, wph:R(16)*6.28, r0:(R(6)-.5)*76, ra:5+R(17)*9};
    d.style.setProperty('--s',(0.65+R(5)*0.7).toFixed(2));
    d.style.setProperty('--r',((R(6)-.5)*56).toFixed(1)+'deg');
    d._o={s:0.8+((i*37)%5)*0.12, r:-22+((i*13)%7)*2};
    host.appendChild(d);
    return d;
  });
  // 和紙の紙吹雪：ちぎったような形の小さな紙片が、写真といっしょに同じ向きに流れる
  var st=document.createElement('style');
  st.textContent='.fc{position:absolute;left:0;top:0;pointer-events:none;will-change:transform;opacity:.9;'+
    'background-image:radial-gradient(rgba(255,255,255,.55) 0 1px,transparent 1.5px),repeating-linear-gradient(35deg,rgba(255,255,255,.28) 0 1px,transparent 1px 3px);'+
    'box-shadow:0 1px 2px rgba(0,0,0,.08)}';
  document.head.appendChild(st);
  var WASHI=['#63b8a5','#e2c350','#ee8a56','#e98cb5','#9aa9dd','#f4efe4','#f4efe4','#f7e7c4'];
  var NC=matchMedia('(max-width:900px)').matches?70:110;
  function torn(r){var p=[],n=7+Math.floor(r()*3);for(var j=0;j<n;j++){var an=j/n*6.2832,rad=36+r()*14;p.push((50+Math.cos(an)*rad).toFixed(0)+'% '+(50+Math.sin(an)*rad).toFixed(0)+'%')}return 'polygon('+p.join(',')+')'}
  var conf=[];
  for(var c=0;c<NC;c++){
    (function(c){
      var r=function(k){var v=Math.sin((c+3)*91.7+k*17.3)*43758.5453;return v-Math.floor(v)};
      var e=document.createElement('i'); e.className='fc';
      var w=4+r(1)*r(2)*12; e.style.width=w.toFixed(0)+'px'; e.style.height=(w*(0.55+r(3)*0.6)).toFixed(0)+'px';
      e.style.backgroundColor=WASHI[Math.floor(r(4)*WASHI.length)]; e.style.clipPath=torn(function(){return r(Math.random()*50)});
      e.style.opacity=(0.85+r(5)*0.15).toFixed(2);
      e._k={ph:c/NC+(r(6)-.5)*0.03, sp:0.8+r(7)*0.9, lane:(r(8)+r(13))/2, spin:(r(9)-.5)*120, rot:r(10)*360, sw:3+r(11)*8};
      host.appendChild(e); conf.push(e);
    })(c);
  }
  var N=els.length, t0=performance.now(), sy=0, mq=matchMedia('(max-width:900px)');
  addEventListener('scroll',function(){sy=scrollY},{passive:true});
  // 右上 → 左下へ、止まらずに流れ続ける。
  //  ・1枚ごとに速さ（px/秒）が少しずつ違い、横の通り道もずれる。ただし全体は、ゆるくうねる一本の「川」にまとまる（幅は lane で調整）
  //  ・出入りは必ず画面の外で行うので、途中で急に現れたり、消えたりしない
  var DX=-1, DY=0.7, dl=Math.sqrt(DX*DX+DY*DY); DX/=dl; DY/=dl;   // 流れる向き
  var NX=DY, NY=-DX;                                                // 横にずれる向き（流れに直角）
  function frame(now){
    var W=host.clientWidth,H=host.clientHeight,t=(now-t0)/1000;
    // ▼ スマホ（900px以下）は初期案：右上→左下へ、等間隔で流れる（紙吹雪なし・写真は最初の11枚）
    if(mq.matches){
      var half=els.length/2, sp0=(calm?0.011:0.018)*Math.max(1,Math.min(3,900/W));
      els.forEach(function(el,i){
        if(i>=half){el.style.display='none';return}
        el.style.display='';
        var p=((i/half)+t*sp0+sy*0.00006)%1; if(p<0)p+=1;
        var x=W*(1.15-1.5*p)+((i*97)%11-5)*W*0.045, y=H*(-0.25+1.5*p);
        el.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) rotate('+el._o.r+'deg) scale('+el._o.s.toFixed(2)+')';
      });
      conf.forEach(function(e){e.style.display='none'});
      requestAnimationFrame(frame);return;
    }
    conf.forEach(function(e){e.style.display=''});
    els.forEach(function(el){el.style.display=''});
    var Pd=Math.abs(W*DX)+Math.abs(H*DY), Pn=Math.abs(W*NX)+Math.abs(H*NY);
    var L=Pd+1000, lane=Pn*0.30+220;                 // 流れる長さ（画面の外から外まで）／ 横のひろがり
    var base=(calm?42:64);                      // 基本の速さ（px/秒）
    els.forEach(function(el,i){
      var k=el._k;
      var u=(k.ph+(t*base*k.sp+sy*0.25)/L)%1; if(u<0)u+=1;
      var along=(u-0.5)*L, side=(k.lane-0.5)*lane+Math.sin(u*Math.PI*2+1.3)*Pn*0.012;
      // 1枚ごとに進む向きを少しずらし、ゆっくり横にゆれ、傾きも変わる（自然に漂うように）
      var ca=Math.cos(k.ang), sa=Math.sin(k.ang);
      var ax=DX*ca-DY*sa, ay=DX*sa+DY*ca;
      side+=Math.sin(t*k.wob+k.wph)*Pn*0.03;
      var x=W/2+ax*along+NX*side, y=H*0.64+ay*along+NY*side;
      var rot=k.r0+Math.sin(t*k.wob*0.8+k.wph)*k.ra;
      el.style.transform='translate('+(x-el.offsetWidth/2).toFixed(1)+'px,'+(y-el.offsetHeight/2).toFixed(1)+'px) rotate('+rot.toFixed(1)+'deg) scale(var(--s))';
    });
    var Lc=Pd+240, lc=Pn*0.55+260;
    conf.forEach(function(e){
      var k=e._k;
      var u=(k.ph+(t*base*k.sp*1.15+sy*0.3)/Lc)%1; if(u<0)u+=1;
      var along=(u-0.5)*Lc, side=(k.lane-0.5)*lc+Math.sin(t*0.9+k.rot)*k.sw;
      var x=W/2+DX*along+NX*side, y=H*0.64+DY*along+NY*side;
      e.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) rotate('+(k.rot+t*k.spin).toFixed(0)+'deg)';
    });
    requestAnimationFrame(frame);
  }
  frame(t0);
})();
