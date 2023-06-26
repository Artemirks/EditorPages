(function ($) {
    $.fn.removeClassWild = function (mask) {
        return this.removeClass(function (index, cls) {
            var re = mask.replace(/\*/g, '\\S+');
            return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
        });
    };
})($);
var editorTypes = {};


function Editor(params) {
    this.obj = $(params.obj);
    this.nameProject = params.nameProject;
    this.obj.addClass("editor-root");
    this.obj.height($(window).height());
    this.selectedElem = null;
    this.elements = [];
    params.obj.editor = this;

    if (params.nameProject == undefined) {
        this.page = new EditorElem({
            editor: this,
            type: "page",
            parent: this,
            index: 0
        });
        this.obj.append(this.page.wrapper);
    }

    this.panel = new EditorPanel({
        editor: this
    });

    this.obj.on("click", $.proxy(function (event) {

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

    this.saveJSON = function () {
        /*  const a = document.createElement("a");
         a.href = URL.createObjectURL(new Blob([JSON.stringify(this.page.getJSON(), null, 2)], {
             type: "text/plain"
         }));
         a.setAttribute("download", "data.json");
         document.body.appendChild(a);
         a.click();
         document.body.removeChild(a); */
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

    this.loadJSON = function () {
        $.ajax({
            url: `${window.location.pathname.match(/.*\//gm)}Projects/${this.nameProject}/data.json`,
            context: this,
            cache: false
        }).done(this.openJSON);
    };

    this.openJSON = function (elements) {
        /* this.page.wrapper.remove();
        this.panel.obj.html(""); */
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

    this.getHTML = function () {
        let content = this.page.wrapper[0].outerHTML.replace(/editor-elem-wrapper\s|\seditor-elem-selected|<div[^>]+class="[^>]*new[^>]*"[^>]*>.*?<\/div><\/div>/gm, '');
        content = content.replace(/></gm, '>\n<');
        return content;
    };

    this.saveHTML = function () {
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

function EditorPanel(params) {
    this.editor = params.editor;
    this.status = true;
    this.fields = [];
    this.obj = $("<div>", {
        class: "editor-panel editor-panel-on"
    });
    this.editor.obj.append(this.obj);

    this.drawProps = function (params) {
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

    this.setProps = function () {
        for (let key in this.fields) {
            if (typeof this.fields[key].set == "function") {
                this.fields[key].set();
            }
        }
    };

    this.setAllProps = function () {
        this.fields = [];
        let fieldsNumber = 0;
        for (let i = 0; i < this.editor.elements.length; i++) {
            this.elem = this.editor.elements[i];
            for (let key in this.editor.elements[i].props) {
                for (let value in this.editor.elements[i].props[key].values) {
                    if ( this.editor.elements[i].props[key].values[value].value != '' ) {
                        let className = "FormInput_" + this.editor.elements[i].props[key].values[value].type;
                        this.fields[fieldsNumber] = new window[className]({
                            parentValue: this.editor.elements[i].props[key].values[value],
                            panel: this,
                            elem: this.elem
                        });
                        fieldsNumber++;
                    }
                }
            }
        }
        for (let key in this.fields) {
            if (typeof this.fields[key].set == "function" && this.fields[key].parentValue.name != 'Тип элемента') {
                this.fields[key].set();
            }
        }
    };
}

function EditorElem(params) {
    console.log(params);
    this.editor = params.editor;
    this.type = params.type;
    this.parent = params.parent;
    this.index = params.index;
    this.childs = [];
    this.props = [];
    this.wrapper = $("<div>", {
        class: "editor-elem-wrapper"
    });
    this.wrapper[0].elem = this;

    if (editorTypes[this.type].childs) {
        this.obj = $(editorTypes[this.type].html, {
            class: "editor-elem-obj column-center"
        });
    } else {
        this.obj = $(editorTypes[this.type].html, {
            class: "editor-elem-obj"
        });
    }
    
    for (let key in editorTypes[this.type].props) {
        let className = "EditorProperty_" + editorTypes[this.type].props[key];
        this.props[editorTypes[this.type].props[key]] = new window[className]({
            elem: this
        });
    }
    if (params.json != undefined && params.json.props != undefined) {
        for (let key in params.json.props) {
            console.log(this.props);
            if (this.props[params.json.props[key].type] != undefined) {
                
                this.props[params.json.props[key].type].values = params.json.props[key].values;
            }
        }
    }
    if (params.json != undefined && params.json.childs.length != 0) {
        for (let key in params.json.childs) {
            let i = this.childs.length;
            this.childs[i] = new EditorElem({
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
            editorElementsMethods[this.type]({
                element: this
            });
        }
    }

    this.wrapper.append(this.obj);
    this.changeClass = function (params) {
        this.type = params.type;
        this.wrapper
            .removeClassWild("editor-elem-type-*")
            .addClass("editor-elem-type-" + this.type);
    };
    this.changeClass({
        type: this.type
    });

    this.select = function () {
        this.wrapper.addClass("editor-elem-selected");
    };
    this.unselect = function () {
        this.wrapper.removeClass("editor-elem-selected");
    };

    this.getJSON = function () {
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