import React from 'react';
import './Footer.scss';

function Footer () {

    return (
        <footer>
            <ul className="social-links">
                <li><a>Github</a></li>
                <li><a>LinkedIn</a></li>
                <li><a>Website</a></li>
            </ul>
            <div>
                <p>MVP Forums</p>
                <p>Created by Melvin Vasquez</p>    
            </div>
        </footer>
    );
}

export default Footer;