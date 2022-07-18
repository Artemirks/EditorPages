/*Свойства элементов */
function EditorProperty_name(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.name = {
        "type": "string",
        "name": "Имя",
        "value": params.elem.type
    }

    this.getJSON = function () {
        return {
            type: "name",
            values: this.values
        };
    }
}

function EditorProperty_color(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.color = {
        "type": "color",
        "name": "Цвет"
    }

    this.getJSON = function () {
        return {
            type: "color",
            values: this.values
        };
    }
}

function EditorProperty_submit(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.submit = {
        "type": "submit",
        "name": "Применить",
        "value": ""
    }

    this.getJSON = function () {
        return false;
    }
}

function EditorProperty_saveJSON(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "saveJSON",
        "name": "Сохранить JSON",
        "value": ""
    }

    this.getJSON = function () {
        return false;
    }
}

function EditorProperty_openJSON(params) {
    this.elem = params.elem;
    this.values = {};
    this.values.saveJSON = {
        "type": "openJSON",
        "name": "Открыть JSON",
        "value": ""
    }

    this.getJSON = function () {
        return false;
    }
}