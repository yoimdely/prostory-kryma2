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

function injectFonts() {
  if (typeof document === "undefined") return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;800&family=Playfair+Display:wght@600;800&display=swap";
  document.head.appendChild(link);
}

function IconWrap({ children }){
  return (
    <span className="inline-flex items-center justify-center rounded-xl" style={{backgroundColor:'#F6E6D9', color:'#2B2118', width:40, height:40, border:'1px solid #EAD6C4'}}>
      {children}
    </span>
  );
}

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

export default function App(){
  const [sent, setSent] = useState(false);

  useEffect(()=>{ injectFonts(); }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    fetch("https://api.web3forms.com/submit", { method:"POST", body:data })
      .then(r => (r.ok ? r.json() : Promise.reject()))
      .then(()=> setSent(true))
      .catch(()=> alert("Не удалось отправить. Проверьте access_key веб-формы."));
  };

  return (
    <div className="min-h-screen" style={{backgroundColor:'#FFF8F2', color:'#1F1B16', fontFamily:'Manrope, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial'}}>
      {/* NAV */}
      <header className="sticky top-0 z-30 backdrop-blur border-b" style={{backgroundColor:'rgba(255,248,242,0.8)', borderColor:'#EAD6C4'}}>
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl grid place-items-center font-semibold" style={{backgroundColor:'#2B2118', color:'#F6E6D9'}}>ПК</div>
            <div>
              <div className="font-extrabold flex items-center gap-2" style={{fontFamily:'Playfair Display, Manrope, serif'}}>
                <Home size={18} /> Просторы Крыма
              </div>
              <div className="text-xs" style={{color:'#7A6A5F'}}><MapPin size={12} className="inline mr-1"/> Жилой квартал у моря · Приморский, Феодосия</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {[["О проекте","#about"],["Галерея","#gallery"],["Локация","#location"],["Инфраструктура","#infra"],["Технологии","#tech"],["Планировки","#plans"],["Очереди","#phasing"],["Как купить","#process"],["Доверие","#trust"]].map(([t,href])=> (
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
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight" style={{fontFamily:'Playfair Display, Manrope, serif', color:'#2B2118'}}>Новый город у моря — «Просторы Крыма»</h1>
            <p className="mt-5 md:text-lg" style={{color:'#4B3B30'}}>Комфорт‑класс, монолит‑кирпич, высота потолков ~3,02 м, благоустроенные дворы, детские и спортивные площадки, торговые галереи и виды на Чёрное море. До моря ≈ 1,4 км. Первая сдача — 1 кв. 2026; очереди — до 4 кв. 2029.</p>
            <ul className="mt-6 grid grid-cols-2 gap-3 text-sm">
              {["1,4 км до пляжа","6–10 этажей","Предчистовая / с ремонтом","Паркинг: многоуровневый и гостевой"].map((t,i)=> (
                <li key={i} className="p-3 rounded-xl shadow flex items-center gap-2" style={{backgroundColor:'#FFFFFF', color:'#2B2118', border:'1px solid #EAD6C4'}}>
                  {i===0 && <Waves size={18}/>} {i===1 && <Building2 size={18}/>} {i===2 && <Bath size={18}/>} {i===3 && <ParkingSquare size={18}/>} {t}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <a href="#cta" className="px-5 py-3 rounded-2xl" style={{backgroundColor:'#C65D3A', color:'#FFF8F2'}}>Получить подборку</a>
              <a href="https://t.me/todayididg00d" target="_blank" className="px-5 py-3 rounded-2xl border" style={{borderColor:'#D4A373', color:'#2B2118'}}>Задать вопрос в TG</a>
            </div>
          </motion.div>
          <motion.div className="aspect-[4/3] md:aspect-[5/4] rounded-3xl overflow-hidden shadow-lg" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.6}}>
            <img src="https://images.unsplash.com/photo-1529429612776-e5dd24d49b42?q=80&w=1600&auto=format&fit=crop" alt="Визуализация квартала у моря" className="w-full h-full object-cover" loading="lazy" />
          </motion.div>
        </div>
      </section>

      {/* KPI */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-4 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Stat value="≈ 1,4 км" label="До пляжа" icon={<Waves size={18}/>} />
          <Stat value="6–10" label="Этажность, домов" sub="Монолит‑кирпич" icon={<Building2 size={18}/>} />
          <Stat value="3,02 м" label="Высота потолков" icon={<Ruler size={18}/>} />
          <Stat value="> 2 000" label="Паркомест" sub="Гостевые и многоуровневые" icon={<ParkingSquare size={18}/>} />
        </div>
      </section>

      {/* ... (остальные секции опущены в этом кратком билде для MVP) ... */}

      {/* BUY CTA */}
      <section id="buy" className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold" style={{fontFamily:'Playfair Display, Manrope, serif'}}>Оставьте заявку на подбор</h2>
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
                <p className="mt-3 text-xs" style={{color:'#7A6A5F'}}>Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.</p>
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
            <p className="mt-1">Застройщик: ООО СЗ «Просторы Крыма». Строительство по 214‑ФЗ с использованием эскроу‑счетов.</p>
          </div>
          <div className="md:text-right">
            <a href="#" className="underline">Политика конфиденциальности</a>
            <span className="mx-2">•</span>
            <a href="#" className="underline">Согласие на обработку ПДн</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
