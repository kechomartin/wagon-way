import React, { useRef } from 'react';

export default function Step3_LegalMedia({ data, update, onNext, onPrev }) {
  const vehicleList = data?.vehicles || [];

  const photoTargets = [
    { key: 'front', label: 'Front Profile Capture', spec: 'Clear 3/4 angle view' },
    { key: 'rear', label: 'Rear & Exhaust View', spec: 'Straight-on level view' },
    { key: 'interior', label: 'Cabin & Dashboard', spec: 'Front seats perspective' },
    { key: 'odometer', label: 'Odometer Cluster Scan', spec: 'Showing current mileage readable' }
  ];

  // A registry object to keep track of file input references dynamically
  const fileInputRefs = useRef({});
  const docInputRef = useRef(null);

  // Generates or reads a unique key for each file input element in memory
  const getInputRefKey = (vehicleId, targetKey) => `${vehicleId}-${targetKey}`;

  // 1. NATIVE FILE EXPLORER TRIGGER
  const triggerFileBrowser = (vehicleId, targetKey) => {
    const refKey = getInputRefKey(vehicleId, targetKey);
    if (fileInputRefs.current[refKey]) {
      fileInputRefs.current[refKey].click(); // Pops up your local computer folders!
    }
  };

  // 2. FILE SELECTION PROCESSOR
  const handleRealFileChange = (vehicleId, targetKey, e) => {
    const file = e.target.files[0];
    if (!file) return;

    const existingPhotos = data.uploadedPhotos || [];
    
    // Filter out previous uploads for this specific slot if the user is changing it
    const filteredPhotos = existingPhotos.filter(
      p => !(p.vehicleId === vehicleId && p.targetKey === targetKey)
    );

    // Save the real filename and size metric into the global state array
    const updatedPhotos = [
      ...filteredPhotos,
      { 
        vehicleId, 
        targetKey, 
        filename: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB' // Converts bytes to MB
      }
    ];

    update({ uploadedPhotos: updatedPhotos });
  };

  const handleRealDocChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      update({ uploadedDocs: [file.name] });
    }
  };

  const clearPhotoSlot = (vehicleId, targetKey, e) => {
    e.stopPropagation();
    const existingPhotos = data.uploadedPhotos || [];
    const updatedPhotos = existingPhotos.filter(
      p => !(p.vehicleId === vehicleId && p.targetKey === targetKey)
    );
    update({ uploadedPhotos: updatedPhotos });
    
    // Clear the native input value so the same file can be uploaded again if needed
    const refKey = getInputRefKey(vehicleId, targetKey);
    if (fileInputRefs.current[refKey]) fileInputRefs.current[refKey].value = '';
  };

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>
        Vault Media Asset & Proof Intake
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>
        Upload structural verification captures and legal ownership instruments assigned to your fleet manifest.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {vehicleList.map((vehicle, index) => (
          <div key={vehicle.id} style={styles.vehicleVaultBlock}>
            <div style={styles.vaultBlockHeader}>
              <span style={styles.assetBadge}>Media Manifest #{index + 1}</span>
              <span style={styles.carNamePreview}>{vehicle.makeModel || 'Unconfigured Asset Model'}</span>
            </div>

            <div style={styles.photoGrid}>
              {photoTargets.map((target) => {
                const uploadRecord = (data.uploadedPhotos || []).find(
                  (p) => p.vehicleId === vehicle.id && p.targetKey === target.key
                );

                const refKey = getInputRefKey(vehicle.id, target.key);

                return (
                  <div key={target.key} style={{ position: 'relative', width: '100%' }}>
                    
                    {/* HIDDEN INVISIBLE FILE INPUT THREADED VIA REF REGISTRY */}
                    <input 
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      ref={el => fileInputRefs.current[refKey] = el}
                      onChange={(e) => handleRealFileChange(vehicle.id, target.key, e)}
                    />

                    <div 
                      onClick={() => triggerFileBrowser(vehicle.id, target.key)}
                      style={{
                        ...styles.uploadSlotBox,
                        borderColor: uploadRecord ? 'var(--green)' : 'var(--ink-10)',
                        backgroundColor: uploadRecord ? 'var(--green-light)' : 'var(--paper)'
                      }}
                    >
                      {uploadRecord ? (
                        <div style={styles.successStateWrapper}>
                          <div style={{ fontSize: '24px', color: 'var(--green)', marginBottom: '4px' }}>✓</div>
                          <span style={styles.slotLabelText}>{target.label}</span>
                          <span style={styles.filenameText} title={uploadRecord.filename}>
                            {uploadRecord.filename}
                          </span>
                          <span style={{ fontSize: '10px', color: 'var(--ink-40)' }}>{uploadRecord.size}</span>
                          <button 
                            onClick={(e) => clearPhotoSlot(vehicle.id, target.key, e)}
                            style={styles.removeLink}
                          >
                            Remove File
                          </button>
                        </div>
                      ) : (
                        <div style={styles.emptyStateWrapper}>
                          <div style={{ fontSize: '20px', color: 'var(--ink-30)', marginBottom: '6px' }}>📷</div>
                          <span style={styles.slotLabelText}>{target.label}</span>
                          <span style={styles.specSubtext}>{target.spec}</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Ownership Instruments Box */}
        <div style={styles.legalInstrumentSection}>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', marginBottom: '6px' }}>
            Ownership Verification Instruments
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--ink-60)', marginBottom: '14px' }}>
            Attach validation registration certificates, titles or legal corporate fleet permissions (.PDF formats).
          </p>

          <input 
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            ref={docInputRef}
            onChange={handleRealDocChange}
          />

          <div 
            onClick={() => docInputRef.current.click()}
            style={{
              ...styles.documentDropzone,
              borderColor: data.uploadedDocs?.length > 0 ? 'var(--green)' : 'var(--ink-30)',
              backgroundColor: data.uploadedDocs?.length > 0 ? 'var(--green-light)' : 'var(--cream)'
            }}
          >
            {data.uploadedDocs?.length > 0 ? (
              <div style={{ color: 'var(--green)', fontWeight: 500, fontSize: '14px' }}>
                📄 Verified Uploaded Document: <span style={{ textDecoration: 'underline' }}>{data.uploadedDocs[0]}</span>
              </div>
            ) : (
              <div style={{ color: 'var(--ink-60)', fontSize: '14px' }}>
                Click here to choose your local validation PDF instrument certificate (Max 25MB)
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={styles.actionFooter}>
        <button type="button" onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>
          ← Back to Specs
        </button>
        <button type="button" onClick={onNext} className="btn-primary" style={{ width: 'auto', padding: '12px 35px' }}>
          Proceed to Legal Signature →
        </button>
      </div>
    </div>
  );
}

const styles = {
  vehicleVaultBlock: { border: '1px solid var(--ink-10)', borderRadius: '8px', padding: '20px', backgroundColor: '#ffffff' },
  vaultBlockHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--ink-10)', paddingBottom: '10px' },
  assetBadge: { fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--gold)' },
  carNamePreview: { fontSize: '13px', fontWeight: 500, color: 'var(--ink-60)' },
  photoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' },
  uploadSlotBox: { border: '1px dashed', borderRadius: '6px', padding: '16px', textAlign: 'center', cursor: 'pointer', minHeight: '135px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transition: 'all 0.2s ease-in-out' },
  emptyStateWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  successStateWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
  slotLabelText: { fontSize: '13px', fontWeight: 600, color: 'var(--ink)' },
  specSubtext: { fontSize: '11px', color: 'var(--ink-40)', marginTop: '2px' },
  filenameText: { fontSize: '11px', color: 'var(--ink-60)', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' },
  removeLink: { background: 'none', border: 'none', color: '#d90429', fontSize: '11px', textDecoration: 'underline', cursor: 'pointer', marginTop: '6px', padding: 0 },
  legalInstrumentSection: { marginTop: '10px', padding: '20px', border: '1px solid var(--ink-10)', borderRadius: '8px', backgroundColor: 'var(--paper)' },
  documentDropzone: { border: '1px dashed', borderRadius: '6px', padding: '20px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' },
  actionFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', borderTop: '1px solid var(--ink-10)', paddingTop: '20px' }
};