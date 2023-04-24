const app = require("./app")


app.listen(process.env.APP_PORT, (err) => {
    if (err) throw err.message
    console.log("server is running", process.env.APP_PORT)
})



process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
}).on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});