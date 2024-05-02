const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

const content = [
  join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
  ...createGlobPatternsForDependencies(__dirname),
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content,
  theme: {
    extend: {},
  },
  plugins: [],
};
