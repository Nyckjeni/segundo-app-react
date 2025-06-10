# 📚 APP de Lista e Cadastro de Livros

Um aplicativo desenvolvido para cadastrar e gerenciar livros, permitindo o armazenamento direto no banco de dados, além da opção de favoritar livros para acesso rápido.

## ✨ Funcionalidades

- 📖 **Cadastro de Livros:** Os livros são salvos diretamente no banco de dados através da API criada.
- ⭐ **Favoritar Livros:** É possível marcar livros como favoritos para acessá-los na aba "Favoritos".
- 🌐 **Integração com Banco de Dados:** Utilização do MongoDB para armazenar os dados dos livros de forma segura.

## 🚀 Tecnologias Utilizadas

- **Front-end:** JavaScript com o framework **React Native**.
- **Back-end:** **Node.js** e **Express**.
- **Banco de Dados:** **MongoDB**.

## 🔧 Como iniciar o projeto

1. **Baixe** o projeto compactado (ZIP).
2. **Descompacte** a pasta e abra no editor recomendado (**VS Code**).
3. **Configure o IP** nas telas dentro da pasta `screens`:
   - No terminal, execute o comando para verificar o IP da sua máquina:
     ```sh
     ipconfig
     ```
   - Atualize o IP no código conforme necessário.

4. **Crie um arquivo `.env`** e insira o caminho do seu banco de dados.

5. **Abra dois terminais no projeto:**
   - No terminal do **backend**, inicie o servidor e o banco de dados com:
     ```sh
     node server.js
     ```
   - No terminal do **frontend**, acesse a pasta do frontend e instale as dependências:
     ```sh
     cd frontend
     npm i
     ```
   - Inicie o aplicativo com:
     ```sh
     npx expo start
     ```

6. **Baixe o aplicativo Expo Go** no seu dispositivo móvel.

7. **Escaneie o QR Code** gerado no terminal pelo Expo Go (certifique-se de que seu dispositivo está na mesma rede Wi-Fi do seu computador).

---

🚀 Agora é só explorar e cadastrar seus livros! Caso queira melhorias ou ajustes, me avise. 😊📖
