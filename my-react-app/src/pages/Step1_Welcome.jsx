import React from 'react';

export default function Step1_Welcome({ data, update, onNext }) {
  
  // Helper to append a fresh car object row to the form state array
  const addVehicleRow = () => {
    const updatedVehicles = [
      ...data.vehicles,
      { id: Date.now(), makeModel: '', vehicleYear: '', conditionRating: 'Good', mileage: '' }
    ];
    update({ vehicles: updatedVehicles });
  };

  // Helper to remove a specific car row based on its ID
  const removeVehicleRow = (id) => {
    if (data.vehicles.length === 1) return; // Always keep at least one row active
    const updatedVehicles = data.vehicles.filter(v => v.id !== id);
    update({ vehicles: updatedVehicles });
  };

  // Helper to update specific properties of a single vehicle row
  const updateVehicleIndex = (id, key, value) => {
    const updatedVehicles = data.vehicles.map(v => {
      if (v.id === id) return { ...v, [key]: value };
      return v;
    });
    update({ vehicles: updatedVehicles });
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>Logistics & Asset Allocation</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>Register individual assets destined for your pipeline deployment manifest below.</p>

      {/* Dynamic Multi-Car Table Map */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {data.vehicles.map((vehicle, index) => (
          <div key={vehicle.id} style={styles.vehicleRowCard}>
            <div style={styles.rowHeader}>
              <span style={styles.rowBadge}>Asset #{index + 1}</span>
              {data.vehicles.length > 1 && (
                <button 
                  type="button" 
                  onClick={() => removeVehicleRow(vehicle.id)} 
                  style={styles.deleteButton}
                >
                  ✕ Remove Row
                </button>
              )}
            </div>

            <div style={styles.fieldsGrid}>
              <div className="form-group">
                <label className="form-label">Make, Model, & Trim Spec</label>
                <input 
                  type="text" 
                  className="form-input"
                  value={vehicle.makeModel}
                  onChange={(e) => updateVehicleIndex(vehicle.id, 'makeModel', e.target.value)}
                  placeholder="e.g., 2021 Porsche 911 Carrera S"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Current Odometer (Miles)</label>
                <input 
                  type="number" 
                  className="form-input"
                  value={vehicle.mileage}
                  onChange={(e) => updateVehicleIndex(vehicle.id, 'mileage', e.target.value)}
                  placeholder="e.g., 12500"
                />
              </div>
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={addVehicleRow} 
          className="btn-secondary" 
          style={{ alignSelf: 'flex-start', marginTop: '5px', padding: '10px 20px' }}
        >
          + Add Another Vehicle to Manifest
        </button>

        <hr style={{ border: 'none', borderTop: '1px solid var(--ink-10)', margin: '20px 0' }} />

        <button 
          onClick={onNext} 
          className="btn-primary" 
          style={{ width: 'auto', alignSelf: 'flex-end', padding: '12px 35px' }}
        >
          Save & Proceed Setup →
        </button>
      </div>
    </div>
  );
}

const styles = {
  vehicleRowCard: {
    border: '1px solid var(--ink-10)',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#ffffff'
  },
  rowHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  rowBadge: {
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--gold)'
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: '#d90429',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 500
  },
  fieldsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px'
  }
};