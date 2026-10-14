import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, Check, ChevronLeft, ChevronRight, FastForward, Headphones, Heart, HeartPulse, Image as ImageIcon, Leaf, Menu, MessageCircle, Moon, Pause, Play, Quote, RotateCcw, Rewind, Send, ShieldCheck, Star, Sun, Users, Volume2, VolumeX, X } from 'lucide-react'
import { getPortfolioContent, sendContactMessage } from './services/api.js'
import SprinkleBackground from './SprinkleBackground.jsx'

const surahReflection = 'Surah Ad-Duha reminds us to never lose hope during difficult times. It teaches us that Allah has not abandoned us, even when life feels heavy. We should trust Allah, be grateful for His blessings, and show kindness to others.'

const fallback = {
  profile: {
    name: '[Your name]',
    photo_url: '/photo.jpg.jpg',
    professional_title: 'Bachelor of Science in Nursing Graduate',
    education: 'Bachelor of Science in Nursing',
    nursing_school: '[Nursing school or university]',
    graduation_year: '[Graduation year]',
    nickname: '[Nickname]',
    age: '[Age]',
    hometown: '[Hometown]',
    birthday: '[Birthday]',
    bio: '[Write a short biography about your nursing education, interests, and personal story.]',
    interests: ['[Add a personal hobby]'],
    nursing_interests: ['[Add a nursing interest]'],
    nursing_journey: '[Share experiences and lessons from your nursing education. Do not include confidential patient information.]',
    nursing_philosophy: '[Write your personal nursing philosophy before publishing; this prompt is not a statement of your beliefs.]',
    personal_values: [
      { title: 'Compassion', description: '[Describe what compassion means to you.]' },
      { title: 'Empathy', description: '[Describe how you want to practice empathy.]' },
      { title: 'Patient-centered care', description: '[Add your own patient-centered care principle.]' },
      { title: 'Responsibility', description: '[Describe what responsibility means to you.]' },
      { title: 'Professionalism', description: '[Add a personal professionalism principle.]' },
      { title: 'Lifelong learning', description: '[Describe how you hope to keep learning.]' },
    ],
    skills: [
      { title: 'Nursing knowledge and clinical learning', description: '[Add verified coursework or educational learning.]', label: 'Educational learning placeholder' },
      { title: 'Communication and teamwork', description: '[Describe learning you can accurately verify.]', label: 'Editable learning placeholder' },
      { title: 'Patient safety awareness', description: '[Add safety-related education you have completed.]', label: 'Educational learning placeholder' },
      { title: 'Health education', description: '[Describe relevant coursework or learning.]', label: 'Editable learning placeholder' },
      { title: 'Documentation and organization', description: '[Add verified educational experience only.]', label: 'Educational learning placeholder' },
      { title: 'Continuing professional development', description: '[Add a learning goal or verified development activity.]', label: 'Editable learning placeholder' },
    ],
    goals: '[Add your career goals or personal aspirations]',
  },
  songs: [
    { title: 'A song that feels like home', artist: 'Add your favorite artist', category: 'Favorite Songs', description: 'Write a line about the memory or feeling this song holds.', url: 'https://open.spotify.com/' },
    { title: 'A softer kind of day', artist: 'Add your favorite artist', category: 'Chill', description: 'A gentle place to begin your own listening list.', url: 'https://www.youtube.com/' },
    { title: 'Words for the heart', artist: 'Add an artist or nasheed', category: 'Islamic Nasheeds', description: 'Replace this note with why this nasheed matters to you.', url: 'https://www.youtube.com/' },
  ],
  destinations: [
    { name: 'A city on your list', country: 'Add a country', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1100&q=85', description: 'Add a place you hope to experience one day.', reason: 'What draws you there?', landmarks: ['A place to explore', 'A view to remember'], url: 'https://www.google.com/maps' },
    { name: 'Somewhere by the sea', country: 'Add a country', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=900&q=85', description: 'Keep a note of the kind of journey you imagine.', reason: 'Why it belongs on your list.', landmarks: ['A quiet coastline'], url: 'https://www.google.com/maps' },
    { name: 'A landscape to wander', country: 'Add a country', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85', description: 'A little space for a future adventure.', reason: 'What you would love to discover.', landmarks: ['A favorite trail'], url: 'https://www.google.com/maps' },
  ],
  surahs: [{ name_arabic: 'الضحى', transliteration: 'Ad-Duha', meaning: 'The Morning Brightness', number: 93, verses: 11, reflection: surahReflection, url: 'https://quran.com/ad-duhaa' }],
  gallery: [
    { image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1000&q=85', alt: 'Morning light across a quiet landscape', caption: 'A moment to keep' },
    { image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85', alt: 'Sunlight over a mountain valley', caption: 'Somewhere peaceful' },
    { image: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1000&q=85', alt: 'A cabin beside a still lake', caption: 'A slower kind of day' },
    { image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1000&q=85', alt: 'A winding path through a green valley', caption: 'A place to return to' },
  ],
  quotes: [
    { text: 'Let your life be shaped by what you choose to give your attention to.', author: '' },
    { text: 'Small acts, done with care, can make an ordinary day meaningful.', author: '' },
    { text: 'Make room for the things that bring you closer to who you want to be.', author: '' },
  ],
}

const categories = ['All', 'Favorite Songs', 'Chill', 'Emotional', 'Islamic Nasheeds']
const navLinks = [['Home', '#home'], ['About Me', '#about'], ['Nursing Philosophy', '#philosophy'], ['My Interests', '#interests'], ['Favorite Music', '#favorites'], ['Dream Destinations', '#places'], ['Favorite Surah', '#surah'], ['Gallery', '#gallery'], ['Contact', '#contact']]
const valueIcons = [Heart, MessageCircle, Users, ShieldCheck, BadgeCheck, BookOpen]
const personalityValues = [
  { title: 'Kindness & Compassion', icon: Heart, description: "I believe that even small acts of kindness can make a meaningful difference in someone's life." },
  { title: 'Respect & Understanding', icon: Users, description: 'I value treating others with respect, listening to different perspectives, and understanding people without judging them too quickly.' },
  { title: 'Faith & Spirituality', icon: Moon, description: 'My faith reminds me to stay grounded, seek inner peace, and remember what truly matters in life.' },
  { title: 'Growth & Self-Improvement', icon: BookOpen, description: 'I believe that every experience offers an opportunity to learn, grow, and become a better version of myself.' },
  { title: 'Honesty & Trust', icon: ShieldCheck, description: 'I believe that honesty, sincerity, and keeping my word are important foundations of meaningful relationships.' },
  { title: 'Dreams & Ambition', icon: Star, description: 'I have dreams I want to achieve, places I want to explore, and goals that motivate me to keep moving forward.' },
]
const imageMotion = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.55 } }
const surahAudioSource = encodeURI('/Surah Duha سورة الضحى Ridjaal Ahmed رجال احمد Beautiful Recitation of the Quran.mp3')

function SurahAudioPlayer() {
  const audioRef = useRef(null)
  const triggerRef = useRef(null)
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
      audio.muted = isMuted
    }
  }, [isMuted, volume])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousFocus = document.activeElement
    closeRef.current?.focus()
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        closePlayer()
      } else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not(:disabled), input:not(:disabled)')
        if (!focusable?.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [isOpen])

  function closePlayer() {
    audioRef.current?.pause()
    setIsOpen(false)
  }

  async function startPlayback() {
    const audio = audioRef.current
    if (!audio) return

    setError('')
    setIsLoading(audio.readyState < 3)

    try {
      await audio.play()
    } catch {
      setIsPlaying(false)
      setIsLoading(false)
      setError('Audio could not be played. Please check the file and try again.')
    }
  }

  async function togglePlayback() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) await startPlayback()
    else audio.pause()
  }

  function openPlayer() {
    setError('')
    setIsOpen(true)
    void startPlayback()
  }

  function seekTo(value) {
    const audio = audioRef.current
    if (!audio || !Number.isFinite(audio.duration)) return
    const nextTime = Math.min(Math.max(Number(value), 0), audio.duration)
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
  }

  function skipBy(seconds) {
    if (audioRef.current) seekTo(audioRef.current.currentTime + seconds)
  }

  function restartPlayback() {
    if (!audioRef.current) return
    seekTo(0)
    setError('')
    void startPlayback()
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${minutes}:${remainingSeconds}`
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={surahAudioSource}
        preload="metadata"
        onLoadStart={() => setIsLoading(true)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onCanPlay={() => setIsLoading(false)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => { setIsPlaying(true); setIsLoading(false); setError('') }}
        onPause={() => setIsPlaying(false)}
        onEnded={() => { setIsPlaying(false); setCurrentTime(audioRef.current?.duration || 0) }}
        onError={() => { setIsPlaying(false); setIsLoading(false); setError('Audio could not be loaded or played. Please check the audio file and try again.') }}
      />
      <button
        ref={triggerRef}
        className="button button-dark"
        type="button"
        aria-label="Play Surah Ad-Duha"
        onClick={openPlayer}
      >
        <Play size={15} aria-hidden="true" />
        Play Surah Ad-Duha
      </button>
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="surah-player-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closePlayer()
              }}
            >
              <motion.section
                ref={dialogRef}
                className="surah-player-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby="surah-player-title"
                initial={{ opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                transition={{ duration: 0.22 }}
              >
                <button ref={closeRef} className="surah-player-close icon-button" type="button" aria-label="Close audio player" onClick={closePlayer}>
                  <X size={19} />
                </button>
                <div className="surah-player-emblem" aria-hidden="true"><Headphones size={24} /></div>
                <p className="surah-player-kicker">A moment of reflection</p>
                <h2 id="surah-player-title">Surah Ad-Duha</h2>
                <p className="surah-player-arabic" lang="ar" dir="rtl">سورة الضحى</p>
                <p className="surah-player-subtitle">Surah 93 · The Morning Brightness</p>

                <div className="surah-player-progress">
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    step="0.1"
                    value={Math.min(currentTime, duration || 0)}
                    aria-label="Seek through Surah Ad-Duha"
                    disabled={!duration}
                    style={{ '--progress': `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    onChange={(event) => seekTo(event.target.value)}
                  />
                  <div className="surah-player-times"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
                </div>

                <div className="surah-player-controls">
                  <button className="surah-player-icon-button" type="button" aria-label="Go back 10 seconds" onClick={() => skipBy(-10)}><Rewind size={20} /><span>10</span></button>
                  <button className="surah-player-main-button" type="button" aria-label={isPlaying ? 'Pause Surah Ad-Duha' : 'Play Surah Ad-Duha'} onClick={togglePlayback} disabled={isLoading && !isPlaying}>
                    {isLoading ? <span className="surah-player-spinner" aria-hidden="true" /> : isPlaying ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" />}
                  </button>
                  <button className="surah-player-icon-button" type="button" aria-label="Skip forward 10 seconds" onClick={() => skipBy(10)}><FastForward size={20} /><span>10</span></button>
                  <button className="surah-player-icon-button" type="button" aria-label="Restart Surah Ad-Duha" onClick={restartPlayback}><RotateCcw size={19} /></button>
                </div>

                <div className="surah-player-volume">
                  <button className="surah-player-icon-button" type="button" aria-label={isMuted || volume === 0 ? 'Unmute audio' : 'Mute audio'} onClick={() => {
                    if (isMuted || volume === 0) {
                      setIsMuted(false)
                      if (volume === 0) setVolume(0.5)
                    } else {
                      setIsMuted(true)
                    }
                  }}>
                    {isMuted || volume === 0 ? <VolumeX size={19} /> : <Volume2 size={19} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    aria-label="Volume"
                    style={{ '--progress': `${volume * 100}%` }}
                    onChange={(event) => { setVolume(Number(event.target.value)); setIsMuted(false) }}
                  />
                </div>
                {isLoading && <p className="surah-player-status" role="status">Loading recitation…</p>}
                {error && <p className="surah-player-error" role="alert">{error}</p>}
                {!isLoading && !error && !isPlaying && duration > 0 && currentTime >= duration && <p className="surah-player-status" role="status">Recitation complete. Restart to listen again.</p>}
              </motion.section>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}

function ProfilePhoto({ className, isGif, onToggle, originalSrc }) {
  return (
    <button
      className={`profile-photo-toggle ${className}`}
      type="button"
      aria-label={isGif ? 'Show original profile picture' : 'Show animated profile picture'}
      aria-pressed={isGif}
      onClick={onToggle}
    >
      <img className={isGif ? 'profile-photo-image' : 'profile-photo-image is-visible'} src={originalSrc} alt="" aria-hidden="true" />
      <img className={isGif ? 'profile-photo-image is-visible' : 'profile-photo-image'} src="/photo.gif" alt="" aria-hidden="true" />
    </button>
  )
}

function PageMotion() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  return null
}

export default function App() {
  const [content, setContent] = useState(fallback)
  const [apiState, setApiState] = useState('loading')
  const [category, setCategory] = useState('All')
  const [dark, setDark] = useState(() => localStorage.getItem('portfolio-theme') !== 'light')
  const [isProfileGif, setIsProfileGif] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [formState, setFormState] = useState('idle')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    let active = true
    getPortfolioContent().then((data) => {
      if (!active) return
      setContent((current) => Object.fromEntries(Object.keys(current).map((key) => [key, data[key] || current[key]])))
      setApiState(Object.keys(data).length ? 'connected' : 'offline')
    }).catch(() => active && setApiState('offline'))
    return () => { active = false }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
    localStorage.setItem('portfolio-theme', dark ? 'dark' : 'light')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#1b1523' : '#fcf9fd')
  }, [dark])

  const filteredSongs = content.songs.filter((song) => category === 'All' || song.category === category)
  const profile = content.profile
  const closeMenu = () => setMenuOpen(false)

  async function handleSubmit(event) {
    event.preventDefault()
    const formElement = event.currentTarget
    const form = new FormData(formElement)
    setFormState('sending')
    setFormError('')
    try {
      await sendContactMessage(Object.fromEntries(form.entries()))
      setFormState('sent')
      formElement.reset()
    } catch (error) {
      const errors = error.response?.data?.errors
      setFormError(errors ? Object.values(errors).flat().join(' ') : 'Message could not be sent. Please try again when the API is available.')
      setFormState('error')
    }
  }

  return (
    <>
      <SprinkleBackground />
      <div className="site-shell">
      <PageMotion />
      <header className="site-header">
        <Link className="wordmark" to="/" onClick={closeMenu}><span className="wordmark-mark"><Leaf size={17} /></span> little by little</Link>
        <button className="icon-button mobile-menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {navLinks.map(([label, href]) => <a href={href} key={label} onClick={closeMenu}>{label}</a>)}
        </nav>
        <button className="icon-button theme-toggle" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setDark(!dark)}>{dark ? <Sun size={18} /> : <Moon size={18} />}</button>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> Nursing graduate · Personal portfolio</p>
            <h1>{profile.name}</h1>
            <p className="hero-degree">{profile.professional_title || 'Bachelor of Science in Nursing Graduate'}</p>
            <p className="hero-intro">{profile.bio}</p>
            <div className="hero-actions"><a className="button button-dark" href="#about">Get to know me <ArrowRight size={16} /></a><a className="text-link" href="#interests">Explore my interests <ArrowDown size={15} /></a></div>
            <div className="hero-note"><span className="note-rule" /> A personal portfolio; no license or practice status is implied.</div>
          </div>
          <div className="hero-art" aria-label="Professional portrait placeholder">
            <ProfilePhoto
              className="hero-photo"
              isGif={isProfileGif}
              onToggle={() => setIsProfileGif((current) => !current)}
              originalSrc={profile.photo_url || fallback.profile.photo_url}
            />
            <div className="hero-photo-label"><span>personal profile</span><span>BSN</span></div>
            <div className="hero-stamp"><span>BSN</span><HeartPulse size={20} /><span>GRADUATE</span></div>
          </div>
          <a className="scroll-cue" href="#about"><span>Scroll to wander</span><ArrowDown size={15} /></a>
        </section>

        <section className="about section-wrap section-space" id="about">
          <div className="section-heading"><p className="eyebrow">01 / about me</p><h2>My nursing journey,<br /><em>still unfolding.</em></h2></div>
          <div className="about-grid">
            <div className="about-image-wrap">
              <ProfilePhoto
                className="about-profile-photo"
                isGif={isProfileGif}
                onToggle={() => setIsProfileGif((current) => !current)}
                originalSrc={profile.photo_url || fallback.profile.photo_url}
              />
              <span className="image-caption">Personal portrait</span>
            </div>
            <div className="about-copy">
              <p className="large-copy">{profile.professional_title || 'Bachelor of Science in Nursing Graduate'}</p>
              <p className="body-copy">{profile.bio}</p>
              <div className="detail-grid">{[['Full name', profile.name], ['Academic title', profile.professional_title], ['Degree', profile.education], ['School', profile.nursing_school], ['Graduation year', profile.graduation_year], ['Hometown', profile.hometown], ['Nickname', profile.nickname], ['Birthday', profile.birthday]].map(([label, value]) => <div className="detail-item" key={label}><span>{label}</span><strong>{value || '[Add details]'}</strong></div>)}</div>
              <div className="nursing-journey"><span className="detail-label">My nursing journey</span><p>{profile.nursing_journey}</p></div>
              <p className="goal-note"><span className="tiny-star">✳</span> Career goals <strong>{profile.goals}</strong></p>
            </div>
          </div>
        </section>

        <section className="philosophy-section section-space" id="philosophy">
          <div className="section-wrap">
            <div className="section-topline"><p className="eyebrow">02 / my nursing philosophy</p><span className="editable-indicator"><i /> Editable personal prompts</span></div>
            <div className="philosophy-layout">
              <div className="philosophy-statement"><div className="statement-icon"><HeartPulse size={22} /></div><p className="detail-label">Personal statement placeholder</p><blockquote>{profile.nursing_philosophy}</blockquote><p className="statement-note">This prompt is not a statement of your beliefs. Replace it with words that are genuinely yours.</p></div>
              <div className="values-content"><h2>Values I want to<br /><em>keep learning from.</em></h2><p className="section-aside">Use these prompts to describe what each value means to you.</p></div>
            </div>
            <div className="values-grid">{(profile.personal_values || []).map((value, index) => { const Icon = valueIcons[index % valueIcons.length]; return <motion.article className="value-card" key={value.title} {...imageMotion} transition={{ duration: 0.45, delay: index * 0.05 }}><span className="value-icon"><Icon size={19} /></span><h3>{value.title}</h3><p>{value.description}</p></motion.article> })}</div>
          </div>
        </section>

        <section className="personality-section section-space" id="interests">
          <div className="section-wrap">
            <div className="section-heading personality-heading">
              <p className="eyebrow">PERSONALITY &amp; VALUES</p>
              <h2>My Personality &amp; Values</h2>
              <p className="personality-subtitle">The values I believe in, the qualities that shape who I am, and the things that matter most to me.</p>
            </div>
            <div className="personality-grid">
              {personalityValues.map(({ title, icon: Icon, description }, index) => <motion.article className="personality-card" key={title} {...imageMotion} transition={{ duration: 0.45, delay: index * 0.05 }}>
                <span className="personality-icon"><Icon size={20} strokeWidth={1.8} /></span>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.article>)}
            </div>
          </div>
        </section>

        <section className="favorites section-space" id="favorites">
          <div className="section-wrap">
            <div className="section-topline"><p className="eyebrow">02 / sounds that stay</p><a className="text-link" href="https://open.spotify.com/" target="_blank" rel="noreferrer">Open a playlist <ArrowUpRight size={15} /></a></div>
            <div className="section-heading inline-heading"><h2>On repeat,<br /><em>for a reason.</em></h2><p className="section-aside">Songs hold memories in a way little else can. Here’s a shelf for the ones you come back to.</p></div>
            <div className="filter-row" role="group" aria-label="Filter songs">{categories.map((item) => <button className={category === item ? 'filter-chip active' : 'filter-chip'} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
            <div className="song-grid">
              {filteredSongs.length ? filteredSongs.map((song, index) => <motion.article className="song-card" key={song.id || song.title} {...imageMotion} transition={{ duration: 0.45, delay: index * 0.08 }}>
                <div className={`album-art album-art-${index % 3}`} style={{ backgroundImage: `linear-gradient(0deg, #20382966, transparent 72%), url("${song.cover_image || 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=85'}")` }} role="img" aria-label={`Placeholder cover for ${song.title}`}><span>{String(index + 1).padStart(2, '0')}</span><Headphones size={24} /></div>
                <div className="song-meta"><span className="song-category">{song.category || 'A favorite'}</span><a className="play-link" href={song.url || 'https://www.youtube.com/'} target="_blank" rel="noreferrer" aria-label={`Open ${song.title} on a music platform`}><Play size={14} fill="currentColor" /></a></div>
                <h3>{song.title}</h3><p className="song-artist">{song.artist}</p><p className="song-description">{song.description}</p>
              </motion.article>) : <p className="empty-state">No songs in this category yet. Add one to your collection.</p>}
            </div>
            <div className="music-quote"><Quote size={20} /><p>Some songs don’t just play. They remember for us.</p><span>— a note to self</span></div>
          </div>
        </section>

        <section className="places section-wrap section-space" id="places"><div className="section-topline"><p className="eyebrow">03 / the someday list</p><span className="wishlist-count">{content.destinations.length} places, one day <span>↗</span></span></div><div className="section-heading inline-heading"><h2>Places I carry<br /><em>in my daydreams.</em></h2><p className="section-aside">Not an itinerary. Just little windows into places you hope to meet someday.</p></div><div className="destination-grid">{content.destinations.map((place, index) => <motion.article className={`destination-card destination-${index % 3}`} key={place.id || place.name} {...imageMotion} transition={{ duration: 0.5, delay: index * 0.1 }}><div className="destination-image"><img src={place.image || place.image_url} alt={`${place.name}, ${place.country}`} loading="lazy" /><span className="wish-badge">{index === 0 ? '✳ First on my list' : 'On my someday list'}</span><span className="destination-number">0{index + 1}</span></div><div className="destination-copy"><p className="destination-country">{place.country}</p><h3>{place.name}</h3><p>{place.description}</p><div className="destination-reason"><span>Why it calls</span><p>{place.reason}</p></div><div className="landmark-list">{(place.landmarks || []).map((landmark) => <span key={landmark}>{landmark}</span>)}</div><a className="text-link" href={place.url || 'https://www.google.com/maps'} target="_blank" rel="noreferrer">Explore the map <ArrowUpRight size={14} /></a></div></motion.article>)}</div></section>

        <section className="surah-section section-space" id="surah">
          <div className="surah-pattern" />
          <div className="section-wrap surah-inner">
            <p className="eyebrow">04 / a moment of reflection</p>
            <div className="surah-content">
              {content.surahs.map((surah) => (
                <article className="surah-card" key={surah.id || surah.number}>
                  <div className="surah-mark"><span>۞</span></div>
                  <p className="surah-label">A Surah close to my heart</p>
                  <h2 dir="rtl" lang="ar" className="arabic-title">{surah.name_arabic || 'اسم السورة'}</h2>
                  <p className="surah-translit">{surah.transliteration || '[Transliteration]'} <span>·</span> {surah.meaning || '[Meaning]'}</p>
                  <div className="surah-stats"><span>Surah {surah.number || '[No.]'}</span><i /><span>{surah.verses || '[Verses]'} verses</span><i /><span>Meccan</span></div>
                  <h3 className="surah-reflection-heading">Own Reflection</h3>
                  <p className="surah-reflection">{surahReflection}</p>
                  <div className="surah-actions">
                    <SurahAudioPlayer />
                    <a className="button button-light" href={surah.url || 'https://quran.com/ad-duhaa'} target="_blank" rel="noreferrer">Read or listen <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              ))}
              <div className="surah-aside">
                <p className="eyebrow">A space for what grounds me</p>
                <h3>Words to return to,<br /><em>whenever I need them.</em></h3>
                <p>A Surah that reminds me to remain hopeful, trust Allah's wisdom, and stay grateful through every season of life. May its message bring peace to the heart and remind us that Allah's mercy is always near.</p>
                <a href="https://quran.com/ad-duhaa" target="_blank" rel="noreferrer" className="surah-source">Trusted reading resource <ArrowUpRight size={14} /></a>
              </div>
            </div>
          </div>
        </section>

        <section className="gallery section-wrap section-space" id="gallery"><div className="section-topline"><p className="eyebrow">06 / collected moments</p><span className="gallery-caption"><ImageIcon size={14} /> A little visual diary</span></div><div className="section-heading inline-heading"><h2>Things I want<br /><em>to remember.</em></h2><p className="section-aside">A gallery for graduation, school memories, personal photographs, travel, and other meaningful moments.</p></div><div className="gallery-grid">{content.gallery.map((photo, index) => <button className={`gallery-tile gallery-tile-${index % 4}`} key={photo.id || photo.image} onClick={() => setSelectedImage(index)} aria-label={`View photo: ${photo.caption}`}><img src={photo.image || photo.image_url} alt={photo.alt || photo.caption || 'Personal gallery placeholder'} loading="lazy" /><span className="gallery-tile-caption">{photo.caption || 'A moment to keep'} <ArrowUpRight size={14} /></span></button>)}</div><p className="placeholder-note">Replace the sample images with your own. Never upload identifiable patient photos or confidential healthcare information.</p></section>

        <section className="quotes-section section-space" id="quotes"><div className="section-wrap quote-layout"><div><p className="eyebrow">06 / words to keep close</p><h2>Little reminders<br /><em>for the long way.</em></h2></div><div className="quote-display"><Quote className="quote-icon" size={24} /><AnimatePresence mode="wait"><motion.div key={quoteIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}><blockquote>{content.quotes[quoteIndex]?.text}</blockquote><p className="quote-author">{content.quotes[quoteIndex]?.author || 'A personal reminder'}</p></motion.div></AnimatePresence><div className="quote-controls"><button className="icon-button" aria-label="Previous quote" onClick={() => setQuoteIndex((quoteIndex - 1 + content.quotes.length) % content.quotes.length)}><ChevronLeft size={18} /></button><span>{String(quoteIndex + 1).padStart(2, '0')} <i /> {String(content.quotes.length).padStart(2, '0')}</span><button className="icon-button" aria-label="Next quote" onClick={() => setQuoteIndex((quoteIndex + 1) % content.quotes.length)}><ChevronRight size={18} /></button></div></div></div></section>

        <section className="contact section-wrap section-space" id="contact">
          <div className="contact-intro">
            <p className="eyebrow">07 / leave a little note</p><h2>Good things begin<br /><em>with hello.</em></h2><p>For a kind thought, a shared recommendation, or just to say hello.</p>
            <a className="contact-email" href={`mailto:${profile.email || 'your.email@example.com'}`}>{profile.email || 'your.email@example.com'} <ArrowUpRight size={16} /></a>
            <div className="social-links">{(profile.social_links?.length ? profile.social_links : [{ name: 'Instagram', url: 'https://www.instagram.com/' }, { name: 'LinkedIn', url: 'https://www.linkedin.com/' }]).map((social) => <a href={social.url} key={social.name} target="_blank" rel="noreferrer">{social.name} <ArrowUpRight size={13} /></a>)}</div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row"><label>Your name<input name="name" required maxLength="120" placeholder="How should I address you?" /></label><label>Email address<input name="email" type="email" required maxLength="254" placeholder="you@example.com" /></label></div>
            <label>Subject<input name="subject" required maxLength="160" placeholder="What’s on your mind?" /></label>
            <label>Your note<textarea name="message" required minLength="10" maxLength="5000" rows="4" placeholder="Write a little something..." /></label>
            {formError && <p className="form-feedback error" role="alert">{formError}</p>}{formState === 'sent' && <p className="form-feedback success" role="status"><Check size={16} /> Your note is on its way. Thank you.</p>}
            <button className="button button-dark submit-button" type="submit" disabled={formState === 'sending'}>{formState === 'sending' ? 'Sending...' : 'Send a little note'} <Send size={15} /></button><p className="form-footnote">Your details are only used to reply to your message.</p>
          </form>
        </section>
      </main>

      <footer className="site-footer"><div className="footer-top"><Link className="wordmark" to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span className="wordmark-mark"><Leaf size={16} /></span> little by little</Link><p>A personal portfolio rooted in learning and care.</p><a className="back-top" href="#home" aria-label="Back to top"><ArrowDown size={16} /></a></div><nav className="footer-links" aria-label="Footer navigation">{[['About Me', '#about'], ['Nursing Philosophy', '#philosophy'], ['My Interests', '#interests'], ['Favorite Music', '#favorites'], ['Dream Destinations', '#places'], ['Favorite Surah', '#surah'], ['Gallery', '#gallery'], ['Contact', '#contact']].map(([label, href]) => <a href={href} key={label}>{label}</a>)}</nav><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}. {profile.professional_title}</span><span className="api-status"><i className={apiState === 'connected' ? 'status-dot online' : 'status-dot'} /> {apiState === 'loading' ? 'Finding the latest notes' : apiState === 'connected' ? 'Notes are up to date' : 'Showing starter notes'}</span><a href="#home">Back to the beginning ↑</a></div></footer>

      {selectedImage !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery photo" onClick={() => setSelectedImage(null)}><button className="lightbox-close icon-button" aria-label="Close image" onClick={() => setSelectedImage(null)}><X size={20} /></button><button className="lightbox-prev icon-button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage - 1 + content.gallery.length) % content.gallery.length) }}><ChevronLeft size={22} /></button><figure onClick={(event) => event.stopPropagation()}><img src={content.gallery[selectedImage].image || content.gallery[selectedImage].image_url} alt={content.gallery[selectedImage].alt || content.gallery[selectedImage].caption} /><figcaption>{content.gallery[selectedImage].caption}</figcaption></figure><button className="lightbox-next icon-button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); setSelectedImage((selectedImage + 1) % content.gallery.length) }}><ChevronRight size={22} /></button></div>}
      </div>
    </>
  )
}
