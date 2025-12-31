import React, { Suspense } from 'react';
import Footer from './Footer';
import Header from './Header';

const App = () => {
  return <>
    <Suspense fallback={<div>Loading...</div>}>
      <div>Header App</div>
      <Header />
    </Suspense>
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        Footer App</div>
      <Footer />
    </Suspense>
  </>

};

export default App;