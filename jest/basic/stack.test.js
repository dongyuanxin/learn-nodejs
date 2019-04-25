const {
  Stack, 
  fetchApple,
  fetchBanana,
} = require('./stack');

beforeEach(() => {
  console.log('*'.repeat(10) + 'before')
})

afterEach(() => {
  console.log('*'.repeat(10) + 'after')
})

test('stack', () => {
  const stack = new Stack();

  stack.push(8);
  // 期望 stack 最后一项是8
  expect(stack.pop()).toBe(8);
})

test('the data is apple', (done) => {
  expect.assertions(1); // 在测试异步代码时，能确保回调中的断言被执行。
  const callback = data => {
    expect(data).toBe('apple');
    done();
  }

  fetchApple(callback);
})

test('the data is banana', () => {
  expect.assertions(1); // 在测试异步代码时，能确保回调中的断言被执行。
  return fetchBanana().then(data => expect(data).toBe('banana'))
})

test('async: the data is banana', async () => {
  expect.assertions(1); // 在测试异步代码时，能确保回调中的断言被执行。
  const data = await fetchBanana();
  expect(data).toBe('banana');
})