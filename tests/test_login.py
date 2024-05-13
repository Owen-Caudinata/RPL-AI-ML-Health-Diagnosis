import unittest
import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from dotenv import load_dotenv

load_dotenv()

ADMIN_URL = os.getenv("ADMIN_URL")
USER_URL = os.getenv("USER_URL")


class AdminLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get(ADMIN_URL)  # for admin
        self.assertIn("Login", driver.page_source)

    def tearDown(self):
        self.driver.close()


class UserLogin(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_search_in_python_org(self):
        driver = self.driver
        driver.get(USER_URL)  # for user
        self.assertIn("Email address", driver.page_source)
        self.assertIn("Password", driver.page_source)
        
        
    def tearDown(self):
        self.driver.close()


if __name__ == "__main__":
    unittest.main()
