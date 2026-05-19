import React, { useState } from 'react';

// FIXED: Added 'default' keyword to match your App.jsx import statement
export default function ManifestSidebar({ data }) {
  const vehicles = data?.vehicles || [];
  const [expandedVehicleId, setExpandedVehicleId] = useState(null);

  // Dynamic label dictionary mapping system keys to human-readable text
  const itemLabels = {
    sunroof: 'Panoramic Glass Sunroof (+ $850)',
    premiumAudio: 'Burmester Audio Matrix (+ $1,200)',
    driverAssist: 'Adaptive Autopilot Suite (+ $1,500)',
    leather: 'Nappa Leather Interior (+ $950)',
    windshield: 'Deep Windshield Crack (- $450)',
    scratches: 'Body Panel Scratches (- $300)',
    wheels: 'Curbed Alloy Wheels (- $250)',
    tires: 'Low Tire Tread Depth (- $600)'
  };

  // CALCULATE FLEET FINANCIALS
  const computeFleetFinancials = () => {
    let grandTotal = 0;
    let activeVehiclesCount = 0;

    vehicles.forEach(vehicle => {
      if (!vehicle.makeModel) return; // Skip untouched empty templates
      activeVehiclesCount++;
      
      if (vehicle.calculatedValue) {
        grandTotal += vehicle.calculatedValue;
      } else {
        // Fallback baseline safety formula matching Step 2 rules
        let base = 35000 - ((2026 - (parseInt(vehicle.vehicleYear) || 2022)) * 2500);
        const multi = { Excellent: 1.15, 'Very Good': 1.05, Good: 1.00, Fair: 0.85, Poor: 0.60 }[vehicle.conditionRating || 'Good'];
        grandTotal += Math.round(base * multi);
      }
    });

    return { grandTotal, activeVehiclesCount };
  };

  const { grandTotal, activeVehiclesCount } = computeFleetFinancials();

  const toggleAccordion = (id) => {
    setExpandedVehicleId(expandedVehicleId === id ? null : id);
  };

  return (
    <div style={styles.sidebarContainer}>
      {/* BRAND & METRIC STATUS CAPSULE */}
      <div style={styles.brandBlock}>
        <span style={styles.brandTitle}>WagonWay Ledger</span>
        <div style={styles.statusBadge}>Live Evaluation Channels Active</div>
      </div>

      {/* CORE FINANCIALS PANEL */}
      <div style={styles.financialCard}>
        <span style={styles.financialLabel}>Guaranteed Valuation Aggregate</span>
        <div style={styles.grandPriceText}>
          ${grandTotal > 0 ? grandTotal.toLocaleString() : '0.00'}
        </div>
        <div style={styles.metaRow}>
          <span>Active Asset Load:</span>
          <strong>{activeVehiclesCount} {activeVehiclesCount === 1 ? 'Vehicle' : 'Vehicles'}</strong>
        </div>
      </div>

      <hr style={styles.divider} />

      {/* DYNAMIC ITEMIZED ACCORDION MATRIX LIST */}
      <h4 style={styles.sectionTitle}>Manifest Allocation Details</h4>
      
      {activeVehiclesCount === 0 ? (
        <div style={styles.emptyPrompt}>
          Awaiting intake profile streaming configurations... Scan a vehicle VIN to initialize this ledger workspace.
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {vehicles.map((vehicle, index) => {
            if (!vehicle.makeModel) return null;
            const isExpanded = expandedVehicleId === vehicle.id;
            
            const selectedOptions = Object.keys(vehicle.options || {}).filter(k => vehicle.options[k]);
            const selectedDefects = Object.keys(vehicle.defects || {}).filter(k => vehicle.defects[k]);
            const hasAdjustments = selectedOptions.length > 0 || selectedDefects.length > 0;

            return (
              <div key={vehicle.id} style={styles.accordionCard}>
                {/* Accordion Toggle Header */}
                <div onClick={() => toggleAccordion(vehicle.id)} style={styles.accordionHeader}>
                  <div>
                    <div style={styles.vehicleIndexName}>
                      Asset {index + 1}: {vehicle.makeModel.split(' ').slice(1).join(' ')}
                    </div>
                    <div style={styles.vehicleMetaSubtext}>
                      {vehicle.vehicleYear || '2022'} • {vehicle.conditionRating || 'Good'} Grade
                    </div>
                  </div>
                  <div style={styles.rightHeaderBlock}>
                    <span style={styles.miniPrice}>
                      ${(vehicle.calculatedValue || 35000).toLocaleString()}
                    </span>
                    <span style={styles.arrowIcon}>{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Expanding Itemized Panel Details */}
                {isExpanded && (
                  <div style={styles.accordionBody}>
                    {!hasAdjustments ? (
                      <div style={styles.noAdjustmentsText}>
                        Baseline structural target value active. No custom additions or damage items checked.
                      </div>
                    ) : (
                      <ul style={styles.ledgerList}>
                        {selectedOptions.map(key => (
                          <li key={key} style={{ ...styles.ledgerItem, color: 'var(--green-dark)' }}>
                            <span>{itemLabels[key] || key}</span>
                            <span>Add</span>
                          </li>
                        ))}
                        {selectedDefects.map(key => (
                          <li key={key} style={{ ...styles.ledgerItem, color: '#d90429' }}>
                            <span>{itemLabels[key] || key}</span>
                            <span>Deduct</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* FOOTER VERIFICATION SIGNATURE NOTATION */}
      <div style={styles.sidebarFooter}>
        <div style={styles.footerLine}>
          <span>Signatory Status:</span>
          <strong style={{ color: data?.digitalSignatureUrl ? 'var(--green-dark)' : 'var(--gold-dark)' }}>
            {data?.digitalSignatureUrl ? 'Legally Executed ✓' : 'Awaiting Execution'}
          </strong>
        </div>
        {data?.selectedDate && (
          <div style={{ ...styles.footerLine, marginTop: '4px' }}>
            <span>Inspection Slot:</span>
            <span style={{ fontWeight: 500 }}>{data.selectedDate} @ {data.selectedTimeSlot}</span>
          </div>
        )}
      </div>
    </div>
  );
}

// INLINE STYLES SHEET
const styles = {
  sidebarContainer: {
    backgroundColor: '#ffffff',
    borderLeft: '1px solid var(--ink-10)',
    padding: '24px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflowY: 'auto'
  },
  brandBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  brandTitle: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'var(--ink)'
  },
  statusBadge: {
    backgroundColor: 'var(--cream)',
    border: '1px solid var(--gold-light)',
    color: 'var(--gold-dark)',
    fontSize: '9px',
    padding: '4px 8px',
    borderRadius: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '0.3px'
  },
  financialCard: {
    backgroundColor: 'var(--ink)',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
  },
  financialLabel: {
    fontSize: '11px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    opacity: 0.7,
    display: 'block',
    marginBottom: '4px'
  },
  grandPriceText: {
    fontSize: '28px',
    fontWeight: '700',
    fontFamily: 'monospace',
    letterSpacing: '-0.5px',
    marginBottom: '12px'
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '10px'
  },
  divider: {
    border: 'none',
    borderTop: '1px solid var(--ink-10)',
    margin: '20px 0'
  },
  sectionTitle: {
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--ink-40)',
    marginBottom: '12px',
    fontWeight: 700
  },
  emptyPrompt: {
    border: '1px dashed var(--ink-10)',
    padding: '20px',
    borderRadius: '6px',
    fontSize: '12px',
    color: 'var(--ink-40)',
    lineHeight: '1.5',
    backgroundColor: 'var(--paper)',
    textAlign: 'center'
  },
  accordionCard: {
    border: '1px solid var(--ink-10)',
    borderRadius: '6px',
    backgroundColor: 'var(--paper)',
    overflow: 'hidden',
    transition: 'all 0.2s'
  },
  accordionHeader: {
    padding: '12px 14px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: '#ffffff'
  },
  vehicleIndexName: {
    fontSize: '13px',
    fontWeight: '600',
    color: 'var(--ink)'
  },
  vehicleMetaSubtext: {
    fontSize: '11px',
    color: 'var(--ink-40)',
    marginTop: '2px'
  },
  rightHeaderBlock: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  miniPrice: {
    fontSize: '13px',
    fontWeight: '700',
    fontFamily: 'monospace'
  },
  arrowIcon: {
    fontSize: '10px',
    color: 'var(--ink-30)'
  },
  accordionBody: {
    padding: '12px 14px',
    borderTop: '1px solid var(--ink-10)',
    backgroundColor: 'var(--paper)'
  },
  noAdjustmentsText: {
    fontSize: '11px',
    color: 'var(--ink-40)',
    fontStyle: 'italic',
    lineHeight: '1.4'
  },
  ledgerList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  ledgerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '11px',
    fontWeight: '500'
  },
  sidebarFooter: {
    marginTop: 'auto',
    backgroundColor: 'var(--cream)',
    border: '1px solid var(--gold-light)',
    borderRadius: '6px',
    padding: '12px 14px',
    fontSize: '12px'
  },
  footerLine: {
    display: 'flex',
    justifyContent: 'space-between',
    color: 'var(--ink-60)'
  }
};