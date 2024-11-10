import sys
# Command to invoke prompt gen:
# python -c "from promptGen import genPrompt; print(genPrompt('I need to get rid of sheets of metal'))"


def genPrompt(userPrompt):
    
    keys = ""
    with open("keywords.txt", "r") as file:
        for line in file:
            keys+=line
            

    chatPrompt = f"""You are a chatbot that helps users find the correct tags for their waste disposal needs. The user will provide a description of the item(s) they need to dispose of. 
    Your task is to identify the specific material types and output a list of tags.\nThe user said: "{userPrompt}"

    Please respond with a list of tags such as:\n{keys}

    Answer:
    """

    return chatPrompt