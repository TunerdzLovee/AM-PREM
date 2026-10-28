
(function(){
  const overlay=document.getElementById('comicStartup');
  if(!overlay)return;

  function startComicLoading(){
    if(overlay.dataset.started==='1')return;
    overlay.dataset.started='1';
    overlay.style.display='flex';
    overlay.classList.remove('hide');
    overlay.setAttribute('aria-hidden','false');

    const isToolPage = new URLSearchParams(window.location.search).has('tool');
    const bootKey = 'comicToolsStartupShown';
    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem(bootKey) === '1'; } catch(e) {}
    if(isToolPage || alreadyShown){
      overlay.remove();
      return;
    }
    try { sessionStorage.setItem(bootKey, '1'); } catch(e) {}
    const fill=document.getElementById('startFill'), pct=document.getElementById('startPct'), log=document.getElementById('startLog'), stage=document.getElementById('startStage'), hint=document.getElementById('startHint');
    const steps=[
      [6,'LAXX CORE // POWER ON','Initializing system','Waking up comic engine...'],
      [16,'LOADING VISUAL ENGINE...','Loading interface','Rendering comic layers...'],
      [27,'SCANNING TOOLBOX MODULES...','Scanning tools','Checking comic modules...'],
      [39,'CHECKING TOOL STATUS...','Verifying toolbox','Preparing available tools...'],
      [51,'SYNCING MOBILE UI...','Optimizing mobile','Calibrating touch layout...'],
      [63,'STARTING LIVE MONITOR...','Activating monitor','Checking system panel...'],
      [75,'CONNECTING DEV CONSOLE...','Loading developer layer','Preparing TOOLS...'],
      [86,'POLISHING COMIC VIBES...','Final visual pass','Applying final interface motion...'],
      [94,'FINAL SYSTEM CHECK...','Running final checks','Almost ready...'],
      [100,'SYSTEM READY ✓','Launching Comic Tools','Welcome to the toolbox!']
    ];
    let i=0, start=performance.now();
    function tick(){
      const now=performance.now(), elapsed=now-start;
      const target=steps[i][0];
      const prev=i?steps[i-1][0]:0;
      const duration=600;
      const t=Math.min(1,elapsed/duration);
      const val=Math.round(prev+(target-prev)*(1-Math.pow(1-t,3)));
      if(fill)fill.style.width=val+'%'; if(pct)pct.textContent=val+'%';
      if(log)log.textContent=steps[i][1]; if(stage)stage.textContent=steps[i][2]; if(hint)hint.textContent=steps[i][3];
      if(t>=1){
        if(i<steps.length-1){i++;start=performance.now();setTimeout(tick,30)}
        else{setTimeout(()=>{overlay.classList.add('hide');overlay.setAttribute('aria-hidden','true');setTimeout(()=>{if(overlay.isConnected)overlay.remove()},700)},650)}
      }else requestAnimationFrame(tick);
    }
    setTimeout(tick,350);
  }

  // CAPTCHA must succeed first; then show the existing LAXX loading animation.
  overlay.style.display='none';
  if(window.LAXX_VERIFIED===true){ startComicLoading(); }
  else window.addEventListener('laxx:verification-success', startComicLoading, {once:true});
})();

/* =========================
   SUPABASE CONFIG
========================= */
const SUPABASE_URL = "https://whcoxecfkwqalehbukug.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_d-YxIQY9lWa1tdf_ENJw2g_ePK25Vt5";
const supabaseClient = (window.supabase && typeof window.supabase.createClient === "function") ? window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY) : null;

const MEDIA_URL_B64 = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImlkIj4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0iVVRGLTgiIC8+CiAgPG1ldGEgbmFtZT0idmlld3BvcnQiIGNvbnRlbnQ9IndpZHRoPWRldmljZS13aWR0aCwgaW5pdGlhbC1zY2FsZT0xLjAiIC8+CiAgPHRpdGxlPk1lZGlhIHRvIFVSTCDigJQgTEFYWCBUT09MUzwvdGl0bGU+CiAgPGxpbmsgcmVsPSJzdHlsZXNoZWV0IiBocmVmPSJodHRwczovL2NkbmpzLmNsb3VkZmxhcmUuY29tL2FqYXgvbGlicy9mb250LWF3ZXNvbWUvNi40LjAvY3NzL2FsbC5taW4uY3NzIiAvPgogIDxsaW5rIHJlbD0icHJlY29ubmVjdCIgaHJlZj0iaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbSI+CiAgPGxpbmsgcmVsPSJwcmVjb25uZWN0IiBocmVmPSJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tIiBjcm9zc29yaWdpbj4KICA8bGluayBocmVmPSJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUFudG9uJmZhbWlseT1Qb3BwaW5zOndnaHRANDAwOzYwMDs3MDA7ODAwOzkwMCZkaXNwbGF5PXN3YXAiIHJlbD0ic3R5bGVzaGVldCI+CiAgPHN0eWxlPgogICAgOnJvb3QgewogICAgICAtLXB1cnBsZTogIzhiMDBmZjsKICAgICAgLS1wdXJwbGUtbGlnaHQ6ICNhODU1Zjc7CiAgICAgIC0tcHVycGxlLXNvZnQ6ICNmM2U4ZmY7CiAgICAgIC0tYmxhY2s6ICMwMDAwMDA7CiAgICAgIC0td2hpdGU6ICNmZmZmZmY7CiAgICAgIC0tZ3JheTogI2U1ZTdlYjsKICAgIH0KICAgICogeyBtYXJnaW46IDA7IHBhZGRpbmc6IDA7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IH0KICAgIGJvZHkgewogICAgICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmOwogICAgICBiYWNrZ3JvdW5kOiAjZmZmZGY4OwogICAgICBtaW4taGVpZ2h0OiBhdXRvOwogICAgICBwYWRkaW5nOiA4cHggNHB4OwogICAgICBkaXNwbGF5OiBibG9jazsKICAgIH0KICAgIC5waG9uZS1mcmFtZSB7CiAgICAgIHdpZHRoOiAxMDAlOwogICAgICBtYXgtd2lkdGg6IDQyMHB4OwogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS13aGl0ZSk7CiAgICAgIGJvcmRlcjogNXB4IHNvbGlkIHZhcigtLWJsYWNrKTsKICAgICAgYm9yZGVyLXJhZGl1czogMjhweDsKICAgICAgcGFkZGluZzogMjBweCAxOHB4IDMwcHg7CiAgICAgIGJveC1zaGFkb3c6IDhweCA4cHggMCByZ2JhKDAsMCwwLDAuMyk7CiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTsKICAgIH0KCiAgICAvKiBUb21ib2wgS2VtYmFsaSAqLwogICAgLmJhY2stYnRuIHsKICAgICAgZGlzcGxheTogaW5saW5lLWZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogOHB4OwogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1wdXJwbGUpOyBjb2xvcjogdmFyKC0td2hpdGUpOwogICAgICBib3JkZXI6IDRweCBzb2xpZCB2YXIoLS1ibGFjayk7IGJvcmRlci1yYWRpdXM6IDk5OXB4OwogICAgICBwYWRkaW5nOiAxMHB4IDIwcHg7IGZvbnQtd2VpZ2h0OiA4MDA7IGZvbnQtc2l6ZTogMC44NXJlbTsKICAgICAgY3Vyc29yOiBwb2ludGVyOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7CiAgICAgIGJveC1zaGFkb3c6IDRweCA0cHggMCByZ2JhKDAsMCwwLDAuMyk7CiAgICAgIGZvbnQtZmFtaWx5OiAnQW50b24nLCBzYW5zLXNlcmlmOyBsZXR0ZXItc3BhY2luZzogMXB4OwogICAgICBtYXJnaW4tYm90dG9tOiAxOHB4OwogICAgfQogICAgLmJhY2stYnRuOmFjdGl2ZSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJweCwycHgpOyBib3gtc2hhZG93OiAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpOyB9CgogICAgLyogSGVhZGVyICovCiAgICAuaGVhZGVyLXJvdyB7CiAgICAgIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTRweDsgbWFyZ2luLWJvdHRvbTogMjBweDsKICAgIH0KICAgIC5sb2dvLWJveCB7CiAgICAgIHdpZHRoOiA5MHB4OyBoZWlnaHQ6IDkwcHg7IGZsZXgtc2hyaW5rOiAwOwogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1wdXJwbGUpOyBib3JkZXI6IDVweCBzb2xpZCB2YXIoLS1ibGFjayk7CiAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBjb2xvcjogdmFyKC0td2hpdGUpOwogICAgICBib3gtc2hhZG93OiA1cHggNXB4IDAgcmdiYSgwLDAsMCwwLjMpOwogICAgICBwb3NpdGlvbjogcmVsYXRpdmU7IG92ZXJmbG93OiBoaWRkZW47CiAgICB9CiAgICAubG9nby1ib3g6OmFmdGVyIHsKICAgICAgY29udGVudDogIiI7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAtMzBweDsgcmlnaHQ6IC0zMHB4OwogICAgICB3aWR0aDogNjBweDsgaGVpZ2h0OiA2MHB4OyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMTUpOwogICAgICBib3JkZXItcmFkaXVzOiA1MCU7CiAgICB9CiAgICAubG9nby1zdmcgeyB3aWR0aDogNjBweDsgaGVpZ2h0OiA2MHB4OyBwb3NpdGlvbjogcmVsYXRpdmU7IHotaW5kZXg6IDI7IH0KICAgIC5oZWFkZXItdGV4dCB7IGZsZXg6IDE7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfQogICAgLmNvbWljLXRvb2wtYmFkZ2UgewogICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7IGJhY2tncm91bmQ6IHZhcigtLWJsYWNrKTsgY29sb3I6IHZhcigtLXdoaXRlKTsKICAgICAgcGFkZGluZzogNnB4IDE4cHg7IGZvbnQtZmFtaWx5OiAnQW50b24nLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDEuMXJlbTsKICAgICAgbGV0dGVyLXNwYWNpbmc6IDJweDsgdHJhbnNmb3JtOiByb3RhdGUoLTNkZWcpOwogICAgICBib3gtc2hhZG93OiAzcHggM3B4IDAgcmdiYSgxMzksMCwyNTUsMC41KTsKICAgICAgbWFyZ2luLWJvdHRvbTogNnB4OwogICAgfQogICAgLm1haW4tdGl0bGUgewogICAgICBmb250LWZhbWlseTogJ0FudG9uJywgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAyLjZyZW07IGxpbmUtaGVpZ2h0OiAxOwogICAgICBjb2xvcjogdmFyKC0tYmxhY2spOyBsZXR0ZXItc3BhY2luZzogMXB4OwogICAgICB0ZXh0LXNoYWRvdzogNHB4IDRweCAwIHZhcigtLXB1cnBsZSk7CiAgICB9CgogICAgLyogUGlsaWggVGlwZSAqLwogICAgLnR5cGUtcm93IHsKICAgICAgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTsgZ2FwOiAxMHB4OwogICAgICBtYXJnaW4tYm90dG9tOiAyMHB4OwogICAgfQogICAgLnR5cGUtYnRuIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tZ3JheSk7IGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWJsYWNrKTsKICAgICAgYm9yZGVyLXJhZGl1czogMTZweDsgcGFkZGluZzogMTRweCA0cHg7CiAgICAgIGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogNnB4OwogICAgICBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IDAuMTVzOwogICAgICBib3gtc2hhZG93OiAzcHggM3B4IDAgcmdiYSgwLDAsMCwwLjI1KTsKICAgIH0KICAgIC50eXBlLWJ0bjphY3RpdmUgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgycHgsMnB4KTsgYm94LXNoYWRvdzogMXB4IDFweCAwIHJnYmEoMCwwLDAsMC4yNSk7IH0KICAgIC50eXBlLWJ0bi5ha3RpZiB7IGJhY2tncm91bmQ6IHZhcigtLXB1cnBsZSk7IGNvbG9yOiB2YXIoLS13aGl0ZSk7IH0KICAgIC50eXBlLWJ0bi5ha3RpZiAudHlwZS1pY29uIHsgY29sb3I6IHZhcigtLXdoaXRlKTsgfQogICAgLnR5cGUtaWNvbiB7IGZvbnQtc2l6ZTogMS41cmVtOyBjb2xvcjogdmFyKC0tYmxhY2spOyB9CiAgICAudHlwZS1sYWJlbCB7CiAgICAgIGZvbnQtZmFtaWx5OiAnQW50b24nLCBzYW5zLXNlcmlmOyBmb250LXNpemU6IDAuOHJlbTsgbGV0dGVyLXNwYWNpbmc6IDFweDsKICAgICAgY29sb3I6IGluaGVyaXQ7CiAgICB9CiAgICAudHlwZS1idG46bm90KC5ha3RpZikgLnR5cGUtbGFiZWwgeyBjb2xvcjogdmFyKC0tYmxhY2spOyB9CgogICAgLyogVXBsb2FkIFpvbmUgKi8KICAgIC51cGxvYWQtem9uZSB7CiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXB1cnBsZS1zb2Z0KTsgYm9yZGVyOiA1cHggc29saWQgdmFyKC0tYmxhY2spOwogICAgICBib3JkZXItcmFkaXVzOiAyOHB4OyBwYWRkaW5nOiAzNnB4IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiAwLjJzOyBtYXJnaW4tYm90dG9tOiAxOHB4OwogICAgICBib3gtc2hhZG93OiBpbnNldCAwIDAgMCAycHggcmdiYSgxMzksMCwyNTUsMC4xKTsKICAgIH0KICAgIC51cGxvYWQtem9uZTpob3ZlciwgLnVwbG9hZC16b25lLmRyYWcgeyBiYWNrZ3JvdW5kOiAjZTlkNWZmOyB9CiAgICAudXBsb2FkLWljb24gewogICAgICBmb250LXNpemU6IDMuNXJlbTsgY29sb3I6IHZhcigtLXB1cnBsZSk7IG1hcmdpbi1ib3R0b206IDEwcHg7CiAgICAgIGRpc3BsYXk6IGJsb2NrOwogICAgfQogICAgLnVwbG9hZC10ZXh0IHsKICAgICAgZm9udC1mYW1pbHk6ICdBbnRvbicsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMS40cmVtOwogICAgICBjb2xvcjogdmFyKC0tcHVycGxlKTsgbGV0dGVyLXNwYWNpbmc6IDFweDsKICAgIH0KICAgICNpbnB1dEZpbGUgeyBkaXNwbGF5OiBub25lOyB9CgogICAgLyogSW5mbyBGaWxlICovCiAgICAuZmlsZS1pbmZvIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tcHVycGxlLXNvZnQpOyBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1wdXJwbGUpOwogICAgICBib3JkZXItcmFkaXVzOiAxMnB4OyBwYWRkaW5nOiAxMHB4IDE0cHg7IG1hcmdpbi1ib3R0b206IDE0cHg7CiAgICAgIGZvbnQtc2l6ZTogMC44cmVtOyBmb250LXdlaWdodDogNjAwOyBjb2xvcjogIzZiMjFhODsKICAgICAgZGlzcGxheTogbm9uZTsKICAgIH0KCiAgICAvKiBQcm9ncmVzcyAqLwogICAgLnByb2dyZXNzLXdyYXAgewogICAgICB3aWR0aDogMTAwJTsgaGVpZ2h0OiAyOHB4OyBiYWNrZ3JvdW5kOiB2YXIoLS1ncmF5KTsKICAgICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tYmxhY2spOyBib3JkZXItcmFkaXVzOiAxNHB4OwogICAgICBvdmVyZmxvdzogaGlkZGVuOyBtYXJnaW4tYm90dG9tOiAxNHB4OyBkaXNwbGF5OiBub25lOwogICAgfQogICAgLnByb2dyZXNzLWJhciB7CiAgICAgIGhlaWdodDogMTAwJTsgYmFja2dyb3VuZDogdmFyKC0tcHVycGxlKTsgd2lkdGg6IDAlOwogICAgICB0cmFuc2l0aW9uOiB3aWR0aCAwLjNzOyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgY29sb3I6IHdoaXRlOyBmb250LXdlaWdodDogODAwOyBmb250LXNpemU6IDAuNzVyZW07CiAgICAgIGZvbnQtZmFtaWx5OiAnQW50b24nLCBzYW5zLXNlcmlmOyBsZXR0ZXItc3BhY2luZzogMXB4OwogICAgfQoKICAgIC8qIFRvbWJvbCBVcGxvYWQgKi8KICAgIC51cGxvYWQtYnRuIHsKICAgICAgd2lkdGg6IDEwMCU7IGJhY2tncm91bmQ6IHZhcigtLXB1cnBsZSk7IGNvbG9yOiB2YXIoLS13aGl0ZSk7CiAgICAgIGJvcmRlcjogNXB4IHNvbGlkIHZhcigtLWJsYWNrKTsgYm9yZGVyLXJhZGl1czogMjBweDsKICAgICAgcGFkZGluZzogMTZweDsgZm9udC1mYW1pbHk6ICdBbnRvbicsIHNhbnMtc2VyaWY7CiAgICAgIGZvbnQtc2l6ZTogMi40cmVtOyBsZXR0ZXItc3BhY2luZzogMnB4OyBjdXJzb3I6IHBvaW50ZXI7CiAgICAgIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7IGZvbnQtc3R5bGU6IGl0YWxpYzsKICAgICAgdGV4dC1zaGFkb3c6IDNweCAzcHggMCB2YXIoLS1ibGFjayk7CiAgICAgIGJveC1zaGFkb3c6IDVweCA1cHggMCByZ2JhKDAsMCwwLDAuMyk7CiAgICAgIHRyYW5zaXRpb246IDAuMTVzOyBtYXJnaW4tYm90dG9tOiAxOHB4OwogICAgICBsaW5lLWhlaWdodDogMTsKICAgIH0KICAgIC51cGxvYWQtYnRuOmFjdGl2ZSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDNweCwzcHgpOyBib3gtc2hhZG93OiAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjMpOyB9CiAgICAudXBsb2FkLWJ0bjpkaXNhYmxlZCB7IG9wYWNpdHk6IDAuNTsgY3Vyc29yOiBub3QtYWxsb3dlZDsgfQoKICAgIC8qIExpbmsgSGFzaWwgKi8KICAgIC5saW5rLWxhYmVsIHsKICAgICAgZm9udC1mYW1pbHk6ICdBbnRvbicsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMS42cmVtOwogICAgICBjb2xvcjogdmFyKC0tYmxhY2spOyBtYXJnaW4tYm90dG9tOiA4cHg7IHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7CiAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYzsKICAgIH0KICAgIC5saW5rLWJveCB7CiAgICAgIHdpZHRoOiAxMDAlOyBtaW4taGVpZ2h0OiAxMjBweDsgYmFja2dyb3VuZDogdmFyKC0td2hpdGUpOwogICAgICBib3JkZXI6IDVweCBzb2xpZCB2YXIoLS1ibGFjayk7IGJvcmRlci1yYWRpdXM6IDIwcHg7CiAgICAgIHBhZGRpbmc6IDE2cHg7IG1hcmdpbi1ib3R0b206IDE0cHg7CiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTsgd29yZC1icmVhazogYnJlYWstYWxsOwogICAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyBjb2xvcjogIzMzMzsKICAgICAgYm94LXNoYWRvdzogaW5zZXQgM3B4IDNweCAwIHJnYmEoMCwwLDAsMC4wNSk7CiAgICB9CiAgICAubGluay1ib3g6ZW1wdHk6OmJlZm9yZSB7CiAgICAgIGNvbnRlbnQ6ICJMaW5rIGFrYW4gbXVuY3VsIGRpIHNpbmkuLi4iOwogICAgICBjb2xvcjogI2JiYjsgZm9udC1mYW1pbHk6ICdQb3BwaW5zJywgc2Fucy1zZXJpZjsKICAgIH0KICAgIC5jb3B5LWJ0biB7CiAgICAgIHdpZHRoOiAxMDAlOyBiYWNrZ3JvdW5kOiB2YXIoLS1ibGFjayk7IGNvbG9yOiB2YXIoLS13aGl0ZSk7CiAgICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWJsYWNrKTsgYm9yZGVyLXJhZGl1czogMTRweDsKICAgICAgcGFkZGluZzogMTJweDsgZm9udC1mYW1pbHk6ICdBbnRvbicsIHNhbnMtc2VyaWY7IGZvbnQtc2l6ZTogMS4xcmVtOwogICAgICBsZXR0ZXItc3BhY2luZzogMXB4OyBjdXJzb3I6IHBvaW50ZXI7IGRpc3BsYXk6IG5vbmU7CiAgICAgIGJveC1zaGFkb3c6IDNweCAzcHggMCByZ2JhKDEzOSwwLDI1NSwwLjUpOwogICAgfQogICAgLmNvcHktYnRuOmFjdGl2ZSB7IHRyYW5zZm9ybTogdHJhbnNsYXRlKDJweCwycHgpOyBib3gtc2hhZG93OiAxcHggMXB4IDAgcmdiYSgxMzksMCwyNTUsMC41KTsgfQoKICAgIC5lcnJvci1ib3ggewogICAgICBiYWNrZ3JvdW5kOiAjZmVmMmYyOyBib3JkZXI6IDNweCBzb2xpZCAjZWY0NDQ0OyBib3JkZXItcmFkaXVzOiAxMnB4OwogICAgICBwYWRkaW5nOiAxMnB4OyBtYXJnaW4tdG9wOiAxMnB4OyBjb2xvcjogI2RjMjYyNjsKICAgICAgZm9udC1zaXplOiAwLjg1cmVtOyBkaXNwbGF5OiBub25lOwogICAgfQogICAgLmNhdGJveC1idG4gewogICAgICB3aWR0aDogMTAwJTsgYmFja2dyb3VuZDogI2ZiYmYyNDsgY29sb3I6IHZhcigtLWJsYWNrKTsKICAgICAgYm9yZGVyOiA0cHggc29saWQgdmFyKC0tYmxhY2spOyBib3JkZXItcmFkaXVzOiAxNHB4OwogICAgICBwYWRkaW5nOiAxMnB4OyBmb250LWZhbWlseTogJ0FudG9uJywgc2Fucy1zZXJpZjsgZm9udC1zaXplOiAxcmVtOwogICAgICBsZXR0ZXItc3BhY2luZzogMXB4OyBjdXJzb3I6IHBvaW50ZXI7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsKICAgICAgZGlzcGxheTogbm9uZTsgdGV4dC1hbGlnbjogY2VudGVyOyBtYXJnaW4tdG9wOiAxMHB4OwogICAgICBib3gtc2hhZG93OiAzcHggM3B4IDAgcmdiYSgwLDAsMCwwLjMpOwogICAgfQogICAgLnByZXZpZXctbWVkaWEgewogICAgICBtYXgtd2lkdGg6IDEwMCU7IGJvcmRlci1yYWRpdXM6IDEycHg7IG1hcmdpbi10b3A6IDEycHg7CiAgICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWJsYWNrKTsgZGlzcGxheTogbm9uZTsKICAgIH0KICA8L3N0eWxlPgo8L2hlYWQ+Cjxib2R5PgogIAoKICAgIDwhLS0gVG9tYm9sIEtlbWJhbGkgLS0+CgogICAgPCEtLSBIZWFkZXIgLS0+CiAgICA8ZGl2IGNsYXNzPSJ0eXBlLXJvdyI+CiAgICAgIDxkaXYgY2xhc3M9InR5cGUtYnRuIGFrdGlmIiBkYXRhLXRpcGU9ImltYWdlIiBvbmNsaWNrPSJwaWxpaFRpcGUoJ2ltYWdlJywgdGhpcykiPgogICAgICAgIDxpIGNsYXNzPSJmYXMgZmEtaW1hZ2UgdHlwZS1pY29uIj48L2k+CiAgICAgICAgPHNwYW4gY2xhc3M9InR5cGUtbGFiZWwiPkZPVE88L3NwYW4+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJ0eXBlLWJ0biIgZGF0YS10aXBlPSJ2aWRlbyIgb25jbGljaz0icGlsaWhUaXBlKCd2aWRlbycsIHRoaXMpIj4KICAgICAgICA8aSBjbGFzcz0iZmFzIGZhLXZpZGVvIHR5cGUtaWNvbiI+PC9pPgogICAgICAgIDxzcGFuIGNsYXNzPSJ0eXBlLWxhYmVsIj5WSURFTzwvc3Bhbj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InR5cGUtYnRuIiBkYXRhLXRpcGU9ImF1ZGlvIiBvbmNsaWNrPSJwaWxpaFRpcGUoJ2F1ZGlvJywgdGhpcykiPgogICAgICAgIDxpIGNsYXNzPSJmYXMgZmEtbXVzaWMgdHlwZS1pY29uIj48L2k+CiAgICAgICAgPHNwYW4gY2xhc3M9InR5cGUtbGFiZWwiPkFVRElPPC9zcGFuPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0idHlwZS1idG4iIGRhdGEtdGlwZT0iKiIgb25jbGljaz0icGlsaWhUaXBlKCcqJywgdGhpcykiPgogICAgICAgIDxpIGNsYXNzPSJmYXMgZmEtZmlsZSB0eXBlLWljb24iPjwvaT4KICAgICAgICA8c3BhbiBjbGFzcz0idHlwZS1sYWJlbCI+U0VNVUE8L3NwYW4+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPCEtLSBVcGxvYWQgWm9uZSAtLT4KICAgIDxkaXYgY2xhc3M9InVwbG9hZC16b25lIiBpZD0idXBsb2FkWm9uZSIgb25jbGljaz0icGlsaWhGaWxlKCkiPgogICAgICA8aSBjbGFzcz0iZmFzIGZhLWNsb3VkLXVwbG9hZC1hbHQgdXBsb2FkLWljb24iPjwvaT4KICAgICAgPGRpdiBjbGFzcz0idXBsb2FkLXRleHQiPktFVFVLIC8gU0VSRVQgRklMRTwvZGl2PgogICAgICA8aW5wdXQgdHlwZT0iZmlsZSIgaWQ9ImlucHV0RmlsZSIgb25jaGFuZ2U9InNhYXREaXBpbGloKHRoaXMpIiAvPgogICAgPC9kaXY+CgogICAgPCEtLSBJbmZvIEZpbGUgLS0+CiAgICA8ZGl2IGNsYXNzPSJmaWxlLWluZm8iIGlkPSJmaWxlSW5mbyI+PC9kaXY+CgogICAgPCEtLSBQcm9ncmVzcyAtLT4KICAgIDxkaXYgY2xhc3M9InByb2dyZXNzLXdyYXAiIGlkPSJwcm9ncmVzc1dyYXAiPgogICAgICA8ZGl2IGNsYXNzPSJwcm9ncmVzcy1iYXIiIGlkPSJwcm9ncmVzc0JhciI+MCU8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDwhLS0gVG9tYm9sIFVwbG9hZCAtLT4KICAgIDxidXR0b24gY2xhc3M9InVwbG9hZC1idG4iIGlkPSJidG5VcGxvYWQiIG9uY2xpY2s9Im11bGFpVXBsb2FkKCkiIGRpc2FibGVkPnVwbG9hZDwvYnV0dG9uPgoKICAgIDwhLS0gTGluayBIYXNpbCAtLT4KICAgIDxkaXYgY2xhc3M9ImxpbmstbGFiZWwiPmxpbms8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImxpbmstYm94IiBpZD0ibGlua0JveCI+PC9kaXY+CiAgICA8YnV0dG9uIGNsYXNzPSJjb3B5LWJ0biIgaWQ9ImNvcHlCdG4iIG9uY2xpY2s9InNhbGluTGluaygpIj7wn5OLIFNBTElOIExJTks8L2J1dHRvbj4KCiAgICA8aW1nIGlkPSJwcmV2aWV3SW1nIiBjbGFzcz0icHJldmlldy1tZWRpYSIgYWx0PSJwcmV2aWV3IiAvPgogICAgPHZpZGVvIGlkPSJwcmV2aWV3VmlkIiBjbGFzcz0icHJldmlldy1tZWRpYSIgY29udHJvbHMgc3R5bGU9IndpZHRoOjEwMCU7Ij48L3ZpZGVvPgogICAgPGF1ZGlvIGlkPSJwcmV2aWV3QXVkIiBjbGFzcz0icHJldmlldy1tZWRpYSIgY29udHJvbHMgc3R5bGU9IndpZHRoOjEwMCU7Ij48L2F1ZGlvPgoKICAgIDxkaXYgY2xhc3M9ImVycm9yLWJveCIgaWQ9ImVycm9yQm94Ij48L2Rpdj4KICAgIDxhIGhyZWY9Imh0dHBzOi8vY2F0Ym94Lm1vZS8iIHRhcmdldD0iX2JsYW5rIiBjbGFzcz0iY2F0Ym94LWJ0biIgaWQ9ImNhdGJveEJ0biI+CiAgICAgIPCfk6YgVVBMT0FEIFBFUk1BTkVOIOKAlCBCVUtBIENBVEJPWAogICAgPC9hPgoKICA8c2NyaXB0PgogICAgbGV0IGZpbGVEaXBpbGloID0gbnVsbDsKICAgIGxldCB0aXBlRGlwaWxpaCA9ICJpbWFnZSI7CgogICAgZnVuY3Rpb24gcGlsaWhUaXBlKHRpcGUsIGVsKSB7CiAgICAgIHRpcGVEaXBpbGloID0gdGlwZTsKICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cGUtYnRuJykuZm9yRWFjaCh0ID0+IHQuY2xhc3NMaXN0LnJlbW92ZSgnYWt0aWYnKSk7CiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FrdGlmJyk7CiAgICAgIHJlc2V0KCk7CiAgICB9CgogICAgZnVuY3Rpb24gcmVzZXQoKSB7CiAgICAgIGZpbGVEaXBpbGloID0gbnVsbDsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVJbmZvJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmtCb3gnKS50ZXh0Q29udGVudCA9ICcnOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29weUJ0bicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvckJveCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXRib3hCdG4nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZ3Jlc3NXcmFwJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXdJbWcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldmlld1ZpZCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3QXVkJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgICAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blVwbG9hZCcpOwogICAgICBidG4uZGlzYWJsZWQgPSB0cnVlOwogICAgfQoKICAgIGZ1bmN0aW9uIHBpbGloRmlsZSgpIHsKICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRGaWxlJyk7CiAgICAgIGlmICh0aXBlRGlwaWxpaCA9PT0gJyonKSBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2FjY2VwdCcpOwogICAgICBlbHNlIGlucHV0LmFjY2VwdCA9IHRpcGVEaXBpbGloICsgJy8qJzsKICAgICAgaW5wdXQuY2xpY2soKTsKICAgIH0KCiAgICAvLyBEcmFnICYgZHJvcAogICAgY29uc3Qgem9uZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1cGxvYWRab25lJyk7CiAgICB6b25lLmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgZSA9PiB7IGUucHJldmVudERlZmF1bHQoKTsgem9uZS5jbGFzc0xpc3QuYWRkKCdkcmFnJyk7IH0pOwogICAgem9uZS5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCAoKSA9PiB6b25lLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWcnKSk7CiAgICB6b25lLmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCBlID0+IHsKICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpOyB6b25lLmNsYXNzTGlzdC5yZW1vdmUoJ2RyYWcnKTsKICAgICAgaWYgKGUuZGF0YVRyYW5zZmVyLmZpbGVzLmxlbmd0aCkgcHJvc2VzRmlsZShlLmRhdGFUcmFuc2Zlci5maWxlc1swXSk7CiAgICB9KTsKCiAgICBmdW5jdGlvbiBzYWF0RGlwaWxpaChpbnB1dCkgewogICAgICBpZiAoaW5wdXQuZmlsZXMubGVuZ3RoKSBwcm9zZXNGaWxlKGlucHV0LmZpbGVzWzBdKTsKICAgIH0KCiAgICBmdW5jdGlvbiBwcm9zZXNGaWxlKGZpbGUpIHsKICAgICAgZmlsZURpcGlsaWggPSBmaWxlOwogICAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbGVJbmZvJyk7CiAgICAgIGluZm8uaW5uZXJIVE1MID0gJ/Cfk4QgPHN0cm9uZz4nICsgZmlsZS5uYW1lICsgJzwvc3Ryb25nPiDigKIg8J+TpiAnICsgZm9ybWF0VWt1cmFuKGZpbGUuc2l6ZSk7CiAgICAgIGluZm8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5VcGxvYWQnKS5kaXNhYmxlZCA9IGZhbHNlOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXJyb3JCb3gnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0Ym94QnRuJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgIH0KCiAgICBmdW5jdGlvbiBmb3JtYXRVa3VyYW4oYnl0ZXMpIHsKICAgICAgaWYgKGJ5dGVzIDwgMTAyNCkgcmV0dXJuIGJ5dGVzICsgJyBCJzsKICAgICAgaWYgKGJ5dGVzIDwgMTA0ODU3NikgcmV0dXJuIChieXRlcy8xMDI0KS50b0ZpeGVkKDEpICsgJyBLQic7CiAgICAgIHJldHVybiAoYnl0ZXMvMTA0ODU3NikudG9GaXhlZCgyKSArICcgTUInOwogICAgfQoKICAgIGZ1bmN0aW9uIG11bGFpVXBsb2FkKCkgewogICAgICBpZiAoIWZpbGVEaXBpbGloKSByZXR1cm47CiAgICAgIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5VcGxvYWQnKTsKICAgICAgY29uc3QgcHJvZ3Jlc3NXcmFwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2dyZXNzV3JhcCcpOwogICAgICBjb25zdCBwcm9ncmVzc0JhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmVzc0JhcicpOwogICAgICBjb25zdCBlcnJvckJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlcnJvckJveCcpOwoKICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTsKICAgICAgYnRuLnRleHRDb250ZW50ID0gJy4uLic7CiAgICAgIHByb2dyZXNzV3JhcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsKICAgICAgcHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSAnMCUnOwogICAgICBwcm9ncmVzc0Jhci50ZXh0Q29udGVudCA9ICcwJSc7CiAgICAgIGVycm9yQm94LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXRib3hCdG4nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwoKICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTsKICAgICAgZm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZURpcGlsaWgpOwoKICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7CiAgICAgIHhoci5vcGVuKCdQT1NUJywgJ2h0dHBzOi8vdG1wZmlsZXMub3JnL2FwaS92MS91cGxvYWQnLCB0cnVlKTsKCiAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGUgPT4gewogICAgICAgIGlmIChlLmxlbmd0aENvbXB1dGFibGUpIHsKICAgICAgICAgIGNvbnN0IHAgPSBNYXRoLnJvdW5kKChlLmxvYWRlZCAvIGUudG90YWwpICogMTAwKTsKICAgICAgICAgIHByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gcCArICclJzsKICAgICAgICAgIHByb2dyZXNzQmFyLnRleHRDb250ZW50ID0gcCArICclJzsKICAgICAgICB9CiAgICAgIH07CgogICAgICB4aHIub25sb2FkID0gKCkgPT4gewogICAgICAgIHByb2dyZXNzV3JhcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogICAgICAgIGJ0bi50ZXh0Q29udGVudCA9ICd1cGxvYWQnOwogICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlOwogICAgICAgIHRyeSB7CiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTsKICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEuZGF0YSAmJiBkYXRhLmRhdGEudXJsKSB7CiAgICAgICAgICAgIGxldCB1cmwgPSBkYXRhLmRhdGEudXJsLnJlcGxhY2UoJ3RtcGZpbGVzLm9yZy8nLCAndG1wZmlsZXMub3JnL2RsLycpOwogICAgICAgICAgICB0YW1waWxrYW5IYXNpbCh1cmwpOwogICAgICAgICAgfSBlbHNlIHsKICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdHYWdhbCB1cGxvYWQnKTsKICAgICAgICAgIH0KICAgICAgICB9IGNhdGNoIChlcnIpIHsKICAgICAgICAgIGVycm9yQm94LnRleHRDb250ZW50ID0gJ+KdjCAnICsgZXJyLm1lc3NhZ2UgKyAnIOKAlCBDb2JhIHRvbWJvbCBwZXJtYW5lbiBkaSBiYXdhaC4nOwogICAgICAgICAgZXJyb3JCb3guc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2F0Ym94QnRuJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CiAgICAgICAgfQogICAgICB9OwoKICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7CiAgICAgICAgcHJvZ3Jlc3NXcmFwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7CiAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ3VwbG9hZCc7CiAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7CiAgICAgICAgZXJyb3JCb3gudGV4dENvbnRlbnQgPSAn4p2MIEtvbmVrc2kgZ2FnYWwg4oCUIHBha2FpIHRvbWJvbCBwZXJtYW5lbiBkaSBiYXdhaC4nOwogICAgICAgIGVycm9yQm94LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOwogICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXRib3hCdG4nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsKICAgICAgfTsKCiAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTsKICAgIH0KCiAgICBmdW5jdGlvbiB0YW1waWxrYW5IYXNpbCh1cmwpIHsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmtCb3gnKS50ZXh0Q29udGVudCA9IHVybDsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvcHlCdG4nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsKICAgICAgY29uc3QgdGlwZSA9IGZpbGVEaXBpbGloLnR5cGU7CiAgICAgIGlmICh0aXBlLnN0YXJ0c1dpdGgoJ2ltYWdlLycpKSB7CiAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXZpZXdJbWcnKTsKICAgICAgICBpbWcuc3JjID0gdXJsOyBpbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CiAgICAgIH0gZWxzZSBpZiAodGlwZS5zdGFydHNXaXRoKCd2aWRlby8nKSkgewogICAgICAgIGNvbnN0IHZpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aWV3VmlkJyk7CiAgICAgICAgdmlkLnNyYyA9IHVybDsgdmlkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOwogICAgICB9IGVsc2UgaWYgKHRpcGUuc3RhcnRzV2l0aCgnYXVkaW8vJykpIHsKICAgICAgICBjb25zdCBhdWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldmlld0F1ZCcpOwogICAgICAgIGF1ZC5zcmMgPSB1cmw7IGF1ZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJzsKICAgICAgfQogICAgfQoKICAgIGZ1bmN0aW9uIHNhbGluTGluaygpIHsKICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xpbmtCb3gnKS50ZXh0Q29udGVudDsKICAgICAgaWYgKCF1cmwpIHJldHVybjsKICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodXJsKS50aGVuKCgpID0+IHsKICAgICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29weUJ0bicpOwogICAgICAgIGNvbnN0IGxhbWEgPSBidG4udGV4dENvbnRlbnQ7CiAgICAgICAgYnRuLnRleHRDb250ZW50ID0gJ+KchSBURVJTQUxJTiEnOwogICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYnRuLnRleHRDb250ZW50ID0gbGFtYSwgMjAwMCk7CiAgICAgIH0pOwogICAgfQogIDwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD4K";
const tools = [
{name:"TikTok Downloader",desc:"Masukkan link TikTok dan unduh hasilnya.",icon:"♪",tag:"MEDIA",cat:"download",action:"tiktok"},
{name:"Instagram",desc:"Masukkan link Instagram untuk diproses.",icon:"◎",tag:"MEDIA",cat:"download",action:"instagram"},
{name:"Fake FF",desc:"Buat gambar profil Fake FF dari nama.",icon:"◈",tag:"IMAGE",cat:"maker",action:"fakeff"},
{name:"BRAT Generator",desc:"Buat gambar teks bergaya comic.",icon:"✦",tag:"IMAGE",cat:"maker",action:"brat"},
{name:"IQC Generator",desc:"Buat gambar chat sederhana.",icon:"▣",tag:"IMAGE",cat:"maker",action:"iqc"},
{name:"Image To QR",desc:"Ubah gambar menjadi QR code.",icon:"▦",tag:"QR",cat:"maker",action:"img2qr"},
{name:"Quotes Maker",desc:"Buat gambar quotes dari teks dan nama penulis.",icon:"❝",tag:"IMAGE",cat:"maker",action:"quotes"},
{name:"iPhone Group Chat Generator",desc:"iPhone Group Chat Generator",icon:"▣",tag:"IMAGE",cat:"maker",action:"igc"},
{name:"Image To URL",desc:"Upload gambar dan dapatkan direct URL.",icon:"↗",tag:"URL",cat:"utility",action:"imgurl"},{name:"Media to URL",desc:"Upload foto/video/audio/file & dapat direct URL.",icon:"📦",tag:"URL",cat:"utility",action:"mediatourl"},
{name:"Remove BG",desc:"Hapus background gambar dari URL.",icon:"✂",tag:"IMAGE",cat:"utility",action:"removebg"},
{name:"AI",desc:"Chat dengan pilihan AI GPTBot atau AI Ustadz.",icon:"✦",tag:"AI",cat:"utility",action:"ai"},
{name:"Fake Dana",desc:"Buat gambar saldo Fake Dana dari nominal.",icon:"▱",tag:"IMAGE",cat:"maker",action:"dana"},
{name:"NIK Check",desc:"Cek data NIK melalui API QSR.",icon:"🪪",tag:"NIK CHECK",cat:"utility",action:"nik"},
{name:"CNN Indonesia",desc:"Berita terbaru CNN Indonesia.",icon:"📰",tag:"NEWS",cat:"utility",action:"cnn"},
{name:"DuckDuckGo Search",desc:"Cari web menggunakan DuckDuckGo.",icon:"🦆",tag:"SEARCH",cat:"utility",action:"duckduckgo"},
{name:"Kisah Nabi",desc:"Baca kisah para nabi dengan tampilan nyaman.",icon:"🕌",tag:"ISLAMIC",cat:"utility",action:"kisahnabi"},
{name:"Info Gempa",desc:"Info gempa terbaru dari BMKG.",icon:"🌋",tag:"BMKG",cat:"utility",action:"gempa"},
{name:"Jadwal TV",desc:"Cek jadwal acara TV berdasarkan nama stasiun.",icon:"▣",tag:"TV",cat:"utility",action:"jadwaltv"},
{name:"Temp Mail",desc:"Buat email sementara dan terima pesan secara realtime.",icon:"✉️",tag:"UTILITY",cat:"utility",action:"tempmail"},
{name:"Cuaca",desc:"Cek kondisi cuaca berdasarkan nama kota.",icon:"☀️",tag:"WEATHER",cat:"utility",action:"cuaca"},
{name:"IP Checker",desc:"Cek informasi lokasi dan jaringan dari alamat IP.",icon:"🌐",tag:"IP CHECK",cat:"utility",action:"ipchecker"},
{name:"Al-Qur'an",desc:"Baca Al-Qur'an lengkap dengan Arab, latin, dan terjemahan Indonesia.",icon:"﷽",tag:"AL-QUR'AN",cat:"utility",action:"quran"},
{name:"Badak WhatsApp",desc:"Panel Badak WhatsApp dengan 4 pilihan metode.",icon:"◉",tag:"WHATSAPP",cat:"utility",action:"badakwa"},
{name:"Password Generator",desc:"Buat password acak yang kuat dan aman.",icon:"🔐",tag:"SECURITY",cat:"utility",action:"password"},
{name:"Cek Arti Nama",desc:"Masukkan nama untuk melihat arti dan makna namanya.",icon:"✦",tag:"FUN",cat:"utility",action:"artinama"},
];
let filter="all";
const toolState={};
const $=id=>document.getElementById(id);

// =========================
// HERO LIVE STATUS
// =========================
function updateHeroClock(){
  const el=$("heroClock");
  if(!el)return;
  const now=new Date();
  el.textContent=now.toLocaleTimeString("id-ID",{hour12:false});
}

function updateHeroBattery(){
  const value=$("heroBattery");
  const icon=$("batteryIcon");
  if(!value)return;
  if(!navigator.getBattery){
    value.textContent="N/A";
    if(icon)icon.textContent="?";
    return;
  }
  navigator.getBattery().then(b=>{
    const paint=()=>{
      const pct=Math.round(b.level*100);
      value.textContent=`${pct}%${b.charging?" ⚡":""}`;
      if(icon){
        icon.textContent=b.charging?"⚡":(pct<=20?"▮":"▰");
      }
      const box=value.closest(".statusItem");
      box?.classList.toggle("low",pct<=20);
    };
    paint();
    b.addEventListener("levelchange",paint);
    b.addEventListener("chargingchange",paint);
  }).catch(()=>{value.textContent="N/A";});
}

async function updateHeroServer(){
  const value=$("heroServer"), led=$("serverLed");
  if(!value)return;
  value.textContent="CHECKING"; led?.classList.remove("on","off");
  const started=performance.now();
  try{
    await fetch("https://ntphwaiqleggrlqkshiw.supabase.co",{method:"GET",mode:"no-cors",cache:"no-store",credentials:"omit"});
    value.textContent="SERVER ON"; led?.classList.add("on"); const log=$("heroLog"); if(log) log.textContent="server reachable • connection ready";
  }catch(e){
    value.textContent="SERVER OFF"; led?.classList.add("off"); const log=$("heroLog"); if(log) log.textContent="server unreachable • check network";
  }
}

let heroIPValue="";
// IP selalu tersembunyi saat halaman pertama dibuka. Tekan tombol mata untuk melihatnya.
let heroIPHidden=true;
function renderHeroIP(){
  const value=$("heroIP"), btn=$("ipEyeBtn");
  if(!value)return;
  value.textContent=heroIPHidden ? "••• ••• ••• •••" : (heroIPValue || "DETECTING...");
  if(btn){btn.classList.toggle("is-hidden",heroIPHidden);btn.textContent=heroIPHidden ? "◉" : "◉";btn.setAttribute("aria-pressed",String(heroIPHidden));btn.setAttribute("aria-label",heroIPHidden ? "Tampilkan IP" : "Sembunyikan IP");btn.title=heroIPHidden ? "Tekan untuk melihat IP" : "Tekan untuk menyembunyikan IP";}
}
function initHeroIPToggle(){
  const btn=$("ipEyeBtn");
  if(!btn)return;
  btn.addEventListener("click",()=>{heroIPHidden=!heroIPHidden;renderHeroIP();});
}
initHeroIPToggle();

async function updateHeroIP(){
  const value=$("heroIP");
  if(!value)return;
  heroIPValue="";
  renderHeroIP();
  try{
    const r=await fetch("https://api.ipify.org?format=json&_="+Date.now(),{cache:"no-store"});
    const d=await r.json();
    heroIPValue=d.ip||"HIDDEN";
    renderHeroIP();
  }catch(e){ heroIPValue="HIDDEN / BLOCKED"; renderHeroIP(); }
}

function initHeroStatus(){
  updateHeroClock();
  updateHeroBattery();
  updateHeroServer();
  updateHeroIP();
  setInterval(updateHeroClock,1000);
  setInterval(updateHeroServer,30000);
  setInterval(updateHeroIP,60000);
}
function toggleNav(){ const n=$("nav"); n.classList.toggle("mobileOpen"); }
function setFilter(value,el){filter=value;document.querySelectorAll(".filter").forEach(b=>b.classList.remove("active"));el.classList.add("active");render();}
function render(){
 const q=$("search").value.toLowerCase().trim();
 const list=tools.filter(t=>!t.hidden&&(filter==="all"||t.cat===filter)&&(`${t.name} ${t.desc}`.toLowerCase().includes(q)));
 $("count").textContent=`${list.length} tool`;
 $("empty").style.display=list.length?"none":"block";
 $("grid").innerHTML=list.map(t=>`<a class="card toolCard" href="#tool=${encodeURIComponent(t.action)}" onclick="openDedicatedTool(decodeURIComponent(\'${encodeURIComponent(t.action)}\'));return false;" aria-label="Buka ${escapeHtml(t.name)}"><div class="icon">${t.icon}</div><h3>${t.name}</h3><p>${t.desc}</p><span class="tag">${t.tag}</span><span class="go">→</span></a>`).join("");
}
function getToolRoot(){return $("toolPageBody") || $("modalBody");}
function saveToolState(){
 const action=currentAction();
 if(!action)return;
 const root=getToolRoot();
 if(!root)return;
 const state={};
 root.querySelectorAll("input, textarea, select").forEach(el=>{
   if(el.type==="file")return;
   state[el.id||el.name||el.tagName+Math.random()] = el.value;
 });
 toolState[action]=state;
}
function restoreToolState(action){
 const state=toolState[action];
 if(!state)return;
 Object.entries(state).forEach(([id,value])=>{const el=$(id);if(el&&el.type!=="file")el.value=value;});
}
function openTool(i){
 const t=tools[i];
 if(!t)return;
 openDedicatedTool(t.action);
}
function closeTool(){saveToolState();$("toolModal").classList.remove("show");$("toolModal").setAttribute("aria-hidden","true");}
function field(label,id,placeholder=""){return `<label>${label}<input id="${id}" placeholder="${placeholder}"></label>`}
function toolUI(a){
 const common=`<div class="toolActions"><button class="actionBtn" onclick="runTool()">JALANKAN</button><button class="actionBtn secondary" onclick="clearTool()">RESET</button></div><div id="toolResult" class="toolResult"></div>`;
 if(a==="amgenerator")return `<div class="amComicWrap">${comicQuotaBadge("amgenerator")}<div class="amComicHead"><span class="csBurst">⚡ AM GENERATOR</span><h2>ALIGHT MOTION PREMIUM</h2><p>Ikuti tahap satu per satu. Setelah Step 1 berhasil, otomatis lanjut ke Step 2.</p><div class="amProgress"><span id="amProg1" class="amProgNum active">1</span><span class="amLine"></span><span id="amProg2" class="amProgNum">2</span></div></div><div id="amStep1" class="amComicStep"><div class="amNum">1</div><div class="amStepBody"><b>REQUEST ACTIVATION</b><label>Email<input id="amEmail" class="amInput" type="email" autocomplete="email" placeholder="name@example.com"></label><button class="amBtn" id="amRequestBtn" onclick="runAMRequest()">REQUEST ACTIVATION</button><div class="amMsg" id="amRequestMsg"></div></div></div><div id="amStep2" class="amComicStep" hidden><div class="amNum">2</div><div class="amStepBody"><b>VERIFIKASI LINK</b><label>Link dari email<input id="amVerify" class="amInput" type="url" placeholder="https://alightcreative.com/verify?..." autocomplete="off"></label><button class="amBtn secondary" id="amVerifyBtn" onclick="runAMVerify()">VERIFIKASI SEKARANG</button><button class="amBtn back" type="button" onclick="amShowStep(1)">← KEMBALI KE STEP 1</button><div class="amMsg" id="amVerifyMsg"></div></div></div><div class="amNote">💡 Gunakan <b>email yang sama</b> pada kedua tahap.</div></div>`;
 if(a==="nik")return `<div class="nikIntro">${comicQuotaBadge("nik")}<div class="nikBadge">🪪 NIK CHECK</div><p>Masukkan <b>16 digit NIK</b>, lalu tekan JALANKAN untuk mengambil hasil dari API.</p></div><label class="nikField">NIK<input id="toolInput" type="text" inputmode="numeric" autocomplete="off" maxlength="16" pattern="[0-9]{16}" placeholder="Contoh: 3201010101010001" oninput="this.value=this.value.replace(/\D/g,'').slice(0,16)"></label>${common}`;
 if(a==="tiktok")return field("Link TikTok","toolInput","https://www.tiktok.com/@user/video/...")+common;
 if(a==="instagram")return field("Link Instagram","toolInput","https://www.instagram.com/p/...")+common;
 if(a==="fakeff")return field("Nama","toolInput","Nama pemain")+common;
 if(a==="link")return field("Masukkan URL","toolInput","https://...")+common;
 if(a==="igc")return `<label>Link profil grup<input id="igcProfile" type="url" maxlength="500" placeholder="https://cloud.yardansh.com/PZsJGH.jpg"></label><label>Nama grup<input id="igcName" maxlength="60" placeholder="Nama grup"></label><label>Peserta<input id="igcParticipants" type="number" min="1" max="100" value="10" placeholder="10"></label>${common}`;
 if(a==="ai")return `<div class="aiTool"><div class="aiIntro"><div class="aiBadge">✦</div><div><div class="aiKicker">AI ASSISTANT</div><div class="aiSub">Pilih asisten dan kirim pertanyaanmu.</div></div></div><label class="fieldLabel">Asisten<select id="aiChoice" class="aiSelect"><option value="gpt4o">GPTBot</option><option value="ustadz">Ustadz</option></select></label><label class="fieldLabel">Pertanyaan / Pesan<textarea id="toolInput" rows="5" maxlength="4000" placeholder="Tulis pertanyaan atau pesan..."></textarea></label>${common}</div>`;
 if(a==="removebg")return field("URL Gambar","toolInput","https://contoh.com/gambar.jpg")+common;
 if(a==="quotes")return `<label>Text<input id="toolInput" maxlength="500" placeholder="Masukkan text quotes..."></label><label>Nama penulis<input id="quoteAuthor" maxlength="80" placeholder="Nama penulis"></label>${common}`;
 if(a==="brat")return `<label>Teks<input id="toolInput" maxlength="80" placeholder="brat style text"></label>${common}`;
 if(a==="img2qr")return `<label>Pilih gambar<input id="fileInput" type="file" accept="image/*"></label>${common}`;
 if(a==="iqc")return field("Pesan","toolInput","Masukkan pesan...")+common;
 if(a==="mediatourl")return '<div class="mediaUrlWrap" style="padding:4px 2px;"><iframe id="mediaUrlFrame" style="width:100%;height:80vh;border:0;background:#fffdf8;"></iframe></div>';  if(a==="imgurl")return `<p class="hint">Upload gambar langsung melalui Catbox untuk mendapatkan direct URL.</p><a class="downloadBtn" href="https://catbox.moe/" target="_blank" rel="noopener">⬆ UPLOAD SEKARANG KE CATBOX</a>`;
 if(a==="ktp")return `<p class="hint">Generator ini hanya template visual/demo, bukan dokumen identitas resmi.</p>${field("Nama","toolInput","NAMA DEMO")}${field("NIK demo","subInput","0000000000000000")}${common}`;
 if(a==="certificate")return field("Nama penerima","toolInput","Nama Lengkap")+field("Judul","subInput","SERTIFIKAT PENGHARGAAN")+common;
 if(a==="quran")return `<div class="quranWrap"><div class="quranHead"><div class="quranBismillah">﷽</div><h2>AL-QUR'AN</h2><p>Al-Qur'an digital dengan teks Arab, transliterasi, dan terjemahan Indonesia.</p></div><label class="quranSearchLabel">CARI SURAH<input id="quranSearch" class="quranSearch" placeholder="Contoh: Al-Fatihah" autocomplete="off" oninput="filterQuranSurah(this.value)"></label><div id="quranList" class="quranList"><div class="quranLoading">Memuat daftar surah…</div></div><div id="quranReader" class="quranReader" hidden><button class="quranBack" type="button" onclick="closeQuranReader()">← KEMBALI KE DAFTAR SURAH</button><div id="quranReaderHead" class="quranReaderHead"></div><div id="quranContent" class="quranContent"></div></div></div>`;
 if(a==="duckduckgo")return `<div class="ddgComicWrap"><div class="ddgComicHead"><span class="ddgBurst">🦆 DUCKDUCKGO</span><h2>WEB SEARCH!</h2><p>Cari apa saja di web dengan tampilan comic.</p></div><div class="ddgSearchRow"><input id="ddgInput" class="ddgInput" placeholder="Contoh: berita teknologi terbaru" autocomplete="off" onkeydown="if(event.key==='Enter'){event.preventDefault();runDuckDuckGo()}"><button id="ddgSearchBtn" class="ddgSearchBtn" type="button" onclick="runDuckDuckGo()">🔎 CARI!</button></div><div class="ddgQuick"><button type="button" onclick="setDuckQuery('Google')">Google</button><button type="button" onclick="setDuckQuery('YouTube')">YouTube</button><button type="button" onclick="setDuckQuery('Teknologi terbaru')">Teknologi</button></div><div id="ddgResult" class="ddgResult"><div class="ddgEmpty"><b>READY!</b><span>Ketik pencarian lalu tekan CARI!</span></div></div></div>`;
 if(a==="cnn")return `<div class="scToolIntro"><span>📰</span><div><b>CNN INDONESIA</b><small>Berita terbaru dari API sumber.</small></div></div><div id="cnnComicList" class="newsComicList"><div class="loading">Memuat berita...</div></div><button class="actionBtn secondary" type="button" onclick="loadCNNComic()">↻ MUAT ULANG</button>`;
 if(a==="kisahnabi")return `<div class="scToolIntro"><span>🕌</span><div><b>KISAH NABI</b><small>Masukkan nama nabi untuk membaca kisahnya.</small></div></div><div class="nabiChipsComic"><button type="button" onclick="setNabiComic('Adam')">Adam</button><button type="button" onclick="setNabiComic('Nuh')">Nuh</button><button type="button" onclick="setNabiComic('Ibrahim')">Ibrahim</button><button type="button" onclick="setNabiComic('Musa')">Musa</button><button type="button" onclick="setNabiComic('Muhammad')">Muhammad</button></div><label>Nama Nabi<input id="nabiComicInput" placeholder="Contoh: Muhammad" autocomplete="off"></label><button class="actionBtn" type="button" onclick="loadKisahNabiComic()">📖 LIHAT KISAH</button><div id="nabiComicResult" class="toolResult"></div>`;
 if(a==="gempa")return `<div class="scToolIntro"><span>🌋</span><div><b>INFO GEMPA</b><small>Informasi gempa terbaru dari BMKG.</small></div></div><div id="gempaComicContent" class="gempaComicContent"><div class="loading">Mengambil data BMKG...</div></div><button class="actionBtn secondary" type="button" onclick="loadGempaComic()">↻ MUAT ULANG</button>`;
 if(a==="jadwaltv")return `<div class="tvComicWrap"><div class="tvComicHead"><span class="csBurst">▣ JADWAL TV</span><h2>CEK JADWAL ACARA TV</h2><p>Masukkan nama stasiun TV untuk melihat jadwal acara.</p></div><label>NAMA TV<input id="tvInput" class="tvComicInput" autocomplete="off" placeholder="Contoh: RCTI" type="text"></label><div class="tvChipsComic"><button type="button" onclick="setTVComic('RCTI')">RCTI</button><button type="button" onclick="setTVComic('SCTV')">SCTV</button><button type="button" onclick="setTVComic('Indosiar')">Indosiar</button><button type="button" onclick="setTVComic('ANTV')">ANTV</button><button type="button" onclick="setTVComic('Trans TV')">Trans TV</button></div><button class="actionBtn" id="tvCheckBtn" type="button" onclick="loadJadwalTVComic()">📺 LIHAT JADWAL</button><div id="tvResult" class="tvComicResult"></div></div>`;
 if(a==="cuaca")return `<div class="weatherComicWrap"><div class="weatherComicHead"><span class="csBurst">☀️ CUACA</span><h2>CEK CUACA KOTA</h2><p>Masukkan nama kota untuk melihat kondisi cuaca terkini.</p></div><label class="weatherLabel">NAMA KOTA<input id="weatherInput" class="weatherInput" autocomplete="off" placeholder="Contoh: Sragen, Jakarta, Surabaya" type="text"></label><div class="weatherExamples"><button type="button" onclick="setWeatherCity('Jakarta')">Jakarta</button><button type="button" onclick="setWeatherCity('Sragen')">Sragen</button><button type="button" onclick="setWeatherCity('Surabaya')">Surabaya</button></div><button class="actionBtn weatherBtn" id="weatherCheckBtn" type="button" onclick="loadWeatherComic()">☀️ CEK CUACA</button><div id="weatherResult" class="weatherResult"></div></div>`;
 if(a==="ipchecker")return `<div class="ipComicWrap">${comicQuotaBadge("ipchecker")}<div class="ipComicHead"><span class="csBurst">🌐 IP CHECKER</span><h2>CEK ALAMAT IP</h2><p>Masukkan alamat IP untuk melihat lokasi dan informasi jaringan. Kosongkan untuk mengecek IP publik kamu.</p></div><label class="ipLabel">ALAMAT IP<input id="ipInput" class="ipInput" autocomplete="off" inputmode="decimal" placeholder="Contoh: 8.8.8.8" type="text"></label><div class="ipExamples"><button type="button" onclick="setIPCity('8.8.8.8')">8.8.8.8</button><button type="button" onclick="setIPCity('1.1.1.1')">1.1.1.1</button></div><button class="actionBtn ipBtn" id="ipCheckBtn" type="button" onclick="loadIPCheckerComic()">🌐 CEK IP</button><div id="ipResult" class="ipResult"></div><div class="ipFoot">Data geolokasi berbasis IP bersifat perkiraan, bukan lokasi GPS.</div></div>`;
 if(a==="tempmail")return `<div class="tempComicWrap">${comicQuotaBadge("tempmail")}<div class="tempComicHead"><span class="csBurst">✉ TEMP MAIL</span><h2>TEMPORARY INBOX</h2><p>Email sementara cepat untuk menerima pesan. Gratis dan tanpa API key.</p></div><div class="tempEmailBox"><div class="tempEmailLabel">ALAMAT EMAIL</div><div class="tempEmailRow"><span id="tempEmailAddress">Belum ada email</span><button class="tempComicBtn secondary" disabled id="tempCopyBtn" onclick="copyTempEmail()" type="button">COPY</button></div></div><div class="tempComicActions"><button class="tempComicBtn" id="tempCreateBtn" onclick="createTempEmail()" type="button">＋ CREATE EMAIL</button><button class="tempComicBtn secondary" id="tempInboxBtn" onclick="checkTempInbox()" type="button">↻ REFRESH INBOX</button></div><div class="tempComicStatus" id="tempMailStatus"></div><div class="tempInboxHead"><b>INBOX</b><span id="tempInboxCount">0 pesan</span></div><div class="tempInboxList" id="tempInboxList"><div class="tempEmpty"><div>⌁</div><b>Belum ada email</b><small>Create Email untuk membuat alamat sementara.</small></div></div><div class="tempAttrib">Temporary email service by <a href="https://mail.tm/" target="_blank" rel="noopener">Mail.tm</a></div></div><div id="tempMailModal" class="tempComicModal" onclick="if(event.target===this)closeTempMessage()"><div class="tempModalCard"><div class="tempModalTop"><h3 id="tempModalSubject">Pesan</h3><button class="tempModalClose" onclick="closeTempMessage()" type="button">×</button></div><div class="tempModalFrom" id="tempModalFrom"></div><div class="tempLinkBox" hidden id="tempModalLinkBox"><div><b>🔗 LINK TERDETEKSI</b><small id="tempModalLinkText">Link verifikasi ditemukan di email.</small></div><button class="tempComicBtn" id="tempCopyLinkBtn" onclick="copyTempMessageLink()" type="button">COPY LINK</button></div><div class="tempLinkBox" hidden id="tempModalCodeBox"><div><b>🔢 KODE TERDETEKSI</b><small id="tempModalCodeText">Kode verifikasi ditemukan di email.</small></div><div class="tempCodesList" id="tempModalCodes"></div></div><div class="tempModalBody" id="tempModalBody"></div></div></div>`;
 if(a==="artinama")return `<div class="artinamaWrap"><div class="artinamaHead"><h2>CEK ARTI NAMA</h2><p>Masukkan nama untuk melihat arti dan maknanya.</p></div><div class="artinamaForm"><input id="artinamaInput" class="artinamaInput" autocomplete="off" maxlength="80" placeholder="Masukkan nama..." onkeydown="if(event.key==='Enter')runArtiNama()"><button class="artinamaBtn" id="artinamaBtn" type="button" onclick="runArtiNama()">CEK</button></div><div id="artinamaResult" class="artinamaResult"></div></div>`;
 if(a==="password")return `<div class="pwComicWrap"><div class="pwComicHead"><span class="csBurst">🔐 LAXX SECURITY TOOL</span><h2>PASSWORD GENERATOR</h2><p>Generate password kuat langsung di perangkat. Tidak dikirim ke server.</p></div><div class="pwOutputBox"><input id="pwOutput" class="pwOutput" type="text" readonly placeholder="GENERATE YOUR PASSWORD"><button class="pwCopyBtn" type="button" onclick="copyGeneratedPassword()">COPY</button></div><div class="pwStrengthWrap"><div class="pwStrengthTop"><span>SECURITY LEVEL</span><b id="pwStrengthText">READY</b></div><div class="pwStrength"><span id="pwStrengthBar"></span></div><div class="pwStrengthRow"><span>RANDOM ENTROPY</span><b id="pwLengthText">0 KARAKTER</b></div></div><div class="pwControls"><div class="pwRangeCard"><label class="pwRangeLabel">PASSWORD LENGTH <b id="pwLengthValue">16</b><input id="pwLength" type="range" min="8" max="64" value="16" oninput="updatePwLength(this.value)"></label></div><div class="pwOptionCard"><div class="pwOptionTitle">CHARACTER SET</div><div class="pwOptions"><label><input id="pwUpper" type="checkbox" checked> UPPERCASE A-Z</label><label><input id="pwLower" type="checkbox" checked> LOWERCASE a-z</label><label><input id="pwNumbers" type="checkbox" checked> NUMBERS 0-9</label><label><input id="pwSymbols" type="checkbox" checked> SYMBOLS !@#$</label></div></div></div><button class="actionBtn pwGenerateBtn" type="button" onclick="generatePasswordComic()">⚡ GENERATE NEW PASSWORD</button><div id="pwResult" class="pwResult"></div></div>`;

 if(a==="badakwa")return `<div class="badakComicPage"><div class="badakStickerRow"><span class="badakSticker red">WHATSAPP!</span><span class="badakSticker comic">COMIC TOOL</span></div><div class="badakComicIntro"><div class="badakBoom">WA</div><div><h2>BADAK WHATSAPP</h2><p>Pilih target dan salah satu metode Badak.</p></div></div><div class="badakReady"><span class="badakReadyDot"></span><div><b>BADAK SYSTEM READY</b><small>4 METODE TERSEDIA</small></div><strong>4X</strong></div><label class="badakComicLabel">TARGET NUMBER<input id="badakTarget" class="badakComicInput" inputmode="tel" autocomplete="off" placeholder="628xxxxxxxxxx"></label><div class="badakComicLabel">SELECT METHOD<div class="badakMethodGrid"><button type="button" class="badakMethodCard yellow" onclick="selectBadakMethod('Badak 50 Chat','50',this)"><b>50</b><span>BADAK CHAT</span></button><button type="button" class="badakMethodCard comic" onclick="selectBadakMethod('Badak 100 Chat','100',this)"><b>100</b><span>BADAK CHAT</span></button><button type="button" class="badakMethodCard red" onclick="selectBadakMethod('Badak 200 Chat','200',this)"><b>200</b><span>BADAK CHAT</span></button><button type="button" class="badakMethodCard white" onclick="selectBadakMethod('Badak 489 Chat','489',this)"><b>489</b><span>BADAK CHAT</span></button></div></div><div class="badakSelectedComic" id="badakSelectedComic">SELECTED: <b id="badakSelected">BELUM ADA</b></div><input id="badakMethod" type="hidden"><button class="badakRunComic" type="button" onclick="runBadakLocal()"><span>⚡</span> JALANKAN BADAK</button><div id="badakResult" class="badakResult"></div></div>`;
 if(a==="dana")return `<label>Nominal<input id="toolInput" inputmode="numeric" maxlength="12" placeholder="100000"></label>${common}`;
}
function selectBadakMethod(name,val,el){
 const hidden=$("badakMethod"), label=$("badakSelected");
 if(hidden) hidden.value=val;
 if(label) label.textContent=name.toUpperCase();
 document.querySelectorAll('.badakMethodCard').forEach(b=>b.classList.remove('selected'));
 if(el) el.classList.add('selected');
}
function runBadakLocal(){
 const target=String($("badakTarget")?.value||"").trim();
 const method=String($("badakMethod")?.value||"").trim();
 const methodText=$("badakSelected")?.textContent||"";
 const out=$("badakResult"); if(!out)return;
 if(!/^62\d{8,15}$/.test(target)){out.innerHTML='<div class="badakErrorComic"><b>HEY!</b> Masukkan nomor dengan format 62xxxxxxxxxx.</div>';return;}
 if(!method){out.innerHTML='<div class="badakErrorComic"><b>WAIT!</b> Pilih salah satu metode Badak dulu.</div>';return;}
 const safeTarget=escapeHtml(target), safeMethod=escapeHtml(methodText);
 out.innerHTML='<div class="badakProcessComic"><div class="badakProcessHead"><b>BADAK CONSOLE // RUNNING</b><strong id="badakPercent">0%</strong></div><div class="badakConsole"><div class="badakConsoleHead"><i></i><span>comic-badak / terminal</span></div><div id="badakConsoleLines"></div><span class="badakCursor"></span></div><div class="badakComicBar"><span id="badakBarFill"></span></div><small>target: '+safeTarget+' · method: '+safeMethod+'</small></div>';
 const lines=$("badakConsoleLines"), bar=$("badakBarFill"), txt=$("badakPercent");
 const steps=[
   ['00','<span class="gray">[BOOT]</span>','initializing comic badak core...'],
   ['12','<span class="cyan">[AUTH]</span>','access profile verified'],
   ['27','<span class="gray">[TARGET]</span>','target loaded: '+safeTarget],
   ['43','<span class="yellow">[METHOD]</span>','selected: '+safeMethod],
   ['61','<span class="cyan">[QUEUE]</span>','building request sequence...'],
   ['78','<span class="gray">[ENGINE]</span>','processing method '+escapeHtml(method)+'...'],
   ['92','<span class="yellow">[CHECK]</span>','finalizing process state...'],
   ['100','<span class="cyan">[DONE]</span>','process finished']
 ];
 let i=0;
 const timer=setInterval(()=>{
   const [pct,tag,msg]=steps[i];
   if(lines){const row=document.createElement('div');row.className='badakConsoleLine';row.innerHTML=tag+' '+msg;lines.appendChild(row);lines.scrollTop=lines.scrollHeight;}
   if(bar)bar.style.width=pct+'%'; if(txt)txt.textContent=pct+'%';
   i++;
   if(i>=steps.length){clearInterval(timer);setTimeout(()=>{out.innerHTML='<div class="badakDoneComic"><span>✓</span><div><b>PROCESS COMPLETE</b><small>'+safeMethod+' diproses untuk target '+safeTarget+'.</small></div></div>';},450);}
 },420);
}

function updatePwLength(v){const n=Number(v)||16;const e=$("pwLengthValue");if(e)e.textContent=n;}
function secureRandomInt(max){if(window.crypto?.getRandomValues){const a=new Uint32Array(1);window.crypto.getRandomValues(a);return a[0]%max;}return Math.floor(Math.random()*max);}
function generatePasswordComic(){
 const out=$("pwOutput"),result=$("pwResult");
 const upper="ABCDEFGHJKLMNPQRSTUVWXYZ",lower="abcdefghijkmnopqrstuvwxyz",nums="23456789",symbols="!@#$%^&*_-+=?";
 const sets=[];
 if($("pwUpper")?.checked)sets.push(upper);
 if($("pwLower")?.checked)sets.push(lower);
 if($("pwNumbers")?.checked)sets.push(nums);
 if($("pwSymbols")?.checked)sets.push(symbols);
 if(!sets.length){if(result)result.innerHTML='<div class="errorMsg">Pilih minimal satu jenis karakter.</div>';return;}
 const len=Math.max(8,Math.min(64,Number($("pwLength")?.value)||16));
 let chars=sets.map(set=>set[secureRandomInt(set.length)]);
 const all=sets.join("");
 while(chars.length<len)chars.push(all[secureRandomInt(all.length)]);
 for(let i=chars.length-1;i>0;i--){const j=secureRandomInt(i+1);[chars[i],chars[j]]=[chars[j],chars[i]];}
 const password=chars.join("");
 if(out)out.value=password;
 const score=sets.length+(len>=20?2:len>=14?1:0);
 const level=score>=6?'SANGAT KUAT':score>=5?'KUAT':score>=3?'SEDANG':'LEMAH';
 const pct=level==='SANGAT KUAT'?100:level==='KUAT'?78:level==='SEDANG'?52:28;
 const bar=$("pwStrengthBar");if(bar)bar.style.width=pct+'%';
 const st=$("pwStrengthText");if(st)st.textContent=level;
 const lt=$("pwLengthText");if(lt)lt.textContent=password.length+' KARAKTER';
 if(result)result.innerHTML='<span>✓ Password dibuat secara lokal di perangkat.</span>';
}
async function copyGeneratedPassword(){const v=$("pwOutput")?.value||"";if(!v)return;try{await navigator.clipboard.writeText(v);if($("pwResult"))$("pwResult").innerHTML='<span>✓ Password berhasil disalin.</span>';}catch{const e=$("pwOutput");e?.select();document.execCommand('copy');if($("pwResult"))$("pwResult").innerHTML='<span>✓ Password disalin.</span>';}}


function setDuckQuery(q){const el=$("ddgInput");if(el){el.value=q;el.focus();}}
function duckPick(o,keys){if(!o||typeof o!=="object")return "";for(const k of keys){if(o[k]!==undefined&&o[k]!==null&&String(o[k]).trim())return o[k];}return "";}
function duckCollect(data){const arr=[],seen=new Set();function add(o){if(!o||typeof o!=="object")return;const title=duckPick(o,["title","name","heading"]),url=duckPick(o,["url","link","href","firstURL","firstUrl"]),desc=duckPick(o,["description","snippet","body","text","content"]);if(title||url){const key=String(url||title);if(!seen.has(key)){seen.add(key);arr.push({title:String(title||url||"Hasil"),url:String(url||""),desc:String(desc||"")});}}}function walk(o){if(!o||typeof o!=="object"||arr.length>=20)return;if(Array.isArray(o)){o.forEach(walk);return;}add(o);Object.values(o).forEach(v=>{if(v&&typeof v==="object")walk(v);});}walk(data);return arr;}
async function runDuckDuckGo(){const q=String($("ddgInput")?.value||"").trim(),out=$("ddgResult"),btn=$("ddgSearchBtn");if(!q){out.innerHTML='<div class="ddgError">🦆 Masukkan kata kunci dulu.</div>';return;}btn.disabled=true;btn.textContent="⏳ CARI...";out.innerHTML='<div class="ddgLoading"><b>SEARCHING!</b><span>Mencari "'+escapeHtml(q)+'"...</span></div>';try{const url="https://api-yunn.vercel.app/s/duckduckgo?apikey=qsr&query="+encodeURIComponent(q);const r=await fetch(url,{method:"GET",headers:{Accept:"application/json, text/plain, */*"},cache:"no-store"});const raw=await r.text();let data;try{data=JSON.parse(raw)}catch{data=raw}if(!r.ok)throw new Error(typeof data==="string"?data.slice(0,180):(data?.message||data?.error||("HTTP "+r.status)));const items=duckCollect(data);if(!items.length){out.innerHTML='<div class="ddgCard"><div class="ddgMeta">🦆 DUCKDUCKGO</div><p>'+escapeHtml(typeof data==="string"?data:"Hasil tidak ditemukan.")+'</p></div>';return;}out.innerHTML='<div class="ddgList">'+items.map(x=>{const u=/^https?:\/\//i.test(x.url)?comicEsc(x.url):"";const inner='<div class="ddgMeta">🦆 DUCKDUCKGO</div><h3>'+comicEsc(x.title)+'</h3>'+(x.desc?'<p>'+comicEsc(x.desc.slice(0,300))+'</p>':'');return u?'<a class="ddgCard" href="'+u+'" target="_blank" rel="noopener noreferrer">'+inner+'</a>':'<article class="ddgCard">'+inner+'</article>';}).join('')+'</div>';}catch(e){out.innerHTML='<div class="ddgError">💥 GAGAL MENCARI<br><small>'+escapeHtml(e?.message||"Request gagal")+'</small></div>';}finally{btn.disabled=false;btn.textContent="🔎 CARI!";}}

function runTool(){
 const action=currentAction(); const input=$("toolInput")?.value||""; const out=$("toolResult");
 try{
  if(action==="ai"){runAI(input);return;}
  if(action==="igc"){runIGC();return;}
  if(action==="tiktok"){runTikTok(input);return;}
  if(action==="instagram"){runInstagram(input);return;}
  if(action==="fakeff"){runFakeFF(input);return;}
  if(action==="link"){if(!/^https?:\/\//i.test(input)){out.textContent="Masukkan URL yang valid (http/https).";return;}navigator.clipboard?.writeText(input);out.innerHTML=`URL siap: <a href="${escapeHtml(input)}" target="_blank" rel="noopener">Buka link</a><br><small>URL juga dicoba disalin ke clipboard.</small>`;return;}
  if(action==="imgurl"){runImageToURL();return;}
  if(action==="removebg"){runRemoveBG(input);return;}
  if(action==="quotes"){runQuotesMaker(input);return;}
  if(action==="img2qr"){runImg2QR();return;}
  if(action==="brat"){runBrat(input);return;}
  if(action==="iqc"){runIQC(input);return;}
  if(action==="dana"){runDana(input);return;}
  if(action==="nik"){runNIK(input);return;}
   if(action==="amgenerator"){runAMRequest();return;}
   if(action==="duckduckgo"){runDuckDuckGo();return;}
   if(action==="cnn"){loadCNNComic();return;}
   if(action==="kisahnabi"){loadKisahNabiComic();return;}
   if(action==="gempa"){loadGempaComic();return;}
   if(action==="cuaca"){loadWeatherComic();return;}
  if(action==="ipchecker"){loadIPCheckerComic();return;}
  if(action==="password"){generatePasswordComic();return;}
  if(action==="artinama"){runArtiNama();return;}
 }catch(e){out.textContent="Input tidak valid: "+e.message;}
}
async function runArtiNama(){
 const input=String($("artinamaInput")?.value||"").trim();
 const out=$("artinamaResult"), btn=$("artinamaBtn"), wrap=$("artinamaInput")?.closest(".artinamaWrap");
 if(!out)return;
 if(input.length<2){out.innerHTML='<div class="artinamaError">Masukkan nama minimal 2 karakter.</div>';return;}
 if(btn){btn.disabled=true;btn.textContent='...';} wrap?.classList.add('isLoading');
 out.innerHTML='<div class="artinamaLoading">Mencari arti nama...</div>';
 try{
   const url='https://api.azbry.com/api/fun/cekartinama?nama='+encodeURIComponent(input);
   const r=await fetchAzbry(url,{method:'GET',cache:'no-store'});
   if(!r.ok)throw new Error(`Gagal mengambil data (${r.status})`);
   const type=(r.headers.get('content-type')||'').toLowerCase();
   let data;
   if(type.includes('json')) data=await r.json(); else {const txt=await r.text();try{data=JSON.parse(txt)}catch{data={result:txt}}}
   let meaning='';
   if(typeof data==='string') meaning=data;
   else meaning=data?.result||data?.meaning||data?.arti||data?.makna||data?.message||data?.data?.result||data?.data?.meaning||data?.data?.arti||data?.data?.makna||'';
   if(typeof meaning!=='string') meaning=JSON.stringify(meaning,null,2);
   if(!meaning.trim()) meaning='Arti nama tidak ditemukan.';
   out.innerHTML=`<div class="artinamaCard"><div class="artinamaMeaning">${escapeHtml(meaning)}</div></div>`;
 }catch(e){
   out.innerHTML=`<div class="artinamaError">${escapeHtml(e?.message||String(e))}</div>`;
 }finally{if(btn){btn.disabled=false;btn.textContent='CEK';}wrap?.classList.remove('isLoading');}
}

async function runAI(input){
 const out=$("toolResult");
 const text=input.trim();
 const choice=$("aiChoice")?.value||"gpt4o";
 if(!text){out.textContent="Masukkan pertanyaan atau pesan terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">AI sedang memproses…</div>';
 const endpoint="https://api.azbry.com/api/ai/"+choice+"?q="+encodeURIComponent(text)+(choice==="ustadz"?"&madhhab=0":"");
 try{
   const r=await fetchAzbry(endpoint,{method:"GET"});
   if(!r.ok) throw new Error(`API ${r.status}`);
   const type=(r.headers.get("content-type")||"").toLowerCase();
   let data=type.includes("json")?await r.json():await r.text();
   const answer=extractAIText(data);
   if(!answer) throw new Error("Jawaban AI tidak ditemukan dari response API.");
   out.innerHTML=`<div class="aiAnswer">${escapeHtml(answer).replace(/\n/g,"<br>")}</div>`;
 }catch(e){
   out.innerHTML=`<div class="errorMsg">Gagal memproses AI: ${escapeHtml(e.message||String(e))}</div>`;
 }
}

async function runNIK(input){
 const out=$("toolResult");
 const nik=String(input||"").replace(/\D/g,"");
 if(!/^\d{16}$/.test(nik)){
   out.innerHTML='<div class="nikError">⚠️ NIK harus terdiri dari tepat 16 angka.</div>';
   return;
 }
 if(!(await comicQuotaTryReserve('nik'))){
   out.innerHTML=comicQuotaError('nik');
   return;
 }
 out.innerHTML='<div class="nikLoading"><span>🔎</span><div><b>MEMERIKSA NIK...</b><small>Menghubungi API QSR</small></div></div>';
 const endpoint='https://api.qsr.web.id/tools/nik?apikey=qsr&nik='+encodeURIComponent(nik);
 let counted=true;
 try{
   const r=await fetch(endpoint,{method:'GET',headers:{Accept:'application/json, text/plain, */*'},cache:'no-store'});
   const text=await r.text();
   let data;
   try{data=JSON.parse(text);}catch(_){data=text;}
   if(!r.ok || (data && typeof data==='object' && data.status===false)){
      const msg=(data&&typeof data==='object'&&(data.error||data.message))||('API '+r.status);
      throw new Error(msg);
   }
   out.innerHTML=renderNikResult(data);
   counted=false;
 }catch(e){
   if(counted) comicQuotaRefund('nik');
   out.innerHTML='<div class="nikError"><div class="nikErrorTitle">❌ NIK CHECK GAGAL</div><p>'+escapeHtml(e.message||String(e))+'</p><small>Quota tidak dipotong karena request gagal.</small></div>';
 }
}
function renderNikResult(data){
 const ignored=new Set(['status','creator','domain','success','apikey','api_key']);
 let obj=data;
 // Tampilkan hanya data hasil NIK; metadata API seperti status/creator/domain disembunyikan.
 if(obj&&typeof obj==='object'&&!Array.isArray(obj)){
   if(obj.result!==undefined) obj=obj.result;
   else if(obj.data!==undefined) obj=obj.data;
 }
 const entries=[];
 const walk=(value,keyPath)=>{
   if(value===null||value===undefined)return;
   if(Array.isArray(value)){
     value.forEach((v,i)=>walk(v,keyPath?keyPath+' '+(i+1):String(i+1)));
     return;
   }
   if(typeof value==='object'){
     Object.entries(value).forEach(([k,v])=>{
       if(ignored.has(String(k).toLowerCase())) return;
       walk(v,keyPath?keyPath+' › '+k:k);
     });
     return;
   }
   if(keyPath && !ignored.has(String(keyPath).split('›').pop().trim().toLowerCase())) entries.push([keyPath,String(value)]);
 };
 walk(obj,'');
 const cards=entries.map(([k,v])=>`<div class="nikItem"><span>${escapeHtml(formatNikKey(k))}</span><b>${escapeHtml(v)}</b></div>`).join('');
 return `<div class="nikResultHead"><div class="nikSuccess">✓ BERHASIL</div><h3>HASIL NIK CHECK</h3><p>Data NIK berhasil ditemukan.</p></div><div class="nikGrid">${cards||'<div class="nikItem"><b>Data NIK tidak tersedia.</b></div>'}</div>`;
}
function formatNikKey(key){
 return String(key).replace(/^.*?›\s*/, '').replace(/[_-]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
}

function extractAIText(value){
 if(typeof value==="string") return value.trim();
 if(!value || typeof value!=="object") return "";
 const keys=["answer","response","result","message","content","text","data"];
 for(const k of keys){
   const v=value[k];
   if(typeof v==="string" && v.trim()) return v.trim();
   if(v && typeof v==="object"){const nested=extractAIText(v);if(nested)return nested;}
 }
 return "";
}
async function amQsr(path, params={}){ const query=new URLSearchParams({apikey:'qsr'}); Object.entries(params||{}).forEach(([k,v])=>{if(v!==undefined&&v!==null&&String(v)!=='')query.set(k,String(v));}); const url='https://api.qsr.web.id'+(String(path).startsWith('/')?String(path):'/'+String(path))+'?'+query.toString(); let last; for(const target of [url,'https://api.allorigins.win/raw?url='+encodeURIComponent(url)]){ try{ const r=await fetch(target,{method:'GET',cache:'no-store',headers:{Accept:'application/json, text/plain, */*'}}); const text=await r.text(); let data=text; try{data=JSON.parse(text)}catch(_){ } if(!r.ok) throw new Error('HTTP '+r.status+(typeof data==='object'?(data.message||data.error?' — '+(data.message||data.error):''):'')); return data; }catch(e){last=e;} } throw last||new Error('API tidak dapat dihubungi.'); }
function amNormalizeLink(raw){ let link=String(raw||'').trim().replace(/^['"`]+|['"`]+$/g,'').trim(); for(let i=0;i<2;i++){try{const d=decodeURIComponent(link);if(d!==link)link=d;else break;}catch{break;}} link=link.replace(/[\r\n\t ]+/g,''); try{const u=new URL(link);if(!/^https?:$/.test(u.protocol))throw new Error();return u.toString();}catch{throw new Error('Link verifikasi tidak valid. Tempel URL lengkap dari email.');} }
function amSucceeded(data){ if(typeof data==='string')return /(success|sukses|berhasil|verified|premium|activated|active)/i.test(data); if(!data||typeof data!=='object')return false; if(data.success===true||data.verified===true||data.activated===true)return true; const status=String(data.status??data.result??data.code??'').toLowerCase(); return ['success','ok','verified','activated','active','premium','200'].includes(status)||Boolean(data.data?.success||data.data?.verified||data.data?.activated); }
function amDetail(data){ if(typeof data==='string')return data; return data?.message||data?.error||data?.detail||data?.result||''; }
function amShowStep(step){ const s1=$("amStep1"),s2=$("amStep2"),p1=$("amProg1"),p2=$("amProg2"); if(!s1||!s2)return; const second=step===2; s1.hidden=second; s2.hidden=!second; p1?.classList.toggle("active",!second);p1?.classList.toggle("done",second);p2?.classList.toggle("active",second); if(second) setTimeout(()=>$("amVerify")?.focus(),120); }


const COMIC_QUOTA_LIMITS = {
  amgenerator: 15,
  nik: 20,
  ipchecker: 20,
  tempmail: 30,
};

async function comicQuotaRpc(name, args={}){
  if(!supabaseClient) throw new Error("Layanan quota belum tersedia (Supabase gagal dimuat). Tools lain tetap bisa dipakai.");
  const {data,error}=await supabaseClient.rpc(name,args);
  if(error) throw error;
  return data;
}

async function comicQuotaGet(tool){
  try{
    const remaining=await comicQuotaRpc('get_global_quota',{
      p_tool:tool,
      p_limit:COMIC_QUOTA_LIMITS[tool]||0
    });
    return Number(remaining)||0;
  }catch(e){
    console.error('Supabase quota read error:',e);
    return null;
  }
}

async function comicQuotaTryReserve(tool){
  const limit=COMIC_QUOTA_LIMITS[tool];
  if(!limit) return true;
  try{
    await comicQuotaRpc('use_global_quota',{
      p_tool:tool,
      p_limit:limit
    });
    return true;
  }catch(e){
    if(String(e?.message||'').includes('QUOTA_HABIS')) return false;
    console.error('Supabase quota reserve error:',e);
    throw new Error('Gagal menghubungkan ke sistem quota. Coba lagi.');
  }
}

async function comicQuotaRefund(tool){
  if(!COMIC_QUOTA_LIMITS[tool]) return;
  try{
    await comicQuotaRpc('refund_global_quota',{p_tool:tool});
  }catch(e){
    console.error('Supabase quota refund error:',e);
  }
}

function comicQuotaMessage(tool){
  const names={amgenerator:'AM Generator',nik:'NIK Check',ipchecker:'IP Checker',tempmail:'Temp Mail'};
  const name=names[tool]||tool;
  return `Quota global ${name} telah habis, silahkan tunggu besok untuk menggunakan tools ${name} lagi.`;
}

function comicQuotaBadge(tool){
  if(!COMIC_QUOTA_LIMITS[tool]) return '';
  return `<div class="comicQuotaBadge" id="quotaBadge-${tool}">QUOTA HARI INI: <b>...</b> / ${COMIC_QUOTA_LIMITS[tool]}<small>REFILL 00:00</small></div>`;
}

async function refreshComicQuotaBadge(tool){
  const el=document.getElementById('quotaBadge-'+tool);
  if(!el) return;
  const remaining=await comicQuotaGet(tool);
  if(remaining===null){
    el.querySelector('b').textContent='--';
    el.querySelector('small').textContent='QUOTA OFFLINE';
    return;
  }
  el.querySelector('b').textContent=remaining;
}

function comicQuotaError(tool){
  const msg=comicQuotaMessage(tool);
  const name=({amgenerator:'AM Generator',nik:'NIK Check',ipchecker:'IP Checker',tempmail:'Temp Mail'})[tool]||tool;
  return `<div class="quotaError"><b>🚫 QUOTA HABIS</b><p>${comicEsc(msg)}</p><small>Quota ${comicEsc(name)} akan tersedia lagi setelah pukul 00:00.</small></div>`;
}

function amWaitText(sec){ const m=Math.floor(sec/60),s=sec%60; return m>0 ? m+'m '+String(s).padStart(2,'0')+'s' : s+'s'; }
function amCooldownCountdown(btn,msg,seconds){ return Promise.resolve(); }

async function runAMRequest(){
 const emailEl=$('amEmail'),msg=$('amRequestMsg'),btn=$('amRequestBtn');
 const email=(emailEl?.value||'').trim();
 if(!email||!email.includes('@')){
   if(msg)msg.textContent='Masukkan email yang valid.';
   return;
 }
 if(!(await comicQuotaTryReserve('amgenerator'))){
   if(msg)msg.textContent=comicQuotaMessage('amgenerator');
   return;
 }
 if(btn)btn.disabled=true;
 let reserved=true;
 try{
   btn.textContent='MENGIRIM...';
   if(msg)msg.textContent='Menghubungkan ke API...';
   let data;
   try{
     data=await amQsr('/alight/send',{email});
   }catch(e){
     const m=String(e?.message||'').match(/(\d+)\s*(?:detik|seconds?|sec)/i);
     if(/HTTP\s*429/i.test(String(e?.message||''))&&m){
       let left=Math.max(1,parseInt(m[1],10));
       while(left>0){
         btn.textContent='TUNGGU '+left+'s';
         if(msg)msg.textContent='Batas API tercapai. Tunggu '+left+' detik...';
         await new Promise(r=>setTimeout(r,1000));
         left--;
       }
       data=await amQsr('/alight/send',{email});
     }else throw e;
   }
   if(msg){
     msg.textContent='Link verifikasi sudah dikirim ke email kamu ✓';
     amShowStep(2);
   }
   reserved=false;
 }catch(e){
   if(reserved) comicQuotaRefund('amgenerator');
   if(msg)msg.textContent='Gagal: '+String(e?.message||'Request gagal.');
 }finally{
   if(btn){
     btn.disabled=false;
     btn.textContent='REQUEST ACTIVATION';
   }
 }
}

async function runAMVerify(){ const emailEl=$('amEmail'),linkEl=$('amVerify'),msg=$('amVerifyMsg'),btn=$('amVerifyBtn'); const email=(emailEl?.value||'').trim(); if(!email||!email.includes('@')){if(msg)msg.textContent='Email wajib diisi dengan benar.';emailEl?.focus();return;} let link;try{link=amNormalizeLink(linkEl?.value||'');}catch(e){if(msg)msg.textContent=e.message;linkEl?.focus();return;} btn.disabled=true;btn.textContent='MEMVERIFIKASI...';if(msg)msg.textContent='Memeriksa email dan link verifikasi...'; try{ const data=await amQsr('/alight/verify',{email,link}); if(amSucceeded(data))msg.textContent='Verifikasi berhasil, akun kamu sudah premium 🎉'; else msg.textContent='Verifikasi belum berhasil: '+(amDetail(data)||'Server belum mengonfirmasi verifikasi.'); }catch(e){msg.textContent='Gagal verifikasi: '+String(e?.message||'Request gagal.');} finally{btn.disabled=false;btn.textContent='VERIFIKASI SEKARANG';} }

function comicEsc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#111111;'}[m]));}
function comicItems(data){let x=data?.result??data?.data??data?.articles??data;if(Array.isArray(x))return x;if(x&&Array.isArray(x.articles))return x.articles;if(x&&typeof x==='object'){for(const k of Object.keys(x))if(Array.isArray(x[k]))return x[k];}return[];}
function comicVal(o,keys){for(const k of keys){if(o?.[k]!=null&&String(o[k]).trim())return o[k];}return '';}

function setTVComic(name){const input=$("tvInput");if(input){input.value=name;input.focus();}loadJadwalTVComic();}
function tvComicEsc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#111111;'}[m]));}
function tvComicVal(o,keys){for(const k of keys){if(o&&o[k]!=null&&String(o[k]).trim())return o[k];}return '';}
function tvComicTitle(o){if(typeof o==='string')return o;return tvComicVal(o,['title','judul','program','acara','name','show','program_name','event','description'])||'';}
function tvComicTime(o){if(typeof o==='string')return '';return tvComicVal(o,['time','jam','waktu','start','start_time','mulai','startTime','schedule_time','time_start','from'])||'';}
function tvComicChannel(o){return typeof o==='object'?tvComicVal(o,['channel','channel_name','tv','stasiun','station','station_name']):'';}
function tvComicLooksLikeTime(k){return /^(\d{1,2}[:.]\d{2})(\s*[-–]\s*\d{1,2}[:.]\d{2})?$/.test(String(k).trim());}
function tvComicObjectSchedule(obj){if(!obj||typeof obj!=='object'||Array.isArray(obj))return [];const out=[];for(const[k,v]of Object.entries(obj)){if(tvComicLooksLikeTime(k)&&(typeof v==='string'||typeof v==='number'))out.push({time:k,title:String(v)});else if(tvComicLooksLikeTime(k)&&v&&typeof v==='object')out.push({...v,time:tvComicTime(v)||k,title:tvComicTitle(v)});}return out;}
function tvComicExtractSchedule(node){if(!node)return [];if(Array.isArray(node)){let out=[];for(const x of node){const nested=tvComicExtractSchedule(x);if(nested.length)out.push(...nested);else if(tvComicTitle(x)||tvComicTime(x))out.push(typeof x==='object'?{...x}:{title:String(x)});}return out;}if(typeof node==='string')return [{title:node}];if(typeof node!=='object')return [];for(const k of ['jadwal','schedule','schedules','programs','program','acara','events','items','list','shows']){if(node[k]!=null){const out=tvComicExtractSchedule(node[k]);if(out.length)return out;}}const byTime=tvComicObjectSchedule(node);if(byTime.length)return byTime;if(tvComicTitle(node)||tvComicTime(node))return [{...node}];return [];}
function tvComicFindChannel(data,wanted){const q=String(wanted||'').trim().toLowerCase(),seen=new Set();const score=name=>{const n=String(name||'').toLowerCase().trim();if(!n)return -1;if(n===q)return 100;if(n.includes(q)||q.includes(n))return 80;return 0;};function walk(x){if(!x||typeof x!=='object'||seen.has(x))return null;seen.add(x);if(Array.isArray(x)){for(const item of x){if(item&&typeof item==='object'){const c=tvComicChannel(item);if(score(c)>0){const items=tvComicExtractSchedule(item);if(items.length)return {items,channel:c};}}}for(const item of x){const r=walk(item);if(r?.items?.length)return r;}return null;}for(const[k,v]of Object.entries(x)){if(score(k)>0){const items=tvComicExtractSchedule(v);if(items.length)return {items,channel:k};}if(v&&typeof v==='object'){const c=tvComicChannel(v);if(score(c)>0){const items=tvComicExtractSchedule(v);if(items.length)return {items,channel:c};}}}for(const v of Object.values(x)){const r=walk(v);if(r?.items?.length)return r;}return null;}return walk(data)||{items:[],channel:''};}
function tvComicParse(raw){if(typeof raw==='string'){try{return JSON.parse(raw);}catch{return {__text:raw};}}return raw;}
function tvComicSort(items){return [...items].sort((a,b)=>{const toMin=x=>{const m=String(tvComicTime(x)).match(/(\d{1,2})[:.](\d{2})/);return m?Number(m[1])*60+Number(m[2]):9999;};return toMin(a)-toMin(b);});}
function tvComicRender(items,tv,channel=''){const box=$("tvResult");if(!box)return;items=tvComicSort(items).filter(x=>tvComicTitle(x)||tvComicTime(x)).filter((x,i,a)=>{const key=(tvComicTime(x)+'|'+tvComicTitle(x)).toLowerCase();return a.findIndex(y=>(tvComicTime(y)+'|'+tvComicTitle(y)).toLowerCase()===key)===i;});if(!items.length){box.innerHTML='<div class="tvComicEmpty">Belum ada daftar acara untuk <b>'+tvComicEsc(tv)+'</b>.</div>';return;}const head=String(channel||tv).toUpperCase();box.innerHTML='<div class="tvComicHeadResult"><div><b>'+tvComicEsc(head)+'</b><small>Jadwal acara yang tersedia</small></div><span>'+items.length+' ACARA</span></div>'+items.map(item=>{const time=tvComicTime(item)||'--:--',title=tvComicTitle(item)||'Acara TV',meta=tvComicVal(item,['description','desc','keterangan','episode','subtitle','genre','kategori']);return '<div class="tvComicItem"><div class="tvComicTime">'+tvComicEsc(time)+'</div><div><div class="tvComicName">'+tvComicEsc(title)+'</div>'+(meta?'<div class="tvComicMeta">'+tvComicEsc(meta)+'</div>':'')+'</div></div>';}).join('');}
async function loadJadwalTVComic(){const input=$("tvInput"),box=$("tvResult"),btn=$("tvCheckBtn");const tv=(input?.value||'').trim();if(!box)return;if(!tv){box.innerHTML='<div class="tvComicError">Masukkan nama TV terlebih dahulu, contoh: RCTI.</div>';input?.focus();return;}if(btn){btn.disabled=true;btn.textContent='MEMUAT...';}box.innerHTML='<div class="tvComicLoading">📺 Memuat jadwal '+tvComicEsc(tv)+'...</div>';try{const base='https://api-yunn.vercel.app/info/jadwaltv?apikey=qsr';const urls=[base+'&tv='+encodeURIComponent(tv),base,base+'&channel='+encodeURIComponent(tv),base+'&stasiun='+encodeURIComponent(tv)];let lastErr='Jadwal tidak ditemukan.';for(const url of urls){try{const response=await fetch(url,{method:'GET',headers:{Accept:'application/json, text/plain, */*'},cache:'no-store'});const raw=await response.text();if(!response.ok){lastErr='HTTP '+response.status;continue;}const data=tvComicParse(raw);if(data?.status===false){lastErr=data?.message||data?.error||'API menolak permintaan.';continue;}let found=tvComicFindChannel(data,tv),items=found.items,channel=found.channel;if(!items.length)items=tvComicExtractSchedule(data);if(items.length){const filtered=items.filter(x=>{const c=tvComicChannel(x);return !c||c.toLowerCase()===tv.toLowerCase()||c.toLowerCase().includes(tv.toLowerCase())||tv.toLowerCase().includes(c.toLowerCase());});if(filtered.length)items=filtered;}if(items.length){tvComicRender(items,tv,channel||tv);return;}lastErr='Data jadwal kosong untuk '+tv+'.';}catch(err){lastErr=err?.message||'Request gagal.';}}throw new Error(lastErr);}catch(e){console.error('Jadwal TV API error:',e);box.innerHTML='<div class="tvComicError">Gagal memuat jadwal.<br><small>'+tvComicEsc(e?.message||'Request gagal.')+'</small></div>';}finally{if(btn){btn.disabled=false;btn.textContent='📺 LIHAT JADWAL';}}}
function initTVComic(){$("tvInput")?.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();loadJadwalTVComic();}});}

function setWeatherCity(city){const input=$("weatherInput");if(input){input.value=city;input.focus();}loadWeatherComic();}
function weatherEsc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#111111;"}[m]));}
function weatherPick(o,keys){if(!o||typeof o!=="object")return "";for(const k of keys){if(o[k]!==undefined&&o[k]!==null&&String(o[k]).trim()!=="")return o[k];}return "";}
function weatherWalk(data){
  if(!data||typeof data!=="object")return data;
  if(data.data&&typeof data.data==="object")return weatherWalk(data.data);
  if(data.result&&typeof data.result==="object")return weatherWalk(data.result);
  if(data.weather&&typeof data.weather==="object")return weatherWalk(data.weather);
  return data;
}
function renderWeatherResult(data,city){
  const root=weatherWalk(data)||{};
  const location=weatherPick(root,["city","kota","name","location","lokasi"])||city;
  const condition=weatherPick(root,["condition","description","desc","weather","cuaca","text","status"]);
  const temp=weatherPick(root,["temperature","temp","suhu","temperature_c","temp_c","celsius"]);
  const feels=weatherPick(root,["feels_like","feelsLike","feels","suhu_terasa","temperature_feels_like"]);
  const humidity=weatherPick(root,["humidity","kelembapan","kelembaban"]);
  const wind=weatherPick(root,["wind","wind_speed","windspeed","angin","wind_kph"]);
  const pressure=weatherPick(root,["pressure","tekanan","pressure_mb"]);
  const visibility=weatherPick(root,["visibility","jarak_pandang","vis_km"]);
  const icon=weatherPick(root,["icon","icon_url","image","thumbnail"]);
  const time=weatherPick(root,["localtime","local_time","updated","updated_at","last_updated","waktu"]);
  const cards=[
    ["🌡️","SUHU",temp], ["💧","KELEMBAPAN",humidity], ["🌬️","ANGIN",wind], ["🥵","TERASA",feels], ["⏱️","TEKANAN",pressure], ["👁️","VISIBILITAS",visibility]
  ].filter(x=>x[2]!==""&&x[2]!==null&&x[2]!==undefined);
  let extras="";
  if(!cards.length){
    const skip=new Set(["status","creator","domain","message","success"]);
    const flat=[];
    const walk=(o,prefix="")=>{if(!o||typeof o!=="object"||flat.length>=12)return;for(const [k,v] of Object.entries(o)){if(skip.has(k.toLowerCase()))continue;if(v&&typeof v==="object")walk(v,prefix?prefix+" "+k:k);else if(v!==null&&v!==undefined&&String(v).trim())flat.push([k.replace(/[_-]/g," "),String(v)]);}};
    walk(root); cards.push(...flat.slice(0,6).map(x=>["•",x[0].toUpperCase(),x[1]]));
  }
  return `<div class="weatherHero">${icon?`<img src="${weatherEsc(icon)}" alt="" onerror="this.style.display='none'">`:"<span>☀️</span>"}<div><small>CUACA SEKARANG</small><h3>${weatherEsc(location)}</h3><b>${weatherEsc(condition||"Informasi cuaca tersedia")}</b></div></div><div class="weatherGrid">${cards.map(c=>`<div><span>${c[0]}</span><small>${weatherEsc(c[1])}</small><strong>${weatherEsc(c[2])}</strong></div>`).join("")}</div>${time?`<div class="weatherTime">🕒 ${weatherEsc(time)}</div>`:""}`;
}
async function loadWeatherComic(){
 const input=$("weatherInput"),box=$("weatherResult"),btn=$("weatherCheckBtn");
 const city=(input?.value||"").trim(); if(!box)return;
 if(!city){box.innerHTML='<div class="weatherError">Masukkan nama kota terlebih dahulu.</div>';input?.focus();return;}
 if(btn){btn.disabled=true;btn.textContent="MEMUAT...";}
 box.innerHTML=`<div class="weatherLoading">☁️ Mengambil cuaca ${weatherEsc(city)}...</div>`;
 const base="https://api.azbry.com/api/search/cuaca";
 const urls=[base+"?city="+encodeURIComponent(city),base+"?q="+encodeURIComponent(city),base+"?query="+encodeURIComponent(city)];
 let last="Data cuaca tidak ditemukan.";
 try{
   for(const url of urls){
     try{
       const r=await fetchAzbry(url,{method:"GET"});
       const raw=await r.text(); let data; try{data=JSON.parse(raw);}catch(_){data=raw;}
       if(!r.ok){last="HTTP "+r.status;continue;}
       if(data&&typeof data==="object"&&data.status===false){last=data.message||data.error||last;continue;}
       if(data&&typeof data==="object"){box.innerHTML=renderWeatherResult(data,city);return;}
     }catch(e){last=e?.message||last;}
   }
   throw new Error(last);
 }catch(e){box.innerHTML='<div class="weatherError"><b>❌ CUACA GAGAL DIMUAT</b><small>'+weatherEsc(e.message||"Request gagal.")+'</small></div>';}finally{if(btn){btn.disabled=false;btn.textContent="☀️ CEK CUACA";}}
}
function initWeatherComic(){$("weatherInput")?.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();loadWeatherComic();}});}

async function loadCNNComic(){
 const el=$('cnnComicList'); if(!el)return;
 if(el.dataset.loading==='1')return;
 el.dataset.loading='1'; el.innerHTML='<div class="loading">Memuat berita CNN Indonesia...</div>';
 const ctl=new AbortController(), timer=setTimeout(()=>ctl.abort(),12000);
 try{const r=await fetch('https://api-yunn.vercel.app/berita/cnn?apikey=qsr',{headers:{Accept:'application/json, text/plain, */*'},cache:'no-store',signal:ctl.signal});const type=r.headers.get('content-type')||'';const data=type.includes('json')?await r.json():await r.text();if(!r.ok)throw new Error(typeof data==='string'?data:(data?.error||data?.message||`HTTP ${r.status}`));if(data?.status===false)throw new Error(data?.error||'API berita menolak permintaan.');let items=comicItems(typeof data==='string'?JSON.parse(data):data).slice(0,15);if(!items.length)throw new Error('Berita tidak tersedia dari API.');el.innerHTML=items.map((it,i)=>{const title=comicVal(it,['title','judul','name'])||`Berita ${i+1}`;const desc=comicVal(it,['description','desc','summary','content','isi']);const image=comicVal(it,['image','thumbnail','thumb','image_url','urlToImage','gambar']);const link=comicVal(it,['url','link','href']);const date=comicVal(it,['publishedAt','published_at','date','tanggal','time']);const cat=comicVal(it,['category','kategori','channel'])||'CNN Indonesia';const inner=`${image?`<img class="newsComicImg" src="${comicEsc(image)}" alt="" loading="lazy" onerror="this.style.display='none'">`:''}<div class="newsComicMeta">${comicEsc(cat)}${date?' • '+comicEsc(date):''}</div><h3>${comicEsc(title)}</h3>${desc?`<p>${comicEsc(String(desc).replace(/<[^>]*>/g,'').slice(0,180))}${String(desc).length>180?'…':''}</p>`:''}`;return link?`<a class="newsComicCard" href="${comicEsc(link)}" target="_blank" rel="noopener noreferrer">${inner}</a>`:`<article class="newsComicCard">${inner}</article>`;}).join('');}catch(e){el.innerHTML=`<div class="errorMsg">${e?.name==='AbortError'?'Waktu habis (12 detik). API berita sedang lambat atau tidak merespons.':'Gagal memuat berita.'}<br>${comicEsc(e?.message||'Request gagal.')}</div>`;}finally{clearTimeout(timer);el.dataset.loading='0';}}
function setNabiComic(name){const i=$('nabiComicInput');if(i){i.value=name;loadKisahNabiComic();}}
const NABI_COMIC_STORIES={
 Adam:{title:'Nabi Adam AS',text:'Nabi Adam AS adalah manusia pertama dan nabi pertama. Allah SWT menciptakan beliau dan menjadikannya awal dari keturunan manusia. Adam AS kemudian ditempatkan di surga bersama Hawa dan mendapatkan banyak kenikmatan. Allah SWT memberikan petunjuk agar keduanya tidak mendekati pohon yang telah dilarang. Namun setelah mendapat godaan, keduanya melakukan kesalahan dan akhirnya turun ke bumi. Adam AS tidak terus-menerus membenarkan kesalahannya. Beliau memohon ampun dan bertaubat kepada Allah SWT, lalu Allah menerima taubatnya. Setelah berada di bumi, Adam AS menjalani kehidupan sebagai manusia pertama sekaligus nabi yang mengajarkan keluarganya untuk taat kepada Allah. Beliau menjadi awal dari perjalanan manusia di bumi dan mengajarkan keluarganya untuk mengenal petunjuk Allah serta menjaga ketaatan. Dari kisah ini kita belajar bahwa manusia dapat melakukan kesalahan, tetapi kesalahan tidak boleh membuat seseorang berhenti kembali kepada Allah. Pintu taubat dan ampunan Allah tetap terbuka bagi orang yang sungguh-sungguh menyesal dan memperbaiki diri. Kisah Nabi Adam AS juga mengajarkan pentingnya menaati perintah Allah, berhati-hati terhadap godaan, mengakui kesalahan, tidak mencari-cari alasan untuk membenarkan kesalahan, dan tidak berputus asa dari rahmat Allah. Kisah beliau menjadi pengingat bahwa kehidupan manusia di bumi adalah tempat menjalankan amanah dan berusaha mengikuti petunjuk Allah.'},
 Nuh:{title:'Nabi Nuh AS',text:'Nabi Nuh AS diutus kepada kaumnya ketika banyak manusia telah jauh dari ajaran tauhid. Beliau mengajak mereka menyembah Allah SWT dan meninggalkan kesyirikan. Dakwah Nabi Nuh AS berlangsung sangat lama, tetapi tidak semua orang mau menerima nasihatnya. Banyak yang menolak bahkan mengejek beliau. Meski demikian, Nabi Nuh AS tetap menjalankan tugasnya dan tidak berhenti menyampaikan kebenaran. Keteguhan beliau menunjukkan bahwa seorang yang menyampaikan kebenaran tidak boleh berhenti hanya karena banyak orang menolak. Allah SWT kemudian memerintahkan Nabi Nuh AS membuat sebuah kapal sebagai persiapan menghadapi banjir besar. Beliau membuat kapal sesuai petunjuk Allah, sementara orang-orang yang ingkar terus mengejeknya. Ketika banjir datang, Nabi Nuh AS membawa orang-orang beriman dan makhluk yang diperintahkan Allah untuk diselamatkan. Mereka yang tetap menolak kebenaran akhirnya menghadapi akibat dari pilihannya. Setelah air surut, Nabi Nuh AS dan orang-orang beriman melanjutkan kehidupan. Kisah ini memperlihatkan panjangnya kesabaran seorang nabi dalam berdakwah dan pentingnya tetap teguh ketika menghadapi ejekan. Nabi Nuh AS tidak mengukur keberhasilan hanya dari banyaknya orang yang mengikuti, tetapi tetap menjalankan amanah yang diberikan kepadanya. Kisah ini mengajarkan kesabaran dalam berdakwah, keteguhan ketika menghadapi penolakan, pentingnya mengikuti petunjuk Allah, dan keyakinan bahwa pertolongan Allah datang pada waktu yang telah ditentukan.'},
 Ibrahim:{title:'Nabi Ibrahim AS',text:'Nabi Ibrahim AS dikenal sebagai salah satu nabi yang sangat kuat dalam mempertahankan tauhid. Sejak muda, beliau menolak penyembahan kepada berhala dan mempertanyakan keyakinan kaumnya yang menyembah sesuatu yang tidak dapat memberi manfaat maupun mudarat. Ibrahim AS berdakwah dengan hujah yang kuat dan mengajak manusia hanya menyembah Allah SWT. Karena keteguhannya, beliau menghadapi penentangan yang berat dari kaumnya. Ibrahim AS tetap tidak menyerah dan tidak meninggalkan keyakinannya. Beliau berani mempertahankan tauhid walaupun harus menghadapi tekanan dan permusuhan dari orang-orang yang menolak dakwahnya. Ibrahim AS juga diuji dengan berbagai perintah yang membutuhkan ketaatan luar biasa. Ketika diperintahkan menjalankan ujian besar bersama putranya, beliau menunjukkan bahwa ketaatan kepada Allah berada di atas segala sesuatu. Bersama Ismail AS, beliau juga membangun Ka\'bah sebagai tempat ibadah kepada Allah. Semua ujian tersebut menjadi bagian dari perjalanan Ibrahim AS dalam menunjukkan keikhlasan dan keteguhan iman. Kisah Nabi Ibrahim AS mengajarkan keberanian mempertahankan kebenaran, keteguhan tauhid, keikhlasan dalam menjalankan perintah Allah, kesabaran menghadapi ujian, serta kesediaan mendahulukan ketaatan kepada Allah di atas kepentingan pribadi. Kisah beliau juga mengingatkan bahwa mempertahankan keyakinan membutuhkan keberanian, kesabaran, dan kepercayaan penuh kepada Allah.'},
 Musa:{title:'Nabi Musa AS',text:'Nabi Musa AS diutus oleh Allah SWT untuk menyampaikan dakwah kepada Fir\'aun dan menyelamatkan Bani Israil dari penindasan. Musa AS mendapat dukungan dari saudaranya, Harun AS, dalam menjalankan tugas tersebut. Di hadapan Fir\'aun, Musa AS menyampaikan bahwa hanya Allah yang berhak disembah. Fir\'aun menolak dan menunjukkan kesombongannya, tetapi Allah memberikan berbagai mukjizat kepada Musa AS sebagai tanda kekuasaan-Nya. Ketika Bani Israil meninggalkan Mesir, mereka menghadapi pengejaran pasukan Fir\'aun. Dalam keadaan yang tampak sulit, Allah memberikan jalan keluar dan menyelamatkan Musa AS beserta orang-orang beriman. Fir\'aun dan pasukannya akhirnya tenggelam. Perjalanan Musa AS kemudian dipenuhi berbagai ujian dalam membimbing Bani Israil. Beliau harus menghadapi keluhan, ketakutan, dan ketidaktaatan kaumnya, tetapi tetap menjalankan amanah. Perjalanan tersebut menunjukkan bahwa menjadi seorang pemimpin dan pembimbing bukanlah tugas yang ringan. Musa AS tetap berusaha membimbing kaumnya meskipun menghadapi banyak tantangan. Kisah ini mengajarkan keberanian menghadapi kezaliman, kesabaran memimpin, tawakal kepada Allah ketika keadaan terasa mustahil, serta keyakinan bahwa pertolongan Allah dapat datang dari arah yang tidak disangka-sangka. Kisah Nabi Musa AS juga mengingatkan agar manusia tidak menyerah ketika menghadapi tekanan dan tetap berpegang pada petunjuk Allah ketika berada dalam keadaan sulit.'},
 Muhammad:{title:'Nabi Muhammad SAW',text:'Nabi Muhammad SAW adalah rasul terakhir yang diutus Allah SWT untuk menyampaikan risalah Islam kepada seluruh manusia. Beliau dikenal memiliki akhlak yang mulia, jujur, amanah, penyayang, dan sabar. Setelah menerima wahyu pertama, beliau mulai mengajak manusia menyembah Allah SWT dan meninggalkan kesyirikan serta kebiasaan buruk. Dakwah di Makkah menghadapi penolakan dan berbagai tekanan, tetapi Rasulullah SAW tetap teguh menyampaikan kebenaran. Beliau tidak berhenti mengajarkan tauhid dan memperbaiki akhlak meskipun menghadapi tantangan yang berat. Setelah hijrah ke Madinah, beliau membangun masyarakat yang berlandaskan iman, persaudaraan, keadilan, dan akhlak. Rasulullah SAW juga menghadapi berbagai ujian dan peperangan, namun beliau tetap mengajarkan kesabaran, kasih sayang, dan sikap memaafkan. Dalam kehidupan sehari-hari, beliau memberi teladan tentang menghormati orang lain, membantu yang lemah, menjaga amanah, serta berbuat baik kepada keluarga dan masyarakat. Rasulullah SAW juga mengajarkan umatnya untuk tidak sombong, menjaga lisan, menolong sesama, dan selalu kembali kepada Allah. Perjalanan dakwah beliau menunjukkan keteguhan dalam menyampaikan kebenaran sekaligus kelembutan dalam memperlakukan manusia. Kisah Nabi Muhammad SAW mengajarkan bahwa keberhasilan dakwah tidak hanya melalui perkataan, tetapi juga melalui akhlak dan keteladanan. Beliau adalah teladan bagi umat Islam dalam beribadah, bermuamalah, menghadapi ujian, menjaga amanah, dan menjalani kehidupan dengan penuh tanggung jawab. Kisah beliau juga menjadi pengingat agar umatnya berusaha menerapkan ajaran Islam dalam kehidupan sehari-hari melalui ibadah, akhlak yang baik, kepedulian kepada sesama, dan keteguhan ketika menghadapi ujian.'},
};
function loadKisahNabiComic(){const input=$('nabiComicInput'),out=$('nabiComicResult');if(!out)return;const name=(input?.value||'').trim();if(!name){out.innerHTML='<div class="errorMsg">Masukkan nama nabi terlebih dahulu.</div>';return;}const key=Object.keys(NABI_COMIC_STORIES).find(k=>k.toLowerCase()===name.toLowerCase());if(!key){out.innerHTML='<div class="errorMsg">Kisah untuk nama tersebut belum tersedia. Pilih salah satu nabi di atas.</div>';return;}const d=NABI_COMIC_STORIES[key];out.innerHTML=`<div class="nabiComicTitle">🕌 ${comicEsc(d.title)}</div><p>${comicEsc(d.text)}</p>`;}
async function loadGempaComic(){const el=$('gempaComicContent');if(!el)return;el.innerHTML='<div class="loading">Mengambil data terbaru BMKG...</div>';try{const r=await fetch('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const j=await r.json();const d=j.result||j.data||j;let g=d?.Infogempa?.gempa||d?.gempa||d?.Infogempa||d;if(Array.isArray(g))g=g[0];if(!g||typeof g!=='object')throw new Error('Data gempa tidak ditemukan');const v=(...keys)=>{for(const k of keys)if(g?.[k]!=null&&g[k]!=='')return g[k];return '-';};const waktu=(v('Tanggal','tanggal')!=='-'&&v('Jam','jam')!=='-')?`${v('Tanggal','tanggal')} • ${v('Jam','jam')}`:v('DateTime','Waktu','datetime');el.innerHTML=`<div class="gempaComicCard"><div class="gempaComicHead"><span>🌋 INFOGEMPA</span><b>M ${comicEsc(v('Magnitude','magnitude','Mag','mag'))}</b></div><div class="gempaComicLocation"><small>📍 LOKASI GEMPA</small><strong>${comicEsc(v('Wilayah','wilayah','Lokasi','lokasi'))}</strong></div><div class="gempaComicGrid"><div><small>WAKTU</small><b>${comicEsc(waktu)}</b></div><div><small>KEDALAMAN</small><b>${comicEsc(v('Kedalaman','kedalaman','Depth','depth'))}</b></div><div><small>LINTANG</small><b>${comicEsc(v('Lintang','lintang'))}</b></div><div><small>BUJUR</small><b>${comicEsc(v('Bujur','bujur'))}</b></div></div><div class="gempaComicNote">${comicEsc(v('Potensi','potensi'))}</div></div>`;}catch(e){el.innerHTML=`<div class="errorMsg">Gagal mengambil data gempa.<br>${comicEsc(e?.message||'Request gagal.')}</div>`;}}

async function runTikTok(input){
 const out=$("toolResult");
 const url=String(input||"").trim();
 if(!/^https?:\/\//i.test(url)){out.textContent="Masukkan link TikTok yang valid (http/https).";return;}
 out.innerHTML='<div class="loading">Memproses video TikTok…</div>';
 const encoded=encodeURIComponent(url);
 // Prioritaskan endpoint yang memang mengembalikan video. Endpoint lama /tiktok
 // tetap dipakai sebagai fallback karena respons upstream bisa berubah.
 const endpoints=[
  'https://api.azbry.com/api/download/tiktokv2?url='+encoded,
  'https://api.azbry.com/api/download/allinonev2?url='+encoded+'&format=mp4',
  'https://api.azbry.com/api/download/tiktok?url='+encoded,
  'https://api.azbry.com/api/download/allinone?url='+encoded
 ];
 let lastError="API tidak merespons.";
 for(const endpoint of endpoints){
  try{
   const r=await fetchAzbry(endpoint,{method:'GET',accept:'application/json, video/mp4, text/plain, */*'});
   const type=(r.headers.get('content-type')||'').toLowerCase();
   if(!r.ok){
    let msg='API '+r.status;
    try{const t=await r.text(); if(t) msg+=' — '+t.slice(0,180);}catch(_){ }
    lastError=msg; continue;
   }
   if(type.includes('video/')){
    const blob=await r.blob();
    const objectUrl=URL.createObjectURL(blob);
    showTikTokLinks([objectUrl],true);
    return;
   }
   if(type.includes('json')){
    const data=await r.json();
    const links=findTikTokLinks(data);
    if(links.length){showTikTokLinks(links);return;}
    lastError=extractApiError(data)||'URL video tidak ditemukan dari response API.';
    continue;
   }
   // Be tolerant of APIs that return a raw URL or JSON with a non-standard content-type.
   const raw=(await r.text()).trim();
   if(/^https?:\/\//i.test(raw)){
    showTikTokLinks([raw]);
    return;
   }
   try{
    const data=JSON.parse(raw);
    const links=findTikTokLinks(data);
    if(links.length){showTikTokLinks(links);return;}
    lastError=extractApiError(data)||'URL video tidak ditemukan dari response API.';
   }catch(_){
    lastError='Response API bukan JSON/video yang dapat dipakai.';
   }
  }catch(e){lastError=e?.message||String(e);}
 }
 out.innerHTML='<div class="errorMsg">Gagal memproses TikTok.<br><small>'+escapeHtml(lastError)+'</small><br><a href="'+escapeHtml(url)+'" target="_blank" rel="noopener">Buka TikTok asli</a></div>';
}
async function runFakeFF(input){
 const out=$("toolResult");
 const name=input.trim();
 if(!name){out.textContent="Masukkan nama terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">Membuat Fake FF…</div>';
 const endpoint='https://api.azbry.com/api/maker/fakeff?name='+encodeURIComponent(name);
 try{
   const r=await fetchAzbry(endpoint,{method:'GET'});
   if(!r.ok) throw new Error(`API ${r.status}`);
   const type=(r.headers.get('content-type')||'').toLowerCase();
   let data;
   if(type.includes('json')) data=await r.json();
   else {
     const blob=await r.blob();
     const u=URL.createObjectURL(blob);
     showFakeFFPreview(u, 'fakeff.png');
     return;
   }
   const links=findMediaLinks(data);
   if(!links.length) throw new Error('URL gambar tidak ditemukan dari response API.');
   showFakeFFPreview(links[0], 'fakeff.png');
 }catch(e){
   out.innerHTML=`<div class="errorMsg">Gagal memproses: ${escapeHtml(e.message||String(e))}</div>`;
 }
}
function showFakeFFPreview(url,name){
 const out=$("toolResult");
 out.innerHTML=`<img id="fakeFFResultImg" class="mediaPreview imagePreview" src="${escapeHtml(url)}" alt="Fake FF hasil" loading="lazy"><a class="downloadBtn" href="${escapeHtml(url)}" download="${name}" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh gambar (auto download gambar)</div>`;
 const im=$("fakeFFResultImg");
 if(im) setImageWithRelayFallback(im,url);
}
async function runInstagram(input){
 const out=$("toolResult");
 if(!/^https?:\/\//i.test(input)){out.textContent="Masukkan link Instagram yang valid (http/https).";return;}
 out.innerHTML='<div class="loading">Memproses media Instagram…</div>';
 const endpoint='https://api.azbry.com/api/download/instagram?url='+encodeURIComponent(input);
 try{
   const r=await fetchAzbry(endpoint,{method:'GET'});
   if(!r.ok) throw new Error(`API ${r.status}`);
   const type=(r.headers.get('content-type')||'').toLowerCase();
   if(!type.includes('json')) throw new Error('Response API bukan JSON.');
   const data=await r.json();
   const links=findMediaLinks(data);
   if(!links.length) throw new Error('Link media tidak ditemukan dari response API.');
   showInstagramMedia(links);
 }catch(e){
   out.innerHTML=`<div class="errorMsg">Gagal memproses: ${escapeHtml(e.message||String(e))}</div>`;
 }
}
function findMediaLinks(value){
 const found=[]; const seen=new Set();
 function add(v){
   if(typeof v!=="string" || !/^https?:\/\//i.test(v)) return;
   if(!seen.has(v)){seen.add(v);found.push(v);}
 }
 // URL media Instagram dari Azbry bisa berupa URL bertoken tanpa ekstensi .mp4.
 // Prioritaskan field videos/images/links agar URL seperti dl.snapcdn.app/get?... tetap terbaca.
 if(value && typeof value === "object"){
   const preferred=[value.videos,value.video,value.images,value.image,value.links];
   preferred.forEach(list=>{
     if(Array.isArray(list)) list.forEach(v=>{
       if(typeof v === "string") add(v);
       else if(v && typeof v === "object") Object.values(v).forEach(x=>add(x));
     });
     else if(typeof list === "string") add(list);
   });
 }
 if(!found.length){
   function walk(v){
     if(typeof v==="string"){add(v);return;}
     if(Array.isArray(v)){v.forEach(walk);return;}
     if(v && typeof v==="object")Object.values(v).forEach(walk);
   }
   walk(value);
 }
 return found;
}
function showInstagramMedia(links){
 const out=$("toolResult");
 const usable=[...new Set((links||[]).filter(v=>typeof v==="string"&&/^https?:\/\//i.test(v)))];
 if(!usable.length){out.innerHTML='<div class="errorMsg">Media Instagram tidak ditemukan.</div>';return;}
 out.innerHTML='';
 const first=usable[0];
 const isVideo=/\.(mp4|webm|mov|m3u8)(?:[?#]|$)/i.test(first) || /snapcdn\.app\/get/i.test(first) || /video/i.test(first);
 const wrap=document.createElement('div');
 wrap.className='instagramPreviewWrap';
 if(isVideo){
  const video=document.createElement('video');
  video.className='mediaPreview tiktokVideo';
  video.controls=true; video.playsInline=true; video.preload='metadata';
  video.setAttribute('aria-label','Preview video Instagram');
  video.src=first;
  video.addEventListener('error',()=>{
   status.textContent='Preview tidak dapat diputar di browser ini. Tekan BUKA MEDIA untuk mencoba membukanya langsung.';
  },{once:true});
  wrap.appendChild(video);
  const open=document.createElement('a');
  open.href=first; open.target='_blank'; open.rel='noopener'; open.className='downloadBtn';
  open.textContent='↗ BUKA MEDIA';
  open.style.display='inline-block'; open.style.marginTop='10px';
  wrap.appendChild(open);
 }else{
  const img=document.createElement('img');
  img.className='mediaPreview imagePreview'; img.alt='Preview media Instagram'; img.loading='eager'; img.src=first;
  wrap.appendChild(img);
  const open=document.createElement('a');
  open.href=first; open.target='_blank'; open.rel='noopener'; open.className='downloadBtn';
  open.textContent='↗ BUKA GAMBAR'; open.style.display='inline-block'; open.style.marginTop='10px';
  wrap.appendChild(open);
 }
 const hint=document.createElement('div');
 hint.className='hint'; hint.style.cssText='margin-top:12px;text-align:center';
 hint.textContent='Preview media siap. Untuk menyimpan, buka media lalu tekan menu titik tiga (⋮) dan pilih Download jika tersedia.';
 wrap.appendChild(hint);
 out.appendChild(wrap);
}

function extractApiError(value){
 if(typeof value==='string') return value.trim();
 if(!value||typeof value!=='object') return '';
 for(const k of ['message','error','msg','detail','status']){
  const v=value[k];
  if(typeof v==='string'&&v.trim()) return v.trim();
 }
 return '';
}
function findTikTokLinks(value){
 const candidates=[];
 const seen=new Set();
 const audioRe=/(^|[._\-/])(mp3|m4a|aac|wav|ogg)(?:[?#]|$)/i;
 const audioKeyRe=/(^|[._\[\]\s])(audio|music|sound|song)(?:$|[._\[\]\s])/i;
 const videoKeyRe=/(video|download|play|no[_-]?watermark|nowatermark|hd|mp4|media)/i;
 const add=(v,path='',boost=0)=>{
  if(typeof v!=='string' || !/^https?:\/\//i.test(v)) return;
  if(audioRe.test(v) || audioKeyRe.test(path)) return;
  if(seen.has(v)) return;
  let score=boost;
  if(/\.mp4(?:[?#]|$)/i.test(v)) score+=120;
  else if(/\.m3u8(?:[?#]|$)/i.test(v)) score+=80;
  if(videoKeyRe.test(path)) score+=45;
  if(/snapcdn|tiktok|ttcdn|video/i.test(v)) score+=5;
  candidates.push({url:v,score});
  seen.add(v);
 };
 const walk=(v,path='',boost=0)=>{
  if(typeof v==='string'){add(v,path,boost);return;}
  if(Array.isArray(v)){v.forEach((x,i)=>walk(x,path+'['+i+']',boost));return;}
  if(v&&typeof v==='object'){
   const type=typeof v.type==='string'?v.type.toLowerCase():'';
   const localBoost=/video|mp4/i.test(type)?80:(/audio|music/i.test(type)?-100:0);
   Object.entries(v).forEach(([k,x])=>{
    const next=path?path+'.'+k:k;
    const keyBoost=videoKeyRe.test(k)?35:(audioKeyRe.test(k)?-100:0);
    walk(x,next,boost+localBoost+keyBoost);
   });
  }
 };
 walk(value);
 candidates.sort((a,b)=>b.score-a.score);
 // MP4 video is the preferred result; HLS is retained as a last-resort preview source.
 return candidates.map(x=>x.url).filter((v,i,a)=>a.indexOf(v)===i);
}
function showTikTokLinks(links,objectUrl=false){
 const out=$("toolResult");
 const usable=[...new Set((links||[]).filter(Boolean))];
 if(!usable.length){out.innerHTML='<div class="errorMsg">Video TikTok tidak ditemukan.</div>';return;}
 out.innerHTML='';
 const wrap=document.createElement("div");
 wrap.className="tiktokPreviewWrap";
 const video=document.createElement("video");
 video.className="mediaPreview tiktokVideo";
 video.controls=true;
 video.playsInline=true;
 video.preload="metadata";
 video.setAttribute("aria-label","Preview video TikTok");
 const status=document.createElement("div");
 status.className="hint tiktokStatus";
 status.textContent="Memuat preview video…";
 const buttons=document.createElement("div");
 buttons.className="mediaBtns";
 let index=0;
 let failed=false;
 let currentSrc='';
 const tryNext=()=>{
  if(index>=usable.length){
   failed=true;
   status.textContent='Preview video tidak bisa diputar karena server membatasi akses media. Coba link lain.';
   return;
  }
  failed=false;
  currentSrc=usable[index++];
  video.src=currentSrc;
  video.load();
 };
 video.addEventListener("loadedmetadata",()=>{
  // Beberapa API mengembalikan audio-only URL. Jangan tampilkan itu sebagai preview.
  if(video.videoWidth===0 || video.videoHeight===0){
   tryNext();
   return;
  }
  status.textContent="Preview video siap — tekan ▶ untuk memutar.";
  video.classList.add("loaded");
  buttons.innerHTML='';
  const hint=document.createElement("div");
  hint.className="hint";
  hint.style.cssText="margin-top:12px;text-align:center";
  hint.textContent="Untuk menyimpan video, tekan titik tiga (⋮) pada pemutar atau setelah video dibuka, lalu pilih Download jika tersedia.";
  buttons.appendChild(hint);
 });
 video.addEventListener("canplay",()=>{
  if(video.videoWidth>0 && video.videoHeight>0) status.textContent="Preview video siap — tekan ▶ untuk memutar.";
 });
 video.addEventListener("error",()=>{if(!failed)tryNext();});
 wrap.appendChild(video);
 wrap.appendChild(status);
 wrap.appendChild(buttons);
 out.appendChild(wrap);
 tryNext();
}
async function runQuotesMaker(text){
 const out=$("toolResult");
 const author=$("quoteAuthor")?.value.trim()||"Seseorang";
 if(!text.trim()){out.textContent="Masukkan text quotes terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">Membuat quotes…</div>';
 const api='https://api.azbry.com/api/maker/quotesmaker?text='+encodeURIComponent(text.trim())+'&author='+encodeURIComponent(author);
 const img=document.createElement("img");
 img.className="mediaPreview imagePreview";
 img.alt="Hasil Quotes Maker";
 img.loading="eager";
 img.onload=()=>{
  out.innerHTML="";
  out.appendChild(img);
  const box=document.createElement("div");
  box.innerHTML=`<a class="downloadBtn" href="${escapeHtml(api)}" download="quotes-maker.png" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh gambar (auto download gambar)</div>`;
  out.appendChild(box);
 };
 img.onerror=()=>{out.innerHTML='<div class="errorMsg">Gagal membuat quotes dari API.</div>';};
 setImageWithRelayFallback(img,api);
}


async function runIGC(){
 const out=$("toolResult");
 const profile=$("igcProfile")?.value.trim();
 const name=$("igcName")?.value.trim();
 const participants=$("igcParticipants")?.value.trim()||"10";
 if(!profile){out.textContent="Masukkan link foto profil grup terlebih dahulu.";return;}
 if(!/^https?:\/\//i.test(profile)){out.textContent="Link profil harus berupa URL http/https yang valid.";return;}
 if(!name){out.textContent="Masukkan nama grup terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">Membuat iPhone Group Chat…</div>';
 try{
   const api='https://api.azbry.com/api/maker/igc?profile='+encodeURIComponent(profile)+'&nama='+encodeURIComponent(name)+'&peserta='+encodeURIComponent(participants);
   const img=document.createElement("img");
   img.className="mediaPreview imagePreview";
   img.alt="Hasil iPhone Group Chat Generator";
   img.loading="eager";
   img.onload=()=>{
     out.innerHTML="";
     out.appendChild(img);
     const box=document.createElement("div");
     box.innerHTML=`<a class="downloadBtn" href="${escapeHtml(api)}" download="iphone-group-chat.png" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh gambar (auto download gambar)</div>`;
     out.appendChild(box);
   };
   img.onerror=()=>{out.innerHTML='<div class="errorMsg">Gagal membuat iPhone Group Chat dari API. Pastikan link foto profil bisa diakses publik.</div>';};
   setImageWithRelayFallback(img,api);
 }catch(e){out.innerHTML=`<div class="errorMsg">Gagal memproses: ${escapeHtml(e.message||String(e))}</div>`;}
}
/* === TEMP MAIL / MAIL.TM === */
const TEMPMAIL_API = 'https://api.mail.tm';
let tempMailAddress = '';
let tempMailLogin = '';
let tempMailDomain = '';
let tempMailPassword = '';
let tempMailToken = '';
let tempMailAutoRefresh = null;

function tempMailSafe(v){return String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#111111;'}[s]));}
function setTempStatus(t){const e=document.getElementById('tempMailStatus');if(e)e.textContent=t||'';}
function setTempBusy(id,busy,label){const b=document.getElementById(id);if(!b)return;b.disabled=busy;if(busy){b.dataset.oldText=b.innerHTML;b.innerHTML='<span class="tm-spin">↻</span> '+label;}else if(b.dataset.oldText){b.innerHTML=b.dataset.oldText;}}
function tempMailRenderEmpty(title='Inbox kosong',sub='Belum ada pesan masuk. Tekan Refresh Inbox untuk mengecek lagi.'){const l=document.getElementById('tempInboxList');if(l)l.innerHTML=`<div class="tempmail-empty"><div>⌁</div><b>${tempMailSafe(title)}</b><small>${tempMailSafe(sub)}</small></div>`;}
function tempMailFormatDate(v){if(!v)return '';try{return new Date(v).toLocaleString('id-ID',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});}catch{return String(v)}}
async function tempMailFetch(path, options={}){
  const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),18000);
  try{
    const headers={Accept:'application/json',...(options.headers||{})};
    if(options.body)headers['Content-Type']='application/json';
    if(tempMailToken && !options.noAuth)headers.Authorization='Bearer '+tempMailToken;
    const {noAuth, ...fetchOptions}=options;
    const r=await fetch(TEMPMAIL_API+path,{cache:'no-store',...fetchOptions,headers,signal:ctl.signal});
    const raw=await r.text();let j=null;try{j=raw?JSON.parse(raw):{}}catch{}
    if(!r.ok){const detail=j?.detail||j?.message||j?.['hydra:description']||j?.title||('HTTP '+r.status);throw new Error(String(detail));}
    if(raw && !j)throw new Error('Respons API tidak valid.');
    return j||{};
  }catch(e){
    if(e?.name==='AbortError')throw new Error('API Mail.tm timeout. Coba lagi sebentar.');
    if(e?.message==='Failed to fetch')throw new Error('API Mail.tm tidak dapat diakses dari browser. Coba ganti jaringan atau periksa CORS.');
    throw e;
  }finally{clearTimeout(timer)}
}
async function createTempEmail(){
  if(!(await comicQuotaTryReserve('tempmail'))){setTempStatus(comicQuotaMessage('tempmail'));return;}
  let quotaCounted=true;
  clearInterval(tempMailAutoRefresh);tempMailAutoRefresh=null;
  setTempBusy('tempCreateBtn',true,'Membuat...');setTempStatus('Menghubungkan ke Mail.tm...');
  try{
    const domainsResponse=await tempMailFetch('/domains?page=1',{method:'GET',noAuth:true});
    const domains=(domainsResponse?.['hydra:member']||[]).filter(d=>d?.domain&&d?.isActive&&!d?.isPrivate);
    if(!domains.length)throw new Error('Mail.tm tidak menyediakan domain publik saat ini.');
    let account=null, chosen=null, password='Lx!'+Math.random().toString(36).slice(2,12)+Date.now().toString(36);
    for(const d of domains.slice(0,5)){
      const username='laxx'+Math.random().toString(36).slice(2,10)+Date.now().toString(36).slice(-4);
      const address=username+'@'+d.domain;
      try{account=await tempMailFetch('/accounts',{method:'POST',noAuth:true,body:JSON.stringify({address,password})});chosen={address,username,domain:d.domain};break;}
      catch(err){if(!/already|exist|422|domain|invalid/i.test(err.message))throw err;}
    }
    if(!account||!chosen)throw new Error('Gagal membuat akun. Coba tekan Create Email lagi.');
    const auth=await tempMailFetch('/token',{method:'POST',noAuth:true,body:JSON.stringify({address:chosen.address,password})});
    if(!auth?.token)throw new Error('Akun dibuat tetapi token login tidak diterima API.');
    tempMailAddress=chosen.address;tempMailLogin=chosen.username;tempMailDomain=chosen.domain;tempMailPassword=password;tempMailToken=auth.token;
    const emailEl=document.getElementById('tempEmailAddress');if(emailEl)emailEl.textContent=tempMailAddress;
    const copyBtn=document.getElementById('tempCopyBtn');if(copyBtn)copyBtn.disabled=false;
    const count=document.getElementById('tempInboxCount');if(count)count.textContent='0 pesan';
    tempMailRenderEmpty('Inbox siap','Alamat aktif. Menunggu pesan masuk...');
    setTempStatus('Email aktif ✓ • Mail.tm terhubung.');
    quotaCounted=false;
    await checkTempInbox(true);
    tempMailAutoRefresh=setInterval(()=>{if(tempMailToken)checkTempInbox(true)},12000);
  }catch(e){
    if(quotaCounted)comicQuotaRefund('tempmail');
    tempMailAddress='';tempMailLogin='';tempMailDomain='';tempMailPassword='';tempMailToken='';
    const emailEl=document.getElementById('tempEmailAddress');if(emailEl)emailEl.textContent='Gagal membuat email';
    setTempStatus('Gagal membuat email: '+(e?.message||'Request gagal.'));
    console.error('TempMail create:',e);
  }finally{setTempBusy('tempCreateBtn',false);await refreshComicQuotaBadge('tempmail');}
}
async function checkTempInbox(silent=false){
  if(!tempMailToken){if(!silent)setTempStatus('Buat email terlebih dahulu.');return;}
  if(!silent)setTempBusy('tempInboxBtn',true,'Refresh...');
  try{
    const mails=await tempMailFetch('/messages?page=1');
    const list=Array.isArray(mails?.['hydra:member'])?mails['hydra:member']:[];
    const count=document.getElementById('tempInboxCount');if(count)count.textContent=`${list.length} pesan`;
    const box=document.getElementById('tempInboxList');
    if(!list.length)tempMailRenderEmpty('Belum ada pesan','Inbox kosong. Coba Refresh lagi setelah pesan dikirim.');
    else if(box){
      box.innerHTML=list.map(m=>{
        const from=m?.from?.address||m?.from?.name||m?.from||m?.from_email||'Pengirim tidak diketahui';
        const subject=m?.subject||'Tanpa subjek';
        const intro=m?.intro||m?.text||m?.content||'Klik pesan untuk melihat detail.';
        return `<button class="tempmail-mail" type="button" onclick="openTempMessage('${tempMailSafe(m?.id||'')}')"><span class="tm-mail-icon">●</span><span class="tm-mail-main"><b>${tempMailSafe(subject)}</b><small>${tempMailSafe(from)}</small><p>${tempMailSafe(intro)}</p></span><span class="tm-mail-date">${tempMailSafe(tempMailFormatDate(m?.createdAt||m?.receivedAt||m?.date))}</span></button>`;
      }).join('');
    }
    if(!silent)setTempStatus(`Inbox diperbarui ✓ • ${list.length} pesan ditemukan.`);
  }catch(e){if(!silent)setTempStatus('Gagal refresh inbox: '+(e?.message||'Request gagal.'));console.error('TempMail inbox:',e);}
  finally{if(!silent)setTempBusy('tempInboxBtn',false);}
}
let tempMailMessageLink = '';
let tempMailMessageCodes = [];
function tempMailMessageSource(m){
  const html=String(m?.body||(Array.isArray(m?.html)?m.html.join('\n'):m?.html)||'');
  let text=String(m?.textBody||m?.text||m?.content||m?.intro||'');
  if(html){try{const doc=new DOMParser().parseFromString(html,'text/html');text+='\n'+(doc.body?.textContent||'');}catch{}}
  return text;
}
function extractTempMessageLink(m){
  const html=String(m?.body||(Array.isArray(m?.html)?m.html.join('\n'):m?.html)||'');
  if(html){try{const doc=new DOMParser().parseFromString(html,'text/html');const a=[...doc.querySelectorAll('a[href]')];const preferred=a.find(x=>/sign in|login|verify|verification|activation|confirm/i.test((x.textContent||'')+' '+x.getAttribute('href')));if(preferred?.href&&/^https?:\/\//i.test(preferred.href))return preferred.href;const any=a.find(x=>/^https?:\/\//i.test(x.getAttribute('href')||''));if(any)return any.href;}catch{}}
  const text=tempMailMessageSource(m),match=text.match(/https?:\/\/[^\s<>'"\)]+/i);return match?match[0].replace(/[.,;]+$/,''):'';
}
function extractTempMessageCodes(m){
  const text=tempMailMessageSource(m),found=[];const add=v=>{v=String(v||'').trim();if(v&&!found.includes(v))found.push(v)};
  const contextual=/(?:verification|verify|confirmation|security|otp|one[- ]?time|access|login|sign[ -]?in|activation)\s*(?:code|kode|pin)?\s*(?:is|:|=|-)?\s*([A-Z0-9]{4,8})\b/gi;let m1;while((m1=contextual.exec(text))!==null)add(m1[1]);
  const labelled=/(?:code|kode|otp|pin)\s*(?:is|:|=|-)?\s*([A-Z0-9]{4,8})\b/gi;let m2;while((m2=labelled.exec(text))!==null)add(m2[1]);
  (text.match(/\b\d{4,8}\b/g)||[]).forEach(v=>{if(!/^19\d{2}$|^20\d{2}$/.test(v))add(v)});
  text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean).forEach(line=>{const hit=line.match(/^([A-Z0-9]{4,8})$/i);if(hit)add(hit[1])});
  return found.slice(0,8);
}
async function openTempMessage(id){
  if(!id||!tempMailToken)return;
  try{
    const msg=await tempMailFetch('/messages/'+encodeURIComponent(id));
    const from=msg?.from?.address||msg?.from?.name||'Pengirim tidak diketahui';const html=Array.isArray(msg?.html)?msg.html.join('\n'):msg?.html;const text=msg?.text||html||msg?.intro||'Tidak ada isi teks.';const subject=msg?.subject||'Tanpa subjek';
    tempMailMessageLink=extractTempMessageLink(msg);tempMailMessageCodes=extractTempMessageCodes(msg);
    const modal=document.getElementById('tempMailModal'),linkBox=document.getElementById('tempModalLinkBox'),codeBox=document.getElementById('tempModalCodeBox');
    if(modal){
      document.getElementById('tempModalSubject').textContent=subject;document.getElementById('tempModalFrom').textContent=from;document.getElementById('tempModalBody').textContent=text;
      if(linkBox)linkBox.hidden=!tempMailMessageLink;const lt=document.getElementById('tempModalLinkText');if(lt)lt.textContent=tempMailMessageLink?'Link siap disalin.':'Link tidak ditemukan di isi email.';
      if(codeBox)codeBox.hidden=!tempMailMessageCodes.length;const codeText=document.getElementById('tempModalCodeText');if(codeText)codeText.textContent=tempMailMessageCodes.length?`${tempMailMessageCodes.length} kode terdeteksi • tekan kode untuk menyalin.`:'Kode tidak ditemukan di isi email.';
      const codesEl=document.getElementById('tempModalCodes');if(codesEl)codesEl.innerHTML=tempMailMessageCodes.map((code,i)=>`<button class="tm-copy-code" type="button" data-code-index="${i}" onclick="copyTempMessageCode(${i},this)">${tempMailSafe(code)}</button>`).join('');
      modal.classList.add('show');
    }
  }catch(e){setTempStatus('Gagal membuka pesan: '+(e?.message||'Request gagal.'));console.error('TempMail message:',e);}
}
function closeTempMessage(){document.getElementById('tempMailModal')?.classList.remove('show');tempMailMessageLink='';tempMailMessageCodes=[];}
async function copyTempMessageLink(){if(!tempMailMessageLink){setTempStatus('Link tidak ditemukan di email.');return;}try{await navigator.clipboard.writeText(tempMailMessageLink);const b=document.getElementById('tempCopyLinkBtn');if(b){const old=b.textContent;b.textContent='✓ Copied';setTimeout(()=>b.textContent=old,1400);}setTempStatus('Link dari email berhasil disalin ✓');}catch(e){const ta=document.createElement('textarea');ta.value=tempMailMessageLink;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');setTempStatus('Link dari email berhasil disalin ✓');}catch{setTempStatus('Tidak bisa menyalin link otomatis.');}ta.remove();}}
async function copyTempMessageCode(index,button){const code=tempMailMessageCodes?.[index];if(!code)return;try{await navigator.clipboard.writeText(code);}catch(e){const ta=document.createElement('textarea');ta.value=code;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');}catch{setTempStatus('Tidak bisa menyalin kode otomatis.');}ta.remove();}if(button){const old=button.textContent;button.textContent='✓ '+code;button.classList.add('copied');setTimeout(()=>{button.textContent=old;button.classList.remove('copied')},1400);}setTempStatus('Kode '+code+' berhasil disalin ✓');}
async function copyTempEmail(){if(!tempMailAddress){setTempStatus('Belum ada email untuk disalin.');return;}try{await navigator.clipboard.writeText(tempMailAddress);setTempStatus('Alamat email disalin ✓');}catch(e){setTempStatus('Tidak bisa menyalin otomatis.');}}


function currentAction(){
 if(window.__pageAction)return window.__pageAction;
 const title=$("modalTitle")?.textContent||"";
 return tools.find(t=>t.name===title)?.action;
}
function clearTool(){
 const action=currentAction();
 if(action) delete toolState[action];
 const b=getToolRoot();
 if(!b)return;
 b.querySelectorAll("input, textarea, select").forEach(x=>{
  if(x.type==="file") x.value="";
  else if(x.id==="igcParticipants") x.value="10";
  else if(x.tagName==="SELECT") x.selectedIndex=0;
  else x.value="";
 });
 const result=$("toolResult");
 if(result) result.innerHTML="";
 $("qrPreview")?.replaceChildren();
}
function openDedicatedTool(action){
 const t=tools.find(x=>x.action===action);
 if(!t)return;
 window.__pageAction=action;
 document.body.classList.add("tool-page-active");
 const title=$("toolPageTitle"), icon=$("toolPageIcon"), body=$("toolPageBody");
 if(title)title.textContent=t.name;
 if(icon)icon.textContent=t.icon;
 if(body)body.innerHTML=toolUI(action); if(action==="mediatourl"){var _mf=document.getElementById("mediaUrlFrame");if(_mf)_mf.srcdoc=atob(MEDIA_URL_B64);}
 document.title=`${t.name} • Comic Tools`;
 // Inisialisasi spesifik dijalankan melalui dispatcher di bawah.
 restoreToolState(action);
 if(COMIC_QUOTA_LIMITS[action]) refreshComicQuotaBadge(action);
 if(action==="quran") loadQuranComic();
 if(action==="cnn") loadCNNComic();
 if(action==="gempa") loadGempaComic();
 if(action==="jadwaltv"){ initTVComic(); const input=$("tvInput"); if(input) setTimeout(()=>input.focus(),80); }
 if(action==="cuaca"){ initWeatherComic(); const input=$("weatherInput"); if(input) setTimeout(()=>input.focus(),80); }
 window.scrollTo({top:0,behavior:"smooth"});
}
function closeDedicatedTool(){
 saveToolState();
 document.body.classList.remove("tool-page-active");
 window.__pageAction=null;
 document.title="Comic Tools";
 window.scrollTo({top:0,behavior:"smooth"});
}



function setIPCity(value){const el=$("ipInput");if(el)el.value=value;}
function ipCell(label,value,icon="•"){const text=(value===undefined||value===null||value==="")?"-":String(value);return `<div class="ipCell"><span class="ipCellIcon">${icon}</span><div><small>${escapeHtml(label)}</small><b>${escapeHtml(text)}</b></div></div>`;}
async function loadIPCheckerComic(){
 const out=$("ipResult"),btn=$("ipCheckBtn"); if(!out)return; const raw=String($("ipInput")?.value||"").trim();
 const ipv4=/^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/; const ipv6=/^[0-9a-f:]+$/i;
 if(raw&&!ipv4.test(raw)&&!ipv6.test(raw)){out.innerHTML='<div class="ipError">Masukkan alamat IPv4/IPv6 yang valid.</div>';return;}
 if(!(await comicQuotaTryReserve('ipchecker'))){out.innerHTML=comicQuotaError('ipchecker');await refreshComicQuotaBadge('ipchecker');return;}
 let quotaCounted=true;
 if(btn){btn.disabled=true;btn.textContent="⏳ MEMERIKSA...";} out.innerHTML='<div class="ipLoading">🌐 Mengambil informasi IP…</div>';
 const endpoint=raw?`https://ipapi.co/${encodeURIComponent(raw)}/json/`:`https://ipapi.co/json/`;
 try{const r=await fetch(endpoint,{headers:{Accept:"application/json"},cache:"no-store"});const data=await r.json();if(!r.ok||data.error)throw new Error(data.reason||data.detail||`API ${r.status}`);const flag=data.country_code?String(data.country_code).toUpperCase():"🌐";out.innerHTML=`<div class="ipMainCard"><div class="ipMainTop"><span class="ipFlag">${escapeHtml(flag)}</span><div><small>IP TERDETEKSI</small><h3>${escapeHtml(data.ip||raw||"-")}</h3><p>${escapeHtml(data.country_name||data.country||"Lokasi tidak tersedia")}</p></div></div><div class="ipGrid">${ipCell("KOTA",data.city,"🏙️")}${ipCell("REGION",data.region,"📍")}${ipCell("NEGARA",data.country_name||data.country,"🌍")}${ipCell("KODE POS",data.postal,"🏷️")}${ipCell("ISP / ORGANISASI",data.org,"🏢")}${ipCell("ASN",data.asn,"🔢")}${ipCell("TIMEZONE",data.timezone,"🕐")}${ipCell("KOORDINAT",data.latitude!=null&&data.longitude!=null?`${data.latitude}, ${data.longitude}`:"-","🗺️")}</div></div>`;}catch(e){if(quotaCounted)comicQuotaRefund('ipchecker');out.innerHTML=`<div class="ipError"><b>Gagal mengecek IP</b><span>${escapeHtml(e.message||String(e))}</span><small>Quota tidak dipotong karena request gagal.</small></div>`;}finally{if(btn){btn.disabled=false;btn.textContent="🌐 CEK IP";} await refreshComicQuotaBadge('ipchecker');}
}


const QURAN_API='https://api.alquran.cloud/v1';
let quranSurahs=[];
let quranAll=[];
let quranAyahs=[];
let quranLatinAyahs=[];
let quranTranslationAyahs=[];
let quranNextIndex=0;
const QURAN_CHUNK_SIZE=10;
async function loadQuranComic(){
 const box=$("quranList"); if(!box)return;
 if(box.dataset.loading==="1")return;
 box.dataset.loading="1"; box.innerHTML='<div class="quranLoading">Memuat daftar surah…</div>';
 const ctl=new AbortController(), timer=setTimeout(()=>ctl.abort(),12000);
 try{
  const r=await fetch(QURAN_API+'/surah',{headers:{Accept:'application/json'},cache:'no-store',signal:ctl.signal});
  const j=await r.json(); if(!r.ok||j.code!==200)throw new Error(j.status||`HTTP ${r.status}`);
  quranSurahs=j.data||[]; quranAll=quranSurahs; renderQuranSurahList(quranSurahs);
 }catch(e){box.innerHTML=`<div class="quranError">${e?.name==='AbortError'?'Waktu habis (12 detik). API Quran lambat atau tidak merespons.':'Gagal memuat daftar surah.'}<br><small>${escapeHtml(e.message||String(e))}</small><br><button type="button" class="actionBtn secondary" onclick="loadQuranComic()">Coba lagi</button></div>`;}finally{clearTimeout(timer);box.dataset.loading="0";}
}
function renderQuranSurahList(list){
 const box=$("quranList"); if(!box)return;
 if(!list.length){box.innerHTML='<div class="quranEmpty">Surah tidak ditemukan.</div>';return;}
 box.innerHTML=list.map(x=>`<button class="quranSurah" type="button" onclick="openQuranSurah(${Number(x.number)})"><span class="quranNum">${Number(x.number)}</span><span class="quranSurahText"><b>${escapeHtml(x.englishName||x.name)}</b><small>${escapeHtml(x.englishNameTranslation||'')} · ${Number(x.numberOfAyahs)} ayat</small></span><strong dir="rtl">${escapeHtml(x.name||'')}</strong><span class="quranArrow">›</span></button>`).join('');
}
function filterQuranSurah(v){const q=String(v||'').trim().toLowerCase();renderQuranSurahList(quranAll.filter(x=>!q||String(x.number).includes(q)||String(x.name||'').toLowerCase().includes(q)||String(x.englishName||'').toLowerCase().includes(q)||String(x.englishNameTranslation||'').toLowerCase().includes(q)));}
async function openQuranSurah(id){
 const list=$("quranList"), reader=$("quranReader"), head=$("quranReaderHead"), content=$("quranContent"); if(!reader||!content)return;
 list.hidden=true; reader.hidden=false; head.innerHTML='<div class="quranLoading">Memuat ayat…</div>'; content.innerHTML=''; quranAyahs=[]; quranLatinAyahs=[]; quranTranslationAyahs=[]; quranNextIndex=0; window.scrollTo(0,0);
 const ctl=new AbortController(), timer=setTimeout(()=>ctl.abort(),15000);
 try{
  const r=await fetch(QURAN_API+`/surah/${id}/editions/quran-uthmani,en.transliteration,id.indonesian`,{headers:{Accept:'application/json'},cache:'no-store',signal:ctl.signal});
  const j=await r.json(); if(!r.ok||j.code!==200)throw new Error(j.status||'Gagal memuat surah');
  const editions=j.data||[]; const ar=editions.find(x=>x.edition?.identifier==='quran-uthmani')||editions[0]; const latin=editions.find(x=>x.edition?.identifier==='en.transliteration'); const idn=editions.find(x=>x.edition?.identifier==='id.indonesian');
  const surah=ar?.name?ar:(quranAll.find(x=>x.number===id)||{});
  head.innerHTML=`<div class="quranTitleArabic" dir="rtl">${escapeHtml(surah.name||'')}</div><h2>${escapeHtml(surah.englishName||'')}</h2><p>${escapeHtml(surah.englishNameTranslation||'')} · ${Number(surah.numberOfAyahs||ar?.numberOfAyahs||0)} ayat</p>`;
  quranAyahs=ar?.ayahs||[]; quranLatinAyahs=latin?.ayahs||[]; quranTranslationAyahs=idn?.ayahs||[]; content.innerHTML=''; renderNextQuranChunk();
 }catch(e){head.innerHTML='';content.innerHTML=`<div class="quranError">${e?.name==='AbortError'?'Waktu habis (15 detik). API Quran tidak merespons.':'Gagal memuat Quran.'}<br><small>${escapeHtml(e.message||String(e))}</small><br><button type="button" class="actionBtn secondary" onclick="openQuranSurah(${Number(id)})">Coba lagi</button></div>`;}finally{clearTimeout(timer);}
}
function renderNextQuranChunk(){
 const content=$("quranContent"); if(!content||!quranAyahs.length)return;
 const oldMore=content.querySelector('.quranMore'); if(oldMore)oldMore.remove();
 const oldProgress=content.querySelector('.quranProgress'); if(oldProgress)oldProgress.remove();
 const start=quranNextIndex, end=Math.min(start+QURAN_CHUNK_SIZE,quranAyahs.length), frag=document.createDocumentFragment();
 for(let i=start;i<end;i++){
  const a=quranAyahs[i], article=document.createElement('article'); article.className='quranAyah';
  article.innerHTML=`<div class="quranAyahTop"><span>${a.numberInSurah||i+1}</span></div><div class="quranArabic" dir="rtl">${escapeHtml(a.text||'')}</div>${quranLatinAyahs[i]?`<div class="quranLatin">${escapeHtml(quranLatinAyahs[i].text||'')}</div>`:''}${quranTranslationAyahs[i]?`<div class="quranTranslation">${escapeHtml(quranTranslationAyahs[i].text||'')}</div>`:''}`;
  frag.appendChild(article);
 }
 content.appendChild(frag); quranNextIndex=end;
 if(quranNextIndex<quranAyahs.length){
  const more=document.createElement('button'); more.type='button'; more.className='quranMore'; more.textContent=`Muat 10 ayat berikutnya (${quranNextIndex}/${quranAyahs.length})`; more.onclick=()=>{more.disabled=true;renderNextQuranChunk();}; content.appendChild(more);
  const progress=document.createElement('div'); progress.className='quranProgress'; progress.textContent=`Menampilkan ayat 1–${quranNextIndex} dari ${quranAyahs.length}`; content.appendChild(progress);
 }
}
function closeQuranReader(){const r=$("quranReader"),l=$("quranList");if(r)r.hidden=true;if(l)l.hidden=false;window.scrollTo(0,0);}


async function fetchAzbry(url, options={}){
  const directOptions={...options, headers:{Accept:options.accept||"application/json, text/plain, */*", ...(options.headers||{})}};
  try{
    const r=await fetch(url,directOptions);
    if(r.ok) return r;
    // Retry through a CORS relay for local-file/QuickEdit previews.
    if(r.status>=400) throw new Error(`API ${r.status}`);
    return r;
  }catch(primaryError){
    if(options.method && String(options.method).toUpperCase()!=="GET") throw primaryError;
    const relay="https://api.allorigins.win/raw?url="+encodeURIComponent(url);
    try{
      const r=await fetch(relay,{method:"GET",cache:"no-store"});
      if(!r.ok) throw new Error(`Relay ${r.status}`);
      return r;
    }catch(relayError){
      throw primaryError;
    }
  }
}

function azbryRelayUrl(url){
  return "https://api.allorigins.win/raw?url="+encodeURIComponent(url);
}
function setImageWithRelayFallback(img,directUrl){
  let retried=false;
  img.onerror=function(){
    if(retried)return;
    retried=true;
    img.src=azbryRelayUrl(directUrl);
  };
  img.src=directUrl;
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));}
async function runRemoveBG(input){
 const out=$("toolResult");
 const url=(input||"").trim();
 if(!url){out.textContent="Masukkan URL gambar terlebih dahulu.";return;}
 if(!/^https?:\/\//i.test(url)){out.textContent="URL gambar harus diawali http:// atau https://";return;}
 out.innerHTML='<div class="loading">Memproses remove background…</div>';
 try{
   const api="https://api.azbry.com/api/tools/removebg?url="+encodeURIComponent(url);
   const r=await fetchAzbry(api,{method:"GET",accept:"image/*, application/json, */*"});
   if(!r.ok) throw new Error(`API ${r.status}`);
   const type=(r.headers.get("content-type")||"").toLowerCase();
   if(type.includes("image/")){
     const blob=await r.blob();
     const u=URL.createObjectURL(blob);
     out.innerHTML=`<img class="mediaPreview imagePreview" src="${u}" alt="Hasil Remove BG" loading="eager"><a class="downloadBtn" href="${u}" download="remove-bg.png">⬇ DOWNLOAD GAMBAR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh hasil Remove BG.</div>`;
     return;
   }
   if(type.includes("json")){
     const data=await r.json();
     const media=findMediaLinks(data);
     if(media.length){
       const resultUrl=media[0];
       out.innerHTML=`<img class="mediaPreview imagePreview" src="${escapeHtml(resultUrl)}" alt="Hasil Remove BG" loading="eager"><a class="downloadBtn" href="${escapeHtml(resultUrl)}" download="remove-bg.png" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh hasil Remove BG.</div>`;
       return;
     }
     throw new Error(data.message||"Hasil gambar tidak ditemukan.");
   }
   throw new Error("Response API bukan gambar atau JSON.");
 }catch(e){
   out.innerHTML=`<div class="errorMsg">Gagal remove background: ${escapeHtml(e.message||String(e))}</div>`;
 }
}
function showDownload(blob,name){
 const out=$("toolResult");
 const u=URL.createObjectURL(blob);
 out.innerHTML="";
 const img=document.createElement("img");
 img.className="mediaPreview imagePreview demoPreview";
 img.alt="Preview hasil "+name;
 img.loading="eager";
 img.src=u;
 out.appendChild(img);
 const box=document.createElement("div");
 box.className="mediaBtns";
 box.innerHTML=`<a class="downloadBtn" href="${u}" download="${escapeHtml(name)}">⬇ DOWNLOAD GAMBAR</a>`;
 out.appendChild(box);
 const hint=document.createElement("div");
 hint.className="hint";hint.style.cssText="margin-top:12px;text-align:center";
 hint.textContent="Preview hasil — tekan tombol untuk mengunduh.";
 out.appendChild(hint);
}
async function runIQC(input){
 const out=$("toolResult");
 const text=input.trim();
 if(!text){out.textContent="Masukkan pesan terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">Membuat IQC…</div>';
 const api='https://api.azbry.com/api/maker/iqc?text='+encodeURIComponent(text);
 const img=document.createElement("img");
 img.alt="Hasil IQC";
 img.loading="eager";
 img.decoding="async";
 img.style.cssText='max-width:100%;max-height:520px;border:3px solid var(--black);border-radius:12px;display:block;margin:0 auto';
 img.onload=()=>{out.innerHTML='';out.appendChild(img);const box=document.createElement("div");box.innerHTML=`<a class="downloadBtn" href="${api}" download="iqc.png" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh gambar (auto download gambar)</div>`;out.appendChild(box);};
 img.onerror=()=>{out.innerHTML='<div class="errorMsg">Gagal memuat hasil IQC dari API Azbry.</div>';};
 img.src=api;
}
async function runImg2QR(){
 const out=$("toolResult");
 const file=$("fileInput")?.files?.[0];
 if(!file){out.textContent="Pilih gambar terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">Memproses gambar menjadi QR…</div>';
 try{
   const form=new FormData();
   form.append("file",file,file.name);
   const r=await fetch("https://api.azbry.com/api/tools/img2qr",{method:"POST",body:form,headers:{Accept:"image/*, application/json, */*"}});
   if(!r.ok) throw new Error(`API ${r.status}`);
   const type=(r.headers.get("content-type")||"").toLowerCase();
   if(type.includes("image/")){
     const blob=await r.blob();
     const u=URL.createObjectURL(blob);
     out.innerHTML=`<img class="mediaPreview imagePreview" src="${u}" alt="Hasil Image To QR" loading="eager"><a class="downloadBtn" href="${u}" download="image-to-qr.png">⬇ DOWNLOAD QR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh QR (auto download QR)</div>`;
     return;
   }
   if(type.includes("json")){
     const data=await r.json();
     const media=findMediaLinks(data);
     if(media.length){
       const url=media[0];
       out.innerHTML=`<img class="mediaPreview imagePreview" src="${escapeHtml(url)}" alt="Hasil Image To QR" loading="eager"><a class="downloadBtn" href="${escapeHtml(url)}" download="image-to-qr.png" target="_blank" rel="noopener">⬇ DOWNLOAD QR</a><div class="hint" style="margin-top:12px;text-align:center">Tekan button download untuk mengunduh QR (auto download QR)</div>`;
       return;
     }
     throw new Error(data.message||"Link hasil QR tidak ditemukan.");
   }
   throw new Error("Response API bukan gambar atau JSON.");
 }catch(e){
   out.innerHTML=`<div class="errorMsg">Gagal membuat QR: ${escapeHtml(e.message||String(e))}</div>`;
 }
}

async function runDana(input){
 const out=$("toolResult");
 const raw=String(input||"").replace(/[^0-9]/g,"");
 if(!raw||Number(raw)<=0){out.textContent="Masukkan nominal terlebih dahulu.";return;}
 const api="https://api.azbry.com/api/maker/fakedana?amount="+encodeURIComponent(raw);
 out.innerHTML='<div class="loading">Membuat Fake Dana…</div>';
 const renderImage=(src,downloadName="fake-dana.png")=>{
  out.innerHTML='';
  const img=document.createElement("img");
  img.className="mediaPreview imagePreview danaPreview";
  img.alt="Hasil Fake Dana";
  img.loading="eager";
  img.onload=()=>{
   const box=document.createElement("div");
   box.className="mediaBtns";
   box.innerHTML=`<a class="downloadBtn" href="${escapeHtml(src)}" download="${downloadName}" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a>`;
   out.appendChild(box);
  };
  img.onerror=()=>{
   out.innerHTML='<div class="errorMsg">Gambar Fake Dana gagal dimuat dari API.<br><small>Coba lagi beberapa detik kemudian jika server sedang rate-limit.</small></div>';
  };
  img.src=src;
  out.appendChild(img);
 };
 // Direct image first: this works even when browser fetch/CORS blocks API responses.
 renderImage(api);
}
async function runBrat(input){
 const out=$("toolResult");
 const text=String(input||"").trim();
 if(!text){out.textContent="Masukkan teks terlebih dahulu.";return;}
 out.innerHTML='<div class="loading">Membuat BRAT dari API…</div>';
 const api="https://api.azbry.com/api/maker/brat?text="+encodeURIComponent(text);
 const renderImage=(src)=>{
  out.innerHTML='';
  const img=document.createElement("img");
  img.className="mediaPreview imagePreview bratPreview";
  img.alt="Hasil BRAT Generator";
  img.loading="eager";
  let retried=false;
  img.onerror=()=>{
   if(!retried){retried=true;img.src=azbryRelayUrl(src);return;}
   out.innerHTML='<div class="errorMsg">Gagal memuat hasil BRAT dari API.<br><small>Pastikan API sedang online lalu coba lagi.</small></div>';
  };
  img.onload=()=>{
   const box=document.createElement("div");
   box.className="mediaBtns";
   box.innerHTML=`<a class="downloadBtn" href="${escapeHtml(src)}" download="brat.png" target="_blank" rel="noopener">⬇ DOWNLOAD GAMBAR</a>`;
   out.appendChild(box);
  };
  img.src=src;
  out.appendChild(img);
 };
 renderImage(api);
}
function drawDemo(a){
 const c=document.createElement("canvas");
 c.width=1000;c.height=650;
 const x=c.getContext("2d");
 const title=($("toolInput")?.value||"COMIC TOOL").trim()||"COMIC TOOL";
 const sub=($("subInput")?.value||"MADE WITH TOOLS").trim();
 x.clearRect(0,0,c.width,c.height);
 x.fillStyle="#fff6cf";x.fillRect(0,0,c.width,c.height);
 x.strokeStyle="#111";x.lineWidth=12;x.strokeRect(20,20,960,610);
 if(a==="brat"){
   x.fillStyle="#b8ff00";x.fillRect(70,70,860,510);
   x.strokeStyle="#000";x.lineWidth=8;x.strokeRect(70,70,860,510);
   x.fillStyle="#000";
   x.font="900 82px Arial, sans-serif";x.textAlign="center";x.textBaseline="middle";
   const words=title.slice(0,32).split(/\s+/);
   let lines=[],line="";
   for(const w of words){const test=line?line+" "+w:w;if(x.measureText(test).width>760&&line){lines.push(line);line=w}else line=test}
   if(line)lines.push(line);
   const shown=lines.slice(0,4);
   const lineH=92;
   const start=325-(shown.length-1)*lineH/2;
   shown.forEach((t,i)=>x.fillText(t,500,start+i*lineH));
 }else{
   x.fillStyle="#ed174c";x.font="900 64px Impact, Arial, sans-serif";x.textAlign="center";
   x.fillText(title.slice(0,25),500,320);
   x.font="700 34px Arial, sans-serif";x.fillStyle="#111";
   x.fillText(sub.slice(0,45),500,405);
 }
 c.toBlob(b=>showDownload(b,a+".png"),"image/png");
}
function toggleNav(){document.querySelector(".nav").classList.toggle("mobileOpen");}
$("toolModal")?.addEventListener("click",e=>{if(e.target.id==="toolModal")closeTool();});
initHeroStatus();
render();



/* ===== Generic Comic console wrapper: execution UI for every main tool action ===== */
(function(){
  const ignored=new Set(['RESET','↻ MUAT ULANG','COPY','← KEMBALI KE STEP 1']);
  const isActionButton=(el)=>{
    if(!el || el.tagName!=='BUTTON') return false;
    if(el.closest('#comicProcOverlay')) return false;
    const txt=(el.innerText||el.textContent||'').trim().replace(/\s+/g,' ');
    if(!txt || ignored.has(txt)) return false;
    const allow=/^(JALANKAN|CEK |LIHAT |REQUEST |VERIFIKASI |CREATE EMAIL|REFRESH INBOX|GENERATE|DOWNLOAD|PROSES|CHECK|SEARCH|KIRIM|BUAT |AMBIL |CARI |GET |START )/i;
    return allow.test(txt) && !el.disabled;
  };
  window.comicRunProcess=function(label,invoke){
    const ov=document.getElementById('comicProcOverlay'),screen=document.getElementById('comicProcScreen'),fill=document.getElementById('comicProcFill'),pct=document.getElementById('comicProcPct'),top=document.getElementById('comicProcPctTop'),status=document.getElementById('comicProcStatus'),cmd=document.getElementById('comicProcCommand');
    if(!ov||!screen){invoke();return;}
    ov.classList.add('show');ov.setAttribute('aria-hidden','false');document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';
    cmd.textContent='run --tool "'+label.replace(/"/g,'')+'"';screen.innerHTML='';fill.style.width='0%';pct.textContent='0%';top.textContent='00%';status.textContent='INITIALIZING';
    const safe=String(label).replace(/[<>]/g,'');
    const steps=[
      [8,'g','[BOOT]','loading '+safe+' module...'],
      [21,'c','[CHECK]','validating tool interface...'],
      [36,'y','[INPUT]','reading tool parameters...'],
      [52,'c','[ENGINE]','starting comic processing engine...'],
      [68,'g','[TASK]','processing request sequence...'],
      [84,'y','[OUTPUT]','building result panel...'],
      [100,'c','[DONE]','process finished.']
    ];
    let i=0;
    const add=(st)=>{screen.insertAdjacentHTML('beforeend',`<div class="comicProcLine"><span class="${st[1]}">${st[2]}</span> ${st[3]}</div>`);screen.scrollTop=screen.scrollHeight;fill.style.width=st[0]+'%';pct.textContent=st[0]+'%';top.textContent=String(st[0]).padStart(2,'0')+'%';status.textContent=st[0]>=100?'COMPLETE':'PROCESSING'};
    add(steps[0]);
    const timer=setInterval(()=>{i++;if(i>=steps.length){clearInterval(timer);setTimeout(()=>{ov.classList.remove('show');ov.setAttribute('aria-hidden','true');document.documentElement.style.overflow='';document.body.style.overflow='';try{invoke();}catch(e){console.error(e);}},260);return;}add(steps[i]);},250);
  };
  document.addEventListener('click',function(e){
    const btn=e.target.closest('button');
    if(!isActionButton(btn)) return;
    /* Badak already owns its dedicated console; don't double-wrap it. */
    if(btn.getAttribute('onclick')?.includes('runBadakLocal')) return;
    const inline=btn.getAttribute('onclick');
    if(!inline) return;
    e.preventDefault();e.stopImmediatePropagation();
    const label=(btn.innerText||'TOOL').trim().replace(/\s+/g,' ');
    comicRunProcess(label,()=>{try{btn.onclick?.(new MouseEvent('click'));}catch(_){}});
  },true);
})();

(function(){
  const player=document.getElementById('comicMusicPlayer');
  const audio=document.getElementById('cmAudio');
  const play=document.getElementById('cmPlay');
  const prev=document.getElementById('cmPrev');
  const next=document.getElementById('cmNext');
  const name=document.getElementById('cmName');
  const track=document.getElementById('cmTrack');
  if(!player||!audio||!play||!prev||!next)return;

  const playlist=[
    {name:'LAXX MUSIC • MP3',url:'https://files.catbox.moe/h51wdk.mp3'},
    {name:'LAXX MUSIC • BIN',url:'https://files.catbox.moe/t5b271.bin'},
    {name:'LAXX MUSIC • FLAC',url:'https://files.catbox.moe/dg3btp.flac'},
    {name:'LAXX MUSIC • M4A',url:'https://files.catbox.moe/ho8m36.m4a'}
  ];
  const MUSIC_STATE_KEY='laxxMusicStateV1';
  const MUSIC_CHANNEL_NAME='laxxMusicChannelV1';
  let index=0, requestId=0, fallbackBusy=false, restoring=true;
  let musicChannel=null;
  try{ musicChannel=new BroadcastChannel(MUSIC_CHANNEL_NAME); }catch(_){}

  function saveMusicState(){
    try{
      localStorage.setItem(MUSIC_STATE_KEY,JSON.stringify({
        index,
        time:Number.isFinite(audio.currentTime)?audio.currentTime:0,
        playing:!audio.paused && !audio.ended,
        savedAt:Date.now()
      }));
    }catch(_){}
  }

  function readMusicState(){
    try{
      const raw=localStorage.getItem(MUSIC_STATE_KEY);
      if(!raw)return null;
      const st=JSON.parse(raw);
      if(!st || !Number.isInteger(st.index) || st.index<0 || st.index>=playlist.length)return null;
      return st;
    }catch(_){return null;}
  }

  function announceMusicTakeover(){
    try{musicChannel?.postMessage({type:'music-takeover'});}catch(_){}
  }

  musicChannel?.addEventListener('message',e=>{
    if(e.data?.type==='music-takeover'){
      audio.pause();
      saveMusicState();
    }
  });

  function setPlaying(on){
    player.classList.toggle('playing',!!on);
    play.textContent=on?'Ⅱ':'▶';
    play.setAttribute('aria-label',on?'Jeda musik':'Putar musik');
  }

  function setSource(item){
    audio.pause();
    audio.src=item.url;
    audio.preload='auto';
    audio.load();
  }

  async function setTrack(i,autoplay,restoreTime=null){
    index=(i+playlist.length)%playlist.length;
    const item=playlist[index];
    const id=++requestId;
    name.textContent=item.name;
    track.textContent='TRACK '+(index+1)+'/'+playlist.length;
    setPlaying(false);
    setSource(item);
    if(restoreTime!==null){
      const restore=()=>{
        try{
          if(Number.isFinite(restoreTime) && restoreTime>0 && (!audio.duration || restoreTime<audio.duration-0.25)) audio.currentTime=restoreTime;
        }catch(_){}
        audio.removeEventListener('loadedmetadata',restore);
      };
      audio.addEventListener('loadedmetadata',restore);
      if(audio.readyState>=1)restore();
    }
    if(autoplay){
      announceMusicTakeover();
      try{await audio.play();setPlaying(true);}
      catch(e){
        if(id!==requestId)return;
        /* Hanya fallback bila browser tidak bisa memainkan URL langsung. */
        fallbackBusy=true;
        try{
          const controller=new AbortController();
          const timer=setTimeout(()=>controller.abort(),1800);
          const r=await fetch(item.url,{mode:'cors',cache:'no-store',signal:controller.signal});
          clearTimeout(timer);
          if(!r.ok)throw new Error('HTTP '+r.status);
          const blob=await r.blob();
          const u=URL.createObjectURL(blob);
          audio.src=u;audio.load();
          await audio.play();setPlaying(true);
        }catch(_){
          if(id===requestId)setTimeout(()=>setTrack(index+1,true),120);
        }finally{fallbackBusy=false;}
      }
    }
  }

  play.addEventListener('click',async function(){
    if(audio.paused){
      announceMusicTakeover();
      try{await audio.play();setPlaying(true);saveMusicState();}
      catch(e){if(!fallbackBusy)setTrack(index,true);}
    }else{audio.pause();setPlaying(false);saveMusicState();}
  });
  prev.addEventListener('click',()=>setTrack(index-1,true));
  next.addEventListener('click',()=>setTrack(index+1,true));
  audio.addEventListener('play',()=>{setPlaying(true);saveMusicState();});
  audio.addEventListener('pause',()=>{setPlaying(false);saveMusicState();});
  audio.addEventListener('timeupdate',()=>{if(!restoring)saveMusicState();});
  window.addEventListener('pagehide',saveMusicState);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)saveMusicState();});
  audio.addEventListener('ended',()=>setTrack(index+1,true));
  audio.addEventListener('error',()=>{if(!fallbackBusy && !audio.paused)setTimeout(()=>setTrack(index+1,true),120);});
  player.addEventListener('click',function(e){
    if(e.target===player||e.target.closest('.cmTitle')||e.target.closest('.cmEq'))player.classList.toggle('showTrack');
  });
  audio.volume=.8;
  const saved=readMusicState();
  if(saved){
    index=saved.index;
    setTrack(index,false,saved.time).then(()=>{
      restoring=false;
      /* Autoplay setelah reload bisa diblokir browser. Posisi tetap dipulihkan;
         kalau sebelumnya sedang bermain, coba lanjutkan otomatis. */
      if(saved.playing){
        announceMusicTakeover();
        audio.play().then(()=>setPlaying(true)).catch(()=>setPlaying(false));
      }
    });
  }else{
    restoring=false;
    setTrack(0,false);
  }
})();

(function(){
  const n=document.getElementById('joinTopNotif');
  const c=document.getElementById('joinTopNotifClose');
  if(!n)return;
  let timer=null;
  function show(){
    n.classList.add('show');
    clearTimeout(timer);
    timer=setTimeout(()=>n.classList.remove('show'),5000);
  }
  c&&c.addEventListener('click',()=>n.classList.remove('show'));
  setTimeout(show,20000);
  setInterval(show,20000);
})();

function toggleTheme(){const dark=document.body.classList.toggle('dark-mode');const b=document.getElementById('themeToggle');if(b){b.textContent=dark?'☀️':'🌙';b.title=dark?'Ganti ke tema terang':'Ganti ke tema gelap';b.setAttribute('aria-pressed',String(dark));}}

/* Global direct-download handler: download media as a file instead of opening the API URL. */
(function installDirectDownloadHandler(){
 if(window.__laxxDirectDownloadHandlerInstalled)return;
 window.__laxxDirectDownloadHandlerInstalled=true;
 document.addEventListener('click',async function(event){
  const link=event.target&&event.target.closest?event.target.closest('a.downloadBtn'):null;
  if(!link)return;
  const raw=link.getAttribute('href')||'';
  if(!/^https?:\/\//i.test(raw))return; // blob: URLs and same-page links use native download
  event.preventDefault();
  if(link.dataset.downloading==='1')return;
  const oldText=link.textContent;
  link.dataset.downloading='1';
  link.setAttribute('aria-busy','true');
  link.textContent='⏳ MENYIAPKAN DOWNLOAD...';
  try{
   let response;
   try{response=await fetch(raw,{method:'GET',mode:'cors',cache:'no-store'});}
   catch(firstError){
    if(!/api\.azbry\.com/i.test(new URL(raw).hostname))throw firstError;
    response=await fetch('https://api.allorigins.win/raw?url='+encodeURIComponent(raw),{cache:'no-store'});
   }
   if(!response.ok)throw new Error('Server mengembalikan HTTP '+response.status);
   const blob=await response.blob();
   if(!blob.size)throw new Error('File kosong');
   const objectUrl=URL.createObjectURL(blob);
   const temp=document.createElement('a');
   temp.href=objectUrl;
   temp.download=link.getAttribute('download')||('laxx-download-'+Date.now());
   temp.style.display='none';
   document.body.appendChild(temp);temp.click();temp.remove();
   setTimeout(()=>URL.revokeObjectURL(objectUrl),60000);
  }catch(err){
   const message='Download otomatis gagal karena server API membatasi akses file (CORS). Coba lagi atau gunakan API/backend yang mengizinkan download langsung.';
   alert(message);
  }finally{
   link.textContent=oldText;
   link.removeAttribute('aria-busy');
   delete link.dataset.downloading;
  }
 },true);
})();

