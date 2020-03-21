import flask
from flask import Flask, escape, request, Response, make_response
import os

FOLDER = os.path.realpath(os.path.join(os.path.dirname(__file__)))
app = Flask(__name__)

def success():
    return make_response({"success": True})


def fail(description="This is an error!"):
    resp = make_response({"success": False, "errorDescription": description})
    resp.status_code = 400
    return resp

def read_file(relPath):
    with open(os.path.join(FOLDER, relPath), 'r') as f:
        content = f.read()

    return Response(content, content_type="application/json")

@app.route('/registration', methods=['POST'])
def registration():
    if not request.args.get("role"):
        return fail("'role' as GET parameter expected")

    if request.args.get("role") == "human":
        return success()

    if request.args.get("role") == "lab":
        return fail("nothing is wrong, just return an error to test errors")
    
@app.route('/password-forgotten', methods=['POST'])
def pw_forgotten():
    if not request.get_json().get("email"):
        return fail("'email' in body expected")

    return success()

@app.route('/password-reset', methods=['POST'])
def pw_reset():
    if request.args.get('token') and not request.get_json().get('newPassword'):
        return fail()

    if not request.args.get('token'):
        if not request.get_json().get('oldPassword') or not request.get_json().get('newPassword'):
            return fail("'oldPassword' and 'newPassword' in body expected")

        return success()

@app.route('/profile', methods=['GET'])
def profile():
    return read_file('resources/profile.json')


@app.route("/login", methods=['PSOT'])
def login():
    body = request.get_json()
    if not body:
        return fail()

    if not body.get("email") or not body.get("password"):
        return fail("'email' and 'password' in body expected")

    return make_response({"success": True, "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"})


@app.route("/search", methods=['GET'])
def search():
    t = request.args.get("role")
    if t == "human":
        return read_file('resources/searchresults_human.json')

    if t == "lab":
        return read_file('resources/searchresults_labs.json')
    
    return fail("Invalid 'role' parameter")

def main():
    app.run("0.0.0.0")

if __name__ == "__main__":
    main()