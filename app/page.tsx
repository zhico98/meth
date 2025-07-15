"use client"

import { useState, useRef, useEffect } from "react"

export default function LetsCoookSite() {
  const [currentView, setCurrentView] = useState<"home" | "lab" | "video">("home")
  const videoRef = useRef<HTMLVideoElement>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [currentScene, setCurrentScene] = useState(0)

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState("")

  // Countdown effect
  useEffect(() => {
    const targetTime = new Date()
    targetTime.setHours(23, 0, 0, 0) // 11 PM today

    // If it's already past 11 PM today, set for tomorrow
    if (new Date() > targetTime) {
      targetTime.setDate(targetTime.getDate() + 1)
    }

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetTime.getTime() - now

      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")} UNTIL COOK TIME`,
        )
      } else {
        setTimeLeft("COOKING TIME! 🔥")
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  const scenes = [
    {
      image: "/images/lab-scene-1.png",
      title: "THE BEGINNING",
      description:
        "A desperate high school chemistry teacher diagnosed with cancer. One decision changes everything. The transformation from Mr. White to Heisenberg begins.",
      character: "Walter White",
      quote:
        "I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No... I am the one who knocks!",
    },
    {
      image: "/images/partnership-pepes.png",
      title: "THE PARTNERSHIP",
      description:
        "Two unlikely partners in orange hazmat suits. The desert becomes their laboratory. 99.1% pure blue crystal - the finest product ever created.",
      character: "Walter & Jesse",
      quote: "Yeah, science! Yeah, Mr. White! Yeah, science!",
    },
    {
      image: "/images/lab-scene-3.png",
      title: "LOVE IN CHAOS",
      description:
        "In a world of drugs and danger, Jesse finds something pure. Jane Margolis brings hope to his broken soul. Love blooms in the darkest places.",
      character: "Jesse & Jane",
      quote:
        "You didn't call. I waited all day. You can't just cut me out of your life and then waltz back in here and think that nothing's changed.",
    },
    {
      image: "/images/jane-death.png",
      title: "JANE'S END",
      description:
        "Heroin takes its toll. Jane chokes in her sleep while Walter watches. Some choices can never be undone. Jesse's world crumbles.",
      character: "The Price of Silence",
      quote: "I watched Jane die. I was there, and I watched her die. I watched her overdose and choke to death.",
    },
    {
      image: "/images/money-vault-pepes.png",
      title: "THE EMPIRE",
      description:
        "Walter and Skyler stand before mountains of cash in the storage unit. The weight of their empire becomes real. Skyler finally sees what her husband has built - and the price they've all paid for it.",
      character: "Walter & Skyler",
      quote:
        "How much is enough? How big does this pile have to be? I will not have my children living in a house where dealing drugs and hurting people is shrugged off.",
    },
    {
      image: "/images/jesse-learns-truth.png",
      title: "THE REVELATION",
      description:
        "Jesse discovers the devastating truth about Jane's death. The realization that Walter could have saved her but chose not to breaks something inside him forever. Trust shattered, innocence lost.",
      character: "Jesse's Heartbreak",
      quote:
        "You were there! You were there and you watched her die! You watched Jane die! She was choking and you just stood there!",
    },
    {
      image: "/images/walter-death.png",
      title: "THE END",
      description:
        "In the meth lab where it all began, Walter White takes his final breath. Surrounded by the equipment that defined his transformation, Heisenberg's empire crumbles. The teacher who became a kingpin finds peace in his last moments.",
      character: "Walter's Final Moment",
      quote: "I did it for me. I liked it. I was good at it. And I was really... I was alive.",
    },
  ]

  // Scene detection based on scroll
  useEffect(() => {
    if (currentView === "lab") {
      const handleScroll = () => {
        const newScrollY = window.scrollY
        setScrollY(newScrollY)

        // Calculate current scene based on scroll position
        const sceneHeight = window.innerHeight
        const newScene = Math.min(6, Math.floor(newScrollY / sceneHeight))
        setCurrentScene(newScene)
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [currentView])

  useEffect(() => {
    if (currentView === "video" && videoRef.current) {
      const video = videoRef.current
      const forcePlay = () => {
        video.play().catch(() => setTimeout(forcePlay, 100))
      }

      video.currentTime = 0
      video.playbackRate = 1
      video.loop = true
      video.muted = true
      video.autoplay = true
      video.preload = "auto"

      const events = ["pause", "ended", "waiting", "stalled", "suspend", "abort", "error"]
      events.forEach((event) => {
        video.addEventListener(event, forcePlay)
      })

      video.addEventListener("loadeddata", forcePlay)
      video.addEventListener("canplay", forcePlay)
      video.addEventListener("canplaythrough", forcePlay)

      const interval = setInterval(() => {
        if (video.paused || video.ended) {
          forcePlay()
        }
      }, 100)

      forcePlay()

      return () => {
        clearInterval(interval)
        events.forEach((event) => {
          video.removeEventListener(event, forcePlay)
        })
      }
    }
  }, [currentView])

  useEffect(() => {
    document.body.style.overflow = "unset"
  }, [])

  // Video View
  if (currentView === "video") {
    return (
      <div className="fixed inset-0 w-full h-full overflow-hidden" style={{ backgroundColor: "#2a1810" }}>
        <button
          onClick={() => setCurrentView("lab")}
          className="fixed top-6 right-6 z-20 px-4 py-2 text-sm font-bold transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "rgba(42, 24, 16, 0.8)",
            border: "2px solid #FF4444",
            color: "#FF4444",
            fontFamily: "PixelFont, monospace",
            textShadow: "0 0 5px #FF4444",
            boxShadow: "0 0 10px #FF4444",
            backdropFilter: "blur(5px)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FF4444"
            e.currentTarget.style.color = "#000000"
            e.currentTarget.style.textShadow = "none"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(42, 24, 16, 0.8)"
            e.currentTarget.style.color = "#FF4444"
            e.currentTarget.style.textShadow = "0 0 5px #FF4444"
          }}
        >
          ✕ EXIT
        </button>

        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          controls={false}
          style={{
            filter: "contrast(1.2) brightness(0.9) saturate(1.3) sepia(0.1)",
            pointerEvents: "none",
          }}
        >
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2025-07-13%2018-02-24%20%28online-video-cutter.com%29-BZgyxtKT83pmxHGFyE9isgnC51bvkP.mp4" type="video/mp4" />
        </video>

        {showWarning && (
          <div
            className="fixed inset-0 z-30 flex items-center justify-center"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="relative p-8 rounded-lg max-w-lg mx-4"
              style={{
                backgroundColor: "rgba(20, 10, 5, 0.95)",
                border: "3px solid #FF4444",
                boxShadow: "0 0 40px #FF4444, 0 0 80px rgba(255, 68, 68, 0.3), inset 0 0 20px rgba(255, 68, 68, 0.1)",
              }}
            >
              <div className="text-center">
                <div
                  className="text-3xl mb-6 tracking-wider"
                  style={{
                    color: "#FF4444",
                    fontFamily: "PixelFont, monospace",
                    textShadow: "0 0 15px #FF4444, 0 0 30px #FF4444",
                    letterSpacing: "3px",
                  }}
                >
                  ⚠ WARNING ⚠
                </div>
                <p
                  className="text-xl mb-8 tracking-wide"
                  style={{
                    color: "#FF8C00",
                    fontFamily: "PixelFont, monospace",
                    textShadow: "0 0 10px #FF8C00",
                    lineHeight: "1.6",
                    letterSpacing: "1px",
                  }}
                >
                  THE LAB ISN'T SAFE FOR LONG.
                </p>
                <div className="flex space-x-6 justify-center">
                  <button
                    onClick={() => setShowWarning(false)}
                    className="px-8 py-4 text-lg font-bold transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "rgba(20, 10, 5, 0.8)",
                      border: "2px solid #FF8C00",
                      color: "#FF8C00",
                      fontFamily: "PixelFont, monospace",
                      textShadow: "0 0 10px #FF8C00",
                      boxShadow: "0 0 15px #FF8C00",
                      letterSpacing: "2px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FF8C00"
                      e.currentTarget.style.color = "#000000"
                      e.currentTarget.style.textShadow = "none"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(20, 10, 5, 0.8)"
                      e.currentTarget.style.color = "#FF8C00"
                      e.currentTarget.style.textShadow = "0 0 10px #FF8C00"
                    }}
                  >
                    STAY
                  </button>
                  <button
                    onClick={() => setCurrentView("lab")}
                    className="px-8 py-4 text-lg font-bold transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "#FF4444",
                      border: "2px solid #8B0000",
                      color: "#000000",
                      fontFamily: "PixelFont, monospace",
                      boxShadow: "0 0 20px #FF4444, inset 0 0 10px rgba(0, 0, 0, 0.3)",
                      letterSpacing: "2px",
                    }}
                  >
                    EXIT
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Lab View - Scroll-driven Story
  if (currentView === "lab") {
    return (
      <div
        className="min-h-screen text-white"
        style={{
          background: `url('/images/leather-background.png'), linear-gradient(135deg, #2a1810 0%, #1a0f08 50%, #0f0804 100%)`,
          backgroundSize: "200px 200px, cover",
          backgroundRepeat: "repeat, no-repeat",
          backgroundAttachment: "fixed, fixed",
          fontFamily: "PixelFont, monospace",
        }}
      >
        {/* Fixed Header */}
        <div
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b"
          style={{
            backgroundColor: "rgba(42, 24, 16, 0.9)",
            borderColor: "#8B4513",
          }}
        >
          <div className="flex justify-between items-center p-4">
            <h1
              className="text-2xl font-bold"
              style={{
                color: "#D2691E",
                textShadow: "0 0 10px #8B4513, 2px 2px 0px #654321",
              }}
            >
              <span style={{ fontFamily: "Arial, sans-serif" }}>$</span>
              <span style={{ fontFamily: "PixelFont, monospace" }}>METH</span>
            </h1>

            <div className="flex space-x-3">
              <a
                href="https://x.com/methdotfun"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(42, 24, 16, 0.8)",
                  border: "2px solid #D2691E",
                  color: "#D2691E",
                  fontFamily: "PixelFont, monospace",
                  textShadow: "0 0 5px #8B4513",
                  boxShadow: "0 0 10px #8B4513",
                  textDecoration: "none",
                }}
              >
                𝕏
              </a>

              <a
                href="https://t.me/methdotfun"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(42, 24, 16, 0.8)",
                  border: "2px solid #D2691E",
                  color: "#D2691E",
                  fontFamily: "PixelFont, monospace",
                  textShadow: "0 0 5px #8B4513",
                  boxShadow: "0 0 10px #8B4513",
                  textDecoration: "none",
                }}
              >
                TG
              </a>

              <a
                href="https://pump.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-xs font-bold transition-all duration-200 hover:scale-105"
                style={{
                  backgroundColor: "rgba(42, 24, 16, 0.8)",
                  border: "2px solid #228B22",
                  color: "#32CD32",
                  fontFamily: "PixelFont, monospace",
                  textShadow: "0 0 5px #228B22",
                  boxShadow: "0 0 10px #228B22",
                  textDecoration: "none",
                }}
              >
                PUMP
              </a>

              <button
                onClick={() => {
                  setCurrentView("video")
                  setShowWarning(true)
                }}
                className="px-4 py-2 text-sm font-bold transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                style={{
                  backgroundColor: "rgba(0, 20, 0, 0.8)",
                  border: "2px solid #00FF41",
                  color: "#00FF41",
                  fontFamily: "PixelFont, monospace",
                  textShadow: "0 0 8px #00FF41, 0 0 15px #00FF41",
                  boxShadow: "0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1)",
                  animation: "flicker 2s infinite alternate",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 40, 0, 0.9)"
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(0, 255, 65, 0.6), inset 0 0 15px rgba(0, 255, 65, 0.2)"
                  e.currentTarget.innerHTML = "Accessing Lab..."
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(0, 20, 0, 0.8)"
                  e.currentTarget.style.boxShadow =
                    "0 0 15px rgba(0, 255, 65, 0.3), inset 0 0 10px rgba(0, 255, 65, 0.1)"
                  e.currentTarget.innerHTML = "🧪 LAB"
                }}
              >
                🧪 LAB
              </button>
            </div>
          </div>
        </div>

        {/* Scene Progress Indicators */}
        <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col space-y-3">
          {scenes.map((_, index) => (
            <div
              key={index}
              className="w-3 h-3 rounded-full border-2 transition-all duration-300"
              style={{
                backgroundColor: currentScene === index ? "#D2691E" : "transparent",
                borderColor: currentScene === index ? "#D2691E" : "#8B4513",
                boxShadow: currentScene === index ? "0 0 10px #D2691E" : "none",
                transform: currentScene === index ? "scale(1.3)" : "scale(1)",
              }}
            />
          ))}
        </div>

        {/* Scroll-driven Story Sections */}
        <div className="pt-20">
          {/* Scene 1 - THE BEGINNING */}
          <section className="min-h-screen flex items-center px-8 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className="order-2 lg:order-1"
                style={{
                  transform: `translateX(${Math.max(0, scrollY * 0.3 - 100)}px)`,
                  opacity: Math.min(1, Math.max(0, 1 - scrollY * 0.001)),
                }}
              >
                <div
                  className="text-6xl font-bold mb-6"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#D2691E",
                    textShadow: "0 0 20px #8B4513, 4px 4px 0px #654321",
                    lineHeight: "1.1",
                  }}
                >
                  {scenes[0].title}
                </div>
                <p
                  className="text-xl mb-6 leading-relaxed"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#F4A460",
                    textShadow: "2px 2px 0px #8B4513",
                  }}
                >
                  {scenes[0].description}
                </p>
                <div
                  className="text-lg italic mb-4 p-4 border-l-4 rounded"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#CD853F",
                    borderColor: "#D2691E",
                    backgroundColor: "rgba(42, 24, 16, 0.1)",
                    backdropFilter: "blur(3px)",
                  }}
                >
                  "{scenes[0].quote}"
                </div>
                <div
                  className="text-sm"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#8B4513",
                    opacity: 0.7,
                  }}
                >
                  — {scenes[0].character}
                </div>
              </div>
              <div
                className="order-1 lg:order-2"
                style={{
                  transform: `translateX(${Math.min(0, -scrollY * 0.2 + 50)}px) rotate(${scrollY * 0.02}deg)`,
                }}
              >
                <img
                  src={scenes[0].image || "/placeholder.svg"}
                  alt={scenes[0].title}
                  className="w-full max-w-lg object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                  style={{
                    filter: "contrast(1.1) brightness(1.0) saturate(1.2)",
                    borderColor: "#8B4513",
                    boxShadow: "0 0 30px rgba(139, 69, 19, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </div>
            </div>
          </section>

          {/* Scene 2 - THE PARTNERSHIP */}
          <section className="min-h-screen flex items-center px-8 py-16 relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div
                  className="lg:col-span-1"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px) scale(${1 + Math.sin(scrollY * 0.005) * 0.05})`,
                  }}
                >
                  <img
                    src={scenes[1].image || "/placeholder.svg"}
                    alt={scenes[1].title}
                    className="w-full max-w-md object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      filter: "contrast(1.0) brightness(1.1) saturate(1.0)",
                      borderColor: "#8B4513",
                      boxShadow: "0 0 30px rgba(139, 69, 19, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2)",
                      imageRendering: "auto",
                    }}
                  />
                </div>
                <div
                  className="lg:col-span-2 text-right"
                  style={{
                    transform: `translateX(${Math.cos(scrollY * 0.008) * 30}px)`,
                  }}
                >
                  <div
                    className="text-5xl font-bold mb-6"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#D2691E",
                      textShadow: "0 0 20px #8B4513, 3px 3px 0px #654321",
                      transform: "skew(-2deg)",
                    }}
                  >
                    {scenes[1].title}
                  </div>
                  <p
                    className="text-lg mb-6 leading-relaxed"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#F4A460",
                      textShadow: "1px 1px 0px #8B4513",
                    }}
                  >
                    {scenes[1].description}
                  </p>
                  <div
                    className="text-xl italic mb-4 p-4 border-l-4 rounded"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD853F",
                      borderColor: "#D2691E",
                      backgroundColor: "rgba(42, 24, 16, 0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    "{scenes[1].quote}"
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B4513",
                      opacity: 0.7,
                    }}
                  >
                    — {scenes[1].character}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scene 3 - LOVE IN CHAOS */}
          <section className="min-h-screen flex items-center px-8 py-16 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div
                  className="text-7xl font-bold mb-8"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#FF69B4",
                    textShadow: "0 0 30px #FF1493, 5px 5px 0px #8B008B",
                    transform: `rotate(${Math.sin(scrollY * 0.01) * 2}deg)`,
                  }}
                >
                  {scenes[2].title}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.008) * 15}px)`,
                  }}
                >
                  <p
                    className="text-xl mb-8 leading-relaxed"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#FFB6C1",
                      textShadow: "2px 2px 0px #8B008B",
                    }}
                  >
                    {scenes[2].description}
                  </p>
                  <div
                    className="text-lg italic mb-6 p-4 border-l-4 rounded"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD853F",
                      borderColor: "#D2691E",
                      backgroundColor: "rgba(42, 24, 16, 0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    "{scenes[2].quote}"
                  </div>
                  <div
                    className="text-lg"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B4513",
                      opacity: 0.7,
                    }}
                  >
                    — {scenes[2].character}
                  </div>
                </div>
                <div
                  style={{
                    transform: `translateX(${Math.cos(scrollY * 0.006) * 20}px) scale(${1 + Math.sin(scrollY * 0.004) * 0.05})`,
                  }}
                >
                  <img
                    src={scenes[2].image || "/placeholder.svg"}
                    alt={scenes[2].title}
                    className="w-full max-w-lg object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      filter: "contrast(1.1) brightness(1.0) saturate(1.2)",
                      borderColor: "#8B4513",
                      boxShadow: "0 0 30px rgba(139, 69, 19, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Scene 4 - JANE'S END */}
          <section className="min-h-screen flex items-center px-8 py-16 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                <div
                  className="lg:col-span-3"
                  style={{
                    transform: `translateX(${Math.sin(scrollY * 0.005) * -30}px)`,
                  }}
                >
                  <div
                    className="text-6xl font-bold mb-8"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#4A0000",
                      textShadow: "0 0 15px #8B0000, 3px 3px 0px #000000",
                      transform: "skew(-5deg)",
                    }}
                  >
                    {scenes[3].title}
                  </div>
                  <p
                    className="text-lg mb-6 leading-relaxed"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD5C5C",
                      textShadow: "1px 1px 0px #000000",
                    }}
                  >
                    {scenes[3].description}
                  </p>
                  <div
                    className="text-lg italic mb-4 p-4 border-l-4 rounded"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD853F",
                      borderColor: "#D2691E",
                      backgroundColor: "rgba(42, 24, 16, 0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    "{scenes[3].quote}"
                  </div>
                  <div
                    className="text-sm"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B4513",
                      opacity: 0.7,
                    }}
                  >
                    — {scenes[3].character}
                  </div>
                </div>
                <div
                  className="lg:col-span-2"
                  style={{
                    transform: `translateY(${Math.cos(scrollY * 0.007) * 25}px) rotate(${scrollY * 0.01}deg)`,
                  }}
                >
                  <img
                    src={scenes[3].image || "/placeholder.svg"}
                    alt={scenes[3].title}
                    className="w-full max-w-md object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      filter: "contrast(1.0) brightness(0.9) saturate(1.0)",
                      borderColor: "#8B4513",
                      boxShadow: "0 0 30px rgba(139, 69, 19, 0.5), inset 0 0 20px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Scene 5 - THE EMPIRE */}
          <section className="min-h-screen flex items-center px-8 py-16 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div
                  className="text-7xl font-bold mb-8"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#FFD700",
                    textShadow: "0 0 30px #FFA500, 5px 5px 0px #B8860B",
                    transform: `rotate(${Math.sin(scrollY * 0.008) * 1}deg)`,
                  }}
                >
                  {scenes[4].title}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                  style={{
                    transform: `translateX(${Math.cos(scrollY * 0.006) * 25}px) scale(${1 + Math.sin(scrollY * 0.004) * 0.03})`,
                  }}
                >
                  <img
                    src={scenes[4].image || "/placeholder.svg"}
                    alt={scenes[4].title}
                    className="w-full max-w-lg object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      filter: "contrast(1.1) brightness(1.1) saturate(1.3)",
                      borderColor: "#FFD700",
                      boxShadow: "0 0 40px rgba(255, 215, 0, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.2)",
                    }}
                  />
                </div>
                <div
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.007) * 20}px)`,
                  }}
                >
                  <p
                    className="text-xl mb-8 leading-relaxed"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#F0E68C",
                      textShadow: "2px 2px 0px #B8860B",
                    }}
                  >
                    {scenes[4].description}
                  </p>
                  <div
                    className="text-lg italic mb-6 p-4 border-l-4 rounded"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD853F",
                      borderColor: "#D2691E",
                      backgroundColor: "rgba(42, 24, 16, 0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    "{scenes[4].quote}"
                  </div>
                  <div
                    className="text-lg"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B4513",
                      opacity: 0.7,
                    }}
                  >
                    — {scenes[4].character}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Scene 6 - THE REVELATION */}
          <section className="min-h-screen flex items-center px-8 py-16 relative">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.009) * 25}px)`,
                  }}
                >
                  <div
                    className="text-6xl font-bold mb-8"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B0000",
                      textShadow: "0 0 20px #FF0000, 4px 4px 0px #000000",
                      transform: "skew(-3deg)",
                    }}
                  >
                    {scenes[5].title}
                  </div>
                  <p
                    className="text-xl mb-8 leading-relaxed"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#FF6B6B",
                      textShadow: "2px 2px 0px #8B0000",
                    }}
                  >
                    {scenes[5].description}
                  </p>
                  <div
                    className="text-lg italic mb-6 p-4 border-l-4 rounded"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD853F",
                      borderColor: "#D2691E",
                      backgroundColor: "rgba(42, 24, 16, 0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    "{scenes[5].quote}"
                  </div>
                  <div
                    className="text-lg"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B4513",
                      opacity: 0.7,
                    }}
                  >
                    — {scenes[5].character}
                  </div>
                </div>
                <div
                  style={{
                    transform: `translateX(${Math.cos(scrollY * 0.007) * 30}px) scale(${1 + Math.sin(scrollY * 0.005) * 0.04})`,
                  }}
                >
                  <img
                    src={scenes[5].image || "/placeholder.svg"}
                    alt={scenes[5].title}
                    className="w-full max-w-lg object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      filter: "contrast(1.2) brightness(0.9) saturate(1.1)",
                      borderColor: "#8B0000",
                      boxShadow: "0 0 40px rgba(139, 0, 0, 0.7), inset 0 0 20px rgba(0, 0, 0, 0.3)",
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Scene 7 - THE END */}
          <section className="min-h-screen flex items-center px-8 py-16 relative">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <div
                  className="text-8xl font-bold mb-8"
                  style={{
                    fontFamily: "PixelFont, monospace",
                    color: "#2F2F2F",
                    textShadow: "0 0 20px #000000, 4px 4px 0px #1a1a1a",
                    transform: `rotate(${Math.sin(scrollY * 0.005) * 1}deg)`,
                  }}
                >
                  {scenes[6].title}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div
                  style={{
                    transform: `translateX(${Math.cos(scrollY * 0.004) * 20}px) scale(${1 + Math.sin(scrollY * 0.003) * 0.02})`,
                  }}
                >
                  <img
                    src={scenes[6].image || "/placeholder.svg"}
                    alt={scenes[6].title}
                    className="w-full max-w-lg object-cover border-4 rounded-lg shadow-2xl transition-all duration-300 hover:scale-105"
                    style={{
                      filter: "contrast(0.9) brightness(0.8) saturate(0.8) sepia(0.2)",
                      borderColor: "#2F2F2F",
                      boxShadow: "0 0 30px rgba(47, 47, 47, 0.8), inset 0 0 20px rgba(0, 0, 0, 0.5)",
                    }}
                  />
                </div>
                <div
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.006) * 15}px)`,
                  }}
                >
                  <p
                    className="text-xl mb-8 leading-relaxed"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#A0A0A0",
                      textShadow: "2px 2px 0px #2F2F2F",
                    }}
                  >
                    {scenes[6].description}
                  </p>
                  <div
                    className="text-lg italic mb-6 p-4 border-l-4 rounded"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#CD853F",
                      borderColor: "#D2691E",
                      backgroundColor: "rgba(42, 24, 16, 0.1)",
                      backdropFilter: "blur(3px)",
                    }}
                  >
                    "{scenes[6].quote}"
                  </div>
                  <div
                    className="text-lg"
                    style={{
                      fontFamily: "PixelFont, monospace",
                      color: "#8B4513",
                      opacity: 0.7,
                    }}
                  >
                    — {scenes[6].character}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Final section - Call to action */}
          <section className="min-h-screen flex items-center justify-center px-8 py-16">
            <div className="text-center">
              <div
                className="text-8xl font-bold mb-8"
                style={{
                  fontFamily: "PixelFont, monospace",
                  color: "#D2691E",
                  textShadow: "0 0 40px #8B4513, 6px 6px 0px #654321",
                  transform: `scale(${1 + Math.sin(scrollY * 0.003) * 0.1})`,
                }}
              >
                SAY MY NAME
              </div>
              <p
                className="text-2xl mb-8"
                style={{
                  fontFamily: "PixelFont, monospace",
                  color: "#CD853F",
                  textShadow: "2px 2px 0px #8B4513",
                  opacity: 0.9,
                }}
              >
                You're Heisenberg. You're goddamn right.
              </p>

              {/* Countdown Timer */}
              <div
                className="text-2xl mb-6 font-bold"
                style={{
                  color: "#FF4500",
                  fontFamily: "PixelFont, monospace",
                  textShadow: "0 0 15px #FF4500",
                  animation: "flicker 1s infinite alternate",
                }}
              >
                {timeLeft || "CALCULATING..."}
              </div>

              <button
                onClick={() => window.open("https://x.com/methdotfun", "_blank")}
                className="px-8 py-4 text-xl font-bold tracking-wider transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "transparent",
                  border: "3px solid #FF6B35",
                  color: "#FF6B35",
                  fontFamily: "PixelFont, monospace",
                  textShadow: "0 0 15px #FF4500, 2px 2px 0px #8B0000",
                  boxShadow: "0 0 25px #FF4500, inset 0 0 15px rgba(255, 107, 53, 0.1)",
                  animation: "pulse 2s infinite",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#FF6B35"
                  e.currentTarget.style.color = "#000000"
                  e.currentTarget.style.boxShadow = "0 0 40px #FF6B35, 0 0 60px #FF4500"
                  e.currentTarget.style.textShadow = "none"
                  e.currentTarget.innerHTML = "🔥 COOKING... 🔥"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent"
                  e.currentTarget.style.color = "#FF6B35"
                  e.currentTarget.style.boxShadow = "0 0 25px #FF4500, inset 0 0 15px rgba(255, 107, 53, 0.1)"
                  e.currentTarget.style.textShadow = "0 0 15px #FF4500, 2px 2px 0px #8B0000"
                  e.currentTarget.innerHTML = "🚀 COOK NOW 🚀"
                }}
              >
                🚀 COOK NOW 🚀
              </button>
              <p
                className="text-sm mt-4 tracking-wide"
                style={{
                  color: "#CD853F",
                  opacity: 0.8,
                  fontFamily: "PixelFont, monospace",
                  textShadow: "1px 1px 0px #8B4513",
                }}
              >
                Takes you to launch tweet 🔥
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }

  // Home View
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      style={{
        background: `url('/images/leather-background.png'), linear-gradient(135deg, #2a1810 0%, #1a0f08 50%, #0f0804 100%)`,
        backgroundSize: "200px 200px, cover",
        backgroundRepeat: "repeat, no-repeat",
        backgroundAttachment: "fixed, fixed",
      }}
    >
      <div className="text-center space-y-6">
        <button
          onClick={() => setCurrentView("lab")}
          className="px-8 py-4 text-lg md:text-xl font-bold tracking-wider transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: "transparent",
            border: "2px solid #D2691E",
            color: "#D2691E",
            fontFamily: "PixelFont, monospace",
            textShadow: "0 0 10px #8B4513, 2px 2px 0px #654321",
            boxShadow: "0 0 15px #8B4513, inset 0 0 10px rgba(139, 69, 19, 0.1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#D2691E"
            e.currentTarget.style.color = "#000000"
            e.currentTarget.style.boxShadow = "0 0 25px #D2691E, 0 0 35px #8B4513"
            e.currentTarget.style.textShadow = "none"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent"
            e.currentTarget.style.color = "#D2691E"
            e.currentTarget.style.boxShadow = "0 0 15px #8B4513, inset 0 0 10px rgba(139, 69, 19, 0.1)"
            e.currentTarget.style.textShadow = "0 0 10px #8B4513, 2px 2px 0px #654321"
          }}
        >
          LETS COOK
        </button>

        <p
          className="text-sm tracking-wide"
          style={{
            color: "#CD853F",
            opacity: 0.8,
            fontFamily: "PixelFont, monospace",
            textShadow: "1px 1px 0px #8B4513",
          }}
        >
          › Say my name ‹
        </p>
      </div>
    </div>
  )
}
