
# -*- coding: utf-8 -*-
"""
Created on Sat Jun 12 15:02:24 2021

@author: Malav
"""
from flask import Flask, render_template, request, jsonify
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.feature_selection import SelectKBest, chi2
import pickle

# cleaning and dropping stop words
import re
import nltk
from nltk.corpus import stopwords
nltk.download("stopwords")
nltk.download('wordnet')
nltk.download('punkt')

#stemming
from nltk.stem import PorterStemmer

# lemmitizing
from nltk.stem import WordNetLemmatizer

#firebase
import pyrebase
import time
import smtplib



all_stopwords = stopwords.words('english')
all_stopwords.extend(["senthilbalaji","adani","chemistrycanada","colorado","location","gaza","gwadar","implicitweet"])
all_stopwords.extend(["kotri","kotri","ptshrikant","sindh","mkstalin"])

def send_email(e, m):
     
    # creates SMTP session
    sm = smtplib.SMTP('smtp.gmail.com', 587)
    
    # start TLS for security
    sm.starttls()
    
    # Authentication
    sm.login("governancecity@gmail.com", "City@1234")
    
      
    # sending the mail
    sm.sendmail("governancecity@gmail.com", e, m)
    
    # terminating the session
    sm.quit()


def preprocess(s):
    #cleaning the data
    s = s.lower()
    
    # replacing ||| with space
    s = re.sub(r"\|\|\|", " ", s)
    
    s = re.sub(r"https?:\/\/(www)?.?([A-Za-z_0-9-]+)([\S])*", " ", s)

    
    # dropping emails
    s = re.sub(r"\S+@\S+", "", s)


    # dropping punctuations
    s = re.sub('[^\w\s]', " ", s)
  
    
    m = s.split(" ")
    for i in m:
        if(i in all_stopwords):
            m.remove(i)
            
    s = " ".join(m)
    if(s == ""):
        return 0
    
    # Init the Wordnet Lemmatizer
    lemmatizer = WordNetLemmatizer()
    # lemmitizing (excluding stop words in this step)
    word_list = nltk.word_tokenize(s)
   
    s = ' '.join([lemmatizer.lemmatize(w) for w in word_list])
   
    #stemming   
    ps = PorterStemmer()
    word_list = nltk.word_tokenize(s)
   
    s = ' '.join([ps.stem(w) for w in word_list])
    
    if(s == ""):
        return 0
          
    
    return s


def issue(s):
    
    data = pd.read_csv("static/Preprocessed_train_data.csv")
    X_train = data.clean_posts
    y_train = data.Issue_id
    
    vectorizer = TfidfVectorizer(sublinear_tf=True, max_df=0.5,stop_words='english', ngram_range=(1,2))
    X_train = vectorizer.fit_transform(data.clean_posts)
    ch2 = SelectKBest(chi2, k=250)
    
    X_train = ch2.fit_transform(X_train, y_train)
    
    
    X_test = np.array([s])
  
    X_test = vectorizer.transform(X_test)
    X_test = ch2.transform(X_test)
    
    SVM_model = pickle.load(open("static/models/SVM.sav", 'rb'))
    result = SVM_model.predict(X_test)
   
    return result[0]

#--------------------------------------------------------------
def severe(s):
    
    data = pd.read_csv("static/Preprocessed_severity.csv")
  
    X_train = data.clean_posts
    y_train = data.Severity
    vectorizer = TfidfVectorizer(sublinear_tf=True, max_df=0.5,stop_words='english', ngram_range=(1,3))
    X_train = vectorizer.fit_transform(data.clean_posts)
    ch2 = SelectKBest(chi2, k=50)
    X_train = ch2.fit_transform(X_train, y_train)
    X_test = np.array([s])
    X_test = vectorizer.transform(X_test)
    X_test = ch2.transform(X_test)
       
    LR_model = pickle.load(open("static/models/sev_LR.sav", 'rb'))
    
    LR_result = LR_model.predict(X_test)
       
    return LR_result[0]


def push_data(id,email,location,message,progress,issue_type, severity):
        config = {
                "apiKey": "AIzaSyDV_CPfNZ_9D_gmQrxZcbo7SMS_9GQGYcE",
                "authDomain": "city-5dc6f.firebaseapp.com",
                "databaseURL": "https://city-5dc6f-default-rtdb.firebaseio.com",
                "projectId": "city-5dc6f",
                "storageBucket": "city-5dc6f.appspot.com",
                "messagingSenderId": "876826563048",
                "appId": "1:876826563048:web:d82f14c0aad5094cf6145d"
        }
        # Initialize Firebase
        
        firebase1 = pyrebase.initialize_app(config)
        print(firebase1)
        db1 = firebase1.database()
        print(db1)
        db1.child("UserInfo").child(id).set({"email":email})
        db1.child("UserInfo").child(id).update({"location":location})
        db1.child("UserInfo").child(id).update({"message":message})
        db1.child("UserInfo").child(id).update({"progress":progress})
        print("hello world")
        if(issue_type == 0):
            iss = "electric"
        elif(issue_type == 1):
            iss = "crime"   
        elif(issue_type == 2):
            iss = "water"   
        elif(issue_type == 3):
            iss = "sewage"   
        elif(issue_type == 4):
            iss = "road"     
        elif(issue_type == 5):
            iss = "garbage"        
                                            
        db1.child("UserInfo").child(id).update({"issue":iss})
        if(int(severity) == 0):
            ss = "Not Severe"
        else:
            ss = "Severe"     

        db1.child("UserInfo").child(id).update({"severity":ss})
        

        
        return "success"



application = Flask(__name__, template_folder = 'templates', static_folder='static')

@application.route('/')
def landing():
    return render_template('landing.html')


@application.route('/Complaint', methods = ['GET','POST'])
def complaint():
    if request.method == 'POST':
        TId = request.form['TId']
        email = request.form['email']
        location = request.form['location']
        message = request.form['message']
        print(TId,email,location,message)

        com = preprocess(message)    
        print(com)
        progress = 0       
        severity = severe(com) 
        print(severity)
        issue_type = issue(com)    
        print(issue_type)   
  
        q = push_data(TId,email,location,message,progress,issue_type, severity)
        ebody = "Hello, \n Your complaint is Registered. Your complaint id is: " + TId +" ."
        send_email(email, ebody)
        
    return render_template('Complaint.html')    

@application.route('/trackinfo')

def trackinfo():
    # t1 = time.time()
    # config = {
    #          "apiKey": "AIzaSyDV_CPfNZ_9D_gmQrxZcbo7SMS_9GQGYcE",
    #          "authDomain": "city-5dc6f.firebaseapp.com",
    #          "databaseURL": "https://city-5dc6f-default-rtdb.firebaseio.com",
    #          "projectId": "city-5dc6f",
    #          "storageBucket": "city-5dc6f.appspot.com",
    #          "messagingSenderId": "876826563048",
    #          "appId": "1:876826563048:web:d82f14c0aad5094cf6145d"
    #  }
    # firebase = pyrebase.initialize_app(config)
    # db = firebase.database()
    # users = db.child('UserInfo').get()     
    # for user in users.each():
    #     if(user.val()['issue']==""):
    #         k = user.key()
    #         l = user.val()['message']
    # com = preprocess(l)                     
    # severity = severe(com) 
    # issue_type = issue(com)    
    
            
    # print(time.time()-t1) 
    return render_template('trackinfo.html')
           
    

@application.route('/status')
def status():
    return render_template('status.html') 

         

@application.route('/signin')
def signin():
    return render_template('signin.html')

@application.route('/Dashboard1')
def Dashboard1():
    return render_template('Dashboard1.html')
 
@application.route('/index',methods = ['GET','POST'])
def index():
    if request.method == 'POST':
        print("IN here")
        TId = request.form['TId']
        email = request.form['email']
        print(TId, email)
        ebody = "Hello, \n Your issue(id: "+ TId +") has been resolved. \n Thank you for your patience."
        send_email(email, ebody)
    return render_template('index.html')

@application.route('/index1')
def index1():

    return render_template('index1.html')   

@application.route('/test')
def test():
    
    return jsonify({'success': '1'})




if __name__ == '__main__':
    application.run(debug=True)    