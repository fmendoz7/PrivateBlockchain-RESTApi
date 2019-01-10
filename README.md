# README- Mendoza- PrivateBlockchainRESTApi

### Project Objectives
- Selecting a Node.js framework (hapi in this case)
- Configure API service for appropriate port (8000)
- Configure two endpoints - GET and POST
- Updating project README.md 
----------------------------------------------------------------------
### Prereq
You can install Node and NPM with the installer package available on [Node.js® web site](https://nodejs.org/en/).

Our project has the following dependencies: 
- `level`
- `crypto-js`
- `hapi`
- `boom`
----------------------------------------------------------------------
### Installation
Use the following command:
- 'npm install''

Use a command prompt or terminal to start the server (two options): 
- `npm start`
- `node index.js`
----------------------------------------------------------------------
### Details
The REST API provides us two endpoints to interact with our private Blockchain
The API is runs on localhost, with port 8000.


**GET Block**
----------------------------------------------------------------------
* **URL:** `/block/{BLOCK_HEIGHT}`
* **Method:** `GET`
* **URL Path Params:** `BLOCK_HEIGHT` (Retrived Block Height)

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
* **CONTINGENCY- Response successful:**
    * **Code:** 200
    * **Content:**

{
	"hash":"3402991c5f1d2ba8acb662352d6e451b1b47c843daf3b550c14fae7eb08acf21",
	"height":3,
	"body":"Test data 8",
	"time":"1545235722",
	"previousBlockHash":"9f663e16c2a0c036a511a61c4e17d24d3a87f5029873da9e67d8bcace7ff2cec"
}
_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

* **CONTINGENCY- Response has errors:**

______________________________________________________________________________________________________
| Code   | Content                                                                                    |
|________|____________________________________________________________________________________________|
| 400    | {
				"statusCode": 400,                
				error": "Bad Request", 
				"message": "Please Pass A Valid Block Height"
		   } 
|________|____________________________________________________________________________________________|
| 404    | {
				"statusCode": 404, 
			    "error": "Not Found", 
				"message": "Block Not Found!"
			}                   
|________|____________________________________________________________________________________________|
| 500    | {
				"statusCode": 500, 
				"error": "Internal Server Error", 
				"message": "Error Occurred"
		   }         
|_____________________________________________________________________________________________________|

**POST Block**
----------------------------------------------------------------------
* **URL:** `/block`
* **Method:** `POST`
* **Request Body:** `{"body": "Block Body"}`

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _
* **CONTINGENCY- Response successful:**
    * **Code:** 201
    * **Content:**

{
	"hash":"d5a939f53da2ddbfdfcbbdd1182efa7edd75d136931bb7f039f0bda8ee645b42",
	"height":4,
	"body":"Test data 7",
	"time":"1545235722",
	"previousBlockHash":"3402991c5f1d2ba8acb662352d6e451b1b47c843daf3b550c14fae7eb08acf21"
}

_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _

* **CONTINGENCY- Response has errors:**
______________________________________________________________________________________________________
| Code   | Content                                                                                    |
|________|____________________________________________________________________________________________|
| 400    | {
				"statusCode": 400, 
				"error": "Bad Request", 
				"message": "Please Pass body In The Payload"
		   } 
|________|____________________________________________________________________________________________|
| 500    | {
				"statusCode": 500, 
				"error": "Internal Server Error", 
				"message": "Error Occurred"
		   }        
|____________________________________________________________________________________________________|
----------------------------------------------------------------------