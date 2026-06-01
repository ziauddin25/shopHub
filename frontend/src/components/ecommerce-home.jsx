import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag, Search, ShoppingCart, Menu, X, ArrowRight,
  Truck, Star, Package, Heart, TrendingUp, Sparkles, Zap,
  Zap as ZapIcon, Shield, Gift, RefreshCw, Globe, Headphones, Award,
  ChevronDown, HelpCircle, Check, Mail,
  Twitter, Facebook, Instagram, Linkedin, Youtube,
} from "lucide-react";

const N="#355872", ND="#1e3a4f", NL="#4a7494", CY="#06b6d4", ORANGE="#f97316";

/* ═══════════════════════════════
   FILE 1: Navbar.jsx
═══════════════════════════════ */
const NAV_LINKS=[{label:"Home",href:"#home"},{label:"Shop",href:"#features"},{label:"Features",href:"#features"},{label:"FAQ",href:"#faq"},{label:"Contact",href:"#cta"}];

function Navbar(){
  const[scrolled,setScrolled]=useState(false);
  const[mobileOpen,setMobileOpen]=useState(false);
  useEffect(()=>{const fn=()=>setScrolled(window.scrollY>40);window.addEventListener("scroll",fn);return()=>window.removeEventListener("scroll",fn);},[]);
  return(
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:999,background:scrolled?`${N}f2`:N,backdropFilter:scrolled?"blur(20px)":"none",WebkitBackdropFilter:scrolled?"blur(20px)":"none",boxShadow:scrolled?`0 4px 30px ${N}60`:"none",transition:"all .4s ease"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"12px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
        <a href="#home" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none",flexShrink:0}}>
          <div style={{position:"relative"}}>
            <div style={{width:40,height:40,borderRadius:12,background:"white",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 16px rgba(0,0,0,.22)"}}><ShoppingBag size={20} style={{color:N}} strokeWidth={2.5}/></div>
            <span style={{position:"absolute",top:-3,right:-3,width:10,height:10,background:ORANGE,borderRadius:"50%",border:"2px solid white",display:"block"}}/>
          </div>
          <div>
            <div style={{color:"white",fontWeight:900,fontSize:18,lineHeight:1,letterSpacing:"-0.5px"}}>ShopHub</div>
            <div style={{color:"rgba(255,255,255,.45)",fontSize:9,fontWeight:600,textTransform:"uppercase",letterSpacing:".18em",marginTop:2}}>Marketplace</div>
          </div>
        </a>
        <div className="nav-links" style={{display:"flex",alignItems:"center",gap:4}}>
          {NAV_LINKS.map(link=>(
            <a key={link.label} href={link.href}
              style={{position:"relative",color:"rgba(255,255,255,.78)",textDecoration:"none",fontSize:14,fontWeight:500,padding:"8px 14px",borderRadius:9,transition:"all .22s",overflow:"hidden"}}
              onMouseEnter={e=>{e.currentTarget.style.color="white";e.currentTarget.style.background="rgba(255,255,255,.12)";const u=e.currentTarget.querySelector(".uline");if(u)u.style.width="70%";}}
              onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,.78)";e.currentTarget.style.background="transparent";const u=e.currentTarget.querySelector(".uline");if(u)u.style.width="0%";}}
            >
              {link.label}
              <span className="uline" style={{position:"absolute",bottom:5,left:"50%",transform:"translateX(-50%)",height:2,width:"0%",background:"white",borderRadius:999,transition:"width .3s ease",display:"block"}}/>
            </a>
          ))}
        </div>
        <div className="nav-actions" style={{display:"flex",alignItems:"center",gap:8}}>
          <button style={{padding:8,background:"rgba(255,255,255,.1)",border:"none",borderRadius:9,cursor:"pointer",color:"rgba(255,255,255,.75)",display:"flex",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.2)";e.currentTarget.style.color="white";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.75)";}}
          ><Search size={17}/></button>
          <button style={{position:"relative",padding:8,background:"rgba(255,255,255,.1)",border:"none",borderRadius:9,cursor:"pointer",color:"rgba(255,255,255,.75)",display:"flex",transition:"all .2s"}}
            onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.2)";e.currentTarget.style.color="white";}}
            onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.color="rgba(255,255,255,.75)";}}
          ><ShoppingCart size={17}/><span style={{position:"absolute",top:4,right:4,width:7,height:7,background:ORANGE,borderRadius:"50%",border:"1.5px solid white"}}/></button>
          <div style={{width:1,height:20,background:"rgba(255,255,255,.18)"}}/>
          <button style={{background:"none",border:"none",color:"rgba(255,255,255,.82)",fontSize:14,fontWeight:500,padding:"8px 13px",borderRadius:9,cursor:"pointer",transition:"all .2s",whiteSpace:"nowrap"}}
            onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.1)"}
            onMouseLeave={e=>e.currentTarget.style.background="transparent"}
          >Sign In</button>
          <button style={{background:"white",color:N,fontWeight:800,fontSize:14,padding:"10px 20px",borderRadius:12,border:"none",cursor:"pointer",boxShadow:"0 4px 14px rgba(0,0,0,.15)",transition:"all .28s",whiteSpace:"nowrap"}}
            onMouseEnter={e=>{e.currentTarget.style.background="#f0f5f9";e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 8px 24px rgba(0,0,0,.2)";}}
            onMouseLeave={e=>{e.currentTarget.style.background="white";e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 4px 14px rgba(0,0,0,.15)";}}
          >Get Started →</button>
        </div>
        <button className="hamburger" onClick={()=>setMobileOpen(!mobileOpen)}
          style={{display:"none",padding:9,background:"rgba(255,255,255,.12)",border:"none",borderRadius:10,cursor:"pointer",color:"white",transition:"all .2s"}}
          onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,.22)"}
          onMouseLeave={e=>e.currentTarget.style.background="rgba(255,255,255,.12)"}
        >{mobileOpen?<X size={21}/>:<Menu size={21}/>}</button>
      </div>
      <div style={{background:ND,maxHeight:mobileOpen?"500px":"0px",overflow:"hidden",transition:"max-height .44s cubic-bezier(.4,0,.2,1)",borderTop:mobileOpen?"1px solid rgba(255,255,255,.08)":"none"}}>
        <div style={{padding:"12px 24px 24px"}}>
          {NAV_LINKS.map(link=>(
            <a key={link.label} href={link.href} onClick={()=>setMobileOpen(false)}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",borderRadius:12,color:"rgba(255,255,255,.82)",textDecoration:"none",fontSize:15,fontWeight:600,borderBottom:"1px solid rgba(255,255,255,.06)",transition:"all .22s",marginBottom:2}}
              onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.1)";e.currentTarget.style.color="white";e.currentTarget.style.paddingLeft="22px";}}
              onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="rgba(255,255,255,.82)";e.currentTarget.style.paddingLeft="16px";}}
            ><span>{link.label}</span><ArrowRight size={15} style={{opacity:.4}}/></a>
          ))}
          <div style={{display:"flex",gap:10,marginTop:18}}>
            <button style={{flex:1,padding:13,borderRadius:12,border:"1.5px solid rgba(255,255,255,.2)",background:"none",color:"rgba(255,255,255,.85)",fontSize:14,fontWeight:600,cursor:"pointer"}}>Sign In</button>
            <button style={{flex:1,padding:13,borderRadius:12,border:"none",background:"white",color:N,fontSize:14,fontWeight:800,cursor:"pointer"}}>Get Started</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════
   FILE 2: Hero.jsx
═══════════════════════════════ */
const PRODUCTS=[
  {emoji:"🎧",name:"Headphones Pro",price:"$129",tag:"Bestseller",tagColor:ORANGE},
  {emoji:"⌚",name:"Smart Watch X",price:"$249",tag:"New",tagColor:"#10b981"},
  {emoji:"👟",name:"Air Sneakers",price:"$89",tag:"50% Off",tagColor:"#ec4899"},
];
const STATS=[
  {getValue:(c)=>`${(c/1e6).toFixed(1)}M+`,label:"Products",Icon:Package},
  {getValue:()=>"10K+",label:"Sellers",Icon:TrendingUp},
  {getValue:()=>"4.9★",label:"Rating",Icon:Star},
  {getValue:()=>"5M+",label:"Shoppers",Icon:Heart},
];

function Hero(){
  const[count,setCount]=useState(0);
  useEffect(()=>{const t=setTimeout(()=>{const iv=setInterval(()=>setCount(p=>{if(p>=2000000){clearInterval(iv);return 2000000;}return p+52000;}),16);return()=>clearInterval(iv);},700);return()=>clearTimeout(t);},[]);
  return(
    <section id="home" style={{background:"linear-gradient(135deg,#f0f5f9 0%,#e4eef7 50%,#dceaf6 100%)",minHeight:"100vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",paddingTop:80}}>
      <div style={{position:"absolute",inset:0,opacity:.16,backgroundImage:`linear-gradient(${N}22 1px,transparent 1px),linear-gradient(90deg,${N}22 1px,transparent 1px)`,backgroundSize:"50px 50px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:-100,right:-100,width:520,height:520,borderRadius:"50%",background:`radial-gradient(circle,${N}28,transparent 70%)`,filter:"blur(90px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-80,left:-80,width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,#06b6d440,transparent 70%)",filter:"blur(90px)",pointerEvents:"none"}}/>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"40px 24px",width:"100%"}}>
        <div className="hero-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,alignItems:"center"}}>
          <div style={{animation:"fadeUp .8s ease forwards"}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${N}14`,border:`1.5px solid ${N}30`,borderRadius:999,padding:"6px 16px",marginBottom:24}}>
              <Sparkles size={12} style={{color:N}}/><span style={{color:N,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".14em"}}>New Season — Up to 50% Off</span>
            </div>
            <h1 style={{fontSize:"clamp(40px,5.5vw,70px)",fontWeight:900,lineHeight:1.04,letterSpacing:"-2px",color:"#0f172a",marginBottom:22}}>
              Discover &amp;{" "}<span style={{background:`linear-gradient(135deg,${N},${CY})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Shop</span><br/>the Future
            </h1>
            <p style={{color:"#5a7186",fontSize:18,lineHeight:1.72,marginBottom:34,maxWidth:460}}>Millions of products. Thousands of trusted sellers. One seamless experience built for how you actually shop today.</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:40}}>
              <button style={{display:"flex",alignItems:"center",gap:8,padding:"14px 28px",borderRadius:14,border:"none",background:`linear-gradient(135deg,${N},${NL})`,color:"white",fontWeight:800,fontSize:15,cursor:"pointer",boxShadow:`0 5px 22px ${N}45`,transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05) translateY(-1px)";e.currentTarget.style.boxShadow=`0 10px 32px ${N}58`;}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1) translateY(0)";e.currentTarget.style.boxShadow=`0 5px 22px ${N}45`;}}
              ><ZapIcon size={17}/> Start Shopping</button>
              <button style={{display:"flex",alignItems:"center",gap:8,padding:"14px 28px",borderRadius:14,border:`2px solid ${N}`,background:"white",color:N,fontWeight:700,fontSize:15,cursor:"pointer",transition:"all .3s"}}
                onMouseEnter={e=>{e.currentTarget.style.background=`${N}0a`;e.currentTarget.style.transform="scale(1.03)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="white";e.currentTarget.style.transform="scale(1)";}}
              >View Trending <ArrowRight size={16}/></button>
            </div>
            <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}}>
              {STATS.map(s=>(
                <div key={s.label} style={{textAlign:"center",padding:"13px 6px",borderRadius:14,background:"rgba(255,255,255,.78)",backdropFilter:"blur(10px)",border:"1.5px solid rgba(255,255,255,.9)",boxShadow:"0 2px 12px rgba(0,0,0,.05)",transition:"all .22s",cursor:"default"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow=`0 8px 22px ${N}1a`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,.05)";}}
                ><s.Icon size={15} style={{color:N,margin:"0 auto 4px",display:"block"}}/><div style={{fontWeight:900,fontSize:17,color:"#0f172a"}}>{s.getValue(count)}</div><div style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>{s.label}</div></div>
              ))}
            </div>
          </div>
          <div style={{position:"relative",display:"flex",justifyContent:"center",animation:"fadeUp .9s .18s ease both"}}>
            <div style={{width:330,height:450,borderRadius:40,overflow:"hidden",background:`linear-gradient(160deg,${N}2a,${N}92)`,boxShadow:`0 32px 72px ${N}48`,position:"relative",border:`2px solid ${N}38`}}>
              <div style={{position:"absolute",inset:0,backgroundImage:`radial-gradient(${N}25 1px,transparent 1px)`,backgroundSize:"22px 22px",opacity:.8}}/>
              <div style={{position:"relative",height:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:14,padding:26}}>
                <div style={{width:130,height:130,borderRadius:"50%",background:"rgba(255,255,255,.96)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 20px 56px rgba(0,0,0,.22)"}}><ShoppingBag size={62} style={{color:N}} strokeWidth={1.2}/></div>
                <div style={{textAlign:"center"}}><div style={{color:"white",fontWeight:900,fontSize:20}}>Your Store</div><div style={{color:"rgba(255,255,255,.55)",fontSize:13,marginTop:3}}>Everything in one place</div></div>
                {PRODUCTS.map((p,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,background:"rgba(255,255,255,.14)",backdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,.22)",borderRadius:12,padding:"10px 14px",width:"100%",transition:"all .25s",cursor:"pointer"}}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(255,255,255,.24)";e.currentTarget.style.transform="translateX(5px)";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,.14)";e.currentTarget.style.transform="translateX(0)";}}
                  ><span style={{fontSize:18}}>{p.emoji}</span><span style={{color:"white",fontSize:13,fontWeight:600,flex:1}}>{p.name}</span><span style={{fontSize:9,fontWeight:700,background:p.tagColor,color:"white",padding:"2px 7px",borderRadius:6,marginRight:4,whiteSpace:"nowrap"}}>{p.tag}</span><span style={{color:"#fbbf24",fontSize:14,fontWeight:800}}>{p.price}</span></div>
                ))}
              </div>
              <div style={{position:"absolute",bottom:0,left:0,right:0,height:60,background:`linear-gradient(to top,${ND},transparent)`}}/>
            </div>
            <div style={{position:"absolute",top:-14,right:-14,background:"white",borderRadius:18,padding:"12px 16px",boxShadow:"0 10px 40px rgba(0,0,0,.14)",border:"1.5px solid #f0f5f9",display:"flex",alignItems:"center",gap:10,animation:"floatBadge 3s ease-in-out infinite"}}>
              <div style={{width:36,height:36,borderRadius:10,background:`${N}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Truck size={18} style={{color:N}}/></div>
              <div><div style={{fontWeight:800,fontSize:12,color:"#0f172a"}}>FREE SHIPPING</div><div style={{fontSize:10,color:"#94a3b8"}}>On orders $50+</div></div>
            </div>
            <div style={{position:"absolute",bottom:-14,left:-14,background:"white",borderRadius:18,padding:"12px 16px",boxShadow:"0 10px 40px rgba(0,0,0,.14)",border:"1.5px solid #f0f5f9",display:"flex",alignItems:"center",gap:10,animation:"floatBadge 3s 1.6s ease-in-out infinite"}}>
              <div style={{width:36,height:36,borderRadius:10,background:"#fffbeb",display:"flex",alignItems:"center",justifyContent:"center"}}><Star size={18} style={{color:"#f59e0b",fill:"#f59e0b"}}/></div>
              <div><div style={{fontWeight:800,fontSize:12,color:"#0f172a"}}>4.9 / 5.0</div><div style={{fontSize:10,color:"#94a3b8"}}>5M+ reviews</div></div>
            </div>
            <div style={{position:"absolute",top:"44%",right:-32,background:"linear-gradient(135deg,#f97316,#fbbf24)",color:"white",borderRadius:16,padding:"10px 16px",boxShadow:"0 8px 26px rgba(249,115,22,.45)",transform:"rotate(3deg)",animation:"floatBadge 4s .5s ease-in-out infinite"}}>
              <div style={{fontWeight:900,fontSize:20,lineHeight:1}}>50%</div><div style={{fontSize:10,fontWeight:700,opacity:.88,marginTop:2}}>OFF TODAY</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FILE 3: Features.jsx
═══════════════════════════════ */
const FEATURES=[
  {Icon:Zap,emoji:"⚡",title:"Lightning Delivery",desc:"Same-day and next-day delivery in 50+ cities. Real-time tracking every step of the way.",color:ORANGE,lightBg:"#fff7ed",glow:"rgba(249,115,22,.15)"},
  {Icon:Shield,emoji:"🛡️",title:"Secure Payments",desc:"Military-grade AES-256 encryption. PCI DSS Level 1 certified. 100% money-back guarantee.",color:"#10b981",lightBg:"#ecfdf5",glow:"rgba(16,185,129,.15)"},
  {Icon:Gift,emoji:"🎁",title:"Exclusive Deals",desc:"Early access to flash sales, exclusive discounts and weekly curated collections for members.",color:"#ec4899",lightBg:"#fdf2f8",glow:"rgba(236,72,153,.15)"},
  {Icon:RefreshCw,emoji:"🔄",title:"Easy Returns",desc:"30-day hassle-free returns, no questions asked. Free doorstep pickup arranged for you.",color:"#8b5cf6",lightBg:"#f5f3ff",glow:"rgba(139,92,246,.15)"},
  {Icon:Globe,emoji:"🌍",title:"Global Catalog",desc:"2 million+ products from 10,000+ trusted sellers across 120 countries, all in one place.",color:"#0ea5e9",lightBg:"#f0f9ff",glow:"rgba(14,165,233,.15)"},
  {Icon:Headphones,emoji:"💬",title:"24/7 Support",desc:"Live chat, email and phone support around the clock. Average response time under 2 minutes.",color:N,lightBg:"#eff6ff",glow:"rgba(53,88,114,.15)"},
];

function FeatureCard({feat}){
  return(
    <div style={{borderRadius:26,padding:"28px 24px",background:feat.lightBg,border:"2px solid transparent",cursor:"pointer",position:"relative",overflow:"hidden",transition:"all .36s ease"}}
      onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-8px)";e.currentTarget.style.boxShadow=`0 20px 56px ${feat.glow},0 4px 16px rgba(0,0,0,.06)`;e.currentTarget.style.borderColor=`${feat.color}44`;e.currentTarget.querySelector(".bl").style.width="100%";e.currentTarget.querySelector(".fi").style.transform="scale(1.1) rotate(-4deg)";}}
      onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderColor="transparent";e.currentTarget.querySelector(".bl").style.width="0%";e.currentTarget.querySelector(".fi").style.transform="scale(1) rotate(0deg)";}}
    >
      <div style={{position:"absolute",top:16,right:16,fontSize:32,opacity:.12,userSelect:"none"}}>{feat.emoji}</div>
      <div className="fi" style={{width:56,height:56,borderRadius:16,background:feat.color,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:20,boxShadow:`0 8px 24px ${feat.glow}`,transition:"transform .36s ease"}}>
        <feat.Icon size={26} color="white" strokeWidth={2}/>
      </div>
      <h3 style={{fontWeight:800,fontSize:17,color:"#1e293b",marginBottom:10}}>{feat.title}</h3>
      <p style={{color:"#64748b",fontSize:14,lineHeight:1.72,margin:0}}>{feat.desc}</p>
      <div className="bl" style={{position:"absolute",bottom:0,left:0,height:3,width:"0%",background:`linear-gradient(90deg,${feat.color},${feat.color}88)`,borderRadius:999,transition:"width .5s ease"}}/>
    </div>
  );
}

function FeaturesSection(){
  return(
    <section id="features" style={{background:"white",padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:.022,backgroundImage:`radial-gradient(${N} 1.5px,transparent 1.5px)`,backgroundSize:"28px 28px",pointerEvents:"none"}}/>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <div style={{textAlign:"center",marginBottom:58}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${N}0f`,border:`1.5px solid ${N}28`,borderRadius:999,padding:"6px 16px",marginBottom:20}}>
            <Award size={12} style={{color:N}}/><span style={{color:N,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".16em"}}>Why Choose Us</span>
          </div>
          <h2 style={{fontSize:"clamp(28px,4vw,50px)",fontWeight:900,color:"#0f172a",lineHeight:1.1,marginBottom:16,letterSpacing:"-1px"}}>
            Everything You Need,{" "}<span style={{background:`linear-gradient(135deg,${N},${CY})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Nothing You Don't</span>
          </h2>
          <p style={{color:"#64748b",fontSize:18,maxWidth:500,margin:"0 auto",lineHeight:1.65}}>Built for modern shoppers who demand speed, security, and a seamless experience.</p>
        </div>
        <div className="feat-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:22}}>
          {FEATURES.map((feat,i)=><FeatureCard key={i} feat={feat}/>)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FILE 4: FAQ.jsx
═══════════════════════════════ */
const FAQS=[
  {question:"How does shipping and delivery work?",answer:"We offer Standard (3–5 days), Express (1–2 days), and Same-Day delivery in select cities. All orders over $50 qualify for free shipping with real-time tracking from dispatch to your door."},
  {question:"What is your return policy?",answer:"We have a 30-day no-hassle return policy. Just initiate a return from your account dashboard and we'll arrange free doorstep pickup. Refunds are processed in 3–5 business days to your original payment method."},
  {question:"Is my payment information safe?",answer:"Absolutely. We use AES-256 encryption and are PCI DSS Level 1 certified — the highest standard in card security. We never store raw card numbers; every transaction is fully tokenised."},
  {question:"Do you ship internationally?",answer:"Yes! We deliver to 120+ countries worldwide. International shipping takes 7–21 business days depending on your destination and the service tier you select at checkout."},
  {question:"How do I track my order?",answer:"Once your order ships you'll receive a tracking number by email. You can also track in real-time from the 'My Orders' section of your account — no extra app needed."},
];

function AccordionItem({faq,index,activeIndex,setActiveIndex}){
  const isOpen=activeIndex===index;
  const ref=useRef(null);
  const[h,setH]=useState(0);
  useEffect(()=>{if(ref.current)setH(ref.current.scrollHeight);},[]);
  return(
    <div style={{borderRadius:20,background:"white",overflow:"hidden",marginBottom:12,border:`2px solid ${isOpen?ORANGE:"#e8edf2"}`,boxShadow:isOpen?`0 8px 32px rgba(249,115,22,.14),0 2px 8px rgba(0,0,0,.04)`:"0 1px 4px rgba(0,0,0,.04)",transition:"border-color .3s,box-shadow .3s"}}>
      <button onClick={()=>setActiveIndex(isOpen?null:index)} style={{width:"100%",display:"flex",alignItems:"center",gap:14,padding:"20px 24px",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
        <span style={{width:30,height:30,borderRadius:"50%",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:800,background:isOpen?ORANGE:"#f1f5f9",color:isOpen?"white":"#94a3b8",transition:"all .3s"}}>{String(index+1).padStart(2,"00")}</span>
        <span style={{flex:1,fontWeight:700,fontSize:15,color:isOpen?"#0f172a":"#334155",transition:"color .2s"}}>{faq.question}</span>
        <ChevronDown size={20} style={{flexShrink:0,color:isOpen?ORANGE:"#94a3b8",transform:isOpen?"rotate(180deg)":"rotate(0deg)",transition:"transform .36s,color .3s"}}/>
      </button>
      <div style={{maxHeight:isOpen?h+"px":"0px",overflow:"hidden",transition:"max-height .42s cubic-bezier(.4,0,.2,1)"}}>
        <div ref={ref} style={{padding:"0 24px 22px 68px"}}>
          <div style={{height:1,background:"#f1f5f9",marginBottom:14}}/>
          <p style={{color:"#64748b",fontSize:14.5,lineHeight:1.78,margin:0}}>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

function FAQSection(){
  const[activeIndex,setActiveIndex]=useState(0);
  return(
    <section id="faq" style={{background:"#f8fafc",padding:"100px 0",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,opacity:.025,backgroundImage:`linear-gradient(${N} 1px,transparent 1px),linear-gradient(90deg,${N} 1px,transparent 1px)`,backgroundSize:"44px 44px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",right:-100,top:"50%",transform:"translateY(-50%)",width:440,height:440,borderRadius:"50%",background:`radial-gradient(circle,${ORANGE}18,transparent 70%)`,filter:"blur(80px)",pointerEvents:"none"}}/>
      <div style={{maxWidth:780,margin:"0 auto",padding:"0 24px",position:"relative"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:`${N}0f`,border:`1.5px solid ${N}28`,borderRadius:999,padding:"6px 16px",marginBottom:20}}>
            <HelpCircle size={12} style={{color:N}}/><span style={{color:N,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:".16em"}}>FAQs</span>
          </div>
          <h2 style={{fontSize:"clamp(28px,4vw,50px)",fontWeight:900,color:"#0f172a",lineHeight:1.1,marginBottom:16,letterSpacing:"-1px"}}>
            Got{" "}<span style={{background:`linear-gradient(135deg,${N},${CY})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Questions?</span>
          </h2>
          <p style={{color:"#64748b",fontSize:18,lineHeight:1.65}}>We have clear, honest answers to everything you might wonder about.</p>
        </div>
        {FAQS.map((faq,i)=><AccordionItem key={i} faq={faq} index={i} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>)}
        <div style={{marginTop:36,padding:"22px 28px",borderRadius:20,border:"2px dashed #d1dae3",background:"white",textAlign:"center"}}>
          <p style={{color:"#64748b",fontSize:14.5,margin:0}}>Still have questions? <a href="#cta" style={{color:N,fontWeight:700,textDecoration:"underline",textUnderlineOffset:3}}>Talk to our support team</a> — we respond in under 2 minutes.</p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FILE 5: CTA.jsx
═══════════════════════════════ */
const TRUST=[{Icon:Shield,label:"SSL Secured"},{Icon:Zap,label:"Instant Access"},{Icon:Star,label:"5M+ Shoppers"},{Icon:RefreshCw,label:"Cancel Anytime"}];

function CTASection(){
  const[email,setEmail]=useState("");
  const[submitted,setSubmitted]=useState(false);
  const[focused,setFocused]=useState(false);
  return(
    <section id="cta" style={{position:"relative",padding:"110px 0",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:`linear-gradient(135deg,${ND} 0%,${N} 38%,#1a6b8a 68%,#0e7490 100%)`}}/>
      <div style={{position:"absolute",inset:0,opacity:.06,backgroundImage:"linear-gradient(white 1px,transparent 1px),linear-gradient(90deg,white 1px,transparent 1px)",backgroundSize:"48px 48px",pointerEvents:"none"}}/>
      <div style={{position:"absolute",top:-140,right:-100,width:580,height:580,borderRadius:"50%",background:"radial-gradient(circle,#06b6d445,transparent 65%)",filter:"blur(80px)",pointerEvents:"none"}}/>
      <div style={{position:"absolute",bottom:-100,left:-80,width:480,height:480,borderRadius:"50%",background:"radial-gradient(circle,#f9731638,transparent 65%)",filter:"blur(80px)",pointerEvents:"none"}}/>
      <div style={{maxWidth:820,margin:"0 auto",padding:"0 24px",textAlign:"center",position:"relative"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:9,background:"rgba(255,255,255,.12)",border:"1.5px solid rgba(255,255,255,.22)",borderRadius:999,padding:"6px 16px",marginBottom:26}}>
          <span style={{width:8,height:8,borderRadius:"50%",background:ORANGE,display:"inline-block",animation:"pulse 2s infinite"}}/>
          <span style={{color:"rgba(255,255,255,.9)",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:".14em"}}>Limited-Time Offer</span>
        </div>
        <h2 style={{fontSize:"clamp(32px,5.5vw,62px)",fontWeight:900,color:"white",lineHeight:1.08,marginBottom:18,letterSpacing:"-1.5px"}}>
          Get{" "}<span style={{background:"linear-gradient(90deg,#fbbf24,#f97316)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",filter:"drop-shadow(0 0 20px rgba(249,115,22,.4))"}}>20% Off</span>{" "}Your First Order
        </h2>
        <p style={{color:"rgba(255,255,255,.72)",fontSize:18,lineHeight:1.72,maxWidth:540,margin:"0 auto 38px"}}>Join 5 million happy shoppers. Sign up today and unlock exclusive deals, early access to sales and personalised recommendations.</p>
        {!submitted?(
          <div className="cta-form" style={{display:"flex",gap:12,maxWidth:480,margin:"0 auto 18px",flexWrap:"wrap",justifyContent:"center"}}>
            <div style={{position:"relative",flex:1,minWidth:220}}>
              <Mail size={16} style={{position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",color:"rgba(255,255,255,.45)",pointerEvents:"none"}}/>
              <input type="email" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&email.trim()&&setSubmitted(true)} placeholder="Enter your email..." onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)}
                style={{width:"100%",paddingLeft:44,paddingRight:16,paddingTop:14,paddingBottom:14,background:focused?"rgba(255,255,255,.18)":"rgba(255,255,255,.13)",border:`1.5px solid ${focused?"rgba(255,255,255,.55)":"rgba(255,255,255,.25)"}`,color:"white",borderRadius:14,fontSize:15,outline:"none",transition:"all .25s",boxSizing:"border-box"}}/>
            </div>
            <button onClick={()=>email.trim()&&setSubmitted(true)} style={{display:"flex",alignItems:"center",gap:8,padding:"14px 24px",borderRadius:14,border:"none",background:"linear-gradient(135deg,#f97316,#fbbf24)",color:"white",fontWeight:800,fontSize:15,cursor:"pointer",whiteSpace:"nowrap",boxShadow:"0 6px 22px rgba(249,115,22,.45)",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 10px 30px rgba(249,115,22,.6)";}}
              onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 6px 22px rgba(249,115,22,.45)";}}
            >Claim 20% Off <ArrowRight size={16}/></button>
          </div>
        ):(
          <div style={{display:"inline-flex",alignItems:"center",gap:12,background:"rgba(255,255,255,.14)",border:"1.5px solid rgba(255,255,255,.28)",borderRadius:16,padding:"16px 26px",marginBottom:18}}>
            <div style={{width:32,height:32,borderRadius:"50%",background:"#10b981",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Check size={16} color="white" strokeWidth={2.5}/></div>
            <div style={{textAlign:"left"}}><div style={{color:"white",fontWeight:800,fontSize:16}}>You're in! 🎉</div><div style={{color:"rgba(255,255,255,.65)",fontSize:13}}>Check your inbox for your discount code</div></div>
          </div>
        )}
        <p style={{color:"rgba(255,255,255,.35)",fontSize:12,marginBottom:40}}>No spam, ever. Unsubscribe anytime. Valid for new accounts only.</p>
        <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:28,paddingTop:28,borderTop:"1px solid rgba(255,255,255,.12)"}}>
          {TRUST.map(({Icon,label})=>(
            <div key={label} style={{display:"flex",alignItems:"center",gap:8,color:"rgba(255,255,255,.55)",fontSize:13,fontWeight:500}}><Icon size={15} style={{color:"rgba(255,255,255,.4)"}}/>{label}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════
   FILE 6: Footer.jsx
═══════════════════════════════ */
const FOOTER_LINKS={
  Shop:["New Arrivals","Best Sellers","Sale Items","Top Brands","All Categories"],
  Support:["Help Center","Track Order","Returns & Refunds","Contact Us","Live Chat"],
  Company:["About Us","Careers","Press Room","Blog","Affiliate Program"],
  Legal:["Privacy Policy","Terms of Service","Cookie Policy","GDPR"],
};
const SOCIAL_ICONS=[{Icon:Twitter,label:"Twitter"},{Icon:Facebook,label:"Facebook"},{Icon:Instagram,label:"Instagram"},{Icon:Linkedin,label:"LinkedIn"},{Icon:Youtube,label:"YouTube"}];
const PAYMENTS=["💳 Visa","Mastercard","PayPal","🍎 Pay","G Pay"];

function FooterLinkCol({title,links}){
  return(
    <div style={{flex:"1 1 120px",minWidth:110}}>
      <h4 style={{color:"white",fontWeight:800,fontSize:12,textTransform:"uppercase",letterSpacing:".1em",marginBottom:16}}>{title}</h4>
      <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:9}}>
        {links.map(link=>(
          <li key={link}>
            <a href="#" style={{color:"#64748b",fontSize:13,textDecoration:"none",display:"flex",alignItems:"center",gap:6,transition:"all .18s"}}
              onMouseEnter={e=>{e.currentTarget.style.color="white";e.currentTarget.querySelector(".ld").style.width="8px";e.currentTarget.style.paddingLeft="2px";}}
              onMouseLeave={e=>{e.currentTarget.style.color="#64748b";e.currentTarget.querySelector(".ld").style.width="0px";e.currentTarget.style.paddingLeft="0px";}}
            ><span className="ld" style={{display:"inline-block",width:0,height:2,background:NL,borderRadius:999,transition:"width .2s",flexShrink:0}}/>{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer(){
  return(
    <footer style={{background:"#0a0f1a",color:"white",paddingTop:64,paddingBottom:28}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"0 24px"}}>
        <div className="footer-grid" style={{display:"flex",gap:48,marginBottom:48,flexWrap:"wrap"}}>
          <div style={{flex:"0 0 260px",minWidth:220}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
              <div style={{width:40,height:40,borderRadius:12,background:N,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px ${N}55`}}><ShoppingBag size={20} color="white" strokeWidth={2.5}/></div>
              <div><div style={{color:"white",fontWeight:900,fontSize:18,lineHeight:1}}>ShopHub</div><div style={{color:"#475569",fontSize:9,textTransform:"uppercase",letterSpacing:".18em",fontWeight:600,marginTop:3}}>Marketplace</div></div>
            </div>
            <p style={{color:"#64748b",fontSize:13.5,lineHeight:1.75,marginBottom:20}}>The future of retail is here. Millions of products, lightning-fast delivery, and a shopping experience built entirely around you.</p>
            <div style={{display:"flex",gap:8,marginBottom:22}}>
              {SOCIAL_ICONS.map(({Icon,label})=>(
                <a key={label} href="#" aria-label={label} style={{width:34,height:34,borderRadius:9,background:"#1a2236",border:"1.5px solid #242f45",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b",textDecoration:"none",transition:"all .22s"}}
                  onMouseEnter={e=>{e.currentTarget.style.background=N;e.currentTarget.style.borderColor=N;e.currentTarget.style.color="white";e.currentTarget.style.transform="translateY(-2px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#1a2236";e.currentTarget.style.borderColor="#242f45";e.currentTarget.style.color="#64748b";e.currentTarget.style.transform="translateY(0)";}}
                ><Icon size={15}/></a>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <input placeholder="Your email..." style={{flex:1,background:"#1a2236",border:"1.5px solid #242f45",color:"white",borderRadius:9,padding:"9px 12px",fontSize:12,outline:"none",transition:"border-color .2s"}}
                onFocus={e=>e.target.style.borderColor=N} onBlur={e=>e.target.style.borderColor="#242f45"}/>
              <button style={{padding:"9px 14px",borderRadius:9,border:"none",background:N,color:"white",fontSize:12,fontWeight:700,cursor:"pointer",flexShrink:0,transition:"background .2s"}}
                onMouseEnter={e=>e.currentTarget.style.background=NL} onMouseLeave={e=>e.currentTarget.style.background=N}
              >Subscribe</button>
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([title,links])=><FooterLinkCol key={title} title={title} links={links}/>)}
        </div>
        <div style={{borderTop:"1px solid #1a2236",paddingTop:22,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:14}}>
          <p style={{color:"#475569",fontSize:12}}>© 2025 ShopHub. All rights reserved. Made with ♥ for great shopping.</p>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
            <span style={{color:"#475569",fontSize:11,marginRight:4}}>We accept:</span>
            {PAYMENTS.map(m=>(
              <div key={m} style={{background:"#1a2236",border:"1px solid #242f45",borderRadius:7,padding:"4px 10px",color:"#94a3b8",fontSize:11,fontWeight:600,transition:"all .2s",cursor:"default"}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=N;e.currentTarget.style.color="white";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="#242f45";e.currentTarget.style.color="#94a3b8";}}
              >{m}</div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════
   FILE 7: App.jsx (Root)
═══════════════════════════════ */
export default function App(){
  return(
    <div style={{fontFamily:"'Outfit',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{background:white;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased;}
        input::placeholder{color:rgba(255,255,255,.38);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(28px);}to{opacity:1;transform:translateY(0);}}
        @keyframes floatBadge{0%,100%{transform:translateY(0);}50%{transform:translateY(-11px);}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1);}50%{opacity:.55;transform:scale(1.15);}}
        @media(max-width:1024px){.feat-grid{grid-template-columns:repeat(2,1fr)!important;}}
        @media(max-width:768px){
          .nav-links{display:none!important;}
          .nav-actions{display:none!important;}
          .hamburger{display:flex!important;}
          .hero-grid{grid-template-columns:1fr!important;}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important;}
          .feat-grid{grid-template-columns:1fr!important;}
          .footer-grid{flex-direction:column!important;}
          .cta-form{flex-direction:column!important;}
        }
      `}</style>
      <Navbar/>
      <Hero/>
      <FeaturesSection/>
      <FAQSection/>
      <CTASection/>
      <Footer/>
    </div>
  );
}
