import React from 'react';
import './Footer.scss';

function Footer () {

    return (
        <footer>
            <ul className="social-links">
                <li><a href="https://github.com/VirtualVasquez">Github</a></li>
                <li><a href="https://www.linkedin.com/in/melvin-vasquez/">LinkedIn</a></li>
                <li><a href="https://melvinvasquez.com/">Website</a></li>
            </ul>
            <div>
                <p>mvp_forums</p>
                <p>Created by Melvin Vasquez</p>    
            </div>
        </footer>
    );
}

export default Footer;