'use client';

import { useState } from 'react';
import { Send, Sparkles, TrendingUp, Users, Zap, CheckCircle } from 'lucide-react';

interface LeadResult {
  score: number;
  category: 'hot' | 'warm' | 'cold';
  analysis: string;
  recommendations: string[];
  urgency: string;
}

export default function Home() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    companySize: '',
    budget: '',
    timeline: '',
    needs: '',
    currentSolution: '',
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LeadResult | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/qualify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      companySize: '',
      budget: '',
      timeline: '',
      needs: '',
      currentSolution: '',
    });
    setResult(null);
    setSubmitted(false);
  };

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/10 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400">AI-Powered Lead Qualification</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
              AI Lead Qualifier
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Instantly qualify leads with AI. Get actionable insights and prioritize your sales efforts.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { icon: Zap, label: 'Instant Analysis', value: '<2s' },
              { icon: TrendingUp, label: 'Accuracy Rate', value: '94%' },
              { icon: Users, label: 'Leads Qualified', value: '10K+' },
            ].map((stat, i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 text-center">
                <stat.icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">

          {/* Form */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Send className="w-6 h-6 text-blue-400" />
              Lead Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Contact Name *</label>
                  <input
                    type="text"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                    placeholder="john@acme.com"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                    placeholder="+1 234 567 8900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Company Size</label>
                  <select
                    name="companySize"
                    value={formData.companySize}
                    onChange={handleChange}
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                  >
                    <option value="">Select budget</option>
                    <option value="<5k">Less than $5,000</option>
                    <option value="5k-15k">$5,000 - $15,000</option>
                    <option value="15k-50k">$15,000 - $50,000</option>
                    <option value="50k-100k">$50,000 - $100,000</option>
                    <option value="100k+">$100,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Timeline</label>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="">When do they need it?</option>
                  <option value="immediate">Immediately (within 2 weeks)</option>
                  <option value="1month">Within 1 month</option>
                  <option value="3months">Within 3 months</option>
                  <option value="6months">Within 6 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">What do they need? *</label>
                <textarea
                  name="needs"
                  value={formData.needs}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition resize-none"
                  placeholder="Describe what the lead is looking for..."
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Current Solution</label>
                <input
                  type="text"
                  name="currentSolution"
                  value={formData.currentSolution}
                  onChange={handleChange}
                  className="w-full bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-white focus:border-blue-500 focus:outline-none transition"
                  placeholder="What are they using now?"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Qualify Lead with AI
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-400" />
              AI Analysis
            </h2>

            {!submitted ? (
              <div className="h-full flex items-center justify-center text-center py-20">
                <div>
                  <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-10 h-10 text-blue-400" />
                  </div>
                  <p className="text-gray-400 text-lg">
                    Fill out the form to get instant AI-powered lead qualification
                  </p>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-6 animate-slide-up">
                {/* Score */}
                <div className="text-center">
                  <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl ${
                    result.category === 'hot' ? 'score-hot' :
                    result.category === 'warm' ? 'score-warm' : 'score-cold'
                  }`}>
                    <span className="text-5xl font-bold">{result.score}</span>
                    <div className="text-left">
                      <div className="text-sm opacity-80">Lead Score</div>
                      <div className="text-xl font-semibold uppercase">{result.category}</div>
                    </div>
                  </div>
                </div>

                {/* Urgency */}
                <div className="bg-[var(--secondary)] rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-1">Urgency Level</div>
                  <div className="text-lg font-semibold text-white">{result.urgency}</div>
                </div>

                {/* Analysis */}
                <div className="bg-[var(--secondary)] rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-2">AI Analysis</div>
                  <p className="text-white leading-relaxed">{result.analysis}</p>
                </div>

                {/* Recommendations */}
                <div className="bg-[var(--secondary)] rounded-xl p-4">
                  <div className="text-sm text-gray-400 mb-3">Recommended Actions</div>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                        <span className="text-white">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={resetForm}
                    className="flex-1 bg-[var(--secondary)] hover:bg-[var(--border)] text-white font-semibold py-3 rounded-xl transition"
                  >
                    Qualify Another
                  </button>
                  <button className="flex-1 bg-green-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl transition">
                    Add to CRM
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>Built with AI by <span className="text-blue-400">Kadir Burak Durmazlar</span></p>
          <p className="text-sm mt-1">Powered by Claude AI</p>
        </div>
      </footer>
    </main>
  );
}
