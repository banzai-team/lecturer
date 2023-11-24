n_gpu_layers = 1  # Change this value based on your model and your GPU VRAM pool.
n_batch = 512  # Should be between 1 and n_ctx, consider the amount of VRAM in your GPU.

from langchain.callbacks.manager import CallbackManager
from langchain.callbacks.streaming_stdout import StreamingStdOutCallbackHandler
from langchain.chains import LLMChain
from langchain.llms import LlamaCpp
from langchain.prompts import PromptTemplate

# Make sure the model path is correct for your system!
llm = LlamaCpp(
    model_path="/Users/jamakase/Documents/model-q4_K.gguf",
    n_gpu_layers=n_gpu_layers,
    n_batch=2048,
    n_ctx=4096,
    verbose=True,  # Verbose is required to pass to the callback manager
)
# %%
# interact("""Сайга что такое программирование, дай короткую ссылку на википедию""")
task = ""
template = """"<s>system\nТы — Сайга, русскоязычный автоматический ассистент. Ты разговариваешь с людьми и помогаешь им.<s>user\n</s><s>bot\n"""

prompt = PromptTemplate(template=template, input_variables=["content"])


def interact(text):
    llm.invoke(prompt.format(content=text))