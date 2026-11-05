// ABOUT：スクロール連動の3つの円
(function(){
  var mani=document.getElementById('mani');if(!mani)return;
  var cs=[].slice.call(document.querySelectorAll('.c')),ts=[].slice.call(document.querySelectorAll('.t'));
  var still=matchMedia('(prefers-reduced-motion:reduce)').matches;
  function clamp(x){return Math.max(0,Math.min(1,x))}
  function venn(){
    var r=mani.getBoundingClientRect(),vh=innerHeight;
    var p=still?1:clamp((vh*0.55-r.top)/(r.height-vh*0.2));
    cs.forEach(function(c,i){
      var q=clamp((p-i*0.27)/0.3);
      c.style.strokeDashoffset=1-q;
      ts[i].style.opacity=q>0.9?1:0;
    });
    if(ts[3])ts[3].style.opacity=p>0.92?1:0;
    var core=document.querySelector('.core');if(core)core.style.opacity=p>0.92?1:0;
  }
  addEventListener('scroll',venn,{passive:true});addEventListener('resize',venn);venn();
})();

// ABOUT 冒頭：少し上にスライドできるが、手を離すとバネのように定位置へ戻る（大きく進めたら、次の位置へ）
(function(){
  var hero=document.querySelector('.hero'),mani=document.getElementById('mani');
  if(!hero||!mani||matchMedia('(prefers-reduced-motion:reduce)').matches)return;
  var timer=null,touching=false,busy=false,cancel=false;
  function stop(){cancel=true;clearTimeout(timer)}
  addEventListener('touchstart',function(){touching=true;stop()},{passive:true});
  addEventListener('touchend',function(){touching=false;arm()},{passive:true});
  addEventListener('wheel',stop,{passive:true});
  addEventListener('keydown',stop);
  addEventListener('scroll',function(){if(!busy)arm()},{passive:true});
  function arm(){clearTimeout(timer);timer=setTimeout(settle,touching?9999:150)}
  function settle(){
    if(busy||touching)return;
    var y=scrollY,top=mani.getBoundingClientRect().top+y;
    if(y<=1||y>=top-1)return;           // すでに定位置、または次の区間の中
    var back=y<top*0.38;
    spring(y,back?0:top,back);
  }
  // バネの動き：目標へ向かって、減衰しながらわずかに行き過ぎて戻る
  function spring(from,to,bounce){
    busy=true;cancel=false;var t0=performance.now(),dur=760,d=from-to;
    function f(now){
      if(cancel){busy=false;return}
      var t=Math.min(1,(now-t0)/dur),s=t*dur/1000;
      var k=Math.exp(-7.5*s)*Math.cos(9*s);            // 1 → 0 へ減衰しながら振れる
      var y=to+d*k;
      if(!bounce)y=to+d*Math.pow(1-t,3);           // 次の位置へは、なめらかに
      document.documentElement.style.scrollBehavior='auto';
      scrollTo(0,Math.max(0,y));
      if(t<1)requestAnimationFrame(f);
      else{scrollTo(0,to);busy=false;if(bounce)wobble()}
    }
    requestAnimationFrame(f);
  }
  // 定位置に戻ったとき、冒頭の文字がバネのようにほんの少し揺れる
  function wobble(){
    if(!hero.animate)return;
    hero.animate([{transform:'translateY(0)'},{transform:'translateY(14px)'},{transform:'translateY(-5px)'},{transform:'translateY(2px)'},{transform:'translateY(0)'}],{duration:620,easing:'ease-out'});
  }
  // 冒頭にいる間は、スクロール量の半分だけ文字が一緒に動く（引っ張っている感じ）
  var inner=[hero.querySelector('.hero-en'),hero.querySelector('.hero-ja')];
  function pull(){
    var y=Math.min(scrollY,innerHeight),o=busy?0:0;
    inner.forEach(function(el){if(el)el.style.transform='translateY('+(-y*0.12).toFixed(1)+'px)'});
  }
  addEventListener('scroll',pull,{passive:true});pull();
})();
