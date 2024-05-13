import os
import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from dotenv import load_dotenv
import time

load_dotenv()

USER_URL = os.getenv("USER_URL")
ADMIN_URL = os.getenv("ADMIN_URL")


class UserVisitPneumonia(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Chrome()

    def test_login(self):
        driver = self.driver
        driver.get(USER_URL)

        username_field = driver.find_element(By.ID, "email")
        password_field = driver.find_element(By.ID, "password")
        login_button = driver.find_element(By.XPATH, "//button[@type='submit']")

        username_field.send_keys("jamesmichael0555@gmail.com")
        password_field.send_keys("GekkoMain")

        login_button.submit()

        time.sleep(1)
        self.assertIn("Optimize Your Health ", driver.page_source)

        driver.get(USER_URL + "/Pneumonia")
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

        username_field.send_keys("admin@admin.com")
        password_field.send_keys("admin")

        login_button.submit()

        driver.get(USER_URL + "/Pneumonia")
        time.sleep(1)

        self.assertIn("Select an image", driver.page_source)



    def tearDown(self):
        self.driver.close()
