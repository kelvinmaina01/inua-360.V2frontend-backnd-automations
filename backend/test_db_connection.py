import psycopg2
from decouple import config
import os

print("--- Testing Database Connection ---")

# Credentials from .env (simulated by reading them or just hardcoding for test if we want, 
# but better to read what the app reads correctly)
# We need to load .env manually or rely on decouple finding it.
# decouple finds .env in current dir.

try:
    user = config('DB_USER')
    password = config('DB_PASSWORD')
    host = config('DB_HOST', default='localhost')
    port = config('DB_PORT', default='5432')
    dbname_target = config('DB_NAME')
except Exception as e:
    print(f"Error reading .env: {e}")
    exit(1)

print(f"Credentials loaded: User={user}, Host={host}:{port}")

def try_connect(dbname):
    print(f"\nAttempting to connect to database: '{dbname}'...")
    try:
        conn = psycopg2.connect(
            dbname=dbname,
            user=user,
            password=password,
            host=host,
            port=port
        )
        print(f"SUCCESS: Connected to '{dbname}'!")
        conn.close()
        return True
    except psycopg2.OperationalError as e:
        print(f"FAILED: Could not connect to '{dbname}'.")
        print(f"Error details: {e}")
        return False
    except Exception as e:
        print(f"FAILED: distinct error connecting to '{dbname}'.")
        print(e)
        return False

# 1. Try Target DB
success_target = try_connect(dbname_target)

# 2. If valid, we are good.
if success_target:
    print("\nThe configuration is CORRECT.")
else:
    print("\nTarget DB connection failed. Checking if credentials are valid by connecting to 'postgres'...")
    # 3. Try Default DB 'postgres'
    success_postgres = try_connect('postgres')
    
    if success_postgres:
        print("\nDIAGNOSIS: Credentials are CORRECT, but database 'inua360_db' was NOT FOUND.")
        print("Please check the database name in pgAdmin exactly. It might be case sensitive or spelled differently.")
    else:
        print("\nDIAGNOSIS: Could not connect to 'postgres' database either.")
        print("This usually means the USERNAME, PASSWORD, HOST, or PORT is incorrect.")
