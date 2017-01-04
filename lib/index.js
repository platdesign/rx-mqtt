'use strict';


const Client = require('./client');


module.exports = {
	connect(uri, options) {
		return new Client(uri, options);
	}
};
