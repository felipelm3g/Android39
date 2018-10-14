<?php

require_once 'phpmailer/class.phpmailer.php';

class Email {
    
    //Define o remetente
    private $remt_nome;
    private $remt_email;
    
    //Define os destinatário(s)
    private $des_nome;
    private $des_email;
    
    //Define o corpo do email
    private $assunto;
    private $txt_email;

    private function getRemt_nome() { return $this->remt_nome; }
    private function getRemt_email() { return $this->remt_email; }
    private function getDes_nome() { return $this->des_nome; }
    private function getDes_email() { return $this->des_email; }
    private function getAssunto() { return $this->assunto; }
    private function getTxt_email() { return $this->txt_email; }

    private function setRemt_nome($remt_nome) {
        $this->remt_nome = $remt_nome;
    }
    private function setRemt_email($remt_email) {
        $this->remt_email = $remt_email;
    }
    private function setDes_nome($des_nome) {
        $this->des_nome = $des_nome;
    }
    private function setDes_email($des_email) {
        $this->des_email = $des_email;
    }
    private function setAssunto($assunto) {
        $this->assunto = $assunto;
    }
    private function setTxt_email($txt_email) {
        $this->txt_email = $txt_email;
    }

    public function __construct() {}
    
    public function remetente ($n, $e) {
        //Define o remetente
        $this->setRemt_nome($n);
        $this->setRemt_email($e);
    }
    
    public function destinatario ($n, $e) {
        //Define os destinatário(s)
        $this->setDes_nome($n);
        $this->setDes_email($e);
    }

    public function emailCadastro($link) {
        $html = file_get_contents("https://felipelopes.eti.br/ArquivosHTML/conf_email.html");
        $html = str_replace("/NOME/", "{$this->getDes_nome()}" , $html);
        $html = str_replace("/LINK/", $link, $html);

        //Define o corpo do email
        $this->setAssunto("Confirme seu cadastro");
        $this->setTxt_email("$html");
    }
    
    public function enviar() {
        $mail = new PHPMailer(true);
        $mail->IsSMTP();

        try {
            $mail->Host = 'smtp.gmail.com'; // Endereço do servidor SMTP (Autenticação, utilize o host smtp.seudomínio.com.br)
            $mail->SMTPAuth   = true;  // Usar autenticação SMTP (obrigatório para smtp.seudomínio.com.br)
            $mail->Port       = 587; //  Usar 587 porta SMTP
            $mail->Username = 'noreplythisemail07@gmail.com'; // Usuário do servidor SMTP (endereço de email)
            $mail->Password = 'felipe12345'; // Senha do servidor SMTP (senha do email usado)

            //Define o remetente
            $mail->SetFrom("{$this->getRemt_email()}", "{$this->getRemt_nome()}"); //Seu e-mail
            $mail->AddReplyTo("{$this->getRemt_email()}", "{$this->getRemt_nome()}"); //Seu e-mail
            $mail->Subject = "{$this->getAssunto()}";//Assunto do e-mail


            //Define os destinatário(s)
            $mail->AddAddress("{$this->getDes_email()}", "{$this->getDes_nome()}");

            //Campos abaixo são opcionais 
            //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
            //$mail->AddCC('destinarario@dominio.com.br', 'Destinatario'); // Copia
            //$mail->AddBCC('destinatario_oculto@dominio.com.br', 'Destinatario2`'); // Cópia Oculta
            //$mail->AddAttachment('images/phpmailer.gif');      // Adicionar um anexo


            //Define o corpo do email
            $mail->MsgHTML("{$this->getTxt_email()}"); 

            ////Caso queira colocar o conteudo de um arquivo utilize o método abaixo ao invés da mensagem no corpo do e-mail.
            //$mail->MsgHTML(file_get_contents('arquivo.html'));

            $mail->Send();
            
            return true;

           //caso apresente algum erro é apresentado abaixo com essa exceção.
        } catch (phpmailerException $e) {
            return $e->errorMessage(); //Mensagem de erro costumizada do PHPMailer
        }
    }

}
