import chromadb

chroma_client = chromadb.PersistentClient("db/chroma_data")
placement_stats_collection = chroma_client.get_or_create_collection(name="PlacementStatsData")
company_stats_collection = chroma_client.get_or_create_collection(name="CompanyStatsData")
