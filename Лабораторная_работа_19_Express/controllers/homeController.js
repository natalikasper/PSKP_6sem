exports.index = function (request, response) {
    console.log("Главная страница");
    response.send("Главная страница");
};
exports.about = function (request, response) {
    console.log("О сайте");
    response.send("О сайте");
};


/*
1. MVC = модели + view + controllers
запрос => сист.марш.выбир контроллер => к.обраб.запрос => 
    рез-т к.отправл.клиенту
2.сопост.запросы с машр + выбир.для обработки 
    запросов опред.контроллер
3. обраб.запросы + отправл.клиенту рез-т обработки
4. опред.маршруты
*/