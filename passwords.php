<?php
/**
 * Created by IntelliJ IDEA.
 * User: KoniWatson
 * Date: 29/01/2020
 * Time: 16:55
 */

function get_Password() {
    if (strpos($_SERVER['PHP_SELF'], "/~xpb17174/") === 0) {
        return "Ces2017-2021";
    }else {
        die("UNAUTHORISED");
    }
}