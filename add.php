<?php
    error_reporting(0);
    define('MYSQL_HOST','localhost');
    define('MYSQL_USERNAME','gkurek_test');
    define('MYSQL_PASSWORD','admin');
    define('MY_DB','gkurek_test');

    $db_link = mysql_connect(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD);
    mysql_select_db(MY_DB, $db_link) or die("Could not select database");

    $time = $_GET['time'];
    mysql_query("INSERT INTO `stats` (`id`, `time`, `userTime`) VALUES (NULL, CURRENT_TIMESTAMP, '$time');");
    
    $arr['status'] = 'success';
    
    echo json_encode($arr, true);
    
?>