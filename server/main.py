from typing import Union

from fastapi import FastAPI, Response, Cookie
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import cv2
import numpy as np
import qrcode
import io
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import base64
import face_recognition
import redis
import json
r = redis.Redis(host="redis-16133.c273.us-east-1-2.ec2.cloud.redislabs.com", port=16133,
                password="H41MjXV2UTl5rNnTGQYEvWqTYSZD36mm", db=0, decode_responses=True)
import time

# for demo only, slow, the password should NOT be like this


hasPass = 0
balance = 3.5
points = 859


r.set('5678',     json.dumps({
    "name": "Ashar",
    "hasPass": True,
    "balance": 500,
    "points": 859
}))
r.set('1234',     json.dumps({
    "name": "Wayne",
    "hasPass": True,
    "balance": 3,
    "points": 8598
}))

# r.set('history', "{}")
def set_history(card, Vtype, bus, stop, time):
    #demo only, bad perfomance
    old = json.loads(r.get('history'))
    try:
        old[card].append([Vtype, bus, stop, time])
    except:
        old[card] = [[Vtype, bus, stop, time]]

    r.set('history', json.dumps(old))

# print(r.get('10932'))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Onboard(BaseModel):
    bus_number: int
    stop: str
    vehicle_type: str
    img: str



def base64_to_cv2(s):
    # https://jdhao.github.io/2020/03/17/base64_opencv_pil_image_conversion/

    im_bytes = base64.b64decode(s)
    # im_arr is one-dim Numpy array
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    return im_arr, img


@app.post("/onboard")
def onboard(a: Onboard):
    global balance, hasPass, points
    im_arr, img = base64_to_cv2(a.img.split(",")[1])
    detect = cv2.QRCodeDetector()
    value, points_, straight_qrcode = detect.detectAndDecode(img)
    if value == "":  # no qrcode, detect face
        return "No QR-Code"
    card = value.split(",")[0]
    if not card:
        card = 'anonymous'
    # https://www.geeksforgeeks.org/python-strftime-function/
    set_history(card, a.vehicle_type, a.bus_number, a.stop, time.time().strftime("%Y-%m-%d %H:%M"))
    res = json.loads(r.get(card))

    if value.split(",")[1] == "pass":
        if res["hasPass"]:
            res["points"] = 3 + res["points"]
            r.set(card, json.dumps(res))
            return "Success"
        else:
            return "No Pass"

    elif value.split(",")[1] == "balance":
        if res["balance"] >= 1.5:
            res["balance"] = 2 + res["balance"]
            res["points"] = 5 + res["balance"]
            r.set(card, json.dumps(res))
            return "Success"

        else:
            return "Insufficient Fund"


@app.get("/qrcode")
def qr(source, card: str | None = Cookie(default=None)):
    img = qrcode.make(str(card)+','+source)
    buffer = io.BytesIO()
    img.save(buffer)
    return Response(buffer.getvalue())


@app.get("/balance_and_pass")
def balance_and_pass(card: str | None = Cookie(default=None)):
    # return ['No Pass', balance, points]
    if not card:
        return ["No Card","No Card","No Card"]
    res = r.get(card)
    data = json.loads(res)
    return ['No Pass' if not data["hasPass"] else "Valid Pass", data["balance"], data["points"]]
    # return ['No Pass' if not hasPass else "Valid Pass", str(round(balance, 2)), str(points)]


@app.get("/link_card")
def link_card(card):
    response = JSONResponse(content="OK")
    response.set_cookie(key="card", value=card, samesite="Lax", secure=True, httponly=True)
    return response


@app.get("/history")
def history(card: str | None = Cookie(default=None)):
    try:
        his = json.loads(r.get('history'))[card]
    except:
        return []
    return his
    

import pylab
import seaborn as sns



from datetime import datetime
import pandas as pd

@app.get("/center_chart")
def charts(id):#id is str, not int
    id = int(id)
    buffer = io.BytesIO()
    try:
        data = json.loads(r.get('history'))
    except:
        data = []
    if id == 2:
        modes = [entry[0].capitalize() for entry in data]
        pylab.figure(figsize=(8, 5))

        sns.countplot(x=modes, palette="Set3")
        pylab.xlabel("Transportation Mode")
        pylab.ylabel("Count")
        pylab.title("Distribution of Transportation Modes")
        #pylab.show()
        pylab.savefig(buffer)
        
    elif id==3:
        passenger_counts = [entry[1] for entry in data]
        pylab.figure(figsize=(8, 5))
        modes = [entry[0].capitalize() for entry in data]

        sns.boxplot(x=modes, y=passenger_counts, palette="Set2")
        pylab.xlabel("Transportation Mode")
        pylab.ylabel("Passenger Count")
        pylab.title("Distribution of Passenger Counts by Transportation Mode")
        #pylab.show()
        pylab.savefig(buffer)

    elif id==4:

        locations = [entry[2] for entry in data]
        pylab.figure(figsize=(8, 5))


        sns.countplot(y=locations, palette="viridis", order=pd.value_counts(locations).index)
        pylab.xlabel("Count")
        pylab.ylabel("Location")
        pylab.title("Frequency of Locations")
        #pylab.show()
        pylab.savefig(buffer)
    elif id==5:

        modes = [entry[0].capitalize() for entry in data]

        pylab.figure(figsize=(8, 5))

        pylab.pie(pd.value_counts(modes), labels=pd.value_counts(modes).index, autopct='%1.1f%%', startangle=140)
        pylab.axis('equal')
        pylab.title("Distribution of Transportation Modes")
        #pylab.show()
        pylab.savefig(buffer)
    elif id==6:
        locations = [entry[2] for entry in data]
        passenger_counts = [entry[1] for entry in data]
        modes = [entry[0].capitalize() for entry in data]

        pylab.figure(figsize=(8, 5))
        sns.scatterplot(x=locations, y=passenger_counts, hue=modes, palette="Set2")
        pylab.xlabel("Location")
        pylab.ylabel("Passenger Count")
        pylab.title("Passenger Counts vs. Locations")
        pylab.xticks(rotation=45)
        #pylab.show()
        pylab.savefig(buffer)

    elif id==1:
        modes = [entry[0].capitalize() for entry in data]
        passenger_counts = [entry[1] for entry in data]
        locations = [entry[2] for entry in data]
        timestamps = [datetime.strptime(entry[3], "%B %d, %Y %I:%M%p") for entry in data]


        df = pd.DataFrame({'Hour': [ts.hour for ts in timestamps], 'Mode': modes, 'Passenger Count': passenger_counts})
        hourly_mode_counts = df.groupby(['Hour', 'Mode']).size().unstack().fillna(0)

        pylab.figure(figsize=(8, 5))

        sns.heatmap(hourly_mode_counts, cmap="YlGnBu")
        pylab.xlabel("Transportation Mode")
        pylab.ylabel("Hour of the Day")
        pylab.title("Passenger Counts by Hour and Transportation Mode")
        #pylab.show()
        pylab.savefig(buffer)
    else:
        print("I am lost")
        return "Wrong ID"
    return Response(buffer.getvalue())


import openai
with open("/home/gitpod/key", "r") as f:
    openai.api_key = f.read()[:-1]

 

@app.get("/chat")
def chat(prompt):
  try:
    data = json.loads(r.get('history'))
  except:
    data = []
  p = [
          {"role": "system", "content": "You are a helpful assistant for transportation data analyze. You will be given the history\
           log of the city data, it is in the format of list of \
          lists, each sub-list means a passenger boarded the vehicle. The format is [vehicle type, vehicle number, stop/station name, time],\
          you will chat with the city control center. Remember to show your thinking process, give facts first, then reasoning, \
          then conclusion. Don't worry about saying too much (of cause not be too wordy). The user does NOT want code, they want plain text result, \
          so analyze these data by yourself. Again, give facts, then reasoning, then conclusion. Do not output text in markdown\
           format but HTML format (but rather not use any special tags). Current date and time:" + datetime.now().strftime("Year: %Y Month: %m Day: %d Time: %H:%M") + "Here is the data: \n "+str(data)},
]

  msg = p
  msg.append( {"role": "user", "content": prompt})
  response = openai.ChatCompletion.create(
      model="gpt-3.5-turbo",
      messages=msg
  )
  msg.append({"role":"assistant", "content": response["choices"][0]["message"]["content"]})
  return response["choices"][0]["message"]["content"]