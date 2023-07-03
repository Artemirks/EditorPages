editorTypes.paragraph = { //описание объекта, свойства для инициализации объекта
    "html": "<p></p>",
    "childs": false,
    "props": ["name", "elemText", "textColor", "submit", "deleteElem"]
}

editorElementsMethods.paragraph = function (params) { //Метод который срабатывает при создании объекта
    params.element.obj.html("Параграф");
    params.element.props.elemText.values.elemText.value = "Параграф";
    params.element.props.textColor.values.textColor.value = "#000";
}