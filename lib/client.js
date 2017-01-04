'use strict';

const mqtt = require('mqtt');
const rx = require('rx');
const Topic = require('./topic');


module.exports = class RXMQTT {

	constructor(uri, config) {
		this._client = mqtt.connect(uri, config);
		this._topics = {};

		this._messagesObservable = rx.Observable.create((observer) => {
			this._client.on('message', (topic, msg) => observer.onNext({ topic, msg: msg.toString() }));
		}).share();
	}

	topic(topic) {
		if(this._topics.hasOwnProperty(topic)) {
			return this._topics[topic];
		} else {
			return (this._topics[topic] = new Topic(this, topic));
		}
	}

};

