from celery.result import AsyncResult
from fastapi import Body, FastAPI, Form, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from .worker import create_task

app = FastAPI()

@app.post("/tasks", status_code=201)
def run_task(payload = Body(...)):
    lecture_id = payload["lecture_id"]
    file_path = payload["file_path"]
    task = create_task.delay(lecture_id, file_path)
    return JSONResponse({"task_id": task.id})


@app.get("/tasks/{task_id}")
def get_status(task_id):
    task_result = AsyncResult(task_id)
    result = {
        "task_id": task_id,
        "task_status": task_result.status,
        "task_result": task_result.result
    }
    return JSONResponse(result)