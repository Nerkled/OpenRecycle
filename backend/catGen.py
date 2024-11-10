import sys, os
from promptGen import genPrompt
from keyInterpreter import interpret
# python -c "from catGen import genCategories; print(genCategories('I need to get rid of sheets of metal'))"


response = ""
#userPrompt = ""

#if __name__ == "__main__":

def genCategories(userPrompt):
    
    chatPrompt = genPrompt(userPrompt)
    response = interpret(chatPrompt)
    response = response.strip(" ")
    return response

#sys.exit(response)