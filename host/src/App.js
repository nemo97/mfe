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
// const App = () => {
//   return <h1>Hello Webpack + React!</h1>;
// };

export default App;