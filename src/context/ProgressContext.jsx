import { createContext, useContext, useEffect, useState } from "react";

const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [learned, setLearned] = useState([]);
    const [practiceDone, setPracticeDone] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await fetch(
                    "https://restcountries.com/v3.1/all?fields=name,capital,flags,cca2"
                );
                const data = await res.json();

                const formatted = data.map((c) => ({
                    id: c.cca2,
                    name: c.name.common,
                    capital: c.capital ? c.capital[0] : "Unknown",
                    flag: c.flags.png
                }));

                setCountries(formatted);
            } catch (error) {
                console.error("Failed to fetch countries", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const markLearned = (countryName) => {
        if (!learned.includes(countryName)) {
            setLearned([...learned, countryName]);
        }
    };

    const completePractice = () => {
        setPracticeDone((prev) => prev + 1);
    };

    return (
        <ProgressContext.Provider
            value={{
                countries,
                learned,
                practiceDone,
                markLearned,
                completePractice,
                loading
            }}
        >
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => useContext(ProgressContext);
