import React from 'react';

export default function Step4_DigitalSignature({ data, update, onNext, onPrev }) {
  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '6px' }}>Legal Instrument Authentication</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '20px' }}>Please endorse this manifest transaction pipeline below.</p>

      <div style={{ background: 'var(--cream)', padding: '20px', borderRadius: '8px', fontSize: '13px', lineHeight: '1.6', color: 'var(--ink-60)', marginBottom: '20px', borderLeft: '3px solid var(--gold)' }}>
        By executing this signature process, you certify that all information submitted regarding ownership status, structural parameters, and historical asset maintenance logs is explicitly accurate to the best of your operational knowledge.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label">Type Full Legal Name For Digital Endorsement</label>
          <input 
            type="text" 
            className="form-input" 
            value={data.signedName}
            onChange={(e) => update({ signedName: e.target.value })}
            placeholder="Johnathan Doe" 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Digital Signature Area</label>
          <div style={{ height: '140px', background: 'var(--cream)', borderRadius: '6px', border: '1px dashed var(--ink-30)', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'var(--ink-30)', position: 'relative' }}>
            <span style={{ margin: '0 auto', fontSize: '14px' }}>[ Interactive Track Signature Draw Pad Component Ready ]</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>← Back</button>
          <button 
            onClick={onNext} 
            className="btn-primary" 
            style={{ width: 'auto', padding: '12px 30px' }}
            disabled={!data.signedName.trim()}
          >
            Sign & Accept Framework →
          </button>
        </div>
      </div>
    </div>
  );
}