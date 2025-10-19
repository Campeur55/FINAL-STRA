import { ChevronDown, Target, TrendingUp, Shield, Users, Award, Globe, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  // Removed dynamic left label; map no longer needed

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['mission', 'intelligence', 'strategy', 'vision'];
    const sections = sectionIds
      .map(id => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length === 0) return;

        // Prefer the section closest to the top (top >= 0 and smallest),
        // fallback to highest intersection ratio.
        const headerOffsetPx = 80; // approx header height
        let best = visible
          .filter(e => e.target.getBoundingClientRect().top >= headerOffsetPx * -0.25)
          .sort((a, b) => a.target.getBoundingClientRect().top - b.target.getBoundingClientRect().top)[0];

        if (!best) {
          best = visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        }

        const id = (best.target as HTMLElement).id;
        if (id && id !== activeSection) {
          setActiveSection(id);
          const currentHash = window.location.hash.replace('#', '');
          if (currentHash !== id) {
            history.replaceState(null, '', `#${id}`);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // prevent background scroll when mobile menu is open
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileOpen]);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#590505]/95 backdrop-blur-sm border-b border-[#D98D30]/30' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Roulette Ball Logo */}
            <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
              <div className="absolute w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#F21313] via-[#BF3111] to-[#590505] shadow-lg shadow-[#F21313]/50"></div>
              <div className="absolute w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-radial from-[#F21313] to-[#BF3111]"></div>
              <div className="absolute w-4 h-4 rounded-full bg-white/90 top-2.5 left-3.5 md:top-3 md:left-4 blur-sm"></div>
              <div className="absolute w-2 h-2 rounded-full bg-white top-2.5 left-4 md:top-3 md:left-5"></div>
            </div>
            <div className="leading-none">
              <span className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-[#F2DEA2]">7AMRA</span>
              <span className="text-xl sm:text-2xl font-bold tracking-[0.3em] text-white"> ROYALE</span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#mission" aria-current={activeSection === 'mission' ? 'page' : undefined} className={`transition-colors uppercase tracking-wider text-sm ${activeSection === 'mission' ? 'text-[#D98D30]' : 'hover:text-[#D98D30] text-white'}`}>Mission</a>
            <a href="#intelligence" aria-current={activeSection === 'intelligence' ? 'page' : undefined} className={`transition-colors uppercase tracking-wider text-sm ${activeSection === 'intelligence' ? 'text-[#D98D30]' : 'hover:text-[#D98D30] text-white'}`}>Intelligence</a>
            <a href="#strategy" aria-current={activeSection === 'strategy' ? 'page' : undefined} className={`transition-colors uppercase tracking-wider text-sm ${activeSection === 'strategy' ? 'text-[#D98D30]' : 'hover:text-[#D98D30] text-white'}`}>Strategy</a>
            <a href="#vision" aria-current={activeSection === 'vision' ? 'page' : undefined} className={`transition-colors uppercase tracking-wider text-sm ${activeSection === 'vision' ? 'text-[#D98D30]' : 'hover:text-[#D98D30] text-white'}`}>Vision</a>
            <button className="bg-[#BF3111] hover:bg-[#F21313] px-5 lg:px-6 py-2 transition-all transform hover:scale-105 border border-[#D98D30] uppercase tracking-widest text-sm">
              Enter
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden inline-flex items-center justify-center w-10 h-10 border border-[#D98D30]/40 hover:border-[#D98D30] text-[#F2DEA2]"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(v => !v)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav panel */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/80 backdrop-blur-sm">
            <div className="absolute top-16 left-0 right-0 mx-4 rounded border border-[#D98D30]/30 bg-[#0a0000]">
              <nav className="flex flex-col divide-y divide-[#D98D30]/20">
                {[
                  { id: 'mission', label: 'Mission' },
                  { id: 'intelligence', label: 'Intelligence' },
                  { id: 'strategy', label: 'Strategy' },
                  { id: 'vision', label: 'Vision' }
                ].map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    aria-current={activeSection === item.id ? 'page' : undefined}
                    className={`px-5 py-4 uppercase tracking-wider ${activeSection === item.id ? 'text-[#D98D30]' : 'text-white hover:text-[#D98D30]'}`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="px-5 py-4">
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="w-full bg-[#BF3111] hover:bg-[#F21313] px-6 py-3 transition-all border border-[#D98D30] uppercase tracking-widest text-sm"
                  >
                    Enter
                  </button>
                </div>
              </nav>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#590505] via-black to-[#590505]"></div>

        {/* Casino Pattern Background */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F2DEA2' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>

        {/* Animated roulette balls */}
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-[#F21313] to-[#BF3111] blur-2xl animate-pulse opacity-20"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#D98D30] to-[#BF3111] blur-3xl animate-pulse delay-1000 opacity-10"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-[#F21313] blur-2xl animate-pulse opacity-10" style={{animationDelay: '2s'}}></div>

        <div className="relative z-10 text-center px-6 max-w-5xl">
          {/* Chips row removed per request */}

          <h1 className="text-5xl sm:text-6xl md:text-9xl font-bold mb-8 leading-tight tracking-wider">
            <span className="text-[#F2DEA2]">7AMRA</span>
            <br/>
            <span className="text-[#F21313]">ROYALE</span>
          </h1>

          <div className="h-1 w-48 md:w-64 mx-auto bg-gradient-to-r from-transparent via-[#D98D30] to-transparent mb-8"></div>

          <p className="text-2xl md:text-4xl mb-6 tracking-wide text-[#F2DEA2]">WHERE FORTUNE MEETS FIRE</p>
          <p className="text-xl md:text-2xl mb-8 text-[#D98D30] font-arabic">بلعب الحظ مع الحمرا</p>
          <p className="text-base md:text-lg mb-10 md:mb-12 max-w-3xl mx-auto leading-relaxed text-gray-300 tracking-wide">
            STRATEGIC MANAGEMENT ANALYSIS • TUNISIA ENTERTAINMENT SECTOR
          </p>

          <button className="group relative bg-gradient-to-r from-[#BF3111] to-[#F21313] hover:from-[#F21313] hover:to-[#BF3111] px-12 py-4 md:px-16 md:py-5 border-2 border-[#D98D30] text-base md:text-lg font-bold tracking-[0.2em] transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F21313]/50 uppercase">
            <span className="relative z-10">Enter Casino</span>
            <div className="absolute inset-0 bg-[#F2DEA2] opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-[#D98D30]" />
        </div>
      </section>

      {/* Key Phrase Section */}
      <section className="py-24 bg-gradient-to-r from-[#590505] via-[#BF3111] to-[#590505] relative overflow-hidden border-y-4 border-[#D98D30]">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(242,222,162,0.3) 10px, rgba(242,222,162,0.3) 20px)'
        }}></div>
        {/* Roulette numbers background */}
        <div className="absolute inset-0 opacity-10 text-[#F2DEA2] text-9xl font-bold overflow-hidden">
          <div className="flex gap-12 animate-slide whitespace-nowrap">
            <span>0</span><span>32</span><span>15</span><span>19</span><span>4</span><span>21</span><span>2</span><span>25</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <p className="text-5xl md:text-6xl font-bold mb-8 text-[#F2DEA2] tracking-wider">الحمرا مش برّا، الحمرا هنا</p>
          <div className="h-1 w-48 mx-auto bg-[#F2DEA2] mb-8"></div>
          <p className="text-2xl uppercase tracking-widest text-white">The opportunity is not outside, the opportunity is here.</p>
        </div>
      </section>

      {/* Mission Briefing */}
      <section id="mission" className="py-32 bg-black relative scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-20 bg-gradient-to-b from-[#F21313] via-[#D98D30] to-[#F21313]"></div>
            <div>
              <span className="text-[#D98D30] text-sm tracking-[0.3em] uppercase">Section 01</span>
              <h2 className="text-5xl font-bold tracking-wide text-[#F2DEA2]">MISSION BRIEFING</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-6">
              <p className="text-xl leading-relaxed text-gray-300 tracking-wide">
                THIS STRATEGIC MANAGEMENT CASE STUDY EXAMINES THE HYPOTHETICAL MARKET ENTRY STRATEGY FOR <span className="text-[#F21313] font-bold">'7AMRA ROYALE'</span>, A CONCEPTUAL VENTURE INTO TUNISIA'S ENTERTAINMENT SECTOR.
              </p>
              <p className="text-xl leading-relaxed text-gray-300 tracking-wide">
                THIS ANALYSIS EXPLORES MARKET DYNAMICS, COMPETITIVE CHALLENGES, AND STRATEGIC POSITIONING IN A COMPLEX REGULATORY ENVIRONMENT.
              </p>
            </div>
            <div className="bg-[#590505]/30 border-2 border-[#D98D30] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#F21313]/10 blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-6 text-[#D98D30] tracking-widest uppercase">Framework</h3>
              <p className="text-lg leading-relaxed text-gray-300 tracking-wide">
                THE PROJECT EMPLOYS MILITARY-STYLE OPERATIONAL TERMINOLOGY TO FRAME STRATEGIC BUSINESS CONCEPTS, MAKING THIS AN ENGAGING FRAMEWORK FOR UNDERSTANDING MARKET RECONNAISSANCE, COMPETITIVE ANALYSIS, AND STRATEGIC PLANNING METHODOLOGIES.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Alpha */}
      <section className="py-32 bg-gradient-to-b from-black via-[#590505]/20 to-black relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-20 bg-gradient-to-b from-[#F21313] via-[#D98D30] to-[#F21313]"></div>
            <div>
              <span className="text-[#D98D30] text-sm tracking-[0.3em] uppercase">Section 10</span>
              <h2 className="text-5xl font-bold tracking-wide text-[#F2DEA2]">PHASE ALPHA: THE GENESIS</h2>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { icon: Target, title: "MARKET ANALYSIS", question: "WHAT DRIVES CONSUMER BEHAVIOR IN HIGHLY REGULATED ENTERTAINMENT MARKETS?" },
              { icon: TrendingUp, title: "COMPETITIVE POSITIONING", question: "HOW CAN A NEW ENTRANT DIFFERENTIATE AGAINST ESTABLISHED INTERNATIONAL COMPETITORS?" },
              { icon: Shield, title: "CULTURAL ADAPTATION", question: "WHAT ROLE DOES CULTURAL SENSITIVITY PLAY IN MARKET PENETRATION STRATEGY?" }
            ].map((item, idx) => (
              <div key={idx} className="group bg-[#590505]/20 border-2 border-[#D98D30]/40 p-8 hover:border-[#F21313] transition-all hover:shadow-xl hover:shadow-[#F21313]/30 transform hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-[#F21313]/5 blur-xl"></div>
                <item.icon className="w-12 h-12 text-[#D98D30] mb-4 relative z-10" />
                <h3 className="text-xl font-bold mb-4 text-[#F2DEA2] tracking-wider relative z-10">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed tracking-wide relative z-10">{item.question}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center p-12 bg-gradient-to-r from-[#590505]/40 via-[#BF3111]/40 to-[#590505]/40 border-t-4 border-b-4 border-[#D98D30] relative overflow-hidden">
            <div className="absolute inset-0 opacity-5" style={{
              backgroundImage: 'radial-gradient(circle, #F2DEA2 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
            <p className="text-4xl md:text-5xl font-bold mb-6 text-[#F2DEA2] tracking-wide relative z-10">
              "IT'S TIME TO WIN. TIME TO BUILD SOMETHING THAT CHANGES THE GAME ENTIRELY."
            </p>
            <div className="h-1 w-32 mx-auto bg-[#F21313] mb-6"></div>
            <p className="text-3xl text-[#D98D30] font-arabic relative z-10">حان وقت الفوز</p>
          </div>
        </div>
      </section>

      {/* Intelligence Report */}
      <section id="intelligence" className="py-32 bg-black relative overflow-hidden scroll-mt-24 md:scroll-mt-28">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F21313]/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[#D98D30]/5 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-20 bg-gradient-to-b from-[#F21313] via-[#D98D30] to-[#F21313]"></div>
            <div>
              <span className="text-[#D98D30] text-sm tracking-[0.3em] uppercase">Section 11</span>
              <h2 className="text-5xl font-bold tracking-wide text-[#F2DEA2]">INTELLIGENCE REPORT</h2>
              <p className="text-xl text-[#BF3111] mt-2 tracking-widest uppercase">Market Reconnaissance</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {[
              { label: "ANNUAL GROWTH RATE", value: "12%", desc: "YEAR-OVER-YEAR MARKET EXPANSION" },
              { label: "CAPITAL OUTFLOW", value: "$15M", desc: "ANNUAL SPENDING ON FOREIGN PLATFORMS" },
              { label: "YOUTH DEMOGRAPHICS", value: "42%", desc: "POPULATION AGED 18-35" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-[#590505]/30 border-l-4 border-[#D98D30] p-8 relative overflow-hidden group hover:bg-[#590505]/50 transition-all">
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-[#F21313]/10 blur-xl"></div>
                <p className="text-sm text-[#D98D30] mb-2 tracking-widest uppercase relative z-10">{stat.label}</p>
                <p className="text-7xl font-bold text-[#F21313] mb-4 relative z-10 text-shadow-red">{stat.value}</p>
                <p className="text-gray-300 tracking-wide uppercase text-sm relative z-10">{stat.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 space-y-8">
            {[
              { title: "UNMET DEMAND", content: "THE STEADY ANNUAL GROWTH RATE AND SIGNIFICANT CAPITAL OUTFLOW TO FOREIGN PLATFORMS CONFIRM A ROBUST, UNMET DOMESTIC DEMAND. CONSUMERS ACTIVELY SEEK ALTERNATIVES, INDICATING A RIPE OPPORTUNITY FOR LOCAL MARKET SOLUTIONS." },
              { title: "DIGITAL NATIVE AUDIENCE", content: "THE SUBSTANTIAL YOUTH DEMOGRAPHIC (42% IN THE 18-35 AGE BRACKET) REPRESENTS A DIGITALLY-NATIVE AUDIENCE RECEPTIVE TO MODERN, SOPHISTICATED ONLINE ENTERTAINMENT EXPERIENCES WITH MOBILE-FIRST DESIGN." },
              { title: "INNOVATION IMPERATIVE", content: "CURRENT MARKET CONDITIONS NECESSITATE AN APPROACH THAT IS BOTH INNOVATIVE AND COMPLIANT, OFFERING A SUPERIOR ALTERNATIVE TO EXISTING OFFSHORE OPTIONS WHILE RESPECTING LOCAL REGULATIONS AND CULTURAL NORMS." },
              { title: "MARKET GAP", content: "THE $15M ANNUAL CAPITAL OUTFLOW REPRESENTS REVENUE LEAKAGE TO INTERNATIONAL COMPETITORS, HIGHLIGHTING A SIGNIFICANT MARKET GAP THAT A WELL-POSITIONED LOCAL PLAYER COULD CAPTURE." }
            ].map((item, idx) => (
              <div key={idx} className="bg-black border-2 border-[#D98D30]/30 p-8 hover:border-[#F21313] transition-all relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#590505]/0 via-[#590505]/20 to-[#590505]/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-2xl font-bold mb-4 text-[#D98D30] tracking-widest relative z-10">{item.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed tracking-wide relative z-10">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assesing Threats */}
      <section className="py-32 bg-gradient-to-b from-black via-[#590505]/10 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-20 bg-gradient-to-b from-[#F21313] via-[#D98D30] to-[#F21313]"></div>
            <div>
              <span className="text-[#D98D30] text-sm tracking-[0.3em] uppercase">Section 12</span>
              <h2 className="text-5xl font-bold tracking-wide text-[#F2DEA2]">ASSEING THREATS</h2>
              <p className="text-xl text-[#BF3111] mt-2 tracking-widest uppercase">Hostile Territory: Market Challenges</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="space-y-6">
              {[
                { title: "Regulatory Uncertainty", desc: "The legal framework remains complex and ambiguous, requiring careful navigation, expert legal counsel, and adaptive strategic planning to ensure compliance." },
                { title: "Banking Hesitance", desc: "Financial institutions exhibit significant caution regarding payment processing, necessitating innovative fintech solutions and alternative payment methods for secure transactions." },
                { title: "Cultural Sensitivities", desc: "Respect for local traditions, values, and social norms is paramount, demanding a nuanced and culturally relevant approach to all aspects of business operations." },
                { title: "International Competition", desc: "Established offshore players with significant resources pose a formidable threat, requiring a highly differentiated and competitive market positioning strategy." }
              ].map((item, idx) => (
                <div key={idx} className="bg-black border-l-4 border-[#F21B2D] p-6 rounded hover:bg-[#A60321]/10 transition-all">
                  <h3 className="text-xl font-bold mb-3 text-[#F21B2D]">{item.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-[#F21B2D]/20 to-transparent border border-[#F21B2D]/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Strategic Responses</h3>
                <ul className="space-y-4">
                  {[
                    { icon: Shield, text: "Build Local Trust" },
                    { icon: Users, text: "Cultural Relevance" },
                    { icon: Award, text: "Community Investment" },
                    { icon: Globe, text: "Innovation Leadership" }
                  ].map((resp, idx) => (
                    <li key={idx} className="flex items-center gap-4 text-lg">
                      <resp.icon className="w-6 h-6 text-[#F21B2D]" />
                      <span>{resp.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section id="strategy" className="py-32 bg-black relative scroll-mt-24 md:scroll-mt-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-gradient-to-b from-[#F21B2D] to-[#A60321]"></div>
            <div>
              <span className="text-[#F21B2D] text-sm tracking-widest">SECTION 15</span>
              <h2 className="text-5xl font-bold">Operation Build</h2>
              <p className="text-xl text-gray-400 mt-2">Strategic Framework</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {[
              { phase: "Phase 1", title: "Foundation", items: ["Legal Compliance", "Technology Infrastructure", "Partnership Development"] },
              { phase: "Phase 2", title: "Launch", items: ["Soft Launch", "Brand Building", "Customer Acquisition"] },
              { phase: "Phase 3", title: "Growth", items: ["Market Expansion", "Feature Enhancement", "Community Building"] },
              { phase: "Phase 4", title: "Leadership", items: ["Market Dominance", "Strategic Partnerships", "Innovation Lab"] }
            ].map((phase, idx) => (
              <div key={idx} className="group bg-gradient-to-b from-[#A60321]/20 to-transparent border border-[#F21B2D]/30 p-6 rounded-lg hover:border-[#F21B2D] transition-all transform hover:scale-105">
                <div className="text-5xl font-bold text-[#F21B2D]/20 mb-2">{`0${idx + 1}`}</div>
                <p className="text-sm text-[#F21B2D] tracking-widest mb-2">{phase.phase}</p>
                <h3 className="text-2xl font-bold mb-6">{phase.title}</h3>
                <ul className="space-y-3">
                  {phase.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300">
                      <span className="text-[#F21B2D] mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-32 bg-gradient-to-b from-black via-[#0a0000] to-black relative overflow-hidden scroll-mt-24 md:scroll-mt-28">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(242, 27, 45, 0.3) 0%, transparent 50%)'
        }}></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-gradient-to-b from-[#F21B2D] to-[#A60321]"></div>
            <div>
              <span className="text-[#F21B2D] text-sm tracking-widest">SECTION 16</span>
              <h2 className="text-5xl font-bold">Mission Complete</h2>
              <p className="text-xl text-gray-400 mt-2">Phase Foxtrot: The Vision</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-16">
            <div className="space-y-8">
              <div className="bg-black border border-[#F21B2D]/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6 text-[#F21B2D]">Success Metrics</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-4xl font-bold text-[#F21B2D] mb-2">35%</p>
                    <p className="text-gray-300">Market Share Target (Within 3 years)</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#F21B2D] mb-2">4.5+</p>
                    <p className="text-gray-300">Customer Satisfaction Rating</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-[#F21B2D] mb-2">200+</p>
                    <p className="text-gray-300">Jobs Created Directly</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-[#F21B2D]/20 to-transparent border border-[#F21B2D]/30 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Vision Pillars</h3>
                <ul className="space-y-4">
                  {["Business Excellence", "Social Responsibility", "Regional Expansion", "Technology Leadership"].map((pillar, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-lg">
                      <div className="w-2 h-2 bg-[#F21B2D] rounded-full"></div>
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Academic Context */}
      <section className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-16 bg-gradient-to-b from-[#F21B2D] to-[#A60321]"></div>
            <div>
              <span className="text-[#F21B2D] text-sm tracking-widest">SECTION 20</span>
              <h2 className="text-5xl font-bold">Academic Learning Objectives</h2>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-[#A60321]/20 via-[#F21B2D]/20 to-[#A60321]/20 border border-[#F21B2D]/30 p-12 rounded-lg">
            <p className="text-2xl mb-8 leading-relaxed">
              This case study serves as a comprehensive example of strategic management principles in action.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Market analysis and competitive intelligence gathering",
                "Strategic positioning in complex regulatory environments",
                "Cultural adaptation and localization strategies",
                "Risk assessment and mitigation planning",
                "Multi-phase implementation roadmaps",
                "Measuring success across financial and non-financial metrics"
              ].map((obj, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <span className="text-[#F21B2D] text-2xl">✓</span>
                  <p className="text-lg text-gray-300">{obj}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-[#F21B2D]/30 text-center">
              <p className="text-sm tracking-widest text-[#F21B2D] mb-2">PROJECT TYPE</p>
              <p className="text-3xl font-bold">ACADEMIC PROJECT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-black to-[#0a0000] border-t border-[#F21B2D]/30 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#F21B2D] to-[#A60321] flex items-center justify-center transform rotate-45">
                  <span className="text-white font-bold transform -rotate-45">7R</span>
                </div>
                <span className="text-xl font-bold">7AMRA ROYALE</span>
              </div>
              <p className="text-gray-400">Strategic Management Analysis</p>
              <p className="text-gray-400">Tunisia's Entertainment Sector</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#F21B2D]">Location</h4>
              <p className="text-gray-400">Tunis, Tunisia</p>
              <p className="text-gray-400 mt-4">Entertainment Sector</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#F21B2D]">Framework</h4>
              <p className="text-gray-400">Military-style Operational Terminology</p>
              <p className="text-gray-400 mt-4">Date: 11/23</p>
            </div>
          </div>
          <div className="border-t border-[#F21B2D]/30 pt-8 text-center text-gray-400">
            <p>© 2023 7amra Royale. Academic Case Study. All rights reserved.</p>
            <p className="mt-2 text-sm">Hypothetical Market Entry Strategy for Educational Purposes</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
