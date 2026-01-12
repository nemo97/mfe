
import React from 'react';

import { createStore, Provider, atom, useAtom } from 'jotai';
import { useAtomsDevtools } from 'jotai-devtools';
// const AtomsDevtools: React.FC<{ children: any }> = ({ children }) => {
//     useAtomsDevtools('Header App')
//     return children
// }
// const customStore = createStore();
// const counter = atom(0);
// const Outer = () => {    
//     return (
//         <Provider store={customStore}>
//             <AtomsDevtools>
//                 <Header />
//             </AtomsDevtools>
//         </Provider>
//     );
// };
const Header = () => {
    //const [count, setCounter] = useAtom(counter);
    //const onClick = () => setCounter(prev => prev + 1);
    //console.log(`Current Version: ${VERSION}, Branch: ${BRANCH}`);
    const BRANCH = COMMITHASH || 'unknown';
    return (
        <header style={{ background: '#f0f0f0', padding: '20px' }} className='bg-sky-500'>
            <h1>Micro Frontend Header {BRANCH}</h1>
            <nav>
                <a href="#" style={{ marginRight: '10px' }}>Home</a>
                <a href="#">About</a>
            </nav>
        </header>
    );
};

export default Header;