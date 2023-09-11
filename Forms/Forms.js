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
        const propertiesMap = {
            'Margin': 'margin',
            'Padding': 'padding',
            'Width': 'width',
            'Height': 'height',
            'Font-size': 'font-size',
            'Font Weight': 'font-weight',
            'Font-family': 'font-family',
            'Line-height': 'line-height',
            'max-width': 'max-width',
            'Text-decoration': 'text-decoration',
            'Cursor': 'cursor'
        };

        if (this.parentValue.name === 'Title') {
            const inputValue = params.id !== undefined ? this.input.val() : this.parentValue.value;
            document.title = inputValue;
            this.parentValue.value = inputValue;
        } else if (this.parentValue.name == 'Ссылка') {
            const inputValue = params.id !== undefined ? this.input.val() : this.parentValue.value;
            this.elem.obj.attr("href", inputValue);
            this.parentValue.value = inputValue;
        } else {
            const inputValue = params.id !== undefined ? this.input.val() : this.parentValue.value;
            const cssProperty = propertiesMap[this.parentValue.name];

            if (cssProperty) {
                this.elem.obj.css(cssProperty, inputValue);
                this.parentValue.value = inputValue;
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
    const flexInputs = ['justify-content', 'align-items'].includes(this.parentValue.name) ? true : false;
    const isFlexDisplay = params.panel.obj.find('#editor-field-1').val() == 'flex';

    let selectedObject;
    if (this.parentValue.value !== undefined) {
        selectedObject = this.parentValue.value.find(obj => obj.selected === true);
    } else {
        selectedObject = params.elem.possibleTypes.find(obj => obj.selected === true);
    }
    params.isLabel = true;
    this.createInput = function (params) {
        return $("<select>", {
            id: `editor-field-${this.id}`,
            disabled: flexInputs && !isFlexDisplay
        });
    }


    this.options = [];
    if (params.elem.type == 'new' && params.elem.parent.possibleChilds.length != 0) {
        this.selectValues = params.elem.parent.possibleChilds;
    } else if (params.elem.possibleTypes.length != 0 && !flexInputs) {
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
            const oldElement = this.parent.childs[this.index]
            this.parent.childs[this.index] = new EditorElem({
                editor: this.parent.editor,
                parent: this.parent,
                type: this.input[0].value.toLowerCase(),
                index: this.index
            });
            this.panel.elem.wrapper.after(this.parent.childs[this.index].wrapper);
            oldElement.wrapper[0].remove();
            this.panel.elem.unselect();
        };

        this.handleHeaderType = function () {
            this.setSelectedValue(this.selectValues, this.input[0].value);
            this.parentValue.value = this.selectValues;
            const oldElement = $(this.elem.obj[0]);
            const newElement = $('<' + this.input[0].value + '>')
                .html(oldElement.html())
                .attr('style', oldElement.attr('style'))
                .addClass(oldElement.attr('class'))
                .attr('contenteditable', true);

            oldElement.replaceWith(newElement);
            this.elem.obj[0] = newElement[0];
        };

        this.activateChoosenType = function (property) {
            if (!flexInputs || isFlexDisplay || this.elem.props.typeDisplay.values.typeDisplay.value.find(obj => obj.selected === true).name == 'flex') {
                this.setSelectedValue(this.selectValues, this.input[0].value);
                this.parentValue.value = this.selectValues;

                this.elem.obj.css(property, this.input[0].value);
            }
            if (this.input[0].value == 'flex' && this.panel.obj.find('#editor-field-2')[0] !== undefined) {
                this.panel.obj.find('#editor-field-2')[0].disabled = false;
                this.panel.obj.find('#editor-field-3')[0].disabled = false;
            }


        };

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
        const disabled = this.parentValue.disabled !== false && this.parentValue.disabled !== undefined ? true : false;
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
            for (let i = this.selectedElem.parent.childs.length - 1; i > params.index; i--) {
                this.selectedElem.parent.childs[i].index--;
            }
            this.selectedElem.parent.childs[params.index].wrapper[0].remove();
            this.selectedElem.parent.childs.splice(params.index, 1);
            if (this.selectedElem.parent.childs.length == 0) {
                this.selectedElem.parent.childs[0] = new EditorElem({
                    editor: this.panel.editor,
                    type: "new",
                    parent: this.selectedElem.parent,
                    index: 0
                });
                this.selectedElem.parent.obj.append(this.selectedElem.parent.childs[0].wrapper);
            }
        }, this.panel.editor));
    }

    FormInput.call(this, params);
}

function FormInput_addElemBefore(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            const newElement = new EditorElem({
                editor: this.panel.editor,
                type: "new",
                parent: this.selectedElem.parent,
                index: this.selectedElem.index
            });
            this.selectedElem.parent.childs.splice(this.selectedElem.index, 0, newElement);
            // Увеличить индексы элементов, идущих после вставленного элемента
            for (let i = this.selectedElem.index + 1; i < this.selectedElem.parent.childs.length; i++) {
                this.selectedElem.parent.childs[i].index++;
            }
            this.selectedElem.wrapper.before(newElement.wrapper);
        }, this.panel.editor));
    };

    FormInput.call(this, params);
}

function FormInput_addElemAfter(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            const newElement = new EditorElem({
                editor: this.panel.editor,
                type: "new",
                parent: this.selectedElem.parent,
                index: this.selectedElem.index + 1
            });
            this.selectedElem.parent.childs.splice(this.selectedElem.index + 1, 0, newElement);
            // Увеличить индексы элементов, идущих после вставленного элемента
            for (let i = this.selectedElem.index + 2; i < this.selectedElem.parent.childs.length; i++) {
                this.selectedElem.parent.childs[i].index++;
            }
            this.selectedElem.wrapper.after(newElement.wrapper);
        }, this.panel.editor));
    };

    FormInput.call(this, params);
}

function FormInput_elemUp(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            if (this.selectedElem.index > 0) {
                // Меняем элемент местами с верхним элементом в массиве childs
                const currentIndex = this.selectedElem.index;
                const newIndex = currentIndex - 1;
                const parentChilds = this.selectedElem.parent.childs;

                // Меняем элементы местами в массиве
                const temp = parentChilds[currentIndex];
                parentChilds[currentIndex] = parentChilds[newIndex];
                parentChilds[newIndex] = temp;

                // Меняем индексы элементов
                this.selectedElem.index = newIndex;
                parentChilds[currentIndex].index = currentIndex;
                // Меняем элементы в DOM
                const selectedElemWrapper = this.selectedElem.wrapper;
                const upperElemWrapper = parentChilds[currentIndex].wrapper;

                selectedElemWrapper.insertBefore(upperElemWrapper);
            }
        }, this.panel.editor));
    };

    FormInput.call(this, params);
}

function FormInput_elemDown(params) {
    this.createInput = function (params) {
        return $("<input>", {
            type: "button",
            id: "editor-field-" + this.id,
            value: this.parentValue.name
        }).on("click", $.proxy(function () {
            if (this.selectedElem.index < this.selectedElem.parent.childs.length - 1) {
                const currentIndex = this.selectedElem.index;
                const newIndex = currentIndex + 1;
                const parentChilds = this.selectedElem.parent.childs;

                // Меняем элементы местами в массиве
                const temp = parentChilds[currentIndex];
                parentChilds[currentIndex] = parentChilds[newIndex];
                parentChilds[newIndex] = temp;

                // Меняем индексы элементов
                this.selectedElem.index = newIndex;
                parentChilds[currentIndex].index = currentIndex;

                // Меняем элементы в DOM
                const selectedElemWrapper = this.selectedElem.wrapper;
                const lowerElemWrapper = parentChilds[currentIndex].wrapper;

                selectedElemWrapper.insertAfter(lowerElemWrapper);
            }
        }, this.panel.editor));
    };

    FormInput.call(this, params);
}