
    const API_URL = "https://api.qsr.web.id";
    const API_KEY = "qsr";
    let emailPengguna = "";

    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(cobaMainkanAudio, 100);
    });

    // Jam otomatis tapi tertulis INDONESIA
    function tampilkanJam() {
      const el = document.getElementById('jamSekarang');
      if (el) {
        const d = new Date();
        el.textContent = 
          String(d.getHours()).padStart(2,'0') + '.' +
          String(d.getMinutes()).padStart(2,'0') + '.' +
          String(d.getSeconds()).padStart(2,'0');
      }
    }
    tampilkanJam();
    setInterval(tampilkanJam, 1000);

    function ulangiVerifikasi() {
      emailPengguna = "";
      document.getElementById('amEmail').value = "";
      document.getElementById('amLink').value = "";
      document.getElementById('amMsg').textContent = "";
      document.getElementById('amMsg2').textContent = "";
      document.getElementById('amStep2').style.display = 'none';
      document.getElementById('amHasil').style.display = 'none';
      setTimeout(() => document.getElementById('amEmail')?.focus(), 100);
    }

    async function amKirim() {
      const email = document.getElementById('amEmail').value.trim();
      const msg = document.getElementById('amMsg');
      if (!email || !email.includes('@')) {
        msg.textContent = '⚠️ Email tidak valid — ketik ulang langsung!';
        return;
      }
      emailPengguna = email;
      msg.textContent = '⏳ Mengirim...';
      try {
        const res = await fetch(`${API_URL}/alight/send?apikey=${API_KEY}&email=${encodeURIComponent(email)}`);
        const d = await res.json();
        if (d.status) {
          msg.textContent = '✅ Link dikirim! Cek email';
          document.getElementById('amStep2').style.display = 'block';
        } else {
          msg.textContent = '❌ ' + (d.message || d.error || 'Gagal — tekan lagi sekarang!');
        }
      } catch {
        msg.textContent = '❌ Koneksi gagal — tekan lagi sekarang!';
      }
    }

    async function amVerif() {
      const link = document.getElementById('amLink').value.trim();
      const msg = document.getElementById('amMsg2');
      if (!link) { msg.textContent = '⚠️ Masukkan link — tempel langsung!'; return; }
      msg.textContent = '⏳ Memverifikasi...';
      try {
        const res = await fetch(`${API_URL}/alight/verify?apikey=${API_KEY}&email=${encodeURIComponent(emailPengguna)}&link=${encodeURIComponent(link)}`);
        const d = await res.json();
        if (d.status) {
          msg.textContent = '✅ Berhasil!';
          document.getElementById('amResEmail').textContent = emailPengguna;
          document.getElementById('amHasil').style.display = 'block';
        } else {
          msg.textContent = '❌ ' + (d.message || d.error || 'Gagal — coba lagi sekarang!');
        }
      } catch {
        msg.textContent = '❌ Koneksi gagal — coba lagi sekarang!';
      }
    }
  