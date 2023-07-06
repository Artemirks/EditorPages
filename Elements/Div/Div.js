editorTypes.div = { //описание объекта
    "html": "<div></div>", //только один тэг
    "childs": true,
    "possibleChilds": [
        {
            type: "Header",
            name: "Заголовок",
        },
        {
            type: "Paragraph",
            name: "Параграф",
        }
    ],
    "possibleTypes": [
        {
            type: "block",
            name: "block",
        },
        {
            type: "inline",
            name: "inline",
        },
        {
            type: "inline-block",
            name: "inline-block",
        },
        {
            type: "flex",
            name: "flex",
        },
        {
            type: "table",
            name: "table",
        }
    ],
    "props": ["name", "typeDisplay", "backgroundColor", "submit", "saveProject", "toProjectPage","deleteElem"]
}

editorElementsMethods.div = function (params) { //методы объекта
    let element = params.element;
    let i = element.childs.length;
    element.childs[i] = new EditorElem({
        editor: element.editor,
        type: "new",
        parent: element
    });
    element.obj.append(element.childs[i].wrapper);
}