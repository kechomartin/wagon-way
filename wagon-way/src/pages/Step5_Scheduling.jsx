import React, { useState } from 'react';

export default function Step5_Scheduling({ data, update, onPrev }) {
  // Local active trackers for premium component rendering
  const [currentMonth, setCurrentMonth] = useState('May 2026');
  const [selectedDateState, setSelectedDateState] = useState(data.selectedDate || '');
  const [selectedTimeState, setSelectedTimeState] = useState(data.selectedTimeSlot || '');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Custom curated calendar matrix array matching your UI screenshot structures
  const calendarDays = [
    { day: 27, status: 'past' }, { day: 28, status: 'past' }, { day: 29, status: 'past' }, { day: 30, status: 'past' },
    { day: 1, status: 'available' }, { day: 2, status: 'available' }, { day: 3, status: 'weekend' }, { day: 4, status: 'weekend' },
    { day: 5, status: 'available' }, { day: 6, status: 'booked' }, { day: 7, status: 'available' }, { day: 8, status: 'available' },
    { day: 9, status: 'available' }, { day: 10, status: 'weekend' }, { day: 11, status: 'weekend' }, { day: 12, status: 'available' },
    { day: 13, status: 'available' }, { day: 14, status: 'available' }, { day: 15, status: 'booked' }, { day: 16, status: 'available' },
    { day: 17, status: 'weekend' }, { day: 18, status: 'available', isToday: true }, { day: 19, status: 'available' }, { day: 20, status: 'available' },
    { day: 21, status: 'available' }, { day: 22, status: 'available' }, { day: 23, status: 'weekend' }, { day: 24, status: 'weekend' },
    { day: 25, status: 'available' }, { day: 26, status: 'available' }, { day: 27, status: 'available' }, { day: 28, status: 'available' },
    { day: 29, status: 'available' }, { day: 30, status: 'weekend' }, { day: 31, status: 'weekend' }
  ];

  // Time arrays that filter responsively
  const timeSlots = [
    { id: 't1', label: '08:30 AM', period: 'Morning Slots' },
    { id: 't2', label: '10:00 AM', period: 'Morning Slots' },
    { id: 't3', label: '11:30 AM', period: 'Morning Slots' },
    { id: 't4', label: '01:00 PM', period: 'Afternoon Slots' },
    { id: 't5', label: '02:30 PM', period: 'Afternoon Slots' },
    { id: 't6', label: '04:00 PM', period: 'Afternoon Slots' }
  ];

  const handleDateSelect = (dayObj) => {
    if (dayObj.status !== 'available') return; // Restrict past sessions or weekend slots
    const formattedDate = `${currentMonth} ${dayObj.day}`;
    setSelectedDateState(formattedDate);
    update({ selectedDate: formattedDate });
  };

  const handleTimeSelect = (slotLabel) => {
    setSelectedTimeState(slotLabel);
    update({ selectedTimeSlot: slotLabel });
  };

  const executeFinalSubmission = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("FINALIZED PIPELINE DATA MANIFEST DEPLOYED:", data);
  };

  if (isSubmitted) {
    return (
      <div className="dashboard-card" style={{ textAlign: 'center', padding: '50px 30px' }}>
        <div style={{ fontSize: '50px', color: 'var(--green)', marginBottom: '16px' }}>🎉</div>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', marginBottom: '8px' }}>
          Manifest Successfully Deployed
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--ink-60)', maxWidth: '500px', margin: '0 auto 30px' }}>
          Your multi-asset procurement pipeline configuration has been serialized and locked. An expert validation marshal will meet you at your inspection slot coordinates.
        </p>
        <div style={styles.successReceipt}>
          <div><strong>Principal Representative:</strong> {data.fullName || 'Martin Kecho'}</div>
          <div><strong>Registered Fleet Volume:</strong> {data.vehicles?.length || 0} Assets</div>
          <div><strong>Committed Pipeline Slot:</strong> {selectedDateState} at {selectedTimeState}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-card">
      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '4px' }}>
        Pipeline Slot Assignment & Allocation
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--ink-60)', marginBottom: '24px' }}>
        Secure an expert appraisal coordinator slot to run terminal validation checkmarks across your properties.
      </p>

      {/* Main Structural Dual Columns Framework Layout */}
      <div style={styles.schedulerGrid}>
        
        {/* COLUMN 1: CALENDAR VIEW COMPONENT */}
        <div style={styles.calendarColumn}>
          <div style={styles.calendarHeader}>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{currentMonth}</span>
            <div style={{ display: 'flex', gap: '5px' }}>
              <button type="button" style={styles.navArrow} disabled>‹</button>
              <button type="button" style={styles.navArrow} disabled>›</button>
            </div>
          </div>

          {/* Weekday Abbreviations Row */}
          <div style={styles.weekdaysRow}>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(w => (
              <div key={w} style={styles.weekdayCell}>{w}</div>
            ))}
          </div>

          {/* 35-Block Calendar Cells Matrix Map */}
          <div style={styles.daysMatrixGrid}>
            {calendarDays.map((d, index) => {
              const fullDateString = `${currentMonth} ${d.day}`;
              const isChosen = selectedDateState === fullDateString && d.status === 'available';
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateSelect(d)}
                  disabled={d.status !== 'available'}
                  style={{
                    ...styles.dayCellButton,
                    backgroundColor: isChosen ? 'var(--gold)' : d.isToday ? 'var(--gold-light)' : '#ffffff',
                    color: isChosen ? '#ffffff' : d.status === 'available' ? 'var(--ink)' : 'var(--ink-20)',
                    borderColor: isChosen ? 'var(--gold)' : d.isToday ? 'var(--gold)' : 'transparent',
                    cursor: d.status === 'available' ? 'pointer' : 'not-allowed',
                    fontWeight: d.isToday || isChosen ? '600' : '400'
                  }}
                >
                  {d.day}
                </button>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: ACTIVE AVAILABILITY CHIP ROW SLOTS */}
        <div style={styles.slotsColumn}>
          <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--ink)', marginBottom: '12px' }}>
            {selectedDateState ? `Available Windows for ${selectedDateState}` : 'Select an Inspection Date'}
          </h3>

          {selectedDateState ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span style={styles.periodHeader}>Operational Windows</span>
                <div style={styles.chipsWrapperGrid}>
                  {timeSlots.map((slot) => {
                    const isTimeChosen = selectedTimeState === slot.label;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => handleTimeSelect(slot.label)}
                        style={{
                          ...styles.timeChip,
                          borderColor: isTimeChosen ? 'var(--gold)' : 'var(--ink-10)',
                          backgroundColor: isTimeChosen ? 'var(--gold-light)' : '#ffffff',
                          color: isTimeChosen ? 'var(--gold-dark)' : 'var(--ink-60)',
                          fontWeight: isTimeChosen ? '600' : '400'
                        }}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.emptySlotsCallout}>
              Please select an active date node from the calendar array manifest to review available hours.
            </div>
          )}
        </div>

      </div>

      {/* Nav Actions Bottom Frame */}
      <div style={styles.actionFooter}>
        <button type="button" onClick={onPrev} className="btn-secondary" style={{ padding: '12px 24px' }}>
          ← Back to Signature
        </button>
        <button 
          type="button" 
          onClick={executeFinalSubmission}
          disabled={!selectedDateState || !selectedTimeState}
          className="btn-primary" 
          style={{ 
            width: 'auto', 
            padding: '12px 40px',
            backgroundColor: (selectedDateState && selectedTimeState) ? 'var(--green)' : 'var(--ink-20)',
            borderColor: (selectedDateState && selectedTimeState) ? 'var(--green)' : 'var(--ink-20)',
            opacity: (!selectedDateState || !selectedTimeState) ? 0.6 : 1,
            cursor: (!selectedDateState || !selectedTimeState) ? 'not-allowed' : 'pointer'
          }}
        >
          Complete Deployment Manifest ✓
        </button>
      </div>
    </div>
  );
}

const styles = {
  schedulerGrid: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '30px',
    marginTop: '10px'
  },
  calendarColumn: {
    border: '1px solid var(--ink-10)',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#ffffff'
  },
  calendarHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  navArrow: {
    background: 'none',
    border: '1px solid var(--ink-10)',
    borderRadius: '4px',
    width: '28px',
    height: '28px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--ink-40)',
    cursor: 'not-allowed'
  },
  weekdaysRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    textAlign: 'center',
    marginBottom: '10px',
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--ink-40)'
  },
  weekdayCell: {
    padding: '6px 0'
  },
  daysMatrixGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gap: '6px',
    textAlign: 'center'
  },
  dayCellButton: {
    background: 'none',
    border: '1px solid',
    borderRadius: '6px',
    height: '38px',
    fontFamily: 'inherit',
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s ease'
  },
  slotsColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  periodHeader: {
    fontSize: '11px',
    textTransform: 'uppercase',
    color: 'var(--ink-40)',
    letterSpacing: '0.5px',
    display: 'block',
    marginBottom: '10px'
  },
  chipsWrapperGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px'
  },
  timeChip: {
    border: '1px solid',
    borderRadius: '6px',
    padding: '12px',
    fontSize: '13px',
    textAlign: 'center',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s'
  },
  emptySlotsCallout: {
    border: '1px dashed var(--ink-10)',
    borderRadius: '8px',
    padding: '30px 20px',
    textAlign: 'center',
    color: 'var(--ink-40)',
    fontSize: '13px',
    backgroundColor: 'var(--paper)',
    lineHeight: '1.5',
    marginTop: '5px'
  },
  successReceipt: {
    backgroundColor: 'var(--cream)',
    border: '1px solid var(--gold-light)',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '450px',
    margin: '0 auto',
    textAlign: 'left',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    lineHeight: '1.5'
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