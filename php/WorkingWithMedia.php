<?php
class WorkingWithMedia
{
    function uploadFile($fileInputName, $targetDirectory) {
        if (isset($_FILES) && isset($_FILES[$fileInputName])) {
            $uploadedFile = $_FILES[$fileInputName];

            if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
                return false;
            }

            $tempFilePath = $uploadedFile['tmp_name'];
            $targetFilePath = $targetDirectory . '/' . basename($uploadedFile);
        }
    }
}

//$workingWithMedia = new WorkingWithMedia();

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
        "deleteDirPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameDeleteProject']
    ]);
    $result = array(
        'nextPage' => $_POST['nextPage']
    );

    echo json_encode($result);
}

if (isset($_POST['dataJSON'])) {

    $manage->saveProjectsJson([
        "saveDirPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameProject'] . '/data.json'
    ]);
}

if (isset($_POST['nameDownloadProject'])) {

    if (isset($_POST['isAlreadyDownload'])) {
        unlink($_SERVER['DOCUMENT_ROOT'] . $_POST['nameDownloadProject']);
    } else {
        header('Content-Type: application/json');

        $manage->createZip($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameDownloadProject'],  $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . $_POST['nameDownloadProject'].'.zip');
    
        $result = array(
        "zipPath" => $_POST['editorPath'] .  $_POST['nameDownloadProject'].'.zip'
        );
        echo json_encode($result);
    }
    
}
