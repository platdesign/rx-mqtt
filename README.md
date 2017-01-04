# rx-mqtt

Reactive mqtt client


# Install

`npm install --save rx-mqtt`

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
