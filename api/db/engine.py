from sqlmodel import create_engine


mysql_url = "mysql+pymysql://root:root@127.0.0.1:3306/ecom"
engine = create_engine(mysql_url, echo=True)
