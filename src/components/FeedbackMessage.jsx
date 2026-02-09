import React from 'react';
import './FeedbackMessage.css';

function FeedbackMessage({ isCorrect, show }) {
    if (!show) return null;

    return (
        <div className={`feedback-message ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-emoji">
                {isCorrect ? '🎉' : '💪'}
            </div>
            <div className="feedback-text">
                {isCorrect ? 'Great Job!' : 'Try Again!'}
            </div>
            <div className="feedback-subtext">
                {isCorrect ? "You're amazing! ⭐" : "You can do it! 🌟"}
            </div>
        </div>
    );
}

export default FeedbackMessage;
