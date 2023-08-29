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
                case 'Width':
                    this.elem.obj.css("width", inputValue);
                    break;
                case 'Margin':
                    this.elem.obj.css("margin", inputValue);
                    break;
                case 'Padding':
                    this.elem.obj.css("padding", inputValue);
                    break;
                case 'Height':
                    this.elem.obj.css("height", inputValue);
                    break;
                case 'Font-size':
                    this.elem.obj.css("font-size", inputValue);
                    break;
                case 'Font Weight':
                    this.elem.obj.css("font-weight", inputValue);
                    break;
                case 'Font-family':
                    this.elem.obj.css("font-family", inputValue);
                    break;
                case 'Line-height':
                    this.elem.obj.css("line-height", inputValue);
                    break;
                case 'max-width':
                    this.elem.obj.css("max-width", inputValue);
                    break;
            }
            this.parentValue.value = inputValue;
        } else {
            switch (this.parentValue.name) {
                case 'Title':
                    document.title = this.parentValue.value;
                    break;
                case 'Margin':
                    this.elem.obj.css("margin",  this.parentValue.value);
                    break;
                case 'Padding':
                    this.elem.obj.css("padding",  this.parentValue.value);
                    break;
                case 'Width':
                    this.elem.obj.css("width", this.parentValue.value);
                    break;
                case 'Height':
                    this.elem.obj.css("height", this.parentValue.value);
                    break;
                case 'Font-size':
                    this.elem.obj.css("font-size", this.parentValue.value);
                    break;
                case 'Font Weight':
                    this.elem.obj.css("font-weight", this.parentValue.value);
                    break;
                case 'Font-family':
                    this.elem.obj.css("font-family", this.parentValue.value);
                    break;
                case 'Line-height':
                    this.elem.obj.css("line-height", this.parentValue.value);
                    break;
                case 'max-width':
                    this.elem.obj.css("max-width", this.parentValue.value);
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
    const selectedObject = this.parentValue.value.find(obj => obj.selected === true);
    params.isLabel = true;
    this.createInput = function (params) {
        return $("<select>", {
            id: `editor-field-${this.id}`
        });
    }

    this.options = [];
    if (params.elem.type == 'new' && params.elem.parent.possibleChilds.length != 0) {
        this.selectValues = params.elem.parent.possibleChilds;
    } else if (params.elem.possibleTypes.length != 0 && this.parentValue.name != 'justify-content') {
        this.selectValues = params.elem.possibleTypes;
    } else {
        this.selectValues = this.parentValue.value;
    }
    for (let i = 0; i < this.selectValues.length; i++) {
        this.options[i] = $("<option>", {
            label: this.selectValues[i].name,
            value: this.selectValues[i].type,
            //selected: this.parentValue[i].selected
        });
        if (selectedObject !== undefined) {
            if (this.options[i][0].value == selectedObject.type) {
                this.options[i][0].selected = true;
            }
        }
    }

    this.set = function () {
        this.setSelectedValue = function (array, valueToSet) {
            for (let i = 0; i < array.length; i++) {
                array[i].selected = array[i].type === valueToSet;
            }
        }

        this.handleElementType = function () {
            this.panel.obj.html("");
            console.log(this.parent.type)
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
            console.log(this.parent.childs);
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

        this.activateChoosenType = function (property) {
            this.setSelectedValue(this.parentValue.value, this.input[0].value);
            this.elem.obj.css(property, this.input[0].value);
        }

        const propertyActions = {
            'Тип элемента': () => {
                this.handleElementType();
            },
            'Тип заголовка': () => {
                this.handleHeaderType();
            }
        }

        const propertyAction = propertyActions[this.parentValue.name];

        if (propertyAction) {
            propertyAction();
        } else {
            this.activateChoosenType(this.parentValue.name);
        }

    };

    FormInput.call(this, params);

}

function FormInput_file(params) {
    params.isLabel = true;
    this.createInput = function (params) {
        console.log(params);
        const disabled = this.parentValue.disabled !== false ? true : false;
        return $("<input>", {
            type: "file",
            id: "editor-field-" + this.id,
            value: this.parentValue.value,
            accept: ".jpg, .jpeg, .png",
            disabled: disabled,
        });
    }


    this.set = function () {
        if (params.id !== undefined) {
            const fileInput = this.input[0];
            if (fileInput.files && fileInput.files[0] && !this.parentValue.disabled) {
                const file = fileInput.files[0];
                const formData = new FormData();
                formData.append('file', file);
                formData.append('projectName', params.parent.editor.nameProject);
                $.ajax({
                    url: 'php/WorkingWithMedia.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: (responce) => {
                        const imageURL = JSON.parse(responce).url;
                        this.elem.obj[0].src = `Projects/${params.parent.editor.nameProject}/img/${imageURL}`;
                        this.input[0].disabled = true;
                        this.parentValue.value = imageURL;
                    },
                    error: () => {
                        console.log('Ошибка загрузки файла');
                    }
                });
            }
        } else {
            if (this.parentValue.value != '') {
                this.elem.obj[0].src = `Projects/${params.elem.editor.nameProject}/img/${this.parentValue.value}`;
                this.parentValue.disabled = true;
            } else {
                this.elem.obj[0].src = './Elements/Img/Img.png';
                this.parentValue.disabled = false;
            }
        }


        /*   const propertyActions = {
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
          } */
    };
    FormInput.call(this, params);
}

function FormInput_submit(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            this.setProps();
        }, this.panel));
    }
    FormInput.call(this, params);
}

function FormInput_deleteImage(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            if (this.fields[1].input[0].disabled) {
                const formData = new FormData();
                formData.append('deletePath', this.elem.props.fileImage.values.fileImage.value);
                formData.append('projectName', this.editor.nameProject);
                $.ajax({
                    url: 'php/WorkingWithMedia.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: (responce) => {
                        this.elem.obj[0].src = './Elements/Img/Img.png';
                        this.fields[1].input[0].disabled = false;
                        this.elem.props.fileImage.values.fileImage.disabled = false;
                        this.elem.props.fileImage.values.fileImage.value = '';
                    },
                    error: () => {
                        console.log('Ошибка удаления файла');
                    }
                });
            }

        }, this.panel));
    }
    FormInput.call(this, params);
}

function FormInput_saveJSON(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            this.saveJSON();
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}

function FormInput_openJSON(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            this.openJSON();
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}

function FormInput_saveProject(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            this.panel.setProps();
            this.saveJSON();
            this.saveHTML();
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}

function FormInput_toProjectPage(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            window.location.href = "./";
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}

function FormInput_seePage(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            window.open(
                `./Projects/${this.nameProject}`,
                '_blank'
            );
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}

function FormInput_deleteElem(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            this.panel.obj.html("");
            for (let i = this.page.childs.length - 1; i > params.index; i--) {
                this.page.childs[i].index -= 2;
            }
            this.page.childs[params.index - 1].wrapper[0].remove();
            this.page.childs[params.index].wrapper[0].remove();
            this.page.childs.splice(params.index - 1, 2);
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}