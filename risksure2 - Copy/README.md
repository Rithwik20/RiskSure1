# RiskSure2

RiskSure2 is a full-stack web application designed for predicting medical insurance risk scores and managing insurance applications. It leverages a Machine Learning model through a Flask backend to estimate insurance charges and convert them into risk scores, combined with rule-based underwriting logic, to give real-time decisions and premium estimates. The frontend is a modern Next.js application that provides a beautiful, dynamic, and responsive dashboard for data entry and analytics.

## 🌟 Features

- **Predictive ML Modeling**: Uses a pre-trained scikit-learn model to assess an applicant's base risk based on their age, sex, BMI, number of children, smoking habits, and geographical region.
- **Rule-Based Adjustments**: Augments ML predictions with standard actuarial rules (e.g., penalties for high BMI, smoking status) to calculate the final risk score.
- **Automated Underwriting**: Instantly provides decisions (Approved, Approved with Conditions, Manual Review) based on the calculated risk.
- **Premium Calculation**: Dynamically estimates health insurance premiums.
- **Modern UI/UX**: An intuitive Next.js frontend styled with Tailwind CSS and shadcn-ui, offering a smooth wizard-style application process.
- **Data Persistence**: Uses an SQLite database via SQLAlchemy on the backend to persistently store application records.

## 🏗️ System Architecture

The application is split into two primary components:

### 1. Backend (`risksure2_backend`)
- **Framework**: Flask (Python 3)
- **Database**: SQLite (via Flask-SQLAlchemy)
- **ML Integration**: Loads a trained model (`insurance_model.pkl`), a scaler (`insurance_scaler.pkl`), and risk bounds using `joblib`.
- **Endpoints**:
  - `GET /` - Health check and model loading status.
  - `POST /process` - Takes applicant data, preprocesses it, runs it through the ML model, applies rule adjustments, and returns risk metrics and a premium estimate.
  - `POST /save` - Persists the application data along with the calculated risk and decision into the SQLite database.
  - `GET /applications` - Retrieves all saved applications.

### 2. Frontend (`risksure2_frontend`)
- **Framework**: Next.js 15 (App Router with React 18)
- **Styling**: Tailwind CSS & PostCSS
- **Components Components**: Radix UI primitives bundled via shadcn/ui.
- **State Management**: React Context (`ApplicationProvider`) to hold state as the user progresses through the multi-step application form.
- **Key Routes**:
  - `/dashboard` - Main dashboard displaying KPIs and application entries.
  - `/new-application` - First step in the multi-page submission form to collect demographic and health data.
  - `/risk`, `/underwriting`, `/premium` - Intermediate steps showing ML pipeline processing results.
  - `/final` - Final summary of the processed application before saving.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Python (v3.8+ recommended)
- `npm` or `yarn`

### Running the Backend
1. Open a terminal and resolve to the `risksure2_backend` directory:
   ```bash
   cd risksure2_backend
   ```
2. Activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   ```
3. Install the required Python packages (such as flask, flask_sqlalchemy, joblib, scikit-learn, numpy).
4. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will start running mapped on `http://0.0.0.0:5000`.

### Running the Frontend
1. Open a new terminal and resolve to the `risksure2_frontend` directory:
   ```bash
   cd risksure2_frontend
   ```
2. Install the Node dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
   The frontend UI will be accessible at `http://localhost:3000`.

## 📂 Project Structure

```
.
├── risksure2_backend/           # Flask API backend
│   ├── app.py                   # Main backend application file and API routes
│   ├── retrain_model.py         # Utility script for retraining the ML model
│   ├── risk.db                  # SQLite database generated at runtime
│   └── model/                   # Contains ML model artifacts
│       ├── insurance_model.pkl
│       ├── insurance_scaler.pkl
│       └── risk_bounds.pkl
└── risksure2_frontend/          # Next.js frontend application
    ├── app/                     # App Router pages and global layouts
    ├── components/              # Reusable UI elements (shadcn + custom)
    ├── context/                 # React Context for global state (application-context)
    ├── hooks/                   # Custom React hooks
    ├── lib/                     # Utils and helper functions
    ├── public/                  # Static assets
    ├── package.json             # Node dependencies and scripts
    └── tailwind.config.mjs      # TailwindCSS configuration
```
