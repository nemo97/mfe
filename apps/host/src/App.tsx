import React, { Suspense } from 'react';

// import { createStore, Provider, atom, useAtom } from 'jotai';
// import { useAtomsDebugValue } from 'jotai-devtools';
// import { useAtomsDevtools } from 'jotai-devtools/utils';

const Header = React.lazy(() => import('headerApp/Header'));
const Footer = React.lazy(() => import('headerApp/Footer'));
const Content = React.lazy(() => import('contentApp/Content'));

//const RemoteStore = React.lazy(() => import('contentApp/Store'));

//const customStore = createStore();
// const DebugAtoms = () => {
//   useAtomsDebugValue()
//   return null;
// }

// const textAtom = atom('hello')
// textAtom.debugLabel = 'textAtom'

// const lenAtom = atom((get) => get(textAtom).length)
// lenAtom.debugLabel = 'lenAtom'

// const AtomsDevtools : React.FC<{ children: any }> = ({ children }) => {
//   useAtomsDevtools('demo')
//   return children
// }

// const TextBox = () => {
//   const [text, setText] = useAtom(textAtom)
//   const [len] = useAtom(lenAtom)
//   return (
//     <span>
//       <input value={text} onChange={(e) => setText(e.target.value)} />({len})
//     </span>
//   )
// }
const App = () => {
  return (
    <>
      {/* <Provider> */}
      {/* <DevTools store={customStore} /> */}
      {/* <DebugAtoms/> */}
      {/* <AtomsDevtools> */}
      {/* <TextBox /> */}
      
      <div className='flex flex-col items-center justify-center max-h-screen border-2 bg-gray-500'>
        <div className='w-full'>
        <Suspense fallback="Loading header...">
          <Header />
        </Suspense>
        </div>
        <div className='w-full h-280 overflow-auto'>
        <Suspense fallback="Loading content...">
          <Content />
        </Suspense>
        </div>
        <div className='w-full'>
          <Suspense fallback="Loading footer...">
            <Footer />
          </Suspense>
        </div>
      </div>
      {/* </AtomsDevtools> */}
      {/* </Provider> */}
    </>
  );
};
// const App = () => {
//   return <h1>Hello Webpack + React!</h1>;
// };

export default App;