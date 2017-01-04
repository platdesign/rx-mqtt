# rx-mqtt

Reactive mqtt client based on [mqtt](https://www.npmjs.com/package/mqtt) and [rx](https://www.npmjs.com/package/rx).


# Install

`npm install --save rx-mqtt`

# Usage

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

## Client

### topic(id)

- `id` - (String) the path of the topic to publish/subscribe to


## Topic

### subscribe(observer)

- `observer` - (Function, RxObserver)


### publish(msg, [options])

- `msg` - (String, Buffer)
- `options` - (Object)

### createObserver([options])

- `options` - (Object)




# Author

[@platdesign](https://twitter.com/platdesign)

# License
