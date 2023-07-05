/* 
    Базовый объект форм
*/
function FormInput(params) {
    this.parentValue = params.parentValue;
    this.elem = params.elem;
    this.panel = params.panel;
    this.parent = params.parent;
    this.index = params.index;
    if (params.id != undefined || this.parentValue.type == 'select') {
        this.id = params.id;
        this.obj = $("<div>", {
            class: `editor-form-${this.parentValue.type}`,
        });
        if (params.isLabel) {
            this.label = $("<label>", {
                text: this.parentValue.name,
                for: `editor-field-${this.id}`
            });
        }
        this.input = this.createInput(params);

        if (this.parentValue.name == 'Тип блока') {
            this.input[0].readOnly = true;
        }

        if (params.isLabel) {
            this.obj.append(this.label);
        }
        this.obj.append(this.input);
        if (this.options !== undefined) {
            this.input.append(this.options);
        }
    }
    this.createInput = function (params) {

    }
}

//Поля форм

function FormInput_string(params) {
    params.isLabel = true;
    this.createInput = function (params) {
        return $("<input>", {
            type: "text",
            id: "editor-field-" + this.id,
            value: this.parentValue.value,
        });
    }

    //переписать на объект, как в color
    this.set = function () {
        if (params.id !== undefined) {
            const inputValue = this.input.val();
            switch (this.parentValue.name) {
                case 'Title':
                    document.title = inputValue;
                    break;
            }
            this.parentValue.value = inputValue;
        } else {
            switch (this.parentValue.name) {
                case 'Title':
                    document.title = this.parentValue.value;
                    break;
            }
        }
    };
    FormInput.call(this, params);
}


function FormInput_textarea(params) {
    params.isLabel = true;
    this.createInput = function (params) {
        return $("<textarea>", {
            id: "editor-field-" + this.id,
            rows: 2,
            cols: 15,
            text: this.parentValue.value
        }).css({
            "margin-left": "15px"
        });
    }

    this.set = function () {
        if (params.id !== undefined) {
            switch (this.parentValue.name) {
                case 'ElemText':
                    this.input.val(this.elem.obj[0].innerHTML);
                    break;
            }
            this.parentValue.value = this.input.val();
        } else {
            switch (this.parentValue.name) {
                case 'ElemText':
                    this.elem.obj.html(this.parentValue.value);
                    break;
            }
        }
    };
    FormInput.call(this, params);
}

function FormInput_color(params) {
    params.isLabel = true;
    this.createInput = function (params) {
        return $("<input>", {
            type: "color",
            id: "editor-field-" + this.id,
            value: this.parentValue.value
        });
    }

    this.set = function () {

        const propertyActions = {
            'Цвет': () => {
                const value = params.id !== undefined ? this.input.val() : this.parentValue.value;
                this.elem.obj.css("backgroundColor", value);
            },
            'Цвет текста': () => {
                const value = params.id !== undefined ? this.input.val() : this.parentValue.value;
                this.elem.obj.css("color", value);
            }
        }

        const propertyAction = propertyActions[this.parentValue.name];
        if (propertyAction) {
            propertyAction();
        }

        if (params.id !== undefined) {
            this.parentValue.value = this.input.val();
        }
    };

    FormInput.call(this, params);
}

function FormInput_select(params) {
    this.parentValue = params.parentValue;
    params.isLabel = true;
    this.createInput = function (params) {
        return $("<select>", {
            id: `editor-field-${this.id}`
        });
    }

    this.options = [];
    for (let i = 0; i < this.parentValue.value.length; i++) {
        this.options[i] = $("<option>", {
            label: this.parentValue.value[i].name,
            value: this.parentValue.value[i].type,
            selected: this.parentValue.value[i].selected
        });
    }

    this.set = function () {
        this.setSelectedValue = function (array, valueToSet) {
            for (let i = 0; i < array.length; i++) {
                array[i].selected = array[i].type === valueToSet;
            }
        }

        this.handleElementType = function () {
            this.panel.obj.html("");
            for (let i = this.parent.childs.length - 1; i > this.index; i--) {
                this.parent.childs[i].index += 2;
                this.parent.childs[this.parent.childs[i].index] = this.parent.childs[i];
            }

            this.parent.childs[this.index + 1] = new EditorElem({
                editor: this.parent.editor,
                parent: this.parent,
                type: this.input[0].value.toLowerCase(),
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
        }

        this.handleHeaderType = function () {
            this.setSelectedValue(this.parentValue.value, this.input[0].value);

            const oldElement = $(this.elem.obj[0]);
            const newElement = $('<' + this.input[0].value + '>')
                .html(oldElement.html())
                .attr('style', oldElement.attr('style'))
                .addClass(oldElement.attr('class'))
                .attr('contenteditable', true);

            oldElement.replaceWith(newElement);
            this.elem.obj[0] = newElement[0];
        }

        this.handleDisplayType = function () {
            this.setSelectedValue(this.parentValue.value, this.input[0].value);
            this.elem.obj.css("display", this.input[0].value);
        }

        const propertyActions = {
            'Тип элемента': () => {
                this.handleElementType();
            },
            'Тип заголовка': () => {
                this.handleHeaderType();
            },
            'display': () => {
                this.handleDisplayType();
            }
        }

        const propertyAction = propertyActions[this.parentValue.name];

        if (propertyAction) {
            propertyAction();
        }

    };

    FormInput.call(this, params);
    
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