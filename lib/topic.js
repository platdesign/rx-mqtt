'use strict';

const rx = require('rx');


module.exports = class RXMQTTTopic {



	constructor(parent, topic) {
		this._parent = parent;
		this._topic = topic;
		this.observable = this._createObservable();
	}



	subscribe(observer) {
		return this.observable.subscribe(...arguments);
	}



	publish(msg, options) {
		return new Promise((resolve, reject) => {
			this._parent._client.publish(this._topic, msg, options, function(err) {
				if(err) {
					return reject(err);
				}
				resolve(undefined);
			});
		});
	}



	createObserver(options) {
		return rx.Observer.create((msg) => {
			this.publish(msg, options);
		});
	}



	_createObservable() {

		return rx.Observable.create((observer) => {

			this._parent._client.on('connect', () => this._parent._client.subscribe(this._topic));
			this._parent._messagesObservable.filter((e) => e.topic === this._topic).pluck('msg').subscribe(observer);

			return () => {
				this._parent._client.on('connect', () => this._parent._client.unsubscribe(this._topic));
			}

		}).share();

	}

};

