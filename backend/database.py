import chromadb
import os
from chromadb.config import Settings

# Use absolute path to ensure correct data location
PERSIST_DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "db", "chroma_data")

# Ensure the directory exists
os.makedirs(PERSIST_DIRECTORY, exist_ok=True)

# Initialize ChromaDB client with the existing data directory
chroma_client = chromadb.Client(Settings(
    chroma_db_impl="duckdb+parquet",
    persist_directory=PERSIST_DIRECTORY
))

# Get existing collections
placement_stats_collection = chroma_client.get_or_create_collection(name="PlacementStatsData")
company_stats_collection = chroma_client.get_or_create_collection(name="CompanyStatsData")