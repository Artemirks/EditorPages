$(document).ready(function () {
	$("#newProject").click(function () {
		$('.popup-fade').fadeIn();
		return false;
	});

	$('.popup-close').click(function () {
		$(this).parents('.popup-fade').fadeOut();
		return false;
	});

	// Закрытие по клавише Esc.
	$(document).keydown(function (e) {
		if (e.keyCode === 27) {
			e.stopPropagation();
			$('.popup-fade').fadeOut();
		}
	});

	// Клик по фону, но не по окну.
	$('.popup-fade').click(function (e) {
		if ($(e.target).closest('.popup').length == 0) {
			$(this).fadeOut();
		}
	});

	$("#formCreator").on("submit", function (e) {
		e.preventDefault();
		$.ajax({
			url: `${window.location.pathname}php/ManageProjects.php`,
			method: "post",
			dataType: 'json',
			data: $(this).serialize(),
			success: function (data) {
				if (data.isDirCreate) {
					window.location.href = data.nextPage;
				} else {
					alert("Проект с таким именем уже сущетсвует");
					window.location.href = data.nextPage;
				}
			}
		});
	});

	$(".card-header").on("click", function () {
		if ($(".card-body", $(this).parent()).length > 0) {
			$(".card-body", $(this).parent()).remove();
		} else {
			for (let i = 0; i < $(".card-body").length; i++) {
				$(".card-body")[i].remove();
			}
			$(this).parent().append($('<div>', {
					"class": "card-body"
				})
				.append($("<form>", {
						"id": "formDownload",
						"style": "display: inline-block; margin-right: 20px",
						"submit": function (e) {
							e.preventDefault();
							$.ajax({
								url: `${window.location.pathname}php/ManageProjects.php`,
								method: "post",
								dataType: 'json',
								data: {
									"nameDownloadProject": $(this)[0][0].value,
									"editorPath": $(this)[0][1].value,
								},
								success: function (data) {
									let link = $("<a>", {
										href: data.zipPath,
										download: data.zipPath.match(/[^\/]*\..*/m)[0],
										css: {
											display: 'none'
										}
									});
									$("body").append(link);
									link.get(0).click();
									link.remove();
								}
							}).done(
								function (data) {
									$.ajax({
										url: `${window.location.pathname}php/ManageProjects.php`,
										method: "post",
										data: {
											"nameDownloadProject": data.zipPath,
											"isAlreadyDownload": true
										}
									});

								})
								.fail(function (data) {
									console.log(data)
									alert('Ошибка скачивания');
								});
						}
					})
					.append($("<input>", {
						"type": "hidden",
						"name": "nameDownloadProject",
						"value": $(this).text()
					}))
					.append($("<input>", {
						"type": "hidden",
						"name": "editorPath",
						"value": window.location.pathname
					}))
					.append($("<input>", {
						"class": "btn btn-primary",
						"type": "submit",
						"value": "Скачать"
					})))
				.append($("<form>", {
						"id": "formEditor",
						"style": "display: inline-block; margin-right: 20px",
						"method": "POST",
						"action": `${window.location.pathname}editorProject.php`

					})
					.append($("<input>", {
						"type": "hidden",
						"name": "nameEditProject",
						"value": $(this).text()
					}))
					.append($("<input>", {
						"class": "btn btn-primary",
						"type": "submit",
						"value": "Редактировать"
					})))
				.append($("<form>", {
						"id": "formDelete",
						"style": "display: inline-block; margin-right: 20px",
						"submit": function (e) {
							e.preventDefault();
							if (confirm("Вы уверены? Это действие нельзя отменить")) {
								$.ajax({
									url: `${window.location.pathname}php/ManageProjects.php`,
									method: "post",
									dataType: 'json',
									data: $(this).serialize(),
									success: function (data) {
										window.location.href = data.nextPage;
									}
								});
							}
						}
					})
					.append($("<input>", {
						"type": "hidden",
						"name": "nameDeleteProject",
						"value": $(this).text()
					}))
					.append($("<input>", {
						"type": "hidden",
						"name": "nextPage",
						"value": window.location.href
					}))
					.append($("<input>", {
						"type": "hidden",
						"name": "editorPath",
						"value": window.location.pathname
					}))
					.append($("<input>", {
						"class": "btn btn-primary",
						"type": "submit",
						"value": "Удалить"
					}))));
		}
	});
});