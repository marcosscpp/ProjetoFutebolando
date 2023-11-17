import time 

from app import app, bd
from flask import render_template, redirect, url_for, request, session, flash, jsonify
from forms import FormularioCadastro, FormularioAdministrador
from tools import get_forms_data, login_adm_required
from models import Aluno, Admin
from email_sender import send_email
from datetime import date


from base64 import b64encode

@app.route('/')
@app.route('/home')
def index():
    form = FormularioCadastro()
    form_admin = FormularioAdministrador()
    return render_template('index.html',  form=form, form_admin = form_admin)

@app.route('/cadastre-se')
def cadastro():
    form = FormularioCadastro()
    return render_template("cadastro.html", form=form)


@app.route('/cadastro', methods=["POST"])
def cadastrar():
    form = FormularioCadastro(request.form)
    if not form.validate_on_submit():
        erros_envio = form.errors
        return jsonify({"message": erros_envio}), 200
    
    data_form = get_forms_data(form)
    aluno = Aluno.query.filter_by(cpf=data_form['cpf']).first()
    if aluno:
        return jsonify({"message": "Aluno já existente use outro CPF!"}), 200
    else:
        nova_matricula = Aluno(**data_form)

        img = request.files['file']
        if img:
            if img.filename.split(".")[-1].lower() in ["png", "jpg", "jpeg"]:
                image_data = img.read()
                nova_matricula.image = image_data
            else:
                return jsonify({"message": "A imagem inserida é inválida"}), 200

        try:
            send_email(f"Olá seja bem vindo, ao projeto Futbolando {nova_matricula.cpf}",     
                       nova_matricula.email,
                       "criação de conta realizada!")
        except:
            pass
  
        bd.session.add(nova_matricula)
        bd.session.commit()
    
        return jsonify({"message": "Cadastro Realizado"}), 200

@app.route('/painel-admin')
@login_adm_required
def painel_admin():
    form_admin = FormularioAdministrador()
    alunos = Aluno.query.order_by(Aluno.id)
    return render_template("alunos.html", alunos=alunos, today=date.today(), form_admin=form_admin)

@app.route("/deletar/<int:id>")
def deletar(id):
    aluno = Aluno.query.filter_by(id=id).first()
    if aluno is None:
        flash("Cadastro não encontrado!", "danger")
        return redirect(url_for("painel_admin"))
    bd.session.delete(aluno)
    bd.session.commit()
    
    return jsonify({"message": "Cadastro Removido"}), 200

@app.route('/perfil/<int:id>')
def perfil_aluno(id):
    perfil = Aluno.query.filter_by(id=id).first()
    if not perfil:
        return redirect(url_for("painel_admin"))
    if not perfil.image is None:
        imagem = b64encode(perfil.image).decode("utf-8")
        return render_template("perfil.html", image=imagem, perfil=perfil)
    return render_template("perfil.html", image=False,  perfil=perfil)


@app.route("/login", methods=["POST"])
def login():
    form = FormularioAdministrador()
    user = Admin.query.filter_by(username=form.username.data).first()
    if not user or form.password.data != user.password:
        print("OOi")
        flash("Não foi possível logar, verifique o nome e a senha", "danger")
        return redirect(url_for("index"))

    session.clear()
    session["admnistrador_logado"] = user.username
    flash(f"{user.username} logado com sucesso", "sucess")
    return redirect(url_for("painel_admin"))