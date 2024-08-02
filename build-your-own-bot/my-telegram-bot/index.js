var express = require('express')
var app = express()
var bodyParser = require('body-parser')
const axios = require('axios')
require('dotenv').config();

const TELEGRAM_BOT_API_TOKEN = process.env.TELEGRAM_BOT_API_TOKEN || null
const PORT = process.env.PORT || null
// console.log(TELEGRAM_BOT_API_TOKEN)
// console.log(PORT)

app.use(bodyParser.json()) // // for parsing application/json
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
) // for parsing application/x-www-form-urlencoded

//This is the route the API will call
app.post('/new-message', function(req, res) {
    const { message } = req.body
    //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

    if (!message || message.text.toLowerCase().indexOf("anuj") < 0) {
		// In case a message is not present, or if our message does not have the word marco in it, do nothing and return an empty response
		return res.end()
	}

    // If we've gotten this far, it means that we have received a message containing the word "anuj".
	// Respond by hitting the telegram bot API and responding to the appropriate chat_id with the word "Chauhan!!"
	// Remember to use own API toked instead of the one below  "https://api.telegram.org/bot<your_api_token>/sendMessage"

    axios
        .post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_API_TOKEN}/sendMessage`,
            {
                chat_id: message.chat.id,
                text: "Chauhan!!",
            }
        )
        .then(response => {
            console.log("Message posted")
            res.end("ok")
        })
        .catch(err => {
            console.log(`Error: ` + err)
            res.end(`Error:` + err)
        })
})

app.listen(PORT, function() {
    console.log(`Telegram app listening on port 3000!`)
})

