function pageLoaded() {
  const infoOutput = document.querySelector(".info-output");
  const chatOutput = document.querySelector(".chat-output");
  const input = document.querySelector("input");
  const button = document.querySelector(".button");
  const geolocation = document.querySelector(".button_geo");
  const wsUrl = "wss://echo-ws-service.herokuapp.com";
  const status = document.querySelector(".status");
  const mapLink = document.querySelector(".map-link");
  const mapsUrl = "https://www.openstreetmap.org/#map=19";

  let socket = new WebSocket(wsUrl);

  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  };
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  };
  socket.onerror = () => {
    infoOutput.innerText = "При передаче данных произошла ошибка";
  };

  // отправка сообщений
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value = "";
  }

  // запись сообщений в чате
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class = "${
      isRecieved ? "recieved" : "sent"
    }">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }

  // определение геопозиции
  function getGeoposition() {
    const error = () => {
      chatOutput.innerHTML += "Невозможно определить местоположение";
    };

    const success = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      let messageGeolocation = `<a class = "map-link recieved" target="_blank" href = ${mapsUrl}/${latitude}/${longitude}>Ссылка на карту</a>`;
      chatOutput.innerHTML += messageGeolocation;
    };

    if (!navigator.geolocation) {
      chatOutput.innerHTML += "Geolocation не поддерживается вашим браузером";
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }
  button.addEventListener("click", sendMessage); //кнопка отправки сообщения
  geolocation.addEventListener("click", getGeoposition); // кнопка запроса геопозиции
}

document.addEventListener("DOMContentLoaded", pageLoaded);
