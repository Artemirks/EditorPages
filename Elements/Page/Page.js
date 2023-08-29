editorTypes.page = { //описание объекта
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
            type: "Section",
            name: "Блок section",
        },
        {
            type: "Div",
            name: "Блок div",
        },
        {
            type: "img",
            name: "Изображение",
        }
    ],
    "props": ["name", "title", "margin", "padding", "backgroundColor", "maxWidth", "submit", "saveProject", "seePage" ,"toProjectPage"]
}

editorElementsMethods.page = function (params) { //методы объекта
    let element = params.element;
    let i = element.childs.length;
    element.childs[i] = new EditorElem({
        editor: element.editor,
        type: "new"
    });
    element.obj.append(element.childs[i].wrapper);
    params.element.props.maxWidth.values.maxWidth.value = "100%";
}