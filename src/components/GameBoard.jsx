import React, { useState, useEffect, useCallback } from 'react';
import AnimalDisplay, { ANIMALS } from './AnimalDisplay';
import ComparisonButtons from './ComparisonButtons';
import FeedbackMessage from './FeedbackMessage';
import './GameBoard.css';

function GameBoard({ score, setScore }) {
    const [leftCount, setLeftCount] = useState(0);
    const [rightCount, setRightCount] = useState(0);
    const [leftAnimal, setLeftAnimal] = useState('');
    const [rightAnimal, setRightAnimal] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isAnswered, setIsAnswered] = useState(false);

    const generateNewRound = useCallback(() => {
        const newLeftCount = Math.floor(Math.random() * 10) + 1;
        const newRightCount = Math.floor(Math.random() * 10) + 1;
        const leftAnimalIndex = Math.floor(Math.random() * ANIMALS.length);
        let rightAnimalIndex = Math.floor(Math.random() * ANIMALS.length);

        // Ensure different animals on each side for variety
        while (rightAnimalIndex === leftAnimalIndex) {
            rightAnimalIndex = Math.floor(Math.random() * ANIMALS.length);
        }

        setLeftCount(newLeftCount);
        setRightCount(newRightCount);
        setLeftAnimal(ANIMALS[leftAnimalIndex]);
        setRightAnimal(ANIMALS[rightAnimalIndex]);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setIsAnswered(false);
    }, []);

    useEffect(() => {
        generateNewRound();
    }, [generateNewRound]);

    const getCorrectAnswer = () => {
        if (leftCount < rightCount) return 'less';
        if (leftCount > rightCount) return 'greater';
        return 'equal';
    };

    const handleSelect = (answer) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        const correct = answer === getCorrectAnswer();
        setIsCorrect(correct);
        setShowFeedback(true);
        setIsAnswered(true);

        if (correct) {
            setScore((prev) => prev + 1);
        }

        // Auto-advance after feedback
        setTimeout(() => {
            setShowFeedback(false);
            if (correct) {
                setTimeout(() => {
                    generateNewRound();
                }, 300);
            } else {
                setIsAnswered(false);
                setSelectedAnswer(null);
            }
        }, 1500);
    };

    return (
        <div className="game-board">
            <div className="game-instruction">
                <span className="instruction-icon">🧮</span>
                <span>Count the animals and pick the correct symbol!</span>
            </div>

            <div className="game-area">
                <AnimalDisplay
                    count={leftCount}
                    animal={leftAnimal}
                    side="left"
                />

                <ComparisonButtons
                    onSelect={handleSelect}
                    selectedAnswer={selectedAnswer}
                    disabled={isAnswered}
                />

                <AnimalDisplay
                    count={rightCount}
                    animal={rightAnimal}
                    side="right"
                />
            </div>

            <button className="next-round-btn" onClick={generateNewRound}>
                🎲 New Round
            </button>

            <FeedbackMessage isCorrect={isCorrect} show={showFeedback} />

            {showFeedback && <div className="overlay" />}
        </div>
    );
}

export default GameBoard;
