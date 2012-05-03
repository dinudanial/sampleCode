<?php
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';
class countryTest extends ControllerTestCase{
    
    public function testGetRegions(){
        $regionList = array();
        $region = new admin_Model_Region();
        $regionList = $region->getAllRegions();
        $r = new admin_Model_Region;
        $region = $regionList[0];
        //$this->assertType('object', $region);
        $this->assertAttributeEquals($region->getRegion(), 'region', $region);
    }
    
    public function testGetCountry(){
        $id = 368;
        $c = new admin_Model_Country();
        $country = $c->find($id);
       // $this->assertType('object', $country);
        $this->assertAttributeEquals($country->getCountry(), 'country', $country);
    }
    
    public function testGetJson(){
        $id = 368;
        $c = new admin_Model_Country();
        $country = $c->find($id);
        $json = admin_Model_Country::getJson($country);
        $this->assertType('string', $json);
    }
}

?>
