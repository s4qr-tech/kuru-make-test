// トップの背景に流れる写真（pool-inc.net のトップを参考にした構成）
// ■ 写真の差し替え方
//   1. 写真を new2/works/ に入れる（例：works/001.jpg）
//   2. 下の KM_FLOW の src に 'works/001.jpg' と書く（空のままなら仮の和紙ブロックを表示）
//   3. kind は WORK（施設の方と作った作品）／BACKSTAGE（活動の背景）／SCENE（情景）
//   ※ 写真に写る方の掲載許可を得たものだけ入れること
window.KM_FLOW = [
  {src:'', kind:'WORK',      cap:'和紙のちぎり絵（施設の方と）'},
  {src:'', kind:'SCENE',     cap:'活動の情景'},
  {src:'', kind:'WORK',      cap:'ハロウィンのコラージュ'},
  {src:'', kind:'BACKSTAGE', cap:'準備の風景'},
  {src:'', kind:'WORK',      cap:'うちわづくり'},
  {src:'', kind:'SCENE',     cap:'おしゃべりの時間'},
  {src:'', kind:'WORK',      cap:'桜のコラージュ'},
  {src:'', kind:'BACKSTAGE', cap:'和紙を選ぶ'},
  {src:'', kind:'WORK',      cap:'季節の貼り絵'},
  {src:'', kind:'SCENE',     cap:'施設の窓辺'}
];

(function(){
  var host=document.getElementById('flow'); if(!host) return;
  var items=window.KM_FLOW, PAL=[['#a9d6c9','#f2d9a0'],['#f4b8b0','#f7dfa8'],['#b9c8ea','#e6c5dc'],['#d8e6a8','#a9d6c9'],['#f7dfa8','#f4b8b0'],['#e6c5dc','#b9c8ea']];
  // 背景の写真は、スマホでも自動で流れる（設定で動きを減らしている端末では、ゆっくりめに流す）
  var calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
  var els=items.map(function(it,i){
    var d=document.createElement('figure'); d.className='fl fl-'+it.kind.toLowerCase();
    var inner = it.src
      ? '<img src="'+it.src+'" alt="'+it.cap+'" loading="lazy">'
      : '<div class="ph" style="--a:'+PAL[i%6][0]+';--b:'+PAL[i%6][1]+'"></div><span class="fl-tag">PHOTO</span>';
    d.innerHTML=inner+'<figcaption>'+it.cap+'</figcaption>';
    d.style.setProperty('--s',(0.8+((i*37)%5)*0.12).toFixed(2));
    d.style.setProperty('--r',(-22+((i*13)%7)*2)+'deg');
    host.appendChild(d);
    return d;
  });
  var N=els.length, t0=performance.now(), sy=0;
  addEventListener('scroll',function(){sy=scrollY},{passive:true});
  function frame(now){
    var W=host.clientWidth,H=host.clientHeight,t=(now-t0)/1000;
    // スマホは画面が狭く、同じ割合だとほとんど動いて見えないので、速さを上げる
    var speed=(calm?0.011:0.018)*Math.max(1,Math.min(3,900/W));
    els.forEach(function(el,i){
      // 右上 → 左下へ斜めに流れる。各カードは等間隔にずらして配置
      var p=((i/N)+t*speed+sy*0.00006)%1; if(p<0)p+=1;
      var x=W*(1.15-1.5*p) , y=H*(-0.25+1.5*p) ;
      // 横方向にも少しばらけさせる
      x+= ((i*97)%11-5)*W*0.045;
      el.style.transform='translate('+x.toFixed(1)+'px,'+y.toFixed(1)+'px) rotate(var(--r)) scale(var(--s))';
    });
    requestAnimationFrame(frame);
  }
  frame(t0);
})();
