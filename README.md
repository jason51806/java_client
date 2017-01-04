# java_client
java client send https request to node.js server

Server received successfully but server triggered the end handler and sent response to client.
Client received response and sent data again.
Because of the end handler is triggered the server can't receive the request from client anymore.

Is there any way to not trgger the end handler on server and keep the client send data continually?
