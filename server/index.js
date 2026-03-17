import app from "./src/app.js"
import config from "./src/config/index.js"


app.listen(config.PORT, config.HOST, () => {
    console.log(`Server up and running on http://${config.HOST}:${config.PORT}`)
})