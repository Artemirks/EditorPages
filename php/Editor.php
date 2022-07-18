<?php
class Editor
{
    function getElements()
    {
        $output = [];
        $dirs = scandir( $_SERVER[ 'DOCUMENT_ROOT' ].EDITOR_PATH.'Elements/' );
        foreach( $dirs as $dirElem ) 
        {
            if ( $dirElem != '.' && $dirElem != '..' ) {
                $filesElem = scandir( $_SERVER[ 'DOCUMENT_ROOT' ].EDITOR_PATH.'Elements/'.$dirElem.'/' );
                foreach ( $filesElem as $fileElem)
                {
                    if ( $fileElem!= '.' && $fileElem != '..' ) {
                        if ( $fileElem == $dirElem.'.js') {
                            $output[] = [
                                'js'    => EDITOR_PATH.'Elements/'.$dirElem.'/'.$dirElem.'.js',
                            ];
                        }
                        if ( $fileElem == $dirElem.'.css') {
                            $output[] = [
                                'css'    => EDITOR_PATH.'Elements/'.$dirElem.'/'.$dirElem.'.css',
                            ];
                        }
                    }
                }
              /*   $output[] = [
                    'js'    => EDITOR_PATH.'Elements/'.$dirElem.'/'.$dirElem.'.js',
                ]; */
            }
        }
        return $output;
    }
} 
?>