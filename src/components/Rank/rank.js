import React from 'react';
import './rank.css';

const Rank = ({ name, entries }) => {
    return (
        <div className="rank">
            <div className="rankDetails">

            {`${name}, your current entry is...`}
            </div>
            <div className="rankNum">
                {entries}
            </div>
        </div>
    );
}

export default Rank;