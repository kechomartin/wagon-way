import React from 'react';

export default function Step2_VehicleSpecs({ data, update, onNext, onPrev }) {
  const conditions = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '6px' }}>Vehicle Appraisal Specifications</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>Provide accurate identifiers to scale up your manifest valuation.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label">Vehicle Make & Model</label>
          <input 
            type="text" 
            className="form-input" 
            value={data.makeModel}
            onChange={(e) => update({ makeModel: e.target.value })}
            placeholder="e.g., 2021 Porsche 911 Carrera" 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Production Year</label>
          <input 
            type="number" 
            className="form-input" 
            value={data.vehicleYear}
            onChange={(e) => update({ vehicleYear: e.target.value })}
            placeholder="2021" 
          />
        </div>

        {/* Condition State Selection Pills */}
        <div className="form-group">
          <label className="form-label">Overall Asset Condition Class</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
            {conditions.map((rating) => (
              <button
                key={rating}
                type="button"
                onClick={() => update({ conditionRating: rating })}
                style={{
                  padding: '10px 18px',
                  borderRadius: '20px',
                  border: data.conditionRating === rating ? '2px solid var(--gold)' : '1px solid var(--ink-10)',
                  backgroundColor: data.conditionRating === rating ? 'var(--gold-light)' : 'var(--cream)',
                  color: data.conditionRating === rating ? 'var(--gold-dark)' : 'var(--ink-60)',
                  cursor: 'pointer',
                  fontWeight: data.conditionRating === rating ? '600' : '400',
                  fontFamily: 'inherit',
                  transition: 'all 0.2s'
                }}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>← Previous Step</button>
          <button onClick={onNext} className="btn-primary" style={{ width: 'auto', padding: '12px 30px' }}>Save & Advance →</button>
        </div>
      </div>
    </div>
  );
}