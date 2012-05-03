<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

    public function __construct($application) {
        parent::__construct($application);
        date_default_timezone_set('UTC');
    }

    protected function _initAutoload() {

        $front = $this->bootstrap("frontController")->frontController;
        $modules = $front->getControllerDirectory();
        $default = $front->getDefaultModule();

        foreach (array_keys($modules) as $module) {
            if ($module === $default) {
                continue;
            }

            $moduleloader = new Zend_Application_Module_Autoloader(array(
                        'namespace' => $module,
                        'basePath' => $front->getModuleDirectory($module)));
            return $moduleloader;
        }
    }

  /*  protected function _initAutoloadModules() {
        $moduleLoader = new Zend_Application_Module_Autoloader(
                        array(
                            'namespace' => '',
                            //'basePath' => APPLICATION_PATH . '/modules/admin',
                            'basePath' => APPLICATION_PATH . '/modules/default')
        );
        return $moduleLoader;
    }*/

    protected function _initDb() {
        try {
            $config = new Zend_Config_Ini(APPLICATION_PATH . '/configs/application.ini', 'production');
            $dbConfig = $config->get("resources")->get("db")->get("params");
            $db = new Zend_Db_Adapter_Pdo_Mysql(array(
                        'host' => $dbConfig->host,
                        'username' => $dbConfig->username,
                        'password' => $dbConfig->password,
                        'dbname' => $dbConfig->dbname
                    ));
            Zend_Db_Table_Abstract::setDefaultAdapter($db);
        } catch (Exception $e) {
            echo "Error : " . $e->getMessage();
        }
    }

    protected function _initRoutes() {

        $front = Zend_Controller_Front::getInstance();
        $router = $front->getRouter();
        $restRoute = new Zend_Rest_Route($front, array(), array(
                    'admin' => array('rest'),
                ));
        $router->addRoute('rest', $restRoute);
    }

}

