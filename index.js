const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

let app = express();
app.use(express.json());

let secretKey = 'sua_chave_secreta';

let user = {
    id: 1,
    username: 'usuario_exemplo',
    password: 'senha_exemplo',
};

app.post('/login', (req, res) => {
    let { username, password } = req.body;
    if (username === user.username && password === user.password) {
        let token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

        fs.writeFile('tokens.json', JSON.stringify({ token }), (err) => {
            if (err) {
                console.error('Erro ao salvar o token:', err);
                return res.status(500).json({ error: 'Erro ao salvar o token' });
            }
            console.log('Token salvo com sucesso!');
            return res.json({ token });
        });
    } else {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }
});

// Inicie o servidor
const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
