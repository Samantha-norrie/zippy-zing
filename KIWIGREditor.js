// var editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
//     mode: "xml",
//     theme: "xq-dark",
//     lineNumbers: true,
//     autoCloseTags: true,

// });

// editor.on("load", () => {
//     console.log("We have loaded!!");
//     editor.setCursor({line:0, ch:0});
// });


// const server = new WebSocketServer({ port: 3000 });

// server.on("connection", (socket) => {
//   // send a message to the client
//   socket.send(JSON.stringify({
//     type: "hello from server",
//     content: [ 1, "2" ]
//   }));

//   // receive a message from the client
//   socket.on("message", (data) => {
//     const packet = JSON.parse(data);

//     switch (packet.type) {
//       case "hello from client":
//         // ...
//         break;
//     }
//   });
// });
function generateText() {
    document.getElementById('editor')
}