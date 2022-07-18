editorTypes.page = { //описание объекта
    "html": "<div></div>", //только один тэг
    "childs": true,
    "props": [ "name", "submit", "saveJSON", "openJSON" ]
}

editorElementsMethods.page = function ( params ) { //методы объекта
    let element = params.element;
    let i = element.childs.length;
    element.childs[ i ] = new EditorElem( {
        editor: element,
        type: "new"
    });
    element.obj.append( element.childs[ i ].wrapper );
}