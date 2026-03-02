import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-hero">
                <h1 className="home-title">🎓 Learning Hub</h1>
                <p className="home-subtitle">Choose an app to get started</p>
            </div>

            <div className="home-cards">
                <Link to="/count-n-compare" className="home-card home-card--game">
                    <div className="home-card__icon">🎮</div>
                    <h2 className="home-card__title">Count-N-Compare</h2>
                    <p className="home-card__desc">
                        Test your animal counting skills! Spot the differences and race against the clock.
                    </p>
                    <span className="home-card__cta">Play Now →</span>
                </Link>

                <Link to="/geolearn" className="home-card home-card--geo">
                    <div className="home-card__icon">🌍</div>
                    <h2 className="home-card__title">GeoLearn</h2>
                    <p className="home-card__desc">
                        Explore countries, learn capitals, practice with flags, and test your world knowledge.
                    </p>
                    <span className="home-card__cta">Start Learning →</span>
                </Link>
            </div>
        </div>
    );
}
