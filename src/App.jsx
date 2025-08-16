import React, { useEffect, useState, useCallback } from "react";
import {
  Home, MapPin, Menu, X,
  Waves, Building2, Bath, ParkingSquare, Ruler,
  FileText, CircuitBoard, ShieldCheck, Hammer,
  School, HeartHandshake, Store, Bike, Baby, Trees,
  Dumbbell, FileSignature, Handshake, KeyRound, Banknote, ArrowUp
} from "lucide-react";
import { motion } from "framer-motion";

/* =================== SEO + ФОНТЫ =================== */
function injectSEO() {
  if (typeof document === "undefined") return;

  const origin = typeof location !== "undefined" ? location.origin : "https://yoimdely.github.io";
  document.title = "Просторы Крыма — жилой квартал у моря";

  const meta = [
    { name: "description", content: "ЖК Просторы Крыма в пгт Приморский (Феодосия): 1,4 км до моря, монолит-кирпич, 6–10 этажей, предчистовая или с ремонтом, эскроу 214-ФЗ." },
    { property: "og:title", content: "Просторы Крыма — жилой квартал у моря" },
    { property: "og:description", content: "1,4 км до моря, монолит-кирпич, предчистовая или с ремонтом. Планировки, цены, очереди." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: `${origin}/media/51.jpeg` },
    { property: "og:url", content: typeof location !== "undefined" ? location.href : `${origin}/prostory-kryma2/` }
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
  link.href = typeof location !== "undefined" ? location.href : `${origin}/prostory-kryma2/`;

  // preload LCP (hero)
  let pl = document.querySelector('link[rel="preload"][as="image"]');
  if (!pl) {
    pl = document.createElement("link");
    pl.rel = "preload";
    pl.as = "image";
    pl.href = "/media/51.jpeg";
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

/* =================== ВСПОМОГАТЕЛЬНЫЕ UI =================== */
function Stat({ value, label, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border h-full"
      style={{ borderColor: "#EAD6C4", backgroundColor: "#FFFFFF", color: "#2B2118" }}>
      <div className="text-sm mb-2 flex items-center gap-2">{icon}{label}</div>
      <div className="text-xl font-semibold">{value}</div>
      {sub && <div className="text-xs mt-1" style={{ color: "#4B3B30" }}>{sub}</div>}
    </div>
  );
}

function IconWrap({ children }) {
  return (
    <div className="w-9 h-9 rounded-xl grid place-items-center border"
      style={{ borderColor: "#EAD6C4", backgroundColor: "#FFF8F2", color: "#2B2118" }}>
      {children}
    </div>
  );
}

function FireIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z" />
    </svg>
  );
}

/* =================== APP =================== */
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const waNumber = "79124530205";
  const waText = encodeURIComponent("Здравствуйте! Хочу подборку квартир в ЖК «Просторы Крыма».");
  const waLink = `https://wa.me/${waNumber}?text=${waText}`;

  useEffect(() => {
    injectFonts();
    injectSEO();
    const h = () => setShowTop(window.scrollY > 480);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

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
      alert("Не удалось отправить форму. Попробуйте ещё раз или напишите в WhatsApp.");
    } finally {
      setSending(false);
    }
  }, []);

  return (
    <div className="min-h-screen"
      style={{
        backgroundColor: "#FFF8F2",
        color: "#1F1B16",
        fontFamily: "Montserrat, sans-serif",
        overflowX: "hidden" // фикс горизонтального скролла
      }}>

      {/* ====== NAV ====== */}
      <header className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(255,248,242,0.95)", borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold"
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
              <a key={href} href={href} className="hover:text-orange-600 transition-colors" style={{ color: "#4B3B30" }}>{t}</a>
            ))}
          </nav>

          <div className="ml-auto hidden sm:flex items-center gap-3">
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-2xl border hover:shadow-md"
              style={{ borderColor: "#D4A373", color: "#2B2118" }}>Написать в WhatsApp</a>
            <a href="#cta" className="px-4 py-2 rounded-2xl hover:shadow-md"
              style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>Подбор квартиры</a>
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
              <a key={href} href={href} onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-orange-50">{t}</a>
            ))}
          </div>
        )}
      </header>

      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden">
        {/* мягкая «волна» фона */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-[180px] md:h-[220px]">
            <path fill="#F6E6D9" d="M0,64L60,69.3C120,75,240,85,360,117.3C480,149,600,203,720,202.7C840,203,960,149,1080,128C1200,107,1320,117,1380,122.7L1440,128L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <h1 className="leading-[1.05] font-extrabold"
              style={{ fontFamily: 'Prata, serif', color: '#2B2118', fontSize: 'clamp(32px,6vw,56px)' }}>
              <span>Новый город у моря</span>
              <span className="block mt-2">— «Просторы Крыма»</span>
            </h1>

            <p className="mt-5 text-base md:text-lg" style={{ color: '#4B3B30', maxWidth: 640 }}>
              Комфорт-класс, монолит-кирпич, высота потолков ~3,02 м, благоустроенные дворы, детские и спортивные площадки,
              торговые галереи и виды на Чёрное море. До моря ≈ 1,4 км. Первая сдача — 1 кв. 2026; очереди — до 4 кв. 2029.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[
                ["1,4 км до пляжа", <Waves size={18} key="w" />],
                ["6–10 этажей", <Building2 size={18} key="b" />],
                ["Предчистовая / с ремонтом", <Bath size={18} key="ba" />],
                ["Паркинг: многоуровневый и гостевой", <ParkingSquare size={18} key="p" />],
              ].map(([t, icon], i) => (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white"
                  style={{ borderColor: '#EAD6C4', color: '#2B2118' }}>
                  {icon} {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl hover:shadow-md"
                style={{ backgroundColor: '#C65D3A', color: '#FFF8F2' }}>Получить подборку</a>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="px-5 py-3 rounded-2xl border hover:shadow-md"
                style={{ borderColor: '#D4A373', color: '#2B2118' }}>Связаться в WhatsApp</a>
            </div>
          </motion.div>

          <motion.div className="rounded-3xl overflow-hidden shadow-lg border"
            style={{ height: 480, borderColor: '#EAD6C4' }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}>
            <img
              src="/media/51.jpeg"
              alt="Визуализация квартала «Просторы Крыма»"
              className="w-full h-full object-cover"
              loading="eager"
              fetchpriority="high"
              width={1600}
              height={1040}
            />
          </motion.div>
        </div>
      </section>

      {/* ====== KPI ====== */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <Stat value="≈ 1,4 км" label="До пляжа" icon={<Waves size={18} />} />
          <Stat value="6–10" label="Этажность, домов" sub="Монолит-кирпич" icon={<Building2 size={18} />} />
          <Stat value="3,02 м" label="Высота потолков" icon={<Ruler size={18} />} />
          <Stat value="> 2 000" label="Паркомест" sub="Гостевые и многоуровневые" icon={<ParkingSquare size={18} />} />
        </div>
      </section>

      {/* ====== ABOUT ====== */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Prata, serif' }}>О проекте</h2>
            <p className="mt-4" style={{ color: '#4B3B30' }}>
              «Просторы Крыма» — современная квартальная застройка у моря: безопасные дворы без машин,
              детские и спортивные площадки, озеленение и коммерция шаговой доступности.
              Продуманные планировки и виды на Чёрное море.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                { h: 'Сроки', t: '1 очередь — 1 кв. 2026; 2 очередь — 3 кв. 2026; 3 очередь — 4 кв. 2028; завершение — до 4 кв. 2029.', icon: <FileText size={18} /> },
                { h: 'Технологии', t: 'Монолит-кирпич, «умный дом», панорамные окна, индивидуальное отопление.', icon: <CircuitBoard size={18} /> },
                { h: 'Юридически', t: '214-ФЗ и эскроу-счета. Застройщик: ООО СЗ «Просторы Крыма».', icon: <ShieldCheck size={18} /> },
                { h: 'Масштаб', t: 'Школы, детские сады, медцентр, торговые галереи на территории.', icon: <Hammer size={18} /> },
              ].map((c, i) => (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3"
                  style={{ borderColor: '#EAD6C4', backgroundColor: '#FFFFFF' }}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{ color: '#2B2118' }}>{c.h}</div>
                    <div className="text-sm mt-1" style={{ color: '#4B3B30' }}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{ backgroundColor: '#F6E6D9', borderColor: '#EAD6C4' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <Building2 size={18} /> Ключевые факты
            </div>
            <ul className="mt-3 space-y-2 text-sm" style={{ color: '#4B3B30' }}>
              <li><Waves size={14} className="inline mr-2" /> ≈ 1,4 км до пляжа</li>
              <li><MapPin size={14} className="inline mr-2" /> Панорамные виды на море</li>
              <li><ParkingSquare size={14} className="inline mr-2" /> Паркинг: многоуровневый + гостевой</li>
              <li><Bath size={14} className="inline mr-2" /> Отделка: предчистовая или с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl hover:shadow-md"
              style={{ backgroundColor: '#C65D3A', color: '#FFF8F2' }}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* ====== GALLERY ====== */}
      <section id="gallery" className="py-14 md:py-20" style={{ backgroundColor: '#FFF3EA' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
            <Building2 size={22} /> Галерея
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {["11.jpeg", "12.jpeg", "22.jpeg", "2.jpeg", "5.jpeg", "64.jpeg"].map((f, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group"
                style={{ borderColor: '#EAD6C4' }}>
                <img src={`/media/${f}`} alt="Фото ЖК «Просторы Крыма»"
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
                  loading="lazy" width={1600} height={1200} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== LOCATION ====== */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
              <MapPin size={22} /> Локация и окружение
            </h2>
            <p className="mt-4" style={{ color: '#4B3B30' }}>
              Посёлок Приморский, г.о. Феодосия, Республика Крым. Координаты: 45.138389, 35.509972.
              До пляжа ≈ 1,4 км. Рядом — аллея, спортплощадки, торговые галереи, школы, сады, медцентр.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{ t: "Школы и детские сады", icon: <School size={16} /> }, { t: "Медицинский центр", icon: <HeartHandshake size={16} /> }, { t: "Магазины и услуги", icon: <Store size={16} /> }, { t: "Транспортная доступность", icon: <Bike size={16} /> }].map((i, idx) => (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2"
                  style={{ borderColor: '#EAD6C4', backgroundColor: '#FFFFFF', color: '#2B2118' }}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{ borderColor: '#EAD6C4' }}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=35.509972%2C45.138389&z=14"
              className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ====== TECH ====== */}
      <section id="tech" className="py-14 md:py-20" style={{ backgroundColor: '#FFF3EA' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
              <CircuitBoard size={22} /> Технологии и инженерия
            </h2>
            <ul className="mt-4 space-y-2" style={{ color: '#4B3B30' }}>
              {[
                { t: 'Конструктив: монолит-кирпич', icon: <Building2 size={16} /> },
                { t: 'Панорамное остекление, улучшенная тепло-/шумоизоляция', icon: <Home size={16} /> },
                { t: 'Индивидуальное отопление (по корпусам)', icon: <FireIcon /> },
                { t: 'Система «умный дом» и современные лифты', icon: <CircuitBoard size={16} /> },
                { t: 'Отделка: предчистовая / с ремонтом', icon: <Bath size={16} /> },
              ].map((i, idx) => (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <ShieldCheck size={18} /> Преимущества для владельца
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{ color: '#4B3B30' }}>
              {["Энергоэффективность и комфорт", "Ликвидность для аренды/перепродажи", "Удобные планировки", "Паркинг и коммерция на территории"].map((t, i) => (
                <div key={i} className="p-4 rounded-xl border" style={{ backgroundColor: '#FFF8F2', borderColor: '#EAD6C4' }}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== PLANS ====== */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
            <Ruler size={22} /> Планировки и метражи
          </h2>
        </div>
      </section>

      {/* ====== PHASING ====== */}
      <section id="phasing" className="py-14 md:py-20" style={{ backgroundColor: '#FFF3EA' }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
            <Building2 size={22} /> Очереди строительства
          </h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border" style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
            <table className="min-w-full text-sm">
              <thead style={{ backgroundColor: '#F6E6D9', color: '#2B2118' }}>
                <tr>
                  <th className="text-left px-4 py-3">Очередь</th>
                  <th className="text-left px-4 py-3">Плановый срок</th>
                  <th className="text-left px-4 py-3">Комментарий</th>
                </tr>
              </thead>
              <tbody style={{ color: '#4B3B30' }}>
                {[
                  { q: "1 очередь", s: "1 кв. 2026", c: "Запуск продаж и ввод первых корпусов" },
                  { q: "2 очередь", s: "3 кв. 2026", c: "Продолжение строительства" },
                  { q: "3 очередь", s: "4 кв. 2028", c: "Развитие инфраструктуры" },
                  { q: "Завершение", s: "до 4 кв. 2029", c: "Финал проекта" },
                ].map((r, i) => (
                  <tr key={i} className="border-t" style={{ borderColor: '#EAD6C4' }}>
                    <td className="px-4 py-3 font-medium" style={{ color: '#2B2118' }}>{r.q}</td>
                    <td className="px-4 py-3">{r.s}</td>
                    <td className="px-4 py-3">{r.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ====== PROCESS + VIDEO ====== */}
      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{ fontFamily: 'Prata, serif' }}>
            <FileSignature size={22} /> Как проходит покупка
          </h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              { t: "Заявка", d: "Присылаем подборку планировок и цен", icon: <Handshake size={18} /> },
              { t: "Выбор", d: "Презентация, консультация, бронирование", icon: <KeyRound size={18} /> },
              { t: "Ипотека/оплата", d: "ДДУ на эскроу-счёт", icon: <Banknote size={18} /> },
              { t: "Сделка", d: "Подписание, регистрация, ключи", icon: <FileSignature size={18} /> },
            ].map((s, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{ color: '#2B2118' }}>{i + 1}. {s.t}</div>
                  <div className="text-sm mt-1" style={{ color: '#4B3B30' }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border" style={{ backgroundColor: '#FFF8F2', borderColor: '#EAD6C4' }}>
              <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
                <Banknote size={18} /> Банки-партнёры
              </div>
              <div className="grid grid-cols-3 gap-3 mt-3 text-sm" style={{ color: '#4B3B30' }}>
                {["Сбер", "ВТБ", "Дом.РФ", "Альфа", "Газпромбанк", "РНКБ"].map((b, i) => (
                  <div key={i} className="h-14 rounded-xl border grid place-items-center"
                    style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>{b}</div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{ color: '#7A6A5F' }}>Перечень банков может расширяться.</p>
            </div>

            <div className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
              <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
                <Home size={18} /> Видео-тур по кварталу
              </div>
              <div className="mt-3 aspect-video rounded-xl overflow-hidden border" style={{ borderColor: '#EAD6C4' }}>
                <iframe title="video" src="https://www.youtube.com/embed/hLcCQA-CH8U"
                  className="w-full h-full" loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== BUY + FORM ====== */}
      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2"
              style={{ fontFamily: 'Prata, serif' }}><Handshake size={22} /> Оставьте заявку на подбор</h2>
            <p style={{ color: '#4B3B30' }}>
              Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция.
              Расскажем о доступных корпусах и сроках.
            </p>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
              className="inline-block px-5 py-3 rounded-2xl border hover:shadow-md"
              style={{ borderColor: '#D4A373', color: '#2B2118' }}>Связаться в WhatsApp</a>
          </div>

          <div id="cta" className="p-6 rounded-2xl border shadow" style={{ backgroundColor: '#FFFFFF', borderColor: '#EAD6C4' }}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{ color: '#2B2118' }}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{ color: '#4B3B30' }}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{ color: '#2B2118' }}>Получить подборку квартир</div>
                <p className="text-sm mt-1" style={{ color: '#4B3B30' }}>
                  Оставьте контакты — пришлём актуальные планировки, цены и акции по ЖК «Просторы Крыма».
                </p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{ borderColor: '#EAD6C4' }}
                    name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" disabled={sending}
                    className="w-full px-4 py-3 rounded-xl hover:shadow-md disabled:opacity-70"
                    style={{ backgroundColor: '#C65D3A', color: '#FFF8F2' }}>
                    {sending ? "Отправляем..." : "Отправить"}
                  </button>
                </form>

                <a href={waLink} target="_blank" rel="noopener noreferrer"
                  className="mt-3 block text-center px-4 py-3 rounded-xl border hover:shadow-md"
                  style={{ borderColor: '#D4A373', color: '#2B2118' }}>Или написать в WhatsApp</a>
                <p className="mt-3 text-xs" style={{ color: '#7A6A5F' }}>
                  Нажимая кнопку, вы соглашаетесь с <a href="/privacy.html" className="underline">политикой конфиденциальности</a>.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ====== FOOTER ====== */}
      <footer className="py-12 border-t" style={{ borderColor: '#EAD6C4' }}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{ color: '#4B3B30' }}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{ color: '#2B2118' }}>
              <Home size={16} /> Просторы Крыма
            </div>
            <p className="mt-2">Крым, г.о. Феодосия, пгт Приморский, координаты 45.138389, 35.509972</p>
            <p className="mt-1">Застройщик: ООО СЗ «Просторы Крыма». Строительство по 214-ФЗ с использованием эскроу-счётов.</p>
          </div>
          <div className="md:text-right">
            <a href="/privacy.html" className="underline" rel="noopener">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="/consent.html" className="underline" rel="noopener">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

      {/* ====== JSON-LD Organization ====== */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Просторы Крыма",
            "url": typeof location !== "undefined" ? location.href : "https://yoimdely.github.io/prostory-kryma2/",
            "sameAs": [waLink],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Приморский",
              "addressRegion": "Республика Крым",
              "addressCountry": "RU"
            }
          })
        }}
      />

      {/* ====== Scroll to top ====== */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 rounded-full shadow-lg border p-3 bg-white hover:shadow-xl"
          style={{ borderColor: "#EAD6C4", color: "#2B2118" }}
          aria-label="Наверх"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}
