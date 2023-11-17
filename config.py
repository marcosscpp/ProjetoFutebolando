import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URI = \
    '{sgbd}://{user}:{password}@{server}:{port}/{database}'.format(
        sgbd = 'mysql',
        user=os.getenv("DATABASE_USERNAME"),
        password=os.getenv("DATABASE_PASSWORD"),
        server=os.getenv("DATABASE_HOST"),
        port= 3306, 
        database=os.getenv("DATABASE")
    )

SECRET_KEY = 'FutebolandoItapevi'

DIR_PATH = os.path.dirname(os.path.abspath(__file__)) + "/imagens"