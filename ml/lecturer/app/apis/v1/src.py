import os
from fastapi import UploadFile, File, status
from fastapi.routing import APIRouter

from app.apis.v1.model import InputS2t, OutputS2t, InputSum, OutputSum, InputCl, OutputCl
from app.config.config import FILE_DIR
from app.core import s2t_pipe, summarisation_pipe, classification_pipe

router = APIRouter(prefix="/v1")


@router.post('/s2t',
             description='Транскрибация текста',
             tags=['Inference endpoints'],
             status_code=status.HTTP_200_OK,
             response_model=OutputS2t)
def s2t(input_: InputS2t) -> OutputS2t:
    file_path = os.path.join(FILE_DIR, input_.file_path)
    result = s2t_pipe(file_path)
    return OutputS2t(result=result['chunks'])


@router.post('/summarization',
             description='Суммаризация текста',
             tags=['Inference endpoints'],
             status_code=status.HTTP_200_OK,
             response_model=OutputSum)
def sum_(input_: InputSum) -> OutputSum:
    result = summarisation_pipe(input_.text)
    return OutputSum(result=result)


@router.post('/classification',
             description='Классификация текста',
             tags=['Inference endpoints'],
             status_code=status.HTTP_200_OK,
             response_model=OutputCl)
def cl_(input_: InputCl) -> OutputCl:
    result = classification_pipe(input_.text)
    return OutputCl(result=result)
