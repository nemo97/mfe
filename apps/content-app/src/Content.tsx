import React from 'react';
import './styles.css'; // Import Tailwind CSS styles

const Content: React.FC = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h2>Main Content Area</h2>
            <p>This is a micro frontend content area.</p>
        </div>
    );
};

export default Content;