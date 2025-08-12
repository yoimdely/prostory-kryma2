import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves as WavesIcon, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ===== Абсолютные пути к медиа на GitHub Pages ===== */
const MEDIA = (f) => `https://yoimdely.github.io/prostory-kryma2/media/${f}`;

/* ===== SEO + Шрифты ===== */
function injectSEO() {
  if (typeof document === "undefined") return;
  const og = MEDIA("51.jpeg");
  document.title = "Просторы Крыма — жилой квартал у моря";
  const meta = [
    { name: "description", content: "ЖК Просторы Крыма: 1,4 км до моря, монолит-кирпич, отделка, 214-ФЗ/эскроу. Планировки, цены, сроки." },
    { property: "og:title", content: "Просторы Крыма — жилой квартал у моря" },
    { property: "og:description", content: "Планировки, цены, очереди. До моря 1,4 км." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: og },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : "https://yoimdely.github.io/prostory-kryma2/" },
  ];
  meta.forEach(m => {
    const key = m.name ? "name" : "property";
    let el = document.querySelector(`meta[${key}="${m.name || m.property}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute(key, m.name || m.property); document.head.appendChild(el); }
    el.setAttribute("content", m.content);
  });
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
  link.href = typeof location !== "undefined" ? location.href : "https://yoimdely.github.io/prostory-kryma2/";

  const preload = document.createElement("link");
  preload.rel = "preload"; preload.as = "image"; preload.href = og;
  document.head.appendChild(preload);
}
function injectFonts() {
  if (typeof document === "undefined") return;
  const links = [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
    { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap" },
  ];
  links.forEach(cfg => { const l=document.createElement("link"); Object.entries(cfg).forEach(([k,v])=>v!==undefined&&l.setAttribute(k,v)); document.head.appendChild(l); });
}

/* ===== Вспомогательные UI ===== */
const Glow = ({ className }) => (
  <div className={className}
       style={{ filter:"blur(40px)", opacity:.35, background:"radial-gradient(closest-side, #C65D3A55, transparent 70%)" }}/>
);
function IconWrap({ children }) {
  return (
    <div className="w-10 h-10 rounded-xl grid place-items-center border shadow-sm"
         style={{ borderColor:"#EAD6C4", background:"#FFF7F0", color:"#2B2118" }}>
      {children}
    </div>
  );
}
function Stat({ value, label, sub, icon }) {
  return (
    <motion.div whileHover={{ y:-3 }}
      className="p-5 rounded-2xl border h-full shadow-sm bg-white"
      style={{ borderColor:"#EAD6C4" }}>
      <div className="text-sm mb-2 flex items-center gap-2 text-[#2B2118]">{icon}{label}</div>
      <div className="text-xl font-semibold text-[#2B2118]">{value}</div>
      {sub && <div className="text-xs mt-1 text-[#4B3B30]">{sub}</div>}
    </motion.div>
  );
}
function FireIcon(props){
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z"/>
    </svg>
  );
}

/* ===== App ===== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  useEffect(() => { injectFonts(); injectSEO(); }, []);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      const data = new FormData(e.currentTarget);
      const res = await fetch("https://api.web3forms.com/submit", { method:"POST", body:data });
      if (!res.ok) throw new Error("Network error");
      setSent(true); e.currentTarget.reset();
    } catch (err) {
      console.error(err); alert("Не удалось отправить форму. Напишите в Telegram, если что.");
    } finally { setSending(false); }
  }, []);

  // лёгкий параллакс для декоративных кругов
  const { scrollY } = useScroll();
  const puffY = useTransform(scrollY, [0, 600], [0, -40]);
  const puffY2 = useTransform(scrollY, [0, 600], [0, 30]);

  return (
    <div className="min-h-screen relative" style={{ color:"#1F1B16", fontFamily:"Montserrat, sans-serif" }}>
      {/* ФОН: градиент + шум */}
      <div className="pointer-events-none fixed inset-0 -z-30"
           style={{ background:"radial-gradient(1200px 600px at 15% 0%, #FFEADA 0%, #FFF8F2 50%, #FFF8F2 100%)" }}/>
      <div className="pointer-events-none fixed inset-0 -z-20 opacity-[0.28]"
           style={{
             backgroundImage:
               "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.06'/%3E%3C/svg%3E\")",
             backgroundSize:"280px 280px"
           }}/>

      {/* ДЕКОР: мягкие свечения */}
      <motion.div style={{ y:puffY }}
        className="hidden md:block absolute -z-10 top-24 left-[-60px] w-56 h-56 rounded-full"
        ><Glow className="w-full h-full rounded-full"/></motion.div>
      <motion.div style={{ y:puffY2 }}
        className="hidden md:block absolute -z-10 bottom-24 right-[-80px] w-56 h-56 rounded-full"
        ><Glow className="w-full h-full rounded-full"/></motion.div>

      {/* NAV */}
      <header className="sticky top-0 z-40 border-b backdrop-blur"
              style={{ background:"rgba(255,248,242,.85)", borderColor:"#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold"
                 style={{ background:"#2B2118", color:"#F6E6D9" }}>ПК</div>
            <div className="leading-tight">
              <div className="font-extrabold flex items-center gap-2" style={{ fontFamily:"Prata, serif", fontSize:18 }}>
                <Home size={18}/> Просторы Крыма
              </div>
              <div className="text-[11px] text-[#7A6A5F]">
                <MapPin size={12} className="inline mr-1"/> Приморский · у моря
              </div>
            </div>
          </a>

          <nav className="hidden lg:flex items-center gap-6 text-[13px] mx-auto">
            {[
              ["О проекте","#about"],["Локация","#location"],["Планировки","#plans"],
              ["Галерея","#gallery"],["Контакты","#buy"]
            ].map(([t,href]) => (
              <a key={href} href={href} className="hover:text-orange-600 transition-colors text-[#4B3B30]">{t}</a>
            ))}
          </nav>

          <div className="ml-auto hidden sm:flex items-center gap-3">
            <a href="#cta" className="px-4 py-2 rounded-2xl shadow-sm hover:shadow-md transition"
               style={{ background:"#C65D3A", color:"#FFF8F2" }}>Подбор квартиры</a>
            <a href="https://t.me/todayididg00d" target="_blank" rel="noopener noreferrer"
               className="px-4 py-2 rounded-2xl border hover:shadow-md transition"
               style={{ borderColor:"#D4A373", color:"#2B2118" }}>Заявка</a>
          </div>

          <button aria-label="Меню" className="lg:hidden ml-auto" onClick={()=>setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20}/> : <Menu size={20}/>}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            {[
              ["О проекте","#about"],["Локация","#location"],["Планировки","#plans"],
              ["Галерея","#gallery"],["Контакты","#buy"]
            ].map(([t,href])=>(
              <a key={href} href={href} onClick={()=>setMenuOpen(false)}
                 className="block px-4 py-2 text-gray-700 hover:bg-orange-50">{t}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:18}} animate={{opacity:1, y:0}} transition={{duration:.5}}>
            {/* Заголовок: суженная ширина + перенос только в 3 строки макс */}
            <h1 className="font-extrabold tracking-[-0.015em]"
                style={{
                  fontFamily:"Prata, serif",
                  color:"#2B2118",
                  fontSize:"clamp(34px, 6vw, 50px)",
                  lineHeight:1.04,
                  maxWidth:660
                }}>
              Новый город у моря — <span className="whitespace-nowrap">«Просторы Крыма»</span>
            </h1>

            <p className="mt-5 text-base md:text-lg text-[#4B3B30] max-w-[620px]">
              Комфорт-класс, монолит-кирпич, высота потолков ~3,02 м, благоустроенные дворы,
              спортплощадки и виды на Чёрное море. До моря ≈ 1,4 км. Первая сдача — 1 кв. 2026; очереди — до 4 кв. 2029.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["1,4 км до пляжа", <WavesIcon size={18} key="w"/>],
                ["6–10 этажей", <Building2 size={18} key="b"/>],
                ["Предчистовая / с ремонтом", <Bath size={18} key="ba"/>],
                ["Паркинг: многоуровневый и гостевой", <ParkingSquare size={18} key="p"/>],
              ].map(([t,icon], i)=>(
                <div key={i}
                     className="p-3 rounded-xl border bg-white shadow-sm flex items-center gap-2"
                     style={{ borderColor:"#EAD6C4", color:"#2B2118" }}>
                  {icon} {t}
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta"
                 className="px-5 py-3 rounded-2xl shadow-sm hover:shadow-lg transition relative overflow-hidden"
                 style={{ background:"#C65D3A", color:"#FFF8F2" }}>
                <span className="relative z-[1]">Получить подборку</span>
                {/* лёгкий «шейн» */}
                <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-[-20deg] animate-[shine_2.4s_ease_infinite]"/>
              </a>
              <a href="https://t.me/todayididg00d" target="_blank" rel="noopener noreferrer"
                 className="px-5 py-3 rounded-2xl border hover:shadow-md transition"
                 style={{ borderColor:"#D4A373", color:"#2B2118" }}>
                Задать вопрос в TG
              </a>
            </div>
          </motion.div>

          <motion.div
            className="rounded-[28px] overflow-hidden border shadow-xl relative"
            style={{ borderColor:"#EAD6C4" }}
            initial={{opacity:0, scale:.985}} animate={{opacity:1, scale:1}} transition={{duration:.6}}>
            <img
              src={MEDIA("51.jpeg")}
              alt="Визуализация квартала у моря"
              className="w-full h-full object-cover"
              loading="eager" fetchpriority="high"
            />
            {/* мягкое свечение по краю карточки */}
            <div className="pointer-events-none absolute inset-0 rounded-[28px]"
                 style={{ boxShadow:"inset 0 0 60px rgba(255,255,255,.25)" }}/>
          </motion.div>
        </div>

        {/* декоративная волна */}
        <svg viewBox="0 0 1440 120" className="block w-full h-[64px]" preserveAspectRatio="none" aria-hidden>
          <path d="M0,40 C180,90 360,0 540,40 C720,80 900,20 1080,60 C1260,100 1350,100 1440,80 L1440,120 L0,120 Z" fill="#FFF3EA"/>
        </svg>
      </section>

      {/* KPI */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          <Stat value="≈ 1,4 км" label="До пляжа" icon={<WavesIcon size={18}/>}/>
          <Stat value="6–10" label="Этажность, домов" sub="Монолит-кирпич" icon={<Building2 size={18}/>}/>
          <Stat value="3,02 м" label="Высота потолков" icon={<Ruler size={18}/>}/>
          <Stat value="> 2 000" label="Паркомест" sub="Гостевые и многоуровневые" icon={<ParkingSquare size={18}/>}/>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily:"Prata, serif" }}>О проекте</h2>
            <p className="mt-4 text-[#4B3B30]">
              «Просторы Крыма» — квартальная застройка у моря: дворы без машин, детские и спортивные площадки,
              озеленение и коммерция шаговой доступности. Продуманные планировки и виды на Чёрное море.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {h:"Сроки", t:"1 очередь — 1 кв. 2026; 2 — 3 кв. 2026; 3 — 4 кв. 2028; завершение — до 4 кв. 2029.", icon:<FileText size={18}/>},
                {h:"Технологии", t:"Монолит-кирпич, «умный дом», панорамные окна, индивидуальное отопление.", icon:<CircuitBoard size={18}/>},
                {h:"Юридически", t:"214-ФЗ и эскроу-счета. Застройщик: ООО СЗ «Просторы Крыма».", icon:<ShieldCheck size={18}/>},
                {h:"Масштаб", t:"Школы, детские сады, медцентр, торговые галереи на территории.", icon:<Hammer size={18}/>},
              ].map((c,i)=>(
                <motion.div key={i} whileHover={{ y:-3 }}
                  className="p-5 rounded-2xl border flex items-start gap-3 shadow-sm bg-white"
                  style={{ borderColor:"#EAD6C4" }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold text-[#2B2118]">{c.h}</div>
                    <div className="text-sm mt-1 text-[#4B3B30]">{c.t}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <aside className="p-6 rounded-2xl border shadow-sm"
                 style={{ background:"#F6E6D9", borderColor:"#EAD6C4" }}>
            <div className="font-semibold flex items-center gap-2 text-[#2B2118]">
              <Building2 size={18}/> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm text-[#4B3B30]">
              <li><WavesIcon size={14} className="inline mr-2"/> ≈ 1,4 км до пляжа</li>
              <li><MapPin size={14} className="inline mr-2"/> Панорамные виды на море</li>
              <li><ParkingSquare size={14} className="inline mr-2"/> Многоуровневый + гостевой паркинг</li>
              <li><Bath size={14} className="inline mr-2"/> Предчистовая или с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition"
               style={{ background:"#C65D3A", color:"#FFF8F2" }}>
              Запросить подборку
            </a>
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-14 md:py-20" style={{ background:"#FFF3EA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
            <Building2 size={22}/> Галерея
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[MEDIA("11.jpeg"), MEDIA("12.jpeg"), MEDIA("22.jpeg")].map((src, i)=>(
              <motion.div key={i} whileHover={{ y:-6, scale:1.02 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden shadow-md border group bg-white"
                style={{ borderColor:"#EAD6C4" }}>
                <img src={src} alt="Визуализации" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform" loading="lazy"/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
              <MapPin size={22}/> Локация и окружение
            </h2>
            <p className="mt-4 text-[#4B3B30]">
              Приморский, г.о. Феодосия. Координаты: 45.138389, 35.509972. До пляжа ≈ 1,4 км. Рядом — аллея, спортплощадки,
              торговые галереи, школы, сады, медцентр.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{t:"Школы и детские сады", icon:<School size={16}/>},
                {t:"Медицинский центр", icon:<HeartHandshake size={16}/>},
                {t:"Магазины и услуги", icon:<Store size={16}/>},
                {t:"Транспортная доступность", icon:<Bike size={16}/> }].map((i,idx)=>(
                <li key={idx} className="p-3 rounded-xl border bg-white shadow-sm flex items-center gap-2"
                    style={{ borderColor:"#EAD6C4", color:"#2B2118" }}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-md border" style={{ borderColor:"#EAD6C4" }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=35.509972%2C45.138389&z=14"
                    className="w-full h-[380px]" loading="lazy"/>
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section id="infra" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
            <Store size={22}/> Инфраструктура квартала
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {t:"Для семей", points:[[Baby,"Детские сады на территории"],[School,"Современные школы"],[Trees,"Дворы без машин"]]},
              {t:"Для активных", points:[[Dumbbell,"Спортплощадки и аллеи"],[Bike,"Воркаут-зоны"],[WavesIcon,"Близость к пляжам"]]},
              {t:"Сервис и комфорт", points:[[Store,"Торговые галереи и кафе"],[HeartHandshake,"Аптеки и сервисы"],[ParkingSquare,"Гостевой и многоуровневый паркинг"]]}
            ].map((b,i)=>(
              <motion.div key={i} whileHover={{ y:-3 }}
                className="p-6 rounded-2xl border shadow-sm bg-white" style={{ borderColor:"#EAD6C4" }}>
                <div className="font-semibold text-[#2B2118]">{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm text-[#4B3B30]">
                  {b.points.map(([Ic,txt], j)=>(<li key={j} className="flex gap-3 items-start"><Ic size={16}/> {txt}</li>))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="py-14 md:py-20" style={{ background:"#FFF3EA" }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
              <CircuitBoard size={22}/> Технологии и инженерия
            </h2>
            <ul className="mt-4 space-y-2 text-[#4B3B30]">
              {[
                {t:"Конструктив: монолит-кирпич", icon:<Building2 size={16}/>},
                {t:"Панорамное остекление, улучшенная тепло-/шумоизоляция", icon:<Home size={16}/>},
                {t:"Индивидуальное отопление (по корпусам)", icon:<FireIcon/>},
                {t:"Система «умный дом» и современные лифты", icon:<CircuitBoard size={16}/>},
                {t:"Отделка: предчистовая / с ремонтом", icon:<Bath size={16}/>},
              ].map((i,idx)=>(
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow-sm bg-white" style={{ borderColor:"#EAD6C4" }}>
            <div className="font-semibold flex items-center gap-2 text-[#2B2118]">
              <ShieldCheck size={18}/> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm text-[#4B3B30]">
              {["Энергоэффективность и комфорт","Ликвидность для аренды/перепродажи","Удобные планировки","Паркинг и коммерция на территории"]
                .map((t,i)=>(<div key={i} className="p-4 rounded-xl border" style={{ background:"#FFF8F2", borderColor:"#EAD6C4" }}>{t}</div>))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
            <Ruler size={22}/> Планировки и метражи
          </h2>
          <p className="mt-3 text-[#4B3B30]">
            Студии от ~29 м², 1-комнатные ~35–45 м², 2-комнатные от ~50 м², 3-комнатные — до ~84 м².
            Варианты: предчистовая и с ремонтом (по корпусам и очередям).
          </p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t:"Студии", d:"~29–30 м², эргономика для аренды и отдыха" },
              { t:"1-комнатные", d:"~35–45 м², кухни-гостиные, лоджии" },
              { t:"2–3-комнатные", d:"от ~50 до ~84 м², семейные форматы" },
            ].map((c,i)=>(
              <motion.div key={i} whileHover={{ y:-3 }}
                className="p-5 rounded-2xl border flex items-start gap-3 shadow-sm bg-white"
                style={{ borderColor:"#EAD6C4" }}>
                <IconWrap><Home size={18}/></IconWrap>
                <div>
                  <div className="font-semibold text-[#2B2118]">{c.t}</div>
                  <div className="text-sm mt-1 text-[#4B3B30]">{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm hover:underline" style={{ color:"#C65D3A" }}>
                    Запросить PDF-подборку планировок
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASING */}
      <section id="phasing" className="py-14 md:py-20" style={{ background:"#FFF3EA" }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
            <Building2 size={22}/> Очереди строительства
          </h2>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-6 overflow-x-auto rounded-2xl border shadow-sm bg-white" style={{ borderColor:"#EAD6C4" }}>
          <table className="min-w-full text-sm">
            <thead style={{ background:"#F6E6D9", color:"#2B2118" }}>
              <tr>
                <th className="text-left px-4 py-3">Очередь</th>
                <th className="text-left px-4 py-3">Плановый срок</th>
                <th className="text-left px-4 py-3">Комментарий</th>
              </tr>
            </thead>
            <tbody className="text-[#4B3B30]">
              {[
                {q:"1 очередь", s:"1 кв. 2026", c:"Запуск продаж и ввод первых корпусов"},
                {q:"2 очередь", s:"3 кв. 2026", c:"Продолжение строительства"},
                {q:"3 очередь", s:"4 кв. 2028", c:"Развитие инфраструктуры"},
                {q:"Завершение", s:"до 4 кв. 2029", c:"Финал проекта"},
              ].map((r,i)=>(
                <tr key={i} className="border-t" style={{ borderColor:"#EAD6C4" }}>
                  <td className="px-4 py-3 font-medium text-[#2B2118]">{r.q}</td>
                  <td className="px-4 py-3">{r.s}</td>
                  <td className="px-4 py-3">{r.c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* PROCESS + VIDEO */}
      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
            <FileSignature size={22}/> Как проходит покупка
          </h2>

          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              {t:"Заявка", d:"Присылаем подборку планировок и цен", icon:<Handshake size={18}/>},
              {t:"Выбор", d:"Презентация, консультация, бронирование", icon:<KeyRound size={18}/>},
              {t:"Ипотека/оплата", d:"ДДУ на эскроу-счёт", icon:<Banknote size={18}/>},
              {t:"Сделка", d:"Подписание, регистрация, ключи", icon:<FileSignature size={18}/>},
            ].map((s,i)=>(
              <motion.div key={i} whileHover={{ y:-3 }}
                className="p-5 rounded-2xl border flex items-start gap-3 shadow-sm bg-white"
                style={{ borderColor:"#EAD6C4" }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold text-[#2B2118]">{i+1}. {s.t}</div>
                  <div className="text-sm mt-1 text-[#4B3B30]">{s.d}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border shadow-sm" style={{ background:"#FFF8F2", borderColor:"#EAD6C4" }}>
              <div className="font-semibold flex items-center gap-2 text-[#2B2118]">
                <Banknote size={18}/> Банки-партнёры
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 text-sm text-[#4B3B30]">
                {["Сбер","ВТБ","Дом.РФ","Альфа","Газпромбанк","РНКБ"].map((b,i)=>(
                  <div key={i} className="h-14 rounded-xl border grid place-items-center bg-white"
                       style={{ borderColor:"#EAD6C4" }}>{b}</div>
                ))}
              </div>
              <p className="text-xs mt-3 text-[#7A6A5F]">Перечень банков может расширяться.</p>
            </div>

            <div className="p-6 rounded-2xl border shadow-sm bg-white" style={{ borderColor:"#EAD6C4" }}>
              <div className="font-semibold flex items-center gap-2 text-[#2B2118]">
                <Home size={18}/> Видео-тур по кварталу
              </div>
              <div className="mt-3 aspect-video rounded-xl overflow-hidden border" style={{ borderColor:"#EAD6C4" }}>
                <iframe
                  title="video"
                  src="https://www.youtube.com/embed/hLcCQA-CH8U"
                  className="w-full h-full" loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily:"Prata, serif" }}>
              <Handshake size={22}/> Оставьте заявку на подбор
            </h2>
            <p className="text-[#4B3B30]">
              Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция.
              Расскажем о доступных корпусах и сроках.
            </p>
            <a href="https://t.me/todayididg00d" target="_blank" rel="noopener noreferrer"
               className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md transition"
               style={{ borderColor:"#D4A373", color:"#2B2118" }}>Написать в Telegram</a>
          </div>

          <div id="cta" className="p-6 rounded-2xl border shadow-xl bg-white"
               style={{ borderColor:"#EAD6C4", boxShadow:"0 20px 60px rgba(198,93,58,.14)" }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold text-[#2B2118]">Спасибо! Заявка отправлена.</div>
                <p className="mt-2 text-[#4B3B30]">Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold text-[#2B2118]">Получить подборку квартир</div>
                <p className="text-sm mt-1 text-[#4B3B30]">
                  Оставьте контакты — пришлём актуальные планировки, цены и акции по ЖК «Просторы Крыма».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a"/>
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor:"#EAD6C4" }} name="name" placeholder="Ваше имя" required/>
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor:"#EAD6C4" }} name="phone" placeholder="Телефон" required/>
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor:"#EAD6C4" }} name="email" placeholder="Email (по желанию)"/>
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor:"#EAD6C4" }} name="message" placeholder="Комментарий" rows={3}/>
                  <button type="submit" disabled={sending}
                          className="w-full px-4 py-3 rounded-xl shadow-sm hover:shadow-lg disabled:opacity-70 transition relative overflow-hidden"
                          style={{ background:"#C65D3A", color:"#FFF8F2" }}>
                    <span className="relative z-[1]">{sending ? "Отправляем..." : "Отправить"}</span>
                    <span className="absolute inset-0 -translate-x-full bg-white/20 skew-x-[-20deg] animate-[shine_2.4s_ease_infinite]"/>
                  </button>
                </form>
                <p className="mt-3 text-xs text-[#7A6A5F]">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{ borderColor:"#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm text-[#4B3B30]">
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2 text-[#2B2118]">
              <Home size={16}/> Просторы Крыма
            </div>
            <p className="mt-2">Крым, г.о. Феодосия, пгт Приморский, координаты 45.138389, 35.509972</p>
            <p className="mt-1">Застройщик: ООО СЗ «Просторы Крыма». Строительство по 214-ФЗ с использованием эскроу-счетов.</p>
          </div>
          <div className="md:text-right">
            <a href="#" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="#" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"Organization",
          "name":"Просторы Крыма",
          "url":"https://yoimdely.github.io/prostory-kryma2/",
          "sameAs":["https://t.me/todayididg00d"],
          "address":{"@type":"PostalAddress","addressLocality":"Приморский","addressRegion":"Республика Крым","addressCountry":"RU"}
        })
      }}/>
      {/* keyframes для «шейна» */}
      <style>{`@keyframes shine{0%{transform:translateX(-120%) skewX(-20deg)}60%{transform:translateX(120%) skewX(-20deg)}100%{transform:translateX(120%) skewX(-20deg)}}`}</style>
    </div>
  );
}
