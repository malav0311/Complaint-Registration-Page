from flask import Flask, render_template

application = Flask(__name__, template_folder = 'templates', static_folder='static')

@application.route('/')
def landing():
    return render_template('landing.html')

@application.route('/signin.html')
def signin():
    return render_template('signin.html')

@application.route('/Dashboard1.html')
def Dashboard1():
    return render_template('Dashboard1.html')
 
@application.route('/index.html')
def index():
    return render_template('index.html')

@application.route('/index1.html')
def index1():
    return render_template('index1.html')    
    

if __name__ == '__main__':
    application.run(debug=True)    