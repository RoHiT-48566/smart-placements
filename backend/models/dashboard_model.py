from pydantic import BaseModel
from typing import Optional

# Placement Stats Model
class PlacementStatsModel(BaseModel):
    branch: str
    selected_male: int
    selected_female: int
    selected_total: int
    class_total: int
    registered: int
    not_registered: int
    not_eligible: int
    eligible: int
    single_offers: int
    multiple_offers: int
    total_offers: int
    total_percentage_single: float
    year: int

    class Config:
        from_attributes = True 

# Company Stats Model
class CompanyStatsModel(BaseModel):
    company_name: str
    internship_ppo: Optional[int] = None
    salary: Optional[float] = None
    CSE: Optional[int] = 0
    CSBS: Optional[int] = 0
    CYS: Optional[int] = 0
    AIML: Optional[int] = 0
    DS: Optional[int] = 0
    IOT: Optional[int] = 0
    IT: Optional[int] = 0
    ECE: Optional[int] = 0
    EEE: Optional[int] = 0
    EIE: Optional[int] = 0
    MECH: Optional[int] = 0
    CIVIL: Optional[int] = 0
    AUTO: Optional[int] = 0
    total_offers: Optional[int] = 0
    year: int

    class Config:
        from_attributes = True