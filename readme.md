Test to receive airport petition, query api and respond a fligth list


There was a conflict with port
+ Error: listen EADDRINUSE: address already in use :::$portNum
+ `lsof -i :$portNum` to know the process using the port
+ Take the process id PID
+ `kill -9 $PID` . to terminate the process
