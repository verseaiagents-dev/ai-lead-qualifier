import { NextRequest, NextResponse } from 'next/server';

interface LeadData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  companySize: string;
  budget: string;
  timeline: string;
  needs: string;
  currentSolution: string;
}

function calculateLeadScore(data: LeadData): {
  score: number;
  category: 'hot' | 'warm' | 'cold';
  analysis: string;
  recommendations: string[];
  urgency: string;
} {
  let score = 50; // Base score

  // Budget scoring
  const budgetScores: Record<string, number> = {
    '100k+': 25,
    '50k-100k': 20,
    '15k-50k': 15,
    '5k-15k': 10,
    '<5k': 5,
    '': 0,
  };
  score += budgetScores[data.budget] || 0;

  // Timeline scoring
  const timelineScores: Record<string, number> = {
    'immediate': 20,
    '1month': 15,
    '3months': 10,
    '6months': 5,
    'exploring': -5,
    '': 0,
  };
  score += timelineScores[data.timeline] || 0;

  // Company size scoring
  const sizeScores: Record<string, number> = {
    '500+': 15,
    '201-500': 12,
    '51-200': 10,
    '11-50': 7,
    '1-10': 5,
    '': 0,
  };
  score += sizeScores[data.companySize] || 0;

  // Has phone (shows engagement)
  if (data.phone) score += 5;

  // Has current solution (shows they understand the problem)
  if (data.currentSolution) score += 5;

  // Needs description length (shows engagement)
  if (data.needs.length > 100) score += 5;
  if (data.needs.length > 200) score += 5;

  // Cap score at 100
  score = Math.min(100, Math.max(0, score));

  // Determine category
  let category: 'hot' | 'warm' | 'cold';
  if (score >= 75) category = 'hot';
  else if (score >= 50) category = 'warm';
  else category = 'cold';

  // Generate analysis
  const analyses = {
    hot: `${data.companyName} shows strong buying signals. ${data.timeline === 'immediate' ? 'They need a solution urgently.' : ''} ${data.budget ? `Budget range of ${data.budget} indicates serious intent.` : ''} This lead should be prioritized for immediate follow-up.`,
    warm: `${data.companyName} is a promising lead with moderate buying intent. ${data.companySize ? `As a ${data.companySize} employee company, they have potential for growth.` : ''} Consider nurturing this lead with targeted content.`,
    cold: `${data.companyName} is in early exploration phase. ${data.timeline === 'exploring' ? 'They are still researching options.' : ''} Add to nurture campaign and follow up in 2-4 weeks.`,
  };

  // Generate recommendations
  const recommendations: string[] = [];

  if (category === 'hot') {
    recommendations.push('Schedule a demo call within 24 hours');
    recommendations.push('Send personalized proposal based on their needs');
    if (data.currentSolution) {
      recommendations.push(`Prepare competitive analysis vs ${data.currentSolution}`);
    }
    recommendations.push('Assign to senior sales representative');
  } else if (category === 'warm') {
    recommendations.push('Send case study relevant to their industry');
    recommendations.push('Schedule discovery call within 3-5 days');
    recommendations.push('Add to email nurture sequence');
    if (!data.budget) {
      recommendations.push('Qualify budget in next conversation');
    }
  } else {
    recommendations.push('Add to long-term nurture campaign');
    recommendations.push('Send educational content about your solution');
    recommendations.push('Set reminder to follow up in 30 days');
    recommendations.push('Consider webinar invitation');
  }

  // Determine urgency
  let urgency: string;
  if (data.timeline === 'immediate') {
    urgency = 'Critical - Contact within 2 hours';
  } else if (data.timeline === '1month') {
    urgency = 'High - Contact within 24 hours';
  } else if (data.timeline === '3months') {
    urgency = 'Medium - Contact within 3 days';
  } else {
    urgency = 'Low - Add to nurture sequence';
  }

  return {
    score,
    category,
    analysis: analyses[category],
    recommendations,
    urgency,
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = calculateLeadScore(data);

    // Here you could also:
    // 1. Save to database
    // 2. Trigger n8n webhook
    // 3. Send notification

    // Optional: Trigger n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, ...result, timestamp: new Date().toISOString() }),
      }).catch(console.error);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error qualifying lead:', error);
    return NextResponse.json(
      { error: 'Failed to qualify lead' },
      { status: 500 }
    );
  }
}
