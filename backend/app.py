from fastapi import FastAPI
from routes.user_routes import router as user_router

def create_app():
    app=FastAPI(title="Smart Placements Assistance")
    app.include_router(user_router)
    return app