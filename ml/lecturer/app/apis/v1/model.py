from pydantic import BaseModel

class InputBase(BaseModel):
    file_path: str

class OutputBase(BaseModel):
    result: list[dict]
