# GenSec Health "5-Second Snapshot" Dashboard

A B2B SaaS prototype for precision-prevention medicine in concierge healthcare settings.

## Overview

GenSec Health is a "cockpit" dashboard for physicians managing high-net-worth executive patients. It synthesizes complex medical data from multiple sources into an actionable "traffic light" decision matrix, saving clinicians hours of reading time.

## Design Philosophy

### The "5-Second Rule"
A clinician must be able to look at any tab and instantly identify:
- 🔴 **Red (Critical)**: Action required immediately
- 🟡 **Yellow (Monitor)**: Watch closely
- 🟢 **Green (Optimized)**: Stable and optimal

### FDA Compliance
**Critical**: This system does NOT calculate scores or perform risk assessments. It displays values **extracted from external PDF reports** with full citation tracking. Every metric includes a citation ID linking back to the source document.

## Architecture

### Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts
- **Language**: TypeScript

### Key Components

#### 1. `DashboardLayout.tsx`
- Left sidebar navigation
- Top header with patient context
- Right-side fly-out panels (References & AI Assistant)

#### 2. `MetricCard.tsx`
- Displays individual metrics with:
  - Value + unit
  - Status indicator (red/yellow/green border)
  - Delta from previous visit (↑ ↓)
  - Clickable citation link
  - Sparkline trend chart
  - Reference ranges

#### 3. `CategoryCard.tsx`
- Groups related metrics
- Shows category-level status
- Includes clinical summary

#### 4. `ReferenceManager.tsx`
- Slide-out panel for citation details
- Shows source document metadata
- Displays PDF snippets
- Links to full reports

#### 5. `AIAssistant.tsx`
- Context-aware chat interface
- Suggests missing tests
- Explains biomarkers
- Recommends follow-up actions

## Dashboard Sections

### Overview
- Patient demographics
- Active alerts summary
- Critical findings
- Quick status cards
- Next steps/action items

### Cardiovascular
- **Lipids**: LDL, HDL, Triglycerides, Lp(a)
- **Imaging**: CAC score, Carotid IMT
- **Inflammation**: hs-CRP, Homocysteine
- **Genetics**: LDLR, APOB, PCSK9 variants

### Neurodegenerative
- **Genetics**: APOE genotype
- **Cognitive Scores**: MoCA, other assessments

### Metabolic
- **Glucose**: HbA1c, Fasting glucose, CGM data
- **Insulin**: Fasting insulin, HOMA-IR

### Longevity
- **Fitness**: VO2 Max, Resting HR
- **Biological Age**: GrimAge, Telomere length

### Pharmacogenomic
- **Drug-Gene Interactions**: CYP2C19, SLCO1B1, CYP3A5
- **Medication Recommendations**: Contraindications, alternatives

## Data Structure

All patient data is typed in `types/patient.ts`:

```typescript
interface Metric {
  name: string;
  value: string;
  unit?: string;
  status: 'red' | 'yellow' | 'green';
  trend?: TrendPoint[];
  citationId: string;
  delta?: {
    value: string;
    direction: 'up' | 'down' | 'stable';
    percentage?: number;
  };
  referenceRange?: string;
  notes?: string;
}
```

Mock patient data is in `data/mockPatient.json`.

## Running Locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 - you'll be redirected to `/dashboard`.

## Branding & Design

### Color Palette
- **Deep Navy**: `#1e3a8a` (Primary brand color)
- **Clinical White**: `#ffffff` (Clean, medical aesthetic)
- **Teal Accents**: `#0d9488` (AI Assistant highlights)
- **Status Colors**:
  - Red: `#ef4444` (Critical/Action)
  - Yellow: `#f59e0b` (Monitor/Watch)
  - Green: `#10b981` (Optimized/Stable)

### Typography
- Headers: Bold, sans-serif
- Body: Regular weight, high readability
- Emphasis on clarity over decoration

## Key Features Implemented

✅ Sidebar navigation with 6 main sections
✅ Traffic light status indicators (red/yellow/green)
✅ Citation tracking with clickable references
✅ Sparkline trend charts for longitudinal data
✅ Delta indicators (% change from previous visit)
✅ Reference Manager fly-out panel
✅ AI Assistant fly-out (UI only, ready for LLM integration)
✅ Responsive design (mobile-friendly sidebar)
✅ FDA compliance notice in UI
✅ Mock data for 55-year-old executive male patient

## Next Steps for Production

1. **Backend Integration**
   - Connect to EHR systems (HL7 FHIR)
   - PDF extraction pipeline for lab reports
   - Secure patient data storage (HIPAA compliance)

2. **AI Assistant**
   - Integrate Claude or GPT-4 for chat responses
   - RAG (Retrieval-Augmented Generation) with clinical guidelines
   - Context-aware suggestions based on active tab

3. **Advanced Features**
   - User authentication (clinician roles)
   - Multi-patient management
   - Report generation (PDF export)
   - Collaborative notes between providers
   - Integration with lab ordering systems

4. **Compliance & Security**
   - HIPAA audit logging
   - Encryption at rest and in transit
   - Role-based access control
   - SOC 2 Type II certification path

## Contact

For questions about this prototype, please contact the development team.

---

**Built with precision for precision medicine.**
