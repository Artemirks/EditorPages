<?php
require($_SERVER['DOCUMENT_ROOT'] .$_SERVER['REQUEST_URI'] . 'php/ListProjects.php');
$manage = new ListProjects();
if (!is_dir("Projects")) {
    mkdir("Projects");
    chmod("Projects", 0775);
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We" crossorigin="anonymous">
    <title>Проекты</title>
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/script.js"></script>
</head>

<body>
    <div class="wrapper">
        <div class="wrapperButtons">
            <div class="d-grid gap-4 d-md-flex justify-content-md-end">
                <button class="btn btn-success  btn-lg me-md-2" id="newProject">Новый проект</button>
            </div>
        </div>
        <div class="wrapperProjects">
            <h2>Список проектов</h2>
            <?php
            $projects = $manage->getProjects([
                "projectPlace" => $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . 'Projects/'
            ]);
            foreach ($projects as $project) {
                echo "
            <div class=\"card\">
                <div class=\"card-header\">".
                    $project['name']."</div>
            </div>
                    ";
            }
            ?>
        </div>
    </div>
    <div class="popup-fade">
        <div class="popup">
            <a class="popup-close" href="#">Закрыть</a>
            <label for="nameProject">Введите имя проекта</label>
            <form id="formCreator" method="POST">
                <input type="hidden" name="nextPage" value="<?php
                    echo $_SERVER['REQUEST_URI']
                ?>">
                <input type="hidden" name="editorPath" value="<?php
                    echo $_SERVER['REQUEST_URI']
                ?>">
                <input id="nameProject" name="nameCreateProject" type="text">
                <input class="btn btn-success" id="createProject" type="submit" value="Создать">
            </form>
        </div>
    </div>
</body>

</html>