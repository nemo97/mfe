import { atom, createStore, Provider, useAtom } from 'jotai';
import { useAtomsDevtools } from 'jotai-devtools';
import React from 'react';
const AtomsDevtools: React.FC<{ children: any }> = ({ children }) => {
    useAtomsDevtools('Footer App')
    return children
}
const customStore = createStore();
const counter = atom(0);
counter.debugLabel = 'counterAtom-footer';
const Outer = () => {    
    return (
        <Provider store={customStore}>
            <AtomsDevtools>
                <Footer />
            </AtomsDevtools>
        </Provider>
    );
};

const Footer = () => {
    const [count, setCounter] = useAtom(counter);
        const onClick = () => setCounter(prev => prev + 1);
    return (
        <footer style={{ background: '#f0f0f0', padding: '20px' }}>
            <h1>Micro Frontend Footer</h1>    
            <h1>{count}</h1>
            <button onClick={onClick}>Click Footer</button>       
        </footer>
    );
};

export default Outer;