import { Link, useLocation } from 'react-router-dom';

export default function DevNav() {
  const location = useLocation();

  const navStyle = {
    position: 'fixed' as const,
    bottom: '16px',
    left: '16px',
    zIndex: 9999,
    backgroundColor: '#525557',
    padding: '12px 16px',
    borderRadius: '4px',
    display: 'flex',
    gap: '12px',
    fontFamily: 'monospace',
    fontSize: '11px'
  };

  const linkStyle = {
    color: '#EEEDE1',
    textDecoration: 'none',
    padding: '4px 8px',
    borderRadius: '2px',
    backgroundColor: 'rgba(238, 237, 225, 0.1)'
  };

  const activeLinkStyle = {
    ...linkStyle,
    backgroundColor: '#669CC4'
  };

  return (
    <nav style={navStyle}>
      <Link 
        to="/" 
        style={location.pathname === '/' ? activeLinkStyle : linkStyle}
      >
        Home
      </Link>
      <Link 
        to="/private" 
        style={location.pathname === '/private' ? activeLinkStyle : linkStyle}
      >
        Private
      </Link>
      <Link 
        to="/thank-you" 
        style={location.pathname === '/thank-you' ? activeLinkStyle : linkStyle}
      >
        Thank You
      </Link>
    </nav>
  );
}
