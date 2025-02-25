
import React, { useState, useRef} from 'react';
import './css/Setting.css';


export default function SettingForNanny() {
    const [isOpen, setIsOpen] = useState(false);
    const settingButtonRef = useRef(null);
    const settingPopupRef = useRef(null);

    const toggleSettingPopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="setting-container">
          <button
            ref={settingButtonRef}
            className="setting-button"
            onClick={toggleSettingPopup}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path opacity="0.4" d="M1.53906 3.61719C1.53906 2.51262 2.43449 1.61719 3.53906 1.61719H8.4624C9.56697 1.61719 10.4624 2.51262 10.4624 3.61719V8.54052C10.4624 9.64509 9.56697 10.5405 8.4624 10.5405H3.53906C2.43449 10.5405 1.53906 9.64509 1.53906 8.54052V3.61719Z" fill="#252525"/>
                <path opacity="0.4" d="M13.4609 15.5391C13.4609 14.4345 14.3564 13.5391 15.4609 13.5391H20.3843C21.4888 13.5391 22.3843 14.4345 22.3843 15.5391V20.4624C22.3843 21.567 21.4888 22.4624 20.3843 22.4624H15.4609C14.3564 22.4624 13.4609 21.567 13.4609 20.4624V15.5391Z" fill="#252525"/>
                <circle cx="17.9226" cy="6.07885" r="4.46166" fill="#252525"/>
                <circle cx="6.00073" cy="18.0007" r="4.46166" fill="#252525"/>
            </svg>
          </button>
          {isOpen && (
            <div ref={settingPopupRef} className="setting-popup">
              <div className="setting-layout">
                <div 
                  onClick={() => toggleSort('time')}
                  onChange={() => toggleSort('time')}
                >
                  上架時間（新 ⭢ 舊）
                </div>
                <div 
                  onClick={() => toggleSort('rating')}
                  onChange={() => toggleSort('rating')}
                >
                  保母評價( 5 ⭢ 0 )
                </div>
              </div>
            </div>
          )}
        </div>
      );
}

