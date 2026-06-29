import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { X, ExternalLink, Download, CheckCircle, Brain, Database, Code2, Cpu } from 'lucide-react';

interface Project {
  title: string;
  desc: string;
  tags: string[];
}

export const CardModal: React.FC = () => {
  const { currentZone, setCurrentZone, triggerSound } = useGame();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (currentZone === 'none' || currentZone === 'home') return null;

  const handleClose = () => {
    triggerSound('click');
    setCurrentZone('none');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      triggerSound('achievement');
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 5000);
    }
  };

  const projects: Project[] = [
    {
      title: 'AI Cricket Detector',
      desc: 'Deep learning based computer vision model to detect and classify cricket actions, ball trajectories, and umpire signals in real-time video streams.',
      tags: ['Computer Vision', 'YOLO', 'Python', 'PyTorch'],
    },
    {
      title: 'Cloud-Free Satellite Image Reconstruction',
      desc: 'Advanced multi-source data fusion framework utilizing SAR (Synthetic Aperture Radar) and optical imagery to reconstruct cloud-covered earth observation data.',
      tags: ['Deep Learning', 'PyTorch', 'GIS', 'Data Fusion'],
    },
    {
      title: 'Smart Attendance System',
      desc: 'Face recognition-based automated attendance system optimized for classrooms and workplaces, featuring anti-spoofing and real-time dashboard analytics.',
      tags: ['OpenCV', 'FaceNet', 'Python', 'Firebase'],
    },
    {
      title: 'Mentor Portal',
      desc: 'Comprehensive web platform connecting students with academic mentors, featuring scheduler modules, feedback boards, and progress trackers.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB'],
    },
    {
      title: 'AI Study Planner',
      desc: 'Personalized task scheduler utilizing genetic algorithms to generate optimized study plans based on student calendars, exam schedules, and learning speeds.',
      tags: ['Generative AI', 'Python', 'React', 'Supabase'],
    },
    {
      title: 'Smart Queue Management System',
      desc: 'Cloud-based ticketing and scheduling pipeline minimizing customer wait times and queue congestion using real-time predictive analytics.',
      tags: ['React', 'Firebase', 'Queueing Theory', 'Node.js'],
    },
    {
      title: 'Movie Recommendation System',
      desc: 'Collaborative filtering and content-based recommendation model featuring personalized search indexing and clustering engines.',
      tags: ['Machine Learning', 'Scikit-Learn', 'Pandas', 'Flask'],
    },
  ];

  const renderContent = () => {
    switch (currentZone) {
      case 'about':
        return (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-full border-2 border-cyber-neonPurple/50 bg-[#0d0a2d] flex items-center justify-center relative overflow-hidden animate-pulse shadow-neon-purple shrink-0">
                <Brain className="w-16 h-16 text-cyber-neonPurple" />
              </div>
              <div className="space-y-3">
                <div className="text-xxs font-mono tracking-widest text-cyber-neonPurple uppercase">CLASSIFIED PROFILE</div>
                <h3 className="text-2xl font-black text-white tracking-wider font-mono">Shanmugapriyan</h3>
                <p className="text-xs text-cyber-neonCyan font-mono">B.Tech Artificial Intelligence & Data Science Student</p>
                <div className="h-0.5 bg-gradient-to-r from-cyber-neonPurple to-transparent w-full" />
                <p className="text-sm leading-relaxed text-gray-300">
                  Passionate technologist specializing in Artificial Intelligence, Machine Learning, and Data Science. Driven by the philosophy of turning complex data into actionable intelligent agents, I build full-stack solutions and predictive systems.
                </p>
              </div>
            </div>
            
            <div className="glass-neon-purple p-4 rounded-lg border-l-4 border-cyber-neonPurple mt-4">
              <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-1 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-cyber-neonPurple animate-pulse" />
                FOUNDER & GENERAL DIRECTOR
              </h4>
              <p className="text-sm font-semibold text-purple-300 font-mono">Seyyonic Intelligence</p>
              <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                Spearheading a research-oriented workspace focusing on the deployment of agentic models, full-stack automations, and custom predictive algorithms for industrial use cases.
              </p>
            </div>
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Programming */}
              <div className="glass p-4 rounded-xl border border-cyan-500/10">
                <div className="flex items-center gap-2 mb-3 text-cyber-neonCyan pb-2 border-b border-cyan-900/20">
                  <Code2 className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider">PROGRAMMING</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'C', 'JavaScript', 'TypeScript'].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded bg-[#0d0c26] border border-cyan-500/20 text-xs font-mono text-cyan-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI & Data Science */}
              <div className="glass p-4 rounded-xl border border-purple-500/10">
                <div className="flex items-center gap-2 mb-3 text-cyber-neonPurple pb-2 border-b border-purple-900/20">
                  <Brain className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider">AI & DATA SCIENCE</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Machine Learning', 'Deep Learning', 'Computer Vision', 'Data Analytics', 'NLP', 'Generative AI'].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded bg-[#160b33] border border-purple-500/20 text-xs font-mono text-purple-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="glass p-4 rounded-xl border border-pink-500/10">
                <div className="flex items-center gap-2 mb-3 text-cyber-neonPink pb-2 border-b border-pink-900/20">
                  <Database className="w-4 h-4" />
                  <h4 className="font-bold text-xs uppercase font-mono tracking-wider">TECHNOLOGIES</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Supabase', 'Firebase', 'MySQL', 'MongoDB', 'Docker', 'Git & GitHub'].map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded bg-[#200523] border border-pink-500/20 text-xs font-mono text-pink-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-4">
            <div className="text-xxs font-mono tracking-widest text-cyan-500 mb-2 uppercase">SECTOR ARCHIVES: 7 LOADED</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-cyan-500/15 hover:border-cyber-neonCyan/50 hover:shadow-neon-cyan transition-all group duration-300"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold text-sm text-white group-hover:text-cyber-neonCyan transition-colors font-mono">
                      {idx + 1}. {proj.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                    {proj.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.map((tag) => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/20 text-cyan-400 border border-cyan-500/10 font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'certifications':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Artificial Intelligence Fundamentals', provider: 'IBM', year: '2025', color: 'border-blue-500 text-blue-400 bg-blue-950/10' },
                { title: 'Google Gemini Certified Faculty', provider: 'Google', year: '2025', color: 'border-green-500 text-green-400 bg-green-950/10' },
                { title: 'Data Analytics Career Internship', provider: 'Deloitte', year: '2025', color: 'border-purple-500 text-purple-400 bg-purple-950/10' },
                { title: 'Natural Language Processing (NPTEL)', provider: 'IIT Kharagpur', year: '2024', color: 'border-amber-500 text-amber-400 bg-amber-950/10' },
              ].map((cert, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-l-4 ${cert.color} border shadow-md flex flex-col justify-between hover:scale-102 transition-transform`}
                >
                  <div>
                    <span className="text-[9px] font-mono tracking-widest text-gray-500 uppercase">{cert.provider} CREDENTIAL</span>
                    <h4 className="font-bold text-sm text-white mt-1 leading-snug font-mono">{cert.title}</h4>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-xxs font-mono text-gray-500">
                    <span>ISSUED: {cert.year}</span>
                    <span className="text-cyber-neonCyan font-bold flex items-center gap-0.5">VERIFIED ✓</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {[
                { title: 'Seyyonic Intelligence Foundation', text: 'Established Seyyonic Intelligence as a developer-centric startup focus node to pioneer full-stack generative AI tooling and agentic automations.' },
                { title: 'Hackathon Contender', text: 'Actively participated in national-level AI and Full Stack hackathons, designing high-fidelity prototypes under strict timelines.' },
                { title: 'Open-Source Scaffolding', text: 'Engineered and scaled over a dozen interactive machine learning dashboards, analytical engines, and real-time computer vision classifiers.' },
              ].map((ach, idx) => (
                <div key={idx} className="glass p-4 rounded-xl border border-yellow-500/10 hover:border-yellow-400/30 transition-all flex items-start gap-4">
                  <div className="w-8 h-8 rounded bg-yellow-500/10 flex items-center justify-center text-yellow-500 font-bold font-mono text-sm shrink-0 border border-yellow-500/20">
                    #0{idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-yellow-400 font-mono tracking-wider">{ach.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {ach.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Details */}
            <div className="space-y-4 font-mono text-xs">
              <div>
                <span className="text-xxs text-gray-500 uppercase tracking-widest block">COMMUNICATION VECTOR</span>
                <p className="text-sm text-cyber-neonCyan font-bold mt-1">shanmugapriyan@example.com</p>
              </div>

              <div className="h-px bg-cyan-950/40 w-full my-4" />

              <div className="space-y-2">
                <span className="text-xxs text-gray-500 uppercase tracking-widest block">DIRECTORIES</span>
                
                <a
                  href="https://linkedin.com/in/shanmugapriyan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-cyan-950/10 border border-cyan-500/10 hover:border-cyan-500/40 hover:bg-cyan-950/20 text-cyan-400 transition-all group"
                  onClick={() => triggerSound('click')}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    LINKEDIN/shanmugapriyan
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2.5 rounded bg-purple-950/10 border border-purple-500/10 hover:border-purple-500/40 hover:bg-purple-950/20 text-purple-400 transition-all group"
                  onClick={() => triggerSound('click')}
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GITHUB/yourusername
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <button
                className="w-full mt-4 py-3 px-4 glass-neon-purple text-purple-400 font-semibold rounded-lg hover:bg-cyber-neonPurple hover:text-white flex items-center justify-center gap-2 transition-all"
                onClick={() => triggerSound('achievement')}
              >
                <Download className="w-4 h-4" />
                DOWNLOAD RESUME.PDF
              </button>
            </div>

            {/* Contact Form */}
            <div className="glass p-4 rounded-xl border border-cyan-500/10 relative">
              {formSubmitted ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#050511]/90 rounded-xl animate-fade-in z-10">
                  <CheckCircle className="w-12 h-12 text-cyber-neonCyan animate-bounce mb-3" />
                  <h4 className="font-bold text-white font-mono uppercase tracking-wider text-sm">Message Transmitted!</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs font-mono">
                    Shanmugapriyan's Seyyonic mailbox has received your digital signature. Standby for response.
                  </p>
                </div>
              ) : null}

              <form onSubmit={handleFormSubmit} className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-gray-500 block mb-1">NAME IDENTIFIER</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0c0a25] border border-cyan-950/60 p-2 text-cyan-300 rounded focus:border-cyber-neonCyan transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="text-gray-500 block mb-1">EMAIL INDEX</label>
                  <input
                    type="email"
                    required
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#0c0a25] border border-cyan-950/60 p-2 text-cyan-300 rounded focus:border-cyber-neonCyan transition-all text-xs"
                  />
                </div>

                <div>
                  <label className="text-gray-500 block mb-1">COMMUNICATION PAYLOAD</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Type transmission details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#0c0a25] border border-cyan-950/60 p-2 text-cyan-300 rounded focus:border-cyber-neonCyan transition-all text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-cyan-550 border border-cyber-neonCyan text-cyber-neonCyan font-bold rounded-lg hover:bg-cyber-neonCyan hover:text-black transition-all"
                  onClick={() => triggerSound('click')}
                >
                  TRANSMIT TELEMETRY
                </button>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const zoneHeaders: Record<string, { title: string; subtitle: string; accent: string }> = {
    about: { title: '👨‍💻 System Registry: About', subtitle: 'Developer credentials & founder identity data', accent: 'text-cyber-neonPurple border-cyber-neonPurple/30 bg-cyber-neonPurple/5' },
    skills: { title: '🛠 Skill Matrix: Modules', subtitle: 'Technical configurations & packages index', accent: 'text-cyber-neonCyan border-cyber-neonCyan/30 bg-cyber-neonCyan/5' },
    projects: { title: '📂 Project Archives: Repositories', subtitle: '7 Active Artificial Intelligence & Full Stack models', accent: 'text-cyber-neonCyan border-cyber-neonCyan/30 bg-cyber-neonCyan/5' },
    certifications: { title: '🏆 Verified Qualifications', subtitle: 'Industry standards, certifications & internships', accent: 'text-purple-400 border-purple-500/30 bg-purple-500/5' },
    achievements: { title: '📈 Core Achievements', subtitle: 'Pioneered technologies & project milestones', accent: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/5' },
    contact: { title: '📞 Connect: Mailbox Terminal', subtitle: 'Ping Shanmugapriyan / Download resume credentials', accent: 'text-cyber-neonPink border-cyber-neonPink/30 bg-cyber-neonPink/5' },
  };

  const header = zoneHeaders[currentZone] || { title: 'Interface Console', subtitle: 'System operational logs', accent: 'text-white border-white/10 bg-white/5' };

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 flex items-center justify-center p-4 md:p-6 pointer-events-auto">
      <div className="w-full max-w-3xl glass rounded-xl border border-white/10 p-6 shadow-2xl relative max-h-[85vh] overflow-y-auto scanlines">
        {/* Animated grid in backdrop of modal */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-30 pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-white/10 pb-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 border text-[9px] font-mono rounded tracking-widest font-bold ${header.accent}`}>
                  CONSOLE ACTIVE
                </span>
              </div>
              <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono mt-2">
                {header.title}
              </h2>
              <p className="text-xxs text-gray-500 font-mono tracking-wider mt-0.5 uppercase">
                {header.subtitle}
              </p>
            </div>
            <button
              onClick={handleClose}
              className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Modal Main Content */}
          {renderContent()}

          {/* Footer close helper */}
          <div className="border-t border-white/5 pt-4 mt-5 text-center">
            <button
              onClick={handleClose}
              className="px-6 py-2 border border-gray-800 text-gray-400 font-semibold rounded-lg hover:bg-white/5 hover:text-white transition-all text-xs font-mono"
            >
              CLOSE CONSOLE (DISMISS GRID)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
