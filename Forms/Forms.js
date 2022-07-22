
//Поля форм

function FormInput_string(params) {
    this.parentValue = params.parentValue;
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

        if (params.parentValue.name == 'Тип блока') {
            this.input[0].readOnly = true;
        }

        this.obj
            .append(this.label)
            .append(this.input);
    }

    this.set = function () {
        switch (params.parentValue.name) {
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
    }
}

function FormInput_color(params) {
    this.parentValue = params.parentValue;
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
        if (params.id != undefined) {
            params.panel.elem.obj.css("backgroundColor", this.input.val());
        } else {
            params.panel.elem.obj.css("backgroundColor", this.parentValue.value);
        }
        if (params.id != undefined) {
            this.parentValue.value = this.input.val();
        }
    }
}

function FormInput_select(params) {
    this.parentValue = params.parentValue;
    this.panel = params.panel;
    this.id = params.id;
    this.parent = params.parent;
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
    for (let i = 0; i <this.parentValue.values.length; i++) {
        this.options[i] = $("<option>", {
            label: this.parentValue.values[i].name,
            value: this.parentValue.values[i].type
        });
    } 
    this.select.append(this.options);
    this.obj
            .append(this.label)
            .append(this.select)

    this.set = function () {
        switch (params.parentValue.name) {
            case 'Тип элемента':
                this.panel.elem.wrapper.remove();
                this.panel.obj.html("")
                delete this.panel.elem;
                let i = this.parent.childs.length;
                this.parent.childs[i] = new EditorElem({
                    editor: this.parent.editor,
                    parent: this.parent,
                    type: "new"
                });
                this.parent.obj.append(this.parent.childs[i].wrapper);
                i += 1;
                this.parent.childs[i] = new EditorElem({
                    editor: this.parent.editor,
                    parent: this.parent,
                    type: "new"
                });
                this.parent.obj.append(this.parent.childs[i].wrapper);
                break;
        }
    }

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
    }, this.panel))
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
    }, this.panel.editor))
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
    }, this.panel.editor))
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
    }, this.panel.editor))
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
        window.location.href = "./"
    }, this.panel.editor))
}