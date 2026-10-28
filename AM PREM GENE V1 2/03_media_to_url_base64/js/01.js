
    let fileDipilih = null;
    let tipeDipilih = "image";

    function pilihTipe(tipe, el) {
      tipeDipilih = tipe;
      document.querySelectorAll('.type-btn').forEach(t => t.classList.remove('aktif'));
      el.classList.add('aktif');
      reset();
    }

    function reset() {
      fileDipilih = null;
      document.getElementById('fileInfo').style.display = 'none';
      document.getElementById('linkBox').textContent = '';
      document.getElementById('copyBtn').style.display = 'none';
      document.getElementById('errorBox').style.display = 'none';
      document.getElementById('catboxBtn').style.display = 'none';
      document.getElementById('progressWrap').style.display = 'none';
      document.getElementById('previewImg').style.display = 'none';
      document.getElementById('previewVid').style.display = 'none';
      document.getElementById('previewAud').style.display = 'none';
      const btn = document.getElementById('btnUpload');
      btn.disabled = true;
    }

    function pilihFile() {
      const input = document.getElementById('inputFile');
      if (tipeDipilih === '*') input.removeAttribute('accept');
      else input.accept = tipeDipilih + '/*';
      input.click();
    }

    // Drag & drop
    const zone = document.getElementById('uploadZone');
    zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('drag'); });
    zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
    zone.addEventListener('drop', e => {
      e.preventDefault(); zone.classList.remove('drag');
      if (e.dataTransfer.files.length) prosesFile(e.dataTransfer.files[0]);
    });

    function saatDipilih(input) {
      if (input.files.length) prosesFile(input.files[0]);
    }

    function prosesFile(file) {
      fileDipilih = file;
      const info = document.getElementById('fileInfo');
      info.innerHTML = '📄 <strong>' + file.name + '</strong> • 📦 ' + formatUkuran(file.size);
      info.style.display = 'block';
      document.getElementById('btnUpload').disabled = false;
      document.getElementById('errorBox').style.display = 'none';
      document.getElementById('catboxBtn').style.display = 'none';
    }

    function formatUkuran(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes/1024).toFixed(1) + ' KB';
      return (bytes/1048576).toFixed(2) + ' MB';
    }

    function mulaiUpload() {
      if (!fileDipilih) return;
      const btn = document.getElementById('btnUpload');
      const progressWrap = document.getElementById('progressWrap');
      const progressBar = document.getElementById('progressBar');
      const errorBox = document.getElementById('errorBox');

      btn.disabled = true;
      btn.textContent = '...';
      progressWrap.style.display = 'block';
      progressBar.style.width = '0%';
      progressBar.textContent = '0%';
      errorBox.style.display = 'none';
      document.getElementById('catboxBtn').style.display = 'none';

      const formData = new FormData();
      formData.append('file', fileDipilih);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://tmpfiles.org/api/v1/upload', true);

      xhr.upload.onprogress = e => {
        if (e.lengthComputable) {
          const p = Math.round((e.loaded / e.total) * 100);
          progressBar.style.width = p + '%';
          progressBar.textContent = p + '%';
        }
      };

      xhr.onload = () => {
        progressWrap.style.display = 'none';
        btn.textContent = 'upload';
        btn.disabled = false;
        try {
          const data = JSON.parse(xhr.responseText);
          if (data.status === 'success' && data.data && data.data.url) {
            let url = data.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
            tampilkanHasil(url);
          } else {
            throw new Error('Gagal upload');
          }
        } catch (err) {
          errorBox.textContent = '❌ ' + err.message + ' — Coba tombol permanen di bawah.';
          errorBox.style.display = 'block';
          document.getElementById('catboxBtn').style.display = 'block';
        }
      };

      xhr.onerror = () => {
        progressWrap.style.display = 'none';
        btn.textContent = 'upload';
        btn.disabled = false;
        errorBox.textContent = '❌ Koneksi gagal — pakai tombol permanen di bawah.';
        errorBox.style.display = 'block';
        document.getElementById('catboxBtn').style.display = 'block';
      };

      xhr.send(formData);
    }

    function tampilkanHasil(url) {
      document.getElementById('linkBox').textContent = url;
      document.getElementById('copyBtn').style.display = 'block';
      const tipe = fileDipilih.type;
      if (tipe.startsWith('image/')) {
        const img = document.getElementById('previewImg');
        img.src = url; img.style.display = 'block';
      } else if (tipe.startsWith('video/')) {
        const vid = document.getElementById('previewVid');
        vid.src = url; vid.style.display = 'block';
      } else if (tipe.startsWith('audio/')) {
        const aud = document.getElementById('previewAud');
        aud.src = url; aud.style.display = 'block';
      }
    }

    function salinLink() {
      const url = document.getElementById('linkBox').textContent;
      if (!url) return;
      navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyBtn');
        const lama = btn.textContent;
        btn.textContent = '✅ TERSALIN!';
        setTimeout(() => btn.textContent = lama, 2000);
      });
    }
  