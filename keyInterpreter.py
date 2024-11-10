import ollama 

model = 'llama3.1'

prompt = ''

def interpret(prompt):
    response = ""  # Initialize an empty string to store the response
    stream = ollama.chat(
        model=model,
        messages=[{'role': 'user', 'content': prompt}],
        stream=True,
    )

    for chunk in stream:
        response += chunk['message']['content']  # Append each chunk to the response

    return response  # Return the full response after processing all chunks