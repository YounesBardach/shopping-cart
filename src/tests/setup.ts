// Importing necessary functions from the 'vitest' testing framework
import { expect, afterEach } from "vitest"; // 'expect' is used for assertions and 'afterEach' is used to define a function that runs after each test.

import { cleanup } from "@testing-library/react"; // 'cleanup' is used to clean up the DOM after each test to prevent memory leaks.

import * as matchers from "@testing-library/jest-dom/matchers"; // Imports all the matchers from '@testing-library/jest-dom', which provides additional assertions for DOM elements (e.g., to check if an element is visible, has text, etc.).

import "@testing-library/jest-dom"; //Import jest-dom globally for custom assertions

expect.extend(matchers); // Extends the default 'expect' API with the additional matchers from '@testing-library/jest-dom'. This enables using assertions like 'toBeInTheDocument()', 'toHaveTextContent()', etc.

afterEach(() => {
  cleanup(); // After each test, the 'cleanup' function is called to remove all rendered elements from the DOM to ensure no state is carried over between tests.
});
