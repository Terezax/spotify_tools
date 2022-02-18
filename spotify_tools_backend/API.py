import os.path

from flask import Flask, redirect, url_for, session, request, Response
from flask_oauthlib.client import OAuth, OAuthException

SPOTIFY_APP_ID = 'h\dlkfhzldfj'
SPOTIFY_APP_SECRET = 'dfjsdj'

app = Flask(__name__)
app.debug = True
app.secret_key = 'development'
oauth = OAuth(app)

spotify = oauth.remote_app(
    'spotify',
    consumer_key=SPOTIFY_APP_ID,
    consumer_secret=SPOTIFY_APP_SECRET,
    # Change the scope to match whatever it us you need
    # list of scopes can be found in the url below
    # https://developer.spotify.com/web-api/using-scopes/
    request_token_params={'scope': 'playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private user-library-read user-library-modify'},
    base_url='https://accounts.spotify.com',
    request_token_url=None,
    access_token_url='/api/token',
    authorize_url='https://accounts.spotify.com/authorize'
)

def root_dir():  # pragma: no cover
    return os.path.abspath(os.path.dirname(__file__))

def get_file(filename):  # pragma: no cover
    try:
        src = os.path.join(root_dir(), filename)
        # Figure out how flask returns static files
        # Tried:
        # - render_template
        # - send_file
        # This should not be so non-obvious
        return open(src).read()
    except IOError as exc:
        return str(exc)

@app.route('/')
def index():
    return redirect(url_for('login'))


@app.route('/login')
def login():
    callback = url_for(
        'spotify_authorized',
        _external=True
    )
    return spotify.authorize(callback=callback)


@app.route('/login/authorized')
def spotify_authorized():
    resp = spotify.authorized_response()
    if resp is None:
        return 'Access denied: reason={0} error={1}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    if isinstance(resp, OAuthException):
        return 'Access denied: {0}'.format(resp.message)

    session['oauth_token'] = (resp['access_token'], '')
    content = get_file('static/oauth_finish.html')
    return Response(content, mimetype="text/html")

@spotify.tokengetter
def get_spotify_oauth_token():
    return session.get('oauth_token')

@app.route('/userProfile')
def getUserProfile():
    resp = Response("""{
        "id": "A",
        "displayName": "Franta Vykoukal",
        "email": "franta@volny.cz",
        "imageUrl": ""
    }""", mimetype='application/json')
    return resp

@app.route('/playlists')
def getPlaylists():
    resp = Response("""[
        {
            "id": "A",
            "name": "Playlist A",
            "url": "https://www.seznam.cz",
            "numberOfTracks": 3
        },
        {
            "id": "B",
            "name": "Playlist B",
            "url": "https://www.seznam.cz",
            "numberOfTracks": 4
        }
    ]""", mimetype='application/json')
    return resp

@app.route('/playlists/$compare')
def getComparePlaylists():
    resp = Response("""{
        "tracksMissingFromPlaylist1": [
            {
                "id": "A",
                "name": "Smells Like Teen Spirit",
                "url": "https://open.spotify.com/track/5ghIJDpPoe3CfHMGu71E6T",
                "duration": 143000,
                "albumName": "Nevermind",
                "albumUrl": "https://open.spotify.com/album/2UJcKiJxNryhL050F5Z1Fk?highlight=spotify:track:4CeeEOM32jQcH3eN9Q2dGj",
                "albumImageUrl": "https://i.scdn.co/image/ab67616d00001e02e175a19e530c898d167d39bf",
                "artists": [{
                    "id": "A",
                    "name": "Nirvana",
                    "url": "https://open.spotify.com/artist/6olE6TJLqED3rqDCT0FyPh"
                }]
            }
        ],
        "tracksMissingFromPlaylist2": [
            {
                "id": "B",
                "name": "Song B",
                "url": "https://www.seznam.cz",
                "duration": 181000,
                "albumName": "Album B",
                "albumUrl": "https://www.seznam.cz",
                "albumImageUrl": "",
                "artists": [{
                    "id": "B",
                    "name": "Artist B",
                    "url": "https://www.seznam.cz"
                }]
            },
            {
                "id": "C",
                "name": "Song C",
                "url": "https://www.seznam.cz",
                "duration": 210000,
                "albumName": "Album C",
                "albumUrl": "https://www.seznam.cz",
                "albumImageUrl": "",
                "artists": [{
                    "id": "C",
                    "name": "Artist C",
                    "url": "https://www.seznam.cz"
                }, {
                    "id": "D",
                    "name": "Artist D",
                    "url": "https://www.seznam.cz"
                }]
            }
        ]
    }""", mimetype='application/json')
    return resp

@app.route('/playlists/<pid>/tracks/<trackid>', methods = ['POST'])
def postTrackToPlaylist(pid, trackid):
    return '', 201


if __name__ == '__main__':
    app.run()

