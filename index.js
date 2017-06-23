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
	} else if (text.includes("haha")){
        sendText(sender, "hehe")
	} else if (text.includes("bye")){
        sendText(sender, "bye,please come again")
	} else if (text.includes("hey")){
        sendText(sender, "hai")
	} else if (text.includes("name")){
        sendText(sender, "My name is Srirambot")
	} else if (text.includes("created")){
        sendText(sender, "Sriram is busy so he created me to chat with you")
	} else if (text.includes("who")){
        sendText(sender, "I am srirambot created by sriram")
	} else if (text.includes("nice")){
        sendText(sender, "Thank u")
	} else if (text.includes("good")){
        sendText(sender, ":)")
	} else if (text.includes("bad")){
        sendText(sender, ":(")
	} else if (text.includes("whatsup")){
        sendText(sender, "nuvve cheppu")
	} else if (text.includes("inkenti")){
        sendText(sender, "nuvve cheppu")
	} else if (text.includes("inka")){
        sendText(sender, "nuvve chepuu")
	} else if (text.includes("srirambot")){
        sendText(sender, "yes, My name is srirambot. Is that u asked")
	} else if (text.includes("no")){
        sendText(sender, ":(")
	} else if (text.includes("yes")){
        sendText(sender, ":(")
	} else if (text.includes("sorry")){
        sendText(sender, "its ok")
	} else if (text.includes("how")){
        sendText(sender, "5n, with code")
	} else if (text.includes("ok")){
        sendText(sender, ":)")
	} else if (text.includes("age")){
        sendText(sender, "i was created 2 days ago by sriram 18 yrs aged")
	} else if (text.includes("s")){
        sendText(sender, ":)")
	} else if (text.includes("play")){
        sendText(sender, "I cant play i am a bot")
	} else if (text.includes("sare")){
        sendText(sender, ":)")
	} else if (text.includes("pyramid")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Kheops-Pyramid.jpg")
    } else if (text.includes("tajmahal")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Taj_Mahal_in_March_2004.jpg") 
    } else if (text.includes("chaina")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:The_Great_Wall_of_China_at_Jinshanling.jpg")
    } else if (text.includes("petra")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Petra_Jordan_BW_21.JPG")
    } else if (text.includes("colloseum")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Colosseum_in_Rome,_Italy_-_April_2007.jpg")
    } else if (text.includes("machupichhu")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Machu_Picchu,_Peru.jpg")
    } else if (text.includes("christ")){
        sendImageMessage(sender, "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:1_cristor_redentor_2014.jpg")                    
	} else if (text.includes("pappa")){
        sendText(sender, "pappa")
	} else if (text.includes("hello")){
        sendText(sender, "hello")
	} else {
		sendText(sender, "sorry, Sriram is so lazy that he didnt programmed me completely ask him to completely program me.")
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
            "title":"Taj Mahal",
            "Payload":"tajmahal"
          },
          {
            "type":"postback",
            "title":"Great Wall Of Chaina",
            "Payload":"chaina"
          },
          {
            "type":"postback",
            "title":"Petra",
            "Payload":"petra"
          },
          {
            "type":"postback",
            "title":"The Colloseum",
            "Payload":"colloseum"
          },
          {
            "type":"postback",
            "title":"Machu Pichhu",
            "Payload":"machupichhu"
          },
          {
            "type":"postback",
            "title":"Christ The Redeemer",
            "Payload":"christ"
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

