# Technical Context: PWC Agency Tech Stack

## Core Technology Stack

### Orchestration & Automation
- **n8n**: Self-hosted on Coolify/Hetzner
  - Visual workflow builder
  - 6 core workflows for lead lifecycle
  - Webhook integrations with external services
  - Cron scheduling for automated tasks

### Database & Storage
- **Baserow**: Primary data store
  - Client information and assets
  - Lead data and scoring
  - Campaign performance metrics
  
- **Supabase**: Analytics and AI workloads
  - Postgres database with vector embeddings
  - Real-time subscriptions
  - Advanced analytics queries

### AI Services
- **OpenAI**: Text generation and embeddings
- **OpenRouter**: Infrastructure-agnostic LLM routing
- **Vapi**: AI voice agents and telephony
- **Creatify/Arcade.ai**: Human-like video ad generation
- **Apify**: Web scraping and automation
- **WhoisXMLAPI**: Domain and contact data enrichment

### Frontend & UI
- **React**: Component-based UI framework
- **Tailwind CSS**: Utility-first styling
- **Lovable.dev**: Rapid UI prototyping and scaffolding
- **Magic Links**: Passwordless authentication

### Infrastructure & Hosting
- **Coolify**: Application deployment platform
- **Hetzner**: Cloud infrastructure provider
- **Grafana**: System health monitoring
- **Sentry**: Error tracking and performance monitoring

### Communication & Integration
- **Slack**: Client communication and team coordination
- **SendGrid**: Email delivery service
- **Meta Ads API**: Campaign management
- **Calendar APIs**: Appointment scheduling

## Development Environment

### Local Setup Requirements
- Node.js 18+ for React development
- Docker for local n8n instance
- Git for version control
- VS Code or similar IDE

### Development Workflow
- **Version Control**: Git with Conventional Commits
- **Testing**: Pre-deployment test plans for workflows
- **Deployment**: Automated via Coolify
- **Monitoring**: Real-time alerts via Grafana/Sentry

## Technical Constraints

### Performance Requirements
- **Dashboard Load Time**: <2 seconds
- **Workflow Execution**: <30 seconds per lead
- **API Response Time**: <500ms for critical paths
- **Uptime**: 99.9% availability target

### Scalability Limits
- **Current Capacity**: 10 concurrent clients
- **Database Growth**: Plan for 100K+ leads
- **Workflow Throughput**: 1000+ leads/day
- **Geographic Scaling**: Multi-region deployment ready

### Security Requirements
- **Data Encryption**: At rest and in transit
- **Access Control**: Role-based permissions
- **Audit Logging**: All system actions tracked
- **Compliance**: GDPR/CCPA data handling

## Integration Architecture

### External API Dependencies
```
Meta Ads API → Campaign Management
Calendar APIs → Appointment Booking
SendGrid API → Email Delivery
WhoisXML API → Data Enrichment
OpenAI API → AI Processing
Vapi API → Voice Agents
```

### Internal Data Flow
```
Landing Page → n8n Webhook → Baserow Storage → Supabase Analytics → Dashboard Display
```

### Webhook Endpoints
- `/webhook/lead-capture`: New lead intake
- `/webhook/meta-ads`: Campaign performance updates
- `/webhook/calendar`: Appointment confirmations
- `/webhook/email-events`: Delivery/open tracking

## Configuration Management

### Environment Variables
- **Database URLs**: Baserow and Supabase connections
- **API Keys**: All external service credentials
- **Webhook URLs**: n8n endpoint configurations
- **Feature Flags**: Dashboard phase rollout controls

### Secrets Management
- **Production**: Environment-based secrets
- **Development**: Local .env files
- **API Keys**: Encrypted storage in n8n
- **Database Credentials**: Secure vault storage

## Monitoring & Observability

### System Health Metrics
- **Workflow Success Rate**: >99%
- **API Response Times**: <500ms average
- **Database Performance**: Query optimization
- **Error Rates**: <0.1% for critical paths

### Business Metrics
- **Lead Processing Time**: End-to-end tracking
- **Conversion Rates**: Funnel performance
- **Client Satisfaction**: Dashboard usage analytics
- **ROI Tracking**: Revenue attribution

### Alerting Rules
- **Critical**: System downtime, data loss
- **Warning**: Performance degradation, high error rates
- **Info**: Deployment notifications, usage milestones

## Development Standards

### Code Quality
- **Linting**: ESLint for JavaScript/React
- **Formatting**: Prettier for consistent style
- **Testing**: Unit tests for critical functions
- **Documentation**: Inline comments and README files

### Workflow Standards
- **Naming**: Descriptive node and workflow names
- **Error Handling**: Comprehensive try-catch blocks
- **Logging**: Detailed execution tracking
- **Versioning**: Backup before major changes

### Security Practices
- **Input Validation**: All external data sanitized
- **Rate Limiting**: API endpoint protection
- **Authentication**: Secure token management
- **Data Minimization**: Only collect necessary information

## Deployment Pipeline

### Staging Environment
- **Purpose**: Pre-production testing
- **Data**: Anonymized production subset
- **Access**: Development team only
- **Sync**: Weekly updates from production

### Production Deployment
- **Process**: Blue-green deployment strategy
- **Rollback**: Automated revert capability
- **Monitoring**: Real-time health checks
- **Notifications**: Slack alerts for all deployments

### Backup & Recovery
- **Database**: Daily automated backups
- **Workflows**: Version-controlled JSON exports
- **Configuration**: Infrastructure as code
- **Recovery Time**: <1 hour for critical systems 