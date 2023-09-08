editorTypes.link = { //описание объекта, свойства для инициализации объекта
    "html": "<a contenteditable></a>",
    "childs": false,
    "props": ["name", "elemText", "href", "margin", "fontSize", "fontWeight", "fontFamily", "textColor", "textDecoration", "cursor", "lineHeight", "submit", "deleteElem"]
}

editorElementsMethods.link = function (params) { //Метод который срабатывает при создании объекта
    params.element.obj.html("Ссылка");
    params.element.props.elemText.values.elemText.value = "Ссылка";
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
    })
}