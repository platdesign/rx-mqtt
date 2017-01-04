# rx-mqtt

Reactive mqtt client based on [mqtt](https://www.npmjs.com/package/mqtt) and [rx](https://www.npmjs.com/package/rx).


# Install

`npm install --save rx-mqtt`

# Basic usage

```javascript
const rxmqtt = require('rxmqtt');

const client = rxmqtt.connect('mqtt://localhost:1883');


// Subscribe to a topics messanges
client
	.topic('/test/a')
	.subscribe((msg) => console.log(msg));


// Publish a message to a topic
client
	.topic('/test/a')
	.publish('Hello World', { qos: 1, retain: false });



// Create an observer which sends messenges to topic `/test/b` with `qos:2` and `retain:true` if `onNext(msg)` is invoked.
let topicBObserver = client.topic('/test/b').createObserver({ qos: 2, retain: true });


// Example how to use `topicBObserver`
client
	.topic('/test/c')
	.observer
	.map((msg) => parseInt(msg) >= 50 ? 'on' : 'off')
	.subscribe(topicBObserver);

```


# API

- [rxmqtt.connect()](#rxmqttconnecturi-options)
- [client.topic()](#clienttopicid)
- [topic.subscribe()](#topicsubscribeobserver)
- [topic.publish()](#topicpublishmsg-options)
- [topic.createObserver()](#topiccreateobserveroptions)

-----

## RxMqtt

### rxmqtt.connect(uri, [options])

Returns an instance of `Client`.

- `uri` - (String, Object) the uri where mqtt broker is located. Directly passed to [mqtt.connect(uri, [options])](https://www.npmjs.com/package/mqtt#connect)
- `options` - (Object) will be directly passed to [mqtt.connect(uri, [options])](https://www.npmjs.com/package/mqtt#connect)


## Client

### client.topic(id)

Returns an instance of `Topic`.

- `id` - (String) the path of the topic to publish/subscribe to


## Topic

### topic.subscribe(observer)

- `observer` - (Function, RxObserver)


### topic.publish(msg, [options])

- `msg` - (String, Buffer)
- `options` - (Object)

### topic.createObserver([options])

- `options` - (Object)

----

# Running tests

- `npm install`
- `npm test`



# Built with

- [rx](https://www.npmjs.com/package/rx) Library for composing asynchronous and event-based operations in JavaScript
- [mqtt](https://www.npmjs.com/package/mqtt) A library for the MQTT protocol


# Versioning

We use [SemVer](http://semver.org/). For available versions of this project see [releases](https://github.com/platdesign/rx-mqtt/releases).

# Author

Christian Blaschke - [@platdesign](https://twitter.com/platdesign)


# License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.



