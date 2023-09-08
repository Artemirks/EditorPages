
/* Базовый объект свойств
    Аргументы:
    params - параметры элемента (elem - выбранный объект для изменения),
    functionName - имя функции свойства,
    type - тип input для свойства,
    name - label для input,
    value - значение по умолчанию
*/

function EditorProperty(params, functionName, type, name, value = "") {
    const obj = {
        elem: params.elem,
        values: {},
        getJSON() {
            if (typeof value === "boolean") {
                return false;
            }
            return {
                type: functionName.match(/EditorProperty_(\w+)/)[1],
                values: this.values
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
    return EditorProperty(params, EditorProperty_title.name, "string", "Title");
}

function EditorProperty_margin(params) {
    return EditorProperty(params, EditorProperty_margin.name, "string", "Margin");
}

function EditorProperty_padding(params) {
    return EditorProperty(params, EditorProperty_padding.name, "string", "Padding");
}

function EditorProperty_width(params) {
    return EditorProperty(params, EditorProperty_width.name, "string", "Width");
}

function EditorProperty_maxWidth(params) {
    return EditorProperty(params, EditorProperty_maxWidth.name, "string", "max-width");
}

function EditorProperty_height(params) {
    return EditorProperty(params, EditorProperty_height.name, "string", "Height");
}

function EditorProperty_fontSize(params) {
    return EditorProperty(params, EditorProperty_fontSize.name, "string", "Font-size");
}

function EditorProperty_fontWeight(params) {
    return EditorProperty(params, EditorProperty_fontWeight.name, "string", "Font Weight");
}

function EditorProperty_fontFamily(params) {
    return EditorProperty(params, EditorProperty_fontFamily.name, "string", "Font-family");
}

function EditorProperty_lineHeight(params) {
    return EditorProperty(params, EditorProperty_lineHeight.name, "string", "Line-height");
}

function EditorProperty_elemText(params) {
    return EditorProperty(params, EditorProperty_elemText.name, "textarea", "ElemText");
}

function EditorProperty_backgroundColor(params) {
    return EditorProperty(params, EditorProperty_backgroundColor.name, "color", "Цвет");
}

function EditorProperty_textColor(params) {
    return EditorProperty(params, EditorProperty_textColor.name, "color", "Цвет текста");
}

function EditorProperty_elements(params) {
    return EditorProperty(params, EditorProperty_elements.name, "select", "Тип элемента", params.elem.parent.possibleChilds);
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
function EditorProperty_juctifyContent(params) {
    return EditorProperty(params, EditorProperty_juctifyContent.name, "select", "justify-content", [
        {
            type: "flex-start",
            name: "flex-start",
        },
        {
            type: "flex-end",
            name: "flex-end",
        },
        {
            type: "center",
            name: "center",
        },
        {
            type: "space-between",
            name: "space-between",
        },
        {
            type: "space-around",
            name: "space-around",
        },
        {
            type: "space-evenly",
            name: "space-evenly",
        },
    ]);
}

function EditorProperty_alignItems(params) {
    return EditorProperty(params, EditorProperty_alignItems.name, "select", "align-items", [
        {
            type: "stretch",
            name: "stretch",
        },
        {
            type: "center",
            name: "center",
        },
        {
            type: "start",
            name: "start",
        },
        {
            type: "end",
            name: "end",
        },
    ]);
}

function EditorProperty_typeDisplay(params) {
    return EditorProperty(params, EditorProperty_typeDisplay.name, "select", "display", params.elem.parent.possibleTypes);
}

function EditorProperty_fileImage(params) {
    return EditorProperty(params, EditorProperty_fileImage.name, "file", "Выберите изображение");
}

function EditorProperty_href(params) {
    return EditorProperty(params, EditorProperty_href.name, "string", "Ссылка");
}

function EditorProperty_textDecoration(params) {
    return EditorProperty(params, EditorProperty_textDecoration.name, "string", "Text-decoration");
}

function EditorProperty_cursor(params) {
    return EditorProperty(params, EditorProperty_cursor.name, "string", "Cursor");
}



//Для свойств, которые не должны сохраняться в JSON в качестве аргумента передаем false

function EditorProperty_submit(params) {
    return EditorProperty(params, EditorProperty_submit.name, "submit", "Применить", false);
}

function EditorProperty_deleteImage(params) {
    return EditorProperty(params, EditorProperty_deleteImage.name, "deleteImage", "Удалить фото", false);
}


function EditorProperty_saveJSON(params) {
    return EditorProperty(params, EditorProperty_saveJSON.name, "saveJSON", "Сохранить JSON", false);
}

function EditorProperty_openJSON(params) {
    return EditorProperty(params, EditorProperty_openJSON.name, "openJSON", "Открыть JSON", false);
}

function EditorProperty_seePage(params) {
    return EditorProperty(params, EditorProperty_seePage.name, "seePage", "Посмотреть страницу", false);
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

/* function EditorProperty_addElemBefore(params) {
    return EditorProperty(params, EditorProperty_addElemBefore, "addElemBefore", "Добавить элемент ", false);
}

function EditorProperty_deleteElem(params) {
    return EditorProperty(params, EditorProperty_deleteElem.name, "deleteElem", "Удалить", false);
}

function EditorProperty_deleteElem(params) {
    return EditorProperty(params, EditorProperty_deleteElem.name, "deleteElem", "Удалить", false);
}

function EditorProperty_deleteElem(params) {
    return EditorProperty(params, EditorProperty_deleteElem.name, "deleteElem", "Удалить", false);
} */