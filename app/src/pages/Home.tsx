import { Search, BookOpen, ShieldCheck, Share2, Users } from 'lucide-react'
import { useState } from 'react'

const subjects = [
  { name: 'Mathematics', count: '2,842 guides' },
  { name: 'Physics', count: '1,884 guides' },
  { name: 'Computer Science', count: '2,317 guides' },
  { name: 'Engineering', count: '2,761 guides' },
  { name: 'Chemistry', count: '1,305 guides' },
  { name: 'Biology', count: '1,432 guides' },
  { name: 'Economics', count: '643 guides' },
  { name: 'Electrical', count: '1,104 guides' },
  { name: 'Materials Science', count: '786 guides' },
  { name: 'Astronomy', count: '542 guides' },
  { name: 'Earth Science', count: '612 guides' },
]

const frontierTopics = [
  { name: 'Fusion Reactor Design', subject: 'Engineering' },
  { name: 'Automated Theorem Proving', subject: 'Computer Science' },
  { name: 'Quantum Gravity', subject: 'Physics' },
  { name: 'Whole Brain Emulation', subject: 'Computer Science' },
  { name: 'Interstellar Propulsion', subject: 'Engineering' },
  { name: 'Extremal Combinatorics', subject: 'Mathematics' },
  { name: 'Protein Structure Prediction', subject: 'Biology' },
  { name: 'Room Temperature Superconductors', subject: 'Physics' },
  { name: 'Artificial General Intelligence', subject: 'Computer Science' },
  { name: 'Geoengineering Climate Control', subject: 'Earth Science' },
]

const recentlyUpdated = [
  { name: 'Finite Difference Methods', subject: 'Mathematics', level: 'Level 3', time: '2 hours ago' },
  { name: 'Lithium-Ion Battery Design', subject: 'Engineering', level: 'Level 4', time: '5 hours ago' },
  { name: 'Gaussian Elimination', subject: 'Mathematics', level: 'Level 2', time: '8 hours ago' },
  { name: 'PID Control', subject: 'Engineering', level: 'Level 3', time: '12 hours ago' },
  { name: 'Fourier Transform', subject: 'Mathematics', level: 'Level 3', time: '1 day ago' },
]

const features = [
  {
    icon: <BookOpen strokeWidth={1.25} className="w-10 h-10" />,
    title: 'Practical, step-by-step',
    body: 'Every guide teaches you how to do something from the ground up.',
  },
  {
    icon: <ShieldCheck strokeWidth={1.25} className="w-10 h-10" />,
    title: 'Verified by the community',
    body: 'All guides are reviewed by verifier panels before publishing and improved over time.',
  },
  {
    icon: <Share2 strokeWidth={1.25} className="w-10 h-10" />,
    title: 'Built on a knowledge graph',
    body: 'Guides are connected by prerequisite links across subjects.',
  },
  {
    icon: <Users strokeWidth={1.25} className="w-10 h-10" />,
    title: 'Free and open',
    body: 'BLUE is and always will be free for everyone, everywhere.',
  },
]

const NAV_LINK = 'text-sm text-[#374151] hover:text-[#111827] transition-colors no-underline'
const SECTION_LINK = 'text-xs text-[#374151] hover:text-[#111827] hover:underline no-underline transition-colors'

export default function Home() {
  const [query, setQuery] = useState('')

  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans">

     {/* Nav */}
    <header className="border-b border-[#E5E7EB] bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <a href="/" className="font-serif text-2xl font-medium text-[#111827] no-underline shrink-0">
          BLUE
        </a>

        {/* Right side grouping: Nav + Search + Login */}
        <div className="flex items-center gap-6">
          
          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-6 text-[13px] font-medium text-[#4B5563]">
            {['Subjects', 'Guides', 'Walkthroughs', 'About', 'Contribute'].map(link => (
              <a key={link} href="#" className="hover:text-[#111827] transition-colors">{link}</a>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center border border-[#E5E7EB] rounded bg-white px-3 gap-2 h-9 w-72 ml-2">
            <input
              placeholder="Search BLUE..."
              className="outline-none bg-transparent text-[13px] text-[#111827] placeholder-[#9CA3AF] w-full"
            />
            <Search className="w-3.5 h-3.5 text-[#9CA3AF] shrink-0" />
          </div>

          {/* Log in */}
          <a href="#" className="text-[13px] font-medium text-[#4B5563] hover:text-[#111827] ml-2">
            Log in
          </a>
          
        </div>
      </div>
    </header> 

      {/* Hero */}
      <section className="border-b border-[#E5E7EB] bg-white py-14 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="font-serif text-7xl font-normal tracking-tight text-[#111827] mb-3">BLUE</h1>
          <p className="font-serif italic text-lg text-[#374151] mb-2">Broad Learning Universal Education</p>
          <p className="text-sm text-[#6B7280] mb-8 pb-4">
            The open archive of practical knowledge. 
          </p>

          {/* Search bar — no dropdown */}
          <div className="flex items-stretch border border-[#D1D5DB] rounded shadow-sm bg-white overflow-hidden mb-5">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for any topic or guide..."
              className="flex-1 px-4 py-3 text-sm outline-none bg-transparent text-[#111827] placeholder-[#9CA3AF]"
            />
            <button className="bg-[#4a5a3a] hover:bg-[#3d4d30] text-white px-5 flex items-center justify-center transition-colors shrink-0">
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Popular searches */}
          <p className="text-xs text-[#6B7280]">
            <span className="mr-2">Popular searches:</span>
            {['Rocket engines', 'Linear algebra', 'Electric vehicles', 'Signal processing', 'Quaternions'].map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="text-[#D1D5DB] mx-2">·</span>}
                <a href="#" className="text-[#374151] hover:text-[#111827] hover:underline no-underline transition-colors">{t}</a>
              </span>
            ))}
          </p>
        </div>
      </section>

      {/* Browse by subject */}
      <section className="bg-white py-7 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-baseline mb-4">
            <div>
              <h2 className="font-serif text-base font-normal text-[#111827]">Browse by subject</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">Explore knowledge organized by subject.</p>
            </div>
            <a href="#" className={SECTION_LINK}>See all subjects →</a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-[#E5E7EB] border border-[#E5E7EB] rounded overflow-hidden">
            {subjects.map(subject => (
              <a
                key={subject.name}
                href="#"
                className="bg-white hover:bg-[#F9FAFB] transition-colors px-4 py-3.5 no-underline block group"
              >
                <div className="text-sm text-[#111827] group-hover:text-[#111827] leading-snug mb-0.5">{subject.name}</div>
                <div className="text-xs text-[#6B7280]">{subject.count}</div>
              </a>
            ))}
            <a
              href="#"
              className="bg-white hover:bg-[#F9FAFB] transition-colors px-4 py-3.5 no-underline block group"
            >
              <div className="text-sm text-[#111827] leading-snug mb-0.5">More subjects</div>
              <div className="text-xs text-[#6B7280]">Browse all</div>
            </a>
          </div>
        </div>
      </section>

      {/* Frontier topics + Recently updated */}
      <section className="bg-white py-7 px-6">
        <div className="max-w-6xl mx-auto border border-[#E5E7EB] rounded overflow-hidden grid md:grid-cols-[1fr_1px_1fr]">

          {/* Frontier topics */}
          <div className="px-6 py-5">
            <div className="flex justify-between items-start mb-4 gap-4">
              <div>
                <h2 className="font-serif text-base font-normal text-[#111827]">Frontier topics</h2>
                <p className="text-xs text-[#6B7280] mt-0.5">The current frontiers—topics with no known dependents in their subject.</p>
              </div>
              <a href="#" className={`${SECTION_LINK} whitespace-nowrap shrink-0 mt-0.5`}>See all frontiers →</a>
            </div>
            <div className="grid grid-cols-2 gap-x-8">
              {frontierTopics.map(topic => (
                <div key={topic.name} className="py-2 border-b border-[#F3F4F6]">
                  <a href="#" className="text-sm text-[#111827] hover:text-[#374151] hover:underline no-underline leading-snug block">{topic.name}</a>
                  <span className="text-xs text-[#6B7280]">{topic.subject}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block bg-[#E5E7EB]" />

          {/* Recently updated */}
          <div className="px-6 py-5 border-t border-[#E5E7EB] md:border-t-0">
            <div className="mb-4">
              <h2 className="font-serif text-base font-normal text-[#111827]">Recently updated</h2>
              <p className="text-xs text-[#6B7280] mt-0.5">New and revised guides from across all subjects.</p>
            </div>
            <div>
              {recentlyUpdated.map(item => (
                <div key={item.name} className="flex items-center justify-between py-2.5 border-b border-[#F3F4F6] last:border-0 gap-6">
                  <div>
                    <a href="#" className="text-sm text-[#111827] hover:text-[#374151] hover:underline no-underline leading-snug block">{item.name}</a>
                    <span className="text-xs text-[#6B7280]">{item.subject} · {item.level}</span>
                  </div>
                  <span className="text-xs text-[#9CA3AF] shrink-0">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Feature cards */}
      <section className="border-b border-[#E5E7EB] bg-white py-8 px-6">
        <div className="max-w-6xl mx-auto border border-[#E5E7EB] rounded overflow-hidden grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#E5E7EB]">
          {features.map(f => (
            <div key={f.title} className="bg-white px-6 py-6">
              <div className="text-[#6B7280] mb-4">{f.icon}</div>
              <h3 className="font-serif text-sm font-normal text-[#111827] mb-1.5">{f.title}</h3>
              <p className="text-xs text-[#6B7280] leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-5 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
          <nav className="flex flex-wrap gap-5">
            {['About BLUE', 'How it works', 'Verification', 'Policies', 'Contact'].map(link => (
              <a key={link} href="#" className="text-xs text-[#6B7280] hover:text-[#111827] hover:underline transition-colors">{link}</a>
            ))}
          </nav>
          <p className="text-xs text-[#6B7280]">
            This work is licensed under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-[#374151] underline hover:underline">CC BY-SA 4.0</a>.
          </p>
        </div>
      </footer>

    </div>
  )
}
