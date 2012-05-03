<?php

require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';

class rateLineTest extends ControllerTestCase {

    public function testSaveRateLine() {
       // echo "testSaveRateLine";
        $rateLine = new admin_Model_RateLine(2,1);
       	$rateLine->setAdmittedTaxPayableByInsuredAndAdminByInsurerOrAgent(null);
      	$rateLine->setAdmittedTaxPayablebyInsuredandAdministeredByInsurer('yes');
        $rateLine->setAdmittedRate(0);
        $rateLine->setAuthorised('Tolerated');
        $rateLine->setBasisOfCalculation('Premium');
        $rateLine->setCountry('Andorra');
        $rateLine->setEconomicArea('Rest of Europe');
        $rateLine->setInsuranceClass('Accident');
        $rateLine->setNonAdmittedTaxPayableByInsuredLocally('Yes');
        $rateLine->setTaxAdminister('Insurer');
        $rateLine->setNonAdmittedRate(0);
        $rateLine->setBasisOfCalculation(1);
        $rateLine->setCountryId(4);
        $rateLine->setCurrencyId(2);
        $rateLine->setInsuranceClassId(1);
        $rateLine->setRegionId(7);
        $rateLine->setRateStartDate('2010-01-01');
        $rateLine->setCreateDate('2009-12-15 12:20:34');
        $rateLine->setModifiedDate('2012-02-07 11:24:53');
        $rateLine->setRateDisplay('Percentage');
        try {
            $staus = $rateLine->saveRateLine();
            $this->assertEquals($staus, TRUE);
        } catch (Exception $exc) {
            echo $exc->getMessage();
        }
    }
    
    public function testDeletRateline(){
        try{
            $rateline  = new admin_Model_RateLine(2,1);
            $result = $rateline->deleteRateline(2);
            $this->assertEquals($result, TRUE);
        }catch (Exception $exc) {
            echo $exc->getMessage();
        }    
    }

}

?>
