<?php
	error_reporting(0);
    define('MYSQL_HOST','localhost');
    define('MYSQL_USERNAME','gkurek_test');
    define('MYSQL_PASSWORD','admin');
    define('MY_DB','gkurek_test');

    $db_link = mysql_connect(MYSQL_HOST, MYSQL_USERNAME, MYSQL_PASSWORD);
    mysql_select_db(MY_DB, $db_link) or die("Could not select database");

		$array = array();
        $sel = "SELECT * FROM  `gkurek_test`.`stats`";
        $res = mysql_query($sel);
        while ($row = mysql_fetch_assoc($res)) {
            $array[] =  $row;
        }
		
		echo json_encode($array, true);
		
?>