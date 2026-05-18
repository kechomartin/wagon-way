import React from 'react';

export default function Step2_VehicleSpecs({ data, update, onNext, onPrev }) {
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  
  // Guard fallback wrapper array to prevent empty reading crashes
  const vehicleList = data?.vehicles || [];

  // Helper function to safely update a specific attribute on a specific vehicle index card
  const updateVehicleSpec = (id, key, value) => {
    const updatedVehicles = vehicleList.map((v) => {
      if (v.id === id) return { ...v, [key]: value };
      return v;
    });
    update({ vehicles: updatedVehicles });
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>
        Asset Appraisal Profile Matrix
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>
        Provide condition ratings and core spec parameters for each vehicle in your active layout manifest.
      </p>

      {/* Dynamic Mapping List Container */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {vehicleList.map((vehicle, index) => (
          <div key={vehicle.id} style={styles.specCard}>
            <div style={styles.specHeader}>
              <span style={styles.badge}>Asset Profile #{index + 1}</span>
              <span style={styles.labelPreview}>
                {vehicle.makeModel || 'Incomplete Configuration'}
              </span>
            </div>

            <div style={styles.formGrid}>
              {/* Field 1: Static Identifier Reflection */}
              <div className="form-group">
                <label className="form-label">Verify Make, Model & Trim Specs</label>
                <input
                  type="text"
                  className="form-input"
                  value={vehicle.makeModel || ''}
                  onChange={(e) => updateVehicleSpec(vehicle.id, 'makeModel', e.target.value)}
                  placeholder="e.g., 2021 Porsche 911 Carrera S"
                />
              </div>

              {/* Field 2: Production Year Selection */}
              <div className="form-group">
                <label className="form-label">Production Year Identifier</label>
                <input
                  type="number"
                  className="form-input"
                  value={vehicle.vehicleYear || ''}
                  onChange={(e) => updateVehicleSpec(vehicle.id, 'vehicleYear', e.target.value)}
                  placeholder="e.g., 2021"
                />
              </div>
            </div>

            {/* Field 3: Premium Dynamic Chips Selection Row */}
            <div className="form-group" style={{ marginTop: '14px' }}>
              <label className="form-label" style={{ marginBottom: '8px', display: 'block' }}>
                Overall Asset Structural Condition Class
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {conditions.map((rating) => {
                  const isActive = vehicle.conditionRating === rating;
                  return (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => updateVehicleSpec(vehicle.id, 'conditionRating', rating)}
                      style={{
                        ...styles.chipButton,
                        borderColor: isActive ? 'var(--gold)' : 'var(--ink-10)',
                        backgroundColor: isActive ? 'var(--gold-light)' : 'var(--cream)',
                        color: isActive ? 'var(--gold-dark)' : 'var(--ink-60)',
                        fontWeight: isActive ? '600' : '400',
                      }}
                    >
                      {rating}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Nav Actions Bottom Anchors Footer */}
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
    padding: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
  },
  specHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    borderBottom: '1px solid var(--ink-10)',
    paddingBottom: '10px'
  },
  badge: {
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--gold)'
  },
  labelPreview: {
    fontSize: '13px',
    fontWeight: 500,
    color: 'var(--ink-60)',
    fontStyle: 'italic'
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  },
  chipButton: {
    padding: '10px 16px',
    borderRadius: '20px',
    border: '1px solid',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '13px',
    transition: 'all 0.2s ease'
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