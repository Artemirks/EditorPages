editorTypes.img = { //описание объекта, свойства для инициализации объекта
    "html": "<img></img>",
    "childs": false,
    "props": ["name", "fileImage", "submit",  "deleteElem"]
}

editorElementsMethods.img = function (params) { //Метод который срабатывает при создании объекта
    params.element.obj[0].src = './Elements/Img/Img.png';
}