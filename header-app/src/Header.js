import React from 'react';

const Header = () => {
    return (
        <header style={{ background: '#f0f0f0', padding: '20px' }}>
            <h1>Micro Frontend Header</h1>
            <nav>
                <a href="#" style={{ marginRight: '10px' }}>Home</a>
                <a href="#">About</a>
            </nav>
        </header>
    );
};

export default Header;