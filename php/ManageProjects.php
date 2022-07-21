<?php
class ManageProjects
{
    function createProject()
    {
        if (isset($_POST['nameCreateProject'])) {
            if (!is_dir($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameCreateProject'])) {
                mkdir($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameCreateProject']);
                chmod($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameCreateProject'], 0775);
                $this->copyFolder([
                    "fromPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Template/',
                    "toPath" => $_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'] . 'Projects/' . $_POST['nameCreateProject']
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

            if (!$this->deleteProject([
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
                $this->copyFolder([
                    "fromPath" => $params['fromPath'] . '/' . $entry,
                    "toPath" => $params['toPath'] . '/' . $entry
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

    function createZip($source, $destination)
    {
        if (!extension_loaded('zip') || !file_exists($source)) {
            return false;
        }

        $zip = new ZipArchive();
        if (!$zip->open($destination, ZIPARCHIVE::CREATE)) {
            return false;
        }

        $source = str_replace('\\', DIRECTORY_SEPARATOR, realpath($source));
        $source = str_replace('/', DIRECTORY_SEPARATOR, $source);

        if (is_dir($source) === true) {
            $files = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($source),
                RecursiveIteratorIterator::SELF_FIRST
            );

            foreach ($files as $file) {
                $file = str_replace('\\', DIRECTORY_SEPARATOR, $file);
                $file = str_replace('/', DIRECTORY_SEPARATOR, $file);

                if ($file == '.' || $file == '..' || empty($file) || $file == DIRECTORY_SEPARATOR) {
                    continue;
                }
                // Ignore "." and ".." folders
                if (in_array(substr($file, strrpos($file, DIRECTORY_SEPARATOR) + 1), array('.', '..'))) {
                    continue;
                }

                $file = realpath($file);
                $file = str_replace('\\', DIRECTORY_SEPARATOR, $file);
                $file = str_replace('/', DIRECTORY_SEPARATOR, $file);

                if (is_dir($file) === true) {
                    $d = str_replace($source . DIRECTORY_SEPARATOR, '', $file);
                    if (empty($d)) {
                        continue;
                    }
                    $zip->addEmptyDir($d);
                } elseif (is_file($file) === true) {
                    $zip->addFromString(
                        str_replace($source . DIRECTORY_SEPARATOR, '', $file),
                        file_get_contents($file)
                    );
                } else {
                    // do nothing
                }
            }
        } elseif (is_file($source) === true) {
            $zip->addFromString(basename($source), file_get_contents($source));
        }

        return $zip->close();
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
