from .base import db, User, Tournament, Owner, Competitor, Competing, Match
from . import query_help

"""Functions to create objects in the database"""


def register_user(user_email, user_fname, user_lname, user_id):
    """Adds a user to the database
    """
    db.session.add(User(email=user_email, first_name=user_fname, family_name=user_lname, id=user_id))
    db.session.commit()


def create_owner(owner_email):
    """Adds an owner to the database
    """
    db.session.add(Owner(email=owner_email));
    db.session.commit()


def create_tournament(tour_name, tour_owner, tour_start, tour_end):
    """Adds a tournament to the database
    """
    tournament = Tournament(name=tour_name, owner=tour_owner, start_date=tour_start, end_date=tour_end)
    db.session.add(tournament)
    db.session.commit()
    return tournament.id


def create_competitor(competitor_email):
    """Adds a competitor to the database
    """
    db.session.add(Competitor(email=competitor_email));
    db.session.commit()


def create_competing(competitor_email, tournament_id):
    """Adds a competing to the database
    """
    db.session.add(Competing(competitor=competitor_email, tournament=tournament_id));
    db.session.commit()


def create_match(match_id, tournament_id, date, time, challenger_email, defender_email):
    """Adds a match to the database
    """
    match = Match(
        id=match_id,
        tournament=tournament_id,
        date_played=date,
        time_played=time,
        challenger=challenger_email,
        defender=defender_email
    )
    db.session.add(match)
    db.session.commit()


""" Functions to check if a given object is in the database """


def is_user_registered(user_email):
    """Returns true if a given email is in the user table
    """
    return db.session.query(User.email).filter_by(email=user_email).first() is not None


def is_owner(owner_email):
    """Returns true if a given email is in the owner table
    """
    return db.session.query(Owner.email).filter_by(email=owner_email).first() is not None


def is_tournament(tour_id):
    """Returns true if a given id is in the tournament table
    """
    return db.session.query(Tournament.id).filter_by(id=tour_id).first() is not None


def is_competitor(competitor_email):
    """Returns true if a given email is in the competitor table
    """
    return db.session.query(Competitor.email).filter_by(email=competitor_email).first() is not None


def is_competing(comp_email, tournament_id):
    """Returns true if a given email and tournament id is in the competing table
    """
    return db.session.query(Competing).filter_by(competitor=comp_email, tournament=tournament_id).first() is not None


#duplicate of function above
#def is_competing(comp_email, tournament_id):
#    return db.session.query(Competing).filter_by(competitor=comp_email, tournament=tournament_id).first() is not None


"""Functions to get information from the database"""


def get_user_info(user_email):
    """
    Attempts to find the user connected to a given email
    :param user_email: string
    :returns: a dict on the form {'first_name':string, 'family_name':string} on
    success, else None
    """
    result = db.session.query(User.first_name, User.family_name).filter_by(email=user_email).first()
    if result is not None:
        user_info = {}
        user_info['first_name'] = result[0]
        user_info['family_name'] = result[1]
        return user_info
    else:
        return None


def get_user_id_from_email(user_email):
    """
    Attempts to find the user id connected to a given email
    :param user_email: string
    :returns: a user id on success, else None
    """
    result = db.session.query(User.id).filter_by(email=user_email).first()
    if result is not None:
        user_id = result[0]
        return user_id
    else:
        return None


def get_tournaments():
    """
    Returns all tournaments in the database
    :returns: an array of dicts on the form
        {
            'id': int,
            'name': string,
            'start_date': string,
            'end_date': string,
            'owner': string
        }
    """
    result = db.session.query(
        Tournament.id,
        Tournament.name,
        Tournament.start_date,
        Tournament.end_date,
        Tournament.owner
    ).all()
    tournaments = []
    if result is not None:
        for tournament in result:
            curr_tournament = {}
            curr_tournament['id'] = tournament[0]
            curr_tournament['name'] = tournament[1]
            curr_tournament['start_date'] = query_help.get_string_from_date(tournament[2])
            curr_tournament['end_date'] = query_help.get_string_from_date(tournament[3])
            curr_tournament['owner'] = tournament[4]
            tournaments.append(curr_tournament)
    return tournaments


""" Miscellanious functions """


def get_next_match_id(tournament_id):
    """
    Calculates the next match id to use in a given tournament
    :param tournament_id: int
    :returns: int
    """
    result = db.session.query(Match.id).filter_by(tournament=tournament_id).all()
    if not result:
        return 1
    else:
        return max(result)[0] + 1
