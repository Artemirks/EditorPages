
//Поля форм

function FormInput_string( params ) {
    this.parentValue = params.parentValue;
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
    this.set = function () {
        switch (params.parentValue.name) {
            case 'Title':
                document.title = this.input.val();
        }
        this.parentValue.value = this.input.val();
    }
}

function FormInput_color( params ) {
    this.parentValue = params.parentValue;
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
    this.set = function () {
        params.panel.elem.obj.css("backgroundColor", this.input.val());
        this.parentValue.value = this.input.val();
    }
}

function FormInput_submit( params ) {
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

function FormInput_saveJSON( params ) {
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

function FormInput_openJSON( params ) {
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
        this.loadJSON();
    }, this.panel.editor))
}

function FormInput_saveProject( params ) {
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
        //this.saveHTML();
    }, this.panel.editor))
}