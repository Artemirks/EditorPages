(function ($) {
    $.fn.removeClassWild = function (mask) {
        return this.removeClass(function (index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})($);
var editorTypes = {};

/* Объект редактора
    Аргументы:
    - params - параметры проекта и редактора (obj - div редактора, nameProject - имя выбранного проекта)
*/
function Editor(params) {
    this.obj = $(params.obj);
    this.nameProject = params.nameProject;
    this.obj.addClass("editor-root");
    this.obj.height($(window).height());
    this.selectedElem = null;
    this.elements = [];
    params.obj.editor = this;

    if (params.nameProject == undefined) {
        this.page = new EditorElem({ //создание элемента страницы
            editor: this,
            type: "page",
            parent: this,
            index: 0
        });
        this.obj.append(this.page.wrapper);
    }

    this.panel = new EditorPanel({ //создание объекта панели со свойствами 
        editor: this
    });

    this.obj.on("click", $.proxy(function (event) { //обработка клика по элементу (выделение и показ его свойств)

        let clcikObj = $(event.target).closest(".editor-elem-wrapper");
        if (clcikObj.length == 1) {
            if (this.selectedElem != null) {
                this.selectedElem.unselect();
            }
            if (typeof clcikObj[0].elem == "object") {
                clcikObj[0].elem.select();
                this.panel.drawProps({
                    elem: clcikObj[0].elem
                })
                this.selectedElem = clcikObj[0].elem;
            }
            return false;
        }
    }, this));

    this.saveJSON = function () { //метод сохранения JSON проекта
        $.ajax({
            url: `${window.location.pathname.match(/.*\//gm)}php/ManageProjects.php`,
            method: "post",
            data: {
                "editorPath": window.location.pathname.match(/.*\//gm)[0],
                "nameProject": this.nameProject,
                "dataJSON": JSON.stringify(this.page.getJSON())
            },
            success: function (data) {
                alert("Проект сохранен");
            }
        });
    };

    this.loadJSON = function () { //загрузка JSON файла со структурой проекта
        $.ajax({
            url: `${window.location.pathname.match(/.*\//gm)}Projects/${this.nameProject}/data.json`,
            context: this,
            cache: false
        }).done(this.openJSON);
    };

    this.openJSON = function (elements) {//востановление структуры проекта из файла JSON
        this.page = new EditorElem({
            editor: this,
            type: "page",
            index: 0,
            json: elements,
            parent: this
        });
        this.obj.prepend(this.page.wrapper);
        this.selectedElem = null;
        this.panel.setAllProps();
    };

    this.getHTML = function () { //Получение html кода страницы
        let content = this.page.wrapper[0].outerHTML.replace(/editor-elem-wrapper\s|\seditor-elem-selected|<div[^>]+class="[^>]*new[^>]*"[^>]*>.*?<\/div><\/div>/gm, '');
        content = content.replace(/></gm, '>\n<');
        const removedDivs = $(content).find('div[class^="editor-elem-type"').removeClassWild('editor-elem-type-*');
        content = $(content).not(removedDivs).prop('outerHTML');
        return content;
    };

    this.saveHTML = function () { //сохранение html кода страницы в файл index.php в папке выбранного проекта
        $.ajax({
            url: `${window.location.pathname.match(/.*\//gm)}php/CreatePage.php`,
            method: "post",
            data: {
                "editorPath": window.location.pathname.match(/.*\//gm)[0],
                "projectName": this.nameProject,
                "html": this.getHTML(),
                "title": document.title
            }
        });
    };

}

/* Объект панели со свойствами для редактирования
    Аргументы:
    - params (editor - экземпляр объекта редактора)
    */

function EditorPanel(params) {
    this.editor = params.editor;
    this.status = true;
    this.fields = [];
    this.obj = $("<div>", {
        class: "editor-panel editor-panel-on" //зачем on, панель должна выдвигаться (?)
    });
    this.editor.obj.append(this.obj);

    this.drawProps = function (params) { //отрисовка свойств формы
        this.fields = [];
        this.elem = params.elem;

        this.obj.html("");
        let fieldsNumber = 0;
        for (let key in this.elem.props) {
            for (let value in this.elem.props[key].values) {
                let i = this.fields.length;
                let className = "FormInput_" + this.elem.props[key].values[value].type;
                this.fields[i] = new window[className]({
                    parentValue: this.elem.props[key].values[value],
                    panel: this,
                    id: fieldsNumber,
                    parent: this.elem.parent,
                    elem: this.elem,
                    index: this.elem.index
                });
                fieldsNumber++;
                this.obj.append(this.fields[i].obj);
            }
        }
    };

    this.setProps = function () { //зачем ??
        for (let key in this.fields) {
            if (typeof this.fields[key].set == "function") {
                this.fields[key].set();
            }
        }
    };

    this.setAllProps = function () { //установка всех значений из полей свойств, по факту часть кода похожа на drawProps (создание форм), поэтому надо подумать над оптимизацией
        this.fields = [];
        let fieldsNumber = 0;
        for (let i = 0; i < this.editor.elements.length; i++) {
            let elemID = 0;
            this.elem = this.editor.elements[i];
            for (let key in this.editor.elements[i].props) {
                for (let value in this.editor.elements[i].props[key].values) {
                    if (this.editor.elements[i].props[key].values[value].value != '' || this.editor.elements[i].props[key].values[value].type == 'file') {
                        let className = "FormInput_" + this.editor.elements[i].props[key].values[value].type;
                        this.fields[fieldsNumber] = new window[className]({
                            parentValue: this.editor.elements[i].props[key].values[value],
                            panel: this,
                            elem: this.elem,
                            index: this.elem.index
                        });
                        fieldsNumber++;
                        elemID++;
                    }
                }
            }
        }
        for (let key in this.fields) {
            if (typeof this.fields[key].set == "function" && this.fields[key].parentValue.name != 'Тип элемента') {
                this.fields[key].set(); //установка значения, метод set из Forms.js
            }
        }
    };
}

/*
    Объекта элемента на странице
    Аргументы:
    - params (
        editor - экземпляр объекта редактора
        index - порядковый номер элемента на странице
        json - объект, который содержит:
            - массив childs - ссылки на дочерние элементы
            - type - тип элемента
            - props - Массив, который содержит объекты свойств со значениями
        parent - ссылка на родительский элемент, для элемента page родительским является объект редактора
    )
*/
function EditorElem(params) {
    this.editor = params.editor;
    this.type = params.type;
    this.parent = params.parent;
    this.index = params.index;
    this.childs = [];
    this.possibleChilds = [];
    this.props = [];
    this.possibleTypes = [];
    this.wrapper = $("<div>", {
        class: "editor-elem-wrapper"
    });
    this.wrapper[0].elem = this;

    if (editorTypes[this.type].childs) {
        if (this.type == 'page') {
            this.obj = $(editorTypes[this.type].html, {
                class: "editor-elem-obj column-center" //точно ли тут нужен column-center, думаю что нет
            });
        } else {
            this.obj = $(editorTypes[this.type].html, {
                class: "editor-elem-obj"
            });
        }
        this.possibleChilds = editorTypes[this.type].possibleChilds;
    } else {
        this.obj = $(editorTypes[this.type].html, {
            class: "editor-elem-obj"
        });
    }

    if (editorTypes[this.type].possibleTypes !== undefined) {
        this.possibleTypes = editorTypes[this.type].possibleTypes; 
    }

    for (let key in editorTypes[this.type].props) {
        let className = "EditorProperty_" + editorTypes[this.type].props[key]; //получение свойств элемента
        this.props[editorTypes[this.type].props[key]] = new window[className]({
            elem: this
        });
    }
    if (params.json != undefined && params.json.props != undefined) {
        for (let key in params.json.props) {
            if (this.props[params.json.props[key].type] != undefined) {

                this.props[params.json.props[key].type].values = params.json.props[key].values; //получение значений свойств элемента
            }
        }
    }
    if (params.json != undefined && params.json.childs.length != 0) {
        for (let key in params.json.childs) {
            let i = this.childs.length;
            this.childs[i] = new EditorElem({ //если у элемента есть дети, то создаем объекты дочерних элементов
                editor: this.editor,
                parent: this,
                index: i,
                type: params.json.childs[key].type,
                json: params.json.childs[key]
            });
            this.obj.append(this.childs[i].wrapper);
        }
    }
    else {
        if ((params.json == undefined || this.type == 'new') && typeof editorElementsMethods[this.type] == "function") {
            editorElementsMethods[this.type]({ //отрисовка блока добавления элементов
                element: this
            });
        }
    }

    this.wrapper.append(this.obj);
    setTimeout(() => {
        if (this.obj.css('display') == 'inline') {
            this.wrapper.css('display','inline-block')
        } else {
            this.wrapper.css('display', this.obj.css('display'))
        }
    }, 50);
    this.changeClass = function (params) { //метод изменения класса
        this.type = params.type;
        this.wrapper
            .removeClassWild("editor-elem-type-*")
            .addClass("editor-elem-type-" + this.type);
    };
    this.changeClass({
        type: this.type
    });

    this.select = function () { //отрисовка красной рамки при выделении элемента
        this.wrapper.addClass("editor-elem-selected");
    };
    this.unselect = function () { //снятие красной рамки
        this.wrapper.removeClass("editor-elem-selected");
    };

    this.getJSON = function () { //формирование JSON с данными о свойствах элемента
        let out = {
            type: this.type,

        };
        out.childs = [];
        for (let key in this.childs) {
            out.childs[out.childs.length] = this.childs[key].getJSON();
        }
        out.props = [];
        for (let key in this.props) {
            let tempProps = this.props[key].getJSON();
            if (tempProps != false) {
                out.props[out.props.length] = this.props[key].getJSON();
            }
        }
        return out;
    }
    this.editor.elements.push(this);
    return this;
}

/*Методы элементов*/
editorElementsMethods = {};