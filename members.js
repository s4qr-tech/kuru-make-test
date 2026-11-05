// 仲間ページの描画（データは members-data.js）
(function(){
  var M = window.KM_MEMBERS || {};
  var PAL = [['#a9d6c9','#f2d9a0'],['#f4b8b0','#f7dfa8'],['#b9c8ea','#e6c5dc'],['#d8e6a8','#a9d6c9'],['#f7dfa8','#f4b8b0'],['#e6c5dc','#b9c8ea']];
  function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
  function ok(x){return x && x.consent}
  // 名前の横の【仮】（kari が true で、名前にすでに【仮】が入っていない場合）
  function kari(x){return (x.kari&&String(x.name).indexOf('【仮')<0)?'<span class="kari">【仮】</span>':''}
  function pal(i){var p=PAL[i%PAL.length];return '--a:'+p[0]+';--b:'+p[1]}

  // 理事・監事・顧問：顔写真とプロフィールが必須
  function officer(x,i,lead){
    var hasPhoto=!!x.photo, hasBio=x.bio&&x.bio.length&&x.bio.join('').indexOf('【仮】')<0;
    var photo=hasPhoto
      ? '<img src="'+esc(x.photo)+'" alt="'+esc(x.name)+'（'+esc(x.role)+'）">'
      : '<div class="ph portrait" style="'+pal(i)+'"><span class="req">PHOTO<br>顔写真（必須）<br><b>提出待ち</b></span></div>';
    return '<article class="off'+(lead?' off-lead':'')+'">'+
      '<div class="off-ph">'+photo+'</div>'+
      '<div class="off-tx">'+
        '<p class="off-role"><span>'+esc(x.role)+'</span>'+esc(x.en)+'</p>'+
        '<h3 class="off-name">'+esc(x.name)+kari(x)+(x.kana?'<small>'+esc(x.kana)+'</small>':'')+'</h3>'+
        '<p class="off-aff">'+esc(x.affil)+'</p>'+
        (x.duties&&x.duties.length?'<div class="off-duty"><b>役割</b><ul>'+x.duties.map(function(d){return '<li>'+esc(d)+'</li>'}).join('')+'</ul></div>':'')+
        (x.papers&&x.papers.length?'<div class="off-paper"><b>論文</b>'+x.papers.map(function(a){return '<a href="'+esc(a.url)+'" target="_blank" rel="noopener">'+esc(a.t)+'<span>PDF ↗</span></a>'}).join('')+'</div>':'')+
        '<div class="off-bio">'+(x.bio||[]).map(function(b){return '<p>'+esc(b)+'</p>'}).join('')+'</div>'+
        (x.msg?'<p class="off-msg"><b>想い</b>'+esc(x.msg)+'</p>':'')+
        '<p class="off-st">'+(hasPhoto?'':'<span>顔写真：提出待ち</span>')+(hasBio?'':'<span>プロフィール：仮原稿（本人確認待ち）</span>')+'</p>'+
      '</div></article>';
  }
  function put(id,html){var e=document.getElementById(id);if(e)e.innerHTML=html}

  put('m-directors',(M.directors||[]).filter(ok).map(function(x,i){return officer(x,i,i===0)}).join(''));
  put('m-auditors',(M.auditors||[]).filter(ok).map(function(x,i){return officer(x,i+3)}).join(''));
  put('m-advisors',(M.advisors||[]).filter(ok).map(function(x,i){return officer(x,i+4)}).join(''));

  put('m-facilities',(M.facilities||[]).filter(ok).map(function(x,i){
    var ph=x.photo?'<img src="'+esc(x.photo)+'" alt="">':'<div class="ph" style="'+pal(i+1)+'"></div>';
    return '<li class="fac">'+ph+'<p class="fac-k">'+esc(x.kind)+'</p><h3>'+esc(x.name)+kari(x)+'</h3>'+
      '<p class="fac-m">'+esc(x.area)+'　／　協力：'+esc(x.since)+'</p><p class="fac-n">'+esc(x.note)+'</p></li>';
  }).join(''));

  put('m-students',(M.students||[]).filter(ok).map(function(x,i){
    var ini=esc(x.name.replace(/[・.\s]/g,'').slice(0,2));
    var av=(x.photoOK&&x.photo)?'<img class="av" src="'+esc(x.photo)+'" alt="'+esc(x.name)+'">':'<span class="av" style="'+pal(i)+'">'+ini+'</span>';
    return '<li class="stu">'+av+'<h3>'+esc(x.name)+kari(x)+'</h3><p class="stu-u">'+esc(x.univ)+'</p>'+
      '<p class="stu-f"><span>'+esc(x.focus)+'</span></p><p class="stu-w">'+esc(x.word)+'</p></li>';
  }).join(''));
})();
