
//Поля форм

function FormInput_string(params) {
    this.parentValue = params.parentValue;
    this.elem = params.elem;
    if (params.id != undefined) {
        this.id = params.id;
        this.obj = $("<div>", {
            class: "editor-form-string",
        });
        this.label = $("<label>", {
            text: this.parentValue.name,
            for: "editor-field-" + this.id
        });
        this.input = $("<input>", {
            type: "text",
            id: "editor-field-" + this.id,
            value: this.parentValue.value,
        });

        if (this.parentValue.name == 'Тип блока') {
            this.input[0].readOnly = true;
        }

        this.obj
            .append(this.label)
            .append(this.input);
    }

    this.set = function () {
        switch (this.parentValue.name) {
            case 'Title':
                if (params.id != undefined) {
                    document.title = this.input.val();
                } else {
                    document.title = this.parentValue.value;
                }
                break;
        }
        if (params.id != undefined) {
            this.parentValue.value = this.input.val();
        }
    };
}

function FormInput_textarea(params) {
    this.parentValue = params.parentValue;
    this.elem = params.elem;
    if (params.id != undefined) {
        this.id = params.id;
        this.obj = $("<div>", {
            class: "editor-form-textarea",
        });
        this.label = $("<label>", {
            text: this.parentValue.name,
            for: "editor-field-" + this.id,
        })
            .css({
                "margin-right": "15px"
            });
        this.input = $("<textarea>", {
            id: "editor-field-" + this.id,
            rows: 2,
            cols: 15,
            text: this.parentValue.value
        });

        this.obj
            .append(this.label)
            .append(this.input);
    }

    this.set = function () {
        switch (this.parentValue.name) {
            case 'ElemText':
                if (params.id != undefined) {
                    this.elem.obj.html(this.input.val());
                } else {
                    this.elem.obj.html(this.parentValue.value);
                }
                break;
        }
        if (params.id != undefined) {
            this.parentValue.value = this.input.val();
        }
    };
}

function FormInput_color(params) {
    this.parentValue = params.parentValue;
    this.elem = params.elem;
    if (params.id != undefined) {
        this.id = params.id;
        this.obj = $("<div>", {
            class: "editor-form-color",
        });
        this.label = $("<label>", {
            text: this.parentValue.name,
            for: "editor-field-" + this.id
        });
        this.input = $("<input>", {
            type: "color",
            id: "editor-field-" + this.id,
            value: this.parentValue.value
        });

        this.obj
            .append(this.label)
            .append(this.input);
    }

    this.set = function () {

        switch (this.parentValue.name) {
            case 'Цвет':
                if (params.id != undefined) {
                    this.elem.obj.css("backgroundColor", this.input.val());
                } else {
                    this.elem.obj.css("backgroundColor", this.parentValue.value);
                }
                break;
            case "Цвет текста":
                if (params.id != undefined) {
                    this.elem.obj.css("color", this.input.val());
                } else {
                    this.elem.obj.css("color", this.parentValue.value);
                }
                break;
        }
        if (params.id != undefined) {
            this.parentValue.value = this.input.val();
        }
    };
}

function FormInput_select(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.parent = params.parent;
    this.elem = params.elem;
    this.index = params.index;
    this.obj = $("<div>", {
        class: "editor-form-select",
    });
    this.select = $("<select>", {
        id: "editor-field-" + this.id,
    });
    this.label = $("<label>", {
        text: this.parentValue.name,
        for: "editor-field-" + this.id
    });
    this.options = [];
    for (let i = 0; i < this.parentValue.value.length; i++) {
        this.options[i] = $("<option>", {
            label: this.parentValue.value[i].name,
            value: this.parentValue.value[i].type,
            selected: this.parentValue.value[i].selected
        });
    }
    this.select.append(this.options);
    this.obj
        .append(this.label)
        .append(this.select);
    this.set = function () {
        switch (this.parentValue.name) {
            case 'Тип элемента':
                this.panel.obj.html("");
                for (let i = this.parent.childs.length - 1; i > this.index; i--) {
                    this.parent.childs[i].index += 2;
                    this.parent.childs[this.parent.childs[i].index] = this.parent.childs[i];
                }

                this.parent.childs[this.index + 1] = new EditorElem({
                    editor: this.parent.editor,
                    parent: this.parent,
                    type: this.select[0].value.toLowerCase(),
                    index: this.index + 1
                });
                this.panel.elem.wrapper.after(this.parent.childs[this.index + 1].wrapper);
                this.parent.childs[this.index + 2] = new EditorElem({
                    editor: this.parent.editor,
                    parent: this.parent,
                    type: "new",
                    index: this.index + 2
                });
                this.parent.childs[this.index + 1].wrapper.after(this.parent.childs[this.index + 2].wrapper);
                this.panel.elem.unselect();
                break;
            case 'Тип заголовка':
                let numberHeader = this.select[0].value;
                for (let i = 0; i < this.parentValue.value.length; i++) {
                    if (this.parentValue.value[i].type == numberHeader) {
                        this.parentValue.value[i].selected = true;
                    } else {
                        this.parentValue.value[i].selected = false;
                    }
                }
                const oldElement = $(this.elem.obj[0]);

                const newElement = $('<' + numberHeader + '>').html(oldElement.html()).attr('style', oldElement.attr('style'))
                    .addClass(oldElement.attr('class')).attr('contenteditable', true)
                oldElement.replaceWith(newElement);
                this.elem.obj[0] = newElement[0];
                break;
            case 'display':
                let type = this.select[0].value;
                for (let i = 0; i < this.parentValue.value.length; i++) {
                    if (this.parentValue.value[i].type == type) {
                        this.parentValue.value[i].selected = true;
                    } else {
                        this.parentValue.value[i].selected = false;
                    }
                }
                this.elem.obj.css("display", type);
                break;
        }
    };
    /*  this.input.on("click", $.proxy(function () {
         this.setProps();
     }, this.panel)) */
}

function FormInput_submit(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.obj = $("<div>", {
        class: "editor-form-submit",
    });
    this.input = $("<input>", {
        type: "button",
        id: "editor-field-" + this.id,
        value: this.parentValue.name
    });
    this.obj.append(this.input);

    this.input.on("click", $.proxy(function () {
        this.setProps();
    }, this.panel));
}

function FormInput_saveJSON(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.obj = $("<div>", {
        class: "editor-form-submit",
    });
    this.input = $("<input>", {
        type: "button",
        id: "editor-field-" + this.id,
        value: this.parentValue.name
    });
    this.obj.append(this.input);

    this.input.on("click", $.proxy(function () {
        this.saveJSON();
    }, this.panel.editor));
}

function FormInput_openJSON(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.obj = $("<div>", {
        class: "editor-form-submit",
    });
    this.input = $("<input>", {
        type: "button",
        id: "editor-field-" + this.id,
        value: this.parentValue.name
    });
    this.obj.append(this.input);

    this.input.on("click", $.proxy(function () {
        this.openJSON();
    }, this.panel.editor));
}

function FormInput_saveProject(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.obj = $("<div>", {
        class: "editor-form-submit",
    });
    this.input = $("<input>", {
        type: "button",
        id: "editor-field-" + this.id,
        value: this.parentValue.name
    });
    this.obj.append(this.input);

    this.input.on("click", $.proxy(function () {
        this.panel.setProps();
        this.saveJSON();
        this.saveHTML();
    }, this.panel.editor));
}

function FormInput_toProjectPage(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.obj = $("<div>", {
        class: "editor-form-submit",
    });
    this.input = $("<input>", {
        type: "button",
        id: "editor-field-" + this.id,
        value: this.parentValue.name
    });
    this.obj.append(this.input);

    this.input.on("click", $.proxy(function () {
        window.location.href = "./";
    }, this.panel.editor));
}

function FormInput_deleteElem(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.obj = $("<div>", {
        class: "editor-form-submit",
    });
    this.input = $("<input>", {
        type: "button",
        id: "editor-field-" + this.id,
        value: this.parentValue.name
    });
    this.obj.append(this.input);

    this.input.on("click", $.proxy(function () {
        this.panel.obj.html("");
        for (let i = this.page.childs.length - 1; i > params.index; i--) {
            this.page.childs[i].index -= 2;
        }
        this.page.childs[params.index - 1].wrapper[0].remove();
        this.page.childs[params.index].wrapper[0].remove();
        this.page.childs.splice(params.index - 1, 2);
    }, this.panel.editor));
}