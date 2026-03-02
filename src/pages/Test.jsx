import { useState, useMemo } from "react";
import { useProgress } from "../context/ProgressContext";

// Stateless Component for result display
function ResultMessage({ score, total }) {
    const percentage = Math.round((score / total) * 100);
    return (
        <div className="result-message">
            <h3>📊 Your Score: {score}/{total} ({percentage}%)</h3>
            {percentage >= 80 && <p>🏆 Excellent work!</p>}
            {percentage >= 50 && percentage < 80 && <p>👍 Good job!</p>}
            {percentage < 50 && <p>📚 Keep practicing!</p>}
        </div>
    );
}

export default function Test() {
    const { countries, completePractice, loading } = useProgress();

    // State Management
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    // Take first 5 countries for the test
    const testCountries = useMemo(() => countries.slice(0, 5), [countries]);

    // Generate MCQ options for each question
    const questionOptions = useMemo(() => {
        return testCountries.map((country) => {
            const others = countries
                .filter((c) => c.name !== country.name)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3);
            return [...others, country].sort(() => Math.random() - 0.5);
        });
    }, [testCountries, countries]);

    if (loading) return <div className="page">Loading test...</div>;

    // Event Handler: Select Answer
    const handleSelect = (countryId, answer) => {
        if (submitted) return;
        setAnswers((prev) => ({
            ...prev,
            [countryId]: answer
        }));
    };

    // Event Handler: Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();

        let correct = 0;
        testCountries.forEach((country) => {
            if (answers[country.id] === country.name) {
                correct++;
            }
        });

        setScore(correct);
        setSubmitted(true);
        completePractice();
    };

    // Event Handler: Reset
    const handleReset = () => {
        setAnswers({});
        setSubmitted(false);
        setScore(0);
    };

    return (
        <div className="page">
            <div className="test-container">
                <h2>✏️ Test</h2>
                <p className="subtitle">Select the correct country for each flag</p>

                {submitted && <ResultMessage score={score} total={testCountries.length} />}

                <form className="test-form" onSubmit={handleSubmit}>
                    {testCountries.map((country, idx) => (
                        <div key={country.id} className="test-question">
                            <div className="question-header">
                                <span className="question-number">{idx + 1}.</span>
                                <img src={country.flag} alt="Flag" className="test-flag" />
                            </div>

                            <div className="mcq-options">
                                {questionOptions[idx]?.map((opt) => (
                                    <button
                                        type="button"
                                        key={opt.id}
                                        className={`mcq-btn ${answers[country.id] === opt.name ? "selected" : ""
                                            } ${submitted && opt.name === country.name
                                                ? "correct"
                                                : submitted && answers[country.id] === opt.name && opt.name !== country.name
                                                    ? "wrong"
                                                    : ""
                                            }`}
                                        onClick={() => handleSelect(country.id, opt.name)}
                                        disabled={submitted}
                                    >
                                        {opt.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="test-buttons">
                        {!submitted ? (
                            <button type="submit" className="submit-btn">
                                Submit Test
                            </button>
                        ) : (
                            <button type="button" className="submit-btn" onClick={handleReset}>
                                Try Again
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
