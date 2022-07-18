<?php
class ManageProjects
{
    function createProject($params)
    {
        if (isset($params['nameCreateProject'])) {
            if (!is_dir($_SERVER['DOCUMENT_ROOT'] . '/Projects/' . $params['nameCreateProject'])) {
                mkdir($_SERVER['DOCUMENT_ROOT'] . '/Projects/' . $params['nameCreateProject']);
                chmod($_SERVER['DOCUMENT_ROOT'] . '/Projects/' . $params['nameCreateProject'], 0775);
                return true;
            }
            return false;
        }
    }

    function deleteProject($params)
    {
        rmdir($_SERVER['DOCUMENT_ROOT'] . '/Projects/' . $params['nameDeleteProject']);
    }

    function copyFolder($params)
    {
        if (is_dir($params['fromPath'])) {
            @mkdir($params['toPath']);
            $d = dir($params['fromPath']);
            while (false !== ($entry = $d->read())) {
                if ($entry == "." || $entry == "..") continue;
                $this -> copyFolder([
                    "fromPath" => $params['fromPath'].'/'.$entry,
                    "toPath" => $params['toPath'].'/'.$entry
                ]);
            }
            $d->close();
        } else {
            if (!file_exists($params['toPath']))
                copy($params['fromPath'], $params['toPath']);
        }
    }
}

$manage = new ManageProjects();

if (isset($_POST['nameCreateProject'])) {
    header('Content-Type: application/json');

    $result = array(
        'isDirCreate'  => $manage->createProject($_POST),
        'nextPage' => $_POST['nextPage']
    );

    echo json_encode($result);
}

if (isset($_POST['nameDeleteProject'])) {
    header('Content-Type: application/json');

    $manage->deleteProject($_POST);
    $result = array(
        'nextPage' => $_POST['nextPage']
    );

    echo json_encode($result);
}
