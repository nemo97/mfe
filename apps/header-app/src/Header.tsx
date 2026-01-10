import { atom, useAtom } from 'jotai';
import React from 'react';
const counter = atom(0);
const Header = () => {
    const [count, setCounter] = useAtom(counter);
    return (
        <header style={{ background: '#f0f0f0', padding: '20px' }} className='bg-sky-500'>
            <h1>Micro Frontend Header {count}</h1>
            <nav>
                <a href="#" style={{ marginRight: '10px' }}>Home</a>
                <a href="#">About</a>
            </nav>
        </header>
    );
};

export default Header;