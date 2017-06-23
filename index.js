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
			decideMessage(sender, text)

		}
		if (event.postback) {
			let text = JSON.stringify(event.postback)
			decideMessage(sender, text)
			continue
		}
	}
	res.sendStatus(200)
})

function decideMessage(sender, text1){

	let text = text1.toLowerCase()
	if (text.includes("hi")){
        sendText(sender, "hi")
	} else if (text.includes("pyramid")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Kheops-Pyramid.jpg")                   
	} else {
		sendText(sender, "sorry, Sriram is so lazy that he didnt programmed me completely ask him to completely program m.")
		sendButtonMessage(sender, "Which is favourite wonder in the world?")
	}
}


function sendText(sender, text) {
	let messageData = {text: text}
	sendRequest(sender, messageData)
}

function sendButtonMessage(sender, text){
	let messageData = {
		"attachment":{
        "type":"template",
        "payload":{
        "template_type":"button",
        "text":text,
        "buttons":[
          {
            "type":"postback",
            "title":"Great Pyramid Of Giza",
            "Payload":"pyramid"
          },
          
          {
            "type":"postback",
            "title":"Start Chatting",
            "payload":"USER_DEFINED_PAYLOAD"
          }
        ]
      }
    }
	}
	sendRequest(sender, messageData)
}

function sendImageMessage(sender, imageUrl) {
	let imageData = {
		"attachment":{
        "type":"image",
        "payload":{
        "url":imageUrl
      }
    }
	}
	sendRequest(sender, messageData)
}
function sendRequest(sender, messageData) {
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token : token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	}, 
	function(error, response, body) {
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

