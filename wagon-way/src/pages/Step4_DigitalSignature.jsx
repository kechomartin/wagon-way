import React, { useRef, useState, useEffect } from 'react';

export default function Step4_DigitalSignature({ data, update, onNext, onPrev }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);
  const [typedName, setTypedName] = useState(data.signedName || '');

  // 1. INITIALIZE CANVAS CONTEXT PROPERTIES
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#b69834'; // High-contrast ink color matching your variables
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Optional: If a signature already exists in global state, we could reload it, 
    // but typically drawing pads reset for safety security reasons on step remounts.
    if (data.digitalSignatureUrl) {
      setHasSigned(true);
    }
  }, []);

  // 2. DRAWING STATE TRACERS
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Support standard mouse events vs unified touch interfaces
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault(); // Stop mobile browsers from rubber-banding the view panel

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSigned(true);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    saveSignatureToState();
  };

  // 3. FLUSH ACTION CONTROLLERS
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
    
    // Strip signatures out of the master data payload structure
    update({ digitalSignatureUrl: '' });
  };

  const saveSignatureToState = () => {
    const canvas = canvasRef.current;
    // Export the canvas composition to a compressed Base64 Data URL string asset
    const dataUrl = canvas.toDataURL('image/png');
    update({ digitalSignatureUrl: dataUrl });
  };

  const handleNameChange = (val) => {
    setTypedName(val);
    update({ signedName: val });
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>
        Legal Execution & Instrument Binding
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>
        Review authorization covenants and execute a secure structural signature marker below.
      </p>

      {/* Corporate Covenants Framework box */}
      <div style={styles.legalDisclosureBox}>
        <h3 style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
          Manifest Validation Agreement
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--ink-60)', lineHeight: '1.6', margin: 0 }}>
          By establishing signature coordinates below, the primary principal validates that all declared odometer indices, physical condition profiles, and attached corporate ownership validation documents are perfectly factual. You authorize WagonWay logistics partners to initiate secondary verification checklists against these assets upon deployment site drop-off.
        </p>
      </div>

      <div style={styles.formGrid}>
        {/* Name Verification Text Input */}
        <div className="form-group">
          <label className="form-label">Printed Principal Representative Full Name</label>
          <input 
            type="text" 
            className="form-input"
            value={typedName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g., Martin Kecho"
          />
        </div>

        {/* Dynamic Drawing Workspace */}
        <div className="form-group">
          <div style={styles.padLabelRow}>
            <label className="form-label" style={{ margin: 0 }}>Authorized Digital Signature Pad</label>
            {hasSigned && (
              <button type="button" onClick={clearCanvas} style={styles.clearLink}>
                ✕ Clear Drawing Pad
              </button>
            )}
          </div>

          <div style={styles.canvasContainer}>
            <canvas
              ref={canvasRef}
              width={500}
              height={160}
              style={styles.signatureCanvas}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
            {!hasSigned && (
              <div style={styles.canvasPlaceholder}>
                Use your mouse cursor or touchscreen pointer device to sign here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav Buttons Actions Footer */}
      <div style={styles.actionFooter}>
        <button type="button" onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>
          ← Back to Media Vault
        </button>
        <button 
          type="button" 
          onClick={onNext} 
          className="btn-primary" 
          disabled={!hasSigned || !typedName}
          style={{ 
            width: 'auto', 
            padding: '12px 35px',
            opacity: (!hasSigned || !typedName) ? 0.5 : 1,
            cursor: (!hasSigned || !typedName) ? 'not-allowed' : 'pointer'
          }}
        >
          Verify Signing & Proceed →
        </button>
      </div>
    </div>
  );
}

const styles = {
  legalDisclosureBox: {
    backgroundColor: 'var(--paper)',
    borderLeft: '3px solid var(--ink-30)',
    padding: '16px',
    borderRadius: '6px',
    marginBottom: '24px'
  },
  formGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  padLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px'
  },
  clearLink: {
    background: 'none',
    border: 'none',
    color: '#d90429',
    fontSize: '12px',
    cursor: 'pointer',
    padding: 0,
    fontWeight: 500
  },
  canvasContainer: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#faf9f6',
    borderRadius: '6px',
    border: '2px solid #c5a880', 
    overflow: 'hidden'
  },
  signatureCanvas: {
    display: 'block',
    cursor: 'crosshair',
    width: '100%' // Fluid scaling matching wrapper boxes
  },
  canvasPlaceholder: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'var(--ink-30)',
    fontSize: '13px',
    pointerEvents: 'none', // Lets mouse coordinate trackers click straight through to the canvas engine
    textAlign: 'center',
    width: '90%'
  },
  actionFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '30px',
    borderTop: '1px solid var(--ink-10)',
    paddingTop: '20px'
  }
};