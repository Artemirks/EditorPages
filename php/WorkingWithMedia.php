<?php
class WorkingWithMedia
{
    function uploadFile($fileInputName, $targetDirectory)
    {
        if (isset($_FILES) && isset($_FILES[$fileInputName])) {
            $uploadedFile = $_FILES[$fileInputName];

            if ($uploadedFile['error'] !== UPLOAD_ERR_OK) {
                return false;
            }

            $tempFilePath = $uploadedFile['tmp_name'];
            $newFilePath = $this->generateUniqueFileName($targetDirectory, $uploadedFile['name']);
            $targetFilePath = $targetDirectory . '/' . $newFilePath;
            if (move_uploaded_file($tempFilePath, $targetFilePath)) {
                chmod($targetFilePath, 0664);
                return $newFilePath;
            } else {
                return false;
            }
        }
    }
    private function generateUniqueFileName($targetDirectory, $originalFileName)
    {
        $fileName = basename($originalFileName);
        $targetFilePath = $targetDirectory . '/' . $fileName;
        $counter = 1;
        while (file_exists($targetFilePath)) {
            $fileName = $counter . '_' . basename($originalFileName);
            $targetFilePath = $targetDirectory . '/' . $fileName;
            $counter++;
        }
        return $fileName;
    }

    public function deleteFile($filePath)
    {
        if (file_exists($filePath)) {
            if (unlink($filePath)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}

function sanitazeInput($input)
{
    $output = trim($input);
    $output = stripslashes($output);
    $output = htmlspecialchars($output, ENT_QUOTES, 'UTF-8');

    return $output;
}
$workingWithMedia = new WorkingWithMedia();
if (isset($_POST['deletePath'])) {
    $filePath = sanitazeInput($_POST['deletePath']);
    $deleteResult = $workingWithMedia->deleteFile('../Projects/' . sanitazeInput($_POST['projectName']) . '/img/' . $filePath);
    if ($deleteResult) {
        $responce = [
            'success' => true,
            'message' => 'Файл успешно удален'
        ];
    } else {
        $responce = [
            'success' => false,
            'message' => 'Ошибка при удалении файла'
        ];
    }

    echo json_encode($responce);
} elseif (isset($_POST['projectName'])) {
    $targetDirectory = '../Projects/' . sanitazeInput($_POST['projectName']) . '/img';
    $fileInputName = 'file';
    $result = $workingWithMedia->uploadFile($fileInputName, $targetDirectory);
    if ($result !== false) {
        $responce = [
            'success' => true,
            'url' => $result
        ];
        echo json_encode($responce);
    }
}
