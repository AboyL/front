const isType = require('./index')

test('测试类型', () => {
  expect(isType('string', '1212')).toBe('string')
})