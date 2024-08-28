import React from 'react';

const Card = ({ ticket, grouping }) => {

    const getInitials = (str) => {
        return str
          .split(' ')    
          .map(word => word[0])   
          .join('')
          .toUpperCase();
      };
    return (
        <div className="card">
            <header className='card-header'>
                <h3>{ticket.id}</h3>
                {grouping !== "user" && <h5>{getInitials(ticket.userName)}</h5>}
            </header>
            <main className='card-content'>{ticket.title}</main>
            {ticket.tag.map((item, index) => {
                return <footer key={index} className='card-footer'> {item} </footer>
            })}
        </div>
    );
};

export default Card;