import React from 'react';
import '../../styles/cards.css';

const GlobalRanking: React.FC = () => {
  return (
    <div className="card ranking-card">
      <div className="ranking-content">
        <div className="ranking-icon">🌍</div>
        <h3>GLOBAL RANKING</h3>
        <div className="ranking-display">
          <span className="ranking-number">#42</span>
          <span className="ranking-badge">top 1%</span>
        </div>
        <p className="ranking-description">
          You've outperformed 2,400 students in the Bangalore Tech Hub this month. Keep it up!
        </p>
      </div>
    </div>
  );
};

export default GlobalRanking;
