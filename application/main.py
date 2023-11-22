# main.py
from flask import Blueprint, render_template, session, request, redirect, url_for
from flask_login import login_required
from pymongo import MongoClient
import pymongo



main = Blueprint('main', __name__)
# setting up directory

# ,txt,docx

client=MongoClient("mongodb+srv://aerenizci:2mKrePhiHWkqes2w@unisurvey.8j3xdcs.mongodb.net/?retryWrites=true&w=majority")
db = client.universityData
form_collection = db.formSubmissions



@main.route('/')
def index():
    return render_template('index.html')

@main.route('/about')
def about():
    return render_template('about.html')

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

    try:
        pipeline = [
            {
                "$group": {
                    "_id": "$university",
                    "average_rating": {"$avg": "$average"},
                    "user_count": {"$sum": 1}
                }
            }
        ]

        results = form_collection.aggregate(pipeline)
        universities = []

        for result in results:
            universities.append({
                'name': result['_id'],
                'average_rating': round(result['average_rating'], 2),
                'user_count': result['user_count']
            })

        total_users = form_collection.count_documents({})
        
        # Passing the aggregated data and total user count to the template
        return render_template('stats.html', universities=universities, total_users=total_users)

    except Exception as e:
        return f"{e}"  # Assuming you have an error template


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
    year=data['yearSelect']
    department=data['departmentSelect']
    
    answers = {key[6:]: data[key] for key in data if key.startswith('slider')}
    numeric_values = [float(value) for value in answers.values()]

    # Calculate the average
    average = sum(numeric_values) / len(numeric_values) if numeric_values else -1

    document = {
        "country": country,
        "university": university,
        "department":department,
        "year":year,
        "email": email,  
        "answers": answers,
        "average":average
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

    return redirect(url_for('main.stats'))






