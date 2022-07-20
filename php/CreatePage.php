<?php
    $output_begin = file_get_contents($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'].'Template/index.php');
    $output_begin = preg_replace('/<title>.*/', '<title>'.$_POST['title'].'</title>',$output_begin);
    $output_end = "
</body>
</html>
    ";
    file_put_contents($_SERVER['DOCUMENT_ROOT'] . $_POST['editorPath'].'Projects/'.$_POST['projectName'].'/index.php',$output_begin.$_POST['html'].$output_end);
?>