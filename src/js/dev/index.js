document.body.innerHTML = require('../../html/index.html');
var script = document.createElement('script');
script.src = '/js/index.js';
document.body.appendChild(script);