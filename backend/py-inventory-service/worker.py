import os
import time

from celery import Celery
from celery import chain, group, chord

celery = Celery(__name__)
celery.conf.broker_url = os.environ.get("CELERY_BROKER_URL", "redis://localhost:6379")
celery.conf.result_backend = os.environ.get("CELERY_RESULT_BACKEND", "redis://localhost:6379")

@celery.task(name="create_task")
def create_task(task_type):
    group_task = group(terms.si(), summ.si(), llm.si())
    task2 = chord(group_task, dummy_task.si())
    chain(s2t.s(), task2, dummy_task.si()).delay()
    print("task 1")
    return True


@celery.task(name="s2t")
def s2t():
    time.sleep(3)
    print("s2t")
    return "Some long text"


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
def final_task():
    return 'I am a dummy task'