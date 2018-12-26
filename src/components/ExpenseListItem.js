import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';

const ExpenseListItem = ({id, description, amount, createdAt}) => {
    const createdAtMoment = moment(createdAt);

    return ( //destructure object passed in to grab these properties off of it
        <div>
            <Link to={`/edit/${id}`}><h3>{description}</h3></Link>
            <p>${amount} - {createdAtMoment.format('MMMM Do, YYYY')}</p>
        </div>
    );
}

export default ExpenseListItem; //empty () gives access to dispatch prop, but means component doesn't need to use the state
