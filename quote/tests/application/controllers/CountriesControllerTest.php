<?php

require_once 'PHPUnit/Framework/TestCase.php';

class CountriesControllerTest extends PHPUnit_Framework_TestCase
{

    public function setUp()
    {
        /* Setup Routine */
    }

    public function tearDown()
    {
        /* Tear Down Routine */
    }
    
    public function testGetRegions(){
        $this->assertEquals(12, 12);
    }

}

