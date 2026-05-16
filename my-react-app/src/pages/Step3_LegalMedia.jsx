import React, { useRef } from 'react';

export default function Step3_LegalMedia({ data, update, onNext, onPrev }) {
  const photoInputRef = useRef(null);
  const docInputRef = useRef(null);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      update({ uploadedPhotos: [...data.uploadedPhotos, file.name] });
    }
  };

  const handleDocUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      update({ uploadedDocs: [...data.uploadedDocs, file.name] });
    }
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '6px' }}>Vault Media & Proof Intake</h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>Upload all structural verification file formats.</p>

      <div className="dashboard-grid">
        {/* Photos Collection Card */}
        <div style={{ border: '1px solid var(--ink-10)', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', marginBottom: '8px' }}>Asset Manifest Images</h3>
          <input type="file" ref={photoInputRef} style={{ display: 'none' }} onChange={handlePhotoUpload} accept="image/*" />
          <div className="dropzone-placeholder" onClick={() => photoInputRef.current.click()} style={{ padding: '30px 10px' }}>
            <span>Click to upload exterior/interior captures</span>
          </div>
          {data.uploadedPhotos.length > 0 && (
            <div style={{ marginTop: '12px', fontSize: '13px' }}>
              <strong>Uploaded:</strong> {data.uploadedPhotos.map((p, i) => <div key={i} style={{ color: 'var(--green)' }}>✓ {p}</div>)}
            </div>
          )}
        </div>

        {/* Documentation Card */}
        <div style={{ border: '1px solid var(--ink-10)', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', marginBottom: '8px' }}>Ownership Instruments</h3>
          <input type="file" ref={docInputRef} style={{ display: 'none' }} onChange={handleDocUpload} accept=".pdf" />
          <div className="dropzone-placeholder" onClick={() => docInputRef.current.click()} style={{ padding: '30px 10px' }}>
            <span>Click to attach validation titles / PDFs</span>
          </div>
          {data.uploadedDocs.length > 0 && (
            <div style={{ marginTop: '12px', fontSize: '13px' }}>
              <strong>Uploaded:</strong> {data.uploadedDocs.map((d, i) => <div key={i} style={{ color: 'var(--green)' }}>📄 {d}</div>)}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>← Back</button>
        <button onClick={onNext} className="btn-primary" style={{ width: 'auto', padding: '12px 30px' }}>Proceed to Signing →</button>
      </div>
    </div>
  );
}