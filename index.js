const app = require('./app')
const port = process.env.PORT || 3001
// запуск
app.listen(port, () => console.log(`Node go, port ${port}`))