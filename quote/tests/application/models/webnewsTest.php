<?php
require_once 'Zend/Application.php';
require_once 'Zend/Test/PHPUnit/ControllerTestCase.php';
class webnewsTest extends ControllerTestCase{
	public function testgetWebnews(){
		$news = new admin_Model_Webnews();
		echo "<pre>";
		//print_r($news->getWebnews());
	}
	public function testsave(){
		$webnews = new admin_Model_Webnews();
	    $webnews->setContent('test content');	    			
	    $webnews->setHeadLine('testttt'); 
	    $webnews->setId(2);
	    $webnews->setDate('2012-02-03');
		try{
         	$result = $webnews->save($webnews);
            $this->assertEquals($result,true);
	    }catch(Exception $e) {
	         echo "Error :".$e->getMessage();
	    }
	    
	}
	
	public function testgetnews(){
		//$webnews = new admin_Model_Webnews();
		//$data = $webnews->getWebnewsDetails(2);
		//print_r($data);

	}
	
	 public function testDeleteNews(){
	 	$webnews = new admin_Model_Webnews();
		$data = $webnews->deleteNews(4);
		$this->assertEquals($data,true);
	 }
}