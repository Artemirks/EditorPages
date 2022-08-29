editorTypes.header = { //описание объекта
    "html": "<h1></h1>",
    "childs": false,
    "props": ["name","typeHeader", "elemText", "textColor" , "submit", "deleteElem"]
}

editorElementsMethods.header = function ( params ) {
    params.element.obj.html("Заголовок");
    params.element.props.elemText.values.name.value = "Заголовок";
    params.element.props.textColor.values.color.value = "#000";
}