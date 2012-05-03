<?php

require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';

class TutorialTest extends ControllerTestCase {

    public function testSaveTutoral() {
//        try {
//            $tutorial = new admin_Model_Tutorial(null, 10, 'test tutorial1');
//            $tutorial->setId(null);
//            $tutorial->setGroupId(10);
//            $tutorial->setTutorialName('test tutorial55');
//            $tutorial->setHtmlUrl('test utl html');
//            $tutorial->setPdfUrl('test url pdf');
//            $tutorial->setStatus(1);
//            $tutorial->setCreatedBy('admin');
//            $tutorial->setCreatedDate('2009-12-15 12:20:34');
//            $result = $tutorial->addTutorial($tutorial);
//            $this->assertType('integer', $result);
//        } catch (Exception $e) {
//            echo 'Error : ' . $e->getMessage();
//        }
    }

    public function testGetTutorials() {
        try {
            $tutorial = new admin_Model_Tutorial();
            $list = $tutorial->getTutorials();
            $t = $list[0];
            $this->assertAttributeEquals($t->getTutorialName(), 'tutorialName', $t);
        } catch (Exception $e) {
            echo 'Error : ' . $e->getMessage();
        }
    }

}

?>
