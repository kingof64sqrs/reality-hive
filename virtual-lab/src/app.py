from flask import Flask, render_template, request, send_file
import base64

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_video', methods=['POST'])
def generate_video():
    text = request.form.get('text')
    video_data_uri = generate_video_data_uri(text)

    return send_file(video_data_uri, mimetype='video/mp4', as_attachment=True, download_name='generated_video.mp4')

def generate_video_data_uri(text):
    # Replace this with your actual video generation logic
    # For simplicity, this example uses a dummy data URI
    dummy_video_data_uri = 'data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMQAAKAAAENYAAEaAAACzAAAQ5EAAEAAAAAEgAAABAAQABAAEAAAAAAEAAAABAQAAAAAAAAAAAAAAAABAAQAAAAAAAAAAABAAQAAAAAAAAAAABAAQAAAAAAAAAAABAAQAAAAAAAAAAABAAQAAAAAAAAAAABAAQAAAAAAAAAAABAAQAAAAAAA'

    return dummy_video_data_uri

if __name__ == '__main__':
    app.run(debug=True)
