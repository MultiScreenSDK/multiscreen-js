
![](http://multiscreen.samsung.com/downloads/msf-logo.png)
# API Documentation

<dl>
<dt><a href="#module_msf">msf</a></dt>
<dt><a href="#Service">Service</a></dt>
<dt><a href="#Search">Search</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dt><a href="#Application">Application</a> ⇐ <code><a href="#Channel">Channel</a></code></dt>
<dt><a href="#Channel">Channel</a> ⇐ <code><a href="#EventEmitter">EventEmitter</a></code></dt>
<dt><a href="#ClientList">ClientList</a> ⇐ <code>Array</code></dt>
<dt><a href="#Client">Client</a></dt>
<dt><a href="#EventEmitter">EventEmitter</a></dt>
</dl>


<a name="module_msf"></a>
##msf
The 'msf' module/object is the entry point for the API.
If including the library via script tag it will be a global object attached to the window
or the export of the module if using amd/commonjs (requirejs/browserify)


* [msf](#module_msf)
  * [.search([callback])](#module_msf.search) ⇒ <code>[Search](#Search)</code>
  * [.local(callback)](#module_msf.local)
  * [.remote(uri, callback)](#module_msf.remote)

<a name="module_msf.search"></a>
####msf.search([callback]) ⇒ <code>[Search](#Search)</code>
Searches the local network for compatible multiscreen services

**Params**

- \[callback\] <code>function</code> - If a callback is passed the search is immediately started.  
  - err <code>Error</code> - The callback handler  
  - result <code>[Array.&lt;Service&gt;](#Service)</code> - An array of [Service](#Service) instances found on the network  

**Returns**: <code>[Search](#Search)</code> - A search instance (a singleton is used to reduce page resources)  

```js
msf.search(function(err, services){
  if(err) return console.error('something went wrong', err.message);
  console.log('found '+services.length+' services');
}

// OR

var search = msf.search();
search.on('found', function(service){
   console.log('found service '+service.name);
}
search.start();
```
<a name="module_msf.local"></a>
####msf.local(callback)
Retrieves a reference to the service running on the current device. This is typically only used on the 'host' device.

**Params**

- callback <code>function</code> - The callback handler  
  - error <code>Error</code>  
  - service <code>[Service](#Service)</code> - The service instance  


```js
msf.local(function(err, service){
  console.log('my service name is '+service.name);
}
```
<a name="module_msf.remote"></a>
####msf.remote(uri, callback)
Retrieves a service instance by it's uri

**Params**

- uri <code>String</code> - The uri of the service (http://host:port/api/v2/)  
- callback <code>function</code> - The callback handler  
  - error <code>Error</code>  
  - service <code>[Service](#Service)</code> - The service instance  


```js
msf.remote('http://host:port/api/v2/',function(err, service){
  console.log('the service name is '+service.name);
}
```
<a name="Service"></a>
##Service
A Service instance represents the multiscreen service running on the remote device, such as a SmartTV


* [Service](#Service)
  * _instance_
    * [.id](#Service#id) → <code>String</code>
    * [.name](#Service#name) → <code>String</code>
    * [.version](#Service#version) → <code>String</code>
    * [.type](#Service#type) → <code>String</code>
    * [.uri](#Service#uri) → <code>String</code>
    * [.device](#Service#device) → <code>String</code>
    * [.application(id, channelUri)](#Service#application) ⇒ <code>[Application](#Application)</code>
    * [.channel(uri)](#Service#channel) ⇒ <code>[Channel](#Channel)</code>

<a name="Service#id"></a>
####service.id → <code>String</code>
The id of the service

<!--<code>readonly</code>--><a name="Service#name"></a>
####service.name → <code>String</code>
The name of the service (Living Room TV)

<!--<code>readonly</code>--><a name="Service#version"></a>
####service.version → <code>String</code>
The version of the service (x.x.x)

<!--<code>readonly</code>--><a name="Service#type"></a>
####service.type → <code>String</code>
The type of the service (Samsung SmartTV)

<!--<code>readonly</code>--><a name="Service#uri"></a>
####service.uri → <code>String</code>
The uri of the service (http://<ip>:<port>/api/v2/)

<!--<code>readonly</code>--><a name="Service#device"></a>
####service.device → <code>String</code>
A hash of additional information about the device the service is running on

<!--<code>readonly</code>--><a name="Service#application"></a>
####service.application(id, channelUri) ⇒ <code>[Application](#Application)</code>
Creates [Application](#Application) instances belonging to that service

**Params**

- id <code>String</code> - An installed application id or url of the web application  
- channelUri <code>String</code> - The URI of the channel to connect to.  


```js
var application = service.application('http://mydomain/myapp/', 'com.mydomain.myapp');
```
<a name="Service#channel"></a>
####service.channel(uri) ⇒ <code>[Channel](#Channel)</code>
creates a channel of the service ('mychannel')

**Params**

- uri <code>String</code> - The uri of the Channel  


```js
var channel = service.channel('com.mydomain.myapp');
```
<a name="Search"></a>
##Search ⇐ <code>[EventEmitter](#EventEmitter)</code>
Provides members related to [Service](#Service) discovery.

**Extends:** <code>[EventEmitter](#EventEmitter)</code>  

* [Search](#Search) ⇐ <code>[EventEmitter](#EventEmitter)</code>
  * _instance_
    * [.start()](#Search#start)
    * [.stop()](#Search#stop)
  * _inherits_
    * [.on(type, listener)](#EventEmitter#on)  
    * [.once(type, listener)](#EventEmitter#once)  
    * [.off(type, listener)](#EventEmitter#off)  
    * [.removeAllListeners(event)](#EventEmitter#removeAllListeners)  
  * _events_
    * ["found"](#Search#event_found)
    * ["error"](#Search#event_error)
    * ["start"](#Search#event_start)
    * ["stop"](#Search#event_stop)

<a name="Search#start"></a>
####search.start()
Starts the search, looking for devices it can reach on the network
If a search is already in progress it will NOT begin a new search


```js
var search = msf.search();
search.on('found', function(service){
   console.log('found service '+service.name);
}
search.start();
```
<a name="Search#stop"></a>
####search.stop()
Stops the current search in progress (no 'found' events or search callbacks will fire)


```js
search.stop();
```
<a name="Search#event_found"></a>
####event: "found"
Fired when a search has discovered compatible services


```js
search.on('found', function(service){
   console.log('found '+service.name);
});
```
<a name="Search#event_error"></a>
####event: "error"
Fired when a search error has occurred


```js
search.on('error', function(err){
   console.error('something went wrong', err.message);
});
```
<a name="Search#event_start"></a>
####event: "start"
Fired when a search has been started


```js
search.on('start', function(){
   ui.setState('searching');
});
```
<a name="Search#event_stop"></a>
####event: "stop"
Fired when a search has been stopped


```js
search.on('stop', function(){
   ui.setState('stopped');
});
```
<a name="Application"></a>
##Application ⇐ <code>[Channel](#Channel)</code>
An Application represents an application on the remote device.
Use the class to control various aspects of the application such launching the app or getting information

**Extends:** <code>[Channel](#Channel)</code>  

* [Application](#Application) ⇐ <code>[Channel](#Channel)</code>
  * _instance_
    * [.id](#Application#id) → <code>String</code>
    * [.install(callback)](#Application#install)
  * _overrides_
    * [.connect(attributes, callback)](#Application#connect)
    * [.disconnect([exitOnRemote], [callback])](#Application#disconnect)
  * _inherits_
    * [.clients](#Channel#clients) → <code>[ClientList](#ClientList)</code>
    * [.isConnected](#Channel#isConnected) → <code>Boolean</code>
    * [.connectionTimeout](#Channel#connectionTimeout) → <code>Boolean</code>
    * [.publish(event, [message], [target], [payload])](#Channel#publish)
    * [.on(type, listener)](#EventEmitter#on)  
    * [.once(type, listener)](#EventEmitter#once)  
    * [.off(type, listener)](#EventEmitter#off)  
    * [.removeAllListeners(event)](#EventEmitter#removeAllListeners)  
    * ["connect" (client)](#Channel#event_connect)
    * ["disconnect" (client)](#Channel#event_disconnect)
    * ["clientConnect" (client)](#Channel#event_clientConnect)
    * ["clientDisconnect" (client)](#Channel#event_clientDisconnect)

<a name="Application#id"></a>
####application.id → <code>String</code>
The id of the application (this can be a url or installed application id)

<!--<code>readonly</code>--><a name="Application#connect"></a>
####application.connect(attributes, callback)
Starts and connects to the application on the remote device. Similar to the Channel 'connect' method but
within an Application the 'connect' callback and event will be only be called when the remote application has
launched and is ready to receive messages.

**Params**

- attributes <code>Object</code> - Any attributes to attach to your client  
- callback <code>function</code> - The callback handler  
  - error <code>Error</code> - Any error that may have occurred during the connection or application startup  
  - client <code>[Client](#Client)</code> - Your client object  


```js
app.connect({displayName:'Wheezy'},function(err, client){
  if(err) return console.error('something went wrong : ', error.code, error.message);
  console.info('You are now connected');
});
```
<a name="Application#disconnect"></a>
####application.disconnect([exitOnRemote], [callback])
Disconnects your client from the remote application.
If the first argument is an optional param and can be used close the remote application
The stop/exit command is only sent if you are the last connected client

**Params**

- \[exitOnRemote=<code>true</code>\] <code>Boolean</code> - Issues a stop/exit on the remote application before disconnecting  
- \[callback\] <code>function</code> - The callback handler  
  - error <code>Error</code> - Any error that may have occurred during the connection or application startup  
  - client <code>[Client](#Client)</code> - Your client object  


```js
app.disconnect(function(err){
    if(err) return console.error('something went wrong');
    console.info('You are now disconnected');
});
```
<a name="Application#install"></a>
####application.install(callback)
Installs the application on the remote device.

**Params**

- callback <code>function</code> - The callback handler  
  - err <code>function</code> - The callback handler  


```js
app.connect({name:'Jason'}, function(err, client){
   if(err.code === 404){
     var install = confirm('Would you like to install the MyApp on your TV?');
     if(install){
        app.install(function(err){
           alert('Please follow the prompts on your TV to install the application');
        });
    }
  }
 });
```
<a name="Channel"></a>
##Channel ⇐ <code>[EventEmitter](#EventEmitter)</code>
A Channel is a discreet connection where multiple clients can communicate

**Extends:** <code>[EventEmitter](#EventEmitter)</code>  

* [Channel](#Channel) ⇐ <code>[EventEmitter](#EventEmitter)</code>
  * _instance_
    * [.clients](#Channel#clients) → <code>[ClientList](#ClientList)</code>
    * [.isConnected](#Channel#isConnected) → <code>Boolean</code>
    * [.connectionTimeout](#Channel#connectionTimeout) → <code>Boolean</code>
    * [.connect(attributes, callback)](#Channel#connect)
    * [.disconnect(callback)](#Channel#disconnect)
    * [.publish(event, [message], [target], [payload])](#Channel#publish)
  * _inherits_
    * [.on(type, listener)](#EventEmitter#on)  
    * [.once(type, listener)](#EventEmitter#once)  
    * [.off(type, listener)](#EventEmitter#off)  
    * [.removeAllListeners(event)](#EventEmitter#removeAllListeners)  
  * _events_
    * ["connect" (client)](#Channel#event_connect)
    * ["disconnect" (client)](#Channel#event_disconnect)
    * ["clientConnect" (client)](#Channel#event_clientConnect)
    * ["clientDisconnect" (client)](#Channel#event_clientDisconnect)

<a name="Channel#clients"></a>
####channel.clients → <code>[ClientList](#ClientList)</code>
The collection of clients currently connected to the channel

<!--<code>readonly</code>--><a name="Channel#isConnected"></a>
####channel.isConnected → <code>Boolean</code>
The connection status of the channel

<!--<code>readonly</code>--><a name="Channel#connectionTimeout"></a>
####channel.connectionTimeout → <code>Boolean</code>
Sets the connection timeout. When set the channel will utilize a connection health check while connected.
If no pinging health check is not received within the given timeout the connection will close.
To stop the health check set the timeout to 0


```js
channel.connectionTimeout = 10000; // checks the connection every 10 seconds while connected
channel.connectionTimeout = 0; // stops the health check
```
<a name="Channel#connect"></a>
####channel.connect(attributes, callback)
Connects to the channel

**Params**

- attributes <code>Object</code> - Any attributes you want to associate with the client (ie. {name:"FooBar"}  
- callback <code>function</code> - The success callback handler  
  - arg1 <code>Error</code> - Any error that may have occurred  
  - arg2 <code>[Client](#Client)</code> - The connecting client  


```js
channel.connect({name:'Wheezy'},function(err, client){
  if(err) return console.error('something went wrong : ', error.code, error.message);
  console.info(client.attributes.name+', you are now connected');
});
```
<a name="Channel#disconnect"></a>
####channel.disconnect(callback)
Disconnects from the channel

**Params**

- callback <code>function</code> - The success callback handler  
  - error <code>Error</code> - Any error that may have occurred  
  - client <code>[Client](#Client)</code> - The disconnecting client  


```js
channel.disconnect(function(err, client){
  if(err) return console.error('something went wrong : ', error.code, error.message);
  console.info(client.attributes.name+', you are now disconnected');
});
```
<a name="Channel#publish"></a>
####channel.publish(event, [message], [target], [payload])
Publish an event message to the specified target or targets.
Targets can be in the for of a clients id, an array of client ids or one of the special message target strings (ie. "all" or "host"}

**Params**

- event <code>String</code> - The name of the event to emit  
- \[message\] <code>any</code> - Any data associated with the event  
- \[target=<code>&#x27;broadcast&#x27;</code>\] <code>String</code> | <code>Array</code> - The target recipient(s) of the message  
- \[payload\] <code>Blob</code> | <code>ArrayBuffer</code> - Any binary data to send with the message  


```js
channel.publish('myCustomEventName',{custom:'data'});
```
<a name="Channel#event_connect"></a>
####event: "connect" (client)
Fired when a channel makes a connection

**Params**

- client <code>[Client](#Client)</code> - Your client  


```js
channel.on('connect',function(client){
 console.log('You are now connected');
});
```
<a name="Channel#event_disconnect"></a>
####event: "disconnect" (client)
Fired when a channel disconnects

**Params**

- client <code>[Client](#Client)</code> - Your client  


```js
channel.on('disconnect',function(client){
 console.log('You are now disconnected');
});
```
<a name="Channel#event_clientConnect"></a>
####event: "clientConnect" (client)
Fired when a peer client channel makes a connection

**Params**

- client <code>[Client](#Client)</code> - The client that connected  


```js
channel.on('clientConnect',function(client){
 console.log(client.id + 'is now connected');
});
```
<a name="Channel#event_clientDisconnect"></a>
####event: "clientDisconnect" (client)
Fired when a peer client disconnects

**Params**

- client <code>[Client](#Client)</code> - The client that connected  


```js
channel.on('clientDisconnect',function(client){
 console.log(client.id + 'has disconnected');
});
```
<a name="ClientList"></a>
##ClientList ⇐ <code>Array</code>
A list of [clients](#Client) accessible through [channel.clients](#Channel#clients).
This list is managed by the channel and automatically adds and removes clients as they connect and disconnect

**Extends:** <code>Array</code>  

* [ClientList](#ClientList) ⇐ <code>Array</code>
  * _instance_
    * [.me](#ClientList#me) → <code>[Client](#Client)</code>
    * [.getById(id)](#ClientList#getById) ⇒ <code>[Client](#Client)</code>

<a name="ClientList#me"></a>
####clientList.me → <code>[Client](#Client)</code>
A reference to your client

<!--<code>readonly</code>--><a name="ClientList#getById"></a>
####clientList.getById(id) ⇒ <code>[Client](#Client)</code>
Returns a client by id

**Params**

- id <code>String</code> - The client  

<a name="Client"></a>
##Client
A representation of an individual device or user connected to a channel.
Clients can have user defined attributes that are readable by all other clients.


* [Client](#Client)
  * _instance_
    * [.id](#Client#id) → <code>String</code>
    * [.attributes](#Client#attributes) → <code>Object</code>
    * [.isHost](#Client#isHost) → <code>Boolean</code>
    * [.connectTime](#Client#connectTime) → <code>Number</code>

<a name="Client#id"></a>
####client.id → <code>String</code>
The id of the client

<!--<code>readonly</code>--><a name="Client#attributes"></a>
####client.attributes → <code>Object</code>
A map of attributes passed by the client when connecting

<!--<code>readonly</code>--><a name="Client#isHost"></a>
####client.isHost → <code>Boolean</code>
Flag for determining if the client is the host

<!--<code>readonly</code>--><a name="Client#connectTime"></a>
####client.connectTime → <code>Number</code>
The time which the client connected in epoch milliseconds

<!--<code>readonly</code>--><a name="EventEmitter"></a>
##EventEmitter
All objects which emit events are instances of EventEmitter.
The EventEmitter class is derived from the nodejs EventEmitter.

For simplicity only the most used members are documented here, for full documentation read [http://nodejs.org/api/events.html](http://nodejs.org/api/events.html)


* [EventEmitter](#EventEmitter)
  * _instance_
    * [.on(type, listener)](#EventEmitter#on)  
    * [.once(type, listener)](#EventEmitter#once)  
    * [.off(type, listener)](#EventEmitter#off)  
    * [.removeAllListeners(event)](#EventEmitter#removeAllListeners)  

<a name="EventEmitter#on"></a>
####eventEmitter.on(type, listener)  
Adds a listener for the event.

**Params**

- type <code>String</code> - The event name to listen to  
- listener <code>function</code> - The function to invoke when the event occurs  

**Returns**: EventEmitter  
<a name="EventEmitter#once"></a>
####eventEmitter.once(type, listener)  
Adds a one time listener for the event. This listener is invoked only the next time the event is fired, after which it is removed.

**Params**

- type <code>String</code> - The event name to listen to  
- listener <code>function</code> - The function to invoke when the event occurs  

**Returns**: EventEmitter  
<a name="EventEmitter#off"></a>
####eventEmitter.off(type, listener)  
Alias for removeListener

**Params**

- type <code>String</code> - The event name to stop listening to  
- listener <code>function</code> - The function that was originally add to handle the event  

**Returns**: EventEmitter  
<a name="EventEmitter#removeAllListeners"></a>
####eventEmitter.removeAllListeners(event)  
Removes all listeners, or those of the specified event.

**Params**

- event <code>String</code> - The event name to stop listening to  

**Returns**: EventEmitter  
