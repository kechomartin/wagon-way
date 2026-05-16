import React from 'react';

export default function Step1_Welcome({ data, update, onNext }) {
  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '6px' }}>Logistics & Contact Allocation</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>Let's kickstart your car valuation sequence profile details.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label">Full Name of Asset Principal</label>
          <input 
            type="text" 
            className="form-input" 
            value={data.fullName}
            onChange={(e) => update({ fullName: e.target.value })}
            placeholder="Johnathan Doe" 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Direct Contact Phone Line</label>
          <input 
            type="tel" 
            className="form-input" 
            value={data.phone}
            onChange={(e) => update({ phone: e.target.value })}
            placeholder="+1 (555) 000-0000" 
          />
        </div>

        {/* Dynamic Horizontal Select Grid */}
        <div className="form-group">
          <label className="form-label">Primary Fleet Profile Type</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '4px' }}>
            {['Luxury Car', 'Commercial Truck', 'SUV / Fleet'].map((type) => (
              <div 
                key={type}
                onClick={() => update({ vehicleType: type })}
                style={{
                  padding: '16px',
                  borderRadius: '8px',
                  border: data.vehicleType === type ? '2px solid var(--gold)' : '1px solid var(--ink-30)',
                  backgroundColor: data.vehicleType === type ? 'var(--cream)' : 'var(--paper)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>

        {/* Operational Fleet Counter Multiplier */}
        <div className="form-group" style={{ marginTop: '10px' }}>
          <label className="form-label">Total Number of Vehicles for Pipeline Appraisal</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '6px' }}>
            <button 
              type="button" 
              className="btn-secondary" 
              style={{ padding: '8px 20px', fontSize: '18px', fontWeight: 'bold' }}
              onClick={() => update({ totalVehicles: Math.max(1, data.totalVehicles - 1) })}
            >-</button>
            <span style={{ fontSize: '18px', fontWeight: 'bold', width: '30px', textAlign: 'center' }}>{data.totalVehicles}</span>
            <button 
              type="button" 
              className="btn-secondary" 
              style={{ padding: '8px 20px', fontSize: '18px', fontWeight: 'bold' }}
              onClick={() => update({ totalVehicles: data.totalVehicles + 1 })}
            >+</button>
          </div>
        </div>

        <button 
          onClick={onNext} 
          className="btn-primary" 
          style={{ width: 'auto', alignSelf: 'flex-end', padding: '12px 30px', marginTop: '20px' }}
        >
          Save & Proceed Setup →
        </button>
      </div>
    </div>
  );
}