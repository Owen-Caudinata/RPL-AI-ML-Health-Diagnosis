import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

USER_URL = os.getenv("USER_URL")
USER_EMAIL = os.getenv("USER_EMAIL")
USER_PASSWORD = os.getenv("USER_PASSWORD")

ADMIN_URL = os.getenv("ADMIN_URL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")

class UserVisitPneumonia(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(USER_URL)

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys(USER_EMAIL)
        password_field.send_keys(USER_PASSWORD)

        login_button.submit()

        time.sleep(5)
        self.assertIn("Web Logo", driver.page_source)

        driver.get(USER_URL + "/pneumonia")
        time.sleep(1)

        self.assertIn("Prediction", driver.page_source)

class AdminVisitPneumonia(unittest.TestCase):
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
        time.sleep(5)
        driver.get(USER_URL + "/pneumonia")
        time.sleep(1)

        self.assertIn("Select an image", driver.page_source)



    def tearDown(self):
        self.driver.close()
