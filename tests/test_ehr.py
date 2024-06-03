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

class UserCreateEHR(unittest.TestCase):
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

        driver.get(USER_URL + "/ehr")
        time.sleep(1)

        driver.get(USER_URL + "/ehr-add")
        time.sleep(1)

        self.assertIn("Add Data", driver.page_source)


    def tearDown(self):
        self.driver.close()
