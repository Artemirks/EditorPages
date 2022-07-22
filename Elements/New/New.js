editorTypes.new = { //описание объекта
    "html": "<div></div>",
    "childs": false,
    "props": ["name", "elements" ,"submit"]
}

editorElementsMethods.new = function ( params ) {
    params.element.obj.html("+ add");
}