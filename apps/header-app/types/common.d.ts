// this file is used to declare global types and modules, should be included in tsconfig.json "files" or "include" array
// should be copied to other apps if they need the same global types
declare module 'headerApp/*';
declare module 'contentApp/*';

declare var COMMITHASH : string | undefined;