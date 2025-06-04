# System Patterns: PWC Agency Architecture

## Core Architecture Principles

### 1. AI-Augmented Human Intelligence
- **Pattern**: AI handles automation, humans provide oversight and strategy
- **Implementation**: Every AI decision has human review points
- **Rationale**: Maintains quality while scaling efficiency

### 2. Workflow-Driven Operations
- **Pattern**: n8n orchestrates all business processes
- **Implementation**: 6 core workflows handle lead lifecycle
- **Rationale**: Visual, maintainable, and scalable automation

### 3. Data-Centric Decision Making
- **Pattern**: Every action is measured and optimized
- **Implementation**: Real-time dashboards with KPI tracking
- **Rationale**: Enables rapid iteration and client transparency

## System Components

### Lead Generation Funnel
```
Meta Ads → Landing Page → n8n Webhook → Lead Enrichment → Qualification → Nurturing → Appointment Setting
```

### Core Workflows (n8n)
1. **Lead Capture**: Webhook → Form Parser → DB Upsert
2. **Enrichment**: New Record Trigger → API Lookups → Score Assignment
3. **Categorization**: Scoring Thresholds → Tagging → CRM Push
4. **Nurture**: Scheduled Email → Conditional Branching → Performance Logging
5. **Appointment**: API Call → Calendar Create → Reminder SMS
6. **Reporting**: Data Aggregator → Looker API → Dashboard Refresh

### Data Flow Architecture
```
Client Input → Baserow (Primary) → n8n Processing → Supabase (Analytics) → Dashboard Display
```

## Key Technical Decisions

### Database Strategy
- **Primary Store**: Baserow (client, lead, asset data)
- **Analytics Store**: Supabase (Postgres + vector embeddings)
- **Rationale**: Baserow for simplicity, Supabase for AI workloads

### AI Service Integration
- **Text Generation**: OpenAI
- **Voice Agents**: Vapi
- **Video Creation**: Creatify/Arcade.ai
- **Data Enrichment**: WhoisXMLAPI
- **Rationale**: Best-in-class services with OpenRouter for flexibility

### Frontend Architecture
- **Framework**: React + Tailwind CSS
- **Prototyping**: Lovable.dev
- **Authentication**: Magic links
- **Rationale**: Modern, responsive, rapid development

### Infrastructure Patterns
- **Orchestration**: n8n (self-hosted on Coolify/Hetzner)
- **Monitoring**: Grafana + Sentry
- **Communication**: Slack integration
- **Rationale**: Cost-effective, scalable, maintainable

## Design Patterns

### Visual Identity System
- **Theme**: Dark mode with bronze/gold accents
- **Typography**: Roboto Flex (variable weights)
- **Colors**: Deep dark (#171717) with gold gradients
- **Effects**: Subtle animations, magnetic interactions

### Dashboard Patterns
- **Phase 1**: Client-facing metrics only
- **Phase 2**: Agency control panels
- **Phase 3**: Role-based unified access
- **Rationale**: Progressive complexity as system matures

### Communication Patterns
- **Real-time**: Dashboard updates
- **Scheduled**: Weekly PDF reports
- **Interactive**: Slack channels per client
- **Rationale**: Multiple touchpoints for different needs

## Component Relationships

### Client Journey Flow
```
Landing Page → Strategy Call → Dashboard Access → Go-Live → Ongoing Optimization
```

### Service Tier Structure
```
Tier 1: Core Lead Gen
Tier 2: + Full-Funnel Automation  
Tier 3: + Premium Concierge
```

### Quality Assurance Pattern
- **Pre-deployment**: Test plans for each workflow
- **Live monitoring**: Real-time error tracking
- **Performance review**: Weekly KPI analysis
- **Rationale**: Proactive quality management

## Scalability Patterns

### Client Onboarding
- **Automated**: Dashboard provisioning, workflow setup
- **Semi-automated**: Asset collection, credential management
- **Manual**: Strategy calls, custom configurations
- **Rationale**: Balance automation with personalization

### Geographic Exclusivity
- **Pattern**: One client per 15-mile radius
- **Implementation**: Location-based client mapping
- **Rationale**: Ensures local market exclusivity

### Team Expansion Model
- **Current**: Founder handles all functions
- **Future**: Specialized roles (PM, AI Engineer, Designer, etc.)
- **Pattern**: Gradual delegation as volume increases

## Integration Patterns

### External Services
- **Meta Ads**: Campaign management and optimization
- **Calendar Systems**: Automated appointment booking
- **Email/SMS**: Multi-channel communication
- **Analytics**: Performance tracking and reporting

### Internal Systems
- **n8n ↔ Baserow**: Primary data operations
- **n8n ↔ Supabase**: Analytics and AI workloads
- **Dashboard ↔ APIs**: Real-time data display
- **Slack ↔ Workflows**: Team notifications

## Security Patterns
- **Authentication**: Magic link access for clients
- **Data Protection**: Encrypted storage and transmission
- **Access Control**: Role-based permissions
- **Monitoring**: Comprehensive logging and alerting 