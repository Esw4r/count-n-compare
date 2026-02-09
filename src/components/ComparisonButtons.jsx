import React from 'react';
import './ComparisonButtons.css';

function ComparisonButtons({ onSelect, selectedAnswer, disabled }) {
    const buttons = [
        { symbol: '<', label: 'Less Than', value: 'less' },
        { symbol: '=', label: 'Equal To', value: 'equal' },
        { symbol: '>', label: 'Greater Than', value: 'greater' }
    ];

    return (
        <div className="comparison-buttons">
            <h3 className="comparison-title">Which is correct?</h3>
            <div className="buttons-container">
                {buttons.map(({ symbol, label, value }) => (
                    <button
                        key={value}
                        className={`comparison-btn ${selectedAnswer === value ? 'selected' : ''}`}
                        onClick={() => onSelect(value)}
                        disabled={disabled}
                        aria-label={label}
                        title={label}
                    >
                        <span className="btn-symbol">{symbol}</span>
                        <span className="btn-label">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ComparisonButtons;
