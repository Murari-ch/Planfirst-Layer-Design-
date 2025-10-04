# 🎯 PlanFirst - AI-Powered Planning Layer for Coding Agents

> **A simplified implementation of Traycer's spec-driven development philosophy**

PlanFirst demonstrates the core concept behind Traycer: **plans prevent the expensive mistakes that AI coding agents make when they just start coding.** By creating detailed, phase-based specifications with file-level reasoning, we guide agents to build exactly what's intended—without drift, hallucinations, or breaking changes.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

---

## 🌟 Key Features

### 🎨 **Intuitive Planning Interface**
- Clean, modern UI with smooth animations and glassmorphism effects
- Dark-themed design optimized for developer workflows
- Responsive layout that works on desktop, tablet, and mobile

### 🧠 **AI-Powered Plan Generation**
- Integration with **Anthropic Claude** and **OpenAI GPT-4**
- Intelligent phase breakdown based on project intent
- Automatic file-level specification generation with reasoning
- Graceful fallback to mock data for testing without API keys

### 📊 **Phase-Based Planning**
- Break complex projects into sequential, manageable phases
- Drag-and-drop phase reordering to adjust dependencies
- Expandable/collapsible views for focused work
- Visual status indicators (pending, ready, completed)

### 📝 **File-Level Precision**
- Specify exact file changes (create, modify, delete)
- Detailed descriptions of what needs to change
- **Critical reasoning field** - explains WHY each change is necessary
- Estimated lines of code for planning

### ✅ **Real-Time Validation**
- Automatic plan validation as you edit
- Detects circular dependencies between phases
- Identifies duplicate file paths
- Flags placeholder content and generic descriptions
- Color-coded warnings (errors, warnings, info)

### 📈 **Comprehensive Analytics**
- Live statistics dashboard showing:
  - Total phases and files
  - Breakdown by change type (create/modify/delete)
  - Estimated lines of code
  - Completion progress with visual indicators

### 📤 **Multi-Format Export**
- **Markdown** - Perfect for handoff to coding agents (Cursor, Claude Code, etc.)
- **JSON** - Structured data for API integration
- **YAML** - CI/CD pipeline compatibility
- One-click copy to clipboard for quick sharing

### 🎯 **Built for Agent Handoff**
- Export formats optimized for AI coding assistants
- Clear, unambiguous specifications
- Reasoning prevents agent drift and hallucinations
- Works with Cursor, Claude Code, GitHub Copilot, Cline, and more

---




## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn**
- **(Optional)** Anthropic or OpenAI API key for AI generation

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/planfirst.git
cd planfirst

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to see the app.

### Optional: Enable AI Generation

Create a `.env` file in the project root:

```bash
# Use Anthropic (Recommended - Free $5 credits)
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here

# OR use OpenAI
VITE_OPENAI_API_KEY=sk-your-key-here
```

**Get API Keys:**
- **Anthropic:** [console.anthropic.com](https://console.anthropic.com/) (Free $5 credit)
- **OpenAI:** [platform.openai.com](https://platform.openai.com/api-keys)

**Note:** The app works perfectly without API keys using intelligent mock data!

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **TypeScript** | Type-safe code |
| **Vite** | Fast development and building |
| **Tailwind CSS** | Utility-first styling |
| **@dnd-kit** | Drag-and-drop functionality |
| **Lucide React** | Beautiful icons |
| **Canvas Confetti** | Celebration animations |
| **Anthropic Claude** | AI plan generation |
| **OpenAI GPT-4** | Alternative AI provider |

---

## 📖 How It Works

### 1. **Define Your Intent**
Describe what you want to build in natural language. Be specific about features, user flows, and technical requirements.

### 2. **AI Generates Detailed Plan**
The system breaks your project into sequential phases, each with:
- Clear phase objectives
- Specific file changes needed
- Descriptions of what to implement
- **Reasoning for why each change is necessary** (prevents agent drift!)

### 3. **Refine and Organize**
- Drag-and-drop to reorder phases
- Edit phase descriptions and file specifications
- Add or remove files as needed
- Validate plan for errors before handoff

### 4. **Export and Execute**
- Export plan as Markdown, JSON, or YAML
- Hand off to your coding agent (Cursor, Claude Code, etc.)
- Agents follow the detailed specifications
- Verify implementation matches plan before moving to next phase

---

## 🎯 The Core Philosophy

### Why Plans Matter

Traditional approach:
```
User: "Build me a dashboard"
Agent: *starts coding immediately*
Result: Drift, hallucinations, breaking changes
```

PlanFirst approach:
```
User: "Build me a dashboard"
PlanFirst: *creates detailed phase-based plan*
Agent: *follows plan with clear reasoning*
Result: Exactly what was intended
```

### The Power of Reasoning

Each file change includes **explicit reasoning**:

```markdown
File: src/auth/login.tsx (create)
Description: Build login form with email/password
Reasoning: ✨ Entry point for authentication - needed before 
           any protected features. Prevents building features 
           that can't be secured.
```

This reasoning:
- Prevents agents from making random implementation choices
- Explains dependencies and order of operations
- Reduces need for clarifying questions
- Creates self-documenting plans

---

## 💡 Key Innovations

### 1. **Drag-and-Drop Phase Reordering**
Unlike static plans, PlanFirst lets you visually reorder phases to handle changing dependencies.

### 2. **Real-Time Validation**
Catches common mistakes before they waste development time:
- Circular dependencies
- Missing prerequisites
- Duplicate file modifications
- Placeholder content

### 3. **Reasoning-First Design**
Every change requires explanation of WHY, not just WHAT. This prevents the #1 cause of agent failures: lack of context.

### 4. **Agent-Agnostic Export**
Works with any coding agent that accepts text instructions:
- Cursor
- Claude Code
- GitHub Copilot
- Cline
- Windsurf
- Or manual implementation

### 5. **Graceful Degradation**
No API keys? No problem. Intelligent mock data ensures anyone can test the full application flow.

---

## 🎓 What This Demonstrates

### Technical Skills
✅ **React Architecture** - Clean component composition with custom hooks  
✅ **TypeScript Mastery** - Comprehensive type safety throughout  
✅ **State Management** - Efficient state handling with React hooks  
✅ **API Integration** - Multiple LLM providers with error handling  
✅ **UX Design** - Smooth animations, drag-and-drop, responsive layout  
✅ **Code Quality** - Readable, maintainable, well-documented  

### Product Thinking
✅ **Understanding Traycer's Vision** - Plans as first-class artifacts  
✅ **Problem-Solution Fit** - Addresses real agent drift issues  
✅ **User-Centric Design** - Intuitive workflows for developers  
✅ **Edge Case Handling** - Validation, fallbacks, error states  

### Strategic Insights
✅ **Improvement Ideas** - See [IMPROVEMENTS.md](./IMPROVEMENTS.md)  
✅ **Extensibility** - Architected for easy feature additions  
✅ **Production Mindset** - Error handling, TypeScript, validation  

---

## 📂 Project Structure

```
planfirst/
├── src/
│   ├── components/
│   │   └── StatsPanel.tsx       # Statistics dashboard
│   ├── hooks/
│   │   └── useProject.ts        # Project state management
│   ├── services/
│   │   └── llm.ts               # AI integration (Anthropic + OpenAI)
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── utils/
│   │   ├── markdown.ts          # Export functionality
│   │   └── validation.ts        # Plan validation logic
│   ├── App.tsx                  # Main application component
│   ├── index.css                # Tailwind styles
│   └── main.tsx                 # React entry point
├── public/
├── .env.example                 # Environment variables template
├── IMPROVEMENTS.md              # Ideas to enhance Traycer
├── README.md                    # This file
└── package.json
```

---

## 🚧 Roadmap & Future Enhancements

See [IMPROVEMENTS.md](./IMPROVEMENTS.md) for 18+ detailed ideas including:

- **Codebase Context Analysis** - Upload existing code for context-aware planning
- **Impact Analysis** - Show ripple effects of changes before coding
- **Agent Confidence Scores** - Predict which phases might cause issues
- **Test Plan Generation** - Auto-generate unit and integration tests
- **Time & Cost Estimation** - Predict implementation duration and API costs
- **Version Control** - Git-like versioning for plans with diff views
- **Collaborative Planning** - Real-time multiplayer editing
- **Plan Templates** - Pre-built templates for common project types

---


### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📄 License

MIT License - feel free to use this code for learning and inspiration!

---

## 👤 About

**Created by:** [Chikkam Chiranjeevi Sai Murari]  
**Date:** [4 October 2025]  

---

## 🎯 Why PlanFirst Matters

In the age of AI coding assistants, the bottleneck isn't writing code—it's **knowing what to write**. 

PlanFirst demonstrates that:
- **Plans are more valuable than code** - Good specifications prevent bad implementations
- **Reasoning prevents drift** - Context keeps agents on track  
- **Structure enables scale** - Phases break complexity into manageable chunks
- **Validation saves time** - Catching errors before coding is 100x cheaper

This is the vision: **Treat plans as first-class artifacts that guide AI agents to build exactly what's intended.**

---

## 🙏 Acknowledgments

- **Anthropic** for Claude's excellent reasoning capabilities
- **OpenAI** for GPT-4's language understanding
- **React & TypeScript** communities for amazing tools

---

## 📞 Questions?

Have questions about the implementation or want to discuss the architecture?

Feel free to reach out:
- **Email:** [chikkamsaimurari@gmail.com]
- **LinkedIn:** [[Your LinkedIn](https://www.linkedin.com/in/saimurari-chikkam-a05779223/)]

---

<div align="center">

**⭐ If you found this interesting, please star the repository! ⭐**

Built with 💜 by [Sai Murari]

</div>
