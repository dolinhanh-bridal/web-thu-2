/* GIỎ HÀNG — Dolinhanh Bridal (17/10/2026: "khách chọn váy, click váy đó và cho váy đó vào giỏ hàng")
   Nạp ở cuối các trang có header .bar. Trang có lưới váy #vlGrid (Bộ sưu tập, Pre-wedding) thêm nút
   "Thêm vào giỏ" dưới mỗi thẻ váy + trong ảnh phóng to.
   · Khách nước ngoài (html.co-gia): Đặt mua qua WhatsApp; giá USD + tổng CHỈ ở vietnamweddinggown.com (html.vwg) — web dolinhanh không có giá (17/10/2026).
   · Khách Việt xem VI: giỏ = các mẫu muốn thử → Đặt lịch thử (popup đặt lịch ghi sẵn mã váy).
   Giỏ lưu trong máy khách (localStorage "dla-gio"); mỗi tên miền một giỏ riêng. */
(function(){
  "use strict";
  var KHOA = "dla-gio", WA = "84359950588", ZALO = "https://zalo.me/0359950588";
  var H = document.documentElement;

  var CHU = {
    vi: { gio:"Giỏ hàng", them:"Thêm vào giỏ", daCo:"Đã có trong giỏ", daCoThe:"Trong giỏ", xemGio:"Xem giỏ",
          daThem:"Đã thêm {ms} vào giỏ", trong:"Giỏ đang trống", trongPhu:"Bấm vào mẫu váy nàng thích → Thêm vào giỏ.",
          bst:"Xem Bộ sưu tập", bo:"Bỏ", tong:"Tổng", lienHe:"Giá liên hệ", congLienHe:"+ mẫu giá liên hệ",
          mua:"Đặt mua qua WhatsApp", muaNote:"Dolinhanh xác nhận còn váy, số đo và phí gửi qua WhatsApp.",
          thuPhu:"Hoặc đặt lịch thử tại showroom",
          vietPhu:"Những mẫu nàng muốn thử", datThu:"Đặt lịch thử {n} mẫu này", datThu1:"Đặt lịch thử mẫu này",
          vietNote:"Dolinhanh chuẩn bị sẵn các mẫu này cho buổi thử của nàng.",
          zalo:"Hoặc nhắn Zalo cho Dolinhanh", daChep:"Đã chép danh sách mẫu — dán vào Zalo nhé", dong:"Đóng" },
    en: { gio:"Your cart", them:"Add to cart", daCo:"In your cart", daCoThe:"In cart", xemGio:"View cart",
          daThem:"{ms} added to your cart", trong:"Your cart is empty", trongPhu:"Tap a gown you love → Add to cart.",
          bst:"Browse the collection", bo:"Remove", tong:"Total", lienHe:"Price on request", congLienHe:"+ price on request",
          mua:"Order on WhatsApp", muaNote:"Dolinhanh will confirm availability, measurements and shipping on WhatsApp.",
          thuPhu:"Or book a fitting at our showroom",
          vietPhu:"The gowns you want to try", datThu:"Book a fitting for these {n} gowns", datThu1:"Book a fitting for this gown",
          vietNote:"Dolinhanh will have these gowns ready for your fitting.",
          zalo:"Or message Dolinhanh on Zalo", daChep:"Gown list copied — paste it into Zalo", dong:"Close" },
    zh: { gio:"购物车", them:"加入购物车", daCo:"已在购物车", daCoThe:"已加入", xemGio:"查看购物车",
          daThem:"{ms} 已加入购物车", trong:"购物车是空的", trongPhu:"点击喜欢的婚纱 → 加入购物车。",
          bst:"浏览婚纱系列", bo:"移除", tong:"合计", lienHe:"价格请咨询", congLienHe:"+ 价格请咨询款",
          mua:"通过 WhatsApp 下单", muaNote:"Dolinhanh 将通过 WhatsApp 确认库存、尺寸与运费。",
          thuPhu:"或预约到店试穿",
          vietPhu:"你想试穿的婚纱", datThu:"预约试穿这 {n} 款", datThu1:"预约试穿此款",
          vietNote:"Dolinhanh 会为你的试纱提前备好这些婚纱。",
          zalo:"或通过 Zalo 联系 Dolinhanh", daChep:"已复制婚纱清单——粘贴到 Zalo 即可", dong:"关闭" }
  };
  function ng(){ var l = (typeof LANG !== "undefined" && LANG) || (H.lang || "vi").slice(0,2); return CHU[l] ? l : "en"; }
  function t(k, v){ var s = CHU[ng()][k] || CHU.en[k]; for(var x in v) s = s.replace("{"+x+"}", v[x]); return s; }
  function ngoai(){ return H.classList.contains("co-gia"); }  /* khách nước ngoài: bán, giá USD, WhatsApp */
  function el(tag, cls, chu){ var e = document.createElement(tag); if(cls) e.className = cls; if(chu != null) e.textContent = chu; return e; }

  /* ── dữ liệu giỏ ── */
  function doc(){ try{ var d = JSON.parse(localStorage.getItem(KHOA) || "[]"); return Array.isArray(d) ? d.filter(function(x){ return x && x.ms; }) : []; }catch(_){ return []; } }
  function ghi(d){ try{ localStorage.setItem(KHOA, JSON.stringify(d)); }catch(_){} }
  var GIO = doc();
  function coTrong(ms){ return GIO.some(function(x){ return x.ms === ms; }); }
  function usd(s){ var m = /US\$\s?([\d,]+)/.exec(s || ""); return m ? +m[1].replace(/,/g, "") : 0; }
  function dsMs(){ return GIO.map(function(x){ return x.ms; }).join(", "); }

  /* ── đọc thông tin 1 thẻ váy ── */
  var THE = {};  /* "MS 23" → <figure> */
  var LUOI = document.getElementById("vlGrid");
  function msCua(f){ var n = f.querySelector(".nm"); return n ? n.textContent.trim() : ""; }
  function chuCua(e){ if(!e) return { vi:"", en:"", zh:"" }; var tam = el("div"); tam.innerHTML = e.dataset.vi != null ? e.dataset.vi : e.innerHTML;
    var vi = tam.textContent.trim(); return { vi:vi, en:(e.dataset.en || vi).trim(), zh:(e.dataset.zh || e.dataset.en || vi).trim() }; }
  function mon(f){
    var s = f.querySelector(".sl"), anh = "";
    if(s){ anh = s.dataset.goc || s.getAttribute("data-img") || ""; if(!anh){ var m = /url\(['"]?([^'")]+)/.exec(s.style.getPropertyValue("--img") || ""); if(m) anh = m[1]; } }
    try{ if(anh) anh = new URL(anh, location.href).href; }catch(_){}
    var g = f.querySelector(".gia");
    return { ms:msCua(f), anh:anh, gia:(g && !g.dataset.en) ? g.textContent.trim() : "", de:chuCua(f.querySelector(".de")) };
  }

  function them(f){
    var m = mon(f); if(!m.ms) return;
    GIO = doc(); if(!coTrong(m.ms)){ GIO.push(m); ghi(GIO); }
    try{ if(typeof fbq === "function") fbq("track", "AddToCart", { content_ids:[m.ms], content_name:m.ms, content_type:"product", value:usd(m.gia), currency:"USD" }); }catch(_){}
    veLai(); bao(t("daThem", { ms:m.ms }));
  }
  function bo(ms){ GIO = doc().filter(function(x){ return x.ms !== ms; }); ghi(GIO); veLai(); }

  /* ── CSS ── */
  var css = el("style");
  css.textContent = [
    ".gh-cum{display:flex;align-items:center;gap:18px}",
    ".gh-nut{position:relative;display:inline-grid;place-items:center;width:30px;height:30px;padding:0;margin:0;border:0;background:none;color:inherit;cursor:pointer;opacity:.95}",
    ".gh-nut:hover{opacity:1}",
    ".gh-nut svg{display:block}",
    ".gh-so{position:absolute;top:-4px;right:-7px;min-width:17px;height:17px;padding:0 4px;border-radius:999px;background:#7A2638;color:#fff;font:600 10px/17px var(--sans,Helvetica,Arial,sans-serif);letter-spacing:0;text-align:center;font-style:normal}",
    ".gh-so[hidden]{display:none}",
    ".gh-nen{position:fixed;inset:0;z-index:400;background:rgba(20,18,16,.45);opacity:0;transition:opacity .3s ease}",
    ".gh-nen.hien{opacity:1}",
    ".gh-nen[hidden]{display:none}",
    ".gh-ngan{position:absolute;top:0;right:0;bottom:0;width:min(420px,100%);display:flex;flex-direction:column;background:var(--paper,#fff);color:var(--ink,#1B1917);transform:translateX(100%);transition:transform .35s cubic-bezier(.22,.7,.28,1);box-shadow:-12px 0 40px rgba(0,0,0,.12)}",
    ".gh-nen.hien .gh-ngan{transform:none}",
    ".gh-dau{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:calc(24px + env(safe-area-inset-top)) 24px 16px;border-bottom:1px solid var(--line,#E7E3DD)}",
    ".gh-dau h2{margin:0;font-family:var(--serif,Georgia,serif);font-weight:400;font-size:1.55rem;line-height:1.2;letter-spacing:.01em;text-transform:none}",
    ".gh-dau h2 span{font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:12px;letter-spacing:.12em;color:var(--taupe-deep,#6E665C);margin-left:8px}",
    ".gh-phu{display:block;margin-top:8px;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--taupe-deep,#6E665C)}",
    ".gh-phu[hidden]{display:none}",
    ".gh-dong{flex:none;width:40px;height:40px;margin:-8px -12px 0 0;padding:0;border:0;background:none;color:inherit;font-size:28px;line-height:1;cursor:pointer}",
    ".gh-ds{flex:1 1 auto;overflow-y:auto;margin:0;padding:4px 24px;list-style:none;-webkit-overflow-scrolling:touch}",
    ".gh-mon{display:grid;grid-template-columns:68px 1fr auto;gap:16px;align-items:start;padding:16px 0;border-bottom:1px solid var(--line,#E7E3DD)}",
    ".gh-mon:last-child{border-bottom:0}",
    ".gh-mon .anh{display:block;width:68px;aspect-ratio:2/3;background:#F3EFEA center 12%/cover no-repeat}",
    ".gh-mon .nm{display:block;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink,#1B1917);text-decoration:none}",
    ".gh-mon .de{display:block;margin-top:6px;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:12.5px;line-height:1.5;color:var(--taupe-deep,#6E665C)}",
    ".gh-mon .gia{display:block;margin-top:8px;font-family:var(--serif,Georgia,serif);font-size:16px;letter-spacing:.02em}",
    ".gh-mon .gia.lh{font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--taupe-deep,#6E665C)}",
    ".gh-bo{padding:2px 0;border:0;border-bottom:1px solid currentColor;background:none;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:var(--taupe-deep,#6E665C);cursor:pointer}",
    ".gh-bo:hover{color:var(--ink,#1B1917)}",
    ".gh-trong{flex:1 1 auto;padding:56px 28px;text-align:center}",
    ".gh-trong b{display:block;font-family:var(--serif,Georgia,serif);font-weight:400;font-size:1.25rem}",
    ".gh-trong p{margin:12px auto 0;max-width:30ch;font-size:14px;line-height:1.7;color:var(--taupe-deep,#6E665C)}",
    ".gh-cuoi{padding:16px 24px calc(20px + env(safe-area-inset-bottom));border-top:1px solid var(--line,#E7E3DD)}",
    ".gh-tong{display:flex;justify-content:space-between;align-items:baseline;gap:12px;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:10.5px;letter-spacing:.22em;text-transform:uppercase;color:var(--taupe-deep,#6E665C)}",
    ".gh-tong b{font-family:var(--serif,Georgia,serif);font-size:1.4rem;font-weight:400;letter-spacing:.02em;text-transform:none;color:var(--ink,#1B1917)}",
    ".gh-tong small{display:block;margin-top:2px;text-align:right;font-size:10px;letter-spacing:.12em}",
    ".gh-chinh{display:block;width:100%;margin-top:14px;padding:15px 18px;border:0;background:#7A2638;color:#fff;text-align:center;text-decoration:none;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:11px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .2s ease}",
    ".gh-chinh:hover{background:#611E2D;opacity:1}",
    ".gh-note{margin:10px auto 0;max-width:none;text-align:center;font-size:12.5px;line-height:1.6;color:var(--taupe-deep,#6E665C)}",
    ".gh-phu-nut{display:table;margin:14px auto 0;padding-bottom:3px;border-bottom:1px solid currentColor;font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--ink,#1B1917);text-decoration:none}",
    ".gh-phu-nut:hover{opacity:.65}",
    ".gh-them-the{display:inline-flex;align-items:center;gap:6px;margin-top:10px;padding:7px 12px 7px 10px;border:0;border-radius:999px;background:rgba(255,255,255,.94);box-shadow:0 2px 10px rgba(0,0,0,.14);font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:9.5px;font-weight:600;letter-spacing:.16em;line-height:1.2;white-space:nowrap;text-transform:uppercase;text-shadow:none;color:#7A2638;cursor:pointer;text-align:left}",
    ".gh-them-the:hover{background:#fff}",
    ".gh-them-the.co{background:#7A2638;color:#fff}",
    ".gh-them-the svg{flex:none}",
    "@media (max-width:420px){.gh-them-the{gap:5px;padding:6px 10px 6px 8px;font-size:9px;letter-spacing:.1em}}",
    ".pt-chu .gh-them-pt{background:transparent;border:1px solid rgba(255,255,255,.75);color:#fff;cursor:pointer;margin-right:8px}",
    ".pt-chu .gh-them-pt:hover{background:rgba(255,255,255,.12)}",
    ".pt-chu .gh-them-pt.co{border-color:rgba(255,255,255,.35);color:rgba(255,255,255,.85)}",
    ".gh-bao{position:fixed;left:16px;right:16px;top:calc(14px + env(safe-area-inset-top));z-index:410;display:flex;align-items:center;gap:18px;width:max-content;max-width:calc(100vw - 32px);margin:0 auto;padding:12px 14px 12px 18px;background:#fff;color:var(--ink,#1B1917);border:1px solid var(--line,#E7E3DD);box-shadow:0 14px 34px rgba(0,0,0,.22);font-family:var(--sans,Helvetica,Arial,sans-serif);font-size:12.5px;letter-spacing:.03em;opacity:0;pointer-events:none;transform:translateY(-16px);transition:opacity .25s ease,transform .25s ease}",
    ".gh-bao.hien{opacity:1;pointer-events:auto;transform:none}",
    ".gh-bao button{flex:none;padding:0 0 2px;border:0;border-bottom:1px solid currentColor;background:none;color:#7A2638;font-family:inherit;font-size:10.5px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;white-space:nowrap;cursor:pointer}",
    "html:lang(zh) .gh-ngan *{font-style:normal}"
  ].join("\n");
  document.head.appendChild(css);

  var SVG_TUI = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.15 12.1a1 1 0 0 1-1 .9H7.15a1 1 0 0 1-1-.9L5 8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>';
  var SVG_TUI_NHO = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.15 12.1a1 1 0 0 1-1 .9H7.15a1 1 0 0 1-1-.9L5 8z"/><path d="M9 10V6.5a3 3 0 0 1 6 0V10"/></svg>';

  /* ── nút giỏ trên header (cạnh VI/EN) ── */
  var NUT = el("button", "gh-nut"); NUT.type = "button";
  NUT.innerHTML = SVG_TUI; var SO = el("span", "gh-so"); NUT.appendChild(SO);
  var lang = document.querySelector("header .bar .lang"), bar = document.querySelector("header .bar");
  if(lang){ var cum = el("div", "gh-cum"); lang.parentNode.insertBefore(cum, lang); cum.appendChild(lang); cum.appendChild(NUT); }
  else if(bar){ bar.appendChild(NUT); }
  NUT.addEventListener("click", function(){ moNgan(); });

  /* ── ngăn giỏ (trượt từ phải) ── */
  var NEN = el("div", "gh-nen"); NEN.hidden = true;
  var NGAN = el("aside", "gh-ngan"); NGAN.setAttribute("role", "dialog"); NGAN.setAttribute("aria-modal", "true"); NGAN.setAttribute("aria-labelledby", "ghTieuDe");
  NGAN.innerHTML = '<div class="gh-dau"><div><h2 id="ghTieuDe"></h2><span class="gh-phu"></span></div><button type="button" class="gh-dong">×</button></div>'
    + '<ul class="gh-ds"></ul><div class="gh-trong"><b></b><p></p><a class="gh-phu-nut" href="bo-suu-tap.html"></a></div><div class="gh-cuoi"></div>';
  NEN.appendChild(NGAN); document.body.appendChild(NEN);
  var DS = NGAN.querySelector(".gh-ds"), TRONG = NGAN.querySelector(".gh-trong"), CUOI = NGAN.querySelector(".gh-cuoi");
  NGAN.querySelector(".gh-dong").addEventListener("click", dongNgan);
  NEN.addEventListener("click", function(e){ if(e.target === NEN) dongNgan(); });

  var BAO = el("div", "gh-bao"); BAO.setAttribute("role", "status");
  var BAO_CHU = el("span"), BAO_NUT = el("button"); BAO_NUT.type = "button";
  BAO.appendChild(BAO_CHU); BAO.appendChild(BAO_NUT); document.body.appendChild(BAO);
  BAO_NUT.addEventListener("click", function(){ BAO.classList.remove("hien"); moNgan(); });
  var hen = null;
  function bao(s){ BAO_CHU.textContent = s; BAO_NUT.textContent = t("xemGio"); BAO.classList.add("hien"); clearTimeout(hen); hen = setTimeout(function(){ BAO.classList.remove("hien"); }, 3800); }

  var moRa = false, dayLS = false, boQuaPop = false, sauDong = null;
  function khoaCuon(){
    var pt = document.getElementById("phongTo"), pn = document.getElementById("popNen");
    document.body.style.overflow = (moRa || (pt && !pt.hidden) || (pn && !pn.hidden)) ? "hidden" : "";
  }
  function moNgan(){
    if(moRa) return; GIO = doc(); veNgan(); BAO.classList.remove("hien");
    moRa = true; NEN.hidden = false; requestAnimationFrame(function(){ NEN.classList.add("hien"); }); khoaCuon();
    var pt = document.getElementById("phongTo");
    if(!(pt && !pt.hidden)){ try{ history.pushState({ gh:1 }, ""); dayLS = true; }catch(_){} }  /* nút Back trên điện thoại đóng giỏ */
    setTimeout(function(){ var d = NGAN.querySelector(".gh-dong"); if(d) d.focus({ preventScroll:true }); }, 60);
  }
  function an(){ if(!moRa) return; moRa = false; NEN.classList.remove("hien"); setTimeout(function(){ if(!moRa) NEN.hidden = true; }, 320); khoaCuon(); }
  /* sau: việc làm sau khi đóng (đợi trình duyệt trả vị trí cuộn của history.back xong) */
  function dongNgan(sau){ sau = typeof sau === "function" ? sau : null; var ls = dayLS; dayLS = false; an();
    if(ls){ boQuaPop = true; sauDong = sau; history.back(); } else if(sau) setTimeout(sau, 60); }
  addEventListener("popstate", function(){ if(boQuaPop){ boQuaPop = false; var s = sauDong; sauDong = null; if(s) setTimeout(s, 60); return; } if(moRa){ dayLS = false; an(); } });
  addEventListener("keydown", function(e){ if(moRa && e.key === "Escape"){ e.stopImmediatePropagation(); dongNgan(); } }, true);

  function linkDatLich(cls, chu){
    var a = el("a", cls, chu); a.href = "gui-yeu-cau.html"; a.dataset.ms = dsMs();
    a.addEventListener("click", function(e){
      var f = !document.getElementById("popNen") && document.getElementById("fmHen");  /* trang Gửi yêu cầu: form nằm ngay trên trang */
      if(f){ e.preventDefault(); dongNgan(function(){ var hd = document.getElementById("hd"), cao = hd ? hd.getBoundingClientRect().height : 0;
        window.scrollTo({ top:f.getBoundingClientRect().top + (window.pageYOffset || 0) - cao - 16, behavior:"smooth" }); }); }
      else dongNgan();
    });
    return a;
  }

  function veNgan(){
    var n = GIO.length, nuocNgoai = ngoai(), coGia = nuocNgoai && H.classList.contains("vwg");
    NGAN.querySelector("#ghTieuDe").innerHTML = ""; NGAN.querySelector("#ghTieuDe").append(t("gio"), el("span", "", n ? "(" + n + ")" : ""));
    var phu = NGAN.querySelector(".gh-phu"); phu.textContent = nuocNgoai ? "" : t("vietPhu"); phu.hidden = nuocNgoai || !n;
    NGAN.querySelector(".gh-dong").setAttribute("aria-label", t("dong"));
    TRONG.hidden = !!n; DS.hidden = !n; CUOI.hidden = !n;
    TRONG.querySelector("b").textContent = t("trong"); TRONG.querySelector("p").textContent = t("trongPhu");
    TRONG.querySelector("a").textContent = t("bst");
    DS.innerHTML = "";
    var tong = 0, thieuGia = false, l = ng();
    GIO.forEach(function(m){
      var li = el("li", "gh-mon"), so = (m.ms.match(/\d+/) || [""])[0];
      var anh = el("a", "anh"); anh.href = "bo-suu-tap.html?ms=" + so; anh.setAttribute("aria-label", m.ms);
      if(m.anh) anh.style.backgroundImage = "url('" + m.anh.replace(/'/g, "%27") + "')";
      var giua = el("div"), ten = el("a", "nm", m.ms); ten.href = anh.href;
      giua.appendChild(ten);
      var de = (m.de && (m.de[l] || m.de.en || m.de.vi)) || ""; if(de) giua.appendChild(el("span", "de", de));
      if(coGia){ var g = usd(m.gia); if(g) tong += g; else thieuGia = true;
        giua.appendChild(el("span", "gia" + (g ? "" : " lh"), g ? m.gia : t("lienHe"))); }
      var b = el("button", "gh-bo", t("bo")); b.type = "button"; b.setAttribute("aria-label", t("bo") + " " + m.ms);
      b.addEventListener("click", function(){ bo(m.ms); });
      li.appendChild(anh); li.appendChild(giua); li.appendChild(b); DS.appendChild(li);
    });
    CUOI.innerHTML = "";
    if(!n) return;
    if(nuocNgoai){
      if(coGia){ var dong = el("div", "gh-tong"), trai = el("span", "", t("tong")), phai = el("div");
      phai.appendChild(el("b", "", tong ? "US$" + tong.toLocaleString("en-US") : t("lienHe")));
      if(tong && thieuGia) phai.appendChild(el("small", "", t("congLienHe")));
      dong.appendChild(trai); dong.appendChild(phai); CUOI.appendChild(dong); }
      var tin = "Hi Dolinhanh Bridal, I'd like to order:\n"
        + GIO.map(function(m){ return "• " + m.ms + (coGia ? " — " + (usd(m.gia) ? m.gia : "price on request") : ""); }).join("\n")
        + (coGia && tong ? "\nTotal: US$" + tong.toLocaleString("en-US") + (thieuGia ? " + price on request" : "") : "")
        + "\nAre they available?";
      var mua = el("a", "gh-chinh", t("mua")); mua.href = "https://wa.me/" + WA + "?text=" + encodeURIComponent(tin);
      mua.target = "_blank"; mua.rel = "noopener";
      mua.addEventListener("click", function(){ try{ if(typeof fbq === "function") fbq("track", "InitiateCheckout", { content_ids:GIO.map(function(m){ return m.ms; }), num_items:GIO.length, value:tong, currency:"USD" }); }catch(_){} });
      CUOI.appendChild(mua);
      CUOI.appendChild(el("p", "gh-note", t("muaNote")));
      CUOI.appendChild(linkDatLich("gh-phu-nut", t("thuPhu")));
    } else {
      CUOI.appendChild(linkDatLich("gh-chinh", n > 1 ? t("datThu", { n:n }) : t("datThu1")));
      CUOI.appendChild(el("p", "gh-note", t("vietNote")));
      var z = el("a", "gh-phu-nut", t("zalo")); z.href = ZALO; z.target = "_blank"; z.rel = "noopener";
      z.addEventListener("click", function(){
        var ds = "Mẫu váy muốn thử: " + dsMs();
        try{ navigator.clipboard.writeText(ds).then(function(){ bao(t("daChep")); BAO_NUT.hidden = true; setTimeout(function(){ BAO_NUT.hidden = false; }, 4000); }, function(){}); }catch(_){}
      });
      CUOI.appendChild(z);
    }
  }

  /* ── nút "Thêm vào giỏ" dưới mỗi thẻ váy ── */
  var NUT_THE = [];
  if(LUOI){
    LUOI.querySelectorAll("figure").forEach(function(f){
      var ms = msCua(f), cap = f.querySelector("figcaption"); if(!ms || !cap) return;
      if(!THE[ms]) THE[ms] = f;
      var b = el("button", "gh-them-the"); b.type = "button"; b.dataset.ms = ms;
      b.addEventListener("click", function(e){ e.stopPropagation(); if(coTrong(ms)) moNgan(); else them(f); });
      cap.appendChild(b); NUT_THE.push(b);
    });
  }

  /* ── nút trong ảnh phóng to ── */
  var DAT = document.getElementById("ptDat"), NUT_PT = null;
  if(DAT && LUOI){
    NUT_PT = el("button", "pt-dat gh-them-pt"); NUT_PT.type = "button";
    var MUA = document.getElementById("ptMua"); DAT.parentNode.insertBefore(NUT_PT, MUA || DAT);
    NUT_PT.addEventListener("click", function(e){
      e.stopPropagation(); var ms = (DAT.dataset.ms || "").trim(), f = THE[ms]; if(!ms) return;
      if(coTrong(ms)) moNgan(); else if(f) them(f);
    });
    new MutationObserver(veNutPt).observe(DAT, { attributes:true, attributeFilter:["data-ms"] });
  }
  function veNutPt(){
    if(!NUT_PT) return; var co = coTrong((DAT.dataset.ms || "").trim());
    NUT_PT.classList.toggle("co", co); NUT_PT.textContent = co ? "✓ " + t("daCo") + " · " + t("xemGio") : t("them");
  }

  /* Đặt lịch bằng nút thường (không kèm mã) khi giỏ đã có váy → ghi luôn các mẫu trong giỏ vào lịch hẹn */
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[href$="gui-yeu-cau.html"], a[href*="gui-yeu-cau.html#"]');
    if(!a || a.closest(".gh-ngan")) return;
    if(a.dataset.ghTu === "1" || !a.hasAttribute("data-ms")){ var d = dsMs(); if(d){ a.dataset.ms = d; a.dataset.ghTu = "1"; } else if(a.dataset.ghTu === "1"){ a.removeAttribute("data-ms"); } }
  }, true);

  function veLai(){
    var n = GIO.length;
    SO.textContent = n; SO.hidden = !n;
    NUT.setAttribute("aria-label", t("gio") + (n ? " (" + n + ")" : ""));
    NUT_THE.forEach(function(b){ var co = coTrong(b.dataset.ms);
      b.classList.toggle("co", co); b.innerHTML = SVG_TUI_NHO; b.appendChild(document.createTextNode(co ? "✓ " + t("daCoThe") : "+ " + t("them"))); });
    veNutPt();
    if(moRa) veNgan();
  }
  /* đổi ngôn ngữ (setLang đổi <html lang> / class co-gia) → vẽ lại chữ */
  new MutationObserver(veLai).observe(H, { attributes:true, attributeFilter:["lang", "class"] });
  addEventListener("storage", function(e){ if(e.key === KHOA){ GIO = doc(); veLai(); } });
  addEventListener("pageshow", function(){ GIO = doc(); veLai(); });

  /* để trang Gửi yêu cầu ghi các mẫu trong giỏ vào lịch hẹn */
  window.dlaGio = { ms:function(){ GIO = doc(); return dsMs(); }, mo:moNgan };
  veLai();
})();
