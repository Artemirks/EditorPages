editorTypes.header = { //описание объекта, свойства для инициализации объекта
    "html": "<h1 contenteditable></h1>",
    "childs": false,
    "possibleTypes": [
        {
            type: "h1",
            name: "h1",
        },
        {
            type: "h2",
            name: "h2",
        },
        {
            type: "h3",
            name: "h3",
        },
        {
            type: "h4",
            name: "h4",
        }
    ],
    "props": ["name", "typeHeader", "elemText", "margin", "padding", "fontSize", "fontWeight" ,"fontFamily", "lineHeight", "textColor", "submit", "deleteElem"]
}

editorElementsMethods.header = function (params) { //Метод который срабатывает при создании объекта
    params.element.obj.html("Заголовок");
    params.element.props.elemText.values.elemText.value = "Заголовок";
    params.element.props.textColor.values.textColor.value = "#000";
    params.element.obj.on("paste", async (event) => { //очистка вставки от тэгов, атрибутов и т.д
        event.preventDefault();
        const text = await navigator.clipboard.readText();
        const sanitizedText = new DOMParser().parseFromString(text, "text/html").body.textContent;
        
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            range.deleteContents();
            range.insertNode(document.createTextNode(sanitizedText));
        }
    });
}