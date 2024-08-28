import React from 'react';
import Card from './Card';

const Column = ({ title, tickets, grouping }) => {
    const priorityMap = [" No priority", "Low", "Medium", "High", "Urgent"];
    return (
        <div className="column">
            <div className='column-title'>
                {grouping !=="priority" ? 
                <h2>{title}</h2> : 
                <h2>{priorityMap[title]}</h2>
}
            </div>
            {tickets.map((ticket) => (
                <Card key={ticket.id} ticket={ticket} grouping={grouping} />
            ))}
        </div>
    );
};

export default Column;