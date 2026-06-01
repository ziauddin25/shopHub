import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
  ShoppingCart, Zap, Star, Heart, Search, SlidersHorizontal,
  ChevronDown, Plus, Minus, Trash2, CreditCard, MapPin,
  Lock, CheckCircle, Package, Truck, ArrowLeft, AlertCircle, ShoppingBag
} from "lucide-react";

/* ── API INSTANCE — change baseURL to your backend ── */
const API = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || "http://localhost:5000/api",
});
API.interceptors.request.use(cfg => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

const GRADIENT      = "linear-gradient(135deg, #3a86ff, #4361ee)";
const GRADIENT_DARK = "linear-gradient(135deg, #2875f0, #3450d0)";

/* ═══════════════════════════════════════════════════════════
   SECTION 1 — PRODUCT CARD GRID
═══════════════════════════════════════════════════════════ */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl p-4 animate-pulse"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}>
      <div className="bg-gray-100 rounded-xl mb-4" style={{ height: 250 }} />
      <div className="h-3 bg-gray-100 rounded w-1/3 mb-3" />
      <div className="h-5 bg-gray-100 rounded w-4/5 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
      <div className="h-6 bg-gray-100 rounded w-1/4 mb-4" />
      <div className="h-12 bg-gray-100 rounded-xl" />
    </div>
  );
}

function ProductCard({ product, onAdd, onBuyNow, idx }) {
  const [hovered, setHovered] = useState(false);
  const [btnHov,  setBtnHov]  = useState(false);
  const [wished,  setWished]  = useState(false);
  const [adding,  setAdding]  = useState(false);
  const [added,   setAdded]   = useState(false);
  const [imgErr,  setImgErr]  = useState(false);

  const handleAdd = async () => {
    setAdding(true);
    await onAdd(product);
    setAdding(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      style={{
        background: "#ffffff", borderRadius: 16, padding: 16,
        boxShadow: hovered
          ? "0 24px 60px rgba(58,134,255,0.18)"
          : "0 10px 30px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-8px)" : "none",
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {product.discount && (
        <span style={{ position:"absolute",top:22,left:22,zIndex:10,background:"#e63946",color:"white",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:100,textTransform:"uppercase" }}>
          -{product.discount}%
        </span>
      )}
      <button onClick={() => setWished(w => !w)} style={{
        position:"absolute",top:20,right:20,zIndex:10,
        width:36,height:36,borderRadius:"50%",border:"none",
        background: wished ? "#fff0f0" : "rgba(255,255,255,0.92)",
        cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
        boxShadow:"0 2px 10px rgba(0,0,0,0.1)",transition:"all 0.25s",
      }}>
        <Heart size={15} style={{ color:wished?"#e63946":"#aaa", fill:wished?"#e63946":"none" }} />
      </button>

      {/* Image */}
      <div style={{ position:"relative",height:250,borderRadius:12,overflow:"hidden",background:"#f8f9fa",marginBottom:4 }}>
        <img
          src={imgErr ? "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80" : (product.image || "")}
          alt={product.title}
          onError={() => setImgErr(true)}
          style={{
            width:"100%",height:"100%",objectFit:"cover",display:"block",
            transition:"transform 0.5s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
          }}
        />
        <div style={{
          position:"absolute",inset:0,background:"rgba(15,27,45,0.42)",borderRadius:12,
          display:"flex",alignItems:"center",justifyContent:"center",
          opacity: hovered ? 1 : 0, transition:"opacity 0.3s ease",
        }}>
          <button onClick={() => onBuyNow(product)} style={{
            background:"rgba(255,255,255,0.96)",color:"#0f1b2d",
            padding:"9px 22px",borderRadius:9,fontSize:13,fontWeight:600,
            border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:6,
          }}>
            <Zap size={13}/> Buy Now
          </button>
        </div>
      </div>

      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginTop:14 }}>
        <span style={{ fontSize:10,fontWeight:700,color:"#3a86ff",textTransform:"uppercase",letterSpacing:"1.5px" }}>
          {product.category}
        </span>
        <span style={{ display:"flex",alignItems:"center",gap:3,fontSize:12,color:"#f4a012",fontWeight:500 }}>
          <Star size={11} style={{fill:"#f4a012",color:"#f4a012"}}/>
          {(product.rating||4.5).toFixed(1)}
          <span style={{color:"#ccc",fontSize:11}}>({(product.reviews||0).toLocaleString()})</span>
        </span>
      </div>

      <h3 style={{ fontSize:18,fontWeight:600,color:"#222",marginTop:8,lineHeight:1.35,marginBottom:4 }}
          className="line-clamp-2">
        {product.title}
      </h3>
      <p style={{ fontSize:13,color:"#aaa",lineHeight:1.6,marginBottom:"auto" }} className="line-clamp-2">
        {product.description}
      </p>

      <div style={{ display:"flex",alignItems:"center",gap:10,margin:"8px 0" }}>
        <span style={{ fontSize:16,fontWeight:500,color:"#e63946" }}>${(product.price||0).toFixed(2)}</span>
        {product.originalPrice && (
          <span style={{ fontSize:13,color:"#ccc",textDecoration:"line-through" }}>${product.originalPrice.toFixed(2)}</span>
        )}
      </div>

      <button
        onClick={handleAdd}
        disabled={adding}
        onMouseEnter={() => setBtnHov(true)}
        onMouseLeave={() => setBtnHov(false)}
        style={{
          width:"100%",padding:12,border:"none",borderRadius:10,
          background: added ? "linear-gradient(135deg,#1db954,#17a348)" : btnHov ? GRADIENT_DARK : GRADIENT,
          color:"white",fontWeight:600,cursor:adding?"wait":"pointer",
          transition:"all 0.3s ease",
          transform: btnHov&&!adding ? "scale(1.03)" : "scale(1)",
          boxShadow: btnHov ? "0 8px 28px rgba(58,134,255,0.42)" : "0 4px 16px rgba(58,134,255,0.25)",
          display:"flex",alignItems:"center",justifyContent:"center",gap:8,fontSize:14,
        }}
      >
        <ShoppingCart size={15}/>
        {added ? "Added ✓" : adding ? "Adding…" : "Add to Cart"}
      </button>
    </div>
  );
}

const CATEGORIES = ["All","Electronics","Fashion","Home","Sports","Kitchen","Accessories"];
const SORT_OPTS  = [
  {label:"Default",        value:""},
  {label:"Price: Low→High",value:"price_asc"},
  {label:"Price: High→Low",value:"price_desc"},
  {label:"Top Rated",      value:"rating"},
];
const DEMO_PRODUCTS = [
//   {_id:"1",title:"Wireless Noise-Cancelling Headphones",description:"Premium 30hr battery, spatial audio & ultra-soft cushions.",price:129.99,originalPrice:159.99,category:"Electronics",rating:4.8,reviews:248,image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",discount:20},
//   {_id:"2",title:"Smart Watch Series X Pro",description:"Health tracking, GPS, 7-day battery & AMOLED display.",price:249.99,category:"Electronics",rating:4.6,reviews:183,image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"},
//   {_id:"3",title:"Air Comfort Running Sneakers",description:"Ultra-lightweight memory foam insole, all-day comfort.",price:89.99,originalPrice:129.99,category:"Fashion",rating:4.9,reviews:956,image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80",discount:30},
//   {_id:"4",title:"Cold Brew Coffee Maker",description:"1L BPA-free glass, 12hr steep, smooth rich concentrate.",price:44.99,category:"Kitchen",rating:4.7,reviews:421,image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80"},
//   {_id:"5",title:"4K Ultra Action Camera",description:"Waterproof 30m, stabilised 4K60 video, wide-angle lens.",price:199.99,originalPrice:229.99,category:"Electronics",rating:4.9,reviews:712,image:"https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",discount:13},
//   {_id:"6",title:"Insulated Steel Water Bottle",description:"24hr cold · 12hr hot · 750ml · leak-proof magnetic lid.",price:29.99,originalPrice:34.99,category:"Home",rating:4.8,reviews:3100,image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",discount:15},
];

export function ProductsSection({ onNavigateToCart }) {
  const [products, setProducts] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState("");
  const [category, setCategory] = useState("All");
  const [sort,     setSort]     = useState("");
  const [search,   setSearch]   = useState("");
  const [searchQ,  setSearchQ]  = useState("");
  const [sortOpen, setSortOpen] = useState(false);
  const [toast,    setToast]    = useState(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const h = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  /* GET /api/products */
  const load = useCallback(async () => {
    try {
      setLoading(true); setError("");
      const params = {};
      if (category !== "All") params.category = category;
      if (sort)               params.sort      = sort;
      if (search)             params.search    = search;
      const res = await API.get("/products", { params });
      setProducts(Array.isArray(res.data) ? res.data : []);
    } catch {
      setError("Backend unavailable — showing demo products.");
      let data = [...DEMO_PRODUCTS];
      if (category !== "All") data = data.filter(p => p.category === category);
      if (search) data = data.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
      if (sort === "price_asc")  data.sort((a,b) => a.price-b.price);
      if (sort === "price_desc") data.sort((a,b) => b.price-a.price);
      if (sort === "rating")     data.sort((a,b) => b.rating-a.rating);
      setProducts(data);
    } finally { setLoading(false); }
  }, [category, sort, search]);

  useEffect(() => { load(); }, [load]);

  const toast_ = (msg, type="success") => {
    setToast({msg,type});
    setTimeout(() => setToast(null), 3000);
  };

  /* POST /api/cart */
  const handleAdd = async (product) => {
    const token = localStorage.getItem("token");
    if (!token) { toast_("Please log in to add items to cart","warn"); return; }
    try {
      await API.post("/cart", { productId: product._id, quantity: 1 });
      toast_(`"${product.title}" added to cart!`);
    } catch (err) {
      toast_(err?.response?.data?.message || "Failed to add to cart","error");
    }
  };

  const handleBuyNow = async (p) => { await handleAdd(p); onNavigateToCart?.(); };

  return (
    <section style={{ background:"#f5f7fa", padding:"72px 16px" }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position:"fixed",top:20,right:20,zIndex:9999,
          background: toast.type==="success"?"#0f1b2d": toast.type==="warn"?"#d97706":"#dc2626",
          color:"white",padding:"13px 20px",borderRadius:14,fontSize:14,fontWeight:500,
          boxShadow:"0 12px 40px rgba(0,0,0,0.25)",display:"flex",alignItems:"center",gap:10,
          animation:"toastIn 0.4s cubic-bezier(0.34,1.56,0.64,1)",maxWidth:340,
        }}>
          {toast.type==="success"?"✅":toast.type==="warn"?"⚠️":"❌"}
          {toast.msg}
        </div>
      )}

      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        {/* Heading */}
        <div style={{ textAlign:"center",marginBottom:44 }}>
          <p style={{ fontSize:11,fontWeight:700,color:"#3a86ff",textTransform:"uppercase",letterSpacing:3,marginBottom:12 }}>Our Collection</p>
          <h2 style={{ fontSize:"clamp(28px,4vw,40px)",fontWeight:700,color:"#0f1b2d",letterSpacing:-1,marginBottom:12,fontFamily:"Georgia,serif" }}>
            Best Selling Products
          </h2>
          <p style={{ color:"#aaa",fontSize:15,maxWidth:420,margin:"0 auto" }}>Curated picks trusted by thousands of happy shoppers.</p>
        </div>

        {/* Error banner */}
        {error && (
          <div style={{ background:"#fffbeb",border:"1px solid #fde68a",borderRadius:12,padding:"12px 16px",marginBottom:24,display:"flex",alignItems:"center",gap:10,fontSize:13,color:"#92400e" }}>
            <AlertCircle size={16} style={{color:"#f59e0b",flexShrink:0}}/> {error}
          </div>
        )}

        {/* Filters */}
        <div style={{ display:"flex",flexWrap:"wrap",alignItems:"center",gap:12,marginBottom:28 }}>
          {/* Search */}
          <form onSubmit={e=>{e.preventDefault();setSearch(searchQ);}} style={{display:"flex",gap:8,flex:1,minWidth:240,maxWidth:340}}>
            <div style={{position:"relative",flex:1}}>
              <Search size={14} style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:"#ccc"}}/>
              <input value={searchQ} onChange={e=>setSearchQ(e.target.value)} placeholder="Search products…"
                style={{width:"100%",paddingLeft:36,paddingRight:12,paddingTop:10,paddingBottom:10,border:"1.5px solid #e8ecf0",borderRadius:10,fontSize:13,outline:"none",background:"white",fontFamily:"inherit"}}
                onFocus={e=>e.target.style.borderColor="#3a86ff"} onBlur={e=>e.target.style.borderColor="#e8ecf0"}
              />
            </div>
            <button type="submit" style={{padding:"10px 16px",background:"#0f1b2d",color:"white",border:"none",borderRadius:10,fontSize:13,fontWeight:600,cursor:"pointer"}}>
              Search
            </button>
          </form>

          {/* Category pills */}
          <div style={{display:"flex",gap:6,flexWrap:"wrap",flex:1}}>
            {CATEGORIES.map(cat=>(
              <button key={cat} onClick={()=>setCategory(cat)}
                style={{padding:"7px 16px",borderRadius:100,fontSize:12,fontWeight:600,border: category===cat?"1.5px solid #0f1b2d":"1.5px solid #e0e5ee",background: category===cat?"#0f1b2d":"white",color: category===cat?"white":"#888",cursor:"pointer",transition:"all 0.2s"}}>
                {cat}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div ref={sortRef} style={{position:"relative"}}>
            <button onClick={()=>setSortOpen(o=>!o)}
              style={{display:"flex",alignItems:"center",gap:8,padding:"10px 16px",background:"white",border:"1.5px solid #e0e5ee",borderRadius:10,fontSize:13,fontWeight:500,color:"#555",cursor:"pointer",minWidth:160,justifyContent:"space-between"}}>
              {SORT_OPTS.find(o=>o.value===sort)?.label||"Sort By"}
              <ChevronDown size={13} style={{transform:sortOpen?"rotate(180deg)":"none",transition:"transform 0.2s"}}/>
            </button>
            {sortOpen && (
              <div style={{position:"absolute",right:0,top:"calc(100% + 6px)",background:"white",border:"1px solid #e8ecf0",borderRadius:12,boxShadow:"0 12px 40px rgba(0,0,0,0.12)",zIndex:50,overflow:"hidden",minWidth:190}}>
                {SORT_OPTS.map(o=>(
                  <button key={o.value} onClick={()=>{setSort(o.value);setSortOpen(false);}}
                    style={{display:"block",width:"100%",textAlign:"left",padding:"11px 16px",fontSize:13,cursor:"pointer",border:"none",background:sort===o.value?"#eff6ff":"transparent",color:sort===o.value?"#3a86ff":"#555",fontWeight:sort===o.value?600:400}}>
                    {o.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {!loading && <p style={{fontSize:13,color:"#aaa",marginBottom:20}}>Showing <strong style={{color:"#555"}}>{products.length}</strong> products</p>}

        {/* Grid */}
        <div className="pgrid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:24}}>
          {loading
            ? [...Array(6)].map((_,i)=><SkeletonCard key={i}/>)
            : products.length===0
            ? (
              <div style={{gridColumn:"1/-1",textAlign:"center",padding:"80px 20px"}}>
                <Package size={48} style={{color:"#ddd",margin:"0 auto 16px"}}/>
                <p style={{color:"#aaa",fontSize:16,marginBottom:16}}>No products found.</p>
                <button onClick={()=>{setCategory("All");setSearch("");setSearchQ("");}}
                  style={{color:"#3a86ff",fontWeight:600,fontSize:14,background:"none",border:"none",cursor:"pointer",textDecoration:"underline"}}>
                  Clear filters
                </button>
              </div>
            )
            : products.map((p,i)=>(
              <ProductCard key={p._id} product={p} idx={i} onAdd={handleAdd} onBuyNow={handleBuyNow}/>
            ))
          }
        </div>
      </div>

      <style>{`
        @keyframes toastIn{from{opacity:0;transform:translateY(-16px) scale(0.9)}to{opacity:1;transform:none}}
        @media(max-width:1023px){.pgrid{grid-template-columns:repeat(2,1fr)!important}}
        @media(max-width:639px){.pgrid{grid-template-columns:1fr!important}}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION 2 — CART & PAYMENT
═══════════════════════════════════════════════════════════ */

const DEMO_CART = [
  {_id:"ci1",quantity:1,product:{_id:"p1",title:"Wireless Headphones Pro",price:129.99,category:"Electronics",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80"}},
  {_id:"ci2",quantity:2,product:{_id:"p2",title:"Smart Watch Series X",price:249.99,category:"Electronics",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80"}},
  {_id:"ci3",quantity:1,product:{_id:"p3",title:"Air Comfort Sneakers",price:89.99,category:"Fashion",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80"}},
];

function FInput({label,id,placeholder,value,onChange,type="text",maxLength,icon}) {
  const [f,setF]=useState(false);
  return (
    <div style={{marginBottom:16}}>
      {label && <label style={{display:"block",fontSize:11,fontWeight:700,color:"#666",textTransform:"uppercase",letterSpacing:"1px",marginBottom:7}}>{label}</label>}
      <div style={{position:"relative"}}>
        {icon && <div style={{position:"absolute",left:13,top:"50%",transform:"translateY(-50%)",color:f?"#3a86ff":"#ccc",transition:"color 0.2s"}}>{icon}</div>}
        <input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} maxLength={maxLength}
          onFocus={()=>setF(true)} onBlur={()=>setF(false)}
          style={{width:"100%",padding:"12px 14px",paddingLeft:icon?42:14,border:`1px solid ${f?"#3a86ff":"#ddd"}`,borderRadius:10,fontSize:14,outline:"none",fontFamily:"inherit",color:"#222",background:"white",transition:"all 0.25s",boxShadow:f?"0 0 0 3px rgba(58,134,255,0.12)":"none"}}
        />
      </div>
    </div>
  );
}

export function CartSection({ onBackToShop }) {
  const [items,    setItems]    = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [placing,  setPlacing]  = useState(false);
  const [success,  setSuccess]  = useState(false);
  const [orderId,  setOrderId]  = useState("");
  const [promo,    setPromo]    = useState("");
  const [promoOn,  setPromoOn]  = useState(false);
  const [form, setForm] = useState({
    fullName:"",address:"",city:"",zip:"",
    cardName:"",cardNumber:"",expiry:"",cvv:"",
  });
  const set = k => e => setForm(f=>({...f,[k]:e.target.value}));

  /* GET /api/cart */
  useEffect(() => {
    (async()=>{
      const token=localStorage.getItem("token");
      if(!token){setItems(DEMO_CART);setLoading(false);return;}
      try{
        const res=await API.get("/cart");
        setItems(res.data?.items||res.data||[]);
      }catch{setItems(DEMO_CART);}
      finally{setLoading(false);}
    })();
  },[]);

  /* PUT /api/cart/:itemId */
  const updateQty = async (id,qty) => {
    try{await API.put(`/cart/${id}`,{quantity:qty});}catch{}
    setItems(p=>p.map(i=>i._id===id?{...i,quantity:qty}:i));
  };

  /* DELETE /api/cart/:itemId */
  const removeItem = async (id) => {
    try{await API.delete(`/cart/${id}`);}catch{}
    setItems(p=>p.filter(i=>i._id!==id));
  };

  /* POST /api/orders */
  const placeOrder = async () => {
    if(!form.cardName||form.cardNumber.replace(/\s/g,"").length<16){
      alert("Please fill in all payment details.");return;
    }
    setPlacing(true);
    try{
      const res=await API.post("/orders",{
        shippingAddress:{fullName:form.fullName,address:form.address,city:form.city,zip:form.zip,country:"US"},
        paymentMethod:"card",
      });
      setOrderId(res.data?._id?.slice(-8).toUpperCase()||"");
      try{await API.delete("/cart/clear");}catch{}
    }catch{
      setOrderId(Math.random().toString(36).slice(2,8).toUpperCase());
    }
    setPlacing(false);
    setSuccess(true);
  };

  const fmt_card = e=>{let v=e.target.value.replace(/\D/g,"").slice(0,16);v=v.match(/.{1,4}/g)?.join("  ")||v;setForm(f=>({...f,cardNumber:v}));};
  const fmt_exp  = e=>{let v=e.target.value.replace(/\D/g,"").slice(0,4);if(v.length>=2)v=v.slice(0,2)+" / "+v.slice(2);setForm(f=>({...f,expiry:v}));};

  const subtotal = items.reduce((s,i)=>s+(i.product?.price||0)*(i.quantity||1),0);
  const shipping  = subtotal>=50?0:4.99;
  const tax       = subtotal*0.1;
  const discount  = promoOn?subtotal*0.1:0;
  const total     = subtotal+shipping+tax-discount;
  const count     = items.reduce((s,i)=>s+(i.quantity||1),0);

  if(success) return (
    <section style={{background:"#f5f7fa",padding:"72px 16px",minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{background:"white",borderRadius:24,padding:"52px 44px",textAlign:"center",maxWidth:420,width:"100%",boxShadow:"0 20px 60px rgba(0,0,0,0.10)",animation:"popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)"}}>
        <div style={{width:80,height:80,borderRadius:"50%",background:"#ecfdf5",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px"}}>
          <CheckCircle size={44} style={{color:"#1db954"}}/>
        </div>
        <h2 style={{fontSize:28,fontWeight:700,color:"#0f1b2d",marginBottom:10,fontFamily:"Georgia,serif"}}>Order Confirmed! 🎉</h2>
        <p style={{color:"#aaa",fontSize:15,lineHeight:1.65,marginBottom:20}}>Thank you! Your order is being prepared and ships within 1–2 business days.</p>
        <div style={{background:"#f5f7fa",borderRadius:10,padding:"10px 16px",fontFamily:"monospace",fontSize:13,color:"#555",marginBottom:28}}>
          Order #{orderId||"XXXXXX"}
        </div>
        <button onClick={()=>{setSuccess(false);onBackToShop?.();}}
          style={{padding:"13px 28px",background:GRADIENT,color:"white",border:"none",borderRadius:12,fontWeight:600,cursor:"pointer",fontSize:14,boxShadow:"0 6px 24px rgba(58,134,255,0.35)"}}>
          ← Continue Shopping
        </button>
      </div>
      <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.85)}to{opacity:1;transform:scale(1)}}`}</style>
    </section>
  );

  return (
    <section style={{background:"#f5f7fa",padding:"64px 16px"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>

        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:16,marginBottom:36}}>
          <button onClick={onBackToShop}
            style={{width:40,height:40,borderRadius:10,border:"1.5px solid #e0e5ee",background:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#555",transition:"all 0.2s"}}
            onMouseEnter={e=>{e.currentTarget.style.borderColor="#3a86ff";e.currentTarget.style.color="#3a86ff";}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor="#e0e5ee";e.currentTarget.style.color="#555";}}>
            <ArrowLeft size={16}/>
          </button>
          <h2 style={{fontSize:28,fontWeight:700,color:"#0f1b2d",fontFamily:"Georgia,serif"}}>
            Shopping Cart
            <span style={{fontSize:14,fontWeight:400,color:"#aaa",marginLeft:12}}>({count} item{count!==1?"s":""})</span>
          </h2>
        </div>

        {/* 60/40 layout */}
        <div className="clayout" style={{display:"grid",gridTemplateColumns:"1fr 400px",gap:28,alignItems:"start"}}>

          {/* LEFT */}
          <div style={{display:"flex",flexDirection:"column",gap:24}}>

            {/* Cart Items Panel */}
            <div style={{background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <h3 style={{fontSize:16,fontWeight:700,color:"#0f1b2d"}}>Cart Items</h3>
                {items.length>0 && (
                  <button onClick={async()=>{try{await API.delete("/cart/clear");}catch{}setItems([]);}}
                    style={{fontSize:12,color:"#e63946",fontWeight:600,background:"none",border:"none",cursor:"pointer"}}>
                    Clear All
                  </button>
                )}
              </div>

              {loading ? (
                <div style={{padding:"40px 0"}}>
                  {[1,2,3].map(i=>(
                    <div key={i} style={{display:"flex",gap:16,padding:"20px 0",borderBottom:"1px solid #f0f2f5"}}>
                      <div style={{width:80,height:80,borderRadius:12,background:"#f0f2f5",flexShrink:0,animation:"pulse 1.5s ease infinite"}}/>
                      <div style={{flex:1}}>
                        <div style={{height:14,background:"#f0f2f5",borderRadius:6,width:"60%",marginBottom:10,animation:"pulse 1.5s ease infinite"}}/>
                        <div style={{height:11,background:"#f0f2f5",borderRadius:6,width:"35%",animation:"pulse 1.5s ease infinite"}}/>
                      </div>
                    </div>
                  ))}
                </div>
              ) : items.length===0 ? (
                <div style={{textAlign:"center",padding:"60px 20px"}}>
                  <ShoppingBag size={48} style={{color:"#ddd",margin:"0 auto 16px"}}/>
                  <p style={{color:"#aaa",fontSize:15,marginBottom:20}}>Your cart is empty</p>
                  <button onClick={onBackToShop} style={{padding:"11px 24px",background:GRADIENT,color:"white",border:"none",borderRadius:12,fontWeight:600,cursor:"pointer",fontSize:14}}>
                    ← Browse Products
                  </button>
                </div>
              ) : items.map(item=>{
                const price=item.product?.price||0;
                const qty=item.quantity||1;
                return (
                  <div key={item._id} style={{display:"flex",alignItems:"center",gap:16,padding:"20px 0",borderBottom:"1px solid #f0f2f5",animation:"slideIn 0.4s ease both"}}>
                    <img src={item.product?.image||"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80"} alt={item.product?.title}
                      style={{width:80,height:80,borderRadius:12,objectFit:"cover",flexShrink:0,background:"#f5f7fa"}}
                      onError={e=>{e.target.src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80";}}
                    />
                    <div style={{flex:1,minWidth:0}}>
                      <h4 style={{fontSize:15,fontWeight:600,color:"#222",marginBottom:4}} className="line-clamp-2">{item.product?.title||"Product"}</h4>
                      <p style={{fontSize:10,color:"#aaa",textTransform:"uppercase",letterSpacing:"1px",marginBottom:10,fontWeight:600}}>{item.product?.category||""}</p>
                      <div style={{display:"flex",alignItems:"center",gap:0,background:"#f5f7fa",borderRadius:9,width:"fit-content",overflow:"hidden"}}>
                        <button onClick={()=>qty>1&&updateQty(item._id,qty-1)}
                          style={{width:34,height:34,border:"none",background:"transparent",cursor:qty<=1?"not-allowed":"pointer",color:"#555",display:"flex",alignItems:"center",justifyContent:"center"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#e8ecf0"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <Minus size={13}/>
                        </button>
                        <span style={{width:36,textAlign:"center",fontSize:14,fontWeight:700,color:"#0f1b2d"}}>{qty}</span>
                        <button onClick={()=>updateQty(item._id,qty+1)}
                          style={{width:34,height:34,border:"none",background:"transparent",cursor:"pointer",color:"#555",display:"flex",alignItems:"center",justifyContent:"center"}}
                          onMouseEnter={e=>e.currentTarget.style.background="#e8ecf0"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                          <Plus size={13}/>
                        </button>
                      </div>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:12}}>
                      <span style={{fontSize:17,fontWeight:700,color:"#0f1b2d"}}>${(price*qty).toFixed(2)}</span>
                      <button onClick={()=>removeItem(item._id)}
                        style={{width:32,height:32,borderRadius:8,border:"none",background:"#fff0f0",color:"#e63946",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}
                        onMouseEnter={e=>{e.currentTarget.style.background="#e63946";e.currentTarget.style.color="white";e.currentTarget.style.transform="scale(1.08)";}}
                        onMouseLeave={e=>{e.currentTarget.style.background="#fff0f0";e.currentTarget.style.color="#e63946";e.currentTarget.style.transform="scale(1)";}}>
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Shipping Address */}
            {items.length>0 && (
              <div style={{background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                  <div style={{width:32,height:32,borderRadius:8,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center"}}><MapPin size={16} style={{color:"#3a86ff"}}/></div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"#0f1b2d"}}>Shipping Address</h3>
                </div>
                <FInput label="Full Name"      id="fn"   placeholder="John Smith"      value={form.fullName} onChange={set("fullName")}/>
                <FInput label="Street Address" id="addr" placeholder="123 Main Street" value={form.address}  onChange={set("address")}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <FInput label="City"     id="city" placeholder="New York" value={form.city} onChange={set("city")}/>
                  <FInput label="ZIP Code" id="zip"  placeholder="10001"    value={form.zip}  onChange={set("zip")}/>
                </div>
              </div>
            )}

            {/* Payment Form */}
            {items.length>0 && (
              <div style={{background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
                  <div style={{width:32,height:32,borderRadius:8,background:"#eff6ff",display:"flex",alignItems:"center",justifyContent:"center"}}><CreditCard size={16} style={{color:"#3a86ff"}}/></div>
                  <h3 style={{fontSize:16,fontWeight:700,color:"#0f1b2d"}}>Payment Details</h3>
                  <div style={{marginLeft:"auto",display:"flex",gap:5}}>
                    {["💳","🏦","💰","🔐"].map((ic,i)=><span key={i} style={{fontSize:18,opacity:0.5}}>{ic}</span>)}
                  </div>
                </div>
                <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:9,padding:"10px 14px",marginBottom:18,fontSize:12,color:"#92400e",display:"flex",alignItems:"center",gap:8}}>
                  <Lock size={13} style={{color:"#f59e0b"}}/> Demo mode — no real payment processed.
                </div>
                <FInput label="Cardholder Name" id="cn"   placeholder="John Smith"               value={form.cardName}   onChange={set("cardName")}   icon={<CreditCard size={14}/>}/>
                <FInput label="Card Number"      id="cnum" placeholder="1234  5678  9012  3456"   value={form.cardNumber} onChange={fmt_card} maxLength={19}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                  <FInput label="Expiry" id="exp" placeholder="MM / YY" value={form.expiry} onChange={fmt_exp} maxLength={7}/>
                  <FInput label="CVV"    id="cvv" placeholder="•••"      value={form.cvv}    onChange={set("cvv")} type="password" maxLength={4}/>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div style={{position:"sticky",top:24}}>
            <div style={{background:"white",borderRadius:20,padding:24,boxShadow:"0 4px 24px rgba(0,0,0,0.06)"}}>
              <h3 style={{fontSize:16,fontWeight:700,color:"#0f1b2d",marginBottom:20,display:"flex",alignItems:"center",gap:8}}>
                <Package size={17} style={{color:"#3a86ff"}}/> Order Summary
              </h3>

              {/* Promo */}
              <div style={{display:"flex",gap:8,marginBottom:8}}>
                <input value={promo} onChange={e=>setPromo(e.target.value)} placeholder="Promo code… (try SAVE10)"
                  style={{flex:1,padding:"10px 12px",border:`1px solid ${promoOn?"#1db954":"#ddd"}`,borderRadius:9,fontSize:12,outline:"none",fontFamily:"inherit",color:promoOn?"#1db954":"#222"}}/>
                <button onClick={()=>{promo.toUpperCase()==="SAVE10"?setPromoOn(true):alert("Try: SAVE10");}}
                  style={{padding:"10px 14px",background:"#0f1b2d",color:"white",border:"none",borderRadius:9,fontSize:12,fontWeight:600,cursor:"pointer"}}>
                  Apply
                </button>
              </div>
              {promoOn && <p style={{fontSize:12,color:"#1db954",fontWeight:600,marginBottom:16}}>✓ 10% discount applied!</p>}

              {/* Totals */}
              <div style={{display:"flex",flexDirection:"column",gap:13,marginBottom:20,marginTop:16}}>
                {[
                  {l:"Subtotal",v:`$${subtotal.toFixed(2)}`,c:"#555"},
                  {l:"Shipping",v:shipping===0?"Free":`$${shipping.toFixed(2)}`,c:shipping===0?"#1db954":"#555"},
                  {l:"Tax (10%)",v:`$${tax.toFixed(2)}`,c:"#555"},
                  ...(promoOn?[{l:"Discount",v:`-$${discount.toFixed(2)}`,c:"#1db954"}]:[]),
                ].map((r,i)=>(
                  <div key={i} style={{display:"flex",justifyContent:"space-between",fontSize:14,color:"#555"}}>
                    <span>{r.l}</span>
                    <span style={{fontWeight:600,color:r.c}}>{r.v}</span>
                  </div>
                ))}
                <div style={{borderTop:"2px solid #f0f2f5",paddingTop:15,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:17,fontWeight:700,color:"#0f1b2d"}}>Total</span>
                  <span style={{fontSize:20,fontWeight:800,color:"#3a86ff"}}>${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout button */}
              <button onClick={placeOrder} disabled={placing||items.length===0}
                style={{
                  width:"100%",padding:"14px",borderRadius:12,border:"none",
                  background:placing||items.length===0?"#ccc":GRADIENT,
                  color:"white",fontSize:15,fontWeight:700,
                  cursor:placing?"wait":items.length===0?"not-allowed":"pointer",
                  transition:"all 0.3s ease",
                  boxShadow:items.length>0?"0 6px 24px rgba(58,134,255,0.35)":"none",
                  display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                }}
                onMouseEnter={e=>{if(items.length>0&&!placing){e.currentTarget.style.background=GRADIENT_DARK;e.currentTarget.style.transform="scale(1.02)";e.currentTarget.style.boxShadow="0 10px 32px rgba(58,134,255,0.48)";}}}
                onMouseLeave={e=>{e.currentTarget.style.background=items.length===0?"#ccc":GRADIENT;e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow=items.length>0?"0 6px 24px rgba(58,134,255,0.35)":"none";}}>
                <Lock size={15}/> {placing?"Placing Order…":"Place Order Securely"}
              </button>

              {/* Trust badges */}
              <div style={{display:"flex",justifyContent:"center",gap:18,marginTop:16,flexWrap:"wrap"}}>
                {[["🔒","SSL Secure"],["↩️","30d Returns"],["🚀","Fast Ship"]].map(([ic,lb])=>(
                  <span key={lb} style={{display:"flex",alignItems:"center",gap:4,fontSize:11,color:"#aaa"}}>{ic} {lb}</span>
                ))}
              </div>

              {/* Delivery estimate */}
              {subtotal>0&&(
                <div style={{marginTop:18,background:"#f8f9fa",borderRadius:10,padding:"12px 14px",display:"flex",alignItems:"center",gap:10}}>
                  <Truck size={15} style={{color:"#3a86ff",flexShrink:0}}/>
                  <p style={{fontSize:12,color:"#666",lineHeight:1.5}}>
                    Est. delivery: <strong style={{color:"#0f1b2d"}}>3–5 business days</strong>
                    {shipping===0&&<span style={{color:"#1db954",fontWeight:600}}> · Free shipping!</span>}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @media(max-width:900px){.clayout{grid-template-columns:1fr!important}}
        .line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
      `}</style>
    </section>
  );
}

/* Default export: demo toggling between both sections */
export default function EcommerceDemo() {
  const [view,setView]=useState("products");
  return (
    <div style={{fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      {view==="products"
        ? <ProductsSection onNavigateToCart={()=>setView("cart")}/>
        : <CartSection     onBackToShop={()=>setView("products")}/>
      }
    </div>
  );
}