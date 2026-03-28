import { useState, useEffect } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Montserrat:wght@200;300;400;500;600&display=swap');

  :root {
    --rose:    #E8A0A8;
    --rose-v:  #D4687A;
    --rose-p:  #F7E4E8;
    --rose-xl: #FDF5F7;
    --or:      #C9A96E;
    --or-l:    #E8D5A3;
    --blanc:   #FFFFFF;
    --gris-c:  #F9F5F6;
    --gris-m:  #B09098;
    --noir:    #1C1018;
    --noir-s:  #2E1C24;
    --texte:   #2E1C24;
  }
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:'Montserrat',sans-serif;font-weight:300;background:var(--blanc);color:var(--texte);overflow-x:hidden}
  .rv{opacity:0;transform:translateY(28px);transition:opacity .9s ease,transform .9s ease}
  .rv.on{opacity:1;transform:translateY(0)}
  .rvl{opacity:0;transform:translateX(-28px);transition:opacity .9s ease,transform .9s ease}
  .rvl.on{opacity:1;transform:translateX(0)}
  .rvr{opacity:0;transform:translateX(28px);transition:opacity .9s ease,transform .9s ease}
  .rvr.on{opacity:1;transform:translateX(0)}

  /* NAV */
  nav{position:fixed;top:0;left:0;right:0;z-index:999;display:flex;align-items:center;justify-content:space-between;padding:1.1rem 3.5rem;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);border-bottom:1px solid var(--rose-p)}
  .nav-logo{display:flex;flex-direction:column;line-height:1}
  .nav-logo-top{font-family:'Playfair Display',serif;font-size:1.5rem;font-weight:900;letter-spacing:.04em;color:var(--noir)}
  .nav-logo-top span{color:var(--rose-v)}
  .nav-logo-bot{font-family:'Playfair Display',serif;font-size:.7rem;font-style:italic;color:var(--or);letter-spacing:.25em}
  nav ul{display:flex;gap:2rem;list-style:none}
  nav ul a{font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;font-weight:500;color:var(--gris-m);text-decoration:none;transition:color .3s}
  nav ul a:hover{color:var(--rose-v)}
  .n-rdv{background:var(--noir);color:var(--blanc)!important;padding:.52rem 1.4rem;font-weight:500!important;transition:background .3s!important}
  .n-rdv:hover{background:var(--rose-v)!important}
  .hbg{display:none;flex-direction:column;gap:5px;cursor:pointer;background:none;border:none}
  .hbg span{width:24px;height:1.5px;background:var(--noir);display:block}

  /* HERO */
  .hero{min-height:100vh;display:grid;grid-template-columns:55% 45%;padding-top:72px;overflow:hidden}
  .hero-left{display:flex;flex-direction:column;justify-content:center;padding:4rem 3rem 4rem 4.5rem;background:var(--blanc);position:relative;z-index:2}
  .hero-tag{display:inline-flex;align-items:center;gap:.6rem;font-size:.58rem;letter-spacing:.38em;text-transform:uppercase;font-weight:600;color:var(--rose-v);margin-bottom:2rem}
  .hero-tag::before{content:'';width:28px;height:1.5px;background:var(--rose-v)}
  .brand-ns{font-family:'Playfair Display',serif;font-size:clamp(5rem,10vw,9rem);font-weight:900;line-height:.88;color:var(--noir);display:block;letter-spacing:-.02em}
  .brand-ns span{color:var(--rose-v)}
  .brand-beauty{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3.5vw,3.2rem);font-weight:400;font-style:italic;color:var(--rose);display:block;letter-spacing:.05em;line-height:1.1;margin-left:2px}
  .brand-by-ndeya{display:flex;align-items:center;gap:.8rem;margin-top:.5rem}
  .brand-by{font-size:.6rem;letter-spacing:.3em;text-transform:uppercase;color:var(--gris-m)}
  .brand-ndeya{font-family:'Playfair Display',serif;font-size:clamp(1.2rem,2.5vw,2rem);font-weight:700;color:var(--or);letter-spacing:.08em}
  .hero-deco-line{width:80px;height:2px;margin:1.8rem 0;background:linear-gradient(90deg,var(--rose-v),var(--or))}
  .hero-desc{font-size:.85rem;line-height:2;color:var(--gris-m);max-width:420px;margin-bottom:2.5rem}
  .hero-desc strong{color:var(--rose-v);font-weight:600}
  .hero-btns{display:flex;gap:1rem;flex-wrap:wrap}
  .btn-noir{background:var(--noir);color:var(--blanc);font-family:'Montserrat',sans-serif;font-size:.62rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;padding:1rem 2.4rem;border:none;cursor:pointer;transition:background .3s,transform .2s}
  .btn-noir:hover{background:var(--rose-v);transform:translateY(-2px)}
  .btn-rose-o{background:transparent;color:var(--rose-v);font-family:'Montserrat',sans-serif;font-size:.62rem;font-weight:500;letter-spacing:.22em;text-transform:uppercase;padding:1rem 2.4rem;border:1.5px solid var(--rose);cursor:pointer;transition:all .3s}
  .btn-rose-o:hover{background:var(--rose-v);color:var(--blanc);border-color:var(--rose-v)}
  .hero-right{position:relative;overflow:hidden;background:var(--rose-p)}
  .hero-right-inner{position:absolute;inset:0;display:flex;flex-direction:column}
  .h-top-block{flex:0 0 45%;background:var(--rose-v);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
  .h-top-block::before{content:'NS';font-family:'Playfair Display',serif;font-size:14rem;font-weight:900;color:rgba(255,255,255,.07);position:absolute;line-height:1}
  .h-top-label{position:relative;z-index:2;text-align:center}
  .h-top-label span{display:block;font-family:'Playfair Display',serif;font-style:italic;color:rgba(255,255,255,.9);letter-spacing:.15em}
  .h-top-label .big{font-size:clamp(1.5rem,3vw,2.5rem);font-weight:400}
  .h-top-label .small{font-size:.62rem;letter-spacing:.45em;text-transform:uppercase;opacity:.65;margin-top:.4rem}
  .h-mid-block{flex:0 0 28%;background:var(--blanc);display:flex;align-items:center;justify-content:center;padding:1.5rem 2rem;border-bottom:1px solid var(--rose-p)}
  .h-mid-stats{display:flex;gap:2.5rem}
  .h-stat{text-align:center}
  .h-stat-num{font-family:'Playfair Display',serif;font-size:2rem;font-weight:900;color:var(--rose-v);line-height:1}
  .h-stat-lbl{font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;color:var(--gris-m);margin-top:.2rem}
  .h-bot-block{flex:1;background:var(--or);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden}
  .h-bot-block::before{content:'✦';font-size:8rem;color:rgba(255,255,255,.1);position:absolute}
  .h-bot-text{position:relative;z-index:2;text-align:center;font-family:'Playfair Display',serif;font-size:.75rem;letter-spacing:.3em;text-transform:uppercase;color:rgba(255,255,255,.8)}

  /* MARQUEE */
  .mq{background:var(--noir);overflow:hidden;padding:.75rem 0}
  .mq-t{display:inline-block;animation:mq 32s linear infinite;white-space:nowrap;font-size:.58rem;letter-spacing:.32em;text-transform:uppercase;color:rgba(255,255,255,.5);font-weight:400}
  .mq-t b{color:var(--rose);font-weight:400;margin:0 .4rem}
  @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

  /* SECTIONS */
  .sec{padding:6rem 4.5rem}
  .sec-rose{background:var(--rose-xl)}
  .sec-rose2{background:var(--rose-p)}
  .sec-gris{background:var(--gris-c)}
  .sec-noir{background:var(--noir)}

  .s-kicker{font-size:.58rem;letter-spacing:.42em;text-transform:uppercase;font-weight:600;color:var(--rose-v);margin-bottom:.9rem;display:flex;align-items:center;gap:.7rem}
  .s-kicker::before{content:'';width:22px;height:1.5px;background:var(--rose-v)}
  .s-h1{font-family:'Playfair Display',serif;font-size:clamp(2.2rem,4vw,3.8rem);font-weight:700;line-height:1.1;color:var(--noir);margin-bottom:.8rem}
  .s-h1 em{font-style:italic;color:var(--rose-v)}
  .s-h1-lt{color:var(--blanc)!important}
  .s-sep{display:flex;align-items:center;gap:1rem;margin:1.4rem 0}
  .s-sep::before,.s-sep::after{content:'';flex:0 0 32px;height:1px;background:var(--rose)}
  .s-sep-dot{width:5px;height:5px;background:var(--rose-v);border-radius:50%}
  .s-p{font-size:.85rem;line-height:1.95;color:var(--gris-m);max-width:520px;font-weight:300}
  .s-p-lt{color:rgba(255,255,255,.55)!important}

  /* SERVICES */
  .srv-layout{display:grid;grid-template-columns:1fr 2fr;gap:4rem;align-items:start;margin-top:1rem}
  .srv-grid{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:var(--rose-p)}
  .srv-card{background:var(--blanc);padding:2rem 1.6rem;position:relative;overflow:hidden;transition:background .3s,transform .3s}
  .srv-card:hover{background:var(--rose-xl);transform:translateY(-4px)}
  .srv-card::after{content:'';position:absolute;left:0;top:0;bottom:0;width:2px;background:var(--rose-p);transition:background .3s}
  .srv-card:hover::after{background:var(--rose-v)}
  .srv-ico{font-size:1.6rem;margin-bottom:.9rem}
  .srv-name{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--noir);margin-bottom:.35rem}
  .srv-desc{font-size:.76rem;line-height:1.75;color:var(--gris-m);margin-bottom:.7rem}
  .srv-tag{font-size:.55rem;letter-spacing:.18em;text-transform:uppercase;font-weight:600;color:var(--rose-v)}
  .depl-strip{background:var(--noir);margin-top:4rem;display:flex;align-items:center;justify-content:space-between;padding:2rem 3rem;gap:2rem;flex-wrap:wrap}
  .depl-kicker{font-size:.55rem;letter-spacing:.3em;text-transform:uppercase;color:var(--rose);font-weight:500;margin-bottom:.4rem}
  .depl-title{font-family:'Playfair Display',serif;font-size:1.4rem;font-style:italic;color:var(--blanc)}
  .depl-sub{font-size:.75rem;color:rgba(255,255,255,.4);margin-top:.25rem}

  /* TARIFS */
  .tar-layout{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rose-p);margin-top:3rem}
  .tar-card{background:var(--blanc);padding:2rem 1.6rem;position:relative;overflow:hidden;transition:background .3s,transform .3s}
  .tar-card:hover{background:var(--rose-xl);transform:translateY(-4px)}
  .tar-card.featured{background:var(--noir)}
  .tar-card.featured:hover{background:var(--noir-s)}
  .tar-cat{font-size:.53rem;letter-spacing:.28em;text-transform:uppercase;font-weight:600;color:var(--rose-v);margin-bottom:.5rem}
  .tar-card.featured .tar-cat{color:var(--rose)}
  .tar-name{font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;color:var(--noir);margin-bottom:.3rem}
  .tar-card.featured .tar-name{color:var(--blanc)}
  .tar-det{font-size:.74rem;color:var(--gris-m);line-height:1.6;margin-bottom:.9rem}
  .tar-card.featured .tar-det{color:rgba(255,255,255,.45)}
  .tar-price{font-family:'Playfair Display',serif;font-size:1.8rem;font-weight:900;color:var(--rose-v)}
  .tar-card.featured .tar-price{color:var(--or)}
  .tar-note{font-size:.58rem;color:var(--gris-m);margin-top:.2rem}
  .tar-card.featured .tar-note{color:rgba(255,255,255,.3)}
  .tar-badge{position:absolute;top:1rem;right:1rem;background:var(--rose-v);color:var(--blanc);font-size:.52rem;letter-spacing:.1em;text-transform:uppercase;font-weight:700;padding:.28rem .7rem;border-radius:20px}

  /* NANTYS */
  .nan-layout{display:grid;grid-template-columns:1fr 1fr;min-height:65vh}
  .nan-left{background:var(--noir);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:4rem;position:relative;overflow:hidden;text-align:center}
  .nan-left::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(232,160,168,.12) 0%,transparent 70%)}
  .nan-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(232,160,168,.08) 1px,transparent 1px);background-size:24px 24px}
  .nan-logo-wrap{position:relative;z-index:2}
  .nan-n{font-family:'Playfair Display',serif;font-size:clamp(3.5rem,7vw,6rem);font-weight:900;font-style:italic;color:var(--rose);line-height:.9;display:block}
  .nan-s{font-family:'Playfair Display',serif;font-size:clamp(2rem,4vw,3.5rem);font-weight:400;font-style:italic;color:var(--or);display:block;margin-top:.2rem}
  .nan-tagline{font-size:.58rem;letter-spacing:.45em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-top:1.2rem}
  .nan-right{background:var(--rose-xl);display:flex;flex-direction:column;justify-content:center;padding:4rem 3.5rem}
  .nan-prods{display:flex;flex-direction:column;gap:.8rem;margin-top:2rem}
  .np{display:flex;align-items:center;gap:1.2rem;padding:1.1rem 1.4rem;background:var(--blanc);border-left:3px solid var(--rose-p);transition:border-color .3s,box-shadow .3s}
  .np:hover{border-color:var(--rose-v);box-shadow:0 4px 20px rgba(212,104,122,.1)}
  .np-ico{font-size:1.4rem;flex-shrink:0}
  .np-n{font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:var(--noir);margin-bottom:.12rem}
  .np-d{font-size:.73rem;color:var(--gris-m);line-height:1.5}

  /* MODE */
  .mode-top{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1.5rem}
  .tabs{display:flex;gap:.2rem}
  .tab{font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;font-weight:500;padding:.6rem 1.4rem;background:transparent;border:1.5px solid var(--rose-p);cursor:pointer;color:var(--gris-m);transition:all .3s}
  .tab.on{background:var(--noir);color:var(--blanc);border-color:var(--noir)}
  .tab:hover:not(.on){border-color:var(--rose-v);color:var(--rose-v)}
  .mode-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:1.2rem}
  .m-card{background:var(--blanc);border:1px solid var(--rose-p);overflow:hidden;transition:transform .3s,box-shadow .3s;cursor:pointer}
  .m-card:hover{transform:translateY(-6px);box-shadow:0 16px 40px rgba(212,104,122,.15)}
  .m-img{height:170px;display:flex;align-items:center;justify-content:center;font-size:3.5rem;border-bottom:1px solid var(--rose-p)}
  .m-info{padding:.85rem 1rem}
  .m-name{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:var(--noir);margin-bottom:.15rem}
  .m-who{font-size:.58rem;letter-spacing:.12em;text-transform:uppercase;color:var(--gris-m)}

  /* SHEIN */
  .sh-layout{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center}
  .sh-feats{display:flex;flex-direction:column;gap:.9rem;margin-top:2rem}
  .sh-feat{display:flex;gap:1rem;align-items:flex-start;padding:1rem 1.2rem;background:var(--blanc);border-left:3px solid var(--rose-p);transition:border-color .3s,box-shadow .3s}
  .sh-feat:hover{border-color:var(--rose-v);box-shadow:0 4px 20px rgba(212,104,122,.1)}
  .sh-ico{font-size:1.2rem;flex-shrink:0;margin-top:.1rem}
  .sh-t{font-family:'Playfair Display',serif;font-size:.95rem;font-weight:700;color:var(--noir);margin-bottom:.15rem}
  .sh-d{font-size:.74rem;color:var(--gris-m);line-height:1.6}
  .sh-panel{background:var(--rose-p);padding:3.5rem 2.5rem;position:relative;text-align:center}
  .sh-panel::before{content:'';position:absolute;top:12px;left:12px;right:12px;bottom:12px;border:1px solid rgba(212,104,122,.25);pointer-events:none}
  .sh-panel-ico{font-size:4rem;opacity:.2;margin-bottom:1rem}
  .sh-panel-t{font-family:'Playfair Display',serif;font-size:2rem;font-style:italic;font-weight:700;color:var(--rose-v);line-height:1.2}
  .sh-panel-s{font-size:.6rem;letter-spacing:.28em;text-transform:uppercase;color:var(--gris-m);margin-top:.6rem}

  /* TESTI */
  .te-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.5rem;margin-top:3rem}
  .te-card{background:var(--blanc);padding:2.2rem 1.8rem;border-top:3px solid var(--rose-v);transition:transform .3s,box-shadow .3s}
  .te-card:hover{transform:translateY(-5px);box-shadow:0 16px 40px rgba(212,104,122,.12)}
  .te-q{font-family:'Playfair Display',serif;font-size:3.5rem;color:var(--rose-p);line-height:.6;margin-bottom:1rem}
  .te-t{font-family:'Playfair Display',serif;font-size:1rem;font-style:italic;line-height:1.7;color:var(--texte);margin-bottom:1.2rem}
  .te-s{color:var(--rose-v);font-size:.82rem;letter-spacing:.08em;margin-bottom:.5rem}
  .te-a{font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gris-m);font-weight:500}

  /* CONTACT */
  .ct-layout{display:grid;grid-template-columns:1fr 1.4fr;gap:5rem;margin-top:3rem}
  .ct-info{display:flex;flex-direction:column;gap:1.8rem}
  .ct-item{display:flex;gap:1.2rem;align-items:flex-start;padding-bottom:1.8rem;border-bottom:1px solid rgba(255,255,255,.08)}
  .ct-ico{width:42px;height:42px;flex-shrink:0;background:var(--rose-v);color:var(--blanc);display:flex;align-items:center;justify-content:center;font-size:1rem}
  .ct-lbl{font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;color:var(--rose);font-weight:600;margin-bottom:.3rem}
  .ct-val{font-size:.85rem;color:rgba(255,255,255,.8)}
  .ct-form{display:flex;flex-direction:column;gap:.9rem}
  .f-row{display:grid;grid-template-columns:1fr 1fr;gap:.9rem}
  .f-field{display:flex;flex-direction:column;gap:.38rem}
  .f-lbl{font-size:.55rem;letter-spacing:.22em;text-transform:uppercase;font-weight:600;color:rgba(255,255,255,.4)}
  .f-inp,.f-sel,.f-ta{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.82rem 1rem;color:var(--blanc);font-family:'Montserrat',sans-serif;font-size:.82rem;outline:none;transition:border-color .3s;width:100%}
  .f-inp:focus,.f-sel:focus,.f-ta:focus{border-color:var(--rose)}
  .f-inp::placeholder{color:rgba(255,255,255,.22)}
  .f-ta{resize:vertical;min-height:90px}
  .f-sel option{background:var(--noir-s);color:var(--blanc)}
  .f-btn{background:var(--rose-v);color:var(--blanc);font-family:'Montserrat',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.25em;text-transform:uppercase;padding:1.05rem;border:none;cursor:pointer;transition:background .3s,transform .2s}
  .f-btn:hover{background:var(--or);color:var(--noir);transform:translateY(-2px)}
  .f-warn{font-size:.68rem;color:var(--rose);text-align:center;margin-top:.2rem}
  .f-ok{text-align:center;padding:3rem 2rem;font-family:'Playfair Display',serif;font-style:italic;color:var(--rose);font-size:1.15rem;line-height:1.7}

  /* NEWSLETTER */
  .nl{padding:5rem 4.5rem;text-align:center;background:var(--rose-p)}
  .nl-title{font-family:'Playfair Display',serif;font-size:clamp(1.8rem,3vw,2.8rem);font-weight:700;color:var(--noir);margin-bottom:.5rem}
  .nl-sub{font-size:.8rem;color:var(--gris-m);margin-bottom:1.8rem}
  .nl-form{display:flex;max-width:400px;margin:0 auto;border:1.5px solid var(--rose)}
  .nl-inp{flex:1;padding:.88rem 1.2rem;border:none;background:var(--blanc);font-family:'Montserrat',sans-serif;font-size:.8rem;color:var(--texte);outline:none}
  .nl-inp::placeholder{color:var(--gris-m)}
  .nl-btn{background:var(--rose-v);color:var(--blanc);border:none;padding:.88rem 1.6rem;font-family:'Montserrat',sans-serif;font-size:.58rem;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;font-weight:600;transition:background .3s}
  .nl-btn:hover{background:var(--noir)}
  .nl-ok{font-family:'Playfair Display',serif;font-style:italic;font-size:1.1rem;color:var(--rose-v)}

  /* FOOTER */
  footer{background:var(--noir);color:rgba(255,255,255,.35);padding:4rem 4.5rem;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem}
  .f-brand{font-family:'Playfair Display',serif;font-size:1.4rem;font-weight:900;color:var(--blanc);margin-bottom:.2rem}
  .f-brand em{font-style:italic;color:var(--rose)}
  .f-tagline{font-size:.74rem;line-height:1.8;margin-top:.4rem}
  .f-soc{display:flex;gap:.6rem;margin-top:1.2rem}
  .fsb{width:34px;height:34px;border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;font-size:.82rem;cursor:pointer;transition:all .3s;color:rgba(255,255,255,.4);text-decoration:none}
  .fsb:hover{background:var(--rose-v);border-color:var(--rose-v);color:var(--blanc)}
  .fc-t{font-size:.57rem;letter-spacing:.25em;text-transform:uppercase;color:var(--rose);font-weight:600;margin-bottom:1rem}
  .fc ul{list-style:none}
  .fc li{font-size:.75rem;margin-bottom:.55rem;cursor:pointer;transition:color .3s}
  .fc li:hover{color:var(--blanc)}
  .fbot{background:var(--noir);border-top:1px solid rgba(255,255,255,.05);padding:1.1rem 4.5rem;display:flex;justify-content:space-between;align-items:center;font-size:.6rem;color:rgba(255,255,255,.18);flex-wrap:wrap;gap:.4rem}
  .fbot em{color:var(--rose);font-style:normal}

  @media(max-width:900px){
    nav{padding:1rem 1.5rem}
    nav ul{display:none}
    .hbg{display:flex}
    .hero{grid-template-columns:1fr}
    .hero-left{padding:4rem 1.8rem 3rem}
    .hero-right{height:50vh}
    .sec{padding:4rem 1.5rem}
    .srv-layout{grid-template-columns:1fr;gap:2rem}
    .srv-grid{grid-template-columns:1fr}
    .tar-layout{grid-template-columns:1fr 1fr}
    .nan-layout{grid-template-columns:1fr}
    .nan-left{min-height:260px}
    .nan-right{padding:3rem 1.5rem}
    .sh-layout,.ct-layout{grid-template-columns:1fr}
    footer{grid-template-columns:1fr 1fr;gap:2rem;padding:2.5rem 1.5rem}
    .fbot{padding:1rem 1.5rem}
    .f-row{grid-template-columns:1fr}
    .nl{padding:4rem 1.5rem}
    .depl-strip{padding:1.8rem 1.5rem}
    .mode-top{flex-direction:column;align-items:flex-start}
  }
  @media(max-width:560px){
    .tar-layout{grid-template-columns:1fr}
    footer{grid-template-columns:1fr}
    .h-mid-stats{gap:1.5rem}
  }
`;

const SERVICES = [
  { icon: "💄", name: "Makeup Événement", tag: "Sur rendez-vous", desc: "Mariage, baptême, anniversaire, soirée... Ndeya sublime votre regard pour chaque occasion spéciale." },
  { icon: "📸", name: "Makeup Shooting", tag: "Photo & Vidéo", desc: "Maquillage longue tenue pensé pour la caméra, parfait sous toutes les lumières." },
  { icon: "🌙", name: "Makeup Quotidien", tag: "Tendances", desc: "Look naturel, smoky eye, contouring... Adapté à votre morphologie et vos envies." },
  { icon: "👰🏾", name: "Makeup Mariée", tag: "Package complet", desc: "Essai inclus, maquillage le jour J et assistance. Une mariée sublimée du début à la fin." },
  { icon: "🎓", name: "Cours de Maquillage", tag: "Formation", desc: "Techniques professionnelles adaptées à votre visage pour vous maquiller seule." },
  { icon: "🚗", name: "Déplacement Partout", tag: "À domicile", desc: "Ndeya vient chez vous ou dans votre lieu de célébration. Zéro stress garanti." },
];
const TARIFS = [
  { cat: "Makeup", name: "Look Simple", det: "Teint + yeux discrets + lèvres", price: "3 000 F", pop: false },
  { cat: "Makeup", name: "Look Complet", det: "Fond de teint + contouring + yeux + lèvres", price: "5 000 F", pop: true },
  { cat: "Makeup", name: "Look Mariée", det: "Essai offert + Jour J + retouches", price: "Sur devis", pop: false },
  { cat: "Makeup", name: "Shooting / Clip", det: "Longue tenue — studio ou extérieur", price: "Sur devis", pop: false },
  { cat: "Formation", name: "Cours Particulier", det: "Techniques personnalisées", price: "Sur devis", pop: false },
  { cat: "Déplacement", name: "Frais km", det: "À partir de 5 km du centre-ville", price: "Sur devis", note: "Gratuit dans un rayon de 5 km", pop: false },
];
const NANTYS = [
  { icon: "🧴", name: "Spray Hydratant", desc: "Hydratation intense et réparation en profondeur" },
  { icon: "💧", name: "Huiles Capillaires", desc: "Mélanges précieux pour nourrir et faire briller" },
  { icon: "🧈", name: "Beurre de Karité", desc: "Nutrition profonde pour des cheveux souples et doux" },
];
const MODE = {
  femme: [
    { icon: "👗", bg: "#FEF0F3", name: "Robes & Tenues", who: "Femme · Prêt-à-porter" },
    { icon: "👡", bg: "#FFF5E6", name: "Chaussures", who: "Femme · Tendances" },
    { icon: "💎", bg: "#F5EEF8", name: "Perruques & Extensions", who: "Femme · Coiffure" },
    { icon: "🕶️", bg: "#EEF8FF", name: "Lunettes", who: "Femme · Accessoires" },
    { icon: "👜", bg: "#FFFDE7", name: "Sacs & Pochettes", who: "Femme · Accessoires" },
    { icon: "💍", bg: "#FEF0F3", name: "Bijoux & Parures", who: "Femme · Glamour" },
  ],
  homme: [
    { icon: "👔", bg: "#EEF2FF", name: "Chemises & Hauts", who: "Homme · Classique" },
    { icon: "👟", bg: "#EDFCF4", name: "Chaussures", who: "Homme · Style" },
    { icon: "🕶️", bg: "#FFFDE7", name: "Lunettes", who: "Homme · Accessoires" },
    { icon: "⌚", bg: "#FEF0F3", name: "Montres & Bracelets", who: "Homme · Premium" },
    { icon: "🧢", bg: "#EEF2FF", name: "Casquettes & Chapeaux", who: "Homme · Streetwear" },
    { icon: "🎒", bg: "#FFF5E6", name: "Sacs & Portefeuilles", who: "Homme · Pratique" },
  ],
};
const SHEIN_FEATS = [
  { icon: "🛍️", t: "Sélection personnalisée", d: "Ndeya choisit pour vous les meilleures pièces selon votre style et votre budget." },
  { icon: "📦", t: "Panier clé en main", d: "Vous n'avez qu'à valider — tailles, couleurs et looks déjà pensés pour vous." },
  { icon: "👗", t: "Conseils mode inclus", d: "Recommandations de looks complets pour un résultat stylé et cohérent." },
  { icon: "💬", t: "Commande via WhatsApp", d: "Simple et rapide — parlez à Ndeya de vos envies, elle s'occupe du reste." },
];

export default function NSBeauty() {
  const [tab, setTab] = useState("femme");
  const [form, setForm] = useState({ nom: "", tel: "", service: "", msg: "" });
  const [sent, setSent] = useState(false);
  const [nl, setNl] = useState("");
  const [nlOk, setNlOk] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add("on") }),
      { threshold: .08 }
    );
    document.querySelectorAll(".rv,.rvl,.rvr").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const sendWA = () => {
    if (!form.nom || !form.tel) return;
    const msg = `Bonjour Ndeya ! 👋%0A%0AJe souhaite prendre rendez-vous via votre site NS Beauty.%0A%0A👤 *Prénom :* ${form.nom}%0A📱 *Mon numéro :* ${form.tel}%0A💄 *Service :* ${form.service || "Non précisé"}%0A📝 *Message :* ${form.msg || "—"}%0A%0AMerci ! 🌸`;
    window.open(`https://wa.me/221772309554?text=${msg}`, "_blank");
    setSent(true);
  };

  return (<>
    <style>{CSS}</style>

    <nav>
      <div className="nav-logo">
        <span className="nav-logo-top">NS <span>Beauty</span></span>
        <span className="nav-logo-bot">by Ndeya</span>
      </div>
      <ul>
        {[["Services", "services"], ["Tarifs", "tarifs"], ["Nanty's Secret", "nantys"], ["Mode", "mode"], ["Shein", "shein"], ["Contact", "contact"]].map(([l, id]) => (
          <li key={l}><a href={`#${id}`}>{l}</a></li>
        ))}
        <li><a href="#contact" className="n-rdv">Réserver</a></li>
      </ul>
      <button className="hbg"><span /><span /><span /></button>
    </nav>

    {/* HERO */}
    <section className="hero" id="accueil">
      <div className="hero-left">
        <p className="hero-tag rv">Beauté · Glamour · Confiance</p>
        <div className="rv">
          <span className="brand-ns">N<span>S</span></span>
          <span className="brand-beauty">Beauty</span>
          <div className="brand-by-ndeya">
            <span className="brand-by">by</span>
            <span className="brand-ndeya">Ndeya</span>
          </div>
        </div>
        <div className="hero-deco-line rv" />
        <p className="hero-desc rv">
          Maquilleuse professionnelle avec déplacement · Gamme capillaire <strong>Nanty's Secret</strong> · Mode, chaussures, perruques, lunettes · Paniers Shein · Tenues prêt-à-porter.
        </p>
        <div className="hero-btns rv">
          <button className="btn-noir" onClick={() => go("contact")}>Prendre rendez-vous</button>
          <button className="btn-rose-o" onClick={() => go("services")}>Découvrir</button>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-right-inner">
          <div className="h-top-block">
            <div className="h-top-label">
              <span className="big">Maquilleuse</span>
              <span className="small">Professionnelle · Avec Déplacement</span>
            </div>
          </div>
          <div className="h-mid-block">
            <div className="h-mid-stats">
              {[["100%", "Naturel"], ["5★", "Avis clients"], ["24h", "Réponse"]].map(([n, l]) => (
                <div className="h-stat" key={l}><div className="h-stat-num">{n}</div><div className="h-stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="h-bot-block">
            <div className="h-bot-text">✦ Nanty's Secret · Gamme Capillaire ✦</div>
          </div>
        </div>
      </div>
    </section>

    <div className="mq">
      <div className="mq-t">
        {Array(6).fill(null).map((_, i) => (
          <span key={i}>Makeup <b>·</b> Nanty's Secret <b>·</b> Mode <b>·</b> Chaussures <b>·</b> Perruques <b>·</b> Lunettes <b>·</b> Paniers Shein <b>·</b> Déplacement <b>·</b> </span>
        ))}
      </div>
    </div>

    {/* SERVICES */}
    <section className="sec" id="services">
      <div className="srv-layout">
        <div className="srv-aside rvl">
          <p className="s-kicker">Nos Prestations</p>
          <h2 className="s-h1">Services<br /><em>Makeup</em><br />& Beauté</h2>
          <div className="s-sep"><div className="s-sep-dot" /></div>
          <p className="s-p">Ndeya met son expertise et sa passion au service de votre beauté, où que vous soyez. Chaque prestation est unique et personnalisée.</p>
          <button className="btn-noir" style={{ marginTop: "2rem" }} onClick={() => go("contact")}>Prendre RDV</button>
        </div>
        <div className="srv-grid rv">
          {SERVICES.map((s, i) => (
            <div className="srv-card" key={i}>
              <div className="srv-ico">{s.icon}</div>
              <div className="srv-name">{s.name}</div>
              <div className="srv-desc">{s.desc}</div>
              <div className="srv-tag">{s.tag}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="depl-strip rv">
        <div>
          <div className="depl-kicker">Mobilité totale</div>
          <div className="depl-title">✈️ Ndeya se déplace partout pour vous</div>
          <div className="depl-sub">Domicile · Salle de fête · Studio · Hôtel · Partout</div>
        </div>
        <button className="btn-rose-o" style={{ borderColor: "rgba(255,255,255,.3)", color: "rgba(255,255,255,.7)" }} onClick={() => go("contact")}>Demander un devis</button>
      </div>
    </section>

    {/* TARIFS */}
    <section className="sec sec-gris" id="tarifs">
      <div className="rv" style={{ textAlign: "center" }}>
        <p className="s-kicker" style={{ justifyContent: "center" }}>Transparence</p>
        <h2 className="s-h1" style={{ textAlign: "center" }}>Nos <em>Tarifs</em> Makeup</h2>
        <div className="s-sep" style={{ justifyContent: "center" }}><div className="s-sep-dot" /></div>
        <p className="s-p" style={{ margin: "0 auto", textAlign: "center" }}>Des tarifs accessibles pour un maquillage de qualité. Chaque prestation est personnalisée.</p>
      </div>
      <div className="tar-layout">
        {TARIFS.map((t, i) => (
          <div className={`tar-card rv ${t.pop ? "featured" : ""}`} key={i} style={{ transitionDelay: `${i * .07}s` }}>
            {t.pop && <div className="tar-badge">⭐ Populaire</div>}
            <div className="tar-cat">{t.cat}</div>
            <div className="tar-name">{t.name}</div>
            <div className="tar-det">{t.det}</div>
            <div className="tar-price">{t.price}</div>
            {t.note && <div className="tar-note">{t.note}</div>}
          </div>
        ))}
      </div>
      <p className="rv" style={{ textAlign: "center", marginTop: "1.5rem", fontSize: ".74rem", color: "var(--gris-m)" }}>
        💬 Contactez Ndeya directement pour un devis personnalisé selon votre événement.
      </p>
    </section>

    {/* NANTYS */}
    <section id="nantys" className="nan-layout">
      <div className="nan-left">
        <div className="nan-dots" />
        <div className="nan-logo-wrap rv">
          <span className="nan-n">Nanty's</span>
          <span className="nan-s">Secret</span>
          <div className="nan-tagline">Gamme Capillaire Naturelle</div>
        </div>
      </div>
      <div className="nan-right">
        <div className="rvl">
          <p className="s-kicker">Capillaire</p>
          <h2 className="s-h1">La beauté des cheveux,<br /><em>c'est aussi notre métier</em></h2>
          <div className="s-sep"><div className="s-sep-dot" /></div>
          <p className="s-p">Nanty's Secret est la gamme capillaire créée par Ndeya — soins naturels pour cheveux crépus, frisés et bouclés. Hydratation, brillance et santé.</p>
        </div>
        <div className="nan-prods">
          {NANTYS.map((p, i) => (
            <div className="np rv" key={i} style={{ transitionDelay: `${i * .1}s` }}>
              <div className="np-ico">{p.icon}</div>
              <div><div className="np-n">{p.name}</div><div className="np-d">{p.desc}</div></div>
            </div>
          ))}
        </div>
        <button className="btn-noir rv" style={{ marginTop: "2rem", alignSelf: "flex-start" }} onClick={() => go("contact")}>Commander la gamme</button>
      </div>
    </section>

    {/* MODE */}
    <section className="sec sec-rose" id="mode">
      <div className="mode-top">
        <div className="rv">
          <p className="s-kicker">Style & Fashion</p>
          <h2 className="s-h1">Mode & <em>Accessoires</em></h2>
          <div className="s-sep"><div className="s-sep-dot" /></div>
          <p className="s-p">Chaussures, perruques, lunettes, tenues et accessoires pour femme et homme.</p>
        </div>
        <div className="tabs rv">
          {["femme", "homme"].map(t => (
            <button key={t} className={`tab ${tab === t ? "on" : ""}`} onClick={() => setTab(t)}>
              {t === "femme" ? "👩🏾 Femme" : "👨🏾 Homme"}
            </button>
          ))}
        </div>
      </div>
      <div className="mode-grid">
        {MODE[tab].map((m, i) => (
          <div className="m-card rv" key={i} style={{ transitionDelay: `${i * .06}s` }}>
            <div className="m-img" style={{ background: m.bg }}>{m.icon}</div>
            <div className="m-info"><div className="m-name">{m.name}</div><div className="m-who">{m.who}</div></div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2.5rem" }} className="rv">
        <button className="btn-noir" onClick={() => go("contact")}>Voir le catalogue complet</button>
      </div>
    </section>

    {/* SHEIN */}
    <section className="sec" id="shein">
      <div className="sh-layout">
        <div className="rvl">
          <p className="s-kicker">Shopping Facilité</p>
          <h2 className="s-h1">Paniers <em>Shein</em><br />by Ndeya</h2>
          <div className="s-sep"><div className="s-sep-dot" /></div>
          <p className="s-p">Plus besoin de passer des heures sur Shein. Ndeya compose votre panier sur mesure — votre style, votre taille, votre budget.</p>
          <div className="sh-feats">
            {SHEIN_FEATS.map((f, i) => (
              <div className="sh-feat" key={i}>
                <div className="sh-ico">{f.icon}</div>
                <div><div className="sh-t">{f.t}</div><div className="sh-d">{f.d}</div></div>
              </div>
            ))}
          </div>
          <button className="btn-noir" style={{ marginTop: "2rem" }} onClick={() => go("contact")}>Commander mon panier</button>
        </div>
        <div className="sh-panel rvr">
          <div className="sh-panel-ico">🛍️</div>
          <div className="sh-panel-t">Votre style,<br />notre sélection</div>
          <div className="sh-panel-s">Mode · Chaussures · Perruques · Lunettes</div>
        </div>
      </div>
    </section>

    {/* TESTI */}
    <section className="sec sec-rose2" id="temoignages">
      <div className="rv" style={{ textAlign: "center" }}>
        <p className="s-kicker" style={{ justifyContent: "center" }}>Elles nous font confiance</p>
        <h2 className="s-h1" style={{ textAlign: "center" }}><em>Témoignages</em></h2>
        <div className="s-sep" style={{ justifyContent: "center" }}><div className="s-sep-dot" /></div>
      </div>
      <div className="te-grid">
        {[
          { t: "Ma peau n'a jamais été aussi sublimée. Ndeya est d'une précision et d'une douceur remarquables.", a: "Aminata D. · Dakar", s: "★★★★★" },
          { t: "Le déplacement à domicile a tout changé — je me suis préparée sans stress et j'étais magnifique.", a: "Rokhaya M. · Saint-Louis", s: "★★★★★" },
          { t: "La gamme Nanty's Secret a transformé mes cheveux. Plus d'hydratation, plus d'éclat, plus de casse.", a: "Fatou B. · Thiès", s: "★★★★★" },
        ].map((te, i) => (
          <div className="te-card rv" key={i} style={{ transitionDelay: `${i * .1}s` }}>
            <div className="te-q">"</div>
            <p className="te-t">{te.t}</p>
            <div className="te-s">{te.s}</div>
            <div className="te-a">{te.a}</div>
          </div>
        ))}
      </div>
    </section>

    {/* CONTACT */}
    <section className="sec sec-noir" id="contact">
      <div className="rv" style={{ textAlign: "center", marginBottom: "1rem" }}>
        <p className="s-kicker" style={{ justifyContent: "center", color: "var(--rose)" }}>Contactez-nous</p>
        <h2 className="s-h1 s-h1-lt" style={{ textAlign: "center" }}>Prendre <em style={{ color: "var(--rose)" }}>Rendez-vous</em></h2>
        <div className="s-sep" style={{ justifyContent: "center" }}><div className="s-sep-dot" style={{ background: "var(--rose)" }} /></div>
        <p className="s-p s-p-lt" style={{ margin: "0 auto", textAlign: "center" }}>Makeup, capillaire, mode ou panier Shein — contactez Ndeya directement.</p>
      </div>
      <div className="ct-layout">
        <div className="ct-info rvl">
          {[
            { icon: "📍", lbl: "Zone d'intervention", val: "Déplacement partout — Dakar & environs" },
            { icon: "📱", lbl: "WhatsApp / Téléphone", val: "+221 77 230 95 54" },
            { icon: "📸", lbl: "Instagram", val: "@Ndeya_box" },
          ].map((c, i) => (
            <div className="ct-item" key={i}>
              <div className="ct-ico">{c.icon}</div>
              <div><div className="ct-lbl">{c.lbl}</div><div className="ct-val">{c.val}</div></div>
            </div>
          ))}
        </div>
        <div className="rvr">
          {sent ? (
            <div className="f-ok">✅ Message envoyé à Ndeya sur WhatsApp !<br /><span style={{ fontSize: ".82rem", fontStyle: "normal", color: "rgba(255,255,255,.45)" }}>Elle vous répondra très bientôt. 🌸</span></div>
          ) : (
            <div className="ct-form">
              <div className="f-row">
                <div className="f-field"><label className="f-lbl">Prénom</label><input className="f-inp" placeholder="Aïssatou" value={form.nom} onChange={e => setForm({ ...form, nom: e.target.value })} /></div>
                <div className="f-field"><label className="f-lbl">Téléphone / WhatsApp</label><input className="f-inp" placeholder="+221 77 000 00 00" value={form.tel} onChange={e => setForm({ ...form, tel: e.target.value })} /></div>
              </div>
              <div className="f-field">
                <label className="f-lbl">Service souhaité</label>
                <select className="f-sel" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">-- Choisissez --</option>
                  <option>Makeup Événement</option><option>Makeup Mariée</option>
                  <option>Makeup Quotidien / Shooting</option><option>Cours de Maquillage</option>
                  <option>Gamme Nanty's Secret</option><option>Mode & Accessoires</option>
                  <option>Chaussures</option><option>Perruques & Extensions</option>
                  <option>Lunettes</option><option>Panier Shein</option><option>Autre demande</option>
                </select>
              </div>
              <div className="f-field"><label className="f-lbl">Votre message</label><textarea className="f-ta" placeholder="Décrivez votre besoin, votre date, votre événement..." value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} /></div>
              <button className="f-btn" onClick={sendWA}>💬 Envoyer via WhatsApp</button>
              {(!form.nom || !form.tel) && <p className="f-warn">* Veuillez renseigner votre prénom et téléphone</p>}
            </div>
          )}
        </div>
      </div>
    </section>

    {/* NEWSLETTER */}
    <section className="nl">
      <p className="s-kicker" style={{ justifyContent: "center" }}>Restez connectée</p>
      <h2 className="nl-title">Les bons plans, <em style={{ fontStyle: "italic", color: "var(--rose-v)" }}>directement chez vous</em></h2>
      <p className="nl-sub">Offres exclusives, nouveautés Nanty's Secret et conseils beauté.</p>
      {nlOk ? (<p className="nl-ok">✦ Merci ! Bienvenue dans l'univers NS Beauty. 🌸</p>) : (
        <div className="nl-form">
          <input className="nl-inp" type="email" placeholder="Votre adresse e-mail" value={nl} onChange={e => setNl(e.target.value)} />
          <button className="nl-btn" onClick={() => { if (nl) setNlOk(true) }}>S'abonner</button>
        </div>
      )}
    </section>

    {/* FOOTER */}
    <footer>
      <div>
        <div className="f-brand">NS <em>Beauty</em> by Ndeya</div>
        <div className="f-tagline">Maquilleuse pro avec déplacement · Gamme Nanty's Secret · Mode, Chaussures, Perruques & Lunettes · Paniers Shein</div>
        <div className="f-soc">
          <button className="fsb">📸</button>
          <button className="fsb">💬</button>
          <button className="fsb">👍</button>
          <button className="fsb">🎵</button>
        </div>
      </div>
      <div className="fc"><div className="fc-t">Makeup</div><ul>{["Événement", "Mariée", "Shooting", "Cours", "Domicile"].map(l => <li key={l}>{l}</li>)}</ul></div>
      <div className="fc"><div className="fc-t">Boutique</div><ul>{["Nanty's Secret", "Chaussures", "Perruques", "Lunettes", "Paniers Shein"].map(l => <li key={l}>{l}</li>)}</ul></div>
      <div className="fc"><div className="fc-t">Infos</div><ul>{["Tarifs", "Contact", "Instagram", "WhatsApp"].map(l => <li key={l}>{l}</li>)}</ul></div>
    </footer>
    <div className="fbot"><em>© 2026 NS Beauty by Ndeya</em><span>Fait avec ♥ · Tous droits réservés</span></div>
  </>);
}
