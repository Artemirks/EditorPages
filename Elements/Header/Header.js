editorTypes.header = { //описание объекта, свойства для инициализации объекта
    "html": "<h1></h1>",
    "childs": false,
    "props": ["name", "typeHeader", "elemText", "textColor", "submit", "deleteElem"]
}

editorElementsMethods.header = function (params) { //Метод который срабатывает при создании объекта
    params.element.obj.html("Заголовок");
    params.element.props.elemText.values.elemText.value = "Заголовок";
    params.element.props.textColor.values.textColor.value = "#000";
}