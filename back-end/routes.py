from flask import request,jsonify
from db import db, Client

def register_routes(app):

    @app.route("/client", methods=["POST"])
    def add_client():
        data = request.get_json()
        if not data or not data.get("name") or not data.get("email") or not data.get("phone"):
            return jsonify({"error":"Missing Data"}),400
        
        emailExist = Client.query.filter_by(email=data["email"]).first()
        if emailExist:
            return jsonify({"error":"Email already exists"}), 409
        
        phoneExist = Client.query.filter_by(phone = data["phone"]).first()
        if phoneExist:
            return jsonify({"error":"phone number already exists"}), 409


        client = Client(name=data["name"], email= data["email"],phone = data["phone"])
        db.session.add(client)
        db.session.commit()
        return jsonify({
            "id": client.id,
            "name": client.name,
            "email": client.email,
            "phone":client.phone
        })
    
    @app.route("/client", methods=["GET"])
    def list_clients():
        clients = Client.query.all()

        result = []
        for c in clients:
            result.append({
            "id": c.id,
            "name": c.name,
            "email": c.email,
            "phone":c.phone
        })
            
        return jsonify(result),200
    
    @app.route("/client/<int:id>",methods=["GET"])
    def show_client(id):
        client = Client.query.filter_by(id=id).first()

        if not client:
            return jsonify({"error": "No client found"}), 404

        return jsonify({
            "id": client.id,
            "name": client.name,
            "email": client.email,
            "phone": client.phone
        }), 200
    
    @app.route("/client/<int:id>",methods=["PUT"])
    def update_client(id):
        client = Client.query.filter_by(id=id).first()

        if not client:
            return jsonify({"error": "No client found"}), 404

        data = request.get_json()

        client.name = data.get("name", client.name)
        client.email = data.get("email", client.email)
        client.phone = data.get("phone", client.phone)

        db.session.commit()

        return jsonify({
            "id": client.id,
            "name": client.name,
            "email": client.email,
            "phone": client.phone
        }), 200
    @app.route("/client/<int:id>", methods=["DELETE"])
    def delete_client(id):
        client = db.session.get(Client, id)

        if not client:
            return {"error": "Client not found"}, 404

        db.session.delete(client)
        db.session.commit()

        return {"message": "Client deleted successfully"}, 200