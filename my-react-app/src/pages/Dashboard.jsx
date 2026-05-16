import React, { useState, useRef } from 'react';

export default function Dashboard() {
  // 1. Car Progress Tracker State
  const [carProgress] = useState({
    status: 'In Review',
    currentStep: 2, 
    makeModel: '2021 Porsche 911 Carrera'
  });

  // 2. Upload Preview States
  const [mediaPreview, setMediaPreview] = useState(null);
  const [docFile, setDocFile] = useState(null);

  // Hidden references to programmatically trigger standard file pickers on container clicks
  const mediaInputRef = useRef(null);
  const docInputRef = useRef(null);

  // 3. Image File Picker Handler
  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result); // Sets base64 string for image preview
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Document File Picker Handler
  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDocFile(file); // Stores the file object descriptor
    }
  };

  return (
    <div className="dashboard-container">
      {/* Valuation Stage Track */}
      <div className="dashboard-card">
        <div className="card-header">
          <div>
            <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--gold)' }}>Active Listing</span>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginTop: '4px' }}>{carProgress.makeModel}</h2>
          </div>
          <div className="status-badge">● {carProgress.status}</div>
        </div>

        <div className="stepper-track">
          {[
            { step: 1, label: 'Identity Verified' },
            { step: 2, label: 'Vehicle Specs' },
            { step: 3, label: 'Legal Docs & Sign' },
            { step: 4, label: 'Inspection Scheduled' }
          ].map((s) => (
            <div key={s.step} className={`step-node ${carProgress.currentStep >= s.step ? 'active' : ''}`}>
              <div className="step-circle">{s.step}</div>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Media Vault Dropzones */}
      <div className="dashboard-grid">
        
        {/* PANEL A: VEHICLE PHOTOS */}
        <div className="dashboard-card">
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '10px' }}>Vehicle Media</h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-60)', marginBottom: '15px' }}>Upload structural exterior and dashboard pictures safely.</p>
          
          <input 
            type="file" 
            accept="image/*" 
            ref={mediaInputRef} 
            onChange={handleMediaChange} 
            style={{ display: 'none' }} 
          />

          <div className="dropzone-placeholder" onClick={() => mediaInputRef.current.click()}>
            {mediaPreview ? (
              <img 
                src={mediaPreview} 
                alt="Car preview" 
                style={{ width: '100%', maxHeight: '140px', objectFit: 'contain', borderRadius: '4px' }} 
              />
            ) : (
              <span>Click to choose or drag car images here</span>
            )}
          </div>
        </div>

        {/* PANEL B: LEGAL DOCUMENTATION */}
        <div className="dashboard-card">
          <h3 style={{ fontFamily: 'Playfair Display, serif', marginBottom: '10px' }}>Legal Documents</h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-60)', marginBottom: '15px' }}>Submit government-issued ID proofs & car registration papers.</p>
          
          <input 
            type="file" 
            accept=".pdf,image/*" 
            ref={docInputRef} 
            onChange={handleDocChange} 
            style={{ display: 'none' }} 
          />

          <div className="dropzone-placeholder" onClick={() => docInputRef.current.click()}>
            {docFile ? (
              <div style={{ color: 'var(--green)', fontWeight: '500' }}>
                📄 {docFile.name} ({(docFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ) : (
              <span>Click to choose or drag verification PDFs here</span>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}