editorTypes.header = { //описание объекта
    "html": "<h1></h1>",
    "childs": false,
    "props": ["name", "typeHeader", "elemText", "textColor", "submit", "deleteElem"]
}

editorElementsMethods.header = function (params) {
    params.element.obj.html("Заголовок");
    console.log(params.element.props);
    params.element.props.elemText.values.elemText.value = "Заголовок";
    params.element.props.textColor.values.textColor.value = "#000";
}