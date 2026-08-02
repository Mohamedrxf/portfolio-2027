// Prettier configuration
// Task 1.9 - Configure Prettier

export default {
  // Use single quotes instead of double quotes
  singleQuote: true,

  // Add semicolons at the end of statements
  semi: true,

  // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  trailingComma: 'es5',

  // Line width that Prettier will try to maintain
  printWidth: 100,

  // Number of spaces per indentation level
  tabWidth: 2,

  // Use spaces instead of tabs
  useTabs: false,

  // End of line handling (consistent line endings)
  endOfLine: 'lf',

  // Add spaces between brackets in object literals
  bracketSpacing: true,

  // Put the > of a multi-line JSX element at the end of the last line
  bracketSameLine: false,

  // Include parentheses around a single arrow function parameter
  arrowParens: 'always',

  // Use single quotes in JSX
  jsxSingleQuote: false,

  // Prose wrap (preserve markdown line breaks)
  proseWrap: 'preserve',

  // HTML whitespace sensitivity
  htmlWhitespaceSensitivity: 'css',

  // Vue files script and style tags indentation
  vueIndentScriptAndStyle: false,

  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',

  // Only format files that have a pragma comment at the top
  requirePragma: false,

  // Insert a special mark at the top of files specifying that the file has been formatted
  insertPragma: false,
}
