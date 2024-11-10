#!/bin/bash
echo "Paste this link into your browser if it doesn't open automatically: "
echo "http://127.0.0.1:5500/index.html"
echo " "
#open "http://127.0.0.1:5500/index.html"
url="http://127.0.0.1:5500/index.html"
if command -v xdg-open > /dev/null; then
    xdg-open "$url"
elif command -v open > /dev/null; then
    open "$url"
elif command -v start > /dev/null; then
    start "$url"
else
    echo "Cannot open URL in default browser."
fi
python3 serverCalling.py