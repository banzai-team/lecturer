import os
import time
import requests

from celery import Celery
from celery import chain, group, chord

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")
s2t_model_url = os.environ.get("SPEECH_TO_TEXT_MODEL_URL", "http://localhost:8080/v1/s2t_mocker")
summarize_model_url = os.environ.get("SUMMARIZATION_MODEL_URL", "http://localhost:8080/v1/s2t_mocker")
inventory_service_url = os.environ.get("INVENTORY_SERVICE_URL", "http://localhost:8080")

@celery.task(name="create_task")
def create_task(lecture_id, file_path):
    print(f'Creating tasks for lecture {lecture_id} file {file_path}...')
    group_task = group(save_chunks.s(), terms.s(), llm.s(), summ.s())
    chain(s2t.s(lecture_id, file_path), group_task, dummy_task.si()).delay()
    print("task 1")
    return True


@celery.task(name="s2t")
def s2t(lecture_id, file_path):
    print(f's2t sending request for lecture {lecture_id} file {file_path}...')
    response = requests.post(s2t_model_url, json={'file_path': file_path})
    print(f's2t completed. {response.status_code}')
    if (response.status_code == 200):
        json = {}
        json['chunks'] = response.json()['result']
        json['lecture_id'] = lecture_id
        json['file_path'] = file_path
        print(f's2t response {json}')
        return json
    else:
        raise Exception(f's2t model responded with wrong code')


@celery.task(name="summ")
def summ(result):
    chunks = result['chunks']
    print(f'sending summarize request...')
    response = requests.post(summarize_model_url, json={'text': "".join([chunk['text'] for chunk in chunks])})
    if (response.status_code == 200):
        return response.json()['result']
    else:
        raise Exception(f's2t model responded with wrong code')


@celery.task(name="save_chunks")
def save_chunks(result):
    chunks = result['chunks']
    lecture_id = result['lecture_id']
    print(f'saving chunks {chunks} for lecture {lecture_id}')
    response = requests.post(inventory_service_url + f'/inventory/lecture/{lecture_id}/text-chunks', json=[{"content": chunk['text'], "from": chunk['timestamp'][0], "to": chunk['timestamp'][1]} for chunk in chunks])
    if (response.status_code == 200):
        raise Exception(f'inventory service responded with wrong code')
    return


@celery.task(name="llm")
def llm(value):
    print(f'llm {value}')
    time.sleep(1)
    return


@celery.task(name="terms")
def terms(value):
    print(f'terms {value}')
    time.sleep(1)
    return


@celery.task
def dummy_task():
    return 'I am a dummy task'