import React, { useState } from 'react';

// IMPORT STEP MODULES & COMPONENTS
import Step1_Welcome from './pages/Step1_Welcome';
import Step2_VehicleSpecs from './pages/Step2_VehicleSpecs';
import Step3_LegalMedia from './pages/Step3_LegalMedia'; 
import Step4_DigitalSignature from './pages/Step4_DigitalSignature';
import Step5_Scheduling from './pages/Step5_Scheduling';
import ManifestSidebar from './components/ManifestSidebar';

// 1. IMPORT YOUR LOGIN COMPONENT
// Update this path depending on where your login component file lives
import Login from './pages/Login'; 

export default function App() {
  // 2. AUTHENTICATION STATE GUARD
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // WIZARD WORKSPACE STATE LAYER
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    vehicles: [
      {
        id: 101,
        makeModel: '',
        vehicleYear: '',
        conditionRating: 'Good',
        mileage: '',
        options: {},
        defects: {},
        calculatedValue: 35000
      }
    ],
    digitalSignatureUrl: null,
    selectedDate: '',
    selectedTimeSlot: ''
  });

  const updateGlobalData = (newProperties) => {
    setFormData((prevData) => ({ ...prevData, ...newProperties }));
  };

  const handleNextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const handlePrevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // STEP SWITCHBOARD RENDERER
  const renderActiveStepComponent = () => {
    switch (currentStep) {
      case 1: return <Step1_Welcome data={formData} update={updateGlobalData} onNext={handleNextStep} />;
      case 2: return <Step2_VehicleSpecs data={formData} update={updateGlobalData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 3: return <Step3_LegalMedia data={formData} update={updateGlobalData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 4: return <Step4_DigitalSignature data={formData} update={updateGlobalData} onNext={handleNextStep} onPrev={handlePrevStep} />;
      case 5: return <Step5_Scheduling data={formData} update={updateGlobalData} onPrev={handlePrevStep} />;
      default: return <Step1_Welcome data={formData} update={updateGlobalData} onNext={handleNextStep} />;
    }
  };

  // 3. CONDITIONAL ROUTING ELEMENT: Show login screen first if unauthenticated
  if (!isAuthenticated) {
    return (
      <Login onLoginSuccess={() => setIsAuthenticated(true)} />
    );
  }

  // 4. AUTHENTICATED SYSTEM LAYOUT
  return (
    <div style={styles.appContainer}>
      {/* LEFT PANEL WORKSPACE */}
      <main style={styles.workspaceMain}>
        <header style={styles.appHeader}>
          <div style={styles.logoFrame}>
            <span style={styles.logoIcon}>W</span>
            <div>
              <h1 style={styles.brandTitle}>WagonWay</h1>
              <span style={styles.brandSubtitle}>Automotive Appraisal Pipeline</span>
            </div>
          </div>
          
          <div style={styles.stepProgressIndicator}>
            {[1, 2, 3, 4, 5].map((stepNum) => (
              <div key={stepNum} style={styles.stepNodeWrapper}>
                <div style={{
                  ...styles.stepCircle,
                  backgroundColor: currentStep >= stepNum ? 'var(--gold)' : 'var(--ink-10)',
                  color: currentStep >= stepNum ? '#ffffff' : 'var(--ink-40)',
                  borderColor: currentStep === stepNum ? 'var(--ink)' : 'transparent'
                }}>
                  {stepNum}
                </div>
                {stepNum < 5 && <div style={{
                  ...styles.stepLineConnector,
                  backgroundColor: currentStep > stepNum ? 'var(--gold)' : 'var(--ink-10)'
                }} />}
              </div>
            ))}
          </div>
        </header>

        <div style={styles.stepViewFrame}>
          {renderActiveStepComponent()}
        </div>
      </main>

      {/* RIGHT STICKY CONTROL LEDGER PANEL */}
      <aside style={styles.sidebarAside}>
        <ManifestSidebar data={formData} />
      </aside>
    </div>
  );
}

const styles = {
  appContainer: { display: 'grid', gridTemplateColumns: '1fr 360px', minHeight: '100vh', backgroundColor: '#faf9f6', fontFamily: 'Inter, system-ui, sans-serif' },
  workspaceMain: { padding: '40px 50px', display: 'flex', flexDirection: 'column', overflowY: 'auto', maxHeight: '100vh' },
  appHeader: { display: 'flex', justifyHydration: 'space-between', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid var(--ink-10)', paddingBottom: '20px' },
  logoFrame: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoIcon: { width: '36px', height: '36px', borderRadius: '8px', backgroundColor: 'var(--ink)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', fontFamily: 'Playfair Display, serif' },
  brandTitle: { fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 'bold', margin: 0, lineHeight: '1.1' },
  brandSubtitle: { fontSize: '11px', color: 'var(--ink-40)', textTransform: 'uppercase', letterSpacing: '0.5px' },
  stepProgressIndicator: { display: 'flex', alignItems: 'center', gap: '4px' },
  stepNodeWrapper: { display: 'flex', alignItems: 'center' },
  stepCircle: { width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '600', border: '2px solid transparent', transition: 'all 0.3s ease' },
  stepLineConnector: { width: '30px', height: '2px', margin: '0 4px', transition: 'all 0.3s ease' },
  stepViewFrame: { flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' },
  sidebarAside: { width: '360px', position: 'sticky', top: 0, height: '100vh', boxShadow: '-10px 0 30px rgba(0,0,0,0.015)' }
};