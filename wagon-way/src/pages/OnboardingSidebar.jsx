import React from 'react';

export default function OnboardingSidebar({ data, activeStep, goToStep }) {
  
  // Strict defensive fallback array generation to prevent "length of undefined" errors completely
  const vehicleList = data?.vehicles || [];

  // 1. Calculate dynamic values safely based on live array states
  const dynamicBaseFee = vehicleList.length * 250;
  
  // Inspect the first array element safely using optional chaining syntax
  const primaryCondition = vehicleList[0]?.conditionRating || 'Good';
  const conveniencePremium = primaryCondition === 'Excellent' ? 120 : 45;
  
  const grossEstimatedValuation = dynamicBaseFee + conveniencePremium;

  return (
    <div className="dashboard-card" style={{ borderLeft: '4px solid var(--gold)' }}>
      <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', marginBottom: '4px' }}>Submission Manifest</h3>
      <p style={{ fontSize: '13px', color: 'var(--ink-60)', marginBottom: '20px' }}>Real-time valuation calculation parameters</p>
      
      <hr style={{ border: 'none', borderTop: '1px solid var(--ink-10)', margin: '15px 0' }} />

      {/* Reactive Information Layout rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px' }}>
        <div style={styles.metaRow}>
          <span style={{ color: 'var(--ink-60)' }}>Client Principal:</span>
          <span style={{ fontWeight: 500 }}>{data?.fullName || 'Unspecified'}</span>
        </div>
        <div style={styles.metaRow}>
          <span style={{ color: 'var(--ink-60)' }}>Asset Count allocation:</span>
          <span style={{ fontWeight: 500 }}>{vehicleList.length} units registered</span>
        </div>
        <div style={styles.metaRow}>
          <span style={{ color: 'var(--ink-60)' }}>Primary Condition Tier:</span>
          <span className="status-badge" style={{ padding: '2px 8px', fontSize: '12px' }}>{primaryCondition}</span>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--ink-10)', margin: '20px 0' }} />

      {/* Dynamic Price Render block formatted with standard localized thousand separators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '25px' }}>
        <span style={{ fontSize: '14px', fontWeight: 500 }}>Estimated Valuation base:</span>
        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '26px', fontWeight: 600, color: 'var(--green)' }}>
          ${grossEstimatedValuation.toLocaleString()}
        </span>
      </div>

      {/* Side Track Step Jumper Navigation UI */}
      <h4 style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--ink-60)', letterSpacing: '0.5px', marginBottom: '10px' }}>Pipeline Stages Checklist</h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {[
          { id: 1, text: 'Logistics Matrix' },
          { id: 2, text: 'Asset Appraisal Profile' },
          { id: 3, text: 'Vault Media Assets' },
          { id: 4, text: 'Legal Instrument Signing' },
          { id: 5, text: 'Final Inspection Schedule' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => goToStep(item.id)}
            style={{
              ...styles.jumpButton,
              backgroundColor: activeStep === item.id ? 'var(--cream)' : 'transparent',
              color: activeStep === item.id ? 'var(--gold-dark)' : 'var(--ink)',
              fontWeight: activeStep === item.id ? '600' : '400',
            }}
          >
            <span>{activeStep > item.id ? '✓' : '○'} {item.text}</span>
            {activeStep === item.id && <span style={{ fontSize: '10px' }}>ACTIVE</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  jumpButton: {
    width: '100%',
    textAlign: 'left',
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
    fontSize: '13px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.2s'
  }
};