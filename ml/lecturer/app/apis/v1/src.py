from fastapi import UploadFile, File, status
from fastapi.routing import APIRouter

from app.apis.v1.model import InputBase, OutputBase
from app.core import s2t_pipe

router = APIRouter(prefix="/v1")

@router.post('/s2t',
             description='Транскрибация текста',
             tags=['Inference endpoints'],
             status_code=status.HTTP_200_OK,
             response_model=OutputBase)
def process_base(input_: InputBase) -> OutputBase:
    result = s2t_pipe(input_.file_path)
    return OutputBase(result=result['chunks'])
