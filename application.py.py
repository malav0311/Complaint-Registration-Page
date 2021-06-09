from flask import Flask, render_template

app = Flask(__name__, template_folder = 'templates', static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/trackinfo.html')
def trackinfo():
    return render_template('trackinfo.html')

@app.route('/status.html')
def status():
    return render_template('status.html')    

    

if __name__ == '__main__':
    app.run(debug=True)    