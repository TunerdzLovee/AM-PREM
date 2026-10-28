
  (function(){
    var overlay=document.getElementById('introOverlay');
    var video=document.getElementById('introVideo');
    var skipBtn=document.getElementById('skipBtn');
    var badge=document.getElementById('introBadge');
    var bar=document.getElementById('introBar');
    var introMusic=document.getElementById('introMusic');
    var done=false;
    function stopIntroMusic(){
      try{ if(introMusic){ introMusic.pause(); introMusic.currentTime=0; } }catch(e){}
    }
    function finishIntro(){
      if(done)return; done=true;
      try{video.pause();}catch(e){}
      stopIntroMusic();
      overlay.classList.add('hideIntro');
      setTimeout(function(){if(overlay.parentNode)overlay.remove();},700);
    }
    function nyalakanMusik(){
      stopIntroMusic();
      try{
        if(typeof mainkanLagu==='function'){ mainkanLagu(); }
        var hint=document.getElementById('petunjukMain');
        if(hint){hint.classList.remove('visible');hint.style.display='none';}
      }catch(e){}
    }
    skipBtn.addEventListener('click',function(){ nyalakanMusik(); finishIntro(); });
    video.addEventListener('ended',function(){ nyalakanMusik(); finishIntro(); });
    video.addEventListener('error',function(){badge.textContent='GAGAL MEMUAT';setTimeout(finishIntro,800);});
    video.addEventListener('timeupdate',function(){
      try{
        if(video.duration){
          var pct=(video.currentTime/video.duration)*100;
          bar.style.width=pct+'%';
          badge.textContent='INTRO '+(100-Math.round(pct))+'%';
        }
      }catch(e){}
    });
    video.addEventListener('play',function(){badge.textContent='INTRO';});
    // autoplay ditahan dulu — dimulai setelah tombol START di layar pre-intro ditekan
    window.__startIntro = function(){
      setTimeout(function(){if(!done && video.readyState<2)finishIntro();},5000);
      try{ if(introMusic){ introMusic.currentTime=0; introMusic.play().catch(function(){}); } }catch(e){}
      video.play().catch(function(){finishIntro();});
    };
  })();
  // handler tombol START di layar pre-intro
  (function(){
    var pre=document.getElementById('preIntro');
    var btn=document.getElementById('preStartBtn');
    if(!btn||!pre)return;
    btn.addEventListener('click',function(){
      pre.classList.add('hidePre');
      setTimeout(function(){ if(pre.parentNode) pre.remove(); },600);
      if(typeof window.__startIntro==='function') window.__startIntro();
    });
  })();
  