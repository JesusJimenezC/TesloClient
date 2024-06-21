import './style.css'
import {connectToServer} from "./socket-client.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h2>Websocket - Client</h2>
    <input id="jwt-token" placeholder="Json Web Token" />
    <button id="connect-button">Connect</button>
    <br/>
    <span id="server-status">offline</span>
    
    <ul id="clients-ul">
    </ul>
    
    <form id="message-form">
        <input placeholder="message" id="message-input" />
    </form>
    
    <h3>Messages</h3>
    <ul id="messages-ul"></ul>
  </div>
`

const jwtToken = document.querySelector<HTMLInputElement>('#jwt-token')!;
const btnConnect = document.querySelector<HTMLButtonElement>('#connect-button')!;

btnConnect.addEventListener('click', () => {
    if(jwtToken.value.trim().length <= 0) return alert('Please provide a valid JWT token');
   connectToServer(jwtToken.value.trim())
});
