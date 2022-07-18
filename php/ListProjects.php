<?php
class ListProjects
{
    function getProjects($params)
    {
        $output = [];
        $dirs = scandir($params['projectPlace']);
        foreach ($dirs as $dirElem) {
            if ($dirElem != '.' && $dirElem != '..') {
                $output[] = [
                    'name' => $dirElem
                ];
            }
        }
        return $output;
    }
}
?>