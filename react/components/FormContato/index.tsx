import React, { useState } from "react";
//@ts-ignore
import InputMask from "react-input-mask";
//@ts-ignore
import styles from "./style.css";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "", 
    mensagem: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/dataentities/FC/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Exibir uma mensagem de sucesso ou redirecionar o usuário após o envio bem-sucedido.
        const boxSucesso = document.getElementById("mensagemsucesso");
        if (boxSucesso != null) {
          boxSucesso.style.display = "block";
        }
        console.log("Dados enviados com sucesso!");
        setFormData({
          nome: "",
          email: "", 
          mensagem: "",
        });
      } else {
        // Lidar com erros, como validações do servidor.const box = document.getElementById("mensagemsucesso");
        const boxErro = document.getElementById("mensagemerro");
        if (boxErro != null) {
          boxErro.style.display = "block";
          setTimeout(function(){ boxErro.style.display = "none"; }, 3000);
        }
        console.error("Ocorreu um erro ao enviar os dados.");
      }
    } catch (error) {
      const boxErro = document.getElementById("mensagemerro");
      if (boxErro != null) {
        boxErro.style.display = "block";
        setTimeout(function(){ boxErro.style.display = "none"; }, 3000);
      }
      console.error("Ocorreu um erro ao enviar os dados.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formulariocontato}> 
      <div className={styles.groupInputs}>
        <label className={styles.label}>Seu nome:</label>
        <input type="text" id="name" name="nome" value={formData.nome} onChange={handleChange} placeholder="Digite seu nome" className={styles.input} required />
      </div>
      <div className={styles.groupInputs}>
        <label className={styles.label}>E-mail:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={styles.input} placeholder="Digite seu e-mail" required />
      </div> 

      <div className={styles.groupInputs}>
        <label className={styles.label}>Deixe seu comentario:</label>
        <textarea
          id="mensagem"
          name="mensagem"
          value={formData.mensagem}
          //@ts-ignore
          onChange={handleChange}
          className={styles.input} 
          required
        ></textarea>
      </div> 
      <button type="submit">ENVIAR</button> 
      <div id="mensagemsucesso" className={styles.sucessomensagem}>
        Sua mensagem foi enviada com sucesso!
      </div>
      <div id="mensagemerro" className={styles.erromensagem}>
        Ocorreu um erro ao enviar sua mensagem.
      </div> 
    </form>
  );
};

export default ContactForm;