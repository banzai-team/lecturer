from fastapi import UploadFile, File, status
from fastapi.routing import APIRouter

from app.apis.v1.model import InputBase, OutputBase
#from app.core import s2t_pipe

router = APIRouter(prefix="/v1")

# @router.post('/s2t',
#              description='Транскрибация текста',
#              tags=['Inference endpoints'],
#              status_code=status.HTTP_200_OK,
#              response_model=OutputBase)
# def process_base(input_: InputBase) -> OutputBase:
#     result = s2t_pipe(input_.file_path)
#     return OutputBase(result=result['chunks'])

@router.post('/s2t_mocker',
             description='Транскрибация текста',
             tags=['Inference endpoints'],
             status_code=status.HTTP_200_OK,
             response_model=OutputBase)
def process_base_mocker(input_: InputBase) -> OutputBase:
    result = [{'timestamp': (0.0, 99.86),
               'text': ' you you you you Дорогие друзья, рад вас приветствовать на курсе знакомства с языками программирования.'},
              {'timestamp': (100.48, 101.9),
               'text': ' Сегодня у нас вводная лекция.'},
              {'timestamp': (102.4, 109.04),
               'text': ' Мы поговорим о языках программирования в целом, о языке программирования C-Sharp, об алгоритмах, а также порешаем задачи.'}]
    return OutputBase(result=result)
