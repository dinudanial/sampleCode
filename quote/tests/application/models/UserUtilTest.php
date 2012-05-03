<?php

require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';

class UserUtilTest extends ControllerTestCase {

    public function testGetLineOfBusinesses() {
        $result = Model_UserUtil::getLineOfBusinesses();
        print_r($result);
        $this->assertType('array', $result);
    }

}
