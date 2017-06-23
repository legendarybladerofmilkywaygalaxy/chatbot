'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES

app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = "EAAJ7LrNNutQBANyEZCVI7ruxSmvkEcamLmYxfOENYbLc7oZBUQZAdNFZBjE2lybKjxAwBk1yqrSr2bjCZA89ZCT63G8uSgo8ZBTmM9dVZAuBdD89afgvg5OLdcWeIEjkzeRHL3RpiN4WbYpxmvlJ1iwQ6jdlnZAZBK9uQbe0unMPrxMgZDZD"

// Facebook 

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "blondiebytes") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++) {
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			//sendText(sender, " " + text.substring(0, 100))
			//sendText(sender, "Hii sriram is busy now so created me to chat with you ")
			decideMessage(sender, text1)

		}
	}
	res.sendStatus(200)
})


function decideMessage(sender, text1) {
	let text = text1.toLowerCase()
	if (text.includes("hi")) {
         sendText(sender, "hi ")
	
	} else if (text.includes("bye")) {

         sendText(sender, "bye, please come again ")
	}
	} else if (text.includes("your")) {

sendText(sender, "My name is Srirambot ")
	}
	} else if (text.includes("created")) {
sendText(sender, "Sriram is busy so he created me to chat with you ")

	}
	} else if (text.includes("hello")) {

sendText(sender, "hello ")
	}
	} else if (text.includes("hey")) {

sendText(sender, "hai ")
	}
	} else if (text.includes("who")) {

sendText(sender, "I am srirambot created by sriram ")
	}
	} else if (text.includes("nice")) {

sendText(sender, "Thank u :) ")
	}
	} else if (text.includes("good")) {

sendText(sender, ":) ")
	}
	} else if (text.includes("bad")) {

sendText(sender, ":(")
	}
	} else if (text.includes("whats")) {
sendText(sender, "nuvve cheppu ")

	}
	} else if (text.includes("srirambot")) {

sendText(sender, "yes, My name is srirambot. Is that u asked ")
	}
	} else if (text.includes("no")){
sendText(sender, ":( ")

	}
	} else if (text.includes("sorry")){

sendText(sender, " Its ok")
	}
	} else if (text.includes("how")){
sendText(sender, "5n, with code ")

	}
	} else if (text.includes("ok")){

sendText(sender, ":) ")
	}
	} else if (text.includes(" ")){

sendText(sender, " ")
	}
	 else if (text.includes("age ")){

sendText(sender, "i was created 2 days ago by sriram 18 yrs ages ")
	}
	 else if (text.includes("k ")){

sendText(sender, ":) ")
	}
	 else if (text.includes(":) ")){

sendText(sender, ":) ")
	}
	 else if (text.includes(" hehe")){

sendText(sender, " haha")
	}
	else {
sendText(sender, " sorry,Sriram is so lazy that he didnt programmed me completely. Please ask him to completely program me. Note:please use small letters dont use capitals")
	}


}



function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token : token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}


app.listen(app.get('port'), function() {
	console.log("running: port")
})

