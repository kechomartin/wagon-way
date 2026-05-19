import React from 'react';

export default function Step2_VehicleSpecs({ data, update, onNext, onPrev }) {
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  // Global platform adjustments mapping rules (handling financial state offsets)
  const premiumOptionsList = [
    { key: 'sunroof', label: 'Panoramic Glass Sunroof', value: 850 },
    { key: 'premiumAudio', label: 'Burmester Premium Audio Matrix', value: 1200 },
    { key: 'driverAssist', label: 'Level 2 Adaptive Cruise & Autopilot Suite', value: 1500 },
    { key: 'leather', label: 'Nappa Premium Leather Interior upgrade', value: 950 }
  ];

  const wearAndTearList = [
    { key: 'windshield', label: 'Deep Windshield Crack / Star Chip', deduction: 450 },
    { key: 'scratches', label: 'Scrapes / Minor Body Panel Scratches', deduction: 300 },
    { key: 'wheels', label: 'Curbed Wheels / Alloy Rims Scuffs', deduction: 250 },
    { key: 'tires', label: 'Low Tire Tread Depth (Requires Replacement)', deduction: 600 }
  ];

  const vehicleList = data?.vehicles || [];

  // MASTER HANDLER: Updates specific child vehicle keys and re-runs internal valuation mathematics
  const updateVehicleData = (id, updatedProperties) => {
    const updatedVehicles = vehicleList.map((v) => {
      if (v.id === id) {
        const mergedVehicle = { ...v, ...updatedProperties };
        
        // Re-calculate the dynamic quote value specifically for this car entry item
        mergedVehicle.calculatedValue = computeSingleVehiclePrice(mergedVehicle);
        return mergedVehicle;
      }
      return v;
    });

    update({ vehicles: updatedVehicles });
  };

  // MATHEMATICAL VALUATION ENGINE PIPELINE
  const computeSingleVehiclePrice = (vehicle) => {
    // 1. Core Baseline Value anchor rooted in production year index targets
    let baseValue = 35000; 
    const yearOffset = 2026 - (parseInt(vehicle.vehicleYear) || 2022);
    baseValue -= yearOffset * 2500; // Deduct value based on vehicle age

    // 2. Condition structural multipliers
    const conditionMultipliers = {
      'Excellent': 1.15,
      'Very Good': 1.05,
      'Good': 1.00,
      'Fair': 0.85,
      'Poor': 0.60
    };
    const multiplier = conditionMultipliers[vehicle.conditionRating || 'Good'];
    let adjustedValue = baseValue * multiplier;

    // 3. Process compounding Premium Additions
    premiumOptionsList.forEach(option => {
      if (vehicle.options?.[option.key]) {
        adjustedValue += option.value;
      }
    });

    // 4. Process compounding Damage Deductions
    wearAndTearList.forEach(defect => {
      if (vehicle.defects?.[defect.key]) {
        adjustedValue -= defect.deduction;
      }
    });

    return Math.max(2500, Math.round(adjustedValue)); // Set a hard floor value floor limit
  };

  // State handlers tracking matrix arrays toggles
  const toggleOption = (vehicle, key) => {
    const activeOptions = vehicle.options || {};
    const nextOptions = { ...activeOptions, [key]: !activeOptions[key] };
    updateVehicleData(vehicle.id, { options: nextOptions });
  };

  const toggleDefect = (vehicle, key) => {
    const activeDefects = vehicle.defects || {};
    const nextDefects = { ...activeDefects, [key]: !activeDefects[key] };
    updateVehicleData(vehicle.id, { defects: nextDefects });
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>
        Appraisal Parameter Tuning Matrix
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>
        Add luxury tech options and log exterior cosmetics to generate an auditable pricing quote.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {vehicleList.map((vehicle, index) => {
          const currentDisplayVal = vehicle.calculatedValue || computeSingleVehiclePrice(vehicle);

          return (
            <div key={vehicle.id} style={styles.specCard}>
              {/* Card Header showing Live Price Badge for this car */}
              <div style={styles.specHeader}>
                <div>
                  <span style={styles.badge}>Asset Vector #{index + 1}</span>
                  <h3 style={{ margin: '2px 0 0', fontSize: '16px', fontWeight: '600' }}>
                    {vehicle.makeModel || 'Pending Specification Parameters'}
                  </h3>
                </div>
                <div style={styles.liveValueBadge}>
                  <span style={{ fontSize: '10px', uppercase: true, display: 'block', opacity: 0.8 }}>Live Offer Estimate</span>
                  <strong>${currentDisplayVal.toLocaleString()}</strong>
                </div>
              </div>

              {/* Grid block: Year and Base Rating selectors */}
              <div style={styles.formGrid}>
                <div className="form-group">
                  <label className="form-label">Verify Production Model Year</label>
                  <input
                    type="number"
                    className="form-input"
                    value={vehicle.vehicleYear || ''}
                    onChange={(e) => updateVehicleData(vehicle.id, { vehicleYear: e.target.value })}
                    placeholder="e.g., 2021"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Baseline Condition Classification</label>
                  <select
                    className="form-input"
                    style={{ backgroundColor: '#ffffff', cursor: 'pointer' }}
                    value={vehicle.conditionRating || 'Good'}
                    onChange={(e) => updateVehicleData(vehicle.id, { conditionRating: e.target.value })}
                  >
                    {conditions.map(c => <option key={c} value={c}>{c} Tier Grade</option>)}
                  </select>
                </div>
              </div>

              {/* CHIPS SEGMENT A: PREMIUM FEATURE INTAKE MATRIX */}
              <div style={{ marginTop: '20px' }}>
                <span style={styles.nestedLabel}>Select Factory Upgrades (+ Adds Value)</span>
                <div style={styles.chipClusterRow}>
                  {premiumOptionsList.map(opt => {
                    const isChecked = !!vehicle.options?.[opt.key];
                    return (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => toggleOption(vehicle, opt.key)}
                        style={{
                          ...styles.matrixChipButton,
                          borderColor: isChecked ? 'var(--green)' : 'var(--ink-10)',
                          backgroundColor: isChecked ? 'var(--green-light)' : 'var(--cream)',
                          color: isChecked ? 'var(--green-dark)' : 'var(--ink-60)',
                        }}
                      >
                        {isChecked ? '✓' : '+'} {opt.label} <span style={styles.valueTrackText}>(+${opt.value})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CHIPS SEGMENT B: DEDUCTION MATRIX LOGS */}
              <div style={{ marginTop: '20px' }}>
                <span style={styles.nestedLabel}>Log Wear, Defects & Damages (- Deducts Value)</span>
                <div style={styles.chipClusterRow}>
                  {wearAndTearList.map(defect => {
                    const isChecked = !!vehicle.defects?.[defect.key];
                    return (
                      <button
                        key={defect.key}
                        type="button"
                        onClick={() => toggleDefect(defect.key ? vehicle : vehicle, defect.key)}
                        style={{
                          ...styles.matrixChipButton,
                          borderColor: isChecked ? '#d90429' : 'var(--ink-10)',
                          backgroundColor: isChecked ? '#fdf0f0' : 'var(--cream)',
                          color: isChecked ? '#d90429' : 'var(--ink-60)',
                        }}
                      >
                        {isChecked ? '⚠️' : '○'} {defect.label} <span style={styles.valueTrackText}>(-${defect.deduction})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Nav Actions Footer */}
      <div style={styles.actionFooter}>
        <button type="button" onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>
          ← Back to Logistics
        </button>
        <button type="button" onClick={onNext} className="btn-primary" style={{ width: 'auto', padding: '12px 35px' }}>
          Save & Proceed to Media Vault →
        </button>
      </div>
    </div>
  );
}

const styles = {
  specCard: {
    border: '1px solid var(--ink-10)',
    borderRadius: '8px',
    padding: '24px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 12px rgba(0,0,0,0.01)'
  },
  specHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid var(--ink-10)',
    paddingBottom: '14px'
  },
  badge: {
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--gold)'
  },
  liveValueBadge: {
    backgroundColor: 'var(--ink)',
    color: '#ffffff',
    padding: '8px 16px',
    borderRadius: '6px',
    textAlign: 'right',
    minWidth: '130px'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  nestedLabel: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--ink-60)',
    display: 'block',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
  },
  chipClusterRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  matrixChipButton: {
    padding: '10px 14px',
    borderRadius: '6px',
    border: '1px solid',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '12px',
    fontWeight: '500',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    transition: 'all 0.15s ease'
  },
  valueTrackText: {
    fontSize: '11px',
    opacity: 0.7,
    fontWeight: '400'
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