/*Свойства элементов */
function EditorProperty_name(params) {

    this.elem = params.elem;
    this.values = {};
    this.values.name = {
        "type": "string",
        "name": "Тип блока",
        "value": params.elem.type
    };
    this.getJSON = function () {
        return {
            type: "name",
            values: this.values
        };
    };
}

function EditorProperty_title(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.name = {
        "type": "string",
        "name": "Title",
        "value": params.elem.type
    };
    this.getJSON = function () {
        return {
            type: "title",
            values: this.values
        };
    };
}

function EditorProperty_elemText(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.name = {
        "type": "textarea",
        "name": "ElemText",
        "value": params.elem.type
    };
    this.getJSON = function () {
        return {
            type: "elemText",
            values: this.values
        };
    };
}

function EditorProperty_backgroundColor(params) {

    this.elem = params.elem;
    this.values = {};
    this.values.color = {
        "type": "color",
        "name": "Цвет",
    };

    this.getJSON = function () {
        return {
            type: "backgroundColor",
            values: this.values
        };
    };
}

function EditorProperty_textColor(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.color = {
        "type": "color",
        "name": "Цвет текста",
    };

    this.getJSON = function () {
        return {
            type: "textColor",
            values: this.values
        };
    };
}

function EditorProperty_elements(params) {

    this.elem = params.elem;
    this.values = {};
    this.values.elements = {
        "type": "select",
        "name": "Тип элемента",
        "values": [
            {
                "type": "Header",
                "name": "Заголовок"
            },

            {
                "type": "test",
                "name": "Тест"
            }
        ]
    };

    this.getJSON = function () {
        return false;
    };
}

function EditorProperty_typeHeader(params) {

    this.elem = params.elem;
    this.values = {};
    this.values.elements = {
        "type": "select",
        "name": "Тип заголовка",
        "values": [
            {
                "type": "h1",
                "name": "h1"
            },

            {
                "type": "h2",
                "name": "h2"
            },

            {
                "type": "h3",
                "name": "h3"
            },

            {
                "type": "h4",
                "name": "h4"
            }
        ]
    };

    this.getJSON = function () {
        return {
            type: "typeHeader",
            values: this.values
        };
    };
}

function EditorProperty_submit(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.submit = {
        "type": "submit",
        "name": "Применить",
        "value": ""
    };

    this.getJSON = function () {
        return false;
    };
}

function EditorProperty_saveJSON(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "saveJSON",
        "name": "Сохранить JSON",
        "value": ""
    };

    this.getJSON = function () {
        return false;
    };
}

function EditorProperty_openJSON(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "openJSON",
        "name": "Открыть JSON",
        "value": ""
    };

    this.getJSON = function () {
        return false;
    };
}

function EditorProperty_saveProject(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "saveProject",
        "name": "Сохранить",
        "value": ""
    };

    this.getJSON = function () {
        return false;
    };
}

function EditorProperty_toProjectPage(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "toProjectPage",
        "name": "На главную страницу",
        "value": ""
    };

    this.getJSON = function () {
        return false;
    };
}

function EditorProperty_deleteElem(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "deleteElem",
        "name": "Удалить",
        "value": ""
    };

    this.getJSON = function () {
        return false;
    };
}