from typing import Union

from fastapi import FastAPI, Response
from pydantic import BaseModel
import cv2
import numpy as np
import qrcode
import io
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
import base64
import face_recognition


hasPass = True
balance = 500
points = 859

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
    img: str


def base64_to_cv2(s):
    # https://jdhao.github.io/2020/03/17/base64_opencv_pil_image_conversion/

    im_bytes = base64.b64decode(s)
    im_arr = np.frombuffer(im_bytes, dtype=np.uint8)  # im_arr is one-dim Numpy array
    img = cv2.imdecode(im_arr, flags=cv2.IMREAD_COLOR)
    return im_arr, img



@app.post("/onboard")
def onboard(a: Onboard):
    im_arr, img = base64_to_cv2(a.img.split(",")[1])
    detect = cv2.QRCodeDetector()
    value, points, straight_qrcode = detect.detectAndDecode(img)
    if value == "": #no qrcode, detect face
        encoding = face_recognition.face_encodings(img)[0]
        return str(type(biden_encoding))

    if value.split(",")[1] == "pass":
        if hasPass:
            points += 3
            return "Success"
        else:
            return "No Pass"
            
    elif value.split(",")[1] == "balance":
        if balance>=1.5:
            balance-=2
            points += 5
            return "Success"

        else:
            return "Insufficient Fund"

@app.get("/qrcode")
def qr(source):
    img = qrcode.make('42783489,'+source)
    buffer = io.BytesIO()
    img.save(buffer)
    return Response(buffer.getvalue())

@app.get("/balance_and_pass")
def balance_and_pass():
    return ['No Pass', str(round(balance, 2)), str(points)]

