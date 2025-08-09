import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home, MapPin, Menu, X, Building2, Ruler, ParkingSquare, Waves
} from "lucide-react";

// === SEO + ШРИФТЫ ===
function injectSEO() {
  if (typeof document === "undefined") return;
  document.title = "Просторы Крыма — жилой квартал у моря";
  const meta = [
    { name: "description", content: "ЖК Просторы Крыма в пгт Приморский (Феодосия): 1,4 км до моря, монолит-кирпич, 6–10 этажей, предчистовая или с ремонтом, эскроу 214-ФЗ." },
    { property: "og:title", content: "Просторы Крыма — жилой квартал у моря" },
    { property: "og:description", content: "1,4 км до моря, монолит-кирпич, предчистовая или с ремонтом. Планировки, цены, очереди." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "https://images.unsplash.com/photo-1529429612776-e5dd24d49b42?q=80&w=1600&auto=format&fit=crop" }
  ];
  meta.forEach(m => {
    let el = document.querySelector(`meta[${m.name ? "name" : "property"}="${m.name || m.property}"]`);
    if (!el) { el = document.createElement("meta"); m.name ? el.setAttribute("name", m.name) : el.setAttribute("property", m.property); document.head.appendChild(el); }
    el.setAttribute("content", m.content);
  });
}

function injectFonts() {
  if (typeof document === "undefined") return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&family=Prata&display=swap";
  document.head.appendChild(link);
}

// === УТИЛЫ ===
const IconWrap = ({ children }) => (
  <span className="inline-flex items-center justify-center rounded-xl"
    style={{ backgroundColor: '#F6E6D9', color: '#2B2118', width: 40, height: 40, border: '1px solid #EAD6C4' }}>
    {children}
  </span>
);

function Stat({ label, value, sub, icon }) {
  return (
    <div className="p-5 rounded-2xl border shadow-sm flex items-start gap-3"
      style={{ backgroundColor: '#F6E6D9', borderColor: '#EAD6C4' }}>
      {icon ? <IconWrap>{icon}</IconWrap> : null}
      <div>
        <div className="text-2xl font-extrabold" style={{ color: '#2B2118' }}>{value}</div>
        <div className="text-sm mt-1" style={{ color: '#4B3B30' }}>{label}</div>
        {sub ? <div className="text-xs mt-1" style={{ color: '#7A6A5F' }}>{sub}</div> : null}
      </div>
    </div>
  );
}

// === APP ===
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
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
    <div className="min-h-screen" style={{ backgroundColor: "#FFF8F2", color: "#1F1B16", fontFamily: "Montserrat, sans-serif" }}>

      {/* NAVIGATION */}
      <header className="sticky top-0 z-30 border-b backdrop-blur"
        style={{ backgroundColor: "rgba(255,248,242,0.95)", borderColor: "#EAD6C4" }}>
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-4">
          {/* Лого */}
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

          {/* Меню для ПК */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] mx-auto">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#contact"]
            ].map(([t, href]) => (
              <a key={href} href={href} className="hover:text-orange-600 transition-colors" style={{ color: "#4B3B30" }}>{t}</a>
            ))}
          </nav>

          {/* Кнопки для ПК */}
          <div className="ml-auto hidden sm:flex items-center gap-3">
            <a href="https://t.me/todayididg00d" target="_blank"
              className="px-4 py-2 rounded-2xl border hover:shadow-md"
              style={{ borderColor: "#D4A373", color: "#2B2118" }}>Заявка</a>
            <a href="#cta" className="px-4 py-2 rounded-2xl"
              style={{ backgroundColor: "#C65D3A", color: "#FFF8F2" }}>Подбор квартиры</a>
          </div>

          {/* Бургер */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden ml-auto">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Мобильное меню */}
        {menuOpen && (
          <div className="lg:hidden bg-white shadow-md">
            {[
              ["О проекте", "#about"],
              ["Локация", "#location"],
              ["Планировки", "#plans"],
              ["Галерея", "#gallery"],
              ["Контакты", "#contact"]
            ].map(([t, href]) => (
              <a key={href} href={href} className="block px-4 py-2 text-gray-700 hover:bg-orange-50">{t}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-5 py-10" id="about">
        <h1 className="text-3xl font-bold mb-6" style={{ fontFamily: "Prata, serif" }}>
          Просторы Крыма — современный квартал у моря
        </h1>
        <p className="text-lg mb-8" style={{ color: "#4B3B30" }}>
          Современный жилой комплекс в Приморском (Феодосия) всего в 1,4 км от пляжа. Монолит-кирпичные дома с высотой потолков 3,02 м.
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          <Stat value="≈ 1,4 км" label="До пляжа" icon={<Waves size={18} />} />
          <Stat value="6–10" label="Этажность" sub="Монолит-кирпич" icon={<Building2 size={18} />} />
          <Stat value="3,02 м" label="Высота потолков" icon={<Ruler size={18} />} />
          <Stat value="> 2 000" label="Паркомест" sub="Гостевые и многоуровневые" icon={<ParkingSquare size={18} />} />
        </div>
      </section>

      {/* ФОРМА */}
      <section id="cta" className="px-5 py-10" style={{ backgroundColor: "#F6E6D9" }}>
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: "Prata, serif" }}>Оставьте заявку</h2>
          {!sent ? (
            <form onSubmit={onSubmit} className="grid gap-4">
              <input type="hidden" name="access_key" value="af90736e-9a82-429d-9943-30b5852e908a" />
              <input name="name" placeholder="Ваше имя" className="p-3 rounded-xl border" required />
              <input name="phone" placeholder="Телефон" className="p-3 rounded-xl border" required />
              <button type="submit" className="p-3 rounded-xl text-white" style={{ backgroundColor: "#C65D3A" }}>
                Отправить
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-xl bg-green-100 text-green-800">Спасибо! Мы свяжемся с вами.</div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-5 py-6 text-center text-sm" style={{ color: "#7A6A5F" }}>
        © {new Date().getFullYear()} Просторы Крыма. Все права защищены.
      </footer>
    </div>
  );
}
