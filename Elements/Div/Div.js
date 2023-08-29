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
    "props": ["name", "typeDisplay", "juctifyContent", "alignItems", "width", "maxWidth", "height", "margin", "padding", "submit", "deleteElem"]
}

editorElementsMethods.div = function (params) { //методы объекта
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