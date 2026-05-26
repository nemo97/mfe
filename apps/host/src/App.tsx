import React, { Suspense } from 'react';

import { getDefaultStore, Provider, atom, useAtom } from 'jotai';
import ErrorBoundary from './ErrorBoundary';
// import { useAtomsDebugValue } from 'jotai-devtools';
import { useAtomsDevtools } from 'jotai-devtools/utils';
// Outside of React component
import { pdfjs,Document } from 'react-pdf';
import * as pdfjs1 from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';

pdfjs1.GlobalWorkerOptions.workerSrc = pdfWorker;

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
  wasmUrl: '/wasm/',
};

const Header = React.lazy(() => import('headerApp/Header'));
const Footer = React.lazy(() => import('headerApp/Footer'));
//const Content = React.lazy(() => import('contentApp/Content'));

//const RemoteStore = React.lazy(() => import('contentApp/Store'));






const AtomsDevtools: React.FC<{ children: any }> = ({ children }) => {
  useAtomsDevtools('Shell App')
  return children;
}

const customStore = getDefaultStore();
const counter = atom(0);
counter.debugLabel = 'counterAtom-host';

const Outer = () => {    
    return (
        <Provider store={customStore}>
            <AtomsDevtools>
                <App />
            </AtomsDevtools>
        </Provider>
    );
};

const App = () => {
  const [count, setCounter] = useAtom(counter);
  const onClick = () => setCounter(prev => prev + 1);
  return (
    <>
      <ErrorBoundary>
          <div className='flex flex-col items-center justify-center max-h-screen border-2 bg-gray-500'>            
            Test            
              <h1>{count}</h1>
              <button onClick={onClick}>Click</button>            
            <div className='w-full'>
            <Suspense fallback="Loading header...">
              <Header />
            </Suspense>
          </div>
            {/* <div className='w-full h-280 overflow-auto'>
            <Suspense fallback="Loading content...">
              <Content />
            </Suspense>
          </div> */}
          <div>
          <Document options={options} file="./pdf-sample.pdf" />;
          </div>
          
            {<div className='w-full'>
            <Suspense fallback="Loading footer...">
              <Footer />
            </Suspense>
          </div> }
          </div>
      </ErrorBoundary>
    </>
  );
};
// const App = () => {
//   return <h1>Hello Webpack + React!</h1>;
// };

export default Outer;