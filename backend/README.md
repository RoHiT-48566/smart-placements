# Backend Models

This folder contains the data models used in the backend of the Smart Placements Assistance application. The models are defined using Pydantic's `BaseModel` and are used to validate and serialize the data.

## Models

### PlacementStatsModel

This model represents the placement statistics for a particular branch and year. The fields are:

- `branch` (str): The branch of study.
- `selected_male` (int): Number of male students selected.
- `selected_female` (int): Number of female students selected.
- `selected_total` (int): Total number of students selected.
- `class_total` (int): Total number of students in the class.
- `registered` (int): Number of students registered for placements.
- `not_registered` (int): Number of students not registered for placements.
- `not_eligible` (int): Number of students not eligible for placements.
- `eligible` (int): Number of students eligible for placements.
- `single_offers` (int): Number of students with single offers.
- `multiple_offers` (int): Number of students with multiple offers.
- `total_offers` (int): Total number of offers.
- `total_percentage_single` (float): Percentage of students with single offers.
- `year` (int): The year of the placement statistics.

### CompanyStatsModel

This model represents the statistics for a particular company and year. The fields are:

- `company_name` (str): The name of the company.
- `internship_ppo` (Optional[int]): Number of internship PPOs (Pre-Placement Offers).
- `salary` (Optional[float]): The salary offered by the company.
- `CSE` (Optional[int]): Number of offers for CSE branch.
- `CSBS` (Optional[int]): Number of offers for CSBS branch.
- `CYS` (Optional[int]): Number of offers for CYS branch.
- `AIML` (Optional[int]): Number of offers for AIML branch.
- `DS` (Optional[int]): Number of offers for DS branch.
- `IOT` (Optional[int]): Number of offers for IOT branch.
- `IT` (Optional[int]): Number of offers for IT branch.
- `ECE` (Optional[int]): Number of offers for ECE branch.
- `EEE` (Optional[int]): Number of offers for EEE branch.
- `EIE` (Optional[int]): Number of offers for EIE branch.
- `MECH` (Optional[int]): Number of offers for MECH branch.
- `CIVIL` (Optional[int]): Number of offers for CIVIL branch.
- `AUTO` (Optional[int]): Number of offers for AUTO branch.
- `total_offers` (Optional[int]): Total number of offers.
- `year` (int): The year of the company statistics.

Both models have a `Config` class with `from_attributes = True` to allow creating instances from ORM objects.

## Usage

These models are used in the controllers and services to validate and serialize the data. They ensure that the data conforms to the expected structure and types before processing or storing it in the database.

# Backend API Documentation

## `/dashboard/get-data` Endpoint

### Description

Returns all Placement Statistics Data in JSON (includes filters)

### HTTP Method

`GET`

### Query Parameters

If any provided, it returns filtered data else returns entire data:

- `branch` (str, optional): Branch of study.
- `year` (int, optional): The year of placement statistics.

### Sample Response

```json
[
  {
    "branch": "CSE",
    "selected_male": 50,
    "selected_female": 30,
    "selected_total": 80,
    "class_total": 100,
    "registered": 90,
    "not_registered": 10,
    "not_eligible": 5,
    "eligible": 85,
    "single_offers": 60,
    "multiple_offers": 20,
    "total_offers": 100,
    "total_percentage_single": 70.0,
    "year": 2024
  }
]
```

## `/dashboard/add-all-data` Endpoint

### Description

Adds a bulk of Placement Statistics Data at a time.

### HTTP Method

`POST`

### Request Body

List of objects is sent as input :-

```json
[
  {
    "branch": "CSE",
    "selected_male": 50,
    "selected_female": 30,
    "selected_total": 80,
    "class_total": 100,
    "registered": 90,
    "not_registered": 10,
    "not_eligible": 5,
    "eligible": 85,
    "single_offers": 60,
    "multiple_offers": 20,
    "total_offers": 100,
    "total_percentage_single": 70.0,
    "year": 2024
  }
]
```

### Sample Response

```json
{
    "message": "All data added successfully!",
    "ids": ["uuid1", "uuid2", ...]
}
```

## `/dashboard/add-data` Endpoint

### Description

Adds a single Placement Statistics Data.

### HTTP Method

`POST`

### Request body

Object

```json
{
  "branch": "CSE",
  "selected_male": 50,
  "selected_female": 30,
  "selected_total": 80,
  "class_total": 100,
  "registered": 90,
  "not_registered": 10,
  "not_eligible": 5,
  "eligible": 85,
  "single_offers": 60,
  "multiple_offers": 20,
  "total_offers": 100,
  "total_percentage_single": 70.0,
  "year": 2024
}
```

### Sample Response

```json
{
  "message": "Data added successfully!",
  "id": "uuid"
}
```

## `/dashboard/delete-record` Endpoint

### Description

Deletes a Placement Statistics Record (including filters).

### HTTP Method

`DELETE`

### Query Parameters

At least one filter (entry_id, year, or branch) must be provided:

- `entry_id` (str,optional) : The unique ID of the record.
- `year` (int,optional) : The year of placements statistics.
- `branch` (str,optional) : Branch of study.

### Sample Response

```json
{
  "message": "Entry deleted successfully!",
  "id": "uuid"
}
```

## `/dashboard/delete-all-records` Endpoint

### Description

Deletes all Placement Statistics Records at a time.

### HTTP Method

`DELETE`

### Sample Response

```json
{
  "message": "All data deleted successfully!"
}
```

## `/dashboard/get-company-data` Endpoint

### Description

Returns all Company Statistics Data in JSON (includes filters).

### HTTP Method

`GET`

### Query Parameters

If any provided, it returns filtered data else returns entire data:

- `company_name` (str,optional) : The name of the company.
- `year` (int,optional) : The year of company statistics.
- `branch` (str,optional) : Branch of study.

### Sample Response

```json
[
  {
    "company_name": "ABC Corp",
    "internship_ppo": 5,
    "salary": 1200000,
    "CSE": 10,
    "total_offers": 15,
    "year": 2024,
    "id": "uuid"
  }
]
```

## `/dashboard/add-all-company-data` Endpoint

### Description

Adds a bulk of Company Statistics Data at a time.

### HTTP Method

`POST`

### Request body

List of objects :

```json
[
  {
    "company_name": "ABC Corp",
    "internship_ppo": 5,
    "salary": 1200000,
    "CSE": 10,
    "total_offers": 15,
    "year": 2024
  }
]
```

### Sample Response

```json
{
    "message": "All data added successfully!",
    "ids": ["uuid1", "uuid2", ...]
}
```

## `/dashboard/add-company-data` Endpoint

### Description

Adds a single Company Statistics Data.

### HTTP Method

`POST`

### Request Body

```json
{
  "company_name": "ABC Corp",
  "internship_ppo": 5,
  "salary": 1200000,
  "CSE": 10,
  "total_offers": 15,
  "year": 2024
}
```

### Sample Response

```json
{
  "message": "Data added successfully!",
  "id": "uuid"
}
```

## `/dashboard/delete-company-data` Endpoint

### Description

Deletes a Company Statistics Record (including filters).

### HTTP Method

`DELETE`

### Query Parameters

At least one filter (entry_id, year, or company_name) must be provided:

- `entry_id` (str,optional): The unique ID of the record.
- `year` (int,optional): The year of company statistics.
- `company_name` (str,optional): The name of the company.

### Sample Response

```json
{
  "message": "Entry deleted successfully!",
  "id": "uuid"
}
```

## `/dashboard/delete-all-company-data` Endpoint

### Description

Deletes all Company Statistics Records at a time.

### HTTP Method

`DELETE`

### Sample Response

```json
{
  "message": "All data deleted successfully!"
}
```
