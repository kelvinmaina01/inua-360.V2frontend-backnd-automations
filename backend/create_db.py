import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
from decouple import config

# Credentials (we know these are correct from previous test)
user = config('DB_USER')
password = config('DB_PASSWORD')
host = config('DB_HOST', default='localhost')
port = config('DB_PORT', default='5432')
dbname_to_create = config('DB_NAME')

print(f"Attempting to create database '{dbname_to_create}'...")

try:
    # Connect to 'postgres' to create the new DB
    conn = psycopg2.connect(
        dbname='postgres',
        user=user,
        password=password,
        host=host,
        port=port
    )
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    
    cur = conn.cursor()
    
    # Check if it exists first
    cur.execute(f"SELECT 1 FROM pg_catalog.pg_database WHERE datname = '{dbname_to_create}'")
    exists = cur.fetchone()
    
    if exists:
        print(f"Database '{dbname_to_create}' already exists.")
    else:
        cur.execute(f"CREATE DATABASE {dbname_to_create}")
        print(f"SUCCESS: Database '{dbname_to_create}' created!")
        
    cur.close()
    conn.close()

except Exception as e:
    print(f"FAILED to create database.")
    print(e)
