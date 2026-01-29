import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ssecampus from "../../assets/ssecampus.png";
import girlsentrance from "../../assets/girlsentrance.jpg";
import girlsSSE from "../../assets/girlsSSE.jpg";
import MainBadge from "../../assets/Main_badge 3.png";
import Badge from "../../assets/Badge.png";
import Baba from "../../assets/Baba.png";
import infrastructure from "../../assets/infra.png";
import rite from "../../assets/rite.png";
import group from "../../assets/group.png";
import girls from "../../assets/girls.png";
import girlsCorridor1 from "../../assets/girlsCorridor1.jpg";
import campusGreenary from "../../assets/campusGreenary.jpg";
import classroomStylish3 from "../../assets/classroomStylish3.jpg";
import computerLabFocused from "../../assets/computerLabFocused.jpg";
import traditionalDance from "../../assets/traditionalDance.jpg";
import culturalRampWalk from "../../assets/culturalRampWalk.jpg";
import girlInLibrary from "../../assets/girlInLibrary.jpg";
import girlsTrio from "../../assets/girlsTrio.jpg";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import slider4 from "../../assets/slider4.jpg";
import MainSSE from "../../assets/mainSSE.jpeg";
import advisoryBoard from "../../assets/advisoryBoard.png";
import desktop1 from "../../assets/desktop1.jpeg";
import desktop2 from "../../assets/desktop2.jpeg";
import desktop3 from "../../assets/desktop3.jpeg";
import desktop4 from "../../assets/desktop4.jpeg";
import desktop5 from "../../assets/desktop5.jpeg";
import paul from "../../assets/ssefaculty/cse/paul.jpg";
import alexander from "../../assets/ssefaculty/cse/alexander.png";
import raimund from "../../assets/ssefaculty/cse/raimund.jpg";
import ennostubler from "../../assets/ssefaculty/cse/ennostubler.jpg";
import konradzalar from "../../assets/ssefaculty/cse/Konradjalar.jpg";
import johannes from "../../assets/ssefaculty/cse/johannes.jpg";

/**
 * Enhanced professional main carousel component with automatic rotation, vibrant imagery,
 * and React Router navigation
 */
const MainCarousel = ({ slides = [] }) => {
  // Initialize navigate hook for programmatic navigation
  const navigate = useNavigate();
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Default slides if none provided
  const defaultSlides = [
    {
      id: 3,
      image: ssecampus,
      title: "We're <span class='text-secondary'>Autonomous</span>|You're Unstoppable",
      subtitle: "",
      description:
        "NAAC 'A' Grade | AICTE Approved | Flexible Curriculum",
      buttonText: "Explore Programs",
      buttonLink: "/programmes/all",
    },
    {
      id: 4,
      image: infrastructure,
      title: "We Brought <span class='text-secondary'>Europe</span> to <span class='text-secondary'>India</span>|For <span class='text-secondary'>You</span>",
      subtitle: "",
      description:
        "First Campus Software Company | Vienna Experts | Real-World Training",
      buttonText: "Discover RISE Program",
      buttonLink: "/RIT",
    },
    {
      id: 1,
      image: rite,
      title: "Learn From <span class='text-secondary'>European</span>|Software Experts. <span class='text-secondary'>Every Day</span>",
      subtitle: "",
      isFaculty: true,
      facultyTitle: "Meet our Faculty and Mentors for <span class='text-secondary'>RIT program.</span>",
      description:
        "4-Year RIT Program | Vienna Mentors | Real Projects | Java to GitHub",
      buttonText: "Explore RIT Program",
      buttonLink: "/RIT",
    },
    {
      id: 2,
      image: group,
      title: "<span class='text-secondary'>600+</span> Offers|<span class='text-secondary'>80+</span> Corporate Partners|<span class='text-secondary'>95%</span> Placement Rate",
      description: "Curriculum Designed by Industry Leaders from CGI, HCL, TCS, Capgemini & More",
      buttonText: "View Placements",
      buttonLink: "/placement/placement",
    },
    {
      id: 5,
      image: girls,
      title: "Don't Let <span class='text-secondary'>Money</span> Stop Your|Engineering <span class='text-secondary'>Dream</span>",
      description: "Sai Prudent Scholarship | Full/Partial Tuition Assistance |<br/> 2,800+ Students Supported",
      buttonText: "Apply Free Today",
      buttonLink: "/academics/scholarship",
    }
  ];

  // State to track if we're on desktop
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Filter slides
  const baseSlides = slides.length > 0 ? slides : defaultSlides;
  const displaySlides = isDesktop ? baseSlides : baseSlides.filter(slide => !slide.desktopOnly);

  // Image Preloading Effect
  useEffect(() => {
    // Preload the main carousel images
    const imagesToPreload = baseSlides.map(s => s.image);
    // Also preload faculty images if they exist
    const facultyImages = [paul, konradzalar, raimund, ennostubler, alexander, johannes];

    [...imagesToPreload, ...facultyImages].forEach(imageSrc => {
      if (imageSrc) {
        const img = new Image();
        img.src = imageSrc;
      }
    });

    // Special priority for the first slide image to help LCP
    if (baseSlides[0]?.image) {
      const priorityImg = new Image();
      priorityImg.src = baseSlides[0].image;
      if ('fetchPriority' in priorityImg) {
        priorityImg.fetchPriority = "high";
      }
    }
  }, [baseSlides]);

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const handleNavigate = (path, event) => {
    if (!path) return;
    event.preventDefault();
    navigate(path);
  };

  return (
    <section className="main-carousel-section position-relative">
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        interval={isPaused ? null : 6000}
        indicators={false}
        controls={true}
        fade={true}
        pause={false}
        className="main-hero-carousel"
        prevIcon={<span className="custom-carousel-prev"><i className="fas fa-chevron-left"></i></span>}
        nextIcon={<span className="custom-carousel-next"><i className="fas fa-chevron-right"></i></span>}
      >
        {displaySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} className="carousel-item-fullheight">
            <div
              className="slide-background"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#111", // Prevent white flash
              }}
            >
              {/* Invisible high-priority image for the first slide to trigger browser early fetch */}
              {activeIndex === 0 && index === 0 && (
                <img
                  src={slide.image}
                  alt=""
                  style={{ display: 'none' }}
                  fetchpriority="high"
                />
              )}
            </div>

            <div className="slide-overlay"></div>

            {isDesktop && slide.id === 3 && (
              <>
                <div className="baba-icon-wrapper reveal-down">
                  <img src={Baba} alt="Baba" className="baba-icon" />
                </div>
                <div className="badges-wrapper-absolute reveal-left animate__delay-1s">
                  <img src={Badge} alt="NAAC A Grade" className="hero-badge naac-badge" />
                  <img src={MainBadge} alt="Autonomous Institution" className="hero-badge autonomous-badge" />
                </div>
              </>
            )}

            {(slide.title || slide.subtitle || slide.description) && (
              <Carousel.Caption className="text-start slide-content">
                <div className="container position-relative">
                  <div className="row align-items-center">
                    <div className={slide.id === 3 ? "col-lg-7" : "col-lg-10"}>
                      <div className="hero-text-container">
                        <h5 className="slide-subtitle reveal-up">
                          {slide.subtitle}
                        </h5>
                        <h1
                          className="slide-title reveal-up animate__delay-1s"
                          dangerouslySetInnerHTML={{ __html: slide.title.replace(/\|/g, '<br/>') }}
                        >
                        </h1>
                        <p
                          className="slide-description reveal-up animate__delay-2s"
                          dangerouslySetInnerHTML={{ __html: slide.description }}
                        >
                        </p>
                        {slide.buttonText && (
                          <div className="reveal-up animate__delay-3s">
                            <button
                              onClick={(e) => handleNavigate(slide.buttonLink, e)}
                              className="hero-cta-btn"
                            >
                              {slide.buttonText}
                              <i className="fas fa-arrow-right ms-2 transition-transform"></i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {slide.isFaculty && (
                    <div className="row justify-content-center">
                      <div className="col-12 text-center">
                        <h4
                          className="faculty-section-title reveal-up animate__delay-2s"
                          dangerouslySetInnerHTML={{ __html: slide.facultyTitle }}
                        >
                        </h4>
                        <div className="faculty-hexagon-container justify-content-center reveal-up animate__delay-2s">
                          {[paul, konradzalar, raimund, ennostubler, alexander, johannes].map((img, idx) => (
                            <div key={idx} className="faculty-hexagon">
                              <div
                                className="faculty-hexagon-inner"
                                style={{ backgroundImage: `url(${img})` }}
                              ></div>
                            </div>
                          ))}

                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Carousel.Caption>
            )}
          </Carousel.Item>
        ))}
      </Carousel >

      {/* Footer background bar for controls */}
      < div className="carousel-footer-bar" ></div >

      {/* Custom Indicators Bar matching the design theme */}
      < div className="carousel-custom-controls-wrapper" >
        <div className="carousel-custom-indicators-pill">
          <button
            className="carousel-pause-play-btn"
            onClick={togglePause}
            aria-label={isPaused ? "Play" : "Pause"}
          >
            <i className={`fas ${isPaused ? 'fa-play' : 'fa-pause'}`}></i>
          </button>

          <div className={`carousel-dots-container ${isPaused ? 'paused' : ''}`}>
            {displaySlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleSelect(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div >
    </section >
  );
};

export default MainCarousel;