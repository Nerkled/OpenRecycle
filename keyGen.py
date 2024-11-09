import json
keys = []
with open('recycling.json', 'r') as file:
    data = json.load(file)
    for item in data['data']:
        
        key = item.get('key')
        
        if (key.startswith("recycling:")):
            key = key.replace("recycling:", "")
            keys.append(key)
            
with open('keywords.txt', 'w') as file:
    for key in keys:
        file.write(key + '\n')

            
        