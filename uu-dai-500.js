/* Ưu đãi tiền mặt 500K · mã hiệu lực 7 ngày — CHỈ web chính dolinhanhbridal.com (chị Linh 02/11/2026)
   - Khách điền TÊN + SỐ ĐIỆN THOẠI + EMAIL → hiện mã riêng DLA500-XXXX, hạn 7 ngày TÍNH TỪ LÚC NHẬN MÃ.
   - Mỗi khách nhận mã = 1 mail về media.nupakachi.dolinhanh (MAIL_URL) → tìm "MÃ 500K" trong Gmail = danh sách khách.
   - Nút "Gửi mã qua Zalo" (chị Linh 02/11): chép sẵn tin "Tôi là… SĐT là… Email là… Tôi có mã giảm là… Áp dụng tới…" + mở Zalo 035 995 0588.
     zalo.me không tự điền tin vào ô chat → khách DÁN rồi gửi; tin hiện sẵn trên thẻ, chép lỗi thì khách tự chép được.
   - Chỉ hiện khi đang xem tiếng Việt. Không phủ đen, trang vẫn cuộn được.
     Máy tính: hiện sau 7 giây / cuộn 500px. Điện thoại: sau 10 giây / cuộn nửa màn hình.
   - Đóng → nhãn nhỏ trên nút Zalo nổi, bấm mở lại. Hết 7 ngày thì không hiện nữa.
   - 04/11/2026 (chị Linh): MỖI KHÁCH 1 MÃ. Mã tính theo số điện thoại; dla-zalo-7k2q/bao.php giữ mã + hạn đầu tiên theo SĐT và email,
     quay lại hay đổi máy vẫn ra đúng mã đó, hạn không tính lại. Mã mới báo về Zalo chị + 1 mail; khách tự nhảy sang Zalo shop, tin đã chép sẵn.
   - dung-web-vwg.py chép file này sang web riêng nhưng dòng kiểm tên miền dưới đây chặn, không hiện ở đó.
   - Xem lại từ đầu: thêm ?uudai=0 vào link. */
(function(){
  var H = location.hostname;
  if(!/^(www\.)?dolinhanhbridal\.com$/.test(H) && !/^(localhost|127\.0\.0\.1)$/.test(H)) return;
  if(window.__uu500) return; window.__uu500 = 1;

  var HAN = 7 * 864e5, K_MA = "dla-500k-ma", K_HET = "dla-500k-het", K_SDT = "dla-500k-sdt", K_TEN = "dla-500k-ten", K_EM = "dla-500k-em", K_DONG = "dla-500k-dong";
  var ZALO = "https://zalo.me/0359950588";
  var MAIL_URL = "https://script.google.com/macros/s/AKfycbwlmpyoY3b-iCmO9ZoVeUhm0wYJb4CrQ6I9ezsadk4UhDx1JS3qAEN7MWNOL_DGgkiV/exec";
  function lay(k){ try{ return localStorage.getItem(k); }catch(_){ return null; } }
  function dat(k, v){ try{ localStorage.setItem(k, v); }catch(_){} }
  function bo(k){ try{ localStorage.removeItem(k); }catch(_){} }
  try{ if(new URLSearchParams(location.search).get("uudai") === "0"){ bo(K_MA); bo(K_HET); bo(K_SDT); bo(K_TEN); bo(K_EM); bo(K_DONG); } }catch(_){}

  var MA = lay(K_MA) || "", HET = +lay(K_HET) || 0;
  if(MA && Date.now() >= HET) return;

  /* Cùng số điện thoại luôn ra cùng mã (khớp zl_maTheoSdt trong dla-zalo-7k2q/chung.php) */
  function maTheoSdt(so){
    var BC = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789", h = 2166136261, m = "DLA500-", i;
    for(i = 0; i < so.length; i++){ h ^= so.charCodeAt(i); h = Math.imul(h, 16777619); }
    h = h >>> 0;
    for(i = 0; i < 4; i++) m += BC[(h >>> (5 * i)) & 31];
    return m;
  }
  function ngayVN(t){ var d = new Date(t); return ("0" + d.getDate()).slice(-2) + "/" + ("0" + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear(); }
  function laViet(){ return (document.documentElement.lang || "vi").toLowerCase().indexOf("vi") === 0; }

  var SERIF = "var(--serif,'Playfair Display',Georgia,serif)";
  var css = [
    ".u5-the,.u5-nhan{--u5-ink:var(--ink,#1B1917);--u5-nau:var(--taupe-deep,#6E665C);--u5-vien:var(--line,#E7E3DD);--u5-ruou:#7A2638;",
    "  font-family:var(--sans,'Montserrat',Helvetica,Arial,sans-serif);color:var(--u5-ink);position:fixed;right:clamp(12px,3vw,24px);bottom:calc(80px + env(safe-area-inset-bottom));z-index:130}",
    ".u5-the{width:360px;max-width:calc(100vw - 24px);box-sizing:border-box;padding:22px 24px 20px;background:var(--ivory,#FBF9F6);border:1px solid var(--u5-vien);box-shadow:0 18px 46px rgba(27,25,23,.2);",
    "  opacity:0;transform:translateY(18px);transition:opacity .35s ease,transform .35s ease}",
    ".u5-the.hien{opacity:1;transform:none}",
    ".u5-the[hidden],.u5-nhan[hidden],.u5-the [hidden]{display:none!important}",
    ".u5-dau{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:0 0 8px}",
    ".u5-eb{font-size:.6rem;font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:var(--u5-nau)}",
    ".u5-x{flex:none;display:grid;place-items:center;width:34px;height:34px;margin:-10px -12px -10px 0;padding:0;border:0;background:none;color:var(--u5-nau);cursor:pointer;font-size:22px;line-height:1}",
    ".u5-x:hover{color:var(--u5-ink)}",
    ".u5-tit{margin:0 0 6px;font-family:" + SERIF + ";font-weight:400;font-size:1.62rem;line-height:1.15;letter-spacing:-.005em}",
    ".u5-tit em{font-style:italic;font-variant-numeric:lining-nums;color:var(--u5-ruou)}",
    ".u5-phu{margin:0 0 14px;font-family:" + SERIF + ";font-style:italic;font-size:.88rem;color:var(--u5-nau)}",
    ".u5-o{display:block;margin:0 0 12px}",
    ".u5-o span{display:block;margin:0 0 2px;font-size:.6rem;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--u5-nau)}",
    ".u5-o input{width:100%;box-sizing:border-box;font-family:inherit;font-weight:300;font-size:16px;color:var(--u5-ink);background:transparent;border:0;border-bottom:1px solid var(--u5-vien);border-radius:0;padding:8px 0;margin:0;-webkit-appearance:none;appearance:none}",
    ".u5-o input:focus{outline:none;border-bottom-color:var(--u5-ink)}",
    ".u5-o.loi input{border-bottom-color:var(--u5-ruou)}",
    ".u5-loi{margin:0 0 10px;font-size:.74rem;line-height:1.35;color:var(--u5-ruou)}",
    ".u5-nut{display:block;width:100%;box-sizing:border-box;padding:14px 12px;border:1px solid #7A2638;background:#7A2638;color:#fff;font-family:inherit;font-size:.66rem;font-weight:500;letter-spacing:.17em;text-transform:uppercase;text-align:center;text-decoration:none;cursor:pointer;transition:background .2s,color .2s}",
    ".u5-nut:hover{background:#611E2D;border-color:#611E2D;color:#fff;opacity:1}",
    ".u5-nut.vien{margin-top:8px;background:none;color:#7A2638}",
    ".u5-nut.vien:hover{background:#7A2638;color:#fff}",
    ".u5-ma{display:block;margin:4px 0 8px;padding:9px 10px;border:1px dashed var(--u5-ruou);text-align:center;font-size:1rem;font-weight:600;letter-spacing:.14em;color:var(--u5-ruou)}",
    ".u5-han{margin:0 0 2px;font-size:.8rem;font-weight:600;text-align:center;color:#C8102E}",
    ".u5-tin b{font-weight:600;color:#C8102E}",
    ".u5-tin{margin:8px 0 8px;padding:9px 11px;background:var(--champagne,#F5EFE7);font-size:.76rem;line-height:1.45;white-space:pre-line;-webkit-user-select:text;user-select:text}",
    ".u5-chep{margin:0 0 10px;font-family:" + SERIF + ";font-style:italic;font-size:.84rem;line-height:1.3;text-align:center;color:var(--u5-nau)}",
    ".u5-chep.ok{font-family:inherit;font-style:normal;font-size:.76rem;font-weight:500;color:var(--u5-ruou)}",
    ".u5-nhan{display:inline-flex;align-items:center;height:44px;box-sizing:border-box;padding:0 16px;border:1px solid var(--u5-vien);border-radius:999px;background:var(--ivory,#FBF9F6);box-shadow:0 10px 26px rgba(27,25,23,.16);cursor:pointer;font-size:.62rem;font-weight:500;letter-spacing:.16em;text-transform:uppercase;white-space:nowrap;color:var(--u5-ruou)}",
    "@media(max-width:640px){",
    "  .u5-the{left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));width:auto;max-width:none;padding:16px 18px}",
    "  .u5-tit{font-size:1.32rem;margin-bottom:3px}",
    "  .u5-phu{margin-bottom:10px;font-size:.84rem}",
    "  .u5-o{margin-bottom:9px}",
    "  .u5-nut{padding:12px 10px;letter-spacing:.14em}",
    "  .u5-nhan{right:12px;bottom:calc(86px + env(safe-area-inset-bottom))}",
    "}",
    "@media(prefers-reduced-motion:reduce){.u5-the{transition:none}}"
  ].join("\n");
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);

  var the = document.createElement("aside");
  the.className = "u5-the"; the.hidden = true; the.setAttribute("aria-label", "Ưu đãi tiền mặt 500K");
  the.innerHTML =
    '<div class="u5-dau"><span class="u5-eb">Ưu đãi riêng</span><button type="button" class="u5-x" aria-label="Đóng">×</button></div>' +
    '<form class="u5-f" novalidate>' +
      '<h2 class="u5-tit">Tiền mặt <em>-500K</em></h2>' +
      '<p class="u5-phu">Mã có hiệu lực 7 ngày từ lúc nhận</p>' +
      '<label class="u5-o"><span>Họ tên *</span><input name="ten" type="text" autocomplete="name" placeholder="Tên của nàng"></label>' +
      '<label class="u5-o"><span>Số điện thoại *</span><input name="sdt" type="tel" inputmode="tel" autocomplete="tel" placeholder="0912 345 678"></label>' +
      '<label class="u5-o"><span>Email *</span><input name="em" type="email" inputmode="email" autocomplete="email" placeholder="ten@gmail.com"></label>' +
      '<p class="u5-loi" hidden></p>' +
      '<button type="submit" class="u5-nut">Nhận mã ngay</button>' +
    '</form>' +
    '<div class="u5-xong" hidden>' +
      '<h2 class="u5-tit">Mã <em>-500K</em> của nàng</h2>' +
      '<b class="u5-ma"></b>' +
      '<p class="u5-han"></p>' +
      '<p class="u5-tin"></p>' +
      '<p class="u5-chep">Bấm nút dưới để gửi tin này cho Dolinhanh</p>' +
      '<a class="u5-nut u5-zalo" href="' + ZALO + '" target="_blank" rel="noopener">Gửi mã qua Zalo</a>' +
      '<a class="u5-nut vien" href="gui-yeu-cau.html">Đặt lịch thử váy</a>' +
    '</div>';
  var nhan = document.createElement("button");
  nhan.type = "button"; nhan.className = "u5-nhan"; nhan.hidden = true;
  document.body.appendChild(the); document.body.appendChild(nhan);

  var fm = the.querySelector(".u5-f"), xong = the.querySelector(".u5-xong"), loi = the.querySelector(".u5-loi");
  var chep = the.querySelector(".u5-chep");

  function tinKhach(){
    return "Tôi là " + (lay(K_TEN) || "") + "\nSĐT là " + (lay(K_SDT) || "") + "\nEmail là " + (lay(K_EM) || "")
      + "\nTôi có mã giảm là " + MA + " (tiền mặt -500K)\nÁp dụng tới " + ngayVN(HET);
  }
  function chepTin(t){
    var a = document.createElement("textarea"), ok = false;
    a.value = t; a.setAttribute("readonly", ""); a.style.cssText = "position:fixed;top:0;left:0;opacity:0";
    document.body.appendChild(a); a.select(); a.setSelectionRange(0, t.length);
    try{ ok = document.execCommand("copy"); }catch(_){}
    a.remove();
    if(!ok && navigator.clipboard){ try{ navigator.clipboard.writeText(t); ok = true; }catch(_){} }
    return ok;
  }
  function veXong(){
    fm.hidden = true; xong.hidden = false;
    the.querySelector(".u5-ma").textContent = MA;
    the.querySelector(".u5-han").textContent = "Áp dụng tới " + ngayVN(HET);
    var t = tinKhach(), cuoi = t.lastIndexOf("\n"), oTin = the.querySelector(".u5-tin"), han = document.createElement("b");
    oTin.textContent = t.slice(0, cuoi + 1); han.textContent = t.slice(cuoi + 1); oTin.appendChild(han);
  }
  function capNhatNhan(){ nhan.textContent = MA ? "Mã -500K · đến " + ngayVN(HET).slice(0, 5) : "Nhận -500K"; }
  function mo(){ if(!laViet()) return; nhan.hidden = true; the.hidden = false; requestAnimationFrame(function(){ the.classList.add("hien"); }); }
  function dong(){ the.classList.remove("hien"); the.hidden = true; dat(K_DONG, "1"); capNhatNhan(); nhan.hidden = !laViet(); }

  the.querySelector(".u5-x").addEventListener("click", dong);
  nhan.addEventListener("click", mo);

  /* khách đổi sang EN giữa chừng thì ẩn, về VI thì hiện lại nhãn */
  new MutationObserver(function(){
    if(!laViet()){ the.classList.remove("hien"); the.hidden = true; nhan.hidden = true; }
    else if(daHien && the.hidden){ capNhatNhan(); nhan.hidden = false; }
  }).observe(document.documentElement, { attributes:true, attributeFilter:["lang"] });

  fm.addEventListener("submit", function(ev){
    ev.preventDefault();
    var oTen = fm.elements.ten, oSdt = fm.elements.sdt, oEm = fm.elements.em;
    var ten = oTen.value.trim(), sdt = oSdt.value.trim(), em = oEm.value.trim();
    var so = sdt.replace(/[^\d]/g, "");
    var sdtDung = /^(0\d{9}|84\d{9})$/.test(so), emDung = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(em);
    oTen.parentNode.classList.toggle("loi", !ten);
    oSdt.parentNode.classList.toggle("loi", !sdtDung);
    oEm.parentNode.classList.toggle("loi", !emDung);
    if(!ten || !sdtDung || !emDung){
      loi.hidden = false;
      loi.textContent = !ten ? "Nàng điền giúp họ tên nhé." : !sdtDung && !emDung ? "Nàng điền giúp số điện thoại và email nhé." : !sdtDung ? "Số điện thoại chưa đúng, nàng xem lại giúp nhé." : "Email chưa đúng, nàng xem lại giúp nhé.";
      return;
    }
    loi.hidden = true;
    var so0 = so.indexOf("84") === 0 ? "0" + so.slice(2) : so;
    MA = maTheoSdt(so0); HET = Date.now() + HAN;
    dat(K_MA, MA); dat(K_HET, String(HET)); dat(K_SDT, sdt); dat(K_TEN, ten); dat(K_EM, em);
    function guiMail(){
      var tin = "MÃ 500K · " + MA + " · " + ten + " · SĐT " + sdt + "\n"
        + "Email: " + em + "\n"
        + "Hiệu lực đến: " + ngayVN(HET) + "\n"
        + "Trang đang xem: " + location.pathname;
      fetch(MAIL_URL + "?hoi=" + encodeURIComponent(tin) + "&em=" + encodeURIComponent(em), { mode:"no-cors" }).catch(function(){});
    }
    var bd = new URLSearchParams();
    bd.append("loai", "ma500"); bd.append("ten", ten); bd.append("sdt", sdt); bd.append("em", em); bd.append("trang", location.pathname);
    fetch("/dla-zalo-7k2q/bao.php", { method:"POST", body:bd }).then(function(r){ return r.json(); }).then(function(o){
      if(!o || !o.ma){ guiMail(); return; }
      MA = o.ma; HET = +o.het; dat(K_MA, MA); dat(K_HET, String(HET)); veXong();
      if(Date.now() >= HET){
        the.querySelector(".u5-han").textContent = "Mã này đã hết hạn ngày " + ngayVN(HET);
        the.querySelector(".u5-tin").hidden = true; chep.hidden = true; the.querySelector(".u5-zalo").hidden = true;
      }
      if(o.moi) guiMail();
    }).catch(guiMail);
    try{ if(window.fbq) fbq("trackCustom", "Offer500Code"); }catch(_){}
    veXong();
    /* Tự nhảy sang Zalo ngay trong cú bấm: để sau khi chờ mạng thì iPhone chặn */
    chepVaBao();
    try{ window.open(ZALO, "_blank"); }catch(_){}
  });

  function chepVaBao(){
    var ok = chepTin(tinKhach());
    chep.classList.toggle("ok", ok);
    chep.textContent = ok ? "Đã chép tin · sang Zalo nhấn giữ ô chat → Dán → Gửi" : "Nàng chép tin trên rồi dán vào Zalo giúp nhé";
  }
  the.querySelector(".u5-zalo").addEventListener("click", function(){
    chepVaBao();
    try{ if(window.fbq) fbq("trackCustom", "Offer500SendCode"); }catch(_){}
  });

  var daHien = false;
  function hien(){
    if(daHien) return; daHien = true;
    removeEventListener("scroll", cuon);
    if(!laViet()) return;
    if(lay(K_DONG)){ capNhatNhan(); nhan.hidden = false; return; }
    mo();
  }
  var dt = matchMedia("(max-width:640px)").matches;
  var nguong = dt ? innerHeight / 2 : 500;
  function cuon(){ if(scrollY > nguong) hien(); }
  if(MA) veXong();
  addEventListener("scroll", cuon, { passive:true });
  setTimeout(hien, dt ? 10000 : 7000);
})();
