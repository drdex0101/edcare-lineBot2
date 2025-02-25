import React from 'react';

const LoadingAnimation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', backgroundColor: '#F3CCD4', width: '100%', height: '100%'}}>
      <div >

      </div>
      <svg className="pulse-animation" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
              <circle cx="24.5" cy="24" r="17" stroke="#252525" strokeWidth="6" />
              <circle cx="24.5" cy="25" r="4" fill="#252525" />
          </g>
      </svg>
      <svg className="pulse-animation" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
              <circle cx="24.5" cy="24" r="15" stroke="#252525" strokeWidth="6" />
              <circle cx="24.5" cy="24" r="21" stroke="#252525" strokeWidth="6" />
              <circle cx="24.5" cy="25" r="2" fill="#252525" />
          </g>
      </svg>
      <svg className="pulse-animation" width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
              <circle cx="24.5" cy="24" r="17" stroke="#252525" strokeWidth="6" />
              <circle cx="24.5" cy="25" r="4" fill="#252525" />
          </g>
      </svg>
      <style>{`
        .pulse-animation {
          animation: pulse 1s ease-in-out infinite;
          width: 49px;
          height: 48px;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LoadingAnimation;
