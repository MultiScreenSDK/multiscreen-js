![](http://multiscreen.samsung.com/downloads/msf-logo.png)
# JavaScript API Overview

Samsung MultiScreen allows you to connect mobile devices and SmartTVs. By using the MultiScreen API you can create compelling experiences that extend mobile applications to a Samsung SmartTV. The JavaScript API can be used in your SmartTV application to enable mobile applications to discover, connect, and communicate with the SmartTV. This API can also be used in web applications,
along with [iOS](https://github.com/MultiScreenSDK/multiscreen-ios) and [Android](https://github.com/MultiScreenSDK/multiscreen-android).

###### For more general information : [MultiScreen WebSite](http://multiscreen.samsung.com )
###### For more detailed API documentation : [JS API Docs](docs/api.md)


## Installation

#### In a browser:
```html
<script src="samsung-msf-2.x..min.js"></script>
```
<!--
#### Using Bower:
```bash
$ bower install samsung-msf-js
```

#### Using npm ( browserify / webpack )
```bash
$ npm install samsung-msf-js --save-dev
```
-->

**_NOTE: [bower](http://bower.io/) and [npm](https://www.npmjs.com/) support coming soon._**

## Quick Start (SmartTV Application)

  Before we get started it is important to understand that a multiscreen application consist of two parts. The SmartTV application, which can be an installed application or a hosted web application, and a client application (often a mobile app). Most SmartTV applications are created using HTML/CSS/JavaScript. Mobile applications can be built in many languages including JAVA/Objective C/JS. The MultiScreen SDK family provides client APIs for Android, iOS, and JavaScript.

  In the example to follow we will start with our SmartTV application since it will be commonly shared with all other clients.

#### Include the library in your SmartTV applications HTML page
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <!-- Add the script to your html (exposes a `msf` object to the window) -->
    <script src="scripts/vendor/msf-2.0.x.min.js"></script>
</head>
...
</html>

```
#### Open a channel on the local service
```javascript
msf.local(function(err, service){

	var channel = service.channel('com.mydomain.myapp');

    channel.connect({name: 'TV'}, function (err) {
        if(err) return console.error(err);
		console.log('You are connected');
    });

    channel.on('say', function(msg, from){
        console.log(from.attributes.name + ' says, ' + msg);
    });

    channel.on('clientConnect', function(client){
        channel.publish('say', 'Hello '+client.attributes.name, client.id);
    });

});

```


## Quick Start (Mobile Web Application)

#### Include the library in your SmartTV applications HTML page
```html
<!DOCTYPE html>
<html>
<head lang="en">
    <!-- Add the script to your html (exposes a `msf` object to the window) -->
    <script src="scripts/vendor/msf-2.0.x.min.js"></script>
</head>
...
</html>

```
#### Find services on your network and connect to a remote application
```javascript
msf.search(function(err,services){
	
	// Lets assume we found 1 service and want to use it
	var app = service[0].application('http://mydomain.com/myapp','com.mydomain.myapp');
	
	app.connect({name: 'Mobile Browser'}, function (err) {
	    if(err) return console.error(err);
		app.publish('say', 'Hello Everyone');
	});

	app.on('say', function(msg, from){
        console.log(from.attributes.name + ' says, ' + msg);
    });


});
 
```

## Concepts ( Discover, Connect, Communcate )

The MultiScreen API provides three primary features. 


### Discover

In order for a client to start or join a MultiScreen experience, the client application must be able to discover a compatible SmartTV service. The API manages searching for compatible services and only requires a few lines of code. Below is a chunk of code from the Hello World mobile web application. For more details look review the [Search](docs/api.md#Search) & [Service](docs/api.md#Service) classes.

```javascript
var search = msf.search();

search.on('found', function(services){
    for(var i=0; i<services.length; i++){
		console.log('Found service '+services[i].name);
	}
});

search.start(); 

```

### Connect

Once a compatible SmartTV is discovered, you can launch and connect to your SmartTV application from you mobile client. Application management is centeralized to a single class ([Application](docs/api.md#Application)) that handles starting, stopping, installing, and connecting to your application. Here is a quick example.

```javascript
// The first argument is the application id or hosted url
// The second is the channel (communication) id you will use for your application
var app = service.application('http://mydomain.com/myapp','com.mydomain.myapp');

// App connect supports callback and event listener coding styles
app.connect({name: 'John Doe'}, function (err) {
    if(err) return console.error(err);
	console.log('callback : you are connected');
});

```

### Communicate

Once your client has started and established a connection with the SmartTV application, You can use the applications channel to send and receive messages between the devices. The [Application](docs/api.md#Application) class extends [Channel](docs/api.md#Channel), so in the example below we will continue with application instance we created earlier. Applications also provide notifications when someone connects, disconnects, and publishes a message. 

```javascript
app.on('clientConnect', function(client){
	// This will publish the say event to the client that connected 
    app.publish('say', 'Hello '+client.attributes.name, client.id);
});

// This event will fire when another client publishes the `say` event to a target including your client

app.on('say', function(msg, fromClient){
    console.log(fromClient.attributes.name + ' says, ' + msg);
});

```

## Examples

  * [HelloWorld](https://github.com/MultiScreenSDK/multiscreen-helloworld-js)

## Additional Documentation & Client APIs

  * [MultiScreen Website](http://multiscreen.samsung.com/)
  * [JS API Docs](https://github.com/MultiScreenSDK/multiscreen-js)
  * [Android API](https://github.com/MultiScreenSDK/multiscreen-android)


## License

  [MIT](LICENSE.txt)
