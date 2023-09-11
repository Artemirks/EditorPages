editorTypes.paragraph = { //описание объекта, свойства для инициализации объекта
    "html": "<p contenteditable></p>",
    "childs": false,
    "props": ["name", "elemText", "margin", "fontSize", "fontWeight", "fontFamily", "textColor", "lineHeight", "addElemBefore", "addElemAfter", "elemUp", "elemDown", "submit", "deleteElem"]
}

editorElementsMethods.paragraph = function (params) { //Метод который срабатывает при создании объекта
    params.element.obj.html("Параграф");
    params.element.props.elemText.values.elemText.value = "Параграф";
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