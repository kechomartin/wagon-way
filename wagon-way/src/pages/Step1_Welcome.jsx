import React, { useState } from 'react';

export default function Step1_Welcome({ data, update, onNext }) {
  const [vinInput, setVinInput] = useState('');
  const [isDecoding, setIsDecoding] = useState(false);
  const [decodeMessage, setDecodeMessage] = useState('');

  // Curated database of luxury/premium mock assets for our simulation engine
  const mockVinDatabase = [
    { vin: 'WP0AB2A9XMS2xxxxx', makeModel: '2021 Porsche 911 Carrera S', year: 2021 },
    { vin: '1FTFW1ED5MFxxxxxx', makeModel: '2022 Ford F-150 Raptor', year: 2022 },
    { vin: 'SALWR2V48LAxxxxxx', makeModel: '2020 Land Rover Range Rover Sport', year: 2020 },
    { vin: 'WBA31AR03MFTxxxxx', makeModel: '2023 BMW M3 Competition', year: 2023 }
  ];

  // 1. DYNAMIC VIN DECODER ENGINE
  const handleVinLookup = (forcedVin = null) => {
    const targetVin = forcedVin || vinInput;
    
    if (!targetVin || targetVin.length < 10) {
      setDecodeMessage('⚠️ Please enter a valid vehicle identification string.');
      return;
    }

    setIsDecoding(true);
    setDecodeMessage('Connecting to NHTSA vPIC clearinghouse data channels...');

    // Simulate an async network database fetch delay (1.5 seconds)
    setTimeout(() => {
      // Look for a matching VIN prefix, otherwise fallback to a randomized premium car
      const lookupMatch = mockVinDatabase.find(item => 
        targetVin.toLowerCase().startsWith(item.vin.slice(0, 5).toLowerCase())
      ) || {
        makeModel: '2022 Mercedes-Benz AMG GT Coupe',
        year: 2022
      };

      // Create a brand new vehicle object structure
      const discoveredAsset = {
        id: Date.now(),
        makeModel: lookupMatch.makeModel,
        vehicleYear: lookupMatch.year,
        conditionRating: 'Good', // default baseline setting
        mileage: ''
      };

      // If the default array is empty or contains an untouched blank card, replace it.
      // Otherwise, cleanly append this newly discovered asset to the fleet manifest.
      const currentFleet = data?.vehicles || [];
      const hasInitialBlankOnly = currentFleet.length === 1 && currentFleet[0].makeModel === '';
      
      const updatedFleet = hasInitialBlankOnly 
        ? [discoveredAsset] 
        : [...currentFleet, discoveredAsset];

      // Ship updates straight up to your master source of truth
      update({ vehicles: updatedFleet });

      setIsDecoding(false);
      setDecodeMessage(`✓ Asset Verified: ${lookupMatch.makeModel} successfully registered to manifest!`);
      setVinInput(''); // Clear input box for sequential scanning entries
    }, 1500);
  };

  // Quick action helper to let users easily test the core logic with sample data strings
  const triggerDemoFill = (demoObj) => {
    setVinInput(demoObj.vin);
    handleVinLookup(demoObj.vin);
  };

  const removeVehicleFromFleet = (id, e) => {
    e.stopPropagation();
    const filtered = (data?.vehicles || []).filter(v => v.id !== id);
    update({ vehicles: filtered });
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>
        Logistics Matrix & Fleet Intake
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>
        Initialize your onboarding profile and deploy our automated VIN lookup framework to instantly discover assets.
      </p>

      {/* SECTION 1: PRIMARY ACCOUNT INFO */}
      <div style={styles.formSection}>
        <h3 style={styles.sectionHeader}>Principal Identity Parameters</h3>
        <div style={styles.formGrid}>
          <div className="form-group">
            <label className="form-label">Client Principal Full Name</label>
            <input 
              type="text" 
              className="form-input"
              value={data?.fullName || ''}
              onChange={(e) => update({ fullName: e.target.value })}
              placeholder="e.g., Martin Kecho"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Verification Line</label>
            <input 
              type="tel" 
              className="form-input"
              value={data?.phone || ''}
              onChange={(e) => update({ phone: e.target.value })}
              placeholder="e.g., +1 (555) 019-2834"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: THE AUTOMATED VIN DECODER TOOL */}
      <div style={styles.vinDecoderWrapper}>
        <h3 style={{ ...styles.sectionHeader, color: 'var(--gold-dark)' }}>Instant Asset Discovery Engine</h3>
        <p style={{ fontSize: '12px', color: 'var(--ink-60)', marginBottom: '12px' }}>
          Type a 17-character VIN string below to pull detailed factory specifications instantly from decentralized database layers.
        </p>

        <div style={styles.inputSearchActionRow}>
          <input 
            type="text"
            className="form-input"
            style={{ fontFamily: 'monospace', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}
            value={vinInput}
            onChange={(e) => setVinInput(e.target.value)}
            disabled={isDecoding}
            placeholder="ENTER 17-DIGIT VIN STRUCTURAL CODE"
          />
          <button 
            type="button"
            className="btn-primary"
            style={{ width: '160px', margin: 0, padding: 0 }}
            onClick={() => handleVinLookup()}
            disabled={isDecoding || !vinInput}
          >
            {isDecoding ? 'Decoding...' : 'Query Engine'}
          </button>
        </div>

        {/* Dynamic State Status Callouts */}
        {decodeMessage && (
          <div style={{
            ...styles.statusMessage,
            color: decodeMessage.startsWith('✓') ? 'var(--green)' : 'var(--gold-dark)',
            backgroundColor: decodeMessage.startsWith('✓') ? 'var(--green-light)' : 'var(--cream)'
          }}>
            {decodeMessage}
          </div>
        )}

        {/* Demo Fast-Track Quick Simulator Actions */}
        <div style={{ marginTop: '14px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--ink-40)', display: 'block', marginBottom: '6px' }}>
            DEMO TEST MATRIX SHORTCUTS (CLICK TO SCAN):
          </span>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {mockVinDatabase.map((sample, idx) => (
              <button 
                key={idx}
                type="button"
                onClick={() => triggerDemoFill(sample)}
                disabled={isDecoding}
                style={styles.demoPill}
              >
                ⚡ Scan {sample.makeModel.split(' ').slice(1,3).join(' ')} VIN
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: CURRENT ACTIVE FLEET MANIFEST PREVIEW */}
      <div style={{ marginTop: '24px' }}>
        <h3 style={styles.sectionHeader}>Active Intake Fleet Allocation Container</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {(data?.vehicles || []).length === 0 || (data?.vehicles?.length === 1 && data.vehicles[0].makeModel === '') ? (
            <div style={styles.emptyManifestCallout}>
              No verified vehicle assets linked to this deployment payload yet. Use the lookup tool above or add one manually.
            </div>
          ) : (
            data.vehicles.map((car, index) => (
              <div key={car.id} style={styles.manifestMiniCard}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={styles.indexCircle}>{index + 1}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{car.makeModel || 'Pending Specification Configuration'}</div>
                    <div style={{ fontSize: '11px', color: 'var(--ink-40)' }}>
                      Year Token: {car.vehicleYear || 'Unspecified'} • Initial Class: {car.conditionRating}
                    </div>
                  </div>
                </div>
                <button 
                  type="button" 
                  onClick={(e) => removeVehicleFromFleet(car.id, e)} 
                  style={styles.deleteCrossButton}
                  title="Strip asset out of active deployment payload"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* SECTION 4: MANUAL DIRECT APPEND TRIPPERS */}
      <button 
        type="button" 
        onClick={() => {
          const freshBlank = { id: Date.now(), makeModel: '', vehicleYear: '', conditionRating: 'Good', mileage: '' };
          const blankFleet = data?.vehicles?.[0]?.makeModel === '' ? [freshBlank] : [...(data?.vehicles || []), freshBlank];
          update({ vehicles: blankFleet });
        }}
        style={styles.addManualButton}
      >
        + Append Blank Asset Card Manually
      </button>

      {/* FOOTER TRANSITION ACTION BOUNDARY */}
      <div style={styles.actionFooter}>
        <div />
        <button 
          type="button" 
          onClick={onNext} 
          disabled={!data?.fullName || (data?.vehicles || []).length === 0 || data?.vehicles?.[0]?.makeModel === ''}
          className="btn-primary" 
          style={{ 
            width: 'auto', 
            padding: '12px 35px',
            opacity: (!data?.fullName || (data?.vehicles || []).length === 0 || data?.vehicles?.[0]?.makeModel === '') ? 0.5 : 1,
            cursor: (!data?.fullName || (data?.vehicles || []).length === 0 || data?.vehicles?.[0]?.makeModel === '') ? 'not-allowed' : 'pointer'
          }}
        >
          Save & Proceed to Appraisal Matrix →
        </button>
      </div>
    </div>
  );
}

const styles = {
  formSection: { marginBottom: '24px' },
  sectionHeader: { fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--ink-40)', marginBottom: '12px', fontWeight: 700 },
  formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  vinDecoderWrapper: { backgroundColor: 'var(--paper)', border: '1px solid var(--ink-10)', borderRadius: '8px', padding: '20px', marginBottom: '24px' },
  inputSearchActionRow: { display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px', alignItems: 'center' },
  statusMessage: { marginTop: '12px', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 500, transition: 'all 0.2s' },
  demoPill: { padding: '6px 12px', borderRadius: '14px', border: '1px solid var(--ink-10)', backgroundColor: '#ffffff', color: 'var(--ink-60)', fontSize: '11px', cursor: 'pointer', transition: 'all 0.15s ease' },
  emptyManifestCallout: { border: '1px dashed var(--ink-10)', padding: '20px', borderRadius: '6px', textAlign: 'center', fontSize: '13px', color: 'var(--ink-40)' },
  manifestMiniCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', border: '1px solid var(--ink-10)', borderRadius: '6px', backgroundColor: '#ffffff' },
  indexCircle: { width: '22px', height: '22px', borderRadius: '50%', backgroundColor: 'var(--cream)', border: '1px solid var(--gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold', color: 'var(--gold-dark)' },
  deleteCrossButton: { background: 'none', border: 'none', color: 'var(--ink-30)', cursor: 'pointer', fontSize: '14px', padding: '4px', transition: 'color 0.2s' },
  addManualButton: { width: '100%', background: 'none', border: '1px dashed var(--ink-20)', padding: '12px', borderRadius: '6px', color: 'var(--ink-60)', fontSize: '13px', cursor: 'pointer', marginTop: '12px', fontWeight: 500, transition: 'all 0.2s' },
  actionFooter: { display: 'flex', justifyHydration: 'space-between', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '1px solid var(--ink-10)', paddingTop: '20px' }
};