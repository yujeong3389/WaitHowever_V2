from flask import Flask, jsonify, request
from newspaper import Article
from flask_cors import CORS  

app = Flask(__name__)
CORS(app)  

@app.route('/crawl', methods=['GET'])
def crawl_article():
    url = request.args.get('url')  

    try:
        # 기사 크롤링
        article = Article(url)
        article.download()
        article.parse()

        # 크롤링된 기사 본문
        article_content = article.text

        return jsonify({'content': article_content}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
