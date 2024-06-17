from flask import Flask, request, jsonify,Response,make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Enum,UniqueConstraint
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity,unset_jwt_cookies
from flask_cors import CORS
from flask_restful import Resource,Api
import json
from datetime import datetime,timedelta
from sqlalchemy.orm import relationship



app = Flask(__name__)
CORS(app,origins='*') # all methods will be accepted.
# app.options('*',cors())
#CORS(app, resources={r"/sections*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['JWT_SECRET_KEY']='LIBRARY'
db = SQLAlchemy(app)
api = Api(app)
jwt=JWTManager(app)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True,nullable=False)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String(255),nullable=False)
    role=db.Column(db.String(255),nullable=False)
    lastloggedin=db.Column(db.Date)
    
    
    
    


class Section(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), unique=True,nullable=False)
  description = db.Column(db.String(255))
  date_created=db.Column(db.Date,default=datetime(2001,1,1)) # how this works

class Books(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80), unique=True,nullable=False)
  authors = db.Column(db.String(255),nullable=False)
  pdf_link = db.Column(db.String(255),nullable=False)
  date_added=db.Column(db.Date,default=datetime(2001,1,1))
  section_id=db.Column(db.Integer,db.ForeignKey('section.id',ondelete='CASCADE'))
  section=db.relationship('Section',backref=db.backref('books',lazy=True,cascade='all, delete-orphan'))

class Transactions(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  book_id = db.Column(db.Integer,db.ForeignKey('books.id',ondelete='CASCADE'))
  issued_to = db.Column(db.Integer,db.ForeignKey('user.id'))
  issue_date=db.Column(db.Date)
  return_date=db.Column(db.Date)
  status = db.Column(Enum('requested', 'issued', name='transaction_status'))
  __table_args__ = (
        UniqueConstraint('book_id', 'issued_to', name='_book_issued_to_uc'),
    )
class Ratings(db.Model):
    id=db.Column(db.Integer,primary_key=True)
    book_id=db.Column(db.Integer,db.ForeignKey('books.id',ondelete='CASCADE'))
    rated_by=db.Column(db.Integer,db.ForeignKey('user.id'))
    rating=db.Column(db.Integer)

with app.app_context():
    db.create_all()
    admin_username = 'admin'
    admin_password = 'admin'
    admin_email='admin@email.com'
    role='Administrator'
    

    if not User.query.filter_by(username=admin_username).first():
        hashed_password = generate_password_hash(admin_password, method='pbkdf2:sha256')
        admin_user = User(username=admin_username, password=hashed_password,role=role,email=admin_email)
        db.session.add(admin_user)
        db.session.commit()


@app.route('/')
def home():
    return 'Hello, World!'


class SignupResource(Resource):

    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        role=data.get('role')
        email=data.get('email')
        # role = data.get('role')

        
        if User.query.filter_by(username=username).first():
            return {'error':'Username already exists'}, 400
        hashed = generate_password_hash(password,method='pbkdf2:sha256')
        # if role == 'user':
        #     new_user = User(username=username,password=hashed,role='user')
        # elif role == 'admin':
        #     new_user = User(username=username,password=hashed,role='admin')


        new_user = User(username=username,password=hashed,role=role,email=email)
        db.session.add(new_user)
        db.session.commit()

        return {'message':'Signup Successful'}, 201
    
class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        # role = data.get('role')       
        user=User.query.filter_by(username=username).first()
           
        if user:
            if check_password_hash(user.password, password):
                access_token=create_access_token(identity={
                    'username':user.username
                })
                print("enter date")
                user.lastloggedin=datetime.utcnow()
                db.session.commit()
                return {'message': 'Login Successful','access_token':access_token,'userRole':user.role,'userId':user.id}, 200
            else:
                return {'message': 'Invalid Password'}, 401
        else:
            print("User not found")
            return {'message': 'User does not exist, please sign up'}, 404

class SectionResource(Resource):
    @jwt_required()
    def get(self,section_id=None):
        if section_id is None:
            sections=Section.query.all()
            section_list=[{'id':section.id,'name':section.name,'description':section.description} for section in sections]

            return jsonify(section_list)
        else:
            section=Section.query.get(section_id)
            if section:
                return {'id':section.id,'name':section.name,'description':section.description}
            else:
                return {'error':'Category not found'},400
    @jwt_required()
    def post(self):
        data=request.get_json()
        section_name=data.get('section_name')
        section_desc=data.get('section_description')

        if not section_name:
            return {'error':'Section name is required'},400
        existing_section=Section.query.filter(Section.name.ilike(section_name)).first()
        print(existing_section)
        if existing_section:
            return {'error':'category already exists'},409 
        new_section=Section(name=section_name,description=section_desc)
        db.session.add(new_section)
        db.session.commit()
        return {'message':'Section Created Succesfully'},201
    @jwt_required()
    def put(self,section_id):
        if not section_id:
            return {'error':'Section ID is required'}
        section=Section.query.get(section_id)

        if not section:
            return {'error':'section not found'},400
        data=request.get_json()
        new_section_name=data.get('name')
        new_section_description=data.get('description')
        section.name=new_section_name
        if new_section_description:
            section.description=new_section_description
        db.session.commit()
        return {'message':'Section Edited Succesfully'},201
    @jwt_required()
    def delete(self,section_id):
        if not section_id:
            return {'error':'section id is required'},400
        section=Section.query.get(section_id)
        if not section:
            return {'error':'section not found'},400
        book_list=Books.query.filter_by(section_id=section_id)
        for book in book_list:
            transaction_list=Transactions.query.filter_by(book_id=book.id)
            rating_list=Ratings.query.filter_by(book_id=book.id)
            for transaction in transaction_list:
                db.session.delete(transaction)
            for rating in rating_list:
                db.session.delete(rating)
        # for book in book_list:
        #     db.session.delete(book)
        db.session.delete(section)
        db.session.commit()

        return {'message':'section deleted succesfully'},200

# class Logout(Resource):
#     @jwt_required()
#     def post(self):
#         resp = make_response(jsonify({'message':'Logged out successfully'}))
#         unset_jwt_cookies(resp)
#         return resp,200

class SearchResource(Resource):
    @jwt_required()
    def post(self):
        search_query=request.json.get('search_query')
        user_id=request.json.get('user_id')
        search_by=request.json.get('search_by')
        if search_by=="Author Name":
            books=Books.query.filter((Books.authors.ilike(f'%{search_query}%'))).all()
        else:
            books=Books.query.filter((Books.name.ilike(f'%{search_query}%'))).all()
        book_list=[{'id':book.id,'name':book.name,'status':"NA",'link':book.pdf_link,'author':book.authors,'section':book.section_id} for book in books]  
        for book in book_list:
            transaction=Transactions.query.filter_by(book_id=book['id'],issued_to=user_id).first()
            if transaction:
                book['status']=transaction.status
        return jsonify(book_list)
@app.route('/logout',methods=['POST'])
@jwt_required()
def logout():
    resp = jsonify({'message':'Logged out successfully'})
    unset_jwt_cookies(resp)
    return resp,200


class BookResource(Resource):
    @jwt_required()
    def post(self):
        data=request.get_json()
        book_name=data.get('book_name')
        book_author=data.get('book_author')
        section_id=data.get('section_id')
        book_link=data.get('book_link')

        if not book_name:
            return {'error':'Book name is required'},400
        if not book_author:
            return {'error':'Book Author is required'},400
        existing_book=Books.query.filter(Books.name.ilike(book_name)).first()
        if existing_book:
            return {'error':'book already exists'},409 
        book_link_new="http://localhost:3000/"+book_link
        # print(book_link_new)
        new_book=Books(name=book_name,authors=book_author,section_id=section_id,pdf_link=book_link_new)
        db.session.add(new_book)
        db.session.commit()
        return {'message':'Section Created Succesfully'},201
    @jwt_required()
    def get(self,section_id=None):
        if section_id is None:
            books=Books.query.all()
            book_list=[{'id':book.id,'name':book.name,'authors':book.authors,'section_id':book.section_id,'pdf_link':book.pdf_link} for book in books]
            return jsonify(book_list)
        
        else:
            books=Books.query.filter_by(section_id=section_id)
            book_list=[{'id':book.id,'name':book.name,'authors':book.authors,'section_id':book.section_id,'pdf_link':book.pdf_link} for book in books]
            return jsonify(book_list)
        
    @jwt_required()
    def put(self,book_id):
        if not book_id:
            return {'error':'Book ID is required'}
        book=Books.query.get(book_id)

        if not book:
            return {'error':'book not found'},400
        data=request.get_json()
        new_book_name=data.get('name')
        new_author_name=data.get('author')
        new_link=data.get('link')
        new_section=data.get('section')
        if "http" in new_link:
            book_link_new=new_link
        else:
            book_link_new="http://localhost:3000/"+new_link
        book.name=new_book_name
        book.author=new_author_name
        book.pdf_link=book_link_new
        book.section_id=new_section
        db.session.commit()
        return {'message':'Book Edited Succesfully'},201

    @jwt_required()
    def delete(self,book_id):
        if not book_id:
            return {'error':'Book id is required'},400
        book=Books.query.get(book_id)
        if not book:
            return {'error':'Book not found'},400
        transaction_list=Transactions.query.filter_by(book_id=book.id)
        rating_list=Ratings.query.filter_by(book_id=book.id)
        for transaction in transaction_list:
            db.session.delete(transaction)
        for rating in rating_list:
            db.session.delete(rating)
        # for book in book_list:
        #     db.session.delete(book)
        db.session.delete(book)
        db.session.commit()

        return {'message':'section deleted succesfully'},200 

class AccessBook(Resource):
    @jwt_required()
    def post(self):
        data = request.get_json()
        userId = data.get('userId')
        book_id = data.get('book_id') 
        no_of_books=Transactions.query.filter_by(issued_to=userId).count()
        if not book_id:
            return {'error':'Book ID is required'}, 400  # Corrected the status code to 400
        if (no_of_books<5):
            available_book = Transactions.query.filter_by(book_id=book_id,issued_to=userId).first()  # Used first() to get the first result
            if available_book:
                return {'error': 'Book is available in your ID'}, 401  # Corrected the status code to 401
            new_transaction = Transactions(book_id=book_id, issued_to=userId,status="requested")  # Corrected datetime.datetime.utcnow to a function call
        
            db.session.add(new_transaction)
            db.session.commit()
            return {'message': 'Transaction successfully created'}, 201  # Returning a success message with status code 201
        else:
            return{'message': 'Book Issue Limit Reached' },210
    @jwt_required()
    def get(self,user_id,section_id=None):
            book_list=[]
            section_book_list=[]
            transactions=Transactions.query.filter_by(issued_to=user_id)
            for transaction in transactions:
                book_id=transaction.book_id
                book=Books.query.get(book_id)
                if section_id==None:
                    if transaction.status=="issued":
                        book_list.append({'id':book.id,'name':book.name,'authors':book.authors,'section_id':book.section_id,'status':transaction.status,'book_link':book.pdf_link,'return_date':transaction.return_date.strftime('%d-%m')})
                    else:
                        book_list.append({'id':book.id,'name':book.name,'authors':book.authors,'section_id':book.section_id,'status':transaction.status,'book_link':book.pdf_link,'return_date':'NA'})
                elif book.section_id==section_id:
                    if transaction.status=="issued":
                        section_book_list.append({'id':book.id,'name':book.name,'authors':book.authors,'section_id':book.section_id,'status':transaction.status,'book_link':book.pdf_link,'return_date':transaction.return_date.strftime('%d-%m')})
                    else:
                        section_book_list.append({'id':book.id,'name':book.name,'authors':book.authors,'section_id':book.section_id,'status':transaction.status,'book_link':book.pdf_link,'return_date':'NA'})
            if section_id==None:
                return jsonify(book_list)
            else:
                return jsonify(section_book_list)
            
    @jwt_required()
    def delete(self,user_id,book_id):
        
        if not(user_id and book_id) :
            return {'error':'user id and book id is required'},400
        transaction=Transactions.query.filter_by(book_id=book_id,issued_to=user_id).first()
        if not transaction:
            return {'error':'transaction not found'},400
        # book_list=Books.filter_by(section_id=section_id)
        # for book in book_list:
        #     db.session.delete(book)
        db.session.delete(transaction)
        db.session.commit()

        return {'message':'book returned succesfully'},200

class AdminRequests(Resource):
    @jwt_required()
    def get(self):
            transactions=Transactions.query.all()
            transaction_list=[]
            for transaction in transactions:
                book_id=transaction.book_id
                book=Books.query.get(book_id)
                user_id=transaction.issued_to
                user=User.query.get(user_id)
                if transaction.status=='requested':
                    transaction={'bookId':book.id,'bookName':book.name,'userId':user.id,'userName':user.username}
                    transaction_list.append(transaction)
    
            return jsonify(transaction_list)
    @jwt_required()
    def put(self):
        data = request.get_json()
        user_id = data.get('user_id')
        book_id = data.get('book_id') 
        _request=Transactions.query.filter_by(issued_to=user_id,book_id=book_id).first()
        if not (book_id and user_id):
            return {'error':'Book ID and user ID is required'}, 400  # Corrected the status code to 400
        _request.status='issued'
        _request.issue_date=datetime.utcnow()
        _request.return_date=_request.issue_date+timedelta(days=5)
        db.session.commit()
        return {'message': 'Transaction updated successfully'}, 201  # Returning a success message with status code 201
        
    @jwt_required()
    def delete(self,user_id,book_id):
        
        if not(user_id and book_id) :
            return {'error':'user id and book id is required'},400
        transaction=Transactions.query.filter_by(book_id=book_id,issued_to=user_id).first()
        if not transaction:
            return {'error':'transaction not found'},400
        # book_list=Books.filter_by(section_id=section_id)
        # for book in book_list:
        #     db.session.delete(book)
        db.session.delete(transaction)
        db.session.commit()

class AdminReports(Resource):
    @jwt_required()
    def get(self):
        transactions=Transactions.query.all()
        transaction_list=[]
        for transaction in transactions:
            book_id=transaction.book_id
            book=Books.query.get(book_id)
            user_id=transaction.issued_to
            user=User.query.get(user_id)
            if transaction.status=='issued':
                transaction={'bookId':book.id,'bookName':book.name,'userId':user.id,'userName':user.username}
                transaction_list.append(transaction)
        return jsonify(transaction_list)

class RateBook(Resource):
    @jwt_required()
    def get(self):
        all_ratings = Ratings.query.all()
        rating_sum = {}
        rating_count = {}
        rated_by={}
        for rating in all_ratings:
            if rating.book_id not in rating_sum:
                rating_sum[rating.book_id] = rating.rating
                rating_count[rating.book_id] = 1
                rated_by[rating.book_id]=[rating.rated_by]
            else:
                rating_sum[rating.book_id] += rating.rating
                rating_count[rating.book_id] += 1
                rated_by[rating.book_id].append(rating.rated_by)
        ratings = {}
        for book_id in rating_sum:
            ratings[book_id] ={'average_rating': rating_sum[book_id] / rating_count[book_id],'rated_by':rated_by[book_id]}
        return jsonify(ratings)


    @jwt_required()
    def post(self):
        data = request.get_json()
        userId = data.get('userId')
        bookId = data.get('bookId') 
        rating=data.get('rating')
        
        old_rating=Ratings.query.filter_by(book_id=bookId,rated_by=userId).first()
        print(old_rating)
        if(old_rating):
            return {'message': 'You have already rated this book'},210
        else:  
            new_rating = Ratings(book_id=bookId, rated_by=userId,rating=rating)  
            db.session.add(new_rating)
            db.session.commit()
            return {'message': 'New rating added'}, 201  




api.add_resource(SignupResource,'/signup')
api.add_resource(UserLogin,'/user-login')
# api.add_resource(SectionResource,'/sections')
api.add_resource(SectionResource,'/sections','/sections/<int:section_id>')
api.add_resource(SearchResource,'/search')
# api.add_resource(Logout,'/logout')
api.add_resource(BookResource,'/book','/edit_book/<int:book_id>','/book/<int:section_id>','/delete_book/<int:book_id>')
api.add_resource(AccessBook,'/access_book','/access_book/<int:user_id>','/access_book/<int:user_id>/<int:section_id>','/delete_transaction/<int:user_id>/<int:book_id>')
api.add_resource(AdminRequests,'/approve_request','/reject_request/<int:user_id>/<int:book_id>')
api.add_resource(AdminReports,'/admin-reports')
api.add_resource(RateBook,'/rate-book')
if __name__ == '__main__':
    app.run(port=8000, debug=True)