module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-empty': [0],
    'subject-empty': [0],
    'body-case': [2, 'always', ['start-case', 'pascal-case', 'camel-case']],
  },
  ignores: [(message) => message.includes('WIP')],
}
