import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote
} from "lucide-react";
import { motion } from "framer-motion";

/* ================= SEO + ШРИФТЫ ================= */
function injectSEO() {
  if (typeof document === "undefined") return;
  document.title = "Просторы Крыма — жилой квартал у моря";

  const meta = [
    { name: "description", content: "ЖК Просторы Крыма в пгт Приморский (Феодосия): 1,4 км до моря, монолит-кирпич, 6–10 этажей, предчистовая или с ремонтом, эскроу 214-ФЗ." },
    { property: "og:title", content: "Просторы Крыма — жилой квартал у моря" },
    { property: "og:description", content: "1,4 км до моря, монолит-кирпич, предчистовая или с ремонтом. Планировки, цены, очереди." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop" },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://yoimdely.github.io/prostory-kryma2/" }
  ];

  meta.forEach(m => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(key, m.name || m.property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", m.content);
  });

  // canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = typeof location !== "undefined" ? location.href : "https://yoimdely.github.io/prostory-kryma2/";

  // preload hero image (LCP)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "/media/hero.jpg"; // если нет локального, ниже у img стоит фоллбек
    document.head.appendChild(pl);
  }
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" }
  ];
  links.forEach(cfg => {
    const l = document.createElement("link");
    Object.entries(cfg).forEach(([k, v]) => v !== undefined && l.setAttribute(k, v));
    document.head.appendChild(l);
  });
}

/* ================= ВСПОМОГАТЕЛЬНЫЕ UI ================= */
function SafeImg({ src, fallback, alt, className, ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => { if (fallback) e.currentTarget.src = fallback; }}
      {...rest}
    />
  );
}

function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full shadow-sm"
         style={{ borderColor: "#EAD6C4", backgroundColor: "#FFFFFF", color: "#2B2118" }}>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4B3B30" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-9 h-9 rounded-xl grid place-items-center border shadow"
         style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}>
      {children}
    </div>
  );
}

// Кастомная иконка "огонь"
function FireIcon(props){
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z"/>
    </svg>
  );
}

/* ================== APP ================== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => { injectFonts(); injectSEO(); }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const form = e.currentTarget;
      const data = new FormData(form);
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      if (!res.ok) throw new Error("Network error");
      setSent(true);
      form.reset();
    } catch (err) {
      console.error(err);
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в Telegram.");
    } finally {
      setSending(false);
    }
  }, []);

  // список локальных картинок (если нет — подставится фоллбек из unsplash)
  const GALLERY = [
    ["/media/1.jpg", "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1600&auto=format&fit=crop"],
    ["/media/2.jpg", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"],
    ["/media/3.jpg", "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1600&auto=format&fit=crop"],
    ["/media/4.jpg", "https://images.unsplash.com/photo-1529429612776-e5dd24d49b42?q=80&w=1600&auto=format&fit=crop"],
    ["/media/5.jpg", "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop"],
    ["/media/6.jpg", "https://images.unsplash.com/photo-1616596876515-4ff982c0a1a2?q=80&w=1600&auto=format&fit=crop"],
  ];

  return (
    <div className="min-h-screen overflow-x-hidden"
         style={{ backgroundColor: "#FFF8F2", color: "#1F1B16", fontFamily: "Montserrat, sans-serif" }}>

      {/* ======= NAV ======= */}
      <header className="sticky top-0 z-40 border-b backdrop-blur"
              style={{ backgroundColor: "rgba(255,248,242,0.92)", borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold shadow"
                 style={{ backgroundColor: "#2B2118", color: "#F6E6D9" }}>ПК</div>
            <div className="leading-tight">
              <div className="font-extrabold flex items-center gap-2"
                   style={{ fontFamily: "Prata, serif", fontSize: 18 }}>
                <Home size={18} /> Просторы Крыма
              </div>
              <div className="text-[11px]" style={{ color: "#7A6A5F" }}>
                <MapPin size={12} className="inline mr-1" /> Приморский · у моря
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] mx-auto" aria-label="Главное меню">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#buy"]
            ].map(([t, href]) => (
              <a key={href} href={href} className="hover:text-orange-600 transition-colors"
                 style={{ color: "#4B3B30" }}>{t}</a>
            ))}
          </nav>

          <div className="ml-auto hidden sm:flex items-center gap-3">
            <a href="#cta" className="px-4 py-2 rounded-2xl hover:shadow-md"
               style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>Подбор квартиры</a>
            <a href="https://t.me/todayididg00d" target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 rounded-2xl border hover:shadow-md"
               style={{ borderColor: "#D4A373", color: "#2B2118" }}>Telegram</a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto" aria-label="Меню">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#buy"]
            ].map(([t, href]) => (
              <a key={href} href={href} onClick={()=>setMenuOpen(false)}
                 className="block px-4 py-2 text-gray-700 hover:bg-orange-50">{t}</a>
            ))}
          </div>
        )}
      </header>

      {/* ======= HERO ======= */}
      <section className="relative overflow-hidden">
        {/* фоновые декоры */}
        <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] rounded-full blur-3xl opacity-40"
             style={{ background: "radial-gradient(45% 45% at 50% 50%, #F6E6D9 0%, rgba(246,230,217,0) 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 w-[600px] h-[600px] rounded-full blur-2xl opacity-30"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, #FFD9C2 0%, rgba(255,217,194,0) 70%)" }} />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 w-[520px] h-[520px] rounded-full blur-2xl opacity-25"
             style={{ background: "radial-gradient(50% 50% at 50% 50%, #FCE6D6 0%, rgba(252,230,214,0) 70%)" }} />

        <div className="relative max-w-6xl mx-auto px-4 pt-10 md:pt-16 pb-16 grid md:grid-cols-2 gap-10">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs mb-4 shadow-sm"
                 style={{ borderColor:"#EAD6C4", background:"#FFF", color:"#7A6A5F" }}>
              <Waves size={14}/> До моря ≈ 1,4 км
            </div>

            {/* КОРОЧЕ И УПРУГО */}
            <h1 className="text-[36px] md:text-[52px] leading-[1.05] font-extrabold tracking-[-0.02em]"
                style={{fontFamily:'Prata, serif', color:'#2B2118', maxWidth: "16ch"}}>
              Жилой квартал у моря <span className="whitespace-nowrap">«Просторы Крыма»</span>
            </h1>

            <p className="mt-4 text-base md:text-lg" style={{color:'#4B3B30', maxWidth:680}}>
              Комфорт-класс, монолит‑кирпич, потолки ~3,02 м, закрытые дворы и виды на Чёрное море.
              Первая сдача — 1 кв. 2026; завершение — до 4 кв. 2029.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["6–10 этажей", <Building2 size={18} key="b"/>],
                ["Предчистовая / с ремонтом", <Bath size={18} key="ba"/>],
                ["Паркинг: гостевой + многоуровневый", <ParkingSquare size={18} key="p"/>],
                ["Планировки для жизни и аренды", <Ruler size={18} key="r"/>],
              ].map(([t,icon], i)=> (
                <li key={i} className="p-3 rounded-xl shadow-sm flex items-center gap-2 border bg-white"
                    style={{borderColor:'#EAD6C4', color:'#2B2118'}}>{icon} {t}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-6 py-3 rounded-2xl hover:shadow-md text-[15px]"
                 style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Получить подборку квартир</a>
              <a href="https://t.me/todayididg00d" target="_blank" rel="noopener noreferrer"
                 className="px-6 py-3 rounded-2xl border hover:shadow-sm text-[15px]"
                 style={{borderColor:'#D4A373', color:'#2B2118'}}>Задать вопрос в Telegram</a>
            </div>
          </motion.div>

          <motion.div className="relative rounded-3xl overflow-hidden shadow-xl border"
                      style={{height:520, borderColor:'#EAD6C4'}}
                      initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.6}}>
            <SafeImg
              src="/media/hero.jpg"
              fallback="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop"
              alt="Визуализация квартала у моря"
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              width={1600}
              height={1040}
            />
            {/* волна снизу карточки */}
            <svg aria-hidden viewBox="0 0 1440 120" className="absolute -bottom-1 left-0 w-full opacity-70">
              <path fill="#FFF8F2" d="M0,64L60,69.3C120,75,240,85,360,85.3C480,85,600,75,720,85.3C840,96,960,128,1080,128C1200,128,1320,96,1380,80L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"></path>
            </svg>
          </motion.div>
        </div>

        {/* разделительная волна секции */}
        <svg aria-hidden viewBox="0 0 1440 120" className="block w-full -mb-1">
          <path fill="#FFF3EA" d="M0,64L60,69.3C120,75,240,85,360,85.3C480,85,600,75,720,85.3C840,96,960,128,1080,128C1200,128,1320,96,1380,80L1440,64L1440,120L0,120Z"></path>
        </svg>
      </section>

      {/* ======= KPI ======= */}
      <section className="py-10" style={{background:"#FFF3EA"}}>
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <Stat value="≈ 1,4 км" label="До пляжа" icon={<Waves size={18} />} />
          <Stat value="6–10" label="Этажность" sub="Монолит-кирпич" icon={<Building2 size={18} />} />
          <Stat value="3,02 м" label="Высота потолков" icon={<Ruler size={18} />} />
          <Stat value="> 2 000" label="Паркомест" sub="Гостевые и многоуровневые" icon={<ParkingSquare size={18} />} />
        </div>
      </section>

      {/* ======= ABOUT ======= */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{fontFamily:'Prata, serif'}}>О проекте</h2>
            <p className="mt-4" style={{color:'#4B3B30'}}>
              «Просторы Крыма» — современная квартальная застройка у моря: безопасные дворы без машин,
              детские и спортивные площадки, озеленение и коммерция шаговой доступности. Продуманные планировки и виды на Чёрное море.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {h:'Сроки', t:'1 очередь — 1 кв. 2026; 2 — 3 кв. 2026; 3 — 4 кв. 2028; завершение — до 4 кв. 2029.', icon:<FileText size={18}/>},
                {h:'Технологии', t:'Монолит‑кирпич, «умный дом», панорамные окна, индивидуальное отопление.', icon:<CircuitBoard size={18}/>},
                {h:'Юридически', t:'214‑ФЗ и эскроу‑счета. Застройщик: ООО СЗ «Просторы Крыма».', icon:<ShieldCheck size={18}/>},
                {h:'Масштаб', t:'Сады, школы, медцентр, спортивные зоны, торговые галереи на территории.', icon:<Hammer size={18}/>},
              ].map((c,i)=> (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3 shadow-sm"
                     style={{borderColor:'#EAD6C4', backgroundColor:'#FFFFFF'}}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{color:'#2B2118'}}>{c.h}</div>
                    <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border shadow-sm"
                 style={{backgroundColor:'#F6E6D9', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <Building2 size={18}/> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{color:'#4B3B30'}}>
              <li><Waves size={14} className="inline mr-2"/> ≈ 1,4 км до пляжа</li>
              <li><MapPin size={14} className="inline mr-2"/> Панорамные виды на море</li>
              <li><ParkingSquare size={14} className="inline mr-2"/> Паркинг: многоуровневый + гостевой</li>
              <li><Bath size={14} className="inline mr-2"/> Отделка: предчистовая или с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md"
               style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ======= GALLERY (шире и плотнее) ======= */}
      <section id="gallery" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-[1200px] mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Building2 size={22}/> Галерея</h2>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {GALLERY.map(([local, fb], i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group"
                   style={{borderColor:'#EAD6C4'}}>
                <SafeImg
                  src={local}
                  fallback={fb}
                  alt={`Фото ${i+1}`}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
                  loading="lazy"
                  width={1200}
                  height={900}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= LOCATION ======= */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
                style={{fontFamily:'Prata, serif'}}><MapPin size={22}/> Локация и окружение</h2>
            <p className="mt-4" style={{color:'#4B3B30'}}>
              Посёлок Приморский, г.о. Феодосия, Республика Крым. Координаты: 45.138389, 35.509972.
              До пляжа ≈ 1,4 км. Рядом — аллея, спортплощадки, торговые галереи, школы, сады, медцентр.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{t:"Школы и детские сады", icon:<School size={16}/>}, {t:"Медицинский центр", icon:<HeartHandshake size={16}/>}, {t:"Магазины и услуги", icon:<Store size={16}/>}, {t:"Транспортная доступность", icon:<Bike size={16}/> }].map((i,idx)=> (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2 shadow-sm"
                    style={{borderColor:'#EAD6C4', backgroundColor:'#FFFFFF', color:'#2B2118'}}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{borderColor:'#EAD6C4'}}>
            <iframe
              title="map"
              src="https://yandex.ru/map-widget/v1/?ll=35.509972%2C45.138389&z=14"
              className="w-full h-[360px]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ======= TECH ======= */}
      <section id="tech" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
                style={{fontFamily:'Prata, serif'}}><CircuitBoard size={22}/> Технологии и инженерия</h2>
            <ul className="mt-4 space-y-2" style={{color:'#4B3B30'}}>
              {[
                {t:'Конструктив: монолит‑кирпич', icon:<Building2 size={16}/>},
                {t:'Панорамное остекление, улучшенная тепло-/шумоизоляция', icon:<Home size={16}/>},
                {t:'Индивидуальное отопление (по корпусам)', icon:<FireIcon/>},
                {t:'Система «умный дом» и современные лифты', icon:<CircuitBoard size={16}/>},
                {t:'Отделка: предчистовая / с ремонтом', icon:<Bath size={16}/>},
              ].map((i,idx)=> (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <ShieldCheck size={18}/> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{color:'#4B3B30'}}>
              {["Энергоэффективность и комфорт","Ликвидность для аренды/перепродажи","Удобные планировки","Паркинг и коммерция на территории"].map((t,i)=> (
                <div key={i} className="p-4 rounded-xl border"
                     style={{backgroundColor:'#FFF8F2', borderColor:'#EAD6C4'}}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======= PLANS ======= */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Ruler size={22}/> Планировки и метражи</h2>
          <p className="mt-3" style={{color:'#4B3B30'}}>
            Студии от ~29 м², 1‑комнатные ~35–45 м², 2‑комнатные от ~50 м², 3‑комнатные — до ~84 м².
            Варианты: предчистовая и с ремонтом (по корпусам и очередям).
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "~29–30 м², эргономика для аренды и отдыха", icon:<Home size={18}/> },
              { t: "1‑комнатные", d: "~35–45 м², кухни‑гостиные, лоджии", icon:<Home size={18}/> },
              { t: "2–3‑комнатные", d: "от ~50 до ~84 м², семейные форматы", icon:<Home size={18}/> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3 shadow-sm"
                   style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{color:'#2B2118'}}>{c.t}</div>
                  <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline"
                     style={{color:'#C65D3A'}}>Запросить PDF‑подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======= PHASING ======= */}
      <section id="phasing" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><Building2 size={22}/> Очереди строительства</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            <table className="min-w-full text-sm">
              <thead style={{backgroundColor:'#F6E6D9', color:'#2B2118'}}>
                <tr>
                  <th className="text-left px-4 py-3">Очередь</th>
                  <th className="text-left px-4 py-3">Плановый срок</th>
                  <th className="text-left px-4 py-3">Комментарий</th>
                </tr>
              </thead>
              <tbody style={{color:'#4B3B30'}}>
                {[
                  {q:"1 очередь", s:"1 кв. 2026", c:"Ввод первых корпусов"},
                  {q:"2 очередь", s:"3 кв. 2026", c:"Продолжение строительства"},
                  {q:"3 очередь", s:"4 кв. 2028", c:"Развитие инфраструктуры"},
                  {q:"Завершение", s:"до 4 кв. 2029", c:"Финал проекта"},
                ].map((r,i)=> (
                  <tr key={i} className="border-t" style={{borderColor:'#EAD6C4'}}>
                    <td className="px-4 py-3 font-medium" style={{color:'#2B2118'}}>{r.q}</td>
                    <td className="px-4 py-3">{r.s}</td>
                    <td className="px-4 py-3">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ======= PROCESS + VIDEO ======= */}
      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{fontFamily:'Prata, serif'}}><FileSignature size={22}/> Как проходит покупка</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              {t:"Заявка", d:"Присылаем подборку планировок и цен", icon:<Handshake size={18}/>},
              {t:"Выбор", d:"Презентация, консультация, бронирование", icon:<KeyRound size={18}/>},
              {t:"Ипотека/оплата", d:"ДДУ на эскроу‑счёт", icon:<Banknote size={18}/>},
              {t:"Сделка", d:"Подписание, регистрация, ключи", icon:<FileSignature size={18}/>},
            ].map((s,i)=> (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3 shadow-sm"
                   style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{color:'#2B2118'}}>{i+1}. {s.t}</div>
                  <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border"
                 style={{backgroundColor:'#FFF8F2', borderColor:'#EAD6C4'}}>
              <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
                <Banknote size={18}/> Банки‑партнёры
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 text-sm" style={{color:'#4B3B30'}}>
                {["Сбер","ВТБ","Дом.РФ","Альфа","Газпромбанк","РНКБ"].map((b,i)=>(<div key={i}
                  className="h-14 rounded-xl border grid place-items-center shadow-sm"
                  style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>{b}</div>))}
              </div>
              <p className="text-xs mt-3" style={{color:'#7A6A5F'}}>Перечень банков может расширяться.</p>
            </div>

            <div className="p-6 rounded-2xl border shadow"
                 style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
              <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
                <Home size={18}/> Видео‑тур по кварталу
              </div>
              <div className="mt-3 aspect-video rounded-xl overflow-hidden border"
                   style={{borderColor:'#EAD6C4'}}>
                <iframe
                  title="video"
                  src="https://www.youtube.com/embed/hLcCQA-CH8U"
                  className="w-full h-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======= BUY CTA + FORM (главный акцент) ======= */}
      <section id="buy" className="py-20" style={{background:"#FFF3EA"}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
                style={{fontFamily:'Prata, serif'}}><Handshake size={22}/> Оставьте заявку на подбор</h2>
            <p style={{color:'#4B3B30'}}>
              Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция.
              Расскажем о доступных корпусах и сроках.
            </p>
            <a href="#cta" className="inline-block px-6 py-3 rounded-2xl hover:shadow-md text-[15px]"
               style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Получить персональную подборку</a>
            <div className="text-sm" style={{color:'#7A6A5F'}}>
              Или напишите нам в&nbsp;
              <a className="underline" href="https://t.me/todayididg00d" target="_blank" rel="noopener noreferrer">Telegram</a>
            </div>
          </div>

          <div id="cta" className="p-6 rounded-2xl border shadow"
               style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{color:'#2B2118'}}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{color:'#4B3B30'}}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{color:'#2B2118'}}>Получить подборку квартир</div>
                <p className="text-sm mt-1" style={{color:'#4B3B30'}}>
                  Оставьте контакты — пришлём актуальные планировки, цены и акции по ЖК «Просторы Крыма».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                         name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                         name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                         name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}}
                            name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending}
                          className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70"
                          style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>
                    {sending ? "Отправляем..." : "Отправить заявку"}
                  </button>
                </form>
                <p className="mt-3 text-xs" style={{color:'#7A6A5F'}}>
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ======= FOOTER ======= */}
      <footer className="py-12 border-t" style={{borderColor:'#EAD6C4'}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{color:'#4B3B30'}}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}>
              <Home size={16}/> Просторы Крыма
            </div>
            <p className="mt-2">Крым, г.о. Феодосия, пгт Приморский, координаты 45.138389, 35.509972</p>
            <p className="mt-1">Застройщик: ООО СЗ «Просторы Крыма». Строительство по 214‑ФЗ с использованием эскроу‑счетов.</p>
          </div>
          <div className="md:text-right">
            <a href="#" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="#" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>

        {/* JSON‑LD Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Просторы Крыма",
              "url": "https://yoimdely.github.io/prostory-kryma2/",
              "sameAs": ["https://t.me/todayididg00d"],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Приморский",
                "addressRegion": "Республика Крым",
                "addressCountry": "RU"
              }
            })
          }}
        />
      </footer>
    </div>
  );
}
