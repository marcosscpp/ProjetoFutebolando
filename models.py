from app import bd

class Aluno(bd.Model):
    id = bd.Column(bd.Integer, primary_key=True, autoincrement=True)
    nome = bd.Column(bd.String(80), nullable=False)
    nome_responsavel = bd.Column(bd.String(80), nullable=False)
    cpf = bd.Column(bd.String(11), nullable=False)
    data_nascimento = bd.Column(bd.Date, nullable=False)
    observacoes = bd.Column(bd.Text)
    cep = bd.Column(bd.String(8), nullable=False)
    image = bd.Column(bd.LargeBinary)
    telefone = bd.Column(bd.String(20), nullable=False)
    email = bd.Column(bd.String(120), nullable=False)
    bairro = bd.Column(bd.String(120))
    rua = bd.Column(bd.String(120))
    numero_endereco = bd.Column(bd.String(10))
    complemento = bd.Column(bd.String(100))

class Admin(bd.Model):
    id = bd.Column(bd.Integer, primary_key=True, autoincrement=True)
    username = bd.Column(bd.String(80), nullable=False)
    password = bd.Column(bd.String(50))