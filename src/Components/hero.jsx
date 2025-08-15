import React, { useState, useEffect, useRef } from 'react';
import { DollarSign, TrendingUp, PieChart, Shield, ArrowRight, Play, Star } from 'lucide-react';

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  const stats = [
    { number: '50K+', label: 'Happy Users', icon: Star },
    { number: '2M+', label: 'Transactions', icon: DollarSign },
    { number: '99%', label: 'Accuracy', icon: TrendingUp },
    { number: '24/7', label: 'Support', icon: Shield }
  ];

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const Card3D = ({ children, delay = 0, className = '' }) => (
    <div
      style={{
        ...styles.card3d,
        animationDelay: `${delay}s`,
        transform: `perspective(1000px) rotateX(${mousePosition.y * 10 - 5}deg) rotateY(${mousePosition.x * 10 - 5}deg)`
      }}
      className={className}
    >
      {children}
    </div>
  );

  return (
    <>
      <section ref={heroRef} style={styles.hero}>
        {/* Animated Background */}
        <div style={styles.backgroundContainer}>
          {/* Floating Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                ...styles.particle,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Gradient Orbs */}
          <div style={{...styles.gradientOrb, ...styles.orb1}} />
          <div style={{...styles.gradientOrb, ...styles.orb2}} />
          <div style={{...styles.gradientOrb, ...styles.orb3}} />
        </div>

        <div style={styles.container}>
          <div style={styles.heroContent}>
            {/* Left Content */}
            <div style={styles.leftContent}>
              {/* Badge */}
              <div 
                style={{
                  ...styles.badge,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)'
                }}
              >
                <Star size={16} />
                <span>🎉 #1 Expense Tracking App</span>
              </div>

              {/* Main Heading */}
              <h1 
                style={{
                  ...styles.mainHeading,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(30px)'
                }}
              >
                Track Your 
                <span style={styles.gradientText}>
                  <span style={styles.animatedWord}>Expenses</span>
                </span>
                <br />
                Like Never Before
              </h1>

              {/* Subtitle */}
              <p 
                style={{
                  ...styles.subtitle,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                Transform your financial life with AI-powered insights, real-time tracking, 
                and beautiful visualizations. Join thousands of users who've taken control 
                of their money.
              </p>

              {/* CTA Buttons */}
              <div 
                style={{
                  ...styles.ctaContainer,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(20px)'
                }}
              >
                <button style={styles.primaryBtn}>
                  <span>Start Free Trial</span>
                  <ArrowRight size={20} style={styles.arrowIcon} />
                </button>
                
                <button style={styles.secondaryBtn}>
                  <div style={styles.playIcon}>
                    <Play size={16} />
                  </div>
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Stats Counter */}
              <div ref={statsRef} style={styles.statsContainer}>
                <div style={styles.currentStat}>
                  <div style={styles.statIcon}>
                    {React.createElement(stats[currentStat].icon, { size: 24 })}
                  </div>
                  <div>
                    <div style={styles.statNumber}>{stats[currentStat].number}</div>
                    <div style={styles.statLabel}>{stats[currentStat].label}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Dashboard */}
            <div style={styles.rightContent}>
              <div style={styles.dashboardContainer}>
                {/* Main Dashboard Card */}
                <Card3D delay={0.2}>
                  <div style={styles.dashboardMain}>
                    <div style={styles.dashboardHeader}>
                      <h3 style={styles.dashboardTitle}>Monthly Overview</h3>
                      <div style={styles.trendIndicator}>
                        <TrendingUp size={16} />
                        <span>+12.5%</span>
                      </div>
                    </div>
                    
                    <div style={styles.chartArea}>
                      {/* Animated Chart Bars */}
                      {[40, 70, 35, 80, 60, 90, 45].map((height, i) => (
                        <div
                          key={i}
                          style={{
                            ...styles.chartBar,
                            height: `${height}%`,
                            animationDelay: `${0.5 + i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                    
                    <div style={styles.dashboardStats}>
                      <div style={styles.statItem}>
                        <span style={styles.amount}>$4,250</span>
                        <span style={styles.period}>This Month</span>
                      </div>
                      <div style={styles.statItem}>
                        <span style={styles.amount}>$3,750</span>
                        <span style={styles.period}>Last Month</span>
                      </div>
                    </div>
                  </div>
                </Card3D>

                {/* Floating Cards */}
                <Card3D delay={0.4} className="floating-card-1">
                  <div style={styles.floatingCard}>
                    <div style={styles.cardIcon}>
                      <DollarSign size={20} />
                    </div>
                    <div>
                      <div style={styles.cardAmount}>$1,250</div>
                      <div style={styles.cardLabel}>Today's Spending</div>
                    </div>
                  </div>
                </Card3D>

                <Card3D delay={0.6} className="floating-card-2">
                  <div style={styles.floatingCard}>
                    <div style={{...styles.cardIcon, backgroundColor: '#10b981'}}>
                      <PieChart size={20} />
                    </div>
                    <div>
                      <div style={styles.cardAmount}>85%</div>
                      <div style={styles.cardLabel}>Budget Used</div>
                    </div>
                  </div>
                </Card3D>

                <Card3D delay={0.8} className="floating-card-3">
                  <div style={styles.floatingCard}>
                    <div style={{...styles.cardIcon, backgroundColor: '#f59e0b'}}>
                      <TrendingUp size={20} />
                    </div>
                    <div>
                      <div style={styles.cardAmount}>+15%</div>
                      <div style={styles.cardLabel}>Savings Goal</div>
                    </div>
                  </div>
                </Card3D>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(-1deg); }
          75% { transform: translateY(-15px) rotate(0.5deg); }
        }

        @keyframes particle {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-10vh) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes orb1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        @keyframes orb2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-40px, -20px) scale(1.2); }
        }

        @keyframes orb3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          25% { transform: translate(20px, 30px) scale(0.8); }
          75% { transform: translate(-30px, -40px) scale(1.1); }
        }

        @keyframes chartBarGrow {
          from { height: 0%; }
          to { height: var(--target-height); }
        }

        @keyframes wordSlide {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }

        @keyframes arrowMove {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(5px); }
        }

        .floating-card-1 {
          animation: float 4s ease-in-out infinite;
        }

        .floating-card-2 {
          animation: float 5s ease-in-out infinite;
          animation-delay: 1s;
        }

        .floating-card-3 {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        @media (max-width: 768px) {
          .floating-card-1,
          .floating-card-2,
          .floating-card-3 {
            position: relative !important;
            margin: 10px 0 !important;
          }
        }
      `}</style>
    </>
  );
};

const styles = {
  hero: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: '2rem 0'
  },

  backgroundContainer: {
    position: 'absolute',
    inset: 0,
    overflow: 'hidden'
  },

  particle: {
    position: 'absolute',
    width: '4px',
    height: '4px',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: '50%',
    animation: 'particle linear infinite'
  },

  gradientOrb: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(40px)',
    opacity: 0.3
  },

  orb1: {
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, #ff6b6b, #feca57)',
    top: '10%',
    left: '10%',
    animation: 'orb1 8s ease-in-out infinite'
  },

  orb2: {
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, #48cae4, #023047)',
    top: '60%',
    right: '10%',
    animation: 'orb2 10s ease-in-out infinite'
  },

  orb3: {
    width: '150px',
    height: '150px',
    background: 'radial-gradient(circle, #a8e6cf, #7fcdcd)',
    bottom: '20%',
    left: '60%',
    animation: 'orb3 12s ease-in-out infinite'
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    position: 'relative',
    zIndex: 10
  },

  heroContent: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '4rem',
    alignItems: 'center',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '2rem',
      textAlign: 'center'
    }
  },

  leftContent: {
    color: 'white'
  },

  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '0.75rem 1.5rem',
    borderRadius: '50px',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.6s ease',
    animation: 'pulse 3s ease-in-out infinite'
  },

  mainHeading: {
    fontSize: '4rem',
    fontWeight: '800',
    lineHeight: '1.1',
    marginBottom: '1.5rem',
    transition: 'all 0.8s ease',
    '@media (max-width: 768px)': {
      fontSize: '2.5rem'
    }
  },

  gradientText: {
    background: 'linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: 'gradientMove 3s ease infinite',
    display: 'inline-block'
  },

  animatedWord: {
    display: 'inline-block',
    animation: 'wordSlide 2s ease-in-out infinite'
  },

  subtitle: {
    fontSize: '1.25rem',
    lineHeight: '1.7',
    marginBottom: '3rem',
    opacity: '0.9',
    transition: 'all 1s ease',
    maxWidth: '500px',
    '@media (max-width: 768px)': {
      fontSize: '1.1rem',
      maxWidth: '100%'
    }
  },

  ctaContainer: {
    display: 'flex',
    gap: '1rem',
    marginBottom: '3rem',
    transition: 'all 1.2s ease',
    '@media (max-width: 768px)': {
      flexDirection: 'column',
      alignItems: 'center'
    }
  },

  primaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 15px 40px rgba(255, 107, 107, 0.4)'
    }
  },

  arrowIcon: {
    transition: 'transform 0.3s ease',
    animation: 'arrowMove 2s ease-in-out infinite'
  },

  secondaryBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    padding: '1rem 2rem',
    borderRadius: '50px',
    fontSize: '1.1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },

  playIcon: {
    width: '40px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  statsContainer: {
    transition: 'all 1.4s ease'
  },

  currentStat: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    padding: '1rem 1.5rem',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxWidth: '250px'
  },

  statIcon: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(45deg, #ffd700, #ff6b6b)',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },

  statNumber: {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: 'white'
  },

  statLabel: {
    fontSize: '0.9rem',
    opacity: '0.8',
    color: 'white'
  },

  rightContent: {
    position: 'relative',
    height: '500px',
    '@media (max-width: 768px)': {
      height: 'auto',
      marginTop: '2rem'
    }
  },

  dashboardContainer: {
    position: 'relative',
    width: '100%',
    height: '100%'
  },

  card3d: {
    transition: 'all 0.3s ease',
    animation: 'fadeInUp 0.6s ease forwards',
    opacity: 0
  },

  dashboardMain: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '2rem',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    height: '350px'
  },

  dashboardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },

  dashboardTitle: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2d3748',
    margin: 0
  },

  trendIndicator: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#10b981',
    fontSize: '0.9rem',
    fontWeight: '600'
  },

  chartArea: {
    display: 'flex',
    alignItems: 'end',
    gap: '8px',
    height: '150px',
    marginBottom: '2rem'
  },

  chartBar: {
    flex: 1,
    background: 'linear-gradient(to top, #667eea, #764ba2)',
    borderRadius: '4px',
    minHeight: '20px',
    animation: 'chartBarGrow 1s ease forwards'
  },

  dashboardStats: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  statItem: {
    textAlign: 'center'
  },

  amount: {
    display: 'block',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748'
  },

  period: {
    fontSize: '0.8rem',
    color: '#718096',
    marginTop: '0.25rem'
  },

  floatingCard: {
    position: 'absolute',
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(15px)',
    borderRadius: '15px',
    padding: '1rem',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    minWidth: '180px'
  },

  cardIcon: {
    width: '40px',
    height: '40px',
    background: '#667eea',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },

  cardAmount: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#2d3748'
  },

  cardLabel: {
    fontSize: '0.8rem',
    color: '#718096'
  }
};

// Position floating cards
if (typeof window !== 'undefined' && window.innerWidth > 768) {
  styles['.floating-card-1'] = {
    ...styles.floatingCard,
    top: '50px',
    right: '-20px'
  };

  styles['.floating-card-2'] = {
    ...styles.floatingCard,
    top: '200px',
    left: '-30px'
  };

  styles['.floating-card-3'] = {
    ...styles.floatingCard,
    bottom: '50px',
    right: '20px'
  };
}

export default HeroSection;