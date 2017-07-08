// Подключаем библиотеку unsplash-js (при настроенной webpack-сборке)
import Unsplash from 'unsplash-js';

// Создаем экземпляр объекта для доступа к API
const unsplash = new Unsplash({
  // Application ID из настроек вашего приложения
  applicationId: "6c10e918dabf63e2c5d1e404dace066d4e12c68cd9a787a8710b2a48de5f4b2b", // "6944ce411d39f673bbafdf6fc714a27191577291d9e28c8690b5037185a02e1f",
  // Application Secret из настроек вашего приложения
  secret: "33cf3a2a2fe8c4b662b448d36e05f3f4243b5a5563b4a36c47fb5f1732457ef2", // "6b6dca29b5e68f9c392dd5766414b093411dff5d4b7e329294e33b618c0d4809",
  // Полный адрес страницы авторизации приложения (Redirect URI)
  // Важно: этот адрес обязательно должен быть указан в настройках приложения на сайте Unsplash API/Developers
  callbackUrl: "http://olegivanoff.xyz/skilljs/auth/index.html"  // "http://www.example.com/auth"
});

// Генерируем адрес страницы аутентификации на unsplash.com
// и указываем требуемые разрешения (permissions)
const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
  "write_likes"
]);

// Отправляем пользователя по этому адресу
location.assign(authenticationUrl);
