import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => ( //Use Link to take advantage of client-side routing. a tags are server-side
    <div>
        404! - <Link to="/">Return Home</Link>
    </div>
);

export default NotFoundPage;