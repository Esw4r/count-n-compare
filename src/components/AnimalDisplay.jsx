import React from 'react';
import './AnimalDisplay.css';

const ANIMALS = ['🐶', '🐱', '🐰', '🐻', '🦊', '🐸', '🐵', '🐯', '🦁', '🐮', '🐷', '🐨', '🐼', '🦄', '🐢'];

function AnimalDisplay({ count, animal, side }) {
    const selectedAnimal = animal || ANIMALS[0];

    const renderAnimals = () => {
        const animals = [];
        for (let i = 0; i < count; i++) {
            animals.push(
                <span
                    key={i}
                    className="animal-item"
                    style={{ animationDelay: `${i * 0.1}s` }}
                >
                    {selectedAnimal}
                </span>
            );
        }
        return animals;
    };

    return (
        <div className={`animal-display ${side}`}>
            <div className="animal-count-badge">{count}</div>
            <div className="animal-container">
                {renderAnimals()}
            </div>
        </div>
    );
}

export { ANIMALS };
export default AnimalDisplay;
