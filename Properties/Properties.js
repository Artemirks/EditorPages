function EditorProperty(params, functionName, type, name, value = "") {
    const obj = {
        elem: params.elem,
        values: {},
        getJSON() {
            console.log(value);
            if (typeof value === "boolean") {
                return false;
            }
            return {
                type: functionName.match(/EditorProperty_(\w+)/)[1],
                values: this.values,
            };
        },
    };
    obj.values[functionName.match(/EditorProperty_(\w+)/)[1]] = {
        type: type,
        name: name,
        value: value,
    };
    return obj;
}

function EditorProperty_name(params) {
    return EditorProperty(params, EditorProperty_name.name, "string", "Тип блока", params.elem.type);
}

function EditorProperty_title(params) {
    return EditorProperty(params, EditorProperty_title.name, "string", "Title", params.elem.type);
}

function EditorProperty_elemText(params) {
    return EditorProperty(params, EditorProperty_elemText.name, "textarea", "ElemText", params.elem.type);
}

function EditorProperty_backgroundColor(params) {
    return EditorProperty(params, EditorProperty_backgroundColor.name, "color", "Цвет");
}

function EditorProperty_textColor(params) {
    return EditorProperty(params, EditorProperty_textColor.name, "color", "Цвет текста");
}

function EditorProperty_elements(params) {
    return EditorProperty(params, EditorProperty_elements.name, "select", "Тип элемента", [
        {
            type: "Header",
            name: "Заголовок",
        },
        {
            type: "test",
            name: "Тест",
        },
    ]);
}

function EditorProperty_typeHeader(params) {
    return EditorProperty(params, EditorProperty_typeHeader.name, "select", "Тип заголовка", [
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
        },
    ]);
}

function EditorProperty_submit(params) {
    return EditorProperty(params, EditorProperty_submit.name, "submit", "Применить", false);
}

function EditorProperty_saveJSON(params) {
    return EditorProperty(params, EditorProperty_saveJSON.name, "saveJSON", "Сохранить JSON", false);
}

function EditorProperty_openJSON(params) {
    return EditorProperty(params, EditorProperty_openJSON.name, "openJSON", "Открыть JSON", false);
}

function EditorProperty_saveProject(params) {
    return EditorProperty(params, EditorProperty_saveProject.name, "saveProject", "Сохранить", false);
}

function EditorProperty_toProjectPage(params) {
    return EditorProperty(params, EditorProperty_toProjectPage.name, "toProjectPage", "На главную страницу", false);
}

function EditorProperty_deleteElem(params) {
    return EditorProperty(params, EditorProperty_deleteElem.name, "deleteElem", "Удалить", false);
}