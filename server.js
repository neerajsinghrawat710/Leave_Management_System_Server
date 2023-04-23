const app = require("./app")


app.listen(process.env.APP_PORT, (err) => {
    if (err) throw err.message
    console.log("server is running", process.env.APP_PORT)
})


