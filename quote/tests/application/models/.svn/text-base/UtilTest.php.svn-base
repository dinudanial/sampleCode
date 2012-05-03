<?php
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';
class UtilTest extends ControllerTestCase{
   
    public function testGetInsuranceClasses(){
        $result = admin_Model_Util::getInsuranceClasses();
        //print_r($result);
        $this->assertType('array', $result);
    }
	public function testGetCurrency(){
        $result = admin_Model_Util::getCurrency();
        //print_r($result);
        $this->assertType('array', $result);
    }
}

?>
