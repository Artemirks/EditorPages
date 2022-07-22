editorTypes.header = { //описание объекта
    "html": "<h1></h1>",
    "childs": false,
    "props": ["name", "color", "submit"]
}

editorElementsMethods.header = function ( params ) {
    params.element.obj.html("+ add");
}