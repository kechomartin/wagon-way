import React, { useState } from 'react';
import OnboardingSidebar from './OnboardingSidebar';
import Step1_Welcome from './Step1_Welcome';
import Step2_VehicleSpecs from './Step2_VehicleSpecs';
import Step3_LegalMedia from './Step3_LegalMedia';
import Step4_DigitalSignature from './Step4_DigitalSignature';
import Step5_Scheduling from './Step5_Scheduling';

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Single global source of truth for the entire multi-page application form data
  const [formData, setFormData] = useState({
    // Step 1 data
    fullName: '', phone: '', vehicleType: 'car', totalVehicles: 1,
    // Step 2 data
    makeModel: '', vehicleYear: '', conditionRating: 'Excellent', approximateValue: 0,
    // Step 3 data
    uploadedPhotos: [], uploadedDocs: [],
    // Step 4 data
    signatureDataUrl: '', signedName: '',
    // Step 5 data
    selectedDate: '', selectedTimeSlot: ''
  });

  // Action methods to safely update fields from subcomponents
  const updateFields = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  // Step Switchboard Router
  const renderStepComponent = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Welcome data={formData} update={updateFields} onNext={nextStep} />;
      case 2:
        return <Step2_VehicleSpecs data={formData} update={updateFields} onNext={nextStep} onPrev={prevStep} />;
      case 3:
        return <Step3_LegalMedia data={formData} update={updateFields} onNext={nextStep} onPrev={prevStep} />;
      case 4:
        return <Step4_DigitalSignature data={formData} update={updateFields} onNext={nextStep} onPrev={prevStep} />;
      case 5:
        return <Step5_Scheduling data={formData} update={updateFields} onPrev={prevStep} />;
      default:
        return <Step1_Welcome data={formData} update={updateFields} onNext={nextStep} />;
    }
  };

  return (
    <div className="onboarding-wizard-layout" style={styles.wizardWrapper}>
      {/* Visual Stepper Breadcrumb Header spanning the top of the card row */}
      <div className="dashboard-card" style={{ marginBottom: '24px' }}>
        <div className="stepper-track">
          {[
            { step: 1, label: 'Welcome & Logistics' },
            { step: 2, label: 'Vehicle Matrix' },
            { step: 3, label: 'Vault Media' },
            { step: 4, label: 'Legal Execution' },
            { step: 5, label: 'Pipeline Slot' }
          ].map((s) => (
            <div key={s.step} className={`step-node ${currentStep >= s.step ? 'active' : ''}`}>
              <div className="step-circle">{s.step}</div>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Structural Grid Split (Form Steps vs Sticky Metric Sidebar) */}
      <div style={styles.contentGrid}>
        <div style={styles.formContainer}>
          {renderStepComponent()}
        </div>
        
        <div style={styles.sidebarContainer}>
          <OnboardingSidebar data={formData} activeStep={currentStep} goToStep={setCurrentStep} />
        </div>
      </div>
    </div>
  );
}

const styles = {
  wizardWrapper: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 380px',
    gap: '30px',
    alignItems: 'start'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  sidebarContainer: {
    position: 'sticky',
    top: '40px'
  }
};