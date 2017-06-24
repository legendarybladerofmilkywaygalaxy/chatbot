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
             case 'wonders':
             sendGenericMessage(sender);
             break;
            case 'hi':
             sendTextMessage(sender, "hi");
             break;
             case 'bye':
             sendTextMessage(sender, "bye, please come again");
             break;
             case 'hello':
             sendTextMessage(sender, "hello entra hi pettu");
             break;
             case 'hey':
             sendTextMessage(sender, "hai :(");
             break;
             case 'haha':
             sendTextMessage(sender, "hehe");
             break;
             case 'good':
             sendTextMessage(sender, ":)");
             break;
             case 'hii':
             sendTextMessage(sender, "hii");
             break;
             case 'image':
             sendImageMessage(sender);
             break;
             case 'who are you':
             sendTextMessage(sender, "sriram bot :p");
             break;

             default:
             sendTextMessage(sender, "sorry sriram didnt programmed me completely. Ask him to completely program me, message 'wonders', without quotes to know about wonders of world");
           

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
            title: "Great Wall Of China",
            subtitle: "scroll right to see more",               
            image_url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:The_Great_Wall_of_China_at_Jinshanling.jpg",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/Great_Wall_of_China",
              title: "Know more about Great wall of China"
            }, {
              type: "postback",
              title: "Start Chatting",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "Petra",
            subtitle: "located in jordan",
            image_url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Petra_Jordan_BW_21.JPG",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/Petra",
              title: "know more about petra"
            }, {
              type: "postback",
              title: "Chat",
              payload: "Payload for second bubble",
            }],
          }, {
            title: "The Colosseum",
            subtitle: "located in italy",             
            image_url: "http://www.reidsitaly.com/images/lazio/rome/sights/colosseum-ext.jpg",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/Colosseum",
              title: "know more"
            }, {
              type: "postback",
              title: "Chat",
              payload: "Payload for third bubble",
            }],
          }, {
            title: "Chichen Itza",
            subtitle: "located in Mexico ",
                           
            image_url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Chichen-Itza-Castillo-Seen-From-East.JPG",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/Chichen_Itza",
              title: "kmow more"
            }, {
              type: "postback",
              title: "Chat",
              payload: "Payload for fourth bubble",
            }],
          }, {
            title: "Machu Pichhu",
            subtitle: "located in Peru",
                           
            image_url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Machu_Picchu,_Peru.jpg",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Machu_Picchu,_Peru.jpg",
              title: "learn more"
            }, {
              type: "postback",
              title: "Chat",
              payload: "Payload for fifth bubble",
            }],
          }, {
            title: "Tajmahal",
            subtitle: "located in India",
                           
            image_url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:Taj_Mahal_in_March_2004.jpg",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/Taj_Mahal",
              title: "more"
            }, {
              type: "postback",
              title: "chat",
              payload: "payload for seventh message",
            }],
          },
             {
            title: "Christ The Redeemer",
            subtitle: "In Brazil",
                           
            image_url: "https://en.wikipedia.org/wiki/New7Wonders_of_the_World#/media/File:1_cristor_redentor_2014.jpg",
            buttons: [{
              type: "web_url",
              url: "https://en.wikipedia.org/wiki/Christ_the_Redeemer_(statue)",
              title: "more"
            }, {
              type: "postback",
              title: "chat",
              payload: "Payload for seventh bubble",
            }]
          }]
        }
      }
    }
     sendRequest(sender, messageData)
}
function sendImageMessage(sender) {
	let messageData = {
		"attachment":{
      "type":"image",
      "payload":{
        "url":"https://petersapparel.com/img/shirt.png"
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




