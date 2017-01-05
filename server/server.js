var https = require('https'); //Require module 
var fs = require('fs');

//varable declared
var Https_Options = null;	//Https server key and certificate
var Server = null;	//https server
var ServerInformation = null;	//Server's address and port
var ClientNumber = 0;	//current nunber of connected client
var num = 1;

Https_Options =
{
    key : fs.readFileSync('./hacksparrow-key.pem'),
    cert : fs.readFileSync('./hacksparrow-cert.pem'),
    allowHalfOpen : true
};

Server = https.createServer(Https_Options).listen(8001, "localhost", function() {
        ServerInformation = Server.address();
        console.log("Https server is running at "+ServerInformation.address+":"+ServerInformation.port);
    }    //end of https.createServer call back function
);    //end of https.createServer.listen

//Request listener, listening request event when client sending the request
//Call Back Function Description: "data", "close", "error" event

Server.on('request', function(req, res) {
    console.log("clients: "+ (ClientNumber++));
    //Data listener, litening is there any data sent from client
    //Call Back Function Description: The handler of "data" event
    req.on('data', function(chunk) {
        var ServerDataObj = null;	//the data received from client and also send this Obj as response to client
        var testobj = {};

        testobj = 
        {
            'test' : num++
        };

        //ServerDataObj = JSON.parse(chunk.toString());
        ServerDataObj = chunk.toString();
        console.log('server receive message' + ServerDataObj);
        res.write(JSON.stringify(testobj) + '\r\n');	//send back to client
        delete ServerDataObj;

    }    //end of event "data" call back function
    );    //end of event "data"

    req.on('end', function() {
            console.log("client end.");
        }    //end of event "end" call back function
	);	
	
    //listening close event
    //Call Back Function Description: Emmit whether the client socket close
    req.on('close', function() {
            console.log("client close.");
            --ClientNumber;
	    }    //end of event "close" call back function
    );    //end of event "close"
	
    //Error listener, 
    //Call Back Function Description: if error happen, catch & print
    req.on('error', function(err) {
            console.error("req: "+err);
        }    //end of event "error" call back function
    );    //end of event "error"
	
}    //end of event "request" call back function
);    //end of event "request"
