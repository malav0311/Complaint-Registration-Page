from flask import Flask, render_template

application = Flask(__name__, template_folder = 'templates', static_folder='static')

@application.route('/')
def index():
    return render_template('index.html')

@application.route('/trackinfo.html')
def trackinfo():
    return render_template('trackinfo.html')

@application.route('/status.html')
def status():
    return render_template('status.html')    

    

if __name__ == '__main__':
    application.run(debug=True)    