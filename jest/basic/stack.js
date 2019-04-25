function Stack() {
  const items = []
  this.push = element => items.push(element)
  this.pop = () => items.pop()
}

const fetchApple = (callback) => {
  setTimeout(() => callback('apple'), 300)
}

const fetchBanana = () => new Promise((resolve) => resolve('banana'))

module.exports = {
  Stack, 
  fetchApple,
  fetchBanana,
};