<?php
    define( 'EDITOR_PATH', '/' );
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
    <script src="Properties/Properties.js"></script>
    <script src="Forms/Forms.js"></script>
<?php
    $elements = $editor->getElements();
    foreach( $elements as $elem ) 
    {
        if ( $elem[ "js" ] != null ) {
            echo "
    <script src=\"{$elem[ "js" ]}\"></script>
        ";
        }
        if ( $elem[ "css" ] != null ) {
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
            new Editor({
                obj: this
            });
        })
    </script>
</body>

</html>