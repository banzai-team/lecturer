import os
import time
import requests

from celery import Celery
from celery import chain, group, chord

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")
s2t_model_url = os.environ.get("SPEECH_TO_TEXT_MODEL_URL", "http://localhost:8080/v1/s2t_mocker")

@celery.task(name="create_task")
def create_task(file_path):
    group_task = group(terms.si(), summ.si(), llm.si())
    task2 = chord(group_task, dummy_task.si())
    chain(s2t.s(), task2, dummy_task.si()).delay()
    print("task 1")
    return True


@celery.task(name="s2t")
def s2t(file_path):
    print("s2t sending request...")
    response = requests.post(s2t_model_url, data={'file_path': file_path})
    print(f's2t completed. {response.status_code}')
    if (response.status_code == 200):
        return response.json()
    else:
        raise Exception(f's2t model responded with wrong code')


@celery.task(name="summ")
def summ():
    print("summ")
    time.sleep(1)
    return


@celery.task(name="llm")
def llm():
    print("llm")
    time.sleep(1)
    return


@celery.task(name="terms")
def terms():
    print("terms")
    time.sleep(1)
    return


@celery.task
def dummy_task():
    return 'I am a dummy task'