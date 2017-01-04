//Require本程式需要用到的module 
var https = require('https');
var fs = require('fs');

//變數宣告
var Https_Options = null;	//Https server需要用到的key和certificate
var Server = null;	//利用Https module建立出的https server
var ServerInformation = null;	//Server的address和port
var do_something = null;	//Function dodo運算後的結果
var ClientNumber = 0;	//目前連接到server的client數
var num = 1;

Https_Options =
{
	key : fs.readFileSync('./hacksparrow-key.pem'),
	cert : fs.readFileSync('./hacksparrow-cert.pem'),
	allowHalfOpen : true
};

//利用Method "createServer", "listen" create出https server,Listen on IP:140.113.87.165 Port:8001
//Call Back Function Description: 印出建好的server的相關資訊
Server = https.createServer(Https_Options).listen(8001,"localhost",function()
{
	ServerInformation = Server.address();
	console.log("Https server is running at "+ServerInformation.address+":"+ServerInformation.port);

}	//end of https.createServer call back function
);	//end of https.createServer.listen

//Request listener, 監聽request event 當client送request進來時便會觸發
//Call Back Function Description: 定義了 "data", "close", "error" event

Server.on('request',function(req, res)
{
	console.log("clients: "+ (ClientNumber++));
	//res.write('123123123123');	//送回client
	//Data listener, 監聽此client是否有data傳進來
	//Call Back Function Description: 定義收到data時作甚麼處理
	req.on('data',function(chunk)
	{
		var ServerDataObj = null;	//Server接收的client資料和要回傳給client的資料
		var testobj = {};
		
		testobj = 
		{
			'test' : num++
		};
		
		//ServerDataObj = JSON.parse(chunk.toString());	//接收data並轉成字串
		ServerDataObj = chunk.toString();
		console.log('server receive message' + ServerDataObj);
		//res.write('server send mes after received\r');	//送回client
		res.write(JSON.stringify(testobj) + '\r\n');	//送回client
		delete ServerDataObj;
		
	}	//end of event "data" call back function
	);	//end of event "data"
	
	req.on('end',function()
	{
		console.log("client end.");
		
	}	//end of event "end" call back function
	);	
	
	//監聽close event
	//Call Back Function Description: Emmit whether the client socket close
	req.on('close',function()
	{
		console.log("client close.");
		--ClientNumber;
		
	}	//end of event "close" call back function
	);	//end of event "close"
	
	//Error listener, 監聽是否有error發生
	//Call Back Function Description: if error happen, catch & print
	req.on('error',function(err)
	{
		console.error("req: "+err);
		
	}	//end of event "error" call back function
	);	//end of event "error"
	
}	//end of event "request" call back function
);	//end of event "request"

//Function name: dodo(caller:Server request 的data event)
//Description: server將收到的client data隨意做一些數學運算
//Parameter: ServerDataObj(server收到的client data)
//Return: results(運算後的結果)
/*function dodo(ServerDataObj)
{
	var results =[];
	var dis;
	
	for(var i = 1;i < ServerDataObj.data.length;++i)
	{
		dis = Math.sqrt(Math.pow(ServerDataObj.data[i].x - ServerDataObj.data[i-1].x,2)+Math.pow(ServerDataObj.data[i].y - ServerDataObj.data[i-1].y,2) + Math.pow(ServerDataObj.data[i].z - ServerDataObj.data[i-1].z,2));
		results.push(dis);
	}
	
	return results;
}*/