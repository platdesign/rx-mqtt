'use strict';



const Code = require('code');
const expect = Code.expect;
const rxmqtt = require('../');
const RXMQTTClient = require('../lib/client');
const RXMQTTTopic = require('../lib/topic');


describe('rx-mqtt', function() {


	it('should have method connect', () => expect(rxmqtt.connect).to.be.a.function());


	it('method connect should return instance of client', () => {
		let client = rxmqtt.connect('mqtt://localhost:1883', {
			clientId: 'rx-mqtt-test',
			clean: false
		});
		expect(client).to.be.an.instanceOf(RXMQTTClient);
	});


	describe('instance: client', function() {

		let client;
		before(() => {
			client = rxmqtt.connect('mqtt://localhost:1883', {
				clientId: 'rx-mqtt-test',
				clean: false
			})
		});








		it('should have method topic', () => expect(client.topic).to.be.a.function());


		it('method topic() should return instance of topic', () => {
			let topic = client.topic('/test/some/topic');

			expect(topic).to.be.an.instanceOf(RXMQTTTopic);
		});


		describe('instance: topic', () => {

			let topic;
			before(() => topic = client.topic('/test/some/topic'));

			it('should have method subscribe', () => expect(topic.subscribe).to.be.a.function());

			it('method subscribe should return a disposable', () => {
				let sub = topic.subscribe(() => null);
				expect(sub.dispose).to.be.a.function();
			});


			it('should have method publish', () => expect(topic.publish).to.be.a.function());

			it('method publish should return a promise', () => {
				let p = topic.publish('test');
				expect(p).to.be.an.instanceOf(Promise);
				return p.then((res) => expect(res).to.be.undefined());
			});

			it('should have observable attribute', () => {
				expect(topic.observable).to.be.an.object();
				expect(topic.observable.subscribe).to.be.a.function();
			});


			it('should have method createObserver()', () => {
				expect(topic.createObserver).to.be.a.function();
			});

			it('method createObserver() should return observer', () => {
				let observer = topic.createObserver();
				expect(observer.onNext).to.be.a.function();
				expect(observer.onError).to.be.a.function();
				expect(observer.onCompleted).to.be.a.function();
			});


		});




















		// describe('functionality', function() {
		// 	this.timeout(0);


		// 	it('asd', (done) => {

		// 		let topic = client.topic('/test/a');

		// 		topic.publish('asdqweqwe');

		// 		topic.subscribe((e) => {
		// 			console.log(e)
		// 			done();
		// 		});

		// 	});


		// });

	});














});
