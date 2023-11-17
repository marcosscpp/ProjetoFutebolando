import re
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, EmailField, TextAreaField, BooleanField, IntegerField, DateField, TelField, PasswordField
from wtforms.validators import data_required, length, optional
from form_validator import FormTexto, Cpf, Cep, DataNascimento

class FormularioCadastro(FlaskForm):
    nome = StringField('Nome da Criança', [data_required(), length(min=6, max=80), FormTexto("Nome Inválido")])
    nome_responsavel = StringField('Nome do responsável', [data_required(), length(min=8, max=120), FormTexto("Nome Inválido")])
    cpf = StringField('CPF', [data_required(), Cpf("O CPF é inválido!")])
    telefone = TelField('Contato', [data_required()])
    email = EmailField('Email para contato', [data_required()])
    data_nascimento = DateField('Data de Nascimento', [data_required(), DataNascimento(6, 17)])
    observacoes = TextAreaField('Observações', [data_required()])
    cep = StringField('Cep', [data_required(), Cep("O Cep inserido é inválido"), length(min=8, max=9)])
    bairro = StringField('Bairro', [data_required()])
    rua = StringField('Rua', [data_required()])
    numero_endereco = IntegerField('Número', [data_required()])
    complemento = StringField('Complemento (opcional)', [optional(), length(max=80)])
    permissoes = BooleanField("Concordo com todos os", [data_required()])
    cidade = StringField('Cidade', [data_required(), length(min=5, max=25)])
    submit = SubmitField('Enviar Matrícula')
    
class FormularioAdministrador(FlaskForm):
    username = StringField('Nome', validators=[data_required(), length(min=5, max=25)])
    password = PasswordField('Senha', validators=[data_required(), length(min=5)])