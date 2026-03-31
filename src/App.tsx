/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight, Film, Mic, Music, Briefcase, Calendar, Link as LinkIcon, ArrowUpRight, Clapperboard, Settings, Camera, Palette, Video, Clock, Cpu } from "lucide-react";

// --- Types ---
type Page = 'home' | 'projects' | 'team' | 'contact';

// --- Components ---

const Navbar = ({ currentPage, setPage }: { currentPage: Page, setPage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { label: string, id: Page }[] = [
    { label: "Anasayfa", id: "home" },
    { label: "Projeler", id: "projects" },
    { label: "Ekibimiz", id: "team" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-surface/80 backdrop-blur-xl py-4' : 'bg-gradient-to-b from-background to-transparent py-8'}`}>
      <div className="flex justify-between items-center px-6 md:px-12 w-full max-w-[1920px] mx-auto">
        <button 
          onClick={() => setPage('home')}
          className="text-2xl font-bold tracking-tighter text-on-surface font-headline uppercase hover:scale-105 transition-transform"
        >
          ARTIZAN FILM
        </button>
        
        <div className="hidden md:flex items-center space-x-12 font-headline uppercase tracking-widest text-[11px]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`transition-all duration-300 hover:scale-105 ${currentPage === item.id ? 'text-primary border-b border-primary-container pb-1' : 'text-on-surface/70 hover:text-on-surface'}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-8">
          <button 
            onClick={() => setPage('contact')}
            className={`font-headline uppercase tracking-widest text-[11px] transition-all duration-300 hover:scale-105 ${currentPage === 'contact' ? 'text-primary border-b border-primary-container pb-1' : 'text-primary'}`}
          >
            İletişim
          </button>
          <button className="md:hidden text-on-surface" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-surface-container p-6 flex flex-col space-y-6 font-headline uppercase tracking-widest text-sm"
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setIsMenuOpen(false); }}
              className={currentPage === item.id ? 'text-primary' : 'text-on-surface/70'}
            >
              {item.label}
            </button>
          ))}
          <button onClick={() => { setPage('contact'); setIsMenuOpen(false); }} className="text-primary text-left">İletişim</button>
        </motion.div>
      )}
    </nav>
  );
};

const Footer = ({ setPage }: { setPage: (p: Page) => void }) => (
  <footer className="w-full pt-24 pb-12 bg-[#1C1B1B] border-t border-outline-variant/15">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 px-6 md:px-12 w-full max-w-[1920px] mx-auto">
      <div>
        <button onClick={() => setPage('home')} className="text-lg font-headline text-on-surface uppercase tracking-tighter mb-8 hover:text-primary transition-colors">ARTIZAN FILM</button>
        <p className="font-body text-xs tracking-[0.2em] uppercase text-on-surface/50 leading-relaxed max-w-xs">
          Modern anlatı çağında üst düzey görsel deneyimler küratörlüğü yapıyoruz.
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-container mb-4">Bağlantıda Kalın</span>
        <a href="#" className="font-body text-xs tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors hover:underline decoration-primary-container underline-offset-4">Instagram</a>
        <a href="#" className="font-body text-xs tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors hover:underline decoration-primary-container underline-offset-4">Vimeo</a>
        <a href="#" className="font-body text-xs tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors hover:underline decoration-primary-container underline-offset-4">LinkedIn</a>
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col space-y-4">
          <span className="font-body text-xs tracking-[0.2em] uppercase text-primary-container mb-4">Yasal</span>
          <a href="#" className="font-body text-xs tracking-[0.2em] uppercase text-on-surface/40 hover:text-primary transition-colors hover:underline decoration-primary-container underline-offset-4">Gizlilik Politikası</a>
        </div>
        <div className="mt-12 font-body text-xs tracking-[0.2em] uppercase text-on-surface/50">
          © 2026 ARTIZAN FILM PRODÜKSİYON. TÜM HAKLARI SAKLIDIR.
        </div>
      </div>
    </div>
  </footer>
);

// --- Page Content Components ---

const HomePage = ({ setPage }: { setPage: (p: Page) => void }) => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Hero */}
      <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-surface-container-lowest">
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity, backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBOKLRUw5BjgbbHZ_1ZjNEpN_FbzwR_40GTlAnu3V2Z58RKiAKAU82RXeuaJoTfyjxIbDnrOgmGDk7crL92jmBKKCb-cinYfXvhB7Y9zlQUJkZ3cRUfJr0RjD5o4CXl3lDi3WR_Tir2zdzjcv9Xsgu5OZ3Z2m_JDr_kNi4M6snfKFFs-0rgwHKtwxVEjiREJdUpymh_P__HxQUTpo2HVXFgE1YP3vxfG8vnqGN8KUbTGWjM-wh4ydGF3F-U80KlestKduXJoWelJiw')" }}
            className="w-full h-full bg-cover bg-center opacity-40 mix-blend-luminosity"
          ></motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-headline text-7xl md:text-9xl font-bold tracking-tighter text-on-surface mb-4 leading-none text-glow"
          >
            ARTIZAN FILM
          </motion.h1>
          <motion.div className="reveal-mask">
            <motion.p 
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="font-label text-xs md:text-sm tracking-[0.5em] text-primary uppercase max-w-2xl mx-auto opacity-80"
            >
              DİJİTAL AUTEUR. HİKAYELERİ HASSASİYETLE İŞLİYORUZ.
            </motion.p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-16 flex flex-col items-center"
          >
            <div className="w-px h-24 bg-gradient-to-b from-primary/50 to-transparent"></div>
            <span className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface/40 mt-4">Keşfetmek için kaydırın</span>
          </motion.div>
        </div>
      </section>

      {/* About Teaser */}
      <section className="py-32 px-6 md:px-24 bg-surface relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24 items-start"
        >
          <div className="w-full md:w-1/2">
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-8 block">Felsefemiz</span>
            <div className="reveal-mask">
              <motion.h2 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="font-headline text-4xl md:text-6xl font-medium leading-tight text-on-surface"
              >
                Sadece görüntü kaydetmiyoruz. <span className="italic text-primary-container">Niyeti</span> kadraja alıyoruz.
              </motion.h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 mt-12 md:mt-24">
            <p className="font-body text-lg md:text-xl text-on-surface/70 leading-relaxed font-light">
              Artizan Film, teknik mükemmeliyetin sanatsal sezgiyle buluştuğu butik bir prodüksiyon evidir. Dijital gürültü çağında, sinematik estetiği önceliklendiriyor, kalıcılığı olan görsel anlatılar inşa ediyoruz.
            </p>
            <div className="mt-12">
              <button onClick={() => setPage('team')} className="inline-flex items-center gap-4 group">
                <span className="font-label text-sm uppercase tracking-widest text-primary group-hover:underline decoration-primary underline-offset-8 transition-all">Hikayemizi okuyun</span>
                <ArrowRight className="text-primary group-hover:translate-x-2 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-32 bg-surface-container-low">
        <div className="px-6 md:px-24 mb-16 flex justify-between items-end">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary/60 mb-4 block">Portfolyo</span>
            <h3 className="font-headline text-5xl font-bold tracking-tight uppercase">Seçili İşler</h3>
          </motion.div>
          <div className="hidden md:block">
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/40">EST. 2026 // İSTANBUL - LONDRA - NYC</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 px-6 md:px-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-8 group cursor-pointer overflow-hidden relative" 
            onClick={() => setPage('projects')}
          >
            <motion.div 
              initial={{ x: 0 }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0 bg-background z-10"
            />
            <div className="aspect-video w-full overflow-hidden bg-surface-container-highest">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full object-cover grayscale hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB131r3OJDMLMJXz_k7k7223HaEmhXoldYi8HoW5n-m9SWOCkufjNFgZooT1GBkgZ-YPyAl7iPN0BJPK50LNQ0AbkvHU_4lTLgkal35UueLIx40F2uFWnjN7FX_PrG34FR7QXvPzZCTkFX43vhMdm0g8euoC4dJHwVyMVxwKGRgwnS3wUToAMTmKr3PGrhPD02irJ9PgmjxYI4QK--g1RJIxkymgiz1GOELkFgWDBnO-Cild1fwxBey7JcB3opJ_hiDOzB3AV_LYLs" 
                alt="Gece Vizyonları"
              />
            </div>
            <div className="mt-6 flex justify-between items-start">
              <div>
                <h4 className="font-headline text-2xl uppercase tracking-tighter text-on-surface">GECE VİZYONLARI</h4>
                <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mt-1">Kısa Film / Kurmaca</p>
              </div>
              <span className="font-label text-sm text-primary">01</span>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-4 group cursor-pointer mt-12 md:mt-0 relative overflow-hidden" 
            onClick={() => setPage('projects')}
          >
            <motion.div 
              initial={{ x: 0 }}
              whileInView={{ x: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0 bg-background z-10"
            />
            <div className="aspect-[3/4] w-full overflow-hidden bg-surface-container-highest">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full object-cover grayscale hover:grayscale-0" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfip3MosGmxtZaHmS0PZpnzfjzLzUvGMNsjwt_lmUQ5q5RCcSC3Wz4gPlln6aaATFsYkl_RIwkVb_bH4uxABdq-6_aIp5L0QLq9K-o3rwerJPUEH5I0iixjxqpwxfiu8mwakp1Ic80u5aybzJkBj05uv3eRlaaE1GinzbPH6hQU78YwEevXjJZ0vHchf-Y9zyzMqOfMBG1S-H9h8nJtRiKa1bfwtZrWqTGRUpCPU6O4_NhcQUHJYxHby3BStdGWklMki0nqtVbTfc" 
                alt="Altın Oran"
              />
            </div>
            <div className="mt-6">
              <h4 className="font-headline text-2xl uppercase tracking-tighter text-on-surface">ALTIN ORAN</h4>
              <p className="font-label text-xs uppercase tracking-widest text-on-surface/40 mt-1">Marka Kimliği / Deneysel</p>
            </div>
          </motion.div>
        </div>
        <div className="mt-24 text-center">
          <button 
            onClick={() => setPage('projects')}
            className="group relative inline-flex items-center justify-center px-12 py-6 overflow-hidden font-headline font-bold uppercase tracking-[0.2em] text-background bg-gradient-to-br from-primary to-primary-container rounded-sm hover:scale-[1.02] transition-transform duration-500"
          >
            <span className="relative z-10">TÜM PROJELERİ GÖRÜNTÜLE</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]"></div>
          </button>
        </div>
      </section>

      {/* Quote Section */}
      <section className="h-[600px] relative flex items-center justify-center bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="light-leak"></div>
          <motion.div 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 15, ease: "linear" }}
            className="w-full h-full bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBsmHCi91cd6cHqtbDjdrg4oFNZTTd66VB_QeX70h2_hUhwbNWt2YRHDUUPayEYvKXI8-0clwQl7XTewkO1NnFRUHVeY4ViNzFFPUL-vkSi3TuI6XOXZB9c2Fi5LyrPWImurLCG44xWzNzY6onna_kRcKz12FLbCKoiRdy3XrbFhREnofcrkrOzXt1_aSMNGh260WVlb2_jM851la_C2ovO4PMTm31psxydjvdmSq_Ma74IwGNFowhQ1V4n5U--1dCC4AZLlMlJbJA')" }}
          ></motion.div>
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
          </div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative text-center max-w-3xl px-12"
        >
          <Clapperboard className="text-primary text-4xl mb-6 mx-auto" />
          <h2 className="font-headline text-3xl md:text-5xl font-light text-on-surface leading-tight italic">
            "Her kare bir seçimdir. Her gölgenin bir hikayesi vardır."
          </h2>
          <div className="mt-12">
            <button className="font-label text-xs uppercase tracking-[0.4em] text-primary border-b border-primary pb-2 hover:opacity-70 transition-opacity">SHOWREEL 2026 İZLE</button>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

const ProjectsPage = ({ setPage }: { setPage: (p: Page) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-24">
    <header className="px-6 md:px-12 mb-20 max-w-[1920px] mx-auto">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-label text-xs tracking-[0.4em] text-primary mb-4 uppercase"
      >
        Portfolyo Volume 04
      </motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-headline text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none"
      >
        SEÇİLİ<br/>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">İŞLER</span>
      </motion.h1>
    </header>

    <section className="px-6 md:px-12 mb-16 max-w-[1920px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="flex flex-wrap gap-8 items-center border-t border-outline-variant/15 pt-8"
      >
        <button className="font-label text-xs tracking-widest uppercase text-on-surface border-b-2 border-primary pb-2">Tüm İşler</button>
        <button className="font-label text-xs tracking-widest uppercase text-on-surface/40 hover:text-on-surface transition-colors pb-2">Reklam</button>
        <button className="font-label text-xs tracking-widest uppercase text-on-surface/40 hover:text-on-surface transition-colors pb-2">Sinema</button>
        <button className="font-label text-xs tracking-widest uppercase text-on-surface/40 hover:text-on-surface transition-colors pb-2">Dijital Medya</button>
        <button className="font-label text-xs tracking-widest uppercase text-on-surface/40 hover:text-on-surface transition-colors pb-2">Belgesel</button>
      </motion.div>
    </section>

    <section className="px-6 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:col-span-8 group cursor-pointer relative overflow-hidden aspect-[16/9]"
      >
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnfR2mMWO4CaNGFDUZl-9Tl85qjgsqNPc87A1lqODvUsO-vKHQ_1N12VXinroHx1zM-_7tvbAzmpcaTQ3Zkvxg5X7qTEHvg4jxfiFBno0vvtpG7hxiGcoC2BzNSYnVWmrtTFU12lPoj_hr6SsfuEeQ8kfvckOkmEV3XeVM7DLh0CU90LBEQdgFY3y3tBDkWha65NnoDqRMCaCQ1pWEodpK7mWenaPRxBQJhlguxyvQgP_dsIiqOMwD82ugSIy12YQIfYRrt_iTmPg" 
          alt="Sessiz Gelgitler" 
        />
        <div className="absolute inset-0 cinematic-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-12">
          <p className="font-label text-xs tracking-[0.2em] text-primary mb-2 uppercase">Sinema / Uzun Metraj</p>
          <h3 className="font-headline text-3xl md:text-5xl font-bold tracking-tight uppercase">Sessiz Gelgitler</h3>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="md:col-span-4 group cursor-pointer relative overflow-hidden aspect-[4/5] md:mt-24"
      >
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.2 }}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAEkXFa9yjJj_85bDjqSq5bVeGRLVyW2G69nhkC7vujBIKlNaJYqRdEYZPWlill5B9SScgeX6Y97FypAeERSkyFXI80tdrnRSQOs7je7fgPwU7e9WVXVUPkv636MZuyoeEDIbhbhZZdG_TF6EuthhxFa81eymureNW9AvLzu03USVCfxLd_s7jNhN_JcyUbP-VslgTbwk6Or_f5VYtuGu3wWBnr3saY2qzYFV1A7INgtO4Zlk0UhU_RS9JGSxFW3a5XAjCx5V-C41I" 
          alt="Aura Parfüm" 
        />
        <div className="absolute inset-0 cinematic-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <p className="font-label text-xs tracking-[0.2em] text-primary mb-2 uppercase">Reklam Filmi</p>
          <h3 className="font-headline text-2xl font-bold tracking-tight uppercase">Aura Parfüm</h3>
        </div>
      </motion.div>
    </section>

    <section className="mt-32 px-6 md:px-12 text-center max-w-4xl mx-auto py-24 border-y border-outline-variant/10">
      <h2 className="font-headline text-4xl md:text-6xl font-bold mb-10 tracking-tighter uppercase">Prodüksiyonunuza başlamaya hazır mısınız?</h2>
      <button onClick={() => setPage('contact')} className="bg-gradient-to-br from-primary to-primary-container text-background px-12 py-5 font-headline uppercase tracking-widest text-sm font-bold rounded-sm transition-transform hover:scale-105">
        Bizimle İletişime Geçin
      </button>
    </section>
  </motion.div>
);

const TeamPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-24">
    <header className="px-6 md:px-12 mb-20 max-w-[1920px] mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-block px-3 py-1 mb-6 bg-surface-container-highest rounded-md"
      >
        <span className="font-label text-xs font-bold uppercase tracking-widest text-primary">Kreatif Güç</span>
      </motion.div>
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-headline text-6xl md:text-8xl font-bold tracking-tighter mb-8 max-w-4xl"
      >
        Vizyonu <span className="text-primary italic">Gerçeğe</span> Dönüştüren Ekip.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="max-w-2xl text-on-surface/70 text-lg leading-relaxed"
      >
        Artizan Film olarak, hikaye anlatıcılığının matematiksel hassasiyet ve sanatsal özgürlükle buluştuğu noktada yer alıyoruz. Her bir ekip üyemiz, kendi alanında uluslararası standartlarda uzmanlığa sahip usta zanaatkarlardır.
      </motion.p>
    </header>

    <section className="px-6 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[
        { name: "Caner Özdemir", role: "Kurucu & Yönetmen", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWl82hWn7cg5Ya1k86e-Y3j0RM87oYPDrfkTA95iuytRneEnmLaMvNLqGonzXMKMC4tsR18vEeN7C3pZpAoGiIqd3YCh_7jkd3RoUmpV7zAox9e-9H9iQwdjeZxF_QnxiakUYhGSewp508ELMZ1nFBdYx8OLmAIsl_ETOmBvf0SL9VOGln2tZWnOU7mHxrhNRa9Tnz8PuzHECrJdEDD0aBMW-yj2PGpum8g6rRkWdpiTXCxBe5B249nXf4zP8huonOo1A2dxmN9UE", icon: <LinkIcon size={16} /> },
        { name: "Selin Aksoy", role: "Görüntü Yönetmeni", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCknFIkf77nSxH8Mbqh-PN4UtzmOYKj57M1ytM9slsgdTCnOaVXAhJOdGuMEkVEjyk0ED97DCxXx9CB-m8UaS8u2eVWrQRE2eWqGUCSS0SYqovKwpa4reo1RbAfBiJQJNO5pRh1LH49FiFfI7Hh1nVUDKf3aZBgsfD_YRqXS86l3bW5D6GHISNgfrdMhV9wlns9-YIu7GOeyRsD7hj_Mgh3-r2yXIqHdiGNkLKt8n1C9lKxWRWcYmIVmDqw-_y2MkmiS8l-gAPAzhI", icon: <Camera size={16} /> },
        { name: "Mert Yılmaz", role: "Kurgu Editörü", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHDh76dmUrYPycOeCpujp27Ay-wcM4739r3PxcTTqTDZNyNaOaTXPldmSaxJsmApYRxyZie1rsH4v30tGpZWBLU8Tf2-6ifhc-92vWM1hmxHAEm7G1y2M-cI9Kn9CTQlh37eodbjTFyThbShn0TwyggyHOuTwqzpVsQCd7MsMjh5nShYYs7H9RKJraDNOBgb0El0uzvS7okj17f2ymTILdPgo1gfIXY-elcGF3VRULjmKHnHeh7EIuhtQbtJgJ7AD7t2ahxOk-jtI", icon: <Video size={16} /> },
        { name: "Derya Güneş", role: "Renk Uzmanı", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgyJWFIJyJygYmB2Lr1Q4vUZDbpoPN1x4d3AfWEPkYHG7Ps8aSTAu7WwT66x7W4Fh5rdibOI0AeTKiB6hPnMic95Ohwb45-MPwJOCbhbXgrLjJRcHhSFkDnUTTlpGgOlcNBbWunqsmejjK1g8Ogw2saGoMmfSpQzyjnQKmPyTeH6B2cKTRYoJp-kia73AqIewmtKlX4mhUYc1B-xgTyEpXaFACgWlPDX5yktZktsFnpJrFvGrMelNuVR5pmojZYohdtOykKdWE8eo", icon: <Palette size={16} /> },
      ].map((member, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: i * 0.1 }}
          className="group relative aspect-[3/4] overflow-hidden bg-surface-container-high cursor-pointer"
        >
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100" 
            src={member.img} 
            alt={member.name} 
          />
          <div className="absolute inset-0 team-card-overlay flex flex-col justify-end p-8">
            <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary mb-2">{member.role}</span>
            <h3 className="font-headline text-2xl font-bold text-on-surface mb-4">{member.name}</h3>
            <div className="opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
              <div className="flex gap-4 border-t border-outline-variant/15 pt-4 text-primary">
                {member.icon}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="group relative aspect-[3/4] border border-outline-variant/15 flex flex-col items-center justify-center p-12 text-center transition-all duration-300 hover:bg-surface-container-low"
      >
        <div className="w-16 h-16 rounded-full border border-primary/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
          <span className="text-primary text-3xl">+</span>
        </div>
        <h4 className="font-headline text-xl font-medium mb-4">Ekibimize Katılın</h4>
        <button className="text-primary font-label text-[10px] uppercase font-bold tracking-widest border-b border-primary/40 pb-1">Başvuruda Bulun</button>
      </motion.div>
    </section>

    <section className="mt-32 py-24 bg-surface-container-low">
      <div className="px-6 md:px-12 max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-headline text-4xl font-bold mb-6 italic tracking-tight">Teknik <span className="text-primary">Matematik</span> ve Sanatsal Ruh.</h2>
          <p className="text-on-surface/60 leading-relaxed mb-8">
            Artizan Film ekibi, sadece teknik birer operatör değil, aynı zamanda projenizin yaratıcı ortaklarıdır. Kullandığımız her bir piksel hikayenizin gücünü artırmak için tasarlanır.
          </p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="block text-3xl font-headline font-bold text-primary mb-2">500+</span>
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface/40">Tamamlanan Proje</span>
            </div>
            <div>
              <span className="block text-3xl font-headline font-bold text-primary mb-2">15</span>
              <span className="font-label text-[10px] uppercase tracking-wider text-on-surface/40">Sektörel Ödül</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface-container-highest p-8 aspect-square flex flex-col justify-between">
            <Cpu className="text-primary text-4xl" />
            <span className="font-label text-xs uppercase font-bold tracking-widest">Post-Prodüksiyon Hassasiyeti</span>
          </div>
          <div className="bg-primary p-8 aspect-square flex flex-col justify-between text-background">
            <Settings className="text-background text-4xl" />
            <span className="font-label text-xs uppercase font-bold tracking-widest">Sinematik Vizyon</span>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const ContactPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-40 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto">
    <header className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32 items-end">
      <div className="lg:col-span-8">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-headline font-bold leading-[0.9] tracking-tighter text-on-surface">
          BİR PROJE <br/>
          <span className="text-primary">BAŞLATIN</span>
        </h1>
      </div>
      <div className="lg:col-span-4 lg:text-right">
        <p className="font-label text-xs uppercase tracking-[0.3em] text-on-surface/40 leading-relaxed max-w-xs ml-auto">
          Global vizyonerler için yüksek konseptli sinematik hikaye anlatımı ve butik yapım hizmetlerinde uzmanlaşıyoruz.
        </p>
      </div>
    </header>

    <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
      <aside className="lg:col-span-4 space-y-16 order-2 lg:order-1 border-r border-outline-variant/10 pr-12">
        <div>
          <h3 className="font-headline text-2xl font-bold mb-8 tracking-tight">BİZE ULAŞIN</h3>
          <div className="space-y-12">
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">STÜDYO</span>
              <p className="text-xl font-headline font-medium leading-snug">Tomtom Mah. Yeni Çarşı Cad. <br/>No: 68 Beyoğlu, İstanbul</p>
            </div>
            <div>
              <span className="font-label text-[10px] uppercase tracking-[0.4em] text-primary mb-3 block">İLETİŞİM</span>
              <div className="space-y-2">
                <a className="text-xl font-headline font-medium block hover:text-primary transition-colors" href="mailto:info@artizanfilm.com">info@artizanfilm.com</a>
                <a className="text-xl font-headline font-medium block hover:text-primary transition-colors" href="tel:+902125550198">+90 (212) 555 01 98</a>
              </div>
            </div>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full bg-surface-container-low overflow-hidden rounded-sm mt-auto">
          <img className="object-cover w-full h-full grayscale opacity-40 hover:opacity-60 transition-opacity duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsmHCi91cd6cHqtbDjdrg4oFNZTTd66VB_QeX70h2_hUhwbNWt2YRHDUUPayEYvKXI8-0clwQl7XTewkO1NnFRUHVeY4ViNzFFPUL-vkSi3TuI6XOXZB9c2Fi5LyrPWImurLCG44xWzNzY6onna_kRcKz12FLbCKoiRdy3XrbFhREnofcrkrOzXt1_aSMNGh260WVlb2_jM851la_C2ovO4PMTm31psxydjvdmSq_Ma74IwGNFowhQ1V4n5U--1dCC4AZLlMlJbJA" alt="Studio" />
        </div>
      </aside>

      <div className="lg:col-span-8 order-1 lg:order-2">
        <div className="bg-surface-container-low p-8 md:p-16 rounded-sm">
          <form className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-2 group">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface/40 group-focus-within:text-primary transition-colors">Ad Soyad</label>
                <input className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-4 focus:ring-0 focus:border-primary text-on-surface font-body text-lg transition-all placeholder:text-on-surface/20" placeholder="Adınızı giriniz" required type="text"/>
              </div>
              <div className="space-y-2 group">
                <label className="font-label text-[10px] uppercase tracking-widest text-on-surface/40 group-focus-within:text-primary transition-colors">E-posta Adresi</label>
                <input className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-4 focus:ring-0 focus:border-primary text-on-surface font-body text-lg transition-all placeholder:text-on-surface/20" placeholder="ornek@mail.com" required type="email"/>
              </div>
            </div>
            <div className="space-y-6">
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface/40">Proje Türü</span>
              <div className="flex flex-wrap gap-4">
                {['Reklam', 'Kurmaca', 'Belgesel', 'Diğer'].map((type) => (
                  <label key={type} className="cursor-pointer">
                    <input className="hidden peer" name="project_type" type="radio" value={type.toLowerCase()}/>
                    <span className="px-6 py-3 border border-outline-variant/30 text-xs font-label uppercase tracking-widest rounded-sm peer-checked:bg-primary-container peer-checked:text-background peer-checked:border-primary transition-all block">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2 group">
              <label className="font-label text-[10px] uppercase tracking-widest text-on-surface/40 group-focus-within:text-primary transition-colors">Proje Özeti</label>
              <textarea className="w-full bg-transparent border-0 border-b border-outline-variant/30 px-0 py-4 focus:ring-0 focus:border-primary text-on-surface font-body text-lg transition-all placeholder:text-on-surface/20 resize-none" placeholder="Vizyonunuzdan bahsedin..." required rows={5}></textarea>
            </div>
            <button className="group relative inline-flex items-center justify-center px-10 py-5 font-headline font-bold text-sm uppercase tracking-[0.2em] text-background overflow-hidden rounded-sm transition-all duration-500 bg-gradient-to-br from-primary to-primary-container hover:scale-[1.02]" type="submit">
              <span className="relative z-10 flex items-center gap-3">
                Mesaj Gönder
                <ArrowUpRight size={18} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="film-grain"></div>
      <Navbar currentPage={page} setPage={setPage} />
      
      <main className="flex-grow">
        {page === 'home' && <HomePage setPage={setPage} />}
        {page === 'projects' && <ProjectsPage setPage={setPage} />}
        {page === 'team' && <TeamPage />}
        {page === 'contact' && <ContactPage />}
      </main>

      <Footer setPage={setPage} />
    </div>
  );
}
