import {Manager, Socket} from "socket.io-client";

let socket: Socket;

export const connectToServer = (token: string) => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            auth: token
        }
    });

    socket?.removeAllListeners();
    socket = manager.socket('/');

    addListeners();
}

const addListeners = () => {
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    const clientsUl  = document.querySelector<HTMLUListElement>('#clients-ul')!;
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;

    socket.on('connect', () => {
        serverStatusLabel.innerText = 'online';
    });

    socket.on('disconnect', () => {
        serverStatusLabel.innerText = 'offline';
    });

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';

        clients.forEach(clientId => {
            clientsHtml += `<li>${clientId}</li>`;
        })

        clientsUl.innerHTML = clientsHtml;
    });

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if(messageInput.value.trim().length <= 0) return;

        socket.emit('message', {
            id: 'client',
            message: messageInput.value
        });

        messageInput.value = '';
    });

    socket.on('message', (payload: {fullName: string, message: string}) => {
        messagesUl.innerHTML += `<li><strong>${payload.fullName}:</strong> ${payload.message}</li>`;
    });
}