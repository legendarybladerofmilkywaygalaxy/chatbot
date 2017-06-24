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
			//sendText(sender, " " + text.substring(0, 100))
			//sendText(sender, "Hii sriram is busy now so created me to chat with you ")
			 switch (event.message && event.message.text) {
             case 'generic':
             sendGenericMessage(sender);
             break;

             default:
             sendTextMessage(sender, "Hii sriram is busy now so created me to chat with you");
    }
  

		}
		
	}
	res.sendStatus(200)
})



function sendTextMessage(sender, text) {
	let messageData = {text: text}
    sendRequest(sender, messageData) 
}
app.listen(app.get('port'), function() {
	console.log("running: port")
})

function sendGenericMessage(sender) {
  // To be expanded in later sections
     let messageData = {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
     sendRequest(sender, messageData)
}

function sendRequest(sender, messageData) {
		request({
		url : "https://graph.facebook.com/v2.6/me/messages",
		qs : {access_token : token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message : messageData,
		}
	},  function(error, response, body) {
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}




