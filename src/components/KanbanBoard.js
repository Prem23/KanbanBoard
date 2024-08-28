import React from 'react';
import Column from './Column';

const KanbanBoard = ({ tickets, grouping, sorting }) => {
    const groupTickets = (tickets, grouping) => {
        if (!Array.isArray(tickets)) {
            console.error('Expected tickets to be an array', tickets);
            return {};
        }

        const grouped = tickets.reduce((acc, ticket) => {
            let groupKey;
            switch (grouping) {
                case 'status':
                    groupKey = ticket.status;
                    break;
                case 'user':
                    groupKey = ticket.userName;
                    break;
                case 'priority':
                    groupKey = ticket.priority;
                    break;
                default:
                    groupKey = 'Uncategorized';
            }
            acc[groupKey] = acc[groupKey] || [];
            acc[groupKey].push(ticket);
            return acc;
        }, {});

        return Object.keys(grouped)
            .sort()
            .reduce((acc, key) => {
                acc[key] = grouped[key];
                return acc;
            }, {});
    };

    const sortTickets = (tickets, sorting) => {
        if (!Array.isArray(tickets)) return [];

        return tickets.sort((a, b) => {
            if (sorting === 'priority') {
                return b.priority - a.priority;
            }
            if (sorting === 'title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const groupedTickets = groupTickets(tickets, grouping);

    return (
        <div className="kanban-board">
            {Object.keys(groupedTickets).map((group) => (
                <Column
                    key={group}
                    title={group}
                    tickets={sortTickets(groupedTickets[group], sorting)}
                    grouping={grouping}
                />
            ))}
        </div>
    );
};

export default KanbanBoard;