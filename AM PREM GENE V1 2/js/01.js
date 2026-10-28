
    function switchPage(nama) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('page-' + nama);
      if (target) target.classList.add('active');
      ['home','activate','info','tools'].forEach(tab => {
        const el = document.getElementById('nav-' + tab);
        if (el) el.classList.remove('active');
      });
      let aktif = 'nav-home';
      if (nama === 'activate') aktif = 'nav-activate';
      else if (nama === 'info') aktif = 'nav-info';
      else if (nama === 'tools') aktif = 'nav-tools';
      const el = document.getElementById(aktif);
      if (el) el.classList.add('active');
      document.body.classList.toggle('tools-open', nama === 'tools');
      window.scrollTo(0,0);
    }
    function cobaMainkanAudio() {
      const audio = document.getElementById('laguLatar');
      const petunjuk = document.getElementById('petunjukMain');
      if (!audio) return;
      audio.play().then(() => { if (petunjuk) petunjuk.classList.remove('visible'); })
        .catch(() => { if (petunjuk) petunjuk.classList.add('visible'); });
    }
    function mainkanLagu() {
      const audio = document.getElementById('laguLatar');
      const petunjuk = document.getElementById('petunjukMain');
      if (audio) { audio.play(); if (petunjuk) petunjuk.classList.remove('visible'); }
    }
  