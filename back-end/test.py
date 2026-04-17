import unittest
from app import create_app
from db import db

class ClientTestCase(unittest.TestCase):

    def setUp(self):
        self.app = create_app({
             "TESTING": True,
            "SQLALCHEMY_DATABASE_URI": "sqlite:///:memory:"
        })
        self.client = self.app.test_client()
        
        with self.app.app_context():
            db.create_all()

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()  
    
    #Create client test

    def test_create_client(self):
        """Test creating a client"""
        response = self.client.post("client",json={
            "name":"rami",
            "email":"rami@test.com",
            "phone":"88888888"
        })

        self.assertEqual(response.status_code,200)
        data = response.get_json()
        self.assertEqual(data,{"id":1,"name":"rami","email":"rami@test.com","phone":"88888888"})

    def test_duplicate_email(self):
        """Test creating a client with a duplicate email"""
        self.client.post("client",json={
            "name":"rami",
            "email":"rami@test.com",
            "phone":"88888888"
        })
        response = self.client.post("client",json={
            "name":"med",
            "email":"rami@test.com",
            "phone":"24569872"
        })
        self.assertEqual(response.status_code,409)
    
    def test_duplicate_phone(self):
        """Test creating a client with a duplicate phone number"""
        self.client.post("client",json={
            "name":"rami",
            "email":"rami@test.com",
            "phone":"24569872"
        })
        response=self.client.post("client",json={
            "name":"rami2",
            "email":"test2@gmail.com",
            "phone":"24569872"
        })
        self.assertEqual(response.status_code,409)

    #Viewing Client

    def test_view_clients(self):
        """Test view all clients"""
        self.client.post("/client", json={
            "name": "rami",
            "email": "rami@test.com",
            "phone": "24569872"
        })
        self.client.post("/client", json={
            "name": "mohamed",
            "email": "mohamed@test.com",
            "phone": "88888888"
        })

        response = self.client.get("/client")
        result = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(result), 2)
        self.assertEqual(result[0]["name"], "rami")
        self.assertEqual(result[1]["name"], "mohamed")
            
    def test_view_single_client(self):
        """Test view one client by id """
        self.client.post("/client", json={
            "name": "rami",
            "email": "rami@test.com",
            "phone": "24569872"
        })

        response = self.client.get("/client/1")

        result = response.get_json()

        self.assertEqual(response.status_code,200)
        self.assertEqual(result["id"],1)
        self.assertEqual(result["name"],"rami")
    
    #Update client
    
    def test_update_single_client(self):
        self.client.post("/client", json={
            "name": "rami",
            "email": "rami@test.com",
            "phone": "24569872"
        })
        
        response = self.client.put("/client/1",json={
            "name": "mohamed",
            "email": "mohamed@test.com",
            "phone": "9999999"
        })
        result = response.get_json()

        self.assertEqual(response.status_code,200)
        self.assertEqual(result["name"],"mohamed")
    
    #Delete Client

    def test_delete_single_client(self):
        """Test delete a client"""
        self.client.post("/client", json={
            "name": "rami",
            "email": "rami@test.com",
            "phone": "24569872"
        })

        response = self.client.delete("/client/1")
        result = response.get_json()

        self.assertEqual(result["message"], "Client deleted successfully")

        self.assertEqual(response.status_code,200)
        


if __name__ == "__main__":
    unittest.main()