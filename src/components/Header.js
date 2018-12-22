import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => ( //use NavLink to take advantage of activeClassName. This class is applied if you are on the link's page
    <header>
        <h1>Expensify</h1>
        <NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink>
        <NavLink to="/create" activeClassName="is-active">Create</NavLink>
    </header>
);

export default Header;