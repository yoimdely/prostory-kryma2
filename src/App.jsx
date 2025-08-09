import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  CircuitBoard,
  Bath,
  ParkingSquare,
  ShieldCheck,
  MapPin,
  HeartHandshake,
  School,
  Baby,
  Store,
  Dumbbell,
  Bike,
  Trees,
  Ruler,
  Hammer,
  FileText,
  Handshake,
  KeyRound,
  Banknote,
  FileSignature,
  Waves
} from "lucide-react";

// === SEO + ШРИФТЫ ===
function injectSEO() {
  if (typeof document === "undefined") return;
  document.title = "Просторы Крыма — жилой квартал у моря в Приморском (Феодосия)";
  const ensure = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  };
  ensure("description", "ЖК Просторы Крыма в пгт Приморский (Феодосия): 1,4 км до моря, монолит-кирпич, 6–10 этажей, предчистовая или с ремонтом, эскроу 214-ФЗ. Планировки, цены, очереди.");

  const setOG = (p, c) => {
    let el = document.querySelector(`meta[property="${p}"]`);
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", p); document.head.appendChild(el); }
    el.setAttribute("content", c);
  };
  setOG("og:title", "Просторы Крыма — жилой квартал у моря");
  setOG("og:description", "1,4 км до моря, монолит-кирпич, предчистовая/с ремонтом. Планировки, цены, очереди.");
  setOG("og:type", "website");
  setOG("og:image", "https://images.unsplash.com/photo-1529429612776-e5dd24d49b42?q=80&w=1600&auto=format&fit=crop");
}
function injectFonts() {
  if (typeof document === "undefined") return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Prata&display=swap";
  document.head.appendChild(link);
}

// === УТИЛЫ ===
const IconWrap = ({ children }) => (
  <span className="inline-flex items-center justify-center rounded-xl" style={{backgroundColor:'#F6E6D9', color:'#2B2118', width:40, height:40, border:'1px solid #EAD6C4'}}>
    {children}
  </span>
);
function Stat({ label, value, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border shadow-sm flex items-start gap-3" style={{backgroundColor:'#F6E6D9', borderColor:'#EAD6C4'}}>
      {icon ? <IconWrap>{icon}</IconWrap> : null}
      <div>
        <div className="text-2xl font-extrabold" style={{color:'#2B2118'}}>{value}</div>
        <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{label}</div>
        {sub ? <div className="text-xs mt-1" style={{color:'#7A6A5F'}}>{sub}</div> : null}
      </div>
    </div>
  );
}

// === APP ===
export default function App() {
  const [sent, setSent] = useState(false);

  useEffect(() => { injectFonts(); injectSEO(); }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(() => setSent(true))
      .catch(() => alert("Не удалось отправить. Проверьте access_key веб-формы."));
  };

  return (
    <div className="min-h-screen" style={{backgroundColor:'#FFF8F2', color:'#1F1B16', fontFamily:'Montserrat, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial'}}>

      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur border-b" style={{backgroundColor:'rgba(255,248,242,0.8)', borderColor:'#EAD6C4'}}>
        <div className="max-w-6xl mx-auto px-5 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold" style={{backgroundColor:'#2B2118', color:'#F6E6D9'}}>ПК</div>
            <div>
              <div className="font-extrabold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}>
                <Home size={18} /> Просторы Крыма
              </div>
              <div className="text-xs" style={{color:'#7A6A5F'}}><MapPin size={12} className="inline mr-1"/> Жилой квартал у моря · Приморский, Феодосия</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-5 text-[13px] overflow-x-auto whitespace-nowrap max-w-[55vw]">
            {[
              ["О проекте","#about"],
              ["Галерея","#gallery"],
              ["Локация","#location"],
              ["Инфраструктура","#infra"],
              ["Технологии","#tech"],
              ["Планировки","#plans"],
              ["Очереди","#phasing"],
              ["Как купить","#process"],
              ["Доверие","#trust"],
            ].map(([t,href])=> (
              <a key={href} href={href} className="hover:underline" style={{color:'#4B3B30'}}>{t}</a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a href="https://t.me/todayididg00d" target="_blank" className="hidden sm:inline-block px-4 py-2 rounded-2xl border" style={{borderColor:'#D4A373', color:'#2B2118'}}>Заявка в Telegram</a>
            <a href="#cta" className="px-4 py-2 rounded-2xl" style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Подобрать квартиру</a>
          </div>
        </div>
      </header>

     {/* HERO */}
<section className="relative overflow-hidden">
  <div className="absolute inset-0" style={{background:"linear-gradient(180deg, #F6E6D9 0%, #FFF8F2 70%)"}} />
  <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10">
    <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
      <h1 className="text-[40px] md:text-[56px] leading-[1.1] font-extrabold"
          style={{fontFamily:'Prata, serif', color:'#2B2118'}}>
        Новый город у моря — «Просторы Крыма»
      </h1>
      <p className="mt-5 text-base md:text-lg" style={{color:'#4B3B30', maxWidth:640}}>
        Комфорт-класс, монолит-кирпич, высота потолков ~3,02 м, благоустроенные дворы, детские и спортивные площадки,
        торговые галереи и виды на Чёрное море. До моря ≈ 1,4 км. Первая сдача — 1 кв. 2026; очереди — до 4 кв. 2029.
      </p>

      <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
        {[
          ["1,4 км до пляжа", <Waves size={18} key="w"/>],
          ["6–10 этажей", <Building2 size={18} key="b"/>],
          ["Предчистовая / с ремонтом", <Bath size={18} key="ba"/>],
          ["Паркинг: многоуровневый и гостевой", <ParkingSquare size={18} key="p"/>],
        ].map(([t,icon], i)=> (
          <li key={i}
              className="p-3 rounded-xl shadow flex items-center gap-2 border bg-white"
              style={{borderColor:'#EAD6C4', color:'#2B2118'}}>
            {icon} {t}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-wrap gap-3">
        <a href="#cta" className="px-5 py-3 rounded-2xl"
           style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Получить подборку</a>
        <a href="https://t.me/todayididg00d" target="_blank" className="px-5 py-3 rounded-2xl border hover:shadow-soft"
           style={{borderColor:'#D4A373', color:'#2B2118'}}>Задать вопрос в TG</a>
      </div>
    </motion.div>

    {/* КАРТИНКА */}
    <motion.div
      className="rounded-3xl overflow-hidden shadow-lg border"
      style={{height:520, borderColor:'#EAD6C4'}}
      initial={{opacity:0, scale:0.98}}
      animate={{opacity:1, scale:1}}
      transition={{duration:0.6}}
    >
      <img
        src="https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1600&auto=format&fit=crop"
        alt="Визуализация квартала у моря"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  </div>
</section>


      {/* KPI */}
      <section className="py-10">
          <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-5 items-stretch">
          <div className="h-full">
  <Stat value="≈ 1,4 км" label="До пляжа" icon={<Waves size={18} />} />
</div>
<div className="h-full">
  <Stat value="6–10" label="Этажность, домов" sub="Монолит-кирпич" icon={<Building2 size={18} />} />
</div>
<div className="h-full">
  <Stat value="3,02 м" label="Высота потолков" icon={<Ruler size={18} />} />
</div>
<div className="h-full">
  <Stat value="> 2 000" label="Паркомест" sub="Гостевые и многоуровневые" icon={<ParkingSquare size={18} />} />
</div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold" style={{fontFamily:'Prata, serif'}}>О проекте</h2>
            <p className="mt-4" style={{color:'#4B3B30'}}>
              «Просторы Крыма» — современная квартальная застройка у моря: безопасные дворы без машин, детские и спортивные
              площадки, озеленение и коммерция шаговой доступности. Продуманные планировки и виды на Чёрное море.
            </p>
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {h:'Сроки', t:'1 очередь — 1 кв. 2026; 2 очередь — 3 кв. 2026; 3 очередь — 4 кв. 2028; завершение — до 4 кв. 2029.', icon:<FileText size={18}/>},
                {h:'Технологии', t:'Монолит-кирпич, «умный дом», панорамные окна, индивидуальное отопление.', icon:<CircuitBoard size={18}/>},
                {h:'Юридически', t:'214-ФЗ и эскроу-счета. Застройщик: ООО СЗ «Просторы Крыма».', icon:<ShieldCheck size={18}/>},
                {h:'Масштаб', t:'Школы, детские сады, медцентр, торговые галереи на территории.', icon:<Hammer size={18}/>},
              ].map((c,i)=> (
                <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{borderColor:'#EAD6C4', backgroundColor:'#FFFFFF'}}>
                  <IconWrap>{c.icon}</IconWrap>
                  <div>
                    <div className="font-semibold" style={{color:'#2B2118'}}>{c.h}</div>
                    <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.t}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <aside className="p-6 rounded-2xl border" style={{backgroundColor:'#F6E6D9', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}><Building2 size={18}/> Ключевые факты</div>
            <ul className="mt-3 space-y-2 text-sm" style={{color:'#4B3B30'}}>
              <li><Waves size={14} className="inline mr-2"/> ≈ 1,4 км до пляжа</li>
              <li><MapPin size={14} className="inline mr-2"/> Панорамные виды на море</li>
              <li><ParkingSquare size={14} className="inline mr-2"/> Паркинг: многоуровневый + гостевой</li>
              <li><Bath size={14} className="inline mr-2"/> Отделка: предчистовая или с ремонтом</li>
            </ul>
            <a href="#cta" className="mt-5 inline-block w-full text-center px-4 py-2 rounded-xl" style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Запросить подборку</a>
          </aside>
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><Building2 size={22}/> Галерея</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              "https://images.unsplash.com/photo-1487956382158-bb926046304a?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
              "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?q=80&w=1600&auto=format&fit=crop",
            ].map((src, i) => (
              <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden shadow border group" style={{borderColor:'#EAD6C4'}}>
                <img src={src} alt="Визуализации фасадов/интерьеров" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><MapPin size={22}/> Локация и окружение</h2>
            <p className="mt-4" style={{color:'#4B3B30'}}>
              Посёлок Приморский, г.о. Феодосия, Республика Крым. Координаты: 45.138389, 35.509972.
              До пляжа ≈ 1,4 км. Рядом — аллея, спортплощадки, торговые галереи, школы, сады, медцентр.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {[{t:"Школы и детские сады", icon:<School size={16}/>}, {t:"Медицинский центр", icon:<HeartHandshake size={16}/>}, {t:"Магазины и услуги", icon:<Store size={16}/>}, {t:"Транспортная доступность", icon:<Bike size={16}/> }].map((i,idx)=> (
                <li key={idx} className="p-3 rounded-xl border flex items-center gap-2" style={{borderColor:'#EAD6C4', backgroundColor:'#FFFFFF', color:'#2B2118'}}>
                  {i.icon} {i.t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow border" style={{borderColor:'#EAD6C4'}}>
            <iframe title="map" src="https://yandex.ru/map-widget/v1/?ll=35.509972%2C45.138389&z=14" className="w-full h-[360px]" loading="lazy" />
          </div>
        </div>
      </section>

      {/* INFRA */}
      <section id="infra" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><Store size={22}/> Инфраструктура квартала</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            {[
              {t:"Для семей", points:[[Baby,"Детские сады на территории"],[School,"Современные школы"],[Trees,"Дворы без машин"]]},
              {t:"Для активных", points:[[Dumbbell,"Спортплощадки и аллеи"],[Bike,"Воркаут-зоны"],[Waves,"Близость к пляжам"]]},
              {t:"Сервис и комфорт", points:[[Store,"Торговые галереи и кафе"],[HeartHandshake,"Аптеки и сервисы"],[ParkingSquare,"Гостевой и многоуровневый паркинг"]]}
            ].map((b, i)=> (
              <div key={i} className="p-6 rounded-2xl border" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <div className="font-semibold" style={{color:'#2B2118'}}>{b.t}</div>
                <ul className="mt-3 space-y-2 text-sm" style={{color:'#4B3B30'}}>
                  {b.points.map(([Ic,txt], j)=>(
                    <li key={j} className="flex gap-3 items-start"><Ic size={16}/> {txt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH */}
      <section id="tech" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><CircuitBoard size={22}/> Технологии и инженерия</h2>
            <ul className="mt-4 space-y-2" style={{color:'#4B3B30'}}>
              {[
                {t:'Конструктив: монолит-кирпич', icon:<Building2 size={16}/>},
                {t:'Панорамное остекление, улучшенная тепло-/шумоизоляция', icon:<Home size={16}/>},
                {t:'Индивидуальное отопление (по корпусам)', icon:<FireIcon/>},
                {t:'Система «умный дом» и современные лифты', icon:<CircuitBoard size={16}/>},
                {t:'Отделка: предчистовая / с ремонтом', icon:<Bath size={16}/>},
              ].map((i,idx)=> (
                <li key={idx} className="flex gap-3 items-start"><span className="mt-0.5">{i.icon}</span> {i.t}</li>
              ))}
            </ul>
          </div>
          <div className="p-6 rounded-2xl border shadow" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}><ShieldCheck size={18}/> Преимущества для владельца</div>
            <div className="grid sm:grid-cols-2 gap-4 mt-3 text-sm" style={{color:'#4B3B30'}}>
              {["Энергоэффективность и комфорт","Ликвидность для аренды/перепродажи","Удобные планировки","Паркинг и коммерция на территории"].map((t,i)=> (
                <div key={i} className="p-4 rounded-xl border" style={{backgroundColor:'#FFF8F2', borderColor:'#EAD6C4'}}>{t}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><Ruler size={22}/> Планировки и метражи</h2>
          <p className="mt-3" style={{color:'#4B3B30'}}>Студии от ~29 м², 1-комнатные ~35–45 м², 2-комнатные от ~50 м², 3-комнатные — до ~84 м². Варианты: предчистовая и с ремонтом (по корпусам и очередям).</p>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              { t: "Студии", d: "~29–30 м², эргономика для аренды и отдыха", icon:<Home size={18}/> },
              { t: "1-комнатные", d: "~35–45 м², кухни-гостиные, лоджии", icon:<Home size={18}/> },
              { t: "2–3-комнатные", d: "от ~50 до ~84 м², семейные форматы", icon:<Home size={18}/> },
            ].map((c, i) => (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="font-semibold" style={{color:'#2B2118'}}>{c.t}</div>
                  <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.d}</div>
                  <a href="#cta" className="mt-3 inline-block text-sm" style={{color:'#C65D3A'}}>Запросить PDF-подборку планировок</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHASING */}
      <section id="phasing" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><Building2 size={22}/> Очереди строительства</h2>
          <div className="mt-6 overflow-x-auto rounded-2xl border" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
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
                  {q:"1 очередь", s:"1 кв. 2026", c:"Запуск продаж и ввод первых корпусов"},
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

      {/* PROCESS */}
      <section id="process" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><FileSignature size={22}/> Как проходит покупка</h2>
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            {[
              {t:"Заявка", d:"Присылаем подборку планировок и цен", icon:<Handshake size={18}/>},
              {t:"Выбор", d:"Презентация, консультация, бронирование", icon:<KeyRound size={18}/>},
              {t:"Ипотека/оплата", d:"ДДУ на эскроу-счёт", icon:<Banknote size={18}/>},
              {t:"Сделка", d:"Подписание, регистрация, ключи", icon:<FileSignature size={18}/>},
            ].map((s,i)=> (
              <div key={i} className="p-5 rounded-2xl border flex items-start gap-3" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <IconWrap>{s.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{color:'#2B2118'}}>{i+1}. {s.t}</div>
                  <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border" style={{backgroundColor:'#FFF8F2', borderColor:'#EAD6C4'}}>
              <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}><Banknote size={18}/> Банки-партнёры</div>
              <div className="grid grid-cols-3 gap-3 mt-3 text-sm" style={{color:'#4B3B30'}}>
                {["Сбер","ВТБ","Дом.РФ","Альфа","Газпромбанк","РНКБ"].map((b,i)=>(
                  <div key={i} className="h-14 rounded-xl border grid place-items-center" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>{b}</div>
                ))}
              </div>
              <p className="text-xs mt-3" style={{color:'#7A6A5F'}}>Перечень банков может расширяться.</p>
            </div>
            <div className="p-6 rounded-2xl border shadow" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
              <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}><Home size={18}/> Видео-тур по кварталу</div>
              <div className="mt-3 aspect-video rounded-xl overflow-hidden border" style={{borderColor:'#EAD6C4'}}>
                <iframe title="video" src="https://www.youtube.com/embed/dQw4w9WgXcQ" className="w-full h-full" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="py-14 md:py-20" style={{backgroundColor:'#FFF3EA'}}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><ShieldCheck size={22}/> Почему нам доверяют</h2>
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {t:"Прозрачность", d:"214-ФЗ, договор ДДУ, эскроу-счёт", icon:<ShieldCheck size={18}/>},
              {t:"Инфраструктура", d:"Садики, школы, мед и спорт", icon:<School size={18}/>},
              {t:"Локация", d:"Море пешком, транспорт, виды", icon:<MapPin size={18}/>},
            ].map((c,i)=>(
              <div key={i} className="p-6 rounded-2xl border shadow-sm flex items-start gap-3" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
                <IconWrap>{c.icon}</IconWrap>
                <div>
                  <div className="text-lg font-semibold" style={{color:'#2B2118'}}>{c.t}</div>
                  <div className="text-sm mt-1" style={{color:'#4B3B30'}}>{c.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUY CTA + FORM */}
      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2" style={{fontFamily:'Prata, serif'}}><Handshake size={22}/> Оставьте заявку на подбор</h2>
            <p style={{color:'#4B3B30'}}>Подберём планировки и условия под вашу задачу — проживание, аренда, инвестиция. Расскажем о доступных корпусах и сроках.</p>
            <a href="https://t.me/todayididg00d" target="_blank" className="inline-block px-5 py-3 rounded-2xl border" style={{borderColor:'#D4A373', color:'#2B2118'}}>Написать в Telegram</a>
          </div>
          <div id="cta" className="p-6 rounded-2xl border shadow" style={{backgroundColor:'#FFFFFF', borderColor:'#EAD6C4'}}>
            {sent ? (
              <div className="text-center">
                <div className="text-xl font-semibold" style={{color:'#2B2118'}}>Спасибо! Заявка отправлена.</div>
                <p className="mt-2" style={{color:'#4B3B30'}}>Мы свяжемся с вами в ближайшее время.</p>
              </div>
            ) : (
              <>
                <div className="text-xl font-semibold" style={{color:'#2B2118'}}>Получить подборку квартир</div>
                <p className="text-sm mt-1" style={{color:'#4B3B30'}}>Оставьте контакты — пришлём актуальные планировки, цены и акции по ЖК «Просторы Крыма».</p>
                <form onSubmit={onSubmit} className="mt-4 space-y-3">
                  <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}} name="name" placeholder="Ваше имя" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}} name="phone" placeholder="Телефон" required />
                  <input className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}} name="email" placeholder="Email (по желанию)" />
                  <textarea className="w-full px-4 py-3 rounded-xl border" style={{borderColor:'#EAD6C4'}} name="message" placeholder="Комментарий" rows={3} />
                  <button type="submit" className="w-full px-4 py-3 rounded-xl" style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Отправить</button>
                </form>
                <a href="https://t.me/todayididg00d" target="_blank" className="mt-3 block text-center px-4 py-3 rounded-xl border" style={{borderColor:'#D4A373', color:'#2B2118'}}>Или написать в Telegram</a>
                <p className="mt-3 text-xs" style={{color:'#7A6A5F'}}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.</p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t" style={{borderColor:'#EAD6C4'}}>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6 text-sm" style={{color:'#4B3B30'}}>
          <div className="md:col-span-2">
            <div className="font-semibold flex items-center gap-2" style={{color:'#2B2118'}}><Home size={16}/> Просторы Крыма</div>
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Просторы Крыма",
        "url": "https://yoimdely.github.io/prostory-kryma2/",
        "sameAs": ["https://t.me/todayididg00d"],
        "address": { "@type": "PostalAddress", "addressLocality": "Приморский", "addressRegion": "Республика Крым", "addressCountry": "RU" }
      }) }} />
    </div>
  );
}

// Иконка огня
function FireIcon(props){
  return (
    <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 2s4 4 0 8c3 0 6 2 6 6a6 6 0 0 1-12 0c0-2.5 1.5-4.5 3.5-5.5C9 8 10 5 12 2z"/>
    </svg>
  );
}
