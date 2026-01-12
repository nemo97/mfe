// this file is used to declare global types and modules, should be included in tsconfig.json "files" or "include" array
// should be copied to other apps if they need the same global types
// declare module 'headerApp/*';
// declare module 'contentApp/*';

declare module '*.css';

// Declare variables as properties within the 'process.env' global object
declare namespace NodeJS {
  interface ProcessEnv {    
    BRANCH: string;
    VERSION: string;
    COMMITHASH: string;
  }
}