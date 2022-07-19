<?php
    $matches = [];
    preg_match('/.*\//',$_SERVER['REQUEST_URI'], $matches);
    define( 'EDITOR_PATH', $matches[0]);
    require( $_SERVER[ 'DOCUMENT_ROOT' ].EDITOR_PATH.'php/Editor.php' );
    $editor = new Editor();
    
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Конструктор</title>
    <link rel="stylesheet" href="css/editor.css">
    <script src="js/jquery-3.6.0.min.js"></script>
    <script src="js/editor.js"></script>
    <script src="Properties/Properties.js?v1"></script>
    <script src="Forms/Forms.js?v1"></script>
<?php
    $elements = $editor->getElements();
    foreach( $elements as $elem ) 
    {
        if (array_key_exists('js', $elem) && $elem[ "js" ] != null ) {
            echo "
    <script src=\"{$elem[ "js" ]}\"></script>
        ";
        }
        if (array_key_exists('css', $elem) && $elem[ "css" ] != null ) {
            echo "
    <link rel=\"stylesheet\" href=\"{$elem[ "css" ]}\"></link>
        ";
        }
        
    }
?>
</head>

<body>
    <div class="editor">

    </div>
    <script>
        $(".editor").each(function() {
            editor = new Editor({
                obj: this,
                "nameProject": "<?php if (isset($_POST['nameEditProject'])) {echo $_POST['nameEditProject']; } else {echo 'test';}  ?>"
            });
            editor.loadJSON({
                
            });
        })
    </script>
</body>

</html>