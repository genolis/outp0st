/// <reference types="jest" />
declare const jsonfile: any;
declare let error: any;
declare const setup: (createError: any) => any;
declare const writeFile: jest.Mock<void, [fileName: any, order: any, cb: any]>;
