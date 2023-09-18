from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS


def connect_to_db():
    conn = sqlite3.connect('data.db')
    return conn


def create_db_table():
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute('''DROP TABLE IF EXISTS tasks''')
        cur.execute(''' 
            CREATE TABLE tasks(
                task_id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                content TEXT NOT NULL   
                );
            ''')
        conn.commit()
        print("Task table created.")
    except:
        print("Task table creation failed.")
    finally:
        conn.close()


def insert_task(task):
    inserted_task = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("INSERT INTO tasks (title, content) VALUES (?, ?)",
                    (task['title'], task['content']))
        conn.commit()
        inserted_task = get_task_by_id(cur.lastrowid)
    except:
        conn.rollback()

    finally:
        conn.close()

    return inserted_task


def get_tasks():
    tasks = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM tasks")
        rows = cur.fetchall()

        # Convert tasks into dictionary
        for i in rows:
            task = {}
            task["task_id"] = i["task_id"]
            task["title"] = i["title"]
            task["content"] = i["content"]
            tasks.append(task)

    except:
        tasks = []

    return tasks


def get_task_by_id(task_id):
    task = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM tasks WHERE task_id = ?", (task_id,))
        row = cur.fetchone()

        # Convert row to a dict
        task["task_id"] = row["task_id"]
        task["title"] = row["title"]
        task["content"] = row["content"]

    except:
        task = {}

    return task


def update_task(task):
    updated_task = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE tasks SET title = ?, content = ? WHERE task_id =?",
                    (task["title"], task["content"], task["task_id"],))
        conn.commit()
        updated_task = get_task_by_id(task["task_id"])

    except:
        conn.rollback()
        updated_task = {}
    finally:
        conn.close()

    return updated_task


def delete_task(task_id):
    message = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM tasks WHERE task_id = ?", (task_id,))
        conn.commit()
        message["status"] = "Task deleted OK"
    except:
        conn.rollback()
        message["status"] = "Cannot delete task"
    finally:
        conn.close()

    return message


tasks = []

task0 = {
    "title": "Test0",
    "content": "Y la  idea es tratar de kcyo, siseñor"
}

tasks.append(task0)

create_db_table()

for i in tasks:
    print(insert_task(i))


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['GET'])
def home():
    return jsonify({"Status": "All Ok", "Result": "HTTP Response from Web API Service"})


@app.route('/api/tasks', methods=['GET'])
def api_get_tasks():
    return jsonify(get_tasks())


@app.route('/api/tasks/<task_id>', methods=['GET'])
def api_get_task(task_id):
    return jsonify(get_task_by_id(task_id))


@app.route('/api/tasks/add',  methods=['POST'])
def api_add_task():
    task = request.get_json()
    return jsonify(insert_task(task))


@app.route('/api/tasks/update',  methods=['PUT'])
def api_update_task():
    task = request.get_json()
    return jsonify(update_task(task))


@app.route('/api/tasks/delete/<task_id>',  methods=['DELETE'])
def api_delete_task(task_id):
    return jsonify(delete_task(task_id))


if __name__ == '__main__':
    app.run(port=8000, host="0.0.0.0")
