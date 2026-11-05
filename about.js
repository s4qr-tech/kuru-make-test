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
  }
  addEventListener('scroll',venn,{passive:true});addEventListener('resize',venn);venn();
})();
