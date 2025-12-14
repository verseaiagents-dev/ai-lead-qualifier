# AI Lead Qualifier

Instantly qualify sales leads using AI-powered scoring. Get actionable insights and prioritize your sales efforts.

![AI Lead Qualifier](https://img.shields.io/badge/AI-Powered-blue?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **Instant Lead Scoring** - Get a 0-100 score in under 2 seconds
- **Category Classification** - Hot, Warm, or Cold lead categorization
- **AI Analysis** - Detailed analysis of lead quality
- **Action Recommendations** - Specific next steps for each lead
- **n8n Integration** - Webhook support for automation workflows
- **Modern UI** - Beautiful, responsive dark theme design

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ballonaiagency/ai-lead-qualifier.git

# Install dependencies
cd ai-lead-qualifier
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Environment Variables

Create a `.env.local` file:

```env
# Optional: n8n webhook for lead notifications
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/lead-qualified
```

## How It Works

The lead scoring algorithm considers:

| Factor | Weight | Description |
|--------|--------|-------------|
| Budget | 25 pts | Higher budget = higher score |
| Timeline | 20 pts | Urgent need = higher score |
| Company Size | 15 pts | Larger companies score higher |
| Contact Info | 5 pts | Phone number provided |
| Current Solution | 5 pts | Shows problem awareness |
| Needs Detail | 10 pts | Detailed requirements |

### Score Categories

- **Hot (75-100)**: High intent, contact immediately
- **Warm (50-74)**: Good potential, nurture actively
- **Cold (0-49)**: Early stage, long-term nurture

## n8n Integration

Connect to n8n for automated workflows:

1. Create a webhook node in n8n
2. Copy the webhook URL
3. Add to `N8N_WEBHOOK_URL` environment variable
4. Each qualified lead triggers the webhook

Example n8n workflow:
```
Webhook → Filter by Score → Send Email/Slack → Add to CRM
```

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ballonaiagency/ai-lead-qualifier)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## License

MIT License - feel free to use for your own projects.

## Author

**Kadir Burak Durmazlar**
- GitHub: [@verseaiagents-dev](https://github.com/verseaiagents-dev)
