import { useState, useEffect } from "react";
import { useProgress } from "../context/ProgressContext";

export default function Training() {
    const { countries, markLearned, loading } = useProgress();
    const [index, setIndex] = useState(0);
    const [description, setDescription] = useState("");

    if (loading) return <div className="page">Loading training...</div>;

    const country = countries[index];

    useEffect(() => {
        const fetchFact = async () => {
            try {
                const res = await fetch(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(country.name)}`
                );
                const data = await res.json();
                setDescription(data.extract || "No description available.");
            } catch {
                setDescription("No description available.");
            }
        };

        fetchFact();
    }, [country]);

    return (
        <div className="page center">
            <h2>📘 Training</h2>

            <div className="country-card large">
                <img
                    src={country.flag}
                    alt={`${country.name} flag`}
                    className="flag-image"
                />

                <h1 className="country-name">{country.name}</h1>
                <h2 className="capital">Capital: {country.capital}</h2>

                <p className="description">{description}</p>

                <button
                    className="option-button learned-button"
                    onClick={() => markLearned(country.name)}
                >
                    ✔ Mark as Learned
                </button>
            </div>

            <div className="nav-buttons">
                <button
                    disabled={index === 0}
                    onClick={() => setIndex(index - 1)}
                >
                    ◀ Previous
                </button>

                <button
                    disabled={index === countries.length - 1}
                    onClick={() => setIndex(index + 1)}
                >
                    Next ▶
                </button>
            </div>
        </div>
    );
}
