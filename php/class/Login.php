<?php
require_once 'Database.php';


class Login {
    
    private $email;
    private $senha;

    private function setEmail($email) {
        $this->email = $email;
    }

    private function setSenha($senha) {
        //Transforma a senha inserida em base64
        $this->senha = base64_encode($senha);
    }

    public function verificaLogin() {
        $end = "<script language=\"javascript\">window.location='LINK';</script>";
        
        session_start();
        if(!isset($_SESSION['USER'])){
            throw new Exception('Você não está logado.');
        } else {
            if($_SESSION['USER']['EMAIL'] == "-"){
                throw new Exception('Você não está logado.');
            } elseif($_SESSION['USER']['TYP'] == 0) {
                if($_SESSION['USER']['STTP'] == 0){
                    throw new Exception('Você ainda não está liberado para assistir.');
                }
            } else {
                return true;
            }
        }
    }

    public function fazerLogin($e, $s){
        $this->setEmail($e);
        $this->setSenha($s);
        
        //Cria conexão com banco de dados
        $conexao = Database::conexao();
        
        //Cria o comando SQL
        $sql = "SELECT * FROM T_USER WHERE USER_EMAIL = '{$this->email}'";
        //Executa o comando SQL
        $stmt = $conexao->query($sql);
        //Prepara o resultado em um Array[]
        $consulta = $stmt->fetch(PDO::FETCH_ASSOC);
        
        
        //Verifica se a seleção retorna dados
        if(empty($consulta)){
            throw new Exception('E-mail inválido.');
            
        //Valida se a senha está correta    
        } elseif ($this->senha == $consulta['USER_PASS']) {
            
            //Deleta o campo senha do array e retorna para o sistema
            unset($consulta['USER_PASS']);
            
            //Cria sessão do usuario
            session_start();
            $_SESSION['USER'] = array(
                "ID"    => $consulta['USER_ID'],
                "EMAIL" => $consulta['USER_EMAIL'],
                "NAME"  => $consulta['USER_NAME'],
                "SNAME" => $consulta['USER_SNAME'],
                "TYP"   => $consulta['USER_TYP'],

                "STTE"  => $consulta['USER_STTE'],
                "STTP"  => $consulta['USER_STTP'],
            );
        
            return true;
        } else {
            throw new Exception('Senha inválida.');
        }
        
    }
    
    public function fazerLogout() {
        
        $_SESSION['USER'] = array();
        session_destroy();
        
        return true;
    }
}
