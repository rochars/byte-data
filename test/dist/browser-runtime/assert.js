function isFloat(n){
		    return Number(n) === n && n % 1 !== 0;
		}
		var assert = {
			'equal': function(x, y, m) {
				var error = false;
				if (isFloat(x) || isFloat(y)) {
					if (parseFloat(x).toFixed(20) !== parseFloat(y).toFixed(20)) {
						throw new Error(x + ' != ' + y);
					}
				} else {
					if (x !== y) {
						throw new Error(x + ' != ' + y);
					}
				}
			},
			'deepEqual': function(x, y, m) {
				var error = false;
				if (x.length !== y.length) {
					throw new Error(x + ' != ' + y);
				} else {
					var i = 0;
					for (i = 0; i < x.length; i++) {
						if (isFloat(x[i]) || isFloat(y[i])) {
							if (x[i].toFixed(20) !== y[i].toFixed(20)) {
								throw new Error(x + ' != ' + y);
							}
						} else {
							if (x[i] !== y[i]) {
								throw new Error(x + ' != ' + y);
							}
						}
					}
				}
			},
			'throws': function(x, m) {
				var error = false;
				try {
					x();
				} catch(err) {
					error = true;
				}
				if (!error) {
					throw new Error('Expected a error.');
				}
			},
			'ok': function(x, m) {
				if (!x) {
					throw new Error(x + ' expected to be True.');
				}
			}
		}