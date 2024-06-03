import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

ADMIN_URL = os.getenv("ADMIN_URL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

class UserCreateDrugs(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()
        
    def test_login(self):
        driver = self.driver
        driver.get(ADMIN_URL)
        
        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        
        username_field.send_keys(ADMIN_EMAIL)
        password_field.send_keys(ADMIN_PASSWORD)
        
        login_button.submit()
        
        time.sleep(1)
        self.assertIn("Welcome to the Homepage", driver.page_source)
        
        driver.get(ADMIN_URL + "/drugsdatabank")
        time.sleep(1)
        
        driver.get(ADMIN_URL + "drugsdatabank/add")
        time.sleep(1)
        
        self.assert_In("Add Data", driver.page_source)
        
    def tearDown(self):
        self.driver.close()