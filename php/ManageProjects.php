<?php
class ManageProjects
{
    function createProject()
    {
        if (isset($_POST['nameCreateProject'])) {
            if (!is_dir($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath']. 'Projects/' . $_POST['nameCreateProject'])) {
                mkdir($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath']. 'Projects/' . $_POST['nameCreateProject']);
                chmod($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath']. 'Projects/' . $_POST['nameCreateProject'], 0775);
                $this -> copyFolder([
                    "fromPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath']. 'Template/',
                    "toPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath']. 'Projects/' . $_POST['nameCreateProject']
                ]);
                return true;
            }
            return false;
        }
    }

    function deleteProject($params)
    {
        if (!file_exists($params['deleteDirPath'])) {
            return true;
        }
    
        if (!is_dir($params['deleteDirPath'])) {
            return unlink($params['deleteDirPath']);
        }
    
        foreach (scandir($params['deleteDirPath']) as $item) {
            if ($item == '.' || $item == '..') {
                continue;
            }
    
            if (! $this -> deleteProject([
                "deleteDirPath" => $params['deleteDirPath'] . DIRECTORY_SEPARATOR . $item
                ])) {
                return false;
            }
    
        }
    
        return rmdir($params['deleteDirPath']);
    }

    function copyFolder($params)
    {
        if (is_dir($params['fromPath'])) {
            @mkdir($params['toPath']);
            chmod($params['toPath'], 0775);
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
                chmod($params['toPath'], 0664);
        }
    }

    function saveProjectsJson($params)
    {
        file_put_contents($params['saveDirPath'], $_POST['dataJSON']);
    }
}

$manage = new ManageProjects();

if (isset($_POST['nameCreateProject'])) {
    header('Content-Type: application/json');

    $result = array(
        'isDirCreate'  => $manage->createProject(),
        'nextPage' => $_POST['nextPage']
    );

    echo json_encode($result);
}

if (isset($_POST['nameDeleteProject'])) {
    header('Content-Type: application/json');

    $manage->deleteProject([
        "deleteDirPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] .'Projects/' . $_POST['nameDeleteProject']
    ]);
    $result = array(
        'nextPage' => $_POST['nextPage']
    );

    echo json_encode($result);
}

if (isset($_POST['dataJSON'])) {

    $manage->saveProjectsJson([
        "saveDirPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] .'Projects/' . $_POST['nameProject'] .'/data.json'
    ]);

}
