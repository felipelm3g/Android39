<?php
require_once 'Email.php';
require_once 'Database.php';

class Users {
    
    //ID de registro do usuario
    private $id;
    
    //Email do usuario
    private $email;
    //Senha do usuario
    private $pass;
    
    //Nome do usuario
    private $name;
    //Sobrenome do usuario
    private $sname;
    
    //Tipo de usuario
    private $typ;
    
    //Status de E-mail
    private $stte;
    //Status de pagamento
    private $sttp;
    
    //Data do ultimo login
    private $dtl;
    //Hora do ultimo login
    private $hrl;
    
    
    //Alterar senha senha via link
    private $edt;
    
    private function getId() { return $this->id; }
    private function getEmail() { return $this->email; }
    private function getPass() { return $this->pass; }
    private function getName() { return $this->name; }
    private function getSname() { return $this->sname; }
    private function getTyp() { return $this->typ; }
    private function getStte() { return $this->stte; }
    private function getSttp() { return $this->sttp; }
    private function getDtl() { return $this->dtl; }
    private function getHrl() { return $this->hrl; }
    private function getEdt() { return $this->edt; }
    
    private function setId($id) {
        $this->id = intval($id);
    }
    private function setEmail($email) {
        $this->email = $email;
    }
    private function setPass($pass) {
        $this->pass = $pass;
    }
    private function setName($name) {
        $this->name = $name;
    }
    function setSname($sname) {
        $this->sname = $sname;
    }
    private function setTyp($typ) {
        $this->typ = $typ;
    }
    private function setStte($stte) {
        $this->stte = $stte;
    }
    private function setSttp($sttp) {
        $this->sttp = $sttp;
    }
    private function setDtl($dtl) {
        $this->dtl = $dtl;
    }
    private function setHrl($hrl) {
        $this->hrl = $hrl;
    }
    private function setEdt($edt) {
        $this->edt = $edt;
    }

        
    public function __construct($n, $sn, $e, $s) {
        $this->setName($n);
        $this->setSname($sn);
        $this->setEmail($e);
        $this->setPass($s);
    }
    
    public function cadastrar() {
        
        //Cria conexão com banco de dados
        $conexao = Database::conexao();
        
        $stmt = $conexao->query("SELECT COUNT(USER_EMAIL) FROM T_USER WHERE USER_EMAIL = '{$this->getEmail()}';");
        
        if($stmt->fetchColumn() > 0){
            throw new Exception("Usuario já cadastrado");
        } else {
            $senha = base64_encode("{$this->getPass()}");

            try {
                //Cria o comando SQL
                $stmt = $conexao->prepare('INSERT INTO T_USER (USER_EMAIL, USER_PASS, USER_NAME, USER_SNAME) VALUES (:email , :senha , :nome , :snome)');

                //Executa o comando SQL
                $stmt->execute(array(
                    ':email' => "{$this->getEmail()}",
                    ':senha' => "$senha",
                    ':nome' => "{$this->getName()}",
                    ':snome' => "{$this->getSname()}"
                ));

            } catch(PDOException $e) {
                throw new Exception($e->getMessage());
            }

            $email = new Email();

            $email->remetente("Portal Evolve", "noreplythisemail07@gmail.com");
            $email->destinatario("{$this->getName()}", "{$this->getEmail()}");
            
            $email->emailCadastro("http://www.teste.com.br/confirmar.php?email={$this->getEmail()}");

            if(!$email->enviar()) {
                throw new Exception("Erro ao enviar o e-mail de confirmação");
            } 
        }
        
    }
    
    public function ativarUser(){
        //Cria conexão com banco de dados
        $conexao = Database::conexao();
        
        $stmt = $conexao->query("SELECT COUNT(USER_EMAIL) FROM T_USER WHERE USER_EMAIL = '{$this->getEmail()}' AND USER_STTE = 0;");
        
        if($stmt->fetchColumn() == 0){
            return false;
        } else {
            try {
                //Cria o comando SQL
                $stmt = $conexao->query("SELECT USER_ID FROM T_USER WHERE USER_EMAIL = '{$this->getEmail()}';");
                //Executa o comando SQL
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                
                $this->setId($row['USER_ID']);
                                
                //Cria o comando SQL
                $stmt = $conexao->query("UPDATE T_USER SET USER_STTE = 1 WHERE USER_ID = {$this->getId()};");
                
                //Executa o comando SQL
                $stmt->execute();
                    
                return true;
                
            } catch(PDOException $e) {
                return false;
            }
        }
    }
}
