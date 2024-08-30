from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from models import db,User,Faculty, Student, Course
from crud import create_faculty, get_all_faculties, update_faculty, delete_faculty
from crud import create_student, get_all_students, update_student, delete_student
from crud import create_course, get_all_courses, update_course, delete_course

app = Flask(__name__)
CORS(app)

# Add credencials here
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'jk48dj37bk44nk007'  # Replace with a strong secret key
app.config['JWT_SECRET_KEY'] = 'lm10dec18wc2022'  # Replace with a strong JWT secret key

# db = SQLAlchemy(app)
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

#login and signup

from werkzeug.security import generate_password_hash

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    print(data)
    username = data.get('username')
    password = data.get('password')
    user_type = data.get('type')
    print(user_type)
    if User.query.filter_by(username=username).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password, type = user_type)
    global student
    if user_type == 'student':
        student = create_student(data['username'], None)
        
    elif user_type == 'faculty':
        student = create_faculty(data['username'], None, None)
    access_token = create_access_token(identity={'username': new_user.username})  
    db.session.add(new_user)
    db.session.commit()
    students = get_all_students()
    for stu in students:
        print(stu.username)
    
    return jsonify({'access_token': access_token, 'type':new_user.type,'id':student.id}), 201

from werkzeug.security import check_password_hash

@app.route('/login', methods=['POST'])
def login():
    
    data = request.get_json()
    
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    
    if user.type == 'student':
        students = Student.query.all()
        for student in students:
            if student.username == username:
                break
                
        
    if user.type == 'faculty':
        faculties = Faculty.query.all()
        for student in faculties:
            if student.username == username:
                break


    if user and check_password_hash(user.password, password):
        access_token = create_access_token(identity={'username': user.username})  
        return jsonify({'access_token': access_token, 'type':user.type,'id':student.id}), 200

    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

from flask import session, jsonify

# @app.route('/login', methods=['POST'])
# def login():
#     # Assume you've verified user credentials
#     user = ... # fetched user object from database
#     session['username'] = user.username  # Store username in session
#     return jsonify({'message': 'Login successful', 'username': user.username})

# @app.route('/check_login', methods=['GET'])
# def check_login():
#     if 'username' in session:
#         return jsonify({'logged_in': True, 'username': session['username']})
#     else:
#         return jsonify({'logged_in': False})

#faculty routes

@app.route('/create_faculty', methods=['POST'])
def create_faculty_route():
    data = request.json
    faculty = create_faculty(data['username'], data['email',None], data.get('department', None))
    return jsonify({'id': faculty.id, 'username': faculty.username})

@app.route('/get_faculties', methods=['GET'])
def get_faculties_route():
    faculties = get_all_faculties()
    return jsonify([{'id': f.id, 'username': f.username, 'email': f.email} for f in faculties])

@app.route('/update_faculty/<int:faculty_id>', methods=['PUT'])
def update_faculty_route(faculty_id):
    data = request.json
    faculty = update_faculty(faculty_id, data.get('username', None), data.get('email', None), data.get('department', None))
    return jsonify({'id': faculty.id, 'username': faculty.username, 'email': faculty.email})

@app.route('/delete_faculty/<int:faculty_id>', methods=['DELETE'])
def delete_faculty_route(faculty_id):
    delete_faculty(faculty_id)
    return jsonify({'message': 'Faculty deleted successfully'})


# student routes


def create_student_route():
    data = request.json
    student = create_student(data['username'], data['email'])
    return jsonify({'id': student.id, 'username': student.username})

@app.route('/student', methods=['GET'])
def get_all_students_route():
    students = get_all_students()
    return jsonify([{'id': s.id, 'username': s.username} for s in students])

@app.route('/update_student/<int:student_id>', methods=['PUT'])
def update_student_route(student_id):
    data = request.json
    student = update_student(student_id, data.get('username', None), data.get('email', None), data.get('department', None))
    return jsonify({'id': student.id, 'username': student.username, 'email': student.email})

@app.route('/delete_student/<int:student_id>', methods=['DELETE'])
def delete_student_route(student_id):
    delete_student(student_id)
    return jsonify({'message': 'Student deleted successfully'})


#courses

@app.route('/course', methods=['POST'])
def create_course_route():
    data = request.json
    new_course = create_course(
        data['name'],
        data['start_date'],
        data['end_date'],
        data['total_lectures'],
        data.get('lectures_conducted', 0),  # Default to 0 if not provided
        data['total_credits']
    )
    
    return jsonify({'id': new_course.id, 'name': new_course.name})

# Retrieve All Courses
@app.route('/courses', methods=['GET'])
def get_all_courses_route():
    courses = get_all_courses()
    return jsonify([{
        'id': course.id,
        'name': course.name,
        'start_date': str(course.start_date),
        'end_date': str(course.end_date),
        'total_lectures': course.total_lectures,
        'lectures_conducted': course.lectures_conducted,
        'total_credits': course.total_credits
    } for course in courses])

# Update Course
@app.route('/update_course/<int:course_id>', methods=['PUT'])
def update_course_route(course_id):
    data = request.json
    course = update_course(course_id,data.get('start_date',None),data.get('end_date',None),data.get('total_lectures',None),data.get('lectures_conducted',None),None)
    db.session.commit()
    return jsonify({'id': course.id, 'name': course.name})

# Delete Course
@app.route('/delete_course/<int:course_id>', methods=['DELETE'])
def delete_course_route(course_id):
    course = delete_course(course_id)
    db.session.delete(course)
    db.session.commit()
    return jsonify({'message': 'Course deleted successfully'})

@app.route('/course/<int:course_id>', methods=['GET'])
def get_course_details(course_id):
    course = Course.query.get(course_id)
    if not course:
         return jsonify({'message': 'Course not found'}), 404
    return jsonify({
        'name': course.name,
        'date':str(course.start_date) + ' - ' + str(course.end_date),
        'color': "#d0c1ff",
    }), 200

#student-->course

@app.route('/enroll_student', methods=['POST'])
def enroll_student():
    data = request.json
    student_id = data.get('student_id')
    course_id = data.get('course_id')

    student = Student.query.get(student_id)
    course = Course.query.get(course_id)

    if not student or not course:
        return jsonify({'message': 'Student or Course not found'}), 404

    student.courses.append(course)
    db.session.commit()
    
    return jsonify({'message': 'Student enrolled in course successfully'})

@app.route('/student/courses', methods = ['POST'])
def get_student_courses():
    data = request.json
    student_id = data.get('student_id')
    
    if not student_id:
        return jsonify({'message': 'Student ID is required'}), 400

    student = Student.query.get(student_id)
    if not student:
        return jsonify({'message': 'Student not found'}), 404
    
    
    courses = student.courses
    return jsonify([{
        'id': course.id,
        'title': course.name,
        'date':str(course.start_date) + ' - ' + str(course.end_date),
        'lectures': str(course.lectures_conducted) + '/' + str(course.total_lectures),
        'color': "#d0c1ff",
    } for course in courses]) , 200






if __name__ == '__main__':
    app.run(debug=True)
