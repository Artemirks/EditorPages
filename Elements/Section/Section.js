editorTypes.section = { //описание объекта
    "html": "<section></section>", //только один тэг
    "childs": true,
    "possibleChilds": [
        {
            type: "Header",
            name: "Заголовок",
        },
        {
            type: "Paragraph",
            name: "Параграф",
        },
        {
            type: "Div",
            name: "Блок Div",
        },
        {
            type: "img",
            name: "Изображение",
        }
    ],
    "props": ["name", "width", "maxWidth", "height", "margin","padding", "submit", "deleteElem"]
}

editorElementsMethods.section = function (params) { //методы объекта
    let element = params.element;
    let i = element.childs.length;
    element.childs[i] = new EditorElem({
        editor: element.editor,
        type: "new",
        parent: element,
        index: i
    });
    element.obj.append(element.childs[i].wrapper);
}