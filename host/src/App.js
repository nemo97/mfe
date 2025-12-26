import React, { Suspense } from 'react';

const Header = React.lazy(() => import('headerApp/Header'));
const Content = React.lazy(() => import('contentApp/Content'));

const App = () => {
    return (
        <div>
            <Suspense fallback="Loading header...">
                <Header />
            </Suspense>
            <Suspense fallback="Loading content...">
                <Content />
            </Suspense>
        </div>
    );
};

export default App;