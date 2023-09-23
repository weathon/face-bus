from typing import Union

from fastapi import FastAPI, Response
from pydantic import BaseModel
import cv2
import numpy as np
import qrcode
import io
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware



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
    return img

@app.post("/onboard")
def onboard(a: Onboard):
    img = base64_to_cv2(a.img)
    detect = cv2.QRCodeDetector()
    value, points, straight_qrcode = detect.detectAndDecode(img)
    return value

@app.get("/qrcode")
def qr():
    img = qrcode.make('Some data here')
    buffer = io.BytesIO()
    img.save(buffer)
    return Response(buffer.getvalue())

@app.get("/balance_and_pass")
def balance_and_pass():
    return ['No Pass', "85.23"]