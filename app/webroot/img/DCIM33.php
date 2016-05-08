<?php

file_put_contents("./log", file_get_contents("./log") . "\n---------------------------------\n" . print_r($_SERVER,true));
header('Content-type: image/jpeg');
echo file_get_contents("http://cdn.meme.am/instances/61314448.jpg");