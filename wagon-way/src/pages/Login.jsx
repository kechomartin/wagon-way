import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    // Simulate an API network handshake verification delay (1 second)
    setTimeout(() => {
      // Clean, simple authorization logic for demo/dev build environment
      if (email.trim().toLowerCase() === 'admin@wagonway.com' && password === 'admin123') {
        setIsLoading(false);
        onLoginSuccess(); // Unlock the App state and drop user into pipeline dashboard
      } else if (!email || !password) {
        setIsLoading(false);
        setErrorMessage('⚠️ Missing security identifiers. Please complete both fields.');
      } else {
        setIsLoading(false);
        setErrorMessage('⚠️ Invalid entry coordinates. Check your security clearance credentials.');
      }
    }, 1000);
  };

  // Helper shortcut to quickly inject valid sandbox testing keys
  const bypassWithDemoKeys = () => {
    setEmail('admin@wagonway.com');
    setPassword('admin123');
  };

  return (
    <div style={styles.authViewportContainer}>
      <div style={styles.loginCardOuter}>
        
        {/* BRAND IDENTITY SEED */}
        <div style={styles.brandCenterBlock}>
          <div style={styles.luxuryLogoIcon}>W</div>
          <h2 style={styles.brandTitleText}>WagonWay</h2>
          <span style={styles.brandSubtitleText}>Asset Procurement Workspace</span>
        </div>

        {/* SECURITY INPUT INTERFACES */}
        <form onSubmit={handleFormSubmit} style={{ marginTop: '24px' }}>
          <div className="form-group">
            <label className="form-label">Corporate Email Coordinate</label>
            <input 
              type="email" 
              className="form-input"
              placeholder="name@wagonway.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '8px' }}>
            <label className="form-label">Access Encryption Key</label>
            <input 
              type="password" 
              className="form-input"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {/* DYNAMIC ERROR ANCHOR */}
          {errorMessage && (
            <div style={styles.errorAlertPanel}>
              {errorMessage}
            </div>
          )}

          {/* ACTION BUTTON TRIGGER CONTAINER */}
          <button 
            type="submit" 
            className="btn-primary" 
            style={styles.fullWidthSubmitBtn}
            disabled={isLoading}
          >
            {isLoading ? 'Verifying Credentials...' : 'Authenticate Matrix Gateway →'}
          </button>
        </form>

        {/* DEMO SHORTCUT SANDBOX DRAWER */}
        <div style={styles.sandboxTestingDrawer}>
          <div style={styles.sandboxLabelRow}>
            <span>SANDBOX ACCESS TELEMETRY:</span>
            <button 
              type="button" 
              onClick={bypassWithDemoKeys} 
              style={styles.autofillPillBtn}
              title="Autofill mock staging profile credentials"
            >
              ⚡ Inject Test Keys
            </button>
          </div>
          <div style={styles.credsDetailsBox}>
            <div><strong>Email:</strong> admin@wagonway.com</div>
            <div><strong>Pass:</strong> admin123</div>
          </div>
        </div>

      </div>
    </div>
  );
}

// PREMIUM MINIMALIST AUTH THEME STYLES
const styles = {
  authViewportContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: 'var(--cream)', // Pulls directly from your updated index.css tokens
    boxSizing: 'border-box',
    padding: '20px'
  },
  loginCardOuter: {
    backgroundColor: '#ffffff',
    border: '1px solid var(--ink-10)',
    borderRadius: '12px',
    padding: '40px',
    width: '100%',
    maxWidth: '420px',
    boxShadow: '0 10px 40px rgba(26, 26, 26, 0.03)'
  },
  brandCenterBlock: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  luxuryLogoIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '10px',
    backgroundColor: 'var(--ink)',
    color: '#ffffff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '24px',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '14px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  brandTitleText: {
    fontFamily: 'Playfair Display, serif',
    fontSize: '26px',
    fontWeight: 'bold',
    margin: '0 0 4px 0',
    color: 'var(--ink)'
  },
  brandSubtitleText: {
    fontSize: '11px',
    color: 'var(--ink-40)',
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    fontWeight: 600
  },
  errorAlertPanel: {
    backgroundColor: '#fff3f3',
    border: '1px solid #fcc',
    color: '#d90429',
    padding: '10px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
    marginTop: '12px',
    textAlign: 'left'
  },
  fullWidthSubmitBtn: {
    width: '100%',
    marginTop: '20px',
    padding: '14px',
    fontSize: '14px',
    letterSpacing: '0.2px'
  },
  sandboxTestingDrawer: {
    marginTop: '30px',
    borderTop: '1px dashed var(--ink-20)',
    paddingTop: '18px'
  },
  sandboxLabelRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '10px',
    fontWeight: 700,
    color: 'var(--ink-40)',
    letterSpacing: '0.5px'
  },
  autofillPillBtn: {
    background: 'none',
    border: '1px solid var(--gold-light)',
    backgroundColor: 'var(--cream)',
    color: 'var(--gold-dark)',
    fontSize: '10px',
    padding: '4px 8px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.15s ease'
  },
  credsDetailsBox: {
    marginTop: '8px',
    backgroundColor: 'var(--paper)',
    border: '1px solid var(--ink-10)',
    borderRadius: '6px',
    padding: '10px 14px',
    fontSize: '11px',
    fontFamily: 'monospace',
    color: 'var(--ink-60)',
    display: 'flex',
    justifyContent: 'space-between'
  }
};