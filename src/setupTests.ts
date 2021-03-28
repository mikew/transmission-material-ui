import '@testing-library/jest-dom'

// This shim needs to be first to avoid React complaining about rAF:
// https://github.com/facebook/jest/issues/4545#issuecomment-342424086
;(global as any).requestAnimationFrame = (callback: () => void) => {
  setTimeout(callback, 0)
}
;(global as any).localStorage = {
  // readonly length: number;
  clear: jest.fn(),
  getItem: jest.fn(),
  key: jest.fn(),
  removeItem: jest.fn(),
  setItem: jest.fn(),
  // [key: string]: any;
  // [index: number]: string;
}

// Needed for some components that use material-ui
// https://github.com/mui-org/material-ui/blob/c0afa64dbc7e331cbf13ab30ee58ffb71958c40b/test/utils/createDOM.js#L21-L28
;(global as any).document.createRange = () => ({
  setStart: () => void 0,
  setEnd: () => void 0,
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
})
