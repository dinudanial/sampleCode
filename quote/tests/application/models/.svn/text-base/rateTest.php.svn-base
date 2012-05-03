<?php

require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';

class rateTest extends ControllerTestCase {

    public function testFilterRate() {
        $filter = array();
        $filter['region'] = 10;
        $filter['country'] = 368;
        try {
            $rate = new admin_Model_Rate();
            $result = $rate->find($filter);
            //print_r($result);
            $rate1 = $result[0];
          //  $this->assertAttributeEquals($rate1->getId(), 'id', $rate1);
            
        } catch (Exception $e) {
            echo "Error :".$e->getMessage();
        }
    }
    
    public function testtRateSave(){
    	 $rate = new admin_Model_Rate();
    	 $rate->setId((integer)4);  
    	 $rate->setTaxType('test');     
         $rate->setRegion((integer)2);
         $rate->setCountry((integer)44);
         $rate->setCurrency((integer)35);
         $rate->setInsuranceClass((integer)1);
         $rate->setTaxSubClass('test');
         $rate->setTertiry('ddfd');
         $rate->setDefaultSubClass((integer)1);
         $rate->setAutoCreate(true);
         try{
         	$result = $rate->saveRate($rate);
            $this->assertEquals($result,true);
	    }catch(Exception $e) {
	         echo "Error :".$e->getMessage();
	    }
    }
    
    public function testRateFind(){
    	$rate = new admin_Model_Rate();
    	try{
    		$rateData = $rate->findRate(5);
    		$rateId = $rateData->getId();
    		$this->assertEquals($rateId,5);
    	}catch(Exception $e) {
	         echo "Error :".$e->getMessage();
	    }
    	
    }
    
    public function testRateSubclass(){
    $rate = new admin_Model_Rate();
    	try{
    		$datArray= array();
    		$datArray['country'] =44;
    		$datArray['currency'] =35;
    		$datArray['typeoftax'] ='test';
    		$datArray['insuranceclass'] =1;
    		$rateData = $rate->findDefaultSubclass($datArray);
    		echo "<pre>";
    		print_r($rateData);
    	}catch(Exception $e) {
	         echo "Error :".$e->getMessage();
	    }
    }
    
    public function testRateDelete(){
        $rate = new admin_Model_Rate();
    	try{
    		$rateId = 6;
    		$rateResult = $rate->deleteRate($rateId);
    		$this->assertEquals($rateResult,true);
    	}catch(Exception $e) {
	     echo "Error :".$e->getMessage();
	}
    }

}

?>
