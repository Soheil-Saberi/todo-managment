module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'eslint'],
  '*.{ts,tsx,css,json,js,cjs}': ['prettier --write'],
}
