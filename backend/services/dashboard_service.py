import asyncio
import uuid
from database import placement_stats_collection, company_stats_collection
from models.dashboard_model import PlacementStatsModel, CompanyStatsModel

# Placement Stats Services

# Returns Placement Stats Data (including any filters)
async def getPlacementStatsData(filters: dict):
    if filters:
        if len(filters)==1:
            key,value = next(iter(filters.items()))
            conditions={key:{"$eq":value}}
        else:
            conditions = {"$and": [{key: {"$eq": value}} for key, value in filters.items()]}
    else:
        conditions = {}
    totalData = await asyncio.to_thread(
        lambda: placement_stats_collection.get(where=conditions) if filters else placement_stats_collection.get()
    )
    metadatas=totalData.get("metadatas",[])
    ids=totalData.get("ids",[])
    combinedData=[
        {**metadata,"id":entry_id} for metadata,entry_id in zip(metadatas,ids)
    ]
    return combinedData

# Adds bulk Placement Stats Data at a time
async def enterPlacementStatsData(data_list : list[PlacementStatsModel]):
    if not data_list:
        return{"error":"No data provided!"}
    insertedIds=[]
    for data in data_list:
        unqId=str(uuid.uuid4())
        entryDict=data.model_dump()
        await asyncio.to_thread(
            placement_stats_collection.add,
            documents=[str(entryDict)],
            metadatas=[entryDict],
            ids=[unqId]
        )
        insertedIds.append(unqId)
    return {"message":"All data added successfully!","ids":insertedIds}

# Adds a single Placement Stats Data
async def addPlacementStatsData(data: PlacementStatsModel):
    unqId = str(uuid.uuid4())
    entryDict = data.model_dump()
    await asyncio.to_thread(
        placement_stats_collection.add,
        documents=[str(entryDict)],
        metadatas=[entryDict],
        ids=[unqId]
    )
    return {"message": "Data added successfully!", "id": unqId}

# Deletes a Placement Stats Record (including filters)
async def deletePlacementStatsData(filters:dict):
    if not filters:
        return {"error": "At least one filter (entry_id, year, or branch) must be provided."}

    entry_id = filters.get("entry_id")
    if entry_id:
        storedData = await asyncio.to_thread(placement_stats_collection.get, ids=[entry_id])
        if not storedData.get("ids"):
            return {"error": "Entry not found!"}
        await asyncio.to_thread(placement_stats_collection.delete, ids=[entry_id])
        return {"message": "Entry deleted successfully!", "id": entry_id}
    
    query_filters = {}
    if "year" in filters and "branch" in filters:
        query_filters = {"$and": [{"year": {"$eq": filters["year"]}}, {"branch": {"$eq": filters["branch"]}}]}
    elif "year" in filters:
        query_filters = {"year": {"$eq": filters["year"]}}
    elif "branch" in filters:
        query_filters = {"branch": {"$eq": filters["branch"]}}
    storedData = await asyncio.to_thread(lambda: placement_stats_collection.get(where=query_filters))
    if not storedData.get("ids"):
        return {"error": "No matching records found for the provided filters."}
    ids_to_delete = storedData.get("ids")
    await asyncio.to_thread(placement_stats_collection.delete, ids=ids_to_delete)
    return {
        "message": f"Deleted {len(ids_to_delete)} record(s) successfully!",
        "deleted_ids": ids_to_delete
    }

# Deletes all Placement Stats Records at a time
async def deleteAllPlacementStatsData():
    storedData = await asyncio.to_thread(placement_stats_collection.get)
    if not storedData.get("ids"):
        return {"error": "No data found!"}
    await asyncio.to_thread(placement_stats_collection.delete, where={"year": {"$gte": 0}})
    return {"message": "All data deleted successfully!"}


# Company Stats Services

# Returns Company Stats Data (including any filters)
async def getCompanyStatsData(filters: dict):
    branch = filters.pop("branch", None)
    if not filters:
        conditions = {}
    elif len(filters) == 1:
        key, value = next(iter(filters.items()))
        conditions = {key: {"$eq": value}}
    else:
        conditions = {"$and": [{key: {"$eq": value}} for key, value in filters.items()]}
    totalData = await asyncio.to_thread(
        lambda: company_stats_collection.get(where=conditions) if filters else company_stats_collection.get()
    )
    metadatas = totalData.get("metadatas", [])
    ids = totalData.get("ids", [])
    processedData = []
    for metadata, entry_id in zip(metadatas, ids):
        if branch and branch in metadata:
            filtered_metadata = {
                "company_name": metadata.get("company_name"),
                "internship_ppo": metadata.get("internship_ppo"),
                "salary": metadata.get("salary"),
                branch: metadata.get(branch, 0),
                "total_offers": metadata.get("total_offers"),
                "year": metadata.get("year"),
                "id": entry_id
            }
            processedData.append(filtered_metadata)
        else:
            processedData.append({**metadata, "id": entry_id})
    return processedData

# Adds bulk Company Stats Data at a time
async def enterCompanyStatsData(data_list: list[CompanyStatsModel]):
    if not data_list:
        return {"error": "No data provided!"}
    insertedIds = []
    for data in data_list:
        entryDict = data.model_dump()
        cleanedData = {k: v for k, v in entryDict.items() if v is not None}
        if "internship_ppo" not in cleanedData and "salary" not in cleanedData:
            continue
        unqId = str(uuid.uuid4())
        await asyncio.to_thread(
            company_stats_collection.add,
            documents=[str(cleanedData)],
            metadatas=[cleanedData],
            ids=[unqId]
        )
        insertedIds.append(unqId)
    if not insertedIds:
        return {"error": "No valid records were inserted!"}
    return {"message": "All data added successfully!", "ids": insertedIds}


# Adds a single Company Stats Data
async def addCompanyStatsData(data: CompanyStatsModel):
    unqId = str(uuid.uuid4())
    entryDict = data.model_dump()
    cleanedData = {k: v for k, v in entryDict.items() if v is not None}
    await asyncio.to_thread(
        company_stats_collection.add,
        documents=[str(cleanedData)],
        metadatas=[cleanedData],
        ids=[unqId]
    )
    return {"message": "Data added successfully!", "id": unqId}

# Deletes a Company Stats Record (including filters)
async def deleteCompanyStatsData(filters: dict):
    if not filters:
        return {"error": "At least one filter (entry_id, year, or company_name) must be provided."}

    entry_id = filters.get("entry_id")
    if entry_id:
        storedData = await asyncio.to_thread(company_stats_collection.get, ids=[entry_id])
        if not storedData.get("ids"):
            return {"error": "Entry not found!"}
        await asyncio.to_thread(company_stats_collection.delete, ids=[entry_id])
        return {"message": "Entry deleted successfully!", "id": entry_id}
    
    query_filters = {}
    if "year" in filters and "company_name" in filters:
        query_filters = {"$and": [{"year": {"$eq": filters["year"]}}, {"company_name": {"$eq": filters["company_name"]}}]}
    elif "year" in filters:
        query_filters = {"year": {"$eq": filters["year"]}}
    elif "company_name" in filters:
        query_filters = {"company_name": {"$eq": filters["company_name"]}}
    storedData = await asyncio.to_thread(lambda: company_stats_collection.get(where=query_filters))
    if not storedData.get("ids"):
        return {"error": "No matching records found for the provided filters."}
    ids_to_delete = storedData.get("ids")
    await asyncio.to_thread(company_stats_collection.delete, ids=ids_to_delete)
    return {
        "message": f"Deleted {len(ids_to_delete)} record(s) successfully!",
        "deleted_ids": ids_to_delete
    }

# Deletes all Company Stats Records at a time
async def deleteAllCompanyStatsData():
    storedData = await asyncio.to_thread(company_stats_collection.get)
    if not storedData.get("ids"):
        return {"error": "No data found!"}
    
    await asyncio.to_thread(company_stats_collection.delete, where={"year": {"$gte": 0}})
    return {"message": "All data deleted successfully!"}
