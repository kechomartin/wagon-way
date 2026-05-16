import React from 'react';

export default function Step5_Scheduling({ data, update, onPrev }) {
  const dates = [
    { label: 'Mon, May 18', value: '2026-05-18' },
    { label: 'Tue, May 19', value: '2026-05-19' },
    { label: 'Wed, May 20', value: '2026-05-20' },
    { label: 'Thu, May 21', value: '2026-05-21' }
  ];

  const slots = ['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'];

  const handleCompletePipeline = () => {
    if (!data.selectedDate || !data.selectedTimeSlot) {
      return alert('Please select a date and an inspection slot to finalize.');
    }
    alert(`Success! Pipeline manifest processing finalized for ${data.selectedDate} at ${data.selectedTimeSlot}.`);
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '6px' }}>Schedule Final Validation Field Appraisal</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>Pick an ideal logistical processing entry window.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* Date Selector Matrix */}
        <div>
          <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Target Processing Date</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {dates.map((d) => (
              <div 
                key={d.value}
                onClick={() => update({ selectedDate: d.value })}
                style={{
                  padding: '14px',
                  borderRadius: '6px',
                  border: data.selectedDate === d.value ? '2px solid var(--green)' : '1px solid var(--ink-10)',
                  backgroundColor: data.selectedDate === d.value ? 'var(--green-light)' : 'var(--paper)',
                  color: data.selectedDate === d.value ? 'var(--green)' : 'var(--ink)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s'
                }}
              >
                {d.label}
              </div>
            ))}
          </div>
        </div>

        {/* Time Window Slots */}
        <div>
          <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Available Appraiser Windows</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {slots.map((slot) => (
              <div 
                key={slot}
                onClick={() => update({ selectedTimeSlot: slot })}
                style={{
                  padding: '12px',
                  borderRadius: '6px',
                  border: data.selectedTimeSlot === slot ? '2px solid var(--green)' : '1px solid var(--ink-10)',
                  backgroundColor: data.selectedTimeSlot === slot ? 'var(--green-light)' : 'var(--paper)',
                  color: data.selectedTimeSlot === slot ? 'var(--green)' : 'var(--ink)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontSize: '14px',
                  transition: 'all 0.2s'
                }}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', borderTop: '1px solid var(--ink-10)', paddingTop: '20px' }}>
          <button onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>← Back</button>
          <button 
            onClick={handleCompletePipeline} 
            className="btn-primary" 
            style={{ width: 'auto', padding: '12px 40px', backgroundColor: 'var(--green)' }}
          >
            Finalize Fleet Onboarding ✓
          </button>
        </div>

      </div>
    </div>
  );
}