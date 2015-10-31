var remote = require('remote');
var ipc = require('ipc');
var React = require('react');

const handleDrop = (e)=> {
	e.preventDefault();
	console.log(e.dataTransfer.files[0].path);
	ipc.send('asynchronous-message', e.dataTransfer.files[0].path);
}

document.getElementById("fileContainer").addEventListener("drop", handleDrop, false)

document.addEventListener('dragover', (event) => event.preventDefault());

ipc.on('asynchronous-reply', function(arg) {
  console.log(arg); // prints "pong"
});
