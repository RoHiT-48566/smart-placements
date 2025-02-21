from fastapi import APIRouter, HTTPException, Query
from typing import List
from models.dashboard_model import PlacementStatsModel, CompanyStatsModel
from services.dashboard_service import (
    getPlacementStatsData, addPlacementStatsData, deletePlacementStatsData, 
    deleteAllPlacementStatsData, getCompanyStatsData, addCompanyStatsData, 
    deleteCompanyStatsData, deleteAllCompanyStatsData,enterPlacementStatsData,enterCompanyStatsData
)

router = APIRouter()

# Placement Stats Controllers

# Get Placement Stats Data (including any filters)
@router.get("/get-data")
async def get_dashboard_data(branch: str = Query(None), year: int = Query(None)):
    filters = {key: value for key, value in {"branch": branch, "year": year}.items() if value is not None}
    try:
        data = await getPlacementStatsData(filters)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

# Enter bulk Placement Stats Data at a time
@router.post("/add-all-data")
async def add_all_data(data_list: List[PlacementStatsModel]):
    try:
        res = await enterPlacementStatsData(data_list)
        return res
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error adding all data : {str(e)}")

# Enter single Placement Stats Data
@router.post("/add-data")
async def add_dashboard_data(data: PlacementStatsModel):
    try:
        res = await addPlacementStatsData(data)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding data: {str(e)}")

# Delete a Placement Stats Record (including filters)
@router.delete("/delete-record")
async def delete_record(
    entry_id : str = Query(None),
    year:int = Query(None),
    branch:str=Query(None)
):
    filters = {key: value for key, value in {"entry_id": entry_id, "year": year, "branch":branch}.items() if value is not None}
    if not filters:
        raise HTTPException(status_code=400, detail="At least one filter (entry_id, year, or branch) must be provided.")
    try:
        res=await deletePlacementStatsData(filters)
        if "error" in res:
            raise HTTPException(status_code=404, detail=res["error"])
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting data: {str(e)}")

# Delete all Placement Stats Records at a time
@router.delete("/delete-all-records")
async def delete_all_records():
    try:
        res = await deleteAllPlacementStatsData()
        if "error" in res:
            raise HTTPException(status_code=404, detail=res["error"])
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting all data: {str(e)}")


# Company Stats Controllers

# Get Company Stats Data (including any filters)
@router.get("/get-company-data")
async def get_company_data(company_name: str = Query(None), year: int = Query(None), branch: str = Query(None)):
    filters = {key: value for key, value in {"company_name": company_name, "branch": branch, "year": year}.items() if value is not None}
    try:
        data = await getCompanyStatsData(filters)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching data: {str(e)}")

# Enter bulk Company Stats Data at a time
@router.post("/add-all-company-data")
async def add_all_data(data_list: List[CompanyStatsModel]):
    try:
        res = await enterCompanyStatsData(data_list)
        return res
    except Exception as e:
        raise HTTPException(status_code=500,detail=f"Error adding all data : {str(e)}")

# Enter single Company Stats Data
@router.post("/add-company-data")
async def add_company_data(data: CompanyStatsModel):
    try:
        res = await addCompanyStatsData(data)
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding data: {str(e)}")

# Delete a Company Stats Record (including filters)
@router.delete("/delete-company-data")
async def delete_company_record(
    entry_id:str=Query(None),
    year:int=Query(None),
    company_name:str=Query(None),
):
    filters = {key: value for key, value in {"entry_id": entry_id, "year": year, "company_name":company_name}.items() if value is not None}
    if not filters:
        raise HTTPException(status_code=400, detail="At least one filter (entry_id, year, or branch) must be provided.")
    try:
        res = await deleteCompanyStatsData(filters)
        if "error" in res:
            raise HTTPException(status_code=404, detail=res["error"])
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting data: {str(e)}")

# Delete all Company Stats Records at a time
@router.delete("/delete-all-company-data")
async def delete_all_company_records():
    try:
        res = await deleteAllCompanyStatsData()
        if "error" in res:
            raise HTTPException(status_code=404, detail=res["error"])
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting all data: {str(e)}")