# main.py
import os
from flask import Blueprint, jsonify, render_template, session, send_file, request, redirect, url_for
from flask_login import login_required
from path import mypath
from werkzeug.utils import secure_filename
from pymongo import MongoClient
import pymongo



main = Blueprint('main', __name__)
# setting up directory
ABSOLUTE_PATH = mypath()
ALLOWED_EXTENSIONS = {'pdf', 'docx', "txt"}
# ,txt,docx

client=MongoClient("mongodb+srv://aerenizci:2mKrePhiHWkqes2w@unisurvey.8j3xdcs.mongodb.net/?retryWrites=true&w=majority")
db = client.universityData
form_collection = db.formSubmissions
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@main.route('/')
def index():
    return render_template('index.html')

@login_required
@main.route('/survey',methods=["GET"])
def survey():
    try:
        email = str(session["email"])
    
    except:
        return redirect(url_for('auth.login'))
    return render_template('survey.html')

@login_required
@main.route('/stats',methods=["GET"])
def stats():
    try:
        email = str(session["email"])
    
    except:
        return redirect(url_for('auth.login'))
    return render_template('stats.html')

@main.route('/myform', methods=['POST'])
def receive_form():
    try:
        email = str(session["email"])
    
    except:
        return redirect(url_for('auth.login'))
    form_collection.create_index([("email", pymongo.ASCENDING)], unique=True)

    data = request.form
    country = data['countrySelect']
    university = data['universitySelect']
   
    answers = {key[6:]: data[key] for key in data if key.startswith('slider')}

    document = {
        "country": country,
        "university": university,
        "email": email,  # Include email in the document
        "answers": answers
    }

    try:
        # Update the document if exists, else insert a new one
        form_collection.update_one(
            {"email": email},
            {"$set": document},
            upsert=True
        )
        # Redirect or handle success
    except pymongo.errors.OperationFailure as e:
        print(f"An error occurred: {e}")
        return "Error updating/inserting data into MongoDB", 500

    return redirect(url_for('main.index'))






