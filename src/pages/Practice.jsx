import { useState } from "react";
import { useProgress } from "../context/ProgressContext";

export default function Practice() {
    const { countries, completePractice, loading } = useProgress();
    const [index, setIndex] = useState(0);
    const [message, setMessage] = useState("");

    if (loading) return <div className="page">Loading practice...</div>;

    const country = countries[index];

    // Create options (correct + 2 random others)
    const getOptions = () => {
        const others = countries
            .filter((c) => c.name !== country.name)
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);

        return [...others, country].sort(() => Math.random() - 0.5);
    };

    const options = getOptions();

    const checkAnswer = (answer) => {
        if (answer === country.name) {
            setMessage("✅ Correct!");
            completePractice();
        } else {
            setMessage("🔁 Try again");
        }
    };

    return (
        <div className="page center">
            <h2>🎯 Practice</h2>

            <div className="country-card large">
                <img
                    src={country.flag}
                    alt="Country flag"
                    className="flag-image"
                />

                <h2 className="capital">Which country is this flag from?</h2>

                <div className="button-group">
                    {options.map((opt) => (
                        <button
                            key={opt.id}
                            className="option-button"
                            onClick={() => checkAnswer(opt.name)}
                        >
                            {opt.name}
                        </button>
                    ))}
                </div>

                <p className="message">{message}</p>
            </div>

            <div className="nav-buttons">
                <button
                    disabled={index === 0}
                    onClick={() => {
                        setIndex(index - 1);
                        setMessage("");
                    }}
                >
                    ◀ Previous
                </button>

                <button
                    disabled={index === countries.length - 1}
                    onClick={() => {
                        setIndex(index + 1);
                        setMessage("");
                    }}
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}
